"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { startCheckoutAction } from "../actions";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? t("billing.redirecting") : t("billing.startMonthlySubscription")}
    </Button>
  );
}

export function CheckoutForm() {
  return (
    <form action={startCheckoutAction}>
      <CheckoutButton />
    </form>
  );
}
