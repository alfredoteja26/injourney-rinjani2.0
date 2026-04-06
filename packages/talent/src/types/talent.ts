/**
 * Type Definitions for Talent Management System
 * Based on: MockData-Talent.md + PRD-Rinjani-Talent.md
 * 
 * Modules:
 * - Talent Pool (EQS Calculation)
 * - Talent Classification (9-Box Grid)
 * - Talent Review (TC Agenda)
 * - Talent Succession (Succession Planning)
 */

// ==================== ENUMS ====================

export type EmployeeType = "PERMANENT" | "CONTRACT" | "OUTSOURCE";
export type DisciplinaryStatus = "NONE" | "ACTIVE" | "RESOLVED";
export type AspirationSource = "INDIVIDUAL" | "SUPERVISOR" | "JOB_HOLDER" | "UNIT";
export type AspirationStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";
export type PositionStatus = "FILLED" | "VACANT";
export type SuccessionBoardStatus = "VACANT" | "VACANT_SOON" | "TO_BE_REVIEWED" | "SHORTLIST_READY";
export type TCDayStatus = "NOT_STARTED" | "SCHEDULED" | "DONE";
export type ReviewProposalStatus = "DRAFT" | "PENDING_TALENT_COMMITTEE" | "DECIDED";
export type ReviewDecisionOutcome = "APPROVED" | "APPROVED_WITH_MODIFICATION" | "DEFERRED" | "REJECTED";
export type ReadinessLevel = "READY_NOW" | "READY_IN_6_12_MONTHS" | "READY_IN_1_2_YEARS";
export type JobFamily = "HUMAN_RESOURCES" | "FINANCE_ACCOUNTING" | "IT_ENGINEERING" | "OPERATIONS";
export type PositionType = "STRUKTURAL" | "NON_STRUKTURAL_UMUM" | "FUNGSIONAL";
export type PerformanceRating = "OUTSTANDING" | "ABOVE_TARGET" | "ON_TARGET" | "BELOW_TARGET" | "POOR";
export type EQSBand = "Highly Qualified" | "Qualified" | "Moderately Qualified" | "Need Development";

// Talent Cluster types
export type TalentCluster = 
  | "HIGH_POTENTIAL" 
  | "PROMOTABLE" 
  | "SOLID_CONTRIBUTOR" 
  | "SLEEPING_TIGER" 
  | "UNFIT";

// Proposal types for Talent Review
export type ProposalType = 
  | "PROMOTION_GRADE_JABATAN" 
  | "PROMOTION_PERSONAL_GRADE" 
  | "DEMOTION_PERSONAL_GRADE" 
  | "SALARY_INCREASE";

// ==================== MASTER DATA ====================

export interface Company {
  company_id: string;
  name: string;
  type: "HOLDING" | "MEMBER";
}

export interface OrgUnit {
  org_unit_id: string;
  company_id: string;
  name: string;
  parent_org_unit_id: string | null;
}

export interface Location {
  location_id: string;
  personal_area: string;
  sub_personal_area: string;
  city: string;
  country: string;
}

// ==================== POSITION ====================

export interface Position {
  position_id: string;
  title: string;
  job_family: JobFamily;
  position_type: PositionType;
  grade_jabatan: number;
  band_jabatan: string;
  company_id: string;
  org_unit_id: string | null;
  location_id: string;
  status: PositionStatus;
  incumbent_employee_id: string | null;
  reports_to_position_id: string | null;
  job_description: string;
  
  // Additional computed fields
  is_ksp?: boolean; // Key Strategic Position
  vacancy_date?: string;
  retirement_date?: string;
  tenure_years?: number;
  successor_count?: number;
  candidate_count?: number;
  last_review_date?: string;
}

// ==================== EMPLOYEE ====================

export interface DisciplinaryCase {
  case_id: string;
  start_date: string;
  expected_end_date: string;
  reason: string;
  status: "ACTIVE" | "RESOLVED";
}

export interface EducationRecord {
  level: "S3" | "S2" | "S1" | "D4" | "D3" | "SMA/SMK";
  major: string;
  institution: string;
  year: number;
}

export interface EmployeeProfile {
  email: string;
  phone?: string;
  education?: EducationRecord[];
}

