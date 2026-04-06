# Offboarding System (Updated)

End-to-end offboarding system untuk admin mengelola proses offboarding karyawan berdasarkan flow Talenta.

## Flow Overview

### A. Start Offboarding Satuan (Single)
1. Masuk ke Settings → Offboarding
2. Pada halaman offboarding, klik **Actions** (⋮) dan pilih **Start offboard**
   - Opsi hanya tersedia untuk status "Ready to offboard"
3. Masuk ke halaman detail dengan:
   - **Resignation Info** form
   - **To Do List** dengan PIC dan status
   - **View Asset/View Loan** buttons
   - **Forms** section (Exit Interview)
   - **Add Task** button
4. Klik **"Start"** untuk memulai → Status berubah "In Progress"
5. Setelah semua to do list "Done", klik **"Complete offboarding"**
6. Konfirmasi final → Status berubah "Completed"

### B. Start Offboarding Massal (Bulk)

#### 1. Ready to Offboard
- Centang checkbox karyawan dengan status "Ready to offboard"
- Klik **Actions** → **Start offboard**
- Klik **"Start"** pada modal konfirmasi

#### 2. In Progress
- Centang checkbox karyawan dengan status "In progress"
- Klik **Actions** → **Complete offboarding**
- Klik **"Complete"** pada modal konfirmasi

#### 3. Status Campuran
- Centang checkbox campuran (Ready to offboard + In progress)
- Pilih action sesuai kebutuhan:
  - **Start offboard** → untuk Ready to offboard
  - **Complete offboarding** → untuk In progress

## Features

### 1. **Employee Offboarding Table**
- **Table view** dengan kolom:
  - Checkbox untuk bulk selection
  - Employee Name (dengan avatar & email)
  - Position
  - Department
  - Status (badge dengan color coding)
  - Progress (progress bar + percentage)
  - Actions (dropdown menu)
  
- **Status Filter Tabs:**
  - All
  - Ready to Offboard (🟠 Orange)
  - In Progress (🔵 Blue)
  - Completed (🟢 Green)
  - Cancel Resign (⚫ Gray)

- **Bulk Actions:**
  - Multiple selection dengan checkbox
  - Actions dropdown untuk bulk operations
  - Smart filtering (hanya tampil action yang relevan)

- **Individual Actions:**
  - View Details
  - Start Offboarding (untuk status ready-to-offboard)
  - Complete Offboarding (untuk status in-progress)
  - Cancel Resign

### 2. **Offboarding Detail Page**

#### **Resignation Info Section:**
- Resignation Type (Voluntary, Involuntary, Retirement, End of Contract)
- Resignation Date
- Last Working Date
- Notice Period (Days)
- Reason (Optional textarea)

#### **To Do List Section:**
- **Table format** dengan kolom:
  - To Do List Name (dengan description)
  - PIC (Person In Charge)
  - Status dropdown (To Do, In Progress, Done)
  - Delete button

