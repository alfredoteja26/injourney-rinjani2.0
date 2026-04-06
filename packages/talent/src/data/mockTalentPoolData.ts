/**
 * Talent Pool Mock Data
 * Based on PRD-Rinjani-Talent.md and MockData-Talent.md
 * 
 * EQS Formula (EQS-2025-12-18):
 * - Performance: 20%
 * - Competency (Job Fit): 20%
 * - Experience: 20%
 * - Aspiration: 10%
 * - Training & Certification: 10%
 * - TES (Talent Evaluation Score): 10%
 * - Disciplinary: GATE (not scored)
 * Total: 90% (10% reserved)
 */

// ==================== ENUMS & TYPES ====================

export type EmployeeType = "PERMANENT" | "CONTRACT" | "OUTSOURCE";
export type DisciplinaryStatus = "NONE" | "ACTIVE" | "RESOLVED";
export type AspirationSource = "INDIVIDUAL" | "SUPERVISOR" | "JOB_HOLDER" | "UNIT";
export type AspirationStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";
export type PositionStatus = "FILLED" | "VACANT";
export type ReadinessLevel = "READY_NOW" | "READY_IN_6_12_MONTHS" | "READY_IN_1_2_YEARS";
export type Cluster = "HIGH_POTENTIAL" | "PROMOTABLE" | "SOLID_CONTRIBUTOR" | "SLEEPING_TIGER" | "UNFIT";
export type JobFamily = "HUMAN_RESOURCES" | "FINANCE_ACCOUNTING" | "IT_ENGINEERING" | "OPERATIONS";
export type PositionType = "STRUKTURAL" | "NON_STRUKTURAL_UMUM" | "FUNGSIONAL";

// ==================== INTERFACES ====================

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
  disciplinary_case?: {
    case_id: string;
    start_date: string;
    expected_end_date: string;
    reason: string;
    status: string;
  };
  profile?: {
    email?: string;
    phone?: string;
    education?: Array<{
      level: string;
      major: string;
      institution: string;
      year: number;
    }>;
  };
}

export interface JobHistory {
  job_history_id: string;
  employee_id: string;
  company_id: string;
  job_family: JobFamily;
  position_title: string;
  start_date: string;
  end_date: string | null;
  months: number;
  company_type_tag: "HOLDING" | "MEMBER";
}

export interface EQSComponentDetail {
  raw: number;
  weight: number;
  contribution: number;
  source: string;
  details?: any;
}

export interface EQSScore {
  eqs_id: string;
  employee_id: string;
  target_position_id: string;
  eligible: boolean;
  eqs_score: number | null;
  eqs_band: string | null;
  formula_version: string;
  calculated_at: string;
  component_breakdown?: {
    performance: EQSComponentDetail;
    competency_job_fit: EQSComponentDetail;
    experience: EQSComponentDetail;
    aspiration: EQSComponentDetail;
    training_certification: EQSComponentDetail;
    tes: EQSComponentDetail;
  };
  ineligible_reason?: string;
}

export interface TalentPoolCandidate {
  rank: number;
  employee_id: string;
  eqs_score: number;
  cluster: Cluster;
  readiness?: ReadinessLevel;
}

export interface TalentPoolRanking {
  position_id: string;
  generated_at: string;
  candidates: TalentPoolCandidate[];
  ineligible_candidates: Array<{
    employee_id: string;
    reason: string;
  }>;
}

// ==================== MOCK DATA ====================

export const companies: Company[] = [
  { company_id: "CO-INJ", name: "PT Aviasi Pariwisata Indonesia (Persero)", type: "HOLDING" },
  { company_id: "CO-API", name: "PT Angkasa Pura Indonesia", type: "MEMBER" },
  { company_id: "CO-IAS", name: "PT Integrasi Aviasi Solusi", type: "MEMBER" },
  { company_id: "CO-SAR", name: "PT Sarinah", type: "MEMBER" }
];

export const orgUnits: OrgUnit[] = [
  { org_unit_id: "OU-INJ-HC", company_id: "CO-INJ", name: "Human Capital Division", parent_org_unit_id: null },
  { org_unit_id: "OU-INJ-FIN", company_id: "CO-INJ", name: "Finance Division", parent_org_unit_id: null },
  { org_unit_id: "OU-API-HC", company_id: "CO-API", name: "Human Capital Dept", parent_org_unit_id: null },
  { org_unit_id: "OU-IAS-IT", company_id: "CO-IAS", name: "IT & Digital", parent_org_unit_id: null }
];

export const locations: Location[] = [
  {
    location_id: "LOC-JKT-HO",
    personal_area: "Head Office Jakarta",
    sub_personal_area: "Jakarta Pusat",
    city: "Jakarta",
    country: "Indonesia"
  },
  {
    location_id: "LOC-JKT-SO",
    personal_area: "Jakarta Branch",
    sub_personal_area: "Jakarta Selatan",
    city: "Jakarta",
    country: "Indonesia"
  }
];

