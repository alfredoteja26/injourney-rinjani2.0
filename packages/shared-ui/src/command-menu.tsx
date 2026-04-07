import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { Dialog, DialogContent } from "./dialog";
import { cn } from "./utils";

function CommandMenu({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn("flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className)} data-slot="command-menu" {...props} />;
}

function CommandMenuDialog({
  children,
  trigger,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  children: React.ReactNode;
  trigger?: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      {trigger}
      <DialogContent className="overflow-hidden p-0">
        <CommandMenu>{children}</CommandMenu>
      </DialogContent>
    </Dialog>
  );
}

const CommandMenuInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-border px-3" data-slot="command-menu-input-wrapper">
    <CommandPrimitive.Input
      ref={ref}
      className={cn("flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
      data-slot="command-menu-input"
      {...props}
    />
  </div>
));
CommandMenuInput.displayName = CommandPrimitive.Input.displayName;

const CommandMenuList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("max-h-80 overflow-y-auto overflow-x-hidden p-2", className)} data-slot="command-menu-list" {...props} />
));
CommandMenuList.displayName = CommandPrimitive.List.displayName;

const CommandMenuEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-muted-foreground" data-slot="command-menu-empty" {...props} />);
CommandMenuEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandMenuGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground", className)}
    data-slot="command-menu-group"
    {...props}
  />
));
CommandMenuGroup.displayName = CommandPrimitive.Group.displayName;

const CommandMenuItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className)}
    data-slot="command-menu-item"
    {...props}
  />
));
CommandMenuItem.displayName = CommandPrimitive.Item.displayName;

const CommandMenuSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} data-slot="command-menu-separator" {...props} />
));
CommandMenuSeparator.displayName = CommandPrimitive.Separator.displayName;

function CommandMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-normal text-muted-foreground", className)} data-slot="command-menu-shortcut" {...props} />;
}

export {
  CommandMenu,
  CommandMenuDialog,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
  CommandMenuShortcut,
};