- **Task Status dengan Color Coding:**
  - To Do: Gray (#6B7280)
  - In Progress: Blue (#3B82F6)
  - Done: Green (#10B981)

- **Add Task:**
  - Button untuk menambah task baru
  - Form inline dengan fields: Name, Description, PIC
  - Auto-add task ke list

- **Delete Task:**
  - Icon delete (🗑️) untuk setiap task
  - Confirmation dialog sebelum delete

#### **Sidebar:**
- **Assets & Loans:**
  - View Assets button (dengan count jika ada)
  - View Loans button (dengan count jika ada)
  
- **Forms:**
  - Exit Interview Form button
  - Status badge jika completed
  
- **Progress Summary:**
  - Tasks completed count
  - Progress bar
  - Status info
  - Started date
  - Completed date (jika sudah completed)

#### **Action Buttons:**
- **Start Offboarding** (untuk status ready-to-offboard)
- **Complete Offboarding** (untuk status in-progress, hanya jika 100%)
- **Save Changes** (untuk status in-progress)

### 3. **Checklist Configuration**
- Admin dapat configure template checklist
- Add, edit, delete checklist items
- Set PIC untuk setiap task
- Drag-and-drop ordering
- Mandatory/optional designation

### 4. **Confirmation Modals**
- Modal untuk bulk actions dengan:
  - Icon visual (CheckCircle/AlertCircle)
  - Title & message
  - Confirm/Cancel buttons
  - Color coding sesuai action type

## Components Structure

```
/components/offboarding/
├── types.ts                      # Type definitions
├── OffboardingManagementNew.tsx  # Main container (NEW)
├── EmployeeOffboardingTable.tsx  # Table view (NEW)
├── OffboardingDetailPage.tsx     # Detail page (NEW)
├── ConfirmationModal.tsx         # Confirmation dialog (NEW)
├── OffboardingChecklistConfig.tsx # Checklist config
└── index.ts                      # Exports
```

## Types

### OffboardingStatus
```typescript
'ready-to-offboard' | 'in-progress' | 'completed' | 'cancel-resign'
```

### TaskStatus
```typescript
'to-do' | 'in-progress' | 'done'
```

### ResignationInfo
```typescript
{
  resignationType: 'voluntary' | 'involuntary' | 'retirement' | 'end-of-contract';
  resignationDate: string;
  lastWorkingDate: string;
  reason?: string;
  noticeGiven: boolean;
  noticePeriodDays?: number;
}
```

### OffboardingEmployee
```typescript
{
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: OffboardingStatus;
  resignationInfo?: ResignationInfo;
  checklistItems: OffboardingChecklistItem[];
  progress: number;
  hasAssets?: boolean;
  hasLoans?: boolean;
  exitInterviewCompleted?: boolean;
  initiatedBy?: string;
  initiatedDate?: string;
  completedDate?: string;
}
```

## User Flows

### Admin - Single Offboarding
1. Navigate to Settings → Offboarding
2. View table dengan semua employees
3. Filter by status (optional)
4. Klik Actions (⋮) pada employee row → "View Details"
5. **Detail Page:**
   - Fill Resignation Info form
   - Review To Do List (auto-generated from template)
   - Add/Delete tasks jika perlu
   - Check View Assets/Loans jika ada
6. Klik **"Start Offboarding"** → Konfirmasi → Status = In Progress
7. Update task status dari "To Do" → "In Progress" → "Done"
8. Ketika semua tasks "Done", klik **"Complete Offboarding"**
9. Konfirmasi final → Status = Completed

### Admin - Bulk Offboarding
1. Navigate to Settings → Offboarding
2. Filter status yang diinginkan
3. Centang checkbox pada multiple employees
4. Klik **"Actions (n)"** dropdown
5. Pilih action:
   - **Start Offboard** (untuk ready-to-offboard)
   - **Complete Offboarding** (untuk in-progress)
6. Konfirmasi pada modal → Done!

## Design System Compliance

✅ Semua komponen menggunakan:
- **Colors:** `var(--foreground)`, `var(--card)`, `var(--border)`, `var(--muted)`, `var(--primary)`
- **Typography:** `var(--text-sm)`, `var(--text-base)`, `var(--font-weight-medium)`, dll
- **Spacing:** Consistent padding, margin, gap
- **Border radius:** `var(--radius)`
- **No hardcoded values**

## Status & Colors

### Employee Status
- **Ready to Offboard:** #F59E0B (Orange)
- **In Progress:** #3B82F6 (Blue)
- **Completed:** #10B981 (Green)
- **Cancel Resign:** #6B7280 (Gray)

### Task Status
- **To Do:** #6B7280 (Gray)
- **In Progress:** #3B82F6 (Blue)
- **Done:** #10B981 (Green)

## Key Differences from Previous Version

| Feature | Old Version | New Version |
|---------|-------------|-------------|
| View | Card-based list | **Table view** |
| Employee Selection | Separate selection page | **Direct from table** |
| Bulk Actions | Not available | **✅ Available** |
| Status | pending, in-progress, completed | **ready-to-offboard**, in-progress, completed, cancel-resign |
| Task Status | completed: boolean | **to-do, in-progress, done** |
| Resignation Info | Simple dates | **Comprehensive form** |
| Assets/Loans | Not shown | **View buttons in sidebar** |
| Exit Interview | Not shown | **Forms section** |

## Integration

### Settings.tsx
```typescript
import { OffboardingManagementNew } from './offboarding/OffboardingManagementNew';

// In tab content:
{activeTab === "offboarding" && userRole === "Admin" && (
  <OffboardingManagementNew />
)}
```

## Future Enhancements

- [ ] Export offboarding data to CSV/Excel
- [ ] Email notifications ke PIC
- [ ] Automated reminders
- [ ] Document attachments untuk tasks
- [ ] Asset return tracking integration
- [ ] Loan settlement integration
- [ ] Exit interview form builder
- [ ] Analytics dashboard
- [ ] Approval workflow
- [ ] History log/audit trail
