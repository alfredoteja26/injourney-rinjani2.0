import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  BookOpen,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  ExternalLink,
  Download,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { toast } from "sonner@2.0.3";
import { CompetencyMapping, Course } from "../../../types/idp";
import { mockCourses } from "../../../data/idpData";
import { cn } from "../../../components/ui/utils";

// Mock Data
const initialMappings: CompetencyMapping[] = [
  {
    id: "map-1",
    competency_id: "comp-ldr",
    competency_name: "Leadership",
    course_id: "crs-ldr-001",
    course_name: "Effective Leadership Fundamentals",
    course_provider: "InJourney Academy",
    level_from: 1,
    level_to: 2,
    relevance: "high",
    is_mandatory: true
  },
  {
    id: "map-2",
    competency_id: "comp-ldr",
    competency_name: "Leadership",
    course_id: "crs-ldr-002",
    course_name: "Strategic Thinking for Managers",
    course_provider: "InJourney Academy",
    level_from: 2,
    level_to: 3,
    relevance: "high",
    is_mandatory: false
  },
  {
    id: "map-3",
    competency_id: "comp-dig",
    competency_name: "Digital Literacy",
    course_id: "crs-dig-001",
    course_name: "Digital Transformation Fundamentals",
    course_provider: "InJourney Academy",
    level_from: 1,
    level_to: 2,
    relevance: "high",
    is_mandatory: true
  },
  {
    id: "map-4",
    competency_id: "comp-fin",
    competency_name: "Financial Analysis",
    course_id: "crs-fin-002",
    course_name: "Advanced Budgeting & Forecasting",
    course_provider: "InJourney Academy",
    level_from: 3,
    level_to: 4,
    relevance: "medium",
    is_mandatory: false
  }
];

