import { useState } from "react";
import { 
  BarChart3, 
  Filter, 
  Download, 
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Layers,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { mockCompetencyGaps, mockEmployees } from "../../../data/idpData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

// Mock Aggregated Data for Charts
const jobFamilyGaps = [
  { name: 'Finance', avgGap: 1.2, criticalCount: 5, totalEmp: 45 },
  { name: 'Human Capital', avgGap: 0.8, criticalCount: 2, totalEmp: 30 },
  { name: 'IT & Digital', avgGap: 2.1, criticalCount: 12, totalEmp: 55 },
  { name: 'Operations', avgGap: 1.5, criticalCount: 8, totalEmp: 80 },
  { name: 'Marketing', avgGap: 1.1, criticalCount: 4, totalEmp: 35 },
  { name: 'Legal', avgGap: 0.5, criticalCount: 1, totalEmp: 20 },
];

const competencyRadarData = [
  { subject: 'Leadership', A: 3.5, B: 4, fullMark: 5 },
  { subject: 'Digital', A: 2.5, B: 4, fullMark: 5 },
  { subject: 'Financial', A: 3.0, B: 3.5, fullMark: 5 },
  { subject: 'Communication', A: 4.2, B: 4.0, fullMark: 5 },
  { subject: 'Project Mgmt', A: 3.2, B: 4.0, fullMark: 5 },
  { subject: 'Strategic', A: 2.8, B: 4.0, fullMark: 5 },
];

export function GapAnalysisReportScreen() {
  const [filterDept, setFilterDept] = useState("all");
  
  // Find critical employees (mock logic based on available data)
  // In a real app, this would query employees with gap_severity="significant"
  const criticalEmployees = mockEmployees.slice(0, 5).map(emp => ({
    ...emp,
    topGap: "Digital Literacy",
    gapScore: 2,
    severity: "High"
  }));

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Gap Analysis Report
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Analisis kesenjangan kompetensi organisasi untuk perencanaan pengembangan strategis.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="bg-white">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="border-[var(--color-border)] shadow-sm">
             <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-end md:items-center">
                <div className="grid gap-1.5 flex-1 w-full">
                   <span className="text-xs font-medium text-[var(--color-text-muted)]">Cari Jabatan / Karyawan</span>
                   <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                      <Input placeholder="Search..." className="pl-9 h-9" />
                   </div>
                </div>
                <div className="grid gap-1.5 w-full md:w-[200px]">
                   <span className="text-xs font-medium text-[var(--color-text-muted)]">Direktorat</span>
                   <Select value={filterDept} onValueChange={setFilterDept}>
                     <SelectTrigger className="h-9">
                       <SelectValue placeholder="Semua Direktorat" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">Semua Direktorat</SelectItem>
                       <SelectItem value="fin">Finance & Risk</SelectItem>
                       <SelectItem value="hc">Human Capital</SelectItem>
                       <SelectItem value="ops">Operations</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                <div className="grid gap-1.5 w-full md:w-[200px]">
                   <span className="text-xs font-medium text-[var(--color-text-muted)]">Job Family</span>
                   <Select>
                     <SelectTrigger className="h-9">
                       <SelectValue placeholder="Semua Job Family" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">Semua Job Family</SelectItem>
                       <SelectItem value="it">IT & Digital</SelectItem>
                       <SelectItem value="mkt">Marketing</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
             </CardContent>
          </Card>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <Card className="bg-slate-900 text-white border-0 shadow-md">
                <CardContent className="p-6">
                   <div className="text-sm text-slate-300 mb-1">Avg Organization Gap</div>
                   <div className="text-3xl font-bold font-heading">1.4 <span className="text-sm font-normal text-slate-400">/ 5.0</span></div>
                   <div className="flex items-center gap-1 mt-2 text-xs text-red-300">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>+0.2 vs Last Cycle</span>
                   </div>
                </CardContent>
             </Card>
             <Card>
                <CardContent className="p-6">
                   <div className="text-sm text-[var(--color-text-muted)] mb-1">Most Critical Dept</div>
                   <div className="text-2xl font-bold text-[var(--color-text-heading)]">IT & Digital</div>
                   <div className="text-xs text-[var(--color-text-muted)] mt-1">
                      Avg Gap: <span className="text-red-600 font-semibold">2.1</span> (Significant)
                   </div>
                </CardContent>
             </Card>
             <Card>
                <CardContent className="p-6">
                   <div className="text-sm text-[var(--color-text-muted)] mb-1">Biggest Competency Gap</div>
                   <div className="text-2xl font-bold text-[var(--color-text-heading)]">Digital Literacy</div>
                   <div className="text-xs text-[var(--color-text-muted)] mt-1">
                      Organization-wide issue
                   </div>
                </CardContent>
             </Card>
             <Card>
                <CardContent className="p-6">
                   <div className="text-sm text-[var(--color-text-muted)] mb-1">Employees w/ Critical Gaps</div>
                   <div className="text-3xl font-bold text-red-600">32</div>
                   <div className="text-xs text-[var(--color-text-muted)] mt-1">
                      Require immediate intervention
                   </div>
                </CardContent>
             </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Chart 1: Gaps by Job Family */}
             <Card className="shadow-sm border-[var(--color-border)]">
                <CardHeader>
                   <CardTitle className="text-lg">Gap Severity by Job Family</CardTitle>
                   <CardDescription>Rata-rata selisih level kompetensi (Current vs Required).</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="h-[300px] w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={jobFamilyGaps} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e2e8f0" />
                            <XAxis type="number" domain={[0, 4]} />
                            <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                            <Tooltip 
                               cursor={{fill: '#f8fafc'}}
                               contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0'}}
                            />
                            <Bar dataKey="avgGap" name="Avg Gap" fill="#00495d" radius={[0, 4, 4, 0]} barSize={24} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </CardContent>
             </Card>

             {/* Chart 2: Competency Radar */}
             <Card className="shadow-sm border-[var(--color-border)]">
                <CardHeader>
                   <CardTitle className="text-lg">Organization Competency Profile</CardTitle>
                   <CardDescription>Current Capability (A) vs Required Standard (B).</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="h-[300px] w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                         <RadarChart outerRadius={90} data={competencyRadarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 5]} />
                            <Radar
                               name="Current Capability"
                               dataKey="A"
                               stroke="#00495d"
                               fill="#00495d"
                               fillOpacity={0.3}
                            />
                            <Radar
                               name="Required Standard"
                               dataKey="B"
                               stroke="#ff9220"
                               fill="#ff9220"
                               fillOpacity={0}
                               strokeDasharray="4 4"
                            />
                            <Legend />
                            <Tooltip />
                         </RadarChart>
                      </ResponsiveContainer>
                   </div>
                </CardContent>
             </Card>
          </div>

          {/* Critical Employees Table */}
          <Card className="shadow-sm border-[var(--color-border)]">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-lg">Critical Gap Employees</CardTitle>
                   <CardDescription>Karyawan dengan gap kompetensi signifikan yang membutuhkan prioritas IDP.</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
             </CardHeader>
             <CardContent>
                <Table>
                   <TableHeader>
                      <TableRow>
                         <TableHead>Nama Karyawan</TableHead>
                         <TableHead>Posisi</TableHead>
                         <TableHead>Job Family</TableHead>
                         <TableHead>Top Gap</TableHead>
                         <TableHead>Severity</TableHead>
                         <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {criticalEmployees.map(emp => (
                         <TableRow key={emp.id}>
                            <TableCell className="font-medium">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[var(--color-primary)]">
                                     {emp.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                  </div>
                                  <div>
                                     <div>{emp.name}</div>
                                     <div className="text-[10px] text-[var(--color-text-muted)]">{emp.nik}</div>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell>{emp.current_position_title}</TableCell>
                            <TableCell>{emp.job_family_name}</TableCell>
                            <TableCell>
                               <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
                                  {emp.topGap} (-{emp.gapScore})
                               </Badge>
                            </TableCell>
                            <TableCell>
                               <span className="flex items-center gap-1.5 text-red-600 font-medium text-xs">
                                  <AlertTriangle className="w-3.5 h-3.5" /> High
                               </span>
                            </TableCell>
                            <TableCell className="text-right">
                               <Button size="sm" variant="ghost" className="text-[var(--color-primary)]">
                                  Assign IDP
                               </Button>
                            </TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
