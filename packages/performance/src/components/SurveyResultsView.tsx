import { ChevronLeft, User, Calendar, TrendingUp, Download, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface SurveyResponse {
  id: string;
  respondent: {
    name: string;
    email: string;
    unit: string;
    company: string;
  };
  submittedAt: string;
  answers: {
    questionId: string;
    questionText: string;
    questionType: "likert" | "nps" | "single" | "multiple" | "text";
    answer: any;
    scaleLabels?: { start?: string; end?: string };
  }[];
}

interface SurveyResultsViewProps {
  surveyId: string;
  onBack: () => void;
}

export function SurveyResultsView({ surveyId, onBack }: SurveyResultsViewProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  
  // Dummy data for survey responses
  const surveyInfo = {
    id: surveyId,
    title: "Employee Engagement Q4 2024",
    type: "Engagement",
    totalResponses: 127,
    totalRecipients: 250,
    responseRate: 50.8,
    deadline: "2024-12-31",
  };

  const responses: SurveyResponse[] = [
    {
      id: "r1",
      respondent: {
        name: "Anisa Putri Maharani",
        email: "anisa.maharani@injourney.id",
        unit: "Human Resources",
        company: "PT Injourney Digital"
      },
      submittedAt: "2024-12-15T10:30:00",
      answers: [
        {
          questionId: "q1",
          questionText: "How satisfied are you with your current work environment?",
          questionType: "likert",
          answer: 4,
          scaleLabels: { start: "Very Dissatisfied", end: "Very Satisfied" }
        },
        {
          questionId: "q2",
          questionText: "How likely are you to recommend our company to a friend?",
          questionType: "nps",
          answer: 9,
          scaleLabels: { start: "Not at all likely", end: "Extremely likely" }
        },
        {
          questionId: "q3",
          questionText: "What is your preferred work arrangement?",
          questionType: "single",
          answer: "Hybrid (2-3 days in office)"
        },
        {
          questionId: "q4",
          questionText: "Which benefits are most important to you? (Select all that apply)",
          questionType: "multiple",
          answer: ["Health Insurance", "Professional Development", "Flexible Hours"]
        },
        {
          questionId: "q5",
          questionText: "What can we do to improve employee engagement?",
          questionType: "text",
          answer: "More team building activities and clearer career progression paths would be great. Also, regular feedback sessions with management would help us feel more connected to company goals."
        }
      ]
    },
    {
      id: "r2",
      respondent: {
        name: "Budi Santoso",
        email: "budi.santoso@injourney.id",
        unit: "Digital Innovation & Technology",
        company: "PT Injourney Technology"
      },
      submittedAt: "2024-12-16T14:20:00",
      answers: [
        {
          questionId: "q1",
          questionText: "How satisfied are you with your current work environment?",
          questionType: "likert",
          answer: 5,
          scaleLabels: { start: "Very Dissatisfied", end: "Very Satisfied" }
        },
        {
          questionId: "q2",
          questionText: "How likely are you to recommend our company to a friend?",
          questionType: "nps",
          answer: 10,
          scaleLabels: { start: "Not at all likely", end: "Extremely likely" }
        },
        {
          questionId: "q3",
          questionText: "What is your preferred work arrangement?",
          questionType: "single",
          answer: "Fully Remote"
        },
        {
          questionId: "q4",
          questionText: "Which benefits are most important to you? (Select all that apply)",
          questionType: "multiple",
          answer: ["Health Insurance", "Remote Work Allowance", "Learning Budget"]
        },
        {
          questionId: "q5",
          questionText: "What can we do to improve employee engagement?",
          questionType: "text",
          answer: "The current setup is excellent! Maybe adding more online learning resources and tech conferences would be beneficial."
        }
      ]
    },
    {
      id: "r3",
      respondent: {
        name: "Citra Dewi Lestari",
        email: "citra.lestari@injourney.id",
        unit: "Marketing & Communications",
        company: "PT Injourney Digital"
      },
      submittedAt: "2024-12-17T09:15:00",
      answers: [
        {
          questionId: "q1",
          questionText: "How satisfied are you with your current work environment?",
          questionType: "likert",
          answer: 3,
          scaleLabels: { start: "Very Dissatisfied", end: "Very Satisfied" }
        },
        {
          questionId: "q2",
          questionText: "How likely are you to recommend our company to a friend?",
          questionType: "nps",
          answer: 7,
          scaleLabels: { start: "Not at all likely", end: "Extremely likely" }
        },
        {
          questionId: "q3",
          questionText: "What is your preferred work arrangement?",
          questionType: "single",
          answer: "Hybrid (2-3 days in office)"
        },
        {
          questionId: "q4",
          questionText: "Which benefits are most important to you? (Select all that apply)",
          questionType: "multiple",
          answer: ["Health Insurance", "Flexible Hours"]
        },
        {
          questionId: "q5",
          questionText: "What can we do to improve employee engagement?",
          questionType: "text",
          answer: "Better communication between departments and more recognition for good work would help a lot."
        }
      ]
    },
    {
      id: "r4",
      respondent: {
        name: "Dimas Prasetyo",
        email: "dimas.prasetyo@injourney.id",
        unit: "Finance & Accounting",
        company: "Injourney Holding"
      },
      submittedAt: "2024-12-18T11:45:00",
      answers: [
        {
          questionId: "q1",
          questionText: "How satisfied are you with your current work environment?",
          questionType: "likert",
          answer: 4,
          scaleLabels: { start: "Very Dissatisfied", end: "Very Satisfied" }
        },
        {
          questionId: "q2",
          questionText: "How likely are you to recommend our company to a friend?",
          questionType: "nps",
          answer: 8,
          scaleLabels: { start: "Not at all likely", end: "Extremely likely" }
        },
        {
          questionId: "q3",
          questionText: "What is your preferred work arrangement?",
          questionType: "single",
          answer: "Mostly In-office (4-5 days)"
        },
        {
          questionId: "q4",
          questionText: "Which benefits are most important to you? (Select all that apply)",
          questionType: "multiple",
          answer: ["Health Insurance", "Retirement Plan", "Annual Bonus"]
        },
        {
          questionId: "q5",
          questionText: "What can we do to improve employee engagement?",
          questionType: "text",
          answer: "The current benefits are good. I would appreciate more transparency in company financial performance and how it affects our bonuses."
        }
      ]
    }
  ];

  const selectedResponseData = responses.find(r => r.id === selectedResponse);

  const renderAnswerValue = (answer: SurveyResponse["answers"][0]) => {
    switch (answer.questionType) {
      case "likert":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    border: `3px solid ${num === answer.answer ? 'var(--primary)' : 'var(--border)'}`,
                    backgroundColor: num === answer.answer ? 'var(--primary)' : 'var(--card)',
                    color: num === answer.answer ? 'var(--primary-foreground)' : 'var(--muted-foreground)'
                  }}
                >
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{num}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                {answer.scaleLabels?.start || "1"}
              </span>
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                {answer.scaleLabels?.end || "5"}
              </span>
            </div>
          </div>
        );
      
      case "nps":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div
                  key={num}
                  className="flex-1 h-12 rounded flex items-center justify-center"
                  style={{
                    border: `2px solid ${num === answer.answer ? 'var(--primary)' : 'var(--border)'}`,
                    backgroundColor: num === answer.answer ? 'var(--primary)' : 'var(--card)',
                    color: num === answer.answer ? 'var(--primary-foreground)' : 'var(--muted-foreground)'
                  }}
                >
                  <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{num}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                {answer.scaleLabels?.start || "0"}
              </span>
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                {answer.scaleLabels?.end || "10"}
              </span>
            </div>
          </div>
        );
      
      case "single":
        return (
          <div 
            className="p-3 rounded-lg flex items-center gap-3"
            style={{ 
              border: '2px solid var(--primary)',
              backgroundColor: 'var(--primary)/5'
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex-shrink-0"
              style={{ 
                border: '2px solid var(--primary)',
                backgroundColor: 'var(--primary)'
              }}
            />
            <span className="caption">{answer.answer}</span>
          </div>
        );
      
      case "multiple":
        return (
          <div className="space-y-2">
            {(answer.answer as string[]).map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg flex items-center gap-3"
                style={{ 
                  border: '2px solid var(--primary)',
                  backgroundColor: 'var(--primary)/5'
                }}
              >
                <div 
                  className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
                  style={{ 
                    border: '2px solid var(--primary)',
                    backgroundColor: 'var(--primary)'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="var(--primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="caption">{item}</span>
              </div>
            ))}
          </div>
        );
      
      case "text":
        return (
          <div 
            className="p-4 rounded-lg"
            style={{ 
              border: '1px solid var(--border)',
              backgroundColor: 'var(--muted)/30'
            }}
          >
            <p className="caption" style={{ lineHeight: '1.6' }}>{answer.answer}</p>
          </div>
        );
      
      default:
        return <span className="caption">{JSON.stringify(answer.answer)}</span>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Button variant="ghost" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChevronLeft style={{ width: '20px', height: '20px' }} />
              Back to Survey Management
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ marginBottom: '8px' }}>{surveyInfo.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <Badge
                  variant="outline"
                  style={{
                    backgroundColor: 'rgba(0, 133, 138, 0.1)',
                    color: 'var(--primary)',
                    borderColor: 'rgba(0, 133, 138, 0.2)'
                  }}
                >
                  {surveyInfo.type}
                </Badge>
                <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)' }}>
                  <TrendingUp style={{ width: '14px', height: '14px' }} />
                  <span>{surveyInfo.totalResponses} / {surveyInfo.totalRecipients} responses ({surveyInfo.responseRate}%)</span>
                </div>
                <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)' }}>
                  <Calendar style={{ width: '14px', height: '14px' }} />
                  <span>Deadline: {new Date(surveyInfo.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter style={{ width: '16px', height: '16px' }} />
                Filter
              </Button>
              <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download style={{ width: '16px', height: '16px' }} />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
          {/* Response List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ marginBottom: '8px' }}>Individual Responses</h3>
            {responses.map((response) => (
              <div
                key={response.id}
                onClick={() => setSelectedResponse(response.id)}
                style={{
                  padding: '16px',
                  border: `2px solid ${selectedResponse === response.id ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  backgroundColor: selectedResponse === response.id ? 'var(--primary)/5' : 'var(--card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedResponse !== response.id) {
                    e.currentTarget.style.borderColor = 'var(--primary)/50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedResponse !== response.id) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--primary)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--primary-foreground)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    {response.respondent.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 'var(--font-weight-semibold)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {response.respondent.name}
                    </p>
                    <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                      {response.respondent.unit}
                    </p>
                  </div>
                </div>
                <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  Submitted: {new Date(response.submittedAt).toLocaleDateString()} {new Date(response.submittedAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>

          {/* Response Detail */}
          <div 
            className="bg-card rounded-lg"
            style={{ 
              border: '1px solid var(--border)',
              padding: '32px',
              minHeight: '500px'
            }}
          >
            {selectedResponseData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Respondent Info */}
                <div 
                  style={{ 
                    padding: '20px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--muted)/30',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div 
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--primary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--primary-foreground)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      {selectedResponseData.respondent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '4px' }}>{selectedResponseData.respondent.name}</h3>
                      <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                        {selectedResponseData.respondent.email}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                        Unit
                      </p>
                      <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {selectedResponseData.respondent.unit}
                      </p>
                    </div>
                    <div>
                      <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                        Company
                      </p>
                      <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {selectedResponseData.respondent.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Answers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {selectedResponseData.answers.map((answer, idx) => (
                    <div key={answer.questionId}>
                      <div style={{ marginBottom: '16px' }}>
                        <span className="caption" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
                          Question {idx + 1}
                        </span>
                        <h4 style={{ marginTop: '4px' }}>{answer.questionText}</h4>
                      </div>
                      {renderAnswerValue(answer)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted-foreground)' }}>
                <User style={{ width: '64px', height: '64px', marginBottom: '16px', opacity: 0.3 }} />
                <h3 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Select a Response</h3>
                <p className="caption">Choose a response from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