export interface Employee {
  employee_id: string;
  nik: string;
  full_name: string;
  employee_type: EmployeeType;
  company_id: string;
  current_position_id: string | null;
  current_grade_jabatan: number;
  personal_grade_pg: string;
  job_family_current: JobFamily;
  location_id: string;
  direct_supervisor_employee_id: string | null;
  tenure_months_in_current_grade: number;
  disciplinary_status: DisciplinaryStatus;
  disciplinary_case?: DisciplinaryCase;
  profile?: EmployeeProfile;
  
  // Computed fields
  avatar?: string;
  current_position_title?: string;
  current_department?: string;
  current_company_name?: string;
}

// ==================== EQS CALCULATION ====================

export interface EQSComponentBreakdown {
  raw: number;
  weight: number;
  contribution: number;
  source: string;
}

export interface EQSBreakdown {
  performance: EQSComponentBreakdown;
  competency_job_fit: EQSComponentBreakdown;
  experience: EQSComponentBreakdown;
  aspiration: EQSComponentBreakdown;
  training_certification: EQSComponentBreakdown;
  tes: EQSComponentBreakdown;
}

export interface EQSScore {
  eqs_id: string;
  employee_id: string;
  target_position_id: string;
  eligible: boolean;
  eqs_score: number | null;
  eqs_band: EQSBand | null;
  formula_version: string;
  calculated_at: string;
  component_breakdown?: EQSBreakdown;
  ineligible_reason?: string;
  note?: string;
  
  // Snapshot data for audit
  snapshot?: {
    employee_snapshot: any;
    position_snapshot: any;
    aspiration_sources: AspirationSource[];
    inputs_hash: string;
    notes?: string;
  };
}

// ==================== CAREER PATH / ASPIRATIONS ====================

export interface Aspiration {
  aspiration_id: string;
  employee_id: string;
  target_position_id: string;
  source: AspirationSource;
  submitted_date: string;
  status: AspirationStatus;
  notes?: string;
  
  // Source-specific fields
  nominator_employee_id?: string; // For SUPERVISOR, JOB_HOLDER, UNIT
  rank?: number; // For JOB_HOLDER
}

// ==================== TALENT POOL ====================

export interface TalentPoolCandidate {
  employee_id: string;
  target_position_id: string;
  eqs_score: number;
  eqs_band: EQSBand;
  rank: number; // Ranking within position
  readiness: ReadinessLevel;
  
  // Employee info (denormalized for display)
  full_name: string;
  nik: string;
  current_position: string;
  current_grade: number;
  avatar?: string;
  
  // Flags
  has_aspiration: boolean;
  aspiration_sources: AspirationSource[];
  is_shortlisted: boolean;
  is_designated_successor: boolean;
}

// ==================== TALENT CLASSIFICATION (9-Box) ====================

export interface TalentClusterDefinition {
  cluster: TalentCluster;
  name: string;
  icon: string;
  description: string;
  color: string;
  border_color: string;
  performance_range: string;
  capacity_range: string;
  action_recommendation: string;
}

export interface EmployeeClusterAssignment {
  employee_id: string;
  full_name: string;
  current_position: string;
  current_department: string;
  current_grade: number;
  
  // Scores
  performance_score: number; // 0-120
  capacity_score: number; // 0-100 (derived from EQS)
  
  // Cluster assignment
  cluster: TalentCluster;
  is_calibrated: boolean;
  calibration_details?: {
    original_cluster: TalentCluster;
    new_cluster: TalentCluster;
    reason: string;
    calibrated_by: string;
    calibrated_at: string;
    supporting_docs?: string[];
  };
  
  // Additional flags
  is_top_performer: boolean;
  is_high_potential: boolean;
  is_at_risk: boolean;
  is_successor: boolean;
  successor_for?: string[]; // Position IDs
}

// ==================== TALENT REVIEW ====================

export interface TalentReviewProposal {
  proposal_id: string;
  employee_id: string;
  submitted_by_employee_id: string; // Supervisor
  submitted_date: string;
  proposal_type: ProposalType;
  
  // Proposal details
  target_position_id?: string; // For promotions
  target_grade_jabatan?: number;
  target_personal_grade?: string;
  proposed_salary_increase?: number; // Percentage
  justification: string;
  
  // Workflow
  status: ReviewProposalStatus;
  
