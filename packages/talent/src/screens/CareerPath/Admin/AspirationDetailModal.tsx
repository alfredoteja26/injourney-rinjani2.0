/**
 * Aspiration Detail Modal Component
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Detailed view of a single aspiration with all source information
 * Sprint 6 Implementation
 */

import React from 'react';
import { X, Calendar, User, Building2, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { AspirationSourceBadge } from '../shared/AspirationSourceBadge';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import type { Employee, Position } from '../../../types/careerPath';

interface AspirationDetailModalProps {
  aspiration: {
    emp_id: string;
    pos_id: string;
    employee?: Employee;
    position?: Position;
    sources: {
      individual: boolean;
      supervisor: boolean;
      jobHolder: boolean;
      unit: boolean;
    };
    totalSources: number;
    timestamps: {
      individual?: string;
      supervisor?: string;
      jobHolder?: string;
      unit?: string;
    };
  };
  onClose: () => void;
}

export function AspirationDetailModal({ aspiration, onClose }: AspirationDetailModalProps) {
  const { employee, position, sources, timestamps } = aspiration;

  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Trap focus within modal
  React.useEffect(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between p-6 border-b"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h3 id="modal-title">Detail Aspirasi</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
            style={{ color: 'var(--color-muted-foreground)' }}
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6" id="modal-description">
          {/* Employee Information */}
          <div
            className="rounded-lg p-5"
            style={{
              backgroundColor: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-start gap-4">
              {employee?.image && (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: '3px solid var(--color-border)' }}
                />
              )}
              <div className="flex-1">
                <h4 className="mb-1">{employee?.name}</h4>
                <p className="caption mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
                  NIK: {employee?.nik}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                    <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                      {employee?.position}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                    <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                      {employee?.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {employee && (
                      <GradeJabatanBadge
                        grade={employee.grade_jabatan}
                        band={employee.band_jabatan}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                      {employee?.job_family}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Position Information */}
          <div>
            <label className="mb-3 block">POSISI ASPIRASI</label>
            <div
              className="rounded-lg p-5"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '2px solid var(--color-primary)',
              }}
            >
              <h4 className="mb-2">{position?.name}</h4>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {position && (
                    <GradeJabatanBadge
                      grade={position.grade_jabatan}
                      band={position.band_jabatan}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                    {position?.job_family}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                    {position?.company}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                    {position?.location}
                  </span>
                </div>
              </div>
              <div
                className="rounded p-3"
                style={{
                  backgroundColor: position?.status === 'Vacant' 
                    ? 'var(--color-nine-emerging)' 
                    : 'var(--color-muted)',
                }}
              >
                <span className="badge">
                  {position?.status === 'Vacant' ? '🟢 Vacant' : '🔵 Filled'}
                  {position?.status === 'Filled' && position.incumbent_id && (
                    <span style={{ color: 'var(--color-muted-foreground)' }}>
                      {' '}- Currently held
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Source Timeline */}
          <div>
            <label className="mb-3 block">SUMBER NOMINASI ({aspiration.totalSources})</label>
            <div className="space-y-3">
              {sources.individual && timestamps.individual && (
                <SourceTimelineItem
                  source="INDIVIDUAL"
                  timestamp={timestamps.individual}
                  icon="👤"
                  color="var(--color-nine-emerging)"
                  description="Aspirasi dari karyawan sendiri"
                />
              )}
              {sources.supervisor && timestamps.supervisor && (
                <SourceTimelineItem
                  source="SUPERVISOR"
                  timestamp={timestamps.supervisor}
                  icon="👔"
                  color="var(--color-primary)"
                  description="Rekomendasi dari atasan langsung"
                />
              )}
              {sources.jobHolder && timestamps.jobHolder && (
                <SourceTimelineItem
                  source="JOB_HOLDER"
                  timestamp={timestamps.jobHolder}
                  icon="🎯"
                  color="var(--color-accent)"
                  description="Nominasi dari pemegang jabatan"
                />
              )}
              {sources.unit && timestamps.unit && (
                <SourceTimelineItem
                  source="UNIT"
                  timestamp={timestamps.unit}
                  icon="🏢"
                  color="var(--color-nine-solid)"
                  description="Request dari pimpinan unit"
                />
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div
            className="rounded-lg p-4 flex items-start gap-3"
            style={{
              backgroundColor: aspiration.totalSources >= 2 
                ? 'var(--color-nine-highpot)' 
                : 'var(--color-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="text-2xl">
              {aspiration.totalSources >= 2 ? '✅' : 'ℹ️'}
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-base)' }}>
                {aspiration.totalSources >= 2 ? (
                  <strong>Strong Candidate - Multi-Source Support</strong>
                ) : (
                  <strong>Single Source Aspiration</strong>
                )}
              </p>
              <p className="caption mt-1" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>
                {aspiration.totalSources >= 2 
                  ? 'Kandidat ini memiliki dukungan dari multiple sumber dan dapat diprioritaskan untuk Talent Pool.'
                  : 'Pertimbangkan untuk mendapatkan nominasi tambahan dari sumber lain untuk memperkuat kandidasi.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 flex justify-end gap-3 p-6 border-t"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

interface SourceTimelineItemProps {
  source: string;
  timestamp: string;
  icon: string;
  color: string;
  description: string;
}

function SourceTimelineItem({ source, timestamp, icon, color, description }: SourceTimelineItemProps) {
  return (
    <div
      className="rounded-lg p-4 flex items-center gap-4"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p style={{ fontSize: 'var(--text-base)' }}>
          <AspirationSourceBadge source={source as any} compact />
        </p>
        <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2 text-right">
        <Calendar className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
        <span className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
          {new Date(timestamp).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}