/**
 * DIP reference personas use `employeeNumber` (e.g. 260101).
 * Talent canonical model uses `nik` (string) and `employee_id` (UUID).
 * Fixtures align: nik === String(employeeNumber); employee_id is a stable synthetic UUID per person.
 */
export const DIP_EMPLOYEE_TO_TALENT_NIK: Record<string, string> = {
  "260101": "260101",
  "260102": "260102",
  "260103": "260103",
  "260104": "260104",
};

export function dipEmployeeNumberToNik(dipNumber: string): string {
  return DIP_EMPLOYEE_TO_TALENT_NIK[dipNumber] ?? dipNumber;
}
