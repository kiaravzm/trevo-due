import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ContractCreateForm } from "./contract-create-form";
import { ContractRow } from "./contract-row";

export default async function ContractsPage() {
  const supabase = createSupabaseServerClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, title, status, customer_id, file_path")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Contracts</h1>
          <p className="text-sm text-muted-foreground">
            Upload signed agreements securely and keep them tied to the right client.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Upload contract</CardTitle>
            <CardDescription>PDF files are stored privately and scoped to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContractCreateForm customers={customers ?? []} />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Saved contracts</CardTitle>
            <CardDescription>Update status or remove obsolete files.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts && contracts.length > 0 ? (
              contracts.map((contract) => (
                <ContractRow
                  key={contract.id}
                  contract={contract}
                  customers={customers ?? []}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No contracts yet. Upload your first PDF above.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
