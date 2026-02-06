"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
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

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contract-title">
            Contract title
          </label>
          <input
            id="contract-title"
            name="title"
            required
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Master Services Agreement"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contract-status">
            Status
          </label>
          <select
            id="contract-status"
            name="status"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue="signed"
          >
            <option value="signed">Signed</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contract-client">
            Client (optional)
          </label>
          <select
            id="contract-client"
            name="customer_id"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
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
        <label className="text-sm font-medium text-foreground" htmlFor="contract-file">
          PDF file
        </label>
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

      {state.message ? (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            state.status === "success"
              ? "border-border bg-secondary text-secondary-foreground"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
