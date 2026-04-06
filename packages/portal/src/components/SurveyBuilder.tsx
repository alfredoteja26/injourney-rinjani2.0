import React, { useState } from "react";
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
  ChevronDown,
  ChevronRight,
  Building2,
  Building,
  User,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

// Mock organization data for recursive selection
const MOCK_ORG_STRUCTURE = [
  {
    id: "company-1",
    name: "PT Telkom Indonesia",
    type: "company",
    children: [
      {
        id: "org-1",
        name: "Technology Division",
        type: "organization",
        children: [
          { id: "emp-1", name: "John Doe", type: "employee", position: "Software Engineer" },
          { id: "emp-2", name: "Jane Smith", type: "employee", position: "Product Manager" },
          { id: "emp-3", name: "Bob Wilson", type: "employee", position: "DevOps Engineer" },
        ],
      },
      {
        id: "org-2",
        name: "Human Resources",
        type: "organization",
        children: [
          { id: "emp-4", name: "Alice Brown", type: "employee", position: "HR Manager" },
          { id: "emp-5", name: "Charlie Davis", type: "employee", position: "Recruiter" },
        ],
      },
      {
        id: "org-3",
        name: "Finance Department",
        type: "organization",
        children: [
          { id: "emp-6", name: "David Lee", type: "employee", position: "Financial Analyst" },
          { id: "emp-7", name: "Emma Wilson", type: "employee", position: "Accountant" },
        ],
      },
    ],
  },
  {
    id: "company-2",
    name: "Telkomsel",
    type: "company",
    children: [
      {
        id: "org-4",
        name: "Marketing Division",
        type: "organization",
        children: [
          { id: "emp-8", name: "Frank Miller", type: "employee", position: "Marketing Manager" },
          { id: "emp-9", name: "Grace Taylor", type: "employee", position: "Content Creator" },
        ],
      },
    ],
  },
];

interface Question {
  id: string;
  type: string;
  question: string;
  required: boolean;
  options?: string[];
  minChoices?: number;
  maxChoices?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  maxStars?: number;
}

interface SurveyBuilderProps {
  survey?: {
    id: string;
    title: string;
    type: string;
    status: string;
    deadline: string;
    targetDepartments: string[];
    totalQuestions: number;
    allowPreview: boolean;
  } | null;
  onBack: () => void;
}

