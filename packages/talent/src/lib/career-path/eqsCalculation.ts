/**
 * EQS (Employee Qualification Score) Calculation
 * Used for ranking candidates in Job Holder Aspiration
 * 
 * Total Score: 0-100 points
 * Components with weights (Based on Talent Pool Formula EQS-2025-12-18):
 * - Performance (20%)
 * - Competency/Job Fit (20%)
 * - Experience (20%)
 * - Aspiration (10%)
 * - Training & Certification (10%)
 * - TES (Talent Evaluation Score) (10%)
 * 
 * Note: Track Record (Disciplinary) is now a GATE (Eligibility), not a score component.
 */

import type { Employee, Position, Aspiration, EQSScore, EQSBreakdown } from '../../types/careerPath';

/**
 * Calculate EQS score for a candidate for a specific position
 */
export function calculateEQS(
  employee: Employee,
  targetPosition: Position,
  aspirations: Aspiration[]
): EQSScore {
  // For prototype, using mock scoring based on available data
  
  // 1. Performance Score (20% Weight) - Based on grade level as proxy for now
  // Mocking a rating score 0-120 then taking 20%
  const mockPerformanceRating = Math.min(120, (employee.grade_jabatan / 20) * 100); 
  // Ensure reasonably high for demo if grade is decent
  const performanceScore = Math.min(20, (mockPerformanceRating / 100) * 20);
  
  // 2. Competency Score (20% Weight) - Based on job family match
  const jobFamilyMatch = employee.job_family === targetPosition.job_family;
  // If match, high score (e.g. 100/100 * 20% = 20), else lower (e.g. 60/100 * 20% = 12)
  const competencyScore = jobFamilyMatch ? 20 : 12;
  
  // 3. Experience Score (20% Weight) - Based on grade proximity
  const gradeDiff = Math.abs(employee.grade_jabatan - targetPosition.grade_jabatan);
  // Closer grade = higher experience score. 
  // Max 20 points. Deduct 2 points per grade gap.
  const experienceScore = Math.max(0, 20 - (gradeDiff * 4));
  
  // 4. Aspiration Score (10% Weight) - Has expressed aspiration?
  // Check if employee has aspiration for this position or similar
  const hasAspiration = aspirations.some(a => 
    a.emp_id === employee.id && 
    (a.pos_id === targetPosition.id || a.type === 'PROMOSI')
  );
  // If yes: full 10 points. If no: partial (maybe 5 points for potential)
  const aspirationScore = hasAspiration ? 10 : 5;
  
  // 5. Training Score (10% Weight) - Mock score based on status
  // Permanent employees assumed to have better training records for demo
  const trainingScore = employee.status === 'PERMANENT' ? 10 : 6;
  
  // 6. TES Score (10% Weight) - Mock data
  // Randomize slightly based on name length to be deterministic but varied
  const mockTesVal = 70 + (employee.name.length % 30); // 70-100 range
  const tesScore = (mockTesVal / 100) * 10;
  
  // Calculate total
  const breakdown: EQSBreakdown = {
    performance: Number(performanceScore.toFixed(1)),
    competency: Number(competencyScore.toFixed(1)),
    experience: Number(experienceScore.toFixed(1)),
    aspiration: Number(aspirationScore.toFixed(1)),
    training: Number(trainingScore.toFixed(1)),
    tes: Number(tesScore.toFixed(1))
  };
  
  const total = Object.values(breakdown).reduce((sum, val) => sum + (val || 0), 0);
  
  // Determine rating
  let rating: EQSScore['rating'];
  if (total >= 85) rating = 'HIGHLY_QUALIFIED';
  else if (total >= 70) rating = 'QUALIFIED';
  else if (total >= 50) rating = 'NEEDS_DEVELOPMENT';
  else rating = 'NOT_RECOMMENDED';
  
  // Identify strengths and areas to improve
  const strengths: string[] = [];
  const areasToImprove: string[] = [];
  
  if (breakdown.aspiration >= 8) strengths.push('Strong aspiration alignment');
  else areasToImprove.push('Limited aspiration match');
  
  if (breakdown.competency >= 16) strengths.push('Excellent competency match');
  else areasToImprove.push('Competency gap needs development');
  
  if (breakdown.performance >= 16) strengths.push('Outstanding performance');
  else if (breakdown.performance < 10) areasToImprove.push('Performance improvement needed');
  
  if (breakdown.experience >= 16) strengths.push('High relevant experience');
  else if (breakdown.experience < 10) areasToImprove.push('Limited relevant experience');
  
  if (breakdown.tes >= 8) strengths.push('High Potential (TES)');
  
  return {
    total,
    breakdown,
    rating,
    strengths,
    areasToImprove
  };
}

