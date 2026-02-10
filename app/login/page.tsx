import { Suspense } from "react";
import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in | AgencyDocs",
  description: "Sign in to AgencyDocs with your work email.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="text-sm text-muted-foreground">Loading sign-in...</div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
