/**
 * Mock Data Service for Career Path Module
 * INJ-TMS-001 | Career Path (Aspiration)
 * Data source: /guidelines/MockData-Career-Path.md
 */

import type { 
  Employee, 
  Position, 
  Aspiration,
  IndividualAspiration,
  SupervisorAspiration,
  JobHolderAspiration,
  UnitAspiration,
  OrgRelationship,
  UnitRequest
} from '../../types/careerPath';

// ========== EMPLOYEES DATA ==========

export const EMPLOYEES: Employee[] = [
  { id: "EMP001", nik: "10001", name: "Sri Mulyani", position: "Director SDM", level_jabatan: "BOD-01", band_jabatan: "BOD", grade_jabatan: 21, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "PERMANENT", email: "sri.mulyani@injourney.co.id", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP002", nik: "10002", name: "Agus Pratama", position: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "PERMANENT", email: "agus.pratama@injourney.co.id", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP001" },
  { id: "EMP003", nik: "10003", name: "Ratna Wijaya", position: "Manager HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "PERMANENT", email: "ratna.wijaya@injourney.co.id", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP002" },
  { id: "EMP004", nik: "10004", name: "Budi Santoso", position: "Staff HR Operations", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "PERMANENT", email: "budi.santoso@injourney.co.id", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP003" },
  { id: "EMP005", nik: "10005", name: "Siti Aminah", position: "Staff Payroll", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "PERMANENT", email: "siti.aminah@injourney.co.id", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP003" },
  { id: "EMP006", nik: "10006", name: "Ahmad Rizki", position: "Staff Recruitment", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "PERMANENT", disciplinary_status: "ACTIVE", email: "ahmad.rizki@injourney.co.id", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP003" },
  { id: "EMP007", nik: "10007", name: "Dian Permata", position: "Manager Talent Acquisition", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Talent Acq", status: "PERMANENT", email: "dian.permata@injourney.co.id", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP002" },
  { id: "EMP008", nik: "10008", name: "Eko Prasetyo", position: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Talent Acq", status: "PERMANENT", email: "eko.prasetyo@injourney.co.id", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP007" },
  { id: "EMP009", nik: "10009", name: "Fani Rahayu", position: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Talent Acq", status: "PERMANENT", email: "fani.rahayu@injourney.co.id", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP007" },
  { id: "EMP010", nik: "10010", name: "Bambang Sugiarto", position: "Head of HC Division", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "PERMANENT", email: "bambang.sugiarto@injourney.co.id", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP001" },
  { id: "EMP011", nik: "10011", name: "Hendra Kusuma", position: "Manager Finance", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Finance", company: "PT Angkasa Pura Indonesia", unit: "Finance", status: "PERMANENT", email: "hendra.kusuma@ap2.co.id", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP012", nik: "10012", name: "Dewi Kartika", position: "Jr. Staff Finance", level_jabatan: "BOD-05", band_jabatan: "Department Head", grade_jabatan: 11, job_family: "Finance", company: "PT Angkasa Pura Indonesia", unit: "Finance", status: "PERMANENT", email: "dewi.kartika@ap2.co.id", image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP011" },
  { id: "EMP013", nik: "10013", name: "Gilang Ramadhan", position: "Staff Finance", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Finance", company: "PT Angkasa Pura Indonesia", unit: "Finance", status: "PERMANENT", disciplinary_status: "EXPIRED", email: "gilang.ramadhan@ap2.co.id", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP011" },
  { id: "EMP014", nik: "10014", name: "Linda Sari", position: "HC Admin", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "PERMANENT", email: "linda.sari@injourney.co.id", image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP010" },
  { id: "EMP015", nik: "10015", name: "Maya Putri", position: "Supervisor Compensation", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Comp & Ben", status: "PERMANENT", email: "maya.putri@injourney.co.id", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP002" },
  { id: "EMP016", nik: "10016", name: "Rudi Hermawan", position: "Manager Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Operations", company: "PT Hotel Indonesia Natour", unit: "Operations", status: "PERMANENT", email: "rudi.hermawan@hin.co.id", image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP017", nik: "10017", name: "Novi Andini", position: "Staff Operations", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Operations", company: "PT Hotel Indonesia Natour", unit: "Operations", status: "PERMANENT", email: "novi.andini@hin.co.id", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP016" },
  { id: "EMP018", nik: "10018", name: "Teguh Prakoso", position: "Manager IT", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Information Technology", company: "PT Integrasi Aviasi Solusi", unit: "IT", status: "PERMANENT", email: "teguh.prakoso@ias.co.id", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP019", nik: "10019", name: "Wulan Sari", position: "Staff IT", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Information Technology", company: "PT Integrasi Aviasi Solusi", unit: "IT", status: "PERMANENT", email: "wulan.sari@ias.co.id", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop", supervisor_id: "EMP018" },
  { id: "EMP020", nik: "10020", name: "Andi Wijaya", position: "Manager Tourism", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Tourism", company: "PT TWC Borobudur Prambanan RB", unit: "Tourism", status: "PERMANENT", email: "andi.wijaya@twc.co.id", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP021", nik: "10021", name: "Putri Maharani", position: "Manager Retail", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Retail", company: "PT Sarinah", unit: "Retail", status: "PERMANENT", email: "putri.maharani@sarinah.co.id", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop", profile_picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" },
];

// ========== POSITIONS DATA ==========

export const POSITIONS: Position[] = [
  { id: "POS001", name: "Director SDM", level_jabatan: "BOD-01", band_jabatan: "BOD", grade_jabatan: 21, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "Filled", incumbent_id: "EMP001", location: "Jakarta" },
  { id: "POS002", name: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "Filled", incumbent_id: "EMP002", location: "Jakarta" },
  { id: "POS003", name: "Head of HC Division", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HC Division", status: "Filled", incumbent_id: "EMP010", location: "Jakarta" },
  { id: "POS004", name: "Manager HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "Filled", incumbent_id: "EMP003", location: "Jakarta" },
  { id: "POS005", name: "Manager Talent Acquisition", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Talent Acq", status: "Filled", incumbent_id: "EMP007", location: "Jakarta" },
  { id: "POS006", name: "Manager Compensation & Benefits", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Comp & Ben", status: "Vacant", location: "Jakarta" },
  { id: "POS007", name: "Manager Learning & Development", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney (Holding)", unit: "L&D", status: "Vacant", location: "Jakarta" },
  { id: "POS008", name: "Supervisor HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "Vacant", location: "Jakarta" },
  { id: "POS009", name: "Staff HR Operations", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "HR Ops", status: "Filled", incumbent_id: "EMP004", location: "Jakarta" },
  { id: "POS010", name: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney (Holding)", unit: "Talent Acq", status: "Filled", incumbent_id: "EMP008", location: "Jakarta" },
  { id: "POS011", name: "Manager Finance", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Finance", company: "PT Angkasa Pura Indonesia", unit: "Finance", status: "Filled", incumbent_id: "EMP011", location: "Jakarta" },
  { id: "POS012", name: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 17, job_family: "Human Resources", company: "PT Angkasa Pura Indonesia", unit: "HC", status: "Filled", location: "Jakarta" },
  { id: "POS013", name: "Manager Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Operations", company: "PT Hotel Indonesia Natour", unit: "Operations", status: "Filled", incumbent_id: "EMP016", location: "Jakarta" },
  { id: "POS014", name: "Manager IT", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Information Technology", company: "PT Integrasi Aviasi Solusi", unit: "IT", status: "Filled", incumbent_id: "EMP018", location: "Jakarta" },
  { id: "POS015", name: "Manager Tourism", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Tourism", company: "PT TWC Borobudur Prambanan RB", unit: "Tourism", status: "Filled", incumbent_id: "EMP020", location: "Yogyakarta" },
  { id: "POS016", name: "Manager Retail", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Retail", company: "PT Sarinah", unit: "Retail", status: "Filled", incumbent_id: "EMP021", location: "Jakarta" },
];

// ========== ORGANIZATION RELATIONSHIPS ==========

export const ORG_RELATIONSHIPS: OrgRelationship[] = [
  { supervisor: "EMP001", subordinate: "EMP002" },
  { supervisor: "EMP001", subordinate: "EMP010" },
  { supervisor: "EMP002", subordinate: "EMP003" },
  { supervisor: "EMP002", subordinate: "EMP007" },
  { supervisor: "EMP003", subordinate: "EMP004" },
  { supervisor: "EMP003", subordinate: "EMP005" },
  { supervisor: "EMP003", subordinate: "EMP006" },
  { supervisor: "EMP007", subordinate: "EMP008" },
  { supervisor: "EMP007", subordinate: "EMP009" },
  { supervisor: "EMP011", subordinate: "EMP012" },
  { supervisor: "EMP011", subordinate: "EMP013" },
  { supervisor: "EMP016", subordinate: "EMP017" },
  { supervisor: "EMP018", subordinate: "EMP019" },
];

// ========== ASPIRATIONS DATA ==========

const INITIAL_INDIVIDUAL_ASPIRATIONS: IndividualAspiration[] = [
  { id: "IND001", emp_id: "EMP004", pos_id: "POS005", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-15", status: "ACTIVE" },
  { id: "IND002", emp_id: "EMP004", pos_id: "POS008", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-15", status: "ACTIVE" },
  { id: "IND003", emp_id: "EMP004", pos_id: "POS004", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-15", status: "ACTIVE" },
  { id: "IND004", emp_id: "EMP005", pos_id: "POS006", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-18", status: "ACTIVE" },
  { id: "IND005", emp_id: "EMP005", pos_id: "POS002", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-18", status: "ACTIVE" },
  { id: "IND006", emp_id: "EMP008", pos_id: "POS010", type: "ROTASI", source: "INDIVIDUAL", submitted: "2025-10-20", status: "ACTIVE" },
  { id: "IND007", emp_id: "EMP008", pos_id: "POS005", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-20", status: "ACTIVE" },
  { id: "IND008", emp_id: "EMP009", pos_id: "POS004", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-22", status: "ACTIVE" },
  { id: "IND009", emp_id: "EMP012", pos_id: "POS011", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-25", status: "ACTIVE" },
  { id: "IND010", emp_id: "EMP003", pos_id: "POS002", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-28", status: "ACTIVE" },
  { id: "IND011", emp_id: "EMP003", pos_id: "POS001", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-28", status: "ACTIVE" },
  { id: "IND012", emp_id: "EMP007", pos_id: "POS002", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-30", status: "ACTIVE" },
];

const INITIAL_SUPERVISOR_ASPIRATIONS: SupervisorAspiration[] = [
  { id: "SUP001", emp_id: "EMP004", pos_id: "POS008", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP003", nominator: "Ratna Wijaya", submitted: "2025-10-20", status: "ACTIVE" },
  { id: "SUP002", emp_id: "EMP004", pos_id: "POS004", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP003", nominator: "Ratna Wijaya", submitted: "2025-10-20", status: "ACTIVE" },
  { id: "SUP003", emp_id: "EMP005", pos_id: "POS006", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP003", nominator: "Ratna Wijaya", submitted: "2025-10-21", status: "ACTIVE" },
  { id: "SUP004", emp_id: "EMP008", pos_id: "POS005", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP007", nominator: "Dian Permata", submitted: "2025-10-22", status: "ACTIVE" },
  { id: "SUP005", emp_id: "EMP009", pos_id: "POS005", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP007", nominator: "Dian Permata", submitted: "2025-10-22", status: "ACTIVE" },
  { id: "SUP006", emp_id: "EMP003", pos_id: "POS002", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP002", nominator: "Agus Pratama", submitted: "2025-10-25", status: "ACTIVE" },
  { id: "SUP007", emp_id: "EMP007", pos_id: "POS002", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP002", nominator: "Agus Pratama", submitted: "2025-10-25", status: "ACTIVE" },
  { id: "SUP008", emp_id: "EMP013", pos_id: "POS011", type: "PROMOSI", source: "SUPERVISOR", nominator_id: "EMP011", nominator: "Hendra Kusuma", submitted: "2025-10-28", status: "ACTIVE" },
];

const INITIAL_JOB_HOLDER_ASPIRATIONS: JobHolderAspiration[] = [
  { id: "JH001", emp_id: "EMP002", pos_id: "POS001", type: "PROMOSI", source: "JOB_HOLDER", nominator_id: "EMP001", nominator: "Sri Mulyani", rank: 1, for_position_id: "POS001", submitted: "2025-10-26", status: "ACTIVE" },
  { id: "JH002", emp_id: "EMP010", pos_id: "POS001", type: "PROMOSI", source: "JOB_HOLDER", nominator_id: "EMP001", nominator: "Sri Mulyani", rank: 2, for_position_id: "POS001", submitted: "2025-10-26", status: "ACTIVE" },
  { id: "JH003", emp_id: "EMP003", pos_id: "POS002", type: "PROMOSI", source: "JOB_HOLDER", nominator_id: "EMP002", nominator: "Agus Pratama", rank: 1, for_position_id: "POS002", submitted: "2025-10-27", status: "ACTIVE" },
  { id: "JH004", emp_id: "EMP007", pos_id: "POS002", type: "PROMOSI", source: "JOB_HOLDER", nominator_id: "EMP002", nominator: "Agus Pratama", rank: 2, for_position_id: "POS002", submitted: "2025-10-27", status: "ACTIVE" },
];

const INITIAL_UNIT_ASPIRATIONS: UnitAspiration[] = [
  { 
    id: "UNIT001", 
    emp_id: "EMP002", 
    pos_id: "POS001", 
    type: "PROMOSI", 
    source: "UNIT", 
    unit_id: "HC Division", 
    nominator_id: "EMP010", 
    nominator: "Bambang Sugiarto",
    nominee_id: "EMP002",
    nominee_name: "Agus Pratama",
    submitted: "2025-10-28", 
    status: "ACTIVE", 
    justification: "Agus has strong leadership and extensive HR experience" 
  },
  { 
    id: "UNIT002", 
    emp_id: "EMP003", 
    pos_id: "POS001", 
    type: "PROMOSI", 
    source: "UNIT", 
    unit_id: "HC Division", 
    nominator_id: "EMP010", 
    nominator: "Bambang Sugiarto",
    nominee_id: "EMP003",
    nominee_name: "Ratna Wijaya",
    submitted: "2025-10-28", 
    status: "ACTIVE", 
    justification: "Ratna has proven track record in HR operations" 
  },
  { 
    id: "UNIT003", 
    emp_id: "EMP007", 
    pos_id: "POS006", 
    type: "PROMOSI", 
    source: "UNIT", 
    unit_id: "HC Division", 
    nominator_id: "EMP010", 
    nominator: "Bambang Sugiarto",
    nominee_id: "EMP007",
    nominee_name: "Dian Permata",
    submitted: "2025-11-01", 
    status: "ACTIVE", 
    justification: "Dian has strong talent acquisition background, good fit for C&B role" 
  },
];

// Combined aspirations
export let ASPIRATIONS: Aspiration[] = [
  ...INITIAL_INDIVIDUAL_ASPIRATIONS,
  ...INITIAL_SUPERVISOR_ASPIRATIONS,
  ...INITIAL_JOB_HOLDER_ASPIRATIONS,
  ...INITIAL_UNIT_ASPIRATIONS,
];

// ========== UNIT REQUESTS ==========

export let UNIT_REQUESTS: UnitRequest[] = [
  { id: "REQ001", unit_id: "UNIT001", requested_by_id: "EMP010", requested_by: "Bambang Sugiarto", requested_pos_id: "POS001", requested_pos: "Director SDM", nominee_id: "EMP002", nominee_name: "Agus Pratama", nominee_pos: "VP Human Capital", submitted: "2025-10-28", status: "PENDING", justification: "Strong leadership and extensive experience" },
  { id: "REQ002", unit_id: "UNIT001", requested_by_id: "EMP010", requested_by: "Bambang Sugiarto", requested_pos_id: "POS001", requested_pos: "Director SDM", nominee_id: "EMP003", nominee_name: "Ratna Wijaya", nominee_pos: "Manager HR Operations", submitted: "2025-10-28", status: "PENDING", justification: "Proven track record in operations" },
];

// ========== SERVICE FUNCTIONS ==========

export function getEmployees(): Employee[] {
  return EMPLOYEES;
}

export function getEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find(e => e.id === id);
}

export function getPositions(): Position[] {
  return POSITIONS;
}

export function getPositionById(id: string): Position | undefined {
  return POSITIONS.find(p => p.id === id);
}

export function getAspirations(): Aspiration[] {
  return ASPIRATIONS;
}

export function getAspirationsByEmployee(empId: string): Aspiration[] {
  return ASPIRATIONS.filter(a => a.emp_id === empId);
}

export function getAspirationsBySource(source: string): Aspiration[] {
  return ASPIRATIONS.filter(a => a.source === source);
}

// Get subordinates for a supervisor
export function getSubordinates(supervisorId: string): Employee[] {
  // Get all subordinates from ORG_RELATIONSHIPS
  const subordinateIds = ORG_RELATIONSHIPS
    .filter(rel => rel.supervisor === supervisorId)
    .map(rel => rel.subordinate);
  
  return EMPLOYEES.filter(emp => subordinateIds.includes(emp.id));
}

export function getSupervisor(employeeId: string): Employee | undefined {
  const relationship = ORG_RELATIONSHIPS.find(r => r.subordinate === employeeId);
  if (!relationship) return undefined;
  return EMPLOYEES.find(e => e.id === relationship.supervisor);
}

export function addAspiration(aspiration: Aspiration): void {
  ASPIRATIONS.push(aspiration);
}

export function updateAspiration(id: string, updates: Partial<Aspiration>): void {
  const index = ASPIRATIONS.findIndex(a => a.id === id);
  if (index !== -1) {
    ASPIRATIONS[index] = { ...ASPIRATIONS[index], ...updates };
  }
}

export function deleteAspiration(id: string): void {
  ASPIRATIONS = ASPIRATIONS.filter(a => a.id !== id);
}

export function getUnitRequests(): UnitRequest[] {
  return UNIT_REQUESTS;
}

export function addUnitRequest(request: UnitRequest): void {
  UNIT_REQUESTS.push(request);
}

// Filter positions by company, job family, etc.
export function filterPositions(filters: {
  company?: string;
  job_family?: string;
  grade_class?: string;
  status?: "Filled" | "Vacant";
  unit?: string;
  search?: string;
}): Position[] {
  let filtered = [...POSITIONS];

  if (filters.company) {
    filtered = filtered.filter(p => p.company === filters.company);
  }
  
  if (filters.job_family) {
    filtered = filtered.filter(p => p.job_family === filters.job_family);
  }
  
  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }
  
  if (filters.unit) {
    filtered = filtered.filter(p => p.unit === filters.unit);
  }
  
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.unit.toLowerCase().includes(search) ||
      p.company.toLowerCase().includes(search)
    );
  }

  return filtered;
}

// Get unique values for filters
export function getUniqueCompanies(): string[] {
  return Array.from(new Set(POSITIONS.map(p => p.company))).sort();
}

export function getUniqueJobFamilies(): string[] {
  return Array.from(new Set(POSITIONS.map(p => p.job_family))).sort();
}

export function getUniqueUnits(): string[] {
  return Array.from(new Set(POSITIONS.map(p => p.unit))).sort();
}

// Current period
export const CURRENT_PERIOD = {
  id: "PRD001",
  name: "Periode 2025",
  start: "2025-10-01",
  end: "2025-11-30",
  status: "OPEN" as const,
};