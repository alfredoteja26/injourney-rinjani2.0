/**
 * Eligibility Rules for Talent Management
 * Based on: PRD-Rinjani-Talent.md
 * 
 * Centralized eligibility checks for:
 * - Career Path aspirations
 * - Talent Pool inclusion
 * - Talent Review eligibility
 * - Succession designation
 */

import type {
  Employee,
  Position,
  DisciplinaryStatus,
  EmployeeType,
  JobFamily,
} from '../../types/talent';

// ==================== ELIGIBILITY RESULT ====================

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
  gate_failures?: string[]; // Critical failures that block completely
  warning_flags?: string[]; // Non-blocking warnings
}

// ==================== CAREER PATH ELIGIBILITY ====================

/**
 * Check if employee is eligible to aspire to a position
 * Rules:
 * 1. Disciplinary status must NOT be ACTIVE (GATE)
 * 2. Employee type must be PERMANENT (GATE)
 * 3. Cannot aspire to current position
 * 4. Grade must be within range [current-3, current+3]
 * 5. Job family must match OR have 1+ year experience in target family
 */
export function checkCareerPathEligibility(
  employee: Employee,
  targetPosition: Position,
  experienceInTargetJobFamily?: number
): EligibilityResult {
  const reasons: string[] = [];
  const gate_failures: string[] = [];
  const warning_flags: string[] = [];

  // GATE 1: Disciplinary check
  if (employee.disciplinary_status === "ACTIVE") {
    gate_failures.push("DISCIPLINARY_ACTIVE");
    reasons.push("Karyawan memiliki kasus disiplin aktif");
  }

  // GATE 2: Employee type
  if (employee.employee_type !== "PERMANENT") {
    gate_failures.push("NON_PERMANENT_EMPLOYEE");
    reasons.push("Hanya karyawan PERMANENT yang eligible untuk aspirasi karir");
  }

  // Check 3: Current position
  if (employee.current_position_id === targetPosition.position_id) {
    reasons.push("Tidak bisa beraspirasi ke posisi saat ini");
    return { eligible: false, reasons, gate_failures };
  }

  // Check 4: Grade range
  const gradeDiff = targetPosition.grade_jabatan - employee.current_grade_jabatan;
  if (gradeDiff < -3 || gradeDiff > 3) {
    reasons.push(`Grade target (${targetPosition.grade_jabatan}) diluar jangkauan dari grade saat ini (${employee.current_grade_jabatan}). Max ±3 grade.`);
    return { eligible: false, reasons, gate_failures };
  }

  // Check 5: Job family
  if (employee.job_family_current !== targetPosition.job_family) {
    // Check experience in target job family
    const yearsExperience = experienceInTargetJobFamily || 0;
    if (yearsExperience < 1) {
      reasons.push(`Job family berbeda (${employee.job_family_current} → ${targetPosition.job_family}) dan pengalaman di target family < 1 tahun`);
      return { eligible: false, reasons, gate_failures };
    } else {
      warning_flags.push("CROSS_JOB_FAMILY");
    }
  }

  // If has gate failures, not eligible
  if (gate_failures.length > 0) {
    return {
      eligible: false,
      reasons,
      gate_failures,
      warning_flags,
    };
  }

  return {
    eligible: true,
    reasons: ["Memenuhi semua kriteria eligibility"],
    gate_failures: [],
    warning_flags,
  };
}

// ==================== TALENT POOL ELIGIBILITY ====================

/**
 * Check if employee is eligible for Talent Pool (EQS calculation)
 * Same as Career Path eligibility + must have at least 1 aspiration
 */
export function checkTalentPoolEligibility(
  employee: Employee,
  targetPosition: Position,
  hasAspiration: boolean,
  experienceInTargetJobFamily?: number
): EligibilityResult {
  // First check career path eligibility
  const careerPathEligibility = checkCareerPathEligibility(
    employee,
    targetPosition,
    experienceInTargetJobFamily
  );

  if (!careerPathEligibility.eligible) {
    return careerPathEligibility;
  }

  // Additional check: must have aspiration
  if (!hasAspiration) {
    return {
      eligible: false,
      reasons: ["Tidak ada aspirasi untuk posisi ini"],
      gate_failures: ["NO_ASPIRATION"],
    };
  }

  return {
    eligible: true,
    reasons: ["Eligible untuk Talent Pool"],
    gate_failures: [],
    warning_flags: careerPathEligibility.warning_flags,
  };
}

// ==================== TALENT REVIEW ELIGIBILITY ====================

/**
 * Check if employee is eligible for Talent Review
 * Rules:
 * 1. Must be PERMANENT employee
 * 2. Tenure in current grade ≥ 12 months (1 year)
 * 3. Not under active disciplinary case
 * 4. Must have EQS score (indicating participation in talent pool)
 */
export function checkTalentReviewEligibility(
  employee: Employee,
  tenureMonthsInGrade: number,
  hasEQSScore: boolean
): EligibilityResult {
  const reasons: string[] = [];
  const gate_failures: string[] = [];
  const warning_flags: string[] = [];

  // Check 1: Employee type
  if (employee.employee_type !== "PERMANENT") {
    gate_failures.push("NON_PERMANENT");
    reasons.push("Hanya karyawan PERMANENT eligible untuk Talent Review");
  }

  // Check 2: Tenure in grade
  if (tenureMonthsInGrade < 12) {
    gate_failures.push("TENURE_GRADE_LT_1_YEAR");
    reasons.push(`Tenure di grade saat ini (${tenureMonthsInGrade} bulan) kurang dari 12 bulan`);
  }

  // Check 3: Disciplinary
  if (employee.disciplinary_status === "ACTIVE") {
    gate_failures.push("DISCIPLINARY_ACTIVE");
    reasons.push("Karyawan memiliki kasus disiplin aktif");
  }

  // Check 4: EQS Score (optional but recommended)
  if (!hasEQSScore) {
    warning_flags.push("NO_EQS_SCORE");
    // Not a blocker, just a warning
  }

  if (gate_failures.length > 0) {
    return {
      eligible: false,
      reasons,
      gate_failures,
      warning_flags,
    };
  }

  return {
    eligible: true,
    reasons: ["Eligible untuk Talent Review"],
    gate_failures: [],
    warning_flags,
  };
}

