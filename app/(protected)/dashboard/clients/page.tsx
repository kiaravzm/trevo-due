import { t } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ClientsCard } from "./clients-card";

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
          <h1 className="text-3xl font-semibold text-foreground">{t("client.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("client.pageDescription")}</p>
        </div>

        <ClientsCard clients={clients} />
      </section>
    </main>
  );
}
