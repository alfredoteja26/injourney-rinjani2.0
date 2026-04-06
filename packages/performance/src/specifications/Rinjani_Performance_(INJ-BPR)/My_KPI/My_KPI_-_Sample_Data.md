## Sample Data: My KPI (SEC-MK)

**Prototype Persona:** Binavia Wardhani (Group Head HC Planning & Analytics)

---

## 1. Employee Context

```json
{
  "employee_id": "EMP-260102",
  "nik": "260102",
  "name": "Binavia Wardhani",
  "email": "[binavia.wardhani@injourney.id](mailto:binavia.wardhani@injourney.id)",
  "position_id": "POS-HC-002",
  "position_name": "Group Head HC Planning & Analytics",
  "org_unit": "Direktorat Human Capital",
  "company": "PT InJourney Airports (Holding)",
  "band_jabatan": "Madya",
  "job_type": "Struktural",
  "supervisor_nik": "260101",
  "supervisor_name": "Dimas Sayyid"
}
```

---

## 2. KPI Portfolio 2026

### 2.1 Portfolio Summary

| KPI Type | Weight | Count | Q1 Score | Status |
| --- | --- | --- | --- | --- |
| **KPI Bersama** | 40% | 3 items | 3.75 | ✅ Approved |
| **KPI Unit** | 60% | 5 items | 3.82 | ✅ Approved |
| **Total** | **100%** | **8 items** | **3.79** | - |

### 2.2 KPI Bersama (40%)

| KPI ID | Title | Target | Unit | Bobot | Q1 Actual | Q1 Achieve | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| KPI-B-2026-001 | EBITDA Consolidated InJourney Group | 15.5 T | IDR | 15% | 3.8 T | 98% | On Track |
| KPI-B-2026-002 | Employee Engagement Score | 4.2 | Scale 1-5 | 15% | 4.1 | 97.6% | On Track |
| KPI-B-2026-003 | Human Capital Maturity Index | Level 4 | Level 1-5 | 10% | Level 3.5 | 87.5% | Needs Attention |

### 2.3 KPI Unit (60%)

| KPI ID | Title | Target | Unit | Bobot | Q1 Actual | Q1 Achieve | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| KPI-U-2026-001 | HC Analytics Dashboard Delivery | 100% | % | 15% | 85% | 85% | On Track |
| KPI-U-2026-002 | Workforce Planning Accuracy | ≥90% | % | 15% | 92% | 102.2% | Exceeds |
| KPI-U-2026-003 | HC Budget Variance | ≤5% | % | 10% | 3.2% | 136% | Exceeds |
| KPI-U-2026-004 | Strategic HC Initiative Completion | 4 initiatives | Count | 10% | 1 initiative | 100% | On Track |
| KPI-U-2026-005 | HR Process Automation Rate | 60% | % | 10% | 45% | 75% | Needs Attention |

---

## 3. KPI Item Detail (Sample)

```json
{
  "kpi_item_id": "KPI-U-2026-001",
  "title": "HC Analytics Dashboard Delivery",
  "description": "Persentase penyelesaian pengembangan dashboard HC Analytics untuk mendukung decision making berbasis data di tingkat Holding dan Member Company.",
  "type": "UNIT",
  "owner_type": "POSITION",
  "position_id": "POS-HC-002",
  "target_value": 100,
  "target_unit": "%",
  "polarity": "HIGHER_IS_BETTER",
  "monitoring_frequency": "QUARTERLY",
  "weight": 15,
  "parent_kpi_id": "KPI-U-VP-001",
  "parent_title": "HC Digital Transformation",
  "cascading_method": "DIRECT",
  "evidence_requirement": "Dashboard deployment report, user adoption metrics",
  "measurement_formula": "(Completed modules / Total planned modules) × 100",
  "year": 2026,
  "status": "APPROVED",
  "approved_by": "260101",
  "approved_at": "2026-01-15T10:30:00Z"
}
```

---

## 4. Planning Phase Data (Goal Setting - Jan 2026)

### 4.1 Goal Setting Timeline

```json
{
  "goal_setting_id": "GS-2026-260102",
  "employee_nik": "260102",
  "year": 2026,
  "status": "COMPLETED",
  "timeline": {
    "draft_submitted": "2026-01-08T09:00:00Z",
    "supervisor_review": "2026-01-10T14:00:00Z",
    "revision_requested": null,
    "final_approved": "2026-01-15T10:30:00Z"
  },
  "total_kpi_count": 8,
  "bersama_weight": 40,
  "unit_weight": 60,
  "validation_status": "VALID"
}
```

### 4.2 Cascading Received (from Dimas Sayyid)

