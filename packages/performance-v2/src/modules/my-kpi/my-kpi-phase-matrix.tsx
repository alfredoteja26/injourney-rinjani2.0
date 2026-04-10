import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, cn, EmployeeBriefCard, MetricCard } from "@rinjani/shared-ui";
import type { CheckInSchedule } from "../../lib/domain/types";
import { initialsFromName } from "./my-kpi-employee-brief-card";
import { portfolioStatusEmphasisClassName } from "./my-kpi-portfolio-status";

export interface MyKpiMatrixProfile {
  fullName: string;
  nik: string;
  jobTitle: string;
  managerName: string | null;
  periodLabel: string;
  orgUnitName?: string | null;
  avatarUrl?: string | null;
}

export interface MyKpiMonitoringMatrixProps {
  checkInSchedules: CheckInSchedule[];
  lastClosedPeriodLabel: string;
  lastPeriodAchievementSummary: string;
  jumlahDrafRealisasi: number;
  jumlahMenungguVerifikasi: number;
  openPeriodLabel?: string;
  openPeriodCountdownLabel?: string;
  /** Ringkas alur verifikasi realisasi (bukan status perencanaan). */
  verificationFlowLabel: string;
  /** Jendela berikutnya (UPCOMING) bila tidak ada yang OPEN. */
  nextUpcomingSchedule?: CheckInSchedule;
}

export interface MyKpiPhaseMatrixProps {
  /** `planning` = bobot band; `monitoring` = capaian & jadwal. */
  variant?: "planning" | "monitoring";
  bersamaTargetPct: number;
  unitTargetPct: number;
  bersamaCurrentPct: number;
  unitCurrentPct: number;
  planningOk: boolean;
  profile: MyKpiMatrixProfile;
  /** Jumlah item KPI Bersama di portofolio. */
  bersamaItemCount: number;
  /** Jumlah item KPI Unit di portofolio. */
  unitItemCount: number;
  /** Agregat status persetujuan portofolio (satu label). */
  portfolioStatusLabel: string;
  /** Wajib jika variant `monitoring`. */
  monitoring?: MyKpiMonitoringMatrixProps;
}

/** Dense MetricCard for matrix row; ring/outline cleared to avoid stray “black corner” artifacts with nested cards. */
const matrixMetricBaseClass =
  "min-w-0 gap-2 border border-solid border-border/80 bg-card shadow-none ring-0 outline-none [&_[data-slot=card-header]]:gap-0.5 [&_[data-slot=card-header]]:px-3 [&_[data-slot=card-header]]:pb-0 [&_[data-slot=card-header]]:pt-3 [&_[data-slot=card-content]]:px-3 [&_[data-slot=card-content]]:pb-3 [&_[data-slot=card-content]]:pt-0 [&_[data-slot=card-title]]:text-xl";

/** Kartu monitoring ringkas: teks utama tidak memakai ukuran 3xl bawaan MetricCard. */
const matrixMonitoringCompactClass =
  "min-w-0 gap-1 border border-border/80 bg-card shadow-none ring-0 outline-none [&_[data-slot=card-header]]:gap-0.5 [&_[data-slot=card-header]]:px-3 [&_[data-slot=card-header]]:pt-2.5 [&_[data-slot=card-header]]:pb-0 [&_[data-slot=card-content]]:px-3 [&_[data-slot=card-content]]:pb-2.5 [&_[data-slot=card-content]]:pt-0 [&_[data-slot=card-title]]:!text-base [&_[data-slot=card-title]]:!font-semibold [&_[data-slot=card-title]]:!leading-snug";

function weightValueWithIcon(ok: boolean, pct: number) {
  return (
    <span className="flex items-center gap-2 tabular-nums">
      {ok ? (
        <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />
      ) : (
        <AlertTriangle className="size-5 shrink-0 text-destructive" aria-hidden />
      )}
      <span>{pct}%</span>
    </span>
  );
}

function weightMetricCardClass(ok: boolean) {
  return cn(
    matrixMetricBaseClass,
    ok ? null : "border-destructive/40 bg-destructive/[0.05]"
  );
}

