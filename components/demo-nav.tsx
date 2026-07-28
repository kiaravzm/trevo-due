"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, FileSignature, type LucideIcon } from "lucide-react";

import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navItems: { href: string; labelKey: string; icon: LucideIcon }[] = [
  { href: "/demo", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/demo/clients", labelKey: "nav.clients", icon: Users },
  { href: "/demo/invoices", labelKey: "nav.invoices", icon: FileText },
  { href: "/demo/contracts", labelKey: "nav.contracts", icon: FileSignature },
];

export function DemoNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ href, labelKey, icon: Icon }) => {
        const isActive = href === "/demo" ? pathname === "/demo" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary-soft text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
