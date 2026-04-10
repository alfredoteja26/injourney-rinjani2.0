import { useEffect, useMemo, useState } from "react";
import type { CheckInSchedule, KpiRealization, PeriodKey } from "../../lib/domain/types";
import { usePerformanceV2, usePerformanceV2Portfolio } from "../../lib/store/performance-v2-store";
import { monitoringVerificationFlowLabel } from "./my-kpi-portfolio-status";

const PERIOD_ORDER: PeriodKey[] = ["Q1", "Q2", "Q3", "Q4", "S1", "S2", "ANNUAL"];

function periodRank(p: PeriodKey): number {
  const i = PERIOD_ORDER.indexOf(p);
  return i >= 0 ? i : 99;
}

function countdownToDeadlineYmd(deadlineYmd: string, now: Date): string {
  const end = new Date(`${deadlineYmd}T23:59:59`);
  const ms = end.getTime() - now.getTime();
  if (ms <= 0) {
    return "Tenggat lewat — pengiriman masih diizinkan.";
  }
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (d > 0) {
    return `Sisa ${d} h ${h} j`;
  }
  if (h > 0) {
    return `Sisa ${h} j ${m} m`;
  }
  return `Sisa ${m} m`;
}

function lastClosedSchedule(schedules: CheckInSchedule[]): CheckInSchedule | undefined {
  const closed = schedules.filter((s) => s.status === "CLOSED").sort((a, b) => periodRank(b.period) - periodRank(a.period));
  return closed[0];
}

function lastPeriodUnitAchievementSummary(
  kpiItems: ReturnType<typeof usePerformanceV2>["state"]["kpiItems"],
  realizations: KpiRealization[],
  kpiTargets: ReturnType<typeof usePerformanceV2>["state"]["kpiTargets"],
  actingAsEmployeeNumber: string,
  period: PeriodKey
): string {
  const reals = realizations.filter((r) => {
    if (r.period !== period) {
      return false;
    }
    const k = kpiItems.find((x) => x.id === r.kpiItemId);
    return k?.ownerEmployeeNumber === actingAsEmployeeNumber && k.kpiType === "UNIT";
  });
  if (reals.length === 0) {
    return "Belum ada entri Unit";
  }
  const pcts: number[] = [];
  for (const r of reals) {
    const kpi = kpiItems.find((k) => k.id === r.kpiItemId);
    if (!kpi) {
      continue;
    }
    let target: number | undefined;
    if (kpi.targetType === "PROGRESSIVE") {
      target = kpiTargets.find((t) => t.kpiItemId === r.kpiItemId && t.period === r.period)?.targetValue;
    } else {
      target = kpi.targetValue;
    }
    if (target == null || target <= 0) {
      continue;
    }
    if (kpi.polarity === "POSITIVE") {
      pcts.push(Math.min(150, (r.actualValue / target) * 100));
    } else {
      pcts.push(Math.min(150, (target / Math.max(r.actualValue, 0.001)) * 100));
    }
  }
  if (pcts.length === 0) {
    return `${reals.length} entri Unit`;
  }
  const avg = pcts.reduce((a, b) => a + b, 0) / pcts.length;
  return `~${Math.round(avg)}% vs target`;
}

/**
 * @param forEmployeeNik — optional; default = persona aktif. Dipakai atasan untuk ringkasan monitoring bawahan.
 */
export function useMyKpiMonitoringMatrix(forEmployeeNik?: string) {
  const { state, actingAsEmployeeNumber } = usePerformanceV2();
  const subjectNik =
    forEmployeeNik != null && String(forEmployeeNik).trim() !== ""
      ? String(forEmployeeNik).trim()
      : actingAsEmployeeNumber;
  const { items } = usePerformanceV2Portfolio(subjectNik);
  const schedules = state.checkInSchedules;
  const [countdownTick, setCountdownTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCountdownTick((x) => x + 1), 30000);
    return () => window.clearInterval(id);
  }, []);

  const unitRealizations = useMemo(() => {
    return state.realizations.filter((r) => {
      const k = state.kpiItems.find((x) => x.id === r.kpiItemId);
      return k?.ownerEmployeeNumber === subjectNik && k.kpiType === "UNIT";
    });
  }, [state.kpiItems, state.realizations, subjectNik]);

  const draftUnitCount = useMemo(() => unitRealizations.filter((r) => r.status === "DRAFT").length, [unitRealizations]);
  const submittedUnitCount = useMemo(() => unitRealizations.filter((r) => r.status === "SUBMITTED").length, [unitRealizations]);

  const verificationFlowLabel = useMemo(() => monitoringVerificationFlowLabel(unitRealizations), [unitRealizations]);

  const openSchedules = useMemo(() => schedules.filter((s) => s.status === "OPEN"), [schedules]);
  const closedRef = useMemo(() => lastClosedSchedule(schedules), [schedules]);

  const lastAchievementSummary = useMemo(
    () =>
      closedRef
        ? lastPeriodUnitAchievementSummary(
            state.kpiItems,
            state.realizations,
            state.kpiTargets,
            subjectNik,
            closedRef.period
          )
        : "—",
    [closedRef, state.kpiItems, state.kpiTargets, state.realizations, subjectNik]
  );

  const openPeriodCountdownLabel = useMemo(() => {
    const open = openSchedules[0];
    if (!open) {
      return undefined;
    }
    return countdownToDeadlineYmd(open.deadlineDate, new Date());
  }, [openSchedules, countdownTick]);

  const primaryOpen = openSchedules[0];

  const nextUpcoming = useMemo(() => {
    const u = schedules.filter((s) => s.status === "UPCOMING").sort((a, b) => periodRank(a.period) - periodRank(b.period));
    return u[0];
  }, [schedules]);

  const bersamaItemCount = useMemo(() => items.filter((i) => i.kpiType === "BERSAMA").length, [items]);
  const unitItemCount = useMemo(() => items.filter((i) => i.kpiType === "UNIT").length, [items]);

  return {
    checkInSchedules: schedules,
    lastClosedPeriodLabel: closedRef?.period ?? "—",
    lastPeriodAchievementSummary: lastAchievementSummary,
    jumlahDrafRealisasi: draftUnitCount,
    jumlahMenungguVerifikasi: submittedUnitCount,
    openPeriodLabel: primaryOpen?.period,
    openPeriodCountdownLabel,
    verificationFlowLabel,
    nextUpcomingSchedule: nextUpcoming,
    bersamaItemCount,
    unitItemCount,
  };
}
