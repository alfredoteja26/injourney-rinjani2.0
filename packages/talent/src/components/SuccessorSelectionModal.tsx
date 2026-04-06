import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Star, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface SuccessorCandidate {
  id: string;
  name: string;
  employeeId: string;
  avatar?: string;
  currentPosition: string;
  department: string;
  performanceScore: number;
  capacityScore: number;
  readinessScore: number;
  experienceScore: number;
  yearsInCompany: number;
  education: string;
  keyStrengths: string[];
  developmentAreas: string[];
  eqsScore: number;
  rank?: number;
}

interface SuccessorSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  positionTitle: string;
  positionId: string;
  candidates: SuccessorCandidate[];
  onConfirm: (data: {
    primary: string | null;
    secondary: string | null;
    tertiary: string | null;
    notes: string;
  }) => void;
}

export function SuccessorSelectionModal({
  open,
  onOpenChange,
  positionTitle,
  positionId,
  candidates,
  onConfirm
}: SuccessorSelectionModalProps) {
  const [primarySuccessor, setPrimarySuccessor] = useState<string | null>(null);
  const [secondarySuccessor, setSecondarySuccessor] = useState<string | null>(null);
  const [tertiarySuccessor, setTertiarySuccessor] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    if (!primarySuccessor) {
      toast.error("Please select at least a primary successor");
      return;
    }

    onConfirm({
      primary: primarySuccessor,
      secondary: secondarySuccessor,
      tertiary: tertiarySuccessor,
      notes
    });

    // Reset form
    setPrimarySuccessor(null);
    setSecondarySuccessor(null);
    setTertiarySuccessor(null);
    setNotes("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-chart-2";
    if (score >= 70) return "text-yellow-600";
    return "text-muted-foreground";
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 85) return "Ready Now";
    if (score >= 70) return "Ready in 1-2 years";
    return "Needs Development";
  };

  const isSelected = (candidateId: string) => {
    return candidateId === primarySuccessor || 
           candidateId === secondarySuccessor || 
           candidateId === tertiarySuccessor;
  };

  const getSelectionLevel = (candidateId: string) => {
    if (candidateId === primarySuccessor) return "Primary";
    if (candidateId === secondarySuccessor) return "Secondary";
    if (candidateId === tertiarySuccessor) return "Tertiary";
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Successors for {positionTitle}</DialogTitle>
          <DialogDescription>
            Choose primary, secondary, and tertiary successors from the candidate pool
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selection Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className={primarySuccessor ? "border-primary" : "border-dashed"}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Primary Successor</p>
                </div>
                {primarySuccessor ? (
                  <div className="mt-3">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {candidates.find(c => c.id === primarySuccessor)?.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {candidates.find(c => c.id === primarySuccessor)?.currentPosition}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Not selected</p>
                )}
              </CardContent>
            </Card>

            <Card className={secondarySuccessor ? "border-primary" : "border-dashed"}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Secondary Successor</p>
                </div>
                {secondarySuccessor ? (
                  <div className="mt-3">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {candidates.find(c => c.id === secondarySuccessor)?.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {candidates.find(c => c.id === secondarySuccessor)?.currentPosition}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Not selected</p>
                )}
              </CardContent>
            </Card>

            <Card className={tertiarySuccessor ? "border-primary" : "border-dashed"}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Tertiary Successor</p>
                </div>
                {tertiarySuccessor ? (
                  <div className="mt-3">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {candidates.find(c => c.id === tertiarySuccessor)?.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {candidates.find(c => c.id === tertiarySuccessor)?.currentPosition}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Not selected</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Candidate List */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {candidates.map((candidate) => {
                const selectionLevel = getSelectionLevel(candidate.id);
                const selected = isSelected(candidate.id);

                return (
                  <Card 
                    key={candidate.id} 
                    className={`transition-all ${
                      selected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Avatar & Basic Info */}
                        <div className="flex-shrink-0">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Candidate Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 style={{ fontSize: 'var(--text-base)' }}>{candidate.name}</h4>
                                {candidate.rank && candidate.rank <= 3 && (
                                  <Badge variant="default" className="gap-1">
                                    <Award className="w-3 h-3" />
                                    Rank #{candidate.rank}
                                  </Badge>
                                )}
                                {selectionLevel && (
                                  <Badge variant="outline" className="border-primary text-primary">
                                    {selectionLevel}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                {candidate.currentPosition} • {candidate.department}
                              </p>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                {candidate.employeeId} • {candidate.yearsInCompany} years in company
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {candidate.eqsScore.toFixed(1)}
                                </span>
                              </div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>EQS Score</p>
                            </div>
                          </div>

                          {/* Scores Grid */}
                          <div className="grid grid-cols-4 gap-3 mb-3">
                            <div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Performance</p>
                              <div className="flex items-center gap-1">
                                <Progress value={candidate.performanceScore} className="h-1.5 flex-1" />
                                <span className={`${getScoreColor(candidate.performanceScore)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {candidate.performanceScore}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Capacity</p>
                              <div className="flex items-center gap-1">
                                <Progress value={candidate.capacityScore} className="h-1.5 flex-1" />
                                <span className={`${getScoreColor(candidate.capacityScore)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {candidate.capacityScore}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Readiness</p>
                              <div className="flex items-center gap-1">
                                <Progress value={candidate.readinessScore} className="h-1.5 flex-1" />
                                <span className={`${getScoreColor(candidate.readinessScore)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {candidate.readinessScore}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Experience</p>
                              <div className="flex items-center gap-1">
                                <Progress value={candidate.experienceScore} className="h-1.5 flex-1" />
                                <span className={`${getScoreColor(candidate.experienceScore)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {candidate.experienceScore}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={primarySuccessor === candidate.id ? "default" : "outline"}
                              onClick={() => setPrimarySuccessor(candidate.id)}
                              disabled={isSelected(candidate.id) && primarySuccessor !== candidate.id}
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Primary
                            </Button>
                            <Button
                              size="sm"
                              variant={secondarySuccessor === candidate.id ? "default" : "outline"}
                              onClick={() => setSecondarySuccessor(candidate.id)}
                              disabled={isSelected(candidate.id) && secondarySuccessor !== candidate.id}
                            >
                              Secondary
                            </Button>
                            <Button
                              size="sm"
                              variant={tertiarySuccessor === candidate.id ? "default" : "outline"}
                              onClick={() => setTertiarySuccessor(candidate.id)}
                              disabled={isSelected(candidate.id) && tertiarySuccessor !== candidate.id}
                            >
                              Tertiary
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>

          {/* Notes */}
          <div>
            <Label htmlFor="succession-notes" style={{ fontSize: 'var(--text-sm)' }}>
              Succession Planning Notes (Optional)
            </Label>
            <Textarea
              id="succession-notes"
              placeholder="Add any additional notes or considerations for this succession plan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!primarySuccessor}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
