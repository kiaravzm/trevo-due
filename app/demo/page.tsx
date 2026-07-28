import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import {
  demoCustomerOptions,
  demoInvoices,
} from "@/lib/demo/fixtures";
import { MetricCard } from "@/app/(protected)/dashboard/metric-card";
import { NextDueDatesCard } from "@/app/(protected)/dashboard/next-due-dates-card";

type InvoiceSummary = {
  id: string;
  number: string;
  status: string;
  amount_cents: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  customer_id: string | null;
  reminders_enabled: boolean;
};

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}

export default function DemoDashboardPage() {
  const invoiceList: InvoiceSummary[] = demoInvoices.map((invoice) => ({ ...invoice }));
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

  const totalPaidCents = invoiceList.reduce(
    (total, invoice) => (invoice.status === "paid" ? total + invoice.amount_cents : total),
    0,
  );

  const totalOverdueCents = invoiceList.reduce(
    (total, invoice) => (invoice.status === "overdue" ? total + invoice.amount_cents : total),
    0,
  );

  const pendingCount = invoiceList.filter((invoice) => invoice.status === "open").length;

  const upcomingInvoices = invoiceList
    .filter(
      (invoice) =>
        invoice.due_date &&
        new Date(invoice.due_date) >= today &&
        new Date(invoice.due_date) <= thirtyDaysFromNow &&
        invoice.status !== "paid",
    )
    .sort(
      (left, right) =>
        new Date(left.due_date ?? 0).getTime() - new Date(right.due_date ?? 0).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            {t("dashboard.salesDashboard")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.salesDashboardDescription")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title={t("dashboard.totalInvoiced")}
            value={formatCurrency(totalInvoicedCents, currency)}
            description={t("dashboard.issuedThisMonth")}
          />
          <MetricCard
            title={t("dashboard.totalPaid")}
            value={formatCurrency(totalPaidCents, currency)}
            description={t("common.status")}
            statusLabel={t("invoice.status.paid")}
            statusTone="success"
          />
          <MetricCard
            title={t("dashboard.totalOverdue")}
            value={formatCurrency(totalOverdueCents, currency)}
            description={t("common.status")}
            statusLabel={t("invoice.status.overdue")}
            statusTone="danger"
          />
          <MetricCard
            title={t("dashboard.invoicesPending")}
            value={`${pendingCount}`}
            description={t("common.status")}
            statusLabel={t("invoice.status.open")}
            statusTone="warning"
          />
          <MetricCard
            title={t("dashboard.upcomingDueDates")}
            value={`${upcomingInvoices.length}`}
            description={t("dashboard.next30Days")}
          />
        </div>

        <NextDueDatesCard
          invoices={upcomingInvoices}
          customers={[...demoCustomerOptions]}
          currency={currency}
        />

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t("dashboard.quickActions")}</CardTitle>
            <CardDescription>{t("dashboard.quickActionsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/demo/clients">{t("dashboard.manageClients")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/demo/contracts">{t("dashboard.manageContracts")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/demo/invoices">{t("dashboard.manageInvoices")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
