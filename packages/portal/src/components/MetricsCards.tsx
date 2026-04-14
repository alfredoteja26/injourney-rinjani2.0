import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Badge, Card } from "@rinjani/shared-ui";

const metricToneClasses = {
  info: "border-primary/20 bg-primary/5",
  success: "border-success/20 bg-success-muted/70",
  warning: "border-warning/20 bg-warning-muted/80",
  destructive: "border-destructive/20 bg-destructive/5",
} as const;

const metricChangeVariants = {
  info: "info",
  success: "success",
  warning: "warning",
  destructive: "destructive",
} as const;

export function MetricsCards() {
  const metrics = [
    {
      title: "Performance Index",
      value: "107.45",
      subtitle: "From Last Quarter",
      change: "+12.5%",
      tone: "info",
    },
    {
      title: "Learning Progress",
      value: "85.83",
      subtitle: "Course Completion",
      change: "+8.2%",
      tone: "success",
    },
    {
      title: "Career Development",
      value: "On Track",
      subtitle: "Next Review: 2 months",
      change: "High",
      tone: "warning",
    },
    {
      title: "Action Required",
      value: "3 Items",
      subtitle: "Pending Approval",
      change: "Urgent",
      tone: "destructive",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          className={`relative overflow-hidden rounded-[24px] border p-5 shadow-sm ${metricToneClasses[metric.tone]}`}
        >
          <div className="relative z-10">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{metric.value}</h3>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              <p className="text-sm leading-6 text-muted-foreground">{metric.subtitle}</p>
              <Badge
                variant={metricChangeVariants[metric.tone]}
                className="inline-flex px-2.5 py-0 text-[10px] font-semibold uppercase tracking-[0.12em]"
              >
                <TrendingUp className="size-3" />
                <span>{metric.change}</span>
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
