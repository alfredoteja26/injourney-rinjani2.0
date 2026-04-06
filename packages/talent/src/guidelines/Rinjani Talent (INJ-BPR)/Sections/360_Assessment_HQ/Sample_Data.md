## Persona

**Ratna Kusuma** (ADM-001) - HC Admin, Direktorat Human Capital InJourney Group: Bertanggung jawab mengelola seluruh siklus penilaian 360 di level Holding, termasuk pembuatan instrumen, penetapan assessor, monitoring, dan publikasi hasil.

---

## JSON Data

```json
{
  "_meta": {
    "models": {
      "assessmentCycles": "Assessment cycles in various lifecycle stages for HQ management",
      "assessmentInstruments": "Reusable questionnaire templates managed by admin",
      "instrumentQuestions": "Questions within instruments with competency mapping and weights",
      "assessorAssignments": "Assessor-assessee assignments with override tracking for admin view",
      "assessmentResults": "Calculated results for admin validation and publishing",
      "assessmentSettings": "Global configuration per tenant",
      "completionSummary": "Derived aggregation for monitoring dashboard"
    },
    "relationships": [
      "assessmentCycles.instrument_id references assessmentInstruments.id",
      "instrumentQuestions.instrument_id references assessmentInstruments.id",
      "assessorAssignments.cycle_id references assessmentCycles.id",
      "assessmentResults.cycle_id references assessmentCycles.id",
      "assessmentSettings.tenant_id scopes all entities"
    ],
    "source": "Schemas defined in Rinjani Talent Data Model (360 Assessment Module)"
  },
  "assessmentCycles": [
    {
      "id": "CYC-001",
      "tenant_id": "TENANT-INJ",
      "name": "Penilaian Kinerja Berbasis Perilaku AKHLAK 2025",
      "description": "Penilaian 360 derajat berbasis nilai-nilai AKHLAK untuk seluruh karyawan InJourney Group Holding periode 2025",
      "assessment_type": "behavioral",
      "instrument_id": "INS-001",
      "start_date": "2025-11-01",
      "end_date": "2025-12-15",
      "result_valid_until": "2026-12-31",
      "assessor_assignment_method": "auto",
      "anonymity_policy": "anonymous",
      "channel_config": [
        { "channel": "superior", "evaluator_count": 1, "weight": 40, "enabled": true },
        { "channel": "peer", "evaluator_count": 3, "weight": 30, "enabled": true },
        { "channel": "subordinate", "evaluator_count": -1, "weight": 20, "enabled": true },
        { "channel": "self", "evaluator_count": 1, "weight": 10, "enabled": true }
      ],
      "status": "published",
      "total_assessee": 245,
      "created_by": "ADM-001",
      "created_at": "2025-10-15T08:00:00Z",
      "updated_at": "2026-01-10T14:30:00Z"
    },
    {
      "id": "CYC-002",
      "tenant_id": "TENANT-INJ",
      "name": "Penilaian Kompetensi Manajerial Q1 2026",
      "description": "Penilaian 360 derajat kompetensi manajerial untuk level Manager ke atas di InJourney Group",
      "assessment_type": "competency",
      "instrument_id": "INS-002",
      "start_date": "2026-02-01",
      "end_date": "2026-03-15",
      "result_valid_until": null,
      "assessor_assignment_method": "auto",
      "anonymity_policy": "anonymous",
      "channel_config": [
        { "channel": "superior", "evaluator_count": 1, "weight": 35, "enabled": true },
        { "channel": "peer", "evaluator_count": 3, "weight": 35, "enabled": true },
        { "channel": "subordinate", "evaluator_count": -1, "weight": 20, "enabled": true },
        { "channel": "self", "evaluator_count": 1, "weight": 10, "enabled": true }
      ],
      "status": "active",
      "total_assessee": 48,
      "created_by": "ADM-001",
      "created_at": "2026-01-20T09:00:00Z",
      "updated_at": "2026-02-01T07:00:00Z"
    },
    {
      "id": "CYC-004",
      "tenant_id": "TENANT-INJ",
      "name": "Penilaian Perilaku AKHLAK Pilot Batch",
      "description": null,
      "assessment_type": "behavioral",
      "instrument_id": "INS-001",
      "start_date": "2026-03-01",
      "end_date": "2026-04-30",
      "result_valid_until": null,
      "assessor_assignment_method": "manual",
      "anonymity_policy": "identified",
      "channel_config": [
        { "channel": "superior", "evaluator_count": 1, "weight": 50, "enabled": true },
        { "channel": "peer", "evaluator_count": 2, "weight": 30, "enabled": true },
        { "channel": "self", "evaluator_count": 1, "weight": 20, "enabled": true }
      ],
      "status": "draft",
      "total_assessee": 12,
      "created_by": "ADM-001",
      "created_at": "2026-02-05T10:00:00Z",
      "updated_at": "2026-02-05T10:00:00Z"
    },
    {
      "id": "CYC-005",
      "tenant_id": "TENANT-INJ",
      "name": "Penilaian Leadership Competency 2025",
      "description": "Assessment 360 untuk kompetensi kepemimpinan level VP ke atas di InJourney Group",
      "assessment_type": "competency",
      "instrument_id": "INS-003",
      "start_date": "2025-08-01",
      "end_date": "2025-09-30",
      "result_valid_until": "2026-09-30",
      "assessor_assignment_method": "auto",
      "anonymity_policy": "anonymous",
      "channel_config": [
        { "channel": "superior", "evaluator_count": 1, "weight": 40, "enabled": true },
        { "channel": "peer", "evaluator_count": 3, "weight": 30, "enabled": true },
        { "channel": "subordinate", "evaluator_count": -1, "weight": 20, "enabled": true },
        { "channel": "self", "evaluator_count": 1, "weight": 10, "enabled": true }
      ],
      "status": "archived",
      "total_assessee": 15,
      "created_by": "ADM-002",
      "created_at": "2025-07-10T08:00:00Z",
      "updated_at": "2025-12-01T10:00:00Z"
    }
  ],
  "assessmentInstruments": [
    {
      "id": "INS-001",
      "name": "AKHLAK Behavioral Assessment v2",
      "description": "Instrumen penilaian perilaku berbasis 6 nilai AKHLAK",
      "assessment_type": "behavioral",
      "total_questions": 7,
      "scale_points": 6,
      "scale_min_label": "Sangat Tidak Setuju",
      "scale_max_label": "Sangat Setuju",
      "equalize_question_weights": false,
      "is_template": true,
      "created_by": "ADM-001",
      "created_at": "2025-09-01T08:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    },
    {
      "id": "INS-002",
      "name": "Managerial Competency Assessment",
      "description": "Instrumen penilaian kompetensi manajerial: Strategic Thinking, People Management, Decision Making, Communication",
      "assessment_type": "competency",
      "total_questions": 8,
      "scale_points": 6,
      "scale_min_label": "Tidak Setuju",
      "scale_max_label": "Setuju",
      "equalize_question_weights": true,
      "is_template": true,
      "created_by": "ADM-001",
      "created_at": "2026-01-10T08:00:00Z",
      "updated_at": "2026-01-15T14:00:00Z"
    },
    {
      "id": "INS-003",
      "name": "Leadership Competency Assessment v1",
      "description": "Instrumen khusus untuk VP dan di atasnya: Visionary Leadership, Change Management, Strategic Communication, Stakeholder Management, Innovation",
      "assessment_type": "competency",
      "total_questions": 10,
      "scale_points": 5,
      "scale_min_label": "Tidak Pernah",
      "scale_max_label": "Selalu",
      "equalize_question_weights": true,
      "is_template": true,
      "created_by": "ADM-002",
      "created_at": "2025-06-15T08:00:00Z",
      "updated_at": "2025-07-01T10:00:00Z"
    },
    {
      "id": "INS-004",
      "name": "Custom Service Excellence Assessment",
      "description": null,
      "assessment_type": "custom",
      "total_questions": 5,
      "scale_points": 4,
      "scale_min_label": "Tidak Setuju",
      "scale_max_label": "Sangat Setuju",
      "equalize_question_weights": true,
      "is_template": false,
      "created_by": "ADM-001",
      "created_at": "2026-02-01T09:00:00Z",
      "updated_at": "2026-02-01T09:00:00Z"
    }
  ],
  "completionSummary": [
    {
      "_comment": "Derived aggregation for CYC-002 (active cycle) monitoring dashboard",
      "cycle_id": "CYC-002",
      "total_assessees": 48,
      "total_assignments": 312,
      "completed_assignments": 89,
      "overall_completion_rate": 0.285,
      "channel_breakdown": [
        { "channel": "superior", "total": 48, "completed": 12, "rate": 0.25 },
        { "channel": "peer", "total": 144, "completed": 38, "rate": 0.264 },
        { "channel": "subordinate", "total": 72, "completed": 15, "rate": 0.208 },
        { "channel": "self", "total": 48, "completed": 24, "rate": 0.50 }
      ],
      "organization_breakdown": [
        { "org_name": "Direktorat Keuangan & Manajemen Risiko", "assessees": 10, "completion_rate": 0.32 },
        { "org_name": "Direktorat Human Capital & Legal", "assessees": 8, "completion_rate": 0.45 },
        { "org_name": "Direktorat Strategi & Pengembangan Bisnis", "assessees": 12, "completion_rate": 0.28 },
        { "org_name": "Direktorat Operasional & Transformasi Digital", "assessees": 12, "completion_rate": 0.18 },
        { "org_name": "Sekretariat Perusahaan", "assessees": 6, "completion_rate": 0.22 }
      ],
      "incomplete_assessors": [
        { "assessor_id": "EMP-10032", "assessor_name": "Bambang Hartono", "pending_count": 5, "channel": "superior" },
        { "assessor_id": "EMP-20201", "assessor_name": "Agus Prasetyo", "pending_count": 3, "channel": "peer" },
        { "assessor_id": "EMP-30045", "assessor_name": "Maya Putri", "pending_count": 2, "channel": "subordinate" }
      ]
    }
  ],
  "assessorAssignments_adminView": [
    {
      "_comment": "Admin view of assignments for CYC-002 showing override and status mix",
      "id": "ASG-020",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessee_name": "Siti Nurhaliza",
      "assessee_position": "Manager Talent Management",
      "assessee_org": "Direktorat Human Capital & Legal",
      "assessor_id": "EMP-10032",
      "assessor_name": "Bambang Hartono",
      "channel": "superior",
      "status": "notified",
      "is_override": false,
      "override_reason": null
    },
    {
      "id": "ASG-021",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessee_name": "Siti Nurhaliza",
      "assessee_position": "Manager Talent Management",
      "assessee_org": "Direktorat Human Capital & Legal",
      "assessor_id": "EMP-20189",
      "assessor_name": "Dewi Ratnasari",
      "channel": "peer",
      "status": "in_progress",
      "is_override": false,
      "override_reason": null
    },
    {
      "id": "ASG-022",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessee_name": "Siti Nurhaliza",
      "assessee_position": "Manager Talent Management",
      "assessee_org": "Direktorat Human Capital & Legal",
      "assessor_id": "EMP-20178",
      "assessor_name": "Rina Wijaya",
      "channel": "peer",
      "status": "completed",
      "is_override": true,
      "override_reason": "Pengganti EMP-20156 yang sedang tugas luar negeri"
    },
    {
      "id": "ASG-023",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20300",
      "assessee_name": "Hendra Wijaya",
      "assessee_position": "Manager IT & Digital",
      "assessee_org": "Direktorat Operasional & Transformasi Digital",
      "assessor_id": "EMP-10050",
      "assessor_name": "Diana Permata",
      "channel": "superior",
      "status": "skipped",
      "is_override": true,
      "override_reason": "Atasan baru saja mutasi ke anak perusahaan, belum cukup mengenal kinerja bawahan"
    }
  ],
  "assessmentResults_adminView": [
    {
      "_comment": "Admin view of published results for CYC-001 for validation/publishing",
      "cycle_id": "CYC-001",
      "results": [
        {
          "assessee_id": "EMP-20145",
          "assessee_name": "Siti Nurhaliza",
          "assessee_position": "Manager Talent Management",
          "assessee_org": "Direktorat Human Capital & Legal",
          "overall_score": 5.18,
          "overall_max_score": 6.00,
          "status": "published",
          "self_score_deviation": 0.18,
          "anomaly_flag": false
        },
        {
          "assessee_id": "EMP-20189",
          "assessee_name": "Dewi Ratnasari",
          "assessee_position": "Manager Perencanaan Strategis",
          "assessee_org": "Direktorat Strategi & Pengembangan Bisnis",
          "overall_score": 4.95,
          "overall_max_score": 6.00,
          "status": "published",
          "self_score_deviation": 0.82,
          "anomaly_flag": true
        },
        {
          "assessee_id": "EMP-20201",
          "assessee_name": "Agus Prasetyo",
          "assessee_position": "Manager Akuntansi & Pelaporan",
          "assessee_org": "Direktorat Keuangan & Manajemen Risiko",
          "overall_score": 5.42,
          "overall_max_score": 6.00,
          "status": "published",
          "self_score_deviation": 0.05,
          "anomaly_flag": false
        },
        {
          "assessee_id": "EMP-10032",
          "assessee_name": "Bambang Hartono",
          "assessee_position": "VP Human Capital & Organisasi",
          "assessee_org": "Direktorat Human Capital & Legal",
          "overall_score": 5.61,
          "overall_max_score": 6.00,
          "status": "published",
          "self_score_deviation": 0.12,
          "anomaly_flag": false
        },
        {
          "assessee_id": "EMP-20300",
          "assessee_name": "Hendra Wijaya",
          "assessee_position": "Manager IT & Digital",
          "assessee_org": "Direktorat Operasional & Transformasi Digital",
          "overall_score": 3.85,
          "overall_max_score": 6.00,
          "status": "published",
          "self_score_deviation": 1.45,
          "anomaly_flag": true
        }
      ],
      "score_distribution": {
        "min": 3.22,
        "max": 5.78,
        "mean": 4.89,
        "median": 5.01,
        "std_dev": 0.52
      },
      "competency_averages": [
        { "competency_name": "Amanah", "avg_score": 5.12 },
        { "competency_name": "Kompeten", "avg_score": 4.85 },
        { "competency_name": "Harmonis", "avg_score": 5.28 },
        { "competency_name": "Loyal", "avg_score": 5.05 },
        { "competency_name": "Adaptif", "avg_score": 4.52 },
        { "competency_name": "Kolaboratif", "avg_score": 5.10 }
      ]
    }
  ],
  "assessmentSettings": [
    {
      "id": "SET-001",
      "tenant_id": "TENANT-INJ",
      "setting_key": "default_channel_config",
      "setting_value": {
        "channels": [
          { "channel": "superior", "evaluator_count": 1, "weight": 40, "enabled": true },
          { "channel": "peer", "evaluator_count": 3, "weight": 30, "enabled": true },
          { "channel": "subordinate", "evaluator_count": -1, "weight": 20, "enabled": true },
          { "channel": "self", "evaluator_count": 1, "weight": 10, "enabled": true }
        ]
      },
      "description": "Konfigurasi default channel evaluator untuk InJourney Group",
      "updated_by": "ADM-001",
      "updated_at": "2025-08-15T10:00:00Z"
    },
    {
      "id": "SET-002",
      "tenant_id": "TENANT-INJ",
      "setting_key": "peer_selection_config",
      "setting_value": {
        "max_peer_count": 3,
        "selection_method": "random_deterministic",
        "random_seed_per_cycle": true
      },
      "description": "Konfigurasi pemilihan peer assessor",
      "updated_by": "ADM-001",
      "updated_at": "2025-08-15T10:00:00Z"
    },
    {
      "id": "SET-003",
      "tenant_id": "TENANT-INJ",
      "setting_key": "notification_config",
      "setting_value": {
        "kickoff_notification": true,
        "reminder_days_before_deadline": [14, 7, 3, 1],
        "last_call_days": 1,
        "notify_channels": ["email", "in_app"]
      },
      "description": "Konfigurasi notifikasi dan reminder",
      "updated_by": "ADM-001",
      "updated_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "SET-004",
      "tenant_id": "TENANT-INJ",
      "setting_key": "scoring_config",
      "setting_value": {
        "normalization_enabled": false,
        "min_completion_rate_for_validity": 0.80,
        "auto_publish_on_close": false
      },
      "description": "Konfigurasi scoring dan validitas hasil",
      "updated_by": "ADM-001",
      "updated_at": "2025-09-01T08:00:00Z"
    }
  ],
  "uploadValidationSample": {
    "_comment": "Sample upload validation result for UC-7 Upload Assessment",
    "file_name": "assessment_results_batch_feb2026.xlsx",
    "total_rows": 50,
    "valid_rows": 47,
    "error_rows": 3,
    "errors": [
      { "row": 12, "column": "NIK", "value": "99999", "error": "Karyawan dengan NIK 99999 tidak ditemukan" },
      { "row": 28, "column": "QST-003_score", "value": "7", "error": "Nilai harus antara 1 dan 6" },
      { "row": 35, "column": "QST-005_score", "value": "", "error": "Nilai tidak boleh kosong" }
    ],
    "warnings": [
      { "row": 5, "column": "assessor_nik", "value": "20145", "warning": "Assessor sudah memiliki submission sebelumnya, data akan ditimpa" }
    ]
  },
  "gantiAtasanSample": {
    "_comment": "Sample Ganti Atasan action for UC-8",
    "assessee_id": "EMP-20300",
    "assessee_name": "Hendra Wijaya",
    "current_superior": {
      "id": "EMP-10050",
      "name": "Diana Permata",
      "position": "VP Transformasi Digital",
      "assignment_status": "skipped"
    },
    "new_superior": {
      "id": "EMP-10055",
      "name": "Rudi Santoso",
      "position": "Acting VP Transformasi Digital"
    },
    "reason": "Diana Permata mutasi ke anak perusahaan (PT Pelindo) per 1 Feb 2026. Rudi Santoso ditunjuk sebagai Acting VP.",
    "action_by": "ADM-001",
    "action_at": "2026-02-03T09:15:00Z"
  },
  "employees": [
    { "id": "ADM-001", "nik": "ADM001", "name": "Ratna Kusuma", "role": "HC Admin", "organization_name": "Direktorat Human Capital & Legal - InJourney Group" },
    { "id": "ADM-002", "nik": "ADM002", "name": "Budi Setiawan", "role": "Member Admin", "organization_name": "Direktorat Human Capital & Legal - InJourney Group" },
    { "id": "EMP-10032", "nik": "10032", "name": "Bambang Hartono", "position": "VP Human Capital & Organisasi", "organization_name": "Direktorat Human Capital & Legal" },
    { "id": "EMP-10050", "nik": "10050", "name": "Diana Permata", "position": "VP Transformasi Digital", "organization_name": "Direktorat Operasional & Transformasi Digital" },
    { "id": "EMP-10055", "nik": "10055", "name": "Rudi Santoso", "position": "Acting VP Transformasi Digital", "organization_name": "Direktorat Operasional & Transformasi Digital" },
    { "id": "EMP-20145", "nik": "20145", "name": "Siti Nurhaliza", "position": "Manager Talent Management", "organization_name": "Direktorat Human Capital & Legal" },
    { "id": "EMP-20189", "nik": "20189", "name": "Dewi Ratnasari", "position": "Manager Perencanaan Strategis", "organization_name": "Direktorat Strategi & Pengembangan Bisnis" },
    { "id": "EMP-20201", "nik": "20201", "name": "Agus Prasetyo", "position": "Manager Akuntansi & Pelaporan", "organization_name": "Direktorat Keuangan & Manajemen Risiko" },
    { "id": "EMP-20178", "nik": "20178", "name": "Rina Wijaya", "position": "Manager Organisasi & Tata Kelola", "organization_name": "Direktorat Human Capital & Legal" },
    { "id": "EMP-20300", "nik": "20300", "name": "Hendra Wijaya", "position": "Manager IT & Digital", "organization_name": "Direktorat Operasional & Transformasi Digital" },
    { "id": "EMP-30012", "nik": "30012", "name": "Fajar Nugroho", "position": "Supervisor Talent Acquisition", "organization_name": "Direktorat Human Capital & Legal" },
    { "id": "EMP-30045", "nik": "30045", "name": "Maya Putri", "position": "Supervisor Learning & Development", "organization_name": "Direktorat Human Capital & Legal" }
  ]
}
```