export const positions: Position[] = [
  {
    position_id: "POS-HC-DIR-001",
    title: "Director SDM",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 21,
    band_jabatan: "Band V",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    location_id: "LOC-JKT-HO",
    status: "VACANT",
    incumbent_employee_id: null,
    reports_to_position_id: "POS-CEO-INJ-001",
    job_description: "Memimpin fungsi Human Capital grup, memastikan strategi talent, compensation, dan governance berjalan."
  },
  {
    position_id: "POS-HC-VP-001",
    title: "VP Human Capital",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 18,
    band_jabatan: "Band IV",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0007",
    reports_to_position_id: "POS-HC-DIR-001",
    job_description: "Mengelola kebijakan HC dan implementasi program talent di level grup."
  },
  {
    position_id: "POS-HC-MGR-OPS-001",
    title: "Manager HR Operations",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 15,
    band_jabatan: "Band III",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0002",
    reports_to_position_id: "POS-HC-VP-001",
    job_description: "Mengelola operasional HR, SLA, payroll coordination, dan data workforce."
  },
  {
    position_id: "POS-HC-SUP-OPS-001",
    title: "Supervisor HR Operations",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 13,
    band_jabatan: "Band II",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0003",
    reports_to_position_id: "POS-HC-MGR-OPS-001",
    job_description: "Supervisi proses HR ops harian, memastikan kepatuhan dan kualitas data."
  },
  {
    position_id: "POS-HC-STF-OPS-001",
    title: "Staff HR Operations",
    job_family: "HUMAN_RESOURCES",
    position_type: "NON_STRUKTURAL_UMUM",
    grade_jabatan: 12,
    band_jabatan: "Band I",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0001",
    reports_to_position_id: "POS-HC-SUP-OPS-001",
    job_description: "Administrasi HR, updating master data, dan dukungan proses HC."
  },
  {
    position_id: "POS-FIN-VP-001",
    title: "VP Finance",
    job_family: "FINANCE_ACCOUNTING",
    position_type: "STRUKTURAL",
    grade_jabatan: 18,
    band_jabatan: "Band IV",
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-FIN",
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0010",
    reports_to_position_id: "POS-CEO-INJ-001",
    job_description: "Mengelola strategi keuangan, budgeting, dan kontrol internal."
  },
  {
    position_id: "POS-CEO-INJ-001",
    title: "Direktur Utama INJ",
    job_family: "OPERATIONS",
    position_type: "STRUKTURAL",
    grade_jabatan: 25,
    band_jabatan: "BoD",
    company_id: "CO-INJ",
    org_unit_id: null,
    location_id: "LOC-JKT-HO",
    status: "FILLED",
    incumbent_employee_id: "EMP-0099",
    reports_to_position_id: null,
    job_description: "Pimpinan tertinggi entitas."
  }
];

export const employees: Employee[] = [
  {
    employee_id: "EMP-0001",
    nik: "12345",
    full_name: "Budi Santoso",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-HC-STF-OPS-001",
    current_grade_jabatan: 12,
    personal_grade_pg: "PG-10",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0003",
    tenure_months_in_current_grade: 14,
    disciplinary_status: "NONE",
    profile: {
      email: "budi.santoso@injourney.co.id",
      phone: "+62-811-0000-0001",
      education: [{ level: "S2", major: "Management", institution: "UI", year: 2015 }]
    }
  },
  {
    employee_id: "EMP-0002",
    nik: "12346",
    full_name: "Siti Aminah",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-HC-MGR-OPS-001",
    current_grade_jabatan: 15,
    personal_grade_pg: "PG-13",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0007",
    tenure_months_in_current_grade: 38,
    disciplinary_status: "NONE",
    profile: { email: "siti.aminah@injourney.co.id" }
  },
  {
    employee_id: "EMP-0003",
    nik: "12347",
    full_name: "Ahmad Rizki",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-HC-SUP-OPS-001",
    current_grade_jabatan: 13,
    personal_grade_pg: "PG-11",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0002",
    tenure_months_in_current_grade: 9,
    disciplinary_status: "ACTIVE",
    disciplinary_case: {
      case_id: "DISC-2025-0003",
      start_date: "2025-10-10",
      expected_end_date: "2026-01-10",
      reason: "Pelanggaran SOP data payroll (contoh mock).",
      status: "ACTIVE"
    }
  },
  {
    employee_id: "EMP-0004",
    nik: "22331",
    full_name: "Dewi Kartika",
    employee_type: "CONTRACT",
    company_id: "CO-API",
    current_position_id: null,
    current_grade_jabatan: 12,
    personal_grade_pg: "PG-09",
    job_family_current: "FINANCE_ACCOUNTING",
    location_id: "LOC-JKT-SO",
    direct_supervisor_employee_id: "EMP-0010",
    tenure_months_in_current_grade: 20,
    disciplinary_status: "NONE",
    profile: { email: "dewi.kartika@ap-indonesia.co.id" }
  },
  {
    employee_id: "EMP-0005",
    nik: "33441",
    full_name: "Raka Putra",
    employee_type: "PERMANENT",
    company_id: "CO-IAS",
    current_position_id: null,
    current_grade_jabatan: 11,
    personal_grade_pg: "PG-08",
    job_family_current: "IT_ENGINEERING",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: null,
    tenure_months_in_current_grade: 6,
    disciplinary_status: "NONE",
    profile: { email: "raka.putra@ias.co.id" }
  },
  {
    employee_id: "EMP-0006",
    nik: "44551",
    full_name: "Nadia Rahma",
    employee_type: "PERMANENT",
    company_id: "CO-SAR",
    current_position_id: null,
    current_grade_jabatan: 9,
    personal_grade_pg: "PG-06",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0002",
    tenure_months_in_current_grade: 28,
    disciplinary_status: "NONE"
  },
  {
    employee_id: "EMP-0007",
    nik: "98765",
    full_name: "Taufik Hidayat",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-HC-VP-001",
    current_grade_jabatan: 18,
    personal_grade_pg: "PG-16",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0099",
    tenure_months_in_current_grade: 22,
    disciplinary_status: "NONE"
  },
  {
    employee_id: "EMP-0010",
    nik: "55661",
    full_name: "Haryo Pratama",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-FIN-VP-001",
    current_grade_jabatan: 18,
    personal_grade_pg: "PG-16",
    job_family_current: "FINANCE_ACCOUNTING",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0099",
    tenure_months_in_current_grade: 40,
    disciplinary_status: "NONE"
  },
  {
    employee_id: "EMP-0099",
    nik: "90001",
    full_name: "Direktur Utama",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-CEO-INJ-001",
    current_grade_jabatan: 25,
    personal_grade_pg: "PG-20",
    job_family_current: "OPERATIONS",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: null,
    tenure_months_in_current_grade: 60,
    disciplinary_status: "NONE"
  },
  // Additional employees for talent pool
  {
    employee_id: "EMP-0011",
    nik: "12348",
    full_name: "Rina Susanti",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 14,
    personal_grade_pg: "PG-12",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0002",
    tenure_months_in_current_grade: 20,
    disciplinary_status: "NONE",
    profile: { email: "rina.susanti@injourney.co.id" }
  },
  {
    employee_id: "EMP-0012",
    nik: "12349",
    full_name: "Agus Prasetyo",
    employee_type: "PERMANENT",
    company_id: "CO-API",
    current_position_id: null,
    current_grade_jabatan: 16,
    personal_grade_pg: "PG-14",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0007",
    tenure_months_in_current_grade: 30,
    disciplinary_status: "NONE",
    profile: { email: "agus.prasetyo@ap-indonesia.co.id" }
  },
  {
    employee_id: "EMP-0013",
    nik: "12350",
    full_name: "Maya Sari",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 17,
    personal_grade_pg: "PG-15",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0007",
    tenure_months_in_current_grade: 25,
    disciplinary_status: "NONE",
    profile: { email: "maya.sari@injourney.co.id" }
  },
  {
    employee_id: "EMP-0014",
    nik: "12351",
    full_name: "Denny Firmansyah",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 11,
    personal_grade_pg: "PG-09",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0003",
    tenure_months_in_current_grade: 18,
    disciplinary_status: "NONE",
    profile: { email: "denny.firmansyah@injourney.co.id" }
  },
  {
    employee_id: "EMP-0015",
    nik: "12352",
    full_name: "Linda Maharani",
    employee_type: "PERMANENT",
    company_id: "CO-API",
    current_position_id: null,
    current_grade_jabatan: 15,
    personal_grade_pg: "PG-13",
    job_family_current: "FINANCE_ACCOUNTING",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0010",
    tenure_months_in_current_grade: 28,
    disciplinary_status: "NONE",
    profile: { email: "linda.maharani@ap-indonesia.co.id" }
  },
  {
    employee_id: "EMP-0016",
    nik: "12353",
    full_name: "Hendra Gunawan",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 16,
    personal_grade_pg: "PG-14",
    job_family_current: "FINANCE_ACCOUNTING",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0010",
    tenure_months_in_current_grade: 32,
    disciplinary_status: "NONE",
    profile: { email: "hendra.gunawan@injourney.co.id" }
  },
  {
    employee_id: "EMP-0017",
    nik: "12354",
    full_name: "Ratna Dewi",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 12,
    personal_grade_pg: "PG-10",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0003",
    tenure_months_in_current_grade: 22,
    disciplinary_status: "NONE",
    profile: { email: "ratna.dewi@injourney.co.id" }
  },
  {
    employee_id: "EMP-0018",
    nik: "12355",
    full_name: "Fajar Nugroho",
    employee_type: "PERMANENT",
    company_id: "CO-API",
    current_position_id: null,
    current_grade_jabatan: 14,
    personal_grade_pg: "PG-12",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-SO",
    direct_supervisor_employee_id: "EMP-0002",
    tenure_months_in_current_grade: 16,
    disciplinary_status: "NONE",
    profile: { email: "fajar.nugroho@ap-indonesia.co.id" }
  },
  {
    employee_id: "EMP-0019",
    nik: "12356",
    full_name: "Sinta Wulandari",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: null,
    current_grade_jabatan: 13,
    personal_grade_pg: "PG-11",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0002",
    tenure_months_in_current_grade: 24,
    disciplinary_status: "NONE",
    profile: { email: "sinta.wulandari@injourney.co.id" }
  },
  {
    employee_id: "EMP-0020",
    nik: "12357",
    full_name: "Rudi Hartono",
    employee_type: "PERMANENT",
    company_id: "CO-IAS",
    current_position_id: null,
    current_grade_jabatan: 15,
    personal_grade_pg: "PG-13",
    job_family_current: "HUMAN_RESOURCES",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: "EMP-0007",
    tenure_months_in_current_grade: 26,
    disciplinary_status: "NONE",
    profile: { email: "rudi.hartono@ias.co.id" }
  }
];

