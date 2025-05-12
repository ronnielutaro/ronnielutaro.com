import React from 'react';

interface SpotifyProps {
  trackId: string;
  width?: string | number;
  height?: string | number;
}

export const Spotify: React.FC<SpotifyProps> = ({
  trackId,
  width = '100%',
  height = 152,
}) => {
  const src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;

  return (
    <div className="my-4">
      <iframe
        src={src}
        width={width}
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"
      />
    </div>
  );
};
