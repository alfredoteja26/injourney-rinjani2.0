/**
 * Candidate Card Component
 * Displays candidate information with EQS score for job holder view
 */

import React from 'react';
import { Plus, Eye, User } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/tooltip';
import { getEQSRatingColor, getEQSRatingIcon, getEQSRatingLabel } from '../../../lib/career-path/eqsCalculation';
import type { Employee, EQSScore } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface CandidateWithEQS extends Employee {
  eqsScore: EQSScore;
}

interface CandidateCardProps {
  candidate: CandidateWithEQS;
  rank: number;
  isTopCandidate: boolean;
  onAddToNomination: () => void;
  onViewEQS: () => void;
}

export function CandidateCard({
  candidate,
  rank,
  isTopCandidate,
  onAddToNomination,
  onViewEQS
}: CandidateCardProps) {
  const ratingColor = getEQSRatingColor(candidate.eqsScore.rating);
  const ratingIcon = getEQSRatingIcon(candidate.eqsScore.rating);
  const ratingLabel = getEQSRatingLabel(candidate.eqsScore.rating);

  return (
    <div 
      className={cn(
        "rounded-lg p-4 transition-all hover:shadow-md bg-card",
        isTopCandidate ? "border-2" : "border border-[var(--color-border)]"
      )}
      style={{
        borderColor: isTopCandidate ? ratingColor : undefined
      }}
    >
      {/* Top Badge */}
      {isTopCandidate && (
        <div className="mb-3">
          <Badge 
            variant="outline"
            style={{
              backgroundColor: ratingColor,
              borderColor: ratingColor,
              color: 'var(--color-primary-foreground)', // Assuming dark bg for badge
            }}
            className="text-xs"
          >
            🌟 #{rank} Top Candidate
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={candidate.image} alt={candidate.name} />
          <AvatarFallback className="bg-[var(--color-primary-light)] text-[var(--color-primary)]">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h5 className="truncate font-medium text-[var(--color-foreground)]">{candidate.name}</h5>
          <p className="truncate text-xs text-[var(--color-muted-foreground)] font-body">
            {candidate.position}
          </p>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Grade Badge */}
            <Badge 
              variant="outline"
              className="bg-[var(--color-muted)] text-xs border-[var(--color-border)] text-[var(--color-foreground)]"
            >
              Grade {candidate.grade_jabatan}
            </Badge>
            
            {/* Band Badge */}
            <Badge 
              variant="outline"
              className="bg-[var(--color-muted)] text-xs border-[var(--color-border)] text-[var(--color-foreground)]"
            >
              {candidate.band_jabatan}
            </Badge>
          </div>

          {/* Unit */}
          <p className="mt-1 text-xs text-[var(--color-muted-foreground)] font-body">
            {candidate.unit}
          </p>
        </div>
      </div>

      {/* EQS Score */}
      <div 
        className="mt-4 p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity bg-[var(--color-muted)]"
        style={{
          border: `2px solid ${ratingColor}`
        }}
        onClick={onViewEQS}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-muted-foreground)]">EQS Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="font-semibold" style={{ color: ratingColor }}>
                {candidate.eqsScore.total.toFixed(1)}
              </h4>
              <span className="text-xs text-[var(--color-muted-foreground)]">/ 100</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl">{ratingIcon}</div>
            <p className="mt-1 text-xs" style={{ color: ratingColor }}>
              {ratingLabel}
            </p>
          </div>
        </div>
        
        {/* Quick breakdown */}
        <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
          <div className="grid grid-cols-3 gap-2">
            {/* Performance - 20% */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    Perf (20%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.performance}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.performance / 20) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Performance Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 20% (20 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.performance}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Competency - 20% */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    Comp (20%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.competency}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.competency / 20) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Competency Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 20% (20 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.competency}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Experience - 20% */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    Exp (20%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.experience}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.experience / 20) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Experience Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 20% (20 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.experience}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Aspiration - 10% */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    Asp (10%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.aspiration}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.aspiration / 10) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Aspiration Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 10% (10 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.aspiration}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Training - 10% */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    Train (10%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.training}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.training / 10) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Training Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 10% (10 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.training}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* TES - 10% (Replaced Track Record) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-help">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">
                    TES (10%)
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {candidate.eqsScore.breakdown.tes}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">
                    ({((candidate.eqsScore.breakdown.tes / 10) * 100).toFixed(0)}%)
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] bg-[var(--color-popover)] text-[var(--color-popover-foreground)] border border-[var(--color-border)]">
                <div className="text-xs">
                  <p className="font-semibold mb-1">Talent Eval Score</p>
                  <p className="text-[var(--color-muted-foreground)] mb-2">Weight: 10% (10 points max)</p>
                  <div className="flex justify-between mb-1">
                    <span>Component Score:</span>
                    <span className="font-semibold">{candidate.eqsScore.breakdown.tes}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="mt-2 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full gap-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onViewEQS();
            }}
          >
            <Eye className="w-3 h-3" />
            <span>View Full Breakdown</span>
          </Button>
        </div>
      </div>

      {/* Add Button */}
      <Button 
        className="w-full mt-4 gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]"
        onClick={onAddToNomination}
      >
        <Plus className="w-4 h-4" />
        Add to Nomination
      </Button>
    </div>
  );
}
