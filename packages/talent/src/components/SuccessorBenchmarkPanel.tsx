import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Star, TrendingUp, CheckCircle2, Users, Trophy, LayoutGrid, List, AlertTriangle, AlertCircle, Download, GraduationCap, Target, Briefcase, BarChart3, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "./ui/table";
import { cn } from "./ui/utils";

export interface SuccessorCandidate {
  id: string;
  name: string;
  employeeId: string;
  avatar?: string;
  currentPosition: string;
  department: string;
  performanceScore: number;
  capacityScore: number;
  readinessScore: number;
  experienceScore: number;
  yearsInCompany: number;
  education: string;
  keyStrengths: string[];
  developmentAreas: string[];
  eqsScore: number;
  rank?: number;
  clusterId?: string;
  clusterName?: string;
  competencies?: {
    globalBusinessSavvy: number;
    leadingChange: number;
    drivingInnovation: number;
    buildingPartnership: number;
    strategicOrientation: number;
    customerFocus: number;
    drivingExecution: number;
    digitalLeadership: number;
    managingDiversity: number;
    developingOrgCapabilities: number;
  };
  performanceHistory?: { year: number; quarter: string; score: number; rating: string }[];
  gapAnalysis?: {
    total_gaps: number;
    critical_gaps: number;
    minor_gaps: number;
    details: Array<{ competency: string; gap: number; severity: 'critical' | 'minor' }>;
  };
  careerHistory?: { position: string; company: string; duration: string }[];
  eqsBreakdown?: { category: string; score: number; weight: number }[];
  qualifications?: {
    education: Array<{ degree: string; institution: string; year: number }>;
    certifications: Array<{ name: string; issuer: string; year: number }>;
  };
  careerAspiration?: {
    individual: { target_position: string; submitted_date: string } | null;
    supervisor: { recommendation: string; submitted_date: string } | null;
    job_holder: { recommendation: string; submitted_date: string } | null;
    unit: { recommendation: string; submitted_date: string } | null;
  };
  developmentProgress?: {
    idp_completion: number;
    training_hours_ytd: number;
    priority_programs: string[];
  };
  match_score?: number;
  readiness?: string;
}

interface SuccessorBenchmarkPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  positionTitle: string;
  positionId: string;
  candidates: SuccessorCandidate[];
  onConfirm: (data: {
    primary: string | null;
    secondary: string | null;
    tertiary: string | null;
    notes: string;
  }) => void;
}

const COMPETENCY_REQUIREMENT = {
  globalBusinessSavvy: 2,
  leadingChange: 2,
  drivingInnovation: 2,
  buildingPartnership: 2,
  strategicOrientation: 2,
  customerFocus: 2,
  drivingExecution: 2,
  digitalLeadership: 2,
  managingDiversity: 2,
  developingOrgCapabilities: 2,
};

