import * as React from "react";

import { cn } from "./utils";

function Spinner({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent", className)}
      data-slot="spinner"
      role="status"
      {...props}
    />
  );
}

export { Spinner };
