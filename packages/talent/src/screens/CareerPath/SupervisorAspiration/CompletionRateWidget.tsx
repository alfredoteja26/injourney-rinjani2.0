/**
 * Completion Rate Widget
 * Shows progress of aspiration assignments for subordinates
 */

import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';

interface CompletionRateWidgetProps {
  totalSubordinates: number;
  completedCount: number;
  pendingCount: number;
  ineligibleCount: number;
  deadline?: string;
}

export function CompletionRateWidget({
  totalSubordinates,
  completedCount,
  pendingCount,
  ineligibleCount,
  deadline
}: CompletionRateWidgetProps) {
  const eligibleCount = totalSubordinates - ineligibleCount;
  const percentage = eligibleCount > 0 ? (completedCount / eligibleCount) * 100 : 0;
  const isComplete = completedCount === eligibleCount;

  return (
    <Card 
      style={{
        backgroundColor: isComplete ? 'var(--color-success-light)' : 'var(--color-card)',
        borderColor: isComplete ? 'var(--color-success)' : 'var(--color-border)'
      }}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4>Completion Rate</h4>
              <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Aspirasi yang sudah diisi untuk bawahan
              </p>
            </div>
            <div className="text-right">
              <div 
                style={{ 
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: isComplete ? 'var(--color-success)' : 'var(--color-primary)'
                }}
              >
                {completedCount}/{eligibleCount}
              </div>
              <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                {percentage.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div 
            className="relative w-full overflow-hidden rounded-full"
            style={{
              height: '12px',
              backgroundColor: 'var(--color-muted)'
            }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${percentage}%`,
                backgroundColor: isComplete ? 'var(--color-success)' : 'var(--color-primary)'
              }}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div 
              className="rounded-lg p-3 text-center"
              style={{
                backgroundColor: 'var(--color-success-light)',
                border: '1px solid var(--color-success)'
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                <span 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-success)'
                  }}
                >
                  {completedCount}
                </span>
              </div>
              <p className="caption" style={{ color: 'var(--color-success)' }}>
                Completed
              </p>
            </div>

            <div 
              className="rounded-lg p-3 text-center"
              style={{
                backgroundColor: 'var(--color-danger-light)',
                border: '1px solid var(--color-destructive)'
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-destructive)' }} />
                <span 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-destructive)'
                  }}
                >
                  {pendingCount}
                </span>
              </div>
              <p className="caption" style={{ color: 'var(--color-destructive)' }}>
                Pending
              </p>
            </div>

            <div 
              className="rounded-lg p-3 text-center"
              style={{
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <span 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-muted-foreground)'
                  }}
                >
                  {ineligibleCount}
                </span>
              </div>
              <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                Ineligible
              </p>
            </div>
          </div>

          {/* Warning Message */}
          {pendingCount > 0 && deadline && (
            <div 
              className="rounded-lg p-3 flex items-start gap-3"
              style={{
                backgroundColor: 'var(--color-danger-light)',
                border: '1px solid var(--color-destructive)'
              }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-destructive)' }} />
              <div className="flex-1">
                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-destructive)' }}>
                  ⚠️ {pendingCount} bawahan belum diisi aspirasi
                </p>
                <p className="caption mt-1" style={{ color: 'var(--color-destructive)' }}>
                  Deadline: {deadline}
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isComplete && (
            <div 
              className="rounded-lg p-3 flex items-center gap-3"
              style={{
                backgroundColor: 'var(--color-success-light)',
                border: '1px solid var(--color-success)'
              }}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
              <p style={{ color: 'var(--color-success)' }}>
                ✅ Semua bawahan eligible sudah diisi aspirasi
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
