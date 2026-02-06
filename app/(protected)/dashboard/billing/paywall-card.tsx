import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PaywallCardProps = {
  title: string;
  description: string;
};

export function PaywallCard({ title, description }: PaywallCardProps) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You can keep using clients for free. Upgrade only when you need contract storage or
          invoice tracking.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard/billing">See monthly plan</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/dashboard">Return to dashboard</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Clear pricing, no surprise charges, and you can cancel anytime.
        </p>
      </CardContent>
    </Card>
  );
}
