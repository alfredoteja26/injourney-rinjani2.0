import { ClipboardList, Clock, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { MOCK_SURVEYS } from "./EmployeeSurvey";

interface PendingSurveySectionProps {
  userRole?: "Admin" | "User";
}

export function PendingSurveySection({ userRole = "User" }: PendingSurveySectionProps) {
  // Filter surveys that are not completed
  const pendingSurveys = MOCK_SURVEYS.filter(survey => !survey.completed && survey.status === "active");

  if (pendingSurveys.length === 0) {
    return null;
  }

  return (
    <div 
      style={{ 
        backgroundColor: 'rgba(0, 133, 138, 0.05)', 
        padding: '32px 24px',
        width: '100%',
        borderTop: '1px solid rgba(0, 133, 138, 0.15)',
        borderBottom: '1px solid rgba(0, 133, 138, 0.15)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1198px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: 'var(--radius)', 
                backgroundColor: 'rgba(0, 133, 138, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ClipboardList style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--foreground)' }}>Survey yang Perlu Dikerjakan</h3>
              <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                {pendingSurveys.length} survey menunggu respons Anda
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            style={{ 
              backgroundColor: 'rgba(240, 68, 56, 0.1)', 
              color: '#F04438',
              border: 'none'
            }}
          >
            {pendingSurveys.length} Pending
          </Badge>
        </div>

        {/* Survey Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {pendingSurveys.map((survey) => {
            const responsePercentage = Math.round((survey.responseCount / survey.targetCount) * 100);
            
            return (
              <div 
                key={survey.id}
                style={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 133, 138, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Survey Header */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <h4 style={{ color: 'var(--foreground)', flex: 1 }}>{survey.title}</h4>
                    <Badge 
                      variant="outline"
                      style={{ 
                        textTransform: 'capitalize',
                        flexShrink: 0
                      }}
                    >
                      {survey.type}
                    </Badge>
                  </div>
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    {survey.description}
                  </p>
                </div>

                {/* Survey Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
                      <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                        Deadline: {new Date(survey.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
                      <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                        {survey.estimatedTime}
                      </span>
                    </div>
                  </div>

                  {/* Progress for Admin */}
                  {userRole === "Admin" && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                          Responses
                        </span>
                        <span className="caption" style={{ color: 'var(--foreground)' }}>
                          {survey.responseCount} / {survey.targetCount} ({responsePercentage}%)
                        </span>
                      </div>
                      <Progress value={responsePercentage} />
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => {
                    window.location.hash = `/survey/${survey.id}`;
                  }}
                >
                  Mulai Survey
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}