import { AlertCircle, ArrowRight, BarChart3, Calendar, CheckCircle2, Clock, FileCheck, Users } from "lucide-react";
import { Link } from "react-router";
import {
  Button,
  PageHeader,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
} from "@rinjani/shared-ui";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminLayout } from "../../../components/shell/AdminLayout";
import { mockIDPCycles, mockIDPRecords, mockEmployees } from "../../../data/idpData";

const STATUS_COLORS = {
  approved: "var(--color-success)",
  pending_approval: "var(--color-warning)",
  revision_requested: "var(--color-destructive)",
  draft: "var(--color-muted-foreground)",
  not_started: "var(--color-chart-5)",
};

const tooltipStyle = {
  borderRadius: "16px",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-card)",
  color: "var(--color-foreground)",
  boxShadow: "var(--shadow-sm)",
};

function formatIdDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatIdShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function AdminDashboardScreen() {
  const activeCycle = mockIDPCycles.find((cycle) => cycle.status === "active");

  const totalEmployees = mockEmployees.length;
  const totalRecords = mockIDPRecords.filter((record) => record.cycle_id === activeCycle?.id).length;
  const participationRate = totalEmployees > 0 ? (totalRecords / totalEmployees) * 100 : 0;

  const approvedCount = mockIDPRecords.filter((record) => record.status === "approved").length;
  const pendingCount = mockIDPRecords.filter((record) => record.status === "pending_approval").length;
  const revisionCount = mockIDPRecords.filter((record) => record.status === "revision_requested").length;
  const draftCount = mockIDPRecords.filter((record) => record.status === "draft").length;
  const notStartedCount = totalEmployees - totalRecords;

  const approvalRate = totalRecords > 0 ? (approvedCount / totalRecords) * 100 : 0;

  const pendingApprovals = mockIDPRecords
    .filter((record) => record.status === "pending_approval")
    .map((record) => {
      const employee = mockEmployees.find((item) => item.id === record.employee_id);
      return { ...record, employee };
    });

  const statusData = useMemo(
    () =>
      [
        { name: "Approved", value: approvedCount, color: STATUS_COLORS.approved },
        { name: "Pending", value: pendingCount, color: STATUS_COLORS.pending_approval },
        { name: "Revision", value: revisionCount, color: STATUS_COLORS.revision_requested },
        { name: "Draft", value: draftCount, color: STATUS_COLORS.draft },
        { name: "Not Started", value: notStartedCount, color: STATUS_COLORS.not_started },
      ].filter((item) => item.value > 0),
    [approvedCount, draftCount, notStartedCount, pendingCount, revisionCount],
  );

  const gapData = useMemo(
    () => [
      { name: "Digital Literacy", gap: 2.5 },
      { name: "Leadership", gap: 1.8 },
      { name: "Proj. Mgmt", gap: 1.5 },
      { name: "Strategic Thinking", gap: 1.2 },
      { name: "Communication", gap: 0.8 },
    ],
    [],
  );

  if (!activeCycle) {
    return (
      <AdminLayout>
        <div className="mx-auto max-w-[var(--layout-max-width-governance)] px-4 pb-10 pt-6 md:px-6 lg:px-8">
          <SectionPanel>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Calendar className="size-10" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Tidak Ada Periode IDP Aktif</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Silakan hubungi HC Admin untuk informasi lebih lanjut mengenai siklus pengembangan yang sedang berjalan.
              </p>
            </div>
          </SectionPanel>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[var(--layout-max-width-governance)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <PageHeader
          variant="governance"
          eyebrow="Talent Development HQ"
          title="Talent Development HQ"
          description={`Overview & Analytics IDP Periode: ${activeCycle.name}. Data, routes, dan action flow tetap sama; tampilan diselaraskan ke shared design system.`}
          badge={<StatusBadge status={activeCycle.status}>Aktif</StatusBadge>}
          actions={
            <Button asChild variant="outline">
              <Link to="/talent/admin/idp/cycles">Lihat Detail Cycles</Link>
            </Button>
          }
        />

        <StatCardGroup>
          <StatCard
            label="Total Partisipasi"
            value={<span className="tabular-nums">{Math.round(participationRate)}%</span>}
            description="Porsi karyawan yang sudah memiliki record IDP pada siklus aktif."
            supportingText={`${totalRecords} / ${totalEmployees} karyawan`}
            icon={<Users size={18} />}
            tone="info"
          />
          <StatCard
            label="Completion Rate"
            value={<span className="tabular-nums">{Math.round(approvalRate)}%</span>}
            description="Persentase IDP yang sudah mendapat approval."
            supportingText={`${approvedCount} IDP approved`}
            icon={<FileCheck size={18} />}
            tone="success"
          />
          <StatCard
            label="Pending Action"
            value={<span className="tabular-nums">{pendingCount}</span>}
            description="Submission terbaru yang masih menunggu review manager."
            supportingText="Menunggu approval manager"
            icon={<Clock size={18} />}
            tone="warning"
          />
          <StatCard
            label="Need Attention"
            value={<span className="tabular-nums">{revisionCount}</span>}
            description="IDP yang perlu revisi sebelum bisa diproses lebih lanjut."
            supportingText={`${draftCount} draft dan ${notStartedCount} belum mulai`}
            icon={<AlertCircle size={18} />}
            tone="destructive"
          />
        </StatCardGroup>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.9fr)]">
          <div className="space-y-6">
            <SectionPanel
              title={<span className="text-2xl">Status Distribusi IDP</span>}
              description="Pemantauan status pengajuan IDP seluruh karyawan dalam satu tampilan yang lebih tenang dan konsisten."
              actions={
                <Button asChild variant="outline" size="sm">
                  <Link to="/talent/admin/idp/cycles">
                    Lihat Detail Cycles
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              }
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="h-[300px] min-w-0 rounded-[20px] border border-border bg-muted/30 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={82} paddingAngle={5} dataKey="value">
                        {statusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground">Detail Breakdown</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Komposisi status tetap sama, hanya dibingkai ulang agar lebih mudah dipindai.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-4 rounded-[16px] border border-border bg-card px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="tabular-nums text-sm font-semibold text-foreground">{item.value}</span>
                          <span className="w-10 text-right text-xs text-muted-foreground">
                            {Math.round((item.value / totalEmployees) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-[16px] border border-dashed border-border bg-muted/20 px-4 py-3">
                    <span className="text-sm font-medium text-foreground">Total Karyawan</span>
                    <span className="text-sm font-semibold tabular-nums text-foreground">{totalEmployees}</span>
                  </div>
                </div>
              </div>
            </SectionPanel>

            <SectionPanel
              title={<span className="text-2xl">Top 5 Competency Gaps</span>}
              description="Rata-rata gap kompetensi organisasi yang perlu ditutup pada siklus berjalan."
              actions={
                <Button asChild variant="outline" size="sm">
                  <Link to="/talent/admin/idp/gap-report">
                    <BarChart3 className="size-4" />
                    Lihat Full Report
                  </Link>
                </Button>
              }
            >
              <div className="h-[260px] min-w-0 rounded-[20px] border border-border bg-card p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gapData} layout="vertical" margin={{ top: 5, right: 24, left: 8, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                    <XAxis type="number" domain={[0, 4]} hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={132}
                      tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--color-muted)" }}
                      contentStyle={tooltipStyle}
                      formatter={(value) => [value, "Avg Gap Score"]}
                    />
                    <Bar dataKey="gap" fill="var(--color-destructive)" radius={[0, 6, 6, 0]} barSize={20} name="Avg Gap Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex gap-3 rounded-[20px] border border-warning/20 bg-warning-muted/80 p-4 text-sm text-foreground">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-warning" />
                <p className="leading-6">
                  <strong>Insight:</strong> Gap terbesar ada pada <strong>Digital Literacy</strong>. Disarankan untuk melakukan{" "}
                  <Link to="/talent/admin/idp/bulk-assign" className="font-semibold text-warning hover:underline">
                    Bulk Assignment
                  </Link>{" "}
                  pelatihan digital dasar ke Job Family non-IT.
                </p>
              </div>
            </SectionPanel>
          </div>

          <div className="space-y-6">
            <SectionPanel
              title={<span className="text-2xl">Action Required</span>}
              description="Submission terbaru menunggu review dengan treatment visual yang tetap rapih saat daftar memanjang."
            >
              <div className="max-h-[360px] overflow-auto rounded-[20px] border border-border bg-card">
                {pendingApprovals.length > 0 ? (
                  <div className="divide-y divide-border">
                    {pendingApprovals.slice(0, 5).map((record) => (
                      <div key={record.id} className="group p-4 transition-colors hover:bg-muted/40">
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">{record.employee?.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{record.employee?.current_position_title}</p>
                          </div>
                          <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {formatIdShortDate(record.submitted_at || "")}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">{record.total_hours} Jam Aktivitas</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-3 rounded-full bg-success-muted p-3 text-success">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <p className="text-sm text-muted-foreground">Semua beres! Tidak ada pending approval saat ini.</p>
                  </div>
                )}
              </div>

              {pendingApprovals.length > 0 ? (
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/talent/admin/idp/approvals">Lihat Semua Approval ({pendingApprovals.length})</Link>
                  </Button>
                </div>
              ) : null}
            </SectionPanel>

            <SectionPanel
              title={<span className="text-2xl">Siapkan Laporan IDP?</span>}
              description="Unduh laporan komprehensif status IDP, completion rate, dan analisis gap kompetensi untuk management meeting."
              contentClassName="pt-5"
            >
              <div className="space-y-4 rounded-[20px] border border-primary/15 bg-primary/5 p-5">
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-foreground">
                    Ringkasan eksekutif tetap sama, tetapi sekarang dipresentasikan dengan surface dan tone warna yang mengikuti shared design system.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tanggal periode aktif: {formatIdDate(activeCycle.start_date)} - {formatIdDate(activeCycle.end_date)}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full">
                    <FileCheck className="size-4" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Data (Excel)
                  </Button>
                </div>
              </div>
            </SectionPanel>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
