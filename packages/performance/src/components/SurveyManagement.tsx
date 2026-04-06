import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SurveyBuilder } from "./SurveyBuilder";
import { toast } from "sonner@2.0.3";

// Mock survey data for admin
const MOCK_ADMIN_SURVEYS = [
  {
    id: "SURVEY-001",
    title: "Employee Engagement Q4 2024",
    type: "Engagement",
    status: "active",
    createdDate: "2024-12-01",
    deadline: "2024-12-31",
    targetDepartments: ["All Departments"],
    responseCount: 234,
    targetCount: 500,
    totalQuestions: 12,
    allowPreview: true,
    createdBy: "Admin",
  },
  {
    id: "SURVEY-002",
    title: "Workplace Environment Feedback",
    type: "Feedback",
    status: "active",
    createdDate: "2024-12-05",
    deadline: "2024-12-28",
    targetDepartments: ["Technology", "Operations"],
    responseCount: 145,
    targetCount: 200,
    totalQuestions: 8,
    allowPreview: true,
    createdBy: "HR Team",
  },
  {
    id: "SURVEY-003",
    title: "Training & Development Needs",
    type: "Development",
    status: "active",
    createdDate: "2024-12-10",
    deadline: "2025-01-05",
    targetDepartments: ["All Departments"],
    responseCount: 89,
    targetCount: 500,
    totalQuestions: 10,
    allowPreview: false,
    createdBy: "Learning Team",
  },
  {
    id: "SURVEY-004",
    title: "Annual Performance Review Feedback",
    type: "Performance",
    status: "closed",
    createdDate: "2024-11-15",
    deadline: "2024-12-15",
    targetDepartments: ["All Departments"],
    responseCount: 478,
    targetCount: 500,
    totalQuestions: 15,
    allowPreview: true,
    createdBy: "Admin",
  },
  {
    id: "SURVEY-005",
    title: "Remote Work Preferences",
    type: "Feedback",
    status: "draft",
    createdDate: "2024-12-20",
    deadline: "2025-01-15",
    targetDepartments: ["Technology", "Marketing"],
    responseCount: 0,
    targetCount: 300,
    totalQuestions: 6,
    allowPreview: true,
    createdBy: "Admin",
  },
];

interface SurveyManagementProps {
  onBack: () => void;
}

export function SurveyManagement({ onBack }: SurveyManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "closed">("all");
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<typeof MOCK_ADMIN_SURVEYS[0] | null>(null);

  const filteredSurveys = MOCK_ADMIN_SURVEYS.filter((survey) => {
    const matchesSearch =
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || survey.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSurvey = () => {
    setSelectedSurvey(null);
    setShowBuilder(true);
  };

  const handleEditSurvey = (survey: typeof MOCK_ADMIN_SURVEYS[0]) => {
    setSelectedSurvey(survey);
    setShowBuilder(true);
  };

  const handleDeleteSurvey = (surveyId: string) => {
    toast.success(`Survey ${surveyId} deleted successfully`);
  };

  const handleDuplicateSurvey = (surveyId: string) => {
    toast.success(`Survey ${surveyId} duplicated successfully`);
  };

  const handleCloseSurvey = (surveyId: string) => {
    toast.success(`Survey ${surveyId} closed successfully`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getResponseProgress = (survey: typeof MOCK_ADMIN_SURVEYS[0]) => {
    return Math.round((survey.responseCount / survey.targetCount) * 100);
  };

  if (showBuilder) {
    return (
      <SurveyBuilder
        survey={selectedSurvey}
        onBack={() => {
          setShowBuilder(false);
          setSelectedSurvey(null);
        }}
      />
    );
  }

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
              <h1 className="mb-2">Survey Management</h1>
              <p className="caption text-muted-foreground">
                Create, edit, and manage employee surveys
              </p>
            </div>

            <Button onClick={handleCreateSurvey} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Survey
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="caption text-muted-foreground">Total Surveys</span>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[24px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {MOCK_ADMIN_SURVEYS.length}
            </span>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="caption text-muted-foreground">Active</span>
              <CheckCircle className="w-5 h-5 text-chart-1" />
            </div>
            <span className="text-[24px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {MOCK_ADMIN_SURVEYS.filter((s) => s.status === "active").length}
            </span>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="caption text-muted-foreground">Draft</span>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-[24px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {MOCK_ADMIN_SURVEYS.filter((s) => s.status === "draft").length}
            </span>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="caption text-muted-foreground">Total Responses</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[24px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {MOCK_ADMIN_SURVEYS.reduce((sum, s) => sum + s.responseCount, 0)}
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search surveys by title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Status: {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("closed")}>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Surveys Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Survey Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell>
                    <div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {survey.title}
                      </div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        {survey.id} • {survey.totalQuestions} questions
                      </div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Target: {survey.targetDepartments.join(", ")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="caption">{survey.type}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(survey.status)}</TableCell>
                  <TableCell>
                    <span className="caption text-muted-foreground">
                      {new Date(survey.deadline).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="caption">
                      <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {survey.responseCount}
                      </span>
                      <span className="text-muted-foreground">/{survey.targetCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${getResponseProgress(survey)}%` }}
                        />
                      </div>
                      <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        {getResponseProgress(survey)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditSurvey(survey)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateSurvey(survey.id)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        {survey.status === "active" && (
                          <DropdownMenuItem onClick={() => handleCloseSurvey(survey.id)}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Close Survey
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteSurvey(survey.id)}
                          className="text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
