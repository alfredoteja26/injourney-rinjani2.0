import { Card, CardContent } from "@rinjani/shared-ui";

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export interface MyKpiEmployeeBriefCardProps {
  fullName: string;
  nik: string;
  jobTitle: string;
  managerName: string | null;
  periodLabel: string;
  orgUnitName?: string | null;
  /** Foto profil dari master karyawan (jika ada). */
  avatarUrl?: string | null;
}

export function MyKpiEmployeeBriefCard({
  fullName,
  nik,
  jobTitle,
  managerName,
  periodLabel,
  orgUnitName,
  avatarUrl,
}: MyKpiEmployeeBriefCardProps) {
  const initials = initialsFromName(fullName);

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div
          className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/12 text-lg font-semibold text-primary ring-2 ring-primary/10"
          aria-hidden
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="size-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-lg font-semibold leading-tight tracking-tight text-foreground">{fullName}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary/90">{jobTitle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              NIK <span className="font-mono text-foreground">{nik}</span>
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>{periodLabel}</span>
            {orgUnitName ? (
              <>
                <span className="hidden sm:inline" aria-hidden>
                  ·
                </span>
                <span className="text-foreground/90">{orgUnitName}</span>
              </>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            Atasan: <span className="font-medium text-foreground">{managerName ?? "—"}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
