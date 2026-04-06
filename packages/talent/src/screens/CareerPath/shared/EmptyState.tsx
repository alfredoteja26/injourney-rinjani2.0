/**
 * Empty State Component
 * Generic empty state display
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-4 rounded-lg p-12"
      style={{
        backgroundColor: 'var(--color-muted)',
        border: '1px dashed var(--color-border)'
      }}
    >
      {Icon && (
        <div 
          className="flex items-center justify-center rounded-full p-4"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          <Icon 
            className="w-8 h-8" 
            style={{ color: 'var(--color-muted-foreground)' }}
          />
        </div>
      )}
      
      <div className="flex flex-col items-center gap-2 text-center max-w-md">
        <h4>{title}</h4>
        {description && (
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
