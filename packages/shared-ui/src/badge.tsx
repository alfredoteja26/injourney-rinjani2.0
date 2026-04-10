import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex min-h-5 w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md px-2 py-0 text-center align-middle text-xs font-medium leading-5 tracking-wide normal-case transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        neutral: "border border-border bg-muted text-muted-foreground",
        info: "border border-primary/15 bg-primary/10 text-primary",
        success: "border border-success/20 bg-success-muted text-success",
        warning: "border border-warning/20 bg-warning-muted text-warning",
        destructive: "border border-destructive/20 bg-destructive/10 text-destructive",
        attention: "border border-secondary/25 bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return <Comp className={cn(badgeVariants({ variant, className }))} data-slot="badge" {...props} />;
}

export { Badge, badgeVariants };