/**
 * Get rating color class
 */
export function getEQSRatingColor(rating: EQSScore['rating']): string {
  switch (rating) {
    case 'HIGHLY_QUALIFIED':
      return 'var(--nine-highpot)'; // Green
    case 'QUALIFIED':
      return 'var(--nine-solid)'; // Blue/Teal (or whatever primary is) - actually usually green-ish or blue
    case 'NEEDS_DEVELOPMENT':
      return 'var(--nine-emerging)'; // Yellow/Orange
    case 'NOT_RECOMMENDED':
      return 'var(--destructive)'; // Red
  }
}

/**
 * Get color based on score value (0-100)
 */
export function getEQSColor(score: number): string {
  if (score >= 85) return 'var(--nine-highpot)';
  if (score >= 70) return 'var(--nine-solid)';
  if (score >= 50) return 'var(--nine-emerging)';
  return 'var(--destructive)';
}

/**
 * Get rating label
 */
export function getEQSRatingLabel(rating: EQSScore['rating']): string {
  switch (rating) {
    case 'HIGHLY_QUALIFIED':
      return 'Highly Qualified';
    case 'QUALIFIED':
      return 'Qualified';
    case 'NEEDS_DEVELOPMENT':
      return 'Needs Development';
    case 'NOT_RECOMMENDED':
      return 'Not Recommended';
  }
}

/**
 * Get rating icon
 */
export function getEQSRatingIcon(rating: EQSScore['rating']): string {
  switch (rating) {
    case 'HIGHLY_QUALIFIED':
      return '🟢';
    case 'QUALIFIED':
      return '🔵'; // Changed to Blue for Qualified to distinguish
    case 'NEEDS_DEVELOPMENT':
      return '🟠';
    case 'NOT_RECOMMENDED':
      return '🔴';
  }
}

/**
 * Calculate ranking for a candidate for a specific position
 * Returns the rank (1-based) and total candidates
 */
export function calculateRanking(
  employeeId: string,
  positionId: string,
  employees: Employee[],
  aspirations: Aspiration[],
  position: Position
): { rank: number; totalCandidates: number; eqsScore: number } | null {
  // Get all candidates who have aspiration for this position
  const candidateIds = new Set<string>();
  
  // Add employees from all aspiration sources for this position
  aspirations
    .filter(a => a.pos_id === positionId)
    .forEach(a => candidateIds.add(a.emp_id));
  
  if (candidateIds.size === 0) {
    return null;
  }
  
  // Calculate EQS scores for all candidates
  const candidateScores = Array.from(candidateIds)
    .map(id => {
      const employee = employees.find(e => e.id === id);
      if (!employee) return null;
      
      const eqs = calculateEQS(employee, position, aspirations);
      return {
        employeeId: id,
        score: eqs.total
      };
    })
    .filter((item): item is { employeeId: string; score: number } => item !== null);
  
  // Sort by score descending
  candidateScores.sort((a, b) => b.score - a.score);
  
  // Find employee's rank
  const employeeIndex = candidateScores.findIndex(c => c.employeeId === employeeId);
  
  if (employeeIndex === -1) {
    return null;
  }
  
  return {
    rank: employeeIndex + 1,
    totalCandidates: candidateScores.length,
    eqsScore: candidateScores[employeeIndex].score
  };
}
