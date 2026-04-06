# Section "Insights" - My Profile

## Overview
Section **Insights** di halaman My Profile adalah dashboard komprehensif yang menampilkan analisis kinerja, potensi, dan perkembangan karir karyawan secara mendalam. Section ini memberikan wawasan strategis untuk talent management dan career planning.

---

## 📊 Komponen Utama

### 1. **Riwayat Kinerja (Tahunan)**
**Deskripsi:** Menampilkan historical performance data dari tahun ke tahun, diurutkan dari tahun terbaru.

**Data yang Ditampilkan:**
- **Period Year** - Tahun periode penilaian
- **Assessment Date** - Tanggal pelaksanaan penilaian
- **Performance Score** - Skor kinerja numerik (contoh: 85.5)
- **Performance Rating** - Rating kategorikal (contoh: "EXCELLENT", "GOOD", "SATISFACTORY")
- **% Pencapaian KPI** - Persentase pencapaian Key Performance Indicators

**Format Tampilan:**
```
┌─────────────────────────────────────┐
│ Tahun 2025                          │
│ Tanggal: 15 Januari 2026           │
│                                     │
│ Score: 85.5    Rating: EXCELLENT   │
│ % Pencapaian KPI: 92%              │
└─────────────────────────────────────┘
```

**Insight Badge:** Ditampilkan dengan badge purple "Insight" untuk highlight data penting.

---

### 2. **Nine Box Grid**
**Deskripsi:** Visualisasi matriks 3x3 yang menunjukkan posisi talent berdasarkan dua dimensi:
- **X-Axis (Performance):** Skor kinerja aktual
- **Y-Axis (Capacity/Potential):** Potensi pengembangan

**9 Kategori Nine Box:**
1. **Top Left:** Low Performance, High Potential (Emerging Talent)
2. **Top Center:** Medium Performance, High Potential (Growth Potential)
3. **Top Right:** High Performance, High Potential (Top Talent) ⭐
4. **Middle Left:** Low Performance, Medium Potential (Development Need)
5. **Middle Center:** Medium Performance, Medium Potential (Core Employee)
6. **Middle Right:** High Performance, Medium Potential (Solid Performer)
7. **Bottom Left:** Low Performance, Low Potential (Critical Concern)
8. **Bottom Center:** Medium Performance, Low Potential (Moderate Contributor)
9. **Bottom Right:** High Performance, Low Potential (Strong Specialist)

**Komponen Visual:**
- Grid interaktif dengan warna gradient
- Marker posisi karyawan saat ini
- Label sumbu untuk clarity
- Tooltip dengan detail kategori

**Data Input:**
```typescript
{
  performance_axis_score: 85,  // Range: 0-100
  capacity_axis_score: 90      // Range: 0-100
}
```

---

### 3. **Talent Pool**
**Deskripsi:** Informasi mengenai status karyawan dalam talent pool organization.

**Data yang Ditampilkan:**
- **Ranking** - Peringkat dalam talent pool (contoh: "Top 10%")
- **Pool Status** - Status kategori (contoh: "HIGH POTENTIAL", "KEY TALENT")
- **Top Talent Flag** - Indikator apakah termasuk top talent (Yes/No)
- **Tanggal Entry** - Tanggal masuk ke talent pool

**Format Tampilan:**
```
┌─────────────────────────────────────┐
│ Rank: Top 10%                       │
│ HIGH POTENTIAL                      │
│                                     │
│ Top Talent: Yes                    │
│ Tanggal Masuk: 10 Maret 2024      │
└─────────────────────────────────────┘
```

**Visual Indicator:** Badge purple "Insight" untuk highlight status elite.

---

### 4. **EQS Score (Employee Quality Score)**
**Deskripsi:** Skor komprehensif yang mengukur kualitas overall employee berdasarkan 4 komponen utama.

**Total EQS Score:** Angka aggregate dari 0-100 (contoh: 85.83)

**4 Komponen EQS:**