export function LibraryMappingScreen() {
  const [mappings, setMappings] = useState<CompetencyMapping[]>(initialMappings);
  const [viewMode, setViewMode] = useState<'grouped' | 'table'>('grouped');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRelevance, setSelectedRelevance] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [editingMapping, setEditingMapping] = useState<CompetencyMapping | null>(null);
  const [formData, setFormData] = useState<Partial<CompetencyMapping>>({
    level_from: 1,
    level_to: 2,
    relevance: 'high',
    is_mandatory: false
  });

  // Derived Data
  const uniqueCompetencies = Array.from(new Set(mappings.map(m => m.competency_name)));
  
  const filteredMappings = mappings.filter(m => {
    const matchesSearch = 
      m.competency_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.course_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRelevance = selectedRelevance === "all" || m.relevance === selectedRelevance;
    return matchesSearch && matchesRelevance;
  });

  // Group by Competency
  const groupedMappings = uniqueCompetencies.reduce((acc, compName) => {
    const items = filteredMappings.filter(m => m.competency_name === compName);
    if (items.length > 0) {
      acc[compName] = items;
    }
    return acc;
  }, {} as Record<string, CompetencyMapping[]>);

  const handleOpenCreate = () => {
    setEditingMapping(null);
    setFormData({ level_from: 1, level_to: 2, relevance: 'high', is_mandatory: false });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (mapping: CompetencyMapping) => {
    setEditingMapping(mapping);
    setFormData(mapping);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.competency_name || !formData.course_id) {
      toast.error("Mohon lengkapi kompetensi dan kursus");
      return;
    }

    if (editingMapping) {
      setMappings(mappings.map(m => m.id === editingMapping.id ? { ...m, ...formData } as CompetencyMapping : m));
      toast.success("Mapping diperbarui");
    } else {
      const selectedCourse = mockCourses.find(c => c.id === formData.course_id);
      const newMapping: CompetencyMapping = {
        id: `map-${Date.now()}`,
        ...formData as any,
        course_name: selectedCourse?.title || "Unknown Course",
        course_provider: selectedCourse?.provider || "Unknown"
      };
      setMappings([...mappings, newMapping]);
      toast.success("Mapping baru ditambahkan");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if(confirm("Hapus mapping ini? Kursus tidak akan direkomendasikan lagi untuk gap ini.")) {
      setMappings(mappings.filter(m => m.id !== id));
      toast.success("Mapping dihapus");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Library Mapping
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Petakan kompetensi ke kursus LMS untuk rekomendasi otomatis IDP.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleOpenCreate} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Mapping
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Card className="bg-white shadow-sm border-[var(--color-border)]">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-text-muted)]">Total Mapping</div>
                    <div className="text-2xl font-bold text-[var(--color-text-heading)]">{mappings.length}</div>
                  </div>
               </CardContent>
             </Card>
             <Card className="bg-white shadow-sm border-[var(--color-border)]">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-50 text-green-600">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-text-muted)]">Kompetensi Tercover</div>
                    <div className="text-2xl font-bold text-[var(--color-text-heading)]">{uniqueCompetencies.length}</div>
                  </div>
               </CardContent>
             </Card>
             <Card className="bg-white shadow-sm border-[var(--color-border)]">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-text-muted)]">Sync Status</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Updated just now</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className="w-3 h-3" /></Button>
                    </div>
                  </div>
               </CardContent>
             </Card>
          </div>

          {/* Filters & View Toggle */}
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
             <div className="flex flex-1 gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <Input 
                    placeholder="Cari kompetensi atau kursus..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedRelevance} onValueChange={setSelectedRelevance}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Relevansi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Relevansi</SelectItem>
                    <SelectItem value="high">High Relevance</SelectItem>
                    <SelectItem value="medium">Medium Relevance</SelectItem>
                    <SelectItem value="low">Low Relevance</SelectItem>
                  </SelectContent>
                </Select>
             </div>
             
             <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn("h-8 px-3 rounded-md", viewMode === 'grouped' ? "bg-white shadow-sm" : "hover:bg-white/50")}
                  onClick={() => setViewMode('grouped')}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Grouped
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn("h-8 px-3 rounded-md", viewMode === 'table' ? "bg-white shadow-sm" : "hover:bg-white/50")}
                  onClick={() => setViewMode('table')}
                >
                  <List className="w-4 h-4 mr-2" />
                  Table
                </Button>
             </div>
          </div>

          {/* Content */}
          {viewMode === 'grouped' ? (
            <div className="space-y-6">
              {Object.keys(groupedMappings).map(compName => (
                <div key={compName} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-heading font-semibold text-[var(--color-text-heading)]">{compName}</h2>
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                      {groupedMappings[compName].length} Courses
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedMappings[compName].map(mapping => (
                      <Card key={mapping.id} className="hover:shadow-md transition-shadow relative group">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                             <Badge variant={mapping.relevance === 'high' ? 'default' : 'secondary'} className={cn(
                               "uppercase text-[10px] tracking-wider",
                               mapping.relevance === 'high' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-slate-100"
                             )}>
                               {mapping.relevance} Relevance
                             </Badge>
                             {mapping.is_mandatory && (
                               <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50 text-[10px]">Wajib</Badge>
                             )}
                          </div>
                          <CardTitle className="text-sm font-bold line-clamp-2 leading-snug">
                            {mapping.course_name}
                          </CardTitle>
                          <p className="text-xs text-[var(--color-text-muted)]">{mapping.course_provider}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-xs border-t pt-3 mt-1">
                             <div className="flex items-center gap-2">
                               <span className="bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">Lvl {mapping.level_from}</span>
                               <span className="text-[var(--color-text-muted)]">➜</span>
                               <span className="bg-[var(--color-primary)]/10 px-2 py-1 rounded font-medium text-[var(--color-primary)]">Lvl {mapping.level_to}</span>
                             </div>
                             
                             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                               <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleOpenEdit(mapping)}>
                                 <Edit2 className="w-3 h-3 text-slate-500" />
                               </Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDelete(mapping.id)}>
                                 <Trash2 className="w-3 h-3 text-red-500" />
                               </Button>
                             </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Add New Card Placeholder */}
                    <button 
                      onClick={handleOpenCreate}
                      className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 flex flex-col items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all min-h-[160px]"
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Tambah Kursus</span>
                    </button>
                  </div>
                </div>
              ))}
              
              {Object.keys(groupedMappings).length === 0 && (
                <div className="text-center py-12 text-[var(--color-text-muted)]">
                  Tidak ada mapping yang ditemukan.
                </div>
              )}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kompetensi</TableHead>
                    <TableHead>Kursus</TableHead>
                    <TableHead>Level Impact</TableHead>
                    <TableHead>Relevansi</TableHead>
                    <TableHead>Wajib</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings.map(mapping => (
                    <TableRow key={mapping.id}>
                      <TableCell className="font-medium">{mapping.competency_name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{mapping.course_name}</span>
                          <span className="text-xs text-[var(--color-text-muted)]">{mapping.course_provider}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs">
                           <span className="bg-slate-100 px-1.5 py-0.5 rounded">Lvl {mapping.level_from}</span>
                           <span>→</span>
                           <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Lvl {mapping.level_to}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={mapping.relevance === 'high' ? 'default' : 'secondary'} className={
                          mapping.relevance === 'high' ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                        }>
                          {mapping.relevance}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {mapping.is_mandatory ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <span className="text-slate-300">-</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenEdit(mapping)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(mapping.id)} className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Dialog Form */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingMapping ? "Edit Mapping" : "Tambah Mapping Baru"}</DialogTitle>
                <DialogDescription>
                  Hubungkan kompetensi dengan materi pembelajaran yang relevan.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Kompetensi Target</Label>
                  <Input 
                    placeholder="Nama kompetensi (contoh: Leadership)" 
                    value={formData.competency_name || ''}
                    onChange={(e) => setFormData({...formData, competency_name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Pilih Kursus (LMS)</Label>
                  <Select 
                    value={formData.course_id} 
                    onValueChange={(val) => setFormData({...formData, course_id: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cari kursus..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Level Saat Ini (From)</Label>
                    <Select 
                      value={String(formData.level_from)} 
                      onValueChange={(val) => setFormData({...formData, level_from: parseInt(val)})}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>Level {i}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Level Target (To)</Label>
                    <Select 
                      value={String(formData.level_to)} 
                      onValueChange={(val) => setFormData({...formData, level_to: parseInt(val)})}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>Level {i}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Tingkat Relevansi</Label>
                  <Select 
                    value={formData.relevance} 
                    onValueChange={(val: any) => setFormData({...formData, relevance: val})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Sangat Direkomendasikan)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between border p-3 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base">Wajib Diambil?</Label>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Tandai sebagai mandatory course untuk gap ini.
                    </p>
                  </div>
                  <Switch 
                    checked={formData.is_mandatory} 
                    onCheckedChange={(checked) => setFormData({...formData, is_mandatory: checked})}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button onClick={handleSave} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                  Simpan Mapping
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </AdminLayout>
  );
}
