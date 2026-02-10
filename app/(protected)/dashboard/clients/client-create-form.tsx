"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientAction } from "../actions";

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Add client"}
    </Button>
  );
}

export function ClientCreateForm() {
  const [state, formAction] = useFormState(createClientAction, initialState);

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
          <Label htmlFor="client-name">Client name</Label>
          <Input
            id="client-name"
            name="name"
            required
            placeholder="Northwind Agency"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-email">Email (optional)</Label>
          <Input
            id="client-email"
            name="email"
            type="email"
            placeholder="hello@northwind.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-company">Company (optional)</Label>
          <Input
            id="client-company"
            name="company"
            placeholder="Northwind LLC"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
