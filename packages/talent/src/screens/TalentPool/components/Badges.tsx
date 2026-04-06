import { Badge } from "../../../components/ui/badge";
import { Star, FileText, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { cn } from "../../../components/ui/utils";
import { NineBoxCluster, RiskProfile } from "../types";

// --- 9-Box Badge ---
export function NineBoxBadge({ cluster }: { cluster: NineBoxCluster | undefined | null }) {
  if (!cluster) return null;
  const config = {
    "9box_high_potential": { label: "High Potential", bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
    "9box_promotable": { label: "Promotable", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    "9box_solid_contributor": { label: "Solid Contributor", bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
    "9box_sleeping_tiger": { label: "Sleeping Tiger", bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
    "9box_underperformer": { label: "Underperformer", bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
  };

  const style = config[cluster];
  if (!style) return null;

  return (
    <Badge variant="outline" className={cn("font-medium border", style.bg, style.text, style.border)}>
      {style.label}
    </Badge>
  );
}

// --- Tag Icons ---
export function TopTalentTag() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 border border-orange-200">
            <Star className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Top Talent</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TRProposedTag() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 border border-amber-200">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Talent Review Proposed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ShortlistedTag() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>HCBP Shortlisted</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// --- Risk Dot ---
export function RiskDot({ level }: { level: RiskProfile | undefined | null }) {
  if (!level) return null;
  const config = {
    "LOW": { color: "bg-green-500", label: "Low Risk" },
    "MEDIUM": { color: "bg-amber-500", label: "Medium Risk" },
    "HIGH": { color: "bg-red-500", label: "High Risk" }
  };

  const style = config[level];
  if (!style) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("w-2.5 h-2.5 rounded-full", style.color)} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{style.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
