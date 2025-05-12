'use client';

import YT, { YouTubeProps } from 'react-youtube';

export function YouTube(props: YouTubeProps) {
  const opts = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="w-full max-w-full relative overflow-hidden pt-[56.25%]">
      <YT
        {...props}
        opts={opts}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
