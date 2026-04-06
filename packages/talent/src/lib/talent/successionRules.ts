/**
 * Succession Planning Business Rules
 * Based on: PRD-Rinjani-Talent.md
 * 
 * Rules for:
 * - Shortlisting candidates
 * - Designating successors (Primary, Secondary, Tertiary)
 * - Readiness assessment
 * - KSP (Key Strategic Position) management
 */

import type {
  Position,
  Employee,
  ReadinessLevel,
  SuccessorDesignation,
  SuccessionShortlist,
  TalentPoolCandidate,
} from '../../types/talent';

// ==================== CONSTANTS ====================

export const SUCCESSION_RULES = {
  SHORTLIST_MIN: 3, // Minimum candidates in shortlist before designating
  SUCCESSOR_FINAL_PER_POSITION: 1, // Final successor count (but can have Primary + Secondary + Tertiary)
  KSP_SUCCESSOR_TARGET: 2, // Target: ≥2 successors for KSP positions
  MAX_SUCCESSORS_PER_POSITION: 3, // Primary + Secondary + Tertiary
};

export const READINESS_MONTHS: Record<ReadinessLevel, number> = {
  "READY_NOW": 0,
  "READY_IN_6_12_MONTHS": 9, // Average of 6-12
  "READY_IN_1_2_YEARS": 18, // Average of 1-2 years
};

// ==================== SUCCESSION BOARD STATUS ====================

/**
 * Determine succession board status based on position state
 */
export function getSuccessionBoardStatus(position: Position): {
  status: "VACANT" | "VACANT_SOON" | "TO_BE_REVIEWED" | "SHORTLIST_READY";
  reason: string;
} {
  // Check if vacant
  if (position.status === "VACANT") {
    return {
      status: "VACANT",
      reason: "Posisi kosong dan memerlukan pengisian segera",
    };
  }

  // Check if vacant soon (incumbent retiring/moving)
  if (position.retirement_date) {
    const retirementDate = new Date(position.retirement_date);
    const today = new Date();
    const monthsUntilRetirement = (retirementDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsUntilRetirement <= 12) {
      return {
        status: "VACANT_SOON",
        reason: `Incumbent akan pensiun dalam ${Math.floor(monthsUntilRetirement)} bulan`,
      };
    }
  }

  // Check if needs review (tenure ≥3 years)
  if (position.tenure_years && position.tenure_years >= 3) {
    return {
      status: "TO_BE_REVIEWED",
      reason: `Incumbent sudah ${position.tenure_years.toFixed(1)} tahun di posisi (≥3 tahun)`,
    };
  }

  // Check if has sufficient shortlist
  if ((position.candidate_count || 0) >= SUCCESSION_RULES.SHORTLIST_MIN) {
    return {
      status: "SHORTLIST_READY",
      reason: `${position.candidate_count} kandidat tersedia untuk review`,
    };
  }

  // Default: To be reviewed (needs attention)
  return {
    status: "TO_BE_REVIEWED",
    reason: "Posisi perlu review succession plan",
  };
}

// ==================== READINESS ASSESSMENT ====================

/**
 * Calculate estimated ready date based on readiness level
 */
