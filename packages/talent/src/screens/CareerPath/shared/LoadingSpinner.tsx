/**
 * Loading Spinner Component
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const SIZE_MAP = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export function LoadingSpinner({ size = 'md', label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <Loader2 
        className={`${SIZE_MAP[size]} animate-spin`}
        style={{ color: 'var(--color-primary)' }}
      />
      {label && (
        <p 
          className="caption"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
