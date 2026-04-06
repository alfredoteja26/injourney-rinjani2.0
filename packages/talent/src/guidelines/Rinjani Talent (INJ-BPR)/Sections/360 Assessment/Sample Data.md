## Persona

**Siti Nurhaliza** (EMP-20145) - Manager Operasional Pelabuhan, PT Pelindo Terminal Petikemas (SPTP). Grade 18, Band Madya. Siti menjadi assessee dalam 2 siklus assessment dan assessor untuk 3 rekan kerja.

---

## JSON Data

```json
{
  "_meta": {
    "models": {
      "assessmentCycles": "Assessment cycles configured by HC Admin with instrument, channel config, and schedule",
      "assessmentInstruments": "Questionnaire templates containing questions mapped to competencies",
      "instrumentQuestions": "Individual questions within an instrument, mapped to competency and behavior indicator",
      "assessorAssignments": "Assessor-to-assessee assignments per cycle per channel",
      "assessmentSubmissions": "Questionnaire filling records by assessors",
      "submissionAnswers": "Individual question answers within a submission",
      "assessmentResults": "Calculated assessment results per assessee per cycle"
    },
    "relationships": [
      "assessmentCycles.instrument_id references assessmentInstruments.id",
      "instrumentQuestions.instrument_id references assessmentInstruments.id",
      "assessorAssignments.cycle_id references assessmentCycles.id",
      "assessmentSubmissions.assignment_id references assessorAssignments.id",
      "submissionAnswers.submission_id references assessmentSubmissions.id",
      "submissionAnswers.question_id references instrumentQuestions.id",
      "assessmentResults.cycle_id references assessmentCycles.id"
    ],
    "source": "Schemas defined in Rinjani Talent Data Model (360 Assessment Module)"
  },
  "assessmentCycles": [
    {
      "id": "CYC-001",
      "tenant_id": "TENANT-SPTP",
      "name": "Penilaian Kinerja Berbasis Perilaku AKHLAK 2025",
      "description": "Penilaian 360 derajat berbasis nilai-nilai AKHLAK untuk seluruh karyawan SPTP periode 2025",
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
      "tenant_id": "TENANT-SPTP",
      "name": "Penilaian Kompetensi Manajerial Q1 2026",
      "description": "Penilaian 360 derajat kompetensi manajerial untuk level Manager ke atas",
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
      "id": "CYC-003",
      "tenant_id": "TENANT-SPTP",
      "name": "Penilaian Perilaku AKHLAK 2024",
      "description": null,
      "assessment_type": "behavioral",
      "instrument_id": "INS-001",
      "start_date": "2024-10-01",
      "end_date": "2024-11-30",
      "result_valid_until": "2025-12-31",
      "assessor_assignment_method": "auto",
      "anonymity_policy": "anonymous",
      "channel_config": [
        { "channel": "superior", "evaluator_count": 1, "weight": 40, "enabled": true },
        { "channel": "peer", "evaluator_count": 3, "weight": 30, "enabled": true },
        { "channel": "subordinate", "evaluator_count": -1, "weight": 20, "enabled": true },
        { "channel": "self", "evaluator_count": 1, "weight": 10, "enabled": true }
      ],
      "status": "archived",
      "total_assessee": 238,
      "created_by": "ADM-001",
      "created_at": "2024-09-10T08:00:00Z",
      "updated_at": "2025-02-01T10:00:00Z"
    }
  ],
  "assessmentInstruments": [
    {
      "id": "INS-001",
      "name": "AKHLAK Behavioral Assessment v2",
      "description": "Instrumen penilaian perilaku berbasis 6 nilai AKHLAK: Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif",
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
    }
  ],
  "instrumentQuestions": [
    {
      "id": "QST-001",
      "instrument_id": "INS-001",
      "competency_id": "COMP-AMANAH",
      "competency_name": "Amanah",
      "behavior_indicator": "Memenuhi janji dan komitmen",
      "question_text": "Yang bersangkutan selalu memenuhi janji dan komitmen yang telah disepakati dalam pekerjaan",
      "question_order": 1,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-002",
      "instrument_id": "INS-001",
      "competency_id": "COMP-KOMPETEN",
      "competency_name": "Kompeten",
      "behavior_indicator": "Terus belajar dan mengembangkan kapabilitas",
      "question_text": "Yang bersangkutan secara aktif meningkatkan kompetensi diri melalui pelatihan dan pembelajaran mandiri",
      "question_order": 2,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-003",
      "instrument_id": "INS-001",
      "competency_id": "COMP-HARMONIS",
      "competency_name": "Harmonis",
      "behavior_indicator": "Saling peduli dan menghargai perbedaan",
      "question_text": "Yang bersangkutan menunjukkan rasa peduli terhadap rekan kerja dan menghargai perbedaan latar belakang",
      "question_order": 3,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-004",
      "instrument_id": "INS-001",
      "competency_id": "COMP-LOYAL",
      "competency_name": "Loyal",
      "behavior_indicator": "Berdedikasi dan mengutamakan kepentingan organisasi",
      "question_text": "Yang bersangkutan menunjukkan dedikasi tinggi dan mengutamakan kepentingan perusahaan di atas kepentingan pribadi",
      "question_order": 4,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-005",
      "instrument_id": "INS-001",
      "competency_id": "COMP-ADAPTIF",
      "competency_name": "Adaptif",
      "behavior_indicator": "Terus berinovasi dan antusias menghadapi perubahan",
      "question_text": "Yang bersangkutan menunjukkan sikap terbuka terhadap perubahan dan aktif mencari cara-cara baru yang lebih efektif",
      "question_order": 5,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-006",
      "instrument_id": "INS-001",
      "competency_id": "COMP-KOLABORATIF",
      "competency_name": "Kolaboratif",
      "behavior_indicator": "Membangun kerja sama sinergis",
      "question_text": "Yang bersangkutan aktif membangun kerja sama dengan berbagai pihak untuk mencapai tujuan bersama",
      "question_order": 6,
      "weight": 14.29,
      "created_at": "2025-09-01T08:00:00Z"
    },
    {
      "id": "QST-007",
      "instrument_id": "INS-001",
      "competency_id": "COMP-KOLABORATIF",
      "competency_name": "Kolaboratif",
      "behavior_indicator": "Memberi kesempatan kepada berbagai pihak untuk berkontribusi",
      "question_text": "Yang bersangkutan memberikan ruang dan kesempatan bagi anggota tim untuk berkontribusi secara aktif dalam pengambilan keputusan",
      "question_order": 7,
      "weight": 14.26,
      "created_at": "2025-09-01T08:00:00Z"
    }
  ],
  "assessorAssignments": [
    {
      "id": "ASG-001",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-10032",
      "channel": "superior",
      "channel_weight": 40,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-20T14:35:00Z"
    },
    {
      "id": "ASG-002",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20189",
      "channel": "peer",
      "channel_weight": 30,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-12-02T09:15:00Z"
    },
    {
      "id": "ASG-003",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20201",
      "channel": "peer",
      "channel_weight": 30,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-28T16:40:00Z"
    },
    {
      "id": "ASG-004",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20178",
      "channel": "peer",
      "channel_weight": 30,
      "status": "completed",
      "is_override": true,
      "override_by": "ADM-001",
      "override_reason": "Pengganti EMP-20156 yang sedang cuti panjang",
      "assigned_at": "2025-11-05T10:00:00Z",
      "notified_at": "2025-11-05T10:05:00Z",
      "completed_at": "2025-12-10T11:20:00Z"
    },
    {
      "id": "ASG-005",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-30012",
      "channel": "subordinate",
      "channel_weight": 20,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-15T10:20:00Z"
    },
    {
      "id": "ASG-006",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-30045",
      "channel": "subordinate",
      "channel_weight": 20,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-12-01T08:50:00Z"
    },
    {
      "id": "ASG-007",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20145",
      "channel": "self",
      "channel_weight": 10,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-08T13:10:00Z"
    },
    {
      "id": "ASG-008",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-10032",
      "channel": "superior",
      "channel_weight": 35,
      "status": "notified",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2026-01-28T08:00:00Z",
      "notified_at": "2026-02-01T07:00:00Z",
      "completed_at": null
    },
    {
      "id": "ASG-009",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20145",
      "channel": "self",
      "channel_weight": 10,
      "status": "in_progress",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2026-01-28T08:00:00Z",
      "notified_at": "2026-02-01T07:00:00Z",
      "completed_at": null
    },
    {
      "id": "ASG-010",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20189",
      "assessor_id": "EMP-20145",
      "channel": "peer",
      "channel_weight": 30,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-22T15:00:00Z"
    },
    {
      "id": "ASG-011",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-10032",
      "assessor_id": "EMP-20145",
      "channel": "subordinate",
      "channel_weight": 20,
      "status": "completed",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2025-10-28T08:00:00Z",
      "notified_at": "2025-11-01T07:00:00Z",
      "completed_at": "2025-11-18T09:30:00Z"
    },
    {
      "id": "ASG-012",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20189",
      "assessor_id": "EMP-20145",
      "channel": "peer",
      "channel_weight": 35,
      "status": "in_progress",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2026-01-28T08:00:00Z",
      "notified_at": "2026-02-01T07:00:00Z",
      "completed_at": null
    },
    {
      "id": "ASG-013",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-10032",
      "assessor_id": "EMP-20145",
      "channel": "subordinate",
      "channel_weight": 20,
      "status": "notified",
      "is_override": false,
      "override_by": null,
      "override_reason": null,
      "assigned_at": "2026-01-28T08:00:00Z",
      "notified_at": "2026-02-01T07:00:00Z",
      "completed_at": null
    }
  ],
  "assessmentSubmissions": [
    {
      "id": "SUB-001",
      "assignment_id": "ASG-007",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20145",
      "channel": "self",
      "instrument_id": "INS-001",
      "total_questions": 7,
      "answered_count": 7,
      "status": "submitted",
      "auto_saved_at": "2025-11-08T13:05:00Z",
      "submitted_at": "2025-11-08T13:10:00Z",
      "created_at": "2025-11-08T12:30:00Z"
    },
    {
      "id": "SUB-002",
      "assignment_id": "ASG-010",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20189",
      "assessor_id": "EMP-20145",
      "channel": "peer",
      "instrument_id": "INS-001",
      "total_questions": 7,
      "answered_count": 7,
      "status": "submitted",
      "auto_saved_at": "2025-11-22T14:50:00Z",
      "submitted_at": "2025-11-22T15:00:00Z",
      "created_at": "2025-11-22T14:00:00Z"
    },
    {
      "id": "SUB-003",
      "assignment_id": "ASG-011",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-10032",
      "assessor_id": "EMP-20145",
      "channel": "subordinate",
      "instrument_id": "INS-001",
      "total_questions": 7,
      "answered_count": 7,
      "status": "submitted",
      "auto_saved_at": "2025-11-18T09:25:00Z",
      "submitted_at": "2025-11-18T09:30:00Z",
      "created_at": "2025-11-18T08:45:00Z"
    },
    {
      "id": "SUB-004",
      "assignment_id": "ASG-009",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "assessor_id": "EMP-20145",
      "channel": "self",
      "instrument_id": "INS-002",
      "total_questions": 8,
      "answered_count": 5,
      "status": "in_progress",
      "auto_saved_at": "2026-02-04T10:15:00Z",
      "submitted_at": null,
      "created_at": "2026-02-04T09:30:00Z"
    },
    {
      "id": "SUB-005",
      "assignment_id": "ASG-012",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20189",
      "assessor_id": "EMP-20145",
      "channel": "peer",
      "instrument_id": "INS-002",
      "total_questions": 8,
      "answered_count": 3,
      "status": "in_progress",
      "auto_saved_at": "2026-02-05T11:00:00Z",
      "submitted_at": null,
      "created_at": "2026-02-05T10:30:00Z"
    }
  ],
  "submissionAnswers": [
    {
      "id": "ANS-001",
      "submission_id": "SUB-001",
      "question_id": "QST-001",
      "score": 5,
      "comment": null,
      "answered_at": "2025-11-08T12:35:00Z"
    },
    {
      "id": "ANS-002",
      "submission_id": "SUB-001",
      "question_id": "QST-002",
      "score": 5,
      "comment": null,
      "answered_at": "2025-11-08T12:36:00Z"
    },
    {
      "id": "ANS-003",
      "submission_id": "SUB-001",
      "question_id": "QST-003",
      "score": 6,
      "comment": null,
      "answered_at": "2025-11-08T12:37:00Z"
    },
    {
      "id": "ANS-004",
      "submission_id": "SUB-001",
      "question_id": "QST-004",
      "score": 5,
      "comment": null,
      "answered_at": "2025-11-08T12:38:00Z"
    },
    {
      "id": "ANS-005",
      "submission_id": "SUB-001",
      "question_id": "QST-005",
      "score": 4,
      "comment": "Perlu lebih terbuka terhadap metode kerja baru yang diterapkan tim",
      "answered_at": "2025-11-08T12:40:00Z"
    },
    {
      "id": "ANS-006",
      "submission_id": "SUB-001",
      "question_id": "QST-006",
      "score": 5,
      "comment": null,
      "answered_at": "2025-11-08T12:41:00Z"
    },
    {
      "id": "ANS-007",
      "submission_id": "SUB-001",
      "question_id": "QST-007",
      "score": 5,
      "comment": null,
      "answered_at": "2025-11-08T12:42:00Z"
    },
    {
      "id": "ANS-008",
      "submission_id": "SUB-002",
      "question_id": "QST-001",
      "score": 6,
      "comment": "Budi selalu tepat waktu dan konsisten memenuhi komitmennya",
      "answered_at": "2025-11-22T14:10:00Z"
    },
    {
      "id": "ANS-009",
      "submission_id": "SUB-004",
      "question_id": "QST-001",
      "score": 4,
      "comment": null,
      "answered_at": "2026-02-04T09:35:00Z"
    },
    {
      "id": "ANS-010",
      "submission_id": "SUB-004",
      "question_id": "QST-002",
      "score": 5,
      "comment": null,
      "answered_at": "2026-02-04T09:37:00Z"
    }
  ],
  "assessmentResults": [
    {
      "id": "RES-001",
      "cycle_id": "CYC-001",
      "assessee_id": "EMP-20145",
      "overall_score": 5.18,
      "overall_max_score": 6.00,
      "status": "published",
      "competency_scores": [
        {
          "competency_id": "COMP-AMANAH",
          "competency_name": "Amanah",
          "score": 5.40,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Memenuhi janji dan komitmen", "score": 5.40, "max_score": 6.00 }
          ]
        },
        {
          "competency_id": "COMP-KOMPETEN",
          "competency_name": "Kompeten",
          "score": 5.10,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Terus belajar dan mengembangkan kapabilitas", "score": 5.10, "max_score": 6.00 }
          ]
        },
        {
          "competency_id": "COMP-HARMONIS",
          "competency_name": "Harmonis",
          "score": 5.55,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Saling peduli dan menghargai perbedaan", "score": 5.55, "max_score": 6.00 }
          ]
        },
        {
          "competency_id": "COMP-LOYAL",
          "competency_name": "Loyal",
          "score": 5.25,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Berdedikasi dan mengutamakan kepentingan organisasi", "score": 5.25, "max_score": 6.00 }
          ]
        },
        {
          "competency_id": "COMP-ADAPTIF",
          "competency_name": "Adaptif",
          "score": 4.65,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Terus berinovasi dan antusias menghadapi perubahan", "score": 4.65, "max_score": 6.00 }
          ]
        },
        {
          "competency_id": "COMP-KOLABORATIF",
          "competency_name": "Kolaboratif",
          "score": 5.30,
          "max_score": 6.00,
          "behavior_scores": [
            { "behavior_indicator": "Membangun kerja sama sinergis", "score": 5.45, "max_score": 6.00 },
            { "behavior_indicator": "Memberi kesempatan kepada berbagai pihak untuk berkontribusi", "score": 5.15, "max_score": 6.00 }
          ]
        }
      ],
      "channel_breakdown": [
        { "channel": "superior", "weight": 40, "raw_score": 5.29, "weighted_score": 2.12, "assessor_count": 1, "completion_rate": 1.0 },
        { "channel": "peer", "weight": 30, "raw_score": 5.05, "weighted_score": 1.52, "assessor_count": 3, "completion_rate": 1.0 },
        { "channel": "subordinate", "weight": 20, "raw_score": 5.36, "weighted_score": 1.07, "assessor_count": 2, "completion_rate": 1.0 },
        { "channel": "self", "weight": 10, "raw_score": 5.00, "weighted_score": 0.50, "assessor_count": 1, "completion_rate": 1.0 }
      ],
      "calculated_at": "2025-12-20T08:00:00Z",
      "validated_by": "ADM-001",
      "validated_at": "2025-12-22T10:00:00Z",
      "published_at": "2026-01-10T14:30:00Z"
    },
    {
      "id": "RES-002",
      "cycle_id": "CYC-003",
      "assessee_id": "EMP-20145",
      "overall_score": 4.82,
      "overall_max_score": 6.00,
      "status": "published",
      "competency_scores": [
        { "competency_id": "COMP-AMANAH", "competency_name": "Amanah", "score": 4.90, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Memenuhi janji dan komitmen", "score": 4.90, "max_score": 6.00 }] },
        { "competency_id": "COMP-KOMPETEN", "competency_name": "Kompeten", "score": 4.70, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Terus belajar dan mengembangkan kapabilitas", "score": 4.70, "max_score": 6.00 }] },
        { "competency_id": "COMP-HARMONIS", "competency_name": "Harmonis", "score": 5.10, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Saling peduli dan menghargai perbedaan", "score": 5.10, "max_score": 6.00 }] },
        { "competency_id": "COMP-LOYAL", "competency_name": "Loyal", "score": 4.80, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Berdedikasi dan mengutamakan kepentingan organisasi", "score": 4.80, "max_score": 6.00 }] },
        { "competency_id": "COMP-ADAPTIF", "competency_name": "Adaptif", "score": 4.40, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Terus berinovasi dan antusias menghadapi perubahan", "score": 4.40, "max_score": 6.00 }] },
        { "competency_id": "COMP-KOLABORATIF", "competency_name": "Kolaboratif", "score": 5.00, "max_score": 6.00, "behavior_scores": [{ "behavior_indicator": "Membangun kerja sama sinergis", "score": 5.10, "max_score": 6.00 }, { "behavior_indicator": "Memberi kesempatan kepada berbagai pihak untuk berkontribusi", "score": 4.90, "max_score": 6.00 }] }
      ],
      "channel_breakdown": [
        { "channel": "superior", "weight": 40, "raw_score": 4.86, "weighted_score": 1.94, "assessor_count": 1, "completion_rate": 1.0 },
        { "channel": "peer", "weight": 30, "raw_score": 4.71, "weighted_score": 1.41, "assessor_count": 3, "completion_rate": 1.0 },
        { "channel": "subordinate", "weight": 20, "raw_score": 5.00, "weighted_score": 1.00, "assessor_count": 2, "completion_rate": 1.0 },
        { "channel": "self", "weight": 10, "raw_score": 4.71, "weighted_score": 0.47, "assessor_count": 1, "completion_rate": 1.0 }
      ],
      "calculated_at": "2024-12-10T08:00:00Z",
      "validated_by": "ADM-001",
      "validated_at": "2024-12-15T10:00:00Z",
      "published_at": "2025-01-05T09:00:00Z"
    },
    {
      "id": "RES-003",
      "cycle_id": "CYC-002",
      "assessee_id": "EMP-20145",
      "overall_score": 0,
      "overall_max_score": 6.00,
      "status": "pending",
      "competency_scores": [],
      "channel_breakdown": [],
      "calculated_at": null,
      "validated_by": null,
      "validated_at": null,
      "published_at": null
    }
  ],
  "employees": [
    { "id": "EMP-20145", "nik": "20145", "name": "Siti Nurhaliza", "email": "siti.nurhaliza@sptp.co.id", "current_position_title": "Manager Operasional Pelabuhan", "organization_name": "Divisi Operasi - SPTP", "grade_jabatan": 18, "band_jabatan": "Madya" },
    { "id": "EMP-10032", "nik": "10032", "name": "Bambang Hartono", "email": "bambang.hartono@sptp.co.id", "current_position_title": "VP Operasi & Teknik", "organization_name": "Direktorat Operasi - SPTP", "grade_jabatan": 22, "band_jabatan": "Utama" },
    { "id": "EMP-20189", "nik": "20189", "name": "Dewi Ratnasari", "email": "dewi.ratnasari@sptp.co.id", "current_position_title": "Manager Perencanaan Strategis", "organization_name": "Divisi Perencanaan - SPTP", "grade_jabatan": 18, "band_jabatan": "Madya" },
    { "id": "EMP-20201", "nik": "20201", "name": "Agus Prasetyo", "email": "agus.prasetyo@sptp.co.id", "current_position_title": "Manager Keuangan", "organization_name": "Divisi Keuangan - SPTP", "grade_jabatan": 18, "band_jabatan": "Madya" },
    { "id": "EMP-20178", "nik": "20178", "name": "Rina Wijaya", "email": "rina.wijaya@sptp.co.id", "current_position_title": "Manager SDM", "organization_name": "Divisi SDM - SPTP", "grade_jabatan": 18, "band_jabatan": "Madya" },
    { "id": "EMP-30012", "nik": "30012", "name": "Fajar Nugroho", "email": "fajar.nugroho@sptp.co.id", "current_position_title": "Supervisor Lapangan", "organization_name": "Divisi Operasi - SPTP", "grade_jabatan": 14, "band_jabatan": "Muda" },
    { "id": "EMP-30045", "nik": "30045", "name": "Maya Putri", "email": "maya.putri@sptp.co.id", "current_position_title": "Supervisor Administrasi", "organization_name": "Divisi Operasi - SPTP", "grade_jabatan": 14, "band_jabatan": "Muda" },
    { "id": "ADM-001", "nik": "ADM001", "name": "System Admin HC", "email": "admin.hc@sptp.co.id", "current_position_title": "HC Admin", "organization_name": "HC Division - SPTP", "grade_jabatan": 16, "band_jabatan": "Madya" }
  ]
}
```

