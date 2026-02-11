"use client";

import { useAuthUser } from "@/lib/hooks/use-auth-user";
import { t } from "@/lib/i18n";

export function UserSummary() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return <p className="text-sm text-muted-foreground">{t("settings.loadingUser")}</p>;
  }

  if (!user) {
    return <p className="text-sm text-muted-foreground">{t("settings.noUserSession")}</p>;
  }

  return (
    <div className="space-y-2 text-sm text-foreground">
      <p>
        <span className="font-medium">{t("common.email")}:</span> {user.email}
      </p>
      <p>
        <span className="font-medium">{t("common.userId")}:</span> {user.id}
      </p>
    </div>
  );
}
