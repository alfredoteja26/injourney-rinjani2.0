## Sample Data: KPI Headquarter (SEC-HQ)

**Module Code:** SEC-HQ  

**Parent Product:** Rinjani Performance (INJ-BPR)

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **User Perspective** | HC Admin HO |
| **Company Scope** | All InJourney Group Companies |
| **Assessment Year** | 2026 |
| **Current Phase** | Check-In 1 Completed |
| **Report Date** | 7 January 2026 |

---

## 1. Band Jabatan Weight Configuration 2026

### InJourney Group Standard (Per Perdir API)

| Band Jabatan | Grade Range | Job Type | KPI Bersama | KPI Unit | Status |
| --- | --- | --- | --- | --- | --- |
| Utama | Grade 19-21 | Struktural | 50% | 50% | ✅ Active |
| Madya | Grade 16-18 | Struktural | 45% | 55% | ✅ Active |
| Muda | Grade 13-15 | Struktural | 40% | 60% | ✅ Active |
| Pratama A | Grade 10-12 | Struktural | 35% | 65% | ✅ Active |
| Pratama B | Grade 7-9 | Struktural | 30% | 70% | ✅ Active |
| General | Grade 1-6 | Non-Struktural | 0% | 100% | ✅ Active |

### Weight Configuration History

```json
{
  "configuration_id": "CFG-2026-001",
  "year": 2026,
  "effective_date": "2026-01-01",
  "approved_by": "Director HR & Digital",
  "approved_date": "2025-12-15",
  "version": "1.0",
  "bands": [
    {
      "band_jabatan": "Utama",
      "grade_min": 19,
      "grade_max": 21,
      "job_type": "STRUKTURAL",
      "kpi_bersama_weight": 50,
      "kpi_unit_weight": 50
    },
    {
      "band_jabatan": "Madya",
      "grade_min": 16,
      "grade_max": 18,
      "job_type": "STRUKTURAL",
      "kpi_bersama_weight": 45,
      "kpi_unit_weight": 55
    }
  ]
}
```

---

## 2. Schedule Configuration 2026

### Assessment Cycle Timeline

| Phase | Start Date | End Date | Duration | Status |
| --- | --- | --- | --- | --- |
| Goal Setting | 2026-01-01 | 2026-02-28 | 59 days | ✅ Completed |
| Check-In 1 | 2026-04-01 | 2026-04-30 | 30 days | ✅ Completed |
| Check-In 2 | 2026-07-01 | 2026-07-31 | 31 days | ⏳ Upcoming |
| Check-In 3 | 2026-10-01 | 2026-10-31 | 31 days | ⏳ Upcoming |
| Year-End Review | 2026-11-15 | 2026-12-31 | 47 days | ⏳ Upcoming |
| Calibration | 2027-01-05 | 2027-01-20 | 16 days | ⏳ Upcoming |

### Schedule Configuration JSON

```json
{
  "year": 2026,
  "schedules": [
    {
      "schedule_id": "SCH-2026-GS",
      "type": "GOAL_SETTING",
      "start_date": "2026-01-01",
      "end_date": "2026-02-28",
      "grace_period_days": 7,
      "auto_lock": true,
      "reminder_days": [14, 7, 3, 1],
      "status": "COMPLETED"
    },
    {
      "schedule_id": "SCH-2026-CI1",
      "type": "CHECK_IN",
      "check_in_number": 1,
      "start_date": "2026-04-01",
      "end_date": "2026-04-30",
      "grace_period_days": 5,
      "auto_lock": true,
      "reminder_days": [7, 3, 1],
      "status": "COMPLETED"
    },
    {
      "schedule_id": "SCH-2026-CI2",
      "type": "CHECK_IN",
      "check_in_number": 2,
      "start_date": "2026-07-01",
      "end_date": "2026-07-31",
      "grace_period_days": 5,
      "auto_lock": true,
      "reminder_days": [7, 3, 1],
      "status": "UPCOMING"
    }
  ]
}
```

---

## 3. Completion Metrics by Company

### Goal Setting Completion (Feb 2026)

| Company | Total Employees | Completed | Completion % | Status |
| --- | --- | --- | --- | --- |
| PT Aviasi Pariwisata Indonesia (Holding) | 150 | 147 | 98.0% | ✅ |
| PT Angkasa Pura I | 2,500 | 2,375 | 95.0% | ✅ |
| PT Angkasa Pura II | 2,800 | 2,576 | 92.0% | ⚠️ |
| PT TWC Borobudur | 450 | 396 | 88.0% | ⚠️ |
| PT Hotel Indonesia Natour | 320 | 288 | 90.0% | ✅ |
| PT Sarinah | 180 | 167 | 92.8% | ✅ |
| **InJourney Group Total** | **6,400** | **5,949** | **92.9%** | ✅ |

