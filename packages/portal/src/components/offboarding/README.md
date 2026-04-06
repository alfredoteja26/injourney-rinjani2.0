# Offboarding System

End-to-end offboarding system untuk admin mengelola proses offboarding karyawan secara sistematis.

## Features

### 1. **Offboarding List**
- Menampilkan semua proses offboarding yang sedang berjalan
- Filter berdasarkan status (Pending, In Progress, Completed)
- Search functionality untuk mencari karyawan
- Progress tracking untuk setiap offboarding process
- Status badges dan overdue warnings

### 2. **Employee Selection**
- Admin dapat memilih karyawan yang akan di-offboard
- Search dan filter karyawan
- Menampilkan informasi lengkap karyawan
- Set target completion date untuk offboarding process

### 3. **Offboarding Checklist Flow**
- Checklist tasks yang comprehensive
- Grouped by category:
  - Documents
  - Equipment
  - System Access
  - Knowledge Transfer
  - Administrative
- Progress tracking dengan visual progress bar
- PIC assignment untuk setiap task
- Category filtering

### 4. **Offboarding Detail**
- Track dan manage individual offboarding process
- Complete checklist items dengan notes
- Timeline dan deadline monitoring
- Overdue warnings
- Employee information sidebar
- Real-time progress updates

### 5. **Checklist Configuration**
- Admin dapat configure checklist templates
- Add, edit, delete checklist items
- Set PIC (Person In Charge) untuk setiap task
- Category management
- Mandatory/optional task designation
- Drag-and-drop ordering (visual dengan GripVertical icon)
- Preview checklist sebelum save

## Components

### Main Components
- `OffboardingManagement.tsx` - Main container dengan tab navigation
- `OffboardingList.tsx` - List semua offboarding processes
- `EmployeeSelection.tsx` - Select employee untuk offboarding
- `OffboardingChecklistFlow.tsx` - Initial checklist setup
- `OffboardingDetail.tsx` - Detailed view dengan checklist tracking
- `OffboardingChecklistConfig.tsx` - Admin configuration untuk checklist templates

### Types
- `OffboardingStatus` - 'pending' | 'in-progress' | 'completed'
- `OffboardingChecklistItem` - Individual checklist task
- `OffboardingEmployee` - Employee offboarding data
- `OffboardingChecklistTemplate` - Template untuk checklist items

## User Flow

### Admin Flow:
1. **Navigate to Settings** → Offboarding tab
2. **Initiate New Offboarding**:
   - Click "Initiate New Offboarding"
   - Search dan select employee
   - Set target completion date
   - Click "Proceed to Checklist"
3. **Configure Checklist**:
   - Review checklist items
   - Filter by category (optional)
   - Toggle items as needed
   - Click "Save & Initiate Offboarding"
4. **Track Progress**:
   - View offboarding list
   - Click on employee to see details
   - Complete checklist items
   - Add notes for each task
   - Save progress

### Configuration Flow:
1. **Navigate to Checklist Configuration** tab
2. **Manage Templates**:
   - Add new checklist items
   - Edit existing items
   - Delete items
   - Reorder items (drag handle)
   - Set PIC for each task
   - Mark as mandatory/optional
3. **Save Configuration**

## Design System Compliance

Semua komponen menggunakan:
- CSS variables dari `/styles/globals.css`
- Typography system (Inter font family)
- Color system (primary, muted, foreground, etc.)
- Spacing system (padding, margin, gap)
- Border radius system
- No hardcoded values

## Data Structure

### OffboardingEmployee
```typescript
{
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  offboardingInitiatedDate: string;
  offboardingTargetDate: string;
  status: OffboardingStatus;
  checklistItems: OffboardingChecklistItem[];
  progress: number; // percentage 0-100
  initiatedBy: string;
}
```

### OffboardingChecklistItem
```typescript
{
  id: string;
  title: string;
  description: string;
  category: 'document' | 'equipment' | 'access' | 'knowledge-transfer' | 'administrative';
  completed: boolean;
  pic?: string;
  picEmail?: string;
  completedBy?: string;
  completedDate?: string;
  notes?: string;
}
```

## Category Colors

- **Documents**: Blue (#3B82F6)
- **Equipment**: Purple (#8B5CF6)
- **System Access**: Red (#EF4444)
- **Knowledge Transfer**: Green (#10B981)
- **Administrative**: Orange (#F59E0B)

## Status Colors

- **Pending**: Orange (#F59E0B)
- **In Progress**: Blue (#3B82F6)
- **Completed**: Green (#10B981)

## Future Enhancements

- [ ] Email notifications ke PIC ketika task assigned
- [ ] Automated reminders untuk approaching deadlines
- [ ] Document upload untuk checklist items
- [ ] Export offboarding report
- [ ] Integration dengan HR system
- [ ] Approval workflow untuk final offboarding
- [ ] Analytics dashboard untuk offboarding metrics
- [ ] Template presets untuk different employee types
