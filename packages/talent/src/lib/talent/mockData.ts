/**
 * Mock Data Service for Talent Management System
 * Based on: MockData-Talent.md
 * 
 * This service provides all mock data for:
 * - Talent Pool (EQS Calculation & Rankings)
 * - Talent Classification (9-Box Grid)
 * - Talent Review (TC Agenda Workflow)
 * - Talent Succession (Succession Planning)
 */

import type {
  Company,
  OrgUnit,
  Location,
  Position,
  Employee,
  EQSScore,
  Aspiration,
  TalentPoolCandidate,
  EmployeeClusterAssignment,
  TalentReviewProposal,
  SuccessorDesignation,
  SuccessionShortlist,
  BeritaAcara,
  TCMeeting,
  CareerAssignment,
  TrainingRecord,
  CertificationRecord,
  PerformanceHistory,
  PositionStatus,
  JobFamily,
  TalentCluster,
  AspirationSource,
} from '../../types/talent';

// ==================== MASTER DATA ====================

export const COMPANIES: Company[] = [
  { company_id: "CO-INJ", name: "PT Aviasi Pariwisata Indonesia (Persero)", type: "HOLDING" },
  { company_id: "CO-API", name: "PT Angkasa Pura Indonesia", type: "MEMBER" },
  { company_id: "CO-IAS", name: "PT Integrasi Aviasi Solusi", type: "MEMBER" },
  { company_id: "CO-SAR", name: "PT Sarinah", type: "MEMBER" },
];

export const ORG_UNITS: OrgUnit[] = [
  { org_unit_id: "OU-INJ-HC", company_id: "CO-INJ", name: "Human Capital Division", parent_org_unit_id: null },
  { org_unit_id: "OU-INJ-FIN", company_id: "CO-INJ", name: "Finance Division", parent_org_unit_id: null },
  { org_unit_id: "OU-API-HC", company_id: "CO-API", name: "Human Capital Dept", parent_org_unit_id: null },
  { org_unit_id: "OU-IAS-IT", company_id: "CO-IAS", name: "IT & Digital", parent_org_unit_id: null },
];

export const LOCATIONS: Location[] = [
  {
    location_id: "LOC-JKT-HO",
    personal_area: "Head Office Jakarta",
    sub_personal_area: "Jakarta Pusat",
    city: "Jakarta",
    country: "Indonesia",
  },
  {
    location_id: "LOC-JKT-SO",
    personal_area: "Jakarta Branch",
    sub_personal_area: "Jakarta Selatan",
    city: "Jakarta",
    country: "Indonesia",
  },
];

// ==================== POSITIONS ====================

export const POSITIONS: Position[] = [
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
    job_description: "Memimpin fungsi Human Capital grup, memastikan strategi talent, compensation, dan governance berjalan.",
    is_ksp: true,
    successor_count: 2,
    candidate_count: 5,
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
    job_description: "Mengelola kebijakan HC dan implementasi program talent di level grup.",
    is_ksp: true,
    successor_count: 1,
    candidate_count: 8,
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
    job_description: "Mengelola operasional HR, SLA, payroll coordination, dan data workforce.",
    is_ksp: false,
    successor_count: 2,
    candidate_count: 12,
    tenure_years: 3.2,
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
    job_description: "Supervisi proses HR ops harian, memastikan kepatuhan dan kualitas data.",
    is_ksp: false,
    successor_count: 0,
    candidate_count: 6,
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
    job_description: "Administrasi HR, updating master data, dan dukungan proses HC.",
    is_ksp: false,
    successor_count: 1,
    candidate_count: 4,
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
    job_description: "Mengelola strategi keuangan, budgeting, dan kontrol internal.",
    is_ksp: true,
    successor_count: 2,
    candidate_count: 7,
    tenure_years: 3.3,
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
    job_description: "Pimpinan tertinggi entitas.",
    is_ksp: true,
    successor_count: 1,
    candidate_count: 3,
  },
];

// ==================== EMPLOYEES ====================

