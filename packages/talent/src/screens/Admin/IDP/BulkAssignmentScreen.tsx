import { useState } from "react";
import { 
  Users, 
  Search, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  Building2,
  Filter,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { toast } from "sonner@2.0.3";
import { mockCourses } from "../../../data/idpData";
import { Course } from "../../../types/idp";
import { cn } from "../../../components/ui/utils";

// Mock Data for filters
const cohorts = ["BOD-1", "BOD-2", "BOD-3", "Pratama", "General"];
const companies = ["PT Angkasa Pura I", "PT Angkasa Pura II", "PT Hotel Indonesia Natour", "PT Sarinah", "PT Taman Wisata Candi"];
const jobFamilies = ["Finance", "Human Capital", "Information Technology", "Operations", "Marketing & Sales", "Legal & Compliance"];

// Mock Reason Tags (should come from API/Context in real app)
const reasonTags = [
  { id: "std-1", name: "Career Aspiration (Standard)" },
  { id: "std-2", name: "Performance Improvement (Standard)" },
  { id: "std-3", name: "Gap Fulfillment (Standard)" },
  { id: "cust-1", name: "InJourney Society FIRST Class (Custom)" },
];

export function BulkAssignmentScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter State
  const [filterType, setFilterType] = useState<'cohort' | 'company' | 'job_family'>('cohort');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // Selection State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [assignmentDetails, setAssignmentDetails] = useState({
    reasonTag: "",
    priority: "medium",
    targetDate: "",
    notes: ""
  });

  const handleFilterToggle = (value: string) => {
    setSelectedFilters(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const getFilteredCount = () => {
    if (selectedFilters.length === 0) return 0;
    // Mock logic for count
    return selectedFilters.length * 42 + 15;
  };

  const handleNext = () => {
    if (step === 1 && selectedFilters.length === 0) {
      toast.error("Pilih minimal satu filter target");
      return;
    }
    if (step === 2) {
      if (!selectedCourse) {
        toast.error("Pilih aktivitas/kursus terlebih dahulu");
        return;
      }
      if (!assignmentDetails.reasonTag || !assignmentDetails.targetDate) {
        toast.error("Lengkapi detail assignment (Reason Tag & Target Date)");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleAssign = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`Berhasil meng-assign IDP ke ${getFilteredCount()} karyawan`);
      // Reset form or redirect
      setStep(1);
      setSelectedFilters([]);
      setSelectedCourse(null);
      setAssignmentDetails({ reasonTag: "", priority: "medium", targetDate: "", notes: "" });
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Bulk IDP Assignment
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Distribusikan aktivitas IDP ke banyak karyawan sekaligus berdasarkan kriteria.
              </p>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s ? "bg-[var(--color-primary)] text-white" : "bg-slate-200 text-slate-500"
                  )}>
                    {s}
                  </div>
                  {s < 3 && <div className={cn("w-8 h-1 mx-1 rounded", step > s ? "bg-[var(--color-primary)]" : "bg-slate-200")} />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Target Selection */}
              {step === 1 && (
                <Card className="border-[var(--color-border)] shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-4">Pilih Target Penerima</h3>
                      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg inline-flex mb-6">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => { setFilterType('cohort'); setSelectedFilters([]); }}
                          className={cn(filterType === 'cohort' && "bg-white shadow-sm text-[var(--color-primary)]")}
                        >
                          <Users className="w-4 h-4 mr-2" /> By Cohort
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => { setFilterType('company'); setSelectedFilters([]); }}
                          className={cn(filterType === 'company' && "bg-white shadow-sm text-[var(--color-primary)]")}
                        >
                          <Building2 className="w-4 h-4 mr-2" /> By Company
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => { setFilterType('job_family'); setSelectedFilters([]); }}
                          className={cn(filterType === 'job_family' && "bg-white shadow-sm text-[var(--color-primary)]")}
                        >
                          <Briefcase className="w-4 h-4 mr-2" /> By Job Family
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(filterType === 'cohort' ? cohorts : filterType === 'company' ? companies : jobFamilies).map((item) => (
                          <div 
                            key={item}
                            onClick={() => handleFilterToggle(item)}
                            className={cn(
                              "cursor-pointer p-3 rounded-lg border text-sm transition-all",
                              selectedFilters.includes(item) 
                                ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] font-medium" 
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item}</span>
                              {selectedFilters.includes(item) && <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Activity Selection */}
              {step === 2 && (
                <Card className="border-[var(--color-border)] shadow-sm">
                  <CardContent className="p-6 space-y-8">
                    {/* Course Search */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold">Pilih Aktivitas</h3>
                      <div className="grid gap-2">
                        <Label>Cari Katalog Kursus</Label>
                        <Select onValueChange={(val) => setSelectedCourse(mockCourses.find(c => c.id === val) || null)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Pilih kursus dari katalog..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCourses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.code} - {course.title} ({course.provider})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCourse && (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4 mt-4">
                          <img 
                            src={selectedCourse.thumbnail_url} 
                            alt={selectedCourse.title}
                            className="w-20 h-20 object-cover rounded-md" 
                          />
                          <div>
                            <h4 className="font-semibold text-[var(--color-text-heading)]">{selectedCourse.title}</h4>
                            <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">{selectedCourse.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{selectedCourse.duration_hours} Jam</Badge>
                              <Badge variant="outline" className="capitalize">{selectedCourse.format}</Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-[var(--color-border)]" />

                    {/* Assignment Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold">Detail Assignment</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Reason Tag <span className="text-red-500">*</span></Label>
                          <Select 
                            value={assignmentDetails.reasonTag}
                            onValueChange={(val) => setAssignmentDetails({...assignmentDetails, reasonTag: val})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih alasan..." />
                            </SelectTrigger>
                            <SelectContent>
                              {reasonTags.map(tag => (
                                <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label>Priority</Label>
                          <Select 
                            value={assignmentDetails.priority}
                            onValueChange={(val) => setAssignmentDetails({...assignmentDetails, priority: val})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High (Wajib)</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label>Target Date <span className="text-red-500">*</span></Label>
                          <Input 
                            type="date" 
                            value={assignmentDetails.targetDate}
                            onChange={(e) => setAssignmentDetails({...assignmentDetails, targetDate: e.target.value})}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Catatan Tambahan (Optional)</Label>
                          <Input 
                            placeholder="Pesan untuk karyawan..."
                            value={assignmentDetails.notes}
                            onChange={(e) => setAssignmentDetails({...assignmentDetails, notes: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Preview */}
              {step === 3 && (
                <Card className="border-[var(--color-border)] shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Konfirmasi Assignment</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Anda akan mengirimkan aktivitas IDP ini ke <strong>{getFilteredCount()} karyawan</strong>. 
                          Tindakan ini tidak dapat dibatalkan secara massal.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">Aktivitas</h4>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <h3 className="font-bold text-lg mb-1">{selectedCourse?.title}</h3>
                          <p className="text-sm text-[var(--color-text-muted)] mb-3">{selectedCourse?.code} • {selectedCourse?.provider}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-[var(--color-text-muted)]">Reason:</div>
                            <div className="font-medium text-right truncate">
                              {reasonTags.find(t => t.id === assignmentDetails.reasonTag)?.name}
                            </div>
                            <div className="text-[var(--color-text-muted)]">Target:</div>
                            <div className="font-medium text-right">{new Date(assignmentDetails.targetDate).toLocaleDateString('id-ID')}</div>
                            <div className="text-[var(--color-text-muted)]">Priority:</div>
                            <div className="font-medium text-right capitalize">{assignmentDetails.priority}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">Target Penerima</h4>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                           <div className="text-2xl font-bold mb-1">{getFilteredCount()}</div>
                           <p className="text-sm text-[var(--color-text-muted)] mb-4">Total Karyawan</p>
                           
                           <div className="space-y-2">
                             <p className="text-xs font-medium text-[var(--color-text-muted)]">Filters Applied:</p>
                             <div className="flex flex-wrap gap-2">
                               {selectedFilters.map(f => (
                                 <Badge key={f} variant="secondary" className="bg-white border-slate-200">{f}</Badge>
                               ))}
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Actions */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}
                  disabled={loading}
                >
                  {step === 1 ? 'Batal' : 'Kembali'}
                </Button>
                
                {step < 3 ? (
                  <Button onClick={handleNext} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                    Lanjut <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleAssign} 
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] min-w-[150px]"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Assign Sekarang'}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: Helper/Summary */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-slate-50 border-0">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-[var(--color-text-heading)] mb-4">Ringkasan Assignment</h3>
                  
                  <div className="space-y-6 relative">
                    {/* Line connector */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />

                    <div className="relative pl-6">
                      <div className={cn("absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-white", step >= 1 ? "border-[var(--color-primary)]" : "border-slate-300")} />
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Target</p>
                      {selectedFilters.length > 0 ? (
                        <p className="text-sm font-medium">{getFilteredCount()} Karyawan terpilih</p>
                      ) : (
                        <p className="text-sm text-[var(--color-text-muted)] italic">Belum dipilih</p>
                      )}
                    </div>

                    <div className="relative pl-6">
                      <div className={cn("absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-white", step >= 2 ? "border-[var(--color-primary)]" : "border-slate-300")} />
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Aktivitas</p>
                      {selectedCourse ? (
                        <p className="text-sm font-medium">{selectedCourse.title}</p>
                      ) : (
                        <p className="text-sm text-[var(--color-text-muted)] italic">Belum dipilih</p>
                      )}
                    </div>

                    <div className="relative pl-6">
                       <div className={cn("absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-white", step >= 3 ? "border-[var(--color-primary)]" : "border-slate-300")} />
                       <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Konfirmasi</p>
                       <p className="text-sm text-[var(--color-text-muted)] italic">Menunggu review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {step === 1 && (
                 <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-4 text-sm text-amber-800">
                      <p><strong>Tip:</strong> Gunakan filter "Cohort" untuk menargetkan level jabatan tertentu (e.g., BOD-1) dalam program leadership.</p>
                    </CardContent>
                 </Card>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
