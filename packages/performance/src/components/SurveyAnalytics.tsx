import { useState } from "react";
import { ChevronLeft, Download, Users, TrendingUp, BarChart3, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock analytics data
const MOCK_ANALYTICS = {
  totalResponses: 234,
  responseRate: 46.8,
  averageCompletionTime: "4.2 minutes",
  npsScore: 42,
  questionResults: [
    {
      id: "q1",
      question: "I am satisfied with my current role and responsibilities",
      type: "likert",
      responses: [
        { option: "Strongly Disagree", count: 12, percentage: 5.1 },
        { option: "Disagree", count: 28, percentage: 12.0 },
        { option: "Neutral", count: 67, percentage: 28.6 },
        { option: "Agree", count: 89, percentage: 38.0 },
        { option: "Strongly Agree", count: 38, percentage: 16.2 },
      ],
    },
    {
      id: "q2",
      question: "How likely are you to recommend this company?",
      type: "nps",
      promoters: 98, // 9-10
      passives: 76, // 7-8
      detractors: 60, // 0-6
      score: 16.2,
    },
    {
      id: "q3",
      question: "What is your preferred mode of communication?",
      type: "single",
      responses: [
        { option: "Email", count: 89, percentage: 38.0 },
        { option: "Slack/Teams", count: 112, percentage: 47.9 },
        { option: "In-person meetings", count: 18, percentage: 7.7 },
        { option: "Video calls", count: 15, percentage: 6.4 },
      ],
    },
  ],
};

// Mock raw responses
const MOCK_RAW_RESPONSES = [
  {
    id: "RES-001",
    employeeId: "EMP-INJ-0000000045",
    employeeName: "Anonymous",
    completedDate: "2024-12-24 14:32",
    duration: "3.5 minutes",
    responses: { q1: "Agree", q2: "9", q3: "Slack/Teams" },
  },
  {
    id: "RES-002",
    employeeId: "EMP-INJ-0000000067",
    employeeName: "Anonymous",
    completedDate: "2024-12-24 15:18",
    duration: "4.1 minutes",
    responses: { q1: "Strongly Agree", q2: "10", q3: "Email" },
  },
  {
    id: "RES-003",
    employeeId: "EMP-INJ-0000000023",
    employeeName: "Anonymous",
    completedDate: "2024-12-24 16:45",
    duration: "5.2 minutes",
    responses: { q1: "Neutral", q2: "7", q3: "Slack/Teams" },
  },
];

interface SurveyAnalyticsProps {
  survey: {
    id: string;
    title: string;
    description: string;
  };
  onBack: () => void;
  userRole?: "Admin" | "User";
}

export function SurveyAnalytics({ survey, onBack, userRole = "User" }: SurveyAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const COLORS = ["#00858A", "#5AE2C3", "#31C6B1", "#93F5D6", "#C8FAE5"];

  const handleExport = () => {
    // Implement export functionality
    alert("Exporting survey results...");
  };

  const getNPSCategory = (score: number) => {
    if (score >= 50) return { label: "Excellent", color: "text-chart-1" };
    if (score >= 30) return { label: "Good", color: "text-chart-3" };
    if (score >= 0) return { label: "Fair", color: "text-muted-foreground" };
    return { label: "Needs Improvement", color: "text-destructive-foreground" };
  };

  const npsCategory = getNPSCategory(MOCK_ANALYTICS.npsScore);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ChevronLeft className="w-5 h-5" />
              Back
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">{survey.title} - Results</h1>
              <p className="caption text-muted-foreground">{survey.description}</p>
            </div>

            {userRole === "Admin" && (
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Results
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics Overview
            </TabsTrigger>
            {userRole === "Admin" && (
              <TabsTrigger value="raw" className="gap-2">
                <FileText className="w-4 h-4" />
                Raw Responses
              </TabsTrigger>
            )}
          </TabsList>

          {/* Analytics Overview */}
          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-muted-foreground">Total Responses</span>
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {MOCK_ANALYTICS.totalResponses}
                </span>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-muted-foreground">Response Rate</span>
                  <TrendingUp className="w-5 h-5 text-chart-1" />
                </div>
                <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {MOCK_ANALYTICS.responseRate}%
                </span>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-muted-foreground">Avg. Completion</span>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {MOCK_ANALYTICS.averageCompletionTime}
                </span>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-muted-foreground">NPS Score</span>
                  <Badge className={`${npsCategory.color} bg-transparent border-0`}>
                    {npsCategory.label}
                  </Badge>
                </div>
                <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {MOCK_ANALYTICS.npsScore}
                </span>
              </div>
            </div>

            {/* Question Results */}
            <div className="space-y-6">
              {MOCK_ANALYTICS.questionResults.map((question, index) => (
                <div key={question.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-4">
                    <span className="caption text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                      Q{index + 1}
                    </span>
                    <h4 className="mt-2">{question.question}</h4>
                  </div>

                  {question.type === "likert" && (
                    <div className="space-y-4">
                      {question.responses?.map((response, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="caption">{response.option}</span>
                            <span className="caption text-muted-foreground">
                              {response.count} ({response.percentage}%)
                            </span>
                          </div>
                          <Progress value={response.percentage} />
                        </div>
                      ))}

                      {/* Bar Chart */}
                      <div className="mt-6">
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={question.responses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis
                              dataKey="option"
                              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                              angle={-45}
                              textAnchor="end"
                              height={100}
                            />
                            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {question.type === "nps" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-chart-1/10 border border-chart-1/20 rounded-lg p-4">
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Promoters (9-10)
                          </div>
                          <div className="text-[24px] text-chart-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {question.promoters}
                          </div>
                          <div className="caption text-muted-foreground">
                            {((question.promoters / MOCK_ANALYTICS.totalResponses) * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div className="bg-muted/50 border border-border rounded-lg p-4">
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Passives (7-8)
                          </div>
                          <div className="text-[24px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {question.passives}
                          </div>
                          <div className="caption text-muted-foreground">
                            {((question.passives / MOCK_ANALYTICS.totalResponses) * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div className="bg-destructive-foreground/10 border border-destructive-foreground/20 rounded-lg p-4">
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Detractors (0-6)
                          </div>
                          <div className="text-[24px] text-destructive-foreground" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {question.detractors}
                          </div>
                          <div className="caption text-muted-foreground">
                            {((question.detractors / MOCK_ANALYTICS.totalResponses) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                        <div className="caption text-muted-foreground mb-1">NPS Score</div>
                        <div className="text-[48px] text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          {question.score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  )}

                  {question.type === "single" && (
                    <div className="space-y-4">
                      {question.responses?.map((response, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="caption">{response.option}</span>
                            <span className="caption text-muted-foreground">
                              {response.count} ({response.percentage}%)
                            </span>
                          </div>
                          <Progress value={response.percentage} />
                        </div>
                      ))}

                      {/* Pie Chart */}
                      <div className="mt-6">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={question.responses}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ option, percentage }) => `${option}: ${percentage}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="count"
                            >
                              {question.responses?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Raw Responses */}
          {userRole === "Admin" && (
            <TabsContent value="raw">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Response ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Responses</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_RAW_RESPONSES.map((response) => (
                      <TableRow key={response.id}>
                        <TableCell>
                          <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {response.id}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="caption">{response.employeeName}</span>
                        </TableCell>
                        <TableCell>
                          <span className="caption text-muted-foreground">{response.completedDate}</span>
                        </TableCell>
                        <TableCell>
                          <span className="caption">{response.duration}</span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
