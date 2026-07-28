import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        success:
          "border-transparent bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] font-medium",
        warning:
          "border-transparent bg-[hsl(var(--warning)/0.2)] text-[hsl(var(--warning))] font-medium",
        error:
          "border-transparent bg-[hsl(var(--error)/0.12)] text-[hsl(var(--error))] font-medium",
        outline: "border border-border text-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** Badge de status para faturas/contratos – usa ícone + texto para não depender só de cor */
function StatusBadge({
  status,
  label,
  className,
}: {
  status: "paid" | "open" | "overdue" | "signed" | "pending" | "draft";
  label: string;
  className?: string;
}) {
  const config: Record<
    string,
    { variant: "success" | "warning" | "error" | "secondary"; dotColor: string }
  > = {
    paid: { variant: "success", dotColor: "bg-[hsl(var(--success))]" },
    signed: { variant: "success", dotColor: "bg-[hsl(var(--success))]" },
    open: { variant: "warning", dotColor: "bg-[hsl(var(--warning))]" },
    pending: { variant: "warning", dotColor: "bg-[hsl(var(--warning))]" },
    draft: { variant: "secondary", dotColor: "bg-muted-foreground" },
    overdue: { variant: "error", dotColor: "bg-[hsl(var(--error))]" },
  };
  const { variant, dotColor } = config[status] ?? {
    variant: "secondary" as const,
    dotColor: "bg-muted-foreground",
  };

  return (
    <span
      className={cn(badgeVariants({ variant }), "inline-flex items-center gap-1.5", className)}
      role="status"
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} aria-hidden />
      {label}
    </span>
  );
}

export { Badge, StatusBadge, badgeVariants };
