# Fitur Baru Portal Rinjani

## 1. Notification Center (Pusat Notifikasi)

### Lokasi
Dapat diakses dari Header (ikon lonceng/bell di kanan atas)

### Fitur Utama
- **Variasi Notifikasi:**
  - 🔔 **Approval Reminder**: Notifikasi untuk approval yang menunggu (KPI, Data Change, dll)
  - 📅 **Deadline Reminder**: Pengingat deadline survey, performance review, dll
  - 📢 **General Announcement**: Pengumuman umum dari HR atau manajemen

- **Filter Tab**: Filter notifikasi berdasarkan jenis (Semua, Approval, Deadline, Pengumuman)

- **Fitur Admin:**
  - Tombol "Kirim Pesan" untuk mengirim notifikasi baru
  - Form kirim pesan dengan:
    - Judul Pesan
    - Isi Pesan
    - Target Penerima (Semua Karyawan / Per Departemen)

- **Fitur Umum:**
  - Mark as read (klik notifikasi untuk menandai sudah dibaca)
  - Mark all as read (tandai semua sebagai sudah dibaca)
  - Unread count indicator
  - Timestamp dan informasi pengirim

### User Stories
- **Admin**: Dapat mengirim pesan/pengumuman ke seluruh karyawan atau per departemen
- **User**: Menerima notifikasi approval, deadline, dan pengumuman dengan timestamp

---

## 2. Multi-Platform Channel (App Switcher)

### Lokasi
Dapat diakses dari Header (ikon dashboard/grid di kanan atas)

### Fitur Utama
- **Access Control**: Aplikasi dibatasi berdasarkan:
  - User Role (Admin/User)
  - Organization/Department
  - Combination of both

- **Kategori Aplikasi:**
  - 👥 **HR**: Rinjani Portal, KPI Management, Learning Hub
  - 💰 **Finance**: Finance Portal, Payroll System
  - 🏢 **Operations**: Procurement, Asset Management
  - 🖥️ **IT**: IT Service Desk, Infrastructure

- **Fitur:**
  - Search bar untuk mencari aplikasi
  - Filter berdasarkan kategori
  - Informasi user (Role & Department)
  - Lock indicator untuk aplikasi yang tidak dapat diakses
  - Deskripsi akses requirement pada locked apps

### User Stories
- **Admin**: Dapat mengakses semua aplikasi termasuk yang restricted
- **User**: Dapat melihat aplikasi yang tersedia sesuai department dan role
- **All**: One-click access ke aplikasi terintegrasi

### Access Control Examples
```typescript
// Finance Portal - Admin Only + Specific Departments
requiredRole: "Admin"
requiredDepartment: ["Finance", "Accounting"]

// Payroll System - Admin Only + HR or Finance
requiredRole: "Admin"
requiredDepartment: ["Human Capital", "Finance"]

// IT Service Desk - All users
requiredRole: "All"
```

---

## 3. Help & Support

### Lokasi
Dapat diakses dari Header (ikon headset di kanan atas)

### Kategori Bantuan

#### 📚 **Guide Book**
- Panduan Pengguna Rinjani Portal
- Tutorial KPI Management
- Employee Survey Guide
- User Management Manual

#### 🎧 **Helpdesk**
- Submit Ticket
- Live Chat Support (08:00-17:00)
- My Tickets
- FAQ

#### ⚙️ **ITSM (IT Service Management)**
- Service Catalog
- Request New Service
- Incident Management
- Change Management
- Asset Management

#### 📄 **HC Digi Policy**
- Lihat Semua Kebijakan HC
- Kebijakan Cuti & Absensi
- Employee Code of Conduct
- Compensation & Benefit
- Performance Management

### Fitur
- Search untuk mencari bantuan/kebijakan
- Category view dan detail view
- Quick access links
- Direct navigation ke HC Digi Policy page

---

## 4. HC Digi Policy (Halaman Terpisah)

### Lokasi
Dapat diakses dari Help & Support → HC Digi Policy atau langsung via hash `#/hc-policy`

### Fitur Utama

#### **Dokumen Kebijakan HC**
- **Scope Management:**
  - 🌍 Global: Berlaku untuk seluruh entitas
  - 🏢 Entity: Berlaku untuk entitas tertentu (Jakarta, Bali, dll)

- **Filter & Search:**
  - Search dokumen by title/description
  - Filter by Scope (All/Global/Entity)
  - Filter by Category (Leave & Attendance, Code of Conduct, Compensation, dll)

- **Document Information:**
  - Title & Description
  - Version number
  - Upload date & last modified
  - Upload by (user)
  - Download count & view count
  - File size
  - Status (Active/Draft/Archived)

- **Document Actions:**
  - 👁️ Preview: Lihat dokumen
  - 📥 Download: Download dengan watermark otomatis

#### **Audit Log**
- Track semua aktivitas:
  - ⬆️ Upload: Siapa upload dokumen
  - 📥 Download: Siapa download dokumen
  - 👁️ View: Siapa view dokumen
- Informasi lengkap:
  - Timestamp
  - User
  - IP Address
  - Document name

#### **Admin Features**
- Upload dokumen baru
- Set scope (Global/Entity)
- Set category
- Manage version

#### **Watermark System**
Setiap dokumen yang didownload akan otomatis diberi watermark:
```
Downloaded by {userEmail} on {timestamp}
```

### User Stories

#### **Admin HC/IT**
- Upload dokumen kebijakan baru
- Manage scope (Global atau per Entitas)
- View audit trail lengkap
- Monitor download & view statistics

#### **All Users**
- Browse dokumen kebijakan by scope dan category
- Search dokumen
- View & download dokumen dengan watermark
- Lihat version history

### Security & Compliance
- ✅ Audit trail untuk semua aktivitas
- ✅ Watermark otomatis untuk tracking
- ✅ Access control based on scope
- ✅ Version control
- ✅ IP address logging

---

## Technical Implementation

### Variabel CSS Used
Semua komponen menggunakan variabel dari `/styles/globals.css`:
- Colors: `--primary`, `--accent`, `--muted`, `--foreground`, dll
- Typography: `--text-*` (xl, lg, base, sm, xs)
- Font weights: `--font-weight-*` (normal, medium, semibold)
- Spacing & Radius: sesuai design system

### Font Face
Hanya menggunakan font yang sudah defined:
- Inter (Regular, Medium, Semi Bold)

### State Management
- Notification Center: Local state untuk notifications
- App Switcher: Access control logic berdasarkan userRole & userDepartment
- Help Support: Modal-based navigation
- HC Digi Policy: Full page dengan routing

### Routing
```typescript
// Hash-based routing di App.tsx
#/hc-policy → HCDigiPolicy component
```

---

## Demo Credentials

### Admin Account
```
Email: dimas@injourney.co.id
Password: Injourney@2025
Role: Admin
Department: Human Capital
```

### User Account
```
Email: binavia@injourney.co.id
Password: Injourney@2025
Role: User (can be switched)
Department: Human Capital
```

---

## Future Enhancements

### Notification Center
- [ ] Real-time notifications dengan WebSocket
- [ ] Push notifications
- [ ] Email integration
- [ ] Notification preferences per user

### App Switcher
- [ ] SSO integration
- [ ] Dynamic app list dari backend
- [ ] Recently used apps
- [ ] Favorite apps

### HC Digi Policy
- [ ] Actual watermark implementation (PDF)
- [ ] Document approval workflow
- [ ] Expiry date management
- [ ] Multi-language support
- [ ] Digital signature
