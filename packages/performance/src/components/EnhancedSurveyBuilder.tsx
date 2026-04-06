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
  Building2,
  ChevronDown,
  ChevronRight,
  Star,
  Globe,
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
  type: "text" | "single" | "multiple" | "likert" | "star";
  question: string;
  required: boolean;
  options: string[];
  // For multiple choice
  minSelections?: number;
  maxSelections?: number;
  // For likert scale
  likertScale?: number; // 3, 5, 7, etc.
  scaleLabels?: {
    start?: string;
    end?: string;
  };
  // For star rating
  starScale?: number; // 1-5
}

// Hierarchical company structure
interface CompanyNode {
  id: string;
  name: string;
  type: "company" | "organization" | "employee";
  children?: CompanyNode[];
  employeeCount?: number;
}

interface SurveyBuilderProps {
  survey?: {
    id: string;
    title: string;
    type: string;
    status: string;
    deadline: string;
    targetAudience: {
      type: "all" | "company" | "unit" | "employees" | "external";
      value: string;
    };
    totalQuestions: number;
    aiEnabled: boolean;
  } | null;
  onBack: () => void;
}

export function EnhancedSurveyBuilder({ survey, onBack }: SurveyBuilderProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState(survey?.title || "");
  const [description, setDescription] = useState("");
  const [surveyType, setSurveyType] = useState(survey?.type || "engagement");
  const [deadline, setDeadline] = useState(survey?.deadline || "");
  
  // Enhanced Target Audience
  const [audienceType, setAudienceType] = useState<"all" | "hierarchical" | "employees" | "external">("all");
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [externalEmails, setExternalEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  
  // AI Settings
  const [aiEnabled, setAiEnabled] = useState(survey?.aiEnabled ?? false);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      type: "likert",
      question: "",
      required: true,
      options: [],
      likertScale: 5,
      scaleLabels: {
        start: "Strongly Disagree",
        end: "Strongly Agree"
      }
    },
  ]);

  // Hierarchical company data structure
  const companyHierarchy: CompanyNode[] = [
    {
      id: "holding",
      name: "Injourney Holding",
      type: "company",
      employeeCount: 250,
      children: [
        {
          id: "digital",
          name: "PT Injourney Digital",
          type: "company",
          employeeCount: 120,
          children: [
            { id: "digital-tech", name: "Technology Division", type: "organization", employeeCount: 45 },
            { id: "digital-marketing", name: "Marketing Division", type: "organization", employeeCount: 35 },
            { id: "digital-ops", name: "Operations Division", type: "organization", employeeCount: 40 },
          ]
        },
        {
          id: "tech",
          name: "PT Injourney Technology",
          type: "company",
          employeeCount: 80,
          children: [
            { id: "tech-dev", name: "Development Team", type: "organization", employeeCount: 50 },
            { id: "tech-qa", name: "QA Team", type: "organization", employeeCount: 30 },
          ]
        },
        {
          id: "ventures",
          name: "PT Injourney Ventures",
          type: "company",
          employeeCount: 50,
          children: [
            { id: "ventures-invest", name: "Investment Team", type: "organization", employeeCount: 20 },
            { id: "ventures-strategy", name: "Strategy Team", type: "organization", employeeCount: 30 },
          ]
        }
      ]
    }
  ];

  // Mock employees for selection
  const employees = [
    { id: "emp1", name: "Budi Santoso", position: "Senior Developer", company: "PT Injourney Digital" },
    { id: "emp2", name: "Siti Nurhaliza", position: "HR Manager", company: "PT Injourney Digital" },
    { id: "emp3", name: "Ahmad Rizki", position: "Product Manager", company: "PT Injourney Technology" },
    { id: "emp4", name: "Dewi Lestari", position: "Marketing Lead", company: "PT Injourney Digital" },
    { id: "emp5", name: "Rudi Hartono", position: "Finance Director", company: "Injourney Holding" },
  ];

  // Recursive node expansion state
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["holding"]));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // Recursive selection with children
  const toggleNodeSelection = (node: CompanyNode, checked: boolean) => {
    const newSelected = new Set(selectedNodes);
    
    const selectRecursive = (n: CompanyNode) => {
      if (checked) {
        newSelected.add(n.id);
      } else {
        newSelected.delete(n.id);
      }
      if (n.children) {
        n.children.forEach(child => selectRecursive(child));
      }
    };
    
    selectRecursive(node);
    setSelectedNodes(newSelected);
  };

  // Calculate total recipients recursively
  const calculateRecipients = (node: CompanyNode): number => {
    let count = node.employeeCount || 0;
    if (node.children) {
      count = node.children.reduce((sum, child) => sum + calculateRecipients(child), 0);
    }
    return count;
  };

  const getTotalRecipients = () => {
    if (audienceType === "all") {
      return 250;
    } else if (audienceType === "hierarchical") {
      let total = 0;
      const countSelected = (nodes: CompanyNode[]) => {
        nodes.forEach(node => {
          if (selectedNodes.has(node.id)) {
            total += calculateRecipients(node);
          } else if (node.children) {
            countSelected(node.children);
          }
        });
      };
      countSelected(companyHierarchy);
      return total;
    } else if (audienceType === "employees") {
      return selectedEmployees.length;
    } else if (audienceType === "external") {
      return externalEmails.length;
    }
    return 0;
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      type: "text",
      question: "",
      required: false,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    } else {
      toast.error("Survey must have at least one question");
    }
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      updateQuestion(questionId, {
        options: [...question.options, `Option ${question.options.length + 1}`],
      });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    } else {
      toast.error("Question must have at least 2 options");
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Please enter a survey title");
      setActiveTab("details");
      return;
    }

    if (questions.some((q) => !q.question.trim())) {
      toast.error("All questions must have text");
      setActiveTab("questions");
      return;
    }

    if (audienceType === "hierarchical" && selectedNodes.size === 0) {
      toast.error("Please select at least one target");
      setActiveTab("audience");
      return;
    }

    if (audienceType === "employees" && selectedEmployees.length === 0) {
      toast.error("Please select at least one employee");
      setActiveTab("audience");
      return;
    }

    if (audienceType === "external" && externalEmails.length === 0) {
      toast.error("Please add at least one external email");
      setActiveTab("audience");
      return;
    }

    toast.success("Survey published successfully!");
    setTimeout(() => onBack(), 1000);
  };

  const addEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(newEmail)) {
      if (!externalEmails.includes(newEmail)) {
        setExternalEmails([...externalEmails, newEmail]);
        setNewEmail("");
      } else {
        toast.error("Email already added");
      }
    } else {
      toast.error("Please enter a valid email");
    }
  };

  const removeEmail = (email: string) => {
    setExternalEmails(externalEmails.filter(e => e !== email));
  };

  // Render hierarchical tree
  const renderTree = (nodes: CompanyNode[], depth: number = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedNodes.has(node.id);
      const isSelected = selectedNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;
      
      return (
        <div key={node.id} style={{ marginLeft: depth > 0 ? '24px' : '0' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              backgroundColor: isSelected ? 'rgba(0, 133, 138, 0.05)' : 'transparent',
              border: isSelected ? '1px solid rgba(0, 133, 138, 0.2)' : '1px solid transparent',
              marginBottom: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--muted-foreground)'
                }}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <div style={{ width: '20px' }} />
            )}
            
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => toggleNodeSelection(node, checked as boolean)}
            />
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'var(--text-sm)',
                fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                color: 'var(--foreground)'
              }}>
                {node.type === 'company' ? (
                  <Building2 size={16} style={{ color: 'var(--primary)' }} />
                ) : (
                  <Users size={16} style={{ color: 'var(--accent)' }} />
                )}
                <span>{node.name}</span>
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
                marginTop: '2px'
              }}>
                {calculateRecipients(node)} employees
              </div>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div>
              {renderTree(node.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '1px solid var(--border)', 
        backgroundColor: 'var(--card)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ padding: '16px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Button 
                variant="ghost" 
                onClick={onBack}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ChevronLeft style={{ width: '16px', height: '16px' }} />
                Back
              </Button>
              <h1 style={{ marginBottom: '8px' }}>{survey ? "Edit Survey" : "Create New Survey"}</h1>
              <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                Configure survey details, questions, and target audience
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="outline"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  borderColor: 'var(--border)'
                }}
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
      <div style={{ padding: '24px 32px', overflow: 'auto', flex: 1 }}>
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

          {/* Survey Details Tab - FULL WIDTH */}
          <TabsContent value="details">
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
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

              <div className="grid grid-cols-2 gap-6">
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

              <div style={{
                backgroundColor: 'rgba(0, 133, 138, 0.05)',
                border: '1px solid rgba(0, 133, 138, 0.2)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                marginTop: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <AlertCircle style={{ width: '20px', height: '20px', color: 'var(--primary)', marginTop: '2px' }} />
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary)',
                      marginBottom: '4px'
                    }}>
                      Survey Information
                    </div>
                    <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                      Make sure all survey details are accurate before moving to questions and audience configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                    <GripVertical className="text-muted-foreground mt-2 cursor-move" style={{ width: '20px', height: '20px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <Label>Question {index + 1} *</Label>
                          <Input
                            placeholder="Enter your question"
                            value={question.question}
                            onChange={(e) =>
                              updateQuestion(question.id, { question: e.target.value })
                            }
                            className="mt-2"
                            style={{ border: '1px solid var(--border)' }}
                          />
                        </div>
                        <div style={{ width: '200px' }}>
                          <Label>Answer Type</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value: any) => {
                              const updates: Partial<Question> = { type: value };
                              
                              // Set defaults based on type
                              if (value === "single" || value === "multiple") {
                                updates.options = question.options.length > 0 ? question.options : ["Option 1", "Option 2"];
                              }
                              if (value === "multiple") {
                                updates.minSelections = 1;
                                updates.maxSelections = 3;
                              }
                              if (value === "likert") {
                                updates.likertScale = 5;
                                updates.scaleLabels = {
                                  start: "Strongly Disagree",
                                  end: "Strongly Agree"
                                };
                              }
                              if (value === "star") {
                                updates.starScale = 5;
                              }
                              
                              updateQuestion(question.id, updates);
                            }}
                          >
                            <SelectTrigger className="mt-2" style={{ border: '1px solid var(--border)' }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="single">Single Choice</SelectItem>
                              <SelectItem value="multiple">Multiple Choice</SelectItem>
                              <SelectItem value="likert">Likert Scale</SelectItem>
                              <SelectItem value="star">Star Rating</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Single & Multiple Choice Options */}
                      {(question.type === "single" || question.type === "multiple") && (
                        <div className="mt-4 space-y-3">
                          <Label>Options</Label>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) =>
                                  updateOption(question.id, optionIndex, e.target.value)
                                }
                                style={{ border: '1px solid var(--border)' }}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteOption(question.id, optionIndex)}
                                disabled={question.options.length <= 2}
                              >
                                <Trash2 style={{ width: '16px', height: '16px' }} />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(question.id)}
                            style={{ marginTop: '8px' }}
                          >
                            <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                            Add Option
                          </Button>

                          {/* Multiple Choice Min/Max */}
                          {question.type === "multiple" && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <Label htmlFor={`min-${question.id}`}>Minimum Selections</Label>
                                <Input
                                  id={`min-${question.id}`}
                                  type="number"
                                  min="1"
                                  max={question.maxSelections || question.options.length}
                                  value={question.minSelections || 1}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { 
                                      minSelections: parseInt(e.target.value) || 1 
                                    })
                                  }
                                  className="mt-2"
                                  style={{ border: '1px solid var(--border)' }}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`max-${question.id}`}>Maximum Selections</Label>
                                <Input
                                  id={`max-${question.id}`}
                                  type="number"
                                  min={question.minSelections || 1}
                                  max={question.options.length}
                                  value={question.maxSelections || question.options.length}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { 
                                      maxSelections: parseInt(e.target.value) || question.options.length 
                                    })
                                  }
                                  className="mt-2"
                                  style={{ border: '1px solid var(--border)' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Likert Scale Configuration */}
                      {question.type === "likert" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor={`scale-${question.id}`}>Scale Points</Label>
                            <Select
                              value={String(question.likertScale || 5)}
                              onValueChange={(value) =>
                                updateQuestion(question.id, { likertScale: parseInt(value) })
                              }
                            >
                              <SelectTrigger id={`scale-${question.id}`} className="mt-2" style={{ border: '1px solid var(--border)' }}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3-Point Scale</SelectItem>
                                <SelectItem value="5">5-Point Scale</SelectItem>
                                <SelectItem value="7">7-Point Scale</SelectItem>
                                <SelectItem value="10">10-Point Scale</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`start-${question.id}`}>Start Label</Label>
                              <Input
                                id={`start-${question.id}`}
                                placeholder="e.g., Strongly Disagree"
                                value={question.scaleLabels?.start || ""}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    scaleLabels: {
                                      ...question.scaleLabels,
                                      start: e.target.value
                                    }
                                  })
                                }
                                className="mt-2"
                                style={{ border: '1px solid var(--border)' }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`end-${question.id}`}>End Label</Label>
                              <Input
                                id={`end-${question.id}`}
                                placeholder="e.g., Strongly Agree"
                                value={question.scaleLabels?.end || ""}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    scaleLabels: {
                                      ...question.scaleLabels,
                                      end: e.target.value
                                    }
                                  })
                                }
                                className="mt-2"
                                style={{ border: '1px solid var(--border)' }}
                              />
                            </div>
                          </div>

                          {/* Preview */}
                          <div style={{
                            backgroundColor: 'var(--muted)',
                            padding: '16px',
                            borderRadius: 'var(--radius)',
                            marginTop: '12px'
                          }}>
                            <div className="caption" style={{ 
                              color: 'var(--muted-foreground)', 
                              marginBottom: '8px',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              Preview:
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span className="caption" style={{ color: 'var(--foreground)' }}>
                                {question.scaleLabels?.start || "Start"}
                              </span>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {Array.from({ length: question.likertScale || 5 }).map((_, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      border: '2px solid var(--border)',
                                      borderRadius: 'var(--radius)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: 'Inter, sans-serif',
                                      fontSize: 'var(--text-sm)',
                                      fontWeight: 'var(--font-weight-medium)',
                                      color: 'var(--foreground)'
                                    }}
                                  >
                                    {i + 1}
                                  </div>
                                ))}
                              </div>
                              <span className="caption" style={{ color: 'var(--foreground)' }}>
                                {question.scaleLabels?.end || "End"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Star Rating Configuration */}
                      {question.type === "star" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor={`stars-${question.id}`}>Number of Stars (Max 5)</Label>
                            <Select
                              value={String(question.starScale || 5)}
                              onValueChange={(value) =>
                                updateQuestion(question.id, { starScale: parseInt(value) })
                              }
                            >
                              <SelectTrigger id={`stars-${question.id}`} className="mt-2" style={{ border: '1px solid var(--border)' }}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Preview */}
                          <div style={{
                            backgroundColor: 'var(--muted)',
                            padding: '16px',
                            borderRadius: 'var(--radius)',
                            marginTop: '12px'
                          }}>
                            <div className="caption" style={{ 
                              color: 'var(--muted-foreground)', 
                              marginBottom: '8px',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              Preview:
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              {Array.from({ length: question.starScale || 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={32}
                                  style={{ color: '#FFA500', fill: '#FFA500' }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                        <Switch
                          checked={question.required}
                          onCheckedChange={(checked) =>
                            updateQuestion(question.id, { required: checked })
                          }
                        />
                        <Label style={{ margin: 0 }}>Required Question</Label>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteQuestion(question.id)}
                      disabled={questions.length <= 1}
                    >
                      <Trash2 style={{ width: '16px', height: '16px', color: 'var(--destructive-foreground)' }} />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addQuestion}
                style={{ width: '100%', border: '2px dashed var(--border)' }}
              >
                <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Add Question
              </Button>
            </div>
          </TabsContent>

          {/* Target Audience Tab - REDESIGNED & FULL WIDTH */}
          <TabsContent value="audience">
            <div className="bg-card border border-border rounded-lg p-8">
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px' }}>Select Target Audience</h3>
                <p className="caption text-muted-foreground">
                  Configure who will receive this survey. Hierarchical selections include all children automatically.
                </p>
              </div>

              <RadioGroup value={audienceType} onValueChange={(value: any) => setAudienceType(value)}>
                <div className="space-y-4">
                  {/* All Employees */}
                  <div 
                    className="flex items-center space-x-4 p-6 rounded-lg"
                    style={{ 
                      border: '2px solid var(--border)',
                      backgroundColor: audienceType === "all" ? 'rgba(0, 133, 138, 0.03)' : 'transparent'
                    }}
                  >
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="flex-1 cursor-pointer">
                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <Users size={18} style={{ color: 'var(--primary)' }} />
                          <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)'
                          }}>
                            All Employees
                          </span>
                        </div>
                        <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          Send to everyone in the organization (~250 employees)
                        </p>
                      </div>
                    </Label>
                  </div>

                  {/* Hierarchical Selection */}
                  <div 
                    className="flex flex-col p-6 rounded-lg"
                    style={{ 
                      border: '2px solid var(--border)',
                      backgroundColor: audienceType === "hierarchical" ? 'rgba(0, 133, 138, 0.03)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                      <RadioGroupItem value="hierarchical" id="hierarchical" className="mt-1" />
                      <Label htmlFor="hierarchical" className="flex-1 cursor-pointer">
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <Building2 size={18} style={{ color: 'var(--primary)' }} />
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)'
                            }}>
                              Company / Organization (Hierarchical)
                            </span>
                          </div>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-sm)', marginBottom: '16px' }}>
                            Select companies or organizations. Selecting a parent automatically includes all children.
                          </p>
                        </div>

                        {audienceType === "hierarchical" && (
                          <div style={{
                            marginTop: '16px',
                            padding: '16px',
                            backgroundColor: 'var(--background)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            maxHeight: '400px',
                            overflowY: 'auto'
                          }}>
                            {renderTree(companyHierarchy)}
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>

                  {/* Individual Employees */}
                  <div 
                    className="flex flex-col p-6 rounded-lg"
                    style={{ 
                      border: '2px solid var(--border)',
                      backgroundColor: audienceType === "employees" ? 'rgba(0, 133, 138, 0.03)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                      <RadioGroupItem value="employees" id="employees" className="mt-1" />
                      <Label htmlFor="employees" className="flex-1 cursor-pointer">
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <Users size={18} style={{ color: 'var(--accent)' }} />
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)'
                            }}>
                              Specific Employees
                            </span>
                          </div>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-sm)', marginBottom: '16px' }}>
                            Manually select individual employees
                          </p>
                        </div>

                        {audienceType === "employees" && (
                          <div style={{
                            marginTop: '16px',
                            padding: '16px',
                            backgroundColor: 'var(--background)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            maxHeight: '300px',
                            overflowY: 'auto'
                          }}>
                            <div className="space-y-3">
                              {employees.map((emp) => (
                                <div 
                                  key={emp.id} 
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: selectedEmployees.includes(emp.id) ? 'rgba(0, 133, 138, 0.05)' : 'transparent'
                                  }}
                                >
                                  <Checkbox
                                    id={`emp-${emp.id}`}
                                    checked={selectedEmployees.includes(emp.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedEmployees([...selectedEmployees, emp.id]);
                                      } else {
                                        setSelectedEmployees(selectedEmployees.filter(id => id !== emp.id));
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`emp-${emp.id}`}
                                    className="cursor-pointer flex-1"
                                  >
                                    <div style={{
                                      fontFamily: 'Inter, sans-serif',
                                      fontSize: 'var(--text-sm)',
                                      fontWeight: 'var(--font-weight-medium)',
                                      color: 'var(--foreground)'
                                    }}>
                                      {emp.name}
                                    </div>
                                    <div style={{
                                      fontFamily: 'Inter, sans-serif',
                                      fontSize: 'var(--text-xs)',
                                      color: 'var(--muted-foreground)'
                                    }}>
                                      {emp.position} • {emp.company}
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>

                  {/* External Clients */}
                  <div 
                    className="flex flex-col p-6 rounded-lg"
                    style={{ 
                      border: '2px solid var(--border)',
                      backgroundColor: audienceType === "external" ? 'rgba(0, 133, 138, 0.03)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                      <RadioGroupItem value="external" id="external" className="mt-1" />
                      <Label htmlFor="external" className="flex-1 cursor-pointer">
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <Globe size={18} style={{ color: 'var(--accent)' }} />
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)'
                            }}>
                              External Clients
                            </span>
                          </div>
                          <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-sm)', marginBottom: '16px' }}>
                            Send survey to external email addresses (clients, partners, etc.)
                          </p>
                        </div>

                        {audienceType === "external" && (
                          <div style={{
                            marginTop: '16px',
                            padding: '16px',
                            backgroundColor: 'var(--background)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)'
                          }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                              <Input
                                placeholder="Enter email address"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addEmail();
                                  }
                                }}
                                style={{ border: '1px solid var(--border)' }}
                              />
                              <Button onClick={addEmail} style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                                <Plus size={16} />
                              </Button>
                            </div>

                            {externalEmails.length > 0 && (
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                marginTop: '12px'
                              }}>
                                {externalEmails.map((email, idx) => (
                                  <div
                                    key={idx}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      padding: '6px 12px',
                                      backgroundColor: 'rgba(0, 133, 138, 0.1)',
                                      border: '1px solid rgba(0, 133, 138, 0.2)',
                                      borderRadius: 'var(--radius)',
                                      fontFamily: 'Inter, sans-serif',
                                      fontSize: 'var(--text-sm)'
                                    }}
                                  >
                                    <span>{email}</span>
                                    <button
                                      onClick={() => removeEmail(email)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--destructive-foreground)'
                                      }}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {/* Recipients Summary */}
              <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: 'rgba(0, 133, 138, 0.05)',
                border: '2px solid rgba(0, 133, 138, 0.2)',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={24} style={{ color: 'var(--primary)' }} />
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary)',
                      marginBottom: '4px'
                    }}>
                      Estimated Recipients
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)'
                    }}>
                      {getTotalRecipients()} {audienceType === "external" ? "emails" : "employees"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI & Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div>
                <h3 style={{ marginBottom: '8px' }}>AI-Powered Insights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-6 border border-border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <Label htmlFor="ai-enabled" className="cursor-pointer">Enable AI Recommendations</Label>
                      </div>
                      <p className="caption text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Generate AI-powered insights and recommendations based on survey responses
                      </p>
                    </div>
                    <Switch
                      id="ai-enabled"
                      checked={aiEnabled}
                      onCheckedChange={setAiEnabled}
                    />
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(0, 133, 138, 0.05)',
                border: '1px solid rgba(0, 133, 138, 0.2)',
                borderRadius: 'var(--radius)',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <Sparkles style={{ width: '20px', height: '20px', color: 'var(--primary)', marginTop: '2px' }} />
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary)',
                      marginBottom: '4px'
                    }}>
                      AI Features
                    </div>
                    <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                      When enabled, AI will analyze responses and provide sentiment analysis, key themes, and actionable recommendations.
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
