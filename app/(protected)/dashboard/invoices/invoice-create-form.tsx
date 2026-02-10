"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="invoice-number">Invoice number</Label>
          <Input
            id="invoice-number"
            name="number"
            required
            placeholder="INV-2024-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-status">Status</Label>
          <select
            id="invoice-status"
            name="status"
            defaultValue="open"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="open">Open</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-customer">Client (optional)</Label>
          <select
            id="invoice-customer"
            name="customer_id"
            defaultValue=""
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          <Label htmlFor="invoice-amount">Amount</Label>
          <Input
            id="invoice-amount"
            name="amount"
            required
            placeholder="1250.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-currency">Currency</Label>
          <Input
            id="invoice-currency"
            name="currency"
            defaultValue="USD"
            placeholder="USD"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-due">Due date (optional)</Label>
          <Input id="invoice-due" name="due_date" type="date" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="reminders_enabled" defaultChecked />
          Enable polite email reminders
        </label>
        <SubmitButton />
      </div>
    </form>
  );
}