#### a. **Kinerja Component** (Performance)
- Mengukur hasil kerja dan pencapaian target
- Bobot: ~30-35% dari total score
- Contoh: 85%

#### b. **Kompetensi Component** (Competency)
- Mengukur hard skills dan technical capabilities
- Bobot: ~25-30% dari total score
- Contoh: 82%

#### c. **Pengalaman Component** (Experience)
- Mengukur pengalaman kerja, tenure, dan exposure
- Bobot: ~20-25% dari total score
- Contoh: 88%

#### d. **Aspirasi Component** (Aspiration)
- Mengukur career aspiration, growth mindset, dan ambition
- Bobot: ~15-20% dari total score
- Contoh: 87%

**Metadata:**
- **Period** - Periode penilaian (contoh: "Q4 2025")
- **Assessment Date** - Tanggal assessment terakhir

**Format Tampilan:**
```
┌─────────────────────────────────────┐
│ EQS Score                           │
│ Periode: Q4 2025                    │
│                                     │
│ 85.83                [Insight]      │
│ Total Score                         │
│                                     │
│ Kinerja: 85%      Kompetensi: 82%  │
│ Pengalaman: 88%   Aspirasi: 87%    │
└─────────────────────────────────────┘
```

**Visual Enhancement:**
- **Grafik Radar/Spider Chart** untuk visualisasi 4 komponen
- **Bar Chart horizontal** untuk perbandingan antar komponen
- **Color-coded indicators** untuk setiap komponen

---

### 5. **Aspirasi Karir (Career Aspiration)**
**Deskripsi:** Dokumentasi aspirasi karir karyawan, baik dari individu maupun rekomendasi atasan.

**2 Sumber Aspirasi:**

#### a. **Aspirasi Individu** (Individual Aspiration)
- Input dari karyawan sendiri tentang career goal
- Self-declared career path preference

#### b. **Saran Atasan** (Supervisor Recommendation)
- Rekomendasi career path dari manager/supervisor
- Strategic talent placement suggestion

**Data yang Ditampilkan:**
- **Aspiration Source** - Individu atau Atasan
- **Target Position ID** - Kode posisi yang diaspirasi (contoh: "MGR-001")
- **Target Job Family** - Job family tujuan (contoh: "Human Capital Management")
- **Aspiration Date** - Tanggal aspirasi didokumentasikan
- **Aspiration Notes** - Catatan detail tentang aspirasi

**Format Tampilan:**
```
┌─────────────────────────────────────┐
│ Aspirasi Individu                   │
│ 15 Januari 2026                     │
│                                     │
│ Target Posisi (ID): MGR-HCM-001    │
│ Target Job Family: HCM Leadership   │
│ Catatan: Ingin mengembangkan        │
│ expertise di strategic HR planning  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Saran Atasan                        │
│ 20 Januari 2026                     │
│                                     │
│ Target Posisi (ID): DIR-HCM-001    │
│ Target Job Family: HCM Executive    │
│ Catatan: High potential untuk role  │
│ director dengan training tambahan   │
└─────────────────────────────────────┘
```

---

### 6. **Learning Agility**
**Deskripsi:** Assessment kemampuan karyawan untuk belajar dari pengalaman dan menerapkan pembelajaran ke situasi baru.

**Total Score:** Aggregate dari 4 dimensi agility (Range: 0-100)

**4 Dimensi Learning Agility:**

#### a. **Mental Agility**
- Kemampuan berpikir kritis dan problem solving
- Comfort dengan complexity dan ambiguity
- Innovation dan creative thinking
- Contoh score: 85

#### b. **People Agility**
- Kemampuan bekerja dengan orang yang berbeda
- Social intelligence dan emotional awareness
- Influence dan collaboration skills
- Contoh score: 88

#### c. **Change Agility**
- Adaptability terhadap perubahan
- Resilience dan flexibility
- Comfort dengan uncertainty
- Contoh score: 82

#### d. **Results Agility**
- Drive untuk mencapai hasil
- Delivery under pressure
- Resourcefulness dan problem solving
- Contoh score: 90

