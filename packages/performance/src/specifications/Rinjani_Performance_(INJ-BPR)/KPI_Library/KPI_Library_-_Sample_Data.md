## Sample Data: KPI Library (SEC-KL)

**Module Code:** SEC-KL  

**Parent Product:** Rinjani Performance (INJ-BPR)

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **Assessment Year** | 2026 |
| **Company** | PT Aviasi Pariwisata Indonesia (Holding) |
| **Total Library Items** | 156 KPI |
| **Published** | 142 KPI |
| **Under Review** | 14 KPI |

---

## 1. KPI Bersama Templates (Corporate-wide)

### Published KPI Bersama

| Code | Title | Unit | Polarity | Applicable Bands | Usage Count |
| --- | --- | --- | --- | --- | --- |
| LIB-B-001 | EBITDA Group | IDR (Trillion) | Higher | All | 2,450 |
| LIB-B-002 | Customer Satisfaction Index | Scale 1-5 | Higher | All | 2,450 |
| LIB-B-003 | ESG Rating | Rating A-F | Higher | Utama, Madya | 850 |
| LIB-B-004 | Revenue Growth | % | Higher | All | 2,100 |
| LIB-B-005 | Operating Margin | % | Higher | Utama, Madya | 920 |
| LIB-B-006 | Net Promoter Score | Score -100 to +100 | Higher | All | 1,800 |
| LIB-B-007 | Employee Engagement Index | % | Higher | All | 2,450 |
| LIB-B-008 | Human Capital Effectiveness Index | % | Higher | Utama, Madya | 450 |
| LIB-B-009 | Digital Transformation Index | % | Higher | Madya, Muda | 680 |
| LIB-B-010 | Safety Incident Rate | Per 1M hours | Lower | All | 1,950 |

---

## 2. KPI Unit Templates (Function-specific)

### Human Capital Function

| Code | Title | Unit | Polarity | Recommended Target | Usage |
| --- | --- | --- | --- | --- | --- |
| LIB-U-HC-001 | Employee Turnover Rate | % | Lower | ≤8% | 245 |
| LIB-U-HC-002 | Training Completion Rate | % | Higher | ≥95% | 312 |
| LIB-U-HC-003 | Talent Pipeline Ratio | Ratio | Higher | 1:3 | 89 |
| LIB-U-HC-004 | Time to Fill Position | Days | Lower | ≤45 days | 156 |
| LIB-U-HC-005 | HC Strategy Document Completion | % | Higher | 100% | 45 |
| LIB-U-HC-006 | Organization Design Accuracy | % | Higher | ≥90% | 67 |
| LIB-U-HC-007 | Workforce Planning Accuracy | % | Higher | ≥85% | 78 |
| LIB-U-HC-008 | HC Analytics Dashboard Adoption | % | Higher | ≥80% | 34 |
| LIB-U-HC-009 | Internal Mobility Rate | % | Higher | ≥15% | 112 |
| LIB-U-HC-010 | Performance Review Completion | % | Higher | 100% | 289 |

### Operations Function

| Code | Title | Unit | Polarity | Recommended Target | Usage |
| --- | --- | --- | --- | --- | --- |
| LIB-U-OPS-001 | On-Time Performance | % | Higher | ≥95% | 456 |
| LIB-U-OPS-002 | Terminal Cleanliness Index | % | Higher | ≥90% | 234 |
| LIB-U-OPS-003 | Baggage Handling Accuracy | % | Higher | ≥99.5% | 198 |
| LIB-U-OPS-004 | Passenger Processing Time | Minutes | Lower | ≤3 min | 167 |
| LIB-U-OPS-005 | Equipment Availability | % | Higher | ≥98% | 189 |

### Finance Function

| Code | Title | Unit | Polarity | Recommended Target | Usage |
| --- | --- | --- | --- | --- | --- |
| LIB-U-FIN-001 | Budget Compliance | % | Higher | ≥95% | 345 |
| LIB-U-FIN-002 | Collection Efficiency | % | Higher | ≥98% | 156 |
| LIB-U-FIN-003 | Financial Report Timeliness | Days | Lower | ≤5 days | 234 |
| LIB-U-FIN-004 | Cost per Transaction | IDR | Lower | Varies | 89 |

### IT Function

| Code | Title | Unit | Polarity | Recommended Target | Usage |
| --- | --- | --- | --- | --- | --- |
| LIB-U-IT-001 | System Uptime | % | Higher | ≥99.5% | 187 |
| LIB-U-IT-002 | Incident Resolution Time | Hours | Lower | ≤4 hours | 145 |
| LIB-U-IT-003 | User Satisfaction Score | Scale 1-5 | Higher | ≥4.0 | 123 |
| LIB-U-IT-004 | Digital Adoption Rate | % | Higher | ≥80% | 98 |

---

## 3. KPI Detail Example (HC Strategy Context)