export const EMPLOYEES: Employee[] = [
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
      education: [
        { level: "S2", major: "Management", institution: "UI", year: 2015 }
      ],
    },
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
    current_position_title: "Staff HR Operations",
    current_department: "Human Capital Division",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
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
    profile: {
      email: "siti.aminah@injourney.co.id",
    },
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    current_position_title: "Manager HR Operations",
    current_department: "Human Capital Division",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
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
      status: "ACTIVE",
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    current_position_title: "Supervisor HR Operations",
    current_department: "Human Capital Division",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
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
    profile: {
      email: "dewi.kartika@ap-indonesia.co.id",
    },
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop",
    current_department: "Finance",
    current_company_name: "PT Angkasa Pura Indonesia",
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
    profile: {
      email: "raka.putra@ias.co.id",
    },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    current_department: "IT & Digital",
    current_company_name: "PT Integrasi Aviasi Solusi",
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
    disciplinary_status: "NONE",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    current_department: "Human Resources",
    current_company_name: "PT Sarinah",
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
    disciplinary_status: "NONE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    current_position_title: "VP Human Capital",
    current_department: "Human Capital Division",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
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
    disciplinary_status: "NONE",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    current_position_title: "VP Finance",
    current_department: "Finance Division",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
  },
  {
    employee_id: "EMP-0099",
    nik: "90001",
    full_name: "Dr. Ir. Bambang Setiawan",
    employee_type: "PERMANENT",
    company_id: "CO-INJ",
    current_position_id: "POS-CEO-INJ-001",
    current_grade_jabatan: 25,
    personal_grade_pg: "PG-25",
    job_family_current: "OPERATIONS",
    location_id: "LOC-JKT-HO",
    direct_supervisor_employee_id: null,
    tenure_months_in_current_grade: 48,
    disciplinary_status: "NONE",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    current_position_title: "Direktur Utama",
    current_department: "Board of Directors",
    current_company_name: "PT Aviasi Pariwisata Indonesia",
  },
];

// ==================== EQS SCORES ====================

export const EQS_SCORES: EQSScore[] = [
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
      },
      competency_job_fit: {
        raw: 85,
        weight: 0.2,
        contribution: 17.0,
        source: "Competency Assessment",
      },
      experience: {
        raw: 75,
        weight: 0.2,
        contribution: 15.0,
        source: "Job History + Unit Experience",
      },
      aspiration: {
        raw: 75,
        weight: 0.1,
        contribution: 7.5,
        source: "Career Path aspirations (SUM: INDIVIDUAL 20 + SUPERVISOR 30 + UNIT 25 = 75, capped at 100)",
      },
      training_certification: {
        raw: 90,
        weight: 0.1,
        contribution: 9.0,
        source: "L&D Records",
      },
      tes: {
        raw: 83,
        weight: 0.1,
        contribution: 8.3,
        source: "TES Engine",
      },
    },
    snapshot: {
      employee_snapshot: { employee_id: "EMP-0001", grade: 12, disciplinary: "NONE" },
      position_snapshot: { position_id: "POS-HC-MGR-OPS-001", grade: 15 },
      aspiration_sources: ["INDIVIDUAL", "SUPERVISOR", "UNIT"],
      inputs_hash: "sha256:mock-0001",
      notes: "Used for EQS breakdown explainability UI.",
    },
  },
  {
    eqs_id: "EQS-0002",
    employee_id: "EMP-0003",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: false,
    eqs_score: null,
    eqs_band: null,
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    ineligible_reason: "DISCIPLINARY_ACTIVE",
    note: "EQS not displayed to end-user if ineligible; kept for admin/audit purposes.",
  },
  {
    eqs_id: "EQS-0003",
    employee_id: "EMP-0005",
    target_position_id: "POS-HC-SUP-OPS-001",
    eligible: false,
    eqs_score: null,
    eqs_band: null,
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    ineligible_reason: "JOB_FAMILY_MISMATCH_INSUFFICIENT_EXPERIENCE",
    note: "IT_ENGINEERING → HUMAN_RESOURCES without 1+ year experience.",
  },
  {
    eqs_id: "EQS-0004",
    employee_id: "EMP-0002",
    target_position_id: "POS-HC-MGR-OPS-001",
    eligible: true,
    eqs_score: 91.10,
    eqs_band: "Highly Qualified",
    formula_version: "EQS-2025-12-18",
    calculated_at: "2025-12-01T10:00:00+07:00",
    component_breakdown: {
      performance: { raw: 88, weight: 0.2, contribution: 17.6, source: "Performance Appraisal (3y avg)" },
      competency_job_fit: { raw: 90, weight: 0.2, contribution: 18.0, source: "Competency Assessment" },
      experience: { raw: 85, weight: 0.2, contribution: 17.0, source: "Job History + Unit Experience" },
      aspiration: { raw: 80, weight: 0.1, contribution: 8.0, source: "Career Path aspirations" },
      training_certification: { raw: 95, weight: 0.1, contribution: 9.5, source: "L&D Records" },
      tes: { raw: 87, weight: 0.1, contribution: 8.7, source: "TES Engine" },
    },
  },
];

// ==================== ASPIRATIONS (from Career Path module) ====================

