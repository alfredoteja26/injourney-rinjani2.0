import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Play, ChevronRight, X } from 'lucide-react';
import { Button } from '../ui/button';
import { NewEmployeeChecklistItem } from './types';
import onboardingVideo from 'figma:asset/0a6a2f608a07d7c74ca22bbf2a3d31ebec7f6f5b.png';

interface OnboardingDashboardSectionProps {
  items: NewEmployeeChecklistItem[];
  onItemComplete: (itemId: string) => void;
  employeeName: string;
}

export function OnboardingDashboardSection({
  items,
  onItemComplete,
  employeeName
}: OnboardingDashboardSectionProps) {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isAllCompleted = completedCount === totalCount && totalCount > 0;
  const [showCongrats, setShowCongrats] = useState(false);
  const [prevCompletedCount, setPrevCompletedCount] = useState(completedCount);

  // Check if just completed all items
  useEffect(() => {
    if (isAllCompleted && prevCompletedCount < totalCount) {
      setShowCongrats(true);
    }
    setPrevCompletedCount(completedCount);
  }, [completedCount, isAllCompleted, totalCount]);

  // Don't render if all completed AND congrats modal is closed
  if (isAllCompleted && !showCongrats) {
    return null;
  }

  // Get first name
  const firstName = employeeName.split(' ')[0];

  // Handle checkbox toggle
  const handleToggleItem = (itemId: string) => {
    onItemComplete(itemId);
  };

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        minHeight: '500px'
      }}>
        {/* Left Column - Checklist */}
        <div style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(0, 133, 138, 0.03) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRight: '1px solid var(--border)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Welcome, {firstName} 
              <span style={{ fontSize: '28px' }}>👋</span>
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginBottom: '24px'
            }}>
              Let's get you set up! Complete the checklist below to unlock your dashboard...
            </p>

            {/* Progress Bar */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)'
                }}>
                  To-Do
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--primary)'
                }}>
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--muted)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00858A 0%, #00B8BE 100%)',
                  transition: 'width 0.5s ease',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '360px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {items.map((item, index) => {
              const iconColors = [
                '#3B82F6', // Blue
                '#8B5CF6', // Purple
                '#EC4899', // Pink
                '#F59E0B', // Amber
                '#10B981', // Green
                '#EF4444'  // Red
              ];
              const iconColor = item.completed ? '#10B981' : iconColors[index % iconColors.length];
              
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '16px',
                    backgroundColor: item.completed 
                      ? 'rgba(16, 185, 129, 0.05)' 
                      : 'var(--card)',
                    border: `1px solid ${item.completed ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleToggleItem(item.id)}
                  onMouseEnter={(e) => {
                    if (!item.completed) {
                      e.currentTarget.style.borderColor = iconColor;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.completed) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Checkbox Icon */}
                  <div 
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      border: `2px solid ${item.completed ? iconColor : 'var(--border)'}`,
                      backgroundColor: item.completed ? iconColor : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                      marginTop: '2px'
                    }}
                  >
                    {item.completed && (
                      <CheckCircle2 style={{
                        width: '16px',
                        height: '16px',
                        color: 'white'
                      }} />
                    )}
                  </div>

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
                      lineHeight: '1.4'
                    }}>
                      {item.description}
                    </div>
                  </div>

                  {/* Action Button */}
                  {!item.completed && item.action && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.action?.type === 'link' && item.action.url) {
                          window.location.hash = item.action.url;
                        } else if (item.action?.type === 'external' && item.action.url) {
                          window.open(item.action.url, '_blank');
                        } else if (item.action?.type === 'function' && item.action.onClick) {
                          item.action.onClick();
                        }
                      }}
                      style={{
                        backgroundColor: iconColor,
                        borderColor: iconColor,
                        color: 'white',
                        fontSize: 'var(--text-xs)',
                        height: '32px',
                        paddingLeft: '12px',
                        paddingRight: '12px'
                      }}
                    >
                      {item.action.label}
                      <ChevronRight style={{
                        width: '14px',
                        height: '14px',
                        marginLeft: '4px'
                      }} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Video */}
        <div style={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--muted)',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '8px'
            }}>
              Watch this Quick Video
            </h3>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)'
            }}>
              Learn how to get started with the platform
            </p>
          </div>

          {/* Video Player */}
          <div style={{
            flex: 1,
            position: 'relative',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            backgroundImage: `url(${onboardingVideo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {/* Play Button Overlay */}
            <button
              onClick={() => {
                // Open video modal or play inline
                alert('Video player would open here');
              }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 133, 138, 0.95)',
                border: '4px solid rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 133, 138, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
            >
              <Play style={{
                width: '32px',
                height: '32px',
                color: 'white',
                marginLeft: '4px',
                fill: 'white'
              }} />
            </button>
          </div>

          {/* Additional Info */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: 'rgba(0, 133, 138, 0.05)',
            border: '1px solid rgba(0, 133, 138, 0.2)',
            borderRadius: 'var(--radius)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'white' }}>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--primary)',
                  marginBottom: '4px'
                }}>
                  💡 Onboarding Tips
                </div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  lineHeight: '1.5'
                }}>
                  Complete these tasks in your first week to get fully set up. Need help? Contact your PIC using the "Hubungi PIC" button on each item.
                </div>
              </div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--card)',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.6'
            }}>
              <strong style={{ color: 'var(--foreground)' }}>Your Progress:</strong> {completedCount} of {totalCount} tasks completed ({Math.round(progress)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Congratulations Modal */}
      {showCongrats && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius)',
            padding: '48px',
            maxWidth: '500px',
            width: '100%',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Confetti Effect */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '60px'
            }}>
              🎉
            </div>

            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: '16px',
              marginTop: '20px'
            }}>
              Selamat, {firstName}! 🎊
            </h2>

            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Semua checklist onboarding Anda telah selesai! Anda siap untuk memulai perjalanan Anda bersama kami.
            </p>

            <div style={{
              padding: '20px',
              backgroundColor: 'rgba(0, 133, 138, 0.05)',
              borderRadius: 'var(--radius)',
              marginBottom: '32px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '12px'
              }}>
                ✅
              </div>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary)'
              }}>
                {totalCount}/{totalCount} Tasks Completed
              </div>
            </div>

            <Button
              onClick={() => setShowCongrats(false)}
              style={{
                width: '100%',
                backgroundColor: 'var(--primary)',
                borderColor: 'var(--primary)',
                color: 'white',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '12px 24px',
                height: 'auto'
              }}
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}