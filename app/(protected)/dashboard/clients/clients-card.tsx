"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";
import { t } from "@/lib/i18n";

import { ClientCreateOverlay } from "./client-create-overlay";
import { ClientListItem } from "./client-list-item";

type Client = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
};

type ClientsCardProps = {
  clients: Client[] | null;
};

export function ClientsCard({ clients }: ClientsCardProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const router = useRouter();

  const handleCreateSuccess = () => {
    setCreateOpen(false);
    router.refresh();
  };

  return (
    <>
      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("client.savedClients")}</CardTitle>
            <CardDescription>{t("client.savedClientsDescription")}</CardDescription>
          </div>
          <Button onClick={() => setCreateOpen(true)}>{t("client.addClient")}</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {clients && clients.length > 0 ? (
            <>
              <div className="hidden grid-cols-[1fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                <span>{t("common.name")}</span>
                <span>{t("common.company")}</span>
                <span>{t("common.email")}</span>
                <span className="w-10" aria-hidden />
              </div>
              {clients.map((client) => (
                <ClientListItem key={client.id} client={client} />
              ))}
            </>
          ) : (
            <EmptyState
              icon={Users}
              title={t("client.noClientsYet")}
              description={t("client.savedClientsDescription")}
              action={
                <Button onClick={() => setCreateOpen(true)}>
                  {t("client.addFirstClient")}
                </Button>
              }
            />
          )}
        </CardContent>
      </Card>
      <ClientCreateOverlay
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
