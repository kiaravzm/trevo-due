"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FileText, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DetailOverlay } from "@/components/detail-overlay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { contractStatusLabel, t } from "@/lib/i18n";
import {
  deleteContractAction,
  getContractSignedUrlAction,
  updateContractAction,
} from "../actions";

type Contract = {
  id: string;
  title: string;
  status: string;
  customer_id: string | null;
  file_path: string;
};

type Customer = { id: string; name: string };

type ContractDetailOverlayProps = {
  contract: Contract;
  customers: Customer[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const initialState = { status: "idle" as const, message: null as string | null };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("common.saving") : t("common.save")}
    </Button>
  );
}

export function ContractDetailOverlay({
  contract,
  customers,
  open,
  onOpenChange,
}: ContractDetailOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [state, formAction] = useFormState(updateContractAction, initialState);

  const customerName =
    customers.find((c) => c.id === contract.customer_id)?.name ?? null;

  useEffect(() => {
    if (open && contract.file_path) {
      getContractSignedUrlAction(contract.file_path).then((result) => {
        if ("url" in result && result.url) {
          setPdfUrl(result.url);
        } else {
          setPdfUrl(null);
        }
      });
    } else if (!open) {
      setPdfUrl(null);
    }
  }, [open, contract.file_path]);

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message);
      onOpenChange(false);
      setIsEditing(false);
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state.status, state.message, onOpenChange]);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.set("id", contract.id);
    formData.set("file_path", contract.file_path);
    await deleteContractAction(formData);
    toast.success(t("actions.contractDeleted"));
    setDeleteDialogOpen(false);
    onOpenChange(false);
  };

  const footer = isEditing ? null : (
    <>
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        {t("common.close")}
      </Button>
      <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        {t("common.delete")}
      </Button>
      <Button onClick={() => setIsEditing(true)}>{t("common.edit")}</Button>
    </>
  );

  return (
    <>
      <DetailOverlay
        open={open}
        onOpenChange={onOpenChange}
        title={contract.title}
        footer={footer}
      >
        {isEditing ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={contract.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-contract-title">{t("contract.titleLabel")}</Label>
                <Input
                  id="edit-contract-title"
                  name="title"
                  defaultValue={contract.title}
                  required
                  placeholder={t("contract.contractTitle")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contract-status">{t("common.status")}</Label>
                <Select
                  id="edit-contract-status"
                  name="status"
                  defaultValue={contract.status}
                >
                  <option value="signed">{t("contract.status.signed")}</option>
                  <option value="draft">{t("contract.status.draft")}</option>
                  <option value="pending">{t("contract.status.pending")}</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contract-customer">{t("common.client")}</Label>
                <Select
                  id="edit-contract-customer"
                  name="customer_id"
                  defaultValue={contract.customer_id ?? ""}
                >
                  <option value="">{t("common.noClient")}</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                {t("common.cancel")}
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("contract.titleLabel")}</p>
              <p className="text-foreground">{contract.title}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.status")}</p>
              <p className="text-foreground capitalize">
                {contractStatusLabel(contract.status)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.client")}</p>
              <p className="text-foreground">{customerName || "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">PDF</p>
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <FileText className="h-4 w-4" />
                  {t("contract.viewPdf")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("contract.loadingLink")}
                </p>
              )}
            </div>
          </div>
        )}
      </DetailOverlay>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("contract.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("contract.deleteDescription", { title: contract.title })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <Button variant="destructive" onClick={() => handleDelete()}>
              {t("common.delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
