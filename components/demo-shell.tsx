"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import logo2x from "@/assets/trevo-due-logo@2x.png";
import { DemoNav } from "@/components/demo-nav";
import { Button } from "@/components/ui/button";

export function DemoShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarContent = (
    <>
      <Link href="/demo" className="mb-6 block px-3 py-2" aria-label="TrevoDue demo dashboard">
        <Image
          src={logo2x}
          alt="TrevoDue"
          width={240}
          height={64}
          className="h-8 w-auto"
          priority
        />
      </Link>
      <DemoNav />
      <div className="mt-6 space-y-2 border-t border-border pt-4">
        <Button asChild variant="outline" size="sm" className="w-full justify-center">
          <Link href="/">Exit demo</Link>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div
        role="status"
        className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-sm text-foreground"
      >
        <span className="font-medium">Demo mode</span>
        <span className="text-muted-foreground">
          {" "}
          — sample data only, read-only. No account required.
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-border bg-card px-4 py-6 md:block">
          {sidebarContent}
        </aside>

        <header className="fixed left-0 right-0 top-[2.5rem] z-40 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/demo" aria-label="TrevoDue demo dashboard">
            <Image
              src={logo2x}
              alt="TrevoDue"
              width={200}
              height={56}
              className="h-7 w-auto"
              priority
            />
          </Link>
        </header>

        {drawerOpen ? (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              aria-hidden
              onClick={() => setDrawerOpen(false)}
            />
            <aside
              className="fixed left-0 top-0 z-50 flex h-full w-56 flex-col border-r border-border bg-card px-4 py-6 md:hidden"
              role="dialog"
              aria-label="Demo navigation"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setDrawerOpen(false);
              }}
            >
              {sidebarContent}
            </aside>
          </>
        ) : null}

        <main className="min-w-0 flex-1 pt-[calc(2.5rem+3.5rem)] md:pt-0">{children}</main>
      </div>
    </div>
  );
}
