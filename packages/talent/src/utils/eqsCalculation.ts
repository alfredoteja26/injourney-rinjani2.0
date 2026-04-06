/**
 * EQS (Employee Qualification Score) Calculation Utilities
 * Based on PRD Formula:
 * EQS = (Kinerja × 25%) + (Kompetensi × 20%) + (Rekam Jejak × 5%) + 
 *       (Pengalaman × 15%) + (Pelatihan × 10%) + (Aspirasi × 10%) + 
 *       (Penghargaan × 5%) + (Kontribusi Sosial × 5%)
 * 
 * Rentang nilai: 0 - 120 (karena Kinerja Outstanding = 120)
 */

// ====================================
// 1. KINERJA (Bobot: 25%)
// ====================================
export type PerformanceRating = "Outstanding" | "Above Target" | "On Target" | "Below Target" | "Poor";

export const PERFORMANCE_SCORES: Record<PerformanceRating, number> = {
  "Outstanding": 120,
  "Above Target": 110,
  "On Target": 100,
  "Below Target": 75,
  "Poor": 50
};

/**
 * Hitung skor kinerja berdasarkan rata-rata 3 tahun terakhir
 * @param ratings Array of performance ratings (max 3 years)
 * @returns Score 0-120
 */
export function calculatePerformanceScore(ratings: PerformanceRating[]): number {
  if (ratings.length === 0) return 100; // Default untuk karyawan baru
  
  const scores = ratings.map(rating => PERFORMANCE_SCORES[rating]);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  return Math.round(average * 100) / 100; // 2 decimal places
}

// ====================================
// 2. KOMPETENSI (Bobot: 20%)
// ====================================
/**
 * Job Fit Score dari Competency Assessment
 * @param jobFitScore Score from assessment (0-100)
 * @returns Score 0-100
 */
export function calculateCompetencyScore(jobFitScore: number): number {
  return Math.min(100, Math.max(0, jobFitScore));
}

// ====================================
// 3. REKAM JEJAK (Bobot: 5%)
// ====================================
export type DisciplinaryStatus = "Clean" | "Past" | "Active";

export const DISCIPLINARY_SCORES: Record<DisciplinaryStatus, number> = {
  "Clean": 100,        // Tidak pernah hukuman disiplin
  "Past": 50,          // Pernah hukuman (≤5 tahun terakhir)
  "Active": 0          // Sedang menjalani hukuman
};

/**
 * Hitung skor rekam jejak
 * @param status Disciplinary status
 * @returns Score 0-100
 */
export function calculateDisciplinaryScore(status: DisciplinaryStatus): number {
  return DISCIPLINARY_SCORES[status];
}

// ====================================
// 4. PENGALAMAN JOB FAMILY (Bobot: 15%)
// ====================================
/**
 * Hitung skor pengalaman berdasarkan lama di Job Family target
 * @param yearsInJobFamily Years of experience in target job family
 * @returns Score 0-100
 */
export function calculateExperienceScore(yearsInJobFamily: number): number {
  if (yearsInJobFamily >= 6) return 100;
  if (yearsInJobFamily >= 3) return 75;
  if (yearsInJobFamily >= 1) return 50;
  return 0;
}

// ====================================
// 5. PELATIHAN & SERTIFIKASI (Bobot: 10%)
// ====================================
/**
 * Hitung skor pelatihan
 * Komponen: (Pelatihan Penjenjangan × 50%) + (Sertifikasi × 50%)
 * @param hasRelevantTraining Ada pelatihan penjenjangan relevan
 * @param hasRelevantCertification Ada sertifikasi relevan
 * @returns Score 0-100
 */
export function calculateTrainingScore(
  hasRelevantTraining: boolean,
  hasRelevantCertification: boolean
): number {
  const trainingScore = hasRelevantTraining ? 100 : 0;
  const certificationScore = hasRelevantCertification ? 100 : 0;
  
  return (trainingScore * 0.5) + (certificationScore * 0.5);
}

// ====================================
// 6. ASPIRASI (Bobot: 10%)
// ====================================
export type AspirationType = "Supervisor" | "Job Holder" | "Unit" | "Individual";

