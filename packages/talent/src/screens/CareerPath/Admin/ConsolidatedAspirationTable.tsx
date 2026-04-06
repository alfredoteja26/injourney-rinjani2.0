/**
 * Consolidated Aspiration Table Component
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Master table showing all aspirations with source indicators
 * Sprint 6 Implementation
 */

import React, { useState } from 'react';
import { Check, Eye, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { AspirationDetailModal } from './AspirationDetailModal';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import type { Employee, Position } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface ConsolidatedAspirationTableProps {
  aspirations: Array<{
    emp_id: string;
    pos_id: string;
    employee?: Employee;
    position?: Position;
    sources: {
      individual: boolean;
      supervisor: boolean;
      jobHolder: boolean;
      unit: boolean;
    };
    totalSources: number;
    timestamps: {
      individual?: string;
      supervisor?: string;
      jobHolder?: string;
      unit?: string;
    };
  }>;
}

type SortField = 'employee' | 'position' | 'sources' | 'grade';
type SortDirection = 'asc' | 'desc';

export function ConsolidatedAspirationTable({ aspirations }: ConsolidatedAspirationTableProps) {
  const [selectedAspiration, setSelectedAspiration] = useState<typeof aspirations[0] | null>(null);
  const [sortField, setSortField] = useState<SortField>('sources');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number, aspiration: typeof aspirations[0]) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setSelectedAspiration(aspiration);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (index < sortedAspirations.length - 1) {
          setFocusedRowIndex(index + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          setFocusedRowIndex(index - 1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setFocusedRowIndex(-1);
        break;
    }
  };

  // Auto-focus row when focusedRowIndex changes
  React.useEffect(() => {
    if (focusedRowIndex >= 0) {
      const row = document.querySelector(`[data-row-index="${focusedRowIndex}"]`) as HTMLElement;
      row?.focus();
    }
  }, [focusedRowIndex]);

  // Sort aspirations
  const sortedAspirations = [...aspirations].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'employee':
        comparison = (a.employee?.name || '').localeCompare(b.employee?.name || '');
        break;
      case 'position':
        comparison = (a.position?.name || '').localeCompare(b.position?.name || '');
        break;
      case 'sources':
        comparison = a.totalSources - b.totalSources;
        break;
      case 'grade':
        comparison = (a.position?.grade_jabatan || 0) - (b.position?.grade_jabatan || 0);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline ml-1" />;
  };

  if (aspirations.length === 0) {
    return (
      <div className="rounded-lg p-12 text-center bg-muted border border-dashed border-border">
        <p className="text-muted-foreground">
          Tidak ada data aspirasi yang sesuai dengan filter
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg overflow-hidden bg-card border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-muted)]">
              <tr>
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-[var(--color-muted)] transition-colors text-xs font-medium text-[var(--color-muted-foreground)]"
                  onClick={() => handleSort('employee')}
                >
                  KARYAWAN <SortIcon field="employee" />
                </th>
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-[var(--color-muted)] transition-colors text-xs font-medium text-[var(--color-muted-foreground)]"
                  onClick={() => handleSort('position')}
                >
                  POSISI ASPIRASI <SortIcon field="position" />
                </th>
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-[var(--color-muted)] transition-colors text-xs font-medium text-[var(--color-muted-foreground)]"
                  onClick={() => handleSort('grade')}
                >
                  GRADE <SortIcon field="grade" />
                </th>
                <th className="text-center p-4 text-xs font-medium text-[var(--color-muted-foreground)]">
                  Individual
                </th>
                <th className="text-center p-4 text-xs font-medium text-[var(--color-muted-foreground)]">
                  Supervisor
                </th>
                <th className="text-center p-4 text-xs font-medium text-[var(--color-muted-foreground)]">
                  Job Holder
                </th>
                <th className="text-center p-4 text-xs font-medium text-[var(--color-muted-foreground)]">
                  Unit
                </th>
                <th 
                  className="text-center p-4 cursor-pointer hover:bg-[var(--color-muted)] transition-colors text-xs font-medium text-[var(--color-muted-foreground)]"
                  onClick={() => handleSort('sources')}
                >
                  SUMBER <SortIcon field="sources" />
                </th>
                <th className="text-center p-4 text-xs font-medium text-[var(--color-muted-foreground)]">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAspirations.map((asp, index) => (
                <tr
                  key={`${asp.emp_id}-${asp.pos_id}`}
                  className="hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                  data-row-index={index}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, index, asp)}
                >
                  {/* Employee */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {asp.employee?.image && (
                        <Avatar className="w-10 h-10 border-2 border-[var(--color-border)]">
                          <AvatarImage src={asp.employee.image} alt={asp.employee.name} />
                          <AvatarFallback>
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[var(--color-foreground)]">{asp.employee?.name}</p>
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          {asp.employee?.position}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="p-4">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">{asp.position?.name}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {asp.position?.company}
                    </p>
                  </td>

                  {/* Grade */}
                  <td className="p-4">
                    {asp.position && (
                      <GradeJabatanBadge
                        grade={asp.position.grade_jabatan}
                        band={asp.position.band_jabatan}
                      />
                    )}
                  </td>

                  {/* Individual Source */}
                  <td className="text-center p-4">
                    {asp.sources.individual && (
                      <div 
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-nine-emerging)] text-[var(--color-foreground)]"
                        title={`Submitted: ${asp.timestamps.individual}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </td>

                  {/* Supervisor Source */}
                  <td className="text-center p-4">
                    {asp.sources.supervisor && (
                      <div 
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        title={`Submitted: ${asp.timestamps.supervisor}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </td>

                  {/* Job Holder Source */}
                  <td className="text-center p-4">
                    {asp.sources.jobHolder && (
                      <div 
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                        title={`Submitted: ${asp.timestamps.jobHolder}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </td>

                  {/* Unit Source */}
                  <td className="text-center p-4">
                    {asp.sources.unit && (
                      <div 
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-nine-solid)] text-[var(--color-foreground)]"
                        title={`Submitted: ${asp.timestamps.unit}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </td>

                  {/* Total Sources */}
                  <td className="text-center p-4">
                    <span
                      className={cn(
                        "badge inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-medium",
                        asp.totalSources >= 2 ? "bg-[var(--color-nine-highpot)] text-[var(--color-foreground)]" : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                      )}
                    >
                      {asp.totalSources}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-center p-4">
                    <button
                      onClick={() => setSelectedAspiration(asp)}
                      className="px-3 py-1.5 rounded hover:bg-[var(--color-muted)] transition-colors inline-flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAspiration && (
        <AspirationDetailModal
          aspiration={selectedAspiration}
          onClose={() => setSelectedAspiration(null)}
        />
      )}
    </>
  );
}