// Recursive Tree Component for Target Audience
function OrgTreeNode({ 
  node, 
  selectedIds, 
  onToggle, 
  level = 0 
}: { 
  node: any; 
  selectedIds: Set<string>; 
  onToggle: (id: string) => void;
  level?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedIds.has(node.id);

  const getIcon = () => {
    if (node.type === "company") return <Building2 className="w-4 h-4 text-primary" />;
    if (node.type === "organization") return <Building className="w-4 h-4 text-accent" />;
    return <User className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div>
      <div 
        className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 p-0"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(node.id)}
          id={`node-${node.id}`}
        />
        
        {getIcon()}
        
        <div className="flex-1" onClick={() => onToggle(node.id)}>
          <div className="caption" style={{ fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)' }}>
            {node.name}
          </div>
          {node.position && (
            <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              {node.position}
            </div>
          )}
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child: any) => (
            <OrgTreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Question Type Configuration Component
function QuestionConfig({ 
  question, 
  onUpdate 
}: { 
  question: Question; 
  onUpdate: (field: string, value: any) => void;
}) {
  const [options, setOptions] = useState(question.options?.join("\n") || "");

  return (
    <div className="space-y-4">
      {/* Text Input - No additional config needed */}
      {question.type === "text" && (
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="caption text-muted-foreground">
            Text input questions allow respondents to provide free-form text answers.
          </p>
        </div>
      )}

      {/* Single Choice */}
      {question.type === "single" && (
        <div>
          <Label>Options (one per line) *</Label>
          <Textarea
            placeholder="Option 1&#10;Option 2&#10;Option 3"
            value={options}
            onChange={(e) => {
              setOptions(e.target.value);
              onUpdate("options", e.target.value.split("\n").filter(o => o.trim()));
            }}
            rows={5}
            className="mt-2"
          />
          <p className="caption text-muted-foreground mt-1" style={{ fontSize: 'var(--text-xs)' }}>
            Minimum 2 options required
          </p>
        </div>
      )}

      {/* Multiple Choice with Min/Max */}
      {question.type === "multiple" && (
        <div className="space-y-4">
          <div>
            <Label>Options (one per line) *</Label>
            <Textarea
              placeholder="Option 1&#10;Option 2&#10;Option 3&#10;Option 4"
              value={options}
              onChange={(e) => {
                setOptions(e.target.value);
                onUpdate("options", e.target.value.split("\n").filter(o => o.trim()));
              }}
              rows={5}
              className="mt-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-choices">Minimum Choices</Label>
              <Input
                id="min-choices"
                type="number"
                min={1}
                value={question.minChoices || 1}
                onChange={(e) => onUpdate("minChoices", parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="max-choices">Maximum Choices</Label>
              <Input
                id="max-choices"
                type="number"
                min={1}
                value={question.maxChoices || 3}
                onChange={(e) => onUpdate("maxChoices", parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Likert Scale - Configurable */}
      {question.type === "likert" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scale-min">Scale Minimum</Label>
              <Input
                id="scale-min"
                type="number"
                min={1}
                value={question.scaleMin || 1}
                onChange={(e) => onUpdate("scaleMin", parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="scale-max">Scale Maximum</Label>
              <Input
                id="scale-max"
                type="number"
                min={2}
                max={10}
                value={question.scaleMax || 5}
                onChange={(e) => onUpdate("scaleMax", parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-label">Minimum Label</Label>
              <Input
                id="min-label"
                placeholder="e.g., Strongly Disagree"
                value={question.scaleMinLabel || ""}
                onChange={(e) => onUpdate("scaleMinLabel", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="max-label">Maximum Label</Label>
              <Input
                id="max-label"
                placeholder="e.g., Strongly Agree"
                value={question.scaleMaxLabel || ""}
                onChange={(e) => onUpdate("scaleMaxLabel", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <p className="caption mb-3" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Preview:</p>
            <div className="flex items-center justify-between gap-2">
              {question.scaleMinLabel && (
                <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {question.scaleMinLabel}
                </span>
              )}
              <div className="flex gap-2">
                {Array.from({ length: (question.scaleMax || 5) - (question.scaleMin || 1) + 1 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 border-2 border-border rounded-lg flex items-center justify-center bg-card"
                  >
                    <span className="caption">{(question.scaleMin || 1) + i}</span>
                  </div>
                ))}
              </div>
              {question.scaleMaxLabel && (
                <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {question.scaleMaxLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Star Rating */}
      {question.type === "star" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="max-stars">Maximum Stars (1-5)</Label>
            <Input
              id="max-stars"
              type="number"
              min={1}
              max={5}
              value={question.maxStars || 5}
              onChange={(e) => onUpdate("maxStars", Math.min(5, parseInt(e.target.value)))}
              className="mt-2"
            />
          </div>

          {/* Preview */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <p className="caption mb-3" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Preview:</p>
            <div className="flex gap-1">
              {Array.from({ length: question.maxStars || 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-muted-foreground" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SurveyBuilder({ survey, onBack }: SurveyBuilderProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState(survey?.title || "");
  const [description, setDescription] = useState("");
  const [surveyType, setSurveyType] = useState(survey?.type || "engagement");
  const [deadline, setDeadline] = useState(survey?.deadline || "");
  const [allowPreview, setAllowPreview] = useState(survey?.allowPreview ?? true);
  const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      type: "text",
      question: "",
      required: true,
      scaleMin: 1,
      scaleMax: 5,
      maxStars: 5,
      minChoices: 1,
      maxChoices: 3,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q${questions.length + 1}`,
        type: "text",
        question: "",
        required: true,
        scaleMin: 1,
        scaleMax: 5,
        maxStars: 5,
        minChoices: 1,
        maxChoices: 3,
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const handleTargetToggle = (id: string) => {
    const newSelected = new Set(selectedTargets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTargets(newSelected);
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
    if (selectedTargets.size === 0) {
      toast.error("Please select target audience");
      return;
    }
    toast.success("Survey published successfully");
    onBack();
  };

  const getSelectedCount = () => {
    let count = { companies: 0, organizations: 0, employees: 0 };
    selectedTargets.forEach(id => {
      if (id.startsWith("company-")) count.companies++;
      else if (id.startsWith("org-")) count.organizations++;
      else if (id.startsWith("emp-")) count.employees++;
    });
    return count;
  };

  const selectedCount = getSelectedCount();

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
              <h1 className="mb-2">{survey ? "Edit Survey" : "Create New Survey"}</h1>
              <p className="caption text-muted-foreground">
                Configure survey details, questions, and target audience
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} className="gap-2">
                <Eye className="w-4 h-4" />
                Publish Survey
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              Survey Details
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Questions ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="audience" className="gap-2">
              <Users className="w-4 h-4" />
              Target Audience
              {selectedTargets.size > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full caption" style={{ fontSize: 'var(--text-xs)' }}>
                  {selectedTargets.size}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Survey Details Tab - FULL WIDTH */}
          <TabsContent value="details">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <Label htmlFor="title">Survey Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Employee Engagement Q4 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2"
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Survey Type</Label>
                  <Select value={surveyType} onValueChange={setSurveyType}>
                    <SelectTrigger id="type" className="mt-2">
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
                  />
                </div>

                <div>
                  <Label>Survey Settings</Label>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch
                      id="allow-preview"
                      checked={allowPreview}
                      onCheckedChange={setAllowPreview}
                    />
                    <Label htmlFor="allow-preview" className="cursor-pointer">
                      Allow result preview
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Questions Tab - FULL WIDTH */}
          <TabsContent value="questions">
            <div className="space-y-4">
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
                        {questions.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="text-destructive-foreground hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label>Question Text *</Label>
                          <Textarea
                            placeholder="Enter your question here..."
                            value={question.question}
                            onChange={(e) => handleQuestionChange(question.id, "question", e.target.value)}
                            rows={2}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Question Type</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value) => handleQuestionChange(question.id, "type", value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text Input</SelectItem>
                              <SelectItem value="single">Single Choice</SelectItem>
                              <SelectItem value="multiple">Multiple Choice</SelectItem>
                              <SelectItem value="likert">Likert Scale</SelectItem>
                              <SelectItem value="star">Star Rating</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <QuestionConfig
                        question={question}
                        onUpdate={(field, value) => handleQuestionChange(question.id, field, value)}
                      />

                      <div className="flex items-center gap-2 pt-2 border-t border-border">
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

          {/* Target Audience Tab - FULL WIDTH with Recursive Selection */}
          <TabsContent value="audience">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <h3 className="mb-2">Select Target Audience</h3>
                <p className="caption text-muted-foreground">
                  Select companies, organizations, or individual employees to receive this survey
                </p>

                {/* Selected Summary */}
                {selectedTargets.size > 0 && (
                  <div className="flex gap-3 mt-4">
                    {selectedCount.companies > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="caption text-primary">{selectedCount.companies} Companies</span>
                      </div>
                    )}
                    {selectedCount.organizations > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                        <Building className="w-4 h-4 text-accent" />
                        <span className="caption text-accent">{selectedCount.organizations} Organizations</span>
                      </div>
                    )}
                    {selectedCount.employees > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-lg">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="caption">{selectedCount.employees} Employees</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tree Structure */}
              <div className="p-4 max-h-[600px] overflow-y-auto">
                {MOCK_ORG_STRUCTURE.map((company) => (
                  <OrgTreeNode
                    key={company.id}
                    node={company}
                    selectedIds={selectedTargets}
                    onToggle={handleTargetToggle}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                      Selection Tip
                    </div>
                    <p className="caption text-muted-foreground">
                      Selecting a company or organization will target all employees within it. 
                      You can also select specific employees for more targeted surveys.
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
