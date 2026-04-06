/**
 * Nominated Candidate Card Component
 * Displays nominated successor with ranking controls
 */

import React from 'react';
import { X, ChevronUp, ChevronDown, Eye, User } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { getEQSRatingColor, getEQSRatingIcon } from '../../../lib/career-path/eqsCalculation';
import type { Employee, EQSScore } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface CandidateWithEQS extends Employee {
  eqsScore: EQSScore;
}

interface NominatedCandidateCardProps {
  candidate: CandidateWithEQS;
  rank: number; // 1, 2, or 3
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onViewEQS: () => void;
}

export function NominatedCandidateCard({
  candidate,
  rank,
  onRemove,
  onMoveUp,
  onMoveDown,
  onViewEQS
}: NominatedCandidateCardProps) {
  const ratingColor = getEQSRatingColor(candidate.eqsScore.rating);
  const ratingIcon = getEQSRatingIcon(candidate.eqsScore.rating);

  // Rank badge color logic - Tailwind classes are static, so we use style for dynamic color
  // However, we should try to map these to theme colors if possible.
  // Assuming 'nine-highpot' maps to a green/teal and 'primary' to primary.
  
  const getRankColorVar = () => {
    if (rank === 1) return 'var(--color-nine-highpot)';
    if (rank === 2) return 'var(--color-primary)';
    return 'var(--color-muted-foreground)';
  };

  return (
    <div 
      className="rounded-lg p-4 relative transition-all bg-[var(--color-card)] shadow-sm"
      style={{
        border: `2px solid ${getRankColorVar()}`
      }}
    >
      {/* Rank Badge */}
      <div 
        className="absolute -top-3 -left-3 rounded-full flex items-center justify-center w-8 h-8 shadow-sm"
        style={{
          backgroundColor: getRankColorVar(),
          color: 'var(--color-primary-foreground)'
        }}
      >
        <span className="font-bold text-sm">
          #{rank}
        </span>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 rounded-full p-1 transition-all hover:scale-110 bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="mt-2">
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
            
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="outline"
                className="bg-[var(--color-muted)] text-xs border-[var(--color-border)] text-[var(--color-foreground)]"
              >
                Grade {candidate.grade_jabatan}
              </Badge>
              
              <Badge 
                variant="outline"
                className="bg-[var(--color-muted)] text-xs border-[var(--color-border)] text-[var(--color-foreground)]"
              >
                {candidate.band_jabatan}
              </Badge>
            </div>
          </div>
        </div>

        {/* EQS Score */}
        <div 
          className="mt-4 p-3 rounded cursor-pointer hover:opacity-80 transition-opacity bg-[var(--color-muted)]"
          style={{
            border: `1px solid ${ratingColor}`
          }}
          onClick={onViewEQS}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-muted-foreground)]">EQS Score</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h5 className="font-semibold" style={{ color: ratingColor }}>
                  {candidate.eqsScore.total.toFixed(1)}
                </h5>
                <span className="text-xs text-[var(--color-muted-foreground)]">/ 120</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl">{ratingIcon}</div>
            </div>
          </div>
        </div>

        {/* Reorder Controls */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            onClick={onMoveUp}
            disabled={!onMoveUp}
          >
            <ChevronUp className="w-4 h-4" />
            Move Up
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            onClick={onMoveDown}
            disabled={!onMoveDown}
          >
            <ChevronDown className="w-4 h-4" />
            Move Down
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onViewEQS}
            className="hover:bg-[var(--color-muted)]"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Rank Label */}
        <div className="mt-3 text-center">
          <p className="text-xs text-[var(--color-muted-foreground)]">
            {rank === 1 && '🥇 First Choice - Primary Successor'}
            {rank === 2 && '🥈 Second Choice - Backup Successor'}
            {rank === 3 && '🥉 Third Choice - Additional Option'}
          </p>
        </div>
      </div>
    </div>
  );
}
