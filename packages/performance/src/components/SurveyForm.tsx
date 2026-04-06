import { useState } from "react";
import { ChevronLeft, CheckCircle, AlertCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

// Mock survey questions
const MOCK_QUESTIONS = [
  {
    id: "q1",
    type: "likert",
    question: "I am satisfied with my current role and responsibilities",
    required: true,
    scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "q2",
    type: "likert",
    question: "I feel valued and appreciated by my team and management",
    required: true,
    scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "q3",
    type: "nps",
    question: "How likely are you to recommend this company as a great place to work?",
    required: true,
    description: "Rate from 0 (Not at all likely) to 10 (Extremely likely)",
  },
  {
    id: "q4",
    type: "single",
    question: "What is your preferred mode of communication for team updates?",
    required: true,
    options: ["Email", "Slack/Teams", "In-person meetings", "Video calls", "Other"],
  },
  {
    id: "q5",
    type: "likert",
    question: "I have access to the resources and tools needed to do my job effectively",
    required: false,
    scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "q6",
    type: "single",
    question: "How often do you receive constructive feedback from your manager?",
    required: true,
    options: ["Daily", "Weekly", "Monthly", "Quarterly", "Rarely", "Never"],
  },
  {
    id: "q7",
    type: "nps",
    question: "How would you rate the work-life balance in your current role?",
    required: true,
    description: "Rate from 0 (Very Poor) to 10 (Excellent)",
  },
];

interface SurveyFormProps {
  survey: {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
  };
  onBack: () => void;
}

export function SurveyForm({ survey, onBack }: SurveyFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / MOCK_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === MOCK_QUESTIONS.length - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleCommentChange = (questionId: string, value: string) => {
    setComments({ ...comments, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion.required && !hasAnswer) {
      toast.error("Please answer this question before continuing");
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Survey submitted successfully! Thank you for your feedback.");
      setIsSubmitting(false);
      onBack();
    }, 1500);
  };

  const renderQuestion = () => {
    const question = currentQuestion;

    switch (question.type) {
      case "likert":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="space-y-3">
                {question.scale?.map((option, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      answers[question.id] === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAnswerChange(question.id, option)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                      <label
                        htmlFor={`${question.id}-${index}`}
                        className="flex-1 cursor-pointer caption"
                        style={{ fontWeight: 'var(--font-weight-medium)' }}
                      >
                        {option}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      case "nps":
        return (
          <div className="space-y-4">
            {question.description && (
              <p className="caption text-muted-foreground">
                {question.description}
              </p>
            )}
            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 11 }, (_, i) => i).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleAnswerChange(question.id, num.toString())}
                  className={`aspect-square rounded-lg border transition-all ${
                    answers[question.id] === num.toString()
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    {num}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                Not at all likely
              </span>
              <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                Extremely likely
              </span>
            </div>
          </div>
        );

      case "single":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="space-y-3">
                {question.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      answers[question.id] === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAnswerChange(question.id, option)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                      <label
                        htmlFor={`${question.id}-${index}`}
                        className="flex-1 cursor-pointer caption"
                        style={{ fontWeight: 'var(--font-weight-medium)' }}
                      >
                        {option}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

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

          <div className="mb-4">
            <h2>{survey.title}</h2>
            <p className="caption text-muted-foreground">{survey.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="caption text-muted-foreground">
                Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
              </span>
              <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 mb-6">
            {/* Question */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="caption text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Q{currentQuestionIndex + 1}
                </span>
                <div className="flex-1">
                  <h3 className="mb-2">{currentQuestion.question}</h3>
                  {currentQuestion.required && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive-foreground" />
                      <span className="caption text-destructive-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Required
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Answer Options */}
              {renderQuestion()}
            </div>

            {/* Optional Comment */}
            <div>
              <Label htmlFor="comment" className="mb-2 block">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comment"
                placeholder="Share any additional thoughts or context..."
                value={comments[currentQuestion.id] || ""}
                onChange={(e) => handleCommentChange(currentQuestion.id, e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isSubmitting}
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {!hasAnswer && currentQuestion.required && (
                <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  Please answer to continue
                </span>
              )}
              <Button
                onClick={handleNext}
                disabled={(currentQuestion.required && !hasAnswer) || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : isLastQuestion ? (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Survey
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {MOCK_QUESTIONS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index < currentQuestionIndex
                    ? "w-8 bg-chart-1"
                    : index === currentQuestionIndex
                    ? "w-12 bg-primary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
