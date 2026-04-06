import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  iconType?: 'learning' | 'talent' | 'performance' | 'ai' | 'general';
  categoryColor?: string;
  imageUrl?: string;
  linkAttachment?: string;
}

interface AnnouncementListProps {
  announcements: Announcement[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAnnouncementClick?: (announcement: Announcement) => void;
}

export function AnnouncementList({ 
  announcements, 
  currentPage, 
  totalPages, 
  onPageChange,
  onAnnouncementClick
}: AnnouncementListProps) {
  
  const getCategoryColor = (iconType?: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      learning: { 
        bg: 'rgba(90, 226, 195, 0.1)', 
        text: '#31C6B1', 
        border: 'rgba(90, 226, 195, 0.2)' 
      },
      talent: { 
        bg: 'rgba(0, 101, 115, 0.1)', 
        text: '#006573', 
        border: 'rgba(0, 101, 115, 0.2)' 
      },
      performance: { 
        bg: 'rgba(0, 133, 138, 0.1)', 
        text: '#00858A', 
        border: 'rgba(0, 133, 138, 0.2)' 
      },
      ai: { 
        bg: 'rgba(0, 184, 219, 0.1)', 
        text: '#007595', 
        border: 'rgba(0, 184, 219, 0.2)' 
      },
      general: { 
        bg: 'rgba(107, 114, 128, 0.1)', 
        text: '#6B7280', 
        border: 'rgba(107, 114, 128, 0.2)' 
      }
    };
    return colors[iconType || 'general'] || colors.general;
  };

  const getCategoryLabel = (iconType?: string) => {
    const labels: Record<string, string> = {
      learning: 'Learning',
      talent: 'Talent',
      performance: 'Performance',
      ai: 'AI & Innovation',
      general: 'General'
    };
    return labels[iconType || 'general'] || 'General';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-[#414651] leading-[30px]">
          Pengumuman Terbaru
        </h2>
        <div className="flex items-center gap-2">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#717680]">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-3 mb-6">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-[12px] p-12 text-center border border-[var(--border)]">
            <p className="font-['Inter:Regular',sans-serif] text-[16px] text-[#717680]">
              Belum ada pengumuman
            </p>
          </div>
        ) : (
          announcements.map((announcement) => {
            const categoryColor = getCategoryColor(announcement.iconType);
            const categoryLabel = getCategoryLabel(announcement.iconType);

            return (
              <div
                key={announcement.id}
                onClick={() => onAnnouncementClick?.(announcement)}
                className="bg-white rounded-[12px] p-4 border border-[var(--border)] hover:border-[#00858A] transition-all cursor-pointer shadow-[0px_2px_4px_-2px_rgba(10,13,18,0.06)]"
                style={{ 
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                {/* Left: Icon/Badge */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                  <div 
                    className="rounded-[6px] px-3 py-1"
                    style={{ 
                      backgroundColor: categoryColor.bg,
                      border: `1px solid ${categoryColor.border}`
                    }}
                  >
                    <p 
                      className="font-['Inter:Medium',sans-serif] font-medium text-[10px] leading-[13.333px]"
                      style={{ color: categoryColor.text }}
                    >
                      {categoryLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar style={{ width: '12px', height: '12px', color: '#717680' }} />
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#717680] leading-[16px]">
                      {formatDate(announcement.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Middle: Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#414651] leading-[24px]">
                    {announcement.title}
                  </h3>
                  <p 
                    className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#717680] leading-[20px]"
                    style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {announcement.description}
                  </p>
                  {announcement.linkAttachment && (
                    <a 
                      href={announcement.linkAttachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#00858A] hover:underline inline-block mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Lihat Selengkapnya →
                    </a>
                  )}
                </div>

                {/* Right: Image (if exists) */}
                {announcement.imageUrl && (
                  <div 
                    className="rounded-[8px] overflow-hidden flex-shrink-0"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img 
                      src={announcement.imageUrl} 
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[var(--border)] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,133,138,0.05)] transition-colors"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft style={{ width: '20px', height: '20px', color: '#414651' }} />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              const showEllipsis = 
                (page === 2 && currentPage > 3) || 
                (page === totalPages - 1 && currentPage < totalPages - 2);

              if (showEllipsis) {
                return (
                  <span 
                    key={`ellipsis-${page}`}
                    className="px-2 font-['Inter:Regular',sans-serif] text-[14px] text-[#717680]"
                  >
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${
                    currentPage === page
                      ? 'bg-[#00858A] text-white'
                      : 'bg-white text-[#414651] border border-[var(--border)] hover:bg-[rgba(0,133,138,0.05)]'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[var(--border)] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,133,138,0.05)] transition-colors"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronRight style={{ width: '20px', height: '20px', color: '#414651' }} />
          </button>
        </div>
      )}
    </div>
  );
}
