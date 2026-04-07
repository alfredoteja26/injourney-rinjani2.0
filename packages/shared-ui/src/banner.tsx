import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const bannerVariants = cva("flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-xs", {
  variants: {
    variant: {
      neutral: "border-border bg-card text-card-foreground",
      info: "border-primary/20 bg-primary/10 text-primary",
      success: "border-success/20 bg-success-muted text-foreground",
      warning: "border-warning/25 bg-warning-muted text-foreground",
      destructive: "border-destructive/25 bg-destructive/10 text-destructive",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {}

function Banner({ className, variant, ...props }: BannerProps) {
  return <div className={cn(bannerVariants({ variant, className }))} data-slot="banner" role="status" {...props} />;
}

function BannerContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 flex-1", className)} data-slot="banner-content" {...props} />;
}

function BannerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-sm font-semibold leading-5", className)} data-slot="banner-title" {...props} />;
}

function BannerDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1 text-sm leading-5 opacity-90", className)} data-slot="banner-description" {...props} />;
}

export { Banner, BannerContent, BannerDescription, BannerTitle, bannerVariants };