// ==================== PERIODIC REVIEW FLAGS ====================

/**
 * Check if employee requires periodic review
 * Flags:
 * - Position tenure ≥ 3 years
 * - Grade tenure ≥ 3 years
 * - External assignment ≥ 3 years
 * - Contract expiring within 6 months
 */
export interface PeriodicReviewFlags {
  requires_review: boolean;
  flags: {
    position_tenure_3_years: boolean;
    grade_tenure_3_years: boolean;
    external_assignment_3_years: boolean;
    contract_expiry_6_months: boolean;
  };
  details: string[];
}

export function checkPeriodicReviewFlags(
  employee: Employee,
  tenureMonthsInPosition: number,
  tenureMonthsInGrade: number,
  externalAssignmentMonths?: number,
  contractExpiryDate?: string
): PeriodicReviewFlags {
  const flags = {
    position_tenure_3_years: tenureMonthsInPosition >= 36,
    grade_tenure_3_years: tenureMonthsInGrade >= 36,
    external_assignment_3_years: (externalAssignmentMonths || 0) >= 36,
    contract_expiry_6_months: false,
  };

  const details: string[] = [];

  if (flags.position_tenure_3_years) {
    details.push(`Tenure di posisi: ${(tenureMonthsInPosition / 12).toFixed(1)} tahun (≥3 tahun)`);
  }

  if (flags.grade_tenure_3_years) {
    details.push(`Tenure di grade: ${(tenureMonthsInGrade / 12).toFixed(1)} tahun (≥3 tahun)`);
  }

  if (flags.external_assignment_3_years) {
    details.push(`External assignment: ${((externalAssignmentMonths || 0) / 12).toFixed(1)} tahun (≥3 tahun)`);
  }

  // Check contract expiry
  if (contractExpiryDate) {
    const expiryDate = new Date(contractExpiryDate);
    const today = new Date();
    const monthsUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsUntilExpiry <= 6 && monthsUntilExpiry > 0) {
      flags.contract_expiry_6_months = true;
      details.push(`Kontrak expire dalam ${Math.floor(monthsUntilExpiry)} bulan`);
    }
  }

  const requires_review =
    flags.position_tenure_3_years ||
    flags.grade_tenure_3_years ||
    flags.external_assignment_3_years ||
    flags.contract_expiry_6_months;

  return {
    requires_review,
    flags,
    details,
  };
}

// ==================== SUCCESSION DESIGNATION ELIGIBILITY ====================

/**
 * Check if employee is eligible to be designated as successor
 * Rules:
 * 1. Must be in Talent Pool (have EQS score)
 * 2. EQS score must be ≥ 70 (Qualified or better)
 * 3. Talent Cluster must not be "UNFIT"
 * 4. Must be PERMANENT employee
 * 5. No active disciplinary case
 */
export function checkSuccessionEligibility(
  employee: Employee,
  eqsScore: number | null,
  talentCluster?: string
): EligibilityResult {
  const reasons: string[] = [];
  const gate_failures: string[] = [];

  // Check 1: Must have EQS score
  if (eqsScore === null || eqsScore === undefined) {
    gate_failures.push("NO_EQS_SCORE");
    reasons.push("Tidak memiliki EQS score (belum ada di Talent Pool)");
  }

  // Check 2: EQS score threshold
  if (eqsScore !== null && eqsScore < 70) {
    gate_failures.push("EQS_BELOW_THRESHOLD");
    reasons.push(`EQS score (${eqsScore.toFixed(2)}) di bawah threshold 70`);
  }

  // Check 3: Talent Cluster
  if (talentCluster === "UNFIT") {
    gate_failures.push("TALENT_CLUSTER_UNFIT");
    reasons.push("Talent Cluster: UNFIT");
  }

  // Check 4: Employee type
  if (employee.employee_type !== "PERMANENT") {
    gate_failures.push("NON_PERMANENT");
    reasons.push("Hanya karyawan PERMANENT eligible untuk succession");
  }

  // Check 5: Disciplinary
  if (employee.disciplinary_status === "ACTIVE") {
    gate_failures.push("DISCIPLINARY_ACTIVE");
    reasons.push("Karyawan memiliki kasus disiplin aktif");
  }

  if (gate_failures.length > 0) {
    return {
      eligible: false,
      reasons,
      gate_failures,
    };
  }

  return {
    eligible: true,
    reasons: ["Eligible untuk designation sebagai successor"],
    gate_failures: [],
  };
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get human-readable explanation for ineligibility
 */
export function getIneligibilityExplanation(result: EligibilityResult): string {
  if (result.eligible) {
    return "Eligible";
  }

  return result.reasons.join("; ");
}

/**
 * Check if eligibility is blocked by gate failures (vs. soft warnings)
 */
export function isHardBlocked(result: EligibilityResult): boolean {
  return !result.eligible && (result.gate_failures?.length || 0) > 0;
}
