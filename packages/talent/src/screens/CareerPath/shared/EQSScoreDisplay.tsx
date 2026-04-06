/**
 * EQS Score Display Component
 * Shows EQS score with progress bar and color coding
 */

import React from 'react';
import { Info } from 'lucide-react';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { getEQSColor } from '../../../lib/career-path/eqsCalculation';

interface EQSScoreDisplayProps {
  score: number; // 0-100
  rating?: string;
  showBreakdown?: boolean;
  onClickBreakdown?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function EQSScoreDisplay({ 
  score, 
  rating,
  showBreakdown = false, 
  onClickBreakdown,
  size = 'md'
}: EQSScoreDisplayProps) {
  const percentage = (score / 100) * 100;
  const color = getEQSColor(score);

  const sizeStyles = {
    sm: {
      scoreSize: 'var(--text-base)',
      labelSize: 'var(--text-xs)',
      height: 'h-1.5'
    },
    md: {
      scoreSize: 'var(--text-xl)',
      labelSize: 'var(--text-sm)',
      height: 'h-2'
    },
    lg: {
      scoreSize: 'var(--text-2xl)',
      labelSize: 'var(--text-base)',
      height: 'h-3'
    }
  };

  const styles = sizeStyles[size];

  return (
    <div className="flex flex-col gap-2">
      {/* Score and Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span 
            style={{ 
              fontSize: styles.scoreSize, 
              fontWeight: 'var(--font-weight-bold)',
              color
            }}
          >
            {score.toFixed(1)}
          </span>
          <span 
            className="caption"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            / 100
          </span>
        </div>
        {rating && (
          <Badge 
            variant="outline"
            style={{
              borderColor: color,
              backgroundColor: `${color.replace(')', '-light)')}`,
              color
            }}
          >
            {rating}
          </Badge>
        )}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div 
            className="relative w-full overflow-hidden rounded-full"
            style={{
              height: styles.height === 'h-1.5' ? '6px' : styles.height === 'h-2' ? '8px' : '12px',
              backgroundColor: 'var(--muted)'
            }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${percentage}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
        <span 
          className="caption"
          style={{ 
            color: 'var(--muted-foreground)',
            fontSize: 'var(--text-xs)',
            minWidth: '3rem',
            textAlign: 'right'
          }}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* View Breakdown Link */}
      {showBreakdown && onClickBreakdown && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClickBreakdown}
          className="w-fit gap-1 px-0 h-auto"
          style={{
            color: 'var(--primary)',
            fontSize: 'var(--text-sm)'
          }}
        >
          <Info className="w-3 h-3" />
          <span>View Breakdown</span>
        </Button>
      )}
    </div>
  );
}