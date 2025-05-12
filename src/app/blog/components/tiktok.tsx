'use client';

import React, { useState, useEffect } from 'react';
import { TikTokEmbed } from 'react-social-media-embed';

interface TikTokProps {
  videoUrl: string;
}

const TikTok: React.FC<TikTokProps> = ({ videoUrl }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex p-2 justify-center my-6">
      <TikTokEmbed url={videoUrl} />
    </div>
  );
};

export default TikTok;
