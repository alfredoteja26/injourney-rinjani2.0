import { useState } from "react";
import { Link } from "react-router";
import { 
  Lightbulb, 
  Plus, 
  Bookmark,
  Filter,
  X,
  Check
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Layout } from "../../components/shell/Layout";
import { 
  mockCompetencyGaps,
  mockEmployees,
  mockCourses
} from "../../data/idpData";
import { toast } from "sonner@2.0.3";

export function RecommendationsScreen() {
  const currentEmployee = mockEmployees[0];
  const competencyGap = mockCompetencyGaps.find(g => g.employee_id === currentEmployee.id);
  const [selectedCompetency, setSelectedCompetency] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [addedCourses, setAddedCourses] = useState<string[]>([]);

  const competenciesWithGaps = competencyGap?.competencies.filter(c => c.gap > 0) || [];
  
  // Get recommended courses based on gaps
  const getRecommendedCourses = () => {
    let courses = mockCourses.filter(course => {
      // Filter by competency
      if (selectedCompetency !== "all") {
        const hasCompetency = course.competencies?.some(c => c.competency_id === selectedCompetency);
        if (!hasCompetency) return false;
      } else {
        // Show only courses that match at least one gap competency
        const matchesGap = course.competencies?.some(c => 
          competenciesWithGaps.some(gap => gap.competency_id === c.competency_id)
        );
        if (!matchesGap) return false;
      }

      // Filter by format
      if (selectedFormat !== "all" && course.format !== selectedFormat) {
        return false;
      }

      // Filter by duration
      if (selectedDuration !== "all") {
        if (selectedDuration === "short" && course.duration_hours >= 4) return false;
        if (selectedDuration === "medium" && (course.duration_hours < 4 || course.duration_hours > 8)) return false;
        if (selectedDuration === "long" && course.duration_hours <= 8) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === "duration") {
      courses = courses.sort((a, b) => a.duration_hours - b.duration_hours);
    } else if (sortBy === "title") {
      courses = courses.sort((a, b) => a.title.localeCompare(b.title));
    }

    return courses;
  };

  const filteredCourses = getRecommendedCourses();

  // Group courses by competency
  const coursesByCompetency = competenciesWithGaps.map(comp => {
    const courses = filteredCourses.filter(course => 
      course.competencies?.some(c => c.competency_id === comp.competency_id)
    );
    return {
      competency: comp,
      courses
    };
  }).filter(group => group.courses.length > 0);

  const handleAddToIDP = (courseId: string, courseTitle: string) => {
    if (addedCourses.includes(courseId)) {
      setAddedCourses(addedCourses.filter(id => id !== courseId));
      toast.success(`${courseTitle} dihapus dari draft IDP`);
    } else {
      setAddedCourses([...addedCourses, courseId]);
      toast.success(`${courseTitle} ditambahkan ke draft IDP`);
    }
  };

  const getRelevanceBadge = (course: typeof mockCourses[0]) => {
    const hasHighPriorityTag = course.recommendation_tags?.includes("Mandatory") || 
                              course.recommendation_tags?.includes("Recommended for Gap");
    
    if (hasHighPriorityTag) {
      // Using the teal color from the palette for High relevance
      return <Badge className="bg-[#00858A] hover:bg-[#006E72] text-white border-0">High</Badge>;
    }
    
    if (course.recommendation_tags?.includes("Popular in Your Role")) {
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-0">Medium</Badge>;
    }
    
    return <Badge variant="outline" className="text-muted-foreground">Low</Badge>;
  };

  const formatBadgeIcon = (format: string) => {
    switch (format) {
      case 'video': return '🎥';
      case 'workshop': return '👥';
      case 'ebook': return '📚';
      case 'blended': return '🎯';
      default: return '📖';
    }
  };

  const hasActiveFilters = selectedCompetency !== "all" || selectedFormat !== "all" || selectedDuration !== "all";

  const resetFilters = () => {
    setSelectedCompetency("all");
    setSelectedFormat("all");
    setSelectedDuration("all");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto space-y-6 p-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              Rekomendasi untuk Anda
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Berdasarkan {competenciesWithGaps.length} gap kompetensi
            </p>
            <Badge className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              {filteredCourses.length} kursus direkomendasikan
            </Badge>
          </div>

          {/* Filters */}
          <Card className="border border-border shadow-sm bg-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Filter:
                  </span>
                </div>
                
                <Select value={selectedCompetency} onValueChange={setSelectedCompetency}>
                  <SelectTrigger className="w-[200px] border border-border bg-background">
                    <SelectValue placeholder="Gap Kompetensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kompetensi</SelectItem>
                    {competenciesWithGaps.map(comp => (
                      <SelectItem key={comp.competency_id} value={comp.competency_id}>
                        {comp.competency_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="w-[160px] border border-border bg-background">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Format</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="blended">Blended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[160px] border border-border bg-background">
                    <SelectValue placeholder="Durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Durasi</SelectItem>
                    <SelectItem value="short">&lt; 4 jam</SelectItem>
                    <SelectItem value="medium">4-8 jam</SelectItem>
                    <SelectItem value="long">&gt; 8 jam</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] border border-border bg-background">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevansi</SelectItem>
                    <SelectItem value="duration">Durasi</SelectItem>
                    <SelectItem value="title">Judul A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={resetFilters}
                    className="text-primary hover:text-primary/90 hover:bg-primary/10"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reset Filter
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Course Recommendations */}
          {filteredCourses.length === 0 ? (
            <Card className="border border-border bg-card">
              <CardContent className="p-12 text-center">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground">
                  Tidak Ada Rekomendasi
                </h3>
                <p className="text-muted-foreground mt-2 mb-6 text-sm">
                  Tidak ada kursus yang sesuai dengan filter yang dipilih.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {coursesByCompetency.map(({ competency, courses }) => (
                <div key={competency.competency_id} className="space-y-4">
                  {/* Competency Group Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {competency.competency_name}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Gap: {competency.gap} level
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        competency.gap_severity === 'significant'
                          ? 'border-red-500 text-red-600 bg-red-50'
                          : 'border-amber-500 text-amber-600 bg-amber-50'
                      }
                    >
                      {competency.gap_severity === 'significant' ? 'Gap Signifikan' : 'Gap Moderat'}
                    </Badge>
                  </div>

                  {/* Course Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => {
                      const isAdded = addedCourses.includes(course.id);
                      
                      return (
                        <Card key={course.id} className="group hover:shadow-lg transition-all duration-200 border border-border overflow-hidden bg-card flex flex-col h-full">
                          {/* Thumbnail with aspect ratio */}
                          {course.thumbnail_url && (
                            <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                              <img 
                                src={course.thumbnail_url} 
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <CardContent className="p-5 flex flex-col flex-1 gap-3">
                            {/* Header: Code & Badge */}
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="font-normal text-muted-foreground border-border">
                                {course.code}
                              </Badge>
                              {getRelevanceBadge(course)}
                            </div>

                            {/* Title */}
                            <h3 
                              className="font-semibold text-foreground line-clamp-2 text-lg"
                            >
                              {course.title}
                            </h3>

                            {/* Description */}
                            <p 
                              className="text-muted-foreground line-clamp-2 flex-1 text-sm"
                            >
                              {course.description}
                            </p>

                            {/* Metadata */}
                            <div className="flex items-center gap-2 text-muted-foreground pt-1 text-xs">
                              <span>{course.duration_hours} jam</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                {formatBadgeIcon(course.format)} {course.format}
                              </span>
                            </div>

                            {/* Provider & Competency */}
                            <div className="flex flex-col gap-1.5 pt-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="font-normal text-muted-foreground border-border">
                                    {course.provider}
                                  </Badge>
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  {course.competencies?.[0]?.competency_name}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-[1fr,auto] gap-2 pt-3 mt-auto">
                              <Button
                                className={
                                  isAdded
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                                }
                                onClick={() => handleAddToIDP(course.id, course.title)}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Ditambahkan
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah ke IDP
                                  </>
                                )}
                              </Button>
                              <Button variant="outline" size="icon" className="border-border text-foreground hover:bg-muted">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {courses.length > 3 && (
                    <div className="flex justify-center pt-2">
                      <Button variant="link" className="text-primary">
                        Lihat semua {courses.length} kursus →
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <Card className="border border-border shadow-sm bg-card">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4 text-sm">
                Tidak menemukan yang cocok?
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild className="border-border text-foreground">
                  <Link to="/talent/idp/catalog">Jelajahi Katalog Lengkap</Link>
                </Button>
                <Button variant="outline" asChild className="border-border text-foreground">
                  <Link to="/talent/idp/editor">Tambah Aktivitas Custom</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
