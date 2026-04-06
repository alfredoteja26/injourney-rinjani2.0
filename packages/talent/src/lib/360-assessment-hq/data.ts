import { format } from "date-fns";

export interface AssessmentCycle {
  id: string;
  tenant_id: string;
  name: string;
  description: string | null;
  assessment_type: "behavioral" | "competency" | "custom";
  instrument_id: string;
  start_date: string;
  end_date: string;
  result_valid_until: string | null;
  assessor_assignment_method: "auto" | "manual";
  anonymity_policy: "anonymous" | "identified";
  channel_config: {
    channel: "superior" | "peer" | "subordinate" | "self";
    evaluator_count: number;
    weight: number;
    enabled: boolean;
  }[];
  status: "draft" | "configuring" | "assigning" | "active" | "scoring" | "validated" | "published" | "closed" | "archived";
  total_assessee: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AssessmentInstrument {
  id: string;
  name: string;
  description: string | null;
  assessment_type: "behavioral" | "competency" | "custom";
  total_questions: number;
  scale_points: number;
  scale_min_label: string;
  scale_max_label: string;
  equalize_question_weights: boolean;
  is_template: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface InstrumentQuestion {
  id: string;
  instrument_id: string;
  competency_name: string;
  behavior_indicator: string;
  question_text: string;
  weight: number;
  question_order: number;
}

export interface AssessorAssignment {
  id: string;
  cycle_id: string;
  assessee_id: string;
  assessee_name: string;
  assessee_position: string;
  assessee_org: string;
  assessor_id: string;
  assessor_name: string;
  channel: "superior" | "peer" | "subordinate" | "self";
  status: "pending" | "notified" | "in_progress" | "completed" | "skipped";
  is_override: boolean;
  override_reason: string | null;
}

export interface AssessmentResult {
  cycle_id: string;
  assessee_id: string;
  assessee_name: string;
  assessee_position: string;
  assessee_org: string;
  overall_score: number;
  overall_max_score: number;
  status: "pending" | "published";
  self_score_deviation: number;
  anomaly_flag: boolean;
  results?: any[];
  score_distribution?: any;
  competency_averages?: any[];
}

export interface Employee {
  id: string;
  nik: string;
  name: string;
  role?: string;
  position?: string;
  organization_name: string;
}

// Mock Data
export const assessmentCycles: AssessmentCycle[] = [
  {
    id: "CYC-001",
    tenant_id: "TENANT-INJ",
    name: "Penilaian Kinerja Berbasis Perilaku AKHLAK 2025",
    description: "Penilaian 360 derajat berbasis nilai-nilai AKHLAK untuk seluruh karyawan InJourney Group Holding periode 2025",
    assessment_type: "behavioral",
    instrument_id: "INS-001",
    start_date: "2025-11-01",
    end_date: "2025-12-15",
    result_valid_until: "2026-12-31",
    assessor_assignment_method: "auto",
    anonymity_policy: "anonymous",
    channel_config: [
      { channel: "superior", evaluator_count: 1, weight: 40, enabled: true },
      { channel: "peer", evaluator_count: 3, weight: 30, enabled: true },
      { channel: "subordinate", evaluator_count: -1, weight: 20, enabled: true },
      { channel: "self", evaluator_count: 1, weight: 10, enabled: true }
    ],
    status: "published",
    total_assessee: 245,
    created_by: "ADM-001",
    created_at: "2025-10-15T08:00:00Z",
    updated_at: "2026-01-10T14:30:00Z"
  },
  {
    id: "CYC-002",
    tenant_id: "TENANT-INJ",
    name: "Penilaian Kompetensi Manajerial Q1 2026",
    description: "Penilaian 360 derajat kompetensi manajerial untuk level Manager ke atas di InJourney Group",
    assessment_type: "competency",
    instrument_id: "INS-002",
    start_date: "2026-02-01",
    end_date: "2026-03-15",
    result_valid_until: null,
    assessor_assignment_method: "auto",
    anonymity_policy: "anonymous",
    channel_config: [
      { channel: "superior", evaluator_count: 1, weight: 35, enabled: true },
      { channel: "peer", evaluator_count: 3, weight: 35, enabled: true },
      { channel: "subordinate", evaluator_count: -1, weight: 20, enabled: true },
      { channel: "self", evaluator_count: 1, weight: 10, enabled: true }
    ],
    status: "active",
    total_assessee: 48,
    created_by: "ADM-001",
    created_at: "2026-01-20T09:00:00Z",
    updated_at: "2026-02-01T07:00:00Z"
  },
  {
    id: "CYC-004",
    tenant_id: "TENANT-INJ",
    name: "Penilaian Perilaku AKHLAK Pilot Batch",
    description: null,
    assessment_type: "behavioral",
    instrument_id: "INS-001",
    start_date: "2026-03-01",
    end_date: "2026-04-30",
    result_valid_until: null,
    assessor_assignment_method: "manual",
    anonymity_policy: "identified",
    channel_config: [
      { channel: "superior", evaluator_count: 1, weight: 50, enabled: true },
      { channel: "peer", evaluator_count: 2, weight: 30, enabled: true },
      { channel: "self", evaluator_count: 1, weight: 20, enabled: true }
    ],
    status: "draft",
    total_assessee: 12,
    created_by: "ADM-001",
    created_at: "2026-02-05T10:00:00Z",
    updated_at: "2026-02-05T10:00:00Z"
  },
  {
    id: "CYC-005",
    tenant_id: "TENANT-INJ",
    name: "Penilaian Leadership Competency 2025",
    description: "Assessment 360 untuk kompetensi kepemimpinan level VP ke atas di InJourney Group",
    assessment_type: "competency",
    instrument_id: "INS-003",
    start_date: "2025-08-01",
    end_date: "2025-09-30",
    result_valid_until: "2026-09-30",
    assessor_assignment_method: "auto",
    anonymity_policy: "anonymous",
    channel_config: [
      { channel: "superior", evaluator_count: 1, weight: 40, enabled: true },
      { channel: "peer", evaluator_count: 3, weight: 30, enabled: true },
      { channel: "subordinate", evaluator_count: -1, weight: 20, enabled: true },
      { channel: "self", evaluator_count: 1, weight: 10, enabled: true }
    ],
    status: "archived",
    total_assessee: 15,
    created_by: "ADM-002",
    created_at: "2025-07-10T08:00:00Z",
    updated_at: "2025-12-01T10:00:00Z"
  }
];

export const assessmentInstruments: AssessmentInstrument[] = [
  {
    id: "INS-001",
    name: "AKHLAK Behavioral Assessment v2",
    description: "Instrumen penilaian perilaku berbasis 6 nilai AKHLAK",
    assessment_type: "behavioral",
    total_questions: 7,
    scale_points: 6,
    scale_min_label: "Sangat Tidak Setuju",
    scale_max_label: "Sangat Setuju",
    equalize_question_weights: false,
    is_template: true,
    created_by: "ADM-001",
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2025-10-01T10:00:00Z"
  },
  {
    id: "INS-002",
    name: "Managerial Competency Assessment",
    description: "Instrumen penilaian kompetensi manajerial: Strategic Thinking, People Management, Decision Making, Communication",
    assessment_type: "competency",
    total_questions: 8,
    scale_points: 6,
    scale_min_label: "Tidak Setuju",
    scale_max_label: "Setuju",
    equalize_question_weights: true,
    is_template: true,
    created_by: "ADM-001",
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-01-15T14:00:00Z"
  },
  {
    id: "INS-003",
    name: "Leadership Competency Assessment v1",
    description: "Instrumen khusus untuk VP dan di atasnya: Visionary Leadership, Change Management, Strategic Communication, Stakeholder Management, Innovation",
    assessment_type: "competency",
    total_questions: 10,
    scale_points: 5,
    scale_min_label: "Tidak Pernah",
    scale_max_label: "Selalu",
    equalize_question_weights: true,
    is_template: true,
    created_by: "ADM-002",
    created_at: "2025-06-15T08:00:00Z",
    updated_at: "2025-07-01T10:00:00Z"
  },
  {
    id: "INS-004",
    name: "Custom Service Excellence Assessment",
    description: null,
    assessment_type: "custom",
    total_questions: 5,
    scale_points: 4,
    scale_min_label: "Tidak Setuju",
    scale_max_label: "Sangat Setuju",
    equalize_question_weights: true,
    is_template: false,
    created_by: "ADM-001",
    created_at: "2026-02-01T09:00:00Z",
    updated_at: "2026-02-01T09:00:00Z"
  }
];

export const instrumentQuestions: InstrumentQuestion[] = [
    {
      id: "QST-001",
      instrument_id: "INS-001",
      competency_name: "Amanah",
      behavior_indicator: "Memenuhi janji dan komitmen",
      question_text: "Yang bersangkutan selalu memenuhi janji dan komitmen yang telah disepakati dalam pekerjaan",
      weight: 15,
      question_order: 1
    },
    {
      id: "QST-002",
      instrument_id: "INS-001",
      competency_name: "Kompeten",
      behavior_indicator: "Terus belajar dan mengembangkan kapabilitas",
      question_text: "Yang bersangkutan secara aktif meningkatkan kompetensi diri melalui pelatihan dan pembelajaran mandiri",
      weight: 15,
      question_order: 2
    },
    // ... add more questions as needed for mock
];

export const assessorAssignments: AssessorAssignment[] = [
  {
    id: "ASG-020",
    cycle_id: "CYC-002",
    assessee_id: "EMP-20145",
    assessee_name: "Siti Nurhaliza",
    assessee_position: "Manager Talent Management",
    assessee_org: "Direktorat Human Capital & Legal",
    assessor_id: "EMP-10032",
    assessor_name: "Bambang Hartono",
    channel: "superior",
    status: "notified",
    is_override: false,
    override_reason: null
  },
  {
    id: "ASG-021",
    cycle_id: "CYC-002",
    assessee_id: "EMP-20145",
    assessee_name: "Siti Nurhaliza",
    assessee_position: "Manager Talent Management",
    assessee_org: "Direktorat Human Capital & Legal",
    assessor_id: "EMP-20189",
    assessor_name: "Dewi Ratnasari",
    channel: "peer",
    status: "in_progress",
    is_override: false,
    override_reason: null
  },
  {
    id: "ASG-022",
    cycle_id: "CYC-002",
    assessee_id: "EMP-20145",
    assessee_name: "Siti Nurhaliza",
    assessee_position: "Manager Talent Management",
    assessee_org: "Direktorat Human Capital & Legal",
    assessor_id: "EMP-20178",
    assessor_name: "Rina Wijaya",
    channel: "peer",
    status: "completed",
    is_override: true,
    override_reason: "Pengganti EMP-20156 yang sedang tugas luar negeri"
  },
  {
    id: "ASG-023",
    cycle_id: "CYC-002",
    assessee_id: "EMP-20300",
    assessee_name: "Hendra Wijaya",
    assessee_position: "Manager IT & Digital",
    assessee_org: "Direktorat Operasional & Transformasi Digital",
    assessor_id: "EMP-10050",
    assessor_name: "Diana Permata",
    channel: "superior",
    status: "skipped",
    is_override: true,
    override_reason: "Atasan baru saja mutasi ke anak perusahaan, belum cukup mengenal kinerja bawahan"
  }
];

export const assessmentResults: AssessmentResult[] = [
    {
      cycle_id: "CYC-001",
      assessee_id: "EMP-20145",
      assessee_name: "Siti Nurhaliza",
      assessee_position: "Manager Talent Management",
      assessee_org: "Direktorat Human Capital & Legal",
      overall_score: 5.18,
      overall_max_score: 6.00,
      status: "published",
      self_score_deviation: 0.18,
      anomaly_flag: false,
      score_distribution: {
          min: 3.22,
          max: 5.78,
          mean: 4.89,
          median: 5.01,
          std_dev: 0.52
      },
      competency_averages: [
        { competency_name: "Amanah", avg_score: 5.12 },
        { competency_name: "Kompeten", avg_score: 4.85 },
        { competency_name: "Harmonis", avg_score: 5.28 },
        { competency_name: "Loyal", avg_score: 5.05 },
        { competency_name: "Adaptif", avg_score: 4.52 },
        { competency_name: "Kolaboratif", avg_score: 5.10 }
      ]
    },
    {
      cycle_id: "CYC-001",
      assessee_id: "EMP-20189",
      assessee_name: "Dewi Ratnasari",
      assessee_position: "Manager Perencanaan Strategis",
      assessee_org: "Direktorat Strategi & Pengembangan Bisnis",
      overall_score: 4.95,
      overall_max_score: 6.00,
      status: "published",
      self_score_deviation: 0.82,
      anomaly_flag: true
    },
    {
      cycle_id: "CYC-001",
      assessee_id: "EMP-20201",
      assessee_name: "Agus Prasetyo",
      assessee_position: "Manager Akuntansi & Pelaporan",
      assessee_org: "Direktorat Keuangan & Manajemen Risiko",
      overall_score: 5.42,
      overall_max_score: 6.00,
      status: "published",
      self_score_deviation: 0.05,
      anomaly_flag: false
    },
    {
      cycle_id: "CYC-001",
      assessee_id: "EMP-10032",
      assessee_name: "Bambang Hartono",
      assessee_position: "VP Human Capital & Organisasi",
      assessee_org: "Direktorat Human Capital & Legal",
      overall_score: 5.61,
      overall_max_score: 6.00,
      status: "published",
      self_score_deviation: 0.12,
      anomaly_flag: false
    },
    {
      cycle_id: "CYC-001",
      assessee_id: "EMP-20300",
      assessee_name: "Hendra Wijaya",
      assessee_position: "Manager IT & Digital",
      assessee_org: "Direktorat Operasional & Transformasi Digital",
      overall_score: 3.85,
      overall_max_score: 6.00,
      status: "published",
      self_score_deviation: 1.45,
      anomaly_flag: true
    }
];

export const completionSummary = [
  {
    cycle_id: "CYC-002",
    total_assessees: 48,
    total_assignments: 312,
    completed_assignments: 89,
    overall_completion_rate: 0.285,
    channel_breakdown: [
      { channel: "superior", total: 48, completed: 12, rate: 0.25 },
      { channel: "peer", total: 144, completed: 38, rate: 0.264 },
      { channel: "subordinate", total: 72, completed: 15, rate: 0.208 },
      { channel: "self", total: 48, completed: 24, rate: 0.50 }
    ],
    organization_breakdown: [
      { org_name: "Direktorat Keuangan & Manajemen Risiko", assessees: 10, completion_rate: 0.32 },
      { org_name: "Direktorat Human Capital & Legal", assessees: 8, completion_rate: 0.45 },
      { org_name: "Direktorat Strategi & Pengembangan Bisnis", assessees: 12, completion_rate: 0.28 },
      { org_name: "Direktorat Operasional & Transformasi Digital", assessees: 12, completion_rate: 0.18 },
      { org_name: "Sekretariat Perusahaan", assessees: 6, completion_rate: 0.22 }
    ],
    incomplete_assessors: [
      { assessor_id: "EMP-10032", assessor_name: "Bambang Hartono", pending_count: 5, channel: "superior" },
      { assessor_id: "EMP-20201", assessor_name: "Agus Prasetyo", pending_count: 3, channel: "peer" },
      { assessor_id: "EMP-30045", assessor_name: "Maya Putri", pending_count: 2, channel: "subordinate" }
    ]
  }
];

export const employees: Employee[] = [
    { id: "ADM-001", nik: "ADM001", name: "Ratna Kusuma", role: "HC Admin", organization_name: "Direktorat Human Capital & Legal - InJourney Group" },
    { id: "ADM-002", nik: "ADM002", name: "Budi Setiawan", role: "Member Admin", organization_name: "Direktorat Human Capital & Legal - InJourney Group" },
    { id: "EMP-10032", nik: "10032", name: "Bambang Hartono", position: "VP Human Capital & Organisasi", organization_name: "Direktorat Human Capital & Legal" },
    { id: "EMP-10050", nik: "10050", name: "Diana Permata", position: "VP Transformasi Digital", organization_name: "Direktorat Operasional & Transformasi Digital" },
    { id: "EMP-10055", nik: "10055", name: "Rudi Santoso", position: "Acting VP Transformasi Digital", organization_name: "Direktorat Operasional & Transformasi Digital" },
    { id: "EMP-20145", nik: "20145", name: "Siti Nurhaliza", position: "Manager Talent Management", organization_name: "Direktorat Human Capital & Legal" },
    { id: "EMP-20189", nik: "20189", name: "Dewi Ratnasari", position: "Manager Perencanaan Strategis", organization_name: "Direktorat Strategi & Pengembangan Bisnis" },
    { id: "EMP-20201", nik: "20201", name: "Agus Prasetyo", position: "Manager Akuntansi & Pelaporan", organization_name: "Direktorat Keuangan & Manajemen Risiko" },
    { id: "EMP-20178", nik: "20178", name: "Rina Wijaya", position: "Manager Organisasi & Tata Kelola", organization_name: "Direktorat Human Capital & Legal" },
    { id: "EMP-20300", nik: "20300", name: "Hendra Wijaya", position: "Manager IT & Digital", organization_name: "Direktorat Operasional & Transformasi Digital" },
    { id: "EMP-30012", nik: "30012", name: "Fajar Nugroho", position: "Supervisor Talent Acquisition", organization_name: "Direktorat Human Capital & Legal" },
    { id: "EMP-30045", nik: "30045", name: "Maya Putri", position: "Supervisor Learning & Development", organization_name: "Direktorat Human Capital & Legal" }
];
