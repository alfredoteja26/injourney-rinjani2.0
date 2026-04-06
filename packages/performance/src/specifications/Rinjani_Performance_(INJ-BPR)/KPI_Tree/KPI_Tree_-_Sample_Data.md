## Sample Data: KPI Tree (SEC-KT)

**Module Code:** SEC-KT  

**Parent Product:** Rinjani Performance (INJ-BPR)

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **Assessment Year** | 2026 |
| **Company** | PT Aviasi Pariwisata Indonesia (Holding) |
| **Focus Unit** | Direktorat Human Capital |
| **View Perspective** | Dimas Sayyid (VP HC Strategy) |
| **Current Phase** | Check-In 1 Completed |

---

## 1. HC Strategy Branch - Full Tree Structure

```
📊 EBITDA Group (KPI Bersama) - Target: 2.5T

│   └─ Contribution: Cost Efficiency through HC Optimization

│

├── 📊 Human Capital Cost Efficiency (VP HC) - Target: 5% saving

│   │   Owner: Herdy Harman (Director HR & Digital)

│   │   Score: 3.75 🟢

│   │

│   ├── 📊 HC Strategy Excellence (VP HC Strategy) - Target: 95%

│   │   │   Owner: Dimas Sayyid (NIK: 260101)

│   │   │   Score: 3.82 🟢

│   │   │   Weight: 25%

│   │   │

│   │   ├── 📊 HC Strategy Document Completion - Target: 100%

│   │   │       Owner: Binavia Wardhani (NIK: 260102)

│   │   │       Score: 4.2 🟢 | Weight: 15%

│   │   │

│   │   ├── 📊 Talent Pipeline Ratio - Target: 1:3

│   │   │       Owner: Binavia Wardhani (NIK: 260102)

│   │   │       Score: 4.0 🟢 | Weight: 15%

│   │   │

│   │   ├── 📊 Organization Design Accuracy - Target: 95%

│   │   │       Owner: Binavia Wardhani (NIK: 260102)

│   │   │       Score: 3.6 🟢 | Weight: 10%

│   │   │

│   │   ├── 📊 Workforce Planning Accuracy - Target: 90%

│   │   │       Owner: Binavia Wardhani (NIK: 260102)

│   │   │       Score: 3.4 🟡 | Weight: 10%

│   │   │

│   │   └── 📊 HC Analytics Dashboard Adoption - Target: 80%

│   │           Owner: Binavia Wardhani (NIK: 260102)

│   │           Score: 3.2 🟡 | Weight: 5%

│   │

│   ├── 📊 HC Operations Excellence - Target: 90%

│   │   │   Owner: Fajar Nugraha (NIK: 260103)

│   │   │   Score: 3.65 🟢

│   │   │   Weight: 25%

│   │   │

│   │   ├── 📊 Time to Fill Position - Target: ≤45 days

│   │   │       Score: 3.5 🟢 | Weight: 15%

│   │   │

│   │   ├── 📊 Employee Turnover Rate - Target: ≤8%

│   │   │       Score: 3.8 🟢 | Weight: 15%

│   │   │

│   │   └── 📊 HR Service Level Agreement - Target: 95%

│   │           Score: 3.6 🟢 | Weight: 10%

│   │

│   └── 📊 HC Digital Transformation - Target: 85%

│       │   Owner: Sinta Maharani (NIK: 260104)

│       │   Score: 3.92 🟢

│       │   Weight: 25%

│       │

│       ├── 📊 HRIS System Uptime - Target: 99.5%

│       │       Score: 4.2 🟢 | Weight: 15%

│       │

│       ├── 📊 Digital Adoption Rate - Target: 80%

│       │       Score: 3.8 🟢 | Weight: 10%

│       │

│       └── 📊 Data Quality Index - Target: 95%

│               Score: 3.7 🟢 | Weight: 10%

│

└── 📊 Productivity Improvement (Other Units) - Target: 10%

Score: 3.68 🟢
```

---

## 2. Tree Node Data (JSON Format)

### Root Node: EBITDA Group

```json
{
  "tree_id": "TREE-2026-001",
  "root_node": {
    "kpi_id": "KPI-B-001",
    "title": "EBITDA Group",
    "type": "BERSAMA",
    "level": 0,
    "target": {
      "value": 2500000000000,
      "unit": "IDR"
    },
    "achievement": {
      "value": 2400000000000,
      "percentage": 96,
      "score": 3.84
    },
    "status": "on_track",
    "children_count": 5,
    "total_descendants": 89
  }
}
```

