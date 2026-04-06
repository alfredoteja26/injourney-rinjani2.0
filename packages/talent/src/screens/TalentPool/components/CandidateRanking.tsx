import { 
  Users, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Download, 
  RotateCw,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Card } from "../../../components/ui/card";
import { Band, TalentPoolCandidate } from "../types";
import { NineBoxBadge, TopTalentTag, RiskDot } from "./Badges";
import { cn } from "../../../components/ui/utils";

interface CandidateRankingProps {
  band: Band;
  company: string;
  candidates: TalentPoolCandidate[];
  onViewProfile: (candidate: TalentPoolCandidate) => void;
}

export function CandidateRanking({ band, company, candidates, onViewProfile }: CandidateRankingProps) {
  // Sort candidates by EQS Score (descending)
  const sortedCandidates = [...candidates].sort((a, b) => b.eqs_score.total_score - a.eqs_score.total_score);

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50">
      
      {/* Detail Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-800">{band.name}</h1>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                {band.level}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Building2Icon className="w-4 h-4" />
                {company}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {candidates.length} Candidates Available
              </span>
            </div>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            RISK ASSESSMENT: CRITICAL
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Level</p>
            <p className="text-sm font-bold text-slate-700">{band.level}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Grade</p>
            <p className="text-sm font-bold text-slate-700">{band.name}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Status</p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <p className="text-sm font-bold text-slate-700">Active</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
             <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Last Updated</p>
             <p className="text-sm font-bold text-slate-700">2026-02-02</p>
          </div>
        </div>
      </div>

      {/* Ranking List Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Candidate Ranking</h2>
          <p className="text-sm text-slate-500">Ranking kandidat berdasarkan EQS Score</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCw className="w-3.5 h-3.5" /> Recalculate EQS
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Candidates List */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-4">
        {sortedCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="p-0 overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-stretch">
              
              {/* Rank Column */}
              <div className="w-20 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm",
                  index === 0 ? "bg-amber-100 text-amber-700 ring-4 ring-amber-50" :
                  index === 1 ? "bg-slate-200 text-slate-700 ring-4 ring-slate-100" :
                  index === 2 ? "bg-orange-100 text-orange-800 ring-4 ring-orange-50" :
                  "bg-white border border-slate-200 text-slate-500"
                )}>
                  {index + 1}
                </div>
                <span className="text-[10px] text-slate-400 font-medium mt-2 uppercase tracking-wide">Rank</span>
              </div>

              {/* Info Column */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  
                  <div className="flex gap-4">
                    <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name}&background=random`} />
                      <AvatarFallback>{candidate.avatar_url}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">{candidate.name}</h3>
                        {candidate.is_top_talent && <TopTalentTag />}
                        <RiskDot level={candidate.risk_profile} />
                      </div>
                      <p className="text-sm text-slate-500 font-mono mb-4">{candidate.employee_id}</p>
                      
                      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                         <div>
                           <p className="text-xs text-slate-400 font-medium mb-1">Current Position</p>
                           <p className="text-sm font-semibold text-slate-700">{candidate.position}</p>
                         </div>
                         <div>
                           <p className="text-xs text-slate-400 font-medium mb-1">Company</p>
                           <p className="text-sm font-semibold text-slate-700">{candidate.company}</p>
                         </div>
                         <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">9-Box Cluster</p>
                            <NineBoxBadge cluster={candidate.talent_cluster} />
                         </div>
                         <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">Readiness</p>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              Ready Now
                            </Badge>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Column */}
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1 mb-1">
                      <span className={cn(
                        "text-3xl font-bold",
                        candidate.eqs_score.total_score >= 90 ? "text-emerald-600" :
                        candidate.eqs_score.total_score >= 80 ? "text-blue-600" : "text-slate-700"
                      )}>
                        {candidate.eqs_score.total_score.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-400 font-medium">/ 100</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mb-6">EQS Score</p>
                    
                    <Button 
                      onClick={() => onViewProfile(candidate)}
                      className="gap-2 shadow-sm"
                    >
                      <Eye className="w-4 h-4" /> Lihat Profil Pekerja
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        ))}
        
        {candidates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Users className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-lg font-semibold text-slate-800 mb-2">No Candidates Found</h3>
             <p className="text-slate-500 max-w-sm mx-auto">
               There are no candidates currently assigned to or eligible for this job band in the selected company.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Building2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )
}
