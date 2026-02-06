"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { deleteInvoiceAction, updateInvoiceAction } from "../actions";

type InvoiceRowProps = {
  invoice: {
    id: string;
    number: string;
    status: string;
    amount_cents: number;
    currency: string;
    due_date: string | null;
    customer_id: string | null;
  };
  customers: Array<{ id: string; name: string }>;
};

const initialState = { status: "idle" as const, message: null as string | null };

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

function formatAmount(amountCents: number) {
  return (amountCents / 100).toFixed(2);
}

export function InvoiceRow({ invoice, customers }: InvoiceRowProps) {
  const [state, formAction] = useFormState(updateInvoiceAction, initialState);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,auto]">
        <form action={formAction} className="contents">
          <input type="hidden" name="id" value={invoice.id} />
          <input
            name="number"
            defaultValue={invoice.number}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <select
            name="status"
            defaultValue={invoice.status}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="open">Open</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          <input
            name="amount"
            defaultValue={formatAmount(invoice.amount_cents)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            name="currency"
            defaultValue={invoice.currency}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            name="due_date"
            type="date"
            defaultValue={invoice.due_date ?? ""}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <select
            name="customer_id"
            defaultValue={invoice.customer_id ?? ""}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">No client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <UpdateButton />
          </div>
        </form>
        <form action={deleteInvoiceAction} className="flex items-center">
          <input type="hidden" name="id" value={invoice.id} />
          <Button type="submit" variant="outline" className="text-destructive">
            Delete
          </Button>
        </form>
      </div>

      {state.message ? (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            state.status === "success"
              ? "border-border bg-secondary text-secondary-foreground"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