---

## Edge Cases Included

- **Cycle in draft status with manual assignment method and identified anonymity** (CYC-004: non-standard config, subordinate channel disabled)
- **Cycle created by different admin** (CYC-005: created_by ADM-002, not ADM-001)
- **Instrument with null description** (INS-004: custom assessment without description)
- **Instrument with non-template flag** (INS-004: is_template = false, one-time use)
- **Instrument with different scale_points** (INS-003: 5-point scale vs standard 6-point)
- **Completion summary with varied rates per channel** (self channel highest at 50%, subordinate lowest at 20.8%)
- **Completion summary with per-organization breakdown** (varying rates from 18% to 45%)
- **Assignment with skipped status** (ASG-023: superior skipped due to recent mutation)
- **Assignment with override and justification** (ASG-022: peer replaced due to overseas assignment)
- **Result with anomaly flag** (EMP-20189: self_score_deviation 0.82; EMP-20300: deviation 1.45)
- **Result with low score** (EMP-20300: 3.85/6.00, significantly below mean)
- **Upload validation with mixed errors** (invalid NIK, out-of-range score, empty score)
- **Upload validation with warning** (existing submission will be overwritten)
- **Ganti Atasan with complete before/after state** (Diana Permata mutasi, replaced by Rudi Santoso acting)
- **Score distribution statistics** (min, max, mean, median, std_dev for analytics)
- **Competency averages** (Adaptif lowest at 4.52, Harmonis highest at 5.28)
- **Settings with all 4 config types** (channel, peer selection, notification, scoring)