import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MetricCard } from "./metric-card";

type InvoiceSummary = {
  id: string;
  number: string;
  status: string;
  amount_cents: number;
  currency: string;
  due_date: string | null;
  created_at: string;
};

function formatCurrency(amountCents: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return formatter.format(amountCents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
    new Date(value)
  );
}

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, number, status, amount_cents, currency, due_date, created_at")
    .order("created_at", { ascending: false });

  const invoiceList: InvoiceSummary[] = invoices ?? [];
  const currency = invoiceList.find((invoice) => invoice.currency)?.currency ?? "USD";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalInvoicedCents = invoiceList.reduce((total, invoice) => {
    const createdAt = new Date(invoice.created_at);
    if (createdAt >= monthStart) {
      return total + invoice.amount_cents;
    }
    return total;
  }, 0);

  const totalPaidCents = invoiceList.reduce((total, invoice) => {
    return invoice.status === "paid" ? total + invoice.amount_cents : total;
  }, 0);

  const totalOverdueCents = invoiceList.reduce((total, invoice) => {
    return invoice.status === "overdue" ? total + invoice.amount_cents : total;
  }, 0);

  const pendingCount = invoiceList.filter((invoice) => invoice.status === "open").length;

  const upcomingInvoices = invoiceList
    .filter(
      (invoice) =>
        invoice.due_date &&
        new Date(invoice.due_date) >= today &&
        new Date(invoice.due_date) <= thirtyDaysFromNow &&
        invoice.status !== "paid"
    )
    .sort(
      (left, right) =>
        new Date(left.due_date ?? 0).getTime() - new Date(right.due_date ?? 0).getTime()
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Sales dashboard</h1>
          <p className="text-sm text-muted-foreground">
            See revenue and billing health at a glance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Total invoiced (current month)"
            value={formatCurrency(totalInvoicedCents, currency)}
            description="Issued this month"
          />
          <MetricCard
            title="Total paid"
            value={formatCurrency(totalPaidCents, currency)}
            description="Status"
            statusLabel="Paid"
            statusTone="success"
          />
          <MetricCard
            title="Total overdue"
            value={formatCurrency(totalOverdueCents, currency)}
            description="Status"
            statusLabel="Overdue"
            statusTone="danger"
          />
          <MetricCard
            title="Invoices pending"
            value={`${pendingCount}`}
            description="Status"
            statusLabel="Open"
            statusTone="warning"
          />
          <MetricCard
            title="Upcoming due dates"
            value={`${upcomingInvoices.length}`}
            description="Next 30 days"
          />
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Next due dates</CardTitle>
            <CardDescription>Upcoming invoices that need attention.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingInvoices.length > 0 ? (
              <div className="space-y-3">
                {upcomingInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Invoice {invoice.number}</p>
                      {invoice.due_date ? (
                        <p className="text-xs text-muted-foreground">
                          Due {formatDate(invoice.due_date)}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatCurrency(invoice.amount_cents, invoice.currency || currency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming invoices.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump into the areas where work gets done.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard/clients">Manage clients</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard/contracts">Manage contracts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/invoices">Manage invoices</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/dashboard/billing">Billing</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/dashboard/settings">Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
