# New Employee Onboarding System

Sistem onboarding lengkap untuk pekerja baru yang bergabung dengan Injourney Holding.

## Fitur Utama

### 1. Welcome Wizard (Multi-Step)
Modal interaktif yang muncul saat pertama kali login dengan 4 langkah:

- **Step 1: Selamat Bergabung** - Ucapan selamat datang di Injourney Holding
- **Step 2: Informasi Posisi & Tim** - Menampilkan:
  - Posisi karyawan
  - Unit kerja
  - Atasan langsung (dengan avatar/initial)
  - Rekan tim (maksimal 4 orang ditampilkan)
- **Step 3: Fasilitas & Perangkat** - Informasi tentang:
  - Perangkat kerja (laptop, smartphone, aksesoris)
  - Benefit (asuransi, tunjangan, budget pembelajaran)
  - Akses sistem (email, VPN, sistem internal, akses gedung)
- **Step 4: Langkah Selanjutnya** - Persiapan untuk checklist orientasi

### 2. Checklist Orientasi (Persistent Bottom-Right)
Checklist yang muncul di pojok kanan bawah setelah wizard selesai:

- **Tidak dapat ditutup** sebelum semua checklist selesai
- Menampilkan progress bar
- Setiap item memiliki:
  - Judul dan deskripsi
  - Status (completed/pending)
  - Action button (opsional) untuk navigasi
- Dapat diminimalkan
- Otomatis tersimpan ke database

### 3. New Joiner Form (Public Access) ✨ NEW
Form public yang dapat diakses tanpa login untuk mengisi data diri sebelum bergabung:

- **Public URL**: `#/new-joiner-form/{formId}`
- **Form Fields**:
  - Employee name* (required)
  - Email* (required)
  - Phone number
  - Additional phone number
  - Place of birth
  - Birthdate* (required)
  - Gender (Male/Female)
  - Marital status* (required)
  - Blood type
  - Religion* (required)

### 4. Onboarding Configuration (Admin) ✨ NEW
Admin dapat mengkonfigurasi checklist onboarding:

- **Manage Checklist Items**:
  - Task title
  - PIC (Person in Charge)
  - Reorder with drag & drop
- **Available PICs**: HR Admin, HR Manager, IT Support, Department Manager, Finance Team, Facilities Team

### 5. Submission Management (Admin) ✨ NEW
Track dan manage form submissions:

- **View Submissions Table**: ID, Delivery Date, Expiry Date, Email, Status
- **Send Form Links**: Generate unique links untuk new employees
- **Track Status**: Pending, Completed, Expired
- **View Details**: Full submission information

## Komponen

### NewEmployeeWizard
Modal wizard dengan navigasi multi-step.

**Props:**
- `open: boolean` - Status tampil/tersembunyi
- `onComplete: () => void` - Callback saat wizard selesai
- `employeeInfo: EmployeeInfo` - Data posisi, unit, manager, dan tim
- `facilities: CompanyFacility[]` - Daftar fasilitas perusahaan
- `companyName?: string` - Nama perusahaan (default: "Injourney Holding")

### NewEmployeeChecklist
Checklist persistent di pojok kanan bawah.

**Props:**
- `items: NewEmployeeChecklistItem[]` - Daftar checklist
- `onItemComplete: (itemId: string) => void` - Callback saat item selesai
- `onDismiss?: () => void` - Callback saat checklist ditutup
- `canDismiss: boolean` - Apakah bisa ditutup (true jika semua selesai)

### NewEmployeeOnboarding
Wrapper component yang menggabungkan wizard dan checklist.

**Props:**
- `userEmail: string` - Email user untuk load data

### NewJoinerForm ✨ NEW
Public form untuk new employee mengisi data diri.

**Props:**
- `formId?: string` - Unique form identifier

### OnboardingSettings ✨ NEW
Settings page untuk manage onboarding configuration.

**Tabs:**
- Form Submissions - View and manage submissions
- Checklist Configuration - Configure checklist items

### ChecklistConfiguration ✨ NEW
Configure checklist items with title, PIC, and order.

### NewJoinerSubmissions ✨ NEW
Manage form submissions with table view and send form link functionality.

## Cara Menggunakan Fitur Baru

