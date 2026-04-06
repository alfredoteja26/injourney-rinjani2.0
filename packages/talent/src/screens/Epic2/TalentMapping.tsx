import { useState, useMemo } from "react";
import { Layout } from "../../components/shell/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { AlertCircle, TrendingUp, Users, ArrowUpRight, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { mockPositions, getCandidatesForPosition } from "../../data/mockTalentData";
import type { Position, CandidateData } from "../../types/talent";
import { NineBoxSidePanel, BoxLimits } from "../../components/NineBoxSidePanel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { getEmployeesByLevel, getClusterStats } from "../../data/mock9BoxData";

// Extended interface for grid mapping
interface GridCandidate extends CandidateData {
  clusterId: string;
}

interface ClusterData {
  id: string;
  name: string;
  performance: "Low" | "Medium" | "High";
  capacity: "Low" | "Medium" | "High";
  colorClass: string; // Using Tailwind classes that map to our variables
  textColorClass: string;
  description: string;
  icon?: string;
}

// Updated Matrix Definition aligned with new Design Tokens
const clusterMatrix: ClusterData[] = [
  // High Performance Row (Y=High)
  { id: "h-l", name: "Sleeping Tiger", performance: "High", capacity: "Low", colorClass: "bg-teal-500", textColorClass: "text-white", description: "High performance but limited potential", icon: "🐯" },
  { id: "h-m", name: "Promotable", performance: "High", capacity: "Medium", colorClass: "bg-emerald-500", textColorClass: "text-white", description: "High performance with potential to grow", icon: "⭐" },
  { id: "h-h", name: "High Potential", performance: "High", capacity: "High", colorClass: "bg-emerald-600", textColorClass: "text-white", description: "Consistently high performance and high potential", icon: "🌟" },
  
  // Medium Performance Row (Y=Medium)
  { id: "m-l", name: "Sleeping Tiger", performance: "Medium", capacity: "Low", colorClass: "bg-teal-500", textColorClass: "text-white", description: "Good performance but limited potential", icon: "🐯" },
  { id: "m-m", name: "Solid Contributor", performance: "Medium", capacity: "Medium", colorClass: "bg-blue-500", textColorClass: "text-white", description: "Reliable performance and steady potential", icon: "💼" },
  { id: "m-h", name: "Promotable", performance: "Medium", capacity: "High", colorClass: "bg-emerald-500", textColorClass: "text-white", description: "Good performance with high potential", icon: "⭐" },
  
  // Low Performance Row (Y=Low)
  { id: "l-l", name: "Unfit", performance: "Low", capacity: "Low", colorClass: "bg-red-500", textColorClass: "text-white", description: "Low performance and low potential", icon: "❌" },
  { id: "l-m", name: "Solid Contributor", performance: "Low", capacity: "Medium", colorClass: "bg-blue-400", textColorClass: "text-white", description: "Developing performance with some potential", icon: "💼" },
  { id: "l-h", name: "Solid Contributor", performance: "Low", capacity: "High", colorClass: "bg-blue-400", textColorClass: "text-white", description: "New or inconsistent with high potential", icon: "💼" },
];

// Helper to determine cluster based on scores
const getClusterId = (performance: number, capacity: number): string => {
  let p = "l";
  let c = "l";

  // Performance (0-120)
  if (performance >= 100) p = "h";
  else if (performance >= 80) p = "m";
  
  // Capacity (0-100)
  if (capacity >= 80) c = "h";
  else if (capacity >= 60) c = "m";

  return `${p}-${c}`;
};

