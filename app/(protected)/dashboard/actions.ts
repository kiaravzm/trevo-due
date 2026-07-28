"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

import { hasReachedFreeLimit } from "@/lib/billing/limits";
import type { SubscriptionStatus } from "@/lib/billing/subscription";
import { buildInvoiceReminderEmail } from "@/lib/email/invoice-reminder";
import { t } from "@/lib/i18n";
import { parseCurrencyToCents } from "@/lib/money";
import { getStripeServerClient } from "@/lib/stripe/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createState(status: ActionState["status"], message: string | null): ActionState {
  return { status, message };
}

async function getAuthUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

async function hasReachedFreeLimitForTable(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  table: "invoices" | "contracts"
) {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .maybeSingle();

  const status: SubscriptionStatus =
    subscription?.status === "active" || subscription?.status === "trialing"
      ? subscription.status
      : "inactive";

  const { count } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return hasReachedFreeLimit(status, count ?? 0);
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(apiKey);
}

function getReminderSender() {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error("Missing RESEND_FROM_EMAIL environment variable.");
  }

  return from;
}

function normalizeReminderEnabled(value: FormDataEntryValue | null) {
  if (value === "on" || value === "true") {
    return true;
  }
  return false;
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function createClientAction(_prev: ActionState, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (!name) {
    return createState("error", t("actions.clientNameRequired"));
  }

  if (email && !emailRegex.test(email)) {
    return createState("error", t("actions.validEmail"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToCreateClients"));
  }

  const { error } = await supabase.from("customers").insert({
    user_id: user.id,
    name,
    email: email || null,
    company: company || null,
  });

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/clients");
  return createState("success", t("actions.clientSaved"));
}

export async function updateClientAction(_prev: ActionState, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (!id) {
    return createState("error", t("actions.missingClientId"));
  }

  if (!name) {
    return createState("error", t("actions.clientNameRequired"));
  }

  if (email && !emailRegex.test(email)) {
    return createState("error", t("actions.validEmail"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToUpdateClients"));
  }

  const { error } = await supabase
    .from("customers")
    .update({ name, email: email || null, company: company || null })
    .eq("id", id);

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/clients");
  return createState("success", t("actions.clientUpdated"));
}

export async function deleteClientAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  const { supabase } = await getAuthUser();
  await supabase.from("customers").delete().eq("id", id);
  revalidatePath("/dashboard/clients");
}

export async function createInvoiceAction(_prev: ActionState, formData: FormData) {
  const number = String(formData.get("number") ?? "").trim();
  const status = String(formData.get("status") ?? "open").trim();
  const amount = String(formData.get("amount") ?? "").trim();
  const currency = String(formData.get("currency") ?? "USD").trim().toUpperCase();
  const dueDate = String(formData.get("due_date") ?? "").trim();
  const customerId = String(formData.get("customer_id") ?? "").trim();
  const remindersEnabled = normalizeReminderEnabled(formData.get("reminders_enabled"));

  if (!number) {
    return createState("error", t("actions.invoiceNumberRequired"));
  }

  const amountCents = parseCurrencyToCents(amount);
  if (amountCents === null) {
    return createState("error", t("actions.validAmount"));
  }

  if (!currency) {
    return createState("error", t("actions.currencyRequired"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToCreateInvoices"));
  }

  const limitReached = await hasReachedFreeLimitForTable(supabase, user.id, "invoices");
  if (limitReached) {
    return createState("error", t("actions.freePlanInvoices"));
  }

  const { error } = await supabase.from("invoices").insert({
    user_id: user.id,
    number,
    status,
    amount_cents: amountCents,
    currency,
    due_date: dueDate || null,
    customer_id: customerId || null,
    reminders_enabled: remindersEnabled,
  });

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/invoices");
  return createState("success", t("actions.invoiceCreated"));
}

export async function updateInvoiceAction(_prev: ActionState, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const number = String(formData.get("number") ?? "").trim();
  const status = String(formData.get("status") ?? "open").trim();
  const amount = String(formData.get("amount") ?? "").trim();
  const currency = String(formData.get("currency") ?? "USD").trim().toUpperCase();
  const dueDate = String(formData.get("due_date") ?? "").trim();
  const customerId = String(formData.get("customer_id") ?? "").trim();
  const remindersEnabled = normalizeReminderEnabled(formData.get("reminders_enabled"));

  if (!id) {
    return createState("error", t("actions.missingInvoiceId"));
  }

  if (!number) {
    return createState("error", t("actions.invoiceNumberRequired"));
  }

  const amountCents = parseCurrencyToCents(amount);
  if (amountCents === null) {
    return createState("error", t("actions.validAmount"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToUpdateInvoices"));
  }

  const { error } = await supabase
    .from("invoices")
    .update({
      number,
      status,
      amount_cents: amountCents,
      currency,
      due_date: dueDate || null,
      customer_id: customerId || null,
      reminders_enabled: remindersEnabled,
    })
    .eq("id", id);

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/invoices");
  return createState("success", t("actions.invoiceUpdated"));
}

export async function deleteInvoiceAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  const { supabase } = await getAuthUser();
  await supabase.from("invoices").delete().eq("id", id);
  revalidatePath("/dashboard/invoices");
}

export async function sendInvoiceReminderAction(
  _prev: ActionState,
  formData: FormData
) {
  const invoiceId = String(formData.get("invoice_id") ?? "").trim();

  if (!invoiceId) {
    return createState("error", t("actions.missingInvoiceId"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToSendReminders"));
  }

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("id, number, amount_cents, currency, due_date, reminders_enabled, customer_id")
    .eq("id", invoiceId)
    .maybeSingle();

  if (error || !invoice) {
    return createState("error", t("actions.invoiceNotFound"));
  }

  if (!invoice.reminders_enabled) {
    return createState("error", t("actions.remindersDisabled"));
  }

  if (!invoice.customer_id) {
    return createState("error", t("actions.assignClientBeforeReminder"));
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("name, email")
    .eq("id", invoice.customer_id)
    .maybeSingle();

  if (!customer?.email) {
    return createState("error", t("actions.clientEmailMissing"));
  }

  const amount = `${invoice.currency} ${(invoice.amount_cents / 100).toFixed(2)}`;
  const reminder = buildInvoiceReminderEmail(
    {
      clientName: customer.name,
      invoiceNumber: invoice.number,
      amount,
      dueDate: invoice.due_date,
      senderName: "TrevoDue",
    },
    (key, params) => t(key, params as Record<string, string | number>)
  );

  const resend = getResend();
  const from = getReminderSender();

  const { error: sendError } = await resend.emails.send({
    from,
    to: customer.email,
    subject: reminder.subject,
    text: reminder.text,
    html: reminder.html,
  });

  if (sendError) {
    return createState("error", sendError.message);
  }

  return createState("success", t("actions.reminderSent"));
}

export async function startCheckoutAction() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return redirect("/dashboard/billing?status=error");
  }

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("trial_ends_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const stripe = getStripeServerClient();
  const trialDaysRaw = process.env.STRIPE_TRIAL_DAYS ?? "0";
  const trialDays = Number(trialDaysRaw);
  const hasTrial = !existing?.trial_ends_at && Number.isFinite(trialDays) && trialDays > 0;
  const appUrl = getAppUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email ?? undefined,
    success_url: `${appUrl}/dashboard/billing?status=success`,
    cancel_url: `${appUrl}/dashboard/billing?status=cancel`,
    subscription_data: {
      ...(hasTrial ? { trial_period_days: trialDays } : {}),
      metadata: { user_id: user.id },
    },
    metadata: {
      user_id: user.id,
    },
  });

  if (!session.url) {
    return redirect("/dashboard/billing?status=error");
  }

  return redirect(session.url);
}

export async function createContractAction(_prev: ActionState, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "signed").trim();
  const customerId = String(formData.get("customer_id") ?? "").trim();
  const file = formData.get("file");

  if (!title) {
    return createState("error", t("actions.contractTitleRequired"));
  }

  if (!(file instanceof File)) {
    return createState("error", t("actions.attachPdf"));
  }

  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return createState("error", t("actions.onlyPdfAllowed"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToUploadContracts"));
  }

  const limitReached = await hasReachedFreeLimitForTable(supabase, user.id, "contracts");
  if (limitReached) {
    return createState("error", t("actions.freePlanContracts"));
  }

  const filename = `${crypto.randomUUID()}.pdf`;
  const path = `${user.id}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from("contracts")
    .upload(path, file, { contentType: "application/pdf", upsert: false });

  if (uploadError) {
    return createState("error", uploadError.message);
  }

  const { error: insertError } = await supabase.from("contracts").insert({
    user_id: user.id,
    title,
    status,
    customer_id: customerId || null,
    file_path: path,
  });

  if (insertError) {
    return createState("error", insertError.message);
  }

  revalidatePath("/dashboard/contracts");
  return createState("success", t("actions.contractUploaded"));
}

export async function updateContractAction(_prev: ActionState, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "signed").trim();
  const customerId = String(formData.get("customer_id") ?? "").trim();

  if (!id) {
    return createState("error", t("actions.missingContractId"));
  }

  if (!title) {
    return createState("error", t("actions.contractTitleRequired"));
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", t("actions.signInToUpdateContracts"));
  }

  const { error } = await supabase
    .from("contracts")
    .update({ title, status, customer_id: customerId || null })
    .eq("id", id);

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/contracts");
  return createState("success", t("actions.contractUpdated"));
}

export async function deleteContractAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const filePath = String(formData.get("file_path") ?? "").trim();

  if (!id || !filePath) {
    return;
  }

  const { supabase } = await getAuthUser();
  await supabase.storage.from("contracts").remove([filePath]);
  await supabase.from("contracts").delete().eq("id", id);
  revalidatePath("/dashboard/contracts");
}

export async function getContractSignedUrlAction(filePath: string) {
  const path = String(filePath ?? "").trim();
  if (!path) {
    return { error: "Invalid file path" };
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return { error: t("actions.signInToViewContracts") };
  }

  const { data, error } = await supabase.storage
    .from("contracts")
    .createSignedUrl(path, 3600);

  if (error) {
    return { error: error.message };
  }

  return { url: data.signedUrl };
}
