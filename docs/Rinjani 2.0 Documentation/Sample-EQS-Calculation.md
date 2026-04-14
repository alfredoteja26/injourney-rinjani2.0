## 1. Pendahuluan

<aside>
📌

**Tujuan Dokumen**

Dokumen ini menyajikan sample perhitungan Employee Qualification Score (EQS) untuk **3 pekerja fiktif** yang masing-masing dihitung skor EQS-nya terhadap **3 posisi target** yang berbeda. Tujuannya adalah mendemonstrasikan bagaimana **skor EQS seorang pekerja bervariasi antar posisi**, terutama dipengaruhi oleh perbedaan Job Fit (Kompetensi), relevansi Pengalaman, dan kesesuaian Aspirasi Karir.

</aside>

**Referensi:**

- [InJourney Rinjani 2.0 Talent Management Business Process & Rules](https://www.notion.so/InJourney-Rinjani-2-0-Talent-Management-Business-Process-Rules-087e9f974fc34c0b80e352e304223902?pvs=21) (Section 5: Employee Qualification Score)
- [[INJ-BPR] BRD Rinjani Talent: Talent Admin Headquarter](https://www.notion.so/INJ-BPR-BRD-Rinjani-Talent-Talent-Admin-Headquarter-06f2bcf432c04c96b0500dcb1fdd5ad3?pvs=21) (Submodul A: Talent Configuration)

---

## 2. Konfigurasi EQS yang Digunakan

### 2.1. Bobot Komponen EQS

| No | Komponen | Bobot | Sifat terhadap Posisi Target |
| --- | --- | --- | --- |
| 1 | **Kinerja** | 20% | Tetap (tidak berubah antar posisi) |
| 2 | **Kompetensi (Job Fit)** | 20% | **Berubah** per posisi target |
| 3 | **Pengalaman** | 20% | **Berubah** per posisi target |
| 4 | **Aspirasi Karir** | 10% | **Berubah** per posisi target |
| 5 | **Pelatihan (IDP)** | 20% | **Berubah** per posisi target |
| 6 | **TES (Talent Engagement Score)** | 10% | Tetap (tidak berubah antar posisi) |

### 2.2. Bobot Tahun Kinerja

| Tahun | Keterangan | Bobot |
| --- | --- | --- |
| Y0 | Tahun berjalan (terbaru) | 50% |
| Y-1 | 1 tahun sebelumnya | 30% |
| Y-2 | 2 tahun sebelumnya | 20% |

<aside>
ℹ️

**Normalisasi Kinerja**

Skor kinerja PMS memiliki nilai maksimum **110** (rating Outstanding). Untuk menyelaraskan skala seluruh komponen EQS ke rentang 0-100, skor Kinerja Weighted **dinormalisasi**: `Kinerja = (Kinerja_Raw / 110) × 100`.

</aside>

### 2.3. Konfigurasi Aspirasi Karir

| No | Variasi Aspirasi | Poin | Pengisi |
| --- | --- | --- | --- |
| 1 | **Self Aspiration** | 20 | Pekerja sendiri |
| 2 | **Supervisor Aspiration** | 20 | Atasan langsung pekerja |
| 3 | **Job Holder Aspiration** | 30 | Pekerja yang saat ini menempati posisi target |
| 4 | **Unit Aspiration** | 30 | Unit Head (BOD-1) posisi target; Direktur untuk posisi BOD-1 |

<aside>
ℹ️

**Mekanisme Perhitungan**

Skor Aspirasi Karir = jumlah poin dari aspirasi yang diterima pekerja terhadap posisi target. Apabila pekerja mendapatkan satu atau lebih aspirasi, maka poin dijumlahkan. Skor maksimal 100 poin jika pekerja mendapat keempat variasi aspirasi.

</aside>

### 2.4. Formula Utama EQS

```jsx
// Step 1: Disqualification Gate
Jika status_disiplin = "Sedang" atau "Berat" → EQS = N/A (Disqualified)

// Step 2: Hitung Kinerja Weighted dan Normalisasi
Kinerja_Raw  = (Y0 × W_Y0) + (Y-1 × W_Y1) + (Y-2 × W_Y2)
Kinerja      = (Kinerja_Raw / KINERJA_MAX) × 100

// Step 3: Hitung EQS
EQS = (Kinerja × W_K) + (Kompetensi × W_C) + (Pengalaman × W_P)
    + (Aspirasi × W_A) + (Pelatihan × W_T) + (TES × W_S)

// Default Weights
W_K = 0.20   // Kinerja
W_C = 0.20   // Kompetensi (Job Fit)
W_P = 0.20   // Pengalaman
W_A = 0.10   // Aspirasi Karir
W_T = 0.20   // Pelatihan (IDP)
W_S = 0.10   // TES
KINERJA_MAX = 110   // Skor kinerja maksimum (Outstanding)
```

<aside>
ℹ️

**Rentang Skor**

Seluruh komponen menghasilkan skor dalam rentang **0-100** setelah normalisasi. Total EQS juga berada dalam rentang **0-100**.

</aside>

---

### 2.5. Formula Detail per Komponen

#### 2.5.1. Kinerja (Bobot Default: 20%)

**Sifat:** Tetap (tidak berubah antar posisi target)

**Sumber data:** Performance Appraisal 3 tahun terakhir

```jsx
Kinerja_Raw = (Nilai_Y0 × 0.50) + (Nilai_Y-1 × 0.30) + (Nilai_Y-2 × 0.20)
Kinerja     = (Kinerja_Raw / 110) × 100
```

Skor kinerja PMS memiliki nilai maksimum **110** (rating Outstanding). Normalisasi dilakukan agar skala komponen ini selaras dengan komponen lain (0-100). Bobot per tahun dan jumlah tahun yang dihitung dapat dikonfigurasi.

| Parameter | Default | Configurable |
| --- | --- | --- |
| Bobot Y0, Y-1, Y-2 | 50%, 30%, 20% | Ya |
| Jumlah tahun yang dihitung | 3 tahun | Ya (2-3 tahun) |
| Nilai maksimum kinerja | 110 | Ya |

#### 2.5.2. Kompetensi / Job Fit (Bobot Default: 20%)

**Sifat:** Berubah per posisi target

**Sumber data:** Competency Assessment pekerja vs Required Competency Profile posisi target

```jsx
// Per item kompetensi:
Jika Accomplishment >= Required_Level → skor_item = 100
Jika Accomplishment <  Required_Level → skor_item = 0   // Gap = skor 0

// Skor akhir:
Kompetensi = AVG(skor_item_1, skor_item_2, ..., skor_item_n)
```

Setiap item kompetensi dinilai secara **binary**: apabila level capaian pekerja memenuhi atau melebihi level yang dibutuhkan posisi target, item tersebut mendapat skor **100**. Apabila terdapat gap (level capaian di bawah required level), item mendapat skor **0**. Tidak ada Position Level Factor. Skor akhir adalah rata-rata dari seluruh item.

| Parameter | Default | Configurable |
| --- | --- | --- |
| Required Competency Profile | Per posisi target | Ya (via Job Family mapping) |
| Skor Match (Accomplishment >= Required) | 100 | Tidak |
| Skor Gap (Accomplishment < Required) | 0 | Tidak |

#### 2.5.3. Pengalaman (Bobot Default: 20%)

**Sifat:** Berubah per posisi target

**Sumber data:** Riwayat Jabatan pekerja vs Job Family posisi target

```jsx
// Base Score: Step-Function berdasarkan tahun di Job Family target
Jika yearsInTargetJobFamily >= 8  → base = 100
Jika yearsInTargetJobFamily >= 5  → base = 90
Jika yearsInTargetJobFamily >= 3  → base = 75
Jika yearsInTargetJobFamily >= 1  → base = 50
Jika yearsInTargetJobFamily <  1  → base = 0

// Modifier
Jika totalYearsExperience >= 15   → base += 10   // Tenure panjang
Jika crossEntityExposure = true   → base += 5    // Pernah di entity berbeda
Jika skipBand > 1                 → base -= 10   // Lompat lebih dari 1 band

Pengalaman = MIN(100, MAX(0, base))
```

**Definisi variabel:**

| Variabel | Definisi | Sumber |
| --- | --- | --- |
| `yearsInTargetJobFamily` | Total tahun pengalaman pekerja di Job Family yang sama dengan posisi target | Riwayat Jabatan |
| `totalYearsExperience` | Total masa kerja keseluruhan pekerja | Riwayat Jabatan |
| `crossEntityExposure` | Pekerja pernah bekerja di entitas berbeda (contoh: Holding dan Member Company) | Riwayat Jabatan |
| `skipBand` | Selisih band antara posisi target dengan band tertinggi yang pernah diduduki pekerja, dikurangi 1. Contoh: dari BoD-3 ke BoD-1 = skip 1 band | Riwayat Jabatan vs Posisi Target |

| Parameter | Default | Configurable |
| --- | --- | --- |
| Threshold tahun (step-function) | 1, 3, 5, 8 tahun | Ya |
| Skor per threshold | 50, 75, 90, 100 | Ya |
| Modifier tenure panjang | +10 (threshold: 15 tahun) | Ya |
| Modifier cross-entity | +5 | Ya |
| Penalty skip band | -10 (threshold: > 1 band) | Ya |

#### 2.5.4. Aspirasi Karir (Bobot Default: 10%)

**Sifat:** Berubah per posisi target

**Sumber data:** Data aspirasi dari 4 sumber terhadap posisi target (lihat **Section 2.3** untuk konfigurasi poin per variasi)

```jsx
Aspirasi = SUM(poin dari aspirasi yang diterima terhadap posisi target)
         // Capped at 100
```

Skor Aspirasi Karir adalah jumlah poin dari aspirasi yang diterima pekerja terhadap posisi target. Skor maksimal **100 poin** jika pekerja mendapat keempat variasi aspirasi (Self 20 + Supervisor 20 + Job Holder 30 + Unit 30).

| Parameter | Default | Configurable |
| --- | --- | --- |
| Poin per variasi aspirasi | Self 20, Supervisor 20, Job Holder 30, Unit 30 | Ya |
| Skor maksimum | 100 | Tidak |

#### 2.5.5. Pelatihan / IDP (Bobot Default: 20%)

**Sifat:** Berubah per posisi target

**Sumber data:** IDP record pekerja vs daftar required/relevant training posisi target

```jsx
Pelatihan = (Jumlah_item_relevan_selesai / Total_item_relevan_required) × 100
```

Skor pelatihan ditentukan berdasarkan **persentase penyelesaian** training dan sertifikasi yang **relevan terhadap posisi target** saja. Hanya item yang termasuk dalam daftar required/relevant training posisi target yang dihitung. Training yang bersifat pendukung atau tidak relevan terhadap posisi target **tidak masuk perhitungan**. Completion hours tidak menjadi faktor perhitungan skor.

| Parameter | Default | Configurable |
| --- | --- | --- |
| Daftar required training per posisi | Per profil posisi | Ya (via Talent HQ) |
| Definisi "selesai" | Status Completed di LMS | Ya |

#### 2.5.6. TES / Talent Engagement Score (Bobot Default: 10%)

**Sifat:** Tetap (tidak berubah antar posisi target)

**Sumber data:** TES Engine (penetapan akhir tahun sebelumnya, berlaku 1 Januari tahun berikutnya)

```jsx
TES = 50 - Σ Boundary_Penalty + Σ Additional_Points

Constraints:
  0 ≤ Σ Boundary_Penalty  ≤ 50
  0 ≤ Σ Additional_Points  ≤ 50
  0 ≤ TES ≤ 100
```

Detail lengkap mengenai Boundary Indicator (4 indikator pengurang) dan Additional Indicator (9 indikator penambah) tersedia di **Section 6** dokumen ini.

---

### 2.6. Konfigurasi via Talent Headquarter

Seluruh parameter default di atas dapat dikonfigurasi oleh **Admin HC** melalui modul **Talent Headquarter** di Rinjani. Konfigurasi dapat dibedakan per kombinasi **Band Jabatan**, **Tipe Posisi**, dan **Entitas**.

| Area Konfigurasi | Parameter yang Dapat Diubah | Default | Scope Konfigurasi |
| --- | --- | --- | --- |
| **Bobot Komponen EQS** | Bobot per komponen (W_K, W_C, W_P, W_A, W_T, W_S). Total harus = 100% | 20 / 20 / 20 / 10 / 20 / 10 | Per Band × Entity |
| **Kinerja** | Bobot per tahun (Y0, Y-1, Y-2), jumlah tahun dihitung, nilai maksimum kinerja | 50/30/20, 3 tahun, max 110 | Global |
| **Kompetensi** | Required Competency Profile per posisi (via Job Family mapping) | Per profil posisi | Per Job Family × Band |
| **Pengalaman** | Threshold tahun step-function, skor per threshold, modifier (tenure, cross-entity, skip band) | Lihat Section 2.5.3 | Per Band |
| **Aspirasi** | Poin per variasi aspirasi (Self, Supervisor, Job Holder, Unit) | 20 / 20 / 30 / 30 | Global |
| **Pelatihan** | Daftar required/relevant training per profil posisi | Per profil posisi | Per Job Family × Band |
| **TES** | Boundary Indicator dan Additional Indicator beserta bobotnya | Lihat Section 6 | Global |

<aside>
⚙️

**Aturan Konfigurasi Bobot**

Total bobot seluruh komponen EQS harus selalu berjumlah **100%**. Perubahan bobot berlaku untuk seluruh kalkulasi EQS pada periode berikutnya. Konfigurasi bobot dapat dibedakan per **Band Jabatan** dan **Entitas** untuk mengakomodasi perbedaan prioritas antar level jabatan dan perusahaan dalam grup.

</aside>

<aside>
🚫

**Disqualification Rule (BR-TC-06)**

Pekerja yang sedang menjalani hukuman disiplin tingkat Sedang atau Berat secara otomatis mendapat status **"N/A - Disqualified"** dan tidak dihitung skor EQS-nya. Disqualification check dilakukan **sebelum** kalkulasi komponen apapun.

</aside>

<aside>
⚠️

**Mengapa EQS berbeda antar posisi?**

**4 dari 6** komponen EQS bersifat **position-dependent**:

1. **Kompetensi (Job Fit)** bergantung pada profil kompetensi posisi target vs profil pekerja
2. **Pengalaman** bergantung pada relevansi riwayat Job Family pekerja terhadap posisi target
3. **Aspirasi Karir** bergantung pada aspirasi yang diterima pekerja terhadap posisi target
4. **Pelatihan (IDP)** bergantung pada daftar required training posisi target vs penyelesaian pekerja

Komponen **Kinerja** dan **TES** bersifat tetap dan tidak berubah antar posisi target.

</aside>

---

## 3. Profil Pekerja

| Atribut | Budi Santoso | Siti Rahayu | Ahmad Fauzi |
| --- | --- | --- | --- |
| **NIP** | 10045 | 10078 | 10112 |
| **Grade** | 18 (BoD-3) | 21 (BoD-2) | 15 (BoD-4) |
| **Posisi Saat Ini** | Dept Head - Business Development | Division Head - People Management | Unit Head - QSHE |
| **Job Family** | Business Development | People Management | QSHE |
| **Kinerja Y0** | 85 | 90 | 78 |
| **Kinerja Y-1** | 80 | 88 | 82 |
| **Kinerja Y-2** | 78 | 82 | 80 |
| **TES** | 68 | 78 | 57 |
| **Status Disiplin** | Bersih | Bersih | Bersih |

### 3.1. Perhitungan Kinerja Weighted dan Normalisasi (Berlaku untuk Semua Posisi)

| Pekerja | Y0 × 0.50 | Y-1 × 0.30 | Y-2 × 0.20 | **Kinerja Raw** | **Normalized (/110×100)** |
| --- | --- | --- | --- | --- | --- |
| **Budi Santoso** | 85 × 0.50 = 42.50 | 80 × 0.30 = 24.00 | 78 × 0.20 = 15.60 | 82.10 | **74.64** |
| **Siti Rahayu** | 90 × 0.50 = 45.00 | 88 × 0.30 = 26.40 | 82 × 0.20 = 16.40 | 87.80 | **79.82** |
| **Ahmad Fauzi** | 78 × 0.50 = 39.00 | 82 × 0.30 = 24.60 | 80 × 0.20 = 16.00 | 79.60 | **72.36** |

---

## 4. Perhitungan EQS per Pekerja per Posisi

### 4.1. Budi Santoso (NIP 10045)

**Komponen tetap:** Kinerja (normalized) = 74.64 | TES = 68

#### Posisi A: Group Head - Business Development (Grade 24, BoD-1)

| Komponen | Skor | Bobot | Kontribusi |
| --- | --- | --- | --- |
| Kinerja (normalized) | 74.64 | 20% | 14.93 |
| Kompetensi (Job Fit) | **71.43** | 20% | 14.29 |
| Pengalaman | **100** | 20% | 20.00 |
| Aspirasi Karir | **70** | 10% | 7.00 |
| Pelatihan (IDP) | **75** | 20% | 15.00 |
| TES (Talent Engagement Score) | 68 | 10% | 6.80 |
| **TOTAL EQS** |  | **100%** | **78.02** |

---

**A. Detail Kinerja (Raw: 82.10, Normalized: 74.64 → Kontribusi: 14.93)**

| Tahun | Nilai | Kategori | Bobot Tahun | Kontribusi | Highlight KPI |
| --- | --- | --- | --- | --- | --- |
| **Y0 (2025)** | 85 | On Target Plus | 50% | 42.50 | Revenue BD 92/100, Partnership Baru 85/100, Client Retention 88/100 |
| **Y-1 (2024)** | 80 | On Target | 30% | 24.00 | Revenue tercapai 95%, 3 dari 4 target partnership baru |
| **Y-2 (2023)** | 78 | On Target | 20% | 15.60 | Tahun pertama sebagai Dept Head, adaptasi peran leadership |
| **Weighted** | **82.10** |  | **100%** | **82.10** |  |

<aside>
✅

**Faktor Penambah:**

- Tren kinerja **positif konsisten** selama 3 tahun (78 → 80 → 85)
- Tahun terakhir (Y0) mencapai *On Target Plus*, menunjukkan akselerasi
- Y0 mendapat bobot terbesar (50%), sehingga tren naik sangat menguntungkan
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- Belum pernah mencapai *Excellent* (> 90) dalam 3 tahun terakhir
- Conversion Rate Proposal di Y0 hanya 80/100 (area improvement)
- Y-2 relatif rendah (78) karena masa transisi ke peran Dept Head
</aside>

---

**B. Detail Kompetensi / Job Fit (Skor: 71.43 → Kontribusi: 14.29)**

**Required Competency Profile: Group Head - Business Development (Grade 24, BoD-1)**

| Kompetensi | Tipe | Required Level | Accomplishment Budi | Gap | Status |
| --- | --- | --- | --- | --- | --- |
| Strategic Business Development | Core | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Market & Industry Analysis | Core | 4 (Expert) | 3 (Advanced) | -1 | ⚠️ Gap |
| Stakeholder & Partner Management | Core | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Financial & Commercial Acumen | Core | 3 (Advanced) | 3 (Advanced) | 0 | ✅ Match |
| Leadership & People Development | Leadership | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Innovation & Digital Mindset | Soft | 3 (Advanced) | 3 (Advanced) | 0 | ✅ Match |
| Negotiation & Deal Structuring | Core | 4 (Expert) | 3 (Advanced) | -1 | ⚠️ Gap |

**Perhitungan Job Fit (Binary Scoring):**

```jsx
Per item: Match (≥ Required) = 100, Gap (< Required) = 0
= (100 + 0 + 100 + 100 + 100 + 100 + 0) / 7
= 500 / 7 = 71.43
```

<aside>
✅

**Faktor Penambah:**

- **5 dari 7** kompetensi match sempurna (Level ≥ Required)
- Job Family **sama** (Business Development → Business Development)
- Kompetensi inti *Strategic BD* dan *Stakeholder Management* di level Expert
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- Gap di **Market & Industry Analysis** (Level 3 vs Required 4): skor item = **0**
- Gap di **Negotiation & Deal Structuring** (Level 3 vs Required 4): skor item = **0**
- Dengan binary scoring, setiap gap langsung menurunkan rata-rata secara signifikan
</aside>

---

**C. Detail Pengalaman (Skor: 100 → Kontribusi: 20.00)**

**Perhitungan Step-Function:**

```jsx
yearsInTargetJobFamily (BD) = 10 → base = 100 (≥8)
totalYearsExperience = 10 (< 15, tidak ada bonus)
crossEntityExposure = true → +5
skipBand = 1 (BoD-3 → BoD-1, tidak > 1) → tidak ada penalty
Pengalaman = MIN(100, 100 + 5) = 100
```

**Atribut Posisi Target:**

| Atribut Posisi | Nilai |
| --- | --- |
| Nama Posisi | Group Head - Business Development |
| Grade | 24 (BoD-1) |
| Job Family | Business Development |
| Band | BoD-1 |
| Entity | InJourney Group (Holding) |
| Fungsi | Steering Function |

**Riwayat Jabatan Budi Santoso:**

| Periode | Posisi | Grade | Band | Job Family | Entity | Durasi |
| --- | --- | --- | --- | --- | --- | --- |
| 2022 - sekarang | Dept Head - Business Development | 18 | BoD-3 | Business Development | InJourney Holding | 4 tahun |
| 2019 - 2022 | Section Head - Business Development | 15 | BoD-4 | Business Development | AP I (Member Company) | 3 tahun |
| 2016 - 2019 | Staff Senior - Business Development | 12 | BoD-4 | Business Development | AP I (Member Company) | 3 tahun |

<aside>
✅

**Faktor Penambah:**

- **Job Family match langsung**: seluruh riwayat jabatan di Business Development
- **Kedalaman domain**: 10 tahun total pengalaman di BD
- **Cross-entity exposure**: pernah bekerja di Member Company (AP I) dan Holding
- **Progresif karir**: Staff → Section Head → Dept Head menunjukkan track record promosi konsisten
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- **Belum pernah di Band BoD-2**: lompatan dari BoD-3 langsung ke BoD-1 (skip 1 band)
- **Single Job Family**: seluruh karir hanya di BD, tidak ada diversitas fungsi
- **Belum pernah di posisi Division Head**: belum memiliki pengalaman mengelola departemen sebagai DH
</aside>

---

**D. Detail Aspirasi Karir (Skor: 70 → Kontribusi: 7.00)**

**Data Aspirasi Karir terhadap Posisi Target:**

| Variasi Aspirasi | Pengisi | Poin | Status | Keterangan |
| --- | --- | --- | --- | --- |
| Self Aspiration | Budi Santoso | 20 | ✅ Ada | Aspirasi utama: kenaikan jabatan ke GH Business Development |
| Supervisor Aspiration | Atasan langsung | 20 | ✅ Ada | Atasan merekomendasikan Budi untuk posisi ini |
| Job Holder Aspiration | Current GH-BD | 30 | ✅ Ada | Pejabat saat ini menominasikan Budi sebagai suksesor |
| Unit Aspiration | Unit Head (BOD-1) | 30 | ❌ Tidak Ada | Belum mendapat nominasi dari Unit Head |

**Perhitungan:**

```jsx
Skor Aspirasi = Self (20) + Supervisor (20) + Job Holder (30) = 70
```

<aside>
✅

**Faktor Penambah:**

- Mendapat **3 dari 4** variasi aspirasi, termasuk Job Holder Aspiration (30 poin)
- Self Aspiration **exact match** dengan posisi target (aspirasi utama)
- Supervisor aktif merekomendasikan, menunjukkan dukungan atasan langsung
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- **Unit Aspiration belum diperoleh**: Unit Head belum memberikan nominasi
- Skor tidak 100 karena belum mendapat dukungan dari level Unit Head (BOD-1)
</aside>

---

**E. Detail Pelatihan / IDP (Skor: 75 → Kontribusi: 15.00)**

**Rincian IDP Budi Santoso (Periode 2025) terhadap Posisi Target GH-BD:**

| No | Item Pelatihan | Jenis | Jam | Status | Relevansi thd Posisi Target |
| --- | --- | --- | --- | --- | --- |
| 1 | Strategic Business Leadership Program | External Training | 16 | ✅ Selesai | Langsung (BD + Leadership) |
| 2 | Financial Modeling for Executives | Workshop | 8 | ✅ Selesai | Langsung (Financial Acumen) |
| 3 | Digital Transformation in Business Development | Online Course | 12 | ✅ Selesai | Langsung (Innovation & Digital) |
| 4 | Negotiation Masterclass for Senior Leaders | External Training | 8 | ❌ Belum Selesai | Langsung (Gap Area: Negotiation) |
| 5 | Project Management Professional (PMP) Prep | Sertifikasi | 40 | ✅ Selesai | Pendukung |

**Perhitungan IDP (% Completion Relevant Items):**

```jsx
Item relevan terhadap GH-BD: 4 item (No. 1-4)
Item relevan selesai: 3 item (No. 1, 2, 3)
Item relevan belum selesai: 1 item (No. 4 - Negotiation Masterclass)
Item pendukung (No. 5 - PMP): TIDAK DIHITUNG

Pelatihan = (3 / 4) × 100 = 75.00
```

<aside>
✅

**Faktor Penambah:**

- **3 dari 4** item relevan selesai (75% completion rate)
- Item relevan mencakup BD, Financial Acumen, dan Innovation
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- **1 item kunci belum selesai**: Negotiation Masterclass, yang merupakan **gap area** (Negotiation & Deal Structuring)
- Item yang belum selesai justru yang paling relevan untuk menutup competency gap
</aside>

---

**F. Detail TES / Talent Engagement Score (Skor: 68 → Kontribusi: 6.80)**

| Komponen | Nilai | Keterangan |
| --- | --- | --- |
| Default Score | 50 | Skor awal seluruh pekerja |
| Boundary Penalty | -2.40 | Learning Hour belum terpenuhi (42/50 jam) |
| Additional Points | +20 | Aktif di 5 dari 9 indikator tambahan |
| **TES Final** | **68** | Dibulatkan dari 67.60 |

<aside>
ℹ️

**Catatan:** TES adalah **Talent Engagement Score** yang mengukur kecocokan pekerja dengan kultur perusahaan InJourney. Skor bersifat **tetap** dan tidak berubah antar posisi target. Detail lengkap perhitungan tersedia di **Section 6**.

</aside>

#### Posisi B: Group Head - Corporate Strategy (Grade 24, BoD-1)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 74.64 | 20% | 14.93 | Normalized dari raw 82.10 (tetap) |
| Kompetensi | **42.86** | 20% | 8.57 | 3/7 match: overlap parsial BD-Strategy |
| Pengalaman | **5** | 20% | 1.00 | 0 tahun di JF Strategy (base=0) + cross-entity (+5) |
| Aspirasi | **20** | 10% | 2.00 | Self Aspiration saja (20 poin) |
| Pelatihan | **25** | 20% | 5.00 | 1/4 relevant item selesai terhadap posisi ini |
| TES | 68 | 10% | 6.80 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **38.30** |  |

#### Posisi C: Division Head - Sales & Marketing (Grade 22, BoD-2)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 74.64 | 20% | 14.93 | Normalized dari raw 82.10 (tetap) |
| Kompetensi | **57.14** | 20% | 11.43 | 4/7 match: BD dan S&M overlap komersial |
| Pengalaman | **5** | 20% | 1.00 | 0 tahun di JF S&M (base=0) + cross-entity (+5) |
| Aspirasi | **40** | 10% | 4.00 | Self + Supervisor Aspiration (40 poin) |
| Pelatihan | **40** | 20% | 8.00 | 2/5 relevant item selesai terhadap posisi ini |
| TES | 68 | 10% | 6.80 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **46.16** |  |

#### Ringkasan Budi Santoso

| Posisi Target | Skor EQS | Delta vs Posisi A | Faktor Pembeda Utama |
| --- | --- | --- | --- |
| **A. GH Business Development** | **78.02** | Baseline | JF match (71.43 Job Fit) + Pengalaman 100 + 3/4 aspirasi |
| **B. GH Corporate Strategy** | **38.30** | -39.72 | Cross-JF: Kompetensi 42.86, Pengalaman 5, Pelatihan 25 |
| **C. DH Sales & Marketing** | **46.16** | -31.86 | Adjacent JF: Kompetensi 57.14, Pengalaman 5, Pelatihan 40 |

---

### 4.2. Siti Rahayu (NIP 10078)

**Komponen tetap:** Kinerja (normalized) = 79.82 | TES = 78

#### Posisi A: Group Head - People Management (Grade 24, BoD-1)

| Komponen | Skor | Bobot | Kontribusi |
| --- | --- | --- | --- |
| Kinerja (normalized) | 79.82 | 20% | 15.96 |
| Kompetensi (Job Fit) | **85.71** | 20% | 17.14 |
| Pengalaman | **100** | 20% | 20.00 |
| Aspirasi Karir | **100** | 10% | 10.00 |
| Pelatihan (IDP) | **100** | 20% | 20.00 |
| TES (Talent Engagement Score) | 78 | 10% | 7.80 |
| **TOTAL EQS** |  | **100%** | **90.90** |

---

**A. Detail Kinerja (Raw: 87.80, Normalized: 79.82 → Kontribusi: 15.96)**

| Tahun | Nilai | Kategori | Bobot Tahun | Kontribusi | Highlight KPI |
| --- | --- | --- | --- | --- | --- |
| **Y0 (2025)** | 90 | Excellent | 50% | 45.00 | Talent Retention Rate 95/100, Employee Engagement 92/100, Succession Pipeline 90/100 |
| **Y-1 (2024)** | 88 | On Target Plus | 30% | 26.40 | HC Program Delivery 90/100, Budget Compliance 88/100 |
| **Y-2 (2023)** | 82 | On Target Plus | 20% | 16.40 | Tahun pertama implementasi HR digital, adaptasi proses baru |
| **Weighted** | **87.80** |  | **100%** | **87.80** |  |

<aside>
✅

**Faktor Penambah:**

- Tahun terakhir (Y0) mencapai **Excellent** (90), kategori tertinggi di seluruh sample
- Tren kinerja **naik konsisten** selama 3 tahun (82 → 88 → 90)
- KPI Talent Retention Rate sangat tinggi (95), menunjukkan efektivitas program HC
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- Y-2 relatif lebih rendah (82) karena transisi ke HR digital
- Budget Compliance belum sempurna di Y-1 (88/100)
- Meskipun minim, gap antara Y-2 dan Y0 cukup besar (8 poin) menunjukkan Y-2 menekan weighted score
</aside>

---

**B. Detail Kompetensi / Job Fit (Skor: 85.71 → Kontribusi: 17.14)**

**Required Competency Profile: Group Head - People Management (Grade 24, BoD-1)**

| Kompetensi | Tipe | Required Level | Accomplishment Siti | Gap | Status |
| --- | --- | --- | --- | --- | --- |
| Strategic HR Management | Core | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Talent Management & Development | Core | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Organizational Development | Core | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Employment Law & Compliance | Core | 3 (Advanced) | 3 (Advanced) | 0 | ✅ Match |
| Leadership & Coaching | Leadership | 4 (Expert) | 4 (Expert) | 0 | ✅ Match |
| Change Management | Soft | 4 (Expert) | 3 (Advanced) | -1 | ⚠️ Gap |
| Data-Driven HR Analytics | Core | 3 (Advanced) | 3 (Advanced) | 0 | ✅ Match |

**Perhitungan Job Fit (Binary Scoring):**

```jsx
Per item: Match (≥ Required) = 100, Gap (< Required) = 0
= (100 + 100 + 100 + 100 + 100 + 0 + 100) / 7
= 600 / 7 = 85.71
```

<aside>
✅

**Faktor Penambah:**

- **6 dari 7** kompetensi match sempurna (Level ≥ Required)
- Job Family **identik** (People Management → People Management)
- Kompetensi strategis (*Strategic HR Mgmt*, *Talent Mgmt*, *OD*) semua di level Expert
- Job Fit tertinggi di seluruh sample (85.71)
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- Gap di **Change Management** (Level 3 vs Required 4): skor item = **0**
- Dengan binary scoring, 1 gap dari 7 item menurunkan skor dari 100 ke 85.71
</aside>

---

**C. Detail Pengalaman (Skor: 100 → Kontribusi: 20.00)**

**Perhitungan Step-Function:**

```jsx
yearsInTargetJobFamily (PM) = 12 → base = 100 (≥8)
totalYearsExperience = 12 (< 15, tidak ada bonus)
crossEntityExposure = true → +5
skipBand = 0 (BoD-2 → BoD-1, natural) → tidak ada penalty
Pengalaman = MIN(100, 100 + 5) = 100
```

**Atribut Posisi Target:**

| Atribut Posisi | Nilai |
| --- | --- |
| Nama Posisi | Group Head - People Management |
| Grade | 24 (BoD-1) |
| Job Family | People Management |
| Band | BoD-1 |
| Entity | InJourney Group (Holding) |
| Fungsi | Support Function (Corporate) |

**Riwayat Jabatan Siti Rahayu:**

| Periode | Posisi | Grade | Band | Job Family | Entity | Durasi |
| --- | --- | --- | --- | --- | --- | --- |
| 2021 - sekarang | Division Head - People Management | 21 | BoD-2 | People Management | InJourney Holding | 5 tahun |
| 2017 - 2021 | Dept Head - HC Operations | 19 | BoD-3 | People Management | InJourney Holding | 4 tahun |
| 2014 - 2017 | Section Head - Recruitment & Staffing | 16 | BoD-4 | People Management | AP II (Member Company) | 3 tahun |

<aside>
✅

**Faktor Penambah:**

- **Job Family match langsung**: seluruh riwayat jabatan di People Management
- **12 tahun** pengalaman di HR/People Management (kedalaman domain terbaik di sample)
- **Sudah di Band BoD-2**: tidak ada skip band, transisi natural ke BoD-1
- **Cross-entity**: pernah di Member Company (AP II) dan Holding
- **Progresif lengkap**: Section Head → Dept Head → Division Head, track record promosi tervalidasi
</aside>

<aside>
⚠️

**Faktor Pengurang:**

- **Single Job Family**: seluruh karir di People Management, tidak ada rotasi ke fungsi lain
- **Hanya 1 member company**: exposure terbatas pada AP II, belum pernah di member company lain
</aside>

---

**D. Detail Aspirasi Karir (Skor: 100 → Kontribusi: 10.00)**

**Data Aspirasi Karir terhadap Posisi Target:**

| Variasi Aspirasi | Pengisi | Poin | Status | Keterangan |
| --- | --- | --- | --- | --- |
| Self Aspiration | Siti Rahayu | 20 | ✅ Ada | Aspirasi utama: kenaikan jabatan ke GH People Management |
| Supervisor Aspiration | Atasan langsung | 20 | ✅ Ada | Atasan merekomendasikan Siti untuk posisi ini |
| Job Holder Aspiration | Current GH-PM | 30 | ✅ Ada | Pejabat saat ini menominasikan Siti sebagai suksesor |
| Unit Aspiration | Unit Head (BOD-1) | 30 | ✅ Ada | Unit Head memberikan nominasi berdasarkan track record Siti |

**Perhitungan:**

```jsx
Skor Aspirasi = Self (20) + Supervisor (20) + Job Holder (30) + Unit (30) = 100
```

<aside>
✅

**Faktor Penambah:**

- Mendapat **4 dari 4** variasi aspirasi (skor sempurna 100)
- **Satu-satunya pekerja** di seluruh sample yang mendapat seluruh variasi aspirasi
- Dukungan menyeluruh dari seluruh level: self, atasan, job holder, dan unit head
</aside>

---

**E. Detail Pelatihan / IDP (Skor: 100 → Kontribusi: 20.00)**

**Rincian IDP Siti Rahayu (Periode 2025) terhadap Posisi Target GH-PM:**

| No | Item Pelatihan | Jenis | Jam | Status | Relevansi thd Posisi Target |
| --- | --- | --- | --- | --- | --- |
| 1 | Strategic HR Leadership for C-Suite | External Training | 16 | ✅ Selesai | Langsung (Strategic HR Mgmt) |
| 2 | Talent Analytics & Workforce Planning Certification | Sertifikasi | 24 | ✅ Selesai | Langsung (Data-Driven HR) |
| 3 | Organizational Development Masterclass | Workshop | 12 | ✅ Selesai | Langsung (OD) |
| 4 | Change Management Practitioner (Prosci) | Sertifikasi | 8 | ✅ Selesai | Langsung (Gap Area: Change Mgmt) |
| 5 | HR Digital Transformation Summit | Konferensi | 8 | ✅ Selesai | Pendukung |

**Perhitungan IDP (% Completion Relevant Items):**

```jsx
Item relevan terhadap GH-PM: 4 item (No. 1-4)
Item relevan selesai: 4 item (No. 1, 2, 3, 4)
Item pendukung (No. 5 - HR Digital Summit): TIDAK DIHITUNG

Pelatihan = (4 / 4) × 100 = 100.00
```

<aside>
✅

**Faktor Penambah:**

- **100% completion rate**: seluruh 4 item relevan selesai (terbaik di seluruh sample)
- Sudah menyelesaikan **Change Management Practitioner** (Prosci) untuk menutup gap area
- Memiliki **sertifikasi** di Talent Analytics, menambah kredibilitas teknis
</aside>

---

**F. Detail TES / Talent Engagement Score (Skor: 78 → Kontribusi: 7.80)**

| Komponen | Nilai | Keterangan |
| --- | --- | --- |
| Default Score | 50 | Skor awal seluruh pekerja |
| Boundary Penalty | 0 | Seluruh boundary indicator terpenuhi |
| Additional Points | +28 | Aktif di 7 dari 9 indikator tambahan |
| **TES Final** | **78** |  |

<aside>
ℹ️

**Catatan:** TES adalah **Talent Engagement Score** yang mengukur kecocokan pekerja dengan kultur perusahaan InJourney. Skor bersifat **tetap** dan tidak berubah antar posisi target. Detail lengkap perhitungan tersedia di **Section 6**.

</aside>

#### Posisi B: Group Head - Corporate Relation & Communication (Grade 24, BoD-1)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 79.82 | 20% | 15.96 | Normalized dari raw 87.80 (tetap) |
| Kompetensi | **28.57** | 20% | 5.71 | 2/7 match: profil kompetensi berbeda signifikan |
| Pengalaman | **5** | 20% | 1.00 | 0 tahun di JF CorpRel (base=0) + cross-entity (+5) |
| Aspirasi | **0** | 10% | 0.00 | Tidak ada aspirasi ke posisi ini (0 poin) |
| Pelatihan | **0** | 20% | 0.00 | 0/3 relevant item selesai terhadap posisi ini |
| TES | 78 | 10% | 7.80 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **30.47** |  |

#### Posisi C: Dept Head - QSHE (Grade 19, BoD-3)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 79.82 | 20% | 15.96 | Normalized dari raw 87.80 (tetap) |
| Kompetensi | **14.29** | 20% | 2.86 | 1/7 match: HR vs QSHE sangat berbeda |
| Pengalaman | **5** | 20% | 1.00 | 0 tahun di JF QSHE (base=0) + cross-entity (+5) |
| Aspirasi | **0** | 10% | 0.00 | Tidak ada aspirasi ke fungsi QSHE (0 poin) |
| Pelatihan | **0** | 20% | 0.00 | 0/4 relevant item selesai terhadap posisi ini |
| TES | 78 | 10% | 7.80 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **27.62** |  |

#### Ringkasan Siti Rahayu

| Posisi Target | Skor EQS | Delta vs Posisi A | Faktor Pembeda Utama |
| --- | --- | --- | --- |
| **A. GH People Management** | **90.90** | Baseline | JF match (85.71 Job Fit) + Pengalaman 100 + 4/4 aspirasi + Pelatihan 100 |
| **B. GH Corporate Relation** | **30.47** | -60.43 | Cross-JF: Kompetensi 28.57, Pengalaman 5, Pelatihan 0, Aspirasi 0 |
| **C. DH QSHE** | **27.62** | -63.28 | Cross-JF: Kompetensi 14.29, Pengalaman 5, Pelatihan 0, Aspirasi 0 |

---

### 4.3. Ahmad Fauzi (NIP 10112)

**Komponen tetap:** Kinerja (normalized) = 72.36 | TES = 57

#### Posisi A: Dept Head - QSHE (Grade 19, BoD-3)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 72.36 | 20% | 14.47 | Normalized dari raw 79.60 (tetap) |
| Kompetensi | **83.33** | 20% | 16.67 | 5/6 match: Job Family sama (QSHE) |
| Pengalaman | **90** | 20% | 18.00 | 7 tahun di QSHE (≥5→90), skipBand=0 |
| Aspirasi | **70** | 10% | 7.00 | Self + Supervisor + Job Holder Aspiration (70 poin) |
| Pelatihan | **75** | 20% | 15.00 | 3/4 relevant item selesai terhadap posisi ini |
| TES | 57 | 10% | 5.70 | Talent Engagement Score |
| **TOTAL** |  | **100%** | **76.84** |  |

#### Posisi B: Dept Head - Asset Management (Grade 19, BoD-3)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 72.36 | 20% | 14.47 | Normalized dari raw 79.60 (tetap) |
| Kompetensi | **16.67** | 20% | 3.33 | 1/6 match: QSHE vs Asset Mgmt berbeda profil |
| Pengalaman | **0** | 20% | 0.00 | 0 tahun di JF Asset Mgmt (base=0), tidak ada cross-entity |
| Aspirasi | **0** | 10% | 0.00 | Tidak ada aspirasi ke fungsi ini (0 poin) |
| Pelatihan | **0** | 20% | 0.00 | 0/3 relevant item selesai terhadap posisi ini |
| TES | 57 | 10% | 5.70 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **23.50** |  |

#### Posisi C: Dept Head - Airport Operations (Grade 18, BoD-3)

| Komponen | Skor | Bobot | Kontribusi | Keterangan |
| --- | --- | --- | --- | --- |
| Kinerja (normalized) | 72.36 | 20% | 14.47 | Normalized dari raw 79.60 (tetap) |
| Kompetensi | **33.33** | 20% | 6.67 | 2/6 match: overlap parsial safety & compliance |
| Pengalaman | **0** | 20% | 0.00 | 0 tahun di JF Airport Ops (base=0), tidak ada cross-entity |
| Aspirasi | **20** | 10% | 2.00 | Self Aspiration saja (20 poin) |
| Pelatihan | **25** | 20% | 5.00 | 1/4 relevant item selesai terhadap posisi ini |
| TES | 57 | 10% | 5.70 | Talent Engagement Score (tetap) |
| **TOTAL** |  | **100%** | **33.84** |  |

#### Ringkasan Ahmad Fauzi

| Posisi Target | Skor EQS | Delta vs Posisi A | Faktor Pembeda Utama |
| --- | --- | --- | --- |
| **A. DH QSHE** | **76.84** | Baseline | JF match (83.33 Job Fit) + Pengalaman 90 + 3/4 aspirasi |
| **B. DH Asset Management** | **23.50** | -53.34 | Cross-JF: Kompetensi 16.67, Pengalaman 0, Pelatihan 0, Aspirasi 0 |
| **C. DH Airport Operations** | **33.84** | -43.00 | Cross-JF: Kompetensi 33.33, Pengalaman 0, Pelatihan 25, Self Aspiration 20 |

---

## 5. Perbandingan Antar Pekerja dan Posisi

### 5.1. Matriks EQS Lengkap (Pekerja × Posisi)

| Pekerja \ Posisi | Posisi A (Match Tinggi) | Posisi B (Match Rendah) | Posisi C (Match Moderat) | Range (Max-Min) |
| --- | --- | --- | --- | --- |
| **Budi Santoso** | 78.02 | 38.30 | 46.16 | 39.72 |
| **Siti Rahayu** | 90.90 | 30.47 | 27.62 | 63.28 |
| **Ahmad Fauzi** | 76.84 | 23.50 | 33.84 | 53.34 |

### 5.2. Analisis Temuan

<aside>
💡

**Temuan 1: Variasi EQS antar posisi sangat signifikan**

Dengan formula resmi (binary kompetensi, strict JF experience, position-dependent IDP), range skor EQS satu pekerja mencapai **39 hingga 63 poin**. Siti Rahayu memiliki EQS **90.90** untuk posisi People Management tetapi hanya **27.62** untuk posisi QSHE.

</aside>

<aside>
💡

**Temuan 2: Cross-JF movement menghasilkan EQS sangat rendah**

Perkerja yang pindah ke Job Family berbeda mendapat skor rendah di 3 komponen sekaligus: Kompetensi (binary scoring menghukum gap), Pengalaman (0 tahun di JF target), dan Pelatihan (0% relevant training). Ini menjelaskan mengapa EQS menjadi instrumen kuat untuk mengarahkan talent ke posisi yang sesuai.

</aside>

<aside>
💡

**Temuan 3: Komponen Pengalaman dan Pelatihan menjadi pembeda terbesar**

Untuk posisi cross-JF, Pengalaman dan Pelatihan bisa bernilai 0, sehingga kontribusi 40% (2 × 20%) dari total bobot hilang sepenuhnya. Ini lebih berdampak dari Kompetensi karena binary scoring masih memberikan skor parsial jika ada beberapa kompetensi yang match.

</aside>

<aside>
💡

**Temuan 4: Pekerja berkinerja tinggi tetap bisa mendapat skor sangat rendah**

Siti Rahayu memiliki Kinerja normalized tertinggi (79.82) dan TES tertinggi (78), namun EQS-nya terhadap posisi QSHE hanya **27.62** karena seluruh komponen position-dependent bernilai mendekati 0.

</aside>

### 5.3. Implikasi untuk Pengguna Sistem

| Konteks Penggunaan | EQS yang Ditampilkan | Keterangan |
| --- | --- | --- |
| **Dashboard My Talent Journey** | EQS terhadap **posisi saat ini** | Menunjukkan kualifikasi pekerja di posisi yang sedang diduduki |
| **Talent Pool** | EQS terhadap **posisi target pool** | Ranking kandidat berdasarkan kesesuaian dengan posisi target |
| **Succession Planning** | EQS terhadap **posisi suksesor** | Membandingkan suksesor berdasarkan fit terhadap posisi KSP |
| **Job Tender** | EQS terhadap **posisi lowongan** | Pekerja melihat estimasi skor mereka terhadap lowongan yang dilamar |

---

---

## 6. Komponen TES: Talent Engagement Score

<aside>
📌

**Prinsip Dasar Talent Engagement Score (TES)**

Seluruh pekerja memulai dengan **skor default 50**. Skor ini dimodifikasi oleh dua jenis indikator:

1. **Boundary Indicator** (Pengurang) -- mengurangi skor jika pekerja tidak memenuhi standar minimum perusahaan. Total pengurang **maksimal 50 poin**.
2. **Additional Indicator** (Penambah) -- menambah skor jika pekerja menunjukkan kontribusi di luar tugas pokok. Total penambah **maksimal 50 poin**.
</aside>

**Formula:**

```jsx
TES = 50 - Σ Boundary Penalty + Σ Additional Points

Constraints:
  Σ Boundary Penalty  : 0 ≤ total ≤ 50
  Σ Additional Points  : 0 ≤ total ≤ 50
  Final TES Range      : 0 ≤ TES ≤ 100
```

<aside>
📅

**Masa Berlaku**

Nilai TES berlaku selama **1 tahun** setelah penetapan di akhir tahun sebelumnya. Penetapan dilakukan berdasarkan realisasi indikator selama periode tahun berjalan, dan berlaku efektif mulai **1 Januari** tahun berikutnya.

</aside>

---

### 6.1. Boundary Indicator (Nilai Pengurang)

> Boundary Indicator bersifat **pengurang** terhadap skor default 50. Penalty dihitung proporsional: jika realisasi < target, maka **penalty = bobot pengurang × (1 - realisasi / target)**.
> 

| No | Indikator | Formula | Target | Bobot Pengurang | Pengusul / Data Producer |
| --- | --- | --- | --- | --- | --- |
| 1 | **Pemenuhan Poin InJourney Fit** | (Jumlah bulan dalam 1 tahun yang memenuhi target poin InJourney Fit / Total jumlah bulan dalam 1 tahun) × 100% | 100% | 15 Poin | Group Layanan SDM |
| 2 | **Learning Hour** | Total learning hour pekerja dalam kurun waktu 1 tahun | 50 Jam | 15 Poin | Group Pengelolaan SDM |
| 3 | **Pemenuhan Penanganan Risiko** | % Progress pemenuhan mitigasi risiko pada masing-masing Group/Divisi di masing-masing entitas (termasuk risiko penyuapan) | 100% | 10 Poin | Group Manajemen Risiko, Tata Kelola, dan Kepatuhan |
| 4 | **Penandatanganan Pakta Integritas dan Nilai Hasil Survey Pemahaman GCG** | Nilai Hasil Survey Pemahaman GCG dan Soft File Pakta Integritas yang telah ditandatangani | 100 Poin | 10 Poin | Group Manajemen Risiko, Tata Kelola, dan Kepatuhan |

<aside>
ℹ️

**Total Bobot Pengurang Maksimal: 50 Poin** (15 + 15 + 10 + 10)

Jika seluruh Boundary Indicator tidak terpenuhi sama sekali, skor TES dapat turun dari 50 menjadi **0**.

</aside>

---

### 6.2. Additional Point (1)

| No | Indikator / Ukuran | Formula | Target | Poin Penambah | Pengusul / Data Producer |
| --- | --- | --- | --- | --- | --- |
| 1 | **Internal Auditor Management System** | Auditor pilihan yang dinilai memberikan kontribusi dan hasil audit terbaik oleh Dep. terkait, dengan catatan Auditor bukan bagian dari departemen/divisi yang bersangkutan dengan sistem manajemen mutu | Auditor Terpilih | 4 | Group K3 dan Sistem Manajemen |
| 2 | **Keterlibatan Pekerja sebagai bagian dari tim Brand Ambassador** | Jumlah postingan pegawai yang terlibat sebagai Brand Ambassador pada sosial media pribadi dalam jangka waktu satu tahun *(Postingan akan dilihat kesesuaiannya oleh tim Corporate Communication dan dipilih yang mengedepankan branding & layanan kepada stakeholder)* | 20 Postingan | 5 | Group Sekretariat Perusahaan |
| 3 | **InJourney Mengajar** -- menjadi pengajar baik di kegiatan perusahaan maupun kegiatan sosial di lingkungan rumahnya | Jumlah aktivitas mengajar (secara sukarela dan bersifat relawan) dalam 1 tahun | 1 kali mengajar | 2 (Maksimal 4 Poin) | Group Sekretariat Perusahaan |
| 4 | **Relawan Bakti BUMN**: mendaftar dan lolos menjadi relawan bakti BUMN | Lolos menjadi relawan dan berhasil menyelesaikan tugas sebagai relawan bakti BUMN | Menyelesaikan tugas sebagai relawan bakti BUMN | 4 | Group Sekretariat Perusahaan |

---

### 6.3. Additional Point (2)

| No | Indikator / Ukuran | Formula | Target | Poin Penambah | Pengusul / Data Producer |
| --- | --- | --- | --- | --- | --- |
| 5 | **Keikutsertaan dalam Program Inkubasi Ide Inovasi dan keberhasilan dalam implementasi ide inovasi** | Mengikuti Program Inkubasi sampai selesai dan berhasil mengimplementasikan ide inovasinya | Ide inovasi 100% terimplementasikan | 5 | Group Strategi Korporasi & Inovasi |
| 6 | **Penyelesaian program kerja sebagai Change Agent** | Penyelesaian program Change Agent 100% | 100% penyelesaian program dan pelaporan tepat waktu di CMS | 2 | Group Pengelolaan SDM |
| 7 | **Keterlibatan Sebagai Subject Matter Expert (SME)** | Keterlibatan SME sebagai: 1. Narasumber internal/eksternal; 2. Tenaga pengajar internal/eksternal; 3. Verifikator/validator KMAP; 4. Penulis dan tulisan telah dikurasi pada K-Hub; 5. Keaktifan partisipasi pada fitur Ask the Expert | a. SME Poin 50 - 75
b. SME Poin 76 - 100 | a. 2 Poin
b. 4 Poin | Group Pengelolaan SDM |
| 8 | **Keterlibatan sebagai Pengurus Organisasi Perusahaan di luar BaU** (Contoh: BUMN Muda InJourney, Organisasi Baporkes) | a. Organisasi dan pengurus dibentuk/disahkan oleh Dir.SDMU atau Dirut InJourney; b. Organisasi di luar BAU Perusahaan; c. Organisasi secara aktif melakukan program kerja minimal 4 program dalam satu tahun (1 Program per triwulan); d. Pemberian poin hanya diberikan kepada maksimal 70% pengurus yang dinilai aktif; e. Apabila ketua dinilai aktif oleh pengelola organisasi maka tambahan poin yang didapatkan adalah 5 poin | a. Mengikuti 1 organisasi
b. Mengikuti > 1 Organisasi | a. 4 Poin
b. 5 Poin | Group Pengelolaan SDM / Group Layanan SDM |
| 9 | **Relawan Muda BUMN (InJourney)** | Penyesuaian KPI Individu terkait Aktivitas dan Kegiatan Relawan Muda BUMN InJourney | TBD | TBD | Group Layanan SDM |

<aside>
ℹ️

**Total Poin Penambah Maksimal: 50 Poin**

Jumlah poin yang bisa dikumpulkan dari seluruh Additional Indicator dibatasi maksimal 50, meskipun akumulasi dari seluruh indikator melebihi 50.

</aside>

---

### 6.4. Sample Perhitungan TES

#### Budi Santoso (TES = 68)

**A. Boundary Penalty**

| Indikator | Target | Realisasi | Bobot Maks. | Penalty |
| --- | --- | --- | --- | --- |
| InJourney Fit | 100% | 100% (12/12 bulan) | 15 | **0** |
| Learning Hour | 50 Jam | 42 Jam (84%) | 15 | **-2.40** |
| Penanganan Risiko | 100% | 100% | 10 | **0** |
| GCG & Pakta Integritas | 1 | 1 | 10 | **0** |
| **Total Boundary Penalty** |  |  |  | **-2.40** |

**B. Additional Points**

| No | Indikator | Status | Poin |
| --- | --- | --- | --- |
| 1 | Internal Auditor | ❌ Tidak terpilih | 0 |
| 2 | Brand Ambassador | ✅ 22 postingan | 5 |
| 3 | InJourney Mengajar | ✅ 2 kali mengajar | 4 |
| 4 | Relawan Bakti BUMN | ❌ Tidak ikut | 0 |
| 5 | Inkubasi Ide Inovasi | ❌ Tidak ikut inkubasi | 0 |
| 6 | Change Agent (program) | ✅ 100% selesai | 2 |
| 7 | SME | ✅ Poin 80 (Narasumber + K-Hub) | 4 |
| 8 | Pengurus Organisasi | ✅ 2 organisasi (BUMN Muda + Baporkes) | 5 |
| 9 | Relawan Muda BUMN | N/A | 0 |
|  | **Total Additional Points** |  | **20** |

**C. Perhitungan Akhir**

```jsx
TES = 50 - 2.40 + 20 = 67.60

// Pembulatan dan normalisasi kalibrasi akhir
TES Final = 68 (dibulatkan)
```

<aside>
ℹ️

**Catatan:** Budi memiliki boundary penalty ringan di Learning Hour (-2.40) namun mengkompensasi dengan aktif di 5 dari 9 indikator tambahan, menghasilkan TES di atas rata-rata.

</aside>

#### Siti Rahayu (TES = 78)

**A. Boundary Penalty**

| Indikator | Target | Realisasi | Bobot Maks. | Penalty |
| --- | --- | --- | --- | --- |
| InJourney Fit | 100% | 100% (12/12 bulan) | 15 | **0** |
| Learning Hour | 50 Jam | 68 Jam (136%) | 15 | **0** |
| Penanganan Risiko | 100% | 100% | 10 | **0** |
| GCG & Pakta Integritas | 100 | 100 | 10 | **0** |
| **Total Boundary Penalty** |  |  |  | **0** |

**B. Additional Points**

| No | Indikator | Status | Poin |
| --- | --- | --- | --- |
| 1 | Internal Auditor | ✅ Auditor terpilih | 4 |
| 2 | Brand Ambassador | ✅ 30 postingan | 5 |
| 3 | InJourney Mengajar | ✅ 2 kali mengajar | 4 |
| 4 | Relawan Bakti BUMN | ✅ Selesai | 4 |
| 5 | Inkubasi Ide Inovasi | ❌ Tidak ikut inkubasi | 0 |
| 6 | Change Agent (program) | ✅ 100% selesai | 2 |
| 7 | SME | ✅ Poin 90 (Narasumber + Pengajar + K-Hub) | 4 |
| 8 | Pengurus Organisasi | ✅ 2 organisasi (BUMN Muda + Forum HR) | 5 |
| 9 | Relawan Muda BUMN | N/A | 0 |
|  | **Total Additional Points** |  | **28** |

**C. Perhitungan Akhir**

```jsx
TES = 50 - 0 + 28 = 78
```

<aside>
✅

**Siti memiliki TES tertinggi** di antara ketiga sample karena: (1) tidak ada boundary penalty sama sekali, dan (2) aktif di **7 dari 9** indikator tambahan dengan kontribusi merata di berbagai program.

</aside>

#### Ahmad Fauzi (TES = 57)

**A. Boundary Penalty**

| Indikator | Target | Realisasi | Bobot Maks. | Penalty |
| --- | --- | --- | --- | --- |
| InJourney Fit | 100% | 83% (10/12 bulan) | 15 | **-2.55** |
| Learning Hour | 50 Jam | 38 Jam (76%) | 15 | **-3.60** |
| Penanganan Risiko | 100% | 100% | 10 | **0** |
| GCG & Pakta Integritas | 100 | 90 | 10 | **-1.00** |
| **Total Boundary Penalty** |  |  |  | **-7.15** |

**B. Additional Points**

| No | Indikator | Status | Poin |
| --- | --- | --- | --- |
| 1 | Internal Auditor | ✅ Auditor terpilih (bidang QSHE) | 4 |
| 2 | Brand Ambassador | ❌ Tidak ikut | 0 |
| 3 | InJourney Mengajar | ✅ 1 kali mengajar | 2 |
| 4 | Relawan Bakti BUMN | ❌ Tidak ikut | 0 |
| 5 | Inkubasi Ide Inovasi | ❌ Tidak ikut | 0 |
| 6 | Change Agent (program) | ✅ 100% selesai | 2 |
| 7 | SME | ✅ Poin 60 (Verifikator KMAP) | 2 |
| 8 | Pengurus Organisasi | ✅ 1 organisasi (Baporkes) | 4 |
| 9 | Relawan Muda BUMN | N/A | 0 |
|  | **Total Additional Points** |  | **14** |

**C. Perhitungan Akhir**

```jsx
TES = 50 - 7.15 + 14 = 56.85

// Pembulatan dan normalisasi kalibrasi akhir
TES Final = 57 (dibulatkan)
```

<aside>
⚠️

**Catatan:** Ahmad memiliki TES terendah karena: (1) terdapat boundary penalty di 3 dari 4 indikator (-7.15 total), dan (2) hanya aktif di **5 dari 9** indikator tambahan (+14 poin).

</aside>

#### Ringkasan TES Ketiga Pekerja

| Pekerja | Default | Boundary Penalty | Additional Points | TES (Raw) | TES (Kalibrasi) |
| --- | --- | --- | --- | --- | --- |
| **Budi Santoso** | 50 | -2.40 | +20 | 67.60 | **68** |
| **Siti Rahayu** | 50 | 0 | +28 | 78.00 | **78** |
| **Ahmad Fauzi** | 50 | -7.15 | +14 | 56.85 | **57** |

<aside>
💡

**Insight:** TES mencerminkan tingkat *engagement* dan kontribusi di luar tugas pokok. Pekerja dengan kinerja tinggi (seperti Siti) cenderung juga memiliki TES tinggi karena proaktif dalam aktivitas tambahan. Namun TES bersifat **independent** dari kinerja -- pekerja dengan kinerja moderat tetap bisa mendapatkan TES tinggi jika aktif berkontribusi di luar tugas pokok.

</aside>

---

*Dokumen ini menggunakan data fiktif untuk keperluan ilustrasi. Konfigurasi bobot dan threshold mengacu pada konfigurasi default yang didefinisikan dalam BRD Talent Admin Headquarter v2.*