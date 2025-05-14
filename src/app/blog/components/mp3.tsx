'use client';

import React, { Suspense } from 'react';
import type { ReactNode } from 'react';

// Explicitly type the dynamic import
const LazyReactMP3 = React.lazy(
  () =>
    import('react-audio-player').then((module) => ({
      default: module.default,
    })) as Promise<{
      default: React.ComponentType<{
        src: string;
        controls?: boolean;
        autoPlay?: boolean;
        loop?: boolean;
        className?: string;
      }>;
    }>,
);

interface MP3Props {
  src: string; // The source URL for the audio file
  controls?: boolean; // Whether to show audio controls (default: true)
  autoPlay?: boolean; // Whether to autoplay the audio (default: false)
  loop?: boolean; // Whether to loop the audio (default: false)
}

const MP3: React.FC<MP3Props> = ({
  src,
  controls = true,
  autoPlay = false,
  loop = false,
}) => {
  if (!src) return null;

  return (
    <Suspense fallback={null}>
      <LazyReactMP3
        src={src}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        className="w-full"
      />
    </Suspense>
  );
};

export default MP3;
