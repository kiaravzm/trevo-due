import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string;
  description?: string;
  statusLabel?: string;
  statusTone?: "neutral" | "success" | "warning" | "danger";
};

const statusToneClasses: Record<NonNullable<MetricCardProps["statusTone"]>, string> = {
  neutral: "text-muted-foreground",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600",
};

export function MetricCard({
  title,
  value,
  description,
  statusLabel,
  statusTone = "neutral",
}: MetricCardProps) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description || statusLabel ? (
          <CardDescription>
            {description}
            {statusLabel ? (
              <span className={cn("ml-2 font-medium", statusToneClasses[statusTone])}>
                {statusLabel}
              </span>
            ) : null}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
