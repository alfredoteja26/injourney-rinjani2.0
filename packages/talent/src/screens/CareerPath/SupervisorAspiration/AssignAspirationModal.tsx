/**
 * Assign Aspiration Modal
 * Modal for supervisors to assign career aspirations to subordinates
 */

import React, { useState, useMemo } from 'react';
import { X, Search, Info, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import { TypeBadge } from '../shared/TypeBadge';
import { EQSScoreDisplay } from '../shared/EQSScoreDisplay';
import { AspirationCounter } from '../components/AspirationCounter';
import { checkEligibility, getEligiblePositions } from '../../../lib/career-path/eligibilityRules';
import { filterPositions, getUniqueCompanies, getUniqueJobFamilies } from '../../../lib/career-path/mockData';
import { calculateEQS } from '../../../lib/career-path/eqsCalculation';
import type { Employee, Position } from '../../../types/careerPath';

interface AssignAspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  currentSelections: Position[];
  onSave: (positions: Position[]) => void;
}

export function AssignAspirationModal({
  isOpen,
  onClose,
  employee,
  currentSelections,
  onSave
}: AssignAspirationModalProps) {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>(currentSelections);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedJobFamily, setSelectedJobFamily] = useState('all');

  // Filter options
  const companies = useMemo(() => getUniqueCompanies(), []);
  const jobFamilies = useMemo(() => getUniqueJobFamilies(), []);

  // Get eligible positions categorized
  const { horizontal: eligibleHorizontal, vertical: eligibleVertical } = useMemo(() => {
    const filtered = filterPositions({
      company: selectedCompany !== 'all' ? selectedCompany : undefined,
      job_family: selectedJobFamily !== 'all' ? selectedJobFamily : undefined,
      search: searchQuery
    });

    return getEligiblePositions(employee, filtered);
  }, [employee, searchQuery, selectedCompany, selectedJobFamily]);

  // Count selections by type
  const selectionCounts = useMemo(() => {
    let horizontal = 0;
    let vertical = 0;
    
    selectedPositions.forEach(pos => {
      const eligibility = checkEligibility(employee, pos);
      if (eligibility.type === 'ROTASI') {
        horizontal++;
      } else {
        vertical++;
      }
    });

    return { horizontal, vertical };
  }, [selectedPositions, employee]);

  const handleTogglePosition = (position: Position) => {
    const isSelected = selectedPositions.some(p => p.id === position.id);
    const eligibility = checkEligibility(employee, position);

    if (isSelected) {
      setSelectedPositions(selectedPositions.filter(p => p.id !== position.id));
      toast.success('Position removed');
    } else {
      // Check limits
      const isHorizontal = eligibility.type === 'ROTASI';
      if (isHorizontal && selectionCounts.horizontal >= 3) {
        toast.error('Maksimal 3 rotasi aspirations');
        return;
      }
      if (!isHorizontal && selectionCounts.vertical >= 3) {
        toast.error('Maksimal 3 promosi aspirations');
        return;
      }

      setSelectedPositions([...selectedPositions, position]);
      toast.success('Position added');
    }
  };

  const handleSave = () => {
    if (selectedPositions.length === 0) {
      toast.error('Pilih minimal 1 posisi');
      return;
    }
    onSave(selectedPositions);
    onClose();
  };

  const isPositionSelected = (positionId: string) => {
    return selectedPositions.some(p => p.id === positionId);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="fixed inset-x-4 top-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[90vw] md:max-w-5xl rounded-lg shadow-xl z-50 flex flex-col"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6"
          style={{
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <div className="flex-1">
            <h3>Assign Career Aspirations</h3>
            <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
              {employee.name} - {employee.position}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <AspirationCounter
              horizontal={selectionCounts.horizontal}
              vertical={selectionCounts.vertical}
            />
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-[var(--color-muted)]">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="p-4"
          style={{
            backgroundColor: 'var(--color-muted)',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
                style={{ color: 'var(--color-muted-foreground)' }}
              />
              <Input
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                style={{
                  backgroundColor: 'var(--color-input-background)',
                  borderColor: 'var(--color-border)'
                }}
              />
            </div>

            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger
                style={{
                  backgroundColor: 'var(--color-input-background)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedJobFamily} onValueChange={setSelectedJobFamily}>
              <SelectTrigger
                style={{
                  backgroundColor: 'var(--color-input-background)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <SelectValue placeholder="All Job Families" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Families</SelectItem>
                {jobFamilies.map(family => (
                  <SelectItem key={family} value={family}>{family}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content - Position Lists */}
        <ScrollArea className="flex-1 p-6">
          <Tabs defaultValue="vertical" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="vertical">
                ⬆️ Promosi ({eligibleVertical.length})
              </TabsTrigger>
              <TabsTrigger value="horizontal">
                ↔️ Rotasi ({eligibleHorizontal.length})
              </TabsTrigger>
            </TabsList>

            {/* Promosi Tab */}
            <TabsContent value="vertical" className="space-y-3">
              {eligibleVertical.length === 0 ? (
                <div 
                  className="rounded-lg p-8 text-center"
                  style={{
                    backgroundColor: 'var(--color-muted)',
                    border: '1px dashed var(--color-border)'
                  }}
                >
                  <p style={{ color: 'var(--color-muted-foreground)' }}>
                    No promotion positions found
                  </p>
                </div>
              ) : (
                eligibleVertical.map(position => {
                  const isSelected = isPositionSelected(position.id);
                  const eqsScore = calculateEQS(employee, position);
                  const eligibility = checkEligibility(employee, position);

                  return (
                    <div
                      key={position.id}
                      className="rounded-lg p-4 cursor-pointer transition-all"
                      style={{
                        backgroundColor: 'var(--color-card)',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                      }}
                      onClick={() => handleTogglePosition(position)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Selection Indicator */}
                        <div className="flex-shrink-0 pt-1">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                          ) : (
                            <Circle className="w-5 h-5" style={{ color: 'var(--color-muted-foreground)' }} />
                          )}
                        </div>

                        {/* Position Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <h4 className="mb-1">{position.name}</h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <GradeJabatanBadge 
                                  grade={position.grade_jabatan} 
                                  band={position.band_jabatan}
                                  variant="secondary"
                                />
                                <TypeBadge type={eligibility.type} variant="secondary" />
                              </div>
                            </div>
                            <EQSScoreDisplay score={eqsScore} variant="compact" />
                          </div>

                          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                            {position.company} • {position.unit}
                          </p>

                          {/* Grade Gap Info */}
                          <div 
                            className="mt-2 rounded p-2"
                            style={{
                              backgroundColor: 'var(--color-muted)',
                              border: '1px solid var(--color-border)'
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Info className="w-3.5 h-3.5" style={{ color: 'var(--color-muted-foreground)' }} />
                              <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                                Grade Gap: {employee.grade_jabatan} → {position.grade_jabatan} 
                                (+{position.grade_jabatan - employee.grade_jabatan})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>

            {/* Rotasi Tab */}
            <TabsContent value="horizontal" className="space-y-3">
              {eligibleHorizontal.length === 0 ? (
                <div 
                  className="rounded-lg p-8 text-center"
                  style={{
                    backgroundColor: 'var(--color-muted)',
                    border: '1px dashed var(--color-border)'
                  }}
                >
                  <p style={{ color: 'var(--color-muted-foreground)' }}>
                    No rotation positions found
                  </p>
                </div>
              ) : (
                eligibleHorizontal.map(position => {
                  const isSelected = isPositionSelected(position.id);
                  const eqsScore = calculateEQS(employee, position);
                  const eligibility = checkEligibility(employee, position);

                  return (
                    <div
                      key={position.id}
                      className="rounded-lg p-4 cursor-pointer transition-all"
                      style={{
                        backgroundColor: 'var(--color-card)',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                      }}
                      onClick={() => handleTogglePosition(position)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Selection Indicator */}
                        <div className="flex-shrink-0 pt-1">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                          ) : (
                            <Circle className="w-5 h-5" style={{ color: 'var(--color-muted-foreground)' }} />
                          )}
                        </div>

                        {/* Position Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <h4 className="mb-1">{position.name}</h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <GradeJabatanBadge 
                                  grade={position.grade_jabatan} 
                                  band={position.band_jabatan}
                                  variant="secondary"
                                />
                                <TypeBadge type={eligibility.type} variant="secondary" />
                              </div>
                            </div>
                            <EQSScoreDisplay score={eqsScore} variant="compact" />
                          </div>

                          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                            {position.company} • {position.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* Footer */}
        <div 
          className="flex items-center justify-between p-6"
          style={{
            borderTop: '1px solid var(--color-border)'
          }}
        >
          <div>
            <p style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {selectedPositions.length} position{selectedPositions.length !== 1 ? 's' : ''} selected
            </p>
            <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              {selectionCounts.horizontal} rotasi, {selectionCounts.vertical} promosi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]">
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={selectedPositions.length === 0}
              style={{
                backgroundColor: selectedPositions.length === 0 ? 'var(--color-muted)' : 'var(--color-primary)',
                color: selectedPositions.length === 0 ? 'var(--color-muted-foreground)' : 'var(--color-primary-foreground)'
              }}
            >
              Save Aspirations
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
