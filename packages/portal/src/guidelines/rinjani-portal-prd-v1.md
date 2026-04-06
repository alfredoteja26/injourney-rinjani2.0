## Ringkasan Update

- Scope **SSO Microsoft**: tim hanya menyediakan **interfacing** (konfigurasi authn/authz sesuai standar Rinjani), **bukan implementasi penuh**.
- **Tidak termasuk** Centralized User Management.
- Setup **Microsoft Entra ID** menjadi tanggung jawab client.
- Login Microsoft Account pada prototype: **mock**.
- Tambah kebutuhan **CMS** untuk pengelolaan banner/konten Landing Page.
- **Notification Center**: 3 tipe utama (Approval Reminder, Deadline Reminder, General Announcement) + GA dapat dikirim dari dashboard admin.
- **App Switcher**: pakai asset icon **SVG** terbaru + perlu user story **filtering akses aplikasi** berbasis User Auth/Organization Detail.
- **My Profile**: akses edit per atribut mengikuti matrix edit/view pada dokumen data catalogue; perubahan data via mekanisme **request–approval**.
- **User Management (Admin-only)**: kelola profil karyawan lain + approve/reject request perubahan.
- **Role Management** dibatasi untuk approval process dan konfigurasi CMS.
- Tambah fitur **Employee Survey** (Likert, NPS 0–10, Single Option 2–6) + admin manage survey + user bisa lihat historical.
- Tambah fitur **Rinjani Search (Proposed)**: search profil pekerja lain + policy docs.
- Tidak ada rencana **mobile version**.

---

## 1. Introduction

### 1.1 Background

Rinjani Portal adalah **entry point** untuk mengakses aplikasi dalam ekosistem InJourney (mis. Talent, Performance, HRIS, dll) dan menyediakan general features: autentikasi, landing page, notifikasi, app switcher, help/support, dan profil.

**Prinsip scope penting (hasil meeting):**

- Portal hanya melakukan **interfacing** untuk SSO Microsoft.
- Portal **tidak** membangun centralized user management.
- Setup Microsoft Entra ID bukan scope tim portal.

### 1.2 Product Goal

- Menyediakan portal web sebagai hub:
    - Sign In & Session Management (interfacing SSO)
    - Landing Page & Information Hub (termasuk CMS)
    - Notification Center
    - Multi-Platform Channel (App Switcher)
    - My Profile (self-service + approval)
    - User Management (Admin-only)
    - Employee Survey
    - Help & Support
    - Rinjani Search (proposed)

### 1.3 Success Metrics

| Goal | Metric | Current | Target |
| --- | --- | --- | --- |
| Keandalan akses | Login success rate (attempt valid) | Baseline | ≥ 98% |
| Efektivitas navigasi | % akses fitur utama ≤ 3 klik dari Landing Page | Baseline | ≥ 90% |
| Notifikasi efektif | Read rate notifikasi penting | Baseline | ≥ 85% |
| App switcher stabil | % klik app switcher berhasil tanpa error kritikal | Baseline | ≥ 99% |

### 1.4 In Scope / Out of Scope

**In Scope**

- Portal layer UI + routing + konfigurasi akses.
- Interfacing SSO Microsoft (authn/authz) sesuai standar Rinjani.
- CMS untuk banner/konten landing page.
- Notification center (3 tipe) + GA publish dari admin.
- App switcher dengan filtering akses aplikasi.
- My Profile + approval workflow (request–approve/reject).
- Admin user management untuk approve/reject & manage profil.
- Employee Survey (user fill + admin manage + report).

**Out of Scope**

- Implementasi Microsoft Entra ID.
- Centralized User Management (IAM enterprise).
- Implementasi fitur bisnis full di downstream apps (EQS, KPI, dll) — portal hanya **consume** bila tersedia.
- Mobile app.

---

## 2. Actors & Roles

- **End User**: akses portal, lihat info, gunakan app switcher, kelola My Profile (request perubahan), isi survey.
- **Admin**: kelola konten CMS, kelola survey, kelola akses/role terbatas, approve/reject perubahan profil, manage profil user lain.
- **System / Integrations**: IdP (Microsoft), sumber data employee/org/auth, sistem notifikasi, dsb.

---

## 3. Epics (Updated)

1. Sign In & Session Management
2. Landing Page & Content Management (CMS)
3. Notification Center
4. Multi-Platform Channel (App Switcher)
5. My Profile (Self Service + Approval)
6. User Management (Admin-only)
7. Employee Survey
8. Help & Support
9. Rinjani Search (Proposed)

---

## 4. Epic Detail & User Stories (Delta dari meeting)

### 4.1 Epic 1 — Sign In & Session Management (SSO Interfacing)

**Clarification:**

- Portal hanya melakukan konfigurasi integrasi autentikasi/otorisasi sesuai standar Rinjani.
- Portal tidak melakukan implementasi Entra ID.
- Prototype: Microsoft Account login **mock**.

**User Stories (add/update)**

- US-AUTH-01 — SSO Microsoft (Interfacing Only)
    - AC:
        - Portal melakukan redirect/handshake ke IdP sesuai konfigurasi.
        - Portal menolak asumsi scope “setup Entra”.
        - Jika mapping user tidak tersedia, portal menampilkan error yang aman.
