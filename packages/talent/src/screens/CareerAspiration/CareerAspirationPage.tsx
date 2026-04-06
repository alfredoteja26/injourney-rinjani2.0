import { useState, useMemo } from "react";
import { Layout } from "../../components/shell/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Users, User, Briefcase, Building, ChevronRight, Search, Info, CheckCircle2, AlertTriangle, FileText, TrendingUp, BarChart3, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "../../components/ui/scroll-area";

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
  { supervisor: "EMP016", subordinate: "EMP017" }, // PT Hotel Indonesia Natour
  { supervisor: "EMP018", subordinate: "EMP019" }, // PT Integrasi Aviasi Solusi
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

const getGradeValue = (grade: string | number) => {
  if (typeof grade === 'number') return grade;
  return 0; 
};

const getAspirationType = (currentGrade: number, targetGrade: number) => {
  if (targetGrade > currentGrade) return "PROMOSI";
  return "ROTASI";
};

// --- SUB-COMPONENTS (Views) ---

function AdminView({ aspirations }: { aspirations: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>Overview of all aspirations across the organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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
                const emp = EMPLOYEES.find(e => e.id === asp.emp_id);
                const pos = POSITIONS.find(p => p.id === asp.pos_id);
                return (
                  <TableRow key={asp.id}>
                    <TableCell>{emp?.name}</TableCell>
                    <TableCell>{pos?.name}</TableCell>
                    <TableCell><Badge variant="outline">{asp.type}</Badge></TableCell>
                    <TableCell><Badge>{asp.source}</Badge></TableCell>
                    <TableCell>{asp.submitted}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function EmployeeView({ currentUser, aspirations, onSaveAspiration }: { currentUser: any, aspirations: any[], onSaveAspiration: (asp: any) => void }) {
  const [selectedPositionId, setSelectedPositionId] = useState("");
  
  // Filter available positions based on rules (mocked simply here)
  const availablePositions = useMemo(() => {
    return POSITIONS.filter(p => p.id !== "POS001" && p.id !== "POS002" && p.id !== "POS003"); // Exclude BOD for direct staff application in this mock
  }, []);

  const myAspirations = aspirations.filter(a => a.emp_id === currentUser.id && a.source === "INDIVIDUAL");

  const handleApply = () => {
    if (!selectedPositionId) {
      toast.error("Please select a position");
      return;
    }
    const targetPos = POSITIONS.find(p => p.id === selectedPositionId);
    if (targetPos) {
      onSaveAspiration({
        pos_id: selectedPositionId,
        type: getAspirationType(currentUser.grade_jabatan, targetPos.grade_jabatan)
      });
      setSelectedPositionId("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Aspirations</CardTitle>
          <CardDescription>Submit your career aspirations for the next cycle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedPositionId} onValueChange={setSelectedPositionId}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Target Position" />
              </SelectTrigger>
              <SelectContent>
                {availablePositions.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name} ({p.unit})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleApply}><Plus className="w-4 h-4 mr-2" /> Add Aspiration</Button>
          </div>

          <div className="rounded-md border mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target Position</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myAspirations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">No aspirations submitted yet.</TableCell>
                  </TableRow>
                ) : (
                  myAspirations.map(asp => {
                    const pos = POSITIONS.find(p => p.id === asp.pos_id);
                    return (
                      <TableRow key={asp.id}>
                        <TableCell className="font-medium">{pos?.name}</TableCell>
                        <TableCell>{pos?.unit}</TableCell>
                        <TableCell><Badge variant="secondary">{asp.type}</Badge></TableCell>
                        <TableCell>Submitted</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SupervisorView({ currentUser, aspirations, onAssignAspiration }: { currentUser: any, aspirations: any[], onAssignAspiration: (empId: string, posId: string) => void }) {
  // Find direct reports
  const myTeam = useMemo(() => {
    const reportIds = RELATIONSHIPS.filter(r => r.supervisor === currentUser.id).map(r => r.subordinate);
    return EMPLOYEES.filter(e => reportIds.includes(e.id));
  }, [currentUser]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Team Aspirations</CardTitle>
          <CardDescription>Nominate your team members for career progression.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Team Member</label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {myTeam.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.name} - {m.position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Target Position</label>
              <Select value={targetPos} onValueChange={setTargetPos}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAssign} className="w-full">Submit Nomination</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Nominated For</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aspirations
                  .filter(a => a.source === "SUPERVISOR" && myTeam.some(m => m.id === a.emp_id))
                  .map(asp => {
                    const emp = EMPLOYEES.find(e => e.id === asp.emp_id);
                    const pos = POSITIONS.find(p => p.id === asp.pos_id);
                    return (
                      <TableRow key={asp.id}>
                        <TableCell>{emp?.name}</TableCell>
                        <TableCell>{pos?.name}</TableCell>
                        <TableCell><Badge>{asp.type}</Badge></TableCell>
                        <TableCell>{asp.submitted}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function JobHolderView({ currentUser, aspirations, onNominateSuccessor }: { currentUser: any, aspirations: any[], onNominateSuccessor: (nomineeId: string) => void }) {
  const [nomineeId, setNomineeId] = useState("");

  const handleNominate = () => {
    if (!nomineeId) return;
    onNominateSuccessor(nomineeId);
    setNomineeId("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Successor Nomination</CardTitle>
        <CardDescription>Nominate a successor for your current position ({currentUser.position}).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Select value={nomineeId} onValueChange={setNomineeId}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Nominee" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYEES.filter(e => e.id !== currentUser.id).map(e => (
                <SelectItem key={e.id} value={e.id}>{e.name} ({e.position})</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleNominate}>Nominate</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nominee</TableHead>
                <TableHead>Current Position</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aspirations
                .filter(a => a.source === "JOB_HOLDER" && a.nominator === currentUser.name)
                .map(asp => {
                  const emp = EMPLOYEES.find(e => e.id === asp.emp_id);
                  return (
                    <TableRow key={asp.id}>
                      <TableCell>{emp?.name}</TableCell>
                      <TableCell>{emp?.position}</TableCell>
                      <TableCell>Nominated</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function UnitView({ currentUser, unitRequests, onRequestTalent }: { currentUser: any, unitRequests: any[], onRequestTalent: (req: any) => void }) {
  const [requestOpen, setRequestOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Unit Aspirations</h3>
          <p className="text-sm text-muted-foreground">Request talent from other units or propose movements.</p>
        </div>
        <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
          <DialogTrigger asChild>
            <Button>New Talent Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Talent</DialogTitle>
              <DialogDescription>Submit a request for a specific talent to join your unit.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Position (In Your Unit)</label>
                <Input placeholder="e.g. Manager Marketing" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nominee Name</label>
                <Input placeholder="e.g. Budi Santoso" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                onRequestTalent({
                  unit_id: currentUser.unit,
                  requested_by: currentUser.name,
                  requested_pos: "Director SDM", // Mocked
                  nominee_name: "Ratna Wijaya", // Mocked
                  nominee_pos: "Manager HR Ops"
                });
                setRequestOpen(false);
              }}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {unitRequests.map(req => (
          <Card key={req.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">{req.requested_pos}</CardTitle>
                <Badge variant="outline">Pending</Badge>
              </div>
              <CardDescription>Requested by {req.requested_by}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-muted-foreground">Nominee:</span> <span className="font-medium">{req.nominee_name}</span>
                </div>
                <div className="text-muted-foreground">{req.submitted}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export function CareerAspirationPage({ embedded = false }: { embedded?: boolean }) {
  const [currentView, setCurrentView] = useState("EMP004"); 
  const [currentUser, setCurrentUser] = useState(EMPLOYEES.find(e => e.id === "EMP004"));

  const [aspirations, setAspirations] = useState(INITIAL_ASPIRATIONS_DATA);
  const [unitRequests, setUnitRequests] = useState(INITIAL_UNIT_REQUESTS);

  const handleViewChange = (val: string) => {
    setCurrentView(val);
    setCurrentUser(EMPLOYEES.find(e => e.id === val));
  };

  const handleSaveIndividualAspiration = (asp: any) => {
    const newRecord = {
      ...asp,
      id: `NEW_${Date.now()}`,
      emp_id: currentUser?.id,
      source: "INDIVIDUAL",
      submitted: new Date().toISOString().split('T')[0]
    };
    setAspirations(prev => [...prev, newRecord]);
    toast.success("Aspiration submitted successfully!");
  };

  const handleAssignSupervisorAspiration = (empId: string, posId: string) => {
    const emp = EMPLOYEES.find(e => e.id === empId);
    const pos = POSITIONS.find(p => p.id === posId);
    
    if (emp && pos) {
      const type = getAspirationType(emp.grade_jabatan, pos.grade_jabatan);
      const newRecord = {
        id: `NEW_SUP_${Date.now()}`,
        emp_id: empId,
        pos_id: posId,
        type,
        source: "SUPERVISOR",
        nominator: currentUser?.name,
        submitted: new Date().toISOString().split('T')[0]
      };
      setAspirations(prev => [...prev, newRecord]);
      toast.success(`Nomination for ${emp.name} submitted!`);
    }
  };

  const handleNominateSuccessor = (nomineeId: string) => {
     const myPos = POSITIONS.find(p => p.name === currentUser?.position);
     
     if (myPos) {
        const newRecord = {
           id: `NEW_JOB_${Date.now()}`,
           emp_id: nomineeId, 
           pos_id: myPos.id, 
           type: 'PROMOSI', 
           source: 'JOB_HOLDER',
           nominator: currentUser?.name,
           submitted: new Date().toISOString().split('T')[0]
        };
        setAspirations(prev => [...prev, newRecord]);
        toast.success(`Successor nominated successfully!`);
     } else {
        toast.error("Could not determine your current position ID.");
     }
  };

  const handleRequestTalent = (req: any) => {
     const newReq = {
       ...req,
       id: `NEW_UNIT_${Date.now()}`,
       submitted: new Date().toISOString().split('T')[0]
     };
     setUnitRequests(prev => [...prev, newReq]);
     
     const pos = POSITIONS.find(p => p.name === req.requested_pos && p.unit === req.unit_id);
     const emp = EMPLOYEES.find(e => e.name === req.nominee_name);
     
     if (pos && emp) {
        setAspirations(prev => [...prev, {
           id: `NEW_UNIT_ASP_${Date.now()}`,
           emp_id: emp.id,
           pos_id: pos.id,
           type: 'ROTASI', // Defaulting
           source: 'UNIT',
           nominator: currentUser?.name,
           submitted: new Date().toISOString().split('T')[0]
        }]);
     }
     
     toast.success("Talent request submitted successfully");
  };

  const pageContent = (
    <div className={embedded ? "h-full" : "p-8 max-w-[1200px] mx-auto space-y-8 pb-20"}>
      
      {/* Header & View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
           <div className="flex items-center gap-2 text-primary">
             <TrendingUp className="w-8 h-8" />
             <h3 className="text-2xl font-bold tracking-tight">Career Path (Aspiration)</h3>
           </div>
           <p className="text-muted-foreground">Manage your career aspirations and succession planning.</p>
        </div>
        
        <div className="w-[300px]">
           <label className="text-xs font-medium text-muted-foreground mb-1 block">View As (Prototype Only)</label>
           <Select value={currentView} onValueChange={handleViewChange}>
             <SelectTrigger>
               <SelectValue placeholder="Select User View" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="EMP004">👤 Budi Santoso (Employee)</SelectItem>
               <SelectItem value="EMP003">👔 Ratna Wijaya (Supervisor)</SelectItem>
               <SelectItem value="EMP001">🎯 Sri Mulyani (Job Holder)</SelectItem>
               <SelectItem value="EMP010">🏢 Bambang Sugiarto (Unit Lead)</SelectItem>
               <SelectItem value="EMP014">⚙️ Linda Sari (HC Admin)</SelectItem>
               <SelectItem value="EMP016">🏨 Rudi Hermawan (Ops Manager - HIN)</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>

      {/* Dynamic Content Based on View */}
      
      {currentUser?.id === "EMP014" ? (
        <AdminView aspirations={aspirations} />
      ) : (
        <Tabs defaultValue="individual">
          <TabsList className="mb-4">
            <TabsTrigger value="individual" className="gap-2"><User className="w-4 h-4"/> Individual</TabsTrigger>
            {/* Show Supervisor Tab if applicable - Checking if Level includes BOD-1/2/3 */}
            {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02" || currentUser?.level_jabatan === "BOD-03") && (
              <TabsTrigger value="supervisor" className="gap-2"><Users className="w-4 h-4"/> Supervisor</TabsTrigger>
            )}
            {/* Show Job Holder Tab if applicable - BOD-1/2 */}
            {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02") && (
              <TabsTrigger value="jobholder" className="gap-2"><Briefcase className="w-4 h-4"/> Job Holder</TabsTrigger>
            )}
            {/* Show Unit Tab if applicable - BOD-1/2/3 */}
            {(currentUser?.level_jabatan === "BOD-01" || currentUser?.level_jabatan === "BOD-02" || currentUser?.level_jabatan === "BOD-03") && (
              <TabsTrigger value="unit" className="gap-2"><Building className="w-4 h-4"/> Unit</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="individual">
             <EmployeeView currentUser={currentUser} aspirations={aspirations} onSaveAspiration={handleSaveIndividualAspiration} />
          </TabsContent>

          <TabsContent value="supervisor">
             <SupervisorView currentUser={currentUser} aspirations={aspirations} onAssignAspiration={handleAssignSupervisorAspiration} />
          </TabsContent>

          <TabsContent value="jobholder">
             <JobHolderView currentUser={currentUser} aspirations={aspirations} onNominateSuccessor={handleNominateSuccessor} />
          </TabsContent>

           <TabsContent value="unit">
             <UnitView currentUser={currentUser} unitRequests={unitRequests} onRequestTalent={handleRequestTalent} />
          </TabsContent>
        </Tabs>
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
