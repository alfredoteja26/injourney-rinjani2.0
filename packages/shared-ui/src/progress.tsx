import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-transform", {
  variants: {
    variant: {
      primary: "bg-primary",
      success: "bg-accent",
      warning: "bg-secondary",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressIndicatorVariants> {
  indicatorClassName?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, variant, indicatorClassName, ...props }, ref) => {
    const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
        data-slot="progress"
        value={safeValue}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }), indicatorClassName)}
          data-slot="progress-indicator"
          style={{ transform: `translateX(-${100 - safeValue}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  },
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
