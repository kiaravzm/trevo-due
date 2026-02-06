"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { deleteContractAction, updateContractAction } from "../actions";

type ContractRowProps = {
  contract: {
    id: string;
    title: string;
    status: string;
    customer_id: string | null;
    file_path: string;
  };
  customers: Array<{ id: string; name: string }>;
};

const initialState = { status: "idle" as const, message: null as string | null };

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function ContractRow({ contract, customers }: ContractRowProps) {
  const [state, formAction] = useFormState(updateContractAction, initialState);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-[1.5fr,1fr,1fr,auto]">
        <form action={formAction} className="contents">
          <input type="hidden" name="id" value={contract.id} />
          <input
            name="title"
            defaultValue={contract.title}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <select
            name="status"
            defaultValue={contract.status}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="signed">Signed</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
          <select
            name="customer_id"
            defaultValue={contract.customer_id ?? ""}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">No client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <UpdateButton />
          </div>
        </form>
        <form action={deleteContractAction} className="flex items-center">
          <input type="hidden" name="id" value={contract.id} />
          <input type="hidden" name="file_path" value={contract.file_path} />
          <Button type="submit" variant="outline" className="text-destructive">
            Delete
          </Button>
        </form>
      </div>

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
    </div>
  );
}
