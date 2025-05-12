'use client';

import React from 'react';
import { LinkedInEmbed } from 'react-social-media-embed';

interface LinkedInProps {
  postUrl: string; // Full URL of the LinkedIn post
}

const LinkedIn: React.FC<LinkedInProps> = ({ postUrl }) => {
  return (
    <div className="flex justify-center my-6">
      <div className="w-full max-w-lg rounded-lg overflow-hidden border border-gray-300 shadow-md">
        <LinkedInEmbed url={postUrl} width="100%" />
      </div>
    </div>
  );
};

export default LinkedIn;
