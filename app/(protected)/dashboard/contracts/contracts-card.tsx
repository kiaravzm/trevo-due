"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { FileSignature } from "lucide-react";
import { t } from "@/lib/i18n";

import { ContractCreateOverlay } from "./contract-create-overlay";
import { ContractListItem } from "./contract-list-item";

type Contract = {
  id: string;
  title: string;
  status: string;
  customer_id: string | null;
  file_path: string;
};

type Customer = { id: string; name: string };

type ContractsCardProps = {
  contracts: Contract[] | null;
  customers: Customer[];
  limitReached: boolean;
};

export function ContractsCard({ contracts, customers, limitReached }: ContractsCardProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const router = useRouter();

  const handleCreateSuccess = () => {
    setCreateOpen(false);
    router.refresh();
  };

  return (
    <>
      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("contract.savedContracts")}</CardTitle>
            <CardDescription>{t("contract.savedDescription")}</CardDescription>
          </div>
          <Button onClick={() => setCreateOpen(true)} disabled={limitReached}>
            {t("contract.uploadContract")}
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {contracts && contracts.length > 0 ? (
            <>
              <div className="hidden grid-cols-[1.5fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                <span>{t("contract.titleHeader")}</span>
                <span>{t("common.status")}</span>
                <span>{t("common.client")}</span>
                <span className="w-10" aria-hidden />
              </div>
              {contracts.map((contract) => (
                <ContractListItem key={contract.id} contract={contract} customers={customers} />
              ))}
            </>
          ) : (
            <EmptyState
              icon={FileSignature}
              title={t("contract.noContractsYet")}
              description={t("contract.savedDescription")}
              action={
                !limitReached && (
                  <Button onClick={() => setCreateOpen(true)}>
                    {t("contract.uploadContract")}
                  </Button>
                )
              }
            />
          )}
        </CardContent>
      </Card>
      {!limitReached && (
        <ContractCreateOverlay
          open={createOpen}
          onOpenChange={setCreateOpen}
          customers={customers}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
}