export const ASPIRATIONS: Aspiration[] = [
  {
    aspiration_id: "ASP-0001",
    employee_id: "EMP-0001",
    target_position_id: "POS-HC-MGR-OPS-001",
    source: "INDIVIDUAL",
    submitted_date: "2025-11-15T10:30:00+07:00",
    status: "ACTIVE",
  },
  {
    aspiration_id: "ASP-0002",
    employee_id: "EMP-0001",
    target_position_id: "POS-HC-MGR-OPS-001",
    source: "SUPERVISOR",
    submitted_date: "2025-11-10T09:10:00+07:00",
    status: "ACTIVE",
    nominator_employee_id: "EMP-0003",
  },
  {
    aspiration_id: "ASP-0003",
    employee_id: "EMP-0001",
    target_position_id: "POS-HC-MGR-OPS-001",
    source: "UNIT",
    submitted_date: "2025-11-14T16:45:00+07:00",
    status: "ACTIVE",
    nominator_employee_id: "EMP-0007",
  },
  {
    aspiration_id: "ASP-0004",
    employee_id: "EMP-0002",
    target_position_id: "POS-HC-VP-001",
    source: "INDIVIDUAL",
    submitted_date: "2025-11-12T14:20:00+07:00",
    status: "ACTIVE",
  },
  {
    aspiration_id: "ASP-0005",
    employee_id: "EMP-0002",
    target_position_id: "POS-HC-VP-001",
    source: "JOB_HOLDER",
    submitted_date: "2025-11-18T11:00:00+07:00",
    status: "ACTIVE",
    nominator_employee_id: "EMP-0007",
    rank: 1,
  },
];

// ==================== TALENT CLUSTERS ====================

export const TALENT_CLUSTER_ASSIGNMENTS: EmployeeClusterAssignment[] = [
  {
    employee_id: "EMP-0001",
    full_name: "Budi Santoso",
    current_position: "Staff HR Operations",
    current_department: "Human Capital Division",
    current_grade: 12,
    performance_score: 80,
    capacity_score: 78,
    cluster: "PROMOTABLE",
    is_calibrated: false,
    is_top_performer: false,
    is_high_potential: false,
    is_at_risk: false,
    is_successor: false,
  },
  {
    employee_id: "EMP-0002",
    full_name: "Siti Aminah",
    current_position: "Manager HR Operations",
    current_department: "Human Capital Division",
    current_grade: 15,
    performance_score: 88,
    capacity_score: 90,
    cluster: "HIGH_POTENTIAL",
    is_calibrated: true,
    calibration_details: {
      original_cluster: "PROMOTABLE",
      new_cluster: "HIGH_POTENTIAL",
      reason: "Evidence tambahan dari hasil program leadership Q3.",
      calibrated_by: "EMP-0007",
      calibrated_at: "2025-12-02T14:00:00+07:00",
    },
    is_top_performer: true,
    is_high_potential: true,
    is_at_risk: false,
    is_successor: true,
    successor_for: ["POS-HC-VP-001"],
  },
  {
    employee_id: "EMP-0007",
    full_name: "Taufik Hidayat",
    current_position: "VP Human Capital",
    current_department: "Human Capital Division",
    current_grade: 18,
    performance_score: 92,
    capacity_score: 88,
    cluster: "HIGH_POTENTIAL",
    is_calibrated: false,
    is_top_performer: true,
    is_high_potential: true,
    is_at_risk: false,
    is_successor: true,
    successor_for: ["POS-HC-DIR-001"],
  },
];

// ==================== SERVICE FUNCTIONS ====================

export function getCompanies(): Company[] {
  return COMPANIES;
}

export function getCompanyById(id: string): Company | undefined {
  return COMPANIES.find(c => c.company_id === id);
}

export function getOrgUnits(): OrgUnit[] {
  return ORG_UNITS;
}

export function getOrgUnitById(id: string): OrgUnit | undefined {
  return ORG_UNITS.find(u => u.org_unit_id === id);
}

export function getLocations(): Location[] {
  return LOCATIONS;
}

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find(l => l.location_id === id);
}

export function getPositions(): Position[] {
  return POSITIONS;
}

export function getPositionById(id: string): Position | undefined {
  return POSITIONS.find(p => p.position_id === id);
}

export function getEmployees(): Employee[] {
  return EMPLOYEES;
}

export function getEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find(e => e.employee_id === id);
}

export function getEQSScores(): EQSScore[] {
  return EQS_SCORES;
}

export function getEQSScoreByEmployeeAndPosition(employeeId: string, positionId: string): EQSScore | undefined {
  return EQS_SCORES.find(
    e => e.employee_id === employeeId && e.target_position_id === positionId
  );
}

export function getEligibleEQSScores(): EQSScore[] {
  return EQS_SCORES.filter(e => e.eligible && e.eqs_score !== null);
}

