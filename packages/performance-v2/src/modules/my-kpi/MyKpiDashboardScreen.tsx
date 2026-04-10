import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { AppStickyFooter, Badge, Button, PageHeading } from "@rinjani/shared-ui";
import {
  getBandFormulaForEmployee,
  usePerformanceV2,
  usePerformanceV2Portfolio,
  validatePlanningSubmit,
} from "../../lib/store/performance-v2-store";
import { KpiPlanningDetailSheet } from "./kpi-planning-detail-sheet";
import { KpiPortfolioPanel } from "./kpi-portfolio-panel";
import { MyKpiChangeRequestsPanel } from "./my-kpi-change-requests-panel";
import { MyKpiHubStatusGrid } from "./my-kpi-hub-summary";
import { MyKpiPersonaDemoDialogTrigger } from "./my-kpi-persona-demo-dialog";
import { MyKpiPhaseMatrix } from "./my-kpi-phase-matrix";
import { portfolioStatusLabelFromItems } from "./my-kpi-portfolio-status";
import { useMyKpiMatrixProfile } from "./use-my-kpi-matrix-profile";
import { useMyKpiMonitoringMatrix } from "./use-my-kpi-monitoring-matrix";
import type { KpiItem } from "../../lib/domain/types";
import { PersonaContextBar } from "../../ui/persona-context-bar";

export function MyKpiDashboardScreen() {
  const matrixProfile = useMyKpiMatrixProfile();
  const monMatrix = useMyKpiMonitoringMatrix();
  const { state, actingAsEmployeeNumber, getEmployeeDisplay, getPositionTitleForEmployee } = usePerformanceV2();
  const { items, bersamaTotal, unitTotal } = usePerformanceV2Portfolio();
  const period = state.performancePeriod;
  const [detailKpi, setDetailKpi] = useState<KpiItem | null>(null);

  const planningCheck = useMemo(() => validatePlanningSubmit(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const formula = useMemo(() => getBandFormulaForEmployee(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);

  const phaseLabel = period.phase === "PLANNING" ? "Perencanaan" : period.phase === "MONITORING" ? "Monitoring" : "Akhir tahun";
  const isMonitoringPhase = period.phase === "MONITORING";

  const bersamaItemCount = useMemo(
    () => (isMonitoringPhase ? monMatrix.bersamaItemCount : items.filter((i) => i.kpiType === "BERSAMA").length),
    [isMonitoringPhase, monMatrix.bersamaItemCount, items]
  );
  const unitItemCount = useMemo(
    () => (isMonitoringPhase ? monMatrix.unitItemCount : items.filter((i) => i.kpiType === "UNIT").length),
    [isMonitoringPhase, monMatrix.unitItemCount, items]
  );
  const portfolioStatusLabel = useMemo(() => portfolioStatusLabelFromItems(items), [items]);

  const titleText = `Portofolio & rencana KPI ${period.year}`;
  const descText = `${getEmployeeDisplay(actingAsEmployeeNumber)}${
    getPositionTitleForEmployee(actingAsEmployeeNumber) ? ` · ${getPositionTitleForEmployee(actingAsEmployeeNumber)}` : ""
  } · Periode: ${period.name ?? period.id}`;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
      <PageHeading
        eyebrow={`Performa · ${phaseLabel} · status ${period.status}`}
        title={titleText}
        description={descText}
        actions={
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {planningCheck.ok ? (
                <Badge variant="success" className="px-3 py-1">
                  Siap ajukan
                </Badge>
              ) : (
                <Badge variant="warning" className="px-3 py-1">
                  Lengkapi data
                </Badge>
              )}
              <Button asChild size="sm">
                <Link to="/performance-v2/my-kpi/planning">Ajukan / kelola rencana</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/performance-v2/my-kpi/check-in">Monitoring &amp; check-in</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/performance-v2/my-kpi/year-end">Ringkasan akhir tahun</Link>
              </Button>
            </div>
          </div>
        }
      />

      <PersonaContextBar />

      <MyKpiPhaseMatrix
        variant={isMonitoringPhase ? "monitoring" : "planning"}
        bersamaTargetPct={formula.kpiBersamaWeightPct}
        unitTargetPct={formula.kpiUnitWeightPct}
        bersamaCurrentPct={bersamaTotal}
        unitCurrentPct={unitTotal}
        planningOk={planningCheck.ok}
        profile={matrixProfile}
        bersamaItemCount={bersamaItemCount}
        unitItemCount={unitItemCount}
        portfolioStatusLabel={portfolioStatusLabel}
        monitoring={
          isMonitoringPhase
            ? {
                checkInSchedules: monMatrix.checkInSchedules,
                lastClosedPeriodLabel: monMatrix.lastClosedPeriodLabel,
                lastPeriodAchievementSummary: monMatrix.lastPeriodAchievementSummary,
                jumlahDrafRealisasi: monMatrix.jumlahDrafRealisasi,
                jumlahMenungguVerifikasi: monMatrix.jumlahMenungguVerifikasi,
                openPeriodLabel: monMatrix.openPeriodLabel,
                openPeriodCountdownLabel: monMatrix.openPeriodCountdownLabel,
                verificationFlowLabel: monMatrix.verificationFlowLabel,
                nextUpcomingSchedule: monMatrix.nextUpcomingSchedule,
              }
            : undefined
        }
      />

      <MyKpiHubStatusGrid items={items} />

      <MyKpiChangeRequestsPanel />

      <div className="space-y-4">
        <KpiPortfolioPanel
          title="Detail portofolio KPI"
          description={
            isMonitoringPhase
              ? "Fokus monitoring: verifikasi realisasi, kolom dapat disesuaikan, saring per tabel."
              : "Perencanaan: status pengajuan, tanpa kontribusi PI; klik judul untuk detail lengkap."
          }
          phase={isMonitoringPhase ? "monitoring" : "planning"}
          showViewModeToggle
          allowWeightEdit={false}
          layoutVariant="landing"
          hideTotalsFooter
          onSelectKpi={(item) => setDetailKpi(item)}
        />
      </div>

      <KpiPlanningDetailSheet
        kpi={detailKpi}
        onClose={() => setDetailKpi(null)}
        detailVariant={isMonitoringPhase ? "monitoring" : "planning"}
      />

      <AppStickyFooter
        leading={
          <div className="flex min-w-0 items-start gap-2.5 text-left text-sm">
            {planningCheck.ok ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            ) : (
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
            )}
            <div className="min-w-0">
              <p className={planningCheck.ok ? "font-medium text-success" : "font-medium text-warning"}>
                {planningCheck.ok ? "Validasi: bobot total 100% tercapai." : "Validasi: perbaiki portofolio sebelum mengajukan."}
              </p>
              <p className="text-xs text-muted-foreground">
                Harap pastikan semua KPI Unit telah didiskusikan dengan atasan langsung sebelum submit. Submit diblokir jika ada item ALLOCATED
                tanpa target final.
              </p>
            </div>
          </div>
        }
        trailing={
          <>
            <MyKpiPersonaDemoDialogTrigger />
            <Button variant="outline" size="sm" asChild>
              <Link to="/performance-v2/my-kpi/planning">Simpan draft / kelola</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/performance-v2/my-kpi/planning">Lanjutkan submit</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
