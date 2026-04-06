import { useState } from "react";
import { 
  X, 
  MapPin, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  BookOpen, 
  Briefcase,
  Target
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Card } from "../../components/ui/card";
import { NineBoxBadge, TopTalentTag, RiskDot, TRProposedTag, ShortlistedTag } from "./components/Badges";
import { TalentPoolCandidate } from "./types";
import { cn } from "../../components/ui/utils";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface TalentProfileDetailProps {
  candidate: TalentPoolCandidate;
  onClose: () => void;
}

export function TalentProfileDetail({ candidate, onClose }: TalentProfileDetailProps) {
  if (!candidate || !candidate.eqs_score) {
    return null; 
  }

  const [activeTab, setActiveTab] = useState("eqs");

  // Format data for Radar Chart
  const radarData = candidate.eqs_score.components.map(comp => ({
    subject: comp.component_type.charAt(0).toUpperCase() + comp.component_type.slice(1),
    fullMark: 100,
    score: comp.raw_value
  }));

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
        <div className="flex gap-4">
          <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name}&background=00495d&color=fff`} />
            <AvatarFallback>{candidate.avatar_url}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{candidate.name}</h2>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <Briefcase className="w-3.5 h-3.5" />
              {candidate.position}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{candidate.company} • {candidate.unit}</p>
            
            <div className="flex items-center gap-2 mt-3">
              <NineBoxBadge cluster={candidate.talent_cluster} />
              {candidate.is_top_talent && <TopTalentTag />}
              {candidate.is_tr_proposed && <TRProposedTag />}
              {candidate.is_hcbp_shortlisted && <ShortlistedTag />}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                Risk: <RiskDot level={candidate.risk_profile} /> {candidate.risk_profile}
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200/50">
          <X className="w-5 h-5 text-slate-500" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-transparent w-full justify-start h-12 p-0 space-x-6">
            {["EQS", "Career", "Qualification", "Aspiration", "Personal"].map(tab => (
              <TabsTrigger 
                key={tab} 
                value={tab.toLowerCase()} 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-0 pb-3 font-medium text-slate-500 hover:text-slate-700"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 bg-slate-50/30">
        <div className="p-6">
          
          {/* EQS Tab */}
          {activeTab === "eqs" && (
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="p-6 border-slate-200 shadow-sm bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total EQS Score</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h1 className="text-4xl font-bold text-primary">{candidate.eqs_score.total_score}</h1>
                      <span className="text-sm text-slate-400 font-medium">/ 100</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                    {candidate.eqs_score.eqs_band.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Calculated: {candidate.eqs_score.calculated_at}
                </p>
              </Card>

              {/* Radar Chart */}
              <Card className="p-4 border-slate-200 shadow-sm bg-white flex justify-center h-[332px]">
                <div className="w-[300px] h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={candidate.name}
                        dataKey="score"
                        stroke="#00495d"
                        strokeWidth={2}
                        fill="#00495d"
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Component Breakdown */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm">Component Breakdown</h3>
                {candidate.eqs_score.components.map((comp) => (
                  <Card key={comp.id} className="p-3 border-slate-200 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-medium text-slate-700 capitalize">{comp.component_type}</span>
                        <span className="text-xs text-slate-400 ml-2">Weight: {comp.weight}%</span>
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {comp.raw_value} <span className="text-slate-400 font-normal">→ {comp.weighted_value.toFixed(1)}</span>
                      </div>
                    </div>
                    <Progress value={comp.raw_value} className="h-2" />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Career Tab */}
          {activeTab === "career" && (
            <div className="relative pl-6 space-y-8 border-l-2 border-slate-200 ml-3">
              {candidate.career_history.map((job) => (
                <div key={job.id} className="relative">
                  <div className={cn(
                    "absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 shadow-sm",
                    job.is_current ? "bg-primary border-white" : "bg-slate-300 border-white"
                  )} />
                  <Card className="p-4 border-slate-200 shadow-sm bg-white">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800">{job.role}</h3>
                      {job.is_current && <Badge variant="secondary" className="text-[10px]">Current</Badge>}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{job.company}</p>
                    <p className="text-xs text-slate-400 mt-1">{job.duration}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <Badge variant="outline" className="text-[10px] mb-2">{job.assignment_type}</Badge>
                      <ul className="list-disc list-outside pl-4 space-y-1">
                        {job.achievements.map((ach, i) => (
                          <li key={i} className="text-xs text-slate-600 leading-relaxed">{ach}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Qualification Tab */}
          {activeTab === "qualification" && (
            <div className="space-y-6">
              <section>
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Education
                </h3>
                <div className="space-y-3">
                  {candidate.education.map((edu, i) => (
                    <Card key={i} className="p-4 border-slate-200 bg-white">
                      <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                      <p className="text-sm text-slate-600">{edu.institution}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-500">
                        <span>Year: {edu.year}</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Certifications
                </h3>
                <div className="space-y-3">
                  {candidate.certifications.map((cert, i) => (
                    <Card key={i} className="p-4 border-slate-200 bg-white">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">{cert.name}</h4>
                        <Badge variant="outline" className={cn("text-[10px]", cert.status === "valid" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50")}>
                          {cert.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{cert.issuer}</p>
                      <p className="text-xs text-slate-400 mt-1">Valid: {cert.validity}</p>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Aspiration Tab */}
          {activeTab === "aspiration" && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Aspiration Score</h3>
                  <div className="text-3xl font-bold text-accent">{candidate.aspiration.score} <span className="text-sm text-white/50 font-normal">/ 100</span></div>
                </div>
                <Progress value={candidate.aspiration.score} className="h-2 bg-white/20" indicatorClassName="bg-accent" />
              </Card>

              <Card className="p-4 border-slate-200 bg-white space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Individual Aspiration</p>
                    <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 font-medium">
                      {candidate.aspiration.individual}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Supervisor Recommendation</p>
                    <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 font-medium">
                      {candidate.aspiration.supervisor}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Unit Recommendation</p>
                    <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 font-medium">
                      {candidate.aspiration.unit}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Personal Tab */}
          {activeTab === "personal" && (
            <div className="space-y-4">
              <Card className="p-4 border-slate-200 bg-white">
                <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Basic Information</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Date of Birth</p>
                    <p className="font-medium text-slate-700">{candidate.personal_info.dob}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Gender</p>
                    <p className="font-medium text-slate-700">{candidate.personal_info.gender}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Hire Date</p>
                    <p className="font-medium text-slate-700">{candidate.personal_info.hire_date}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-slate-200 bg-white">
                <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Contact Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{candidate.personal_info.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{candidate.personal_info.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{candidate.personal_info.address}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-white flex gap-3">
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          <Target className="w-4 h-4 mr-2" /> Shortlist
        </Button>
        <Button variant="outline" className="flex-1">
          View History
        </Button>
      </div>

    </div>
  );
}
