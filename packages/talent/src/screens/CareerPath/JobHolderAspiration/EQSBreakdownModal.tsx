/**
 * EQS Breakdown Modal Component
 * Shows detailed EQS calculation breakdown
 */

import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { getEQSRatingColor, getEQSRatingIcon, getEQSRatingLabel } from '../../../lib/career-path/eqsCalculation';
import type { Employee, Position, EQSScore } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface EQSBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Employee;
  position: Position;
  eqsScore: EQSScore;
}

export function EQSBreakdownModal({
  isOpen,
  onClose,
  candidate,
  position,
  eqsScore
}: EQSBreakdownModalProps) {
  if (!isOpen) return null;

  const ratingColor = getEQSRatingColor(eqsScore.rating);
  const ratingIcon = getEQSRatingIcon(eqsScore.rating);
  const ratingLabel = getEQSRatingLabel(eqsScore.rating);

  // Component data with max scores and weights (Based on EQS-2025-12-18 Formula)
  const components = [
    { 
      name: 'Performance Score', 
      score: eqsScore.breakdown.performance, 
      max: 20, 
      weight: '20%',
      description: 'Historical performance rating and achievements'
    },
    { 
      name: 'Competency Match', 
      score: eqsScore.breakdown.competency, 
      max: 20, 
      weight: '20%',
      description: 'Job family alignment and required competencies'
    },
    { 
      name: 'Relevant Experience', 
      score: eqsScore.breakdown.experience, 
      max: 20, 
      weight: '20%',
      description: 'Years of experience in similar roles and grade level'
    },
    { 
      name: 'Aspiration Alignment', 
      score: eqsScore.breakdown.aspiration, 
      max: 10, 
      weight: '10%',
      description: 'Employee has expressed aspiration for this or similar position'
    },
    { 
      name: 'Training & Development', 
      score: eqsScore.breakdown.training, 
      max: 10, 
      weight: '10%',
      description: 'Completed training programs and certifications'
    },
    { 
      name: 'TES (Talent Eval Score)', 
      score: eqsScore.breakdown.tes, 
      max: 10, 
      weight: '10%',
      description: 'Potential assessment from Talent Evaluation System'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="sticky top-0 p-6 flex items-start justify-between bg-[var(--color-card)] border-b border-[var(--color-border)] z-10"
        >
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-[var(--color-foreground)]">EQS Score Breakdown</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] font-body mt-1">
              {candidate.name} → {position.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-[var(--color-muted)]">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Total Score */}
          <div 
            className="rounded-lg p-6 text-center bg-[var(--color-muted)] border-2"
            style={{
              borderColor: ratingColor
            }}
          >
            <p className="text-sm font-medium text-[var(--color-muted-foreground)] font-body">Total EQS Score</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <h1 className="text-4xl font-heading font-bold" style={{ color: ratingColor }}>
                {eqsScore.total.toFixed(1)}
              </h1>
              <span className="text-3xl text-[var(--color-muted-foreground)] font-body">
                / 100
              </span>
            </div>
            <div className="mt-3">
              <Badge 
                variant="outline"
                className="px-4 py-2 text-base font-medium"
                style={{
                  backgroundColor: ratingColor.replace(')', '-light)'),
                  borderColor: ratingColor,
                  color: ratingColor,
                }}
              >
                <span className="mr-2 text-lg">{ratingIcon}</span>
                {ratingLabel}
              </Badge>
            </div>
          </div>

          {/* Components Breakdown */}
          <div>
            <h4 className="mb-4 text-base font-heading font-semibold text-[var(--color-foreground)]">Score Components</h4>
            <div className="space-y-4">
              {components.map((component, index) => {
                const percentage = (component.score / component.max) * 100;
                const isHigh = percentage >= 80;
                const isMedium = percentage >= 50 && percentage < 80;
                
                return (
                  <div 
                    key={index}
                    className="rounded-lg p-4 bg-[var(--color-muted)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-heading font-medium text-[var(--color-foreground)]">{component.name}</h5>
                          <Badge 
                            variant="outline"
                            className="text-xs bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-foreground)]"
                          >
                            Weight: {component.weight}
                          </Badge>
                        </div>
                        <p className="text-xs text-[var(--color-muted-foreground)] font-body mt-1">
                          {component.description}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-[var(--color-foreground)]">
                          {component.score.toFixed(1)}
                        </p>
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          / {component.max}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full rounded-full overflow-hidden mt-2 h-2 bg-[var(--color-background)]">
                      <div 
                        className="h-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: isHigh ? 'var(--color-nine-highpot)' : 
                                          isMedium ? 'var(--color-primary)' : 
                                          'var(--color-nine-emerging)'
                        }}
                      />
                    </div>
                    
                    <p className="text-xs text-[var(--color-muted-foreground)] text-right mt-1">
                      {percentage.toFixed(0)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths */}
          {eqsScore.strengths.length > 0 && (
            <div 
              className="rounded-lg p-4 bg-[var(--color-nine-solid-light)] border border-[var(--color-nine-highpot)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[var(--color-nine-highpot)]" />
                <h5 className="font-heading font-semibold text-[var(--color-foreground)]">Key Strengths</h5>
              </div>
              <ul className="space-y-2">
                {eqsScore.strengths.map((strength, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 text-sm font-body text-[var(--color-foreground)]"
                  >
                    <span className="text-[var(--color-nine-highpot)] font-bold">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas to Improve */}
          {eqsScore.areasToImprove.length > 0 && (
            <div 
              className="rounded-lg p-4 bg-[var(--color-muted)] border border-[var(--color-nine-emerging)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-[var(--color-nine-emerging)]" />
                <h5 className="font-heading font-semibold text-[var(--color-foreground)]">Development Areas</h5>
              </div>
              <ul className="space-y-2">
                {eqsScore.areasToImprove.map((area, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 text-sm font-body text-[var(--color-foreground)]"
                  >
                    <span className="text-[var(--color-nine-emerging)] font-bold">!</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Note */}
          <div className="rounded-lg p-4 bg-[var(--color-muted)] border-l-4 border-l-[var(--color-primary)]">
            <p className="text-sm text-[var(--color-muted-foreground)] font-body">
              ℹ️ <strong>Note:</strong> EQS score adalah indikator kualifikasi kandidat berdasarkan data HR. 
              Gunakan sebagai referensi untuk keputusan nominasi successor, 
              tetap pertimbangkan faktor lain seperti soft skills dan cultural fit.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 flex justify-end bg-[var(--color-card)] border-t border-[var(--color-border)]">
          <Button onClick={onClose} variant="outline" className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
