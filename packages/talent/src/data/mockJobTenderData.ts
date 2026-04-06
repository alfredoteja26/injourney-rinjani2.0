import { Application, ApplicationTimeline, Position, SavedJob, TenderPeriod } from "@/types/job-tender";

export const mockPositions: Position[] = [
  {
    id: "POS-001",
    title: "Supervisor Talent Acquisition",
    description: "Bertanggung jawab dalam mengelola proses rekrutmen dan seleksi karyawan, memastikan pemenuhan kebutuhan SDM sesuai dengan standar perusahaan. Melakukan sourcing kandidat, interview, dan negosiasi penawaran.",
    organizationId: "ORG-001",
    organizationName: "Human Capital Division",
    jobFamilyId: "JF-HR",
    jobFamilyName: "Human Resources",
    gradeJabatan: 13,
    bandJabatan: "Supervisor",
    location: "Jakarta",
    company: "PT Aviasi Pariwisata Indonesia",
    incumbentId: undefined,
    incumbentName: undefined,
    quota: 1,
    status: "open",
    deadline: "2026-01-31T23:59:59Z",
    applicantCount: 12,
    periodId: "PERIOD-2026-Q1",
    createdAt: "2026-01-05T08:00:00Z",
    updatedAt: "2026-01-05T08:00:00Z"
  },
  {
    id: "POS-002",
    title: "Staff Learning & Development",
    description: "Mendukung pelaksanaan program pelatihan dan pengembangan karyawan, termasuk koordinasi dengan vendor training dan evaluasi efektivitas program. Mengelola LMS dan administrasi training.",
    organizationId: "ORG-001",
    organizationName: "Human Capital Division",
    jobFamilyId: "JF-HR",
    jobFamilyName: "Human Resources",
    gradeJabatan: 12,
    bandJabatan: "Staff",
    location: "Jakarta",
    company: "PT Aviasi Pariwisata Indonesia",
    incumbentId: "EMP-050",
    incumbentName: "Dewi Lestari",
    quota: 2,
    status: "open",
    deadline: "2026-02-15T23:59:59Z",
    applicantCount: 8,
    periodId: "PERIOD-2026-Q1",
    createdAt: "2026-01-08T10:30:00Z",
    updatedAt: "2026-01-08T10:30:00Z"
  },
  {
    id: "POS-003",
    title: "Manager Compensation & Benefits",
    description: "Mengelola kebijakan kompensasi dan benefit perusahaan, melakukan benchmarking gaji, dan memastikan kepatuhan terhadap regulasi ketenagakerjaan. Mengelola payroll dan asuransi kesehatan karyawan.",
    organizationId: "ORG-001",
    organizationName: "Human Capital Division",
    jobFamilyId: "JF-HR",
    jobFamilyName: "Human Resources",
    gradeJabatan: 15,
    bandJabatan: "Manager",
    location: "Jakarta",
    company: "PT Aviasi Pariwisata Indonesia",
    incumbentId: "EMP-025",
    incumbentName: "Ahmad Hidayat",
    quota: 1,
    status: "open",
    deadline: "2026-01-25T23:59:59Z",
    applicantCount: 5,
    periodId: "PERIOD-2026-Q1",
    createdAt: "2026-01-03T14:00:00Z",
    updatedAt: "2026-01-03T14:00:00Z"
  },
  {
    id: "POS-004",
    title: "Staff Finance Accounting",
    description: "Melakukan pencatatan transaksi keuangan, rekonsiliasi bank, dan penyusunan laporan keuangan bulanan. Memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
    organizationId: "ORG-002",
    organizationName: "Finance Division",
    jobFamilyId: "JF-FIN",
    jobFamilyName: "Finance & Accounting",
    gradeJabatan: 12,
    bandJabatan: "Staff",
    location: "Surabaya",
    company: "PT Angkasa Pura Indonesia",
    incumbentId: undefined,
    incumbentName: undefined,
    quota: 1,
    status: "open",
    deadline: "2026-02-28T23:59:59Z",
    applicantCount: 15,
    periodId: "PERIOD-2026-Q1",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-01-10T09:00:00Z"
  },
  {
    id: "POS-005",
    title: "Supervisor IT Infrastructure",
    description: "Mengawasi operasional infrastruktur IT, termasuk server, jaringan, dan sistem keamanan informasi. Mengelola tim support IT dan vendor maintenance.",
    organizationId: "ORG-003",
    organizationName: "IT Division",
    jobFamilyId: "JF-IT",
    jobFamilyName: "Information Technology",
    gradeJabatan: 13,
    bandJabatan: "Supervisor",
    location: "Jakarta",
    company: "PT Aviasi Pariwisata Indonesia",
    incumbentId: "EMP-080",
    incumbentName: "Rudi Hartono",
    quota: 1,
    status: "closed",
    deadline: "2026-01-10T23:59:59Z",
    applicantCount: 20,
    periodId: "PERIOD-2026-Q1",
    createdAt: "2025-12-20T11:00:00Z",
    updatedAt: "2025-12-20T11:00:00Z"
  }
];

