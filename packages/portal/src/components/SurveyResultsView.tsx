import { ChevronLeft, User, Calendar, TrendingUp, Download, Filter, Sparkles, AlertCircle, CheckCircle2, Lightbulb, BarChart3, PieChart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

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
  const [responseViewTab, setResponseViewTab] = useState<'per-question' | 'per-individual'>('per-question');
  
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

  // Helper function to aggregate question responses
  const aggregateQuestionData = (questionId: string) => {
    const question = responses[0].answers.find(a => a.questionId === questionId);
    if (!question) return null;

    const allAnswers = responses.map(r => r.answers.find(a => a.questionId === questionId)?.answer).filter(Boolean);

    if (question.questionType === 'likert') {
      const counts = [1, 2, 3, 4, 5].map(num => ({
        rating: num,
        count: allAnswers.filter(a => a === num).length
      }));
      return { type: 'likert', data: counts, question };
    }

    if (question.questionType === 'nps') {
      const counts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => ({
        score: num,
        count: allAnswers.filter(a => a === num).length,
        category: num >= 9 ? 'Promoter' : num >= 7 ? 'Passive' : 'Detractor'
      }));
      
      const promoters = allAnswers.filter(a => a >= 9).length;
      const detractors = allAnswers.filter(a => a <= 6).length;
      const npsScore = ((promoters - detractors) / allAnswers.length) * 100;
      
      return { type: 'nps', data: counts, npsScore: npsScore.toFixed(1), question };
    }

    if (question.questionType === 'single') {
      const uniqueAnswers = Array.from(new Set(allAnswers as string[]));
      const counts = uniqueAnswers.map(answer => ({
        option: answer,
        count: allAnswers.filter(a => a === answer).length
      }));
      return { type: 'single', data: counts, question };
    }

    if (question.questionType === 'multiple') {
      const flatAnswers = (allAnswers as string[][]).flat();
      const uniqueOptions = Array.from(new Set(flatAnswers));
      const counts = uniqueOptions.map(option => ({
        option,
        count: flatAnswers.filter(a => a === option).length
      }));
      return { type: 'multiple', data: counts, question };
    }

    if (question.questionType === 'text') {
      return { type: 'text', data: allAnswers as string[], question };
    }

    return null;
  };

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
        {/* AI Insights Section */}
        <div 
          style={{ 
            backgroundColor: 'var(--card)',
            border: '2px solid var(--primary)/20',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, var(--card) 0%, rgba(0, 133, 138, 0.03) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div 
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles style={{ width: '20px', height: '20px', color: 'var(--primary-foreground)' }} />
            </div>
            <div>
              <h3 style={{ marginBottom: '2px' }}>AI Insights & Recommendations</h3>
              <p className="caption" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
                Powered by AI analysis of {surveyInfo.totalResponses} responses
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Key Finding 1 */}
            <div 
              style={{ 
                padding: '20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <CheckCircle2 style={{ width: '18px', height: '18px', color: '#10B981' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '8px', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                    Tinggi: Kepuasan Lingkungan Kerja
                  </h4>
                  <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                    85% responden memberikan rating 4-5 untuk kepuasan lingkungan kerja. Hybrid work menjadi preferensi utama (68%).
                  </p>
                </div>
              </div>
            </div>

            {/* Key Finding 2 */}
            <div 
              style={{ 
                padding: '20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <AlertCircle style={{ width: '18px', height: '18px', color: '#FBBF24' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '8px', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                    Perhatian: Komunikasi Antar Departemen
                  </h4>
                  <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                    42% feedback menyebutkan kurangnya komunikasi lintas departemen sebagai area improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Finding 3 */}
            <div 
              style={{ 
                padding: '20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <TrendingUp style={{ width: '18px', height: '18px', color: '#3B82F6' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '8px', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                    Positif: NPS Score Tinggi
                  </h4>
                  <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                    NPS rata-rata 8.5/10 menunjukkan karyawan sangat likely merekomendasikan perusahaan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div 
            style={{ 
              marginTop: '24px',
              padding: '20px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'rgba(0, 133, 138, 0.05)',
              border: '1px solid var(--primary)/20'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Lightbulb style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
              <h4 style={{ color: 'var(--foreground)' }}>Rekomendasi Action Items</h4>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    marginTop: '8px',
                    flexShrink: 0
                  }}
                />
                <p className="caption" style={{ flex: 1, lineHeight: '1.6' }}>
                  <strong>Implementasi Regular Cross-Department Meetings:</strong> Jadwalkan monthly all-hands meeting dan quarterly town halls untuk meningkatkan transparansi dan komunikasi lintas unit.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    marginTop: '8px',
                    flexShrink: 0
                  }}
                />
                <p className="caption" style={{ flex: 1, lineHeight: '1.6' }}>
                  <strong>Program Recognition & Reward:</strong> Launching employee recognition program untuk acknowledge kontribusi exceptional. Consideration: peer-to-peer recognition platform.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    marginTop: '8px',
                    flexShrink: 0
                  }}
                />
                <p className="caption" style={{ flex: 1, lineHeight: '1.6' }}>
                  <strong>Career Development Framework:</strong> Develop clear career progression paths dan regular feedback sessions. 35% responden menyebutkan ini sebagai priority.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    marginTop: '8px',
                    flexShrink: 0
                  }}
                />
                <p className="caption" style={{ flex: 1, lineHeight: '1.6' }}>
                  <strong>Maintain Hybrid Work Policy:</strong> 68% preferensi untuk hybrid arrangement. Consider formalisasi policy 2-3 days in-office dengan flexible schedule.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Response View Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <button
            onClick={() => setResponseViewTab('per-question')}
            style={{
              padding: '12px 24px',
              backgroundColor: responseViewTab === 'per-question' ? 'var(--background)' : 'transparent',
              color: responseViewTab === 'per-question' ? 'var(--primary)' : 'var(--muted-foreground)',
              border: 'none',
              borderBottom: responseViewTab === 'per-question' ? '2px solid var(--primary)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: responseViewTab === 'per-question' ? 600 : 400,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BarChart3 style={{ width: '18px', height: '18px' }} />
            Response per Question
          </button>
          <button
            onClick={() => setResponseViewTab('per-individual')}
            style={{
              padding: '12px 24px',
              backgroundColor: responseViewTab === 'per-individual' ? 'var(--background)' : 'transparent',
              color: responseViewTab === 'per-individual' ? 'var(--primary)' : 'var(--muted-foreground)',
              border: 'none',
              borderBottom: responseViewTab === 'per-individual' ? '2px solid var(--primary)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: responseViewTab === 'per-individual' ? 600 : 400,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <User style={{ width: '18px', height: '18px' }} />
            Response per Individual
          </button>
        </div>

        {/* Conditional Rendering based on Tab */}
        {responseViewTab === 'per-individual' ? (
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
        ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Response per Question Analytics */}
          {responses[0].answers.map((_, idx) => {
            const questionId = responses[0].answers[idx].questionId;
            const aggregatedData = aggregateQuestionData(questionId);
            
            if (!aggregatedData) return null;

            return (
              <div 
                key={questionId}
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '24px'
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span className="caption" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
                    Question {idx + 1}
                  </span>
                  <h3 style={{ marginTop: '4px', marginBottom: '8px' }}>{aggregatedData.question.questionText}</h3>
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    {responses.length} responses
                  </p>
                </div>

                {/* Render charts based on question type */}
                {aggregatedData.type === 'likert' && (
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <BarChart data={aggregatedData.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="rating" stroke="var(--muted-foreground)" />
                        <YAxis stroke="var(--muted-foreground)" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--card)', 
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)'
                          }}
                        />
                        <Bar dataKey="count" fill="var(--primary)" name="Responses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {aggregatedData.type === 'nps' && (
                  <div>
                    <div 
                      style={{ 
                        padding: '16px',
                        backgroundColor: 'var(--muted)/30',
                        borderRadius: 'var(--radius)',
                        marginBottom: '20px',
                        textAlign: 'center'
                      }}
                    >
                      <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                        NPS Score
                      </p>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {aggregatedData.npsScore}
                      </div>
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer>
                        <BarChart data={aggregatedData.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="score" stroke="var(--muted-foreground)" />
                          <YAxis stroke="var(--muted-foreground)" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'var(--card)', 
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius)'
                            }}
                          />
                          <Bar dataKey="count" name="Responses">
                            {aggregatedData.data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.category === 'Promoter' ? '#10B981' : entry.category === 'Passive' ? '#F59E0B' : '#EF4444'} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {aggregatedData.type === 'single' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer>
                        <RePieChart>
                          <Pie
                            data={aggregatedData.data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {aggregatedData.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'var(--card)', 
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius)'
                            }}
                          />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {aggregatedData.data.map((item, idx) => (
                        <div 
                          key={idx}
                          style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px',
                            backgroundColor: 'var(--muted)/30',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div 
                              style={{ 
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][idx % 5]
                              }}
                            />
                            <span className="caption">{item.option}</span>
                          </div>
                          <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aggregatedData.type === 'multiple' && (
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <BarChart data={aggregatedData.data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis type="number" stroke="var(--muted-foreground)" />
                        <YAxis dataKey="option" type="category" stroke="var(--muted-foreground)" width={180} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--card)', 
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)'
                          }}
                        />
                        <Bar dataKey="count" fill="var(--primary)" name="Responses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {aggregatedData.type === 'text' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                    {aggregatedData.data.map((text, idx) => (
                      <div 
                        key={idx}
                        style={{ 
                          padding: '16px',
                          backgroundColor: 'var(--muted)/30',
                          borderRadius: 'var(--radius)',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <p className="caption" style={{ lineHeight: '1.6' }}>{text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}