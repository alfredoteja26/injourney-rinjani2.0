export type Ranking = "primary" | "secondary" | "tertiary" | null;
export type ReadinessLevel = "ready_now" | "ready_short_term" | "ready_long_term"; // 1-2 years, 3+ years
export type RiskProfile = "low" | "medium" | "high";
export type TCTier = "tier_1" | "tier_2" | "tier_3";
export type VacancyStatus = "vacant" | "vacant_soon" | "to_review" | "filled";
export type PositionType = "ksp" | "struktural";

export interface Candidate {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  currentPosition: string;
  currentGrade?: string;
  eqsScore: number;
  isTopTalent: boolean;
  riskProfile: RiskProfile;
  readiness: ReadinessLevel;
  ranking: Ranking;
  matchScore?: number;
  gapCount?: number;
  competencies?: Record<string, number>;
  performanceHistory?: { year: number; score: number; rating: string }[];
  careerHistory?: { role: string; company: string; duration: string }[];
  education?: { degree: string; institution: string; year: string }[];
  aspirations?: { individual?: string; supervisor?: string; unit?: string };
  gaps?: { competency: string; severity: "minor" | "critical"; gap: number }[];
}

export interface Position {
  id: string;
  title: string;
  division: string;
  grade: string;
  type: PositionType;
  incumbent?: string;
  vacancyStatus: VacancyStatus;
  candidateCount: number;
  minCandidates: number;
  tcTier: TCTier;
  retirementDate?: string;
  reviewDueDate?: string;
  approvedDate?: string;
  successorName?: string;
  hasSuccessionPlan: boolean;
}

export interface SuccessionPlan {
  id: string;
  positionId: string;
  status: "in_progress" | "submitted_to_tc" | "voting" | "approved";
  facilitatorId: string;
  candidates: Candidate[];
}
