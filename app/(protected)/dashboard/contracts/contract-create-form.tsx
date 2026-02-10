"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContractAction } from "../actions";

type ContractCreateFormProps = {
  customers: Array<{ id: string; name: string }>;
};

const initialState = { status: "idle" as const, message: null as string | null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload contract"}
    </Button>
  );
}

export function ContractCreateForm({ customers }: ContractCreateFormProps) {
  const [state, formAction] = useFormState(createContractAction, initialState);

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="contract-title">Contract title</Label>
          <Input
            id="contract-title"
            name="title"
            required
            placeholder="Master Services Agreement"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contract-status">Status</Label>
          <select
            id="contract-status"
            name="status"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue="signed"
          >
            <option value="signed">Signed</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contract-client">Client (optional)</Label>
          <select
            id="contract-client"
            name="customer_id"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue=""
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

      <div className="space-y-2">
        <Label htmlFor="contract-file">PDF file</Label>
        <input
          id="contract-file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
