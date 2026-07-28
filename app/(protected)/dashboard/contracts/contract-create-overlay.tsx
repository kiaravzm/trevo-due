"use client";

import { DetailOverlay } from "@/components/detail-overlay";
import { t } from "@/lib/i18n";
import { ContractCreateForm } from "./contract-create-form";

type Customer = { id: string; name: string };

type ContractCreateOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: Customer[];
  onSuccess?: () => void;
};

export function ContractCreateOverlay({
  open,
  onOpenChange,
  customers,
  onSuccess,
}: ContractCreateOverlayProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <DetailOverlay open={open} onOpenChange={onOpenChange} title={t("contract.uploadContract")}>
      <ContractCreateForm
        customers={customers}
        onSuccess={handleSuccess}
        onCancel={() => onOpenChange(false)}
      />
    </DetailOverlay>
  );
}
