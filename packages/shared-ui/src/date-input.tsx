import * as React from "react";
import { CalendarDays } from "lucide-react";

import { Input } from "./input";
import { cn } from "./utils";

type DateInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  prefixIcon?: boolean;
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(({ className, prefixIcon = true, ...props }, ref) => {
  return (
    <div className={cn("relative", className)}>
      {prefixIcon ? <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /> : null}
      <Input ref={ref} type="date" className={cn(prefixIcon && "pl-9")} {...props} />
    </div>
  );
});
DateInput.displayName = "DateInput";

export { DateInput };
export type { DateInputProps };
