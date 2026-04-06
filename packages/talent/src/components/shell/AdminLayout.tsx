import { ReactNode } from "react";
import { useIntegratedShell } from "@rinjani/shell";
import { AdminSidebar } from "./AdminSidebar";
import { RinjaniHeader } from "./RinjaniHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const isEmbeddedInHostShell = useIntegratedShell();

  if (isEmbeddedInHostShell) {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-sidebar">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-[64px] relative z-50">
          <RinjaniHeader />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background rounded-tl-3xl shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
