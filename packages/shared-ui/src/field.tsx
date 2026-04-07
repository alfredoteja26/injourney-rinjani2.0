import * as React from "react";

import { Label } from "./label";
import { cn } from "./utils";

function FieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-4", className)} data-slot="field-group" {...props} />;
}

function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2", className)} data-slot="field" {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn("text-sm font-medium", className)} data-slot="field-label" {...props} />;
}

function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs leading-5 text-muted-foreground", className)} data-slot="field-description" {...props} />;
}

function FieldError({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-medium leading-5 text-destructive", className)} data-slot="field-error" {...props} />;
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel };
