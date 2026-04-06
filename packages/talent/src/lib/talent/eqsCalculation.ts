/**
 * EQS (Employee Qualification Score) Calculation Engine
 * Based on: PRD-Rinjani-Talent.md + MockData-Talent.md
 * 
 * Formula Version: EQS-2025-12-18
 * 6 Components with weights:
 * - Performance (20%)
 * - Competency/Job Fit (20%)
 * - Experience (20%)
 * - Aspiration (10%)
 * - Training & Certification (10%)
 * - TES (10%)
 * 
 * Disciplinary Status acts as a GATE (not a score component)
 * Total EQS capped at 100
 */

import type {
  Employee,
  Position,
  EQSScore,
  EQSBreakdown,
  EQSComponentBreakdown,
  Aspiration,
  PerformanceRating,
  EQSBand,
  AspirationSource,
} from '../../types/talent';

// ==================== CONSTANTS ====================

export const EQS_FORMULA_VERSION = "EQS-2025-12-18";

export const EQS_WEIGHTS = {
  performance: 0.20,
  competency_job_fit: 0.20,
  experience: 0.20,
  aspiration: 0.10,
  training_certification: 0.10,
  tes: 0.10,
};

export const ASPIRATION_WEIGHTS = {
  SUPERVISOR: 30,
  JOB_HOLDER: 25,
  UNIT: 25,
  INDIVIDUAL: 20,
};

export const PERFORMANCE_SCORES: Record<PerformanceRating, number> = {
  OUTSTANDING: 120,
  ABOVE_TARGET: 110,
  ON_TARGET: 100,
  BELOW_TARGET: 75,
  POOR: 50,
};

// ==================== ELIGIBILITY CHECKS ====================

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
}

export function checkEligibility(
  employee: Employee,
  targetPosition: Position
): EligibilityResult {
  const reasons: string[] = [];

  // 1. Disciplinary check (GATE)
  if (employee.disciplinary_status === "ACTIVE") {
    reasons.push("DISCIPLINARY_ACTIVE");
    return { eligible: false, reasons };
  }

  // 2. Employee type must be PERMANENT
  if (employee.employee_type !== "PERMANENT") {
    reasons.push("NON_PERMANENT_EMPLOYEE");
    return { eligible: false, reasons };
  }

  // 3. Cannot aspire to current position
  if (employee.current_position_id === targetPosition.position_id) {
    reasons.push("CURRENT_POSITION");
    return { eligible: false, reasons };
  }

  // 4. Grade range check: target must be within [current-3, current+3]
  const gradeDiff = targetPosition.grade_jabatan - employee.current_grade_jabatan;
  if (gradeDiff < -3 || gradeDiff > 3) {
    reasons.push("GRADE_OUT_OF_RANGE");
    return { eligible: false, reasons };
  }

  // 5. Job family check: same job family OR have 1+ year experience in target job family
  // For mock purposes, we simplify: if different job family, mark as ineligible
  // In production, this would check career history for relevant experience
  if (employee.job_family_current !== targetPosition.job_family) {
    // Check if employee has experience in target job family (mock: assume not)
    reasons.push("JOB_FAMILY_MISMATCH_INSUFFICIENT_EXPERIENCE");
    return { eligible: false, reasons };
  }

  return { eligible: true, reasons: [] };
}

// ==================== COMPONENT CALCULATIONS ====================

/**
 * 1. Performance Component (20%)
 * Based on average performance rating over last 3 years
 */
export function calculatePerformanceScore(
  performanceHistory: PerformanceRating[]
): EQSComponentBreakdown {
  // For mock, if no history provided, use default
  if (!performanceHistory || performanceHistory.length === 0) {
    return {
      raw: 100,
      weight: EQS_WEIGHTS.performance,
      contribution: 100 * EQS_WEIGHTS.performance,
      source: "Performance Appraisal (default)",
    };
  }

  // Calculate average of last 3 years (or available years)
  const scores = performanceHistory.map(rating => PERFORMANCE_SCORES[rating]);
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return {
    raw: avgScore,
    weight: EQS_WEIGHTS.performance,
    contribution: avgScore * EQS_WEIGHTS.performance,
    source: `Performance Appraisal (${performanceHistory.length}y avg)`,
  };
}

