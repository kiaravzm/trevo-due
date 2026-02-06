"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { createInvoiceAction } from "../actions";

type InvoiceCreateFormProps = {
  customers: Array<{ id: string; name: string }>;
};

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Create invoice"}
    </Button>
  );
}

export function InvoiceCreateForm({ customers }: InvoiceCreateFormProps) {
  const [state, formAction] = useFormState(createInvoiceAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-number">
            Invoice number
          </label>
          <input
            id="invoice-number"
            name="number"
            required
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="INV-2024-001"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-status">
            Status
          </label>
          <select
            id="invoice-status"
            name="status"
            defaultValue="open"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="open">Open</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-customer">
            Client (optional)
          </label>
          <select
            id="invoice-customer"
            name="customer_id"
            defaultValue=""
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">No client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-amount">
            Amount
          </label>
          <input
            id="invoice-amount"
            name="amount"
            required
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="1250.00"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-currency">
            Currency
          </label>
          <input
            id="invoice-currency"
            name="currency"
            defaultValue="USD"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="invoice-due">
            Due date (optional)
          </label>
          <input
            id="invoice-due"
            name="due_date"
            type="date"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <SubmitButton />

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
    </form>
  );
}
