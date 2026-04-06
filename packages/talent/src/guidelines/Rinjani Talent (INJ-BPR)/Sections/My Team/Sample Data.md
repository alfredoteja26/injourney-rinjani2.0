# My Team - Sample Data

## JSON Data

```json
{
  "_meta": {
    "models": {
      "currentUser": "Line Manager yang sedang login, memiliki multiple assignments",
      "assignments": "Daftar assignment aktif dari currentUser (Definitif, Project Assignment, Talent Mobility)",
      "subordinates": "Bawahan langsung pada assignment yang dipilih, dengan summary talent data",
      "talentPoolCandidates": "Status 9-Box classification terbaru per bawahan",
      "eqsScores": "EQS score per bawahan untuk posisi definitif masing-masing",
      "eqsComponents": "Breakdown 6 komponen EQS per bawahan",
      "idpRecords": "Status IDP aktif per bawahan",
      "careerAspirationSummary": "Ringkasan jumlah aspirasi per bawahan dari semua sumber",
      "assessorAssignments": "360 Assessment assignments yang pending untuk Line Manager sebagai assessor",
      "assessmentResults": "Skor assessment terbaru per bawahan",
      "applications": "Job tender applications aktif per bawahan",
      "actionItems": "Aggregated action items per kategori untuk Dashboard",
      "backlogItems": "Daftar kronologis semua outstanding action items",
      "talentPoolPeriods": "Periode talent pool untuk 9-Box trend comparison",
      "teamInsights": "Pre-calculated analytics data untuk Team Insights tab"
    },
    "relationships": [
      "assignments.user_id references currentUser.id",
      "subordinates filtered by assignments[selected].position_id via ReportingLine",
      "talentPoolCandidates.employee_id references subordinates[].employee_id",
      "eqsScores.employee_id references subordinates[].employee_id; eqsScores.target_position_id = subordinate's definitive position",
      "eqsComponents.eqs_score_id references eqsScores[].id",
      "idpRecords.employee_id references subordinates[].employee_id",
      "careerAspirationSummary.employee_id references subordinates[].employee_id",
      "assessorAssignments.assessor_id = currentUser.id; assessee_id references subordinates[].employee_id",
      "assessmentResults.assessee_id references subordinates[].employee_id",
      "applications.employee_id references subordinates[].employee_id",
      "actionItems derived from idpRecords, careerAspirationSummary, assessorAssignments, subordinates flags",
      "backlogItems flattened from all actionItems with timestamps",
      "teamInsights aggregated from talentPoolCandidates, eqsScores, idpRecords, careerAspirationSummary"
    ],
    "source": "Schemas defined in Rinjani Talent Data Model"
  },

  "currentUser": {
    "id": "EMP-10001",
    "nik": "INJ-2018-0247",
    "name": "Ratna Kusumawati",
    "email": "ratna.kusumawati@injourney.id",
    "position_title": "VP Human Capital Business Partner",
    "grade_jabatan": 22,
    "band_jabatan": "VP",
    "organization_name": "Direktorat SDM & Digital",
    "company_name": "PT InJourney Wahana Mandiri",
    "is_line_manager": true,
    "assignment_count": 3
  },

  "assignments": [
    {
      "id": "ASGN-DEF-001",
      "user_id": "EMP-10001",
      "position_id": "POS-VP-HCBP",
      "position_title": "VP Human Capital Business Partner",
      "assignment_type": "definitif",
      "label": "Definitif",
      "subordinate_count": 8,
      "is_primary": true,
      "effective_from": "2023-03-01",
      "effective_to": null
    },
    {
      "id": "ASGN-PRJ-001",
      "user_id": "EMP-10001",
      "position_id": "POS-PRJ-RINJANI",
      "position_title": "Project Lead - Rinjani 2.0 Migration",
      "assignment_type": "project_assignment",
      "label": "Project Assignment",
      "subordinate_count": 4,
      "is_primary": false,
      "effective_from": "2025-09-01",
      "effective_to": "2026-08-31"
    },
    {
      "id": "ASGN-MOB-001",
      "user_id": "EMP-10001",
      "position_id": "POS-MOB-ILCS",
      "position_title": "Acting GM HC - PT ILCS",
      "assignment_type": "talent_mobility",
      "label": "Talent Mobility",
      "subordinate_count": 3,
      "is_primary": false,
      "effective_from": "2026-01-15",
      "effective_to": "2026-07-14"
    }
  ],

  "subordinates": [
    {
      "employee_id": "EMP-20001",
      "nik": "INJ-2019-0412",
      "name": "Bayu Aditya Pratama",
      "photo_url": "/avatars/bayu-aditya.jpg",
      "position_title": "Department Head HCBP - IAS",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. HCBP IAS",
      "company_name": "PT Aviasi Pariwisata Indonesia (Persero)",
      "hire_date": "2019-06-15",
      "definitive_position_id": "POS-DH-HCBP-IAS",
      "assignment_context": "definitif",
      "talent_cluster": "9box_promotable",
      "eqs_score": 81.20,
      "eqs_band": "qualified",
      "talent_pool_status": "active",
      "risk_profile": "low_risk",
      "is_flagged": false,
      "flag_reason": null
    },
    {
      "employee_id": "EMP-20002",
      "nik": "INJ-2017-0189",
      "name": "Siti Nurhaliza Putri",
      "photo_url": "/avatars/siti-nurhaliza.jpg",
      "position_title": "Department Head HCBP - API",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. HCBP API",
      "company_name": "PT Angkasa Pura Indonesia (Persero)",
      "hire_date": "2017-03-01",
      "definitive_position_id": "POS-DH-HCBP-API",
      "assignment_context": "definitif",
      "talent_cluster": "9box_high_potential",
      "eqs_score": 88.75,
      "eqs_band": "highly_qualified",
      "talent_pool_status": "active",
      "risk_profile": "flight_risk",
      "is_flagged": true,
      "flag_reason": "flight_risk"
    },
    {
      "employee_id": "EMP-20003",
      "nik": "INJ-2020-0533",
      "name": "Reza Mahendra",
      "photo_url": "/avatars/reza-mahendra.jpg",
      "position_title": "Department Head HCBP - TWC",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. HCBP TWC",
      "company_name": "PT TWC Borobudur, Prambanan & Ratu Boko",
      "hire_date": "2020-08-01",
      "definitive_position_id": "POS-DH-HCBP-TWC",
      "assignment_context": "definitif",
      "talent_cluster": "9box_solid_contributor",
      "eqs_score": 72.40,
      "eqs_band": "qualified",
      "talent_pool_status": "active",
      "risk_profile": "low_risk",
      "is_flagged": false,
      "flag_reason": null
    },
    {
      "employee_id": "EMP-20004",
      "nik": "INJ-2021-0678",
      "name": "Dian Permatasari",
      "photo_url": "/avatars/dian-permata.jpg",
      "position_title": "Department Head HCBP - ITDC",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. HCBP ITDC",
      "company_name": "PT Pengembangan Pariwisata Indonesia (Persero)",
      "hire_date": "2021-01-15",
      "definitive_position_id": "POS-DH-HCBP-ITDC",
      "assignment_context": "definitif",
      "talent_cluster": "9box_sleeping_tiger",
      "eqs_score": 65.30,
      "eqs_band": "needs_development",
      "talent_pool_status": "active",
      "risk_profile": "medium_risk",
      "is_flagged": true,
      "flag_reason": "underperforming"
    },
    {
      "employee_id": "EMP-20005",
      "nik": "INJ-2018-0301",
      "name": "Ahmad Fauzi Rahman",
      "photo_url": "/avatars/ahmad-fauzi.jpg",
      "position_title": "Department Head Talent Operations",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. Talent Operations",
      "company_name": "PT InJourney Wahana Mandiri",
      "hire_date": "2018-04-01",
      "definitive_position_id": "POS-DH-TALOPS",
      "assignment_context": "definitif",
      "talent_cluster": "9box_promotable",
      "eqs_score": 79.85,
      "eqs_band": "qualified",
      "talent_pool_status": "active",
      "risk_profile": "low_risk",
      "is_flagged": false,
      "flag_reason": null
    },
    {
      "employee_id": "EMP-20006",
      "nik": "INJ-2022-0891",
      "name": "Putri Wulandari",
      "photo_url": "/avatars/putri-wulan.jpg",
      "position_title": "Section Head HC Analytics",
      "grade_jabatan": 17,
      "band_jabatan": "SH",
      "organization_name": "Sect. HC Analytics",
      "company_name": "PT InJourney Wahana Mandiri",
      "hire_date": "2022-07-01",
      "definitive_position_id": "POS-SH-HCANALYTICS",
      "assignment_context": "definitif",
      "talent_cluster": null,
      "eqs_score": null,
      "eqs_band": null,
      "talent_pool_status": null,
      "risk_profile": null,
      "is_flagged": false,
      "flag_reason": null
    },
    {
      "employee_id": "EMP-20007",
      "nik": "INJ-2016-0102",
      "name": "Hendra Wijaya",
      "photo_url": "/avatars/hendra-wijaya.jpg",
      "position_title": "Department Head HCBP - Sarinah",
      "grade_jabatan": 19,
      "band_jabatan": "DH",
      "organization_name": "Dept. HCBP Sarinah",
      "company_name": "PT Sarinah (Persero)",
      "hire_date": "2016-11-01",
      "definitive_position_id": "POS-DH-HCBP-SAR",
      "assignment_context": "definitif",
      "talent_cluster": "9box_unfit",
      "eqs_score": 45.10,
      "eqs_band": "not_recommended",
      "talent_pool_status": "active",
      "risk_profile": "high_risk",
      "is_flagged": true,
      "flag_reason": "at_risk"
    },
    {
      "employee_id": "EMP-20008",
      "nik": "INJ-2023-1045",
      "name": "Nadia Rahma Azzahra",
      "photo_url": "/avatars/nadia-rahma.jpg",
      "position_title": "Section Head HC Compliance",
      "grade_jabatan": 17,
      "band_jabatan": "SH",
      "organization_name": "Sect. HC Compliance",
      "company_name": "PT InJourney Wahana Mandiri",
      "hire_date": "2023-02-01",
      "definitive_position_id": "POS-SH-HCCOMPL",
      "assignment_context": "definitif",
      "talent_cluster": "9box_solid_contributor",
      "eqs_score": 71.00,
      "eqs_band": "qualified",
      "talent_pool_status": "active",
      "risk_profile": "low_risk",
      "is_flagged": false,
      "flag_reason": null
    }
  ],

  "talentPoolCandidates": [
    {
      "id": "TPC-001",
      "employee_id": "EMP-20001",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_promotable",
      "is_top_talent": false,
      "risk_profile": "low_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-002",
      "employee_id": "EMP-20002",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_high_potential",
      "is_top_talent": true,
      "top_talent_designation_date": "2025-12-15",
      "risk_profile": "flight_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-003",
      "employee_id": "EMP-20003",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_solid_contributor",
      "is_top_talent": false,
      "risk_profile": "low_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-004",
      "employee_id": "EMP-20004",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_sleeping_tiger",
      "is_top_talent": false,
      "risk_profile": "medium_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-005",
      "employee_id": "EMP-20005",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_promotable",
      "is_top_talent": false,
      "risk_profile": "low_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-006",
      "employee_id": "EMP-20007",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_unfit",
      "is_top_talent": false,
      "risk_profile": "high_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    },
    {
      "id": "TPC-007",
      "employee_id": "EMP-20008",
      "period_id": "TPP-2026",
      "talent_cluster": "9box_solid_contributor",
      "is_top_talent": false,
      "risk_profile": "low_risk",
      "updated_at": "2026-01-20T10:00:00Z"
    }
  ],

  "eqsScores": [
    {
      "id": "EQS-2001",
      "employee_id": "EMP-20001",
      "target_position_id": "POS-DH-HCBP-IAS",
      "period_id": "TPP-2026",
      "total_score": 81.20,
      "eqs_band": "qualified",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2002",
      "employee_id": "EMP-20002",
      "target_position_id": "POS-DH-HCBP-API",
      "period_id": "TPP-2026",
      "total_score": 88.75,
      "eqs_band": "highly_qualified",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2003",
      "employee_id": "EMP-20003",
      "target_position_id": "POS-DH-HCBP-TWC",
      "period_id": "TPP-2026",
      "total_score": 72.40,
      "eqs_band": "qualified",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2004",
      "employee_id": "EMP-20004",
      "target_position_id": "POS-DH-HCBP-ITDC",
      "period_id": "TPP-2026",
      "total_score": 65.30,
      "eqs_band": "needs_development",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2005",
      "employee_id": "EMP-20005",
      "target_position_id": "POS-DH-TALOPS",
      "period_id": "TPP-2026",
      "total_score": 79.85,
      "eqs_band": "qualified",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2007",
      "employee_id": "EMP-20007",
      "target_position_id": "POS-DH-HCBP-SAR",
      "period_id": "TPP-2026",
      "total_score": 45.10,
      "eqs_band": "not_recommended",
      "is_eligible": false,
      "eligibility_reason": "Sedang menjalani hukuman disiplin",
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    },
    {
      "id": "EQS-2008",
      "employee_id": "EMP-20008",
      "target_position_id": "POS-SH-HCCOMPL",
      "period_id": "TPP-2026",
      "total_score": 71.00,
      "eqs_band": "qualified",
      "is_eligible": true,
      "formula_version": "v2.1",
      "calculated_at": "2026-01-15T08:00:00Z"
    }
  ],

  "eqsComponents": [
    {
      "eqs_score_id": "EQS-2002",
      "_employee_name": "Siti Nurhaliza Putri (highest EQS - sample breakdown)",
      "components": [
        { "component_type": "performance", "weight": 20, "raw_value": 92.0, "weighted_value": 18.40 },
        { "component_type": "competency", "weight": 20, "raw_value": 88.5, "weighted_value": 17.70 },
        { "component_type": "experience", "weight": 20, "raw_value": 85.0, "weighted_value": 17.00 },
        { "component_type": "aspiration", "weight": 10, "raw_value": 95.0, "weighted_value": 9.50 },
        { "component_type": "training", "weight": 20, "raw_value": 90.0, "weighted_value": 18.00 },
        { "component_type": "tes", "weight": 10, "raw_value": 81.5, "weighted_value": 8.15 }
      ]
    },
    {
      "eqs_score_id": "EQS-2007",
      "_employee_name": "Hendra Wijaya (lowest EQS - not eligible)",
      "components": [
        { "component_type": "performance", "weight": 20, "raw_value": 55.0, "weighted_value": 11.00 },
        { "component_type": "competency", "weight": 20, "raw_value": 42.0, "weighted_value": 8.40 },
        { "component_type": "experience", "weight": 20, "raw_value": 60.0, "weighted_value": 12.00 },
        { "component_type": "aspiration", "weight": 10, "raw_value": 30.0, "weighted_value": 3.00 },
        { "component_type": "training", "weight": 20, "raw_value": 35.5, "weighted_value": 7.10 },
        { "component_type": "tes", "weight": 10, "raw_value": 36.0, "weighted_value": 3.60 }
      ]
    },
    {
      "eqs_score_id": "EQS-2004",
      "_employee_name": "Dian Permatasari (needs_development band)",
      "components": [
        { "component_type": "performance", "weight": 20, "raw_value": 68.0, "weighted_value": 13.60 },
        { "component_type": "competency", "weight": 20, "raw_value": 62.0, "weighted_value": 12.40 },
        { "component_type": "experience", "weight": 20, "raw_value": 55.0, "weighted_value": 11.00 },
        { "component_type": "aspiration", "weight": 10, "raw_value": 80.0, "weighted_value": 8.00 },
        { "component_type": "training", "weight": 20, "raw_value": 72.0, "weighted_value": 14.40 },
        { "component_type": "tes", "weight": 10, "raw_value": 59.0, "weighted_value": 5.90 }
      ]
    }
  ],

  "idpRecords": [
    {
      "id": "IDP-R-001",
      "employee_id": "EMP-20001",
      "cycle_id": "IDP-2026",
      "status": "approved",
      "total_hours": 48,
      "completed_hours": 24,
      "activity_count": 5,
      "completed_activities": 2,
      "submitted_at": "2026-01-10T09:00:00Z"
    },
    {
      "id": "IDP-R-002",
      "employee_id": "EMP-20002",
      "cycle_id": "IDP-2026",
      "status": "approved",
      "total_hours": 52,
      "completed_hours": 40,
      "activity_count": 6,
      "completed_activities": 5,
      "submitted_at": "2026-01-08T08:30:00Z"
    },
    {
      "id": "IDP-R-003",
      "employee_id": "EMP-20003",
      "cycle_id": "IDP-2026",
      "status": "pending_approval",
      "total_hours": 40,
      "completed_hours": 0,
      "activity_count": 4,
      "completed_activities": 0,
      "submitted_at": "2026-02-05T14:00:00Z"
    },
    {
      "id": "IDP-R-004",
      "employee_id": "EMP-20004",
      "cycle_id": "IDP-2026",
      "status": "revision_requested",
      "total_hours": 30,
      "completed_hours": 0,
      "activity_count": 3,
      "completed_activities": 0,
      "submitted_at": "2026-01-28T11:00:00Z"
    },
    {
      "id": "IDP-R-005",
      "employee_id": "EMP-20005",
      "cycle_id": "IDP-2026",
      "status": "approved",
      "total_hours": 44,
      "completed_hours": 12,
      "activity_count": 4,
      "completed_activities": 1,
      "submitted_at": "2026-01-12T10:00:00Z"
    },
    {
      "id": "IDP-R-006",
      "employee_id": "EMP-20006",
      "cycle_id": "IDP-2026",
      "status": "draft",
      "total_hours": 0,
      "completed_hours": 0,
      "activity_count": 0,
      "completed_activities": 0,
      "submitted_at": null
    },
    {
      "id": "IDP-R-007",
      "employee_id": "EMP-20007",
      "cycle_id": "IDP-2026",
      "status": "pending_approval",
      "total_hours": 42,
      "completed_hours": 0,
      "activity_count": 4,
      "completed_activities": 0,
      "submitted_at": "2026-02-07T09:30:00Z"
    },
    {
      "id": "IDP-R-008",
      "employee_id": "EMP-20008",
      "cycle_id": "IDP-2026",
      "status": "approved",
      "total_hours": 46,
      "completed_hours": 32,
      "activity_count": 5,
      "completed_activities": 3,
      "submitted_at": "2026-01-09T08:00:00Z"
    }
  ],

  "careerAspirationSummary": [
    {
      "employee_id": "EMP-20001",
      "total_aspirations": 5,
      "by_source": { "individual": 3, "supervisor": 1, "job_holder": 1, "unit": 0 },
      "has_aspiration": true,
      "pending_review_count": 0
    },
    {
      "employee_id": "EMP-20002",
      "total_aspirations": 7,
      "by_source": { "individual": 3, "supervisor": 2, "job_holder": 1, "unit": 1 },
      "has_aspiration": true,
      "pending_review_count": 0
    },
    {
      "employee_id": "EMP-20003",
      "total_aspirations": 2,
      "by_source": { "individual": 2, "supervisor": 0, "job_holder": 0, "unit": 0 },
      "has_aspiration": true,
      "pending_review_count": 1
    },
    {
      "employee_id": "EMP-20004",
      "total_aspirations": 3,
      "by_source": { "individual": 1, "supervisor": 1, "job_holder": 0, "unit": 1 },
      "has_aspiration": true,
      "pending_review_count": 1
    },
    {
      "employee_id": "EMP-20005",
      "total_aspirations": 4,
      "by_source": { "individual": 2, "supervisor": 1, "job_holder": 1, "unit": 0 },
      "has_aspiration": true,
      "pending_review_count": 0
    },
    {
      "employee_id": "EMP-20006",
      "total_aspirations": 0,
      "by_source": { "individual": 0, "supervisor": 0, "job_holder": 0, "unit": 0 },
      "has_aspiration": false,
      "pending_review_count": 0
    },
    {
      "employee_id": "EMP-20007",
      "total_aspirations": 1,
      "by_source": { "individual": 1, "supervisor": 0, "job_holder": 0, "unit": 0 },
      "has_aspiration": true,
      "pending_review_count": 0
    },
    {
      "employee_id": "EMP-20008",
      "total_aspirations": 3,
      "by_source": { "individual": 2, "supervisor": 1, "job_holder": 0, "unit": 0 },
      "has_aspiration": true,
      "pending_review_count": 0
    }
  ],

  "assessorAssignments": [
    {
      "id": "AA-LM-001",
      "cycle_id": "AC-2026-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2026",
      "assessee_id": "EMP-20001",
      "assessee_name": "Bayu Aditya Pratama",
      "assessor_id": "EMP-10001",
      "channel": "superior",
      "status": "notified",
      "assigned_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z"
    },
    {
      "id": "AA-LM-002",
      "cycle_id": "AC-2026-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2026",
      "assessee_id": "EMP-20002",
      "assessee_name": "Siti Nurhaliza Putri",
      "assessor_id": "EMP-10001",
      "channel": "superior",
      "status": "in_progress",
      "assigned_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z"
    },
    {
      "id": "AA-LM-003",
      "cycle_id": "AC-2026-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2026",
      "assessee_id": "EMP-20003",
      "assessee_name": "Reza Mahendra",
      "assessor_id": "EMP-10001",
      "channel": "superior",
      "status": "notified",
      "assigned_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z"
    }
  ],

  "assessmentResults": [
    {
      "id": "AR-001",
      "cycle_id": "AC-2025-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2025",
      "assessee_id": "EMP-20001",
      "overall_score": 4.2,
      "overall_max_score": 6.0,
      "status": "published",
      "published_at": "2025-12-20T10:00:00Z"
    },
    {
      "id": "AR-002",
      "cycle_id": "AC-2025-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2025",
      "assessee_id": "EMP-20002",
      "overall_score": 5.1,
      "overall_max_score": 6.0,
      "status": "published",
      "published_at": "2025-12-20T10:00:00Z"
    },
    {
      "id": "AR-003",
      "cycle_id": "AC-2025-01",
      "cycle_name": "Penilaian Kinerja Berbasis Perilaku 2025",
      "assessee_id": "EMP-20005",
      "overall_score": 3.8,
      "overall_max_score": 6.0,
      "status": "published",
      "published_at": "2025-12-20T10:00:00Z"
    }
  ],

  "applications": [
    {
      "id": "APP-SUB-001",
      "employee_id": "EMP-20002",
      "position_title": "General Manager Human Capital - Holding",
      "movement_type": "PROMOSI",
      "status": "shortlisted",
      "submitted_at": "2026-01-20T09:00:00Z"
    },
    {
      "id": "APP-SUB-002",
      "employee_id": "EMP-20004",
      "position_title": "Department Head HCBP - HIN",
      "movement_type": "ROTASI",
      "status": "submitted",
      "submitted_at": "2026-02-01T10:00:00Z"
    }
  ],

  "actionItems": {
    "idp_pending_approval": {
      "count": 2,
      "items": [
        {
          "id": "ACT-IDP-001",
          "employee_id": "EMP-20003",
          "employee_name": "Reza Mahendra",
          "description": "IDP 2026 menunggu approval",
          "submitted_at": "2026-02-05T14:00:00Z",
          "urgency": "normal",
          "deep_link": "/my-development/team?action=approve&id=IDP-R-003"
        },
        {
          "id": "ACT-IDP-002",
          "employee_id": "EMP-20007",
          "employee_name": "Hendra Wijaya",
          "description": "IDP 2026 menunggu approval",
          "submitted_at": "2026-02-07T09:30:00Z",
          "urgency": "normal",
          "deep_link": "/my-development/team?action=approve&id=IDP-R-007"
        }
      ]
    },
    "aspiration_pending_review": {
      "count": 2,
      "items": [
        {
          "id": "ACT-ASP-001",
          "employee_id": "EMP-20003",
          "employee_name": "Reza Mahendra",
          "description": "Aspirasi individual belum di-review untuk Team Aspiration",
          "submitted_at": "2026-01-30T10:00:00Z",
          "urgency": "normal",
          "deep_link": "/career-path/team-aspiration?employee=EMP-20003"
        },
        {
          "id": "ACT-ASP-002",
          "employee_id": "EMP-20004",
          "employee_name": "Dian Permatasari",
          "description": "Aspirasi individual belum di-review untuk Team Aspiration",
          "submitted_at": "2026-01-28T15:00:00Z",
          "urgency": "normal",
          "deep_link": "/career-path/team-aspiration?employee=EMP-20004"
        }
      ]
    },
    "assessment_pending": {
      "count": 3,
      "items": [
        {
          "id": "ACT-ASM-001",
          "employee_id": "EMP-20001",
          "employee_name": "Bayu Aditya Pratama",
          "description": "Penilaian Kinerja Berbasis Perilaku 2026 - belum dimulai",
          "deadline": "2026-02-28T23:59:59Z",
          "urgency": "normal",
          "deep_link": "/360-assessment/assigned?id=AA-LM-001"
        },
        {
          "id": "ACT-ASM-002",
          "employee_id": "EMP-20002",
          "employee_name": "Siti Nurhaliza Putri",
          "description": "Penilaian Kinerja Berbasis Perilaku 2026 - sedang diisi",
          "deadline": "2026-02-28T23:59:59Z",
          "urgency": "normal",
          "deep_link": "/360-assessment/assigned?id=AA-LM-002"
        },
        {
          "id": "ACT-ASM-003",
          "employee_id": "EMP-20003",
          "employee_name": "Reza Mahendra",
          "description": "Penilaian Kinerja Berbasis Perilaku 2026 - belum dimulai",
          "deadline": "2026-02-28T23:59:59Z",
          "urgency": "normal",
          "deep_link": "/360-assessment/assigned?id=AA-LM-003"
        }
      ]
    },
    "team_members_flagged": {
      "count": 3,
      "items": [
        {
          "id": "ACT-FLAG-001",
          "employee_id": "EMP-20002",
          "employee_name": "Siti Nurhaliza Putri",
          "description": "Flight risk - Top Talent dengan EQS 88.75, perlu perhatian retensi",
          "flag_reason": "flight_risk",
          "urgency": "high",
          "deep_link": "/my-team/profile?employee=EMP-20002"
        },
        {
          "id": "ACT-FLAG-002",
          "employee_id": "EMP-20004",
          "employee_name": "Dian Permatasari",
          "description": "Underperforming - Sleeping Tiger, EQS 65.30 (Needs Development)",
          "flag_reason": "underperforming",
          "urgency": "medium",
          "deep_link": "/my-team/profile?employee=EMP-20004"
        },
        {
          "id": "ACT-FLAG-003",
          "employee_id": "EMP-20007",
          "employee_name": "Hendra Wijaya",
          "description": "At-risk - 9-Box Unfit, EQS 45.10, sedang menjalani hukuman disiplin",
          "flag_reason": "at_risk",
          "urgency": "high",
          "deep_link": "/my-team/profile?employee=EMP-20007"
        }
      ]
    }
  },

  "backlogItems": [
    {
      "id": "BLG-001",
      "type": "aspiration_pending_review",
      "employee_id": "EMP-20004",
      "employee_name": "Dian Permatasari",
      "description": "Aspirasi individual belum di-review untuk Team Aspiration",
      "created_at": "2026-01-28T15:00:00Z",
      "deadline": null,
      "urgency": "normal",
      "deep_link": "/career-path/team-aspiration?employee=EMP-20004"
    },
    {
      "id": "BLG-002",
      "type": "aspiration_pending_review",
      "employee_id": "EMP-20003",
      "employee_name": "Reza Mahendra",
      "description": "Aspirasi individual belum di-review untuk Team Aspiration",
      "created_at": "2026-01-30T10:00:00Z",
      "deadline": null,
      "urgency": "normal",
      "deep_link": "/career-path/team-aspiration?employee=EMP-20003"
    },
    {
      "id": "BLG-003",
      "type": "assessment_pending",
      "employee_id": "EMP-20001",
      "employee_name": "Bayu Aditya Pratama",
      "description": "Penilaian Kinerja Berbasis Perilaku 2026 - belum dimulai",
      "created_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z",
      "urgency": "normal",
      "deep_link": "/360-assessment/assigned?id=AA-LM-001"
    },
    {
      "id": "BLG-004",
      "type": "assessment_pending",
      "employee_id": "EMP-20002",
      "employee_name": "Siti Nurhaliza Putri",
      "description": "Penilaian Kinerja Berbasis Perilaku 2026 - sedang diisi",
      "created_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z",
      "urgency": "normal",
      "deep_link": "/360-assessment/assigned?id=AA-LM-002"
    },
    {
      "id": "BLG-005",
      "type": "assessment_pending",
      "employee_id": "EMP-20003",
      "employee_name": "Reza Mahendra",
      "description": "Penilaian Kinerja Berbasis Perilaku 2026 - belum dimulai",
      "created_at": "2026-01-25T08:00:00Z",
      "deadline": "2026-02-28T23:59:59Z",
      "urgency": "normal",
      "deep_link": "/360-assessment/assigned?id=AA-LM-003"
    },
    {
      "id": "BLG-006",
      "type": "idp_pending_approval",
      "employee_id": "EMP-20003",
      "employee_name": "Reza Mahendra",
      "description": "IDP 2026 menunggu approval",
      "created_at": "2026-02-05T14:00:00Z",
      "deadline": "2026-02-20T23:59:59Z",
      "urgency": "normal",
      "deep_link": "/my-development/team?action=approve&id=IDP-R-003"
    },
    {
      "id": "BLG-007",
      "type": "team_members_flagged",
      "employee_id": "EMP-20002",
      "employee_name": "Siti Nurhaliza Putri",
      "description": "Flight risk - Top Talent, perlu perhatian retensi",
      "created_at": "2026-01-20T10:00:00Z",
      "deadline": null,
      "urgency": "high",
      "deep_link": "/my-team/profile?employee=EMP-20002"
    },
    {
      "id": "BLG-008",
      "type": "team_members_flagged",
      "employee_id": "EMP-20007",
      "employee_name": "Hendra Wijaya",
      "description": "At-risk - 9-Box Unfit, sedang hukuman disiplin",
      "created_at": "2026-01-20T10:00:00Z",
      "deadline": null,
      "urgency": "high",
      "deep_link": "/my-team/profile?employee=EMP-20007"
    },
    {
      "id": "BLG-009",
      "type": "idp_pending_approval",
      "employee_id": "EMP-20007",
      "employee_name": "Hendra Wijaya",
      "description": "IDP 2026 menunggu approval",
      "created_at": "2026-02-07T09:30:00Z",
      "deadline": "2026-02-20T23:59:59Z",
      "urgency": "normal",
      "deep_link": "/my-development/team?action=approve&id=IDP-R-007"
    },
    {
      "id": "BLG-010",
      "type": "team_members_flagged",
      "employee_id": "EMP-20004",
      "employee_name": "Dian Permatasari",
      "description": "Underperforming - Sleeping Tiger, EQS Needs Development",
      "created_at": "2026-01-20T10:00:00Z",
      "deadline": null,
      "urgency": "medium",
      "deep_link": "/my-team/profile?employee=EMP-20004"
    }
  ],

  "talentPoolPeriods": [
    {
      "id": "TPP-2025",
      "name": "Talent Pool 2025",
      "year": 2025,
      "status": "closed",
      "nine_box_distribution": {
        "9box_high_potential": 1,
        "9box_promotable": 1,
        "9box_solid_contributor": 3,
        "9box_sleeping_tiger": 1,
        "9box_unfit": 0
      }
    },
    {
      "id": "TPP-2026",
      "name": "Talent Pool 2026",
      "year": 2026,
      "status": "active",
      "nine_box_distribution": {
        "9box_high_potential": 1,
        "9box_promotable": 2,
        "9box_solid_contributor": 2,
        "9box_sleeping_tiger": 1,
        "9box_unfit": 1
      }
    }
  ],

  "teamInsights": {
    "position_context": "Posisi Definitif",
    "total_subordinates": 8,
    "nine_box_distribution": {
      "current_period": "TPP-2026",
      "classified_count": 7,
      "unclassified_count": 1,
      "distribution": {
        "9box_high_potential": 1,
        "9box_promotable": 2,
        "9box_solid_contributor": 2,
        "9box_sleeping_tiger": 1,
        "9box_unfit": 1
      },
      "trend_vs_previous": {
        "9box_high_potential": 0,
        "9box_promotable": 1,
        "9box_solid_contributor": -1,
        "9box_sleeping_tiger": 0,
        "9box_unfit": 1
      }
    },
    "eqs_distribution": {
      "calculated_count": 7,
      "not_calculated_count": 1,
      "average_score": 71.94,
      "by_band": {
        "highly_qualified": { "count": 1, "percentage": 14.3 },
        "qualified": { "count": 4, "percentage": 57.1 },
        "needs_development": { "count": 1, "percentage": 14.3 },
        "not_recommended": { "count": 1, "percentage": 14.3 }
      },
      "min_score": { "value": 45.10, "employee_name": "Hendra Wijaya" },
      "max_score": { "value": 88.75, "employee_name": "Siti Nurhaliza Putri" }
    },
    "idp_completion": {
      "total_subordinates": 8,
      "by_status": {
        "approved": 4,
        "pending_approval": 2,
        "revision_requested": 1,
        "draft": 1
      },
      "completion_rate": 50.0,
      "average_hours_planned": 37.75,
      "average_hours_completed": 13.50,
      "hours_completion_rate": 35.8
    },
    "aspiration_coverage": {
      "total_subordinates": 8,
      "with_aspiration": 7,
      "without_aspiration": 1,
      "coverage_rate": 87.5,
      "pending_review": 2
    }
  }
}
```

