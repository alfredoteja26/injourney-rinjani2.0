import * as React from "react";

import { cn } from "./utils";

export type AppStickyFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * When true (default), horizontal `left` follows the integrated app shell sidebar via
   * `--rinjani-shell-sidebar-width` (set on `document.documentElement` by `AppShell`). Matches expanded `250px` and
   * collapsed `4rem` + `1rem` gap; `md` transition matches the shell sidebar width animation.
   */
  alignWithShellSidebar?: boolean;
  /**
   * Optional override for `left` inset. When set, replaces shell-based `left` (e.g. custom layouts).
   */
  insetStartClassName?: string;
  /** Max width of the inner content wrapper (with `mx-auto`). */
  contentMaxWidthClassName?: string;
  /** Primary message column; kept **left** when used with `trailing`. */
  leading?: React.ReactNode;
  /** Actions; aligned **end** on `sm+` when used with `leading`. */
  trailing?: React.ReactNode;
};

/**
 * Fixed bottom region for validation copy + primary actions (My KPI submit bar, wizard CTAs).
 * Uses `--shadow-footer-up` from `theme.css` when available.
 */
function AppStickyFooter({
  className,
  alignWithShellSidebar = true,
  insetStartClassName,
  contentMaxWidthClassName = "max-w-7xl",
  leading,
  trailing,
  children,
  ...props
}: AppStickyFooterProps) {
  const useShellLeft = alignWithShellSidebar !== false && !insetStartClassName;

  const inner =
    leading != null && trailing != null ? (
      <div
        className={cn(
          "mx-auto grid w-full max-w-full grid-cols-1 gap-3 px-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
          contentMaxWidthClassName
        )}
      >
        <div className="min-w-0 justify-self-start rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-left shadow-sm">
          {leading}
        </div>
        <div className="flex min-w-0 flex-wrap justify-start gap-2 justify-self-stretch sm:justify-self-end sm:justify-end">
          {trailing}
        </div>
      </div>
    ) : (
      <div className={cn("mx-auto w-full max-w-full px-6", contentMaxWidthClassName)}>{children}</div>
    );

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 border-t border-border/70 py-3 backdrop-blur-md",
        "bg-background/75 supports-[backdrop-filter]:bg-background/55",
        "shadow-[var(--shadow-footer-up)] ring-0 outline-none",
        useShellLeft &&
          "md:left-[var(--rinjani-shell-sidebar-width)] md:transition-[left] md:duration-300 md:ease-out",
        insetStartClassName,
        className
      )}
      data-slot="app-sticky-footer"
      {...props}
    >
      {inner}
    </div>
  );
}

export { AppStickyFooter };
