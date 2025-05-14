'use client';

import type React from 'react';
import { memo, useMemo } from 'react';
import MediaCarousel from './media-carousel';
import { ArrowUpRight } from '@phosphor-icons/react';

interface MediaItem {
  type: 'image' | 'video' | 'youtube';
  src: string;
}

interface SectionItem {
  title: string;
  subtitle?: string;
  url?: string;
  description?: React.ReactNode;
  year?: string | number;
  media?: string[];
  youtubeIds?: string[];
  hide?: boolean;
}

interface SectionProps {
  sectionName: string | React.ReactNode;
  items: SectionItem[];
}

const Section: React.FC<SectionProps> = memo(({ sectionName, items }) => {
  // Prepare all media items at once outside the render loop
  const allMediaItems = useMemo(() => {
    return items.map((item) => {
      const mediaItems: MediaItem[] = [];

      // Add regular media (images and videos)
      if (item.media) {
        item.media.forEach((src) => {
          if (src.endsWith('.mp4') || src.endsWith('.mov')) {
            mediaItems.push({ type: 'video', src });
          } else {
            mediaItems.push({ type: 'image', src });
          }
        });
      }

      // Add YouTube videos
      if (item.youtubeIds) {
        item.youtubeIds.forEach((id) => {
          mediaItems.push({ type: 'youtube', src: id });
        });
      }

      return mediaItems;
    });
  }, [items]);

  return (
    <section className="text-base my-5">
      <div className="space-y-4">
        {items.map((item, index) => {
          if (item.hide) return null;

          const mediaItems = allMediaItems[index];

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1">
                {item.url ? (
                  <a
                    href={item.url}
                    target={
                      item.url.startsWith('https://') ? '_blank' : '_self'
                    }
                    rel={
                      item.url.startsWith('https://')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-md no-after font-medium text-primary underline decoration-wavy underline-offset-4 decoration-muted-foreground hover:decoration-primary active:decoration-primary visited:text-muted-foreground flex items-center gap-1"
                  >
                    {item.title}
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="text-muted-foreground"
                    />
                  </a>
                ) : (
                  <span className="text-md font-medium text-primary">
                    {item.title}
                  </span>
                )}
              </div>

              <div className="text-base text-muted-foreground">
                {item.year && (
                  <div className="flex items-baseline">
                    {item.description && (
                      <span>
                        {' '}
                        {item.year} · {item.description}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {mediaItems.length > 0 && (
                <div className="mt-6 mb-8">
                  <MediaCarousel media={mediaItems} title={item.title} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
