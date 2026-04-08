# Sprint: My Team KPI (Stitch) — Planning Approval Depth

**Suggested length:** 1 sprint (design-heavy; adjust capacity if React Prototype++ work runs in parallel).  
**Primary sources:** `docs/design-input-packs/performance/exports/dip-3-my-team-kpi-planning-approval-cascading-v0.1.md`  
**Explicitly out of scope for this sprint:** DIP-4 monitoring, verification queues, year-end assessment (schedule as Sprint 3).

---

## Sprint goal

Ship a **coherent manager planning sub-flow** in Google Stitch that starts from **Progress Perencanaan Tim** and covers **portfolio review**, **per-item and portfolio-level decisions**, **batch approve outcomes**, and **Path B + Penurunan KPI** — with the same shell, Rinjani Peak tokens, Bahasa Indonesia copy, and reference dataset (Dimas / Binavia / Fajar / Sinta) as Screen 1.

---

## Starting point (already delivered)

- **Stitch:** `projects/4201029456809424526/screens/d498f778dce04311bd40b3b03453b094` — *My Team KPI - Progress Perencanaan Tim*  
- **Repo exports:** `.stitch/designs/my-team-kpi-01-progress-perencanaan-tim.{png,html}`  
- **Covers:** US-MT-001 (team planning progress overview)

---

## Backlog (priority order)

### P0 — Must ship this sprint

| # | Deliverable | User stories | Acceptance notes |
|---|-------------|--------------|------------------|
| 1 | **Review portofolio bawahan (Binavia)** — full-screen or main canvas + optional right insight rail | US-MT-002 | Group items **KPI Bersama** vs **KPI Unit**; per baris: judul, badge jenis, bobot item, target (tetap/progresif), polaritas, sumber, badge penurunan jika ada, status. Tampilkan total bobot per jenis dan indikator validitas 40/60. Sisipkan perbandingan ringkas dengan portofolio atasan (Dimas) untuk cek alignment — boleh ringkas (kolom atau strip) asal jelas. |
| 2 | **Bilah aksi persetujuan** pada layar review | US-MT-003 (partial) | Tombol/aksi: Setujui Portofolio, Tolak, Minta Klarifikasi, Setujui dengan Penyesuaian (inline edit bobot/target). **Setujui** diblokir jika bobot tidak valid (mirror Fajar/Sinta di overview; Binavia valid). |
| 3 | **State modals / dialogs** (bisa sebagai varian Stitch terpisah jika perlu) | US-MT-003 | **Tolak** dan **Minta Klarifikasi**: catatan wajib (DIP: minimal 10 karakter untuk tolak). **Konfirmasi setujui** sebelum commit. **Setujui dengan penyesuaian**: tampilkan ringkasan perubahan + jejak audit sebagai label sekunder `[TBD]` jika detail sistem belum ditentukan. |
| 4 | **Batch approve — alur lengkap** | US-MT-007 | Dari overview: multi-select, **Approve Terpilih** enabled hanya jika status + bobot valid; konfirmasi dengan jumlah bawahan; layar atau panel **ringkasan hasil** (“2 berhasil, 0 gagal”) + bawahan dengan checkbox disabled + tooltip untuk yang tidak memenuhi syarat. |

### P1 — Ship if P0 stabil; otherwise spill to Sprint 2b

| # | Deliverable | User stories | Acceptance notes |
|---|-------------|--------------|------------------|
| 5 | **Path B — drawer / panel “Susun KPI untuk Bawahan”** (konteks Sinta atau NOT_STARTED lain) | US-MT-004 | Form setara draf karyawan: dari KPI Library, kustom, atau referensi portofolio atasan; beberapa item; submit → status **WAITING_REVIEW**; notifikasi copy sesuai DIP. |
| 6 | **Penurunan KPI — drawer alur** | US-MT-005, US-MT-006 | Pilih KPI dari portofolio Dimas (`KPI-VP-001`, `KPI-VP-010`); metode **Penurunan Langsung** vs **Penurunan Tidak Langsung**; multi-select bawahan; target per bawahan; toggle **Akumulasi Realisasi dari Bawahan** dengan disabled + tooltip untuk kasus tidak kompatibel (indirect / unit beda). |
| 7 | **Flow link kit** (breadcrumb + CTA konsisten) | — | Samakan pola dengan alur My KPI terpadu: `My Team KPI > Progress Tim > Review Portofolio (Binavia)` dll.; setiap layar punya “kembali” eksplisit ke langkah sebelumnya. |

---

## Terminology guardrails (non-negotiable)

- UI **Bahasa Indonesia**; identifier teknis English di belakang layar boleh tidak ditampilkan.  
- Gunakan **KPI Bersama**, **KPI Unit**, **Bobot**, **Penurunan Langsung / Penurunan Tidak Langsung**, **Akumulasi Realisasi** — hindari “cascading”, “top-down”, **KPI Impact**, **KPI Output**, **KAI**.  
- Data tidak ada di DIP → literal **`[TBD]`**.

---

## Reference content to load into prompts

- **Pending approval (Binavia):** KPI-B-001, KPI-B-002, KPI-U-001 … KPI-U-004 dengan bobot seperti di DIP-3 §4.  
- **Existing cascade:** `KPI-VP-010` → `KPI-U-004` (Binavia), direct, accumulation false.  
- **Dimas KPI untuk cascade:** KPI-VP-001, KPI-VP-010.

---

## Definition of Done

1. Setiap layar/varian utama di Stitch memiliki **screenshot + HTML** di `.stitch/designs/` dengan penamaan konsisten, misalnya:  
   `my-team-kpi-02-review-portfolio-binavia.{png,html}`,  
   `my-team-kpi-03-approval-modals.{png,html}`,  
   `my-team-kpi-04-batch-approve-result.{png,html}`,  
   `my-team-kpi-05-path-b-draft-drawer.{png,html}`,  
   `my-team-kpi-06-penurunan-kpi-drawer.{png,html}`.  
2. **Satu catatan singkat** (opsional, ≤ 1 halaman) di `docs/design-input-packs/performance/exports/` hanya jika ada gap signifikan vs DIP — pola sama seperti gap note My KPI.  
3. Product dapat **menyusuri alur** dari Progress Tim → Review → keputusan → (opsional) Path B / Penurunan tanpa melompat gaya visual antar layar.

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Stitch “menuhkan” satu layar dengan terlalu banyak modal | Pecah menjadi **beberapa screen IDs** (variants) lalu hubungkan lewat copy navigasi; atau satu layar + `generate_variants` untuk state dialog. |
| Pelanggaran istilah (e.g. “Cascading”) | Checklist paste di setiap prompt + satu pass `edit_screens` hanya untuk copy. |
| Scope P1 membengkak | **Freeze** setelah P0 di-review; P1 item 5–6 bisa dipecah sprint berikutnya jika waktu habis. |

---

## Suggested next sprint preview (Sprint 3 — DIP-4)

Team monitoring dashboard, backlog realisasi, panel verifikasi bukti, batch verify, dan kartu risiko (on track / at risk / overdue) — tetap dataset Binavia/Fajar/Sinta Q1–Q2 dari DIP-4.
