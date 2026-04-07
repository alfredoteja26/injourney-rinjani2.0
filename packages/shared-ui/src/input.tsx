import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-sm text-foreground shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      className,
    )}
    data-slot="input"
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
