import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@rinjani/shared-ui";

type PerformanceV2PageVariation = "dashboard-hub" | "workspace-explorer" | "governance-cockpit";
type PerformanceV2SectionBandVariation = "dashboard" | "workspace" | "governance";

const pageVariationConfig: Record<
  PerformanceV2PageVariation,
  {
    className: string;
    surfaceTone: "system-default";
    widthProfile: "dashboard" | "workspace" | "governance";
    maxWidth: string;
  }
> = {
  "dashboard-hub": {
    className: "rounded-[32px] rinjani-page-frame-dashboard",
    surfaceTone: "system-default",
    widthProfile: "dashboard",
    maxWidth: "var(--layout-max-width-dashboard)",
  },
  "workspace-explorer": {
    className: "rounded-[32px] rinjani-page-frame-workspace",
    surfaceTone: "system-default",
    widthProfile: "workspace",
    maxWidth: "var(--layout-max-width-workspace)",
  },
  "governance-cockpit": {
    className: "rounded-[32px] rinjani-page-frame-governance",
    surfaceTone: "system-default",
    widthProfile: "governance",
    maxWidth: "var(--layout-max-width-governance)",
  },
};

export function PerformanceV2PageFrame({
  children,
  variation,
  stickyFooterSafe = false,
  className,
}: {
  children: ReactNode;
  variation: PerformanceV2PageVariation;
  stickyFooterSafe?: boolean;
  className?: string;
}) {
  return (
    <div
      data-slot="performance-page-frame"
      data-variation={variation}
      data-surface-tone={pageVariationConfig[variation].surfaceTone}
      data-width-profile={pageVariationConfig[variation].widthProfile}
      style={{ maxWidth: pageVariationConfig[variation].maxWidth }}
      className={cn(
        "mx-auto w-full space-y-6 px-6 py-6",
        pageVariationConfig[variation].className,
        stickyFooterSafe && "pb-28",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PerformanceV2FilterRail({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="performance-filter-rail"
      data-rail-layout="responsive-inline"
      className={cn("grid items-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

const sectionBandClassName: Record<PerformanceV2SectionBandVariation, string> = {
  dashboard: "rinjani-section-band-dashboard",
  workspace: "rinjani-section-band-workspace",
  governance: "rinjani-section-band-governance",
};

export function PerformanceV2SectionBand({
  children,
  variation,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  variation: PerformanceV2SectionBandVariation;
}) {
  return (
    <section
      data-slot="performance-section-band"
      data-band-variation={variation}
      data-band-surface="system-default"
      className={cn("space-y-4 rounded-[28px] p-4 md:p-5", sectionBandClassName[variation], className)}
      {...props}
    >
      {children}
    </section>
  );
}