export const mockApplications: Application[] = [
  {
    id: "APP-001",
    positionId: "POS-001",
    positionTitle: "Supervisor Talent Acquisition",
    employeeId: "EMP-001",
    status: "shortlisted",
    screeningResult: {
      eligible: true,
      gradeCheck: "pass",
      jobFamilyCheck: "pass",
      disciplinaryCheck: "pass"
    },
    eqsScore: 85.5,
    statementAccepted: true,
    submittedAt: "2026-01-08T14:30:00Z",
    updatedAt: "2026-01-12T10:00:00Z"
  },
  {
    id: "APP-002",
    positionId: "POS-002",
    positionTitle: "Staff Learning & Development",
    employeeId: "EMP-001",
    status: "submitted",
    screeningResult: {
      eligible: true,
      gradeCheck: "pass",
      jobFamilyCheck: "pass",
      disciplinaryCheck: "pass"
    },
    eqsScore: 78.2,
    statementAccepted: true,
    submittedAt: "2026-01-10T09:15:00Z",
    updatedAt: "2026-01-10T09:15:00Z"
  },
  {
    id: "APP-003",
    positionId: "POS-005",
    positionTitle: "Supervisor IT Infrastructure",
    employeeId: "EMP-001",
    status: "rejected",
    screeningResult: {
      eligible: false,
      gradeCheck: "pass",
      jobFamilyCheck: "fail",
      disciplinaryCheck: "pass"
    },
    eqsScore: undefined,
    statementAccepted: true,
    submittedAt: "2025-12-22T16:00:00Z",
    updatedAt: "2026-01-05T11:30:00Z",
    rejectionReason: "Tidak memenuhi kualifikasi Job Family"
  }
];

export const mockSavedJobs: SavedJob[] = [
  {
    id: "SAVE-001",
    positionId: "POS-003",
    positionTitle: "Manager Compensation & Benefits",
    employeeId: "EMP-001",
    savedAt: "2026-01-06T08:45:00Z",
    positionStatus: "open",
    deadline: "2026-01-25T23:59:59Z"
  },
  {
    id: "SAVE-002",
    positionId: "POS-004",
    positionTitle: "Staff Finance Accounting",
    employeeId: "EMP-001",
    savedAt: "2026-01-11T10:20:00Z",
    positionStatus: "open",
    deadline: "2026-02-28T23:59:59Z"
  }
];

export const mockTimelines: ApplicationTimeline[] = [
  {
    id: "TL-001",
    applicationId: "APP-001",
    fromStatus: undefined,
    toStatus: "submitted",
    changedBy: "EMP-001",
    changedByName: "Budi Santoso",
    notes: "Aplikasi diajukan",
    changedAt: "2026-01-08T14:30:00Z"
  },
  {
    id: "TL-002",
    applicationId: "APP-001",
    fromStatus: "submitted",
    toStatus: "screening",
    changedBy: "SYSTEM",
    changedByName: "System",
    notes: "Proses screening otomatis dimulai",
    changedAt: "2026-01-08T14:31:00Z"
  },
  {
    id: "TL-003",
    applicationId: "APP-001",
    fromStatus: "screening",
    toStatus: "shortlisted",
    changedBy: "EMP-100",
    changedByName: "HR Admin",
    notes: "Kandidat lolos screening, masuk shortlist",
    changedAt: "2026-01-12T10:00:00Z"
  },
  {
    id: "TL-004",
    applicationId: "APP-003",
    fromStatus: undefined,
    toStatus: "submitted",
    changedBy: "EMP-001",
    changedByName: "Budi Santoso",
    notes: "Aplikasi diajukan",
    changedAt: "2025-12-22T16:00:00Z"
  },
  {
    id: "TL-005",
    applicationId: "APP-003",
    fromStatus: "submitted",
    toStatus: "rejected",
    changedBy: "SYSTEM",
    changedByName: "System",
    notes: "Tidak memenuhi kualifikasi Job Family - pengalaman di IT kurang dari 1 tahun",
    changedAt: "2026-01-05T11:30:00Z"
  }
];

export const mockTenderPeriod: TenderPeriod = {
  id: "PERIOD-2026-Q1",
  name: "Internal Job Tender Q1 2026",
  startDate: "2026-01-01",
  endDate: "2026-03-31",
  status: "active",
  maxApplications: 5,
  posterUrl: "/assets/ijt-poster-q1-2026.jpg"
};
