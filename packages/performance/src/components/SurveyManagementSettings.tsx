import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Users, Calendar, BarChart3, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface Survey {
  id: string;
  title: string;
  type: string;
  status: "draft" | "active" | "completed";
  deadline: string;
  targetAudience: {
    type: "all" | "company" | "unit";
    value: string;
  };
  totalQuestions: number;
  responses: number;
  totalRecipients: number;
  aiEnabled: boolean;
  createdAt: string;
}

interface SurveyManagementSettingsProps {
  onCreateSurvey: () => void;
  onEditSurvey: (surveyId: string) => void;
  onViewResults?: (surveyId: string) => void;
}

export function SurveyManagementSettings({ 
  onCreateSurvey, 
  onEditSurvey,
  onViewResults 
}: SurveyManagementSettingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: "1",
      title: "Employee Engagement Q4 2024",
      type: "Engagement",
      status: "active",
      deadline: "2024-12-31",
      targetAudience: { type: "all", value: "All Employees" },
      totalQuestions: 15,
      responses: 127,
      totalRecipients: 250,
      aiEnabled: true,
      createdAt: "2024-12-01"
    },
    {
      id: "2",
      title: "Technology Department Feedback",
      type: "Feedback",
      status: "active",
      deadline: "2024-12-25",
      targetAudience: { type: "unit", value: "Technology" },
      totalQuestions: 10,
      responses: 23,
      totalRecipients: 45,
      aiEnabled: false,
      createdAt: "2024-12-05"
    },
    {
      id: "3",
      title: "Annual Culture Survey",
      type: "Culture",
      status: "completed",
      deadline: "2024-11-30",
      targetAudience: { type: "all", value: "All Employees" },
      totalQuestions: 20,
      responses: 235,
      totalRecipients: 250,
      aiEnabled: true,
      createdAt: "2024-11-01"
    },
  ]);

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSurvey = (surveyId: string) => {
    if (confirm("Are you sure you want to delete this survey?")) {
      setSurveys(surveys.filter(s => s.id !== surveyId));
    }
  };

  const getStatusColor = (status: Survey["status"]) => {
    switch (status) {
      case "active":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "completed":
        return "bg-muted text-muted-foreground border-border";
      case "draft":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ marginBottom: '4px' }}>Survey Management</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            Create and manage employee surveys for different departments and units
          </p>
        </div>
        <Button onClick={onCreateSurvey} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus style={{ width: '16px', height: '16px' }} />
          Create Survey
        </Button>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            width: '16px', 
            height: '16px', 
            color: 'var(--muted-foreground)' 
          }} 
        />
        <Input
          placeholder="Search surveys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '40px' }}
        />
      </div>

      {/* Surveys List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSurveys.length === 0 ? (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '48px 0',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'rgba(245, 245, 245, 0.3)'
            }}
          >
            <BarChart3 style={{ width: '48px', height: '48px', color: 'var(--muted-foreground)', margin: '0 auto 12px' }} />
            <h4 style={{ marginBottom: '4px' }}>No surveys found</h4>
            <p className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
              {searchTerm ? "Try adjusting your search" : "Create your first survey to get started"}
            </p>
            {!searchTerm && (
              <Button onClick={onCreateSurvey} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Plus style={{ width: '16px', height: '16px' }} />
                Create Survey
              </Button>
            )}
          </div>
        ) : (
          filteredSurveys.map((survey) => (
            <div
              key={survey.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '20px',
                backgroundColor: 'var(--card)',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 133, 138, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title and Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h4 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{survey.title}</h4>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(survey.status)}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {survey.status}
                    </Badge>
                    {survey.aiEnabled && (
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: 'rgba(0, 101, 115, 0.1)',
                          color: 'var(--accent)',
                          borderColor: 'rgba(0, 101, 115, 0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Sparkles style={{ width: '12px', height: '12px' }} />
                        AI Enabled
                      </Badge>
                    )}
                  </div>

                  {/* Metadata */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)' }}>
                      <Users style={{ width: '14px', height: '14px' }} />
                      <span>{survey.targetAudience.value}</span>
                    </div>
                    <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)' }}>
                      <Calendar style={{ width: '14px', height: '14px' }} />
                      <span>Deadline: {new Date(survey.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)' }}>
                      <BarChart3 style={{ width: '14px', height: '14px' }} />
                      <span>{survey.totalQuestions} questions</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                        Response Rate
                      </span>
                      <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {survey.responses}/{survey.totalRecipients} ({Math.round((survey.responses / survey.totalRecipients) * 100)}%)
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      borderRadius: '9999px', 
                      backgroundColor: 'var(--muted)', 
                      overflow: 'hidden' 
                    }}>
                      <div
                        style={{ 
                          height: '100%', 
                          backgroundColor: 'var(--primary)', 
                          transition: 'width 0.3s',
                          width: `${(survey.responses / survey.totalRecipients) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" style={{ height: '32px', width: '32px', padding: 0 }}>
                      <MoreVertical style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewResults?.(survey.id)}>
                      <Eye style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      View Results
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditSurvey(survey.id)}>
                      <Edit style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Edit Survey
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteSurvey(survey.id)}
                      style={{ color: 'var(--destructive-foreground)' }}
                    >
                      <Trash2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}