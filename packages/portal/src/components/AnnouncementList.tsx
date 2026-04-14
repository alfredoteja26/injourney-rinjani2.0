import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@rinjani/shared-ui";

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
  
  const getCategoryVariant = (iconType?: string) => {
    const variants: Record<string, React.ComponentProps<typeof Badge>["variant"]> = {
      learning: "success",
      talent: "info",
      performance: "warning",
      ai: "attention",
      general: "neutral"
    };
    return variants[iconType || "general"] || "neutral";
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
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold leading-7 text-foreground">
          Pengumuman Terbaru
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Announcements List */}
      <div className="mb-6 flex flex-col gap-3">
        {announcements.length === 0 ? (
          <div className="rounded-[24px] border border-border bg-card p-12 text-center shadow-sm">
            <p className="text-base text-muted-foreground">
              Belum ada pengumuman
            </p>
          </div>
        ) : (
          announcements.map((announcement) => {
            const categoryVariant = getCategoryVariant(announcement.iconType);
            const categoryLabel = getCategoryLabel(announcement.iconType);

            return (
              <div
                key={announcement.id}
                onClick={() => onAnnouncementClick?.(announcement)}
                className="flex cursor-pointer items-start gap-4 rounded-[24px] border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30 hover:bg-muted/20"
              >
                {/* Left: Icon/Badge */}
                <div className="flex shrink-0 flex-col items-start gap-2">
                  <Badge variant={categoryVariant} className="px-2.5 py-0 text-[10px] font-semibold uppercase tracking-[0.12em]">
                    {categoryLabel}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3 text-muted-foreground" />
                    <p className="text-[11px] leading-4 text-muted-foreground">
                      {formatDate(announcement.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Middle: Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <h3 className="text-base font-semibold leading-6 text-foreground">
                    {announcement.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {announcement.description}
                  </p>
                  {announcement.linkAttachment && (
                    <a 
                      href={announcement.linkAttachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Lihat Selengkapnya →
                    </a>
                  )}
                </div>

                {/* Right: Image (if exists) */}
                {announcement.imageUrl && (
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[16px] border border-border bg-muted">
                    <img 
                      src={announcement.imageUrl} 
                      alt={announcement.title}
                      className="h-full w-full object-cover"
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
            className="flex items-center justify-center rounded-xl border border-border bg-card p-2 text-foreground transition-colors hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-5" />
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
                    className="px-2 text-sm text-muted-foreground"
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
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:bg-muted/40'
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
            className="flex items-center justify-center rounded-xl border border-border bg-card p-2 text-foreground transition-colors hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
