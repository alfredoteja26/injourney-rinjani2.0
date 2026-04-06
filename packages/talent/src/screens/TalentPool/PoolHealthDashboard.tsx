import { 
  Users, 
  Star, 
  BarChart2, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  AlertCircle,
  FileText
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { PoolMetrics } from "./types";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PoolHealthDashboardProps {
  metrics: PoolMetrics;
}

export function PoolHealthDashboard({ metrics }: PoolHealthDashboardProps) {
  
  const eqsChartData = Object.entries(metrics.eqs_distribution).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']; // HQ, Q, ND, NR

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Pool Health Dashboard</h2>
        <div className="flex gap-3">
          <Select defaultValue="2026">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">Talent Pool 2026</SelectItem>
              <SelectItem value="2025">Talent Pool 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">In Pool</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.total_pool}</h3>
              <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" /> +12 from last period
              </p>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Top Talent</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.top_talent_count}</h3>
              <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" /> +5 from last period
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
              <Star className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg EQS</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.avg_eqs}</h3>
              <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-2">
                <ArrowDownRight className="w-3 h-3" /> -1.2 from last period
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <BarChart2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Coverage</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.coverage_percent}%</h3>
              <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" /> +2% from last period
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* EQS Distribution */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-800 mb-4">EQS Band Distribution</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eqsChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {eqsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Indicators */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-800 mb-4">Risk Indicators</h3>
            <div className="grid grid-cols-1 gap-4">
              
              <div className="flex items-center gap-4 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50">
                <div className="p-2 bg-white rounded-full shadow-sm text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{metrics.risk_counts.low_successor} Positions</h4>
                  <p className="text-sm text-slate-600">Have &lt; 3 successors defined</p>
                </div>
                <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100">
                  View Positions →
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border-l-4 border-red-500 bg-red-50">
                <div className="p-2 bg-white rounded-full shadow-sm text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{metrics.risk_counts.flight_risk} Flight Risk</h4>
                  <p className="text-sm text-slate-600">High potential candidates identified as flight risk</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-700 hover:text-red-800 hover:bg-red-100">
                  View Candidates →
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50">
                <div className="p-2 bg-white rounded-full shadow-sm text-orange-500">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{metrics.risk_counts.tr_pending} TR Proposed</h4>
                  <p className="text-sm text-slate-600">Pending action in Talent Review</p>
                </div>
                <Button variant="ghost" size="sm" className="text-orange-700 hover:text-orange-800 hover:bg-orange-100">
                  View Proposals →
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
