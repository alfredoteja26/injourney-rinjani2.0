import { useState } from "react";
import { 
  Building2, 
  ChevronRight, 
  Users,
  Search,
  Filter
} from "lucide-react";
import { cn } from "../../../components/ui/utils";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Band } from "../types";

interface BandSidebarProps {
  bands: Band[];
  selectedBandId: string;
  onSelectBand: (band: Band) => void;
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
}

export function BandSidebar({ 
  bands, 
  selectedBandId, 
  onSelectBand,
  selectedCompany,
  onSelectCompany
}: BandSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBands = bands.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[320px] bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Talent Pool</h2>
          <p className="text-xs text-slate-500">Browse by Job Band</p>
        </div>

        {/* Company Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
          <Select value={selectedCompany} onValueChange={onSelectCompany}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200">
              <div className="flex items-center gap-2 overflow-hidden">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <SelectValue placeholder="Select Company" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="InJourney Holding">InJourney Holding</SelectItem>
              <SelectItem value="PT Angkasa Pura I">PT Angkasa Pura I</SelectItem>
              <SelectItem value="PT Angkasa Pura II">PT Angkasa Pura II</SelectItem>
              <SelectItem value="ITDC">ITDC</SelectItem>
              <SelectItem value="TWC">TWC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search bands..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {/* Band List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {filteredBands.map((band) => (
          <div 
            key={band.id}
            onClick={() => onSelectBand(band)}
            className={cn(
              "p-4 rounded-xl border cursor-pointer transition-all group relative overflow-hidden",
              selectedBandId === band.id
                ? "bg-white border-primary shadow-md ring-1 ring-primary/20"
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
            )}
          >
             {selectedBandId === band.id && (
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
             )}

             <div className="flex justify-between items-start mb-1">
               <h3 className={cn(
                 "font-bold text-sm",
                 selectedBandId === band.id ? "text-primary" : "text-slate-800"
               )}>
                 {band.name}
               </h3>
               {/* Candidate Count Badge */}
               <div className={cn(
                 "px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1",
                 selectedBandId === band.id ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
               )}>
                 <Users className="w-3 h-3" />
                 {band.candidate_count}
               </div>
             </div>
             
             <p className="text-xs text-slate-500 mb-2">{band.level}</p>
             
             <div className="flex items-center text-[10px] text-slate-400">
                <span className="truncate">{band.description}</span>
             </div>
          </div>
        ))}
        
        {filteredBands.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">No bands found</p>
          </div>
        )}
      </div>
    </div>
  );
}
