"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { createContractAction } from "../actions";

type ContractCreateFormProps = {
  customers: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("contract.uploading") : t("contract.uploadContract")}
    </Button>
  );
}

export function ContractCreateForm({ customers, onSuccess, onCancel }: ContractCreateFormProps) {
  const [state, formAction] = useFormState(createContractAction, initialState);

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message, onSuccess]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="contract-title">{t("contract.contractTitle")}</Label>
          <Input
            id="contract-title"
            name="title"
            required
            placeholder="Master Services Agreement"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contract-status">{t("common.status")}</Label>
          <Select id="contract-status" name="status" defaultValue="signed">
            <option value="signed">{t("contract.status.signed")}</option>
            <option value="draft">{t("contract.status.draft")}</option>
            <option value="pending">{t("contract.status.pending")}</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contract-client">{t("common.clientOptional")}</Label>
          <Select id="contract-client" name="customer_id" defaultValue="">
            <option value="">{t("common.noClient")}</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract-file">{t("contract.pdfFile")}</Label>
        <input
          id="contract-file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
        />
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
