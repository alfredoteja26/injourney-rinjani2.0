import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const actionChipVariants = cva(
  "inline-flex min-h-8 w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-3 text-sm font-medium leading-none normal-case outline-none transition-[background-color,border-color,color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        neutral: "border-border bg-card text-foreground hover:bg-muted",
        selected: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/15",
        attention: "border-secondary/25 bg-secondary/10 text-secondary hover:bg-secondary/15",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15",
      },
      size: {
        sm: "min-h-7 px-2.5 text-xs",
        md: "min-h-8 px-3 text-sm",
        lg: "min-h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

interface ActionChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionChipVariants> {
  asChild?: boolean;
}

const ActionChip = React.forwardRef<HTMLButtonElement, ActionChipProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp ref={ref} className={cn(actionChipVariants({ variant, size, className }))} data-slot="action-chip" {...props} />;
  },
);
ActionChip.displayName = "ActionChip";

export { ActionChip, actionChipVariants };
