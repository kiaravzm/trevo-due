import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserSummary } from "./user-summary";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Your workspace is protected by Supabase Auth and RLS-ready policies.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Authenticated user</CardTitle>
            <CardDescription>Live session details from the client hook.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserSummary />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Core workspaces</CardTitle>
            <CardDescription>Jump into the areas where work gets done.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard/clients">Manage clients</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard/contracts">Manage contracts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/invoices">Manage invoices</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/dashboard/billing">Billing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
