import { IDPCycle, IDPRecord, IDPActivity, Course, CompetencyGap, Employee } from '../types/idp';

export const mockIDPCycles: IDPCycle[] = [
  {
    id: "cycle-2026",
    name: "IDP 2026",
    period_type: "annual",
    start_date: "2026-01-15",
    submission_deadline: "2026-02-28",
    midyear_checkpoint: "2026-07-01",
    end_date: "2026-12-31",
    status: "active",
    min_development_hours: 40,
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-01-15T09:00:00Z"
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "emp-001",
    nik: "INJ202001234",
    name: "Budi Santoso",
    email: "budi.santoso@injourney.id",
    current_position_title: "Senior Analyst",
    organization_name: "PT Angkasa Pura I",
    job_family_name: "Finance & Accounting",
    grade_jabatan: 14,
    band_jabatan: "III-A",
    manager_id: "emp-mgr-001",
    manager_name: "Dewi Kartika"
  },
  {
    id: "emp-002",
    nik: "INJ202001235",
    name: "Siti Rahma",
    email: "siti.rahma@injourney.id",
    current_position_title: "HR Specialist",
    organization_name: "PT Angkasa Pura I",
    job_family_name: "Human Capital",
    grade_jabatan: 13,
    band_jabatan: "III-B",
    manager_id: "emp-mgr-001",
    manager_name: "Dewi Kartika"
  },
  {
    id: "emp-003",
    nik: "INJ202001236",
    name: "Rudi Hermawan",
    email: "rudi.hermawan@injourney.id",
    current_position_title: "IT Officer",
    organization_name: "PT Angkasa Pura I",
    job_family_name: "Information Technology",
    grade_jabatan: 12,
    band_jabatan: "III-C",
    manager_id: "emp-mgr-002",
    manager_name: "Ahmad Dahlan"
  },
  {
    id: "emp-004",
    nik: "INJ202001237",
    name: "Maya Putri",
    email: "maya.putri@injourney.id",
    current_position_title: "Marketing Associate",
    organization_name: "InJourney Holding",
    job_family_name: "Marketing & Sales",
    grade_jabatan: 13,
    band_jabatan: "III-B",
    manager_id: "emp-mgr-002",
    manager_name: "Ahmad Dahlan"
  }
];

export const mockCompetencyGaps: CompetencyGap[] = [
  {
    employee_id: "emp-001",
    competencies: [
      {
        competency_id: "comp-ldr",
        competency_name: "Leadership",
        current_level: 2,
        required_level: 3,
        gap: 1,
        gap_severity: "minor",
        cluster: "leadership"
      },
      {
        competency_id: "comp-fin",
        competency_name: "Financial Analysis",
        current_level: 3,
        required_level: 4,
        gap: 1,
        gap_severity: "minor",
        cluster: "technical"
      },
      {
        competency_id: "comp-dig",
        competency_name: "Digital Literacy",
        current_level: 2,
        required_level: 4,
        gap: 2,
        gap_severity: "significant",
        cluster: "technical"
      },
      {
        competency_id: "comp-com",
        competency_name: "Communication",
        current_level: 3,
        required_level: 3,
        gap: 0,
        gap_severity: "none",
        cluster: "soft_skills"
      },
      {
        competency_id: "comp-prj",
        competency_name: "Project Management",
        current_level: 2,
        required_level: 3,
        gap: 1,
        gap_severity: "minor",
        cluster: "technical"
      }
    ]
  }
];

export const mockCourses: Course[] = [
  {
    id: "crs-ldr-001",
    code: "LDR-001",
    title: "Effective Leadership Fundamentals",
    description: "Program pengembangan kepemimpinan dasar untuk membangun fondasi leadership yang kuat. Mencakup self-awareness, komunikasi efektif, dan motivasi tim.",
    duration_hours: 8,
    format: "video",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-ldr", competency_name: "Leadership", level_improvement: "1 to 2" }
    ],
    level_from: 1,
    level_to: 2,
    thumbnail_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Recommended for Gap"]
  },
  {
    id: "crs-ldr-002",
    code: "LDR-002",
    title: "Strategic Thinking for Managers",
    description: "Workshop intensif untuk mengembangkan kemampuan berpikir strategis dan pengambilan keputusan di level manajerial.",
    duration_hours: 16,
    format: "workshop",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-ldr", competency_name: "Leadership", level_improvement: "2 to 3" }
    ],
    level_from: 2,
    level_to: 3,
    thumbnail_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Recommended for Gap", "Popular in Your Role"]
  },
  {
    id: "crs-fin-002",
    code: "FIN-002",
    title: "Advanced Budgeting & Forecasting",
    description: "Program advanced untuk teknik budgeting, forecasting, dan financial modeling. Termasuk hands-on dengan Excel dan tools analisis keuangan.",
    duration_hours: 16,
    format: "blended",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-fin", competency_name: "Financial Analysis", level_improvement: "3 to 4" }
    ],
    level_from: 3,
    level_to: 4,
    thumbnail_url: "https://images.unsplash.com/photo-1554224155-984067941b71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Recommended for Gap", "Popular in Your Role"]
  },
  {
    id: "crs-dig-001",
    code: "DIG-001",
    title: "Digital Transformation Fundamentals",
    description: "Pengantar transformasi digital untuk karyawan. Mencakup mindset digital, tools produktivitas, dan tren teknologi.",
    duration_hours: 4,
    format: "video",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-dig", competency_name: "Digital Literacy", level_improvement: "1 to 2" }
    ],
    level_from: 1,
    level_to: 2,
    thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Mandatory"]
  },
  {
    id: "crs-dig-002",
    code: "DIG-002",
    title: "Data-Driven Decision Making",
    description: "Mengembangkan kemampuan analisis data untuk pengambilan keputusan. Termasuk dasar-dasar data visualization dan interpretasi.",
    duration_hours: 10,
    format: "blended",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-dig", competency_name: "Digital Literacy", level_improvement: "2 to 3" }
    ],
    level_from: 2,
    level_to: 3,
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Recommended for Gap"]
  },
  {
    id: "crs-prj-001",
    code: "PRJ-001",
    title: "Project Management Essentials",
    description: "Dasar-dasar manajemen proyek: planning, execution, monitoring, dan closing. Cocok untuk pemula.",
    duration_hours: 8,
    format: "video",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-prj", competency_name: "Project Management", level_improvement: "1 to 2" }
    ],
    level_from: 1,
    level_to: 2,
    thumbnail_url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: []
  },
  {
    id: "crs-prj-002",
    code: "PRJ-002",
    title: "Agile Project Management",
    description: "Workshop Agile dan Scrum methodology. Hands-on dengan sprint planning, daily standups, dan retrospectives.",
    duration_hours: 16,
    format: "workshop",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-prj", competency_name: "Project Management", level_improvement: "2 to 3" }
    ],
    level_from: 2,
    level_to: 3,
    thumbnail_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: ["Recommended for Gap"]
  },
  {
    id: "crs-svc-001",
    code: "SVC-001",
    title: "Service Excellence in Tourism",
    description: "Program pengembangan service excellence khusus industri pariwisata dan hospitality.",
    duration_hours: 6,
    format: "video",
    provider: "InJourney Academy",
    competencies: [
      { competency_id: "comp-svc", competency_name: "Customer Service", level_improvement: "1 to 2" }
    ],
    level_from: 1,
    level_to: 2,
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    is_active: true,
    recommendation_tags: []
  }
];

