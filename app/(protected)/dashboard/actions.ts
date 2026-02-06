"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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

  const { error } = await supabase.from("invoices").insert({
    user_id: user.id,
    number,
    status,
    amount_cents: amountCents,
    currency,
    due_date: dueDate || null,
    customer_id: customerId || null,
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
