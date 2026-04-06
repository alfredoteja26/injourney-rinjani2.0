/**
 * Unit Position Card
 * Displays a position card with nomination status for unit leaders
 */

import React from 'react';
import { MapPin, User, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import type { Position, UnitAspiration } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface UnitPositionCardProps {
  position: Position;
  existingNominations: UnitAspiration[];
  onRequestTalent: () => void;
}

export function UnitPositionCard({ 
  position, 
  existingNominations,
  onRequestTalent 
}: UnitPositionCardProps) {
  const isVacant = position.status === 'Vacant';
  const hasNominations = existingNominations.length > 0;

  return (
    <div 
      className="rounded-lg p-5 transition-all hover:shadow-md bg-[var(--color-card)] border border-[var(--color-border)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-heading font-medium text-[var(--color-foreground)]">{position.name}</h4>
            {isVacant && (
              <span 
                className="badge px-2 py-1 rounded text-[var(--color-white)] bg-[var(--color-destructive)] text-xs font-medium"
              >
                VACANT
              </span>
            )}
            {hasNominations && (
              <span 
                className="badge px-2 py-1 rounded inline-flex items-center gap-1 bg-[var(--color-success-light)] text-[var(--color-success)] text-xs font-medium"
              >
                <CheckCircle2 className="w-3 h-3" />
                {existingNominations.length} Nominated
              </span>
            )}
          </div>
          <GradeJabatanBadge 
            grade={position.grade_jabatan} 
            band={position.band_jabatan}
          />
        </div>
      </div>

      {/* Position Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)] font-body">
          <Building2 className="w-4 h-4" />
          <span>{position.job_family}</span>
        </div>

        {!isVacant && position.incumbent_id && (
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)] font-body">
            <User className="w-4 h-4" />
            <span>Current: {position.incumbent_id}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)] font-body">
          <MapPin className="w-4 h-4" />
          <span>{position.location || 'Jakarta'}</span>
        </div>
      </div>

      {/* Existing Nominations Summary */}
      {hasNominations && (
        <div className="rounded p-3 mb-4 bg-[var(--color-muted)]">
          <label className="mb-2 text-xs font-medium text-[var(--color-foreground)]">Previously Nominated:</label>
          <div className="space-y-1">
            {existingNominations.slice(0, 3).map((nomination, idx) => (
              <p key={nomination.id} className="text-xs text-[var(--color-muted-foreground)] font-body">
                • {nomination.nominee_name || `Candidate ${idx + 1}`}
              </p>
            ))}
            {existingNominations.length > 3 && (
              <p className="text-xs text-[var(--color-muted-foreground)] font-body">
                + {existingNominations.length - 3} more...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action */}
      <Button 
        onClick={onRequestTalent}
        className={cn(
          "w-full",
          isVacant 
            ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]" 
            : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] bg-transparent"
        )}
        variant={isVacant ? "default" : "outline"}
      >
        {hasNominations ? 'Add More Candidates' : 'Nominate Candidate'}
      </Button>

      {/* Priority Indicator for Vacant Positions */}
      {isVacant && (
        <div 
          className="mt-3 p-2 rounded text-center bg-[var(--color-danger-light)] border-l-4 border-l-[var(--color-destructive)]"
        >
          <p className="text-xs font-medium text-[var(--color-destructive)]">
            ⚠️ High Priority - Position is vacant
          </p>
        </div>
      )}
    </div>
  );
}
