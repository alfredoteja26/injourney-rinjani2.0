/**
 * Grade Jabatan Badge Component
 * Displays grade and band information
 */

import React from 'react';
import { Badge } from '../../../components/ui/badge';

interface GradeJabatanBadgeProps {
  grade: number;
  band: string;
  showBand?: boolean;
  variant?: 'default' | 'outline';
}

export function GradeJabatanBadge({ 
  grade, 
  band, 
  showBand = true,
  variant = 'outline'
}: GradeJabatanBadgeProps) {
  return (
    <Badge 
      variant={variant}
      style={{
        backgroundColor: variant === 'outline' ? 'var(--color-muted)' : 'var(--color-primary)',
        color: variant === 'outline' ? 'var(--color-foreground)' : 'var(--color-primary-foreground)',
        border: variant === 'outline' ? '1px solid var(--color-border)' : 'none'
      }}
    >
      <span className="badge">
        GJ: {grade}
        {showBand && ` • ${band}`}
      </span>
    </Badge>
  );
}
