import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "@/lib/billing/subscription";

import { ContractCreateForm } from "./contract-create-form";
import { ContractListItem } from "./contract-list-item";
import { PaywallCard } from "../billing/paywall-card";

export default async function ContractsPage() {
  const subscriptionStatus = await getSubscriptionStatus();
  const supabase = createSupabaseServerClient();
  const { count } = await supabase
    .from("contracts")
    .select("id", { count: "exact", head: true });
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, title, status, customer_id, file_path")
    .order("created_at", { ascending: false });

  const contractCount = count ?? 0;
  const limitReached = subscriptionStatus === "inactive" && contractCount >= 3;

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Contracts</h1>
          <p className="text-sm text-muted-foreground">
            Upload signed agreements securely and keep them tied to the right client.
          </p>
        </div>

        {limitReached ? (
          <PaywallCard
            title="You've reached the free contract limit"
            description="Upgrade to keep unlimited agreements in your workspace."
          />
        ) : (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Upload contract</CardTitle>
              <CardDescription>
                PDF files are stored privately and scoped to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContractCreateForm customers={customers ?? []} />
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Saved contracts</CardTitle>
            <CardDescription>Update status or remove obsolete files.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts && contracts.length > 0 ? (
              <>
                <div className="hidden grid-cols-[1.5fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                  <span>Title</span>
                  <span>Status</span>
                  <span>Client</span>
                  <span className="w-10" aria-hidden />
                </div>
                {contracts.map((contract) => (
                  <ContractListItem
                    key={contract.id}
                    contract={contract}
                    customers={customers ?? []}
                  />
                ))}
              </>
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