export function MyKpiPhaseMatrix({
  variant = "planning",
  bersamaTargetPct,
  unitTargetPct,
  bersamaCurrentPct,
  unitCurrentPct,
  planningOk,
  profile,
  bersamaItemCount,
  unitItemCount,
  portfolioStatusLabel,
  monitoring,
}: MyKpiPhaseMatrixProps) {
  const bersamaValid = bersamaCurrentPct === bersamaTargetPct;
  const unitValid = unitCurrentPct === unitTargetPct;
  const totalPct = bersamaCurrentPct + unitCurrentPct;
  const aggregateValid = bersamaValid && unitValid && totalPct === 100;
  const bandAndPlanningOk = aggregateValid && planningOk;
  const itemTotal = bersamaItemCount + unitItemCount;
  const statusClass = portfolioStatusEmphasisClassName(portfolioStatusLabel);

  const totalCardClass = cn(
    matrixMetricBaseClass,
    bandAndPlanningOk ? "border-primary/20 bg-primary/5" : "border-destructive/45 bg-destructive/[0.06]"
  );

  const mon = variant === "monitoring" ? monitoring : undefined;

  return (
    <Card className="border-border/80 shadow-sm ring-0 outline-none">
      <CardContent className="flex flex-col gap-4 p-3 sm:flex-row sm:items-stretch">
        <div className="min-w-0 sm:max-w-[min(100%,22rem)] sm:shrink-0">
          <EmployeeBriefCard
            name={profile.fullName}
            employeeId={profile.nik}
            title={profile.jobTitle}
            organization={
              <>
                Atasan: <span className="font-medium text-foreground">{profile.managerName ?? "—"}</span>
                {profile.orgUnitName ? (
                  <>
                    {" "}
                    · {profile.orgUnitName}
                  </>
                ) : null}
              </>
            }
            location={profile.periodLabel}
            assignmentType="primary"
            initials={initialsFromName(profile.fullName)}
            avatar={
              profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="size-full object-cover" />
              ) : undefined
            }
          />
        </div>

        <div className="hidden w-px shrink-0 bg-border sm:block" aria-hidden />

        <div className="min-w-0 flex-1">
          {variant === "monitoring" && mon ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-stretch">
              <MetricCard
                className={cn(
                  matrixMonitoringCompactClass,
                  mon.openPeriodLabel ? "border-success/30 bg-success-muted/20" : undefined
                )}
                label="Tenggat & jendela aktif"
                value={
                  <span className="flex items-start gap-2 text-left">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span className="leading-snug">
                      {mon.openPeriodLabel ? (
                        <>
                          <span className="block text-foreground">Check-in {mon.openPeriodLabel} terbuka</span>
                          {mon.openPeriodCountdownLabel ? (
                            <span className="mt-0.5 block text-xs font-medium text-primary">{mon.openPeriodCountdownLabel}</span>
                          ) : null}
                        </>
                      ) : mon.nextUpcomingSchedule ? (
                        <>
                          <span className="block text-muted-foreground">Belum ada jendela OPEN</span>
                          <span className="mt-1 block text-xs text-foreground">
                            Berikutnya: {mon.nextUpcomingSchedule.period} ({mon.nextUpcomingSchedule.windowStart}–
                            {mon.nextUpcomingSchedule.windowEnd})
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Tidak ada jadwal check-in.</span>
                      )}
                    </span>
                  </span>
                }
                description={
                  <span className="text-[11px] leading-snug text-muted-foreground">
                    Capaian ref. {mon.lastClosedPeriodLabel}: {mon.lastPeriodAchievementSummary}
                  </span>
                }
                trend={mon.openPeriodLabel ? "Aktif" : "Tertutup"}
                trendTone={mon.openPeriodLabel ? "success" : "neutral"}
              />
              <MetricCard
                className={matrixMonitoringCompactClass}
                label="Verifikasi realisasi"
                value={
                  <span className="block text-left text-sm font-medium leading-snug text-foreground">
                    {mon.jumlahDrafRealisasi} draf · {mon.jumlahMenungguVerifikasi} menunggu verifikasi
                  </span>
                }
                description={
                  <span className="text-[11px] leading-snug text-muted-foreground">
                    {mon.verificationFlowLabel} · {itemTotal} item portofolio
                  </span>
                }
                trend="Unit"
                trendTone="neutral"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:items-stretch">
              <MetricCard
                className={weightMetricCardClass(bersamaValid)}
                label="KPI Bersama"
                value={weightValueWithIcon(bersamaValid, bersamaCurrentPct)}
                description={`Target band ${bersamaTargetPct}%`}
                trend={bersamaValid ? "OK" : "Sesuaikan"}
                trendTone={bersamaValid ? "success" : "destructive"}
              />
              <MetricCard
                className={weightMetricCardClass(unitValid)}
                label="KPI Unit"
                value={weightValueWithIcon(unitValid, unitCurrentPct)}
                description={`Target band ${unitTargetPct}%`}
                trend={unitValid ? "OK" : "Sesuaikan"}
                trendTone={unitValid ? "success" : "destructive"}
              />
              <MetricCard
                className={matrixMetricBaseClass}
                label="Komposisi portofolio"
                value={`${itemTotal} item`}
                description={
                  <span className="space-y-2">
                    <span className="block">
                      {bersamaItemCount} Bersama · {unitItemCount} Unit
                    </span>
                    <span className={cn("block text-xs font-semibold leading-snug", statusClass)}>{portfolioStatusLabel}</span>
                  </span>
                }
              />
              <MetricCard
                className={totalCardClass}
                label="Total bobot"
                value={weightValueWithIcon(bandAndPlanningOk, totalPct)}
                description={
                  bandAndPlanningOk
                    ? "Bobot memenuhi rumus band."
                    : !aggregateValid
                      ? "Total harus 100% dan sesuai band Bersama/Unit."
                      : "Lengkapi syarat ajuan (lihat peringatan di atas)."
                }
                trend={bandAndPlanningOk ? "Band OK" : "Sesuaikan band"}
                trendTone={bandAndPlanningOk ? "success" : "destructive"}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
