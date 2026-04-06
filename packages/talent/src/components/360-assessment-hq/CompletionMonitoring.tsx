import { completionSummary } from "../../lib/360-assessment-hq/data";
import { Clock, Users, CheckCircle, AlertCircle, Bell, UserX } from "lucide-react";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

export function CompletionMonitoring({ cycleId }: { cycleId: string }) {
  // Mock data for this cycle
  const summary = completionSummary.find(s => s.cycle_id === cycleId) || completionSummary[0];

  const handleRemind = (id: string) => {
    toast.success("Pengingat berhasil dikirim");
  };

  const handleBulkRemind = () => {
    toast.success(`Pengingat berhasil dikirim ke ${summary.incomplete_assessors.length} assessor`);
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Peserta</span>
            <Users size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold font-sans text-foreground">{summary.total_assessees}</div>
          <p className="text-xs text-muted-foreground mt-1">Orang</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
           <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Penugasan</span>
            <Clock size={16} className="text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-sans text-foreground">{summary.total_assignments}</div>
          <p className="text-xs text-muted-foreground mt-1">Assignments generated</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
           <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Penyelesaian</span>
            <CheckCircle size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-sans text-foreground">{(summary.overall_completion_rate * 100).toFixed(1)}%</div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
             <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${summary.overall_completion_rate * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{summary.completed_assignments} dari {summary.total_assignments} selesai</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
           <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sisa Waktu</span>
            <AlertCircle size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-sans text-foreground">12 Hari</div>
          <p className="text-xs text-muted-foreground mt-1">Berakhir 15 Des 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Channel Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-sans text-foreground">Breakdown per Channel</h3>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
             {summary.channel_breakdown.map((item) => (
               <div key={item.channel}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="font-medium capitalize">{item.channel}</span>
                   <span className="text-muted-foreground">{item.completed}/{item.total} ({item.rate * 100}%)</span>
                 </div>
                 <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                   <div 
                     className={cn(
                       "h-full rounded-full",
                       item.channel === "self" ? "bg-indigo-500" :
                       item.channel === "superior" ? "bg-blue-500" :
                       item.channel === "peer" ? "bg-emerald-500" : "bg-amber-500"
                     )}
                     style={{ width: `${item.rate * 100}%` }}
                   />
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Org Breakdown */}
         <div className="space-y-4">
          <h3 className="text-lg font-bold font-sans text-foreground">Breakdown per Unit Organisasi</h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="px-4 py-3 text-left">Unit Organisasi</th>
                   <th className="px-4 py-3 text-right w-24">Peserta</th>
                   <th className="px-4 py-3 text-right w-24">Progress</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 {summary.organization_breakdown.map((org, idx) => (
                   <tr key={idx}>
                     <td className="px-4 py-3 text-foreground line-clamp-1">{org.org_name}</td>
                     <td className="px-4 py-3 text-right">{org.assessees}</td>
                     <td className="px-4 py-3 text-right font-medium">{(org.completion_rate * 100).toFixed(0)}%</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </div>

      {/* Incomplete Assessors */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
           <h3 className="text-lg font-bold font-sans text-foreground">Assessor Belum Selesai</h3>
           <button 
             onClick={handleBulkRemind}
             className="text-sm font-medium text-primary hover:bg-primary/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
           >
             <Bell size={16} /> Kirim Pengingat ke Semua
           </button>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
           <table className="w-full text-sm text-left">
             <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
               <tr>
                 <th className="px-4 py-3 w-[40px]"><input type="checkbox" className="rounded border-input text-primary focus:ring-primary" /></th>
                 <th className="px-4 py-3">Nama Penilai</th>
                 <th className="px-4 py-3">Channel</th>
                 <th className="px-4 py-3">Jumlah Belum Selesai</th>
                 <th className="px-4 py-3 text-right">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border">
               {summary.incomplete_assessors.map((item) => (
                 <tr key={item.assessor_id} className="hover:bg-muted/20 transition-colors">
                   <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded border-input text-primary focus:ring-primary" /></td>
                   <td className="px-4 py-3 font-medium text-foreground">{item.assessor_name}</td>
                   <td className="px-4 py-3 capitalize text-muted-foreground">{item.channel}</td>
                   <td className="px-4 py-3">
                     <span className="inline-flex items-center justify-center bg-destructive/10 text-destructive font-bold px-2 py-0.5 rounded-full text-xs">
                       {item.pending_count} pending
                     </span>
                   </td>
                   <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => handleRemind(item.assessor_id)}
                        className="text-primary hover:underline text-xs font-medium"
                      >
                        Kirim Pengingat
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