### VP HC Strategy Node (Dimas Sayyid's View)

```json
{
  "node": {
    "kpi_id": "KPI-U-HC-VP-001",
    "title": "HC Strategy Excellence",
    "type": "UNIT",
    "level": 2,
    "parent_kpi_id": "KPI-U-HC-DIR-001",
    "owner": {
      "nik": "260101",
      "name": "Dimas Sayyid",
      "position": "VP Human Capital Strategy"
    },
    "target": {
      "value": 95,
      "unit": "%"
    },
    "achievement": {
      "value": 91.2,
      "percentage": 96,
      "score": 3.82
    },
    "weight_in_parent": 25,
    "status": "on_track",
    "children": [
      {
        "kpi_id": "KPI-U-HC-GH-001",
        "title": "HC Strategy Document Completion",
        "owner_nik": "260102",
        "owner_name": "Binavia Wardhani",
        "score": 4.2,
        "weight": 15,
        "status": "on_track"
      },
      {
        "kpi_id": "KPI-U-HC-GH-002",
        "title": "Talent Pipeline Ratio",
        "owner_nik": "260102",
        "owner_name": "Binavia Wardhani",
        "score": 4.0,
        "weight": 15,
        "status": "on_track"
      },
      {
        "kpi_id": "KPI-U-HC-GH-003",
        "title": "Organization Design Accuracy",
        "owner_nik": "260102",
        "owner_name": "Binavia Wardhani",
        "score": 3.6,
        "weight": 10,
        "status": "on_track"
      },
      {
        "kpi_id": "KPI-U-HC-GH-004",
        "title": "Workforce Planning Accuracy",
        "owner_nik": "260102",
        "owner_name": "Binavia Wardhani",
        "score": 3.4,
        "weight": 10,
        "status": "at_risk"
      },
      {
        "kpi_id": "KPI-U-HC-GH-005",
        "title": "HC Analytics Dashboard Adoption",
        "owner_nik": "260102",
        "owner_name": "Binavia Wardhani",
        "score": 3.2,
        "weight": 5,
        "status": "at_risk"
      }
    ]
  }
}
```

---

## 3. Contribution Analysis

### Binavia Wardhani's Contribution to VP HC Strategy KPI

| KPI | Weight | Score | Weighted Score | Contribution % |
| --- | --- | --- | --- | --- |
| HC Strategy Document Completion | 15% | 4.2 | 0.63 | 33.2% |
| Talent Pipeline Ratio | 15% | 4.0 | 0.60 | 31.6% |
| Organization Design Accuracy | 10% | 3.6 | 0.36 | 18.9% |
| Workforce Planning Accuracy | 10% | 3.4 | 0.34 | 17.9% |
| HC Analytics Dashboard Adoption | 5% | 3.2 | 0.16 | 8.4% |
| **Total** | **55%** | - | **2.09** | **100%** |

**Calculated Score for Binavia's contribution:** 2.09 / 0.55 = **3.80**

---

## 4. Team Comparison View (Dimas' Direct Reports)

| Team Member | Position | KPI Count | Avg Score | Status | Trend |
| --- | --- | --- | --- | --- | --- |
| Sinta Maharani | GH HC Digital | 5 | 3.92 | 🟢 On Track | ↗ +0.15 |
| Binavia Wardhani | GH HC Strategy | 5 | 3.79 | 🟢 On Track | → +0.02 |
| Fajar Nugraha | GH HC Operations | 5 | 3.65 | 🟢 On Track | ↗ +0.12 |

---

## 5. Cascading Gap Analysis

### Unit: Direktorat Human Capital

| Status | Count | Percentage |
| --- | --- | --- |
| ✅ Fully Cascaded | 42 | 87.5% |
| ⚠️ Partially Cascaded | 4 | 8.3% |
| ❌ Not Cascaded | 2 | 4.2% |
| **Total KPI** | **48** | **100%** |

### Gap Details

```json
{
  "gaps": [
    {
      "kpi_id": "KPI-U-HC-006",
      "title": "Learning Investment ROI",
      "owner": "VP HC Strategy",
      "expected_children": 3,
      "actual_children": 0,
      "gap_reason": "New KPI - pending cascading"
    },
    {
      "kpi_id": "KPI-U-HC-007",
      "title": "Employer Branding Index",
      "owner": "VP HC Strategy",
      "expected_children": 2,
      "actual_children": 0,
      "gap_reason": "KPI approved late in Goal Setting"
    }
  ]
}
```