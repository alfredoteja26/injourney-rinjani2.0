## User Stories — My Profile + User Management (Merged)

| No | Epic | User Type | User Story | Priority | Notes / Dependency |
| --- | --- | --- | --- | --- | --- |
| 1 | My Profile - View & Self-Service | End User | Sebagai End User, saya dapat melihat profil lengkap saya (Personal Info, Employment Info, Education, Family, Language Skills, Performance History, Learning History, Assignment History) sehingga saya dapat memverifikasi data personal dan employment. | Must | Source data dari employee master DWH. Mengacu pada entitas: employee_profile, employee_identification, employee_address, employee_education_history, employee_family_member, employee_language_skill, employee_performance_history, employee_learning_history, employee_assignment_history. |
| 2 | My Profile - View & Self-Service | End User | Sebagai End User, saya dapat melihat indikator visual pada field data yang menunjukkan status edit access (editable tanpa approval, editable dengan approval, read-only) sehingga saya memahami data mana yang dapat saya ubah. | Must | Butuh UI marker (icon/badge) berdasarkan Edit Roles dari Data Catalogue. |
| 3 | My Profile - View & Self-Service | End User | Sebagai End User, saya dapat melihat status change request yang sedang pending review (data yang sedang direview) sehingga saya memahami progres perubahan data saya. | Should | UI marker + request status dari workflow approval. |
| 4 | My Profile - Edit (Tanpa Persetujuan Admin) | End User | Sebagai End User, saya dapat mengubah data yang diizinkan tanpa approval (name_alias, ethnicity, private_email, home_phone, blood_type, photo_blob, language skills, education achievement_notes, assignment description) langsung tanpa persetujuan admin sehingga data preferensi personal saya tetap up-to-date. | Must | Merujuk pada field dengan Data Source "Rinjani (Self Service)" dan tanpa approval requirement. |
| 5 | My Profile - Edit (Tanpa Persetujuan Admin) | End User | Sebagai End User, saya dapat mengunggah foto profil (JPG/JPEG/PNG, max 2MB) sehingga profil saya memiliki identitas visual. | Must | Field: photo_blob. Butuh validation file type & size. |
| 6 | My Profile - Edit (Tanpa Persetujuan Admin) | End User | Sebagai End User, saya dapat menambah/mengubah/menghapus data language skills (bahasa, level listening/reading/speaking/writing, sertifikat) sehingga kompetensi bahasa saya terupdate. | Should | Child table: employee_language_skill. Butuh CRUD operation + certificate upload. |
| 7 | My Profile - Edit (Dengan Persetujuan Admin) | End User | Sebagai End User, saya dapat mengajukan perubahan data yang memerlukan approval admin (full_name, corporate_email, mobile_phone, address, NIK, NPWP, BPJS, family member, education history) sehingga perubahan data tetap sesuai governance. | Must | Matrix edit dari Data Catalogue. Field yang memerlukan Human Capital Business Partner/IT approval. |
| 8 | My Profile - Edit (Dengan Persetujuan Admin) | End User | Sebagai End User, saya dapat menyertakan dokumen/attachment sebagai bukti pendukung permintaan penyesuaian data (mis. KTP baru, ijazah, surat nikah, akta kelahiran anak) sehingga request saya dapat diverifikasi. | Must | Support upload dokumen pendukung untuk change request. Format: PDF, JPG, PNG (max 5MB per file). |
| 9 | My Profile - Edit (Dengan Persetujuan Admin) | System | Sebagai System, saya membuat change request + audit trail untuk setiap usulan perubahan data yang memerlukan approval sehingga perubahan dapat ditelusuri. | Must | Butuh request state (pending/approved/rejected) + log dengan timestamp + approver ID. |
| 10 | My Profile - Edit (Dengan Persetujuan Admin) | End User | Sebagai End User, saya menerima notifikasi ketika change request saya disetujui/ditolak sehingga saya mengetahui status perubahan data. | Should | Integrasi dengan Notification Center. |
| 11 | My Profile - Read-Only | System | Sebagai System, saya menampilkan data read-only (id_employee, new_nip, old_nip, employment_status, employment_type, job_class, position history, performance history, learning history dari LMS, secondary assignment) yang bersumber dari Data Warehouse sehingga data tersebut tidak dapat diubah baik oleh user maupun admin. | Must | Field dengan Data Source "DWH Generated" atau "API" yang di-produce oleh sistem lain. UI harus menunjukkan read-only state dengan jelas. |
| 12 | My Profile - Read-Only | End User | Sebagai End User, saya dapat melihat keterangan "Data ini disinkronkan dari Data Warehouse InJourney" pada field read-only sehingga saya memahami mengapa data tidak dapat diubah. | Should | Tooltip/helper text untuk user education. |
| 13 | My Profile - Sync | End User | Sebagai End User, saya dapat memicu sinkronisasi manual data profil saya dari Data Warehouse InJourney sehingga data terbaru dari HRIS dapat ditampilkan di Rinjani. | Should | Menggantikan "Request Sync to MDM" dari Portaverse. Butuh API call ke DWH sync endpoint. Tidak ada rate limiting untuk manual sync request. |
| 14 | My Profile - Sync | End User | Sebagai End User, saya dapat melihat timestamp terakhir sinkronisasi data (last sync time) sehingga saya mengetahui seberapa fresh data profil saya. | Could | Display last sync timestamp dari DWH metadata. |
| 15 | User Management (Admin) | Admin | Sebagai Admin (Human Capital Business Partner/Strategy), saya dapat mencari dan membuka profil karyawan lain sehingga saya dapat membantu pengelolaan data dan investigasi. | Must | Search by name, NIP, email, org unit. Access control berdasarkan role. |
| 16 | User Management (Admin) | Admin | Sebagai Admin, saya dapat melihat daftar change request yang pending approval sehingga proses approval terkelola. | Must | List view dengan filter (status, tipe perubahan, tanggal request) + sorting. |
| 17 | User Management (Admin) | Admin | Sebagai Admin, saya dapat approve/reject change request dengan memberikan catatan/alasan sehingga data final hanya berubah melalui kontrol otorisasi. | Must | Approval workflow dengan approval notes (mandatory untuk reject). Notifikasi ke requestor setelah approval/rejection. |
| 18 | User Management (Admin) | Admin | Sebagai Admin, saya dapat melihat audit trail lengkap untuk setiap perubahan data profil karyawan (siapa, kapan, apa yang diubah, dari nilai apa ke nilai apa) sehingga perubahan dapat ditelusuri untuk compliance. | Must | Audit log table dengan field: timestamp, actor (user/admin ID), field_name, old_value, new_value, request_id. |
| 19 | User Management (Admin) | Admin | Sebagai Admin, saya dapat mengubah data yang bersifat master organizational (company, org_unit, position_variant) sehingga struktur organisasi tetap akurat. | Should | Admin dengan role Human Capital Strategy/IT dapat edit organizational master data. Konfirmasi: apakah ini scope Rinjani atau di HRIS/DWH? |

