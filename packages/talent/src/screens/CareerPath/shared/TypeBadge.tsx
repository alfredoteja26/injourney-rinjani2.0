/**
 * Type Badge Component
 * Shows Promosi (⬆️) or Rotasi (↔️)
 */

import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import type { AspirationType } from '../../../types/careerPath';

interface TypeBadgeProps {
  type: AspirationType;
  variant?: 'default' | 'outline';
}

export function TypeBadge({ type, variant = 'default' }: TypeBadgeProps) {
  const isPromosi = type === "PROMOSI";

  return (
    <Badge 
      variant={variant}
      className="gap-1"
      style={{
        backgroundColor: isPromosi 
          ? (variant === 'default' ? 'var(--color-primary)' : 'var(--color-primary-light)')
          : (variant === 'default' ? 'var(--color-accent)' : 'rgba(0, 101, 115, 0.1)'),
        color: isPromosi 
          ? (variant === 'default' ? 'var(--color-primary-foreground)' : 'var(--color-primary)') 
          : (variant === 'default' ? 'var(--color-accent-foreground)' : 'var(--color-accent)'),
        border: variant === 'outline' ? `1px solid ${isPromosi ? 'var(--color-primary)' : 'var(--color-accent)'}` : 'none'
      }}
    >
      {isPromosi ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <ArrowRight className="w-3 h-3" />
      )}
      <span className="badge">
        {type === "PROMOSI" ? "Promosi" : "Rotasi"}
      </span>
    </Badge>
  );
}