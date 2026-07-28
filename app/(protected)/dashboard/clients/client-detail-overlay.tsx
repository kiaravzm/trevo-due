"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailOverlay } from "@/components/detail-overlay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { t } from "@/lib/i18n";
import { deleteClientAction, updateClientAction } from "../actions";

type Client = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
};

type ClientDetailOverlayProps = {
  client: Client;
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

export function ClientDetailOverlay({ client, open, onOpenChange }: ClientDetailOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [state, formAction] = useFormState(updateClientAction, initialState);

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
    formData.set("id", client.id);
    await deleteClientAction(formData);
    toast.success(t("actions.clientDeleted"));
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
      <DetailOverlay open={open} onOpenChange={onOpenChange} title={client.name} footer={footer}>
        {isEditing ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={client.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-client-name">{t("common.name")}</Label>
                <Input
                  id="edit-client-name"
                  name="name"
                  defaultValue={client.name}
                  required
                  placeholder={t("client.clientName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-client-email">{t("common.emailOptional")}</Label>
                <Input
                  id="edit-client-email"
                  name="email"
                  type="email"
                  defaultValue={client.email ?? ""}
                  placeholder={t("client.editEmailPlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-client-company">{t("common.companyOptional")}</Label>
                <Input
                  id="edit-client-company"
                  name="company"
                  defaultValue={client.company ?? ""}
                  placeholder={t("client.companyNamePlaceholder")}
                />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                {t("common.cancel")}
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.name")}</p>
              <p className="text-foreground">{client.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.email")}</p>
              <p className="text-foreground">{client.email || "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t("common.company")}</p>
              <p className="text-foreground">{client.company || "—"}</p>
            </div>
          </div>
        )}
      </DetailOverlay>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("client.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("client.deleteDescription", { name: client.name })}
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
