import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-10 py-16">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            MVP • Proposals and invoices
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Proposals and invoices with a professional feel and instant readability.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            AgencyDocs organizes the essential information with clarity, prioritizing trust,
            legibility, and visual consistency for service teams.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Create proposal</Button>
            <Button variant="secondary" size="lg">
              View example
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Clean UI</CardTitle>
              <CardDescription>Whitespace and clear hierarchy.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Consistent spacing, strong typography, comfortable contrast.
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Trusted software</CardTitle>
              <CardDescription>Reserved palette with confident tone.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Primary blue, soft borders, and subtle shadows build credibility.
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Strong legibility</CardTitle>
              <CardDescription>Comfortable text on every screen.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Inter typography, consistent scale, and applied antialiasing.
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
