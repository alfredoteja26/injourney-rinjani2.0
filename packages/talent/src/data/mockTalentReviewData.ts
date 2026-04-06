// Mock Data for Talent Review Module
// Based on PRD-Rinjani-Talent.md - Epic 4: Talent Review

import { mockEmployees } from './mockTalentPoolData';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type ReviewProposalType = 
  | "PROMOTION_GRADE_JABATAN" 
  | "PROMOTION_PERSONAL_GRADE" 
  | "DEMOTION_PERSONAL_GRADE" 
  | "SALARY_INCREASE"
  | "ENRICHMENT"
  | "ROTATION"
  | "DEVELOPMENT_PROGRAM";

export type ReviewProposalStatus = "DRAFT" | "PENDING_HC" | "PENDING_TC" | "DECIDED";

export type ReviewDecisionOutcome = 
  | "APPROVED" 
  | "APPROVED_WITH_MODIFICATION" 
  | "DEFERRED" 
  | "REJECTED";

export type TCDayStatus = "NOT_STARTED" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";

export interface EligibleEmployee {
  employee_id: string;
  name: string;
  nik: string;
  current_position: string;
  current_grade: number;
  personal_grade: number;
  company_id: string;
  org_unit_id: string;
  supervisor_id: string;
  cluster: string;
  eqs_score: number;
  performance_rating: string;
  job_fit_score: number;
  tenure_in_grade_years: number;
  tenure_in_position_years: number;
  contract_expiry_date?: string;
  is_eligible: boolean;
  ineligibility_reasons?: string[];
  review_flags: {
    position_tenure_3y: boolean;
    grade_tenure_3y: boolean;
    contract_expiry_soon: boolean;
    external_assignment_3y: boolean;
  };
}

export interface SupervisorProposal {
  proposal_id: string;
  employee_id: string;
  supervisor_id: string;
  proposal_type: ReviewProposalType;
  target_position_id?: string;
  target_grade?: number;
  salary_increase_percentage?: number;
  justification: string;
  submitted_at: string;
  status: ReviewProposalStatus;
}

export interface HCRecommendation {
  recommendation_id: string;
  employee_id: string;
  supervisor_proposal_id: string;
  hc_admin_id: string;
  zonasi: "INTERNAL" | "LINTAS_ENTITAS";
  recommended_position_id?: string;
  recommended_grade?: number;
  recommended_salary_increase?: number;
  hc_rationale: string;
  submitted_at: string;
  status: ReviewProposalStatus;
}

export interface TCDecision {
  decision_id: string;
  employee_id: string;
  hc_recommendation_id: string;
  tc_session_id: string;
  decision_outcome: ReviewDecisionOutcome;
  approved_position_id?: string;
  approved_grade?: number;
  approved_salary_increase?: number;
  tc_rationale: string;
  decided_by: string;
  decided_at: string;
}

export interface TCSession {
  session_id: string;
  session_date: string;
  session_quarter: string;
  session_year: number;
  tc_tier: "TC_TIER_1" | "TC_TIER_2" | "TC_TIER_3";
  chairman_id: string;
  members: string[];
  secretary_id: string;
  status: TCDayStatus;
  agenda_items: string[]; // employee_ids
  berita_acara_id?: string;
}

export interface BeritaAcara {
  ba_id: string;
  tc_session_id: string;
  ba_number: string;
  generated_at: string;
  approved_at?: string;
  document_url?: string;
  signatories: {
    role: string;
    employee_id: string;
    signed_at?: string;
  }[];
}

export interface PeriodicReviewCategory {
  category: "POSITION_TENURE_3Y" | "GRADE_TENURE_3Y" | "EXTERNAL_ASSIGNMENT_3Y" | "CONTRACT_EXPIRY";
  employee_ids: string[];
  count: number;
}

// ============================================================================
// ELIGIBLE EMPLOYEES DATA
// ============================================================================