export const ASPIRATION_WEIGHTS: Record<AspirationType, number> = {
  "Supervisor": 30,
  "Job Holder": 25,
  "Unit": 25,
  "Individual": 20
};

/**
 * Hitung skor aspirasi secara akumulatif
 * Formula: SUM(bobot_sumber_aspirasi)
 * Max Score: 100 (jika semua sumber ada: 30+25+25+20 = 100)
 * @param aspirationSources Array of aspiration types
 * @returns Score 0-100
 */
export function calculateAspirationScore(aspirationSources: AspirationType[]): number {
  if (aspirationSources.length === 0) return 0;
  
  const totalScore = aspirationSources.reduce((sum, source) => sum + (ASPIRATION_WEIGHTS[source] || 0), 0);
  
  return Math.min(100, totalScore);
}

// ====================================
// 7. TES - TALENT EVALUATION SCORE (Bobot: 10%)
// ====================================
/**
 * Talent Evaluation Score from TES Engine
 * @param tesScore Score from TES Engine (0-100)
 * @returns Score 0-100
 */
export function calculateTESScore(tesScore: number): number {
  return Math.min(100, Math.max(0, tesScore));
}

// ====================================
// TOTAL EQS CALCULATION
// ====================================
export interface EQSComponents {
  performance: number;           // 0-120
  competency: number;            // 0-100
  disciplinary: number;          // 0-100 (GATE - not scored)
  experience: number;            // 0-100
  training: number;              // 0-100
  aspiration: number;            // 0-100
  tes: number;                   // 0-100
}

export interface EQSBreakdown extends EQSComponents {
  total: number;
  contributions: {
    performance: number;
    competency: number;
    disciplinary: number;
    experience: number;
    training: number;
    aspiration: number;
    tes: number;
  };
}

/**
 * Hitung total EQS berdasarkan semua komponen
 * Formula: EQS-2025-12-18
 * Performance 20% + Competency 20% + Experience 20% + Aspiration 10% + Training 10% + TES 10%
 * Disciplinary: GATE (not scored)
 * @param components EQS component scores
 * @returns Complete EQS breakdown with total score
 */
export function calculateTotalEQS(components: EQSComponents): EQSBreakdown {
  const weights = {
    performance: 0.20,   // Changed from 0.25
    competency: 0.20,
    disciplinary: 0,     // GATE - not scored
    experience: 0.20,    // Changed from 0.15
    training: 0.10,
    aspiration: 0.10,    // Changed from 0.20
    tes: 0.10            // New component
  };

  const contributions = {
    performance: components.performance * weights.performance,
    competency: components.competency * weights.competency,
    disciplinary: 0, // GATE component, no contribution
    experience: components.experience * weights.experience,
    training: components.training * weights.training,
    aspiration: components.aspiration * weights.aspiration,
    tes: components.tes * weights.tes
  };

  const total = Object.values(contributions).reduce((sum, contribution) => sum + contribution, 0);

  return {
    ...components,
    contributions,
    total: Math.round(total * 100) / 100 // 2 decimal places
  };
}

// ====================================
// HELPER FUNCTIONS
// ====================================

/**
 * Get color class for score based on ranges
 * Gradient: Red (Low ≤65) → Yellow (Mid 66-85) → Light Green (High ≥95)
 * @param score Score value
 * @param max Maximum possible score
 * @returns Tailwind color class
 */
export function getScoreColorClass(score: number, max: number = 100): string {
  const percentage = (score / max) * 100;
  
  if (max === 120) {
    // Special case for performance (can go up to 120)
    // Normalize to 0-100 scale for color determination
    const normalizedPercentage = (score / 120) * 100;
    
    if (normalizedPercentage >= 95) return "text-green-600";      // High (≥95): Bright Green
    if (normalizedPercentage >= 85) return "text-green-500";      // Good (85-94): Green
    if (normalizedPercentage >= 75) return "text-yellow-500";     // Medium-High (75-84): Yellow
    if (normalizedPercentage >= 65) return "text-orange-500";     // Medium-Low (65-74): Orange
    return "text-red-600";                                        // Low (<65): Red
  }
  
  // Standard 0-100 scale
  if (percentage >= 95) return "text-green-600";      // High (≥95): Bright Green
  if (percentage >= 85) return "text-green-500";      // Good (85-94): Green
  if (percentage >= 75) return "text-yellow-500";     // Medium-High (75-84): Yellow
  if (percentage >= 65) return "text-orange-500";     // Medium-Low (65-74): Orange
  return "text-red-600";                              // Low (<65): Red
}