  // HC Recommendation (added by HC Admin/HCBP)
  hc_recommendation?: {
    recommended_by_employee_id: string;
    recommended_date: string;
    recommendation_type: ProposalType;
    recommended_position_id?: string;
    recommended_grade_jabatan?: number;
    recommended_personal_grade?: string;
    recommended_salary_increase?: number;
    zonasi_selection?: string; // For cross-entity movements
    development_plan_notes?: string;
    hc_notes: string;
  };
  
  // TC Decision
  tc_decision?: {
    decided_by_employee_id: string;
    decided_date: string;
    decision_outcome: ReviewDecisionOutcome;
    final_position_id?: string;
    final_grade_jabatan?: number;
    final_personal_grade?: string;
    final_salary_increase?: number;
    effective_date?: string;
    rationale: string;
    tc_tier: "TC_TIER_1" | "TC_TIER_2" | "TC_TIER_3";
  };
}

export interface TalentReviewEligibility {
  employee_id: string;
  is_eligible: boolean;
  reason?: string;
  
  // Flags
  tenure_in_position_years: number;
  has_position_tenure_3_years: boolean;
  has_grade_tenure_3_years: boolean;
  has_external_assignment_3_years: boolean;
  contract_expiry_within_6_months: boolean;
}

// ==================== TALENT SUCCESSION ====================

export interface SuccessorDesignation {
  designation_id: string;
  position_id: string;
  employee_id: string;
  tier: "PRIMARY" | "SECONDARY" | "TERTIARY";
  readiness_level: ReadinessLevel;
  target_ready_date: string;
  development_plan: string;
  rationale: string;
  
  // Workflow
  designated_by_employee_id: string;
  designated_date: string;
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "IMPLEMENTED";
  
  // TC Approval
  approved_by_employee_id?: string;
  approved_date?: string;
}

export interface SuccessionShortlist {
  shortlist_id: string;
  position_id: string;
  employee_id: string;
  added_by_employee_id: string;
  added_date: string;
  eqs_score: number;
  rank: number;
  readiness: ReadinessLevel;
  notes?: string;
}

export interface BeritaAcara {
  ba_id: string;
  type: "SUCCESSION" | "TALENT_REVIEW";
  tc_tier: "TC_TIER_1" | "TC_TIER_2" | "TC_TIER_3";
  meeting_date: string;
  meeting_location: string;
  
  // Attendees
  chairman_employee_id: string;
  secretary_employee_id: string;
  members: string[]; // Employee IDs
  
  // Content
  agenda_items: string[];
  decisions: {
    item_id: string;
    description: string;
    decision: string;
    supporting_data?: string;
  }[];
  
  // Document
  document_url?: string;
  status: "DRAFT" | "PENDING_SIGNATURE" | "SIGNED" | "ARCHIVED";
  
  // Signatures
  signatures?: {
    employee_id: string;
    signed_at: string;
    signature_url?: string;
  }[];
  
  created_by: string;
  created_at: string;
}

// ==================== TALENT COMMITTEE ====================

export interface TCMeeting {
  meeting_id: string;
  tc_tier: "TC_TIER_1" | "TC_TIER_2" | "TC_TIER_3";
  meeting_date: string;
  meeting_time: string;
  location: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  
  // Agenda
  agenda_items: {
    type: "TALENT_REVIEW" | "SUCCESSION_LIST" | "PMS_CALIBRATION" | "VACANT_POSITION" | "DEVELOPMENT_PLAN" | "SALARY_INCREMENT" | "TOP_TALENT_SELECTION";
    description: string;
    proposals: string[]; // Proposal IDs
  }[];
  
  // Status
  status: TCDayStatus;
  
  // Attendees
  chairman_employee_id: string;
  secretary_employee_id: string;
  members: string[];
  
  // Output
  berita_acara_id?: string;
}

// ==================== AUDIT & HISTORY ====================

export interface AuditLog {
  log_id: string;
  timestamp: string;
  actor_employee_id: string;
  action_type: "CREATE" | "UPDATE" | "DELETE" | "APPROVE" | "REJECT" | "CALIBRATE" | "CALCULATE_EQS" | "DESIGNATE_SUCCESSOR";
  entity_type: "EMPLOYEE" | "POSITION" | "EQS_SCORE" | "ASPIRATION" | "PROPOSAL" | "DESIGNATION" | "BERITA_ACARA";
  entity_id: string;
  changes?: {
    field: string;
    old_value: any;
    new_value: any;
  }[];
  notes?: string;
  ip_address?: string;
  user_agent?: string;
}

