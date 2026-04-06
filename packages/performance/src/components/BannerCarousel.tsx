import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerContentService, BannerContent } from "../lib/banner-content";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import defaultBannerImage from "figma:asset/a91bbc52876d9799b43bdc0551929d8ac5e2e719.png";

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
      <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Injourney Banner">
        <ImageWithFallback
          src={defaultBannerImage}
          alt="Welcome to Rinjani"
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[24px] size-full"
        />
        <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[10px] items-center justify-end p-[24px] relative size-full">
            <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px relative shrink-0 w-full">
              <div className="backdrop-blur-[20px] bg-[rgba(255,255,255,0.8)] overflow-clip relative rounded-[12px] shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                  <h2 className="text-2xl font-bold leading-[36px] text-foreground w-full">
                    Welcome to Rinjani
                  </h2>
                  <p className="text-sm font-normal leading-[20px] text-muted-foreground w-full">
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
      className="basis-0 grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0"
      data-name="Banner Carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Banner Image */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden">
        {currentBanner.imageUrl.startsWith("data:") ? (
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <ImageWithFallback
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

      {/* Overlay Content */}
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-end p-[24px] relative size-full">
          {/* Content Card with Side Navigation */}
          <div className="flex items-center gap-[24px] justify-center relative w-full">
            {/* Left Arrow */}
            {bannerContents.length > 1 && (
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="bg-[rgba(0,0,0,0)] content-stretch flex items-start overflow-clip relative rounded-[12px] self-end shrink-0 hover:scale-110 transition-transform disabled:opacity-50 mb-[16px]"
              >
                <div className="bg-[rgba(26,26,26,0.4)] overflow-clip relative rounded-[12px] shrink-0 size-[62px] hover:bg-[rgba(26,26,26,0.6)] transition-colors">
                  <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <ChevronLeft className="size-full text-white" strokeWidth={2} />
                  </div>
                </div>
              </button>
            )}

            {/* Content Card */}
            <div className="flex-1 flex flex-col items-start justify-end">
              <div className={`backdrop-blur-[20px] bg-[rgba(255,255,255,0.8)] overflow-clip relative rounded-[12px] shrink-0 w-full transition-all duration-300 ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}>
                <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                  <h2 className="text-2xl font-bold leading-[36px] text-foreground w-full">
                    {currentBanner.title}
                  </h2>
                  <p className="text-sm font-normal leading-[20px] text-muted-foreground w-full">
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
                className="bg-[rgba(0,0,0,0)] content-stretch flex items-start overflow-clip relative rounded-[12px] self-end shrink-0 hover:scale-110 transition-transform disabled:opacity-50 mb-[16px]"
              >
                <div className="bg-[rgba(26,26,26,0.4)] overflow-clip relative rounded-[12px] shrink-0 size-[62px] hover:bg-[rgba(26,26,26,0.6)] transition-colors">
                  <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <ChevronRight className="size-full text-white" strokeWidth={2} />
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Pagination Dots */}
          {bannerContents.length > 1 && (
            <div className="flex gap-[8px] items-center justify-center">
              {bannerContents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white w-[24px] h-[8px]"
                      : "bg-white/50 w-[8px] h-[8px] hover:bg-white/80"
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