/**
 * Get progress bar color class for score using Rinjani color palette
 * Based on guidelines: colour coding by score ranges
 * @param componentName Name of the EQS component
 * @param score The actual score value
 * @param maxScore Maximum score for the component
 * @returns Inline style object with background color
 */
export function getProgressBarColorByComponent(componentName: string, score: number = 0, maxScore: number = 100): { backgroundColor: string } {
  // For Kinerja (Performance) - Scale 0-120
  if (componentName === 'performance' || maxScore === 120) {
    const percentage = (score / 120) * 100;
    
    if (percentage >= 83.33) return { backgroundColor: '#1565C0' }; // 100-120: Outstanding (Blue)
    if (percentage >= 75) return { backgroundColor: '#2E7D32' };    // 90-99: Excellent (Dark Green)
    if (percentage >= 66.67) return { backgroundColor: '#43A047' }; // 80-89: Good (Green)
    if (percentage >= 58.33) return { backgroundColor: '#F9A825' }; // 70-79: Fair (Yellow)
    if (percentage >= 50) return { backgroundColor: '#EF6C00' };    // 60-69: Below Average (Orange)
    return { backgroundColor: '#C62828' };                           // 0-59: Poor (Red)
  }
  
  // For Rekam Jejak (Disciplinary) - Special case: based on actual score value
  if (componentName === 'disciplinary') {
    if (score === 100) return { backgroundColor: '#6A1B9A' }; // Clean (Purple)
    if (score >= 50) return { backgroundColor: '#F9A825' };   // Past issues (Yellow)
    return { backgroundColor: '#C62828' };                     // Active issues (Red)
  }
  
  // For TES - Use brand teal color
  if (componentName === 'tes') {
    if (score >= 90) return { backgroundColor: '#00858A' };  // 90-100: Primary teal
    if (score >= 80) return { backgroundColor: '#31C6B1' };  // 80-89: Lighter teal
    if (score >= 70) return { backgroundColor: '#F9A825' };  // 70-79: Yellow
    if (score >= 60) return { backgroundColor: '#EF6C00' };  // 60-69: Orange
    return { backgroundColor: '#C62828' };                    // 0-59: Red
  }
  
  // For standard components (0-100): Kompetensi, Pengalaman, Pelatihan, Aspirasi
  if (score >= 90) return { backgroundColor: '#2E7D32' };  // 90-100: Dark Green
  if (score >= 80) return { backgroundColor: '#43A047' };  // 80-89: Green
  if (score >= 70) return { backgroundColor: '#F9A825' };  // 70-79: Yellow
  if (score >= 60) return { backgroundColor: '#EF6C00' };  // 60-69: Orange
  return { backgroundColor: '#C62828' };                    // 0-59: Red
}

/**
 * Get score level label
 * @param score Score value
 * @param max Maximum possible score
 * @returns Level label
 */
export function getScoreLevel(score: number, max: number = 100): string {
  const percentage = (score / max) * 100;
  
  if (max === 120) {
    const normalizedPercentage = (score / 120) * 100;
    
    if (normalizedPercentage >= 95) return "Excellent";
    if (normalizedPercentage >= 85) return "High";
    if (normalizedPercentage >= 75) return "Good";
    if (normalizedPercentage >= 65) return "Fair";
    return "Low";
  }
  
  if (percentage >= 95) return "Excellent";
  if (percentage >= 85) return "High";
  if (percentage >= 75) return "Good";
  if (percentage >= 65) return "Fair";
  return "Low";
}

/**
 * Validate if employee is eligible for promotion
 * Based on business rule: Karyawan dengan rekam jejak sedang hukuman (skor 0) tidak eligible
 * @param components EQS components
 * @returns Boolean indicating eligibility
 */
export function isEligibleForPromotion(components: EQSComponents): boolean {
  return components.disciplinary > 0;
}