export const eligibleEmployees: EligibleEmployee[] = [
  {
    employee_id: "EMP-0001",
    name: "Budi Santoso",
    nik: "NIK-0001",
    current_position: "Manager HR Operations",
    current_grade: 15,
    personal_grade: 15,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    supervisor_id: "EMP-0007",
    cluster: "PROMOTABLE",
    eqs_score: 88.27,
    performance_rating: "OUTSTANDING",
    job_fit_score: 90,
    tenure_in_grade_years: 2.8,
    tenure_in_position_years: 2.5,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: true,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0002",
    name: "Siti Aminah",
    nik: "NIK-0002",
    current_position: "Supervisor Payroll",
    current_grade: 14,
    personal_grade: 14,
    company_id: "CO-API",
    org_unit_id: "OU-API-HC",
    supervisor_id: "EMP-0007",
    cluster: "HIGH_POTENTIAL",
    eqs_score: 91.10,
    performance_rating: "ABOVE_TARGET",
    job_fit_score: 88,
    tenure_in_grade_years: 3.2,
    tenure_in_position_years: 3.2,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: true,
      grade_tenure_3y: true,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0003",
    name: "Ahmad Rizki",
    nik: "NIK-0003",
    current_position: "Sr. HR Specialist",
    current_grade: 13,
    personal_grade: 13,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    supervisor_id: "EMP-0002",
    cluster: "SOLID_CONTRIBUTOR",
    eqs_score: 78.45,
    performance_rating: "ON_TARGET",
    job_fit_score: 75,
    tenure_in_grade_years: 1.5,
    tenure_in_position_years: 1.5,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0004",
    name: "Dewi Lestari",
    nik: "NIK-0004",
    current_position: "HR Analyst",
    current_grade: 12,
    personal_grade: 12,
    company_id: "CO-API",
    org_unit_id: "OU-API-HC",
    supervisor_id: "EMP-0002",
    cluster: "PROMOTABLE",
    eqs_score: 82.15,
    performance_rating: "ABOVE_TARGET",
    job_fit_score: 80,
    tenure_in_grade_years: 2.0,
    tenure_in_position_years: 2.0,
    contract_expiry_date: "2026-06-30",
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: true,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0005",
    name: "Eko Prasetyo",
    nik: "NIK-0005",
    current_position: "Finance Manager",
    current_grade: 15,
    personal_grade: 15,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-FIN",
    supervisor_id: "EMP-0015",
    cluster: "HIGH_POTENTIAL",
    eqs_score: 89.75,
    performance_rating: "OUTSTANDING",
    job_fit_score: 92,
    tenure_in_grade_years: 2.3,
    tenure_in_position_years: 2.3,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0006",
    name: "Fitri Handayani",
    nik: "NIK-0006",
    current_position: "Senior Accountant",
    current_grade: 13,
    personal_grade: 14,
    company_id: "CO-API",
    org_unit_id: "OU-INJ-FIN",
    supervisor_id: "EMP-0015",
    cluster: "SOLID_CONTRIBUTOR",
    eqs_score: 76.80,
    performance_rating: "ON_TARGET",
    job_fit_score: 78,
    tenure_in_grade_years: 4.1,
    tenure_in_position_years: 4.1,
    is_eligible: false,
    ineligibility_reasons: ["GRADE_OUT_OF_RANGE"],
    review_flags: {
      position_tenure_3y: true,
      grade_tenure_3y: true,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0007",
    name: "Taufik Hidayat",
    nik: "NIK-0007",
    current_position: "VP Human Capital",
    current_grade: 18,
    personal_grade: 18,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    supervisor_id: "EMP-CEO-001",
    cluster: "HIGH_POTENTIAL",
    eqs_score: 93.45,
    performance_rating: "OUTSTANDING",
    job_fit_score: 95,
    tenure_in_grade_years: 1.8,
    tenure_in_position_years: 1.8,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0011",
    name: "Rina Susanti",
    nik: "NIK-0011",
    current_position: "Senior HR Specialist",
    current_grade: 14,
    personal_grade: 14,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    supervisor_id: "EMP-0001",
    cluster: "PROMOTABLE",
    eqs_score: 81.3,
    performance_rating: "ABOVE_TARGET",
    job_fit_score: 80,
    tenure_in_grade_years: 1.2,
    tenure_in_position_years: 1.2,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0012",
    name: "Agus Prasetyo",
    nik: "NIK-0012",
    current_position: "Manager Talent Development",
    current_grade: 16,
    personal_grade: 16,
    company_id: "CO-API",
    org_unit_id: "OU-API-HC",
    supervisor_id: "EMP-0007",
    cluster: "PROMOTABLE",
    eqs_score: 84.5,
    performance_rating: "ABOVE_TARGET",
    job_fit_score: 82,
    tenure_in_grade_years: 2.6,
    tenure_in_position_years: 2.6,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  },
  {
    employee_id: "EMP-0013",
    name: "Maya Sari",
    nik: "NIK-0013",
    current_position: "Manager Compensation & Benefits",
    current_grade: 17,
    personal_grade: 17,
    company_id: "CO-INJ",
    org_unit_id: "OU-INJ-HC",
    supervisor_id: "EMP-0007",
    cluster: "HIGH_POTENTIAL",
    eqs_score: 87.8,
    performance_rating: "OUTSTANDING",
    job_fit_score: 88,
    tenure_in_grade_years: 1.9,
    tenure_in_position_years: 1.9,
    is_eligible: true,
    review_flags: {
      position_tenure_3y: false,
      grade_tenure_3y: false,
      contract_expiry_soon: false,
      external_assignment_3y: false
    }
  }
];

// ============================================================================
// SUPERVISOR PROPOSALS DATA
// ============================================================================

export const supervisorProposals: SupervisorProposal[] = [
  {
    proposal_id: "PROP-2025-001",
    employee_id: "EMP-0001",
    supervisor_id: "EMP-0007",
    proposal_type: "PROMOTION_GRADE_JABATAN",
    target_position_id: "POS-HC-DIR-001",
    target_grade: 21,
    justification: "Budi telah menunjukkan kinerja outstanding selama 3 tahun berturut-turut. Kemampuan leadership dan strategic thinking sudah terbukti dalam proyek transformasi HR digital. Siap untuk mengambil peran Director SDM.",
    submitted_at: "2025-12-15T10:30:00+07:00",
    status: "PENDING_HC"
  },
  {
    proposal_id: "PROP-2025-002",
    employee_id: "EMP-0002",
    supervisor_id: "EMP-0007",
    proposal_type: "PROMOTION_GRADE_JABATAN",
    target_position_id: "POS-HC-VP-001",
    target_grade: 18,
    justification: "Siti memiliki track record yang solid di payroll dan compensation. Sudah lebih dari 3 tahun di grade saat ini dengan performance rating di atas target. Kompetensi leadership dan strategic planning sudah matang.",
    submitted_at: "2025-12-15T11:00:00+07:00",
    status: "PENDING_HC"
  },
  {
    proposal_id: "PROP-2025-003",
    employee_id: "EMP-0003",
    supervisor_id: "EMP-0002",
    proposal_type: "DEVELOPMENT_PROGRAM",
    justification: "Ahmad memiliki potensi untuk berkembang lebih lanjut. Perlu mengikuti program leadership development dan strategic HR untuk meningkatkan kompetensi di level selanjutnya.",
    submitted_at: "2025-12-16T09:15:00+07:00",
    status: "PENDING_HC"
  },
  {
    proposal_id: "PROP-2025-004",
    employee_id: "EMP-0004",
    supervisor_id: "EMP-0002",
    proposal_type: "PROMOTION_PERSONAL_GRADE",
    target_grade: 13,
    justification: "Dewi menunjukkan kinerja above target dan kompetensi yang melebihi grade saat ini. Contract akan habis Juni 2026, promosi ke PG 13 dan konversi ke permanent akan mempertahankan talent yang baik ini.",
    submitted_at: "2025-12-16T10:00:00+07:00",
    status: "PENDING_HC"
  },
  {
    proposal_id: "PROP-2025-005",
    employee_id: "EMP-0005",
    supervisor_id: "EMP-0015",
    proposal_type: "PROMOTION_GRADE_JABATAN",
    target_position_id: "POS-FIN-VP-001",
    target_grade: 18,
    justification: "Eko adalah high potential dengan performance outstanding. Memiliki pemahaman mendalam tentang financial planning & analysis. Siap untuk posisi VP Finance.",
    submitted_at: "2025-12-17T14:20:00+07:00",
    status: "PENDING_HC"
  },
  {
    proposal_id: "PROP-2025-006",
    employee_id: "EMP-0011",
    supervisor_id: "EMP-0001",
    proposal_type: "SALARY_INCREASE",
    salary_increase_percentage: 8,
    justification: "Rina telah berkontribusi signifikan dalam improvement HR operations. Performance konsisten above target. Salary increase 8% sebagai recognition dan retention strategy.",
    submitted_at: "2025-12-18T08:45:00+07:00",
    status: "DRAFT"
  },
  {
    proposal_id: "PROP-2025-007",
    employee_id: "EMP-0013",
    supervisor_id: "EMP-0007",
    proposal_type: "ENRICHMENT",
    justification: "Maya perlu exposure ke strategic HR planning melalui tour of duty di project portfolio management selama 6 bulan untuk memperluas perspektif sebelum promosi ke VP level.",
    submitted_at: "2025-12-18T09:30:00+07:00",
    status: "PENDING_HC"
  }
];

// ============================================================================
// HC RECOMMENDATIONS DATA
// ============================================================================

export const hcRecommendations: HCRecommendation[] = [
  {
    recommendation_id: "REC-HC-2025-001",
    employee_id: "EMP-0001",
    supervisor_proposal_id: "PROP-2025-001",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    recommended_position_id: "POS-HC-DIR-001",
    recommended_grade: 21,
    hc_rationale: "Mendukung proposal supervisor. Budi memiliki EQS tertinggi (88.27) untuk posisi Director SDM. Track record excellent, tidak ada disciplinary issue. Posisi Director SDM saat ini vacant, urgent need. Recommend untuk dibahas di TC Q4 2025.",
    submitted_at: "2025-12-19T10:00:00+07:00",
    status: "PENDING_TC"
  },
  {
    recommendation_id: "REC-HC-2025-002",
    employee_id: "EMP-0002",
    supervisor_proposal_id: "PROP-2025-002",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    recommended_position_id: "POS-HC-VP-001",
    recommended_grade: 18,
    hc_rationale: "Siti memiliki EQS 91.10 dengan cluster High Potential. Sudah 3+ tahun di grade 14, siap untuk next level. Namun perlu dipertimbangkan bahwa posisi VP HC saat ini filled oleh Taufik Hidayat. Recommend untuk succession planning sebagai Primary Successor.",
    submitted_at: "2025-12-19T10:30:00+07:00",
    status: "PENDING_TC"
  },
  {
    recommendation_id: "REC-HC-2025-003",
    employee_id: "EMP-0003",
    supervisor_proposal_id: "PROP-2025-003",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    hc_rationale: "Setuju dengan development program. Ahmad masuk cluster Solid Contributor dengan EQS 78.45. Recommend program: Strategic HR Leadership (3 bulan), Project Management Certification, dan mentoring dari senior leader. Target promosi ke Supervisor level dalam 18-24 bulan.",
    submitted_at: "2025-12-19T11:00:00+07:00",
    status: "PENDING_TC"
  },
  {
    recommendation_id: "REC-HC-2025-004",
    employee_id: "EMP-0004",
    supervisor_proposal_id: "PROP-2025-004",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    recommended_grade: 13,
    recommended_salary_increase: 10,
    hc_rationale: "Mendukung promosi PG dan konversi contract. Dewi adalah Promotable talent dengan performance above target. Contract expiry Juni 2026 - retention risk tinggi. Recommend: PG 13 + salary increase 10% + konversi ke PERMANENT. Investment worth untuk retain talent.",
    submitted_at: "2025-12-19T11:30:00+07:00",
    status: "PENDING_TC"
  },
  {
    recommendation_id: "REC-HC-2025-005",
    employee_id: "EMP-0005",
    supervisor_proposal_id: "PROP-2025-005",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    recommended_position_id: "POS-FIN-VP-001",
    recommended_grade: 18,
    hc_rationale: "Strong endorsement. Eko adalah High Potential dengan EQS 89.75. Outstanding performance, excellent financial acumen. Posisi VP Finance perlu diisi untuk strengthen financial governance. Recommend immediate promotion.",
    submitted_at: "2025-12-19T14:00:00+07:00",
    status: "PENDING_TC"
  },
  {
    recommendation_id: "REC-HC-2025-006",
    employee_id: "EMP-0013",
    supervisor_proposal_id: "PROP-2025-007",
    hc_admin_id: "EMP-HC-ADMIN-001",
    zonasi: "INTERNAL",
    hc_rationale: "Mendukung enrichment program. Maya adalah High Potential (EQS 87.8) dengan trajectory ke VP level. Tour of duty 6 bulan di Strategic Planning akan melengkapi competency gap. Recommend untuk diikuti dengan succession planning discussion.",
    submitted_at: "2025-12-19T15:00:00+07:00",
    status: "PENDING_TC"
  }
];

// ============================================================================
// TC SESSIONS DATA
// ============================================================================

export const tcSessions: TCSession[] = [
  {
    session_id: "TC-2025-Q4-001",
    session_date: "2025-12-28T09:00:00+07:00",
    session_quarter: "Q4",
    session_year: 2025,
    tc_tier: "TC_TIER_2",
    chairman_id: "EMP-DIR-HC-001",
    members: ["EMP-DIR-FIN-001", "EMP-GH-HCBP-001", "EMP-DIR-OPS-001"],
    secretary_id: "EMP-HC-ADMIN-001",
    status: "SCHEDULED",
    agenda_items: ["EMP-0001", "EMP-0002", "EMP-0003", "EMP-0004", "EMP-0005", "EMP-0013"]
  },
  {
    session_id: "TC-2025-Q3-001",
    session_date: "2025-10-15T09:00:00+07:00",
    session_quarter: "Q3",
    session_year: 2025,
    tc_tier: "TC_TIER_2",
    chairman_id: "EMP-DIR-HC-001",
    members: ["EMP-DIR-FIN-001", "EMP-GH-HCBP-001", "EMP-DIR-OPS-001"],
    secretary_id: "EMP-HC-ADMIN-001",
    status: "COMPLETED",
    agenda_items: ["EMP-0007", "EMP-0012"],
    berita_acara_id: "BA-2025-Q3-001"
  }
];

// ============================================================================
// TC DECISIONS DATA
// ============================================================================

export const tcDecisions: TCDecision[] = [
  {
    decision_id: "DEC-TC-2025-001",
    employee_id: "EMP-0007",
    hc_recommendation_id: "REC-HC-2025-007",
    tc_session_id: "TC-2025-Q3-001",
    decision_outcome: "APPROVED",
    approved_position_id: "POS-HC-DIR-001",
    approved_grade: 21,
    tc_rationale: "Taufik Hidayat telah menunjukkan kepemimpinan yang excellent di VP HC level. Performance outstanding, EQS tertinggi (93.45). Posisi Director SDM vacant dan critical. TC menyetujui promosi effective Q1 2026.",
    decided_by: "EMP-DIR-HC-001",
    decided_at: "2025-10-15T11:30:00+07:00"
  },
  {
    decision_id: "DEC-TC-2025-002",
    employee_id: "EMP-0012",
    hc_recommendation_id: "REC-HC-2025-008",
    tc_session_id: "TC-2025-Q3-001",
    decision_outcome: "APPROVED_WITH_MODIFICATION",
    approved_grade: 17,
    approved_salary_increase: 12,
    tc_rationale: "Agus Prasetyo memiliki potensi baik namun TC memutuskan untuk memberikan promosi PG dulu ke grade 17 dengan salary increase 12%. Akan di-review lagi untuk promosi jabatan di Q2 2026 setelah menunjukkan performance di grade baru.",
    decided_by: "EMP-DIR-HC-001",
    decided_at: "2025-10-15T12:00:00+07:00"
  }
];

// ============================================================================
// BERITA ACARA DATA
// ============================================================================

export const beritaAcaraRecords: BeritaAcara[] = [
  {
    ba_id: "BA-2025-Q3-001",
    tc_session_id: "TC-2025-Q3-001",
    ba_number: "BA/TC/INJ/2025/10/001",
    generated_at: "2025-10-15T14:00:00+07:00",
    approved_at: "2025-10-16T10:00:00+07:00",
    document_url: "/documents/berita-acara/BA-2025-Q3-001.pdf",
    signatories: [
      {
        role: "Ketua Talent Committee",
        employee_id: "EMP-DIR-HC-001",
        signed_at: "2025-10-16T09:30:00+07:00"
      },
      {
        role: "Anggota - Director Finance",
        employee_id: "EMP-DIR-FIN-001",
        signed_at: "2025-10-16T09:45:00+07:00"
      },
      {
        role: "Sekretaris",
        employee_id: "EMP-HC-ADMIN-001",
        signed_at: "2025-10-16T10:00:00+07:00"
      }
    ]
  }
];

// ============================================================================
// PERIODIC REVIEW CATEGORIES
// ============================================================================

export const periodicReviewCategories: PeriodicReviewCategory[] = [
  {
    category: "POSITION_TENURE_3Y",
    employee_ids: ["EMP-0002", "EMP-0006"],
    count: 2
  },
  {
    category: "GRADE_TENURE_3Y",
    employee_ids: ["EMP-0001", "EMP-0002", "EMP-0006"],
    count: 3
  },
  {
    category: "CONTRACT_EXPIRY",
    employee_ids: ["EMP-0004"],
    count: 1
  },
  {
    category: "EXTERNAL_ASSIGNMENT_3Y",
    employee_ids: [],
    count: 0
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getEligibleEmployees = (filters?: {
  company_id?: string;
  org_unit_id?: string;
  cluster?: string;
  min_eqs_score?: number;
}): EligibleEmployee[] => {
  let filtered = eligibleEmployees.filter(emp => emp.is_eligible);
  
  if (filters?.company_id) {
    filtered = filtered.filter(emp => emp.company_id === filters.company_id);
  }
  
  if (filters?.org_unit_id) {
    filtered = filtered.filter(emp => emp.org_unit_id === filters.org_unit_id);
  }
  
  if (filters?.cluster) {
    filtered = filtered.filter(emp => emp.cluster === filters.cluster);
  }
  
  if (filters?.min_eqs_score) {
    filtered = filtered.filter(emp => emp.eqs_score >= filters.min_eqs_score);
  }
  
  return filtered;
};

export const getProposalsByEmployee = (employeeId: string): SupervisorProposal[] => {
  return supervisorProposals.filter(prop => prop.employee_id === employeeId);
};

export const getRecommendationsByEmployee = (employeeId: string): HCRecommendation[] => {
  return hcRecommendations.filter(rec => rec.employee_id === employeeId);
};

export const getTCDecisionsByEmployee = (employeeId: string): TCDecision[] => {
  return tcDecisions.filter(dec => dec.employee_id === employeeId);
};

export const getPeriodicReviewByCategory = (category: PeriodicReviewCategory['category']): PeriodicReviewCategory | undefined => {
  return periodicReviewCategories.find(cat => cat.category === category);
};

export const getPendingProposalsForHC = (): SupervisorProposal[] => {
  return supervisorProposals.filter(prop => prop.status === "PENDING_HC");
};

export const getPendingRecommendationsForTC = (): HCRecommendation[] => {
  return hcRecommendations.filter(rec => rec.status === "PENDING_TC");
};

export const getUpcomingTCSessions = (): TCSession[] => {
  return tcSessions.filter(session => 
    session.status === "SCHEDULED" || session.status === "IN_PROGRESS"
  );
};
