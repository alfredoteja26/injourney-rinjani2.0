/**
 * Ranking/Positioning Widget Component
 * Shows candidate ranking for a position
 * 
 * Component 2.2 from Sprint 8
 */

import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';

interface RankingWidgetProps {
  rank: number;
  totalCandidates: number;
  eqsScore?: number;
  showBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'compact' | 'detailed';
}

export function RankingWidget({
  rank,
  totalCandidates,
  eqsScore,
  showBadge = true,
  size = 'md',
  variant = 'compact'
}: RankingWidgetProps) {
  // Calculate percentile
  const percentile = ((totalCandidates - rank + 1) / totalCandidates) * 100;

  // Determine badge status
  const getBadgeStatus = () => {
    if (rank <= 5) return { label: 'Top 5', color: 'var(--color-nine-highpot)', icon: '🏆' };
    if (rank <= 10) return { label: 'Top 10', color: 'var(--color-nine-solid)', icon: '⭐' };
    if (rank <= 15) return { label: 'Top 15', color: 'var(--color-nine-emerging)', icon: '✨' };
    return null;
  };

  const badgeStatus = getBadgeStatus();

  // Size styles
  const sizeConfig = {
    sm: {
      rankSize: 'var(--text-base)',
      labelSize: 'var(--text-xs)',
      iconSize: 'w-3 h-3'
    },
    md: {
      rankSize: 'var(--text-lg)',
      labelSize: 'var(--text-sm)',
      iconSize: 'w-4 h-4'
    },
    lg: {
      rankSize: 'var(--text-xl)',
      labelSize: 'var(--text-base)',
      iconSize: 'w-5 h-5'
    }
  };

  const config = sizeConfig[size];

  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{
                backgroundColor: badgeStatus ? `${badgeStatus.color.replace(')', '-light)')}` : 'var(--color-muted)',
                border: `1px solid ${badgeStatus ? badgeStatus.color : 'var(--color-border)'}`,
                cursor: 'help'
              }}
            >
              <TrendingUp 
                className={config.iconSize}
                style={{ color: badgeStatus ? badgeStatus.color : 'var(--color-muted-foreground)' }}
              />
              <span 
                style={{ 
                  fontSize: config.rankSize,
                  fontWeight: 'var(--font-weight-semibold)',
                  color: badgeStatus ? badgeStatus.color : 'var(--color-foreground)'
                }}
              >
                #{rank}
              </span>
              <span 
                className="caption"
                style={{ 
                  color: 'var(--color-muted-foreground)',
                  fontSize: config.labelSize
                }}
              >
                / {totalCandidates}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Ranking #{rank} of {totalCandidates} candidates
              </p>
              <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                Top {percentile.toFixed(0)}% percentile
              </p>
              {eqsScore && (
                <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  EQS Score: {eqsScore.toFixed(1)}/100
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Detailed variant
  return (
    <div 
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--color-card)',
        border: `1px solid ${badgeStatus ? badgeStatus.color : 'var(--color-border)'}`,
        borderLeft: badgeStatus ? `4px solid ${badgeStatus.color}` : '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {badgeStatus && (
            <span style={{ fontSize: 'var(--text-2xl)' }}>{badgeStatus.icon}</span>
          )}
          <div>
            <p 
              className="caption" 
              style={{ 
                color: 'var(--color-muted-foreground)',
                fontSize: 'var(--text-xs)'
              }}
            >
              Your Ranking
            </p>
            <div className="flex items-baseline gap-2">
              <span 
                style={{ 
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: badgeStatus ? badgeStatus.color : 'var(--color-foreground)'
                }}
              >
                #{rank}
              </span>
              <span 
                className="caption"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                of {totalCandidates} candidates
              </span>
            </div>
          </div>
        </div>

        {showBadge && badgeStatus && (
          <Badge
            variant="outline"
            style={{
              backgroundColor: `${badgeStatus.color.replace(')', '-light)')}`,
              borderColor: badgeStatus.color,
              color: badgeStatus.color,
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            {badgeStatus.label}
          </Badge>
        )}
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span 
            className="caption"
            style={{ 
              color: 'var(--color-muted-foreground)',
              fontSize: 'var(--text-xs)'
            }}
          >
            Percentile
          </span>
          <span 
            style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: badgeStatus ? badgeStatus.color : 'var(--color-foreground)'
            }}
          >
            Top {percentile.toFixed(0)}%
          </span>
        </div>
        
        <div 
          className="w-full rounded-full overflow-hidden"
          style={{
            height: '6px',
            backgroundColor: 'var(--color-muted)'
          }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${percentile}%`,
              backgroundColor: badgeStatus ? badgeStatus.color : 'var(--color-primary)'
            }}
          />
        </div>
      </div>

      {eqsScore !== undefined && (
        <div 
          className="mt-3 pt-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="flex justify-between items-center">
            <span 
              className="caption"
              style={{ 
                color: 'var(--color-muted-foreground)',
                fontSize: 'var(--text-xs)'
              }}
            >
              EQS Score
            </span>
            <span 
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              {eqsScore.toFixed(1)}<span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>/100</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
