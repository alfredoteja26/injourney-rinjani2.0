import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Calendar,
  User,
  Target,
  FileText,
  BadgeCheck,
  Building,
  Briefcase,
  PenTool,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layout } from "@/components/shell/Layout";
import { IDPStatusBadge } from "@/components/idp/IDPStatusBadge";
import { 
  mockIDPRecords, 
  mockIDPActivities,
  mockEmployees,
  mockCompetencyGaps,
  mockCourses
} from "@/data/idpData";
import { toast } from "sonner@2.0.3";

export function IDPReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIDPRecord = mockIDPRecords.find(r => r.id === id);
  const employee = mockEmployees.find(e => e.id === currentIDPRecord?.employee_id);
  
  // Initialize state with activities from mock data
  const [activities, setActivities] = useState(() => 
    currentIDPRecord 
      ? mockIDPActivities.filter(a => a.idp_record_id === currentIDPRecord.id)
      : []
  );
  
  const competencyGap = mockCompetencyGaps.find(g => g.employee_id === employee?.id);
  const competencies = competencyGap?.competencies || [];

  // Local State
  const [managerNotes, setManagerNotes] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  
  // Edit Activity State
  const [editingActivity, setEditingActivity] = useState<any | null>(null);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", hours: 0, notes: "", target_date: "" });

  if (!currentIDPRecord || !employee) {
    return (
      <Layout>
        <div className="p-8 text-center">IDP Record not found</div>
      </Layout>
    );
  }

  // Derived Data
  const totalHours = activities.reduce((sum, act) => sum + act.duration_hours, 0);
  const isHoursValid = totalHours >= 40;
  
  // Calculate Gap Coverage
  const coveredCompetencyIds = new Set<string>();
  activities.forEach(act => {
    // If it's an LMS course, get competencies from course
    if (act.course_id) {
      const course = mockCourses.find(c => c.id === act.course_id);
      course?.competencies?.forEach(cc => coveredCompetencyIds.add(cc.competency_id));
    }
  });

  const gaps = competencies.filter(c => c.gap > 0);
  const coveredGapsCount = gaps.filter(g => coveredCompetencyIds.has(g.competency_id)).length;
  
  // Actions
  const handleApprove = () => {
    toast.success(`IDP ${employee.name} berhasil disetujui`);
    navigate("/talent/idp/team");
  };

  const handleRequestRevision = () => {
    toast.warning(`Permintaan revisi dikirim ke ${employee.name}`);
    navigate("/talent/idp/team");
  };

  const handleReject = () => {
    toast.error(`IDP ${employee.name} ditolak`);
    navigate("/talent/idp/team");
  };

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setEditForm({
      title: activity.title,
      hours: activity.duration_hours,
      notes: activity.notes || "",
      target_date: activity.target_date
    });
  };

  const handleSaveActivity = () => {
    if (editingActivity) {
      // Update existing
      setActivities(activities.map(a => 
        a.id === editingActivity.id 
          ? { ...a, title: editForm.title, duration_hours: Number(editForm.hours), notes: editForm.notes, target_date: editForm.target_date } 
          : a
      ));
      toast.success("Aktivitas berhasil diperbarui");
      setEditingActivity(null);
    } else {
      // Add new
      const newActivity = {
        id: `new-${Date.now()}`,
        idp_record_id: currentIDPRecord.id,
        title: editForm.title,
        activity_type: 'custom_activity',
        status: 'not_started',
        duration_hours: Number(editForm.hours),
        target_date: editForm.target_date || new Date().toISOString(),
        priority: 'medium',
        notes: editForm.notes,
        initiated_by: 'manager'
      };
      setActivities([...activities, newActivity as any]);
      toast.success("Aktivitas baru ditambahkan");
      setIsAddingActivity(false);
    }
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus aktivitas ini?")) {
      setActivities(activities.filter(a => a.id !== id));
      toast.success("Aktivitas dihapus");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[var(--color-neutral-bg)] pb-24 font-body">
        
        {/* Header */}
        <div className="bg-white border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link to="/talent/idp/team" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-heading)] flex items-center gap-2 mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke My Team
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold font-heading text-[var(--color-text-heading)]">
                    {employee.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mt-1">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {employee.current_position_title}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      {employee.division || employee.organization_name}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                  onClick={() => toast.info("Membuka Editor IDP untuk Penyesuaian...")}
                >
                  <PenTool className="w-4 h-4" />
                  Edit / Sesuaikan Plan
                </Button>
                <div>
                  <div className="text-sm text-[var(--color-text-muted)] mb-1 text-right">Status Submission</div>
                  <IDPStatusBadge status={currentIDPRecord.status as any} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Activities Review */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Summary Bar */}
            <Card className="border-l-4 border-l-[var(--color-primary)] shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-8">
                  <div>
                    <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase">Total Jam</div>
                    <div className="text-2xl font-bold text-[var(--color-text-heading)] flex items-baseline gap-1">
                      {totalHours} <span className="text-sm font-normal text-[var(--color-text-muted)]">jam</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase">Aktivitas</div>
                    <div className="text-2xl font-bold text-[var(--color-text-heading)]">
                      {activities.length}
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border",
                  isHoursValid 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : "bg-amber-50 text-amber-700 border-amber-100"
                )}>
                  {isHoursValid ? <BadgeCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  {isHoursValid ? "Memenuhi Minimum 40 Jam" : "Kurang dari 40 Jam"}
                </div>
              </CardContent>
            </Card>

            {/* Activities List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h2 className="font-heading font-semibold text-lg text-[var(--color-text-heading)]">Review Aktivitas</h2>
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="gap-2 text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                   onClick={() => {
                     setEditForm({ title: "", hours: 0, notes: "", target_date: "" });
                     setIsAddingActivity(true);
                   }}
                 >
                   <Plus className="w-4 h-4" /> Tambah Aktivitas
                 </Button>
              </div>
              
              {activities.length === 0 ? (
                <div className="p-8 text-center bg-white border border-dashed border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)]">
                  Belum ada aktivitas yang ditambahkan.
                </div>
              ) : (
                activities.map((activity, index) => {
                  const course = mockCourses.find(c => c.id === activity.course_id);
                  const relatedCompetency = course?.competencies?.[0];
                  
                  return (
                    <Card key={activity.id} className="overflow-hidden group">
                      <div className="flex border-b border-[var(--color-border)] bg-slate-50/50">
                        <div className="w-12 flex items-center justify-center font-mono text-[var(--color-text-muted)] border-r border-[var(--color-border)]">
                          {index + 1}
                        </div>
                        <div className="p-3 flex-1 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant={activity.activity_type === 'lms_course' ? 'default' : 'secondary'} className={activity.activity_type === 'lms_course' ? "bg-slate-800" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}>
                              {activity.activity_type === 'lms_course' ? 'LMS' : 'Custom'}
                            </Badge>
                            <span className="text-xs text-[var(--color-text-muted)] font-mono">
                              {activity.course_id ? course?.code : 'CUSTOM'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                              <User className="w-3 h-3" />
                              <span>By: </span>
                              <span className="font-medium text-[var(--color-text-heading)] capitalize">
                                {activity.initiated_by || 'Employee'}
                              </span>
                            </div>
                            
                            {/* Manager Actions */}
                            <div className="flex items-center gap-1 border-l pl-3 ml-2 border-slate-200">
                               <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-500 hover:text-[var(--color-primary)]" onClick={() => handleEditActivity(activity)}>
                                 <Pencil className="w-3.5 h-3.5" />
                               </Button>
                               <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-500 hover:text-red-600" onClick={() => handleDeleteActivity(activity.id)}>
                                 <Trash2 className="w-3.5 h-3.5" />
                               </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--color-text-heading)] text-base mb-2">
                              {activity.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)] mb-3">
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {activity.duration_hours} jam
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                Target: {formatDate(activity.target_date)}
                              </span>
                            </div>

                            {/* Gap Alignment */}
                            {relatedCompetency && (
                              <div className="mt-3 p-2 bg-blue-50/50 rounded border border-blue-100 flex items-center gap-2 text-sm">
                                <Target className="w-4 h-4 text-blue-600" />
                                <span className="text-[var(--color-text-muted)]">Menutup gap:</span>
                                <span className="font-medium text-blue-700">{relatedCompetency.competency_name}</span>
                                <span className="text-xs text-blue-600/70 ml-auto">
                                  {relatedCompetency.level_improvement}
                                </span>
                              </div>
                            )}

                            {activity.notes && (
                              <p className="mt-3 text-sm text-[var(--color-text-muted)] italic border-l-2 border-slate-200 pl-3">
                                "{activity.notes}"
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Employee Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-heading">Catatan Karyawan</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-[var(--color-text-body)] italic">
                    "{currentIDPRecord.employee_notes || 'Tidak ada catatan'}"
                 </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar: Gap Summary & Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="bg-[var(--color-neutral-bg)]/30 border-b border-[var(--color-border)]">
                <CardTitle className="text-base font-heading">Ringkasan Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[var(--color-text-muted)]">Gap Coverage</span>
                  <span className="font-bold text-[var(--color-primary)]">
                    {coveredGapsCount}/{gaps.length} Gap
                  </span>
                </div>
                
                <div className="space-y-3">
                  {competencies.map(comp => {
                    const isGap = comp.gap > 0;
                    const isCovered = coveredCompetencyIds.has(comp.competency_id);
                    
                    if (!isGap) return null; // Only show gaps

                    return (
                      <div key={comp.competency_id} className="flex items-start gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-white">
                        <div className={`mt-0.5 ${isCovered ? 'text-emerald-500' : 'text-slate-300'}`}>
                           {isCovered ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[var(--color-text-heading)]">
                            {comp.competency_name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                              Gap: {comp.gap} lvl
                            </Badge>
                            {isCovered ? (
                               <span className="text-[10px] text-emerald-600 font-medium">Tercover</span>
                            ) : (
                               <span className="text-[10px] text-amber-600 font-medium">Belum ada aktivitas</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-6">
               <Card className="shadow-lg border-[var(--color-primary)]/20">
                 <CardHeader className="bg-[var(--color-primary)] text-white py-3">
                   <CardTitle className="text-base font-heading">Keputusan Manager</CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-[var(--color-text-heading)]">
                          Catatan Feedback (Opsional)
                       </label>
                       <Textarea 
                          placeholder="Berikan alasan atau feedback untuk karyawan..." 
                          value={managerNotes}
                          onChange={(e) => setManagerNotes(e.target.value)}
                          className="min-h-[100px] bg-white"
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-2">
                       <Button 
                          variant="outline" 
                          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => setShowRejectDialog(true)}
                       >
                         Tolak
                       </Button>
                       <Button 
                          variant="outline" 
                          className="w-full border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                          onClick={() => setShowRevisionDialog(true)}
                       >
                         Minta Revisi
                       </Button>
                       <Button 
                          className="col-span-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                          onClick={() => setShowApproveDialog(true)}
                       >
                         Setujui IDP
                       </Button>
                    </div>
                 </CardContent>
               </Card>
            </div>
          </div>

        </div>
      </div>

      {/* Edit/Add Activity Dialog */}
      <Dialog open={!!editingActivity || isAddingActivity} onOpenChange={(open) => {
        if (!open) {
          setEditingActivity(null);
          setIsAddingActivity(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAddingActivity ? "Tambah Aktivitas Baru" : "Edit Aktivitas"}</DialogTitle>
            <DialogDescription>
              Sesuaikan rencana pengembangan karyawan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
               <Label>Judul Aktivitas</Label>
               <Input 
                 value={editForm.title} 
                 onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                 placeholder="Contoh: Training Leadership"
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Durasi (Jam)</Label>
                  <Input 
                    type="number" 
                    value={editForm.hours} 
                    onChange={(e) => setEditForm({...editForm, hours: Number(e.target.value)})}
                  />
               </div>
               <div className="space-y-2">
                  <Label>Target Tanggal</Label>
                  <Input 
                    type="date" 
                    value={editForm.target_date ? editForm.target_date.split('T')[0] : ''} 
                    onChange={(e) => setEditForm({...editForm, target_date: e.target.value})}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <Label>Catatan / Instruksi</Label>
               <Textarea 
                 value={editForm.notes} 
                 onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                 placeholder="Tambahkan catatan khusus untuk karyawan..."
               />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {setEditingActivity(null); setIsAddingActivity(false)}}>
              Batal
            </Button>
            <Button onClick={handleSaveActivity} className="bg-[var(--color-primary)]">
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setujui IDP {employee.name}?</DialogTitle>
            <DialogDescription>
              IDP ini akan disahkan dan karyawan dapat mulai menjalankan aktivitas.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
             <div className="flex justify-between p-3 bg-slate-50 rounded mb-2">
                <span className="text-sm text-slate-500">Total Jam:</span>
                <span className="font-medium">{totalHours} jam</span>
             </div>
             {managerNotes && (
               <div className="text-sm text-slate-600 italic">
                 "Note: {managerNotes}"
               </div>
             )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>Batal</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleApprove}>
              Ya, Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Revision Dialog */}
      <Dialog open={showRevisionDialog} onOpenChange={setShowRevisionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Minta Revisi?</DialogTitle>
            <DialogDescription>
              Karyawan akan diberitahu untuk memperbaiki IDP sesuai catatan Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-3">
             <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700">Catatan Revisi (Wajib)</label>
               <Textarea 
                 value={managerNotes} 
                 onChange={(e) => setManagerNotes(e.target.value)}
                 className="min-h-[80px]"
                 placeholder="Jelaskan bagian yang perlu direvisi..."
               />
             </div>
             {!managerNotes && (
               <p className="text-xs text-red-500">Catatan wajib diisi untuk revisi.</p>
             )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevisionDialog(false)}>Batal</Button>
            <Button 
              className="bg-amber-500 hover:bg-amber-600" 
              onClick={handleRequestRevision}
              disabled={!managerNotes}
            >
              Kirim Permintaan Revisi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Layout>
  );
}