// Helper to generate mock candidates for demo visualization
const generateDemoCandidates = (baseCandidates: CandidateData[]): GridCandidate[] => {
  const realGridCandidates = baseCandidates.map(c => ({
    ...c,
    clusterId: getClusterId(c.eqs?.performance || 0, c.eqs?.competency || 0)
  }));

  // Generate additional random candidates to fill the grid for visualization
  const additionalCount = 47; // To reach ~50 total
  const demoCandidates: GridCandidate[] = Array.from({ length: additionalCount }).map((_, i) => {
    const perf = Math.floor(Math.random() * 50) + 70; // 70-120
    const cap = Math.floor(Math.random() * 60) + 40; // 40-100
    
    return {
      id: `demo-${i}`,
      name: `Employee ${i + 1}`,
      currentPosition: ["Manager", "Senior Manager", "Specialist", "Analyst"][Math.floor(Math.random() * 4)],
      currentDepartment: ["HR", "Finance", "Operations", "IT", "Marketing"][Math.floor(Math.random() * 5)],
      eqs: {
        performance: perf,
        competency: cap,
        total: (perf * 0.25) + (cap * 0.2) + 50 // baseline score
      },
      clusterId: getClusterId(perf, cap),
      // Minimal required fields for type satisfaction
      employeeId: `DEMO${i}`,
      email: `demo${i}@example.com`,
      targetPositionId: "pos-001",
      performanceHistory: [],
      competency: { jobFitScore: cap, assessmentDate: "", targetPosition: "" },
      disciplinaryRecord: { status: "Clean" },
      experience: { yearsInJobFamily: 0, yearsInCompany: 0, totalYearsExperience: 0, relevantPositions: [] },
      training: { hasRelevantTraining: false, hasRelevantCertification: false, trainings: [], certifications: [] },
      aspirations: { sources: [], details: [] },
      education: { highest: "S1", institution: "", graduationYear: 2020 },
      readiness: "Ready in 1-2 years",
      keyStrengths: [],
      developmentAreas: [],
      hasDevelopmentPlan: false
    } as unknown as GridCandidate;
  });

  return [...realGridCandidates, ...demoCandidates];
};

type ViewMode = "grid" | "list";

