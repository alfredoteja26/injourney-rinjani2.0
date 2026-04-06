import { useState } from "react";
import { 
  Plus, 
  MoreVertical, 
  CalendarRange, 
  CheckCircle2, 
  Clock,
  Archive,
  Edit2,
  CalendarDays,
  Settings2
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { mockIDPCycles } from "../../../data/idpData";
import { IDPCycle } from "../../../types/idp";
import { toast } from "sonner@2.0.3";
import { CycleTimelinePreview } from "../../../components/admin/idp/CycleTimelinePreview";
import { cn } from "../../../components/ui/utils";

export function IDPCyclesScreen() {
  const [cycles, setCycles] = useState<IDPCycle[]>(mockIDPCycles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCycle, setNewCycle] = useState<Partial<IDPCycle>>({
    period_type: 'annual',
    trigger_type: 'manual',
    min_development_hours: 40,
    status: 'draft',
    is_custom_activities_allowed: true,
    is_manager_approval_required: true
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'draft': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };

  const handleCreateCycle = () => {
    // Basic validation
    if (!newCycle.name || !newCycle.start_date || !newCycle.end_date || !newCycle.submission_deadline) {
      toast.error("Mohon lengkapi data wajib (Nama, Tanggal Mulai, Deadline Submit, Selesai)");
      return;
    }

    // Date validation
    if (newCycle.start_date && newCycle.submission_deadline && newCycle.end_date) {
      if (newCycle.start_date >= newCycle.submission_deadline) {
        toast.error("Tanggal mulai harus sebelum batas submit");
        return;
      }
      if (newCycle.submission_deadline >= newCycle.end_date) {
        toast.error("Batas submit harus sebelum tanggal selesai");
        return;
      }
    }

    const createdCycle: IDPCycle = {
      id: `cycle-${Date.now()}`,
      name: newCycle.name!,
      period_type: newCycle.period_type as 'annual' | 'semi_annual' | 'probation',
      trigger_type: newCycle.trigger_type as 'manual' | 'after_performance_planning',
      start_date: newCycle.start_date!,
      submission_deadline: newCycle.submission_deadline!,
      end_date: newCycle.end_date!,
      midyear_checkpoint: newCycle.midyear_checkpoint,
      status: 'upcoming', // Default to upcoming
      min_development_hours: newCycle.min_development_hours || 40,
      is_custom_activities_allowed: newCycle.is_custom_activities_allowed,
      is_manager_approval_required: newCycle.is_manager_approval_required,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setCycles([...cycles, createdCycle]);
    setIsCreateDialogOpen(false);
    toast.success("Periode IDP berhasil dibuat");
    setNewCycle({ 
      period_type: 'annual', 
      trigger_type: 'manual',
      min_development_hours: 40, 
      status: 'draft',
      is_custom_activities_allowed: true,
      is_manager_approval_required: true
    });
  };

  const handleActivateCycle = (id: string) => {
    // Deactivate currently active cycle if any
    const updatedCycles = cycles.map(c => {
      if (c.id === id) {
        return { ...c, status: 'active' as const };
      }
      if (c.status === 'active') {
        return { ...c, status: 'completed' as const };
      }
      return c;
    });
    setCycles(updatedCycles);
    toast.success("Periode diaktifkan");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Manajemen Periode IDP
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Atur siklus IDP, batas waktu, dan persyaratan jam pengembangan.
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Periode Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-heading">Buat Periode IDP Baru</DialogTitle>
                  <DialogDescription>
                    Konfigurasi parameter periode IDP baru. Gunakan preview timeline untuk memastikan jadwal sesuai.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2 text-[var(--color-text-heading)]">
                        <CalendarDays className="w-4 h-4 text-[var(--color-primary)]" />
                        Informasi Dasar
                      </h3>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nama Periode</Label>
                        <Input 
                          id="name" 
                          placeholder="Contoh: IDP 2027 (Annual)" 
                          value={newCycle.name || ''}
                          onChange={(e) => setNewCycle({...newCycle, name: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Tipe Periode</Label>
                          <Select 
                            value={newCycle.period_type} 
                            onValueChange={(val: any) => setNewCycle({...newCycle, period_type: val})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="annual">Annual (Tahunan)</SelectItem>
                              <SelectItem value="semi_annual">Semi-Annual</SelectItem>
                              <SelectItem value="probation">Probation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Trigger</Label>
                          <Select 
                            value={newCycle.trigger_type} 
                            onValueChange={(val: any) => setNewCycle({...newCycle, trigger_type: val})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih trigger" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">Manual Activation</SelectItem>
                              <SelectItem value="after_performance_planning">After Perf. Planning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[var(--color-border)]" />

                    {/* Timeline */}
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2 text-[var(--color-text-heading)]">
                        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        Jadwal & Deadline
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="start_date">Tanggal Mulai</Label>
                          <Input 
                            id="start_date" 
                            type="date"
                            value={newCycle.start_date || ''}
                            onChange={(e) => setNewCycle({...newCycle, start_date: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="end_date">Tanggal Selesai</Label>
                          <Input 
                            id="end_date" 
                            type="date"
                            value={newCycle.end_date || ''}
                            onChange={(e) => setNewCycle({...newCycle, end_date: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="deadline" className="text-red-600 font-medium">Batas Submit</Label>
                          <Input 
                            id="deadline" 
                            type="date"
                            className="border-red-200 focus-visible:ring-red-500"
                            value={newCycle.submission_deadline || ''}
                            onChange={(e) => setNewCycle({...newCycle, submission_deadline: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="midyear">Mid-year Check (Opsional)</Label>
                          <Input 
                            id="midyear" 
                            type="date"
                            value={newCycle.midyear_checkpoint || ''}
                            onChange={(e) => setNewCycle({...newCycle, midyear_checkpoint: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[var(--color-border)]" />

                    {/* Settings */}
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2 text-[var(--color-text-heading)]">
                        <Settings2 className="w-4 h-4 text-[var(--color-primary)]" />
                        Pengaturan Lanjutan
                      </h3>
                      
                      <div className="grid gap-2">
                         <Label htmlFor="min_hours">Min. Jam Pengembangan</Label>
                         <Input 
                           id="min_hours" 
                           type="number"
                           className="max-w-[150px]"
                           value={newCycle.min_development_hours}
                           onChange={(e) => setNewCycle({...newCycle, min_development_hours: parseInt(e.target.value)})}
                         />
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base">Custom Activities</Label>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            Izinkan karyawan menambahkan aktivitas di luar katalog LMS
                          </p>
                        </div>
                        <Switch 
                          checked={newCycle.is_custom_activities_allowed}
                          onCheckedChange={(checked) => setNewCycle({...newCycle, is_custom_activities_allowed: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base">Require Manager Approval</Label>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            IDP wajib disetujui atasan sebelum dimulai
                          </p>
                        </div>
                        <Switch 
                          checked={newCycle.is_manager_approval_required}
                          onCheckedChange={(checked) => setNewCycle({...newCycle, is_manager_approval_required: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Preview */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="sticky top-6">
                      <Label className="mb-2 block font-semibold text-[var(--color-text-heading)]">Visual Preview</Label>
                      <CycleTimelinePreview 
                        startDate={newCycle.start_date}
                        submissionDeadline={newCycle.submission_deadline}
                        midyearCheckpoint={newCycle.midyear_checkpoint}
                        endDate={newCycle.end_date}
                        className="shadow-md border-0 ring-1 ring-slate-200"
                      />
                      
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Ringkasan Konfigurasi
                        </h4>
                        <ul className="space-y-1 list-disc list-inside opacity-90 text-xs">
                           <li>Tipe: <span className="capitalize font-medium">{newCycle.period_type?.replace('_', ' ')}</span></li>
                           <li>Trigger: <span className="capitalize font-medium">{newCycle.trigger_type?.replace(/_/g, ' ')}</span></li>
                           <li>Min. Durasi: <span className="font-medium">{newCycle.min_development_hours} Jam</span></li>
                           <li>Approval: <span className="font-medium">{newCycle.is_manager_approval_required ? 'Required' : 'Optional'}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleCreateCycle} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                    Simpan & Buat
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {cycles.map((cycle) => (
              <Card key={cycle.id} className="relative overflow-hidden transition-all hover:shadow-md">
                {cycle.status === 'active' && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-semibold text-lg text-[var(--color-text-heading)]">{cycle.name}</h3>
                        <Badge variant="outline" className={cn("capitalize", getStatusColor(cycle.status))}>
                          {cycle.status}
                        </Badge>
                        {cycle.trigger_type === 'after_performance_planning' && (
                          <Badge variant="secondary" className="text-[10px]">Auto-Trigger</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-[var(--color-text-muted)] pt-2 max-w-lg">
                        <div className="flex items-center gap-2">
                          <CalendarRange className="w-4 h-4 text-[var(--color-primary)]" />
                          <span>Mulai: <span className="font-medium text-[var(--color-text-body)]">{new Date(cycle.start_date).toLocaleDateString('id-ID')}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                           <span>Target: <span className="font-medium text-[var(--color-text-body)]">{cycle.min_development_hours} Jam</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Archive className="w-4 h-4 text-[var(--color-primary)]" />
                          <span>Selesai: <span className="font-medium text-[var(--color-text-body)]">{new Date(cycle.end_date).toLocaleDateString('id-ID')}</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 min-w-[200px]">
                      <div className="text-right bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                         <div className="text-xs text-red-600 font-medium mb-0.5">Batas Submit</div>
                         <div className="font-bold text-red-700">
                           {new Date(cycle.submission_deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {cycle.status !== 'active' && cycle.status !== 'completed' && cycle.status !== 'closed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-green-600 text-green-700 hover:bg-green-50"
                            onClick={() => handleActivateCycle(cycle.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Aktifkan
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Archive className="w-4 h-4 mr-2" />
                              Tutup / Arsipkan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