export const jobHistory: JobHistory[] = [
  {
    job_history_id: "JH-EMP-0001-001",
    employee_id: "EMP-0001",
    company_id: "CO-INJ",
    job_family: "HUMAN_RESOURCES",
    position_title: "Staff HR Operations",
    start_date: "2022-01-01",
    end_date: null,
    months: 48,
    company_type_tag: "HOLDING"
  },
  {
    job_history_id: "JH-EMP-0002-001",
    employee_id: "EMP-0002",
    company_id: "CO-INJ",
    job_family: "HUMAN_RESOURCES",
    position_title: "Manager HR Operations",
    start_date: "2022-10-01",
    end_date: null,
    months: 38,
    company_type_tag: "HOLDING"
  },
  {
    job_history_id: "JH-EMP-0002-002",
    employee_id: "EMP-0002",
    company_id: "CO-API",
    job_family: "HUMAN_RESOURCES",
    position_title: "Supervisor C&B",
    start_date: "2020-01-01",
    end_date: "2022-09-30",
    months: 33,
    company_type_tag: "MEMBER"
  },
  {
    job_history_id: "JH-EMP-0005-001",
    employee_id: "EMP-0005",
    company_id: "CO-IAS",
    job_family: "IT_ENGINEERING",
    position_title: "Software Engineer",
    start_date: "2025-06-01",
    end_date: null,
    months: 6,
    company_type_tag: "MEMBER"
  },
  {
    job_history_id: "JH-EMP-0006-001",
    employee_id: "EMP-0006",
    company_id: "CO-SAR",
    job_family: "HUMAN_RESOURCES",
    position_title: "HR Officer",
    start_date: "2023-08-01",
    end_date: null,
    months: 28,
    company_type_tag: "MEMBER"
  }
];