### Admin: Mengirim Form ke New Employee

1. Login sebagai Admin
2. Pergi ke **Settings > Onboarding**
3. Tab **Form Submissions** akan terbuka
4. Klik button **"Send form link"**
5. Masukkan email new employee (format: @injourney.co.id)
6. Pilih expiry date
7. Klik **"Send link"**
8. Copy link yang muncul dan bagikan ke new employee

### Admin: Konfigurasi Checklist

1. Pergi ke **Settings > Onboarding**
2. Klik tab **"Checklist Configuration"**
3. Klik **"Add Item"** untuk tambah task baru
4. Isi Task Title dan pilih PIC
5. Edit atau delete item dengan button di sebelah kanan
6. Drag icon untuk reorder
7. Klik **"Save Configuration"**

### New Employee: Mengisi Form

1. Buka link yang diterima (format: `#/new-joiner-form/{id}`)
2. **Tidak perlu login**
3. Isi semua field yang required (ditandai dengan *)
4. Klik **"Submit"**
5. Tunggu konfirmasi

## Routing

- **Dashboard**: `#/` atau kosong
- **Settings**: `#/settings`
- **New Joiner Form**: `#/new-joiner-form/{formId}` (public, no auth required)

## Kustomisasi

### Mengganti Data Karyawan
Edit file `/components/onboarding/useNewEmployeeData.ts`:

```typescript
export function useNewEmployeeData(userEmail: string) {
  // Ganti dengan API call atau data real
  const employeeInfo: EmployeeInfo = {
    position: 'Your Position',
    unit: 'Your Unit',
    manager: { ... },
    teammates: [ ... ]
  };
  
  return { employeeInfo, facilities };
}
```

### Menambah/Mengurangi Checklist Items
Edit `/components/onboarding/onboarding-context.tsx` bagian `checklistItems`:

```typescript
const [checklistItems, setChecklistItems] = useState<NewEmployeeChecklistItem[]>([
  {
    id: 'unique-id',
    title: 'Judul Checklist',
    description: 'Deskripsi singkat',
    completed: false,
    action: {
      type: 'link', // atau 'external' atau 'function'
      label: 'Button Label',
      url: '#/target-page' // atau URL eksternal
    }
  },
  // ... tambah item lain
]);
```

### Mengubah Prioritas Onboarding
Di `onboarding-context.tsx`, urutan prioritas adalah:
1. New Employee Onboarding Wizard
2. Spotlight Tour (untuk existing users)
3. Feature Announcements

Untuk mengubah, edit bagian useEffect di `fetchStatus()`.

## State Management

State tersimpan di Supabase dengan struktur:
```typescript
{
  hasCompletedNewEmployeeOnboarding: boolean,
  newEmployeeChecklistProgress: string[] // array of completed item IDs
}
```

## Design System

Semua komponen menggunakan CSS variables dari `/styles/globals.css`:
- `--primary`, `--accent` - Colors
- `--foreground`, `--muted-foreground` - Text colors
- `--card`, `--background` - Backgrounds
- `--border` - Borders
- `--radius` - Border radius
- Typography dari Inter font

## Integrasi

Untuk mengaktifkan new employee onboarding:

1. Import di App.tsx:
```typescript
import { NewEmployeeOnboarding } from "./components/onboarding/NewEmployeeOnboarding";
import { NewJoinerForm } from "./components/onboarding/NewJoinerForm";
```

2. Tambahkan dalam OnboardingProvider:
```tsx
<OnboardingProvider userId={userEmail}>
  {/* ... app content ... */}
  <NewEmployeeOnboarding userEmail={userEmail} />
</OnboardingProvider>
```

3. Untuk new joiner form, tambahkan routing di App.tsx untuk public access.

4. Untuk testing, reset state dengan menghapus data onboarding di Supabase atau local storage.

## Tips

- Wizard tidak bisa ditutup dengan click outside atau ESC key
- Checklist persisten sampai semua item selesai
- Gunakan `action` di checklist untuk guide user ke halaman spesifik
- Data employee dan facilities dapat di-fetch dari API real
- New joiner form accessible tanpa authentication
- Form link dapat di-generate dengan format: `window.location.origin + '/#/new-joiner-form/' + submissionId`