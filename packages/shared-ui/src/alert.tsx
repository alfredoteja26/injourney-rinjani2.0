import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const alertVariants = cva(
  "grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg border px-4 py-3 text-sm shadow-xs has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:text-current",
  {
    variants: {
      variant: {
        info: "border-primary/20 bg-primary/10 text-primary",
        success: "border-accent/25 bg-accent/15 text-foreground",
        warning: "border-secondary/25 bg-secondary/15 text-foreground",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive",
        neutral: "border-border bg-card text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant, className }))} data-slot="alert" {...props} />;
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("col-start-2 text-sm font-semibold leading-5", className)} data-slot="alert-title" {...props} />;
}

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("col-start-2 text-sm leading-5 opacity-90", className)} data-slot="alert-description" {...props} />;
}

export { Alert, AlertDescription, alertVariants, AlertTitle };
