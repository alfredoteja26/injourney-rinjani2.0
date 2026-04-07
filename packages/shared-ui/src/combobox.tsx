import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";
import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
} from "./command-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "./utils";

type ComboboxOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
};

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option",
  searchPlaceholder = "Search options...",
  emptyMessage = "No option found.",
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
          role="combobox"
          type="button"
          variant="outline"
        >
          <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>{selectedOption?.label ?? placeholder}</span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
        <CommandMenu>
          <CommandMenuInput placeholder={searchPlaceholder} />
          <CommandMenuList>
            <CommandMenuEmpty>{emptyMessage}</CommandMenuEmpty>
            <CommandMenuGroup>
              {options.map((option) => (
                <CommandMenuItem
                  key={option.value}
                  disabled={option.disabled}
                  value={option.label}
                  onSelect={() => {
                    onValueChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("size-4", value === option.value ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate">{option.label}</span>
                    {option.description ? <span className="truncate text-xs text-muted-foreground">{option.description}</span> : null}
                  </span>
                </CommandMenuItem>
              ))}
            </CommandMenuGroup>
          </CommandMenuList>
        </CommandMenu>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };
export type { ComboboxOption, ComboboxProps };