// ==================== UI FILTERS ====================

export interface TalentFilters {
  companies?: string[];
  org_units?: string[];
  locations?: string[];
  job_families?: JobFamily[];
  grade_min?: number;
  grade_max?: number;
  position_status?: PositionStatus[];
  employee_type?: EmployeeType[];
  ksp_only?: boolean;
  clusters?: TalentCluster[];
  readiness_levels?: ReadinessLevel[];
  search_query?: string;
}

// ==================== CAREER HISTORY (Extended Profile) ====================

export interface CareerAssignment {
  assignment_id: string;
  employee_id: string;
  type: "DEFINITIF" | "SECONDARY_ASSIGNMENT";
  position_id: string;
  position_title: string;
  company_id: string;
  location_id: string;
  grade_jabatan: number;
  start_date: string;
  end_date: string | "PRESENT";
  duration_months: number;
  supervisor_employee_id?: string;
  key_achievements?: string[];
  remarks?: string;
}

export interface TrainingRecord {
  training_id: string;
  employee_id: string;
  training_name: string;
  provider: "INJOURNEY" | "EXTERNAL";
  type: "PENJENJANGAN" | "TECHNICAL" | "SOFT_SKILLS" | "LEADERSHIP" | "COMPLIANCE";
  duration_hours: number;
  start_date: string;
  end_date: string;
  status: "COMPLETED" | "IN_PROGRESS" | "CANCELLED";
  certificate_url?: string;
  score?: number;
  is_relevant_for_target_position?: boolean;
}

export interface CertificationRecord {
  certification_id: string;
  employee_id: string;
  certification_name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  is_relevant: boolean;
  status: "VALID" | "EXPIRED" | "RENEWED";
  certificate_url?: string;
}

export interface PerformanceHistory {
  performance_id: string;
  employee_id: string;
  year: number;
  quarter?: "Q1" | "Q2" | "Q3" | "Q4";
  rating: PerformanceRating;
  score: number; // 0-120
  evaluator_employee_id: string;
  evaluation_date: string;
  notes?: string;
}

// ==================== ANALYTICS & REPORTS ====================

export interface SuccessionReadinessMetrics {
  total_ksp_positions: number;
  ksp_with_0_successors: number;
  ksp_with_1_successor: number;
  ksp_with_2_plus_successors: number;
  coverage_percentage: number; // % with ≥2 successors
  
  readiness_distribution: {
    ready_now: number;
    ready_6_12_months: number;
    ready_1_2_years: number;
  };
  
  vacant_positions: number;
  vacant_soon_positions: number;
  average_time_to_fill_days: number;
}

export interface ClusterDistributionMetrics {
  total_employees: number;
  
  distribution: {
    cluster: TalentCluster;
    count: number;
    percentage: number;
  }[];
  
  high_potential_count: number;
  at_risk_count: number;
  calibration_pending_count: number;
  
  threshold_alerts: {
    cluster: TalentCluster;
    alert_type: "EXCEEDS_TARGET" | "BELOW_TARGET";
    current_percentage: number;
    target_percentage: number;
  }[];
}

// ==================== EXTENDED CANDIDATE DATA (For Profile Panels) ====================

export interface CandidateExtendedProfile {
  employee_id: string;
  
  // Basic Info
  full_name: string;
  nik: string;
  avatar?: string;
  current_position: string;
  current_grade: number;
  
  // EQS Data
  eqs_score: number;
  eqs_band: EQSBand;
  eqs_breakdown: EQSBreakdown;
  
  // Career History
  career_assignments: CareerAssignment[];
  
  // Qualifications
  education: EducationRecord[];
  trainings: TrainingRecord[]

;
  certifications: CertificationRecord[];
  
  // Performance
  performance_history: PerformanceHistory[];
  
  // Aspirations
  aspirations: Aspiration[];
  
  // Cluster
  cluster_assignment?: EmployeeClusterAssignment;
  
  // Succession
  designated_as_successor_for?: {
    position_id: string;
    position_title: string;
    tier: "PRIMARY" | "SECONDARY" | "TERTIARY";
    readiness: ReadinessLevel;
  }[];
}

// ==================== UI DATA TYPES (For Components) ====================

/**
 * CandidateData: UI-friendly format for candidate profile display
 * Used by EQSSidePanel and TalentPoolManagement components
 */
