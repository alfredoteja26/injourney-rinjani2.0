import { ReactNode } from "react";

interface SettingsTabProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function SettingsTab({ children, isActive, onClick }: SettingsTabProps) {
  // Extract only text content by filtering out icon elements
  const textContent = typeof children === 'string' ? children : 
    (Array.isArray(children) ? children.filter(child => typeof child === 'string').join('') : children);

  return (
    <button
      onClick={onClick}
      className={`pb-3 px-1 relative transition-colors ${
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
      style={{ 
        fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
        color: isActive ? "var(--foreground)" : "var(--muted-foreground)"
      }}
    >
      {textContent}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--primary)" }} />
      )}
    </button>
  );
}

interface SettingsTabListProps {
  children: ReactNode;
}

export function SettingsTabList({ children }: SettingsTabListProps) {
  return (
    <div className="flex gap-8 border-b border-border bg-card px-6">
      {children}
    </div>
  );
}