export function getAspirations(): Aspiration[] {
  return ASPIRATIONS;
}

export function getAspirationsByEmployee(employeeId: string): Aspiration[] {
  return ASPIRATIONS.filter(a => a.employee_id === employeeId);
}

export function getAspirationsByPosition(positionId: string): Aspiration[] {
  return ASPIRATIONS.filter(a => a.target_position_id === positionId);
}

export function getTalentClusterAssignments(): EmployeeClusterAssignment[] {
  return TALENT_CLUSTER_ASSIGNMENTS;
}

export function getTalentClusterByEmployee(employeeId: string): EmployeeClusterAssignment | undefined {
  return TALENT_CLUSTER_ASSIGNMENTS.find(t => t.employee_id === employeeId);
}

// ==================== TALENT POOL RANKINGS ====================

export function getCandidatesForPosition(positionId: string): TalentPoolCandidate[] {
  // Get all EQS scores for this position (eligible only)
  const eqsScores = EQS_SCORES.filter(
    e => e.target_position_id === positionId && e.eligible && e.eqs_score !== null
  );

  // Sort by EQS score descending
  eqsScores.sort((a, b) => (b.eqs_score || 0) - (a.eqs_score || 0));

  // Map to TalentPoolCandidate format
  return eqsScores.map((eqs, index) => {
    const employee = getEmployeeById(eqs.employee_id);
    const aspirations = getAspirationsByEmployee(eqs.employee_id).filter(
      a => a.target_position_id === positionId
    );
    const cluster = getTalentClusterByEmployee(eqs.employee_id);

    return {
      employee_id: eqs.employee_id,
      target_position_id: positionId,
      eqs_score: eqs.eqs_score!,
      eqs_band: eqs.eqs_band!,
      rank: index + 1,
      readiness: "READY_IN_6_12_MONTHS", // Mock readiness
      full_name: employee?.full_name || "Unknown",
      nik: employee?.nik || "",
      current_position: employee?.current_position_title || "",
      current_grade: employee?.current_grade_jabatan || 0,
      avatar: employee?.avatar,
      has_aspiration: aspirations.length > 0,
      aspiration_sources: aspirations.map(a => a.source),
      is_shortlisted: false,
      is_designated_successor: cluster?.is_successor || false,
    };
  });
}

// ==================== FILTER HELPERS ====================

export function filterPositions(filters: {
  companies?: string[];
  job_families?: JobFamily[];
  status?: PositionStatus[];
  ksp_only?: boolean;
  search?: string;
}): Position[] {
  let result = [...POSITIONS];

  if (filters.companies && filters.companies.length > 0) {
    result = result.filter(p => filters.companies!.includes(p.company_id));
  }

  if (filters.job_families && filters.job_families.length > 0) {
    result = result.filter(p => filters.job_families!.includes(p.job_family));
  }

  if (filters.status && filters.status.length > 0) {
    result = result.filter(p => filters.status!.includes(p.status));
  }

  if (filters.ksp_only) {
    result = result.filter(p => p.is_ksp === true);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.job_description.toLowerCase().includes(query)
    );
  }

  return result;
}

export function filterEmployees(filters: {
  companies?: string[];
  job_families?: JobFamily[];
  clusters?: TalentCluster[];
  search?: string;
}): Employee[] {
  let result = [...EMPLOYEES];

  if (filters.companies && filters.companies.length > 0) {
    result = result.filter(e => filters.companies!.includes(e.company_id));
  }

  if (filters.job_families && filters.job_families.length > 0) {
    result = result.filter(e => filters.job_families!.includes(e.job_family_current));
  }

  if (filters.clusters && filters.clusters.length > 0) {
    const employeeIdsInClusters = TALENT_CLUSTER_ASSIGNMENTS
      .filter(t => filters.clusters!.includes(t.cluster))
      .map(t => t.employee_id);
    result = result.filter(e => employeeIdsInClusters.includes(e.employee_id));
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      e =>
        e.full_name.toLowerCase().includes(query) ||
        e.nik.includes(query) ||
        e.profile?.email.toLowerCase().includes(query)
    );
  }

  return result;
}

// ==================== UNIQUE VALUES FOR FILTERS ====================

export function getUniqueCompanies(): Company[] {
  return COMPANIES;
}

export function getUniqueJobFamilies(): JobFamily[] {
  return ["HUMAN_RESOURCES", "FINANCE_ACCOUNTING", "IT_ENGINEERING", "OPERATIONS"];
}

export function getUniqueClusters(): TalentCluster[] {
  return ["HIGH_POTENTIAL", "PROMOTABLE", "SOLID_CONTRIBUTOR", "SLEEPING_TIGER", "UNFIT"];
}
