import { Link } from "react-router";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { assessmentCycles, assessmentResults, currentUser } from "../../lib/360-assessment/data";
import { StatusBadge } from "./StatusBadge";
import { ChevronRight } from "lucide-react";

export function MyAssessmentList() {
  // Filter results for current user
  const myResults = assessmentResults.filter(r => r.assessee_id === currentUser.id);

  // Join with cycle data
  const data = myResults.map(result => {
    const cycle = assessmentCycles.find(c => c.id === result.cycle_id);
    return {
      ...result,
      cycle,
    };
  }).filter(item => item.cycle); // Ensure cycle exists

  if (data.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">Belum ada penilaian 360 untuk Anda saat ini.</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
            <tr>
              <th className="px-4 py-3">Judul Assessment</th>
              <th className="px-4 py-3 w-[120px]">Jenis</th>
              <th className="px-4 py-3 w-[120px]">Status</th>
              <th className="px-4 py-3 w-[150px]">Periode</th>
              <th className="px-4 py-3 w-[100px]">Nilai</th>
              <th className="px-4 py-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{item.cycle?.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {item.cycle?.description || "Tidak ada deskripsi"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                    ${item.cycle?.assessment_type === 'behavioral' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                    {item.cycle?.assessment_type === 'behavioral' ? 'Perilaku' : 'Kompetensi'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.cycle?.status as any} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.cycle?.start_date && format(new Date(item.cycle.start_date), "dd MMM yyyy", { locale: id })}
                  <span className="mx-1">-</span>
                  {item.cycle?.end_date && format(new Date(item.cycle.end_date), "dd MMM yyyy", { locale: id })}
                </td>
                <td className="px-4 py-3">
                  {item.status === 'published' ? (
                    <span className="font-semibold text-foreground">
                      {item.overall_score.toFixed(2)} <span className="text-muted-foreground font-normal text-xs">/ {item.overall_max_score}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Menunggu Hasil</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.status === 'published' && (
                    <Link 
                      to={`/360-assessment/report/${item.id}`}
                      className="inline-flex items-center justify-center size-8 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
