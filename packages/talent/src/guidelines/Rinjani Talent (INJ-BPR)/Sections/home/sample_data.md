# Home - Sample Data

## JSON Data

```json
{
  "_meta": {
    "models": {
      "currentUser": "Authenticated employee context with current definitive position info",
      "eqsScores": "EQS Score calculated for employee against current definitive position",
      "eqsComponents": "Breakdown of 6 EQS components (Kinerja, Kompetensi, Pengalaman, Aspirasi, Pelatihan, TES)",
      "talentPoolCandidates": "Employee's 9-Box classification for active talent pool period",
      "talentPoolPeriods": "Talent pool period configuration",
      "careerAspirations": "Aggregated career aspiration summary from 4 sources",
      "idpRecords": "Employee's IDP record for active cycle",
      "idpActivities": "IDP activity items linked to IDP record",
      "idpCycles": "IDP cycle period configuration",
      "applications": "Employee's active job tender applications",
      "positions": "Position details for job tender applications",
      "tenderPeriods": "Active tender period",
      "assessorAssignments": "Pending 360 assessment assignments for the employee",
      "assessmentCycles": "Active 360 assessment cycles",
      "periodAlerts": "Derived alerts from active periods and deadlines across modules",
      "teamSummary": "Aggregated team data for Line Manager view",
      "subordinates": "Direct reports list for Line Manager"
    },
    "relationships": [
      "eqsScores.employee_id references currentUser.id",
      "eqsScores.target_position_id references currentUser.current_position_id (definitive)",
      "eqsScores.config_id references EQSConfig (external)",
      "eqsComponents.eqs_score_id references eqsScores.id",
      "talentPoolCandidates.employee_id references currentUser.id",
      "talentPoolCandidates.period_id references talentPoolPeriods.id",
      "idpRecords.employee_id references currentUser.id",
      "idpRecords.cycle_id references idpCycles.id",
      "idpActivities.idp_record_id references idpRecords.id",
      "applications.employee_id references currentUser.id",
      "applications.position_id references positions.id",
      "positions.period_id references tenderPeriods.id",
      "assessorAssignments.assessor_id references currentUser.id",
      "assessorAssignments.cycle_id references assessmentCycles.id",
      "subordinates[].id references Employee (external, for team summary)"
    ],
    "source": "Schemas defined in Rinjani Talent - Data Model"
  },

  "currentUser": {
    "id": "EMP-10042",
    "nik": "INJ-2019-10042",
    "name": "Ratna Kusumawati",
    "email": "ratna.kusumawati@injourney.id",
    "employee_type": "PERMANENT",
    "disciplinary_status": "NONE",
    "current_position_id": "POS-VP-HC-001",
    "current_position_title": "Vice President Human Capital Business Partner",
    "organization_id": "ORG-INJ-HC",
    "organization_name": "Direktorat SDM & Digital",
    "job_family_id": "JF-HC-001",
    "job_family_name": "Human Capital",
    "grade_jabatan": 22,
    "band_jabatan": "IV",
    "hire_date": "2019-03-15",
    "position_effective_date": "2023-07-01",
    "is_line_manager": true,
    "direct_report_count": 8
  },

  "eqsScores": [
    {
      "id": "EQS-10042-POS-VP-HC-001-2026",
      "employee_id": "EMP-10042",
      "target_position_id": "POS-VP-HC-001",
      "period_id": "TP-2026",
      "config_id": "EQSCFG-INJ-BAND-IV",
      "total_score": 82.45,
      "eqs_band": "qualified",
      "is_eligible": true,
      "eligibility_reason": null,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z",
      "calculated_by": "SYSTEM"
    }
  ],

  "eqsComponents": [
    {
      "id": "EQSC-10042-001",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "performance",
      "weight": 20,
      "raw_value": 88.0,
      "weighted_value": 17.60,
      "source_data": {
        "year_weights": [
          { "year": 2025, "rating": 92, "weight": 50 },
          { "year": 2024, "rating": 85, "weight": 30 },
          { "year": 2023, "rating": 84, "weight": 20 }
        ]
      }
    },
    {
      "id": "EQSC-10042-002",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "competency",
      "weight": 20,
      "raw_value": 78.5,
      "weighted_value": 15.70,
      "source_data": {
        "job_fit_score": 78.5,
        "assessment_date": "2025-11-20",
        "target_job_family_id": "JF-HC-001"
      }
    },
    {
      "id": "EQSC-10042-003",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "experience",
      "weight": 20,
      "raw_value": 85.0,
      "weighted_value": 17.00,
      "source_data": {
        "tenure_years": 7,
        "unit_experience_bonus": 30,
        "target_job_family_experience_years": 5
      }
    },
    {
      "id": "EQSC-10042-004",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "aspiration",
      "weight": 10,
      "raw_value": 75.0,
      "weighted_value": 7.50,
      "source_data": {
        "aspiration_score": 75,
        "sources": [
          { "type": "supervisor", "score": 25 },
          { "type": "job_holder", "score": 20 },
          { "type": "unit", "score": 15 },
          { "type": "individual", "score": 15 }
        ],
        "target_position_match": true
      }
    },
    {
      "id": "EQSC-10042-005",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "training",
      "weight": 20,
      "raw_value": 80.0,
      "weighted_value": 16.00,
      "source_data": {
        "training_hours": 52,
        "certifications": [
          { "name": "CHRP - Certified Human Resource Professional", "relevance": "high" },
          { "name": "Change Management Practitioner", "relevance": "medium" }
        ],
        "target_job_family_relevance": 80
      }
    },
    {
      "id": "EQSC-10042-006",
      "eqs_score_id": "EQS-10042-POS-VP-HC-001-2026",
      "component_type": "tes",
      "weight": 10,
      "raw_value": 86.5,
      "weighted_value": 8.65,
      "source_data": {
        "baseline": 50,
        "additions": [
          { "reason": "Mentor program participation", "value": 15 },
          { "reason": "Cross-entity project lead", "value": 20 },
          { "reason": "Knowledge sharing session (3x)", "value": 6.5 }
        ],
        "deductions": [
          { "reason": "Late submission IDP 2024", "value": -5 }
        ]
      }
    }
  ],

  "talentPoolPeriods": [
    {
      "id": "TP-2026",
      "name": "Talent Pool 2026",
      "year": 2026,
      "start_date": "2026-01-01",
      "end_date": "2026-12-31",
      "status": "active",
      "created_at": "2025-12-15T08:00:00Z"
    }
  ],

  "talentPoolCandidates": [
    {
      "id": "TPC-10042-2026",
      "employee_id": "EMP-10042",
      "period_id": "TP-2026",
      "talent_cluster": "9box_promotable",
      "is_top_talent": false,
      "top_talent_designation_date": null,
      "risk_profile": "low_risk",
      "notes": null,
      "updated_at": "2026-01-20T10:00:00Z"
    }
  ],

  "careerAspirations": {
    "_comment": "Aggregated summary — detail entity lives in Career Aspiration module",
    "total_active": 7,
    "by_source": {
      "individual": { "count": 3, "latest_positions": [
        { "position_title": "Senior VP Human Capital", "movement_type": "VERTICAL", "target_grade": 24 },
        { "position_title": "VP Talent Management - ILCS", "movement_type": "HORIZONTAL", "target_grade": 22 },
        { "position_title": "VP Organization Development", "movement_type": "HORIZONTAL", "target_grade": 22 }
      ]},
      "supervisor": { "count": 2 },
      "job_holder": { "count": 1 },
      "unit": { "count": 1 }
    }
  },

  "idpCycles": [
    {
      "id": "IDPC-2026",
      "name": "IDP 2026",
      "period_type": "annual",
      "start_date": "2026-01-15",
      "submission_deadline": "2026-02-28",
      "midyear_checkpoint": "2026-07-15",
      "end_date": "2026-12-31",
      "status": "active",
      "min_development_hours": 40,
      "created_at": "2026-01-10T08:00:00Z",
      "updated_at": "2026-01-10T08:00:00Z"
    }
  ],

  "idpRecords": [
    {
      "id": "IDP-10042-2026",
      "employee_id": "EMP-10042",
      "cycle_id": "IDPC-2026",
      "status": "approved",
      "total_hours": 48,
      "completed_hours": 18,
      "employee_notes": "Fokus pada leadership development dan sertifikasi SHRM-SCP di semester 1",
      "submitted_at": "2026-01-25T14:30:00Z",
      "created_at": "2026-01-18T09:00:00Z",
      "updated_at": "2026-02-05T10:00:00Z"
    }
  ],

  "idpActivities": [
    {
      "id": "IDPA-10042-001",
      "idp_record_id": "IDP-10042-2026",
      "course_id": "CRS-LDR-008",
      "activity_type": "lms_course",
      "title": "Strategic Leadership for Senior Executives",
      "duration_hours": 16,
      "target_date": "2026-04-30",
      "priority": "high",
      "status": "in_progress",
      "completion_date": null,
      "evidence_url": null,
      "notes": "Sudah selesai modul 1 dan 2"
    },
    {
      "id": "IDPA-10042-002",
      "idp_record_id": "IDP-10042-2026",
      "course_id": null,
      "activity_type": "custom_activity",
      "title": "Persiapan Sertifikasi SHRM-SCP",
      "duration_hours": 20,
      "target_date": "2026-06-30",
      "priority": "high",
      "status": "not_started",
      "completion_date": null,
      "evidence_url": null,
      "notes": "Pendaftaran ujian target Mei 2026"
    },
    {
      "id": "IDPA-10042-003",
      "idp_record_id": "IDP-10042-2026",
      "course_id": "CRS-DGT-012",
      "activity_type": "lms_course",
      "title": "Data-Driven HR Decision Making",
      "duration_hours": 8,
      "target_date": "2026-03-15",
      "priority": "medium",
      "status": "completed",
      "completion_date": "2026-02-03",
      "evidence_url": "https://lms.injourney.id/cert/CRS-DGT-012-10042",
      "notes": null
    },
    {
      "id": "IDPA-10042-004",
      "idp_record_id": "IDP-10042-2026",
      "course_id": "CRS-CHG-005",
      "activity_type": "lms_course",
      "title": "Leading Organizational Transformation",
      "duration_hours": 4,
      "target_date": "2026-09-30",
      "priority": "low",
      "status": "not_started",
      "completion_date": null,
      "evidence_url": null,
      "notes": null
    }
  ],

  "tenderPeriods": [
    {
      "id": "TPRD-2026-Q1",
      "name": "Internal Job Tender Q1 2026",
      "start_date": "2026-01-20",
      "end_date": "2026-03-31",
      "status": "active",
      "max_applications": 3,
      "poster_url": "https://cdn.injourney.id/ijt/poster-q1-2026.jpg"
    }
  ],

  "positions": [
    {
      "id": "POS-IJT-001",
      "title": "General Manager Strategic Planning",
      "description": "Bertanggung jawab atas perencanaan strategis perusahaan",
      "organization_id": "ORG-INJ-STRAT",
      "organization_name": "Direktorat Perencanaan Strategis",
      "job_family_id": "JF-MGMT-002",
      "grade_jabatan": 23,
      "band_jabatan": "IV",
      "location": "Jakarta",
      "quota": 1,
      "status": "open",
      "deadline": "2026-03-15T23:59:00Z",
      "period_id": "TPRD-2026-Q1",
      "min_grade_kandidat": 20
    },
    {
      "id": "POS-IJT-002",
      "title": "VP People Analytics & Insights",
      "description": "Memimpin inisiatif people analytics dan data-driven HR",
      "organization_id": "ORG-INJ-HC",
      "organization_name": "Direktorat SDM & Digital",
      "job_family_id": "JF-HC-001",
      "grade_jabatan": 22,
      "band_jabatan": "IV",
      "location": "Jakarta",
      "quota": 1,
      "status": "open",
      "deadline": "2026-02-28T23:59:00Z",
      "period_id": "TPRD-2026-Q1",
      "min_grade_kandidat": 19
    }
  ],

  "applications": [
    {
      "id": "APP-10042-001",
      "position_id": "POS-IJT-001",
      "employee_id": "EMP-10042",
      "status": "shortlisted",
      "movement_type": "PROMOSI",
      "eligibility_check": {
        "is_eligible": true,
        "checks": {
          "employee_type": { "passed": true, "message": "Karyawan tetap" },
          "disciplinary_status": { "passed": true, "message": "Tidak ada hukuman disiplin aktif" },
          "grade_range": { "passed": true, "message": "Grade 22 dapat melamar grade 19 s/d 25", "movement_type": "PROMOSI" },
          "job_family": { "passed": true, "message": "Pengalaman di Job Family tujuan: 2 tahun" },
          "not_current_position": { "passed": true, "message": "Bukan posisi saat ini" },
          "min_grade": { "passed": true, "message": "Grade 22 >= minimum 20" }
        }
      },
      "eqs_score": 82.45,
      "statement_accepted": true,
      "documents": [
        { "id": "DOC-001", "document_type": "CV", "file_url": "https://cdn.injourney.id/docs/cv-ratna-2026.pdf", "file_name": "CV_Ratna_Kusumawati_2026.pdf", "uploaded_at": "2026-02-01T10:00:00Z" },
        { "id": "DOC-002", "document_type": "Motivation Letter", "file_url": "https://cdn.injourney.id/docs/ml-ratna-ijt001.pdf", "file_name": "Motivation_Letter_GM_Strategic.pdf", "uploaded_at": "2026-02-01T10:05:00Z" }
      ],
      "submitted_at": "2026-02-01T10:10:00Z",
      "updated_at": "2026-02-07T14:00:00Z"
    },
    {
      "id": "APP-10042-002",
      "position_id": "POS-IJT-002",
      "employee_id": "EMP-10042",
      "status": "submitted",
      "movement_type": "ROTASI",
      "eligibility_check": {
        "is_eligible": true,
        "checks": {
          "employee_type": { "passed": true, "message": "Karyawan tetap" },
          "disciplinary_status": { "passed": true, "message": "Tidak ada hukuman disiplin aktif" },
          "grade_range": { "passed": true, "message": "Grade 22 dapat melamar grade 19 s/d 25", "movement_type": "ROTASI" },
          "job_family": { "passed": true, "message": "Job Family sama" },
          "not_current_position": { "passed": true, "message": "Bukan posisi saat ini" },
          "min_grade": { "passed": true, "message": "Grade 22 >= minimum 19" }
        }
      },
      "eqs_score": 82.45,
      "statement_accepted": true,
      "documents": [
        { "id": "DOC-003", "document_type": "CV", "file_url": "https://cdn.injourney.id/docs/cv-ratna-2026.pdf", "file_name": "CV_Ratna_Kusumawati_2026.pdf", "uploaded_at": "2026-02-05T09:00:00Z" }
      ],
      "submitted_at": "2026-02-05T09:15:00Z",
      "updated_at": "2026-02-05T09:15:00Z"
    }
  ],

  "assessmentCycles": [
    {
      "id": "AC-2026-BHV",
      "tenant_id": "TNT-INJ",
      "name": "Penilaian Kinerja Berbasis Perilaku (AKHLAK) 2026",
      "assessment_type": "behavioral",
      "instrument_id": "INST-AKHLAK-001",
      "start_date": "2026-02-01",
      "end_date": "2026-02-28",
      "status": "active",
      "total_assessee": 450,
      "created_at": "2026-01-20T08:00:00Z",
      "updated_at": "2026-02-01T08:00:00Z"
    }
  ],

  "assessorAssignments": [
    {
      "id": "AA-10042-ASR-001",
      "cycle_id": "AC-2026-BHV",
      "assessee_id": "EMP-10055",
      "assessee_name": "Dewi Anggraini",
      "assessor_id": "EMP-10042",
      "channel": "superior",
      "channel_weight": 40,
      "status": "notified",
      "is_override": false,
      "assigned_at": "2026-02-01T08:00:00Z",
      "notified_at": "2026-02-01T09:00:00Z",
      "completed_at": null
    },
    {
      "id": "AA-10042-ASR-002",
      "cycle_id": "AC-2026-BHV",
      "assessee_id": "EMP-10061",
      "assessee_name": "Budi Hartanto",
      "assessor_id": "EMP-10042",
      "channel": "peer",
      "channel_weight": 20,
      "status": "in_progress",
      "is_override": false,
      "assigned_at": "2026-02-01T08:00:00Z",
      "notified_at": "2026-02-01T09:00:00Z",
      "completed_at": null
    },
    {
      "id": "AA-10042-ASR-003",
      "cycle_id": "AC-2026-BHV",
      "assessee_id": "EMP-10042",
      "assessee_name": "Ratna Kusumawati",
      "assessor_id": "EMP-10042",
      "channel": "self",
      "channel_weight": 10,
      "status": "completed",
      "is_override": false,
      "assigned_at": "2026-02-01T08:00:00Z",
      "notified_at": "2026-02-01T09:00:00Z",
      "completed_at": "2026-02-06T15:30:00Z"
    }
  ],

  "periodAlerts": [
    {
      "id": "ALERT-001",
      "module": "360_assessment",
      "severity": "urgent",
      "icon": "ClipboardCheck",
      "title": "Anda memiliki 2 assessment yang harus diisi",
      "description": "Penilaian AKHLAK 2026 — deadline 28 Februari 2026",
      "action_url": "/360-assessment/assigned",
      "deadline": "2026-02-28T23:59:00Z",
      "days_remaining": 19,
      "is_dismissed": false,
      "created_at": "2026-02-01T09:00:00Z"
    },
    {
      "id": "ALERT-002",
      "module": "idp",
      "severity": "warning",
      "icon": "ClipboardList",
      "title": "Deadline pengisian IDP 2026 dalam 19 hari",
      "description": "IDP Anda sudah disetujui. Pastikan progress sesuai target.",
      "action_url": "/my-development",
      "deadline": "2026-02-28T23:59:00Z",
      "days_remaining": 19,
      "is_dismissed": false,
      "created_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "ALERT-003",
      "module": "job_tender",
      "severity": "info",
      "icon": "Briefcase",
      "title": "Deadline pendaftaran GM Strategic Planning dalam 34 hari",
      "description": "Status lamaran Anda: Shortlisted",
      "action_url": "/job-tender/POS-IJT-001",
      "deadline": "2026-03-15T23:59:00Z",
      "days_remaining": 34,
      "is_dismissed": false,
      "created_at": "2026-02-01T08:00:00Z"
    },
    {
      "id": "ALERT-004",
      "module": "job_tender",
      "severity": "warning",
      "icon": "Briefcase",
      "title": "Deadline pendaftaran VP People Analytics dalam 19 hari",
      "description": "Status lamaran Anda: Submitted — menunggu screening",
      "action_url": "/job-tender/POS-IJT-002",
      "deadline": "2026-02-28T23:59:00Z",
      "days_remaining": 19,
      "is_dismissed": false,
      "created_at": "2026-02-05T09:15:00Z"
    },
    {
      "id": "ALERT-005",
      "module": "career_aspiration",
      "severity": "info",
      "icon": "Target",
      "title": "Periode aspirasi karir 2026 sedang dibuka",
      "description": "Ajukan atau perbarui aspirasi karir Anda sebelum 31 Maret 2026",
      "action_url": "/career-path/my-aspiration",
      "deadline": "2026-03-31T23:59:00Z",
      "days_remaining": 50,
      "is_dismissed": false,
      "created_at": "2026-01-10T08:00:00Z"
    }
  ],

  "teamSummary": {
    "_comment": "Aggregated data for Line Manager view (Ratna has 8 direct reports)",
    "total_subordinates": 8,
    "nine_box_distribution": {
      "9box_high_potential": 1,
      "9box_promotable": 2,
      "9box_solid_contributor": 3,
      "9box_sleeping_tiger": 1,
      "9box_unfit": 0,
      "unclassified": 1
    },
    "idp_status_summary": {
      "draft": 1,
      "pending_approval": 2,
      "approved": 4,
      "revision_requested": 0,
      "completed": 0,
      "no_idp": 1
    },
    "action_items": {
      "idp_approval_pending": 2,
      "aspiration_review_pending": 1,
      "assessment_pending": 3,
      "total": 6
    },
    "avg_eqs_score": 74.8
  },

  "subordinates": [
    {
      "id": "EMP-10055",
      "name": "Dewi Anggraini",
      "position_title": "Department Head Talent Acquisition",
      "grade_jabatan": 19,
      "talent_cluster": "9box_promotable",
      "eqs_score": 79.2,
      "idp_status": "approved"
    },
    {
      "id": "EMP-10058",
      "name": "Fajar Nugroho",
      "position_title": "Department Head Employee Relations",
      "grade_jabatan": 19,
      "talent_cluster": "9box_solid_contributor",
      "eqs_score": 72.1,
      "idp_status": "approved"
    },
    {
      "id": "EMP-10062",
      "name": "Sari Wulandari",
      "position_title": "Department Head Learning & Development",
      "grade_jabatan": 19,
      "talent_cluster": "9box_high_potential",
      "eqs_score": 88.3,
      "idp_status": "approved"
    },
    {
      "id": "EMP-10070",
      "name": "Andi Prasetyo",
      "position_title": "Department Head Compensation & Benefits",
      "grade_jabatan": 19,
      "talent_cluster": "9box_promotable",
      "eqs_score": 76.5,
      "idp_status": "pending_approval"
    },
    {
      "id": "EMP-10075",
      "name": "Maya Handayani",
      "position_title": "Section Head HC Analytics",
      "grade_jabatan": 17,
      "talent_cluster": "9box_solid_contributor",
      "eqs_score": 71.0,
      "idp_status": "approved"
    },
    {
      "id": "EMP-10078",
      "name": "Rizki Firmansyah",
      "position_title": "Section Head Workforce Planning",
      "grade_jabatan": 17,
      "talent_cluster": "9box_sleeping_tiger",
      "eqs_score": 65.8,
      "idp_status": "pending_approval"
    },
    {
      "id": "EMP-10082",
      "name": "Putri Rahayu",
      "position_title": "Section Head HC Operations",
      "grade_jabatan": 17,
      "talent_cluster": "9box_solid_contributor",
      "eqs_score": 69.4,
      "idp_status": "draft"
    },
    {
      "id": "EMP-10089",
      "name": "Ahmad Hidayat",
      "position_title": "Staff HC Business Partner",
      "grade_jabatan": 14,
      "talent_cluster": null,
      "eqs_score": null,
      "idp_status": null
    }
  ]
}
```

