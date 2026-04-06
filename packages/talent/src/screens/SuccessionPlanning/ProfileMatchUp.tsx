import { useState } from "react";
import { 
  X, 
  FileDown, 
  ChevronRight,
  User,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { RankingBadge, TopTalentBadge, RiskProfileBadge, ReadinessBadge } from "./components/Badges";
import { Candidate, Position } from "./types";
import { cn } from "../../components/ui/utils";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { mockRequirementCompetencies } from "./mockData";

interface ProfileMatchUpProps {
  candidates: Candidate[];
  position: Position;
  onClose: () => void;
}

export function ProfileMatchUp({ candidates, position, onClose }: ProfileMatchUpProps) {
  const [activeTab, setActiveTab] = useState("summary");

  // Prepare Data for Radar Chart
  const radarData = Object.keys(mockRequirementCompetencies).map(key => {
    const dataPoint: any = {
      subject: key,
      fullMark: 3,
      Requirement: (mockRequirementCompetencies as any)[key]
    };
    
    candidates.forEach((cand) => {
      dataPoint[cand.name] = cand.competencies ? cand.competencies[key] || 0 : 0;
    });
    
    return dataPoint;
  });

  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#a855f7"]; // Green, Blue, Amber, Purple

  // Prepare Data for Performance Line Chart
  // Assuming all candidates have same years for simplicity in demo
  const performanceData = candidates[0].performanceHistory?.map((h, idx) => {
    const point: any = { year: h.year };
    candidates.forEach(cand => {
      point[cand.name] = cand.performanceHistory?.[idx]?.score || 0;
    });
    return point;
  }) || [];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[95vw] h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Profile Match-Up</h2>
            <p className="text-sm text-slate-500">Comparing candidates for <span className="font-semibold text-slate-700">{position.title}</span></p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown className="w-4 h-4" /> Export PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5 text-slate-500" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="px-6 pt-2 border-b bg-white shadow-sm z-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent border-b border-transparent w-full justify-start h-12 p-0 space-x-6 overflow-x-auto">
                {["Summary", "Competency", "Performance", "Career", "Qualifications", "Aspiration", "Gap Analysis"].map(tab => (
                   <TabsTrigger 
                    key={tab} 
                    value={tab.toLowerCase().replace(" ", "")} 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-0 pb-3 font-medium text-slate-500"
                   >
                     {tab}
                   </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Comparison Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            
            {/* Radar Chart View for Competency */}
            {activeTab === "competency" && (
              <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[500px] w-full">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Leadership Competency Comparison</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 3]} />
                    <Radar name="Requirement" dataKey="Requirement" stroke="#94a3b8" strokeDasharray="5 5" fill="#94a3b8" fillOpacity={0.1} />
                    {candidates.map((cand, idx) => (
                      <Radar 
                        key={cand.id} 
                        name={cand.name} 
                        dataKey={cand.name} 
                        stroke={colors[idx % colors.length]} 
                        fill={colors[idx % colors.length]} 
                        fillOpacity={0.2} 
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Performance Chart View */}
            {activeTab === "performance" && (
              <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px] w-full">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">3-Year Performance History</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {candidates.map((cand, idx) => (
                      <Line 
                        key={cand.id} 
                        type="monotone" 
                        dataKey={cand.name} 
                        stroke={colors[idx % colors.length]} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className={cn(
              "grid gap-6",
              candidates.length === 1 ? "grid-cols-1" :
              candidates.length === 2 ? "grid-cols-2" :
              candidates.length === 3 ? "grid-cols-3" :
              "grid-cols-4"
            )}>
              
              {candidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  {/* Candidate Header - Sticky */}
                  <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center bg-white sticky top-0 z-10">
                    <Avatar className="w-16 h-16 mb-3 border-4 border-slate-50 shadow-sm">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name}&background=random`} />
                      <AvatarFallback>{candidate.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                      {candidate.isTopTalent && <TopTalentBadge />}
                    </div>
                    
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">{candidate.currentPosition}</p>
                    
                    <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                      {candidate.ranking && <RankingBadge rank={candidate.ranking} />}
                      <RiskProfileBadge level={candidate.riskProfile} />
                    </div>

                    <div className="w-full bg-slate-50 rounded-lg p-2 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">EQS Score</span>
                      <span className="text-lg font-bold text-primary">{candidate.eqsScore}</span>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 space-y-6 flex-1">
                    {activeTab === "summary" && (
                      <div className="space-y-6">
                        {/* Readiness */}
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Readiness</p>
                          <ReadinessBadge level={candidate.readiness} />
                        </div>

                        {/* EQS Breakdown */}
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">EQS Breakdown</p>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Performance (25%)</span>
                                <span className="font-semibold text-slate-800">95</span>
                              </div>
                              <Progress value={95} className="h-1.5" indicatorClassName="bg-green-500" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Competency (20%)</span>
                                <span className="font-semibold text-slate-800">88</span>
                              </div>
                              <Progress value={88} className="h-1.5" indicatorClassName="bg-blue-500" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Experience (15%)</span>
                                <span className="font-semibold text-slate-800">90</span>
                              </div>
                              <Progress value={90} className="h-1.5" indicatorClassName="bg-indigo-500" />
                            </div>
                             <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Education (15%)</span>
                                <span className="font-semibold text-slate-800">92</span>
                              </div>
                              <Progress value={92} className="h-1.5" indicatorClassName="bg-purple-500" />
                            </div>
                          </div>
                        </div>

                        {/* Gap Summary */}
                        <div>
                           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Gaps</p>
                           <div className="flex items-center gap-2 text-sm">
                             <div className={cn("w-2 h-2 rounded-full", candidate.gapCount && candidate.gapCount > 2 ? "bg-red-500" : "bg-amber-500")} />
                             <span>{candidate.gapCount} Identified Gaps</span>
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "competency" && (
                      <div className="space-y-4">
                        {candidate.competencies && Object.entries(candidate.competencies).map(([comp, score]) => (
                          <div key={comp} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium text-slate-700 truncate pr-2" title={comp}>{comp}</span>
                              <span className={cn("font-bold", score < 2 ? "text-red-500" : "text-green-600")}>{score}/3</span>
                            </div>
                            <Progress value={(score / 3) * 100} className={cn("h-1.5", score < 2 ? "bg-red-100" : "bg-green-100")} indicatorClassName={score < 2 ? "bg-red-500" : "bg-green-500"} />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeTab === "performance" && (
                       <div className="space-y-3">
                         {candidate.performanceHistory?.map((hist) => (
                           <div key={hist.year} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                              <div>
                                <span className="text-sm font-bold text-slate-700">{hist.year}</span>
                                <p className="text-xs text-slate-500">{hist.rating}</p>
                              </div>
                              <div className="text-right">
                                <span className={cn("text-lg font-bold", hist.score >= 90 ? "text-green-600" : "text-slate-800")}>{hist.score}</span>
                              </div>
                           </div>
                         ))}
                       </div>
                    )}

                    {activeTab === "career" && (
                       <div className="space-y-4 relative pl-4 border-l-2 border-slate-100 ml-2">
                         {candidate.careerHistory?.map((career, i) => (
                           <div key={i} className="relative">
                             <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                             <h4 className="text-sm font-bold text-slate-800">{career.role}</h4>
                             <p className="text-xs text-slate-600 font-medium">{career.company}</p>
                             <p className="text-xs text-slate-400 mt-1">{career.duration}</p>
                           </div>
                         ))}
                       </div>
                    )}

                    {activeTab === "qualifications" && (
                       <div className="space-y-4">
                         <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Education</p>
                            <div className="space-y-2">
                              {candidate.education?.map((edu, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                   <div className="flex gap-3">
                                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0">
                                       <BookOpen className="w-4 h-4 text-slate-500" />
                                     </div>
                                     <div>
                                       <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                                       <p className="text-xs text-slate-600">{edu.institution}, {edu.year}</p>
                                     </div>
                                   </div>
                                </div>
                              ))}
                            </div>
                         </div>
                       </div>
                    )}
                    
                    {activeTab === "aspiration" && (
                      <div className="space-y-3">
                        <div className="p-3 border border-slate-200 rounded-lg">
                          <p className="text-xs text-slate-400 mb-1">Individual Aspiration</p>
                          <p className="text-sm font-medium text-slate-800">{candidate.aspirations?.individual}</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded-lg">
                          <p className="text-xs text-slate-400 mb-1">Supervisor Recommendation</p>
                          <p className="text-sm font-medium text-slate-800">{candidate.aspirations?.supervisor}</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded-lg">
                          <p className="text-xs text-slate-400 mb-1">Unit Recommendation</p>
                          <p className="text-sm font-medium text-slate-800">{candidate.aspirations?.unit}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "gapanalysis" && (
                      <div className="space-y-3">
                        {candidate.gaps?.map((gap, i) => (
                          <div key={i} className={cn(
                            "p-3 rounded-lg border flex items-start gap-3",
                            gap.severity === "critical" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
                          )}>
                             {gap.severity === "critical" ? 
                               <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> : 
                               <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                             }
                             <div>
                               <p className={cn("text-sm font-bold", gap.severity === "critical" ? "text-red-700" : "text-amber-700")}>
                                 {gap.competency}
                               </p>
                               <p className={cn("text-xs mt-1", gap.severity === "critical" ? "text-red-600" : "text-amber-600")}>
                                 {gap.severity === "critical" ? "Critical Gap (>20%)" : "Minor Gap (10-20%)"}
                               </p>
                             </div>
                          </div>
                        ))}
                        {(!candidate.gaps || candidate.gaps.length === 0) && (
                          <div className="text-center p-6 text-slate-400">
                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                            <p className="text-sm">No significant gaps identified</p>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
