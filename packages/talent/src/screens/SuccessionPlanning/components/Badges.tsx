import { Badge } from "../../../components/ui/badge";
import { Star, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { cn } from "../../../components/ui/utils";

// --- Top Talent Badge ---
export function TopTalentBadge({ className }: { className?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("inline-flex items-center", className)}>
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Top Talent - Priority Candidate</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// --- Risk Profile Badge ---
export function RiskProfileBadge({ level }: { level: "low" | "medium" | "high" }) {
  const config = {
    low: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: CheckCircle2,
      label: "LOW RISK"
    },
    medium: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: AlertTriangle,
      label: "MEDIUM RISK"
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: AlertCircle,
      label: "HIGH RISK"
    }
  };

  const { bg, text, icon: Icon, label } = config[level];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border border-transparent", bg, text)}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </div>
  );
}

// --- TC Tier Badge ---
export function TCTierBadge({ tier }: { tier: "tier_1" | "tier_2" | "tier_3" }) {
  const config = {
    tier_1: { label: "Tier 1", bg: "bg-purple-100 text-purple-700 border-purple-200" },
    tier_2: { label: "Tier 2", bg: "bg-blue-100 text-blue-700 border-blue-200" },
    tier_3: { label: "Tier 3", bg: "bg-slate-100 text-slate-700 border-slate-200" }
  };

  const { label, bg } = config[tier];

  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border", bg)}>
      {label}
    </span>
  );
}

// --- Readiness Badge ---
export function ReadinessBadge({ level }: { level: "ready_now" | "ready_short_term" | "ready_long_term" }) {
  const config = {
    ready_now: { label: "Ready Now", className: "bg-green-500 text-white hover:bg-green-600" },
    ready_short_term: { label: "1-2 Years", className: "bg-amber-500 text-white hover:bg-amber-600" },
    ready_long_term: { label: "3+ Years", className: "bg-red-500 text-white hover:bg-red-600" }
  };

  const { label, className } = config[level];

  return (
    <Badge variant="secondary" className={cn("font-medium border-0", className)}>
      {label}
    </Badge>
  );
}

// --- Ranking Badge ---
export function RankingBadge({ rank }: { rank: "primary" | "secondary" | "tertiary" }) {
  const config = {
    primary: { label: "Primary", className: "bg-green-500 text-white" },
    secondary: { label: "Secondary", className: "bg-blue-500 text-white" },
    tertiary: { label: "Tertiary", className: "bg-amber-500 text-white" }
  };

  const { label, className } = config[rank];

  return (
    <Badge variant="outline" className={cn("border-0 font-medium", className)}>
      {label}
    </Badge>
  );
}