// EQS Scores with NEW Formula (EQS-2025-12-18)
// Performance: 20%, Competency: 20%, Experience: 20%, Aspiration: 10%, Training: 10%, TES: 10%
export const eqsScores: EQSScore[] = [
  {
    eqs_id: "EQS-0001",
    employee_id: "EMP-0001",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: true,
    eqs_score: 88.27,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { 
        raw: 80, 
        weight: 0.2, 
        contribution: 16.0, 
        source: "Performance Appraisal (3y avg)",
        details: {
          rating: "On Target",
          year_2023: 85,
          year_2024: 80,
          year_2025: 75,
          average: 80
        }
      },
      competency_job_fit: { 
        raw: 85, 
        weight: 0.2, 
        contribution: 17.0, 
        source: "Competency Assessment",
        details: {
          assessment_date: "2024-06-15",
          assessor: "VP Human Capital",
          job_fit_percentage: 85
        }
      },
      experience: { 
        raw: 75, 
        weight: 0.2, 
        contribution: 15.0, 
        source: "Job History + Unit Experience",
        details: {
          years_in_job_family: 7,
          base_score: 70,
          unit_bonus: 5,
          total_raw: 75
        }
      },
      aspiration: {
        raw: 75,
        weight: 0.1,
        contribution: 7.5,
        source: "Career Path aspirations",
        details: {
          sources_present: ["INDIVIDUAL", "SUPERVISOR", "UNIT"],
          individual_points: 20,
          supervisor_points: 30,
          job_holder_points: 0,
          unit_points: 25,
          aspiration_score_sum: 75,
          capped: 75,
          note: "Akumulatif dari 3 sumber, capped pada 100"
        }
      },
      training_certification: { 
        raw: 90, 
        weight: 0.1, 
        contribution: 9.0, 
        source: "L&D Records",
        details: {
          pelatihan_penjenjangan: 100,
          sertifikasi_relevan: 80,
          formula: "(100 × 50%) + (80 × 50%)",
          total_raw: 90
        }
      },
      tes: { 
        raw: 83, 
        weight: 0.1, 
        contribution: 8.3, 
        source: "TES Engine",
        details: {
          potensi_kepemimpinan: 20,
          change_champion_contribution: 18,
          innovation_problem_solving: 15,
          collaboration_teamwork: 12,
          strategic_thinking: 18,
          total_raw: 83,
          last_updated: "2025-11-15"
        }
      }
    }
  },
  {
    eqs_id: "EQS-0002",
    employee_id: "EMP-0002",
    target_position_id: "POS-HC-DIR-001",
    eligible: true,
    eqs_score: 91.10,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { 
        raw: 88, 
        weight: 0.2, 
        contribution: 17.6, 
        source: "Performance Appraisal (3y avg)" 
      },
      competency_job_fit: { 
        raw: 90, 
        weight: 0.2, 
        contribution: 18.0, 
        source: "Competency Assessment" 
      },
      experience: { 
        raw: 85, 
        weight: 0.2, 
        contribution: 17.0, 
        source: "Job History + Unit Experience" 
      },
      aspiration: {
        raw: 85,
        weight: 0.1,
        contribution: 8.5,
        source: "Career Path aspirations",
        details: {
          sources_present: ["INDIVIDUAL", "SUPERVISOR", "JOB_HOLDER", "UNIT"],
          aspiration_score_sum: 100,
          weights_sum: 100,
          capped: 85
        }
      },
      training_certification: { 
        raw: 92, 
        weight: 0.1, 
        contribution: 9.2, 
        source: "L&D Records" 
      },
      tes: { 
        raw: 88, 
        weight: 0.1, 
        contribution: 8.8, 
        source: "TES Engine" 
      }
    }
  },
  {
    eqs_id: "EQS-0003",
    employee_id: "EMP-0003",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: false,
    eqs_score: null,
    eqs_band: null,
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    ineligible_reason: "DISCIPLINARY_ACTIVE"
  },
  {
    eqs_id: "EQS-0004",
    employee_id: "EMP-0007",
    target_position_id: "POS-HC-DIR-001",
    eligible: true,
    eqs_score: 93.45,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { 
        raw: 92, 
        weight: 0.2, 
        contribution: 18.4, 
        source: "Performance Appraisal (3y avg)" 
      },
      competency_job_fit: { 
        raw: 95, 
        weight: 0.2, 
        contribution: 19.0, 
        source: "Competency Assessment" 
      },
      experience: { 
        raw: 90, 
        weight: 0.2, 
        contribution: 18.0, 
        source: "Job History + Unit Experience" 
      },
      aspiration: {
        raw: 90,
        weight: 0.1,
        contribution: 9.0,
        source: "Career Path aspirations",
        details: {
          sources_present: ["INDIVIDUAL", "SUPERVISOR", "JOB_HOLDER"],
          aspiration_score_sum: 75,
          weights_sum: 90,
          capped: 90
        }
      },
      training_certification: { 
        raw: 95, 
        weight: 0.1, 
        contribution: 9.5, 
        source: "L&D Records" 
      },
      tes: { 
        raw: 92, 
        weight: 0.1, 
        contribution: 9.2, 
        source: "TES Engine" 
      }
    }
  },
  {
    eqs_id: "EQS-0005",
    employee_id: "EMP-0012",
    target_position_id: "POS-HC-VP-001",
    eligible: true,
    eqs_score: 84.5,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 82, weight: 0.2, contribution: 16.4, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 80, weight: 0.2, contribution: 16.0, source: "Competency Assessment" },
      experience: { raw: 80, weight: 0.2, contribution: 16.0, source: "Job History + Unit Experience" },
      aspiration: { raw: 70, weight: 0.1, contribution: 7.0, source: "Career Path aspirations" },
      training_certification: { raw: 85, weight: 0.1, contribution: 8.5, source: "L&D Records" },
      tes: { raw: 82, weight: 0.1, contribution: 8.2, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0006",
    employee_id: "EMP-0013",
    target_position_id: "POS-HC-VP-001",
    eligible: true,
    eqs_score: 87.8,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 86, weight: 0.2, contribution: 17.2, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 88, weight: 0.2, contribution: 17.6, source: "Competency Assessment" },
      experience: { raw: 85, weight: 0.2, contribution: 17.0, source: "Job History + Unit Experience" },
      aspiration: { raw: 80, weight: 0.1, contribution: 8.0, source: "Career Path aspirations" },
      training_certification: { raw: 88, weight: 0.1, contribution: 8.8, source: "L&D Records" },
      tes: { raw: 87, weight: 0.1, contribution: 8.7, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0007",
    employee_id: "EMP-0011",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: true,
    eqs_score: 81.3,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 78, weight: 0.2, contribution: 15.6, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 80, weight: 0.2, contribution: 16.0, source: "Competency Assessment" },
      experience: { raw: 72, weight: 0.2, contribution: 14.4, source: "Job History + Unit Experience" },
      aspiration: { raw: 75, weight: 0.1, contribution: 7.5, source: "Career Path aspirations" },
      training_certification: { raw: 85, weight: 0.1, contribution: 8.5, source: "L&D Records" },
      tes: { raw: 79, weight: 0.1, contribution: 7.9, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0008",
    employee_id: "EMP-0020",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: true,
    eqs_score: 83.7,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 84, weight: 0.2, contribution: 16.8, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 82, weight: 0.2, contribution: 16.4, source: "Competency Assessment" },
      experience: { raw: 78, weight: 0.2, contribution: 15.6, source: "Job History + Unit Experience" },
      aspiration: { raw: 70, weight: 0.1, contribution: 7.0, source: "Career Path aspirations" },
      training_certification: { raw: 88, weight: 0.1, contribution: 8.8, source: "L&D Records" },
      tes: { raw: 81, weight: 0.1, contribution: 8.1, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0009",
    employee_id: "EMP-0018",
    target_position_id: "POS-HC-SUP-OPS-001",
    eligible: true,
    eqs_score: 77.5,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 76, weight: 0.2, contribution: 15.2, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 75, weight: 0.2, contribution: 15.0, source: "Competency Assessment" },
      experience: { raw: 70, weight: 0.2, contribution: 14.0, source: "Job History + Unit Experience" },
      aspiration: { raw: 65, weight: 0.1, contribution: 6.5, source: "Career Path aspirations" },
      training_certification: { raw: 80, weight: 0.1, contribution: 8.0, source: "L&D Records" },
      tes: { raw: 78, weight: 0.1, contribution: 7.8, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0010",
    employee_id: "EMP-0019",
    target_position_id: "POS-HC-SUP-OPS-001",
    eligible: true,
    eqs_score: 79.2,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 80, weight: 0.2, contribution: 16.0, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 78, weight: 0.2, contribution: 15.6, source: "Competency Assessment" },
      experience: { raw: 74, weight: 0.2, contribution: 14.8, source: "Job History + Unit Experience" },
      aspiration: { raw: 70, weight: 0.1, contribution: 7.0, source: "Career Path aspirations" },
      training_certification: { raw: 82, weight: 0.1, contribution: 8.2, source: "L&D Records" },
      tes: { raw: 76, weight: 0.1, contribution: 7.6, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0011",
    employee_id: "EMP-0014",
    target_position_id: "POS-HC-SUP-OPS-001",
    eligible: true,
    eqs_score: 74.1,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 72, weight: 0.2, contribution: 14.4, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 73, weight: 0.2, contribution: 14.6, source: "Competency Assessment" },
      experience: { raw: 68, weight: 0.2, contribution: 13.6, source: "Job History + Unit Experience" },
      aspiration: { raw: 70, weight: 0.1, contribution: 7.0, source: "Career Path aspirations" },
      training_certification: { raw: 78, weight: 0.1, contribution: 7.8, source: "L&D Records" },
      tes: { raw: 75, weight: 0.1, contribution: 7.5, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0012",
    employee_id: "EMP-0017",
    target_position_id: "POS-HC-STF-OPS-001",
    eligible: true,
    eqs_score: 72.8,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 74, weight: 0.2, contribution: 14.8, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 72, weight: 0.2, contribution: 14.4, source: "Competency Assessment" },
      experience: { raw: 66, weight: 0.2, contribution: 13.2, source: "Job History + Unit Experience" },
      aspiration: { raw: 65, weight: 0.1, contribution: 6.5, source: "Career Path aspirations" },
      training_certification: { raw: 75, weight: 0.1, contribution: 7.5, source: "L&D Records" },
      tes: { raw: 72, weight: 0.1, contribution: 7.2, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0013",
    employee_id: "EMP-0015",
    target_position_id: "POS-FIN-VP-001",
    eligible: true,
    eqs_score: 82.4,
    eqs_band: "Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 80, weight: 0.2, contribution: 16.0, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 82, weight: 0.2, contribution: 16.4, source: "Competency Assessment" },
      experience: { raw: 78, weight: 0.2, contribution: 15.6, source: "Job History + Unit Experience" },
      aspiration: { raw: 75, weight: 0.1, contribution: 7.5, source: "Career Path aspirations" },
      training_certification: { raw: 84, weight: 0.1, contribution: 8.4, source: "L&D Records" },
      tes: { raw: 80, weight: 0.1, contribution: 8.0, source: "TES Engine" }
    }
  },
  {
    eqs_id: "EQS-0014",
    employee_id: "EMP-0016",
    target_position_id: "POS-FIN-VP-001",
    eligible: true,
    eqs_score: 85.6,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 84, weight: 0.2, contribution: 16.8, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 86, weight: 0.2, contribution: 17.2, source: "Competency Assessment" },
      experience: { raw: 82, weight: 0.2, contribution: 16.4, source: "Job History + Unit Experience" },
      aspiration: { raw: 80, weight: 0.1, contribution: 8.0, source: "Career Path aspirations" },
      training_certification: { raw: 87, weight: 0.1, contribution: 8.7, source: "L&D Records" },
      tes: { raw: 84, weight: 0.1, contribution: 8.4, source: "TES Engine" }
    }
  }
];

