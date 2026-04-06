## Sample Data: My Team KPI (SEC-MT)

**Prototype Persona:** Dimas Sayyid (VP Human Capital Strategy) viewing team

---

## 1. Supervisor Context

```json
{
  "employee_id": "EMP-260101",
  "nik": "260101",
  "name": "Dimas Sayyid",
  "email": "[dimas.sayyid@injourney.id](mailto:dimas.sayyid@injourney.id)",
  "position_id": "POS-HC-001",
  "position_name": "VP Human Capital Strategy",
  "org_unit": "Direktorat Human Capital",
  "company": "PT InJourney Airports (Holding)",
  "band_jabatan": "Utama",
  "job_type": "Struktural",
  "supervisor_nik": "260001",
  "supervisor_name": "Herdy Harman",
  "supervisor_position": "Direktur SDM dan Digital"
}
```

---

## 2. Direct Reports (Team Members)

| NIK | Name | Position | Band Jabatan | Goal Status | Check-In 1 | Q1 PI Score | YTD Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 260102 | **Binavia Wardhani** | GH HC Planning & Analytics | Madya | ✅ Approved | ✅ Done | **3.79** | 🟢 On Track |
| 260103 | **Fajar Nugraha** | GH HC Policy & Governance | Madya | ✅ Approved | ✅ Done | **3.65** | 🟢 On Track |
| 260104 | **Sinta Maharani** | GH Org Development | Madya | ✅ Approved | ✅ Done | **3.92** | 🟢 Exceeds |

---

## 3. Team Summary Dashboard

### 3.1 Team Metrics

```json
{
  "supervisor_nik": "260101",
  "year": 2026,
  "period": "Q1",
  "team_size": 3,
  "metrics": {
    "goal_setting_completion": "100%",
    "check_in_1_completion": "100%",
    "avg_pi_score": 3.79,
    "score_distribution": {
      "exceeds": 1,
      "on_track": 2,
      "needs_attention": 0,
      "at_risk": 0
    },
    "pending_approvals": 0,
    "upcoming_actions": 1
  }
}
```

### 3.2 Team Score Distribution

| Score Range | Rating | Count | Members |
| --- | --- | --- | --- |
| 4.50 - 5.00 | Outstanding | 0 | - |
| 3.50 - 4.49 | Excellent | 3 | Sinta (3.92), Binavia (3.79), Fajar (3.65) |
| 2.50 - 3.49 | Good | 0 | - |
| 1.50 - 2.49 | Needs Improvement | 0 | - |
| 1.00 - 1.49 | Unsuccessful | 0 | - |

---

## 4. Team Member KPI Details

### 4.1 Binavia Wardhani (NIK: 260102)

```json
{
  "nik": "260102",
  "name": "Binavia Wardhani",
  "position": "Group Head HC Planning & Analytics",
  "band_jabatan": "Madya",
  "kpi_summary": {
    "total_kpi": 8,
    "bersama_count": 3,
    "bersama_weight": "40%",
    "unit_count": 5,
    "unit_weight": "60%"
  },
  "q1_performance": {
    "bersama_score": 3.75,
    "unit_score": 3.82,
    "total_pi": 3.79,
    "rating": "Excellent"
  },
  "kpis_needing_attention": [
    {
      "kpi_id": "KPI-U-2026-005",
      "title": "HR Process Automation Rate",
      "target": "60%",
      "actual": "45%",
      "achievement": "75%",
      "issue": "Vendor integration delay"
    }
  ],
  "check_in_status": {
    "q1": "COMPLETED",
    "q2": "UPCOMING",
    "q3": "SCHEDULED"
  }
}
```

### 4.2 Fajar Nugraha (NIK: 260103)

```json
{
  "nik": "260103",
  "name": "Fajar Nugraha",
  "position": "Group Head HC Policy & Governance",
  "band_jabatan": "Madya",
  "kpi_summary": {
    "total_kpi": 7,
    "bersama_count": 3,
    "bersama_weight": "40%",
    "unit_count": 4,
    "unit_weight": "60%"
  },
  "q1_performance": {
    "bersama_score": 3.75,
    "unit_score": 3.58,
    "total_pi": 3.65,
    "rating": "Excellent"
  },
  "top_kpis": [
    {
      "kpi_id": "KPI-U-2026-101",
      "title": "Policy Compliance Rate",
      "target": "95%",
      "actual": "97%",
      "achievement": "102.1%"
    },
    {
      "kpi_id": "KPI-U-2026-102",
      "title": "Policy Update Cycle Time",
      "target": "30 days",
      "actual": "28 days",
      "achievement": "106.7%"
    }
  ]
}
```

### 4.3 Sinta Maharani (NIK: 260104)

