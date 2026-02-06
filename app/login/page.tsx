import { Suspense } from "react";

import { LoginForm } from "./login-form";

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
