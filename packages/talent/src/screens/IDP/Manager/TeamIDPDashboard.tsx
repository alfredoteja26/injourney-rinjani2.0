import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Search, 
  Filter, 
  Download, 
  Bell, 
  ChevronRight, 
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  PenTool
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Layout } from "@/components/shell/Layout";
import { IDPStatusBadge, IDPStatus } from "@/components/idp/IDPStatusBadge";
import { 
  mockIDPCycles, 
  mockIDPRecords, 
  mockEmployees 
} from "@/data/idpData";
import { toast } from "sonner@2.0.3";

export function TeamIDPDashboard() {
  const navigate = useNavigate();
  const activeCycle = mockIDPCycles.find(c => c.status === 'active');
  
  // Mock logged in manager
  const currentManagerId = "emp-mgr-001"; 
  const currentManager = { name: "Dewi Kartika", division: "Finance Division" };

  // Get team members
  const teamMembers = mockEmployees.filter(e => e.manager_id === currentManagerId);

  // Get their IDP records for active cycle
  const teamRecords = teamMembers.map(employee => {
    const record = mockIDPRecords.find(r => r.employee_id === employee.id && r.cycle_id === activeCycle?.id);
    return {
      employee,
      record: record || null,
      status: record?.status || 'not_started'
    };
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Quick Approve State
  const [showQuickApprove, setShowQuickApprove] = useState(false);
  const [selectedEmployeeForApproval, setSelectedEmployeeForApproval] = useState<any>(null);

  // Filter Logic
  const filteredData = teamRecords.filter(item => {
    const matchesSearch = item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.employee.current_position_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "not_started" && !item.record) ||
                          (item.record?.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalMembers = teamMembers.length;
  const submittedCount = teamRecords.filter(t => t.record && t.record.status !== 'draft').length;
  const submissionRate = Math.round((submittedCount / totalMembers) * 100);
  const pendingCount = teamRecords.filter(t => t.record?.status === 'pending_approval').length;
  
  const totalProgress = teamRecords.reduce((sum, t) => {
    if (!t.record) return sum;
    return sum + ((t.record.completed_hours / t.record.total_hours) * 100 || 0);
  }, 0);
  const avgProgress = Math.round(totalProgress / totalMembers);

  // Chart Data
  const statusCounts = {
    approved: teamRecords.filter(t => t.record?.status === 'approved').length,
    pending: teamRecords.filter(t => t.record?.status === 'pending_approval').length,
    revision: teamRecords.filter(t => t.record?.status === 'revision_requested').length,
    draft: teamRecords.filter(t => t.record?.status === 'draft').length,
    not_started: teamRecords.filter(t => !t.record).length,
  };

  const pieData = [
    { name: 'Approved', value: statusCounts.approved, color: '#10B981' }, // Emerald-500
    { name: 'Pending', value: statusCounts.pending, color: '#F59E0B' },   // Amber-500
    { name: 'Revision', value: statusCounts.revision, color: '#F97316' }, // Orange-500
    { name: 'Draft', value: statusCounts.draft, color: '#94A3B8' },      // Slate-400
    { name: 'Not Started', value: statusCounts.not_started, color: '#E2E8F0' }, // Slate-200
  ].filter(d => d.value > 0);

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map(d => d.employee.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleBulkReminder = () => {
    toast.success(`Reminder dikirim ke ${selectedRows.length} karyawan`);
    setSelectedRows([]);
  };

  const handleQuickApprove = (employee: any, recordId: string) => {
      setSelectedEmployeeForApproval({ ...employee, recordId });
      setShowQuickApprove(true);
  };

  const confirmQuickApprove = () => {
      if (selectedEmployeeForApproval) {
          toast.success(`IDP ${selectedEmployeeForApproval.name} berhasil disetujui`);
          setShowQuickApprove(false);
          setSelectedEmployeeForApproval(null);
      }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[var(--muted)] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                My Team IDP
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]">
                  {activeCycle?.name}
                </Badge>
                <div className="flex items-center text-[var(--muted-foreground)] text-sm font-medium gap-2 px-3 py-1 bg-white rounded-full border border-[var(--border)] shadow-sm">
                  <Users className="w-4 h-4" />
                  {currentManager.division} · {totalMembers} anggota
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">
                <Download className="w-4 h-4 mr-2" />
                Export Laporan
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Submission Status */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Status Submission
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                 <div className="relative w-20 h-20">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={pieData}
                         innerRadius={25}
                         outerRadius={35}
                         paddingAngle={2}
                         dataKey="value"
                       >
                         {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <RechartsTooltip />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
                 <div>
                   <div className="text-2xl font-bold">
                     {submittedCount}/{totalMembers}
                   </div>
                   <p className="text-sm text-[var(--muted-foreground)]">
                     {submissionRate}% karyawan telah submit
                   </p>
                 </div>
              </CardContent>
            </Card>

            {/* Pending Approval */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Menunggu Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-amber-500">
                      {pendingCount}
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      Perlu review Anda
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-full">
                    <Clock className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Rata-rata Progress Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-3xl font-bold text-[var(--primary)]">{avgProgress}%</span>
                   <span className="text-sm text-[var(--muted-foreground)]">selesai</span>
                </div>
                <Progress value={avgProgress} className="h-2" />
                <p className="text-xs text-[var(--muted-foreground)] mt-2">
                  Berdasarkan IDP yang disetujui
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Controls & Table */}
          <Card>
            <CardHeader className="p-4 border-b">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search & Filter */}
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
                    <Input
                      placeholder="Cari nama karyawan..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending_approval">Menunggu Approval</SelectItem>
                      <SelectItem value="approved">Disetujui</SelectItem>
                      <SelectItem value="revision_requested">Revisi</SelectItem>
                      <SelectItem value="not_started">Belum Mulai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedRows.length > 0 && (
                  <div className="flex items-center gap-2 bg-[var(--primary-light)] px-3 py-1.5 rounded-md">
                    <span className="text-sm font-medium text-[var(--primary)]">
                      {selectedRows.length} terpilih
                    </span>
                    <Button size="sm" variant="ghost" className="h-8 text-[var(--primary)] hover:bg-white/50" onClick={handleBulkReminder}>
                      <Bell className="w-3 h-3 mr-2" />
                      Kirim Reminder
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)] w-[50px]">
                          <Checkbox 
                            checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                          />
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]">
                          Nama Karyawan
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]">
                          Total Jam
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)] w-[200px]">
                          Progress
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]">
                          Tanggal Submit
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-[var(--muted-foreground)]">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredData.length > 0 ? (
                        filteredData.map((row) => {
                          const progress = row.record 
                            ? (row.record.completed_hours / row.record.total_hours) * 100 
                            : 0;
                          
                          return (
                            <tr 
                              key={row.employee.id} 
                              className="border-b transition-colors hover:bg-[var(--muted)]/50 data-[state=selected]:bg-[var(--muted)]"
                              data-state={selectedRows.includes(row.employee.id) ? "selected" : ""}
                            >
                              <td className="p-4 align-middle">
                                <Checkbox 
                                  checked={selectedRows.includes(row.employee.id)}
                                  onCheckedChange={(checked) => handleSelectRow(row.employee.id, checked as boolean)}
                                />
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
                                    {row.employee.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-[var(--foreground)]">{row.employee.name}</div>
                                    <div className="text-xs text-[var(--muted-foreground)]">{row.employee.current_position_title}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <IDPStatusBadge 
                                  status={(row.record?.status || 'draft') as IDPStatus} 
                                  className={!row.record ? "bg-slate-100 text-slate-500 border-slate-200" : ""}
                                />
                                {!row.record && <span className="ml-2 text-xs text-slate-400">(Belum Ada)</span>}
                              </td>
                              <td className="p-4 align-middle">
                                {row.record ? `${row.record.total_hours} jam` : "-"}
                              </td>
                              <td className="p-4 align-middle">
                                {row.record ? (
                                  <div className="flex items-center gap-2">
                                    <Progress value={progress} className="h-2 w-24" />
                                    <span className="text-xs text-[var(--muted-foreground)]">{Math.round(progress)}%</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-400">-</span>
                                )}
                              </td>
                              <td className="p-4 align-middle text-[var(--muted-foreground)]">
                                {formatDate(row.record?.submitted_at)}
                              </td>
                              <td className="p-4 align-middle text-right relative">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 cursor-pointer hover:bg-slate-100 data-[state=open]:bg-slate-100"
                                    >
                                      <MoreHorizontal className="w-4 h-4" />
                                      <span className="sr-only">Menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                    {row.record?.status === 'pending_approval' ? (
                                      <>
                                        <DropdownMenuItem onClick={() => navigate(`/idp/review/${row.record?.id}`)}>
                                          <PenTool className="w-4 h-4 mr-2" />
                                          Review & Adjust
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleQuickApprove(row.employee, row.record?.id!)}>
                                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                                          Quick Approve
                                        </DropdownMenuItem>
                                      </>
                                    ) : (
                                      <DropdownMenuItem onClick={() => navigate(`/idp/detail/${row.record?.id}`)}>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Lihat Detail
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => toast.success(`Reminder dikirim ke ${row.employee.name}`)}>
                                      <Bell className="w-4 h-4 mr-2" />
                                      Kirim Reminder
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="h-24 text-center text-[var(--muted-foreground)]">
                            Tidak ada data karyawan yang ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Approve Dialog */}
      <Dialog open={showQuickApprove} onOpenChange={setShowQuickApprove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Approve IDP</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menyetujui IDP dari <span className="font-semibold text-foreground">{selectedEmployeeForApproval?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 bg-slate-50 p-4 rounded text-sm text-[var(--muted-foreground)]">
            Tindakan ini akan langsung menyetujui IDP tanpa membuka detail review. Pastikan Anda sudah memeriksa ringkasan sebelumnya.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuickApprove(false)}>Batal</Button>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]" onClick={confirmQuickApprove}>
              Ya, Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}