## Edge Cases Included

1. **Subordinate with null 9-Box and EQS** - EMP-20006 (Putri Wulandari): baru bergabung, belum terklasifikasi, talentPoolCandidate dan eqsScore = null
2. **Subordinate with not_recommended EQS and not eligible** - EMP-20007 (Hendra Wijaya): EQS 45.10, sedang hukuman disiplin, is_eligible = false
3. **Flight risk Top Talent** - EMP-20002 (Siti Nurhaliza): highest EQS (88.75) tetapi flight_risk, memerlukan perhatian retensi
4. **Sleeping Tiger with needs_development** - EMP-20004 (Dian Permatasari): high potential tapi underperforming, EQS 65.30
5. **IDP in draft status** - EMP-20006: IDP masih draft, 0 hours, 0 activities
6. **IDP revision_requested** - EMP-20004: IDP di-revisi karena jam kurang dari minimum (30 < 40)
7. **No aspiration at all** - EMP-20006: 0 total aspirations dari semua sumber
8. **Multiple assignment types** - currentUser memiliki 3 assignments: Definitif (8 bawahan), Project Assignment (4), Talent Mobility (3)
9. **Assessment in_progress vs notified** - AA-LM-002 sedang diisi, AA-LM-001 dan AA-LM-003 belum dimulai
10. **Subordinate with active job application** - EMP-20002 (shortlisted untuk promosi), EMP-20004 (submitted untuk rotasi)
11. **Backlog with mixed urgency** - high (flight_risk, at_risk), medium (underperforming), normal (IDP, aspiration, assessment)
12. **9-Box trend with negative movement** - solid_contributor turun 1 dari 2025 ke 2026, unfit naik 1
13. **EQS not calculated** - 1 dari 8 bawahan belum punya EQS score
14. **Single assignment user scenario** - Position Selector hidden (documented in meta, actual data shows 3 assignments for testing)
15. **Team Insights with incomplete data** - aspiration coverage 87.5% (1 tanpa aspirasi), IDP completion 50% (4 approved dari 8)