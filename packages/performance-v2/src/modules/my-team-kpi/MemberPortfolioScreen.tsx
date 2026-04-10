import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Button, PageHeading } from "@rinjani/shared-ui";
import type { KpiItem } from "../../lib/domain/types";
import {
  getBandFormulaForEmployee,
  usePerformanceV2,
  usePerformanceV2Portfolio,
  validatePlanningSubmit,
} from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import { KpiPlanningDetailSheet } from "../my-kpi/kpi-planning-detail-sheet";
import { KpiPortfolioPanel } from "../my-kpi/kpi-portfolio-panel";
import { MyKpiPhaseMatrix } from "../my-kpi/my-kpi-phase-matrix";
import { portfolioStatusLabelFromItems } from "../my-kpi/my-kpi-portfolio-status";
import { useMyKpiMonitoringMatrix } from "../my-kpi/use-my-kpi-monitoring-matrix";

export function MemberPortfolioScreen() {
  const { memberId } = useParams<{ memberId: string }>();
  const { state, getEmployeeDisplay, getPositionTitleForEmployee, actingAsEmployeeNumber } = usePerformanceV2();
  const nik = memberId?.trim() ?? "";
  const { items, bersamaTotal, unitTotal } = usePerformanceV2Portfolio(nik);
  const [detailKpi, setDetailKpi] = useState<KpiItem | null>(null);

  const formula = useMemo(() => getBandFormulaForEmployee(state, nik), [state, nik]);
  const planningCheck = useMemo(() => validatePlanningSubmit(state, nik), [state, nik]);
  const portfolioStatusLabel = useMemo(() => portfolioStatusLabelFromItems(items), [items]);
  const bersamaItemCount = useMemo(() => items.filter((i) => i.kpiType === "BERSAMA").length, [items]);
  const unitItemCount = useMemo(() => items.filter((i) => i.kpiType === "UNIT").length, [items]);
  const monMatrix = useMyKpiMonitoringMatrix(nik);

  const memberMatrixProfile = useMemo(() => {
    const emp = state.employees.find((e) => e.nik === nik);
    const position = emp?.current_position_id ? state.positions.find((p) => p.position_id === emp.current_position_id) : undefined;
    const orgUnit = position?.org_unit_id ? state.orgUnits.find((o) => o.org_unit_id === position.org_unit_id) : undefined;
    const supervisor = emp?.direct_supervisor_employee_id
      ? state.employees.find((e) => e.employee_id === emp.direct_supervisor_employee_id)
      : undefined;
    const managerName = supervisor ? getEmployeeDisplay(supervisor.nik) : null;
    const period = state.performancePeriod;
    return {
      fullName: getEmployeeDisplay(nik),
      nik,
      jobTitle: position?.title ?? "Posisi",
      managerName,
      periodLabel: `Periode: ${period.name ?? period.id}`,
      orgUnitName: orgUnit?.name ?? null,
      avatarUrl: emp?.avatar ?? null,
    };
  }, [nik, state.employees, state.orgUnits, state.positions, state.performancePeriod, getEmployeeDisplay]);

  const periodPhase = state.performancePeriod.phase;
  const isMonitoring = periodPhase === "MONITORING";

  if (!nik) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <PageHeading eyebrow="Performance 2.0" title="My Team KPI" description="Pilih anggota tim" />
        <Button variant="outline" asChild>
          <Link to="/performance-v2/my-team-kpi/planning">Kembali</Link>
        </Button>
      </div>
    );
  }

  if (actingAsEmployeeNumber !== "260101") {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <PageHeading eyebrow="Performance 2.0" title="My Team KPI" description="Akses khusus atasan" />
        <Button variant="outline" asChild>
          <Link to="/performance-v2/my-kpi">Beranda</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
      <PageHeading
        eyebrow="Performance · My Team KPI"
        title={getEmployeeDisplay(nik)}
        description={`${getPositionTitleForEmployee(nik) ?? `NIK ${nik}`} · Portofolio & rencana (tinjauan atasan)`}
      />
      <PersonaContextBar />

      <MyKpiPhaseMatrix
        variant={isMonitoring ? "monitoring" : "planning"}
        bersamaTargetPct={formula.kpiBersamaWeightPct}
        unitTargetPct={formula.kpiUnitWeightPct}
        bersamaCurrentPct={bersamaTotal}
        unitCurrentPct={unitTotal}
        planningOk={planningCheck.ok}
        profile={memberMatrixProfile}
        bersamaItemCount={bersamaItemCount}
        unitItemCount={unitItemCount}
        portfolioStatusLabel={portfolioStatusLabel}
        monitoring={
          isMonitoring
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

      <KpiPortfolioPanel
        title="Portofolio KPI anggota"
        description="Tampilan selaras dengan My KPI: filter, kolom, dan sort per bagian. Bobot hanya baca; aksi mengarah ke detail atau antrian verifikasi."
        portfolioOwnerEmployeeNumber={nik}
        viewContext="managerReview"
        phase={isMonitoring ? "monitoring" : "planning"}
        showViewModeToggle
        allowWeightEdit={false}
        layoutVariant="landing"
        hideTotalsFooter
        showLandingToolbar
        onSelectKpi={(item) => setDetailKpi(item)}
      />

      <KpiPlanningDetailSheet
        kpi={detailKpi}
        onClose={() => setDetailKpi(null)}
        detailVariant={isMonitoring ? "monitoring" : "planning"}
        showWeightSlider={false}
      />

      <Button variant="outline" asChild>
        <Link to="/performance-v2/my-team-kpi/planning">Kembali ke tim</Link>
      </Button>
    </div>
  );
}
