"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { t } from "@/lib/i18n";

const segmentLabelKeys: Record<string, string> = {
  dashboard: "nav.dashboard",
  clients: "nav.clients",
  invoices: "nav.invoices",
  contracts: "nav.contracts",
  billing: "nav.billing",
  settings: "nav.settings",
};

function getBreadcrumbItems(pathname: string): { label: string; href: string | null }[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard")) {
    return [{ label: t("nav.dashboard"), href: "/dashboard" }];
  }
  const items: { label: string; href: string | null }[] = [];
  let href = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    href += `/${segment}`;
    const labelKey = segmentLabelKeys[segment];
    const label = labelKey ? t(labelKey) : segment.charAt(0).toUpperCase() + segment.slice(1);
    items.push({
      label,
      href: i < segments.length - 1 ? href : null,
    });
  }
  return items;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname.startsWith("/dashboard")) return null;
  const items = getBreadcrumbItems(pathname);
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm">
      {items.map((item, i) => (
        <span key={item.href ?? item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
