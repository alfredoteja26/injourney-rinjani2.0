import { useState } from "react";
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon, 
  AlertTriangle,
  Clock,
  CircleDot,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { TCTierBadge } from "./components/Badges";
import { Position } from "./types";
import { cn } from "../../components/ui/utils";

interface SuccessionBoardProps {
  positions: Position[];
  onSelectPosition: (position: Position) => void;
}

type ViewMode = "board" | "list";

export function SuccessionBoard({ positions, onSelectPosition }: SuccessionBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPositions = positions.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { 
      id: "vacant", 
      title: "Vacant", 
      color: "bg-red-500", 
      accent: "bg-red-50 border-red-200",
      icon: AlertTriangle,
      positions: filteredPositions.filter(p => p.vacancyStatus === "vacant") 
    },
    { 
      id: "vacant_soon", 
      title: "Vacant Soon", 
      color: "bg-amber-500", 
      accent: "bg-amber-50 border-amber-200",
      icon: Clock,
      positions: filteredPositions.filter(p => p.vacancyStatus === "vacant_soon") 
    },
    { 
      id: "to_review", 
      title: "To Be Reviewed", 
      color: "bg-blue-500", 
      accent: "bg-blue-50 border-blue-200",
      icon: CircleDot,
      positions: filteredPositions.filter(p => p.vacancyStatus === "to_review") 
    },
    { 
      id: "filled", 
      title: "Filled", 
      color: "bg-green-500", 
      accent: "bg-green-50 border-green-200",
      icon: CheckCircle2,
      positions: filteredPositions.filter(p => p.vacancyStatus === "filled") 
    }
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Succession Planning</h1>
          <p className="text-slate-500 mt-1">Manage succession plans for critical positions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search positions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[280px]"
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode("board")}
              className={cn(
                "p-1.5 rounded transition-all",
                viewMode === "board" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded transition-all",
                viewMode === "list" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 h-full min-w-[1200px]">
          {viewMode === "board" ? (
            <div className="grid grid-cols-4 gap-6 h-full">
              {columns.map((col) => (
                <div key={col.id} className="flex flex-col gap-4 h-full">
                  {/* Column Header */}
                  <div className={cn("flex items-center justify-between p-3 rounded-xl border", col.accent)}>
                    <div className="flex items-center gap-2">
                      <div className={cn("p-1.5 rounded-full text-white", col.color)}>
                        <col.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-sm text-slate-800">{col.title}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/50 text-slate-700 hover:bg-white/60">
                      {col.positions.length}
                    </Badge>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-3">
                    {col.positions.map((pos) => (
                      <Card 
                        key={pos.id} 
                        className="hover:shadow-md transition-all cursor-pointer border-slate-200 group relative overflow-hidden"
                        onClick={() => onSelectPosition(pos)}
                      >
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1", col.color)} />
                        <CardContent className="p-4 pl-5">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-800 text-sm">{pos.title}</h3>
                              <p className="text-xs text-slate-500 mt-0.5">{pos.division}</p>
                            </div>
                            <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <Badge variant="outline" className="text-[10px] text-slate-600 border-slate-200">
                              {pos.grade}
                            </Badge>
                            {pos.type === "ksp" && (
                              <Badge variant="secondary" className="text-[10px] bg-sky-100 text-sky-700 hover:bg-sky-200">
                                KSP
                              </Badge>
                            )}
                            <TCTierBadge tier={pos.tcTier} />
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className={cn(
                              "text-xs font-medium flex items-center gap-1.5",
                              pos.candidateCount < pos.minCandidates ? "text-amber-600" : "text-slate-600"
                            )}>
                               {pos.candidateCount < pos.minCandidates && <AlertTriangle className="w-3.5 h-3.5" />}
                               {pos.candidateCount}/{pos.minCandidates} candidates
                            </div>
                            
                            {pos.incumbent && (
                              <div className="text-[10px] text-slate-400 text-right">
                                Retiring: {new Date(pos.retirementDate!).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-500">
                  <div className="col-span-4">Position</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Vacancy Status</div>
                  <div className="col-span-2">Candidates</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>
                <div>
                  {filteredPositions.map((pos) => (
                    <div 
                      key={pos.id}
                      onClick={() => onSelectPosition(pos)}
                      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0"
                    >
                      <div className="col-span-4">
                        <h3 className="font-semibold text-slate-800 text-sm">{pos.title}</h3>
                        <p className="text-xs text-slate-500">{pos.division}</p>
                      </div>
                      <div className="col-span-2 flex flex-wrap gap-1">
                        {pos.type === "ksp" && (
                          <Badge variant="secondary" className="text-[10px] bg-sky-100 text-sky-700">KSP</Badge>
                        )}
                        <Badge variant="outline" className="text-[10px]">{pos.grade}</Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className={cn(
                          "border-0",
                          pos.vacancyStatus === "vacant" ? "bg-red-100 text-red-700" : 
                          pos.vacancyStatus === "vacant_soon" ? "bg-amber-100 text-amber-700" :
                          pos.vacancyStatus === "to_review" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        )}>
                          {pos.vacancyStatus.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-sm text-slate-600">
                        {pos.candidateCount}/{pos.minCandidates} candidates
                      </div>
                      <div className="col-span-2 text-right">
                        <Button size="sm" variant="ghost">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
