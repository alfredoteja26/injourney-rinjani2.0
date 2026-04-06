import { useState } from "react";
import { 
  ClipboardList, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Users,
  Calendar,
  Eye
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { SurveyForm } from "./SurveyForm";
import { SurveyManagement } from "./SurveyManagement";
import { SurveyAnalytics } from "./SurveyAnalytics";

// Mock data for surveys
export const MOCK_SURVEYS = [
  {
    id: "SURVEY-001",
    title: "Employee Engagement Q4 2024",
    description: "Help us understand your experience and engagement at work",
    type: "engagement",
    status: "active",
    deadline: "2024-12-31",
    totalQuestions: 12,
    estimatedTime: "5-7 minutes",
    completed: false,
    allowPreview: true,
    targetDepartments: ["All Departments"],
    responseCount: 234,
    targetCount: 500,
  },
  {
    id: "SURVEY-002",
    title: "Workplace Environment Feedback",
    description: "Share your thoughts about our workplace facilities and environment",
    type: "feedback",
    status: "active",
    deadline: "2024-12-28",
    totalQuestions: 8,
    estimatedTime: "3-5 minutes",
    completed: true,
    completedDate: "2024-12-20",
    allowPreview: true,
    targetDepartments: ["Technology", "Operations"],
    responseCount: 145,
    targetCount: 200,
  },
  {
    id: "SURVEY-003",
    title: "Training & Development Needs",
    description: "Help us identify areas where you'd like to grow professionally",
    type: "development",
    status: "active",
    deadline: "2025-01-05",
    totalQuestions: 10,
    estimatedTime: "4-6 minutes",
    completed: false,
    allowPreview: false,
    targetDepartments: ["All Departments"],
    responseCount: 89,
    targetCount: 500,
  },
  {
    id: "SURVEY-004",
    title: "Annual Performance Review Feedback",
    description: "Provide feedback on the performance review process",
    type: "performance",
    status: "closed",
    deadline: "2024-12-15",
    totalQuestions: 15,
    estimatedTime: "7-10 minutes",
    completed: true,
    completedDate: "2024-12-10",
    allowPreview: true,
    targetDepartments: ["All Departments"],
    responseCount: 478,
    targetCount: 500,
  },
  {
    id: "SURVEY-005",
    title: "Remote Work Policy Feedback",
    description: "Share your experience with our hybrid work arrangements",
    type: "feedback",
    status: "active",
    deadline: "2025-01-15",
    totalQuestions: 8,
    estimatedTime: "4-5 minutes",
    completed: false,
    allowPreview: true,
    targetDepartments: ["Technology", "Marketing", "Finance"],
    responseCount: 67,
    targetCount: 300,
  },
  {
    id: "SURVEY-006",
    title: "Company Culture & Values Assessment",
    description: "Help us understand how well our values align with daily operations",
    type: "culture",
    status: "active",
    deadline: "2025-01-20",
    totalQuestions: 14,
    estimatedTime: "6-8 minutes",
    completed: false,
    allowPreview: true,
    targetDepartments: ["All Departments"],
    responseCount: 156,
    targetCount: 500,
  },
  {
    id: "SURVEY-007",
    title: "Leadership Effectiveness Survey",
    description: "Provide confidential feedback about leadership practices",
    type: "performance",
    status: "active",
    deadline: "2025-01-10",
    totalQuestions: 16,
    estimatedTime: "7-9 minutes",
    completed: false,
    allowPreview: false,
    targetDepartments: ["All Departments"],
    responseCount: 203,
    targetCount: 500,
  },
  {
    id: "SURVEY-008",
    title: "Health & Wellness Program Interest",
    description: "Help us design wellness programs that matter to you",
    type: "feedback",
    status: "active",
    deadline: "2025-01-12",
    totalQuestions: 9,
    estimatedTime: "4-5 minutes",
    completed: false,
    allowPreview: true,
    targetDepartments: ["All Departments"],
    responseCount: 112,
    targetCount: 500,
  },
  {
    id: "SURVEY-009",
    title: "Technology & Tools Satisfaction",
    description: "Rate the effectiveness of tools and systems you use daily",
    type: "feedback",
    status: "active",
    deadline: "2025-01-18",
    totalQuestions: 11,
    estimatedTime: "5-6 minutes",
    completed: false,
    allowPreview: true,
    targetDepartments: ["Technology", "Operations", "Finance"],
    responseCount: 89,
    targetCount: 250,
  },
  {
    id: "SURVEY-010",
    title: "Diversity & Inclusion Pulse Check",
    description: "Share your perspective on inclusivity in our workplace",
    type: "culture",
    status: "active",
    deadline: "2025-01-25",
    totalQuestions: 13,
    estimatedTime: "6-7 minutes",
    completed: false,
    allowPreview: false,
    targetDepartments: ["All Departments"],
    responseCount: 178,
    targetCount: 500,
  },
];

interface EmployeeSurveyProps {
  userRole?: "Admin" | "User";
  userEmail?: string;
  onNavigateToSurvey?: (surveyId: string) => void;
}

export default function EmployeeSurvey({ 
  userRole = "User", 
  userEmail = "",
  onNavigateToSurvey 
}: EmployeeSurveyProps) {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const [showManagement, setShowManagement] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedAnalyticsSurvey, setSelectedAnalyticsSurvey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  const activeSurveys = MOCK_SURVEYS.filter(s => s.status === "active");
  const completedSurveys = MOCK_SURVEYS.filter(s => s.completed);
  const pendingSurveys = activeSurveys.filter(s => !s.completed);

  const handleTakeSurvey = (survey: typeof MOCK_SURVEYS[0]) => {
    // If callback provided, use full page navigation
    if (onNavigateToSurvey) {
      onNavigateToSurvey(survey.id);
    } else {
      // Fallback to inline view
      setSelectedSurvey(survey.id);
    }
  };

  const handleViewResults = (survey: typeof MOCK_SURVEYS[0]) => {
    // If callback provided, use full page navigation
    if (onNavigateToSurvey) {
      onNavigateToSurvey(survey.id);
    } else {
      // Fallback to inline view
      setSelectedAnalyticsSurvey(survey.id);
      setShowAnalytics(true);
    }
  };

  const handleManageSurveys = () => {
    // If callback provided, use full page navigation
    if (onNavigateToSurvey) {
      onNavigateToSurvey("");
    } else {
      // Fallback to inline view
      setShowManagement(true);
    }
  };

  const handleBackToList = () => {
    setSelectedSurvey(null);
    setShowManagement(false);
    setShowAnalytics(false);
    setSelectedAnalyticsSurvey(null);
  };

  const getStatusBadge = (survey: typeof MOCK_SURVEYS[0]) => {
    if (survey.status === "closed") {
      return <Badge variant="outline" className="bg-muted text-muted-foreground">Closed</Badge>;
    }
    if (survey.completed) {
      return <Badge className="bg-chart-2/10 text-chart-1 border-chart-2/20">Completed</Badge>;
    }
    return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
  };

  const getResponseProgress = (survey: typeof MOCK_SURVEYS[0]) => {
    return Math.round((survey.responseCount / survey.targetCount) * 100);
  };

  // Show different views based on currentView state
  if (selectedSurvey) {
    const survey = MOCK_SURVEYS.find(s => s.id === selectedSurvey);
    if (survey) {
      return <SurveyForm survey={survey} onBack={handleBackToList} />;
    }
  }

  if (showManagement && userRole === "Admin") {
    return <SurveyManagement onBack={handleBackToList} />;
  }

  if (showAnalytics && selectedAnalyticsSurvey) {
    const survey = MOCK_SURVEYS.find(s => s.id === selectedAnalyticsSurvey);
    if (survey) {
      return <SurveyAnalytics survey={survey} onBack={handleBackToList} userRole={userRole} />;
    }
  }

  // Default: List view
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-primary" />
          <div>
            <h2>Employee Surveys</h2>
            <p className="caption text-muted-foreground">
              Share your feedback and help us improve
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="caption text-muted-foreground">Active Surveys</span>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {activeSurveys.length}
            </span>
            <span className="caption text-muted-foreground">surveys</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="caption text-muted-foreground">Pending</span>
            <AlertCircle className="w-5 h-5 text-destructive-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {pendingSurveys.length}
            </span>
            <span className="caption text-muted-foreground">to complete</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="caption text-muted-foreground">Completed</span>
            <CheckCircle className="w-5 h-5 text-chart-1" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {completedSurveys.length}
            </span>
            <span className="caption text-muted-foreground">surveys</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 px-1 relative transition-colors ${
              activeTab === "pending"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontWeight: activeTab === "pending" ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)' }}
          >
            Pending Surveys
            {activeTab === "pending" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3 px-1 relative transition-colors ${
              activeTab === "completed"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontWeight: activeTab === "completed" ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)' }}
          >
            Completed Surveys
            {activeTab === "completed" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Pending Surveys */}
      {activeTab === "pending" && (
        <>
          {pendingSurveys.length > 0 ? (
            <div className="space-y-4">
              {pendingSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{survey.title}</h4>
                        {getStatusBadge(survey)}
                      </div>
                      <p className="caption text-muted-foreground mb-4">
                        {survey.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Deadline
                            </div>
                            <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                              {new Date(survey.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Questions
                            </div>
                            <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                              {survey.totalQuestions}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Est. Time
                            </div>
                            <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                              {survey.estimatedTime}
                            </div>
                          </div>
                        </div>

                        {userRole === "Admin" && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                Responses
                              </div>
                              <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                {survey.responseCount}/{survey.targetCount}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {userRole === "Admin" && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Response Progress
                            </span>
                            <span className="caption" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {getResponseProgress(survey)}%
                            </span>
                          </div>
                          <Progress value={getResponseProgress(survey)} />
                        </div>
                      )}
                    </div>

                    <Button onClick={() => handleTakeSurvey(survey)} className="ml-4">
                      Take Survey
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Pending Surveys</h3>
              <p className="caption text-muted-foreground">
                You have completed all available surveys. Great work!
              </p>
            </div>
          )}
        </>
      )}

      {/* Completed Surveys */}
      {activeTab === "completed" && (
        <>
          {completedSurveys.length > 0 ? (
            <div className="space-y-4">
              {completedSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{survey.title}</h4>
                        {getStatusBadge(survey)}
                      </div>
                      <p className="caption text-muted-foreground mb-3">
                        {survey.description}
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-chart-1" />
                          <span className="caption text-muted-foreground">
                            Completed on {new Date(survey.completedDate!).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        {userRole === "Admin" && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="caption text-muted-foreground">
                              {survey.responseCount} responses
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {(survey.allowPreview || userRole === "Admin") && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleViewResults(survey)}
                        className="ml-4 gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Completed Surveys</h3>
              <p className="caption text-muted-foreground">
                You haven't completed any surveys yet.
              </p>
            </div>
          )}
        </>
      )}

      {/* No Surveys Message */}
      {MOCK_SURVEYS.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="mb-2">No Surveys Available</h3>
          <p className="caption text-muted-foreground">
            There are no active surveys at the moment. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}