// Talent Pool Rankings
export const talentPoolRankings: TalentPoolRanking[] = [
  {
    position_id: "POS-HC-DIR-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0007", eqs_score: 93.45, cluster: "HIGH_POTENTIAL", readiness: "READY_NOW" },
      { rank: 2, employee_id: "EMP-0002", eqs_score: 91.10, cluster: "HIGH_POTENTIAL", readiness: "READY_IN_6_12_MONTHS" }
    ],
    ineligible_candidates: []
  },
  {
    position_id: "POS-HC-MGR-OPS-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0001", eqs_score: 88.27, cluster: "PROMOTABLE", readiness: "READY_IN_6_12_MONTHS" },
      { rank: 2, employee_id: "EMP-0020", eqs_score: 83.7, cluster: "SOLID_CONTRIBUTOR", readiness: "READY_IN_1_2_YEARS" },
      { rank: 3, employee_id: "EMP-0011", eqs_score: 81.3, cluster: "PROMOTABLE", readiness: "READY_IN_1_2_YEARS" }
    ],
    ineligible_candidates: [
      { employee_id: "EMP-0003", reason: "DISCIPLINARY_ACTIVE" },
      { employee_id: "EMP-0006", reason: "GRADE_OUT_OF_RANGE" }
    ]
  },
  {
    position_id: "POS-HC-VP-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0013", eqs_score: 87.8, cluster: "HIGH_POTENTIAL", readiness: "READY_IN_6_12_MONTHS" },
      { rank: 2, employee_id: "EMP-0012", eqs_score: 84.5, cluster: "PROMOTABLE", readiness: "READY_IN_1_2_YEARS" }
    ],
    ineligible_candidates: []
  },
  {
    position_id: "POS-HC-SUP-OPS-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0019", eqs_score: 79.2, cluster: "PROMOTABLE", readiness: "READY_IN_6_12_MONTHS" },
      { rank: 2, employee_id: "EMP-0018", eqs_score: 77.5, cluster: "SOLID_CONTRIBUTOR", readiness: "READY_IN_1_2_YEARS" },
      { rank: 3, employee_id: "EMP-0014", eqs_score: 74.1, cluster: "SOLID_CONTRIBUTOR", readiness: "READY_IN_1_2_YEARS" }
    ],
    ineligible_candidates: []
  },
  {
    position_id: "POS-HC-STF-OPS-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0017", eqs_score: 72.8, cluster: "SOLID_CONTRIBUTOR", readiness: "READY_IN_6_12_MONTHS" }
    ],
    ineligible_candidates: []
  },
  {
    position_id: "POS-FIN-VP-001",
    generated_at: "2025-12-01T10:05:00+07:00",
    candidates: [
      { rank: 1, employee_id: "EMP-0016", eqs_score: 85.6, cluster: "HIGH_POTENTIAL", readiness: "READY_NOW" },
      { rank: 2, employee_id: "EMP-0015", eqs_score: 82.4, cluster: "PROMOTABLE", readiness: "READY_IN_6_12_MONTHS" }
    ],
    ineligible_candidates: []
  }
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get company by ID
 */
