import type { SubscriptionStatus } from "@/lib/billing/subscription";

/** Stable sample customers for the public demo (no Supabase). */
export const demoCustomers = [
  {
    id: "cust-1",
    name: "Northstar Studio",
    email: "hello@northstar.example",
    company: "Northstar LLC",
  },
  {
    id: "cust-2",
    name: "Brightleaf Co.",
    email: "billing@brightleaf.example",
    company: "Brightleaf Co.",
  },
  {
    id: "cust-3",
    name: "Harbor & Pine",
    email: "accounts@harborpine.example",
    company: "Harbor & Pine Ltd.",
  },
] as const;

function daysFromNow(days: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysAgoIso(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/** Sample invoices with relative dates so "upcoming due" metrics stay meaningful. */
export const demoInvoices = [
  {
    id: "inv-1",
    number: "INV-1001",
    status: "open",
    amount_cents: 250_000,
    currency: "USD",
    due_date: daysFromNow(12),
    customer_id: "cust-1",
    reminders_enabled: true,
    created_at: daysAgoIso(5),
  },
  {
    id: "inv-2",
    number: "INV-1002",
    status: "paid",
    amount_cents: 180_000,
    currency: "USD",
    due_date: daysFromNow(-10),
    customer_id: "cust-2",
    reminders_enabled: false,
    created_at: daysAgoIso(20),
  },
  {
    id: "inv-3",
    number: "INV-1003",
    status: "overdue",
    amount_cents: 95_000,
    currency: "USD",
    due_date: daysFromNow(-8),
    customer_id: "cust-3",
    reminders_enabled: true,
    created_at: daysAgoIso(40),
  },
  {
    id: "inv-4",
    number: "INV-1004",
    status: "open",
    amount_cents: 420_000,
    currency: "USD",
    due_date: daysFromNow(25),
    customer_id: "cust-2",
    reminders_enabled: true,
    created_at: daysAgoIso(2),
  },
  {
    id: "inv-5",
    number: "INV-1005",
    status: "open",
    amount_cents: 75_000,
    currency: "USD",
    due_date: daysFromNow(4),
    customer_id: "cust-1",
    reminders_enabled: true,
    created_at: daysAgoIso(1),
  },
  {
    id: "inv-6",
    number: "INV-1006",
    status: "paid",
    amount_cents: 310_000,
    currency: "USD",
    due_date: daysFromNow(-3),
    customer_id: "cust-3",
    reminders_enabled: false,
    created_at: daysAgoIso(12),
  },
] as const;

export const demoContracts = [
  {
    id: "con-1",
    title: "Website redesign — signed",
    status: "signed",
    customer_id: "cust-1",
    file_path: "demo/sample-website.pdf",
  },
  {
    id: "con-2",
    title: "Brand identity retainer",
    status: "signed",
    customer_id: "cust-2",
    file_path: "demo/sample-brand.pdf",
  },
  {
    id: "con-3",
    title: "Q3 consulting agreement",
    status: "draft",
    customer_id: "cust-3",
    file_path: "demo/sample-consulting.pdf",
  },
] as const;

/** Freemium story for the demo: free-plan user near the invoice cap. */
export const demoSubscriptionStatus: SubscriptionStatus = "inactive";

export const demoCustomerOptions = demoCustomers.map(({ id, name }) => ({ id, name }));
