import * as React from "react";
import { Search, X } from "lucide-react";

import { IconButton } from "./button";
import { Input } from "./input";
import { cn } from "./utils";

type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onClear?: () => void;
  clearLabel?: string;
};

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, defaultValue, onClear, clearLabel = "Clear search", ...props }, ref) => {
    const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined && String(defaultValue).length > 0;

    return (
      <div className={cn("relative", className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input ref={ref} type="search" className="pl-9 pr-10" value={value} defaultValue={defaultValue} {...props} />
        {onClear && hasValue ? (
          <IconButton
            aria-label={clearLabel}
            className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClear}
          >
            <X className="size-4" />
          </IconButton>
        ) : null}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
