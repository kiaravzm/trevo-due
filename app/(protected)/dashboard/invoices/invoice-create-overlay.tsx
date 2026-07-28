"use client";

import { DetailOverlay } from "@/components/detail-overlay";
import { t } from "@/lib/i18n";
import { InvoiceCreateForm } from "./invoice-create-form";

type Customer = { id: string; name: string };

type InvoiceCreateOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: Customer[];
  onSuccess?: () => void;
};

export function InvoiceCreateOverlay({
  open,
  onOpenChange,
  customers,
  onSuccess,
}: InvoiceCreateOverlayProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <DetailOverlay open={open} onOpenChange={onOpenChange} title={t("invoice.createInvoice")}>
      <InvoiceCreateForm
        customers={customers}
        onSuccess={handleSuccess}
        onCancel={() => onOpenChange(false)}
      />
    </DetailOverlay>
  );
}
