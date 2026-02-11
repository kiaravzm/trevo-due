import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["600"],
  display: "swap",
});

const baseUrl =
  process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "TrevoDue",
  description:
    "Simple contract and invoice management for independent professionals and small service businesses.",
  icons: {
    icon: "/icon.png?v=trevodue",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased",
          inter.variable,
          manrope.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
