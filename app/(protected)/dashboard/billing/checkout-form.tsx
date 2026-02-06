"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { startCheckoutAction } from "../actions";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Redirecting..." : "Start monthly subscription"}
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
