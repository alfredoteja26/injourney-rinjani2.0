import { useState } from "react";
import { Link } from "react-router";
import { 
  TrendingUp, 
  ArrowRight, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  ArrowLeftRight,
  Info,
  Layers
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Layout } from "../../components/shell/Layout";
import { mockCompetencyGaps, mockEmployees, mockCourses } from "../../data/idpData";
import { cn } from "../../components/ui/utils";

export function GapAnalysisScreen() {
  const currentEmployee = mockEmployees[0];
  const competencyGapData = mockCompetencyGaps.find(g => g.employee_id === currentEmployee.id);
  const competencies = competencyGapData?.competencies || [];
  
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [showGapsOnly, setShowGapsOnly] = useState<boolean>(false);
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null);

  // Filter competencies
  const filteredCompetencies = competencies.filter(comp => {
    if (showGapsOnly && comp.gap <= 0) return false;
    if (selectedCluster !== "all" && comp.cluster !== selectedCluster) return false;
    return true;
  });

  // Sort: Gaps first, then high priority
  const sortedCompetencies = [...filteredCompetencies].sort((a, b) => {
    // Priority to gaps
    if (a.gap > 0 && b.gap <= 0) return -1;
    if (a.gap <= 0 && b.gap > 0) return 1;
    // Then by gap severity
    return b.gap - a.gap;
  });

  // Prepare chart data - use all competencies for the chart to show full profile unless filtered by cluster
  const chartData = (selectedCluster === "all" ? competencies : filteredCompetencies).map(comp => ({
    subject: comp.competency_name,
    current: comp.current_level,
    target: comp.required_level,
    fullMark: 5,
  }));

  const gapCount = competencies.filter(c => c.gap > 0).length;
  const strengthCount = competencies.filter(c => c.gap <= 0).length;

  const selectedCompetencyData = selectedCompetency 
    ? competencies.find(c => c.competency_id === selectedCompetency) 
    : (sortedCompetencies.length > 0 ? sortedCompetencies[0] : null);

  const recommendedCourses = selectedCompetencyData 
    ? mockCourses.filter(course => 
        course.competencies?.some(c => c.competency_id === selectedCompetencyData.competency_id)
      ).slice(0, 3)
    : [];

  return (
    <Layout>
      <div className="min-h-screen bg-background p-6 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                    Talent Profiling
                 </Badge>
                 <span className="text-muted-foreground text-sm">• Last Assessment: Dec 2025</span>
              </div>
              <h1 className="font-sans text-3xl font-bold text-foreground">
                Gap Analysis
              </h1>
              <p className="text-foreground mt-2 max-w-2xl">
                Analisis perbandingan antara kompetensi Anda saat ini dengan standar yang dibutuhkan untuk posisi 
                <span className="font-semibold text-primary ml-1">{currentEmployee.current_position_title}</span>.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="bg-background border-border text-foreground hover:bg-muted">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Bandingkan Posisi
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="border-l-4 border-l-amber-500 shadow-sm bg-card border-border">
               <CardContent className="p-5 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Development Areas</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{gapCount}</h3>
                    <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Kompetensi perlu ditingkatkan
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-full text-amber-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
               </CardContent>
             </Card>
             
             <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-card border-border">
               <CardContent className="p-5 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Strengths</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{strengthCount}</h3>
                    <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Kompetensi memenuhi standar
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-500">
                    <Target className="w-6 h-6" />
                  </div>
               </CardContent>
             </Card>

             <Card className="border-l-4 border-l-blue-500 shadow-sm bg-card border-border">
               <CardContent className="p-5 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Job Fit Score</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">
                      {Math.round((strengthCount / competencies.length) * 100)}%
                    </h3>
                    <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      Kecocokan dengan posisi
                   </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
               </CardContent>
             </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/*  LEFT  COLUMN: Controls & List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-border shadow-md bg-card">
                <CardHeader className="pb-3 border-b border-border">
                   <div className="flex items-center justify-between">
                     <CardTitle className="text-lg font-sans font-bold text-foreground">Daftar Kompetensi</CardTitle>
                     <div className="flex items-center gap-2">
                       <Label htmlFor="gaps-switch" className="text-xs text-muted-foreground">Hanya Gap</Label>
                       <Switch id="gaps-switch" checked={showGapsOnly} onCheckedChange={setShowGapsOnly} className="scale-75 origin-right" />
                     </div>
                   </div>
                   <Tabs value={selectedCluster} onValueChange={setSelectedCluster} className="w-full mt-4">
                      <TabsList className="w-full grid grid-cols-3 bg-muted p-1">
                        <TabsTrigger value="all" className="text-xs">Semua</TabsTrigger>
                        <TabsTrigger value="technical" className="text-xs">Technical</TabsTrigger>
                        <TabsTrigger value="leadership" className="text-xs">Leadership</TabsTrigger>
                      </TabsList>
                   </Tabs>
                </CardHeader>
                <CardContent className="p-0 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <div className="divide-y divide-border">
                    {sortedCompetencies.length > 0 ? sortedCompetencies.map((comp) => {
                      const isGap = comp.gap > 0;
                      const isSelected = selectedCompetencyData?.competency_id === comp.competency_id;
                      
                      return (
                        <div 
                          key={comp.competency_id}
                          onClick={() => setSelectedCompetency(comp.competency_id)}
                          className={cn(
                            "p-4 cursor-pointer transition-all hover:bg-muted/50 border-l-4",
                            isSelected ? "bg-primary/5 border-l-primary" : "border-l-transparent",
                            !isGap && !isSelected && "opacity-80 hover:opacity-100"
                          )}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={cn(
                              "font-semibold text-sm pr-2", 
                              isSelected ? "text-primary" : "text-foreground"
                            )}>
                              {comp.competency_name}
                            </h4>
                            {isGap ? (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-[10px] uppercase font-bold px-2 whitespace-nowrap">
                                Gap: -{comp.gap}
                              </Badge>
                            ) : (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-[10px] uppercase font-bold px-2 whitespace-nowrap">
                                Fit
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                             <div className="flex flex-col">
                               <span className="uppercase text-[10px] tracking-wider mb-0.5">Current</span>
                               <span className={cn("font-bold text-sm", isGap ? "text-amber-600" : "text-emerald-600")}>Level {comp.current_level}</span>
                             </div>
                             <div className="h-8 w-[1px] bg-border"></div>
                             <div className="flex flex-col">
                               <span className="uppercase text-[10px] tracking-wider mb-0.5">Required</span>
                               <span className="font-bold text-sm text-foreground">Level {comp.required_level}</span>
                             </div>
                          </div>
                        </div>
                      );
                    }) : (
                       <div className="p-8 text-center text-muted-foreground">
                         No competencies found.
                       </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: Spider Web & Detail (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Radar Chart Card */}
              <Card className="border-border shadow-md overflow-hidden bg-card">
                <CardHeader className="pb-2 bg-muted/30 border-b border-border">
                  <CardTitle className="text-lg font-sans font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Competency Radar
                  </CardTitle>
                  <CardDescription>
                    Visualisasi perbandingan level kompetensi Anda vs Standard
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-card relative">
                   <div className="h-[400px] w-full flex items-center justify-center">
                     <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                         <PolarGrid gridType="polygon" stroke="var(--border)" strokeDasharray="3 3" />
                         <PolarAngleAxis 
                           dataKey="subject" 
                           tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 500 }}
                         />
                         <PolarRadiusAxis 
                           angle={90} 
                           domain={[0, 5]} 
                           tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                           tickCount={6}
                           axisLine={false}
                         />
                         <Radar
                           name="Target Level"
                           dataKey="target"
                           stroke="#00495d"
                           strokeWidth={2}
                           fill="#00495d"
                           fillOpacity={0.1}
                         />
                         <Radar
                           name="Current Level"
                           dataKey="current"
                           stroke="#f59e0b"
                           strokeWidth={2}
                           fill="#f59e0b"
                           fillOpacity={0.4}
                           dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }}
                         />
                         <Legend 
                           wrapperStyle={{ paddingTop: '20px' }}
                           iconType="circle"
                         />
                         <Tooltip
                           contentStyle={{ 
                             backgroundColor: 'var(--card)', 
                             borderColor: 'var(--border)',
                             borderRadius: '8px',
                             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                           }}
                           itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                         />
                       </RadarChart>
                     </ResponsiveContainer>
                   </div>
                   
                   {/* Legend Custom */}
                   <div className="absolute top-4 right-4 text-xs space-y-1 bg-background/90 p-2 rounded-lg border border-border shadow-sm backdrop-blur">
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></span>
                         <span className="text-foreground">Target Standard</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500"></span>
                         <span className="text-foreground">Current Level</span>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Detail & Recommendations Panel */}
              {selectedCompetencyData && (
                 <Card className={cn(
                   "border-border shadow-md transition-all duration-300 bg-card", 
                   selectedCompetencyData.gap > 0 ? "ring-1 ring-amber-200" : "ring-1 ring-emerald-200"
                 )}>
                   <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                         <div>
                            <Badge variant="outline" className="mb-2 uppercase text-[10px] tracking-wider text-muted-foreground border-border">
                               {selectedCompetencyData.cluster}
                            </Badge>
                            <h2 className="text-xl font-bold text-foreground font-sans">
                               {selectedCompetencyData.competency_name}
                            </h2>
                         </div>
                         {selectedCompetencyData.gap > 0 ? (
                           <div className="text-right">
                             <div className="text-2xl font-bold text-amber-600">-{selectedCompetencyData.gap}</div>
                             <div className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">Gap Detected</div>
                           </div>
                         ) : (
                           <div className="text-right">
                             <div className="text-2xl font-bold text-emerald-600"><CheckCircle2 className="w-6 h-6 inline mr-1" />Fit</div>
                           </div>
                         )}
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="mb-6 space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Level 0</span>
                          <span>Level 5 (Mastery)</span>
                        </div>
                        <div className="relative h-4 bg-muted rounded-full w-full overflow-hidden">
                           {/* Target Marker Background */}
                           <div 
                              className="absolute top-0 bottom-0 bg-muted-foreground/20"
                              style={{ left: 0, width: `${(selectedCompetencyData.required_level / 5) * 100}%` }}
                           ></div>
                           
                           {/* Current Level */}
                           <div 
                              className={cn(
                                "absolute top-0 bottom-0 transition-all duration-1000",
                                selectedCompetencyData.gap > 0 ? "bg-amber-500" : "bg-emerald-500"
                              )}
                              style={{ width: `${(selectedCompetencyData.current_level / 5) * 100}%` }}
                           ></div>
                           
                           {/* Target Line Marker */}
                           <div 
                              className="absolute top-0 bottom-0 w-1 bg-primary z-10"
                              style={{ left: `${(selectedCompetencyData.required_level / 5) * 100}%` }}
                           ></div>
                        </div>
                        <div className="flex justify-between items-center text-xs mt-1">
                           <span className="font-semibold text-amber-600">Current: Lvl {selectedCompetencyData.current_level}</span>
                           <span className="font-semibold text-primary">Target: Lvl {selectedCompetencyData.required_level}</span>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-border">
                         <div className="flex items-center justify-between">
                            <h3 className="font-bold text-foreground flex items-center gap-2">
                               <Info className="w-4 h-4 text-primary" />
                               Rekomendasi Pengembangan
                            </h3>
                            <Link to="/talent/idp/catalog" className="text-xs font-medium text-primary hover:underline flex items-center">
                               Lihat Catalog <ChevronRight className="w-3 h-3 ml-1" />
                            </Link>
                         </div>
                         
                         {recommendedCourses.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {recommendedCourses.map(course => (
                                <Link to="/talent/idp/catalog" key={course.id} className="group block">
                                  <div className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all bg-card h-full flex flex-col">
                                    <div className="flex items-start gap-3 mb-2">
                                       <div className="w-10 h-10 rounded bg-muted shrink-0 overflow-hidden">
                                          {course.thumbnail_url ? (
                                            <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                                          )}
                                       </div>
                                       <div>
                                          <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary leading-snug">
                                            {course.title}
                                          </h4>
                                          <p className="text-[10px] text-muted-foreground mt-1">{course.provider}</p>
                                       </div>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center gap-2">
                                       <Badge variant="secondary" className="text-[10px] h-5 bg-muted text-muted-foreground">{course.format}</Badge>
                                       <span className="text-[10px] text-muted-foreground">{course.duration_hours} jam</span>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                           </div>
                         ) : (
                           <div className="text-center p-6 bg-muted/30 rounded-lg border border-dashed border-border">
                              <p className="text-sm text-muted-foreground">Belum ada rekomendasi spesifik untuk kompetensi ini.</p>
                           </div>
                         )}
                         
                         <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                            Tambahkan ke IDP Plan
                         </Button>
                      </div>
                   </CardContent>
                 </Card>
              )}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
