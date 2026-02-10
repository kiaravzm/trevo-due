"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InvoiceDetailOverlay } from "./invoice-detail-overlay";

type Invoice = {
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

type InvoiceListItemProps = {
  invoice: Invoice;
  customers: Customer[];
};

const statusLabels: Record<string, string> = {
  open: "Open",
  paid: "Paid",
  overdue: "Overdue",
};

function formatAmount(amountCents: number) {
  return (amountCents / 100).toFixed(2);
}

export function InvoiceListItem({ invoice, customers }: InvoiceListItemProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const customerName =
    customers.find((c) => c.id === invoice.customer_id)?.name ?? "—";

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOverlayOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOverlayOpen(true);
          }
        }}
        className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="grid min-w-0 flex-1 gap-1 md:grid-cols-[1fr,1fr,1fr,1fr,1fr]">
          <span className="truncate font-medium text-foreground">
            {invoice.number}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {statusLabels[invoice.status] ?? invoice.status}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {invoice.currency} {formatAmount(invoice.amount_cents)}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {invoice.due_date ?? "—"}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {customerName}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            setOverlayOpen(true);
          }}
          aria-label="View or edit invoice"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <InvoiceDetailOverlay
        invoice={invoice}
        customers={customers}
        open={overlayOpen}
        onOpenChange={setOverlayOpen}
      />
    </>
  );
}
