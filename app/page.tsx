import type { Metadata } from "next";
import Link from "next/link";
import { FileSignature, FileText, LayoutDashboard } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "TrevoDue — Simple contract and invoice tracking",
  description:
    "Contract and invoice tracking for people who want clarity — not accounting software.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-3.5rem)] bg-background">
        {/* Hero */}
        <section
          className="landing-gradient-hero relative container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6 md:py-24"
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="font-logo text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Simple contract and invoice tracking.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Know who owes you, how much, and when — without accounting software.
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            Designed for independent professionals and small service businesses.
          </p>
          <div className="flex flex-col items-center gap-2 pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/login">Start free trial</Link>
            </Button>
            <span className="text-sm text-muted-foreground">No credit card required</span>
          </div>
        </section>

        {/* O problema */}
        <section
          className="border-t border-border bg-muted/30 py-16 md:py-24"
          aria-labelledby="problem-heading"
        >
          <div className="container px-4 sm:px-6">
            <h2
              id="problem-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              The problem
            </h2>
            <div className="mt-6 max-w-2xl space-y-3 text-base text-muted-foreground">
              <p>Client work is simple.</p>
              <p>Most tools are not.</p>
              <p>Spreadsheets break.</p>
              <p>Accounting software overwhelms.</p>
              <p>Invoices end up scattered.</p>
              <p>You&apos;re left guessing instead of knowing.</p>
            </div>
          </div>
        </section>

        {/* A solução */}
        <section
          className="border-t border-border py-16 md:py-24"
          aria-labelledby="solution-heading"
        >
          <div className="container px-4 sm:px-6">
            <h2
              id="solution-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              The solution
            </h2>
            <p className="mt-6 max-w-2xl text-base text-foreground">
              This app gives you <strong>clarity over contracts and invoices</strong> — nothing
              more.
            </p>
            <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-base text-muted-foreground">
              <li>Track contracts</li>
              <li>Create and manage invoices</li>
              <li>See what&apos;s paid, pending, or overdue</li>
              <li>Get reminders before things slip</li>
            </ul>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              No setup. No financial jargon. No unnecessary features.
            </p>
          </div>
        </section>

        {/* Como funciona */}
        <section
          className="border-t border-border bg-primary-soft/50 py-16 md:py-24"
          aria-labelledby="how-heading"
        >
          <div className="container px-4 sm:px-6">
            <h2
              id="how-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              How it works
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <Card className="border-border/80 bg-card/95 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileSignature className="h-6 w-6" aria-hidden />
                  </div>
                  <CardTitle className="text-base">1. Add a contract</CardTitle>
                  <CardDescription>Add a contract or upload a signed agreement</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/80 bg-card/95 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" aria-hidden />
                  </div>
                  <CardTitle className="text-base">2. Create an invoice</CardTitle>
                  <CardDescription>Create an invoice in minutes</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/80 bg-card/95 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <LayoutDashboard className="h-6 w-6" aria-hidden />
                  </div>
                  <CardTitle className="text-base">3. See status at a glance</CardTitle>
                  <CardDescription>See payment status at a glance</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <p className="mt-8 text-base font-medium text-foreground">That&apos;s it.</p>
          </div>
        </section>

        {/* Para quem é */}
        <section
          className="border-t border-border py-16 md:py-24"
          aria-labelledby="audience-heading"
        >
          <div className="container px-4 sm:px-6">
            <h2
              id="audience-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Who it&apos;s for
            </h2>
            <p className="mt-6 text-base font-medium text-foreground">Built for:</p>
            <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-base text-muted-foreground">
              <li>Freelancers and independent professionals</li>
              <li>Consultants and solo service providers</li>
              <li>Small service businesses with client-based work</li>
            </ul>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Not built for accounting, taxes, inventory, or large teams.
            </p>
          </div>
        </section>

        {/* Confiança */}
        <section
          className="border-t border-border bg-muted/30 py-16 md:py-24"
          aria-labelledby="trust-heading"
        >
          <div className="container px-4 sm:px-6">
            <h2
              id="trust-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Trust
            </h2>
            <div className="mt-6 max-w-2xl space-y-3 text-base text-muted-foreground">
              <p>Your data is secure.</p>
              <p>Your workflow stays simple.</p>
              <p>Your focus stays on your work.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          className="border-t border-border py-16 md:py-24"
          aria-labelledby="pricing-heading"
        >
          <div className="container px-4 text-center sm:px-6">
            <h2
              id="pricing-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Pricing
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
              One simple plan. Free trial included. Cancel anytime.
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section
          className="landing-gradient-cta border-t border-border py-16 md:py-24"
          aria-labelledby="cta-heading"
        >
          <div className="container flex flex-col items-center gap-6 px-4 text-center sm:px-6">
            <h2
              id="cta-heading"
              className="font-logo text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Stop guessing. Start tracking.
            </h2>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/login">Start your free trial today.</Link>
            </Button>
          </div>
        </section>

        {/* Frase final / Rodapé */}
        <footer className="border-t border-border py-12">
          <div className="container px-4 sm:px-6">
            <blockquote className="max-w-2xl text-center text-sm italic text-muted-foreground">
              Contract and invoice tracking for people who want clarity — not accounting software.
            </blockquote>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              © TrevoDue ·{" "}
              <Link href="/login" className="underline hover:text-foreground">
                Sign in
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
