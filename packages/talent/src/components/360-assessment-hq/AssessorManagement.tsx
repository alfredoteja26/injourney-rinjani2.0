import { useState, useMemo } from "react";
import { assessorAssignments } from "../../lib/360-assessment-hq/data";
import { Search, Filter, RefreshCw, Slash, AlertTriangle } from "lucide-react";
import { cn } from "../ui/utils";

export function AssessorManagement({ cycleId }: { cycleId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAssignments = useMemo(() => {
    return assessorAssignments.filter(a => {
      if (a.cycle_id !== cycleId) return false;
      
      const matchesSearch = 
        a.assessee_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.assessor_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesChannel = channelFilter === "all" || a.channel === channelFilter;
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;

      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [cycleId, searchQuery, channelFilter, statusFilter]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-gray-100 text-gray-700",
      notified: "bg-blue-50 text-blue-700",
      in_progress: "bg-indigo-50 text-indigo-700",
      completed: "bg-emerald-50 text-emerald-700",
      skipped: "bg-amber-50 text-amber-700",
    };
     const labels: Record<string, string> = {
      pending: "Pending",
      notified: "Notified",
      in_progress: "In Progress",
      completed: "Completed",
      skipped: "Skipped",
    };
    return (
      <span className={cn("px-2 py-0.5 rounded text-xs font-medium", styles[status] || styles.pending)}>
        {labels[status] || status}
      </span>
    );
  };

  const getChannelBadge = (channel: string) => {
    const labels: Record<string, string> = {
      superior: "Atasan",
      peer: "Rekan Kerja",
      subordinate: "Bawahan",
      self: "Diri Sendiri",
    };
    return (
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {labels[channel] || channel}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
         <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari peserta atau penilai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
         </div>
         <div className="flex gap-3">
            <select 
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-input rounded-md bg-background"
            >
              <option value="all">Semua Channel</option>
              <option value="superior">Atasan</option>
              <option value="peer">Rekan Kerja</option>
              <option value="subordinate">Bawahan</option>
              <option value="self">Diri Sendiri</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-input rounded-md bg-background"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="notified">Notified</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="skipped">Skipped</option>
            </select>
         </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="px-4 py-3">Peserta (Assessee)</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Penilai (Assessor)</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Override</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada penetapan assessor yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-foreground">{assignment.assessee_name}</div>
                      <div className="text-xs text-muted-foreground">{assignment.assessee_position}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground">{assignment.assessee_org}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{assignment.assessor_name}</div>
                    </td>
                    <td className="px-4 py-3">
                      {getChannelBadge(assignment.channel)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(assignment.status)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {assignment.is_override ? (
                        <div className="inline-flex justify-center group relative cursor-help">
                           <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">Ya</span>
                           {assignment.override_reason && (
                             <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border hidden group-hover:block z-50">
                               {assignment.override_reason}
                             </div>
                           )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex justify-end gap-2">
                         <button 
                           className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                           title="Ganti Penilai"
                         >
                           <RefreshCw size={14} />
                         </button>
                         <button 
                           className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                           title="Lewati"
                         >
                           <Slash size={14} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground flex justify-between items-center">
           <span>Menampilkan {filteredAssignments.length} penetapan</span>
        </div>
      </div>
    </div>
  );
}