| Parent KPI | Cascaded KPI | Method | Weight | Date |
| --- | --- | --- | --- | --- |
| HC Digital Transformation (VP) | HC Analytics Dashboard Delivery | Direct | 15% | 2026-01-05 |
| Workforce Optimization (VP) | Workforce Planning Accuracy | Direct | 15% | 2026-01-05 |
| HC Cost Management (VP) | HC Budget Variance | Indirect | 10% | 2026-01-06 |

---

## 5. Monitoring Phase Data

### 5.1 Check-In Schedule 2026

| Check-In | Period | Scheduled | Actual | Status |
| --- | --- | --- | --- | --- |
| Check-In 1 | Q1 | 2026-04-10 | 2026-04-08 | ✅ Completed |
| Check-In 2 | Q2 | 2026-07-10 | - | 🔄 Upcoming |
| Check-In 3 | Q3 | 2026-10-10 | - | ⏳ Scheduled |

### 5.2 Check-In 1 Record (Q1 2026) - Completed

```json
{
  "check_in_id": "CI-2026-260102-01",
  "employee_nik": "260102",
  "supervisor_nik": "260101",
  "year": 2026,
  "check_in_number": 1,
  "period": "Q1",
  "scheduled_date": "2026-04-10",
  "actual_date": "2026-04-08",
  "status": "COMPLETED",
  "discussion_summary": {
    "employee_highlights": "Dashboard HC Analytics sudah mencapai 85% completion dengan 3 modul utama live (Headcount, Turnover, Recruitment). Workforce Planning akurasi melebihi target di 92%. Budget variance terkendali di 3.2%.",
    "employee_challenges": "HR Process Automation masih di 45% karena keterlambatan vendor integration. Perlu akselerasi di Q2.",
    "supervisor_feedback": "Progres sangat baik untuk Q1. Untuk automation, prioritaskan modul payroll integration dulu. Koordinasi dengan IT untuk resource tambahan.",
    "action_items": [
      "Escalate vendor issue ke Procurement (Due: 15 Apr)",
      "Weekly sync dengan IT untuk automation project (Start: 10 Apr)",
      "Prepare Q2 dashboard enhancement roadmap (Due: 30 Apr)"
    ]
  },
  "overall_assessment": "ON_TRACK",
  "next_focus_areas": ["HR Automation acceleration", "Dashboard Phase 2 modules"],
  "submitted_at": "2026-04-08T16:30:00Z",
  "acknowledged_at": "2026-04-09T09:15:00Z"
}
```

### 5.3 Quarterly Achievement Trend

```json
{
  "employee_nik": "260102",
  "year": 2026,
  "quarterly_scores": [
    {
      "period": "Q1",
      "bersama_score": 3.75,
      "unit_score": 3.82,
      "total_pi_score": 3.79,
      "performance_rating": "Excellent",
      "status": "FINALIZED"
    },
    {
      "period": "Q2",
      "bersama_score": null,
      "unit_score": null,
      "total_pi_score": null,
      "performance_rating": null,
      "status": "IN_PROGRESS"
    }
  ],
  "ytd_score": 3.79,
  "ytd_trend": "STABLE"
}
```

---

## 6. KPI Realization Log (Q1 Detail)

| KPI ID | Jan | Feb | Mar | Q1 Avg | YTD |
| --- | --- | --- | --- | --- | --- |
| KPI-U-2026-001 (Dashboard) | 25% | 55% | 85% | 85% | 85% |
| KPI-U-2026-002 (WFP Accuracy) | 90% | 93% | 92% | 92% | 92% |
| KPI-U-2026-003 (Budget Var) | 2.8% | 3.5% | 3.2% | 3.2% | 3.2% |
| KPI-U-2026-004 (Initiatives) | 0 | 0 | 1 | 1 | 1 |
| KPI-U-2026-005 (Automation) | 38% | 42% | 45% | 45% | 45% |

---

## 7. Evidence Attachments (Sample)

```json
{
  "evidence_id": "EVD-2026-001",
  "kpi_item_id": "KPI-U-2026-001",
  "period": "Q1",
  "attachments": [
    {
      "file_name": "HC_Dashboard_Deployment_Report_Q1.pdf",
      "file_type": "PDF",
      "uploaded_at": "2026-04-05T14:00:00Z",
      "uploaded_by": "260102"
    },
    {
      "file_name": "User_Adoption_Metrics_Mar2026.xlsx",
      "file_type": "Excel",
      "uploaded_at": "2026-04-05T14:05:00Z",
      "uploaded_by": "260102"
    }
  ],
  "verification_status": "VERIFIED",
  "verified_by": "260101",
  "verified_at": "2026-04-06T10:00:00Z"
}
```