import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-5 rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)}
      data-slot="card"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-5 pt-5 has-[>[data-slot=card-action]]:grid-cols-[1fr_auto]",
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold leading-tight text-foreground", className)} data-slot="card-title" {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-5 text-muted-foreground", className)} data-slot="card-description" {...props} />;
}

function CardAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} data-slot="card-action" {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} data-slot="card-content" {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 px-5 pb-5", className)} data-slot="card-footer" {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
