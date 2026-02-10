"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContractDetailOverlay } from "./contract-detail-overlay";

type Contract = {
  id: string;
  title: string;
  status: string;
  customer_id: string | null;
  file_path: string;
};

type Customer = { id: string; name: string };

type ContractListItemProps = {
  contract: Contract;
  customers: Customer[];
};

const statusLabels: Record<string, string> = {
  signed: "Signed",
  draft: "Draft",
  pending: "Pending",
};

export function ContractListItem({ contract, customers }: ContractListItemProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const customerName =
    customers.find((c) => c.id === contract.customer_id)?.name ?? "—";

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
        <div className="grid min-w-0 flex-1 gap-1 md:grid-cols-[1.5fr,1fr,1fr]">
          <span className="truncate font-medium text-foreground">
            {contract.title}
          </span>
          <span className="truncate text-sm capitalize text-muted-foreground">
            {statusLabels[contract.status] ?? contract.status}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {customerName}
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
          aria-label="View or edit contract"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <ContractDetailOverlay
        contract={contract}
        customers={customers}
        open={overlayOpen}
        onOpenChange={setOverlayOpen}
      />
    </>
  );
}
