## Product Charter: Rinjani Performance

**Project Code:** INJ-BPR

**Product:** Rinjani Performance (InJourney HCMIS - Performance Management Module)

**Version:** 1.0

**Date:** 2026-01-07

---

## 1. Product Vision

Menyediakan sistem penilaian kinerja karyawan yang terintegrasi untuk seluruh entitas InJourney Group, mendukung siklus **Goal Setting → Check-In → Year-End Review** sesuai Peraturan Direksi PD.INJ.03.04/12/2022/A.0022.

---

## 2. Target Users

| **Role** | **Description** | **Primary Modules** |
| --- | --- | --- |
| Karyawan | Seluruh karyawan aktif yang dinilai kinerjanya | My KPI |
| Atasan Langsung | Pejabat yang membina, memberi perintah kerja, dan menilai karyawan | My KPI, My Team KPI |
| HC Admin | Administrator fungsi Penilaian Kinerja di unit kerja | KPI Library, KPI Tree, KPI Headquarter |
| HC Admin HO | Administrator Penilaian Kinerja level Holding (lintas perusahaan) | KPI Headquarter (full access) |

---

## 3. Modules Overview

| **Module** | **Code** | **Purpose** | **Primary Users** |
| --- | --- | --- | --- |
| My KPI | SEC-MK | Melihat dan mengelola KPI individu, check-in, year-end review | Karyawan, Atasan |
| My Team KPI | SEC-MT | Mengelola KPI tim, cascading, approval, monitoring bawahan | Atasan Langsung |
| KPI Library | SEC-KL | Kamus KPI standar untuk rekomendasi dan standardisasi | HC Admin, Atasan |
| KPI Tree | SEC-KT | Visualisasi hierarki KPI dari korporat hingga individu | HC Admin, Atasan |
| KPI Headquarter | SEC-HQ | Konfigurasi bobot per cohort, periode, dan pengaturan sistem | HC Admin, HC Admin HO |

---

## 4. KPI Structure

### 4.1 KPI Types

| **Jenis KPI** | **Definisi** | **Scope** | **Monitoring** |
| --- | --- | --- | --- |
| **KPI Bersama** | KPI yang disepakati menjadi tanggung jawab bersama, mengadopsi KPI Direksi secara kolegial | Corporate/Business level | Triwulan, Semester, Tahun |
| **KPI Unit** | KPI yang mencerminkan tugas, fungsi, dan tanggung jawab individu pada kinerja unit kerja | Individual/Position level | Triwulan, Semester, Tahun |

### 4.2 Bobot per Job Type (Pasal 3)

| **Job Type** | **KPI Bersama** | **KPI Unit** | **Total** |
| --- | --- | --- | --- |
| Jabatan Struktural | 40% | 60% | 100% |
| Jabatan Non-Struktural (Fungsional) | 0% | 100% | 100% |

---

## 5. Assessment Cycle (Pasal 5)

Siklus Penilaian Kinerja terbagi menjadi **3 tahap**:

### 5.1 Goal Setting (Pasal 6)

- Proses penyusunan kesepakatan antara Atasan Langsung dengan Karyawan
- Menetapkan KPI Individu melalui proses Cascading KPI
- KPI disusun dengan konsep **SMART** (Specific, Measurable, Attainable, Relevant, Time Bound)

### 5.2 Check-In (Pasal 7)

- Proses pemantauan dan pencatatan perkembangan capaian kinerja
- Minimal **3 kali** dalam satu siklus penilaian
- Tidak ada pemberian rating pada proses ini

### 5.3 Year-End Review (Pasal 8)

- Evaluasi kinerja akhir oleh Atasan Langsung
- Menghasilkan **Performance Index (PI)** dan **Performance Rating (PR)**
- Karyawan minimal masa kerja **3 bulan** untuk diikutsertakan

---

## 6. Performance Scoring (Pasal 9)

### 6.1 Rating Scale (1-5)

| **Rating** | **Label** | **PI Range** |
| --- | --- | --- |
| 1 | Unsuccessful | 1.00 - 1.49 |
| 2 | Partially Successful | 1.50 - 2.49 |
| 3 | Successful | 2.50 - 3.49 |
| 4 | Excellent | 3.50 - 4.49 |
| 5 | Outstanding | 4.50 - 5.00 |

### 6.2 Performance Index Formula

**Jabatan Struktural:**

$PI = \sum (nilai\ KPI\ Bersama \times bobot) + \sum (nilai\ KPI\ Unit \times bobot)$

**Jabatan Non-Struktural:**

$PI = \sum (nilai\ KPI\ Unit \times bobot)$

---

## 7. RBAC Matrix

| **Permission** | **Karyawan** | **Atasan** | **HC Admin** | **HC Admin HO** |
| --- | --- | --- | --- | --- |
| View own KPI | ✓ | ✓ | ✓ | ✓ |
| Submit realisasi | ✓ | ✓ | - | - |
| View team KPI | - | ✓ | ✓ | ✓ |
| Approve KPI/realisasi | - | ✓ | - | - |
| Cascade KPI | - | ✓ | - | - |
| Manage KPI Library | - | - | ✓ | ✓ |
| Configure cohort weights | - | - | ✓ (own company) | ✓ (all) |
| Manage periods/schedules | - | - | - | ✓ |

---

## 8. Key Differentiators from Portaverse PMS

| **Aspect** | **Portaverse (Pelindo)** | **Rinjani (InJourney)** |
| --- | --- | --- |
| KPI Types | Impact, Output, KAI, Sub-Impact | KPI Bersama, KPI Unit only |
| Monitoring Frequency | Daily, Weekly, Monthly, Quarterly | Triwulan, Semester, Tahun only |
| Job Types | Structural, Functional, General | Struktural, Non-Struktural |
| Common KPI | Yes (AKHLAK, etc.) | No |
| Activity-level tracking | Yes (daily checklist) | No |

---

## 9. Regulatory Reference

- **Peraturan Direksi:** PD.INJ.03.04/12/2022/A.0022 tentang Penilaian Kinerja Karyawan di Grup PT Aviasi Pariwisata Indonesia (Persero)
- **Tanggal Ditetapkan:** 26 Desember 2022
- **Ditandatangani:** Dony Oskaria (Direktur Utama)

---

## 10. Source Reference

- [[INJ-BPR] KPI Goal Setting](https://www.notion.so/INJ-BPR-KPI-Goal-Setting-75292f8b7e8b42caae10e0da7a7d98f6?pvs=21)
- [[INJ-DH] Data Catalogue & Data Model](https://www.notion.so/INJ-DH-Data-Catalogue-Data-Model-d646faf37a9344efaea8bf732eb285f6?pvs=21)
- [Portaverse PMS 2025 (PEL-004-PMS)](https://www.notion.so/Portaverse-PMS-2025-PEL-004-PMS-9a6ac6f8e2bd4d0dbef773776153efb2?pvs=21)
- Perdir API PD.INJ.03.04/12/2022/A.0022 (attached)