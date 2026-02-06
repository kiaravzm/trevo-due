"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

type UploadState = "idle" | "uploading" | "success";

export function ContractUpload() {
  const { user, loading } = useAuthUser();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isPdf = (selectedFile: File) => {
    return selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setError(null);
    setStatus("idle");

    if (!selected) {
      setFile(null);
      return;
    }

    if (!isPdf(selected)) {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!user) {
      setError("You must be signed in to upload contracts.");
      return;
    }

    if (!file) {
      setError("Select a PDF file before uploading.");
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const filename = `${crypto.randomUUID()}.pdf`;
      const path = `${user.id}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("contracts")
        .upload(path, file, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      setStatus("success");
      setFile(null);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">Upload a signed contract</h3>
        <p className="text-sm text-muted-foreground">
          Files are stored in a private bucket and only visible to the account owner.
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={loading || status === "uploading"}
          className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
        />

        <Button onClick={handleUpload} disabled={loading || status === "uploading" || !file}>
          {status === "uploading" ? "Uploading..." : "Upload PDF"}
        </Button>

        {status === "success" ? (
          <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
            Contract uploaded securely.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