## Acceptance Criteria Umum

- **Data Display**: Semua field mengikuti struktur Data Catalogue InJourney; data yang NULL/kosong ditampilkan dengan placeholder yang jelas (mis. "-" atau "Belum diisi").
- **Edit Access Matrix**: UI menerapkan edit access sesuai "Edit Roles / View Roles" dari Data Catalogue; validation error message jelas ketika user mencoba edit field yang tidak diizinkan.
- **Change Request Workflow**: Status request (pending/approved/rejected) terlihat; approval notes tersimpan dan ditampilkan; notifikasi terintegrasi dengan Notification Center.
- **Attachment Support**: Upload dokumen pendukung (PDF, JPG, PNG) dengan max file size validation; preview dokumen tersedia untuk admin saat review.
- **Audit Trail**: Setiap perubahan data (baik tanpa approval maupun via approval) tercatat dalam audit log dengan timestamp, actor, dan detail perubahan.
- **Data Sync**: Request sync manual memiliki rate limiting; last sync timestamp ditampilkan; error handling untuk sync failure dengan pesan yang informatif.
- **Responsive UI**: Styling modern dan UX improved dibanding Portaverse; mobile-responsive; accessibility (WCAG 2.1 AA).

## Open Items & Dependencies

- Konfirmasi scope pengelolaan organizational master data (company, org_unit, position) — apakah di Rinjani atau tetap di HRIS/DWH? Tetap request sinkronisasi data ke DWH.
- Manual sync request: tidak ada rate limiting.
- Akan ada Daily Background Job untuk seluruh data Tier 1.
- Policy storage untuk attachment dokumen pendukung (object storage + retention policy). Di-detailkan nanti.
- Integration contract dengan DWH sync API dan authentication mechanism. Di-detailkan nanti.
- UI/UX mockup untuk improved styling (perlu wireframe/design sprint). Akan saya buat via Figma Make.

## Appendix — Klasifikasi Data Employee (4 Tier)