### Check-In 1 Completion (Apr 2026)

| Company | Total Employees | Completed | Completion % | Status |
| --- | --- | --- | --- | --- |
| PT Aviasi Pariwisata Indonesia (Holding) | 147 | 140 | 95.2% | ✅ |
| PT Angkasa Pura I | 2,375 | 1,900 | 80.0% | ⚠️ |
| PT Angkasa Pura II | 2,576 | 2,009 | 78.0% | ⚠️ |
| PT TWC Borobudur | 396 | 297 | 75.0% | ⚠️ |
| PT Hotel Indonesia Natour | 288 | 236 | 82.0% | ⚠️ |
| PT Sarinah | 167 | 142 | 85.0% | ✅ |
| **InJourney Group Total** | **5,949** | **4,724** | **79.4%** | ⚠️ |

---

## 4. Direktorat Human Capital Detail (Holding)

### Unit: Direktorat Human Capital

| Metric | Value |
| --- | --- |
| Total Employees | 12 |
| Goal Setting Completion | 100% |
| Check-In 1 Completion | 100% |
| Average PI Score | 3.79 |
| On Track KPIs | 87.5% |
| At Risk KPIs | 12.5% |

### Team Performance (VP HC Strategy)

| NIK | Name | Position | Band | KPI Count | PI Score | PR Rating |
| --- | --- | --- | --- | --- | --- | --- |
| 260101 | Dimas Sayyid | VP HC Strategy | Utama | 8 | 3.82 | Excellent |
| 260102 | Binavia Wardhani | GH HC Strategy | Madya | 8 | 3.79 | Excellent |
| 260103 | Fajar Nugraha | GH HC Operations | Madya | 8 | 3.65 | Excellent |
| 260104 | Sinta Maharani | GH HC Digital | Madya | 8 | 3.92 | Excellent |

---

## 5. Rating Distribution (Check-In 1 Projection)

### InJourney Group Overall

| Rating | Label | Count | Actual % | Target % | Variance |
| --- | --- | --- | --- | --- | --- |
| 5 | Outstanding | 237 | 5.0% | 5% | 0.0% |
| 4 | Excellent | 1,067 | 22.6% | 20% | +2.6% |
| 3 | Successful | 2,695 | 57.0% | 50% | +7.0% |
| 2 | Partially Successful | 617 | 13.1% | 20% | -6.9% |
| 1 | Unsuccessful | 108 | 2.3% | 5% | -2.7% |
| **Total** |  | **4,724** | **100%** | **100%** |  |

### Distribution Chart Data

```json
{
  "distribution": {
    "labels": ["1-Unsuccessful", "2-Partial", "3-Successful", "4-Excellent", "5-Outstanding"],
    "actual": [2.3, 13.1, 57.0, 22.6, 5.0],
    "target": [5, 20, 50, 20, 5],
    "colors": ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"]
  }
}
```

---

## 6. Alerts & Notifications

### Active Alerts

```json
{
  "alerts": [
    {
      "alert_id": "ALT-2026-001",
      "type": "COMPLETION_WARNING",
      "severity": "WARNING",
      "company": "PT TWC Borobudur",
      "message": "Check-In 1 completion below 80% threshold",
      "metric_value": 75,
      "threshold": 80,
      "created_date": "2026-04-25"
    },
    {
      "alert_id": "ALT-2026-002",
      "type": "RATING_DISTRIBUTION",
      "severity": "INFO",
      "company": "InJourney Group",
      "message": "Rating distribution variance exceeds 5% from target curve",
      "created_date": "2026-05-01"
    },
    {
      "alert_id": "ALT-2026-003",
      "type": "KPI_LIBRARY",
      "severity": "INFO",
      "message": "3 KPI submissions pending review",
      "created_date": "2026-01-07"
    }
  ]
}
```

---

## 7. Report Export Sample

### Executive Summary Report Data

```json
{
  "report": {
    "title": "Performance Management Executive Summary",
    "period": "Q1 2026",
    "generated_date": "2026-05-01",
    "generated_by": "HC Admin HO",
    "summary": {
      "total_employees": 6400,
      "goal_setting_completion": 92.9,
      "check_in_1_completion": 79.4,
      "average_pi_score": 3.45,
      "on_track_percentage": 74.8,
      "at_risk_percentage": 20.2,
      "behind_percentage": 5.0
    },
    "top_performers": [
      {"company": "PT API (Holding)", "pi_avg": 3.79},
      {"company": "PT AP I", "pi_avg": 3.52},
      {"company": "PT Sarinah", "pi_avg": 3.48}
    ],
    "requires_attention": [
      {"company": "PT TWC", "issue": "Low Check-In completion"},
      {"company": "PT AP II", "issue": "Below target completion rate"}
    ]
  }
}
```