export function calculateTargetReadyDate(readinessLevel: ReadinessLevel): string {
  const today = new Date();
  const monthsToAdd = READINESS_MONTHS[readinessLevel];
  
  const targetDate = new Date(today);
  targetDate.setMonth(targetDate.getMonth() + monthsToAdd);
  
  return targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Determine if candidate readiness matches position urgency
 */
export function assessReadinessMatch(
  candidateReadiness: ReadinessLevel,
  positionUrgency: "HIGH" | "MEDIUM" | "LOW"
): {
  match: "GOOD" | "ACCEPTABLE" | "POOR";
  reason: string;
} {
  // HIGH urgency (vacant or vacant soon)
  if (positionUrgency === "HIGH") {
    if (candidateReadiness === "READY_NOW") {
      return {
        match: "GOOD",
        reason: "Kandidat ready now, cocok untuk posisi urgent",
      };
    } else if (candidateReadiness === "READY_IN_6_12_MONTHS") {
      return {
        match: "ACCEPTABLE",
        reason: "Kandidat ready 6-12 bulan, bisa diakselerasi",
      };
    } else {
      return {
        match: "POOR",
        reason: "Kandidat ready 1-2 tahun, terlalu lama untuk posisi urgent",
      };
    }
  }

  // MEDIUM urgency (to be reviewed)
  if (positionUrgency === "MEDIUM") {
    if (candidateReadiness === "READY_NOW" || candidateReadiness === "READY_IN_6_12_MONTHS") {
      return {
        match: "GOOD",
        reason: "Kandidat ready dalam waktu dekat",
      };
    } else {
      return {
        match: "ACCEPTABLE",
        reason: "Kandidat ready 1-2 tahun, sesuai untuk planning jangka menengah",
      };
    }
  }

  // LOW urgency (filled, stable)
  return {
    match: "GOOD",
    reason: "Semua level readiness cocok untuk long-term planning",
  };
}

// ==================== SHORTLIST MANAGEMENT ====================

/**
 * Validate shortlist before allowing succession designation
 */
export function validateShortlist(shortlist: SuccessionShortlist[]): {
  valid: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Check minimum count
  if (shortlist.length < SUCCESSION_RULES.SHORTLIST_MIN) {
    reasons.push(`Shortlist harus minimal ${SUCCESSION_RULES.SHORTLIST_MIN} kandidat (saat ini: ${shortlist.length})`);
  }

  // Check for duplicate employees
  const employeeIds = shortlist.map(s => s.employee_id);
  const uniqueIds = new Set(employeeIds);
  if (employeeIds.length !== uniqueIds.size) {
    reasons.push("Shortlist mengandung kandidat duplikat");
  }

  // Check if all have EQS scores
  const missingEQS = shortlist.filter(s => !s.eqs_score);
  if (missingEQS.length > 0) {
    reasons.push(`${missingEQS.length} kandidat tidak memiliki EQS score`);
  }

  return {
    valid: reasons.length === 0,
    reasons,
  };
}

/**
 * Rank shortlist candidates by EQS score
 */
export function rankShortlist(shortlist: SuccessionShortlist[]): SuccessionShortlist[] {
  return [...shortlist].sort((a, b) => b.eqs_score - a.eqs_score);
}

// ==================== SUCCESSOR DESIGNATION ====================

/**
 * Validate successor designations for a position
 */
export function validateSuccessorDesignations(
  designations: SuccessorDesignation[]
): {
  valid: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Check tiers: should have at most 1 of each tier
  const tiers = designations.map(d => d.tier);
  const primaryCount = tiers.filter(t => t === "PRIMARY").length;
  const secondaryCount = tiers.filter(t => t === "SECONDARY").length;
  const tertiaryCount = tiers.filter(t => t === "TERTIARY").length;

  if (primaryCount > 1) {
    reasons.push("Maksimal 1 Primary successor per posisi");
  }
  if (secondaryCount > 1) {
    reasons.push("Maksimal 1 Secondary successor per posisi");
  }
  if (tertiaryCount > 1) {
    reasons.push("Maksimal 1 Tertiary successor per posisi");
  }

  // Check for duplicate employees across tiers
  const employeeIds = designations.map(d => d.employee_id);
  const uniqueIds = new Set(employeeIds);
  if (employeeIds.length !== uniqueIds.size) {
    reasons.push("Kandidat yang sama tidak bisa di-assign ke multiple tiers");
  }

  // Must have at least Primary
  if (primaryCount === 0 && designations.length > 0) {
    reasons.push("Harus ada Primary successor sebelum Secondary/Tertiary");
  }

  return {
    valid: reasons.length === 0,
    reasons,
  };
}

/**
 * Calculate succession coverage for KSP positions
 */
export function calculateSuccessionCoverage(positions: Position[]): {
  total_ksp: number;
  ksp_with_0_successors: number;
  ksp_with_1_successor: number;
  ksp_with_2_plus_successors: number;
  coverage_percentage: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
} {
  const kspPositions = positions.filter(p => p.is_ksp);
  const total_ksp = kspPositions.length;

  const ksp_with_0_successors = kspPositions.filter(p => (p.successor_count || 0) === 0).length;
  const ksp_with_1_successor = kspPositions.filter(p => (p.successor_count || 0) === 1).length;
  const ksp_with_2_plus_successors = kspPositions.filter(p => (p.successor_count || 0) >= 2).length;

  const coverage_percentage = total_ksp > 0 ? (ksp_with_2_plus_successors / total_ksp) * 100 : 0;

  let risk_level: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  if (coverage_percentage < 50) {
    risk_level = "HIGH";
  } else if (coverage_percentage < 80) {
    risk_level = "MEDIUM";
  }

  return {
    total_ksp,
    ksp_with_0_successors,
    ksp_with_1_successor,
    ksp_with_2_plus_successors,
    coverage_percentage: Number(coverage_percentage.toFixed(1)),
    risk_level,
  };
}

// ==================== DEVELOPMENT PLAN REQUIREMENTS ====================

/**
 * Determine development plan requirements based on readiness gap
 */
export function getDevelopmentPlanRequirements(
  currentReadiness: ReadinessLevel,
  targetRole: string
): {
  critical_areas: string[];
  suggested_duration_months: number;
  recommended_actions: string[];
} {
  const requirements = {
    critical_areas: [] as string[],
    suggested_duration_months: 0,
    recommended_actions: [] as string[],
  };

  switch (currentReadiness) {
    case "READY_NOW":
      requirements.suggested_duration_months = 3;
      requirements.critical_areas = ["Onboarding", "Knowledge Transfer"];
      requirements.recommended_actions = [
        "Job shadowing dengan incumbent",
        "Handover documentation review",
        "Stakeholder introduction",
      ];
      break;

    case "READY_IN_6_12_MONTHS":
      requirements.suggested_duration_months = 9;
      requirements.critical_areas = [
        "Technical Competencies",
        "Leadership Skills",
        "Stakeholder Management",
      ];
      requirements.recommended_actions = [
        "Leadership training program",
        "Mentoring dari incumbent atau senior leader",
        "Project assignment untuk exposure",
        "Competency gap closure training",
      ];
      break;

    case "READY_IN_1_2_YEARS":
      requirements.suggested_duration_months = 18;
      requirements.critical_areas = [
        "Strategic Thinking",
        "Business Acumen",
        "Change Management",
        "Technical Depth",
      ];
      requirements.recommended_actions = [
        "Comprehensive development program (Penjenjangan)",
        "Cross-functional assignments",
        "Executive coaching",
        "External certification pursuit",
        "Leadership project ownership",
      ];
      break;
  }

  return requirements;
}

// ==================== TIME-TO-FILL ANALYSIS ====================

/**
 * Calculate average time to fill vacant positions
 */
export function calculateTimeToFill(
  vacancyHistories: {
    position_id: string;
    vacancy_date: string;
    filled_date: string | null;
  }[]
): {
  average_days: number;
  median_days: number;
  fastest_days: number;
  slowest_days: number;
  still_vacant_count: number;
} {
  const filledPositions = vacancyHistories.filter(v => v.filled_date !== null);
  
  if (filledPositions.length === 0) {
    return {
      average_days: 0,
      median_days: 0,
      fastest_days: 0,
      slowest_days: 0,
      still_vacant_count: vacancyHistories.length,
    };
  }

  const daysToFill = filledPositions.map(v => {
    const vacancyDate = new Date(v.vacancy_date);
    const filledDate = new Date(v.filled_date!);
    return (filledDate.getTime() - vacancyDate.getTime()) / (1000 * 60 * 60 * 24);
  });

  daysToFill.sort((a, b) => a - b);

  const average_days = daysToFill.reduce((sum, days) => sum + days, 0) / daysToFill.length;
  const median_days = daysToFill[Math.floor(daysToFill.length / 2)];
  const fastest_days = daysToFill[0];
  const slowest_days = daysToFill[daysToFill.length - 1];
  const still_vacant_count = vacancyHistories.filter(v => v.filled_date === null).length;

  return {
    average_days: Math.round(average_days),
    median_days: Math.round(median_days),
    fastest_days: Math.round(fastest_days),
    slowest_days: Math.round(slowest_days),
    still_vacant_count,
  };
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get color code for succession coverage
 */
export function getSuccessorCountColor(count: number): string {
  if (count === 0) return "var(--destructive)"; // Red
  if (count === 1) return "var(--warning)"; // Yellow
  return "var(--success)"; // Green
}

/**
 * Get readiness level color
 */
export function getReadinessColor(readiness: ReadinessLevel): string {
  switch (readiness) {
    case "READY_NOW":
      return "var(--success)";
    case "READY_IN_6_12_MONTHS":
      return "var(--primary)";
    case "READY_IN_1_2_YEARS":
      return "var(--warning)";
    default:
      return "var(--muted)";
  }
}
