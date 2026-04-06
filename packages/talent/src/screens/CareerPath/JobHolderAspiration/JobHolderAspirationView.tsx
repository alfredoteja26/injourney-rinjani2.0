/**
 * Job Holder Aspiration View
 * Main view for job holders to nominate successors with ranking
 */

import React, { useState, useMemo } from 'react';
import { AlertCircle, Trophy, Save } from 'lucide-react';
import { cn } from '../../../components/ui/utils';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { toast } from 'sonner@2.0.3';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { calculateEQS } from '../../../lib/career-path/eqsCalculation';
import { CandidateCard } from './CandidateCard';
import { NominatedCandidateCard } from './NominatedCandidateCard';
import { EQSBreakdownModal } from './EQSBreakdownModal';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { EmptyState } from '../shared/EmptyState';
import type { Employee, Position, JobHolderAspiration, EQSScore } from '../../../types/careerPath';

interface CandidateWithEQS extends Employee {
  eqsScore: EQSScore;
}

export function JobHolderAspirationView() {
  const { currentView, positions, employees, aspirations, submitAspiration } = useCareerPath();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [nominated, setNominated] = useState<CandidateWithEQS[]>([]);
  const [showEQSModal, setShowEQSModal] = useState<CandidateWithEQS | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get current user's position
  const currentPosition = useMemo(() => {
    return positions.find(p => p.incumbent_id === currentView.userId);
  }, [positions, currentView.userId]);

  // Get eligible candidates with EQS scores
  const eligibleCandidates = useMemo(() => {
    if (!currentPosition) return [];

    // Eligible: Grade Jabatan between (currentPosition.grade - 3) and currentPosition.grade
    const minGrade = currentPosition.grade_jabatan - 3;
    const maxGrade = currentPosition.grade_jabatan;

    const eligible = employees.filter(emp => 
      emp.id !== currentView.userId && // Not self
      emp.grade_jabatan >= minGrade &&
      emp.grade_jabatan <= maxGrade &&
      emp.disciplinary_status !== 'ACTIVE' // Not under disciplinary action
    );

    // Calculate EQS for each candidate
    const withEQS: CandidateWithEQS[] = eligible.map(emp => ({
      ...emp,
      eqsScore: calculateEQS(emp, currentPosition, aspirations)
    }));

    // Sort by EQS total (descending)
    return withEQS.sort((a, b) => b.eqsScore.total - a.eqsScore.total);
  }, [currentPosition, employees, currentView.userId, aspirations]);

  // Filter candidates by search query
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return eligibleCandidates;
    
    const query = searchQuery.toLowerCase();
    return eligibleCandidates.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.position.toLowerCase().includes(query) ||
      c.unit.toLowerCase().includes(query)
    );
  }, [eligibleCandidates, searchQuery]);

  // Available candidates (not nominated yet)
  const availableCandidates = useMemo(() => {
    const nominatedIds = new Set(nominated.map(n => n.id));
    return filteredCandidates.filter(c => !nominatedIds.has(c.id));
  }, [filteredCandidates, nominated]);

  // Get existing nominations
  const existingNominations = useMemo(() => {
    return aspirations.filter(
      a => a.source === 'JOB_HOLDER' && 
           (a as JobHolderAspiration).for_position_id === currentPosition?.id
    ) as JobHolderAspiration[];
  }, [aspirations, currentPosition]);

  // Handle add to nomination
  const handleAddToNomination = (candidate: CandidateWithEQS) => {
    if (nominated.length >= 3) {
      toast.error('Maximum 3 successors allowed');
      return;
    }
    setNominated([...nominated, candidate]);
    toast.success(`${candidate.name} added to nominations`);
  };

  // Handle remove from nomination
  const handleRemoveFromNomination = (candidateId: string) => {
    setNominated(nominated.filter(n => n.id !== candidateId));
  };

  // Handle reorder (drag and drop)
  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newNominated = [...nominated];
    const [removed] = newNominated.splice(fromIndex, 1);
    newNominated.splice(toIndex, 0, removed);
    setNominated(newNominated);
  };

  // Handle save nominations
  const handleSaveNominations = () => {
    if (nominated.length === 0) {
      toast.error('Please nominate at least one successor');
      return;
    }
    setShowConfirmation(true);
  };

  // Handle confirm submission
  const handleConfirmSubmit = () => {
    if (!currentPosition) return;

    nominated.forEach((candidate, index) => {
      const aspiration: JobHolderAspiration = {
        id: `JH${Date.now()}_${candidate.id}_${index}`,
        emp_id: candidate.id,
        pos_id: currentPosition.id,
        type: candidate.grade_jabatan < currentPosition.grade_jabatan ? 'PROMOSI' : 'ROTASI',
        source: 'JOB_HOLDER',
        nominator_id: currentView.userId,
        nominator: currentView.user.name,
        rank: index + 1, // Rank 1, 2, 3
        for_position_id: currentPosition.id,
        submitted: new Date().toISOString(),
        status: 'ACTIVE'
      };
      submitAspiration(aspiration);
    });

    toast.success(`${nominated.length} successor nominations submitted successfully!`);
    setNominated([]);
    setShowConfirmation(false);
  };

  // Handle view EQS breakdown
  const handleViewEQS = (candidate: CandidateWithEQS) => {
    setShowEQSModal(candidate);
  };

  if (!currentPosition) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No Position Found"
        description="You are not assigned to any position as a job holder"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground">Job Holder Aspiration</h3>
        <p className="text-sm text-muted-foreground font-body">
          Nominasikan calon successor untuk posisi Anda dengan ranking berdasarkan EQS
        </p>
      </div>

      {/* Current Position Info */}
      <div className="rounded-lg p-6 bg-[var(--color-card)] border border-[var(--color-border)]">
        <div className="flex items-start justify-between">
          <div>
            <label className="text-sm text-[var(--color-muted-foreground)] font-medium">Your Position</label>
            <h4 className="mt-1 font-heading font-semibold text-[var(--color-foreground)]">{currentPosition.name}</h4>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
              Grade {currentPosition.grade_jabatan} • {currentPosition.band_jabatan} • {currentPosition.unit}
            </p>
          </div>
          <div className="px-4 py-2 rounded-lg text-center bg-[var(--color-primary-light)]">
            <p className="text-xs text-[var(--color-muted-foreground)] font-medium">Eligible Candidates</p>
            <h4 className="text-xl font-bold text-[var(--color-primary)]">{eligibleCandidates.length}</h4>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded bg-[var(--color-muted)] border-l-4 border-l-[var(--color-primary)]">
          <p className="text-sm text-[var(--color-foreground)]">
            💡 <strong>Eligible:</strong> Karyawan dengan Grade Jabatan {currentPosition.grade_jabatan - 3} - {currentPosition.grade_jabatan}, 
            diurutkan berdasarkan <strong>EQS Score</strong> (kualifikasi terbaik)
          </p>
        </div>
      </div>

      {/* Main Content - Stacked Sections */}
      <div className="space-y-6">
        {/* Nominated Successors Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading font-medium text-[var(--color-foreground)]">Nominated Successors</h4>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Drag to reorder ranking (max 3)
              </p>
            </div>
            {nominated.length > 0 && (
              <Button onClick={handleSaveNominations} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]">
                <Save className="w-4 h-4 mr-2" />
                Save Nominations ({nominated.length})
              </Button>
            )}
          </div>

          {/* Nominated List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {nominated.length === 0 ? (
              <div className="col-span-full rounded-lg p-12 text-center border-2 border-dashed border-[var(--color-border)] bg-[var(--color-muted)]">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-[var(--color-muted-foreground)]" />
                <p className="text-[var(--color-muted-foreground)] font-medium">
                  Click "Add" on candidates to nominate them as successors
                </p>
              </div>
            ) : (
              nominated.map((candidate, index) => (
                <NominatedCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  rank={index + 1}
                  onRemove={() => handleRemoveFromNomination(candidate.id)}
                  onMoveUp={index > 0 ? () => handleReorder(index, index - 1) : undefined}
                  onMoveDown={index < nominated.length - 1 ? () => handleReorder(index, index + 1) : undefined}
                  onViewEQS={() => handleViewEQS(candidate)}
                />
              ))
            )}
          </div>

          {/* Existing Nominations Summary */}
          {existingNominations.length > 0 && (
            <div className="rounded-lg p-4 mt-6 bg-[var(--color-muted)] border border-[var(--color-border)]">
              <label className="text-sm font-medium text-[var(--color-foreground)]">Previously Submitted ({existingNominations.length})</label>
              <ul className="mt-2 space-y-1">
                {existingNominations.map((nom, idx) => {
                  const emp = employees.find(e => e.id === nom.emp_id);
                  return (
                    <li key={nom.id} className="text-xs flex items-center gap-2 text-[var(--color-muted-foreground)]">
                      <span className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[10px]">
                        #{nom.rank}
                      </span>
                      {emp?.name || 'Unknown'}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Available Candidates Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading font-medium text-[var(--color-foreground)]">Available Candidates</h4>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Ranked by EQS Score
              </p>
            </div>
          </div>

          {/* Search */}
          <Input
            type="text"
            placeholder="🔍 Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[var(--color-background)] border-[var(--color-border)]"
          />

          {/* Candidates List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCandidates.length === 0 ? (
              <div className="col-span-full">
                <EmptyState
                  icon={AlertCircle}
                  title="No candidates available"
                  description={searchQuery ? 'No candidates match your search' : 'All eligible candidates have been nominated'}
                />
              </div>
            ) : (
              availableCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  rank={eligibleCandidates.findIndex(c => c.id === candidate.id) + 1}
                  isTopCandidate={index < 3}
                  onAddToNomination={() => handleAddToNomination(candidate)}
                  onViewEQS={() => handleViewEQS(candidate)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* EQS Breakdown Modal */}
      {showEQSModal && currentPosition && (
        <EQSBreakdownModal
          isOpen={!!showEQSModal}
          onClose={() => setShowEQSModal(null)}
          candidate={showEQSModal}
          position={currentPosition}
          eqsScore={showEQSModal.eqsScore}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Successor Nominations"
        description="You are about to submit your successor nominations with the following ranking:"
        confirmText="Submit Nominations"
        checkboxLabel="I confirm the ranking and nominations are correct"
      >
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--color-foreground)]">Nominated Successors:</label>
          <ol className="space-y-2">
            {nominated.map((candidate, index) => (
              <li 
                key={candidate.id}
                className="flex items-center gap-3 p-3 rounded bg-[var(--color-muted)]"
              >
                <span 
                  className={cn(
                    "inline-flex items-center justify-center rounded-full w-8 h-8 text-[var(--color-primary-foreground)]",
                    index === 0 ? "bg-[var(--color-nine-highpot)]" : "bg-[var(--color-primary)]"
                  )}
                >
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[var(--color-foreground)]">{candidate.name}</p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    {candidate.position} • EQS: {candidate.eqsScore.total.toFixed(1)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ConfirmationModal>
    </div>
  );
}
