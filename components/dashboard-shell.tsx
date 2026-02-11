"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import logo2x from "@/assets/trevo-due-logo@2x.png";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DashboardNav } from "@/components/dashboard-nav";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarContent = (
    <>
      <Link
        href="/dashboard"
        className="mb-6 block px-3 py-2"
        aria-label="TrevoDue - Ir para o dashboard"
      >
        <Image
          src={logo2x}
          alt="TrevoDue"
          width={240}
          height={64}
          className="h-8 w-auto"
          priority
        />
      </Link>
      <DashboardNav />
      <div className="mt-6 pt-4 border-t border-border">
        <LogoutButton variant="outline" size="sm" className="w-full justify-center" />
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card px-4 py-6 md:block">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link
          href="/dashboard"
          aria-label="TrevoDue - Ir para o dashboard"
        >
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

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            aria-hidden
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            className="fixed left-0 top-0 z-50 flex h-full w-56 flex-col border-r border-border bg-card px-4 py-6 transition-transform md:hidden"
            role="dialog"
            aria-label="Menu de navegação"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setDrawerOpen(false);
            }}
          >
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Main content - add top padding on mobile for fixed header */}
      <main className="min-w-0 flex-1 pt-14 md:pt-0">
        <div className="container px-4 py-4 md:px-6">
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </div>
  );
}
