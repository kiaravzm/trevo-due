import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ClientCreateForm } from "./client-create-form";
import { ClientRow } from "./client-row";

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

        <Card className="shadow-soft">
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
              clients.map((client) => <ClientRow key={client.id} client={client} />)
            ) : (
              <p className="text-sm text-muted-foreground">No clients yet. Add the first one above.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
