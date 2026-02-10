"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildInvoiceReminderEmail } from "@/lib/email/invoice-reminder";
import { getStripeServerClient } from "@/lib/stripe/server";

type ActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createState(status: ActionState["status"], message: string | null): ActionState {
  return { status, message };
}

function parseCurrencyToCents(value: string) {
  const normalized = value.replace(",", ".").trim();
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, decimals = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(decimals.padEnd(2, "0"));
  return Number.isNaN(cents) ? null : cents;
}

async function getAuthUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

async function hasReachedFreeInvoiceLimit(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  userId: string
) {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .maybeSingle();

  if (subscription?.status === "active" || subscription?.status === "trialing") {
    return false;
  }

  const { count } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return (count ?? 0) >= 3;
}

async function hasReachedFreeContractLimit(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  userId: string
) {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .maybeSingle();

  if (subscription?.status === "active" || subscription?.status === "trialing") {
    return false;
  }

  const { count } = await supabase
    .from("contracts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return (count ?? 0) >= 3;
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
    return createState("error", "Client name is required.");
  }

  if (email && !emailRegex.test(email)) {
    return createState("error", "Please enter a valid email address.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to create clients.");
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
  return createState("success", "Client saved successfully.");
}

export async function updateClientAction(_prev: ActionState, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (!id) {
    return createState("error", "Missing client ID.");
  }

  if (!name) {
    return createState("error", "Client name is required.");
  }

  if (email && !emailRegex.test(email)) {
    return createState("error", "Please enter a valid email address.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to update clients.");
  }

  const { error } = await supabase
    .from("customers")
    .update({ name, email: email || null, company: company || null })
    .eq("id", id);

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/clients");
  return createState("success", "Client updated successfully.");
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
    return createState("error", "Invoice number is required.");
  }

  const amountCents = parseCurrencyToCents(amount);
  if (amountCents === null) {
    return createState("error", "Enter a valid amount, like 1250.00.");
  }

  if (!currency) {
    return createState("error", "Currency is required.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to create invoices.");
  }

  const limitReached = await hasReachedFreeInvoiceLimit(supabase, user.id);
  if (limitReached) {
    return createState(
      "error",
      "Free plan reached. Upgrade to create more than 3 invoices."
    );
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
  return createState("success", "Invoice created successfully.");
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
    return createState("error", "Missing invoice ID.");
  }

  if (!number) {
    return createState("error", "Invoice number is required.");
  }

  const amountCents = parseCurrencyToCents(amount);
  if (amountCents === null) {
    return createState("error", "Enter a valid amount, like 1250.00.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to update invoices.");
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
  return createState("success", "Invoice updated successfully.");
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
    return createState("error", "Missing invoice ID.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to send reminders.");
  }

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("id, number, amount_cents, currency, due_date, reminders_enabled, customer_id")
    .eq("id", invoiceId)
    .maybeSingle();

  if (error || !invoice) {
    return createState("error", "Invoice not found.");
  }

  if (!invoice.reminders_enabled) {
    return createState("error", "Reminders are disabled for this invoice.");
  }

  if (!invoice.customer_id) {
    return createState("error", "Assign a client before sending reminders.");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("name, email")
    .eq("id", invoice.customer_id)
    .maybeSingle();

  if (!customer?.email) {
    return createState("error", "Client email is missing.");
  }

  const amount = `${invoice.currency} ${(invoice.amount_cents / 100).toFixed(2)}`;
  const reminder = buildInvoiceReminderEmail({
    clientName: customer.name,
    invoiceNumber: invoice.number,
    amount,
    dueDate: invoice.due_date,
    senderName: "AgencyDocs",
  });

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

  return createState("success", "Reminder sent successfully.");
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
    return createState("error", "Contract title is required.");
  }

  if (!(file instanceof File)) {
    return createState("error", "Please attach a PDF file.");
  }

  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return createState("error", "Only PDF files are allowed.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to upload contracts.");
  }

  const limitReached = await hasReachedFreeContractLimit(supabase, user.id);
  if (limitReached) {
    return createState(
      "error",
      "Free plan reached. Upgrade to upload more than 3 contracts."
    );
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
  return createState("success", "Contract uploaded successfully.");
}

export async function updateContractAction(_prev: ActionState, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "signed").trim();
  const customerId = String(formData.get("customer_id") ?? "").trim();

  if (!id) {
    return createState("error", "Missing contract ID.");
  }

  if (!title) {
    return createState("error", "Contract title is required.");
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return createState("error", "You need to be signed in to update contracts.");
  }

  const { error } = await supabase
    .from("contracts")
    .update({ title, status, customer_id: customerId || null })
    .eq("id", id);

  if (error) {
    return createState("error", error.message);
  }

  revalidatePath("/dashboard/contracts");
  return createState("success", "Contract updated successfully.");
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
    return { error: "You need to be signed in to view contracts." };
  }

  const { data, error } = await supabase.storage
    .from("contracts")
    .createSignedUrl(path, 3600);

  if (error) {
    return { error: error.message };
  }

  return { url: data.signedUrl };
}