Referensi utama: [[INJ-DH] Data Catalogue & Data Model](https://www.notion.so/INJ-DH-Data-Catalogue-Data-Model-d646faf37a9344efaea8bf732eb285f6?pvs=21).

| Tier | Label | Prinsip | Domain data (contoh) | Entitas / field (contoh) | Catatan implementasi My Profile |
| --- | --- | --- | --- | --- | --- |
| Tier 1 | Immutable / Sync Only (Gembok) | System of Record = HRIS/LMS / Silver SSOT. Tidak boleh edit manual di Rinjani. Perubahan hanya lewat sinkronisasi. | Identitas utama, employment status, org structure, riwayat kinerja, riwayat pekerjaan, kontrak, learning record | - `employee_profile`: `id_employee`, `new_nip`, `old_nip`, `full_name`, `corporate_email`, `employment_status`
- `employee_identification`: `id_nik`, `id_npwp`, `id_bpjs_tk`, `id_bpjs_kes`, `dt_birth`, `birth_place`, `gender`, `employment_type`, `job_class`
- `employee_address` (jika SoR HRIS): `street_address`, `city`, `province`, `postal_code`
- Org Master: `company`, `org_unit`, `position_master`, `position_variant`
- Riwayat: `performance_history` / `employee_performance_history`, `learning_history`, `employee_assignment_history`, `employee_contract` | UI Read-only + label sumber data (API/DWH Generated). Tidak ada tombol edit. |
| Tier 2 | Approval Required (Ticket) | Self-service tetapi high-risk (legal/benefit/compliance). Wajib approval + dokumen pendukung. | Keluarga untuk benefit, pendidikan & sertifikasi, perubahan identitas legal | - `employee_family_member` (spouse/child untuk benefit)
- `employee_education_history`: update ijazah baru + `certificate_blob`
- `employee_language_skill`: sertifikat TOEFL/IELTS + `certificate_blob`
- Perubahan `employee_identification` yang mengubah data master (mis. NIK/Paspor) | Masuk workflow change request + attachment; status request terlihat. |
| Tier 3 | Direct Update (Self Service) | Risiko rendah, personal/preferensi. Update langsung (tetap audit trail). | Kontak pribadi, preferensi, catatan non-legal | - Kontak: `private_email`, `home_phone`, `mobile_phone`
- Preferensi: `name_alias`, `ethnicity`, `blood_type` (opsional `religion` jika diputuskan)
- Detail keluarga non-benefit: `employee_family_member.occupation`
- Catatan: `employee_assignment_history.description`, `employee_education_history.achievement_notes` | Inline edit + validasi; tampilkan “last updated” + audit trail ringan. |
| Tier 4 | Rinjani Produced (Read Only / Engine Result) | Hasil kalkulasi/engine Rinjani (Gold inbound). Read-only untuk user; berubah via proses engine. | Talent analytics & calibration | - `career_aspiration`
- `eqs_score`
- `nine_box_classification`
- `talent_pool`
- `calibration_result` | Tampil sebagai insight/summary; bukan field edit di My Profile. |

### My Profile — Pages to create

1. **My Profile (Overview / Landing)**
2. **My Profile — Personal Info**
3. **My Profile — Employment Info**
4. **My Profile — Education**
5. **My Profile — Family**
6. **My Profile — Language Skills**
7. **My Profile — Performance History**
8. **My Profile — Learning History**
9. **My Profile — Assignment History**
10. **My Profile — Edit Request (Wizard/Form)**
11. **My Profile — Edit Review Status (My Requests)**
12. **My Profile — Attachments (Supporting Docs)**
13. **My Profile — Sync Status (Last Sync + Manual Sync)**

### My Profile — UI components to create

### Global / Shell

- Profile header (photo, name, NIP, org, position)
- Tab navigation (sections listed above)
- Global “Edit” entry point + “Sync” action
- Read-only indicator + “Source” tooltip (“DWH Generated / API / Self Service”)
- Field-level access badges: `Editable (No Approval)` / `Editable (With Approval)` / `Read-only`

### View Components (per section)

- Section layout template (two-column label/value, consistent spacing)
- Field renderer library:
    - Text, number, date, select
    - Phone, email
    - Address (structured)
    - ID fields (NIK, NPWP, BPJS)
- Empty state + placeholder rules (“-”, “Belum diisi”)
- Change highlight marker (field is under review / pending)

### Edit (No Approval) Components

- Inline edit rows (pencil icon, save/cancel)
- Upload photo component (JPG/JPEG/PNG, max 2MB)
- Repeater editor for child records:
    - Language skills CRUD (levels listening/reading/speaking/writing)
    - Education CRUD (plus achievement_notes)
    - Assignment CRUD (description)
- Client-side validation + error messaging

### Edit (With Approval) Components

- Change Request builder (diff view: old → new)
- Attachment uploader (PDF/JPG/PNG, max 5MB per file)
- Submit confirmation + generated request ID
- Request timeline/status component (Pending/Approved/Rejected + timestamps)
- Notification hooks (on approved/rejected)

### Workflow / Audit Components (System-facing, still in My Profile scope)

- Audit trail viewer (per request: actor, timestamp, field, old_value, new_value, request_id)
- Request detail view (shows approval notes when rejected)

### Sync Components

- “Last sync time” widget
- Manual sync trigger + loading/progress state
- Sync error banner (safe messaging)