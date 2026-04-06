/**
 * Talent Request Modal
 * Modal for unit leaders to nominate candidates for positions
 * Supports cross-unit and cross-company nominations
 */

import React, { useState, useMemo } from 'react';
import { X, Search, Building2, Award, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner@2.0.3';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { calculateEQS } from '../../../lib/career-path/eqsCalculation';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import { EQSScoreDisplay } from '../shared/EQSScoreDisplay';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import type { Position, UnitAspiration, Employee } from '../../../types/careerPath';

interface TalentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: Position;
  existingNominations: UnitAspiration[];
}

interface CandidateWithEQS extends Employee {
  eqsScore: number;
  eqsRating: string;
}

export function TalentRequestModal({ 
  isOpen, 
  onClose, 
  position,
  existingNominations 
}: TalentRequestModalProps) {
  const { currentView, employees, aspirations, submitAspiration } = useCareerPath();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('ALL');
  const [companyFilter, setCompanyFilter] = useState<string>('ALL');
  const [selectedCandidates, setSelectedCandidates] = useState<CandidateWithEQS[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get existing nomination IDs
  const existingNomineeIds = useMemo(() => {
    return new Set(existingNominations.map(n => n.nominee_id));
  }, [existingNominations]);

  // Get all unique units and companies
  const { units, companies } = useMemo(() => {
    const unitSet = new Set<string>();
    const companySet = new Set<string>();
    employees.forEach(emp => {
      unitSet.add(emp.unit);
      companySet.add(emp.company);
    });
    return {
      units: Array.from(unitSet).sort(),
      companies: Array.from(companySet).sort()
    };
  }, [employees]);

  // Get eligible candidates with EQS
  const eligibleCandidates = useMemo(() => {
    // Filter candidates
    let filtered = employees.filter(emp => 
      emp.id !== currentView.userId && // Not self
      emp.disciplinary_status !== 'ACTIVE' && // Not under disciplinary action
      !existingNomineeIds.has(emp.id) // Not already nominated
    );

    // Unit filter
    if (unitFilter !== 'ALL') {
      filtered = filtered.filter(emp => emp.unit === unitFilter);
    }

    // Company filter
    if (companyFilter !== 'ALL') {
      filtered = filtered.filter(emp => emp.company === companyFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query) ||
        emp.unit.toLowerCase().includes(query) ||
        emp.company.toLowerCase().includes(query)
      );
    }

    // Calculate EQS for each candidate
    const withEQS: CandidateWithEQS[] = filtered.map(emp => {
      const eqs = calculateEQS(emp, position, aspirations);
      return {
        ...emp,
        eqsScore: eqs.total,
        eqsRating: eqs.rating
      };
    });

    // Sort by EQS score (descending)
    return withEQS.sort((a, b) => b.eqsScore - a.eqsScore);
  }, [employees, currentView.userId, existingNomineeIds, unitFilter, companyFilter, searchQuery, position, aspirations]);

  // Handle select candidate
  const handleSelectCandidate = (candidate: CandidateWithEQS) => {
    if (selectedCandidates.some(c => c.id === candidate.id)) {
      setSelectedCandidates(selectedCandidates.filter(c => c.id !== candidate.id));
    } else {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedCandidates.length === 0) {
      toast.error('Please select at least one candidate');
      return;
    }
    setShowConfirmation(true);
  };

  // Handle confirm submission
  const handleConfirmSubmit = () => {
    selectedCandidates.forEach((candidate) => {
      const aspiration: UnitAspiration = {
        id: `UNIT${Date.now()}_${candidate.id}_${position.id}`,
        emp_id: candidate.id,
        pos_id: position.id,
        type: candidate.grade_jabatan < position.grade_jabatan ? 'PROMOSI' : 'ROTASI',
        source: 'UNIT',
        nominator_id: currentView.userId,
        nominator: currentView.user.name,
        unit_id: currentView.user.unit,
        nominee_id: candidate.id,
        nominee_name: candidate.name,
        submitted: new Date().toISOString(),
        status: 'ACTIVE'
      };
      submitAspiration(aspiration);
    });

    toast.success(`${selectedCandidates.length} candidate(s) nominated successfully!`);
    setSelectedCandidates([]);
    setShowConfirmation(false);
    onClose();
  };

  // Handle close
  const handleClose = () => {
    setSelectedCandidates([]);
    setSearchQuery('');
    setUnitFilter('ALL');
    setCompanyFilter('ALL');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleClose}
      >
        <div 
          className="rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="p-6 border-b flex items-start justify-between"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex-1">
              <h3>Nominate Candidate for Position</h3>
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-sm)', marginTop: '8px' }}>
                {position.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <GradeJabatanBadge grade={position.grade_jabatan} band={position.band_jabatan} />
                <span 
                  className="badge px-2 py-1"
                  style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
                >
                  {position.job_family}
                </span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 hover:bg-[var(--color-muted)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div 
            className="p-6 border-b space-y-4"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-muted)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="🔍 Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[var(--color-background)] border-[var(--color-border)]"
                />
              </div>

              <div>
                <Select value={unitFilter} onValueChange={setUnitFilter}>
                  <SelectTrigger className="bg-[var(--color-background)] border-[var(--color-border)]">
                    <SelectValue placeholder="All Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Units</SelectItem>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger className="bg-[var(--color-background)] border-[var(--color-border)]">
                    <SelectValue placeholder="All Companies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Companies</SelectItem>
                    {companies.map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                {eligibleCandidates.length} eligible candidates • {selectedCandidates.length} selected
              </p>
              {selectedCandidates.length > 0 && (
                <Button size="sm" variant="outline" onClick={() => setSelectedCandidates([])} className="bg-[var(--color-background)] border-[var(--color-border)] hover:bg-[var(--color-muted)]">
                  Clear Selection
                </Button>
              )}
            </div>
          </div>

          {/* Candidates List */}
          <div className="flex-1 overflow-y-auto p-6">
            {eligibleCandidates.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <p style={{ color: 'var(--color-muted-foreground)' }}>
                  {searchQuery || unitFilter !== 'ALL' || companyFilter !== 'ALL' 
                    ? 'No candidates match your filters' 
                    : 'No eligible candidates available'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {eligibleCandidates.map((candidate) => {
                  const isSelected = selectedCandidates.some(c => c.id === candidate.id);
                  const isCrossUnit = candidate.unit !== currentView.user.unit;
                  const isCrossCompany = candidate.company !== currentView.user.company;
                  
                  return (
                    <div
                      key={candidate.id}
                      className="rounded-lg p-4 cursor-pointer transition-all"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-card)',
                        border: isSelected 
                          ? '2px solid var(--color-primary)' 
                          : '1px solid var(--color-border)'
                      }}
                      onClick={() => handleSelectCandidate(candidate)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 style={{ fontSize: 'var(--text-base)' }}>{candidate.name}</h4>
                            {(isCrossUnit || isCrossCompany) && (
                              <span 
                                className="badge px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: 'var(--color-accent)',
                                  color: 'var(--color-accent-foreground)',
                                  fontSize: 'var(--text-xs)'
                                }}
                              >
                                {isCrossCompany ? 'Cross-Company' : 'Cross-Unit'}
                              </span>
                            )}
                          </div>

                          <p className="caption mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
                            {candidate.position}
                          </p>

                          <div className="flex items-center gap-2 flex-wrap">
                            <GradeJabatanBadge grade={candidate.grade_jabatan} band={candidate.band_jabatan} />
                            
                            <span 
                              className="caption px-2 py-1 rounded inline-flex items-center gap-1"
                              style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
                            >
                              <Building2 className="w-3 h-3" />
                              {candidate.unit}
                            </span>

                            {isCrossCompany && (
                              <span 
                                className="caption px-2 py-1 rounded"
                                style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
                              >
                                {candidate.company}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <EQSScoreDisplay score={candidate.eqsScore} />
                          {isSelected && (
                            <span 
                              className="inline-flex items-center gap-1 px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-primary-foreground)',
                                fontSize: 'var(--text-xs)'
                              }}
                            >
                              ✓ Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div 
            className="p-6 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              💡 Tip: Candidates with higher EQS scores are ranked first
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={selectedCandidates.length === 0}
                className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]"
              >
                Nominate {selectedCandidates.length > 0 ? `(${selectedCandidates.length})` : ''}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Talent Nominations"
        description={`You are about to nominate ${selectedCandidates.length} candidate(s) for the position "${position.name}"`}
        confirmText="Submit Nominations"
        checkboxLabel="I confirm the nominations are correct"
      >
        <div className="space-y-3">
          <label>Selected Candidates:</label>
          <div className="space-y-2">
            {selectedCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="flex items-center justify-between p-3 rounded"
                style={{ backgroundColor: 'var(--color-muted)' }}
              >
                <div>
                  <p style={{ fontWeight: 'var(--font-weight-semibold)' }}>{candidate.name}</p>
                  <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                    {candidate.position} • {candidate.unit}
                  </p>
                </div>
                <div className="text-right">
                  <EQSScoreDisplay score={candidate.eqsScore} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
}
