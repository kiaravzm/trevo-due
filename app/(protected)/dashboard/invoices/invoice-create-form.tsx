"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { createInvoiceAction } from "../actions";

type InvoiceCreateFormProps = {
  customers: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("common.saving") : t("invoice.createInvoiceButton")}
    </Button>
  );
}

export function InvoiceCreateForm({ customers, onSuccess, onCancel }: InvoiceCreateFormProps) {
  const [state, formAction] = useFormState(createInvoiceAction, initialState);

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="invoice-number">{t("invoice.invoiceNumber")}</Label>
          <Input id="invoice-number" name="number" required placeholder="INV-2024-001" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-status">{t("common.status")}</Label>
          <Select id="invoice-status" name="status" defaultValue="open">
            <option value="open">{t("invoice.status.open")}</option>
            <option value="paid">{t("invoice.status.paid")}</option>
            <option value="overdue">{t("invoice.status.overdue")}</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-customer">{t("common.clientOptional")}</Label>
          <Select id="invoice-customer" name="customer_id" defaultValue="">
            <option value="">{t("common.noClient")}</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="invoice-amount">{t("common.amount")}</Label>
          <Input id="invoice-amount" name="amount" required placeholder="1250.00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-currency">{t("common.currency")}</Label>
          <Input id="invoice-currency" name="currency" defaultValue="USD" placeholder="USD" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-due">{t("common.dueDateOptional")}</Label>
          <Input id="invoice-due" name="due_date" type="date" />
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="reminders_enabled" defaultChecked />
          {t("invoice.enableReminders")}
        </label>
        <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
          )}
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
