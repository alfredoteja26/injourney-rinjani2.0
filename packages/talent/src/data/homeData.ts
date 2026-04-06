export const homeData = {
  currentUser: {
    id: "EMP-10042",
    nik: "INJ-2019-10042",
    name: "Dimas Sayyid",
    email: "dimas@injourney.co.id",
    employee_type: "PERMANENT",
    disciplinary_status: "NONE",
    current_position_id: "POS-VP-HC-001",
    current_position_title: "Vice President Human Capital Business Partner",
    organization_id: "ORG-INJ-HC",
    organization_name: "Direktorat SDM & Digital",
    job_family_id: "JF-HC-001",
    job_family_name: "Human Capital",
    grade_jabatan: 22,
    band_jabatan: "IV",
    hire_date: "2019-03-15",
    position_effective_date: "2023-07-01",
    is_line_manager: true,
    direct_report_count: 8
  },

  eqsScores: {
    id: "EQS-10042-POS-VP-HC-001-2026",
    total_score: 82.45,
    eqs_band: "qualified",
    components: [
      {
        component_type: "performance",
        label: "Kinerja",
        weight: 20,
        raw_value: 88.0,
        weighted_value: 17.60
      },
      {
        component_type: "competency",
        label: "Kompetensi",
        weight: 20,
        raw_value: 78.5,
        weighted_value: 15.70
      },
      {
        component_type: "experience",
        label: "Pengalaman",
        weight: 20,
        raw_value: 85.0,
        weighted_value: 17.00
      },
      {
        component_type: "aspiration",
        label: "Aspirasi",
        weight: 10,
        raw_value: 75.0,
        weighted_value: 7.50
      },
      {
        component_type: "training",
        label: "Pelatihan",
        weight: 20,
        raw_value: 80.0,
        weighted_value: 16.00
      },
      {
        component_type: "tes",
        label: "TES",
        weight: 10,
        raw_value: 86.5,
        weighted_value: 8.65
      }
    ]
  },

  talentPoolCandidate: {
    talent_cluster: "9box_promotable",
    talent_cluster_label: "Promotable",
    period_name: "Talent Pool 2026",
    is_top_talent: false
  },

  careerAspirations: {
    total_active: 7,
    by_source: {
      individual: { count: 3 },
      supervisor: { count: 2 },
      job_holder: { count: 1 },
      unit: { count: 1 }
    },
    latest_individual: [
      { position_title: "Senior VP Human Capital", movement_type: "VERTICAL", target_grade: 24 },
      { position_title: "VP Talent Management - ILCS", movement_type: "HORIZONTAL", target_grade: 22 },
      { position_title: "VP Organization Development", movement_type: "HORIZONTAL", target_grade: 22 }
    ]
  },

  idpRecord: {
    status: "approved",
    status_label: "Disetujui",
    total_hours: 48,
    completed_hours: 18,
    cycle_name: "IDP 2026",
    min_development_hours: 40,
    activity_summary: {
      completed: 1,
      in_progress: 1,
      not_started: 2
    },
    upcoming_activity: {
      title: "Data-Driven HR Decision Making",
      target_date: "2026-03-15",
      priority: "medium",
      priority_label: "Sedang"
    }
  },

  applications: [
    {
      id: "APP-10042-001",
      position_title: "General Manager Strategic Planning",
      organization_name: "Direktorat Perencanaan Strategis",
      status: "shortlisted",
      status_label: "Shortlisted",
      movement_type: "PROMOSI",
      movement_label: "Promosi",
      submitted_at: "2026-02-01T10:10:00Z"
    },
    {
      id: "APP-10042-002",
      position_title: "VP People Analytics & Insights",
      organization_name: "Direktorat SDM & Digital",
      status: "submitted",
      status_label: "Submitted",
      movement_type: "ROTASI",
      movement_label: "Rotasi",
      submitted_at: "2026-02-05T09:15:00Z"
    }
  ],

  periodAlerts: [
    {
      id: "ALERT-001",
      module: "360_assessment",
      severity: "urgent",
      icon: "ClipboardCheck",
      title: "Anda memiliki 2 assessment yang harus diisi",
      description: "Penilaian AKHLAK 2026 — deadline 28 Februari 2026",
      action_url: "/talent/360-assessment/assigned",
      days_remaining: 19,
      is_dismissed: false
    },
    {
      id: "ALERT-002",
      module: "idp",
      severity: "warning",
      icon: "ClipboardList",
      title: "Deadline pengisian IDP 2026 dalam 19 hari",
      description: "IDP Anda sudah disetujui. Pastikan progress sesuai target.",
      action_url: "/talent/idp",
      days_remaining: 19,
      is_dismissed: false
    },
    {
      id: "ALERT-003",
      module: "job_tender",
      severity: "info",
      icon: "Briefcase",
      title: "Deadline pendaftaran GM Strategic Planning dalam 34 hari",
      description: "Status lamaran Anda: Shortlisted",
      action_url: "/talent/explore/POS-IJT-001",
      days_remaining: 34,
      is_dismissed: false
    },
    {
      id: "ALERT-004",
      module: "job_tender",
      severity: "warning",
      icon: "Briefcase",
      title: "Deadline pendaftaran VP People Analytics dalam 19 hari",
      description: "Status lamaran Anda: Submitted — menunggu screening",
      action_url: "/talent/explore/POS-IJT-002",
      days_remaining: 19,
      is_dismissed: false
    },
    {
      id: "ALERT-005",
      module: "career_aspiration",
      severity: "info",
      icon: "Target",
      title: "Periode aspirasi karir 2026 sedang dibuka",
      description: "Ajukan atau perbarui aspirasi karir Anda sebelum 31 Maret 2026",
      action_url: "/talent/career-aspiration",
      days_remaining: 50,
      is_dismissed: false
    }
  ],

  teamSummary: {
    total_subordinates: 8,
    avg_eqs_score: 74.8,
    action_items: {
      idp_approval_pending: 2,
      aspiration_review_pending: 1,
      assessment_pending: 3,
      total: 6
    },
    nine_box_distribution: {
      high_potential: 1,
      promotable: 2,
      solid_contributor: 3,
      sleeping_tiger: 1,
      unfit: 0,
      unclassified: 1
    },
    idp_status_summary: {
      draft: 1,
      pending_approval: 2,
      approved: 4,
      revision_requested: 0,
      completed: 0,
      no_idp: 1
    }
  },

  assessorAssignments: {
      pending_count: 2
  }
};