```json
{
  "nik": "260104",
  "name": "Sinta Maharani",
  "position": "Group Head Org Development",
  "band_jabatan": "Madya",
  "kpi_summary": {
    "total_kpi": 8,
    "bersama_count": 3,
    "bersama_weight": "40%",
    "unit_count": 5,
    "unit_weight": "60%"
  },
  "q1_performance": {
    "bersama_score": 3.75,
    "unit_score": 4.03,
    "total_pi": 3.92,
    "rating": "Excellent"
  },
  "top_kpis": [
    {
      "kpi_id": "KPI-U-2026-201",
      "title": "Org Structure Optimization",
      "target": "3 units",
      "actual": "4 units",
      "achievement": "133.3%"
    },
    {
      "kpi_id": "KPI-U-2026-202",
      "title": "Position Mapping Completion",
      "target": "100%",
      "actual": "100%",
      "achievement": "100%"
    }
  ]
}
```

---

## 5. Cascading Data (VP → Group Heads)

### 5.1 Dimas's KPI Unit Portfolio (Source for Cascading)

| KPI ID | Title | Target | Cascaded To | Method |
| --- | --- | --- | --- | --- |
| KPI-U-VP-001 | HC Digital Transformation | 100% | Binavia | Direct |
| KPI-U-VP-002 | Workforce Optimization | ≥90% | Binavia, Sinta | Split |
| KPI-U-VP-003 | HC Cost Management | ≤5% | Binavia | Indirect |
| KPI-U-VP-004 | HC Policy Excellence | 100% | Fajar | Direct |
| KPI-U-VP-005 | Organization Effectiveness | Level 4 | Sinta | Direct |

### 5.2 Cascading Record

```json
{
  "cascade_id": "CAS-2026-VP-001",
  "source_kpi_id": "KPI-U-VP-001",
  "source_title": "HC Digital Transformation",
  "source_owner_nik": "260101",
  "cascaded_items": [
    {
      "target_nik": "260102",
      "target_name": "Binavia Wardhani",
      "derived_kpi_id": "KPI-U-2026-001",
      "derived_title": "HC Analytics Dashboard Delivery",
      "weight_allocation": 15,
      "method": "DIRECT",
      "contribution_type": "FULL",
      "cascaded_at": "2026-01-05T09:00:00Z"
    }
  ],
  "total_weight_distributed": 15,
  "status": "ACTIVE"
}
```

---

## 6. Approval Queue (Current)

| Request ID | Employee | Type | Description | Submitted | Status | Action |
| --- | --- | --- | --- | --- | --- | --- |
| *No pending approvals at this time* |  |  |  |  |  |  |

### 6.1 Recent Approvals (Last 30 days)

| Request ID | Employee | Type | Status | Processed |
| --- | --- | --- | --- | --- |
| REQ-2026-015 | Binavia Wardhani | Check-In 1 Submission | ✅ Acknowledged | 2026-04-09 |
| REQ-2026-014 | Fajar Nugraha | Check-In 1 Submission | ✅ Acknowledged | 2026-04-08 |
| REQ-2026-013 | Sinta Maharani | Check-In 1 Submission | ✅ Acknowledged | 2026-04-07 |

---

## 7. Team Check-In Management

### 7.1 Check-In 1 (Q1) Summary

| Member | Scheduled | Completed | Overall Status | Key Actions |
| --- | --- | --- | --- | --- |
| Binavia Wardhani | 2026-04-10 | 2026-04-08 | On Track | Accelerate HR automation |
| Fajar Nugraha | 2026-04-10 | 2026-04-08 | On Track | Continue policy digitization |
| Sinta Maharani | 2026-04-10 | 2026-04-07 | Exceeds | Share best practices to team |

### 7.2 Upcoming Check-In 2 (Q2) Schedule

```json
{
  "check_in_period": "Q2",
  "check_in_number": 2,
  "window_start": "2026-07-01",
  "window_end": "2026-07-15",
  "scheduled_sessions": [
    {
      "employee_nik": "260102",
      "employee_name": "Binavia Wardhani",
      "scheduled_date": "2026-07-08",
      "scheduled_time": "10:00",
      "meeting_room": "Meeting Room HC-01",
      "status": "SCHEDULED"
    },
    {
      "employee_nik": "260103",
      "employee_name": "Fajar Nugraha",
      "scheduled_date": "2026-07-09",
      "scheduled_time": "14:00",
      "meeting_room": "Meeting Room HC-01",
      "status": "SCHEDULED"
    },
    {
      "employee_nik": "260104",
      "employee_name": "Sinta Maharani",
      "scheduled_date": "2026-07-10",
      "scheduled_time": "09:00",
      "meeting_room": "Meeting Room HC-01",
      "status": "SCHEDULED"
    }
  ]
}
```

---

## 8. Manager Notes & Insights

```json
{
  "supervisor_nik": "260101",
  "year": 2026,
  "period": "Q1",
  "team_insights": {
    "strengths": [
      "All team members completed goal setting on time",
      "High engagement in check-in discussions",
      "Sinta's org development initiatives exceeding targets"
    ],
    "concerns": [
      "Binavia's HR automation project needs vendor support",
      "Cross-functional dependencies with IT need closer coordination"
    ],
    "focus_areas_q2": [
      "HR automation acceleration - weekly sync with IT",
      "Prepare mid-year review documentation",
      "Succession planning for critical positions"
    ]
  },
  "private_notes": "Consider Sinta for stretch assignment in Q3. Binavia needs coaching on stakeholder management.",
  "updated_at": "2026-04-10T16:00:00Z"
}
```