**Metadata:**
- **Assessment Period** - Periode assessment (contoh: "2025")
- **Assessment Method** - Metode penilaian (contoh: "360 Feedback", "Assessment Center")

**Format Tampilan:**
```
┌─────────────────────────────────────┐
│ Learning Agility                    │
│ Total Score: 86                     │
│ Periode: 2025                       │
│                                     │
│ Mental Agility: 85                  │
│ People Agility: 88                  │
│ Change Agility: 82                  │
│ Results Agility: 90                 │
└─────────────────────────────────────┘
```

---

## 🎯 Use Cases

### 1. **Talent Review Meetings**
- Manager dapat melihat comprehensive view tentang employee performance
- Data untuk succession planning dan talent pipeline
- Input untuk promotion/development decisions

### 2. **Career Development Discussions**
- Employee dan manager dapat align career aspirations
- Identify development areas (melalui Nine Box dan Learning Agility)
- Create targeted development plans

### 3. **Compensation Review**
- EQS Score sebagai basis untuk merit increase
- Performance history untuk bonus calculation
- Talent pool status untuk special recognition

### 4. **Succession Planning**
- Nine Box Grid untuk identify successors
- Learning Agility untuk assess readiness
- Career Aspiration untuk align dengan organizational needs

---

## 🔐 Data Privacy & Access Control

**Access Levels:**
1. **Employee** - Dapat melihat data pribadi mereka sendiri
2. **Manager** - Dapat melihat data direct reports
3. **HR Team** - Full access untuk talent management
4. **Executive** - Aggregated views dan strategic insights

**Data Sensitivity:**
- **High Sensitivity:** Nine Box classification, Talent Pool ranking
- **Medium Sensitivity:** Performance scores, EQS components
- **Low Sensitivity:** Learning history, aspirations

---

## 📈 Key Performance Indicators (KPIs) Tracked

1. **Performance Trend** - Year-over-year improvement
2. **EQS Score Stability** - Consistency across quarters
3. **Learning Agility Growth** - Development over time
4. **Career Aspiration Alignment** - Match dengan organizational needs
5. **Nine Box Movement** - Progress trajectory

---

## 🎨 Design Principles

1. **Data Visualization First** - Charts dan graphs untuk easy comprehension
2. **Progressive Disclosure** - Summary view dengan drill-down capability
3. **Color-Coded Indicators** - Quick visual assessment
4. **Insight Badges** - Highlight critical information
5. **Responsive Layout** - Optimized untuk desktop dan tablet
6. **Accessible Design** - Following WCAG guidelines

---

## 🔄 Data Update Frequency

- **Riwayat Kinerja:** Annual (setelah performance review cycle)
- **Nine Box Grid:** Annual atau Bi-annual
- **Talent Pool:** Quarterly review
- **EQS Score:** Quarterly calculation
- **Career Aspiration:** On-demand (kapan saja update)
- **Learning Agility:** Annual assessment

---

## 💡 Insight Badge Meaning

Badge **"Insight"** berwarna purple muncul pada:
- Metrics yang **above average** (top 25%)
- Status **"High Potential"** atau **"Top Talent"**
- Exceptional performance indicators
- Critical data points untuk decision making

**Visual:** Purple background, white text, info icon

---

## 🚀 Future Enhancements (Roadmap)

1. **Predictive Analytics** - AI-powered career path recommendations
2. **Peer Comparison** - Anonymous benchmarking
3. **Skills Gap Analysis** - Automated identification of development needs
4. **Interactive Nine Box** - Drag-and-drop scenario planning
5. **Export to PDF** - Downloadable career report
6. **Integration dengan LMS** - Link ke learning recommendations

---

## 📞 Support & Help

Untuk pertanyaan atau bantuan terkait section Insights:
- **Email:** hr.support@company.com
- **Internal Chat:** #hr-systems channel
- **Documentation:** Internal knowledge base
- **Training:** Monthly HR systems training sessions

---

**Last Updated:** January 22, 2026  
**Version:** 2.0  
**Maintained by:** HR Technology Team
