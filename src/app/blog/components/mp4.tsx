// mp4.tsx
import React from 'react';

interface MP4Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const MP4: React.FC<MP4Props> = ({
  src,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className = '',
  ...props
}) => {
  if (!src) return null;

  return (
    <video
      src={src}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      playsInline // Ensures the video plays inline
      className={`w-full h-auto rounded-md py-4 shadow-lg ${className}`} // TailwindCSS for responsiveness
      {...props}
    />
  );
};