## Edge Cases Included

- **EQS Component with deduction** — TES component has a -5 deduction for "Late submission IDP 2024" (EQSC-10042-006)
- **Null/empty optional fields** — `eligibility_reason: null`, `top_talent_designation_date: null`, `notes: null` on TalentPoolCandidate, IDPActivity with null `evidence_url` and `notes`
- **Mixed application statuses** — One `shortlisted` (PROMOSI) and one `submitted` (ROTASI)
- **Mixed assessment assignment statuses** — `notified` (pending), `in_progress`, and `completed` (self-assessment)
- **Period Alerts with varied severity** — `urgent` (assessment deadline), `warning` (IDP, job tender), `info` (career aspiration)
- **IDP activities with all statuses** — `completed`, `in_progress`, `not_started` (2x with different priorities)
- **Subordinate with no data** — Ahmad Hidayat (EMP-10089) has `talent_cluster: null`, `eqs_score: null`, `idp_status: null` representing a new/unclassified employee
- **Subordinate with no IDP** — Ahmad Hidayat has `idp_status: null`, contributing to `no_idp: 1` in team summary
- **Team 9-Box with unclassified** — One subordinate has no classification (`unclassified: 1`)
- **Aspiration from all 4 sources** — Individual (3), Supervisor (2), Job Holder (1), Unit (1)
- **Custom activity without course_id** — IDPA-10042-002 is a custom activity (SHRM-SCP preparation) with `course_id: null`
- **Completed IDP activity ahead of target_date** — IDPA-10042-003 completed on Feb 3 vs target March 15
- **Line Manager flag** — `is_line_manager: true` with `direct_report_count: 8` controlling Team Summary visibility
- **Long Indonesian text** — Employee notes in IDP, description in positions, alert descriptions