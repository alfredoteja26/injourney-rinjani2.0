import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "./utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded border border-input bg-input-background shadow-xs outline-none transition-[background-color,border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      className,
    )}
    data-slot="checkbox"
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current" data-slot="checkbox-indicator">
      <svg className="size-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
