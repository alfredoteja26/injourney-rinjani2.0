import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { PositionCard } from "@/components/job-tender/PositionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { mockPositions, mockSavedJobs } from "@/data/mockJobTenderData";
import { Position } from "@/types/job-tender";

import { JobTenderNav } from "@/components/job-tender/JobTenderNav";
import { Layout } from "@/components/shell/Layout";

export default function ExploreJob() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters state
  const [locationFilter, setLocationFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  
  // Derived data
  const filteredPositions = useMemo(() => {
    return mockPositions.filter(pos => {
      const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            pos.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "all" || pos.location === locationFilter;
      const matchesGrade = gradeFilter === "all" || pos.gradeJabatan.toString() === gradeFilter;
      
      return matchesSearch && matchesLocation && matchesGrade;
    });
  }, [searchTerm, locationFilter, gradeFilter]);

  // Unique filter options
  const locations = Array.from(new Set(mockPositions.map(p => p.location)));
  const grades = Array.from(new Set(mockPositions.map(p => p.gradeJabatan))).sort((a, b) => a - b);

  const handleSave = (id: string) => {
    console.log("Save position", id);
    // In a real app, this would call an API
  };

  const handleApply = (id: string) => {
    navigate(`/explore/${id}`);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/explore/${id}`);
  };

  const isSaved = (id: string) => {
    return mockSavedJobs.some(job => job.positionId === id); // Mock check
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-[0px] md:py-8 font-body">
        <JobTenderNav />
        <PageHeader 
          title="Explore Job" 
          subtitle="Temukan kesempatan karir internal yang sesuai dengan kualifikasi Anda."
          actions={
            <div className="flex items-center gap-2 bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Periode Q1 2026
            </div>
          }
        />

        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari posisi, unit kerja, atau kata kunci..." 
                className="pl-9 h-10 border-border focus:border-primary focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[140px] h-10 border-border">
                  <SelectValue placeholder="Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-[140px] h-10 border-border">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Grade</SelectItem>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-border">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-10 bg-border mx-1 hidden md:block" />
              
              <div className="flex bg-muted rounded-lg p-1 shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredPositions.length > 0 ? (
            <>
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-4"
              }>
                {filteredPositions.map((position) => (
                  <PositionCard 
                    key={position.id} 
                    position={position} 
                    isSaved={isSaved(position.id)}
                    onSave={handleSave}
                    onApply={handleApply}
                    onViewDetail={handleViewDetail}
                    className={viewMode === 'list' ? "flex-row h-auto" : ""}
                  />
                ))}
              </div>
              
              {/* Pagination Placeholder */}
              <div className="flex justify-center mt-8 pt-4 border-t border-border">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </nav>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Tidak ada posisi yang ditemukan</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Coba ubah kata kunci pencarian atau filter Anda untuk menemukan posisi yang sesuai.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("all");
                  setGradeFilter("all");
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
