import Link from "next/link";
import Image from "next/image";

import logo2x from "@/assets/trevo-due-logo@2x.png";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";

export async function SiteHeader() {
  let user = null;

  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user = authUser;
  } catch {
    // Auth is optional on the marketing site (e.g. paused Supabase during local/demo use).
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" aria-label="TrevoDue - Página inicial">
          <Image
            src={logo2x}
            alt="TrevoDue"
            width={240}
            height={64}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <LogoutButton variant="outline" size="sm" />
            </>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/login?next=/dashboard">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
