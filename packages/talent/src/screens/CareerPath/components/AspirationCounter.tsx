/**
 * Aspiration Counter Component
 * Shows horizontal (rotasi) and vertical (promosi) aspiration counts
 */

import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface AspirationCounterProps {
  horizontal: number;
  vertical: number;
  maxHorizontal?: number;
  maxVertical?: number;
}

export function AspirationCounter({ 
  horizontal, 
  vertical, 
  maxHorizontal = 3, 
  maxVertical = 3 
}: AspirationCounterProps) {
  const horizontalPercentage = (horizontal / maxHorizontal) * 100;
  const verticalPercentage = (vertical / maxVertical) * 100;

  const getCounterColor = (count: number, max: number) => {
    if (count === 0) return 'var(--color-muted-foreground)';
    if (count >= max) return 'var(--color-destructive)';
    return 'var(--color-nine-highpot)'; // Green-teal for active
  };

  return (
    <div 
      className="flex items-center gap-6 rounded-lg p-4"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)'
      }}
    >
      {/* Horizontal (Rotasi) Counter */}
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center rounded-full p-2"
          style={{
            backgroundColor: horizontal > 0 ? 'var(--color-primary-light)' : 'var(--color-muted)'
          }}
        >
          <ArrowRight 
            className="w-4 h-4" 
            style={{ 
              color: horizontal > 0 ? 'var(--color-primary)' : 'var(--color-muted-foreground)' 
            }}
          />
        </div>
        <div>
          <label style={{ color: 'var(--color-muted-foreground)' }}>
            ROTASI
          </label>
          <div className="flex items-baseline gap-1">
            <h3 style={{ color: getCounterColor(horizontal, maxHorizontal) }}>
              {horizontal}
            </h3>
            <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              / {maxHorizontal}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div 
        className="h-12 w-px"
        style={{ backgroundColor: 'var(--color-border)' }}
      />

      {/* Vertical (Promosi) Counter */}
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center rounded-full p-2"
          style={{
            backgroundColor: vertical > 0 ? 'var(--color-primary-light)' : 'var(--color-muted)'
          }}
        >
          <TrendingUp 
            className="w-4 h-4" 
            style={{ 
              color: vertical > 0 ? 'var(--color-primary)' : 'var(--color-muted-foreground)' 
            }}
          />
        </div>
        <div>
          <label style={{ color: 'var(--color-muted-foreground)' }}>
            PROMOSI
          </label>
          <div className="flex items-baseline gap-1">
            <h3 style={{ color: getCounterColor(vertical, maxVertical) }}>
              {vertical}
            </h3>
            <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              / {maxVertical}
            </span>
          </div>
        </div>
      </div>

      {/* Warning message if at max */}
      {(horizontal >= maxHorizontal || vertical >= maxVertical) && (
        <div 
          className="ml-auto flex items-center gap-2 rounded px-3 py-2"
          style={{
            backgroundColor: 'var(--color-danger-light)',
            border: '1px solid var(--color-destructive)'
          }}
        >
          <span 
            className="caption"
            style={{ color: 'var(--color-destructive)' }}
          >
            ⚠️ Batas maksimal tercapai
          </span>
        </div>
      )}
    </div>
  );
}