- US-AUTH-02 — Non-goal: Centralized User Management
    - AC:
        - Tidak ada fitur create/manage user directory enterprise di portal.

### 4.2 Epic 2 — Landing Page & Content Management (CMS)

**Requirement baru:** CMS untuk pengelolaan banner dan konten.

**User Stories (add)**

- US-CMS-01 — Admin mengelola banner
    - Admin dapat create/update/delete banner.
    - Banner punya: title, image, link, start/end publish, target audience (opsional), status.
- US-CMS-02 — Admin mengelola konten card/announcement
    - Admin dapat publish General Announcement (sinkron dengan Notification Center tipe GA).

**Note dependency:** Card data seperti EQS/KPI bergantung pada modul lain yang menghasilkan data.

### 4.3 Epic 3 — Notification Center

**Requirement update:** 3 tipe notifikasi.

- Approval Reminder
- Deadline Reminder
- General Announcement (admin bisa kirim via dashboard)

**User Stories (update)**

- US-NOTIF-01 — User melihat tab notifikasi berdasarkan tipe.
- US-NOTIF-02 — Admin mengirim General Announcement.
    - AC:
        - Admin dapat buat pesan, target audience, jadwal publish, dan expiry.
        - Notifikasi tampil di Notification Center dan bisa ditampilkan di landing page (jika diset).
- US-NOTIF-03 — Contoh approval reminder untuk My Profile change request.
- US-NOTIF-04 — Contoh deadline reminder untuk batas pengisian My Profile.

### 4.4 Epic 4 — Multi-Platform Channel (App Switcher)

**Requirement update:**

- Icon asset menggunakan format **SVG**.
- Filtering akses aplikasi berdasarkan User Auth/Organization Detail.

**User Stories (add/update)**

- US-APP-01 — App switcher menampilkan hanya aplikasi yang boleh diakses user.
    - AC:
        - Daftar aplikasi didapat dari API portal (entitlement).
        - User berbeda bisa punya daftar berbeda (mis. SAP only vs Mekari only).
- US-APP-02 — Admin/IT manage mapping entitlement (jika masuk scope; minimal config).

### 4.5 Epic 5 — My Profile (Self Service + Approval)

**Requirement update:**

- Akses edit per atribut mengikuti matriks edit/view pada dokumen data catalogue.
- Perubahan data via request–approval.

**User Stories (add/update)**

- US-PROFILE-01 — User melihat profil.
- US-PROFILE-02 — User mengajukan perubahan untuk atribut yang diizinkan.
- US-PROFILE-03 — Sistem membuat change request + audit trail.
- US-PROFILE-04 — Admin approve/reject change request.
- US-PROFILE-05 — Indikator perubahan (visual marker) pada data yang sedang direview.

### 4.6 Epic 6 — User Management (Admin-only)

**Requirement:** admin dapat mengelola profil karyawan lain + approval.

**User Stories (add)**

- US-ADMIN-USER-01 — Admin search & open profil karyawan.
- US-ADMIN-USER-02 — Admin melihat daftar change request yang pending.
- US-ADMIN-USER-03 — Admin approve/reject.

**Role management scope:** terbatas untuk approval process + konfigurasi CMS.

### 4.7 Epic 7 — Employee Survey

**Requirement baru:**

- Tipe survey:
    - Likert Scale
    - Net Promoter Score (strict 0–10)
    - Single Option (min 2, max 6)
- User bisa tambah comment (optional)
- Admin create/manage survey + lihat hasil (analytic & raw)
- User bisa akses historical survey
- Akses pengisian & preview hasil sebaiknya halaman terpisah, entry dari landing page
- Terminologi: **survey** (bukan assessment)

**User Stories (add)**

- US-SURVEY-01 — User melihat survey aktif.
- US-SURVEY-02 — User mengisi survey.
- US-SURVEY-03 — User melihat status submit + historical.
- US-SURVEY-04 — Admin membuat survey (title, period, target audience, due date, question type).
- US-SURVEY-05 — Admin melihat hasil (analytic view & raw response view).
- US-SURVEY-06 — Admin set opsi “user bisa preview hasil setelah submit” (optional).

### 4.8 Epic 8 — Help & Support

(No change dari meeting; tetap sebagai entry point ke guide/helpdesk/ITSM.)

### 4.9 Epic 9 — Rinjani Search (Proposed)

**Requirement:** user dapat search profil pekerja lain dan dokumen policy (HC Digi Policy). Fitur ini sudah ada sejak Rinjani 1.0.

---

## 5. Delivery Notes

- Prototype Figma sudah tersedia untuk Sign In, Update My Profile (one shot), dan landing page.
- Timeline: estimasi selesai 2–3 minggu, target draft minggu pertama Januari.
- Developer fokus portal (frontend detail sampai beres).

---

## 6. Open Items

- Request SVG icons dari Mbak Via.
- Explore side panel “Employee General Information” untuk reuse di modul lain.
- Cari inspirasi UI dari Mobbin.