/**
 * Individual Aspiration View
 * Main view for employees to select career aspirations
 */

import React, { useState, useMemo } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { checkEligibility, getEligiblePositions } from '../../../lib/career-path/eligibilityRules';
import { filterPositions, getUniqueCompanies, getUniqueJobFamilies } from '../../../lib/career-path/mockData';
import { calculateRanking } from '../../../lib/career-path/eqsCalculation';
import { PositionCard } from './PositionCard';
import { PositionFilters } from './PositionFilters';
import { PositionDetailPanel } from './PositionDetailPanel';
import { AspirationCounter } from '../components/AspirationCounter';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { EmptyState } from '../shared/EmptyState';
import { AspirationSourceBadge } from '../shared/AspirationSourceBadge';
import { RankingWidget } from '../shared/RankingWidget';
import type { Position, IndividualAspiration, SupervisorAspiration, JobHolderAspiration, UnitAspiration } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

export function IndividualAspirationView() {
  const { currentView, positions, aspirations, submitAspiration, employees } = useCareerPath();
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedJobFamily, setSelectedJobFamily] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Selection state
  const [selectedPositions, setSelectedPositions] = useState<{
    horizontal: Position[];
    vertical: Position[];
  }>({ horizontal: [], vertical: [] });
  
  // UI state
  const [selectedPositionForDetail, setSelectedPositionForDetail] = useState<Position | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  // Get filter options
  const companies = useMemo(() => getUniqueCompanies(), []);
  const jobFamilies = useMemo(() => getUniqueJobFamilies(), []);

  // Filter and categorize positions
  const { horizontal: eligibleHorizontal, vertical: eligibleVertical, ineligible } = useMemo(() => {
    const filtered = filterPositions({
      company: selectedCompany !== 'all' ? selectedCompany : undefined,
      job_family: selectedJobFamily !== 'all' ? selectedJobFamily : undefined,
      status: selectedStatus !== 'all' ? selectedStatus as any : undefined,
      search: searchQuery
    });

    return getEligiblePositions(currentView.user, filtered);
  }, [currentView.user, positions, searchQuery, selectedCompany, selectedJobFamily, selectedStatus]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCompany !== 'all') count++;
    if (selectedJobFamily !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    return count;
  }, [searchQuery, selectedCompany, selectedJobFamily, selectedStatus]);

  // Get existing aspirations
  const existingAspirations = useMemo(() => {
    return aspirations.filter(
      a => a.source === 'INDIVIDUAL' && a.emp_id === currentView.userId
    ) as IndividualAspiration[];
  }, [aspirations, currentView.userId]);

  // Get nominations from others (supervisor, job holder, unit)
  const nominationsFromOthers = useMemo(() => {
    return aspirations.filter(
      a => a.source !== 'INDIVIDUAL' && a.emp_id === currentView.userId
    );
  }, [aspirations, currentView.userId]);

  // Handlers
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCompany('all');
    setSelectedJobFamily('all');
    setSelectedStatus('all');
  };

  const handleSelectPosition = (position: Position) => {
    const eligibility = checkEligibility(currentView.user, position);
    
    if (!eligibility.eligible) {
      toast.error('This position is not eligible for selection');
      return;
    }

    const isHorizontal = eligibility.type === 'ROTASI';
    const currentList = isHorizontal ? selectedPositions.horizontal : selectedPositions.vertical;
    const isAlreadySelected = currentList.some(p => p.id === position.id);

    if (isAlreadySelected) {
      // Remove from selection
      if (isHorizontal) {
        setSelectedPositions({
          ...selectedPositions,
          horizontal: selectedPositions.horizontal.filter(p => p.id !== position.id)
        });
      } else {
        setSelectedPositions({
          ...selectedPositions,
          vertical: selectedPositions.vertical.filter(p => p.id !== position.id)
        });
      }
      toast.success('Position removed from selection');
    } else {
      // Check limits
      if (currentList.length >= 3) {
        toast.error(`Maximum 3 ${isHorizontal ? 'horizontal' : 'vertical'} aspirations allowed`);
        return;
      }

      // Add to selection
      if (isHorizontal) {
        setSelectedPositions({
          ...selectedPositions,
          horizontal: [...selectedPositions.horizontal, position]
        });
      } else {
        setSelectedPositions({
          ...selectedPositions,
          vertical: [...selectedPositions.vertical, position]
        });
      }
      toast.success('Position added to selection');
    }
  };

  const handleSubmit = () => {
    if (selectedPositions.horizontal.length === 0 && selectedPositions.vertical.length === 0) {
      toast.error('Please select at least one position');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    const allSelected = [...selectedPositions.horizontal, ...selectedPositions.vertical];
    
    allSelected.forEach((position, index) => {
      const eligibility = checkEligibility(currentView.user, position);
      const aspiration: IndividualAspiration = {
        id: `IND${Date.now()}_${index}`,
        emp_id: currentView.userId,
        pos_id: position.id,
        type: eligibility.type,
        source: 'INDIVIDUAL',
        submitted: new Date().toISOString(),
        status: 'ACTIVE'
      };
      submitAspiration(aspiration);
    });

    toast.success('Aspirations submitted successfully!');
    setSelectedPositions({ horizontal: [], vertical: [] });
    setShowConfirmation(false);
    setActiveTab('my-aspirations');
  };

  const isPositionSelected = (positionId: string) => {
    return [...selectedPositions.horizontal, ...selectedPositions.vertical].some(p => p.id === positionId);
  };

  const totalSelected = selectedPositions.horizontal.length + selectedPositions.vertical.length;

  return (
    <div className="space-y-6">
      {/* Header with Counter */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Individual Aspiration</h3>
          <p className="text-sm text-muted-foreground font-body">
            Pilih posisi yang sesuai dengan aspirasi karir Anda (maksimal 3 horizontal + 3 vertikal)
          </p>
        </div>
        <AspirationCounter
          horizontal={selectedPositions.horizontal.length}
          vertical={selectedPositions.vertical.length}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[var(--color-muted)]">
          <TabsTrigger value="browse">
            Browse Positions
          </TabsTrigger>
          <TabsTrigger value="my-aspirations">
            My Aspirations ({existingAspirations.length})
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-6 mt-6">
          {/* Filters */}
          <PositionFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCompany={selectedCompany}
            onCompanyChange={setSelectedCompany}
            selectedJobFamily={selectedJobFamily}
            onJobFamilyChange={setSelectedJobFamily}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            companies={companies}
            jobFamilies={jobFamilies}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Position Lists */}
          <div className="space-y-6">
            {/* Vertical (Promosi) Positions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground">⬆️ Promosi Positions</h4>
                  <p className="text-xs text-muted-foreground font-body">
                    {eligibleVertical.length} positions available for promotion
                  </p>
                </div>
              </div>
              
              {eligibleVertical.length === 0 ? (
                <EmptyState
                  title="No promotion positions found"
                  description="Try adjusting your filters or search query"
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {eligibleVertical.map(position => {
                    const eligibility = checkEligibility(currentView.user, position);
                    const rankingInfo = calculateRanking(
                      currentView.userId,
                      position.id,
                      employees,
                      aspirations,
                      position
                    );
                    return (
                      <PositionCard
                        key={position.id}
                        position={position}
                        isSelected={isPositionSelected(position.id)}
                        isEligible={eligibility.eligible}
                        aspirationType={eligibility.type}
                        eligibilityReasons={eligibility.reasons}
                        rankingInfo={rankingInfo}
                        onSelect={() => handleSelectPosition(position)}
                        onViewDetails={() => setSelectedPositionForDetail(position)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Horizontal (Rotasi) Positions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground">↔️ Rotasi Positions</h4>
                  <p className="text-xs text-muted-foreground font-body">
                    {eligibleHorizontal.length} positions available for rotation
                  </p>
                </div>
              </div>
              
              {eligibleHorizontal.length === 0 ? (
                <EmptyState
                  title="No rotation positions found"
                  description="Try adjusting your filters or search query"
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {eligibleHorizontal.map(position => {
                    const eligibility = checkEligibility(currentView.user, position);
                    const rankingInfo = calculateRanking(
                      currentView.userId,
                      position.id,
                      employees,
                      aspirations,
                      position
                    );
                    return (
                      <PositionCard
                        key={position.id}
                        position={position}
                        isSelected={isPositionSelected(position.id)}
                        isEligible={eligibility.eligible}
                        aspirationType={eligibility.type}
                        eligibilityReasons={eligibility.reasons}
                        rankingInfo={rankingInfo}
                        onSelect={() => handleSelectPosition(position)}
                        onViewDetails={() => setSelectedPositionForDetail(position)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {totalSelected > 0 && (
            <div 
              className="sticky bottom-6 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--color-foreground)]">
                    {totalSelected} position{totalSelected > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    {selectedPositions.horizontal.length} rotasi, {selectedPositions.vertical.length} promosi
                  </p>
                </div>
                <Button onClick={handleSubmit} size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]">
                  <Check className="w-4 h-4 mr-2" />
                  Submit Aspirations
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* My Aspirations Tab */}
        <TabsContent value="my-aspirations" className="mt-6">
          <div className="space-y-6">
            {/* My Own Aspirations */}
            <div>
              <h4 className="mb-4 font-heading font-medium text-foreground">My Submitted Aspirations</h4>
              {existingAspirations.length === 0 ? (
                <EmptyState
                  icon={AlertCircle}
                  title="No aspirations yet"
                  description="Browse positions and submit your career aspirations"
                  action={{
                    label: 'Browse Positions',
                    onClick: () => setActiveTab('browse')
                  }}
                />
              ) : (
                <div className="space-y-3">
                  {existingAspirations.map(aspiration => {
                    const position = positions.find(p => p.id === aspiration.pos_id);
                    if (!position) return null;

                    const rankingInfo = calculateRanking(
                      currentView.userId,
                      position.id,
                      employees,
                      aspirations,
                      position
                    );

                    return (
                      <div
                        key={aspiration.id}
                        className="rounded-lg p-4 bg-[var(--color-card)] border border-[var(--color-border)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[var(--color-foreground)]">{position.name}</h4>
                            <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                              {position.company} • {position.unit}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full border",
                                aspiration.type === 'PROMOSI' 
                                  ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]" 
                                  : "bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning)]"
                              )}>
                                {aspiration.type === 'PROMOSI' ? '⬆️ Promosi' : '↔️ Rotasi'}
                              </span>
                              <span className="text-xs text-[var(--color-muted-foreground)]">
                                Submitted: {new Date(aspiration.submitted).toLocaleDateString('id-ID')}
                              </span>
                            </div>

                            {rankingInfo && (
                              <div className="mt-3">
                                <RankingWidget
                                  rank={rankingInfo.rank}
                                  totalCandidates={rankingInfo.totalCandidates}
                                  eqsScore={rankingInfo.eqsScore}
                                  size="sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Nominations from Others */}
            {nominationsFromOthers.length > 0 && (
              <div>
                <h4 className="mb-4 font-heading font-medium text-foreground">Nominations from Others</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Positions where you have been nominated by supervisors, job holders, or unit leaders
                </p>
                <div className="space-y-3">
                  {nominationsFromOthers.map(aspiration => {
                    const position = positions.find(p => p.id === aspiration.pos_id);
                    if (!position) return null;

                    const rankingInfo = calculateRanking(
                      currentView.userId,
                      position.id,
                      employees,
                      aspirations,
                      position
                    );

                    // Get nominator info
                    let nominatorName = '';
                    if (aspiration.source === 'SUPERVISOR') {
                      nominatorName = (aspiration as SupervisorAspiration).nominator;
                    } else if (aspiration.source === 'JOB_HOLDER') {
                      nominatorName = (aspiration as JobHolderAspiration).nominator;
                    } else if (aspiration.source === 'UNIT') {
                      nominatorName = (aspiration as UnitAspiration).nominator;
                    }

                    return (
                      <div
                        key={aspiration.id}
                        className="rounded-lg p-4 bg-[var(--color-card)] border-l-4 border border-[var(--color-border)] border-l-[var(--color-primary)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2">
                              <h4 className="flex-1 font-semibold text-[var(--color-foreground)]">{position.name}</h4>
                              <AspirationSourceBadge source={aspiration.source} />
                            </div>
                            <p className="text-xs text-[var(--color-muted-foreground)]">
                              {position.company} • {position.unit}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full border",
                                aspiration.type === 'PROMOSI' 
                                  ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]" 
                                  : "bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning)]"
                              )}>
                                {aspiration.type === 'PROMOSI' ? '⬆️ Promosi' : '↔️ Rotasi'}
                              </span>
                              {nominatorName && (
                                <span className="text-xs text-[var(--color-muted-foreground)]">
                                  Nominated by: {nominatorName}
                                </span>
                              )}
                              <span className="text-xs text-[var(--color-muted-foreground)]">
                                • {new Date(aspiration.submitted).toLocaleDateString('id-ID')}
                              </span>
                            </div>

                            {rankingInfo && (
                              <div className="mt-3">
                                <RankingWidget
                                  rank={rankingInfo.rank}
                                  totalCandidates={rankingInfo.totalCandidates}
                                  eqsScore={rankingInfo.eqsScore}
                                  size="sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Position Detail Panel */}
      {selectedPositionForDetail && (
        <PositionDetailPanel
          position={selectedPositionForDetail}
          employee={currentView.user}
          eligibility={checkEligibility(currentView.user, selectedPositionForDetail)}
          isSelected={isPositionSelected(selectedPositionForDetail.id)}
          onClose={() => setSelectedPositionForDetail(null)}
          onToggleSelect={() => {
            handleSelectPosition(selectedPositionForDetail);
            setSelectedPositionForDetail(null);
          }}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Career Aspirations"
        description="You are about to submit your career aspirations. Please review your selections below."
        confirmText="Submit"
        checkboxLabel="I confirm these are my career aspirations"
      >
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-[var(--color-foreground)]">Selected Positions:</label>
            <ul className="mt-2 space-y-2">
              {[...selectedPositions.horizontal, ...selectedPositions.vertical].map((pos, idx) => (
                <li 
                  key={pos.id}
                  className="text-sm rounded p-2 bg-[var(--color-muted)] text-[var(--color-foreground)]"
                >
                  {idx + 1}. {pos.name} ({pos.company})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
}
