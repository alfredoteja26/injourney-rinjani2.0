import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: string;
  imageUrl?: string;
}

interface AnnouncementCarouselProps {
  announcements: Announcement[];
  onImageClick?: (imageUrl: string) => void;
}

export function AnnouncementCarousel({ announcements, onImageClick }: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter announcements that have images
  const announcementsWithImages = announcements.filter(a => a.imageUrl);

  if (announcementsWithImages.length === 0) {
    return (
      <div
        style={{
          padding: "48px 24px",
          textAlign: "center",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)"
        }}
      >
        <p className="body" style={{ color: "var(--muted-foreground)" }}>
          Belum ada pengumuman dengan gambar
        </p>
      </div>
    );
  }

  const currentAnnouncement = announcementsWithImages[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % announcementsWithImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + announcementsWithImages.length) % announcementsWithImages.length);
  };

  // Category config
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { label: string; color: string; bgColor: string }> = {
      performance: { label: "Performance", color: "#00858A", bgColor: "rgba(0, 133, 138, 0.1)" },
      talent: { label: "Talent", color: "#006573", bgColor: "rgba(0, 101, 115, 0.1)" },
      learning: { label: "Learning", color: "#31C6B1", bgColor: "rgba(49, 198, 177, 0.2)" },
      sistem: { label: "Sistem", color: "#00858A", bgColor: "rgba(0, 133, 138, 0.1)" },
      ekonomi: { label: "Ekonomi", color: "#006573", bgColor: "rgba(0, 101, 115, 0.1)" }
    };
    return categoryMap[category.toLowerCase()] || { label: category, color: "#00858A", bgColor: "rgba(0, 133, 138, 0.1)" };
  };

  const categoryInfo = getCategoryInfo(currentAnnouncement.category);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Main Card */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
      >
        {/* Image Section */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            backgroundColor: "var(--muted)",
            cursor: "pointer"
          }}
          onClick={() => onImageClick?.(currentAnnouncement.imageUrl!)}
        >
          <img
            src={currentAnnouncement.imageUrl}
            alt={currentAnnouncement.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          
          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)"
            }}
          />

          {/* Navigation Buttons */}
          {announcementsWithImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <ChevronLeft style={{ width: "24px", height: "24px", color: "#181D27" }} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <ChevronRight style={{ width: "24px", height: "24px", color: "#181D27" }} />
              </button>
            </>
          )}

          {/* Counter Badge */}
          {announcementsWithImages.length > 1 && (
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)"
              }}
            >
              <span
                className="caption"
                style={{
                  color: "white",
                  fontFamily: "'Inter:Medium',sans-serif",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "12px"
                }}
              >
                {currentIndex + 1} / {announcementsWithImages.length}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div style={{ padding: "24px" }}>
          {/* Category and Date */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div
              style={{
                display: "inline-flex",
                padding: "4px 10px",
                borderRadius: "6px",
                backgroundColor: categoryInfo.bgColor
              }}
            >
              <span
                className="caption"
                style={{
                  color: categoryInfo.color,
                  fontFamily: "'Inter:Medium',sans-serif",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "10px"
                }}
              >
                {categoryInfo.label}
              </span>
            </div>
            <span
              className="caption"
              style={{
                color: "var(--muted-foreground)",
                fontSize: "11px"
              }}
            >
              {currentAnnouncement.timestamp}
            </span>
          </div>

          {/* Title */}
          <h3
            className="h4"
            style={{
              color: "var(--foreground)",
              marginBottom: "8px"
            }}
          >
            {currentAnnouncement.title}
          </h3>

          {/* Description */}
          <p
            className="body"
            style={{
              color: "var(--muted-foreground)",
              lineHeight: "1.6"
            }}
          >
            {currentAnnouncement.description}
          </p>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {announcementsWithImages.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            overflowX: "auto",
            paddingBottom: "8px"
          }}
        >
          {announcementsWithImages.map((announcement, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={announcement.id}
                onClick={() => setCurrentIndex(index)}
                style={{
                  flex: "0 0 auto",
                  width: "80px",
                  height: "60px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: isActive ? 1 : 0.6,
                  backgroundColor: "var(--muted)"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = "0.8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = "0.6";
                  }
                }}
              >
                <img
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
