# User Management Feature - Rinjani Portal

## Overview
Fitur User Management adalah halaman khusus admin untuk mengelola profil karyawan, role management, dan approval data change requests.

## Features

### 1. User List Management
- **View All Users**: Daftar lengkap semua karyawan dengan informasi:
  - Employee ID
  - Name & Email
  - Role (Admin/User)
  - Department & Position
  - Status (Active/Inactive)
  - Pending Requests Count
  - Last Login Date
  
- **Search & Filter**:
  - Search by name, email, or employee ID
  - Filter by Role (Admin/User/All)
  - Filter by Department

- **User Actions**:
  - View Profile: Melihat detail lengkap profil karyawan
  - Change Role: Mengubah role user antara Admin dan User

### 2. Pending Requests Management
- **View All Pending Requests**: Daftar semua request perubahan data yang menunggu approval
- **Request Details**:
  - Employee Information
  - Field Name yang diubah
  - Current Value vs Requested Value
  - Reason for Change
  - Supporting Documents (downloadable)
  - Tier Information
  
- **Approval Actions**:
  - Approve: Menyetujui perubahan data
  - Reject: Menolak perubahan data (requires admin comments)

### 3. Role Management
- **Admin Role**: Full access untuk manage employees dan approve requests
  - View and manage all employee profiles
  - Approve or reject data change requests
  - Assign and manage user roles
  - Access to admin-only features

- **User Role**: Standard access untuk self-service
  - View and edit own profile
  - Submit data change requests for approval
  - Track request status

### 4. User Detail View
Tampilan lengkap profil karyawan dengan tab navigation:
- **Personal Information**: NIK, Birth Place/Date, Gender, Religion, Blood Type, Tax & Insurance
- **Employment Details**: Employee ID, Employment Type, Job Class, Start Date, Grade, Retirement Date
- **Contact & Address**: Email, Phone, Alamat KTP/Tetap/Sementara
- **Documents**: Document management (coming soon)

## Access Control

### Admin Access (userRole="Admin")
- Menu "User Management" akan muncul di sidebar
- Full access ke semua fitur User Management
- Dapat approve/reject data change requests
- Dapat mengubah role user lain

### User Access (userRole="User")
- Menu "User Management" tidak terlihat di sidebar
- Hanya dapat mengakses My Profile untuk self-service
- Submit data change requests yang memerlukan approval

## Technical Implementation

### Components
1. **UserManagement.tsx** - Main page dengan dual-view (Users & Requests)
2. **RoleManagementModal.tsx** - Modal untuk change role
3. **DataChangeApprovalModal.tsx** - Modal untuk approve/reject requests
4. **UserDetailView.tsx** - Detail view profil karyawan

### Navigation Flow
```
Main Sidebar → User Management (Admin Only)
  ├─ Users List View
  │   ├─ Search & Filters
  │   ├─ User Actions (View Profile, Change Role)
  │   └─ User Detail View
  │       └─ Tabs (Personal, Employment, Contact, Documents)
  └─ Pending Requests View
      └─ Review & Approve/Reject
```

### Mock Data
- `MOCK_EMPLOYEES`: 5 sample employees dengan berbagai departments dan roles
- `MOCK_PENDING_REQUESTS`: 6 sample requests dengan berbagai field changes dan tiers
- Data dapat diintegrasikan dengan Supabase atau backend API

## Design System Compliance

Semua komponen menggunakan variabel CSS dari `/styles/globals.css`:
- **Colors**: --primary, --border, --muted, --destructive-foreground, --chart-*
- **Typography**: --text-*, --font-weight-* (via inline styles atau HTML elements)
- **Spacing**: Tailwind spacing utilities
- **Borders & Radius**: --radius, border-border
- **Shadows**: --elevation-sm

Tidak ada hardcoded font-size, font-weight, atau line-height dalam Tailwind classes - semua menggunakan:
- HTML elements (h1, h2, h3, h4, p, label, button, input) untuk typography defaults
- `.caption` class untuk smaller text
- Inline styles dengan CSS variables untuk custom weights

## Future Enhancements

1. **Organization Management**: Akses admin berdasarkan cakupan perusahaan/department
2. **Bulk Actions**: Approve/reject multiple requests sekaligus
3. **Advanced Filters**: Filter by request date range, tier, field type
4. **Audit Trail**: Log history perubahan role dan approval decisions
5. **Email Notifications**: Notify users tentang approval/rejection
6. **Document Management**: Full document upload/download capability
7. **Export**: Export user list dan request history ke Excel/PDF
8. **Role Permissions**: Granular permissions untuk different admin levels