export function TalentMapping() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedPosition, setSelectedPosition] = useState<Position>(mockPositions[0]);
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(null);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<GridCandidate | null>(null);
  const [calibrationReason, setCalibrationReason] = useState("");
  const [newCluster, setNewCluster] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("bod-2");
  const [selectedCompany, setSelectedCompany] = useState("pt-api");

  // Use realistic mock data based on level and company selection
  const nineBoxEmployees = useMemo(() => {
    return getEmployeesByLevel(selectedLevel, selectedCompany);
  }, [selectedLevel, selectedCompany]);

  // Get real candidates and merge with demo data
  const gridCandidates = useMemo(() => {
    // If we have realistic data, use it; otherwise fallback to generated data
    if (nineBoxEmployees.length > 0) {
      return nineBoxEmployees.map(emp => ({
        id: emp.id,
        employeeId: emp.nik,
        name: emp.name,
        currentPosition: emp.position,
        currentDepartment: emp.department,
        currentCompany: emp.company,
        clusterId: emp.cluster,
        eqs: {
          performance: emp.performanceScore,
          competency: emp.capacityScore,
          total: (emp.performanceScore * 0.5) + (emp.capacityScore * 0.5),
        },
        // Additional required fields for Typescript satisfaction
        email: `${emp.nik.toLowerCase()}@company.com`,
        targetPositionId: "pos-001",
        performanceHistory: [],
        competency: { jobFitScore: emp.capacityScore, assessmentDate: "", targetPosition: "" },
        disciplinaryRecord: { status: "Clean" },
        experience: { yearsInJobFamily: 5, yearsInCompany: 5, totalYearsExperience: 10, relevantPositions: [] },
        training: { hasRelevantTraining: true, hasRelevantCertification: true, trainings: [], certifications: [] },
        aspirations: { sources: [], details: [] },
        education: { highest: "S2", institution: "Top University", graduationYear: 2015 },
        readiness: "Ready Now",
        keyStrengths: ["Leadership", "Strategic Thinking", "Communication"],
        developmentAreas: ["Technical Skills", "Change Management"],
        hasDevelopmentPlan: true,
        currentGrade: "GM",
        currentJobFamily: "Management",
      } as GridCandidate));
    }
    
    // Fallback to original demo data generation
    const realCandidates = getCandidatesForPosition(selectedPosition.id);
    return generateDemoCandidates(realCandidates);
  }, [nineBoxEmployees, selectedPosition.id]);

  // Convert gridCandidates to side panel format with real override info
  const convertToSidePanelEmployees = (clusterId: string) => {
    return gridCandidates
      .filter(emp => emp.clusterId === clusterId)
      .map((emp) => {
        // Find the original employee data to get override info
        const originalEmp = nineBoxEmployees.find(e => e.id === emp.id);
        
        return {
          id: emp.id,
          name: emp.name,
          avatar: emp.avatar,
          position: emp.currentPosition,
          department: emp.currentDepartment,
          company: emp.currentCompany || "InJourney Group",
          performanceScore: emp.eqs?.performance || 0,
          potentialScore: emp.eqs?.competency || 0,
          isOverridden: originalEmp?.isOverridden || false,
          overrideInfo: originalEmp?.overrideInfo,
          email: emp.email,
        };
      });
  };

  const handleClusterClick = (cluster: ClusterData) => {
    setSelectedCluster(cluster);
    setShowEmployeeList(true);
  };

  const handleCalibrateClick = (employee: GridCandidate) => {
    setSelectedEmployee(employee);
    setShowCalibrationModal(true);
  };

  const getClusterEmployees = (clusterId: string) => {
    return gridCandidates.filter(emp => emp.clusterId === clusterId);
  };

  const getClusterByPerformanceCapacity = (perf: string, cap: string) => {
    return clusterMatrix.find(c => 
      c.performance.toLowerCase()[0] === perf.toLowerCase()[0] && 
      c.capacity.toLowerCase()[0] === cap.toLowerCase()[0]
    );
  };

  const totalEmployees = gridCandidates.length;
  
  // Alert Threshold Calculations
  const unfitCount = gridCandidates.filter(c => c.clusterId === "l-l").length;
  const unfitPercentage = (unfitCount / totalEmployees) * 100;
  
  const sleepingTigerCount = gridCandidates.filter(c => c.clusterId === "h-l" || c.clusterId === "m-l").length;
  const sleepingTigerPercentage = (sleepingTigerCount / totalEmployees) * 100;
  
  const highFlyerCount = gridCandidates.filter(c => c.clusterId === "h-h" || c.clusterId === "h-m" || c.clusterId === "m-h").length;
  const highFlyerPercentage = (highFlyerCount / totalEmployees) * 100;
  
  // Alert Flags
  const alerts = {
    unfit: unfitPercentage > 5, // Critical > 5%
    sleepingTiger: sleepingTigerPercentage > 10, // Warning > 10%
    highFlyer: highFlyerPercentage < 10 // Warning < 10%
  };

  // Define box limits for each cluster
  const BOX_LIMITS: Record<string, BoxLimits> = {
    "h-h": { performance: { lower: 100, upper: 120 }, potential: { lower: 80, upper: 100 } },
    "h-m": { performance: { lower: 100, upper: 120 }, potential: { lower: 60, upper: 80 } },
    "h-l": { performance: { lower: 100, upper: 120 }, potential: { lower: 0, upper: 60 } },
    "m-h": { performance: { lower: 80, upper: 100 }, potential: { lower: 80, upper: 100 } },
    "m-m": { performance: { lower: 80, upper: 100 }, potential: { lower: 60, upper: 80 } },
    "m-l": { performance: { lower: 80, upper: 100 }, potential: { lower: 0, upper: 60 } },
    "l-h": { performance: { lower: 0, upper: 80 }, potential: { lower: 80, upper: 100 } },
    "l-m": { performance: { lower: 0, upper: 80 }, potential: { lower: 60, upper: 80 } },
    "l-l": { performance: { lower: 0, upper: 80 }, potential: { lower: 0, upper: 60 } },
  };

  // Job levels for InJourney Group
  const JOB_LEVELS = [
    { id: "bod", name: "BOD (Board of Directors)" },
    { id: "bod-1", name: "BOD-1" },
    { id: "bod-2", name: "BOD-2" },
    { id: "kj-10-11", name: "KJ 10-11" },
    { id: "kj-12-13", name: "Pratama B (KJ 12-13)" },
    { id: "kj-14-15", name: "KJ 14-15" },
    { id: "kj-16-17", name: "KJ 16-17" },
  ];

  // Mock companies
  const COMPANIES = [
    { id: "pt-api", name: "PT API" },
    { id: "pt-inka", name: "PT INKA" },
    { id: "pt-kai", name: "PT KAI" },
    { id: "injourney-group", name: "InJourney Group" },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-heading font-semibold text-foreground">Talent Classification</h1>
          <p className="text-muted-foreground">
            Employee Performance & Potential Classification (9Boxes)
          </p>
        </div>

        {/* Filter Bar */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Company/Unit:</span>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANIES.map(company => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-6 w-px bg-border hidden md:block" />

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Job Level:</span>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_LEVELS.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:ml-auto flex gap-3">
                <Button variant="outline" size="sm" className="gap-2 bg-background hover:bg-muted hover:text-foreground">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-background hover:bg-muted hover:text-foreground">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Candidates</p>
                  <h3 className="text-2xl font-semibold text-foreground">{totalEmployees}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-border shadow-sm hover:shadow-md transition-shadow ${alerts.highFlyer ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alerts.highFlyer ? "bg-white/50" : "bg-white/60"
                }`}>
                  {alerts.highFlyer ? (
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                  ) : (
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${alerts.highFlyer ? "text-amber-700" : "text-emerald-700"}`}>
                    High Flyers
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-2xl font-semibold ${alerts.highFlyer ? "text-amber-700" : "text-emerald-700"}`}>
                      {highFlyerCount}
                    </h3>
                    <span className={`text-xs ${alerts.highFlyer ? "text-amber-700/80" : "text-emerald-700/80"}`}>
                      ({highFlyerPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-border shadow-sm hover:shadow-md transition-shadow ${alerts.sleepingTiger ? "bg-amber-50 border-amber-200" : "bg-primary/10 border-primary/20"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alerts.sleepingTiger ? "bg-white/50" : "bg-white/60"
                }`}>
                  {alerts.sleepingTiger ? (
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Users className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${alerts.sleepingTiger ? "text-amber-700" : "text-primary"}`}>
                    Sleeping Tigers
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-2xl font-semibold ${alerts.sleepingTiger ? "text-amber-700" : "text-primary"}`}>
                      {sleepingTigerCount}
                    </h3>
                    <span className={`text-xs ${alerts.sleepingTiger ? "text-amber-700/80" : "text-primary/80"}`}>
                      ({sleepingTigerPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-border shadow-sm hover:shadow-md transition-shadow ${alerts.unfit ? "bg-red-50 border-red-200" : "bg-muted border-border"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alerts.unfit ? "bg-white/50" : "bg-white/60"
                }`}>
                  <AlertCircle className={`w-6 h-6 ${alerts.unfit ? "text-red-500" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${alerts.unfit ? "text-red-700" : "text-muted-foreground"}`}>
                    Unfit / Under
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-2xl font-semibold ${alerts.unfit ? "text-red-700" : "text-muted-foreground"}`}>
                      {unfitCount}
                    </h3>
                    <span className={`text-xs ${alerts.unfit ? "text-red-700/80" : "text-muted-foreground"}`}>
                      ({unfitPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 9-Box Grid */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Talent Distribution Matrix</h3>
                  <p className="text-muted-foreground mt-1">
                    Click on a box to view employees or perform calibration
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="bg-card hover:bg-muted hover:text-foreground"
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
              </div>

              <div className="relative pl-[48px]">
                {/* Y-axis label */}
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-[40px]">
                  <div className="flex flex-col items-center gap-4 h-full justify-center">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground -rotate-45" />
                    <p 
                      className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      Performance (Kinerja)
                    </p>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* High Performance Row */}
                  {["Low", "Medium", "High"].map((capacity) => {
                    const performance = "High";
                    const cluster = getClusterByPerformanceCapacity(performance, capacity);
                    if (!cluster) return null;
                    const count = getClusterEmployees(cluster.id).length;
                    
                    return (
                      <div
                        key={cluster.id}
                        className={`${cluster.colorClass} rounded-lg border border-transparent hover:border-white/20 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg overflow-hidden group`}
                        onClick={() => handleClusterClick(cluster)}
                      >
                        <div className="p-4 h-[180px] flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <p className={`text-base font-semibold ${cluster.textColorClass}`}>
                              {cluster.name}
                            </p>
                            {cluster.icon && <span className="text-2xl filter drop-shadow-sm">{cluster.icon}</span>}
                          </div>
                          
                          {/* Avatar preview */}
                          <div className="flex flex-wrap gap-2 content-start flex-1 py-2">
                            {getClusterEmployees(cluster.id).slice(0, 12).map((emp, i) => {
                                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                                return (
                                  <div 
                                    key={i} 
                                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shadow-sm" 
                                    title={emp.name}
                                  >
                                    <span className="text-[10px] font-bold">{initials}</span>
                                  </div>
                                );
                            })}
                            {count > 12 && (
                              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
                                <span className="text-[10px] font-bold">+{count - 12}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className={`w-4 h-4 ${cluster.textColorClass} opacity-80`} />
                            <p className={`text-sm font-bold ${cluster.textColorClass}`}>
                              {count} pekerja
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Medium Performance Row */}
                  {["Low", "Medium", "High"].map((capacity) => {
                    const performance = "Medium";
                    const cluster = getClusterByPerformanceCapacity(performance, capacity);
                    if (!cluster) return null;
                    const count = getClusterEmployees(cluster.id).length;

                    return (
                      <div
                        key={cluster.id}
                        className={`${cluster.colorClass} rounded-lg border border-transparent hover:border-white/20 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg overflow-hidden group`}
                        onClick={() => handleClusterClick(cluster)}
                      >
                        <div className="p-4 h-[180px] flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <p className={`text-base font-semibold ${cluster.textColorClass}`}>
                              {cluster.name}
                            </p>
                            {cluster.icon && <span className="text-2xl filter drop-shadow-sm">{cluster.icon}</span>}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 content-start flex-1 py-2">
                            {getClusterEmployees(cluster.id).slice(0, 12).map((emp, i) => {
                                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                                return (
                                  <div 
                                    key={i} 
                                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shadow-sm" 
                                    title={emp.name}
                                  >
                                    <span className="text-[10px] font-bold">{initials}</span>
                                  </div>
                                );
                            })}
                            {count > 12 && (
                              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
                                <span className="text-[10px] font-bold">+{count - 12}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className={`w-4 h-4 ${cluster.textColorClass} opacity-80`} />
                            <p className={`text-sm font-bold ${cluster.textColorClass}`}>
                              {count} pekerja
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Low Performance Row */}
                  {["Low", "Medium", "High"].map((capacity) => {
                    const performance = "Low";
                    const cluster = getClusterByPerformanceCapacity(performance, capacity);
                    if (!cluster) return null;
                    const count = getClusterEmployees(cluster.id).length;

                    return (
                      <div
                        key={cluster.id}
                        className={`${cluster.colorClass} rounded-lg border border-transparent hover:border-white/20 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg overflow-hidden group`}
                        onClick={() => handleClusterClick(cluster)}
                      >
                        <div className="p-4 h-[180px] flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <p className={`text-base font-semibold ${cluster.textColorClass}`}>
                              {cluster.name}
                            </p>
                            {cluster.icon && <span className="text-2xl filter drop-shadow-sm">{cluster.icon}</span>}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 content-start flex-1 py-2">
                            {getClusterEmployees(cluster.id).slice(0, 12).map((emp, i) => {
                                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                                return (
                                  <div 
                                    key={i} 
                                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shadow-sm" 
                                    title={emp.name}
                                  >
                                    <span className="text-[10px] font-bold">{initials}</span>
                                  </div>
                                );
                            })}
                            {count > 12 && (
                              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
                                <span className="text-[10px] font-bold">+{count - 12}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className={`w-4 h-4 ${cluster.textColorClass} opacity-80`} />
                            <p className={`text-sm font-bold ${cluster.textColorClass}`}>
                              {count} pekerja
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-axis label */}
                <div className="flex items-center justify-center mt-6 gap-2">
                    <p className="text-sm font-medium text-muted-foreground">Potential (Potensi)</p>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground rotate-45" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel for Employee List */}
      {selectedCluster && (
        <NineBoxSidePanel
          open={showEmployeeList}
          onOpenChange={setShowEmployeeList}
          boxName={selectedCluster.name}
          boxDescription={selectedCluster.description}
          boxColor={selectedCluster.colorClass}
          employees={convertToSidePanelEmployees(selectedCluster.id)}
          limits={BOX_LIMITS[selectedCluster.id]}
          onCalibrateClick={handleCalibrateClick}
        />
      )}

      {/* Calibration Modal */}
      <Dialog open={showCalibrationModal} onOpenChange={setShowCalibrationModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Calibrate Employee</DialogTitle>
            <DialogDescription>
              Adjust the 9-box placement for <span className="font-medium text-foreground">{selectedEmployee?.name}</span>. This will override the calculated position.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-lg border border-border">
                {selectedEmployee?.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-medium text-foreground">{selectedEmployee?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedEmployee?.currentPosition}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-cluster">New Classification</Label>
              <Select value={newCluster} onValueChange={setNewCluster}>
                <SelectTrigger id="new-cluster" className="bg-background">
                  <SelectValue placeholder="Select new 9-box position" />
                </SelectTrigger>
                <SelectContent>
                  {clusterMatrix.map((cluster) => (
                    <SelectItem key={cluster.id} value={cluster.id}>
                      {cluster.name} ({cluster.performance[0]}-{cluster.capacity[0]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason">Justification</Label>
              <Textarea 
                id="reason" 
                placeholder="Please provide a reason for this calibration..." 
                className="resize-none bg-background"
                rows={3}
                value={calibrationReason}
                onChange={(e) => setCalibrationReason(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalibrationModal(false)}>Cancel</Button>
            <Button onClick={() => {
                toast.success("Calibration submitted successfully");
                setShowCalibrationModal(false);
                setCalibrationReason("");
                setNewCluster("");
            }}>Confirm Calibration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
