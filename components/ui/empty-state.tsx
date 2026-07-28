import * as React from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-8 py-12 text-center",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </div>
      ) : null}
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
      {children}
    </div>
  );
}

export { EmptyState };
