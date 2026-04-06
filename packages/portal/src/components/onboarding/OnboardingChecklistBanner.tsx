import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { NewEmployeeChecklistItem } from './types';

interface OnboardingChecklistBannerProps {
  items: NewEmployeeChecklistItem[];
  onItemComplete: (itemId: string) => void;
}

export function OnboardingChecklistBanner({
  items,
  onItemComplete
}: OnboardingChecklistBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;
  const isAllCompleted = completedCount === totalCount;

  // Don't render if all completed
  if (isAllCompleted) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      marginBottom: '24px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '20px 24px',
          backgroundColor: 'linear-gradient(135deg, rgba(0, 133, 138, 0.05) 0%, rgba(0, 101, 115, 0.05) 100%)',
          border: 'none',
          borderBottom: isExpanded ? '1px solid var(--border)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 133, 138, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 133, 138, 0.05)';
        }}
      >
        {/* Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <CheckCircle2 style={{
            width: '24px',
            height: '24px',
            color: 'var(--primary-foreground)'
          }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)',
            marginBottom: '4px'
          }}>
            Welcome! Complete Your Onboarding Checklist
          </div>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)'
          }}>
            {completedCount} of {totalCount} tasks completed
          </div>
        </div>

        {/* Progress Circle */}
        <div style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          flexShrink: 0
        }}>
          <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)'
          }}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Expand Icon */}
        <div style={{
          padding: '8px',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isExpanded ? (
            <ChevronUp style={{
              width: '20px',
              height: '20px',
              color: 'var(--foreground)'
            }} />
          ) : (
            <ChevronDown style={{
              width: '20px',
              height: '20px',
              color: 'var(--foreground)'
            }} />
          )}
        </div>
      </button>

      {/* Checklist Items - Expandable */}
      {isExpanded && (
        <div style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '16px',
                backgroundColor: item.completed ? 'rgba(0, 133, 138, 0.05)' : 'var(--muted)',
                border: `1px solid ${item.completed ? 'rgba(0, 133, 138, 0.2)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!item.completed) {
                  e.currentTarget.style.borderColor = 'rgba(0, 133, 138, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.completed) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {/* Checkbox */}
                <button
                  onClick={() => !item.completed && onItemComplete(item.id)}
                  disabled={item.completed}
                  style={{
                    padding: 0,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: item.completed ? 'default' : 'pointer',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  {item.completed ? (
                    <CheckCircle2 style={{
                      width: '20px',
                      height: '20px',
                      color: 'var(--primary)'
                    }} />
                  ) : (
                    <Circle style={{
                      width: '20px',
                      height: '20px',
                      color: 'var(--muted-foreground)'
                    }} />
                  )}
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: item.completed ? 'var(--muted-foreground)' : 'var(--foreground)',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    marginBottom: '4px'
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>
                    {item.description}
                  </div>

                  {/* Deadline */}
                  {item.deadline && !item.completed && (
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: new Date(item.deadline) < new Date()
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(59, 130, 246, 0.1)',
                        color: new Date(item.deadline) < new Date()
                          ? '#EF4444'
                          : '#3B82F6',
                        display: 'inline-block'
                      }}>
                        Due: {new Date(item.deadline).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  {item.action && !item.completed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (item.action?.type === 'link' && item.action.url) {
                          window.location.hash = item.action.url;
                        } else if (item.action?.type === 'external' && item.action.url) {
                          window.open(item.action.url, '_blank');
                        } else if (item.action?.type === 'function' && item.action.onClick) {
                          item.action.onClick();
                        }
                      }}
                      style={{
                        height: '32px',
                        fontSize: 'var(--text-xs)',
                        borderColor: 'rgba(0, 133, 138, 0.5)',
                        color: 'var(--primary)'
                      }}
                    >
                      {item.action.label}
                      {item.action.type === 'external' && (
                        <ExternalLink style={{
                          width: '12px',
                          height: '12px',
                          marginLeft: '4px'
                        }} />
                      )}
                    </Button>
                  )}

                  {/* PIC */}
                  {item.pic && !item.completed && (
                    <div style={{
                      marginTop: '8px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)'
                    }}>
                      Contact: {item.pic}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