export function getCompany(companyId: string): Company | undefined {
  return companies.find(c => c.company_id === companyId);
}

/**
 * Get org unit by ID
 */
export function getOrgUnit(orgUnitId: string): OrgUnit | undefined {
  return orgUnits.find(ou => ou.org_unit_id === orgUnitId);
}

/**
 * Get location by ID
 */
export function getLocation(locationId: string): Location | undefined {
  return locations.find(l => l.location_id === locationId);
}

/**
 * Get position by ID
 */
export function getPosition(positionId: string): Position | undefined {
  return positions.find(p => p.position_id === positionId);
}

/**
 * Get employee by ID
 */
export function getEmployee(employeeId: string): Employee | undefined {
  return employees.find(e => e.employee_id === employeeId);
}

/**
 * Get job history for employee
 */
export function getJobHistory(employeeId: string): JobHistory[] {
  return jobHistory.filter(jh => jh.employee_id === employeeId);
}

/**
 * Get EQS score for employee-position pair
 */
export function getEQSScore(employeeId: string, targetPositionId: string): EQSScore | undefined {
  return eqsScores.find(
    eqs => eqs.employee_id === employeeId && eqs.target_position_id === targetPositionId
  );
}

/**
 * Get talent pool ranking for position
 */
export function getTalentPoolRanking(positionId: string): TalentPoolRanking | undefined {
  return talentPoolRankings.find(tpr => tpr.position_id === positionId);
}

/**
 * Get candidates for position with full employee data
 */