export interface CandidateData {
  id: string;
  rank: number;
  name: string;
  employeeId: string;
  avatar?: string;
  currentPosition: string;
  currentCompany: string;
  currentJobFamily: string;
  currentGrade: number;
  employeeType: string;
  isTopTalent: boolean;
  readiness: string;
  cluster: TalentCluster;

  // EQS Data
  eqs?: {
    total: number;
    performance: number;
    competency: number;
    disciplinary: number;
    experience: number;
    training: number;
    aspiration: number;
    tes: number;
    contributions: {
      performance: number;
      competency: number;
      disciplinary: number;
      experience: number;
      training: number;
      aspiration: number;
      tes: number;
    };
    performanceSource?: string;
    competencySource?: string;
    experienceSource?: string;
    trainingSource?: string;
    aspirationSource?: string;
    tesSource?: string;
  };

  // Performance History
  performanceHistory: Array<{
    year: number;
    rating: number | string;
    period: string;
  }>;

  // Competency
  competency: {
    jobFitScore: number;
    assessmentDate: string;
  };

  // Disciplinary Record
  disciplinaryRecord: {
    status: DisciplinaryStatus;
    activeCase?: DisciplinaryCase;
  };

  // Experience
  experience: {
    yearsInJobFamily: number;
    yearsInCurrentPosition: number;
    totalYears: number;
  };

  // Training (Summary)
  training: {
    completedCourses: number;
    certifications: number;
    lastTrainingDate: string;
  };

  // Career Aspiration
  aspirations: {
    sources: AspirationSource[];
    hasAspiration: boolean;
    targetPosition: string;
  };

  careerAspiration?: {
    hasAspiration: boolean;
    aspirationSources: AspirationSource[];
    targetPosition: string;
  };

  // TAB 2: Career History
  careerHistory?: Array<{
    id: string;
    type: string;
    positionTitle: string;
    company: string;
    department: string;
    location: string;
    grade: string;
    startDate: string;
    endDate: string;
    supervisor?: string;
    keyAchievements?: string[];
  }>;

  // TAB 3: Qualifications
  educationRecords?: Array<{
    id: string;
    level: string;
    major: string;
    institution: string;
    graduationYear: number;
    gpa?: number;
  }>;

  trainingRecords?: Array<{
    id: string;
    name: string;
    provider: string;
    type: string;
    duration: number;
    startDate: string;
    endDate: string;
    status: string;
    score?: number;
  }>;

  certificationRecords?: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    isRelevant: boolean;
    status: string;
  }>;

  awardRecords?: Array<{
    id: string;
    name: string;
    issuer: string;
    category: string;
    level: string;
    year: number;
    description?: string;
  }>;

  // TAB 4: Career Aspiration
  careerAspirationInJourney?: Array<{
    id: string;
    targetPosition: string;
    targetCompany: string;
    targetDepartment: string;
    targetGrade: number;
    timeframe: string;
    status: string;
    submittedDate: string;
    lastUpdated: string;
    mentor?: string;
    developmentPlan?: string[];
  }>;

  careerAspirationBUMN?: {
    targetPosition: string;
    targetBUMN: string;
    targetMinistry: string;
    readiness: string;
    status: string;
    submittedDate: string;
    reviewer?: string;
    notes?: string;
  };

  personalValuesVision?: {
    coreValues: string[];
    careerVision: string;
    personalMission: string;
    workStyle: string[];
    motivators: string[];
  };

  // TAB 5: Personal Info
  personalInfo?: {
    fullName: string;
    nik: string;
    nip?: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: string;
    religion: string;
    maritalStatus: string;
    bloodType?: string;
    nationality: string;
    email: string;
    personalEmail?: string;
    phoneNumber: string;
    emergencyContact?: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
    address?: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      instagram?: string;
    };
    family?: {
      spouse?: {
        name: string;
        occupation: string;
        company: string;
      };
      children?: Array<{
        name: string;
        age: number;
        school?: string;
      }>;
    };
    languages?: Array<{
      language: string;
      proficiency: string;
    }>;
    hobbies?: string[];
    joinDate?: string;
    permanentDate?: string;
  };

  // Internal references (for debugging)
  _employee?: any;
  _eqs?: any;
  _position?: any;
  _company?: any;
  _location?: any;
}