### LIB-U-HC-003: Talent Pipeline Ratio

```json
{
  "library_item_id": "LIB-U-HC-003",
  "code": "KPI-LIB-2026-0089",
  "title": "Talent Pipeline Ratio",
  "description": "Rasio antara jumlah kandidat suksesor yang siap dengan jumlah posisi kritikal (Key Strategic Position). Mengukur kesiapan organisasi dalam succession planning.",
  "type": "UNIT",
  "recommended_target": "1:3",
  "target_unit": "Ratio",
  "polarity": "HIGHER_IS_BETTER",
  "monitoring_period": "SEMESTER",
  "formula": "Jumlah suksesor siap (Readiness 1-2 tahun) / Jumlah posisi KSP",
  "applicable_functions": ["Human Capital", "Talent Management"],
  "applicable_band_jabatan": ["Madya", "Muda"],
  "evidence_requirement": "Succession Planning Report, Talent Review Minutes",
  "tags": ["talent", "succession", "pipeline", "HR"],
  "usage_count": 89,
  "created_by": "HC Admin HO",
  "created_date": "2025-01-15",
  "status": "Published",
  "version": "1.0"
}
```

### LIB-U-HC-005: HC Strategy Document Completion

```json
{
  "library_item_id": "LIB-U-HC-005",
  "code": "KPI-LIB-2026-0092",
  "title": "HC Strategy Document Completion",
  "description": "Persentase penyelesaian dokumen strategi HC sesuai dengan roadmap yang telah ditetapkan. Mencakup Workforce Planning, Talent Strategy, Employee Engagement Plan, dan Organization Design Blueprint.",
  "type": "UNIT",
  "recommended_target": "100%",
  "target_unit": "%",
  "polarity": "HIGHER_IS_BETTER",
  "monitoring_period": "SEMESTER",
  "formula": "(Jumlah dokumen selesai / Total dokumen yang ditargetkan) × 100%",
  "applicable_functions": ["Human Capital", "Strategy"],
  "applicable_band_jabatan": ["Madya"],
  "evidence_requirement": "Strategy Document Sign-off, BOD Approval Letter",
  "tags": ["strategy", "document", "planning", "HR"],
  "usage_count": 45,
  "created_by": "Dimas Sayyid",
  "created_date": "2025-11-20",
  "status": "Published",
  "version": "1.0"
}
```

---

## 4. KPI Submission Queue (Under Review)

### Pending Submissions

| Submission ID | Title | Type | Submitted By | Submit Date | Status |
| --- | --- | --- | --- | --- | --- |
| SUB-2026-001 | HC Digital Transformation Readiness | Unit | Sinta Maharani | 2026-01-05 | In Review |
| SUB-2026-002 | Learning Investment ROI | Unit | Fajar Nugraha | 2026-01-06 | In Review |
| SUB-2026-003 | Employee Experience Score | Unit | Binavia Wardhani | 2026-01-07 | Submitted |

### Submission Detail Example

```json
{
  "submission_id": "SUB-2026-003",
  "title": "Employee Experience Score",
  "description": "Skor pengalaman karyawan yang diukur melalui survey komprehensif mencakup onboarding, development, recognition, dan work-life balance.",
  "type": "UNIT",
  "recommended_target": "4.2",
  "target_unit": "Scale 1-5",
  "polarity": "HIGHER_IS_BETTER",
  "monitoring_period": "SEMESTER",
  "formula": "Rata-rata skor dari 4 dimensi Employee Experience Survey",
  "applicable_functions": ["Human Capital", "All Functions"],
  "applicable_band_jabatan": ["Madya", "Muda", "Pratama A"],
  "evidence_requirement": "Employee Experience Survey Report",
  "submitted_by": {
    "nik": "260102",
    "name": "Binavia Wardhani",
    "position": "Group Head HC Strategy"
  },
  "submitted_date": "2026-01-07T09:30:00+07:00",
  "status": "SUBMITTED",
  "reviewer": null,
  "review_notes": null
}
```

---

## 5. Search & Filter Results Example

### Search Query: "talent" in HR Function

```json
{
  "query": "talent",
  "filters": {
    "type": "UNIT",
    "function": "Human Capital",
    "status": "Published"
  },
  "results": [
    {
      "library_item_id": "LIB-U-HC-003",
      "title": "Talent Pipeline Ratio",
      "usage_count": 89,
      "match_score": 0.95
    },
    {
      "library_item_id": "LIB-U-HC-009",
      "title": "Internal Mobility Rate",
      "usage_count": 112,
      "match_score": 0.72
    },
    {
      "library_item_id": "LIB-U-HC-002",
      "title": "Training Completion Rate",
      "usage_count": 312,
      "match_score": 0.65
    }
  ],
  "total_results": 3,
  "page": 1,
  "per_page": 10
}
```