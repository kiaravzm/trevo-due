"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { createClientAction } from "../actions";

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("common.saving") : t("client.addClient")}
    </Button>
  );
}

type ClientCreateFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ClientCreateForm({ onSuccess, onCancel }: ClientCreateFormProps) {
  const [state, formAction] = useFormState(createClientAction, initialState);

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
          <Label htmlFor="client-name">{t("client.clientName")}</Label>
          <Input id="client-name" name="name" required placeholder="Northwind Agency" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-email">{t("common.emailOptional")}</Label>
          <Input id="client-email" name="email" type="email" placeholder="hello@northwind.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-company">{t("common.companyOptional")}</Label>
          <Input id="client-company" name="company" placeholder="Northwind LLC" />
        </div>
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
