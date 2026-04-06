import { useParams, Link } from "react-router";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Layout as AppShell } from "../../../../components/shell/Layout";
import { assessmentResults, assessmentCycles } from "../../../../lib/360-assessment/data";
import { useState } from "react";

function CompetencyRow({ competency }: { competency: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const percent = (competency.score / competency.max_score) * 100;

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">{competency.competency_name}</h4>
            <span className="font-bold text-primary">
              {competency.score.toFixed(2)} <span className="text-muted-foreground text-xs font-normal">/ {competency.max_score}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <div className="ml-2 text-muted-foreground">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 bg-muted/10 border-t border-border">
          <div className="mt-3 space-y-3">
            {competency.behavior_scores.map((behavior: any, idx: number) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">{behavior.behavior_indicator}</span>
                  <span className="font-medium text-foreground">{behavior.score.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/70 rounded-full" 
                    style={{ width: `${(behavior.score / behavior.max_score) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssessmentReportPage() {
  const params = useParams();
  const result = assessmentResults.find(r => r.id === params.id);
  
  if (!result) {
    return (
      <AppShell>
        <div className="p-8 text-center">Data not found</div>
      </AppShell>
    );
  }

  const cycle = assessmentCycles.find(c => c.id === result.cycle_id);

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <Link to="/talent/360-assessment" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft size={16} className="mr-1" />
            Kembali ke Penilaian Saya
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                  ${cycle?.assessment_type === 'behavioral' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                  {cycle?.assessment_type === 'behavioral' ? 'Perilaku' : 'Kompetensi'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {cycle?.start_date && format(new Date(cycle.start_date), "dd MMM yyyy", { locale: id })} - {cycle?.end_date && format(new Date(cycle.end_date), "dd MMM yyyy", { locale: id })}
                </span>
              </div>
              <h1 className="text-3xl font-bold font-sans text-slate-800 mb-1">{cycle?.name}</h1>
              <p className="text-muted-foreground">{cycle?.description}</p>
            </div>

            {/* Overall Score Card */}
            <div className="bg-primary text-primary-foreground p-5 rounded-lg shadow-md min-w-[200px] text-center">
              <div className="text-sm font-medium opacity-90 mb-1">Nilai Keseluruhan</div>
              <div className="text-4xl font-bold tracking-tight">
                {result.overall_score.toFixed(2)}
                <span className="text-lg opacity-70 font-normal"> / {result.overall_max_score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competency Breakdown */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Breakdown per Kompetensi</h2>
          <div className="grid gap-3">
            {result.competency_scores.map((comp, idx) => (
              <CompetencyRow key={idx} competency={comp} />
            ))}
          </div>
        </section>

        {/* Channel Breakdown */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Breakdown per Channel Evaluator</h2>
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                   <tr>
                     <th className="px-4 py-3">Channel</th>
                     <th className="px-4 py-3 text-right">Bobot</th>
                     <th className="px-4 py-3 text-right">Nilai Mentah</th>
                     <th className="px-4 py-3 text-right">Nilai Tertimbang</th>
                     <th className="px-4 py-3 text-center">Jumlah Penilai</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   {result.channel_breakdown.map((channel, idx) => {
                     const labels: Record<string, string> = {
                       superior: "Atasan",
                       peer: "Rekan Kerja",
                       subordinate: "Bawahan",
                       self: "Diri Sendiri"
                     };
                     
                     return (
                       <tr key={idx} className="hover:bg-muted/20">
                         <td className="px-4 py-3 font-medium">{labels[channel.channel] || channel.channel}</td>
                         <td className="px-4 py-3 text-right">{channel.weight}%</td>
                         <td className="px-4 py-3 text-right">{channel.raw_score.toFixed(2)}</td>
                         <td className="px-4 py-3 text-right font-medium">{channel.weighted_score.toFixed(2)}</td>
                         <td className="px-4 py-3 text-center">{channel.assessor_count}</td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
