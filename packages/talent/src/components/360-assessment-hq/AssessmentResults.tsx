import { useState, useMemo } from "react";
import { assessmentResults } from "../../lib/360-assessment-hq/data";
import { Search, AlertTriangle, CheckCircle2, Globe, FileCheck } from "lucide-react";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

export function AssessmentResults({ cycleId }: { cycleId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data fetching
  const cycleResults = assessmentResults.find(r => r.cycle_id === cycleId);
  // In a real app, this would be an array of result objects per assessee. 
  // The sample data structure is a bit ambiguous, let's assume `assessmentResults` is an array of individual results 
  // OR a container object. The sample provided in data.ts `assessmentResults` is an array of individual results.
  // Wait, my `data.ts` has `assessmentResults` as an array where each item seems to be a single assessee result 
  // BUT the `AssessmentResult` interface I defined earlier has `cycle_id` and `assessee_id`.
  // AND one entry in `data.ts` sample (the first one) had `score_distribution` and `competency_averages`.
  // Let's adjust the logic to aggregate.
  
  // Re-reading data.ts mock:
  // It seems I put individual results in the array. 
  // And the first item has the summary attached (which is a bit hacky but works for mock).
  // Let's extract summary from the first item of this cycle.
  
  const resultsList = assessmentResults.filter(r => r.cycle_id === cycleId);
  const summary = resultsList[0] || {};
  
  const filteredResults = useMemo(() => {
    return resultsList.filter(r => 
      r.assessee_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [resultsList, searchQuery]);

  const handleValidate = () => {
    if (confirm("Hasil penilaian akan divalidasi. Lanjutkan?")) {
      toast.success("Hasil berhasil divalidasi");
    }
  };

  const handlePublish = () => {
    if (confirm("Hasil akan dipublikasikan dan dapat dilihat oleh seluruh peserta. Tindakan ini tidak dapat dibatalkan. Lanjutkan?")) {
      toast.success("Hasil berhasil dipublikasikan");
    }
  };

  if (resultsList.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
        Hasil penilaian belum tersedia. Kalkulasi akan berjalan setelah siklus ditutup.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Distribusi Nilai</h3>
           {summary.score_distribution ? (
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <div className="text-xs text-muted-foreground">Rata-rata</div>
                 <div className="text-2xl font-bold font-sans text-foreground">{summary.score_distribution.mean}</div>
               </div>
               <div>
                 <div className="text-xs text-muted-foreground">Median</div>
                 <div className="text-2xl font-bold font-sans text-foreground">{summary.score_distribution.median}</div>
               </div>
               <div>
                 <div className="text-xs text-muted-foreground">Min</div>
                 <div className="text-lg font-semibold font-sans text-foreground">{summary.score_distribution.min}</div>
               </div>
               <div>
                 <div className="text-xs text-muted-foreground">Max</div>
                 <div className="text-lg font-semibold font-sans text-foreground">{summary.score_distribution.max}</div>
               </div>
             </div>
           ) : (
             <div className="text-sm text-muted-foreground italic">Data distribusi belum tersedia</div>
           )}
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Rata-rata Kompetensi</h3>
           {summary.competency_averages ? (
             <div className="space-y-3">
               {summary.competency_averages.map((comp: any) => (
                 <div key={comp.competency_name} className="flex items-center gap-4">
                   <div className="w-32 text-sm font-medium truncate" title={comp.competency_name}>{comp.competency_name}</div>
                   <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: `${(comp.avg_score / 6) * 100}%` }} />
                   </div>
                   <div className="w-12 text-sm font-bold text-right">{comp.avg_score}</div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-sm text-muted-foreground italic">Data kompetensi belum tersedia</div>
           )}
        </div>
      </div>

      {/* Results Table */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari peserta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
              />
           </div>
           
           <div className="flex gap-3">
              <button 
                onClick={handleValidate}
                className="px-4 py-2 bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <FileCheck size={16} />
                Validasi Hasil
              </button>
              <button 
                onClick={handlePublish}
                className="px-4 py-2 bg-primary text-white hover:bg-primary/90 font-medium text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2"
              >
                <Globe size={16} />
                Publikasikan Hasil
              </button>
           </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
           <table className="w-full text-sm text-left">
             <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
               <tr>
                 <th className="px-4 py-3">Nama Peserta</th>
                 <th className="px-4 py-3">Jabatan</th>
                 <th className="px-4 py-3">Unit</th>
                 <th className="px-4 py-3 text-right">Nilai</th>
                 <th className="px-4 py-3 text-right">Deviasi Self</th>
                 <th className="px-4 py-3 text-center">Anomali</th>
                 <th className="px-4 py-3">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border">
               {filteredResults.map((result) => (
                 <tr key={result.assessee_id} className="hover:bg-muted/20 transition-colors">
                   <td className="px-4 py-3 font-medium text-foreground">{result.assessee_name}</td>
                   <td className="px-4 py-3 text-muted-foreground">{result.assessee_position}</td>
                   <td className="px-4 py-3 text-muted-foreground text-xs">{result.assessee_org}</td>
                   <td className="px-4 py-3 text-right font-bold text-foreground">
                     {result.overall_score.toFixed(2)} <span className="text-muted-foreground font-normal text-xs">/ {result.overall_max_score}</span>
                   </td>
                   <td className="px-4 py-3 text-right">
                     <span className={cn(
                       "font-medium",
                       result.self_score_deviation > 0.5 ? "text-amber-600" : "text-muted-foreground"
                     )}>
                       {result.self_score_deviation.toFixed(2)}
                     </span>
                   </td>
                   <td className="px-4 py-3 text-center">
                     {result.anomaly_flag ? (
                       <AlertTriangle size={16} className="text-destructive mx-auto" />
                     ) : (
                       <span className="text-muted-foreground">-</span>
                     )}
                   </td>
                   <td className="px-4 py-3">
                     {result.status === "published" ? (
                       <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                         <CheckCircle2 size={12} /> Terbit
                       </span>
                     ) : (
                       <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                         Pending
                       </span>
                     )}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
        <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground flex justify-between items-center">
           <span>Menampilkan {filteredResults.length} hasil</span>
        </div>
      </div>
    </div>
  );
}
