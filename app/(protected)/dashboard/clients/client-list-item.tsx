"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClientDetailOverlay } from "./client-detail-overlay";

type Client = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
};

type ClientListItemProps = {
  client: Client;
};

export function ClientListItem({ client }: ClientListItemProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOverlayOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOverlayOpen(true);
          }
        }}
        className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="grid min-w-0 flex-1 gap-1 md:grid-cols-[1fr,1fr,1fr]">
          <span className="truncate font-medium text-foreground">{client.name}</span>
          <span className="truncate text-sm text-muted-foreground">
            {client.company || "—"}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {client.email || "—"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            setOverlayOpen(true);
          }}
          aria-label="View or edit client"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <ClientDetailOverlay
        client={client}
        open={overlayOpen}
        onOpenChange={setOverlayOpen}
      />
    </>
  );
}
