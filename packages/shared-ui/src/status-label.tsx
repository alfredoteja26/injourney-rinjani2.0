import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const statusLabelVariants = cva("inline-flex items-center gap-2 text-sm font-medium", {
  variants: {
    variant: {
      neutral: "text-muted-foreground",
      info: "text-primary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

const statusDotVariants = cva("size-2 rounded-full", {
  variants: {
    variant: {
      neutral: "bg-muted-foreground",
      info: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

type StatusLabelProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusLabelVariants> & {
    showDot?: boolean;
  };

function StatusLabel({ className, variant, showDot = true, children, ...props }: StatusLabelProps) {
  return (
    <span className={cn(statusLabelVariants({ variant }), className)} data-slot="status-label" {...props}>
      {showDot ? <span className={statusDotVariants({ variant })} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export { StatusLabel, statusLabelVariants };
