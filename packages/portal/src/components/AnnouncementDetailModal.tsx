import React from 'react';
import { X, GraduationCap, Users, Target, Sparkles, TrendingUp } from 'lucide-react';

interface AnnouncementDetailModalProps {
  announcement: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    iconType?: 'learning' | 'talent' | 'performance' | 'ai' | 'general';
    categoryColor?: 'learning' | 'talent' | 'performance' | 'ai';
    timestamp: string;
    linkAttachment?: string;
  } | null;
  onClose: () => void;
}

const getCategoryInfo = (iconType?: string) => {
  switch (iconType) {
    case 'learning':
      return {
        label: 'Learning',
        icon: GraduationCap,
        bgColor: 'rgba(108, 93, 211, 0.1)',
        textColor: '#6C5DD3',
      };
    case 'talent':
      return {
        label: 'Talent',
        icon: Users,
        bgColor: 'rgba(255, 107, 0, 0.1)',
        textColor: '#FF6B00',
      };
    case 'performance':
      return {
        label: 'Performance',
        icon: Target,
        bgColor: 'rgba(0, 207, 232, 0.1)',
        textColor: '#00CFE8',
      };
    case 'ai':
      return {
        label: 'AI & Innovation',
        icon: Sparkles,
        bgColor: 'rgba(0, 133, 138, 0.1)',
        textColor: '#00858A',
      };
    default:
      return {
        label: 'General',
        icon: TrendingUp,
        bgColor: 'rgba(113, 118, 128, 0.1)',
        textColor: '#717680',
      };
  }
};

export function AnnouncementDetailModal({ announcement, onClose }: AnnouncementDetailModalProps) {
  if (!announcement) return null;

  const categoryInfo = getCategoryInfo(announcement.iconType);
  const Icon = categoryInfo.icon;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <h2
            className="font-['Inter',sans-serif]"
            style={{ 
              color: 'var(--foreground)', 
              margin: 0,
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.33'
            }}
          >
            Detail Pengumuman
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={24} color="var(--muted-foreground)" />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          {/* Category Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              backgroundColor: categoryInfo.bgColor,
              marginBottom: '16px',
            }}
          >
            <Icon size={16} color={categoryInfo.textColor} />
            <span
              className="font-['Inter',sans-serif]"
              style={{ 
                color: categoryInfo.textColor,
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: '1.5'
              }}
            >
              {categoryInfo.label}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-['Inter',sans-serif]"
            style={{ 
              color: 'var(--foreground)', 
              marginBottom: '12px',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.5'
            }}
          >
            {announcement.title}
          </h3>

          {/* Date */}
          <p
            className="font-['Inter',sans-serif]"
            style={{ 
              color: 'var(--muted-foreground)', 
              marginBottom: '24px',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-normal)',
              lineHeight: '1.43'
            }}
          >
            {new Date(announcement.timestamp).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          {/* Image */}
          {announcement.imageUrl && (
            <div
              style={{
                width: '100%',
                marginBottom: '24px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}
            >
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Description */}
          <div
            className="font-['Inter',sans-serif]"
            style={{
              color: 'var(--foreground)',
              whiteSpace: 'pre-wrap',
              marginBottom: '24px',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-normal)',
              lineHeight: '1.43'
            }}
          >
            {announcement.description}
          </div>

          {/* Link Attachment */}
          {announcement.linkAttachment && (
            <a
              href={announcement.linkAttachment}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Inter',sans-serif]"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: '1.43'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Lihat Selengkapnya
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
