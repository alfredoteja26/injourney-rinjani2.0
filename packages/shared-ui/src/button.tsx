import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-normal outline-none transition-[background-color,border-color,color,box-shadow,transform] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:translate-y-px",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:translate-y-px",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:translate-y-px",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "h-auto rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-5 text-base",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-slot="button"
        {...props}
      >
        {loading ? (
          <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        ) : null}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

type IconButtonProps = Omit<ButtonProps, "size"> & {
  "aria-label": string;
  size?: Extract<VariantProps<typeof buttonVariants>["size"], "sm" | "md" | "lg" | "icon">;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ size = "icon", ...props }, ref) => (
  <Button ref={ref} size={size} {...props} />
));
IconButton.displayName = "IconButton";

function ActionGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} data-slot="action-group" {...props} />;
}

export { ActionGroup, Button, IconButton, buttonVariants };
