import { Badge, Card, CardContent, Progress, cn } from "@rinjani/shared-ui";
import { initialsFromName } from "./my-kpi-employee-brief-card";
import type { MyKpiMatrixProfile } from "./my-kpi-phase-matrix";

export interface MyKpiPlanningHeroProps {
  profile: MyKpiMatrixProfile;
  bersamaTargetPct: number;
  unitTargetPct: number;
  bersamaCurrentPct: number;
  unitCurrentPct: number;
  planningOk: boolean;
  /** Label agregat portofolio: mis. ALLOCATED bila ada item teralokasi. */
  portfolioStatusLabel: string;
}

/** Strip ringkasan perencanaan ala referensi Stitch: profil + kartu bobot Bersama/Unit + total. */
export function MyKpiPlanningHero({
  profile,
  bersamaTargetPct,
  unitTargetPct,
  bersamaCurrentPct,
  unitCurrentPct,
  planningOk,
  portfolioStatusLabel,
}: MyKpiPlanningHeroProps) {
  const totalPct = bersamaCurrentPct + unitCurrentPct;
  const bersamaValid = bersamaCurrentPct === bersamaTargetPct;
  const unitValid = unitCurrentPct === unitTargetPct;
  const aggregateValid = bersamaValid && unitValid && totalPct === 100;
  const initials = initialsFromName(profile.fullName);

  const bersamaProgress = Math.min(100, (bersamaCurrentPct / Math.max(1, bersamaTargetPct)) * 100);
  const unitProgress = Math.min(100, (unitCurrentPct / Math.max(1, unitTargetPct)) * 100);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-border shadow-sm">
        <CardContent className="flex gap-3 p-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">{initials}</div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-snug text-foreground">{profile.fullName}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">{profile.jobTitle}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Atasan langsung: <span className="font-medium text-foreground">{profile.managerName ?? "—"}</span>
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              NIK <span className="font-mono text-foreground">{profile.nik}</span> · {profile.periodLabel}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="space-y-2 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">KPI Bersama</p>
          <p className="text-2xl font-bold tabular-nums text-foreground">{bersamaCurrentPct}%</p>
          <p className="text-xs text-muted-foreground">
            Wajib <span className="font-medium text-primary">{bersamaTargetPct}%</span> band
          </p>
          <Progress value={bersamaProgress} className="h-2 bg-muted" indicatorClassName="bg-primary" />
          <Badge variant={bersamaValid ? "success" : "warning"} className="text-[10px]">
            {bersamaValid ? "Sesuai target" : "Sesuaikan bobot"}
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="space-y-2 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">KPI Unit</p>
          <p className="text-2xl font-bold tabular-nums text-foreground">{unitCurrentPct}%</p>
          <p className="text-xs text-muted-foreground">
            Kustom <span className="font-medium text-secondary">{unitTargetPct}%</span> band
          </p>
          <Progress value={unitProgress} className="h-2 bg-muted" indicatorClassName="bg-secondary" />
          <Badge variant={unitValid ? "success" : "warning"} className="text-[10px]">
            {unitValid ? "Sesuai target" : "Sesuaikan bobot"}
          </Badge>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "border-primary/30 shadow-md",
          aggregateValid && planningOk ? "bg-primary text-primary-foreground" : "bg-primary/95 text-primary-foreground"
        )}
      >
        <CardContent className="space-y-2 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary-foreground/85">Total bobot</p>
          <p className="text-3xl font-bold tabular-nums">{totalPct}%</p>
          <div className="flex flex-wrap items-center gap-2">
            {aggregateValid && planningOk ? (
              <span className="text-xl" aria-hidden>
                ✓
              </span>
            ) : null}
            <Badge
              variant="neutral"
              className={cn(
                "border-primary-foreground/30 text-[10px] font-semibold",
                aggregateValid && planningOk ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary-foreground/15 text-primary-foreground"
              )}
            >
              {planningOk ? "Siap ajukan" : "Perlu perbaikan"}
            </Badge>
          </div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-primary-foreground/80">Status: {portfolioStatusLabel}</p>
          <p className="text-xs leading-snug text-primary-foreground/90">
            {aggregateValid && planningOk
              ? "Alokasi bobot memenuhi rumus band dan siap diajukan ke atasan."
              : "Lengkapi bobot per jenis dan target sebelum mengajukan portofolio."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
