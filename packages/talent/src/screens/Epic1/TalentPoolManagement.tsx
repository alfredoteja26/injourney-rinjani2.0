import { useState, useEffect } from "react";
import { Layout } from "../../components/shell/Layout";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "../../components/ui/table";
import { 
  Briefcase, 
  Users, 
  Eye, 
  Target, 
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  Building2,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  Bot,
  Wand2
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  getPositionsWithCandidateCounts,
  getCandidatesForPosition
} from "../../data/mockTalentPoolData";
import { EQSSidePanel } from "../../components/EQSSidePanel";
import { getScoreColorClass } from "../../utils/eqsCalculation";
import type { CandidateData } from "../../types/talent";

export function TalentPoolManagement() {
  const [selectedPosition, setSelectedPosition] = useState(getPositionsWithCandidateCounts()[0]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);
  const [showEQSPanel, setShowEQSPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [isAiSearchOpen, setIsAiSearchOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIds, setAiFilteredIds] = useState<string[] | null>(null);

  const allCandidates = getCandidatesForPosition(selectedPosition.id);
  
  const candidates = aiFilteredIds 
    ? allCandidates.filter(c => aiFilteredIds.includes(c.id))
    : allCandidates;

  useEffect(() => {
    setAiFilteredIds(null);
    setAiPrompt("");
    setIsAiSearchOpen(false);
  }, [selectedPosition.id]);

  const handleAISearch = () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock logic: randomly select matching candidates
      const shuffled = [...allCandidates].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.max(1, Math.floor(allCandidates.length * 0.7)));
      
      setAiFilteredIds(selected.map(c => c.id));
      setIsAiSearching(false);
      
      toast.success("AI Search Complete", {
        description: `Found ${selected.length} candidates matching your criteria.`
      });
    }, 1500);
  };

  const clearAISearch = () => {
    setAiFilteredIds(null);
    setAiPrompt("");
    setIsAiSearchOpen(false);
  };


  const handleViewEQS = (candidate: CandidateData) => {
    setSelectedCandidate(candidate);
    setShowEQSPanel(true);
  };

  const handleRecalculate = () => {
    toast.info("Starting EQS Recalculation...", { duration: 1000 });
    // Simulate API call
    setTimeout(() => {
      toast.success("EQS Recalculation Complete", { 
        description: "All candidate scores have been updated based on latest data." 
      });
    }, 1500);
  };

  const getReadinessIcon = (count: number) => {
    if (count === 0) return <XCircle className="w-4 h-4 text-red-600" />;
    if (count === 1) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <CheckCircle2 className="w-4 h-4 text-green-600" />;
  };

  const getReadinessColor = (count: number) => {
    if (count === 0) return "text-red-600";
    if (count === 1) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredPositions = getPositionsWithCandidateCounts().filter(pos => {
    const matchesSearch = pos.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pos.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "vacant" && pos.status === "vacant") ||
                         (statusFilter === "ksp" && pos.isKSP);
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Talent Pool (Talent Candidate)" }
    ]}>
      <div className="flex h-full bg-background">
        {/* Left Panel - Position List */}
        <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
          <div className="p-6 border-b border-border bg-card space-y-4 flex-shrink-0">
            <div>
              <h3>Talent Pool</h3>
              <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.43' }}>
                Konsolidasi talent pool berbasis EQS dengan ranking per posisi
              </p>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "vacant" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("vacant")}
              >
                Vacant
              </Button>
              <Button
                variant={statusFilter === "ksp" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("ksp")}
              >
                KSP Only
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredPositions.map((position) => (
                <Card
                  key={position.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPosition.id === position.id ? 'border-primary shadow-md' : ''
                  }`}
                  onClick={() => setSelectedPosition(position)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        {position.isKSP && (
                          <Badge variant="default" style={{ fontSize: 'var(--text-xs)' }}>
                            KSP
                          </Badge>
                        )}
                      </div>
                      <Badge 
                        variant={
                          position.status === "vacant" ? "destructive" : 
                          position.status === "vacant-soon" ? "default" : 
                          "secondary"
                        }
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {position.status === "vacant" ? "Vacant" : 
                         position.status === "vacant-soon" ? "Vacant Soon" : 
                         position.status === "to-review" ? "To Review" :
                         "Filled"}
                      </Badge>
                    </div>
                    
                    <h4 style={{ fontSize: 'var(--text-sm)', lineHeight: '1.43', fontWeight: 'var(--font-weight-semibold)' }}>
                      {position.title}
                    </h4>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', lineHeight: '1.5' }}>
                      {position.department}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span style={{ fontSize: 'var(--text-sm)' }}>{getCandidatesForPosition(position.id).length} candidates</span>
                      </div>
                      <div className={`flex items-center gap-1 ${getReadinessColor(position.successorCount)}`}>
                        {getReadinessIcon(position.successorCount)}
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {position.successorCount}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Candidate Rankings */}
        <div className="flex-1">
          <div className="p-6 border-b border-border bg-card space-y-6">
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 style={{ fontSize: 'var(--text-xl)' }}>{selectedPosition.title}</h2>
                      {selectedPosition.isKSP && (
                        <Badge variant="default" style={{ fontSize: 'var(--text-xs)' }}>
                          KSP
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{selectedPosition.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{selectedPosition.company}</span>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div>
                        <p className="text-muted-foreground uppercase font-medium mb-1" style={{ fontSize: 'var(--text-xs)' }}>Level</p>
                        <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{selectedPosition.level}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground uppercase font-medium mb-1" style={{ fontSize: 'var(--text-xs)' }}>Grade</p>
                        <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{selectedPosition.gradeGroup}</p>
                      </div>
                      <div>
                         <p className="text-muted-foreground uppercase font-medium mb-1" style={{ fontSize: 'var(--text-xs)' }}>Status</p>
                         <Badge 
                           variant={
                             selectedPosition.status === "vacant" ? "destructive" : 
                             selectedPosition.status === "vacant-soon" ? "default" : 
                             "secondary"
                           }
                           style={{ fontSize: 'var(--text-xs)' }}
                         >
                           {selectedPosition.status === "vacant" ? "Vacant" : 
                            selectedPosition.status === "vacant-soon" ? "Vacant Soon" : 
                            selectedPosition.status === "to-review" ? "To Review" :
                            "Filled"}
                         </Badge>
                      </div>
                      {selectedPosition.vacancyDate && (
                        <div>
                          <p className="text-muted-foreground uppercase font-medium mb-1" style={{ fontSize: 'var(--text-xs)' }}>Vacant Since</p>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{selectedPosition.vacancyDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-4">
                    <div>
                      <p className="text-muted-foreground uppercase font-medium mb-1" style={{ fontSize: 'var(--text-xs)' }}>Risk Assessment</p>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${selectedPosition.risk === 'critical' ? 'border-red-200 bg-red-50 text-red-700' : 
                            selectedPosition.risk === 'high' ? 'border-orange-200 bg-orange-50 text-orange-700' : ''}
                        `}
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {selectedPosition.risk.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>Candidate Ranking</h3>
                <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.43' }}>
                  Ranking kandidat berdasarkan EQS Score
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={isAiSearchOpen ? "secondary" : "outline"} 
                  size="sm" 
                  className={`gap-2 ${isAiSearchOpen ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
                  onClick={() => setIsAiSearchOpen(!isAiSearchOpen)}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Search
                </Button>
                <div className="flex bg-muted rounded-lg p-1 mr-2">
                  <Button
                    variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setViewMode('card')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setViewMode('table')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleRecalculate}>
                  <RotateCcw className="w-4 h-4" />
                  Recalculate EQS
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            {isAiSearchOpen && (
              <div className="p-4 bg-muted/30 border border-primary/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Bot className="w-4 h-4" />
                  <span className="font-semibold text-sm">AI Candidate Matching</span>
                </div>
                <Textarea 
                  placeholder="Describe the ideal candidate (e.g., 'Has experience in Digital Transformation and at least 5 years in management')..."
                  className="bg-background mb-3 resize-none focus-visible:ring-primary"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    AI will analyze candidate profiles, education, and career history.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={clearAISearch}>Cancel</Button>
                    <Button size="sm" onClick={handleAISearch} disabled={!aiPrompt.trim() || isAiSearching} className="gap-2 bg-primary hover:bg-primary-hover text-white">
                      {isAiSearching ? (
                        <>
                          <Wand2 className="w-3 h-3 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          Find Candidates
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {aiFilteredIds && (
              <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 text-primary">
                   <Sparkles className="w-4 h-4" />
                   <span className="text-sm font-medium">Filtered by AI: "{aiPrompt}"</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearAISearch} className="h-8 text-xs text-muted-foreground hover:text-foreground">
                  Clear Filter
                </Button>
              </div>
            )}
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-6 space-y-4">
              {candidates.length > 0 ? (
                viewMode === 'card' ? (
                  candidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Rank Badge */}
                          <div className="flex flex-col items-center gap-2">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              candidate.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                              candidate.rank === 2 ? 'bg-gray-100 text-gray-700' :
                              candidate.rank === 3 ? 'bg-orange-100 text-orange-700' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                                {candidate.rank}
                              </span>
                            </div>
                            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Rank</span>
                          </div>

                          {/* Candidate Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={candidate.avatar} />
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4>{candidate.name}</h4>
                                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                    {candidate.employeeId}
                                  </p>
                                </div>
                              </div>

                              {/* EQS Score */}
                              <div className="text-right">
                                <div className="flex items-baseline gap-1">
                                  <span 
                                    className={getScoreColorClass(candidate.eqs?.total || 0, 100)}
                                    style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)' }}
                                  >
                                    {candidate.eqs?.total.toFixed(1)}
                                  </span>
                                  <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>/100</span>
                                </div>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>EQS Score</p>
                              </div>
                            </div>

                            {/* Position Details */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                                  Current Position
                                </p>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                  {candidate.currentPosition}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                                  Company
                                </p>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                  {candidate.currentCompany}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                                  Readiness
                                </p>
                                <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>
                                  {candidate.readiness}
                                </Badge>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewEQS(candidate)}
                                className="gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Lihat Profil Pekerja
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Emp. Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Readiness</TableHead>
                          <TableHead className="text-right">EQS Score</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                candidate.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                candidate.rank === 2 ? 'bg-gray-100 text-gray-700' :
                                candidate.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                <span className="font-semibold text-xs">{candidate.rank}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={candidate.avatar} />
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{candidate.name}</div>
                                  <div className="text-xs text-muted-foreground">{candidate.employeeId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="font-medium">{candidate.currentPosition}</div>
                                <div className="text-xs text-muted-foreground">{candidate.currentCompany}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-medium">{candidate.currentGrade}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="font-normal text-xs">
                                {candidate.employeeType === 'PERMANENT' ? 'PKWTT' : 
                                 candidate.employeeType === 'CONTRACT' ? 'PKWT' : candidate.employeeType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {candidate.isTopTalent && (
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-xs shadow-none">
                                  Top Talent
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>
                                {candidate.readiness}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span 
                                className={getScoreColorClass(candidate.eqs?.total || 0, 100)}
                                style={{ fontWeight: 'var(--font-weight-semibold)' }}
                              >
                                {candidate.eqs?.total.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewEQS(candidate)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-muted-foreground">No candidates available</h4>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
                      Add candidates to this position to start succession planning
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* EQS Breakdown Panel */}
      <EQSSidePanel open={showEQSPanel} onOpenChange={setShowEQSPanel} candidate={selectedCandidate} />
    </Layout>
  );
}
