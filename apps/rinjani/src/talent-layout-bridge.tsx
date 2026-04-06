import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  return <div className="min-h-full">{children}</div>;
}
