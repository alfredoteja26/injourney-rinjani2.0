# 🚀 Rinjani Portal - Quick Start Guide

## Selamat Datang di Portal Rinjani!

Portal Rinjani adalah sistem manajemen karyawan yang memungkinkan Admin mengelola user, survey, dan konten, serta User untuk mengakses profil dan survey karyawan.

---

## 📝 Login Cepat

### Admin Login
```
Email: admin@injourney.co.id
Password: Admin123!
```
**Akses:** Full system access

### User Login
```
Email: user@injourney.co.id
Password: User123!
```
**Akses:** Limited user access

> 💡 **Tip:** Kredensial ini juga ditampilkan di halaman login untuk kemudahan testing!

---

## 🎯 Fitur Utama yang Sudah Diimplementasikan

### 1. ✅ Employee Survey (Full-Width)
- **Lokasi:** Dashboard → Employee Survey Section
- **Status:** ✅ Sudah full-width container
- **Fitur:**
  - View active surveys
  - Complete surveys
  - View completion statistics
  - Admin: Create and manage surveys

### 2. ✅ Settings dengan Tab Design Baru
- **Lokasi:** Sidebar → Settings (⚙️)
- **Status:** ✅ Menggunakan tab design dari Figma
- **Tabs:**
  - 👥 User Management (Admin only)
  - 🔔 Notifications (All users)
  - 📄 Content Management (Admin only)
  - 📋 Employee Survey (Admin only)

### 3. ✅ User Management dengan Sub-Tabs
- **Lokasi:** Settings → User Management
- **Status:** ✅ Tab design sesuai Figma dengan badge counter
- **Sub-Tabs:**
  - **Users (5)** - Tabel semua user
  - **Pending Requests (6)** - Daftar request dengan badge counter

### 4. ✅ Role-Based Access Control
- **Admin Role:** Full access ke semua fitur
- **User Role:** Limited access, hanya notifikasi & profile
- **Status:** ✅ 2 user dengan role berbeda sudah dibuat

---

## 🏃 Testing Workflow

### Test Scenario 1: Admin User Management
1. Login sebagai Admin (`admin@injourney.co.id`)
2. Click Settings di sidebar
3. Lihat 4 tabs: User Management, Notifications, Content Management, Employee Survey
4. Click User Management tab
5. Lihat 2 sub-tabs: "Users (5)" dan "Pending Requests (6)"
6. Click "Users" → See table dengan 5 employees
7. Click "Pending Requests" → See 6 pending requests dengan details

### Test Scenario 2: User Limited Access
1. Logout dari Admin
2. Login sebagai User (`user@injourney.co.id`)
3. Click Settings di sidebar
4. Hanya lihat 1 tab: Notifications
5. User Management, CMS, dan Employee Survey tabs tidak terlihat

### Test Scenario 3: Employee Survey Full-Width
1. Login sebagai Admin atau User
2. Scroll down di Dashboard
3. Lihat Employee Survey section
4. Verifikasi section mengambil full-width container (tidak ada max-width-1440px)

### Test Scenario 4: Tab Design Verification
1. Login sebagai Admin
2. Go to Settings
3. Click berbagai tabs
4. Verifikasi:
   - Active tab memiliki bottom border 3px warna primary (#00a199)
   - Hover effect pada inactive tabs
   - Icon + text layout konsisten
   - Smooth transitions

---

## 📊 User Management Features

### Users Tab Features:
- ✅ Search by name, email, or employee ID
- ✅ Filter by Role (All/Admin/User)
- ✅ Filter by Department
- ✅ Table with columns:
  - Employee (avatar, name, email, ID)
  - Role (badge with icon)
  - Department & Position
  - Status (active/inactive badge)
  - Pending Requests (count with badge)
  - Last Login date
  - Actions (dropdown menu)

### Pending Requests Tab Features:
- ✅ Badge counter showing total pending (6)
- ✅ Card layout for each request
- ✅ Request details:
  - Employee info with avatar
  - Tier badge
  - Field name being changed
  - Current value vs. Requested value
  - Reason for change
  - Supporting documents list
  - Request date
- ✅ Review button for each request

### Actions Available:
- 👁️ View Profile - Opens detailed user view
- 🛡️ Change Role - Opens modal to change Admin ↔ User

---

## 🎨 Design System Compliance

### ✅ All Components Use CSS Variables:

**Typography:**
```css
--text-4xl: 48px  /* h1 */
--text-3xl: 30px  /* h2 */
--text-2xl: 24px  /* h3 */
--text-xl: 20px   /* h4 */
--text-base: 16px /* button, input */
--text-sm: 14px   /* caption, badge */
--text-xs: 12px   /* label */
```

**Colors:**
```css
--primary: #00858A        /* Primary color */
--border: #D5D7DA          /* Border color */
--muted: #F5F5F5          /* Muted backgrounds */
--card: #FFFFFF           /* Card backgrounds */
--destructive-foreground: #F04438  /* Error/warning color */
```

**Font Weights:**
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

---

## 🔧 Technical Implementation

### New Components:
```
/components/SettingsTab.tsx        - Tab component dengan bottom border
/components/SettingsTabList.tsx    - Container untuk tabs
```

### Updated Components:
```
/components/Settings.tsx           - Menggunakan new tab design
/components/UserManagement.tsx     - Sub-tabs dengan new design
/imports/Frame1000001738.tsx       - Full-width survey container
/imports/SignIn.tsx                - Credentials helper box
```

### New Modules:
```
/lib/auth.ts                       - Authentication module
```

### Documentation:
```
/CREDENTIALS.md                    - User credentials reference
/CHANGELOG.md                      - Version history
/docs/USER_ROLES_GUIDE.md         - Complete roles guide
/docs/QUICK_START.md              - This file
```

---

## 🐛 Known Limitations

- ❌ Password tidak di-hash (demo purposes)
- ❌ Session management masih simplified
- ❌ No database persistence
- ❌ No password reset functionality
- ❌ No email verification
- ❌ No two-factor authentication

---

## 📚 Documentation References

1. **CREDENTIALS.md** - Login credentials dan role details
2. **USER_ROLES_GUIDE.md** - Comprehensive roles & permissions guide
3. **CHANGELOG.md** - All changes in version 1.1.0

---

## 💡 Tips & Tricks

### For Testing:
1. Use demo credentials displayed on login page
2. Test both Admin and User roles to see different access levels
3. Try searching and filtering in User Management
4. Click through all tabs to verify design consistency

### For Development:
1. All styling uses CSS variables - check `/styles/globals.css`
2. Tab components are reusable - import from `/components/SettingsTab.tsx`
3. Mock data is in component files - easy to modify
4. Auth module is in `/lib/auth.ts` - ready for real backend integration

---

## 🎉 What's New in v1.1.0

✅ Employee Survey fills full container  
✅ Settings tabs menggunakan Figma design  
✅ User Management sub-tabs dengan badge counter  
✅ 2 demo users (Admin & User) dengan credentials  
✅ Credentials helper di login page  
✅ Complete documentation suite  

---

## 📞 Next Steps

1. Test all scenarios di atas
2. Verify tab design matches Figma
3. Check responsive behavior
4. Test role-based access control
5. Review documentation

---

**Happy Testing! 🚀**

*Last Updated: December 26, 2024*
