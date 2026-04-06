import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { NineBoxBadge, TopTalentTag, RiskDot, TRProposedTag, ShortlistedTag } from "./components/Badges";
import { TalentPoolCandidate } from "./types";
import { cn } from "../../components/ui/utils";

interface PoolListViewProps {
  candidates: TalentPoolCandidate[];
  onSelectCandidate: (candidate: TalentPoolCandidate) => void;
}

export function PoolListView({ candidates, onSelectCandidate }: PoolListViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    topTalent: false,
    trProposed: false,
    shortlisted: false
  });

  // Basic filtering logic
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filters.topTalent && !c.is_top_talent) return false;
    if (filters.trProposed && !c.is_tr_proposed) return false;
    if (filters.shortlisted && !c.is_hcbp_shortlisted) return false;
    
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Row 1: Search & Dropdowns */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name or position..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="injourney">InJourney Holding</SelectItem>
              <SelectItem value="api">Angkasa Pura</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hc">Human Capital</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="EQS Band" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hq">Highly Qualified</SelectItem>
              <SelectItem value="q">Qualified</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1" />
          <Button variant="outline" className="text-slate-600">
            <Filter className="w-4 h-4 mr-2" /> More
          </Button>
        </div>

        {/* Row 2: Toggles */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 mr-2">Quick Filters:</span>
          
          <button 
            onClick={() => setFilters(prev => ({ ...prev, topTalent: !prev.topTalent }))}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5",
              filters.topTalent 
                ? "bg-orange-50 border-orange-200 text-orange-700" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <span className="text-orange-500">⭐</span> Top Talent
          </button>

          <button 
            onClick={() => setFilters(prev => ({ ...prev, trProposed: !prev.trProposed }))}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5",
              filters.trProposed 
                ? "bg-amber-50 border-amber-200 text-amber-700" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <span className="text-amber-500">📋</span> TR Proposed
          </button>

          <button 
            onClick={() => setFilters(prev => ({ ...prev, shortlisted: !prev.shortlisted }))}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5",
              filters.shortlisted 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <span className="text-green-500">✓</span> Shortlisted
          </button>

          {(filters.topTalent || filters.trProposed || filters.shortlisted) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilters({ topTalent: false, trProposed: false, shortlisted: false })}
              className="text-slate-400 hover:text-slate-600 text-xs ml-auto"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[60px] text-right font-bold text-slate-700">Rank</TableHead>
              <TableHead className="w-[250px] font-bold text-slate-700">Candidate</TableHead>
              <TableHead className="font-bold text-slate-700">Position & Unit</TableHead>
              <TableHead className="w-[140px] font-bold text-slate-700">9-Box</TableHead>
              <TableHead className="w-[100px] text-right font-bold text-slate-700">EQS Score</TableHead>
              <TableHead className="w-[120px] text-center font-bold text-slate-700">Tags</TableHead>
              <TableHead className="w-[80px] text-center font-bold text-slate-700">Risk</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate, index) => (
              <TableRow 
                key={candidate.id} 
                className="cursor-pointer hover:bg-slate-50/80 transition-colors"
                onClick={() => onSelectCandidate(candidate)}
              >
                <TableCell className="text-right font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-slate-100">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name}&background=random`} />
                      <AvatarFallback>{candidate.avatar_url}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{candidate.name}</p>
                      <p className="text-xs text-slate-500">{candidate.employee_id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{candidate.position}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{candidate.unit} • {candidate.company}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <NineBoxBadge cluster={candidate.talent_cluster} />
                </TableCell>
                <TableCell className="text-right">
                  <span className={cn(
                    "font-bold",
                    candidate.eqs_score.total_score >= 85 ? "text-slate-900" : "text-slate-600"
                  )}>
                    {candidate.eqs_score.total_score.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    {candidate.is_top_talent && <TopTalentTag />}
                    {candidate.is_tr_proposed && <TRProposedTag />}
                    {candidate.is_hcbp_shortlisted && <ShortlistedTag />}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RiskDot level={candidate.risk_profile} />
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filteredCandidates.length} of {candidates.length} candidates</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
