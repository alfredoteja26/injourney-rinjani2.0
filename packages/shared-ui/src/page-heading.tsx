import type { ReactNode } from "react";

interface PageHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeading({ title, eyebrow, description, actions }: PageHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[24px] border border-border/70 bg-card px-6 py-5 shadow-sm">
      <div className="space-y-1">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
