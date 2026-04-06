import { ReactNode } from "react";
import { useIntegratedShell } from "@rinjani/shell";
import { RinjaniSidebar } from "./RinjaniSidebar";
import { RinjaniHeader } from "./RinjaniHeader";

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Layout({ children }: LayoutProps) {
  const isEmbeddedInHostShell = useIntegratedShell();

  if (isEmbeddedInHostShell) {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-sidebar">
      <RinjaniSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-[64px] relative z-50">
          <RinjaniHeader />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background rounded-tl-3xl shadow-inner p-[24px]">
          {children}
        </main>
      </div>
    </div>
  );
}
