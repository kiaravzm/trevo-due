import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";

export async function SiteHeader() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-foreground/90"
        >
          <span className="text-lg">AgencyDocs</span>
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
