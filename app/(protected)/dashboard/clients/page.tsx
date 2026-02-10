import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ClientCreateForm } from "./client-create-form";
import { ClientListItem } from "./client-list-item";

export default async function ClientsPage() {
  const supabase = createSupabaseServerClient();
  const { data: clients } = await supabase
    .from("customers")
    .select("id, name, email, company")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Keep client records organized and ready for new proposals or invoices.
          </p>
        </div>

        <Card className="shadow-soft" id="add-client">
          <CardHeader>
            <CardTitle>Add client</CardTitle>
            <CardDescription>Save contact details so documents stay consistent.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientCreateForm />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Saved clients</CardTitle>
            <CardDescription>Update or remove records as your list grows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clients && clients.length > 0 ? (
              <>
                <div className="hidden grid-cols-[1fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                  <span>Name</span>
                  <span>Company</span>
                  <span>Email</span>
                  <span className="w-10" aria-hidden />
                </div>
                {clients.map((client) => (
                  <ClientListItem key={client.id} client={client} />
                ))}
              </>
            ) : (
              <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">No clients yet.</p>
                <Button asChild variant="secondary" size="sm" className="self-center">
                  <Link href="#add-client">Add your first client</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
