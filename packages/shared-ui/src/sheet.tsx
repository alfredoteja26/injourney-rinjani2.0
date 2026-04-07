import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { variant?: "dim" | "blur" }
>(({ className, variant = "dim", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-foreground/35 transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      variant === "blur" && "backdrop-blur-sm",
      className,
    )}
    data-slot="sheet-overlay"
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetVariants = cva("fixed z-50 flex flex-col gap-4 border-border bg-card p-6 text-card-foreground shadow-xl outline-none transition ease-out data-[state=closed]:animate-out data-[state=open]:animate-in", {
  variants: {
    side: {
      right: "inset-y-0 right-0 h-full w-3/4 max-w-md rounded-l-2xl border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      left: "inset-y-0 left-0 h-full w-3/4 max-w-md rounded-r-2xl border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    },
    presentation: {
      edge: "",
      floating: "inset-y-3 right-3 h-[calc(100%-1.5rem)] rounded-2xl border",
    },
  },
  defaultVariants: {
    side: "right",
    presentation: "edge",
  },
});

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  overlay?: "dim" | "blur" | "none";
}

const SheetContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, SheetContentProps>(
  ({ side = "right", presentation = "edge", overlay = "dim", className, children, ...props }, ref) => (
    <SheetPortal>
      {overlay !== "none" ? <SheetOverlay variant={overlay} /> : null}
      <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side, presentation, className }))} data-slot="sheet-content" {...props}>
        {children}
        <SheetClose className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close sheet">
          <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4 12 12M12 4 4 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </SheetClose>
      </DialogPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = DialogPrimitive.Content.displayName;

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 text-left", className)} data-slot="sheet-header" {...props} />;
}

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} data-slot="sheet-footer" {...props} />;
}

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none text-foreground", className)} data-slot="sheet-title" {...props} />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm leading-6 text-muted-foreground", className)} data-slot="sheet-description" {...props} />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
