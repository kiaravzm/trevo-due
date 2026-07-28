import type { Metadata } from "next";

import { DemoShell } from "@/components/demo-shell";

export const metadata: Metadata = {
  title: "Demo | TrevoDue",
  description: "Explore a read-only demo of the TrevoDue dashboard with sample data.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
