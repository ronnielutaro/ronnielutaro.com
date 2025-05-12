'use client';

import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramProps {
  postUrl: string; // Full URL of the Instagram post
  size?: 'large' | 'small'; // Size prop with options 'full' or 'half'
}

const Instagram: React.FC<InstagramProps> = ({ postUrl, size = 'large' }) => {
  return (
    <div className="flex justify-center items-center my-6 rounded-lg">
      <div className="w-full justify-center">
        <InstagramEmbed
          url={postUrl}
          className={`h-auto mx-auto ${size === 'small' ? 'w-1/2' : 'w-full'}`}
        />
      </div>
    </div>
  );
};

export default Instagram;
