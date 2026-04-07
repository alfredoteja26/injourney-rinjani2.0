import * as React from "react";

import { Badge } from "./badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Progress } from "./progress";
import { cn } from "./utils";

type AnalyticsTone = "neutral" | "success" | "warning" | "destructive";

const toneTextClass: Record<AnalyticsTone, string> = {
  neutral: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

type MetricCardProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: React.ReactNode;
  trendTone?: AnalyticsTone;
  supportingValue?: React.ReactNode;
};

function MetricCard({
  className,
  label,
  value,
  description,
  trend,
  trendTone = "neutral",
  supportingValue,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("gap-3 overflow-hidden", className)} {...props}>
      <CardHeader className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <CardDescription>{label}</CardDescription>
          {trend ? <span className={cn("text-xs font-semibold tabular-nums", toneTextClass[trendTone])}>{trend}</span> : null}
        </div>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      {(description || supportingValue) ? (
        <CardContent className="px-4 pb-4 pt-0">
          {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
          {supportingValue ? <div className="mt-2 text-xs font-medium text-muted-foreground">{supportingValue}</div> : null}
        </CardContent>
      ) : null}
    </Card>
  );
}

type ChartLegendItem = {
  label: string;
  value?: React.ReactNode;
  tone?: "primary" | "secondary" | "accent" | AnalyticsTone;
};

const legendToneClass: Record<NonNullable<ChartLegendItem["tone"]>, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  neutral: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: React.ReactNode;
  legend?: ChartLegendItem[];
  empty?: boolean;
  emptyMessage?: string;
};

function ChartContainer({
  className,
  title,
  description,
  legend,
  empty = false,
  emptyMessage = "No chart data available.",
  children,
  ...props
}: ChartContainerProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description ? <CardDescription className="mt-2">{description}</CardDescription> : null}
          </div>
          {legend?.length ? (
            <div className="flex flex-wrap gap-2">
              {legend.map((item) => (
                <Badge key={item.label} variant="neutral">
                  <span className={cn("size-2 rounded-full", legendToneClass[item.tone ?? "primary"])} aria-hidden="true" />
                  {item.label}
                  {item.value ? <span className="tabular-nums text-muted-foreground">{item.value}</span> : null}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {empty ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

type BarChartItem = {
  label: string;
  value: number;
  detail?: React.ReactNode;
  tone?: "primary" | "secondary" | "accent" | AnalyticsTone;
};

type BarChartProps = React.HTMLAttributes<HTMLDivElement> & {
  data: BarChartItem[];
  yAxisLabel?: string;
  xAxisLabel?: string;
};

function getBarHeight(value: number) {
  if (value >= 50) return "h-32";
  if (value >= 44) return "h-28";
  if (value >= 38) return "h-24";
  if (value >= 32) return "h-20";
  if (value >= 24) return "h-16";
  return "h-12";
}

function BarChart({ className, data, yAxisLabel = "Value", xAxisLabel = "Segment", ...props }: BarChartProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-muted/40 p-4", className)} {...props}>
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{yAxisLabel}</span>
        <span>{xAxisLabel}</span>
      </div>
      <div className="grid grid-cols-[32px_1fr] gap-3">
        <div className="flex flex-col justify-between pb-7 text-right text-[11px] tabular-nums text-muted-foreground">
          <span>60</span>
          <span>30</span>
          <span>0</span>
        </div>
        <div className="relative flex h-56 items-end gap-3 border-l border-b border-border pl-3">
          <div className="pointer-events-none absolute inset-x-3 top-8 border-t border-dashed border-border/80" />
          <div className="pointer-events-none absolute inset-x-3 top-24 border-t border-dashed border-border/80" />
          {data.map((bar) => (
            <div key={bar.label} className="group relative flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full origin-bottom rounded-t-lg transition duration-200 ease-out group-hover:scale-y-105 group-hover:shadow-md",
                  legendToneClass[bar.tone ?? "primary"],
                  getBarHeight(bar.value),
                )}
              />
              <div className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 hidden -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md group-hover:block">
                <p className="whitespace-nowrap font-semibold">{bar.label}</p>
                <p className="mt-1 whitespace-nowrap tabular-nums text-muted-foreground">{bar.detail ?? `${bar.value}%`}</p>
              </div>
              <span className="max-w-full truncate text-xs text-muted-foreground">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ProgressClusterItem = {
  label: string;
  value: number;
  description?: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "destructive";
};

type ProgressClusterProps = React.HTMLAttributes<HTMLDivElement> & {
  items: ProgressClusterItem[];
};

function ProgressCluster({ className, items, ...props }: ProgressClusterProps) {
  return (
    <div className={cn("grid gap-4 rounded-xl border border-border bg-card p-5", className)} {...props}>
      {items.map((item) => (
        <div key={item.label} className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              {item.description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p> : null}
            </div>
            <span className="text-sm font-semibold tabular-nums text-foreground">{item.value}%</span>
          </div>
          <Progress value={item.value} variant={item.variant} />
        </div>
      ))}
    </div>
  );
}

type RankingListItem = {
  label: string;
  description?: React.ReactNode;
  value: React.ReactNode;
  tone?: AnalyticsTone;
};

type RankingListProps = React.HTMLAttributes<HTMLOListElement> & {
  items: RankingListItem[];
};

function RankingList({ className, items, ...props }: RankingListProps) {
  return (
    <ol className={cn("divide-y divide-border rounded-xl border border-border bg-card", className)} {...props}>
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-4 p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{item.label}</p>
            {item.description ? <p className="mt-1 truncate text-xs text-muted-foreground">{item.description}</p> : null}
          </div>
          <span className={cn("text-sm font-semibold tabular-nums", toneTextClass[item.tone ?? "neutral"])}>{item.value}</span>
        </li>
      ))}
    </ol>
  );
}

export { BarChart, ChartContainer, MetricCard, ProgressCluster, RankingList };
export type { BarChartItem, ChartLegendItem, MetricCardProps, ProgressClusterItem, RankingListItem };
