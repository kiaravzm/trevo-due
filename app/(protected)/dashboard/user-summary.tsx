"use client";

import { useAuthUser } from "@/lib/hooks/use-auth-user";

export function UserSummary() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading user...</p>;
  }

  if (!user) {
    return <p className="text-sm text-muted-foreground">No user session found.</p>;
  }

  return (
    <div className="space-y-2 text-sm text-foreground">
      <p>
        <span className="font-medium">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-medium">User ID:</span> {user.id}
      </p>
    </div>
  );
}
