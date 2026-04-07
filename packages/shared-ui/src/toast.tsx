import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "border border-border bg-card text-card-foreground shadow-md",
          title: "text-sm font-semibold text-foreground",
          description: "text-sm text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}

const toast = {
  message: sonnerToast,
  success: sonnerToast.success,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  error: sonnerToast.error,
  loading: sonnerToast.loading,
  dismiss: sonnerToast.dismiss,
};

export { Toaster, toast };
