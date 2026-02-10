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
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function ClientDetailOverlay({
  client,
  open,
  onOpenChange,
}: ClientDetailOverlayProps) {
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
    toast.success("Client deleted successfully.");
    setDeleteDialogOpen(false);
    onOpenChange(false);
  };

  const footer = isEditing ? null : (
    <>
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Close
      </Button>
      <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        Delete
      </Button>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </>
  );

  return (
    <>
      <DetailOverlay
        open={open}
        onOpenChange={onOpenChange}
        title={client.name}
        footer={footer}
      >
        {isEditing ? (
          <form
            action={formAction}
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="id" value={client.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-client-name">Name</Label>
                <Input
                  id="edit-client-name"
                  name="name"
                  defaultValue={client.name}
                  required
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-client-email">Email (optional)</Label>
                <Input
                  id="edit-client-email"
                  name="email"
                  type="email"
                  defaultValue={client.email ?? ""}
                  placeholder="hello@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-client-company">Company (optional)</Label>
                <Input
                  id="edit-client-company"
                  name="company"
                  defaultValue={client.company ?? ""}
                  placeholder="Company name"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-foreground">{client.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-foreground">{client.email || "—"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p className="text-foreground">{client.company || "—"}</p>
            </div>
          </div>
        )}
      </DetailOverlay>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete client?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {client.name} from your records. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
