"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailOverlay } from "@/components/detail-overlay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { invoiceStatusLabel, t } from "@/lib/i18n";
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

function formatAmount(amountCents: number) {
  return (amountCents / 100).toFixed(2);
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("common.saving") : t("common.save")}
    </Button>
  );
}

function ReminderButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? t("common.sending") : t("invoice.sendReminder")}
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
    toast.success(t("actions.invoiceDeleted"));
    setDeleteDialogOpen(false);
    onOpenChange(false);
  };

  const footer = isEditing ? null : (
    <>
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        {t("common.close")}
      </Button>
      <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        {t("common.delete")}
      </Button>
      <Button onClick={() => setIsEditing(true)}>{t("common.edit")}</Button>
    </>
  );

  return (
    <>
      <DetailOverlay
        open={open}
        onOpenChange={onOpenChange}
        title={`${t("dashboard.invoiceLabel")} ${invoice.number}`}
        footer={footer}
      >
        {isEditing ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={invoice.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-number">{t("invoice.invoiceNumber")}</Label>
                <Input
                  id="edit-invoice-number"
                  name="number"
                  defaultValue={invoice.number}
                  required
                  placeholder="INV-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-status">{t("common.status")}</Label>
                <Select
                  id="edit-invoice-status"
                  name="status"
                  defaultValue={invoice.status}
                >
                  <option value="open">{t("invoice.status.open")}</option>
                  <option value="paid">{t("invoice.status.paid")}</option>
                  <option value="overdue">{t("invoice.status.overdue")}</option>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-invoice-amount">{t("common.amount")}</Label>
                  <Input
                    id="edit-invoice-amount"
                    name="amount"
                    defaultValue={formatAmount(invoice.amount_cents)}
                    required
                    placeholder="1250.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-invoice-currency">{t("common.currency")}</Label>
                  <Input
                    id="edit-invoice-currency"
                    name="currency"
                    defaultValue={invoice.currency}
                    placeholder="USD"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-due">{t("common.dueDate")}</Label>
                <Input
                  id="edit-invoice-due"
                  name="due_date"
                  type="date"
                  defaultValue={invoice.due_date ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-invoice-customer">{t("common.client")}</Label>
                <Select
                  id="edit-invoice-customer"
                  name="customer_id"
                  defaultValue={invoice.customer_id ?? ""}
                >
                  <option value="">{t("common.noClient")}</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Select>
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="reminders_enabled"
                  defaultChecked={invoice.reminders_enabled}
                  className="h-4 w-4 rounded border-input"
                />
                {t("invoice.allowEmailReminders")}
              </label>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                {t("common.cancel")}
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t("invoice.invoiceNumber")}
              </p>
              <p className="text-foreground">{invoice.number}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.status")}</p>
              <p className="text-foreground capitalize">
                {invoiceStatusLabel(invoice.status)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.amount")}</p>
              <p className="text-foreground">
                {invoice.currency} {formatAmount(invoice.amount_cents)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t("common.dueDate")}
              </p>
              <p className="text-foreground">{invoice.due_date ?? "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.client")}</p>
              <p className="text-foreground">{customerName || "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t("invoice.emailReminders")}
              </p>
              <p className="text-foreground">
                {invoice.reminders_enabled ? t("common.enabled") : t("common.disabled")}
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
            <AlertDialogTitle>{t("invoice.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("invoice.deleteDescription", { number: invoice.number })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <Button variant="destructive" onClick={() => handleDelete()}>
              {t("common.delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
