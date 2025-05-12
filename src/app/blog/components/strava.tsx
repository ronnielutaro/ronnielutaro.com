'use client';

import React, { useEffect } from 'react';

interface StravaProps {
  activityId: string;
  styleType?: 'standard' | 'minimal';
}

const Strava: React.FC<StravaProps> = ({
  activityId,
  styleType = 'standard',
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://strava-embeds.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center my-6 rounded-2xl">
      <div
        className="strava-embed-placeholder w-full max-w-md rounded-2xl overflow-hidden border border-gray-300 shadow-md"
        data-embed-type="activity"
        data-embed-id={activityId}
        data-style={styleType}
      ></div>
    </div>
  );
};

export default Strava;
