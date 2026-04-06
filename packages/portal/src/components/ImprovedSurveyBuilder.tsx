import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  Settings as SettingsIcon,
  Users,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";

interface Question {
  id: string;
  type: "likert" | "nps" | "single" | "multiple" | "text";
  question: string;
  required: boolean;
  options: string[];
  // Indicator labels for scale questions
  scaleLabels?: {
    start?: string;
    end?: string;
  };
}

interface SurveyBuilderProps {
  survey?: {
    id: string;
    title: string;
    type: string;
    status: string;
    deadline: string;
    targetAudience: {
      type: "all" | "company" | "unit";
      value: string;
    };
    totalQuestions: number;
    aiEnabled: boolean;
  } | null;
  onBack: () => void;
}

export function ImprovedSurveyBuilder({ survey, onBack }: SurveyBuilderProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState(survey?.title || "");
  const [description, setDescription] = useState("");
  const [surveyType, setSurveyType] = useState(survey?.type || "engagement");
  const [deadline, setDeadline] = useState(survey?.deadline || "");
  
  // Target Audience
  const [audienceType, setAudienceType] = useState<"all" | "company" | "unit">(
    survey?.targetAudience.type || "all"
  );
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  
  // AI Settings
  const [aiEnabled, setAiEnabled] = useState(survey?.aiEnabled ?? false);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      type: "likert",
      question: "",
      required: true,
      options: [],
      scaleLabels: {
        start: "Strongly Disagree",
        end: "Strongly Agree"
      }
    },
  ]);

  const companies = ["Injourney Holding", "PT Injourney Digital", "PT Injourney Technology"];
  const units = [
    "Digital Innovation & Technology",
    "Human Resources",
    "Finance & Accounting",
    "Marketing & Communications",
    "Operations",
    "Legal & Compliance"
  ];

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q${questions.length + 1}`,
        type: "likert",
        question: "",
        required: true,
        options: [],
        scaleLabels: {
          start: "Strongly Disagree",
          end: "Strongly Agree"
        }
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length === 1) {
      toast.error("Survey must have at least one question");
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          // When changing question type, set appropriate default labels
          if (field === "type") {
            let newLabels = { start: "", end: "" };
            if (value === "likert") {
              newLabels = { start: "Strongly Disagree", end: "Strongly Agree" };
            } else if (value === "nps") {
              newLabels = { start: "Not at all likely", end: "Extremely likely" };
            }
            return { ...q, [field]: value, scaleLabels: newLabels };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const handleScaleLabelChange = (id: string, position: "start" | "end", value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id 
          ? { ...q, scaleLabels: { ...q.scaleLabels, [position]: value } }
          : q
      )
    );
  };

  const handleOptionsChange = (id: string, optionsText: string) => {
    const options = optionsText.split('\n').filter(opt => opt.trim());
    handleQuestionChange(id, "options", options);
  };

  const handleSaveDraft = () => {
    toast.success("Survey saved as draft");
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Please enter a survey title");
      return;
    }
    if (questions.some((q) => !q.question.trim())) {
      toast.error("Please complete all questions");
      return;
    }
    
    // Validate audience selection
    if (audienceType === "company" && selectedCompanies.length === 0) {
      toast.error("Please select at least one company");
      return;
    }
    if (audienceType === "unit" && selectedUnits.length === 0) {
      toast.error("Please select at least one unit");
      return;
    }

    toast.success("Survey published successfully");
    onBack();
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "likert": return "Likert Scale (5-point)";
      case "nps": return "Net Promoter Score (0-10)";
      case "single": return "Single Choice";
      case "multiple": return "Multiple Choice";
      case "text": return "Open Text";
      default: return type;
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
              Back
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ marginBottom: '8px' }}>{survey ? "Edit Survey" : "Create New Survey"}</h1>
              <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                Configure survey details, questions, and target audience
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button 
                variant="outline" 
                onClick={handleSaveDraft} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save style={{ width: '16px', height: '16px' }} />
                Save Draft
              </Button>
              <Button 
                onClick={handlePublish} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                <Eye style={{ width: '16px', height: '16px' }} />
                Publish Survey
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 32px' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList style={{ marginBottom: '24px' }}>
            <TabsTrigger value="details" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SettingsIcon style={{ width: '16px', height: '16px' }} />
              Survey Details
            </TabsTrigger>
            <TabsTrigger value="questions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle style={{ width: '16px', height: '16px' }} />
              Questions ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="audience" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users style={{ width: '16px', height: '16px' }} />
              Target Audience
            </TabsTrigger>
            <TabsTrigger value="settings" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles style={{ width: '16px', height: '16px' }} />
              AI & Settings
            </TabsTrigger>
          </TabsList>

          {/* Survey Details Tab */}
          <TabsContent value="details">
            <div className="max-w-3xl bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <Label htmlFor="title">Survey Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Employee Engagement Q4 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2"
                  style={{ 
                    border: '1px solid var(--border)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief description of the survey purpose..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-2"
                  style={{ 
                    border: '1px solid var(--border)',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Survey Type</Label>
                  <Select value={surveyType} onValueChange={setSurveyType}>
                    <SelectTrigger 
                      id="type" 
                      className="mt-2"
                      style={{ 
                        border: '1px solid var(--border)',
                        outline: 'none'
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-2"
                    style={{ 
                      border: '1px solid var(--border)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <div className="max-w-full space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="cursor-move pt-2">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          Question {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="text-destructive-foreground hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div>
                        <Label>Question Type *</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value: any) => handleQuestionChange(question.id, "type", value)}
                        >
                          <SelectTrigger 
                            className="mt-2"
                            style={{ 
                              border: '1px solid var(--border)',
                              outline: 'none'
                            }}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="likert">Likert Scale (5-point)</SelectItem>
                            <SelectItem value="nps">Net Promoter Score (0-10)</SelectItem>
                            <SelectItem value="single">Single Choice</SelectItem>
                            <SelectItem value="multiple">Multiple Choice</SelectItem>
                            <SelectItem value="text">Open Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Question Text *</Label>
                        <Input
                          placeholder="Enter your question here..."
                          value={question.question}
                          onChange={(e) => handleQuestionChange(question.id, "question", e.target.value)}
                          className="mt-2 w-full"
                          style={{ 
                            border: '1px solid var(--border)',
                            outline: 'none'
                          }}
                        />
                      </div>

                      {/* Scale Labels for Likert and NPS */}
                      {(question.type === "likert" || question.type === "nps") && (
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/30 border border-border rounded-lg">
                            <Label className="mb-3 block">
                              {question.type === "likert" ? "Scale Labels (1-5)" : "Scale Labels (0-10)"}
                            </Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`start-label-${question.id}`} className="mb-2 block">
                                  {question.type === "likert" ? "Label for '1'" : "Label for '0'"}
                                </Label>
                                <Input
                                  id={`start-label-${question.id}`}
                                  placeholder={question.type === "likert" ? "e.g., Strongly Disagree" : "e.g., Not at all likely"}
                                  value={question.scaleLabels?.start || ""}
                                  onChange={(e) => handleScaleLabelChange(question.id, "start", e.target.value)}
                                  style={{ 
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                  }}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`end-label-${question.id}`} className="mb-2 block">
                                  {question.type === "likert" ? "Label for '5'" : "Label for '10'"}
                                </Label>
                                <Input
                                  id={`end-label-${question.id}`}
                                  placeholder={question.type === "likert" ? "e.g., Strongly Agree" : "e.g., Extremely likely"}
                                  value={question.scaleLabels?.end || ""}
                                  onChange={(e) => handleScaleLabelChange(question.id, "end", e.target.value)}
                                  style={{ 
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Preview for Scale Questions */}
                          <div className="p-4 border border-border rounded-lg bg-muted/30">
                            <Label className="mb-3 block">Preview</Label>
                            <div className="space-y-3">
                              <p className="caption">{question.question || "Your question will appear here..."}</p>
                              <div className="flex items-center justify-between gap-2">
                                {question.type === "likert" ? (
                                  <>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                      <div key={num} className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-card">
                                          <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{num}</span>
                                        </div>
                                        {(num === 1 || num === 5) && (
                                          <span className="caption text-muted-foreground text-center" style={{ fontSize: 'var(--text-xs)', maxWidth: '80px' }}>
                                            {num === 1 ? question.scaleLabels?.start : question.scaleLabels?.end}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div className="w-full">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                        {question.scaleLabels?.start || "0"}
                                      </span>
                                      <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                        {question.scaleLabels?.end || "10"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <div 
                                          key={num} 
                                          className="flex-1 h-10 border-2 border-primary rounded flex items-center justify-center bg-card cursor-pointer hover:bg-primary/10 transition-colors"
                                        >
                                          <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{num}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Options for Single/Multiple Choice */}
                      {(question.type === "single" || question.type === "multiple") && (
                        <div>
                          <Label>Options (one per line) *</Label>
                          <Textarea
                            placeholder="Option 1&#10;Option 2&#10;Option 3&#10;Option 4"
                            rows={4}
                            className="mt-2 w-full"
                            value={question.options.join('\n')}
                            onChange={(e) => handleOptionsChange(question.id, e.target.value)}
                            style={{ 
                              border: '1px solid var(--border)',
                              outline: 'none'
                            }}
                          />
                          <p className="caption text-muted-foreground mt-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Minimum 2 options required
                          </p>

                          {/* Preview of options */}
                          {question.options.length > 0 && (
                            <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
                              <Label className="mb-3 block">Preview</Label>
                              <div className="space-y-2">
                                {question.options.map((option, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex items-center gap-3 p-3 bg-card rounded-lg"
                                    style={{ 
                                      border: '2px solid var(--border)',
                                      outline: 'none'
                                    }}
                                  >
                                    {question.type === "single" ? (
                                      <div 
                                        className="w-5 h-5 rounded-full flex-shrink-0" 
                                        style={{ border: '2px solid var(--primary)' }}
                                      />
                                    ) : (
                                      <div 
                                        className="w-5 h-5 rounded flex-shrink-0" 
                                        style={{ border: '2px solid var(--primary)' }}
                                      />
                                    )}
                                    <span className="caption text-foreground">{option}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Text Question Preview */}
                      {question.type === "text" && (
                        <div className="p-4 border border-border rounded-lg bg-muted/30">
                          <Label className="mb-3 block">Preview</Label>
                          <Textarea
                            placeholder="Participants will type their response here..."
                            rows={3}
                            disabled
                            style={{ 
                              border: '1px solid var(--border)',
                              outline: 'none',
                              backgroundColor: 'var(--card)'
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Switch
                          id={`required-${question.id}`}
                          checked={question.required}
                          onCheckedChange={(checked) =>
                            handleQuestionChange(question.id, "required", checked)
                          }
                        />
                        <Label htmlFor={`required-${question.id}`} className="cursor-pointer">
                          Required question
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={handleAddQuestion} variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>
          </TabsContent>

          {/* Target Audience Tab */}
          <TabsContent value="audience">
            <div className="max-w-3xl bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">Select Target Audience</h3>
                <p className="caption text-muted-foreground mb-4">
                  Choose who will receive this survey
                </p>

                <RadioGroup value={audienceType} onValueChange={(value: any) => setAudienceType(value)}>
                  <div className="space-y-3">
                    <div 
                      className="flex items-center space-x-3 p-4 rounded-lg"
                      style={{ border: '2px solid var(--border)' }}
                    >
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="flex-1 cursor-pointer">
                        <div>
                          <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            All Employees
                          </p>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            Send to everyone in the organization
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div 
                      className="flex items-start space-x-3 p-4 rounded-lg"
                      style={{ border: '2px solid var(--border)' }}
                    >
                      <RadioGroupItem value="company" id="company" className="mt-1" />
                      <Label htmlFor="company" className="flex-1 cursor-pointer">
                        <div className="mb-3">
                          <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            Specific Company
                          </p>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            Target employees from selected companies
                          </p>
                        </div>
                        {audienceType === "company" && (
                          <div className="space-y-2 mt-3">
                            {companies.map((company) => (
                              <div key={company} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`company-${company}`}
                                  checked={selectedCompanies.includes(company)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedCompanies([...selectedCompanies, company]);
                                    } else {
                                      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`company-${company}`}
                                  className="caption cursor-pointer"
                                >
                                  {company}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </Label>
                    </div>

                    <div 
                      className="flex items-start space-x-3 p-4 rounded-lg"
                      style={{ border: '2px solid var(--border)' }}
                    >
                      <RadioGroupItem value="unit" id="unit" className="mt-1" />
                      <Label htmlFor="unit" className="flex-1 cursor-pointer">
                        <div className="mb-3">
                          <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            Specific Unit Kerja
                          </p>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            Target employees from selected departments
                          </p>
                        </div>
                        {audienceType === "unit" && (
                          <div className="space-y-2 mt-3">
                            {units.map((unit) => (
                              <div key={unit} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`unit-${unit}`}
                                  checked={selectedUnits.includes(unit)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedUnits([...selectedUnits, unit]);
                                    } else {
                                      setSelectedUnits(selectedUnits.filter(u => u !== unit));
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`unit-${unit}`}
                                  className="caption cursor-pointer"
                                >
                                  {unit}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                      Estimated Recipients
                    </div>
                    <p className="caption text-muted-foreground">
                      {audienceType === "all" 
                        ? "~250 employees" 
                        : audienceType === "company"
                        ? `~${selectedCompanies.length * 80} employees`
                        : `~${selectedUnits.length * 45} employees`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI & Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-3xl bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">AI-Powered Insights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <Label htmlFor="ai-enabled" className="cursor-pointer">Enable AI Recommendations</Label>
                      </div>
                      <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Generate AI-powered insights and recommendations based on survey responses
                      </p>
                    </div>
                    <Switch
                      id="ai-enabled"
                      checked={aiEnabled}
                      onCheckedChange={setAiEnabled}
                    />
                  </div>

                  {aiEnabled && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-3">
                      <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        AI will analyze:
                      </p>
                      <ul className="space-y-2 caption text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Overall sentiment and engagement patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Key themes and topics from open-text responses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Correlations between different questions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Actionable recommendations for improvement</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="mb-4">Survey Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Anonymous Responses</Label>
                      <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Hide participant identities from responses (Admin can still see results)
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Allow Multiple Submissions</Label>
                      <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Allow participants to edit and resubmit responses
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Send Email Reminder</Label>
                      <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Send reminder emails to participants who haven't responded
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                      Result Visibility
                    </div>
                    <p className="caption text-muted-foreground">
                      Only Admins can view full survey analytics and results. Users can only fill the survey and view their own individual responses after submission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
