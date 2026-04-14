import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerContentService, BannerContent } from "../lib/banner-content";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import defaultBannerImage from "figma:asset/62ac0bbe164e4ce2984c3a38fe96712f3cd06c91.png";

export default function BannerCarousel() {
  const [bannerContents, setBannerContents] = useState<BannerContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load active banner contents
  useEffect(() => {
    const contents = BannerContentService.getActive();
    setBannerContents(contents);
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioning || bannerContents.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerContents.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [bannerContents.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || bannerContents.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerContents.length) % bannerContents.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [bannerContents.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-play functionality
  useEffect(() => {
    if (bannerContents.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerContents.length, goToNext]);

  // Swipe/Touch support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (bannerContents.length === 0) {
    // Fallback to default banner if no content is available
    return (
      <div
        className="basis-0 grow h-full min-h-px min-w-px relative overflow-hidden rounded-[28px] border border-border bg-card shadow-sm shrink-0"
        data-name="Injourney Banner"
      >
        <ImageWithFallback
          src={defaultBannerImage}
          alt="Welcome to Rinjani"
          className="absolute inset-0 size-full object-cover object-center pointer-events-none"
        />
        <div className="flex size-full flex-col items-center justify-end overflow-clip rounded-[inherit] bg-gradient-to-t from-background/35 via-transparent to-transparent">
          <div className="content-stretch flex size-full flex-col items-center justify-end gap-[10px] p-6 relative">
            <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px relative shrink-0 w-full">
              <div className="overflow-clip relative w-full rounded-[20px] border border-border/70 bg-card/90 backdrop-blur-xl shadow-sm">
                <div className="content-stretch flex flex-col gap-2 items-start p-4 relative w-full">
                  <h2 className="text-2xl font-semibold leading-9 text-foreground w-full">
                    Welcome to Rinjani
                  </h2>
                  <p className="text-sm font-normal leading-5 text-muted-foreground w-full">
                    Your Integrated Talent Management System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentBanner = bannerContents[currentIndex];

  return (
    <div 
      className="basis-0 grow h-full min-h-px min-w-px relative overflow-hidden rounded-[28px] border border-border bg-card shadow-sm shrink-0"
      data-name="Banner Carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Banner Image */}
      <div className="absolute inset-0 overflow-hidden">
        {currentBanner.imageUrl.startsWith("data:") ? (
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <ImageWithFallback
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

      {/* Overlay Content */}
      <div className="flex size-full flex-col items-center justify-end overflow-clip rounded-[inherit] bg-gradient-to-t from-background/35 via-transparent to-transparent">
        <div className="content-stretch flex size-full flex-col items-center justify-end gap-[10px] p-6 relative">
          {/* Content Card with Side Navigation */}
          <div className="flex items-center justify-center gap-6 relative w-full">
            {/* Left Arrow */}
            {bannerContents.length > 1 && (
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="mb-4 shrink-0 rounded-full transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex size-[60px] items-center justify-center rounded-full border border-border/70 bg-foreground/70 text-background shadow-sm backdrop-blur-sm transition-colors hover:bg-foreground/80">
                  <ChevronLeft className="size-6" strokeWidth={2} />
                  </div>
              </button>
            )}

            {/* Content Card */}
            <div className="flex-1 flex flex-col items-start justify-end">
              <div className={`overflow-clip relative w-full rounded-[20px] border border-border/70 bg-card/90 backdrop-blur-xl shadow-sm transition-all duration-300 ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}>
                <div className="content-stretch flex flex-col gap-2 items-start p-4 relative w-full">
                  <h2 className="text-2xl font-semibold leading-9 text-foreground w-full">
                    {currentBanner.title}
                  </h2>
                  <p className="text-sm font-normal leading-5 text-muted-foreground w-full">
                    {currentBanner.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            {bannerContents.length > 1 && (
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="mb-4 shrink-0 rounded-full transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex size-[60px] items-center justify-center rounded-full border border-border/70 bg-foreground/70 text-background shadow-sm backdrop-blur-sm transition-colors hover:bg-foreground/80">
                  <ChevronRight className="size-6" strokeWidth={2} />
                  </div>
              </button>
            )}
          </div>

          {/* Pagination Dots */}
          {bannerContents.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {bannerContents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "h-2 w-6 bg-card"
                      : "h-2 w-2 bg-card/60 hover:bg-card/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
