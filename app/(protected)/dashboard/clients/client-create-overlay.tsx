"use client";

import { DetailOverlay } from "@/components/detail-overlay";
import { t } from "@/lib/i18n";
import { ClientCreateForm } from "./client-create-form";

type ClientCreateOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function ClientCreateOverlay({
  open,
  onOpenChange,
  onSuccess,
}: ClientCreateOverlayProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <DetailOverlay
      open={open}
      onOpenChange={onOpenChange}
      title={t("client.addClient")}
    >
      <ClientCreateForm
        onSuccess={handleSuccess}
        onCancel={() => onOpenChange(false)}
      />
    </DetailOverlay>
  );
}