/**
 * 2. Competency/Job Fit Component (20%)
 * Based on competency assessment score for target position
 */
export function calculateCompetencyScore(jobFitScore: number): EQSComponentBreakdown {
  // jobFitScore should be 0-100 from competency assessment
  return {
    raw: jobFitScore,
    weight: EQS_WEIGHTS.competency_job_fit,
    contribution: jobFitScore * EQS_WEIGHTS.competency_job_fit,
    source: "Competency Assessment",
  };
}

/**
 * 3. Experience Component (20%)
 * Based on years in job family and total experience
 */
export function calculateExperienceScore(
  yearsInJobFamily: number,
  totalYears: number
): EQSComponentBreakdown {
  // Scoring logic:
  // - <3 years in job family: 50
  // - 3-5 years: 75
  // - 5-8 years: 90
  // - 8+ years: 100
  let score = 50;
  if (yearsInJobFamily >= 8) score = 100;
  else if (yearsInJobFamily >= 5) score = 90;
  else if (yearsInJobFamily >= 3) score = 75;

  // Bonus for extensive total experience
  if (totalYears >= 15) score = Math.min(100, score + 10);

  return {
    raw: score,
    weight: EQS_WEIGHTS.experience,
    contribution: score * EQS_WEIGHTS.experience,
    source: `Job History (${yearsInJobFamily}y in family, ${totalYears}y total)`,
  };
}

/**
 * 4. Aspiration Component (10%)
 * Based on accumulated aspiration sources
 * Weights: SUPERVISOR=30, JOB_HOLDER=25, UNIT=25, INDIVIDUAL=20
 * Sum of present source weights, capped at 100
 */
export function calculateAspirationScore(
  aspirationSources: AspirationSource[]
): EQSComponentBreakdown {
  if (!aspirationSources || aspirationSources.length === 0) {
    return {
      raw: 0,
      weight: EQS_WEIGHTS.aspiration,
      contribution: 0,
      source: "No aspirations",
    };
  }

  // Sum weights from present sources
  let sumWeights = 0;
  aspirationSources.forEach(source => {
    sumWeights += ASPIRATION_WEIGHTS[source] || 0;
  });

  // Cap at 100
  const cappedScore = Math.min(100, sumWeights);

  return {
    raw: cappedScore,
    weight: EQS_WEIGHTS.aspiration,
    contribution: cappedScore * EQS_WEIGHTS.aspiration,
    source: `Career Path aspirations (${aspirationSources.join(", ")}: SUM=${sumWeights}, capped=${cappedScore})`,
  };
}

/**
 * 5. Training & Certification Component (10%)
 * Two sub-components: Training (50%) + Certification (50%)
 */
export function calculateTrainingScore(
  hasRelevantTraining: boolean,
  hasRelevantCertification: boolean
): EQSComponentBreakdown {
  const trainingScore = hasRelevantTraining ? 100 : 0;
  const certificationScore = hasRelevantCertification ? 100 : 0;
  
  // Average of both sub-components
  const avgScore = (trainingScore + certificationScore) / 2;

  return {
    raw: avgScore,
    weight: EQS_WEIGHTS.training_certification,
    contribution: avgScore * EQS_WEIGHTS.training_certification,
    source: `L&D Records (Training: ${hasRelevantTraining ? "✓" : "✗"}, Cert: ${hasRelevantCertification ? "✓" : "✗"})`,
  };
}

/**
 * 6. TES (Talent Evaluation Score) Component (10%)
 * From external TES assessment engine
 */
export function calculateTESScore(tesScore: number): EQSComponentBreakdown {
  // tesScore should be 0-100 from TES engine
  return {
    raw: tesScore,
    weight: EQS_WEIGHTS.tes,
    contribution: tesScore * EQS_WEIGHTS.tes,
    source: "TES Engine",
  };
}

// ==================== MAIN EQS CALCULATION ====================

export interface EQSCalculationInput {
  employee: Employee;
  targetPosition: Position;
  performanceHistory: PerformanceRating[];
  jobFitScore: number;
  yearsInJobFamily: number;
  totalYearsExperience: number;
  aspirationSources: AspirationSource[];
  hasRelevantTraining: boolean;
  hasRelevantCertification: boolean;
  tesScore: number;
}

