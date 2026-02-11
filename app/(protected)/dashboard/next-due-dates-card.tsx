"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { InvoiceDetailOverlay } from "./invoices/invoice-detail-overlay";

type InvoiceSummary = {
  id: string;
  number: string;
  status: string;
  amount_cents: number;
  currency: string;
  due_date: string | null;
  customer_id: string | null;
  reminders_enabled: boolean;
};

type Customer = { id: string; name: string };

type NextDueDatesCardProps = {
  invoices: InvoiceSummary[];
  customers: Customer[];
  currency: string;
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
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function NextDueDatesCard({
  invoices,
  customers,
  currency,
}: NextDueDatesCardProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const selectedInvoice = invoices.find((inv) => inv.id === selectedInvoiceId);

  return (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>{t("dashboard.nextDueDates")}</CardTitle>
          <CardDescription>
            {t("dashboard.nextDueDatesDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-3">
              {invoices.map((invoice) => {
                const customerName =
                  customers.find((c) => c.id === invoice.customer_id)?.name ??
                  null;
                return (
                  <div
                    key={invoice.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedInvoiceId(invoice.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedInvoiceId(invoice.id);
                      }
                    }}
                    className="flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {t("dashboard.invoiceLabel")} {invoice.number}
                        {customerName ? (
                          <span className="ml-1 font-normal text-muted-foreground">
                            — {customerName}
                          </span>
                        ) : null}
                      </p>
                      {invoice.due_date ? (
                        <p className="text-xs text-muted-foreground">
                          {t("dashboard.due")} {formatDate(invoice.due_date)}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatCurrency(
                        invoice.amount_cents,
                        invoice.currency || currency
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("dashboard.noUpcomingInvoices")}
            </p>
          )}
        </CardContent>
      </Card>

      {selectedInvoice && (
        <InvoiceDetailOverlay
          invoice={selectedInvoice}
          customers={customers}
          open={!!selectedInvoiceId}
          onOpenChange={(open) => !open && setSelectedInvoiceId(null)}
        />
      )}
    </>
  );
}
