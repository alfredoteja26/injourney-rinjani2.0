import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, ExternalLink, X, ClipboardList } from 'lucide-react';
import { NewEmployeeChecklistItem } from './types';

interface NewEmployeeChecklistProps {
  items: NewEmployeeChecklistItem[];
  onItemComplete: (itemId: string) => void;
  onDismiss?: () => void;
  canDismiss: boolean;
}

export function NewEmployeeChecklist({ 
  items, 
  onItemComplete, 
  onDismiss,
  canDismiss 
}: NewEmployeeChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  const handleDismiss = () => {
    if (canDismiss && onDismiss) {
      setIsVisible(false);
      setTimeout(() => onDismiss(), 300);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Expanded Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out ${
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          width: '360px',
          backgroundColor: 'var(--card)',
          borderRight: '1px solid var(--border)',
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ 
            borderColor: 'var(--border)',
            background: 'linear-gradient(135deg, rgba(0, 133, 138, 0.05) 0%, rgba(0, 101, 115, 0.05) 100%)'
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <ClipboardList className="w-5 h-5" style={{ color: 'var(--primary-foreground)' }} />
              </div>
              <div className="flex-1">
                <h3 style={{ color: 'var(--foreground)' }}>Checklist Orientasi</h3>
                <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '2px' }}>
                  Panduan untuk karyawan baru
                </p>
              </div>
            </div>
            
            <div className="flex gap-1">
              {canDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 w-8 p-0"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                Progress
              </span>
              <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)' }}>
                {completedCount}/{totalCount} ({Math.round(progress)}%)
              </span>
            </div>
            <div 
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--muted)' }}
            >
              <div 
                className="h-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border transition-all"
                style={{
                  backgroundColor: item.completed ? 'rgba(0, 133, 138, 0.05)' : 'var(--card)',
                  borderColor: item.completed ? 'rgba(0, 133, 138, 0.2)' : 'var(--border)'
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
                <div className="flex gap-3">
                  <button
                    onClick={() => !item.completed && onItemComplete(item.id)}
                    className="flex-shrink-0 mt-0.5 focus:outline-none rounded-full"
                    disabled={item.completed}
                    style={{ 
                      cursor: item.completed ? 'default' : 'pointer'
                    }}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    ) : (
                      <Circle 
                        className="w-5 h-5 transition-colors" 
                        style={{ color: 'var(--muted-foreground)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
                      />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p 
                      className="caption mb-1"
                      style={{ 
                        fontWeight: 'var(--font-weight-semibold)',
                        color: item.completed ? 'var(--muted-foreground)' : 'var(--foreground)',
                        textDecoration: item.completed ? 'line-through' : 'none'
                      }}
                    >
                      {item.title}
                    </p>
                    <p className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '8px' }}>
                      {item.description}
                    </p>
                    
                    {item.action && !item.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1"
                        style={{
                          borderColor: 'rgba(0, 133, 138, 0.5)',
                          color: 'var(--primary)'
                        }}
                        onClick={() => {
                          if (item.action?.type === 'link' && item.action.url) {
                            window.location.hash = item.action.url;
                          } else if (item.action?.type === 'external' && item.action.url) {
                            window.open(item.action.url, '_blank');
                          } else if (item.action?.type === 'function' && item.action.onClick) {
                            item.action.onClick();
                          }
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-xs)' }}>{item.action.label}</span>
                        {item.action.type === 'external' && (
                          <ExternalLink className="w-3 h-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!canDismiss && (
            <div 
              className="mt-4 p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--muted)',
                borderColor: 'var(--border)'
              }}
            >
              <p className="caption text-center" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Selesaikan semua checklist untuk menutup panel ini
              </p>
            </div>
          )}

          {canDismiss && (
            <div className="mt-4">
              <Button
                onClick={handleDismiss}
                className="w-full"
                size="sm"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Sembunyikan Checklist
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Collapsed Preview Tab - 24px from left sidebar */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed z-40 transition-all duration-300 hover:shadow-lg group"
          style={{
            left: 'calc(64px + 24px)', // 64px (collapsed sidebar width) + 24px spacing
            top: '96px', // 24px from top
            backgroundColor: 'var(--card)',
            borderTopRightRadius: 'var(--radius)',
            borderBottomRightRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            borderLeft: 'none',
            padding: '12px 8px 12px 12px',
            boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <ClipboardList className="w-4 h-4" style={{ color: 'var(--primary-foreground)' }} />
            </div>
            
            <div className="flex flex-col items-start min-w-[120px]">
              <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                Orientasi
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="caption" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  {completedCount}/{totalCount}
                </span>
                <div 
                  className="w-12 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--muted)' }}
                >
                  <div 
                    className="h-full"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: 'var(--primary)',
                      transition: 'width 300ms'
                    }}
                  />
                </div>
              </div>
            </div>

            <ChevronRight 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              style={{ color: 'var(--muted-foreground)' }}
            />
          </div>

          {/* Notification Badge for incomplete items */}
          {completedCount < totalCount && (
            <div 
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--destructive-foreground)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              {totalCount - completedCount}
            </div>
          )}
        </button>
      )}

      {/* Overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-30 transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}