import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AgencyDocs",
  description:
    "Create proposals and invoices that feel professional, fast to build, and easy to read.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans")}>{children}</body>
    </html>
  );
}
