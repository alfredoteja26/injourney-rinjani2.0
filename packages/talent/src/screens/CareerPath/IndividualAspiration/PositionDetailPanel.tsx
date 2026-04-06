/**
 * Position Detail Panel Component
 * Shows detailed information about a selected position
 */

import React from 'react';
import { X, Building, MapPin, Users, CheckCircle2, AlertTriangle, Info, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import { TypeBadge } from '../shared/TypeBadge';
import type { Position, Employee, EligibilityResult } from '../../../types/careerPath';

interface PositionDetailPanelProps {
  position: Position;
  employee: Employee;
  eligibility: EligibilityResult;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
}

export function PositionDetailPanel({
  position,
  employee,
  eligibility,
  isSelected,
  onClose,
  onToggleSelect
}: PositionDetailPanelProps) {
  const gradeGap = position.grade_jabatan - employee.grade_jabatan;

  return (
    <div 
      className="fixed right-0 top-0 h-full w-[480px] shadow-lg z-40 bg-[var(--color-card)] border-l border-[var(--color-border)]"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-[var(--color-card)]"
        >
          <h3>Position Details</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[var(--color-text-muted)]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Position Name and Basic Info */}
            <div className="space-y-3">
              <h2>{position.name}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <GradeJabatanBadge 
                  grade={position.grade_jabatan} 
                  band={position.band_jabatan}
                  variant="default"
                />
                <Badge 
                  variant={position.status === "Vacant" ? "destructive" : "secondary"}
                  style={{
                    backgroundColor: position.status === "Vacant" 
                      ? 'var(--color-danger-light)' 
                      : 'var(--color-muted)',
                    color: position.status === "Vacant"
                      ? 'var(--color-destructive)'
                      : 'var(--color-muted-foreground)',
                    border: position.status === "Vacant"
                      ? '1px solid var(--color-destructive)'
                      : '1px solid var(--color-border)'
                  }}
                >
                  {position.status}
                </Badge>
                {eligibility.eligible && (
                  <TypeBadge type={eligibility.type} variant="default" />
                )}
              </div>
            </div>

            {/* Company and Location */}
            <div 
              className="rounded-lg p-4 space-y-3 bg-[var(--color-muted)] border border-[var(--color-border)]"
            >
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                <div className="flex-1">
                  <label>Company</label>
                  <p>{position.company}</p>
                </div>
              </div>
              {position.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                  <div className="flex-1">
                    <label>Location</label>
                    <p>{position.location}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                <div className="flex-1">
                  <label>Unit</label>
                  <p>{position.unit}</p>
                </div>
              </div>
            </div>

            {/* Job Family and Level */}
            <div className="space-y-2">
              <label>Job Family & Level</label>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-[var(--color-muted)]">
                  {position.job_family}
                </Badge>
                <Badge variant="outline" className="bg-[var(--color-muted)]">
                  {position.level_jabatan}
                </Badge>
              </div>
            </div>

            {/* Grade Gap Analysis */}
            <div 
              className="rounded-lg p-4 space-y-3"
              style={{
                backgroundColor: gradeGap > 0 
                  ? 'var(--color-primary-light)' 
                  : 'var(--color-accent-subtle)',
                border: `1px solid ${gradeGap > 0 ? 'var(--color-primary)' : 'var(--color-accent)'}`
              }}
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" style={{ color: gradeGap > 0 ? 'var(--color-primary)' : 'var(--color-accent)' }} />
                <label style={{ color: gradeGap > 0 ? 'var(--color-primary)' : 'var(--color-accent)' }}>
                  Grade Gap Analysis
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="caption text-[var(--color-text-muted)] text-[10px]">
                    Current Grade
                  </p>
                  <p className="font-semibold">
                    {employee.grade_jabatan}
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-text-muted)] text-[10px]">
                    Target Grade
                  </p>
                  <p className="font-semibold">
                    {position.grade_jabatan}
                  </p>
                </div>
                <div>
                  <p className="caption text-[var(--color-text-muted)] text-[10px]">
                    Gap
                  </p>
                  <p style={{ 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: gradeGap > 0 ? 'var(--color-primary)' : 'var(--color-accent)'
                  }}>
                    {gradeGap > 0 ? `+${gradeGap}` : gradeGap === 0 ? '0' : gradeGap}
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility Status */}
            <div 
              className="rounded-lg p-4 space-y-3"
              style={{
                backgroundColor: eligibility.eligible 
                  ? 'var(--color-success-light)' 
                  : 'var(--color-danger-light)',
                border: `1px solid ${eligibility.eligible ? 'var(--color-success)' : 'var(--color-destructive)'}`
              }}
            >
              <div className="flex items-center gap-2">
                {eligibility.eligible ? (
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-[var(--color-destructive)]" />
                )}
                <label style={{ 
                  color: eligibility.eligible ? 'var(--color-success)' : 'var(--color-destructive)'
                }}>
                  {eligibility.eligible ? 'Eligible' : 'Not Eligible'}
                </label>
              </div>
              
              {eligibility.eligible && eligibility.warnings && eligibility.warnings.length > 0 && (
                <div className="space-y-1">
                  <p className="caption font-semibold">
                    Warnings:
                  </p>
                  {eligibility.warnings.map((warning, idx) => (
                    <p key={idx} className="caption text-[var(--color-muted-foreground)]">
                      • {warning}
                    </p>
                  ))}
                </div>
              )}

              {!eligibility.eligible && eligibility.reasons.length > 0 && (
                <div className="space-y-1">
                  <p className="caption font-semibold">
                    Reasons:
                  </p>
                  {eligibility.reasons.map((reason, idx) => (
                    <p 
                      key={idx} 
                      className="caption text-[var(--color-destructive)]"
                    >
                      • {reason}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Incumbent Info (if filled) */}
            {position.status === "Filled" && position.incumbent_id && (
              <div 
                className="rounded-lg p-4 bg-[var(--color-muted)] border border-[var(--color-border)]"
              >
                <label className="mb-2 block">Current Job Holder</label>
                <p className="caption text-[var(--color-muted-foreground)]">
                  Position is currently filled
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer - Action Buttons */}
        <div 
          className="p-6 flex flex-col gap-3 border-t border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
        >
          {eligibility.eligible ? (
            <>
              <Button
                onClick={onToggleSelect}
                size="lg"
                className="w-full"
                style={{
                  backgroundColor: isSelected ? 'var(--color-muted)' : 'var(--color-primary)',
                  color: isSelected ? 'var(--color-muted-foreground)' : 'var(--color-primary-foreground)',
                  border: isSelected ? '1px solid var(--color-border)' : 'none'
                }}
              >
                {isSelected ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Selected - Click to Remove
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Add to My Aspirations
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                size="lg"
                className="w-full"
              >
                Close
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={onClose}
              size="lg"
              className="w-full"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}