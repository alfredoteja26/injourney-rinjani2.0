import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Question {
  id: string;
  type: 'multiple-choice' | 'rating' | 'short-answer' | 'long-answer' | 'yes-no';
  question: string;
  required: boolean;
  options?: string[];
}

interface MandatorySurvey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  startDate: string;
  endDate: string;
}

interface MandatorySurveyModalProps {
  survey: MandatorySurvey;
  onComplete: (surveyId: string, responses: Record<string, any>) => void;
  userEmail: string;
}

export function MandatorySurveyModal({ 
  survey, 
  onComplete,
  userEmail 
}: MandatorySurveyModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentQuestion = survey.questions[currentQuestionIndex];
  const totalQuestions = survey.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error when user answers
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentQuestion = (): boolean => {
    if (currentQuestion.required && !responses[currentQuestion.id]) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: 'This question is required'
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (isLastQuestion) {
        handleSubmit();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Validate all required questions
    const missingRequired = survey.questions
      .filter(q => q.required && !responses[q.id])
      .map(q => q.id);

    if (missingRequired.length > 0) {
      const newErrors: Record<string, string> = {};
      missingRequired.forEach(id => {
        newErrors[id] = 'This question is required';
      });
      setErrors(newErrors);
      return;
    }

    // Submit responses
    onComplete(survey.id, {
      surveyId: survey.id,
      userEmail: userEmail,
      responses: responses,
      submittedAt: new Date().toISOString()
    });
  };

  const renderQuestionInput = () => {
    const questionId = currentQuestion.id;
    const value = responses[questionId];

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleResponseChange(questionId, option)}
                style={{
                  padding: '16px 20px',
                  backgroundColor: value === option 
                    ? 'rgba(0, 133, 138, 0.1)' 
                    : 'var(--card)',
                  border: `2px solid ${value === option 
                    ? 'var(--primary)' 
                    : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--foreground)',
                  fontWeight: value === option 
                    ? 'var(--font-weight-semibold)' 
                    : 'var(--font-weight-normal)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 133, 138, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.backgroundColor = 'var(--card)';
                  }
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${value === option ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: value === option ? 'var(--primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {value === option && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'white'
                    }} />
                  )}
                </div>
                {option}
              </button>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            padding: '20px 0'
          }}>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => handleResponseChange(questionId, rating)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius)',
                  border: `2px solid ${value === rating ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: value === rating 
                    ? 'var(--primary)' 
                    : 'var(--card)',
                  color: value === rating ? 'white' : 'var(--foreground)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (value !== rating) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== rating) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }
                }}
              >
                {rating}
              </button>
            ))}
          </div>
        );

      case 'yes-no':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {['Yes', 'No'].map(option => (
              <button
                key={option}
                onClick={() => handleResponseChange(questionId, option)}
                style={{
                  padding: '24px',
                  backgroundColor: value === option 
                    ? 'rgba(0, 133, 138, 0.1)' 
                    : 'var(--card)',
                  border: `2px solid ${value === option 
                    ? 'var(--primary)' 
                    : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: value === option ? 'var(--primary)' : 'var(--foreground)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 133, 138, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.backgroundColor = 'var(--card)';
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleResponseChange(questionId, e.target.value)}
            placeholder="Enter your answer..."
            style={{
              fontSize: 'var(--text-sm)',
              padding: '16px'
            }}
          />
        );

      case 'long-answer':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleResponseChange(questionId, e.target.value)}
            placeholder="Enter your detailed answer..."
            rows={6}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              color: 'var(--foreground)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
      }}>
        {/* Header with Progress */}
        <div style={{
          padding: '32px 32px 24px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--muted)'
        }}>
          {/* Alert Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius)',
            marginBottom: '20px'
          }}>
            <AlertCircle style={{
              width: '20px',
              height: '20px',
              color: '#EF4444',
              flexShrink: 0
            }} />
            <div>
              <div style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#EF4444',
                marginBottom: '2px'
              }}>
                Mandatory Survey Required
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: '#EF4444'
              }}>
                Please complete this survey to continue using the platform
              </div>
            </div>
          </div>

          {/* Survey Title */}
          <h2 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: '8px'
          }}>
            {survey.title}
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '20px'
          }}>
            {survey.description}
          </p>

          {/* Progress Bar */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary)'
              }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'var(--border)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: 'var(--primary)',
                transition: 'width 0.3s ease',
                borderRadius: '3px'
              }} />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                flexShrink: 0
              }}>
                {currentQuestionIndex + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: '4px'
                }}>
                  {currentQuestion.question}
                </h3>
                {currentQuestion.required && (
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: '#EF4444'
                  }}>
                    * Required
                  </span>
                )}
              </div>
            </div>

            {renderQuestionInput()}

            {errors[currentQuestion.id] && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius)',
                fontSize: 'var(--text-sm)',
                color: '#EF4444'
              }}>
                {errors[currentQuestion.id]}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 32px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            Back
          </Button>

          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)'
          }}>
            {Object.keys(responses).length} of {totalQuestions} answered
          </div>

          <Button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '120px'
            }}
          >
            {isLastQuestion ? (
              <>
                <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                Submit
              </>
            ) : (
              <>
                Next
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
