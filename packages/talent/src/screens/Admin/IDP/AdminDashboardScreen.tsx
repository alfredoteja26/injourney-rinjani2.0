import { 
  Users, 
  FileCheck, 
  Clock, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { 
  mockIDPCycles, 
  mockIDPRecords, 
  mockEmployees,
  mockCompetencyGaps
} from "../../../data/idpData";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

// Colors from Design System
const COLORS = {
  primary: '#00495d',
  accent: '#ff9220',
  success: '#10B981',
  warning: '#ff9220',
  danger: '#ee3e31',
  muted: '#94A3B8',
  slate: '#CBD5E1'
};

const STATUS_COLORS = {
  approved: COLORS.success,
  pending_approval: COLORS.warning,
  revision_requested: COLORS.danger,
  draft: COLORS.slate,
  not_started: '#F1F5F9'
};

export function AdminDashboardScreen() {
  const activeCycle = mockIDPCycles.find(c => c.status === 'active');
  
  // Metrics Calculation
  const totalEmployees = mockEmployees.length;
  const totalRecords = mockIDPRecords.filter(r => r.cycle_id === activeCycle?.id).length;
  const participationRate = (totalRecords / totalEmployees) * 100;
  
  const approvedCount = mockIDPRecords.filter(r => r.status === 'approved').length;
  const pendingCount = mockIDPRecords.filter(r => r.status === 'pending_approval').length;
  const revisionCount = mockIDPRecords.filter(r => r.status === 'revision_requested').length;
  const draftCount = mockIDPRecords.filter(r => r.status === 'draft').length;
  const notStartedCount = totalEmployees - totalRecords;
  
  const approvalRate = totalRecords > 0 ? (approvedCount / totalRecords) * 100 : 0;

  const pendingApprovals = mockIDPRecords
    .filter(r => r.status === 'pending_approval')
    .map(record => {
      const employee = mockEmployees.find(e => e.id === record.employee_id);
      return { ...record, employee };
    });

  // Chart Data: Status Distribution
  const statusData = [
    { name: 'Approved', value: approvedCount, color: STATUS_COLORS.approved },
    { name: 'Pending', value: pendingCount, color: STATUS_COLORS.pending_approval },
    { name: 'Revision', value: revisionCount, color: STATUS_COLORS.revision_requested },
    { name: 'Draft', value: draftCount, color: STATUS_COLORS.draft },
    { name: 'Not Started', value: notStartedCount, color: STATUS_COLORS.not_started },
  ].filter(d => d.value > 0);

  // Chart Data: Top Competency Gaps (Mock Aggregation)
  // In a real app, this would aggregate from all employee gaps
  const gapData = [
    { name: 'Digital Literacy', gap: 2.5 },
    { name: 'Leadership', gap: 1.8 },
    { name: 'Proj. Mgmt', gap: 1.5 },
    { name: 'Strategic Thinking', gap: 1.2 },
    { name: 'Communication', gap: 0.8 },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Talent Development HQ
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Overview & Analytics IDP Periode: <strong>{activeCycle?.name}</strong>
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right hidden md:block">
                 <div className="text-xs text-[var(--color-text-muted)]">Periode Aktif</div>
                 <div className="font-medium text-sm">{new Date(activeCycle?.start_date || "").toLocaleDateString('id-ID')} - {new Date(activeCycle?.end_date || "").toLocaleDateString('id-ID')}</div>
               </div>
               <Badge className="bg-[var(--color-primary)] px-3 py-1 uppercase">
                 {activeCycle?.status}
               </Badge>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-[var(--color-primary)] shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">Total Partisipasi</p>
                  <Users className="h-4 w-4 text-[var(--color-primary)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--color-text-heading)]">{Math.round(participationRate)}%</div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {totalRecords} / {totalEmployees} Karyawan
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">Completion Rate</p>
                  <FileCheck className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-[var(--color-text-heading)]">{Math.round(approvalRate)}%</div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {approvedCount} IDP Approved
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">Pending Action</p>
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-[var(--color-text-heading)]">{pendingCount}</div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Menunggu Approval Manager
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">Need Attention</p>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-[var(--color-text-heading)]">{revisionCount}</div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  IDP Perlu Revisi
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart: Status Distribution */}
            <Card className="lg:col-span-2 shadow-sm border-[var(--color-border)]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-heading">Status Distribusi IDP</CardTitle>
                    <CardDescription>Pemantauan status pengajuan IDP seluruh karyawan.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/talent/admin/idp/cycles">
                       Lihat Detail Cycles
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Donut Chart */}
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Quick Stats List */}
                  <div className="flex flex-col justify-center space-y-4 pr-4">
                    <h4 className="font-semibold text-sm mb-2 text-[var(--color-text-heading)]">Detail Breakdown</h4>
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[var(--color-text-body)]">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{item.value}</span>
                          <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">
                            {Math.round((item.value / totalEmployees) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 mt-2 border-t border-dashed">
                       <div className="flex items-center justify-between text-sm font-semibold">
                          <span>Total Karyawan</span>
                          <span>{totalEmployees}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Pending Approvals */}
            <Card className="shadow-sm border-[var(--color-border)] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-heading">Action Required</CardTitle>
                <CardDescription>Submission terbaru menunggu review.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <div className="flex-1 overflow-y-auto max-h-[300px]">
                  {pendingApprovals.length > 0 ? (
                    <div className="divide-y divide-[var(--color-border)]">
                      {pendingApprovals.slice(0, 5).map(record => (
                        <div key={record.id} className="p-4 hover:bg-slate-50 transition-colors group">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm text-[var(--color-text-heading)]">{record.employee?.name}</span>
                            <span className="text-[10px] text-[var(--color-text-muted)] bg-slate-100 px-1.5 py-0.5 rounded">
                              {new Date(record.submitted_at || "").toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)] mb-2">
                            {record.employee?.current_position_title}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                             <span className="text-xs text-[var(--color-text-muted)]">
                               {record.total_hours} Jam Aktivitas
                             </span>
                             <Button variant="ghost" size="sm" className="h-6 text-xs text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] p-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               Review
                             </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-[var(--color-text-muted)] text-sm flex flex-col items-center">
                      <div className="p-3 bg-green-50 rounded-full mb-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <p>Semua beres! Tidak ada pending approval saat ini.</p>
                    </div>
                  )}
                </div>
                {pendingApprovals.length > 0 && (
                  <div className="p-4 border-t bg-slate-50 mt-auto">
                    <Button variant="outline" className="w-full text-xs" asChild>
                      <Link to="/talent/admin/idp/approvals">
                        Lihat Semua Approval ({pendingApprovals.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analytics Row: Gap Analysis Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <Card className="lg:col-span-2 shadow-sm border-[var(--color-border)]">
                <CardHeader>
                   <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-heading">Top 5 Competency Gaps</CardTitle>
                        <CardDescription>Rata-rata gap kompetensi organisasi yang perlu ditutup.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/talent/admin/idp/gap-report">
                           <BarChart3 className="w-4 h-4 mr-2" />
                           Lihat Full Report
                        </Link>
                      </Button>
                   </div>
                </CardHeader>
                <CardContent>
                   <div className="h-[250px] w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={gapData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                          <XAxis type="number" domain={[0, 4]} hide />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={120} 
                            tick={{fontSize: 12, fill: '#64748b'}} 
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                          />
                          <Bar dataKey="gap" fill={COLORS.danger} radius={[0, 4, 4, 0]} barSize={20} name="Avg Gap Score">
                             {/* Label on bar end if needed */}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 text-sm text-amber-800">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Insight:</strong> Gap terbesar ada pada <strong>Digital Literacy</strong>. 
                        Disarankan untuk melakukan <Link to="/talent/admin/idp/bulk-assign" className="underline font-semibold hover:text-amber-900">Bulk Assignment</Link> pelatihan digital dasar ke Job Family non-IT.
                      </p>
                   </div>
                </CardContent>
             </Card>

             <Card className="bg-[var(--color-primary)] text-white border-none shadow-md">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                   <div>
                      <h3 className="text-xl font-bold mb-2 font-heading text-[rgb(219,234,254)]">Siapkan Laporan IDP?</h3>
                      <p className="text-blue-100 text-sm mb-6">
                        Unduh laporan komprehensif status IDP, completion rate, dan analisis gap kompetensi untuk keperluan management meeting.
                      </p>
                   </div>
                   
                   <div className="space-y-3">
                      <Button className="w-full bg-white text-[var(--color-primary)] hover:bg-blue-50 border-0">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Download PDF Report
                      </Button>
                      <Button variant="outline" className="w-full border-blue-400 text-white hover:bg-blue-800 hover:text-white bg-transparent">
                        Export Data (Excel)
                      </Button>
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
