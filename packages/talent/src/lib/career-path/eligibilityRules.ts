/**
 * Eligibility Rules Engine for Career Path Module
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Implements business rules:
 * - Grade Jabatan range (±3)
 * - Band Barrier validation
 * - Job Family alignment
 * - Disciplinary status check
 * - Current position check
 */

import type { Employee, Position, EligibilityResult, AspirationType, BandBarrier } from '../../types/careerPath';

// ========== BAND BARRIER RULES ==========

/**
 * Band Barrier Matrix
 * - BOD cannot cross to any other band
 * - Group Head cannot cross to Department Head (skip band not allowed)
 * - Division Head ↔ Department Head allowed
 */
const BAND_BARRIERS: Record<string, string[]> = {
  "BOD": ["Group Head", "Division Head", "Department Head", "Section Head"],
  "Group Head": ["Department Head", "Section Head"], // Cannot skip Division Head
  "Division Head": [], // Can move to Department Head
  "Department Head": [], // Can move to Division Head
};

function checkBandBarrier(fromBand: string, toBand: string): BandBarrier {
  // Same band = always allowed
  if (fromBand === toBand) {
    return { from: fromBand, to: toBand, allowed: true };
  }

  // Check if toBand is in the barrier list for fromBand
  const barriers = BAND_BARRIERS[fromBand] || [];
  const blocked = barriers.includes(toBand);

  return {
    from: fromBand,
    to: toBand,
    allowed: !blocked,
    reason: blocked ? `Band Barrier: Tidak dapat berpindah dari ${fromBand} ke ${toBand}` : undefined
  };
}

// ========== MAIN ELIGIBILITY CHECK ==========

export function checkEligibility(
  employee: Employee,
  position: Position
): EligibilityResult {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let eligible = true;

  // 1. Check current position (cannot aspire to own position)
  if (employee.position === position.name) {
    reasons.push("Tidak dapat mengajukan aspirasi ke posisi yang sama dengan posisi saat ini");
    eligible = false;
  }

  // 2. Check disciplinary status
  if (employee.disciplinary_status === "ACTIVE") {
    reasons.push("Status hukuman disiplin aktif - tidak eligible untuk aspirasi");
    eligible = false;
  }

  // 3. Check Grade Jabatan range (±3)
  const gradeGap = Math.abs(position.grade_jabatan - employee.grade_jabatan);
  const gradeDirection = position.grade_jabatan - employee.grade_jabatan;

  // Horizontal move (same grade)
  if (gradeDirection === 0) {
    // Allowed
  }
  // Vertical move (promotion)
  else if (gradeDirection > 0) {
    if (gradeGap > 3) {
      reasons.push(`Gap Grade Jabatan terlalu besar (+${gradeGap}). Maksimal +3 untuk promosi.`);
      eligible = false;
    }
  }
  // Downward move (demotion - rare, usually not allowed)
  else {
    warnings.push("Aspirasi ini merupakan penurunan grade jabatan");
  }

  // 4. Check Band Barrier
  const bandCheck = checkBandBarrier(employee.band_jabatan, position.band_jabatan);
  if (!bandCheck.allowed) {
    reasons.push(bandCheck.reason!);
    eligible = false;
  }

  // 5. Job Family alignment (warning, not blocker)
  if (employee.job_family !== position.job_family) {
    warnings.push(`Pindah Job Family: ${employee.job_family} → ${position.job_family}`);
  }

  // 6. Determine aspiration type
  const type: AspirationType = gradeDirection > 0 ? "PROMOSI" : "ROTASI";

  return {
    eligible,
    reasons,
    warnings,
    type
  };
}

// ========== BATCH ELIGIBILITY CHECK ==========

export function getEligiblePositions(
  employee: Employee,
  allPositions: Position[]
): {
  horizontal: Position[];
  vertical: Position[];
  ineligible: { position: Position; reasons: string[] }[];
} {
  const horizontal: Position[] = [];
  const vertical: Position[] = [];
  const ineligible: { position: Position; reasons: string[] }[] = [];

  for (const position of allPositions) {
    const result = checkEligibility(employee, position);
    
    if (result.eligible) {
      if (result.type === "ROTASI") {
        horizontal.push(position);
      } else {
        vertical.push(position);
      }
    } else {
      ineligible.push({ position, reasons: result.reasons });
    }
  }

  return { horizontal, vertical, ineligible };
}

// ========== ASPIRATION LIMITS ==========

export function checkAspirationLimits(
  currentSelections: { horizontal: Position[]; vertical: Position[] },
  newPosition: Position,
  newType: AspirationType
): { allowed: boolean; reason?: string } {
  const MAX_HORIZONTAL = 3;
  const MAX_VERTICAL = 3;

  if (newType === "ROTASI") {
    if (currentSelections.horizontal.length >= MAX_HORIZONTAL) {
      return {
        allowed: false,
        reason: `Maksimal ${MAX_HORIZONTAL} aspirasi horizontal (rotasi)`
      };
    }
  } else {
    if (currentSelections.vertical.length >= MAX_VERTICAL) {
      return {
        allowed: false,
        reason: `Maksimal ${MAX_VERTICAL} aspirasi vertical (promosi)`
      };
    }
  }

  // Check if already selected
  const allSelected = [...currentSelections.horizontal, ...currentSelections.vertical];
  if (allSelected.some(p => p.id === newPosition.id)) {
    return {
      allowed: false,
      reason: "Posisi sudah dipilih"
    };
  }

  return { allowed: true };
}

// ========== SUCCESSOR ELIGIBILITY (FOR JOB HOLDER) ==========

/**
 * For Job Holder aspiration, candidates must be within ±3 grades
 * and not have active disciplinary status
 */
export function getEligibleSuccessors(
  position: Position,
  allEmployees: Employee[]
): Employee[] {
  return allEmployees.filter(employee => {
    // Cannot nominate self
    if (employee.position === position.name) {
      return false;
    }

    // Cannot have active disciplinary
    if (employee.disciplinary_status === "ACTIVE") {
      return false;
    }

    // Must be within ±3 grades
    const gradeGap = Math.abs(position.grade_jabatan - employee.grade_jabatan);
    if (gradeGap > 3) {
      return false;
    }

    // Check band barrier
    const bandCheck = checkBandBarrier(employee.band_jabatan, position.band_jabatan);
    if (!bandCheck.allowed) {
      return false;
    }

    return true;
  });
}

// ========== HELPER FUNCTIONS ==========

export function getAspirationTypeLabel(type: AspirationType): string {
  return type === "PROMOSI" ? "Promosi" : "Rotasi";
}

export function getAspirationTypeIcon(type: AspirationType): string {
  return type === "PROMOSI" ? "⬆️" : "↔️";
}

export function formatGradeGap(current: number, target: number): string {
  const gap = target - current;
  if (gap === 0) return "Same level";
  if (gap > 0) return `+${gap} grades`;
  return `${gap} grades`;
}
