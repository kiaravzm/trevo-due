"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FileText, ExternalLink } from "lucide-react";

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
const statusLabels: Record<string, string> = {
  signed: "Signed",
  draft: "Draft",
  pending: "Pending",
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
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
        if ("url" in result) {
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
    toast.success("Contract deleted successfully.");
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
        title={contract.title}
        footer={footer}
      >
        {isEditing ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={contract.id} />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-contract-title">Title</Label>
                <Input
                  id="edit-contract-title"
                  name="title"
                  defaultValue={contract.title}
                  required
                  placeholder="Contract title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contract-status">Status</Label>
                <select
                  id="edit-contract-status"
                  name="status"
                  defaultValue={contract.status}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="signed">Signed</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contract-customer">Client</Label>
                <select
                  id="edit-contract-customer"
                  name="customer_id"
                  defaultValue={contract.customer_id ?? ""}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">No client</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <SaveButton />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Title</p>
              <p className="text-foreground">{contract.title}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-foreground capitalize">
                {statusLabels[contract.status] ?? contract.status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Client</p>
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
                  View PDF
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Loading link...
                </p>
              )}
            </div>
          </div>
        )}
      </DetailOverlay>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete contract?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove &quot;{contract.title}&quot; and its
              PDF file. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={() => handleDelete()}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
