import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  assessmentCycles, 
  assessmentResults, 
  assessorAssignments, 
  currentUser 
} from "../../lib/360-assessment/data";
import { StatusBadge } from "./StatusBadge";
import { ChevronRight, Filter } from "lucide-react";
import { Link } from "react-router";

export function HistoryList() {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Get closed/archived cycles
  const historicalCycles = assessmentCycles.filter(c => ['closed', 'archived'].includes(c.status));

  // Build list items
  let items: any[] = [];

  historicalCycles.forEach(cycle => {
    const cycleYear = new Date(cycle.start_date).getFullYear().toString();

    // 1. As Assessee
    const result = assessmentResults.find(r => r.cycle_id === cycle.id && r.assessee_id === currentUser.id);
    if (result) {
      items.push({
        id: `history-assessee-${cycle.id}`,
        cycle,
        role: "Peserta",
        year: cycleYear,
        score: result.overall_score,
        max_score: result.overall_max_score,
        link: `/360-assessment/report/${result.id}`
      });
    }

    // 2. As Assessor
    const assignment = assessorAssignments.find(a => a.cycle_id === cycle.id && a.assessor_id === currentUser.id);
    if (assignment) {
      items.push({
        id: `history-assessor-${cycle.id}`,
        cycle,
        role: "Penilai",
        year: cycleYear,
        score: null,
        link: `/360-assessment/fill/${assignment.id}?readonly=true` // Read only view
      });
    }
  });

  // Filter
  const filteredItems = items.filter(item => {
    if (yearFilter !== "all" && item.year !== yearFilter) return false;
    if (roleFilter !== "all" && item.role !== roleFilter) return false;
    return true;
  });

  // Get unique years for filter
  const years = Array.from(new Set(items.map(i => i.year))).sort((a: any, b: any) => b - a);

  if (filteredItems.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-lg bg-muted/30">
         <p className="text-muted-foreground">Belum ada riwayat penilaian.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 items-center">
        <div className="relative">
          <Filter size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <select 
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="pl-9 pr-8 py-2 h-9 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-ring focus:border-ring appearance-none"
          >
            <option value="all">Semua Tahun</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 h-9 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-ring focus:border-ring appearance-none"
          >
            <option value="all">Semua Peran</option>
            <option value="Peserta">Sebagai Peserta</option>
            <option value="Penilai">Sebagai Penilai</option>
          </select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="px-4 py-3">Judul Assessment</th>
                <th className="px-4 py-3 w-[120px]">Peran</th>
                <th className="px-4 py-3 w-[120px]">Jenis</th>
                <th className="px-4 py-3 w-[150px]">Periode</th>
                <th className="px-4 py-3 w-[100px]">Nilai</th>
                <th className="px-4 py-3 w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{item.cycle.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                      ${item.role === 'Peserta' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                      ${item.cycle.assessment_type === 'behavioral' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                      {item.cycle.assessment_type === 'behavioral' ? 'Perilaku' : 'Kompetensi'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {format(new Date(item.cycle.start_date), "MMM yyyy", { locale: id })} - {format(new Date(item.cycle.end_date), "MMM yyyy", { locale: id })}
                  </td>
                  <td className="px-4 py-3">
                    {item.role === 'Peserta' && item.score !== null ? (
                      <span className="font-semibold text-foreground">
                        {item.score.toFixed(2)} <span className="text-muted-foreground font-normal text-xs">/ {item.max_score}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link 
                      to={item.link}
                      className="inline-flex items-center justify-center size-8 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronRight size={16} />
                    </Link>
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
