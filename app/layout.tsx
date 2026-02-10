import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