export function SuccessorBenchmarkPanel({
  open,
  onOpenChange,
  positionTitle,
  positionId,
  candidates,
  onConfirm
}: SuccessorBenchmarkPanelProps) {
  const [primarySuccessor, setPrimarySuccessor] = useState<string | null>(null);
  const [secondarySuccessor, setSecondarySuccessor] = useState<string | null>(null);
  const [tertiarySuccessor, setTertiarySuccessor] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [activeTab, setActiveTab] = useState("benchmark"); // Default to benchmark for emphasis

  const handleConfirm = () => {
    if (!primarySuccessor) {
      toast.error("Please select at least a primary successor");
      return;
    }

    onConfirm({
      primary: primarySuccessor,
      secondary: secondarySuccessor,
      tertiary: tertiarySuccessor,
      notes
    });

    setPrimarySuccessor(null);
    setSecondarySuccessor(null);
    setTertiarySuccessor(null);
    setNotes("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-accent";
    return "text-muted-foreground";
  };

  const getEQSColor = (score: number) => {
    if (score >= 96) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 90) return { text: "text-primary", bg: "bg-primary-light", border: "border-primary/20" };
    if (score >= 80) return { text: "text-accent", bg: "bg-accent-subtle", border: "border-accent/20" };
    if (score >= 70) return { text: "text-slate-700", bg: "bg-slate-100", border: "border-slate-200" };
    return { text: "text-danger", bg: "bg-danger-light", border: "border-danger/30" };
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 85) return { label: "Ready Now", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 70) return { label: "1-2 Years", color: "text-primary", bg: "bg-primary-light", border: "border-primary/20" };
    if (score >= 50) return { label: "3-5 Years", color: "text-accent", bg: "bg-accent-subtle", border: "border-accent/20" };
    return { label: "Not Ready", color: "text-danger", bg: "bg-danger-light", border: "border-danger/30" };
  };

  const isSelected = (candidateId: string) => {
    return candidateId === primarySuccessor || 
           candidateId === secondarySuccessor || 
           candidateId === tertiarySuccessor;
  };

  const getSelectionLevel = (candidateId: string) => {
    if (candidateId === primarySuccessor) return "Primary";
    if (candidateId === secondarySuccessor) return "Secondary";
    if (candidateId === tertiarySuccessor) return "Tertiary";
    return null;
  };

  // Mock data generators
  const getMockQuarterlyPerformanceHistory = (baseScore: number, candidateIndex: number) => {
    const variance = candidateIndex * 3;
    return [
      { year: 2022, quarter: "Q1", score: baseScore - 5 + variance, rating: 'Meets' },
      { year: 2022, quarter: "Q2", score: baseScore - 3 + variance, rating: 'Meets' },
      { year: 2022, quarter: "Q3", score: baseScore - 2 + variance, rating: 'Exceeds' },
      { year: 2022, quarter: "Q4", score: baseScore + variance, rating: 'Exceeds' },
      { year: 2023, quarter: "Q1", score: baseScore + 2 + variance, rating: 'Exceeds' },
      { year: 2023, quarter: "Q2", score: baseScore + 3 + variance, rating: 'Exceeds' },
      { year: 2023, quarter: "Q3", score: baseScore + 4 + variance, rating: 'Exceptional' },
      { year: 2023, quarter: "Q4", score: baseScore + 5 + variance, rating: 'Exceptional' },
      { year: 2024, quarter: "Q1", score: baseScore + 6 + variance, rating: 'Exceptional' },
      { year: 2024, quarter: "Q2", score: baseScore + 7 + variance, rating: 'Exceptional' },
      { year: 2024, quarter: "Q3", score: baseScore + 8 + variance, rating: 'Exceptional' },
      { year: 2024, quarter: "Q4", score: baseScore + 9 + variance, rating: 'Exceptional' },
    ];
  };

  const getMockEQSBreakdown = (score: number) => [
    { category: "Kinerja", score: Math.min(100, score + 2), weight: 25 },
    { category: "Kompetensi", score: Math.min(100, score - 2), weight: 20 },
    { category: "Pengalaman", score: Math.min(100, score - 5), weight: 15 },
    { category: "Pendidikan", score: 95, weight: 15 },
    { category: "Sertifikasi", score: 85, weight: 15 },
    { category: "Pelatihan", score: 90, weight: 10 },
  ];

  const getMockQualifications = (candidateIndex: number) => ({
    education: [
      { degree: candidateIndex === 0 ? "MBA" : "S2 Manajemen", institution: candidateIndex === 0 ? "UI" : "Unpad", year: 2014 - candidateIndex },
      { degree: "S1 Psikologi", institution: candidateIndex === 0 ? "UGM" : "Unair", year: 2008 - candidateIndex }
    ],
    certifications: candidateIndex === 0 ? [
      { name: "SHRM-SCP", issuer: "SHRM", year: 2020 },
      { name: "CHRP", issuer: "PMSM", year: 2018 }
    ] : candidateIndex === 1 ? [
      { name: "CHRP", issuer: "PMSM", year: 2019 }
    ] : []
  });

  const getMockCareerAspiration = (candidateIndex: number) => ({
    individual: { target_position: candidateIndex === 0 ? "Director SDM" : "VP Human Capital", submitted_date: "2025-06-01" },
    supervisor: { recommendation: candidateIndex === 0 ? "Ready for promotion" : "Potential for growth", submitted_date: "2025-07-15" },
    job_holder: candidateIndex === 0 ? { recommendation: "Recommended", submitted_date: "2025-08-01" } : null,
    unit: { recommendation: candidateIndex === 0 ? "Approved" : "Recommended with development", submitted_date: "2025-08-15" }
  });

  const getMockDevelopmentProgress = (candidateIndex: number) => ({
    idp_completion: 92 - (candidateIndex * 14),
    training_hours_ytd: 56 - (candidateIndex * 8),
    priority_programs: candidateIndex === 0 
      ? ["Executive Leadership Program", "Digital Transformation"]
      : candidateIndex === 1
      ? ["Strategic HR Management", "Leadership Development"]
      : ["Leadership Foundations", "Project Management"]
  });

  const getMockGapAnalysis = (candidateIndex: number) => {
    if (candidateIndex === 0) {
      return {
        total_gaps: 2,
        critical_gaps: 0,
        minor_gaps: 2,
        details: [
          { competency: "Digital Leadership", gap: -1, severity: 'minor' as const },
          { competency: "Managing Diversity", gap: -1, severity: 'minor' as const }
        ]
      };
    } else if (candidateIndex === 1) {
      return {
        total_gaps: 3,
        critical_gaps: 1,
        minor_gaps: 2,
        details: [
          { competency: "Strategic Orientation", gap: -1, severity: 'critical' as const },
          { competency: "Digital Leadership", gap: -1, severity: 'minor' as const },
          { competency: "Managing Diversity", gap: -1, severity: 'minor' as const }
        ]
      };
    } else {
      return {
        total_gaps: 6,
        critical_gaps: 2,
        minor_gaps: 4,
        details: [
          { competency: "Leading Change", gap: -1, severity: 'critical' as const },
          { competency: "Strategic Orientation", gap: -1, severity: 'critical' as const },
          { competency: "Global Business Savvy", gap: -1, severity: 'minor' as const },
          { competency: "Building Strategic Partnership", gap: -1, severity: 'minor' as const },
          { competency: "Driving Execution", gap: -1, severity: 'minor' as const },
          { competency: "Digital Leadership", gap: -1, severity: 'minor' as const }
        ]
      };
    }
  };

  const prepareRadarData = () => {
    const competencyLabels = [
      { key: "globalBusinessSavvy", label: "Global Business" },
      { key: "leadingChange", label: "Leading Change" },
      { key: "drivingInnovation", label: "Innovation" },
      { key: "buildingPartnership", label: "Partnership" },
      { key: "strategicOrientation", label: "Strategy" },
      { key: "customerFocus", label: "Customer" },
      { key: "drivingExecution", label: "Execution" },
      { key: "digitalLeadership", label: "Digital" },
      { key: "managingDiversity", label: "Diversity" },
      { key: "developingOrgCapabilities", label: "Org Cap" },
    ];

    return competencyLabels.map(({ key, label }) => {
      const dataPoint: any = {
        competency: label,
        requirement: COMPETENCY_REQUIREMENT[key as keyof typeof COMPETENCY_REQUIREMENT],
      };
      candidates.slice(0, 4).forEach((candidate) => {
        if (candidate.competencies) {
          dataPoint[candidate.name] = candidate.competencies[key as keyof typeof candidate.competencies] || 0;
        }
      });
      return dataPoint;
    });
  };

  const prepareQuarterlyPerformanceData = () => {
    const allQuarters: any[] = [];
    const baseYear = 2022;
    
    for (let year = baseYear; year <= 2024; year++) {
      for (let q = 1; q <= 4; q++) {
        const quarterLabel = `${year}-Q${q}`;
        const dataPoint: any = { quarter: quarterLabel };
        
        comparisonCandidates.forEach((candidate, idx) => {
          const history = candidate.performanceHistory || getMockQuarterlyPerformanceHistory(candidate.performanceScore, idx);
          const quarterData = history.find(h => h.year === year && h.quarter === `Q${q}`);
          if (quarterData) {
            dataPoint[candidate.name] = quarterData.score;
          }
        });
        
        allQuarters.push(dataPoint);
      }
    }
    
    return allQuarters;
  };

  const handleExportPDF = () => {
    toast.success("Export PDF feature will be available soon");
  };

  const radarData = prepareRadarData();
  const comparisonCandidates = candidates.slice(0, 4);
  const quarterlyPerformanceData = prepareQuarterlyPerformanceData();

  const COLUMN_LABEL_WIDTH = "min-w-[260px] w-[260px] max-w-[260px] flex-none";
  const COLUMN_CANDIDATE_WIDTH = "min-w-[300px] w-[300px] max-w-[300px] flex-none";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[95vw] sm:max-w-[95vw] p-0 overflow-hidden flex flex-col bg-background border-l shadow-2xl">
        <SheetHeader className="px-6 py-4 border-b bg-card flex-shrink-0 flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-primary text-xl" style={{ fontFamily: 'var(--font-heading)' }}>Successor Selection & Benchmark</SheetTitle>
            <SheetDescription style={{ fontFamily: 'var(--font-body)' }}>
              Comprehensive insight and comparison for <span className="font-semibold text-primary">{positionTitle}</span>
            </SheetDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary-light px-3 py-1.5 rounded-full flex items-center gap-2 border border-primary/20">
               <Users className="w-4 h-4 text-primary" />
               <span className="text-xs font-medium text-primary">{candidates.length} Candidates Available</span>
            </div>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-2 flex items-center justify-between bg-card border-b flex-shrink-0">
            <TabsList className="bg-muted">
              <TabsTrigger value="benchmark" style={{ fontFamily: 'var(--font-heading)' }} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                Comprehensive Insight
              </TabsTrigger>
              <TabsTrigger value="candidates" style={{ fontFamily: 'var(--font-heading)' }} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="w-4 h-4 mr-2" />
                Candidate Grid
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'candidates' && (
              <div className="flex bg-muted rounded-lg p-1">
                <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode('card')}>
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode('table')}>
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}

            {activeTab === 'benchmark' && (
              <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2 border-primary/20 hover:bg-primary-light text-primary">
                <Download className="w-4 h-4" />
                <span style={{ fontFamily: 'var(--font-body)' }}>Export PDF</span>
              </Button>
            )}
          </div>

          <TabsContent value="candidates" className="flex-1 overflow-hidden mt-0 px-6 pb-4 space-y-4 bg-muted/30">
            <div className="grid grid-cols-3 gap-4 pt-4">
              {['Primary', 'Secondary', 'Tertiary'].map((level, idx) => {
                const currentId = level === 'Primary' ? primarySuccessor : level === 'Secondary' ? secondarySuccessor : tertiarySuccessor;
                const candidate = candidates.find(c => c.id === currentId);
                
                return (
                  <Card key={level} className={cn("border-dashed transition-all", currentId && "border-solid border-primary bg-primary-light")}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className={cn("w-5 h-5", level === 'Primary' ? "text-yellow-500" : level === 'Secondary' ? "text-slate-400" : "text-accent")} />
                        <p className="font-bold text-sm text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{level} Successor</p>
                      </div>
                      {candidate ? (
                        <div className="flex items-center gap-3">
                           <Avatar className="w-10 h-10 border border-white shadow-sm">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <div>
                              <p className="font-semibold text-sm text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{candidate.name}</p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{candidate.currentPosition}</p>
                           </div>
                        </div>
                      ) : (
                        <div className="h-10 flex items-center">
                          <p className="text-xs text-muted-foreground italic" style={{ fontFamily: 'var(--font-body)' }}>Select from list below</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <ScrollArea className="flex-1 pr-4 h-[calc(100vh-350px)]">
              {viewMode === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 pb-10">
                  {candidates.map((candidate) => {
                    const selected = isSelected(candidate.id);
                    const eqs = getEQSColor(candidate.eqsScore);
                    const readiness = getReadinessLabel(candidate.readinessScore);
                    const eqsBreakdown = candidate.eqsBreakdown || getMockEQSBreakdown(candidate.eqsScore);

                    return (
                      <Card key={candidate.id} className={cn("transition-all hover:border-primary/50 hover:shadow-md", selected && "border-primary ring-1 ring-primary bg-primary-light/10")}>
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback className="bg-primary-light text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-foreground text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{candidate.name}</h4>
                                    {getSelectionLevel(candidate.id) && (
                                      <Badge className="bg-primary text-primary-foreground">{getSelectionLevel(candidate.id)}</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{candidate.currentPosition}</p>
                                </div>
                                <div className="text-right">
                                   <div className="flex items-center gap-2 justify-end">
                                      <span className={cn("text-xl font-bold", eqs.text)} style={{ fontFamily: 'var(--font-heading)' }}>{candidate.eqsScore.toFixed(1)}</span>
                                      <Badge variant="outline" className={cn(eqs.bg, eqs.text, eqs.border)}>EQS</Badge>
                                   </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                                <p className="text-xs font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>EQS Component Scores:</p>
                                <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                                  {eqsBreakdown.map((component, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{component.category}</span>
                                      <span className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{Math.round(component.score)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-4 gap-4 mt-4 pt-2 border-t">

                                <div>
                                  <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-body)' }}>Readiness</p>
                                   <Badge variant="outline" className={cn("text-[10px] px-1 py-0 h-5 w-fit", readiness.bg, readiness.color, readiness.border)} style={{ fontFamily: 'var(--font-body)' }}>
                                    {readiness.label}
                                  </Badge>
                                </div>
                                <div className="col-span-2 flex justify-end gap-2 items-end">
                                   <Button size="sm" variant={primarySuccessor === candidate.id ? "default" : "outline"} 
                                      onClick={() => setPrimarySuccessor(candidate.id)} 
                                      disabled={isSelected(candidate.id) && primarySuccessor !== candidate.id}
                                      className={cn(primarySuccessor === candidate.id && "bg-primary hover:bg-primary-hover")}
                                   >Primary</Button>
                                   <Button size="sm" variant={secondarySuccessor === candidate.id ? "default" : "outline"}
                                      onClick={() => setSecondarySuccessor(candidate.id)}
                                      disabled={isSelected(candidate.id) && secondarySuccessor !== candidate.id}
                                   >Secondary</Button>
                                   <Button size="sm" variant={tertiarySuccessor === candidate.id ? "default" : "outline"}
                                      onClick={() => setTertiarySuccessor(candidate.id)}
                                      disabled={isSelected(candidate.id) && tertiarySuccessor !== candidate.id}
                                   >Tertiary</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                 <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ fontFamily: 'var(--font-heading)' }}>Candidate</TableHead>
                        <TableHead style={{ fontFamily: 'var(--font-heading)' }}>Current Position</TableHead>
                        <TableHead style={{ fontFamily: 'var(--font-heading)' }}>EQS Score</TableHead>
                        <TableHead style={{ fontFamily: 'var(--font-heading)' }}>Readiness</TableHead>
                        <TableHead className="text-right" style={{ fontFamily: 'var(--font-heading)' }}>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {candidates.map((candidate) => {
                         const selected = isSelected(candidate.id);
                         const eqs = getEQSColor(candidate.eqsScore);
                         const readiness = getReadinessLabel(candidate.readinessScore);
                         return (
                            <TableRow key={candidate.id} className={selected ? "bg-primary-light/30" : ""}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback className="bg-primary-light text-primary">{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{candidate.name}</div>
                                </div>
                              </TableCell>
                              <TableCell style={{ fontFamily: 'var(--font-body)' }}>{candidate.currentPosition}</TableCell>
                              <TableCell><span className={cn("font-bold", eqs.text)} style={{ fontFamily: 'var(--font-heading)' }}>{candidate.eqsScore.toFixed(1)}</span></TableCell>
                              <TableCell><Badge variant="outline" className={cn(readiness.bg, readiness.color, readiness.border)} style={{ fontFamily: 'var(--font-body)' }}>{readiness.label}</Badge></TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button size="icon" variant={primarySuccessor === candidate.id ? "default" : "ghost"} className={cn("h-8 w-8", primarySuccessor === candidate.id && "bg-primary")} onClick={() => setPrimarySuccessor(candidate.id)}><Star className="w-4 h-4" /></Button>
                                  <Button size="icon" variant={secondarySuccessor === candidate.id ? "default" : "ghost"} className="h-8 w-8" onClick={() => setSecondarySuccessor(candidate.id)}><span className="text-xs font-bold">2</span></Button>
                                  <Button size="icon" variant={tertiarySuccessor === candidate.id ? "default" : "ghost"} className="h-8 w-8" onClick={() => setTertiarySuccessor(candidate.id)}><span className="text-xs font-bold">3</span></Button>
                                </div>
                              </TableCell>
                            </TableRow>
                         )
                       })}
                    </TableBody>
                  </Table>
                 </Card>
              )}
            </ScrollArea>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <Label htmlFor="succession-notes" className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>Succession Planning Notes</Label>
              <Textarea
                id="succession-notes"
                placeholder="Add notes about the selection decision..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 min-h-[80px]"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
          </TabsContent>

          {/* COMPREHENSIVE BENCHMARK TAB - IMPROVED LAYOUT */}
          <TabsContent value="benchmark" className="flex-1 overflow-hidden mt-0 px-0 pb-0 flex flex-col bg-slate-50 relative">
            
            {/* Unified Scroll Container for Header & Body */}
            <div className="flex-1 overflow-auto w-full relative">
              <div className="inline-block min-w-full">
                
                {/* 1. STICKY HEADER ROW (Candidates) */}
                <div className="flex sticky top-0 z-30 shadow-md bg-card border-b">
                  {/* Top-Left Corner (Fixed) */}
                  <div className={cn("sticky left-0 z-40 bg-card border-r border-b px-4 py-2 flex items-center shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)}>
                     <div>
                       <h3 className="font-bold text-sm text-primary" style={{ fontFamily: 'var(--font-heading)' }}>Candidate Profile</h3>
                     </div>
                  </div>
                  
                  {/* Candidate Headers */}
                  {comparisonCandidates.map(candidate => {
                    const matchScore = candidate.match_score || (95 - (comparisonCandidates.indexOf(candidate) * 7));
                    const isWinner = primarySuccessor === candidate.id;
                    return (
                      <div key={candidate.id} className={cn("px-4 py-2 border-r border-b relative bg-card transition-colors flex items-center gap-3 text-left", COLUMN_CANDIDATE_WIDTH, isWinner && "bg-primary-light/20")}>
                        {isWinner && (
                           <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
                        )}
                        <Avatar className="w-10 h-10 border border-white shadow-sm flex-shrink-0">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-primary-light text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                             <h4 className="font-bold text-foreground truncate text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{candidate.name}</h4>
                             {getSelectionLevel(candidate.id) && (
                                <Badge className="bg-primary hover:bg-primary-hover text-[10px] h-4 px-1">{getSelectionLevel(candidate.id).substring(0, 1)}</Badge>
                             )}
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate" style={{ fontFamily: 'var(--font-body)' }}>{candidate.currentPosition}</p>
                        </div>
                        
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className={cn("text-sm font-bold", getEQSColor(candidate.eqsScore).text)} style={{ fontFamily: 'var(--font-heading)' }}>
                            {candidate.eqsScore.toFixed(1)}
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-body)' }}>EQS</span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Empty Columns Filler */}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => (
                    <div key={`empty-head-${i}`} className={cn("border-r border-b bg-muted/20", COLUMN_CANDIDATE_WIDTH)} />
                  ))}
                </div>

                {/* 2. BODY ROWS */}
                
                {/* Section: Quick Summary */}
                <div className="flex border-b bg-card">
                   <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground flex items-center shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                      Quick Summary
                   </div>
                   {comparisonCandidates.map((candidate, idx) => {
                     const gaps = candidate.gapAnalysis || getMockGapAnalysis(idx);
                     const devProgress = candidate.developmentProgress || getMockDevelopmentProgress(idx);
                     return (
                       <div key={candidate.id} className={cn("p-4 border-r align-top", COLUMN_CANDIDATE_WIDTH)}>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                              <span className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>EQS Score</span>
                              <span className="font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{candidate.eqsScore.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                              <span className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Gap Analysis</span>
                              <span className={cn("font-bold", gaps.critical_gaps > 0 ? "text-danger" : "text-emerald-600")} style={{ fontFamily: 'var(--font-body)' }}>
                                {gaps.total_gaps} <span className="text-[10px] font-normal text-muted-foreground">({gaps.critical_gaps} critical)</span>
                              </span>
                            </div>
                            <Badge variant="outline" className="w-full justify-center mt-2">
                               {candidate.readiness || "Ready Now"}
                            </Badge>
                          </div>
                       </div>
                     )
                   })}
                   {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-sum-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Radar Chart (Full Width Row) */}
                <div className="bg-card border-b p-6">
                   <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Leadership Competency Radar</h4>
                   <div style={{ height: '350px', width: '100%' }}>
                     <ResponsiveContainer width="100%" height={350}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="#E2E8F0" />
                          <PolarAngleAxis dataKey="competency" tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'var(--font-body)' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 3]} tick={false} axisLine={false} />
                          <Tooltip contentStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', fontFamily: 'var(--font-body)' }} />
                          {comparisonCandidates.map((candidate, index) => (
                            <Radar
                              key={candidate.id}
                              name={candidate.name}
                              dataKey={candidate.name}
                              stroke={index === 0 ? "#00495d" : index === 1 ? "#ff9220" : index === 2 ? "#10B981" : "#94A3B8"}
                              fill={index === 0 ? "#00495d" : index === 1 ? "#ff9220" : index === 2 ? "#10B981" : "#94A3B8"}
                              fillOpacity={0.15}
                            />
                          ))}
                          <Radar name="Requirement" dataKey="requirement" stroke="#94A3B8" fill="transparent" strokeDasharray="4 4" />
                        </RadarChart>
                     </ResponsiveContainer>
                   </div>
                </div>

                {/* Section: EQS Detail */}
                <div className="flex border-b bg-card">
                  <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                     <div className="flex items-center gap-2 mb-4 text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                        EQS Breakdown
                     </div>
                     <div className="space-y-4 pt-2 text-xs font-normal text-muted-foreground">
                        <div className="h-6 flex items-center">Kinerja (25%)</div>
                        <div className="h-6 flex items-center">Kompetensi (20%)</div>
                        <div className="h-6 flex items-center">Pengalaman (15%)</div>
                        <div className="h-6 flex items-center">Pendidikan (15%)</div>
                        <div className="h-6 flex items-center">Sertifikasi (15%)</div>
                        <div className="h-6 flex items-center">Pelatihan (10%)</div>
                     </div>
                  </div>
                  {comparisonCandidates.map(candidate => {
                    const breakdown = candidate.eqsBreakdown || getMockEQSBreakdown(candidate.eqsScore);
                    return (
                      <div key={`eqs-${candidate.id}`} className={cn("p-4 border-r align-top", COLUMN_CANDIDATE_WIDTH)}>
                        <div className="flex items-center gap-2 mb-4 pl-1">
                           <span className="text-xl font-bold text-primary">{candidate.eqsScore.toFixed(1)}</span>
                        </div>
                        <div className="space-y-4 pt-2">
                           {breakdown.map((item, idx) => (
                             <div key={idx} className="flex items-center gap-3 h-6">
                               <Progress value={item.score} className="h-2 flex-1" indicatorClassName={cn(item.score >= 90 ? "bg-emerald-500" : "bg-primary")} />
                               <span className="text-xs w-6 text-right font-medium text-foreground">{Math.round(item.score)}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    )
                  })}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-eqs-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Gap Analysis */}
                <div className="flex border-b bg-card">
                  <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                     <div className="flex items-center gap-2 mb-2 text-primary">
                        <AlertTriangle className="w-4 h-4" />
                        Gap Analysis
                     </div>
                     <p className="text-xs text-muted-foreground font-normal mt-1">
                        Critical gaps require immediate intervention before placement.
                     </p>
                  </div>
                  {comparisonCandidates.map((candidate, idx) => {
                    const gaps = candidate.gapAnalysis || getMockGapAnalysis(idx);
                    return (
                      <div key={`gaps-${candidate.id}`} className={cn("p-4 border-r align-top space-y-3", COLUMN_CANDIDATE_WIDTH)}>
                         {gaps.details.filter(gap => gap.severity === 'critical').map((gap, i) => (
                            <div key={i} className="flex items-start gap-2 bg-danger-light p-2 rounded border border-danger/30">
                              <AlertCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-danger-dark" style={{ fontFamily: 'var(--font-body)' }}>{gap.competency}</p>
                                <p className="text-[10px] text-danger" style={{ fontFamily: 'var(--font-body)' }}>High Gap Level</p>
                              </div>
                            </div>
                         ))}
                         {gaps.details.filter(gap => gap.severity === 'minor').map((gap, i) => (
                            <div key={i} className="flex items-start gap-2 bg-accent-subtle p-2 rounded border border-accent/30">
                              <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-accent-hover" style={{ fontFamily: 'var(--font-body)' }}>{gap.competency}</p>
                                <p className="text-[10px] text-accent" style={{ fontFamily: 'var(--font-body)' }}>Minor Gap</p>
                              </div>
                            </div>
                         ))}
                         {gaps.total_gaps === 0 && (
                            <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded border border-emerald-200">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              <p className="text-xs text-emerald-900" style={{ fontFamily: 'var(--font-body)' }}>No gaps identified</p>
                            </div>
                         )}
                      </div>
                    )
                  })}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-gaps-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Aspiration */}
                <div className="flex border-b bg-card">
                  <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                     <div className="flex items-center gap-2 mb-2 text-primary">
                        <Star className="w-4 h-4" />
                        Career Aspiration
                     </div>
                     <div className="space-y-6 pt-2 text-xs font-normal text-muted-foreground">
                        <div className="h-10 flex items-center">Individual Target</div>
                        <div className="h-10 flex items-center">Supervisor Rec.</div>
                        <div className="h-10 flex items-center">Job Holder Rec.</div>
                     </div>
                  </div>
                  {comparisonCandidates.map((candidate, idx) => {
                     const aspiration = candidate.careerAspiration || getMockCareerAspiration(idx);
                     return (
                        <div key={`asp-${candidate.id}`} className={cn("p-4 border-r align-top space-y-4", COLUMN_CANDIDATE_WIDTH)}>
                           {/* Individual */}
                           <div className="bg-purple-50 border border-purple-200 p-2 rounded h-12 flex flex-col justify-center">
                              <p className="text-xs font-semibold text-purple-900 truncate" title={aspiration.individual?.target_position || ""}>{aspiration.individual?.target_position || "-"}</p>
                              <p className="text-[10px] text-purple-600">{aspiration.individual?.submitted_date}</p>
                           </div>
                           {/* Supervisor */}
                           <div className="bg-blue-50 border border-blue-200 p-2 rounded h-12 flex flex-col justify-center">
                              <p className="text-xs font-semibold text-blue-900 truncate" title={aspiration.supervisor?.recommendation || ""}>{aspiration.supervisor?.recommendation || "-"}</p>
                              <p className="text-[10px] text-blue-600">{aspiration.supervisor?.submitted_date}</p>
                           </div>
                           {/* Job Holder */}
                           <div className="bg-emerald-50 border border-emerald-200 p-2 rounded h-12 flex flex-col justify-center">
                              <p className="text-xs font-semibold text-emerald-900 truncate" title={aspiration.job_holder?.recommendation || ""}>{aspiration.job_holder?.recommendation || "N/A"}</p>
                           </div>
                        </div>
                     )
                  })}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-asp-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Qualifications */}
                <div className="flex border-b bg-card">
                  <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                     <div className="flex items-center gap-2 mb-2 text-primary">
                        <GraduationCap className="w-4 h-4" />
                        Qualifications
                     </div>
                  </div>
                  {comparisonCandidates.map((candidate, idx) => {
                     const quals = candidate.qualifications || getMockQualifications(idx);
                     return (
                        <div key={`qual-${candidate.id}`} className={cn("p-4 border-r align-top space-y-3", COLUMN_CANDIDATE_WIDTH)}>
                           <div className="space-y-2">
                              {quals.education.map((edu, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200 rounded p-2">
                                  <p className="text-xs font-semibold text-slate-900">{edu.degree}</p>
                                  <p className="text-[10px] text-slate-500">{edu.institution}, {edu.year}</p>
                                </div>
                              ))}
                           </div>
                           {quals.certifications.length > 0 && (
                             <div className="pt-2 border-t border-slate-100 mt-2">
                               <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Certifications</p>
                               <div className="space-y-2">
                                 {quals.certifications.map((cert, i) => (
                                    <div key={i} className="bg-amber-50 border border-amber-200 rounded p-2">
                                      <p className="text-xs font-semibold text-amber-900">{cert.name}</p>
                                      <p className="text-[10px] text-amber-700">{cert.issuer}, {cert.year}</p>
                                    </div>
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>
                     )
                  })}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-qual-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Career History */}
                <div className="flex border-b bg-card">
                  <div className={cn("sticky left-0 z-20 bg-muted/30 border-r p-4 font-semibold text-sm text-foreground shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)]", COLUMN_LABEL_WIDTH)} style={{ fontFamily: 'var(--font-heading)' }}>
                     <div className="flex items-center gap-2 mb-2 text-primary">
                        <Briefcase className="w-4 h-4" />
                        Career History
                     </div>
                  </div>
                  {comparisonCandidates.map(candidate => (
                     <div key={`career-${candidate.id}`} className={cn("p-4 border-r align-top", COLUMN_CANDIDATE_WIDTH)}>
                        <div className="space-y-4 relative">
                           <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-200" />
                           {(candidate.careerHistory || [
                             { position: candidate.currentPosition, company: "InJourney", duration: "2022 - Present" },
                             { position: "Manager", company: "InJourney", duration: "2019 - 2022" }
                           ]).map((role, idx) => (
                             <div key={idx} className="relative pl-6">
                               <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white ring-1 ring-slate-200" />
                               <p className="text-xs font-semibold text-foreground">{role.position}</p>
                               <p className="text-[10px] text-muted-foreground">{role.company}</p>
                               <p className="text-[10px] text-slate-400">{role.duration}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  ))}
                  {[...Array(4 - comparisonCandidates.length)].map((_, i) => <div key={`empty-car-${i}`} className={cn("border-r", COLUMN_CANDIDATE_WIDTH)} />)}
                </div>

                {/* Section: Performance Chart (Full Width) */}
                <div className="bg-card p-6 border-b">
                   <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Performance Trend (2022-2024)</h4>
                   <div style={{ width: '100%', height: '300px' }}>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={quarterlyPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis 
                            dataKey="quarter" 
                            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-body)' }}
                          />
                          <YAxis 
                            domain={[70, 100]} 
                            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-body)' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              fontSize: '12px', 
                              fontFamily: 'var(--font-body)',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '8px'
                            }} 
                          />
                          <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                          {comparisonCandidates.map((candidate, idx) => (
                            <Line 
                              key={candidate.id}
                              type="monotone" 
                              dataKey={candidate.name} 
                              stroke={idx === 0 ? "#00495d" : idx === 1 ? "#ff9220" : idx === 2 ? "#10B981" : "#94A3B8"}
                              strokeWidth={2} 
                              dot={{ r: 3 }}
                            />
                          ))}
                        </LineChart>
                     </ResponsiveContainer>
                   </div>
                </div>

              </div>
            </div>

            {/* Footer Legend */}
            <div className="border-t px-6 py-3 bg-muted/20 flex-shrink-0 z-20 relative">
               <div className="flex gap-6 text-xs text-muted-foreground flex-wrap justify-center" style={{ fontFamily: 'var(--font-body)' }}>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-danger"></div>
                    <span>Critical Gap</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>Minor Gap</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Meets Requirement</span>
                  </div>
               </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 flex items-center justify-between bg-card flex-shrink-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              Selected: {primarySuccessor ? <span className="text-primary font-bold">1 Primary</span> : "0"} 
              {secondarySuccessor ? <span className="text-foreground font-medium">, 1 Secondary</span> : ""}
              {tertiarySuccessor ? <span className="text-foreground font-medium">, 1 Tertiary</span> : ""}
            </div>
            <Button onClick={handleConfirm} disabled={!primarySuccessor} className="bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm Selection
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
