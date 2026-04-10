import { usePerformanceV2 } from "../lib/store/performance-v2-store";

export function AuditLogContent({ maxEntries = 40 }: { maxEntries?: number }) {
  const { state } = usePerformanceV2();
  const entries = [...state.auditLog].reverse().slice(0, maxEntries);

  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada entri.</p>;
  }

  return (
    <ul className="max-h-[min(60vh,28rem)] space-y-2 overflow-y-auto pr-1 text-sm">
      {entries.map((e) => (
        <li key={e.id} className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
          <div className="font-medium text-foreground">{e.action}</div>
          <div className="text-muted-foreground">
            {e.entityType}
            {e.entityId ? ` · ${e.entityId}` : ""}
          </div>
          {e.detail ? <div className="mt-1 text-muted-foreground">{e.detail}</div> : null}
          <div className="mt-1 text-xs text-muted-foreground">
            {e.at} · aktor NIK {e.actorEmployeeNumber}
          </div>
        </li>
      ))}
    </ul>
  );
}
