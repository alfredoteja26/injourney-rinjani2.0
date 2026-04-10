import { useMemo } from "react";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import type { MyKpiMatrixProfile } from "./my-kpi-phase-matrix";

export function useMyKpiMatrixProfile(): MyKpiMatrixProfile {
  const { state, actingAsEmployeeNumber, getEmployeeDisplay } = usePerformanceV2();
  const period = state.performancePeriod;

  return useMemo(() => {
    const emp = state.employees.find((e) => e.nik === actingAsEmployeeNumber);
    const position = emp?.current_position_id ? state.positions.find((p) => p.position_id === emp.current_position_id) : undefined;
    const orgUnit = position?.org_unit_id ? state.orgUnits.find((o) => o.org_unit_id === position.org_unit_id) : undefined;
    const supervisor = emp?.direct_supervisor_employee_id
      ? state.employees.find((e) => e.employee_id === emp.direct_supervisor_employee_id)
      : undefined;
    const managerName = supervisor ? getEmployeeDisplay(supervisor.nik) : null;

    return {
      fullName: getEmployeeDisplay(actingAsEmployeeNumber),
      nik: actingAsEmployeeNumber,
      jobTitle: position?.title ?? "Posisi",
      managerName,
      periodLabel: `Periode: ${period.name ?? period.id}`,
      orgUnitName: orgUnit?.name ?? null,
      avatarUrl: emp?.avatar ?? null,
    };
  }, [
    actingAsEmployeeNumber,
    getEmployeeDisplay,
    period.id,
    period.name,
    state.employees,
    state.orgUnits,
    state.positions,
  ]);
}
