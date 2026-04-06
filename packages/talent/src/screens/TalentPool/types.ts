export type NineBoxCluster = 
  | "9box_high_potential" 
  | "9box_promotable" 
  | "9box_solid_contributor" 
  | "9box_sleeping_tiger" 
  | "9box_underperformer";

export type RiskProfile = "LOW" | "MEDIUM" | "HIGH";

export type EQSBand = "highly_qualified" | "qualified" | "needs_development" | "not_ready";

export interface EQSComponent {
  id: string;
  component_type: "performance" | "competency" | "experience" | "aspiration" | "training" | "tes";
  weight: number;
  raw_value: number;
  weighted_value: number;
}

export interface EQSScore {
  total_score: number;
  eqs_band: EQSBand;
  components: EQSComponent[];
  calculated_at: string;
}

export interface CareerHistory {
  id: string;
  role: string;
  company: string;
  duration: string;
  is_current: boolean;
  assignment_type: "definisi" | "secondary_assignment";
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
  gpa: number;
}

export interface Certification {
  name: string;
  issuer: string;
  validity: string; // e.g., "2024-2027"
  status: "valid" | "expired";
}

export interface Training {
  name: string;
  provider: string;
  hours: number;
  score?: number;
  status: "completed" | "in_progress";
}

export interface Aspiration {
  individual?: string;
  supervisor?: string;
  unit?: string;
  score: number;
}

export interface PersonalInfo {
  dob: string;
  gender: string;
  hire_date: string;
  email: string;
  phone: string;
  address: string;
}

export interface TalentPoolCandidate {
  id: string;
  employee_id: string;
  name: string;
  avatar_url?: string;
  position: string;
  unit: string;
  company: string;
  job_family: string;
  grade: string; // e.g., "Band I", "Band II", "Band III"
  
  // Talent Status
  talent_cluster: NineBoxCluster;
  eqs_score: EQSScore;
  
  // Tags
  is_top_talent: boolean;
  is_tr_proposed: boolean;
  tr_proposal_id?: string;
  is_hcbp_shortlisted: boolean;
  shortlist_count?: number;
  
  // Risk
  risk_profile: RiskProfile;
  
  // Detailed Profile Data (usually fetched separately, but kept here for mock simplicity)
  career_history: CareerHistory[];
  education: Education[];
  certifications: Certification[];
  training: Training[];
  aspiration: Aspiration;
  personal_info: PersonalInfo;
}

export interface Band {
  id: string;
  name: string;
  level: string; // e.g., "Director", "VP", "Manager"
  candidate_count: number;
  description: string;
}

export interface PoolMetrics {
  total_pool: number;
  top_talent_count: number;
  avg_eqs: number;
  coverage_percent: number;
  eqs_distribution: Record<string, number>; // band -> count
  nine_box_distribution: Record<string, number>; // cluster -> count
  risk_counts: {
    low_successor: number;
    flight_risk: number;
    tr_pending: number;
  };
}
