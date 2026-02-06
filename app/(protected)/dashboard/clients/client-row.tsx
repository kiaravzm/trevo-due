"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { deleteClientAction, updateClientAction } from "../actions";

type ClientRowProps = {
  client: {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
  };
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

export function ClientRow({ client }: ClientRowProps) {
  const [state, formAction] = useFormState(updateClientAction, initialState);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto]">
        <form action={formAction} className="contents">
          <input type="hidden" name="id" value={client.id} />
          <input
            name="name"
            defaultValue={client.name}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            name="email"
            defaultValue={client.email ?? ""}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Email"
          />
          <input
            name="company"
            defaultValue={client.company ?? ""}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Company"
          />
          <div className="flex items-center gap-2">
            <UpdateButton />
          </div>
        </form>
        <form action={deleteClientAction} className="flex items-center">
          <input type="hidden" name="id" value={client.id} />
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
