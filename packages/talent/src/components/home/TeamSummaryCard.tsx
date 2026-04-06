import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";
import { cn } from "../ui/utils";
import { ArrowRight, AlertCircle, Users } from "lucide-react";

export function TeamSummaryCard() {
  const { teamSummary, currentUser } = homeData;

  if (!currentUser.is_line_manager) return null;

  const MiniHeatmap = () => {
     // Simplified representation of 9-box
     const { nine_box_distribution: dist } = teamSummary;
     
     // Grid visual mapping
     // Row 1 (High Potential, Promotable, Sleeping Tiger) - Top
     // Row 2 (Promotable, Solid Contributor, Sleeping Tiger) - Mid
     // Row 3 (Solid Contributor, Unfit) - Bot
     
     // Let's use a simpler 3x3 visual
     // [3,1] [3,2] [3,3]
     // [2,1] [2,2] [2,3]
     // [1,1] [1,2] [1,3]
     
     // 3,3 (High Pot): dist.high_potential
     // 3,2 (Promotable): dist.promotable
     // 2,2 (Solid): dist.solid_contributor
     // etc.

     return (
        <div className="flex gap-4 items-center">
           <div className="grid grid-cols-3 gap-0.5 w-16 h-16 bg-muted border border-border rounded p-0.5">
              {/* Top Row */}
              <div className="bg-emerald-200/50 relative group"></div>
              <div className="bg-emerald-300/50 relative group"></div>
              <div className="bg-emerald-400 relative group flex items-center justify-center text-[10px] font-bold text-emerald-900">{dist.high_potential}</div>
              
              {/* Mid Row */}
              <div className="bg-amber-100/50 relative group"></div>
              <div className="bg-emerald-300/50 relative group flex items-center justify-center text-[10px] font-bold text-emerald-900">{dist.solid_contributor}</div>
              <div className="bg-emerald-300/50 relative group flex items-center justify-center text-[10px] font-bold text-emerald-900">{dist.promotable}</div>
              
              {/* Bot Row */}
              <div className="bg-red-200/50 relative group flex items-center justify-center text-[10px] font-bold text-red-900">{dist.unfit}</div>
              <div className="bg-amber-200/50 relative group"></div>
              <div className="bg-amber-200/50 relative group flex items-center justify-center text-[10px] font-bold text-amber-900">{dist.sleeping_tiger}</div>
           </div>
           <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">9-Box Tim</div>
              <div className="text-[10px] text-muted-foreground">
                 {dist.unclassified} belum diklasifikasi
              </div>
           </div>
        </div>
     );
  };

  return (
    <Card className="shadow-sm border-border bg-card overflow-hidden">
      <CardHeader className="pb-3 border-b border-border bg-muted/20 flex flex-row items-center justify-between">
         <div className="flex items-center gap-2">
            <Users size={18} className="text-muted-foreground" />
            <CardTitle className="text-base font-semibold text-foreground">Ringkasan Tim</CardTitle>
         </div>
         <Button variant="ghost" size="sm" asChild className="h-8 text-xs gap-1 hover:text-primary hover:bg-transparent px-0">
            <Link to="/talent/idp/team">
               Lihat Tim Saya <ArrowRight size={12} />
            </Link>
         </Button>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
         
         {/* Stats */}
         <div className="space-y-4 md:col-span-1 border-r border-border md:pr-6">
            <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Total Bawahan</span>
               <span className="font-bold text-foreground">{teamSummary.total_subordinates} Orang</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Rata-rata EQS</span>
               <span className="font-bold text-foreground">{teamSummary.avg_eqs_score}</span>
            </div>
            {teamSummary.action_items.total > 0 && (
               <div className="p-3 bg-red-50 rounded-lg flex items-center gap-3">
                  <div className="p-1.5 bg-red-100 rounded-full text-red-600">
                     <AlertCircle size={16} />
                  </div>
                  <div>
                     <div className="text-sm font-bold text-red-700">{teamSummary.action_items.total} Action Items</div>
                     <div className="text-[10px] text-red-600">Perlu tindak lanjut segera</div>
                  </div>
               </div>
            )}
         </div>

         {/* 9 Box */}
         <div className="md:col-span-1 flex items-center justify-center border-r border-border md:px-6">
            <MiniHeatmap />
         </div>

         {/* IDP Status & Action Breakdown */}
         <div className="md:col-span-2 space-y-4 md:pl-2">
            <div>
               <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Status IDP Tim</div>
               <div className="flex h-4 w-full rounded-full overflow-hidden">
                  <div style={{width: `${(teamSummary.idp_status_summary.approved / teamSummary.total_subordinates) * 100}%`}} className="bg-emerald-500 h-full" title={`Approved: ${teamSummary.idp_status_summary.approved}`} />
                  <div style={{width: `${(teamSummary.idp_status_summary.pending_approval / teamSummary.total_subordinates) * 100}%`}} className="bg-amber-500 h-full" title={`Pending: ${teamSummary.idp_status_summary.pending_approval}`} />
                  <div style={{width: `${(teamSummary.idp_status_summary.draft / teamSummary.total_subordinates) * 100}%`}} className="bg-slate-300 h-full" title={`Draft: ${teamSummary.idp_status_summary.draft}`} />
                  <div style={{width: `${(teamSummary.idp_status_summary.no_idp / teamSummary.total_subordinates) * 100}%`}} className="bg-slate-100 h-full" title={`No IDP: ${teamSummary.idp_status_summary.no_idp}`} />
               </div>
               <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Disetujui ({teamSummary.idp_status_summary.approved})</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/> Pending ({teamSummary.idp_status_summary.pending_approval})</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"/> Draft ({teamSummary.idp_status_summary.draft})</div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
               <div className="bg-muted/30 p-2 rounded border border-border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Approval IDP</div>
                  <div className="font-bold text-foreground">{teamSummary.action_items.idp_approval_pending}</div>
               </div>
               <div className="bg-muted/30 p-2 rounded border border-border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Review Aspirasi</div>
                  <div className="font-bold text-foreground">{teamSummary.action_items.aspiration_review_pending}</div>
               </div>
               <div className="bg-muted/30 p-2 rounded border border-border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Pending Assessment</div>
                  <div className="font-bold text-foreground">{teamSummary.action_items.assessment_pending}</div>
               </div>
            </div>
         </div>

      </CardContent>
    </Card>
  );
}
