import { useState } from "react";
import { 
  Search,
  Grid3x3,
  List,
  Plus,
  Bookmark,
  ExternalLink,
  Filter,
  BookOpen,
  MonitorPlay,
  Users,
  Book,
  MoreHorizontal,
  Check,
  Clock
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Layout } from "../../components/shell/Layout";
import { mockCourses } from "../../data/idpData";
import { toast } from "sonner@2.0.3";
import { cn } from "../../components/ui/utils";

type ViewMode = 'grid' | 'list';

export function CourseCatalogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<typeof mockCourses[0] | null>(null);

  // Filter Logic
  const filteredCourses = mockCourses
    .filter(course => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(course => {
      if (selectedFormat !== "all") {
        return course.format === selectedFormat;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title-asc": return a.title.localeCompare(b.title);
        case "title-desc": return b.title.localeCompare(a.title);
        case "duration": return a.duration_hours - b.duration_hours;
        default: return 0;
      }
    });

  const handleAddToIDP = (courseId: string, courseTitle: string) => {
    if (addedCourses.includes(courseId)) {
      setAddedCourses(addedCourses.filter(id => id !== courseId));
      toast.success(`${courseTitle} dihapus dari draft IDP`);
    } else {
      setAddedCourses([...addedCourses, courseId]);
      toast.success(`${courseTitle} ditambahkan ke draft IDP`);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return <MonitorPlay className="w-4 h-4" />;
      case 'workshop': return <Users className="w-4 h-4" />;
      case 'ebook': return <Book className="w-4 h-4" />;
      case 'blended': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background p-6 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-sans text-3xl font-bold text-foreground">
                Katalog Kursus
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Jelajahi perpustakaan pembelajaran untuk meningkatkan kompetensi dan mencapai target karir Anda.
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <Card className="shadow-sm border-border sticky top-4 z-20 bg-card">
            <CardContent className="p-4">
               <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                  {/* Search */}
                  <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Cari judul, topik, atau kode..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-10 bg-muted/50 border-border focus:bg-background transition-colors"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                     <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger className="w-[160px] h-10 bg-background border-border">
                           <div className="flex items-center gap-2 text-foreground">
                              <Filter className="w-4 h-4 text-muted-foreground" />
                              <SelectValue placeholder="Format" />
                           </div>
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Semua Format</SelectItem>
                           <SelectItem value="video">Video Learning</SelectItem>
                           <SelectItem value="workshop">Workshop / Training</SelectItem>
                           <SelectItem value="ebook">E-Book / Article</SelectItem>
                           <SelectItem value="blended">Blended Learning</SelectItem>
                        </SelectContent>
                     </Select>

                     <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[160px] h-10 bg-background border-border">
                           <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="title-asc">Nama (A-Z)</SelectItem>
                           <SelectItem value="title-desc">Nama (Z-A)</SelectItem>
                           <SelectItem value="duration">Durasi (Terpendek)</SelectItem>
                        </SelectContent>
                     </Select>

                     <div className="h-6 w-[1px] bg-border mx-1 hidden lg:block"></div>

                     <div className="flex gap-1 bg-muted p-1 rounded-md shrink-0">
                        <Button
                           variant="ghost"
                           size="sm"
                           className={cn("h-8 w-8 p-0", viewMode === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                           onClick={() => setViewMode('grid')}
                        >
                           <Grid3x3 className="w-4 h-4" />
                        </Button>
                        <Button
                           variant="ghost"
                           size="sm"
                           className={cn("h-8 w-8 p-0", viewMode === 'list' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                           onClick={() => setViewMode('list')}
                        >
                           <List className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Results Info */}
          <div className="flex items-center justify-between px-1">
             <p className="text-sm text-muted-foreground">
                Menampilkan <strong>{filteredCourses.length}</strong> dari {mockCourses.length} kursus
             </p>
             {addedCourses.length > 0 && (
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                   {addedCourses.length} item dipilih
                </Badge>
             )}
          </div>

          {/* Grid View */}
          {filteredCourses.length === 0 ? (
             <div className="text-center py-20 bg-background rounded-xl border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">Tidak ada kursus ditemukan</h3>
                <p className="text-muted-foreground">Coba sesuaikan kata kunci atau filter pencarian Anda.</p>
                <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedFormat("all")}} className="mt-2 text-primary">
                   Reset Filter
                </Button>
             </div>
          ) : viewMode === 'grid' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => {
                   const isAdded = addedCourses.includes(course.id);
                   return (
                      <Card 
                         key={course.id} 
                         className={cn(
                           "group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border-border h-full flex flex-col bg-card",
                           isAdded ? "ring-2 ring-primary ring-offset-2" : ""
                         )}
                         onClick={() => setSelectedCourse(course)}
                      >
                         <div className="relative aspect-video bg-muted overflow-hidden">
                            {course.thumbnail_url ? (
                               <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/40">
                                  <BookOpen className="w-10 h-10" />
                               </div>
                            )}
                            <div className="absolute top-3 left-3">
                               <Badge className="bg-background/90 text-foreground hover:bg-background backdrop-blur shadow-sm border-0 font-medium">
                                  {getFormatIcon(course.format)} 
                                  <span className="ml-1.5 capitalize">{course.format}</span>
                               </Badge>
                            </div>
                            {isAdded && (
                               <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full shadow-md">
                                  <Check className="w-4 h-4" />
                               </div>
                            )}
                         </div>
                         
                         <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="mb-2">
                               <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border inline-block mb-2">
                                  {course.code}
                               </span>
                               <h3 className="font-sans font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                  {course.title}
                               </h3>
                            </div>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                               {course.description}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                               <div className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  <span>{course.provider}</span>
                               </div>
                               <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{course.duration_hours} jam</span>
                               </div>
                            </div>
                         </CardContent>
                         
                         <CardFooter className="p-3 bg-muted/30 border-t border-border">
                            <Button 
                               size="sm" 
                               className={cn(
                                 "w-full gap-2 transition-all",
                                 isAdded 
                                   ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                   : "bg-background border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                               )}
                               onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToIDP(course.id, course.title);
                               }}
                            >
                               {isAdded ? (
                                 <>
                                   <Check className="w-4 h-4" /> Ditambahkan
                                 </>
                               ) : (
                                 <>
                                   <Plus className="w-4 h-4" /> Tambah ke IDP
                                 </>
                               )}
                            </Button>
                         </CardFooter>
                      </Card>
                   );
                })}
             </div>
          ) : (
             <div className="space-y-3">
                {filteredCourses.map((course) => {
                   const isAdded = addedCourses.includes(course.id);
                   return (
                      <div 
                         key={course.id}
                         onClick={() => setSelectedCourse(course)}
                         className={cn(
                           "bg-card rounded-lg border border-border p-4 flex gap-4 hover:shadow-md transition-all cursor-pointer group items-center",
                           isAdded ? "border-l-4 border-l-primary" : ""
                         )}
                      >
                         <div className="w-24 h-24 rounded-lg bg-muted shrink-0 overflow-hidden relative">
                             {course.thumbnail_url && <img src={course.thumbnail_url} className="w-full h-full object-cover" />}
                             <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MonitorPlay className="w-8 h-8 text-white drop-shadow-md" />
                             </div>
                         </div>
                         
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                               <Badge variant="outline" className="text-[10px] h-5 border-border">{course.code}</Badge>
                               <Badge variant="secondary" className="text-[10px] h-5 bg-muted">{course.format}</Badge>
                            </div>
                            <h3 className="font-sans font-bold text-lg text-foreground mb-1 group-hover:text-primary truncate">
                               {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                               {course.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                               <span>Provider: <strong>{course.provider}</strong></span>
                               <span>Duration: <strong>{course.duration_hours} Hours</strong></span>
                            </div>
                         </div>
                         
                         <div className="shrink-0 flex flex-col gap-2">
                            <Button 
                               size="sm"
                               className={cn(
                                 isAdded 
                                   ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                   : "bg-primary hover:bg-primary/90 text-primary-foreground"
                               )}
                               onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToIDP(course.id, course.title);
                               }}
                            >
                               {isAdded ? "Ditambahkan" : "Tambah ke IDP"}
                            </Button>
                         </div>
                      </div>
                   );
                })}
             </div>
          )}

          {/* Course Detail Dialog */}
          <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 bg-background border-border">
               <DialogTitle className="sr-only">{selectedCourse?.title || "Detail Kursus"}</DialogTitle>
               <DialogDescription className="sr-only">Detail lengkap kursus termasuk deskripsi dan kompetensi.</DialogDescription>
               {selectedCourse && (
                 <>
                   <div className="relative h-48 bg-slate-900">
                      <div className="absolute inset-0 opacity-40">
                         {selectedCourse.thumbnail_url && (
                           <img src={selectedCourse.thumbnail_url} className="w-full h-full object-cover" />
                         )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                         <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                               {selectedCourse.format}
                            </Badge>
                            <span className="text-white/80 text-sm font-mono">{selectedCourse.code}</span>
                         </div>
                         <h2 className="text-2xl font-bold font-sans">{selectedCourse.title}</h2>
                      </div>
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20" onClick={() => setSelectedCourse(null)}>
                         <div className="sr-only">Close</div>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </Button>
                   </div>
                   
                   <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="md:col-span-2 space-y-4">
                            <div>
                               <h3 className="font-bold text-foreground mb-2">Deskripsi Kursus</h3>
                               <p className="text-foreground/80 text-sm leading-relaxed">
                                  {selectedCourse.description}
                               </p>
                            </div>
                            
                            {selectedCourse.competencies && selectedCourse.competencies.length > 0 && (
                               <div>
                                  <h3 className="font-bold text-foreground mb-2 mt-4">Kompetensi</h3>
                                  <div className="flex flex-wrap gap-2">
                                     {selectedCourse.competencies.map((c, i) => (
                                        <Badge key={i} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80">
                                           {c.competency_name}
                                           <span className="ml-1.5 text-xs opacity-60 font-normal">+{c.level_improvement} lvl</span>
                                        </Badge>
                                     ))}
                                  </div>
                               </div>
                            )}
                         </div>
                         
                         <div className="md:col-span-1 space-y-4">
                            <Card className="bg-muted/30 border-border shadow-none">
                               <CardContent className="p-4 space-y-3">
                                  <div>
                                     <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Provider</div>
                                     <div className="font-medium text-foreground">{selectedCourse.provider}</div>
                                  </div>
                                  <div>
                                     <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Durasi</div>
                                     <div className="font-medium text-foreground">{selectedCourse.duration_hours} Jam Pembelajaran</div>
                                  </div>
                                  <div>
                                     <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sertifikat</div>
                                     <div className="font-medium flex items-center gap-1 text-emerald-600">
                                        <Check className="w-3 h-3" /> Tersedia
                                     </div>
                                  </div>
                               </CardContent>
                            </Card>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-4 bg-muted/30 border-t border-border flex justify-between items-center">
                      <Button variant="outline" className="text-foreground border-border bg-background">
                         <ExternalLink className="w-4 h-4 mr-2" />
                         Preview Materi
                      </Button>
                      <Button 
                         className={cn(
                           addedCourses.includes(selectedCourse.id)
                             ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                             : "bg-primary hover:bg-primary/90 text-primary-foreground"
                         )}
                         onClick={() => {
                            handleAddToIDP(selectedCourse.id, selectedCourse.title);
                            setSelectedCourse(null);
                         }}
                      >
                         {addedCourses.includes(selectedCourse.id) ? "Sudah Ditambahkan" : "Tambahkan ke IDP"}
                      </Button>
                   </div>
                 </>
               )}
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </Layout>
  );
}
