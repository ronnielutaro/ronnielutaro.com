'use client';

import type React from 'react';
import { memo, useRef, useState, useEffect } from 'react';
import { MemoizedImage } from '@/components/memoized-image';
import { MemoizedVideo } from './memoized-video';
import { MemoizedYouTube } from './memoized-youtube';
import { useMobile } from '@/hooks/use-mobile';

interface MediaItem {
  type: 'image' | 'video' | 'youtube';
  src: string;
}

interface MediaCarouselProps {
  media: MediaItem[];
  title: string;
}

const MediaCarousel: React.FC<MediaCarouselProps> = memo(({ media, title }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const isMobile = useMobile();

  const debounce = <T extends (...args: unknown[]) => void>(fn: T, ms = 10) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const maxScrollPosition = Math.max(0, scrollWidth - containerWidth);
      setScrollPosition(currentPosition);
      setMaxScroll(maxScrollPosition);
    };

    const debouncedHandleScroll = debounce(handleScroll, 10);

    // Calculate initial values
    handleScroll();

    // Add scroll event listener with debounced handler
    scrollContainer.addEventListener('scroll', debouncedHandleScroll);

    // Handle resize to recalculate max scroll
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [media]);

  // Calculate indicator width and position with boundary checks
  const calculateIndicatorWidth = () => {
    if (!scrollContainerRef.current || maxScroll <= 0) return '0%';
    const containerWidth = scrollContainerRef.current.clientWidth;
    const scrollWidth = scrollContainerRef.current.scrollWidth;
    // Ensure width is between 10% (minimum for visibility) and 100%
    const percentage = Math.max(
      10,
      Math.min(100, (containerWidth / scrollWidth) * 100),
    );
    return `${percentage}%`;
  };

  const calculateIndicatorPosition = () => {
    if (!scrollContainerRef.current || maxScroll <= 0) return '0%';
    // Clamp scroll position between 0 and maxScroll
    const clampedPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
    // Calculate percentage (0-100) and ensure it doesn't push indicator out of bounds
    const percentage = Math.min(
      100 - Number.parseFloat(calculateIndicatorWidth()),
      (clampedPosition / maxScroll) * 100,
    );
    return `${percentage}%`;
  };

  const scrollIndicatorWidth = calculateIndicatorWidth();
  const scrollIndicatorPosition = calculateIndicatorPosition();

  return (
    <div className="mt-2 mb-2 sm:mx-0 sm:mb-0">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: 'none' }}
      >
        <div className="flex gap-2 sm:px-0 mb-2">
          {media.map((item, idx) => (
            <div key={idx} className="flex-shrink-0">
              {item.type === 'video' ? (
                <MemoizedVideo
                  src={item.src}
                  alt={`${title} video ${idx + 1}`}
                  width={130}
                  height={130}
                  className="rounded-xl border h-24 w-auto border-[#E2E2E2] dark:border-[#343334]"
                />
              ) : item.type === 'youtube' ? (
                <MemoizedYouTube
                  videoId={item.src}
                  title={`${title} YouTube video ${idx + 1}`}
                  className="rounded-xl border h-24 w-auto border-[#E2E2E2] dark:border-[#343334]"
                />
              ) : (
                <MemoizedImage
                  src={item.src}
                  alt={`${title} image ${idx + 1}`}
                  width={130}
                  height={130}
                  className="rounded-xl border h-24 w-auto border-[#E2E2E2] dark:border-[#343334]"
                  quality={100}
                  unoptimized
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - only visible on mobile */}
      {isMobile && maxScroll > 0 && (
        <div className="relative h-0.5 w-full bg-secondary-hover rounded mt-1 sm:hidden">
          <div
            className="absolute h-full bg-muted-foreground rounded transition-all duration-150 ease-out"
            style={{
              width: scrollIndicatorWidth,
              left: scrollIndicatorPosition,
            }}
          />
        </div>
      )}
    </div>
  );
});

MediaCarousel.displayName = 'MediaCarousel';

export default MediaCarousel;
