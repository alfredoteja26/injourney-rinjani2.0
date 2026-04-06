/**
 * Career Path Module - Type Definitions
 * INJ-TMS-001 | Career Path (Aspiration)
 */

// ========== EMPLOYEE & POSITION ==========

export interface Employee {
  id: string;
  nik: string;
  name: string;
  position: string;
  level_jabatan: string;
  band_jabatan: string;
  grade_jabatan: number;
  job_family: string;
  unit: string;
  company?: string;
  status: "PERMANENT" | "CONTRACT" | "PROBATION";
  disciplinary_status?: "ACTIVE" | "EXPIRED" | null;
  image?: string;
  email?: string;
  superior_id?: string;
}

export interface Position {
  id: string;
  name: string;
  level_jabatan: string;
  band_jabatan: string;
  grade_jabatan: number;
  job_family: string;
  company: string;
  unit: string;
  status: "Filled" | "Vacant";
  incumbent_id?: string;
  personal_area?: string;
  sub_personal_area?: string;
  group?: string;
  responsibilities?: string[];
  requirements?: string[];
  location?: string;
}

// ========== ASPIRATION SOURCES ==========

export type AspirationSource = "INDIVIDUAL" | "SUPERVISOR" | "JOB_HOLDER" | "UNIT";
export type AspirationType = "PROMOSI" | "ROTASI";

export interface BaseAspiration {
  id: string;
  emp_id: string;
  pos_id: string;
  type: AspirationType;
  source: AspirationSource;
  submitted: string; // ISO date string
  status?: "ACTIVE" | "PENDING" | "APPROVED" | "REJECTED";
}

export interface IndividualAspiration extends BaseAspiration {
  source: "INDIVIDUAL";
}

export interface SupervisorAspiration extends BaseAspiration {
  source: "SUPERVISOR";
  nominator_id: string;
  nominator: string;
  justification?: string;
}

export interface JobHolderAspiration extends BaseAspiration {
  source: "JOB_HOLDER";
  nominator_id: string;
  nominator: string;
  rank: number; // 1, 2, or 3
  for_position_id: string; // Position the job holder currently holds
}

export interface UnitAspiration extends BaseAspiration {
  source: "UNIT";
  unit_id: string;
  nominator_id: string;
  nominator: string;
  nominee_id: string;
  nominee_name: string;
  requested_by_id?: string; // Legacy field
  requested_by?: string; // Legacy field
  justification?: string;
}

export type Aspiration = 
  | IndividualAspiration 
  | SupervisorAspiration 
  | JobHolderAspiration 
  | UnitAspiration;

// ========== ELIGIBILITY ==========

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
  type: AspirationType;
  warnings?: string[];
}

export type BandBarrier = {
  from: string;
  to: string;
  allowed: boolean;
  reason?: string;
};

// ========== EQS SCORING ==========

export interface EQSBreakdown {
  performance: number;      // 20%
  competency: number;        // 20%
  experience: number;        // 20%
  aspiration: number;        // 10%
  training: number;          // 10%
  tes: number;               // 10% (New Component)
  trackRecord?: number;      // Legacy/Deprecated
}

export interface EQSComponent {
  name: string;
  score: number;
  weight: number;
  contribution: number;
  details?: string;
}

export interface EQSScore {
  total: number; // 0-100
  breakdown: EQSBreakdown;
  rating: 'HIGHLY_QUALIFIED' | 'QUALIFIED' | 'NEEDS_DEVELOPMENT' | 'NOT_RECOMMENDED';
  strengths: string[];
  areasToImprove: string[];
}

// ========== CONSOLIDATED VIEW ==========

export interface ConsolidatedAspiration {
  employee: Employee;
  position: Position;
  sources: {
    individual: boolean;
    supervisor: boolean;
    job_holder: boolean;
    unit: boolean;
  };
  sourceCount: number;
  aspirations: Aspiration[];
  eqsScore?: EQSScore;
  type: AspirationType;
}

// ========== VIEW CONTEXT ==========

export type UserRole = "EMPLOYEE" | "SUPERVISOR" | "JOB_HOLDER" | "UNIT_LEADER" | "ADMIN";

export interface ViewContext {
  role: UserRole;
  userId: string;
  user: Employee;
  period: {
    id: string;
    name: string;
    start: string;
    end: string;
    status: "OPEN" | "CLOSED";
  };
}

// ========== UI STATE ==========

export interface AspirationSelection {
  horizontal: Position[]; // Max 3
  vertical: Position[];   // Max 3
}

export interface CompletionRate {
  completed: number;
  total: number;
  percentage: number;
  deadline: string;
}

// ========== FILTERS ==========

export interface PositionFilters {
  company?: string;
  job_family?: string;
  grade_class?: string;
  status?: "Filled" | "Vacant";
  unit?: string;
  search?: string;
}

// ========== MOCK DATA RESPONSE ==========

export interface MockDataResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}

// ========== RELATIONSHIP MAPPING ==========

export interface OrgRelationship {
  supervisor: string;
  subordinate: string;
}

// ========== UNIT REQUEST ==========

export interface UnitRequest {
  id: string;
  unit_id: string;
  requested_by_id: string;
  requested_by: string;
  requested_pos_id: string;
  requested_pos: string;
  nominee_id: string;
  nominee_name: string;
  nominee_pos: string;
  submitted: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  justification?: string;
}