export function calculateEQS(input: EQSCalculationInput): EQSScore {
  const {
    employee,
    targetPosition,
    performanceHistory,
    jobFitScore,
    yearsInJobFamily,
    totalYearsExperience,
    aspirationSources,
    hasRelevantTraining,
    hasRelevantCertification,
    tesScore,
  } = input;

  // Check eligibility first (GATE)
  const eligibility = checkEligibility(employee, targetPosition);
  
  if (!eligibility.eligible) {
    return {
      eqs_id: `EQS-${employee.employee_id}-${targetPosition.position_id}`,
      employee_id: employee.employee_id,
      target_position_id: targetPosition.position_id,
      eligible: false,
      eqs_score: null,
      eqs_band: null,
      formula_version: EQS_FORMULA_VERSION,
      calculated_at: new Date().toISOString(),
      ineligible_reason: eligibility.reasons.join(", "),
    };
  }

  // Calculate all components
  const performance = calculatePerformanceScore(performanceHistory);
  const competency = calculateCompetencyScore(jobFitScore);
  const experience = calculateExperienceScore(yearsInJobFamily, totalYearsExperience);
  const aspiration = calculateAspirationScore(aspirationSources);
  const training = calculateTrainingScore(hasRelevantTraining, hasRelevantCertification);
  const tes = calculateTESScore(tesScore);

  // Sum contributions
  const totalScore =
    performance.contribution +
    competency.contribution +
    experience.contribution +
    aspiration.contribution +
    training.contribution +
    tes.contribution;

  // Cap at 100
  const finalScore = Math.min(100, totalScore);

  // Determine EQS Band
  const band = getEQSBand(finalScore);

  return {
    eqs_id: `EQS-${employee.employee_id}-${targetPosition.position_id}`,
    employee_id: employee.employee_id,
    target_position_id: targetPosition.position_id,
    eligible: true,
    eqs_score: Number(finalScore.toFixed(2)),
    eqs_band: band,
    formula_version: EQS_FORMULA_VERSION,
    calculated_at: new Date().toISOString(),
    component_breakdown: {
      performance,
      competency_job_fit: competency,
      experience,
      aspiration,
      training_certification: training,
      tes,
    },
    snapshot: {
      employee_snapshot: {
        employee_id: employee.employee_id,
        grade: employee.current_grade_jabatan,
        disciplinary: employee.disciplinary_status,
      },
      position_snapshot: {
        position_id: targetPosition.position_id,
        grade: targetPosition.grade_jabatan,
      },
      aspiration_sources: aspirationSources,
      inputs_hash: `hash-${Date.now()}`,
    },
  };
}

// ==================== EQS BAND CLASSIFICATION ====================

export function getEQSBand(score: number): EQSBand {
  if (score >= 85) return "Highly Qualified";
  if (score >= 70) return "Qualified";
  if (score >= 50) return "Moderately Qualified";
  return "Need Development";
}

// ==================== SCORE COLOR HELPERS ====================

export function getScoreColor(score: number): string {
  if (score >= 85) return "var(--success)";
  if (score >= 70) return "var(--primary)";
  if (score >= 50) return "var(--warning)";
  return "var(--destructive)";
}

export function getScoreColorClass(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

export function getBandColor(band: EQSBand): string {
  switch (band) {
    case "Highly Qualified":
      return "var(--success)";
    case "Qualified":
      return "var(--primary)";
    case "Moderately Qualified":
      return "var(--warning)";
    case "Need Development":
      return "var(--destructive)";
    default:
      return "var(--muted)";
  }
}

// ==================== COMPONENT PROGRESS HELPERS ====================

export function getComponentPercentage(contribution: number, weight: number): number {
  // Calculate what percentage of the max possible contribution (weight * 100) was achieved
  const maxContribution = weight * 100;
  return (contribution / maxContribution) * 100;
}

export function getComponentLabel(componentName: string): string {
  const labels: Record<string, string> = {
    performance: "Kinerja",
    competency_job_fit: "Kompetensi / Job Fit",
    experience: "Pengalaman",
    aspiration: "Aspirasi Karir",
    training_certification: "Pelatihan & Sertifikasi",
    tes: "TES (Talent Evaluation)",
  };
  return labels[componentName] || componentName;
}