export function getCandidatesForPosition(positionId: string) {
  const ranking = getTalentPoolRanking(positionId);
  if (!ranking) return [];

  // Get the target position object
  const position = getPosition(positionId);
  if (!position) return [];

  return ranking.candidates.map(candidate => {
    const employee = getEmployee(candidate.employee_id);
    const eqs = getEQSScore(candidate.employee_id, positionId);
    const currentPosition = employee?.current_position_id ? getPosition(employee.current_position_id) : null;
    const company = employee ? getCompany(employee.company_id) : null;
    const location = employee ? getLocation(employee.location_id) : null;

    if (!employee || !eqs) return null;

    // Map to format expected by UI components (backward compatible with old CandidateData interface)
    return {
      id: candidate.employee_id,
      rank: candidate.rank,
      name: employee.full_name,
      employeeId: employee.nik,
      avatar: undefined, // Can be added later
      currentPosition: currentPosition?.title || "Not Assigned",
      currentCompany: company?.name || "Unknown",
      currentJobFamily: employee.job_family_current,
      currentGrade: employee.current_grade_jabatan,
      employeeType: employee.employee_type,
      isTopTalent: candidate.cluster === "HIGH_POTENTIAL",
      readiness: getReadinessDisplay(candidate.readiness),
      cluster: candidate.cluster,
      
      // EQS data - map to old format
      eqs: eqs.component_breakdown ? {
        total: eqs.eqs_score || 0,
        performance: eqs.component_breakdown.performance.raw,
        competency: eqs.component_breakdown.competency_job_fit.raw,
        disciplinary: 100, // Gate field, always 100 if eligible
        experience: eqs.component_breakdown.experience.raw,
        training: eqs.component_breakdown.training_certification.raw,
        aspiration: eqs.component_breakdown.aspiration.raw,
        tes: eqs.component_breakdown.tes.raw,
        contributions: {
          performance: eqs.component_breakdown.performance.contribution,
          competency: eqs.component_breakdown.competency_job_fit.contribution,
          disciplinary: 0, // Gate, no contribution
          experience: eqs.component_breakdown.experience.contribution,
          training: eqs.component_breakdown.training_certification.contribution,
          aspiration: eqs.component_breakdown.aspiration.contribution,
          tes: eqs.component_breakdown.tes.contribution,
        },
        performanceSource: eqs.component_breakdown.performance.source,
        competencySource: eqs.component_breakdown.competency_job_fit.source,
        experienceSource: eqs.component_breakdown.experience.source,
        trainingSource: eqs.component_breakdown.training_certification.source,
        aspirationSource: eqs.component_breakdown.aspiration.source,
        tesSource: eqs.component_breakdown.tes.source,
      } : undefined,

      // Performance history (mock for now)
      performanceHistory: [
        { year: 2023, rating: 85, period: "FY2023" },
        { year: 2024, rating: 88, period: "FY2024" },
        { year: 2025, rating: 90, period: "FY2025" }
      ],

      // Competency (mock)
      competency: {
        jobFitScore: eqs.component_breakdown?.competency_job_fit.raw || 0,
        assessmentDate: "2025-01-15"
      },

      // Disciplinary record
      disciplinaryRecord: {
        status: employee.disciplinary_status,
        activeCase: employee.disciplinary_case
      },

      // Experience
      experience: {
        yearsInJobFamily: Math.floor((employee.tenure_months_in_current_grade || 0) / 12),
        yearsInCurrentPosition: Math.floor((employee.tenure_months_in_current_grade || 0) / 12),
        totalYears: Math.floor((employee.tenure_months_in_current_grade || 0) / 12) + 5 // Mock total
      },

      // Training (mock)
      training: {
        completedCourses: 8,
        certifications: 3,
        lastTrainingDate: "2025-09-15"
      },

      // Career aspiration - match EQSSidePanel expected structure
      aspirations: {
        sources: eqs.component_breakdown?.aspiration.details?.sources_present || [],
        hasAspiration: true,
        targetPosition: positionId
      },

      // Keep old field for backward compatibility
      careerAspiration: {
        hasAspiration: true,
        aspirationSources: eqs.component_breakdown?.aspiration.details?.sources_present || [],
        targetPosition: positionId
      },

      // TAB 2: Career History - Complete mock data
      careerHistory: [
        {
          id: `ca-${candidate.employee_id}-1`,
          type: "Definitif",
          positionTitle: currentPosition?.title || "Unknown Position",
          company: company?.name || "Unknown Company",
          department: "Human Capital",
          location: location?.city || "Jakarta",
          grade: `Grade ${employee.current_grade_jabatan}`,
          startDate: "Jan 2023",
          endDate: "Present",
          supervisor: "Direktur SDM",
          keyAchievements: [
            "Implemented new HRIS system, reducing processing time by 40%",
            "Led talent acquisition initiative resulting in 95% hiring success rate",
            "Designed and delivered leadership development program for 50+ managers"
          ]
        },
        {
          id: `ca-${candidate.employee_id}-2`,
          type: "Secondary Assignment",
          positionTitle: "Project Lead - Digital Transformation",
          company: company?.name || "Unknown Company",
          department: "IT & Digital",
          location: location?.city || "Jakarta",
          grade: `Grade ${employee.current_grade_jabatan - 1}`,
          startDate: "Jul 2021",
          endDate: "Dec 2022",
          supervisor: "VP IT & Digital",
          keyAchievements: [
            "Successfully migrated 15 legacy systems to cloud infrastructure",
            "Reduced operational costs by Rp 2.5B annually"
          ]
        },
        {
          id: `ca-${candidate.employee_id}-3`,
          type: "Definitif",
          positionTitle: "Senior HR Specialist",
          company: company?.name || "Unknown Company",
          department: "Human Capital",
          location: location?.city || "Jakarta",
          grade: `Grade ${employee.current_grade_jabatan - 2}`,
          startDate: "Jan 2019",
          endDate: "Jun 2021",
          supervisor: "Manager HR Operations",
          keyAchievements: [
            "Redesigned performance management process",
            "Implemented competency framework across organization"
          ]
        }
      ],

      // TAB 3: Qualifications - Education, Training, Certifications, Awards
      educationRecords: [
        {
          id: `edu-${candidate.employee_id}-1`,
          level: "S2 (Master's Degree)",
          major: "Master of Business Administration (MBA)",
          institution: "Universitas Indonesia",
          graduationYear: 2020,
          gpa: 3.85
        },
        {
          id: `edu-${candidate.employee_id}-2`,
          level: "S1 (Bachelor's Degree)",
          major: "Manajemen Sumber Daya Manusia",
          institution: "Institut Teknologi Bandung",
          graduationYear: 2015,
          gpa: 3.72
        }
      ],

      trainingRecords: [
        {
          id: `trn-${candidate.employee_id}-1`,
          name: "Program Penjenjangan Manager",
          provider: "InJourney Learning Center",
          type: "Penjenjangan",
          duration: 120,
          startDate: "2025-01-15",
          endDate: "2025-03-30",
          status: "Completed",
          score: 92
        },
        {
          id: `trn-${candidate.employee_id}-2`,
          name: "Strategic Leadership in Digital Era",
          provider: "InJourney Learning Center",
          type: "Leadership",
          duration: 40,
          startDate: "2024-10-01",
          endDate: "2024-11-15",
          status: "Completed",
          score: 88
        },
        {
          id: `trn-${candidate.employee_id}-3`,
          name: "Talent Management Best Practices",
          provider: "External - SHRM",
          type: "Technical",
          duration: 24,
          startDate: "2024-07-10",
          endDate: "2024-07-25",
          status: "Completed",
          score: 95
        },
        {
          id: `trn-${candidate.employee_id}-4`,
          name: "Data-Driven HR Analytics",
          provider: "External - Coursera",
          type: "Technical",
          duration: 32,
          startDate: "2025-11-01",
          endDate: "2025-12-15",
          status: "In Progress"
        }
      ],

      certificationRecords: [
        {
          id: `cert-${candidate.employee_id}-1`,
          name: "SHRM-SCP (Senior Certified Professional)",
          issuer: "Society for Human Resource Management",
          issueDate: "2024-06-15",
          expiryDate: "2027-06-15",
          credentialId: "SHRM-2024-SCP-123456",
          isRelevant: true,
          status: "Valid"
        },
        {
          id: `cert-${candidate.employee_id}-2`,
          name: "Certified Talent Development Professional",
          issuer: "Association for Talent Development (ATD)",
          issueDate: "2023-09-20",
          expiryDate: "2026-09-20",
          credentialId: "ATD-CTDP-789012",
          isRelevant: true,
          status: "Valid"
        },
        {
          id: `cert-${candidate.employee_id}-3`,
          name: "Professional Scrum Master I",
          issuer: "Scrum.org",
          issueDate: "2022-03-10",
          credentialId: "PSM-345678",
          isRelevant: false,
          status: "Valid"
        }
      ],

      awardRecords: [
        {
          id: `awd-${candidate.employee_id}-1`,
          name: "Best HR Innovation Award",
          issuer: "PT Aviasi Pariwisata Indonesia",
          category: "Innovation",
          level: "Company",
          year: 2024,
          description: "Recognition for implementing AI-powered talent acquisition system"
        },
        {
          id: `awd-${candidate.employee_id}-2`,
          name: "Outstanding Performance Award",
          issuer: "Human Capital Division",
          category: "Performance",
          level: "Division",
          year: 2023,
          description: "Achieved all KPIs with 120% average performance"
        }
      ],

      // TAB 4: Career Aspiration - Complete mock data
      careerAspirationInJourney: [
        {
          id: `asp-inj-${candidate.employee_id}-1`,
          targetPosition: currentPosition?.title || position.title,
          targetCompany: company?.name || "PT Aviasi Pariwisata Indonesia",
          targetDepartment: "Human Capital Division",
          targetGrade: position.grade_jabatan,
          timeframe: "1-2 Years",
          status: "Active",
          submittedDate: "2025-10-15T08:00:00+07:00",
          lastUpdated: "2025-12-01T10:00:00+07:00",
          mentor: "VP Human Capital",
          developmentPlan: [
            "Complete Manager Penjenjangan Program",
            "Lead cross-functional HR transformation project",
            "Obtain international HR certification (SHRM-SCP)",
            "Build expertise in workforce analytics and planning"
          ]
        }
      ],

      careerAspirationBUMN: {
        targetPosition: "Direktur SDM",
        targetBUMN: "PT Angkasa Pura Indonesia",
        targetMinistry: "Kementerian BUMN",
        readiness: "Ready in 3-5 years",
        status: "Registered",
        submittedDate: "2025-08-20T09:00:00+07:00",
        reviewer: "Kementerian BUMN - Talent Pool Coordinator",
        notes: "Candidate demonstrates strong leadership potential and comprehensive HR expertise. Recommended for director-level succession planning."
      },

      personalValuesVision: {
        coreValues: ["Integrity", "Excellence", "Collaboration", "Innovation"],
        careerVision: "To become a strategic HR leader who transforms organizational culture and drives sustainable business growth through people development.",
        personalMission: "Empowering individuals and teams to reach their full potential while building inclusive, high-performance work environments.",
        workStyle: ["Analytical", "Collaborative", "Strategic", "Results-Oriented"],
        motivators: [
          "Making meaningful impact on people's careers",
          "Solving complex organizational challenges",
          "Continuous learning and professional growth",
          "Building high-performing teams"
        ]
      },

      // TAB 5: Personal Info - Complete mock data
      personalInfo: {
        fullName: employee.full_name,
        nik: employee.nik,
        nip: `NIP-${employee.nik}-INJ`,
        dateOfBirth: "1990-05-15",
        placeOfBirth: "Jakarta",
        gender: "Male",
        religion: "Islam",
        maritalStatus: "Married",
        bloodType: "A",
        nationality: "Indonesian",
        email: `${employee.full_name.toLowerCase().replace(/ /g, '.')}@aviasi-pariwisata.co.id`,
        personalEmail: `${employee.full_name.toLowerCase().replace(/ /g, '.')}@gmail.com`,
        phoneNumber: "+62 812-3456-7890",
        emergencyContact: {
          name: "Siti Nurhaliza",
          relationship: "Spouse",
          phoneNumber: "+62 813-9876-5432"
        },
        address: {
          street: "Jl. Sudirman Kav. 52-53",
          city: location?.city || "Jakarta",
          province: "DKI Jakarta",
          postalCode: "12190",
          country: "Indonesia"
        },
        socialMedia: {
          linkedin: `https://linkedin.com/in/${employee.full_name.toLowerCase().replace(/ /g, '-')}`,
          twitter: `@${employee.full_name.toLowerCase().replace(/ /g, '_')}`,
          instagram: `@${employee.full_name.toLowerCase().replace(/ /g, '_')}`
        },
        family: {
          spouse: {
            name: "Siti Nurhaliza",
            occupation: "Senior Consultant",
            company: "McKinsey & Company"
          },
          children: [
            { name: "Ahmad Fadhil", age: 5, school: "Jakarta International School" },
            { name: "Aisha Zahra", age: 3, school: "TK Al-Azhar" }
          ]
        },
        languages: [
          { language: "Indonesian", proficiency: "Native" },
          { language: "English", proficiency: "Fluent" },
          { language: "Mandarin", proficiency: "Basic" }
        ],
        hobbies: ["Reading", "Running", "Public Speaking", "Mentoring"],
        joinDate: "2018-01-15",
        permanentDate: "2019-01-15"
      },

      // Keep references to original data
      _employee: employee,
      _eqs: eqs,
      _position: currentPosition,
      _company: company,
      _location: location
    };
  }).filter(c => c !== null);
}