export const mockIDPRecords: IDPRecord[] = [
  {
    id: "idp-001",
    employee_id: "emp-001",
    cycle_id: "cycle-2026",
    status: "approved",
    total_hours: 48,
    completed_hours: 12,
    employee_notes: "Fokus tahun ini adalah meningkatkan digital literacy dan leadership untuk persiapan promosi ke level manajerial.",
    submitted_at: "2026-01-25T14:30:00Z",
    created_at: "2026-01-20T09:00:00Z",
    updated_at: "2026-01-28T10:15:00Z"
  },
  {
    id: "idp-002",
    employee_id: "emp-002",
    cycle_id: "cycle-2026",
    status: "pending_approval",
    total_hours: 42,
    completed_hours: 0,
    employee_notes: "Pengembangan kompetensi HR Analytics.",
    submitted_at: "2026-02-01T10:00:00Z",
    created_at: "2026-01-22T09:00:00Z",
    updated_at: "2026-02-01T10:00:00Z"
  },
  {
    id: "idp-003",
    employee_id: "emp-003",
    cycle_id: "cycle-2026",
    status: "draft",
    total_hours: 20,
    completed_hours: 0,
    employee_notes: "",
    created_at: "2026-01-25T09:00:00Z",
    updated_at: "2026-01-25T09:00:00Z"
  },
  {
    id: "idp-004",
    employee_id: "emp-004",
    cycle_id: "cycle-2026",
    status: "revision_requested",
    total_hours: 32,
    completed_hours: 0,
    employee_notes: "Menunggu revisi terkait budget training.",
    submitted_at: "2026-01-30T14:00:00Z",
    created_at: "2026-01-28T09:00:00Z",
    updated_at: "2026-02-02T11:00:00Z"
  }
];

export const mockIDPActivities: IDPActivity[] = [
  {
    id: "act-001",
    idp_record_id: "idp-001",
    course_id: "crs-ldr-002",
    activity_type: "lms_course",
    title: "Strategic Thinking for Managers",
    duration_hours: 16,
    target_date: "2026-03-31",
    priority: "high",
    status: "in_progress",
    completion_date: undefined,
    evidence_url: undefined,
    notes: "Sudah selesai 4 dari 8 modul"
  },
  {
    id: "act-002",
    idp_record_id: "idp-001",
    course_id: "crs-dig-001",
    activity_type: "lms_course",
    title: "Digital Transformation Fundamentals",
    duration_hours: 4,
    target_date: "2026-02-28",
    priority: "high",
    status: "completed",
    completion_date: "2026-02-15",
    evidence_url: undefined,
    notes: "Mandatory course - selesai lebih awal"
  },
  {
    id: "act-003",
    idp_record_id: "idp-001",
    course_id: "crs-dig-002",
    activity_type: "lms_course",
    title: "Data-Driven Decision Making",
    duration_hours: 10,
    target_date: "2026-06-30",
    priority: "medium",
    status: "not_started",
    completion_date: undefined,
    evidence_url: undefined,
    notes: undefined
  },
  {
    id: "act-004",
    idp_record_id: "idp-001",
    course_id: "crs-fin-002",
    activity_type: "lms_course",
    title: "Advanced Budgeting & Forecasting",
    duration_hours: 16,
    target_date: "2026-09-30",
    priority: "medium",
    status: "not_started",
    completion_date: undefined,
    evidence_url: undefined,
    notes: "Sesuai dengan job family Finance"
  },
  {
    id: "act-005",
    idp_record_id: "idp-001",
    course_id: undefined,
    activity_type: "custom_activity",
    title: "Mentoring Session dengan Senior Manager",
    duration_hours: 2,
    target_date: "2026-12-15",
    priority: "low",
    status: "in_progress",
    completion_date: undefined,
    evidence_url: "https://drive.google.com/mentoring-log",
    notes: "Sesi bulanan dengan Pak Ahmad, sudah 4 sesi selesai dari 12"
  }
];
