/**
 * Position Card Component
 * Displays position summary with selection state
 */

import React from 'react';
import { Building, MapPin, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import { RankingWidget } from '../shared/RankingWidget';
import type { Position } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface PositionCardProps {
  position: Position;
  isSelected: boolean;
  isEligible: boolean;
  aspirationType?: 'PROMOSI' | 'ROTASI';
  eligibilityReasons?: string[];
  rankingInfo?: {
    rank: number;
    totalCandidates: number;
    eqsScore: number;
  } | null;
  onSelect?: () => void;
  onViewDetails?: () => void;
}

export function PositionCard({
  position,
  isSelected,
  isEligible,
  aspirationType,
  eligibilityReasons = [],
  rankingInfo,
  onSelect,
  onViewDetails
}: PositionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md bg-card",
        isSelected ? "border-[var(--color-primary)] border-2" : "border-[var(--color-border)] border",
        !isEligible && "opacity-60"
      )}
      onClick={onViewDetails}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Left side - Position info */}
          <div className="flex-1 space-y-3">
            {/* Position name and status */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <h4 className="mb-1 font-heading font-semibold text-foreground">{position.name}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <GradeJabatanBadge 
                    grade={position.grade_jabatan} 
                    band={position.band_jabatan}
                  />
                  <Badge 
                    variant={position.status === "Vacant" ? "destructive" : "secondary"}
                    className={cn(
                      position.status === "Vacant" 
                        ? "bg-[var(--color-destructive)] text-[var(--color-white)] border-[var(--color-destructive)]" 
                        : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] border-[var(--color-border)]"
                    )}
                  >
                    {position.status}
                  </Badge>
                  {aspirationType && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "border",
                        aspirationType === 'PROMOSI' 
                          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]" 
                          : "bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border-[var(--color-accent)]"
                      )}
                    >
                      {aspirationType === 'PROMOSI' ? '⬆️ Promosi' : '↔️ Rotasi'}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Company and location */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[var(--color-muted-foreground)]" />
                <span className="text-xs text-[var(--color-muted-foreground)] font-body">
                  {position.company}
                </span>
              </div>
              {position.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-muted-foreground)]" />
                  <span className="text-xs text-[var(--color-muted-foreground)] font-body">
                    {position.location}
                  </span>
                </div>
              )}
            </div>

            {/* Job Family and Unit */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-[var(--color-muted)] text-[var(--color-foreground)] border-[var(--color-border)]">
                {position.job_family}
              </Badge>
              <span className="text-xs text-[var(--color-muted-foreground)] font-body">
                • {position.unit}
              </span>
            </div>

            {/* Eligibility warning */}
            {!isEligible && eligibilityReasons.length > 0 && (
              <div className="rounded p-2 bg-[var(--color-danger-light)] border border-[var(--color-destructive)]">
                <p className="text-xs text-[var(--color-destructive)] font-medium">
                  ⚠️ {eligibilityReasons[0]}
                </p>
              </div>
            )}

            {/* Ranking Widget */}
            {rankingInfo && (
              <RankingWidget
                rank={rankingInfo.rank}
                totalCandidates={rankingInfo.totalCandidates}
                eqsScore={rankingInfo.eqsScore}
              />
            )}
          </div>

          {/* Right side - Selection button */}
          <div className="flex flex-col items-end gap-2">
            {isEligible && onSelect && (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
                className={cn(
                  isSelected 
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]" 
                    : "text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                )}
              >
                {isSelected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Selected
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-1" />
                    Select
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
