import type { Employee } from "@talent/types/talent";

export function orgUnitNameForEmployee(
  employees: Employee[],
  positions: { position_id: string; org_unit_id: string }[],
  orgUnits: { org_unit_id: string; name: string }[],
  nik: string
): string | undefined {
  const emp = employees.find((e) => e.nik === nik);
  if (!emp?.current_position_id) {
    return undefined;
  }
  const pos = positions.find((p) => p.position_id === emp.current_position_id);
  if (!pos) {
    return undefined;
  }
  return orgUnits.find((o) => o.org_unit_id === pos.org_unit_id)?.name;
}

export function locationLabelForEmployee(
  employees: Employee[],
  locations: { location_id: string; city?: string; sub_personal_area?: string }[],
  nik: string
): string | undefined {
  const emp = employees.find((e) => e.nik === nik);
  if (!emp?.location_id) {
    return undefined;
  }
  const loc = locations.find((l) => l.location_id === emp.location_id);
  if (!loc) {
    return undefined;
  }
  return [loc.sub_personal_area, loc.city].filter(Boolean).join(" · ") || undefined;
}
