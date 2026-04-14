import { useMemo, useState } from "react";
import { Layout } from "../../components/shell/Layout";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  FilterRail,
  Input,
  PageHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@rinjani/shared-ui";
import { Briefcase, Building, FileText, Plus, User, Users } from "lucide-react";
import { toast } from "sonner";

// --- MOCK DATA ---

const EMPLOYEES = [
  { id: "EMP001", name: "Sri Mulyani", nik: "10001", position: "Director SDM", level_jabatan: "BOD-01", band_jabatan: "BOD", grade_jabatan: 21, job_family: "Human Resources", unit: "HC Division", status: "PERMANENT", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP002", name: "Agus Pratama", nik: "10002", position: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", unit: "HC Division", status: "PERMANENT", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP003", name: "Ratna Wijaya", nik: "10003", position: "Manager HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", unit: "HR Ops", status: "PERMANENT", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP004", name: "Budi Santoso", nik: "10004", position: "Staff HR Operations", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "HR Ops", status: "PERMANENT", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP005", name: "Siti Aminah", nik: "10005", position: "Staff Payroll", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "HR Ops", status: "PERMANENT", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP006", name: "Ahmad Rizki", nik: "10006", position: "Staff Recruitment", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "HR Ops", status: "PERMANENT", disciplinary_status: "ACTIVE", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP007", name: "Dian Permata", nik: "10007", position: "Manager Talent Acquisition", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", unit: "Talent Acq", status: "PERMANENT", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP008", name: "Eko Prasetyo", nik: "10008", position: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "Talent Acq", status: "PERMANENT", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP009", name: "Fani Rahayu", nik: "10009", position: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "Talent Acq", status: "PERMANENT", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP010", name: "Bambang Sugiarto", nik: "10010", position: "Head of HC Division", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", unit: "HC Division", status: "PERMANENT", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP011", name: "Hendra Kusuma", nik: "10011", position: "Manager Finance", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Finance", unit: "Finance", status: "PERMANENT", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP012", name: "Dewi Kartika", nik: "10012", position: "Jr. Staff Finance", level_jabatan: "BOD-05", band_jabatan: "Department Head", grade_jabatan: 11, job_family: "Finance", unit: "Finance", status: "PERMANENT", image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP013", name: "Gilang Ramadhan", nik: "10013", position: "Staff Finance", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Finance", unit: "Finance", status: "PERMANENT", disciplinary_status: "EXPIRED", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP014", name: "Linda Sari", nik: "10014", position: "HC Admin", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", unit: "HC Division", status: "PERMANENT", image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP015", name: "Maya Putri", nik: "10015", position: "Supervisor Compensation", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", unit: "HC", status: "PERMANENT", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP016", name: "Rudi Hermawan", nik: "10016", position: "Manager Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Operations", unit: "Operations", status: "PERMANENT", image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP017", name: "Novi Andini", nik: "10017", position: "Staff Operations", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Operations", unit: "Operations", status: "PERMANENT", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP018", name: "Teguh Prakoso", nik: "10018", position: "Manager IT", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Information Technology", unit: "IT", status: "PERMANENT", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP019", name: "Wulan Sari", nik: "10019", position: "Staff IT", level_jabatan: "BOD-04", band_jabatan: "Department Head", grade_jabatan: 12, job_family: "Information Technology", unit: "IT", status: "PERMANENT", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP020", name: "Andi Wijaya", nik: "10020", position: "Manager Tourism", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Tourism", unit: "Tourism", status: "PERMANENT", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "EMP021", name: "Putri Maharani", nik: "10021", position: "Manager Retail", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Retail", unit: "Retail", status: "PERMANENT", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" },
];

const POSITIONS = [
  { id: "POS001", name: "Director SDM", level_jabatan: "BOD-01", band_jabatan: "BOD", grade_jabatan: 21, job_family: "Human Resources", company: "InJourney", unit: "HC Division", status: "Filled" },
  { id: "POS002", name: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney", unit: "HC Division", status: "Filled" },
  { id: "POS003", name: "Head of HC Division", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 18, job_family: "Human Resources", company: "InJourney", unit: "HC Division", status: "Filled" },
  { id: "POS004", name: "Manager HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney", unit: "HR Ops", status: "Filled" },
  { id: "POS005", name: "Manager Talent Acquisition", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney", unit: "Talent Acq", status: "Filled" },
  { id: "POS006", name: "Manager Compensation & Benefits", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney", unit: "Comp & Ben", status: "Vacant" },
  { id: "POS007", name: "Manager Learning & Development", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 15, job_family: "Human Resources", company: "InJourney", unit: "L&D", status: "Vacant" },
  { id: "POS008", name: "Supervisor HR Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Human Resources", company: "InJourney", unit: "HR Ops", status: "Vacant" },
  { id: "POS009", name: "Staff HR Operations", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney", unit: "HR Ops", status: "Filled" },
  { id: "POS010", name: "Staff Talent Acquisition", level_jabatan: "BOD-04", band_jabatan: "Division Head", grade_jabatan: 13, job_family: "Human Resources", company: "InJourney", unit: "Talent Acq", status: "Filled" },
  { id: "POS011", name: "Manager Finance", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Finance", company: "InJourney", unit: "Finance", status: "Filled" },
  { id: "POS012", name: "VP Human Capital", level_jabatan: "BOD-02", band_jabatan: "Group Head", grade_jabatan: 17, job_family: "Human Resources", company: "PT Angkasa Pura Indonesia", unit: "HC", status: "Filled" },
  { id: "POS013", name: "Manager Operations", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Operations", company: "PT Hotel Indonesia Natour", unit: "Operations", status: "Filled" },
  { id: "POS014", name: "Manager IT", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Information Technology", company: "PT Integrasi Aviasi Solusi", unit: "IT", status: "Filled" },
  { id: "POS015", name: "Manager Tourism", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Tourism", company: "PT TWC Borobudur Prambanan Ratu Boko", unit: "Tourism", status: "Filled" },
  { id: "POS016", name: "Manager Retail", level_jabatan: "BOD-03", band_jabatan: "Division Head", grade_jabatan: 14, job_family: "Retail", company: "PT Sarinah", unit: "Retail", status: "Filled" },
];

const RELATIONSHIPS = [
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

const INITIAL_ASPIRATIONS_DATA = [
  { id: "IND001", emp_id: "EMP004", pos_id: "POS005", type: "ROTASI", source: "INDIVIDUAL", submitted: "2025-10-15" },
  { id: "IND002", emp_id: "EMP004", pos_id: "POS008", type: "PROMOSI", source: "INDIVIDUAL", submitted: "2025-10-15" },
  { id: "SUP001", emp_id: "EMP004", pos_id: "POS008", type: "PROMOSI", source: "SUPERVISOR", submitted: "2025-10-20", nominator: "Ratna Wijaya" },
  { id: "SUP006", emp_id: "EMP003", pos_id: "POS002", type: "PROMOSI", source: "SUPERVISOR", submitted: "2025-10-25", nominator: "Agus Pratama" },
];

const INITIAL_UNIT_REQUESTS = [
  { id: "UNIT001", unit_id: "UNIT001", requested_by: "Bambang Sugiarto", requested_pos: "Director SDM", nominee_name: "Agus Pratama", nominee_pos: "VP Human Capital", submitted: "2025-10-28" },
  { id: "UNIT002", unit_id: "UNIT001", requested_by: "Bambang Sugiarto", requested_pos: "Director SDM", nominee_name: "Ratna Wijaya", nominee_pos: "Manager HR Operations", submitted: "2025-10-28" },
];

// --- LOGIC HELPERS ---

const getAspirationType = (currentGrade: number, targetGrade: number) => {
  if (targetGrade > currentGrade) return "PROMOSI";
  return "ROTASI";
};

const VIEW_OPTIONS = [
  { value: "EMP004", label: "Budi Santoso", role: "Employee" },
  { value: "EMP003", label: "Ratna Wijaya", role: "Supervisor" },
  { value: "EMP001", label: "Sri Mulyani", role: "Job Holder" },
  { value: "EMP010", label: "Bambang Sugiarto", role: "Unit Lead" },
  { value: "EMP014", label: "Linda Sari", role: "HC Admin" },
  { value: "EMP016", label: "Rudi Hermawan", role: "Ops Manager" },
] as const;

const getSourceVariant = (source: string) => {
  switch (source) {
    case "INDIVIDUAL":
      return "info" as const;
    case "SUPERVISOR":
      return "warning" as const;
    case "JOB_HOLDER":
      return "success" as const;
    case "UNIT":
      return "neutral" as const;
    default:
      return "neutral" as const;
  }
};

const getAspirationTypeVariant = (type: string): "success" | "info" => (type === "PROMOSI" ? "success" : "info");

const getCurrentViewLabel = (value: string) => VIEW_OPTIONS.find((option) => option.value === value);

const getViewRoleVariant = (role?: string) => {
  switch (role) {
    case "Supervisor":
      return "warning" as const;
    case "Job Holder":
      return "success" as const;
    case "Unit Lead":
      return "neutral" as const;
    case "HC Admin":
      return "attention" as const;
    default:
      return "info" as const;
  }
};

const getViewRoleSummary = (role?: string) => {
  switch (role) {
    case "Supervisor":
      return "Tinjau aspirasi anggota tim dan ajukan nominasi dari konteks line manager.";
    case "Job Holder":
      return "Tentukan kandidat penerus untuk posisi kritikal yang sedang Anda emban.";
    case "Unit Lead":
      return "Ajukan kebutuhan talenta lintas unit tanpa mengubah alur permintaan yang ada.";
    case "HC Admin":
      return "Pantau seluruh aspirasi organisasi dari ringkasan administratif yang lebih rapi.";
    case "Ops Manager":
      return "Gunakan persona alternatif untuk melihat perilaku halaman pada konteks manager lain.";
    default:
      return "Kelola aspirasi karier personal Anda dari workspace yang lebih konsisten.";
  }
};

// --- SUB-COMPONENTS (Views) ---

function AdminView({ aspirations }: { aspirations: any[] }) {
  return (
    <SectionPanel
      title="Aspirasi organisasi"
      description="Ringkasan seluruh aspirasi karier pada organisasi dalam surface yang seragam dengan modul Talent terbaru."
      actions={<StatusBadge variant="info">{aspirations.length} records</StatusBadge>}
    >
      <div className="overflow-hidden rounded-[20px] border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Target Position</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aspirations.map((asp) => {
              const emp = EMPLOYEES.find((employee) => employee.id === asp.emp_id);
              const pos = POSITIONS.find((position) => position.id === asp.pos_id);
              return (
                <TableRow key={asp.id}>
                  <TableCell className="font-medium text-foreground">{emp?.name}</TableCell>
                  <TableCell>{pos?.name}</TableCell>
                  <TableCell>
                    <StatusBadge variant={getAspirationTypeVariant(asp.type)}>{asp.type}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant={getSourceVariant(asp.source)}>{asp.source}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{asp.submitted}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </SectionPanel>
  );
}

function EmployeeView({
  currentUser,
  aspirations,
  availablePositions,
  onSaveAspiration,
}: {
  currentUser: any;
  aspirations: any[];
  availablePositions: any[];
  onSaveAspiration: (asp: any) => void;
}) {
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const myAspirations = aspirations.filter((asp) => asp.emp_id === currentUser.id && asp.source === "INDIVIDUAL");

  const handleApply = () => {
    if (!selectedPositionId) {
      toast.error("Please select a position");
      return;
    }
    const targetPos = POSITIONS.find((position) => position.id === selectedPositionId);
    if (targetPos) {
      onSaveAspiration({
        pos_id: selectedPositionId,
        type: getAspirationType(currentUser.grade_jabatan, targetPos.grade_jabatan),
      });
      setSelectedPositionId("");
    }
  };

  return (
    <SectionPanel
      title="Individual aspirations"
      description="Ajukan aspirasi karier untuk siklus berikutnya tanpa mengubah alur pengisian yang sudah ada."
      actions={<StatusBadge variant="info">{myAspirations.length} submitted</StatusBadge>}
    >
      <FilterRail
        title="Buat aspirasi"
        description="Pilih posisi tujuan, lalu simpan aspirasi pada siklus aktif."
        actionsClassName="w-full"
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Posisi tujuan</label>
            <Select value={selectedPositionId} onValueChange={setSelectedPositionId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih posisi tujuan" />
              </SelectTrigger>
              <SelectContent>
                {availablePositions.map((position) => (
                  <SelectItem key={position.id} value={position.id}>
                    {position.name} ({position.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleApply} className="w-full lg:w-auto">
              <Plus className="size-4" />
              Simpan Aspirasi
            </Button>
          </div>
        </div>
      </FilterRail>

      <div className="mt-5 overflow-hidden rounded-[20px] border border-border bg-background shadow-sm">
        {myAspirations.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="Belum ada aspirasi yang dikirim"
              description="Aspirasi yang Anda simpan akan muncul di tabel ini untuk memudahkan peninjauan siklus karier."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posisi tujuan</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAspirations.map((asp) => {
                const pos = POSITIONS.find((position) => position.id === asp.pos_id);
                return (
                  <TableRow key={asp.id}>
                    <TableCell className="font-medium text-foreground">{pos?.name}</TableCell>
                    <TableCell>{pos?.unit}</TableCell>
                    <TableCell>
                      <StatusBadge variant={getAspirationTypeVariant(asp.type)}>{asp.type}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status="completed">Submitted</StatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </SectionPanel>
  );
}

function SupervisorView({
  currentUser,
  aspirations,
  myTeam,
  onAssignAspiration,
}: {
  currentUser: any;
  aspirations: any[];
  myTeam: any[];
  onAssignAspiration: (empId: string, posId: string) => void;
}) {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [targetPos, setTargetPos] = useState<string>("");

  const handleAssign = () => {
    if (!selectedMember || !targetPos) {
      toast.error("Please select employee and position");
      return;
    }
    onAssignAspiration(selectedMember, targetPos);
    setTargetPos("");
  };

  const teamAspirations = aspirations.filter((asp) => asp.source === "SUPERVISOR" && myTeam.some((member) => member.id === asp.emp_id));

  return (
    <SectionPanel
      title="Nominasi atasan"
      description="Ajukan nominasi perkembangan karier anggota tim dari workspace line manager yang lebih konsisten."
      actions={<StatusBadge variant="warning">{myTeam.length} direct reports</StatusBadge>}
    >
      <FilterRail
        title="Buat nominasi"
        description="Pilih anggota tim dan posisi tujuan, lalu kirim nominasi pada siklus berjalan."
        actionsClassName="w-full"
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Anggota tim</label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih anggota tim" />
              </SelectTrigger>
              <SelectContent>
                {myTeam.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} - {member.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Posisi tujuan</label>
            <Select value={targetPos} onValueChange={setTargetPos}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih posisi" />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((position) => (
                  <SelectItem key={position.id} value={position.id}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleAssign} className="w-full lg:w-auto">
              <Plus className="size-4" />
              Kirim Nominasi
            </Button>
          </div>
        </div>
      </FilterRail>

      <div className="mt-5 overflow-hidden rounded-[20px] border border-border bg-background shadow-sm">
        {teamAspirations.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="Belum ada nominasi atasan"
              description="Nominasi yang Anda kirimkan untuk anggota tim akan muncul di sini sebagai antrian peninjauan."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anggota tim</TableHead>
                <TableHead>Posisi tujuan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamAspirations.map((asp) => {
                const emp = EMPLOYEES.find((employee) => employee.id === asp.emp_id);
                const pos = POSITIONS.find((position) => position.id === asp.pos_id);
                return (
                  <TableRow key={asp.id}>
                    <TableCell className="font-medium text-foreground">{emp?.name}</TableCell>
                    <TableCell>{pos?.name}</TableCell>
                    <TableCell>
                      <StatusBadge variant={getAspirationTypeVariant(asp.type)}>{asp.type}</StatusBadge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{asp.submitted}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </SectionPanel>
  );
}

function JobHolderView({
  currentUser,
  aspirations,
  eligibleNominees,
  onNominateSuccessor,
}: {
  currentUser: any;
  aspirations: any[];
  eligibleNominees: any[];
  onNominateSuccessor: (nomineeId: string) => void;
}) {
  const [nomineeId, setNomineeId] = useState("");

  const handleNominate = () => {
    if (!nomineeId) return;
    onNominateSuccessor(nomineeId);
    setNomineeId("");
  };

  const successorNominations = aspirations.filter((asp) => asp.source === "JOB_HOLDER" && asp.nominator === currentUser.name);

  return (
    <SectionPanel
      title="Nominasi successor"
      description={`Tentukan kandidat successor untuk posisi ${currentUser.position}.`}
      actions={<StatusBadge variant="success">{successorNominations.length} nominations</StatusBadge>}
    >
      <FilterRail title="Pilih nominee" description="Pilih kandidat penerus dan lanjutkan alur nominasi yang sama." actionsClassName="w-full">
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nominee</label>
            <Select value={nomineeId} onValueChange={setNomineeId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih nominee" />
              </SelectTrigger>
              <SelectContent>
                {eligibleNominees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} ({employee.position})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleNominate} className="w-full lg:w-auto">
              <Briefcase className="size-4" />
              Kirim Nominasi
            </Button>
          </div>
        </div>
      </FilterRail>

      <div className="mt-5 overflow-hidden rounded-[20px] border border-border bg-background shadow-sm">
        {successorNominations.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="Belum ada nominasi successor"
              description="Kandidat penerus yang Anda pilih akan tampil pada daftar ini untuk pemantauan berikutnya."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nominee</TableHead>
                <TableHead>Posisi saat ini</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {successorNominations.map((asp) => {
                const emp = EMPLOYEES.find((employee) => employee.id === asp.emp_id);
                return (
                  <TableRow key={asp.id}>
                    <TableCell className="font-medium text-foreground">{emp?.name}</TableCell>
                    <TableCell>{emp?.position}</TableCell>
                    <TableCell>
                      <StatusBadge status="success">Nominated</StatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </SectionPanel>
  );
}

function UnitView({
  currentUser,
  unitRequests,
  onRequestTalent,
}: {
  currentUser: any;
  unitRequests: any[];
  onRequestTalent: (req: any) => void;
}) {
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <SectionPanel
      title="Permintaan unit"
      description="Ajukan kebutuhan talenta lintas unit melalui workspace yang lebih rapi tanpa mengubah interaksi yang ada."
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge variant="warning">{unitRequests.length} requests</StatusBadge>
          <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4" />
                Permintaan Baru
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Permintaan talenta</DialogTitle>
                <DialogDescription>Ajukan permintaan untuk talenta yang dibutuhkan pada unit Anda.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Posisi tujuan di unit Anda</label>
                  <Input placeholder="Contoh: Manager Marketing" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama nominee</label>
                  <Input placeholder="Contoh: Budi Santoso" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    onRequestTalent({
                      unit_id: currentUser.unit,
                      requested_by: currentUser.name,
                      requested_pos: "Director SDM",
                      nominee_name: "Ratna Wijaya",
                      nominee_pos: "Manager HR Ops",
                    });
                    setRequestOpen(false);
                  }}
                >
                  Kirim Permintaan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        {unitRequests.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-border bg-muted/20 px-6 py-8">
            <EmptyState
              title="Belum ada permintaan unit"
              description="Permintaan talenta antar unit akan tampil di sini agar mudah dipantau oleh pemilik unit."
            />
          </div>
        ) : (
          unitRequests.map((req) => (
            <div key={req.id} className="rounded-[20px] border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">{req.requested_pos}</p>
                  <p className="text-sm text-muted-foreground">Requested by {req.requested_by}</p>
                </div>
                <StatusBadge variant="warning">Pending</StatusBadge>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <p>
                  <span className="text-muted-foreground">Nominee:</span> <span className="font-medium text-foreground">{req.nominee_name}</span>
                </p>
                <p className="text-muted-foreground">{req.submitted}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionPanel>
  );
}

function TeamSummary({
  aspirations,
  unitRequests,
  availablePositions,
}: {
  aspirations: any[];
  unitRequests: any[];
  availablePositions: any[];
}) {
  const totalRecords = aspirations.length + unitRequests.length;
  const individualRecords = aspirations.filter((asp) => asp.source === "INDIVIDUAL").length;
  const supervisorRecords = aspirations.filter((asp) => asp.source === "SUPERVISOR").length;
  const openPositions = availablePositions.filter((position) => position.status === "Vacant").length;

  return (
    <StatCardGroup>
      <StatCard
        label="Total record"
        value={totalRecords}
        description="Seluruh aspirasi dan permintaan unit pada data aktif."
        supportingText="Ringkasan ini menjaga konteks halaman tetap mudah dipindai."
        icon={<FileText className="size-5" />}
        tone="info"
      />
      <StatCard
        label="Aspirasi individu"
        value={individualRecords}
        description="Pengajuan aspirasi mandiri oleh karyawan."
        supportingText="Alur self-service tetap sama."
        icon={<User className="size-5" />}
        tone="success"
      />
      <StatCard
        label="Nominasi atasan"
        value={supervisorRecords}
        description="Usulan atasan untuk direct report."
        supportingText="Flow line manager tetap berada di route yang sama."
        icon={<Users className="size-5" />}
        tone="warning"
      />
      <StatCard
        label="Posisi terbuka"
        value={openPositions}
        description="Posisi vacant yang tersedia sebagai target aspirasi."
        supportingText="Daftar target tidak berubah."
        icon={<Building className="size-5" />}
        tone="neutral"
      />
    </StatCardGroup>
  );
}

// --- MAIN PAGE COMPONENT ---

export function CareerAspirationPage({ embedded = false }: { embedded?: boolean }) {
  const [currentView, setCurrentView] = useState("EMP004");
  const [currentUser, setCurrentUser] = useState(EMPLOYEES.find((employee) => employee.id === "EMP004"));

  const [aspirations, setAspirations] = useState(INITIAL_ASPIRATIONS_DATA);
  const [unitRequests, setUnitRequests] = useState(INITIAL_UNIT_REQUESTS);

  const availablePositions = useMemo(() => POSITIONS.filter((position) => !["POS001", "POS002", "POS003"].includes(position.id)), []);
  const currentTeam = useMemo(() => {
    if (!currentUser) return [];
    const reportIds = RELATIONSHIPS.filter((relationship) => relationship.supervisor === currentUser.id).map((relationship) => relationship.subordinate);
    return EMPLOYEES.filter((employee) => reportIds.includes(employee.id));
  }, [currentUser]);
  const currentViewOption = getCurrentViewLabel(currentView);
  const isAdminView = currentUser?.id === "EMP014";

  const handleViewChange = (val: string) => {
    setCurrentView(val);
    setCurrentUser(EMPLOYEES.find((employee) => employee.id === val));
  };

  const handleSaveIndividualAspiration = (asp: any) => {
    const newRecord = {
      ...asp,
      id: `NEW_${Date.now()}`,
      emp_id: currentUser?.id,
      source: "INDIVIDUAL",
      submitted: new Date().toISOString().split("T")[0],
    };
    setAspirations((prev) => [...prev, newRecord]);
    toast.success("Aspiration submitted successfully!");
  };

  const handleAssignSupervisorAspiration = (empId: string, posId: string) => {
    const emp = EMPLOYEES.find((employee) => employee.id === empId);
    const pos = POSITIONS.find((position) => position.id === posId);

    if (emp && pos) {
      const type = getAspirationType(emp.grade_jabatan, pos.grade_jabatan);
      const newRecord = {
        id: `NEW_SUP_${Date.now()}`,
        emp_id: empId,
        pos_id: posId,
        type,
        source: "SUPERVISOR",
        nominator: currentUser?.name,
        submitted: new Date().toISOString().split("T")[0],
      };
      setAspirations((prev) => [...prev, newRecord]);
      toast.success(`Nomination for ${emp.name} submitted!`);
    }
  };

  const handleNominateSuccessor = (nomineeId: string) => {
    const myPos = POSITIONS.find((position) => position.name === currentUser?.position);

    if (myPos) {
      const newRecord = {
        id: `NEW_JOB_${Date.now()}`,
        emp_id: nomineeId,
        pos_id: myPos.id,
        type: "PROMOSI",
        source: "JOB_HOLDER",
        nominator: currentUser?.name,
        submitted: new Date().toISOString().split("T")[0],
      };
      setAspirations((prev) => [...prev, newRecord]);
      toast.success("Successor nominated successfully!");
    } else {
      toast.error("Could not determine your current position ID.");
    }
  };

  const handleRequestTalent = (req: any) => {
    const newReq = {
      ...req,
      id: `NEW_UNIT_${Date.now()}`,
      submitted: new Date().toISOString().split("T")[0],
    };
    setUnitRequests((prev) => [...prev, newReq]);

    const pos = POSITIONS.find((position) => position.name === req.requested_pos && position.unit === req.unit_id);
    const emp = EMPLOYEES.find((employee) => employee.name === req.nominee_name);

    if (pos && emp) {
      setAspirations((prev) => [
        ...prev,
        {
          id: `NEW_UNIT_ASP_${Date.now()}`,
          emp_id: emp.id,
          pos_id: pos.id,
          type: "ROTASI",
          source: "UNIT",
          nominator: currentUser?.name,
          submitted: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    toast.success("Talent request submitted successfully");
  };

  const pageContent = (
    <div className={embedded ? "flex h-full flex-col gap-6" : "mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8"}>
      <PageHeader
        variant="workspace"
        eyebrow="My Talent Journey"
        title="Career Aspiration"
        description="Kelola aspirasi karier, nominasi atasan, successor, dan permintaan unit dalam workspace yang selaras dengan pola UI Talent terbaru."
        badge={<StatusBadge variant={getViewRoleVariant(currentViewOption?.role)}>{currentViewOption?.role ?? "Persona"}</StatusBadge>}
      />

      <TeamSummary aspirations={aspirations} unitRequests={unitRequests} availablePositions={availablePositions} />

      <FilterRail
        title="Konteks tampilan"
        description={currentUser ? `${currentUser.name} • ${currentUser.position} • ${currentUser.unit}` : "Pilih persona untuk melihat konteks halaman."}
        actionsClassName="w-full"
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <div className="rounded-[20px] border border-border bg-muted/30 px-4 py-4">
            <p className="text-sm font-semibold text-foreground">{currentViewOption?.role ?? "Persona aktif"}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{getViewRoleSummary(currentViewOption?.role)}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Lihat sebagai</label>
            <Select value={currentView} onValueChange={handleViewChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih persona" />
              </SelectTrigger>
              <SelectContent>
                {VIEW_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} ({option.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterRail>

      {!isAdminView ? (
        <Tabs defaultValue="individual" className="space-y-6">
          <FilterRail
            title="Mode aspirasi"
            description="Pindah antar mode kerja tanpa mengubah route maupun logika data halaman."
            actionsClassName="w-full"
          >
            <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-muted p-2">
              <TabsTrigger value="individual" className="gap-2 rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <User className="size-4" /> Individu
              </TabsTrigger>
              {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02" || currentUser?.level_jabatan === "BOD-03") && (
                <TabsTrigger value="supervisor" className="gap-2 rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Users className="size-4" /> Atasan
                </TabsTrigger>
              )}
              {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02") && (
                <TabsTrigger value="jobholder" className="gap-2 rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Briefcase className="size-4" /> Job Holder
                </TabsTrigger>
              )}
              {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02" || currentUser?.level_jabatan === "BOD-03") && (
                <TabsTrigger value="unit" className="gap-2 rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Building className="size-4" /> Unit
                </TabsTrigger>
              )}
            </TabsList>
          </FilterRail>

          <TabsContent value="individual" className="mt-0">
            <EmployeeView
              currentUser={currentUser}
              aspirations={aspirations}
              availablePositions={availablePositions}
              onSaveAspiration={handleSaveIndividualAspiration}
            />
          </TabsContent>

          <TabsContent value="supervisor" className="mt-0">
            <SupervisorView currentUser={currentUser} aspirations={aspirations} myTeam={currentTeam} onAssignAspiration={handleAssignSupervisorAspiration} />
          </TabsContent>

          <TabsContent value="jobholder" className="mt-0">
            <JobHolderView
              currentUser={currentUser}
              aspirations={aspirations}
              eligibleNominees={EMPLOYEES.filter((employee) => employee.id !== currentUser.id)}
              onNominateSuccessor={handleNominateSuccessor}
            />
          </TabsContent>

          <TabsContent value="unit" className="mt-0">
            <UnitView currentUser={currentUser} unitRequests={unitRequests} onRequestTalent={handleRequestTalent} />
          </TabsContent>
        </Tabs>
      ) : (
        <AdminView aspirations={aspirations} />
      )}
    </div>
  );

  if (embedded) {
    return pageContent;
  }

  return (
    <Layout>
      {pageContent}
    </Layout>
  );
}