/**
 * Get all positions with candidate counts
 */
export function getPositionsWithCandidateCounts() {
  return positions.map(position => {
    const ranking = getTalentPoolRanking(position.position_id);
    const candidateCount = ranking?.candidates.length || 0;
    const successorCount = ranking?.candidates.filter(c => c.readiness === "READY_NOW").length || 0;
    const company = getCompany(position.company_id);
    const orgUnit = position.org_unit_id ? getOrgUnit(position.org_unit_id) : null;
    const location = getLocation(position.location_id);
    const incumbent = position.incumbent_employee_id ? getEmployee(position.incumbent_employee_id) : null;

    // Map to old Position format for backward compatibility
    return {
      id: position.position_id,
      title: position.title,
      department: orgUnit?.name || "Unknown Department",
      company: company?.name || "Unknown Company",
      level: getBandLevel(position.band_jabatan),
      gradeGroup: position.band_jabatan,
      jobFamily: position.job_family,
      isKSP: position.grade_jabatan >= 18, // KSP if Band IV or higher
      status: position.status === "VACANT" ? "vacant" : "filled",
      risk: position.status === "VACANT" ? "critical" : candidateCount === 0 ? "high" : "medium",
      vacancyDate: position.status === "VACANT" ? "2025-10-01" : undefined,
      successorCount,
      candidateCount,
      lastReviewDate: "2025-11-01",
      // Keep original data for reference
      _original: position
    };
  });
}

/**
 * Helper to get band level display
 */
function getBandLevel(bandJabatan: string): string {
  if (bandJabatan === "BoD") return "Board of Director";
  if (bandJabatan === "Band V") return "Director";
  if (bandJabatan === "Band IV") return "Vice President";
  if (bandJabatan === "Band III") return "Senior Manager";
  if (bandJabatan === "Band II") return "Manager";
  if (bandJabatan === "Band I") return "Staff";
  return bandJabatan;
}

/**
 * Get readiness display
 */
function getReadinessDisplay(readiness?: ReadinessLevel): string {
  if (!readiness) return "Unknown";
  if (readiness === "READY_NOW") return "Ready Now";
  if (readiness === "READY_IN_6_12_MONTHS") return "Ready in 6-12 Months";
  if (readiness === "READY_IN_1_2_YEARS") return "Ready in 1-2 Years";
  return readiness;
}