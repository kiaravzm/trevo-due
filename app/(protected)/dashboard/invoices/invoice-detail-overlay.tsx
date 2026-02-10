"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailOverlay } from "@/components/detail-overlay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  deleteInvoiceAction,
  sendInvoiceReminderAction,
  updateInvoiceAction,
} from "../actions";

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

type InvoiceDetailOverlayProps = {
  invoice: Invoice;
  customers: Customer[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const initialState = { status: "idle" as const, message: null as string | null };
const reminderInitialState = {
  status: "idle" as const,
  message: null as string | null,
};
const statusLabels: Record<string, string> = {
  open: "Open",
  paid: "Paid",
  overdue: "Overdue",
};

function formatAmount(amountCents: number) {
  return (amountCents / 100).toFixed(2);
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

function ReminderButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Sending..." : "Send reminder"}
    </Button>
  );
}

export function InvoiceDetailOverlay({
  invoice,
  customers,
  open,
  onOpenChange,
}: InvoiceDetailOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [state, formAction] = useFormState(updateInvoiceAction, initialState);
  const [reminderState, reminderFormAction] = useFormState(
    sendInvoiceReminderAction,
    reminderInitialState
  );

  const customerName =
    customers.find((c) => c.id === invoice.customer_id)?.name ?? null;

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
      onOpenChange(false);
      setIsEditing(false);
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message, onOpenChange]);

  useEffect(() => {
    if (reminderState.status === "success" && reminderState.message) {
      toast.success(reminderState.message);
    } else if (reminderState.status === "error" && reminderState.message) {
      toast.error(reminderState.message);
    }
  }, [reminderState.status, reminderState.message]);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.set("id", invoice.id);
    await deleteInvoiceAction(formData);
    toast.success("Invoice deleted successfully.");
    setDeleteDialogOpen(false);
    onOpenChange(false);
  };

  const footer = isEditing ? null : (
    <>
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Close
      </Button>
      <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        Delete
      </Button>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </>
  );

  return (
    <>
      <DetailOverlay
        open={open}
        onOpenChange={onOpenChange}
        title={`Invoice ${invoice.number}`}
        footer={footer}
      >
        {isEditing ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={invoice.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-number">Invoice number</Label>
                <Input
                  id="edit-invoice-number"
                  name="number"
                  defaultValue={invoice.number}
                  required
                  placeholder="INV-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-status">Status</Label>
                <select
                  id="edit-invoice-status"
                  name="status"
                  defaultValue={invoice.status}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="open">Open</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-invoice-amount">Amount</Label>
                  <Input
                    id="edit-invoice-amount"
                    name="amount"
                    defaultValue={formatAmount(invoice.amount_cents)}
                    required
                    placeholder="1250.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-invoice-currency">Currency</Label>
                  <Input
                    id="edit-invoice-currency"
                    name="currency"
                    defaultValue={invoice.currency}
                    placeholder="USD"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-due">Due date</Label>
                <Input
                  id="edit-invoice-due"
                  name="due_date"
                  type="date"
                  defaultValue={invoice.due_date ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-customer">Client</Label>
                <select
                  id="edit-invoice-customer"
                  name="customer_id"
                  defaultValue={invoice.customer_id ?? ""}
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
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="reminders_enabled"
                  defaultChecked={invoice.reminders_enabled}
                  className="h-4 w-4 rounded border-input"
                />
                Allow email reminders for this invoice
              </label>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Invoice number
              </p>
              <p className="text-foreground">{invoice.number}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-foreground capitalize">
                {statusLabels[invoice.status] ?? invoice.status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-foreground">
                {invoice.currency} {formatAmount(invoice.amount_cents)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Due date
              </p>
              <p className="text-foreground">{invoice.due_date ?? "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Client</p>
              <p className="text-foreground">{customerName || "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email reminders
              </p>
              <p className="text-foreground">
                {invoice.reminders_enabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            {invoice.reminders_enabled && (
              <form action={reminderFormAction} className="pt-4">
                <input type="hidden" name="invoice_id" value={invoice.id} />
                <ReminderButton />
              </form>
            )}
          </div>
        )}
      </DetailOverlay>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove invoice {invoice.number}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={() => handleDelete()}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