---

## Edge Cases Included

- **Cycle with null description** (CYC-003: archived cycle with no description)
- **Cycle with null result_valid_until** (CYC-002: active cycle, validity not yet set)
- **Assignment with manual override** (ASG-004: peer replaced due to cuti panjang, with override_by and override_reason)
- **Self-assessment assignment** (ASG-007, ASG-009: assessor_id = assessee_id)
- **Submission in_progress with partial answers** (SUB-004: 5/8 answered; SUB-005: 3/8 answered)
- **Submission with null submitted_at** (SUB-004, SUB-005: not yet submitted)
- **Answer with optional comment** (ANS-005, ANS-008: have comments; others null)
- **Result with pending status and empty scores** (RES-003: cycle still active, no calculation yet)
- **Result with published status and full competency breakdown** (RES-001: complete with channel weights)
- **Historical result for year-over-year comparison** (RES-001 vs RES-002: showing score improvement from 4.82 to 5.18)
- **Competency with multiple behavior indicators** (Kolaboratif has 2 sub-items in INS-001)
- **Mixed assignment statuses** across cycles (completed, notified, in_progress)
- **Persona acts as both assessee and assessor** (Siti is assessee in CYC-001/CYC-002, and assessor for EMP-20189 and EMP-10032)
- **Subordinate channel with all subordinates** (evaluator_count = -1 means all direct reports)