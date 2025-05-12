'use client';

import React, { useState, useEffect } from 'react';
import Grid from './grid';
import { MemoizedImage } from './memoized-image';

interface PhotoGridProps {
  images: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ images }) => {
  const [columns, setColumns] = useState(2); // Default to 2 columns

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        // lg breakpoint
        setColumns(3);
      } else {
        setColumns(2);
      }
    };

    // Initialize columns on component mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the number of full rows and adjust the images array
  const fullRows = Math.floor(images.length / columns);
  const numImagesToDisplay = fullRows * columns;
  const imagesToDisplay = images.slice(0, numImagesToDisplay);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 py-4">
      {imagesToDisplay.map((src, index) => (
        <div key={index} className="relative aspect-square">
          <MemoizedImage
            src={src}
            alt={`Photo ${index + 1}`}
            width={600}
            height={600}
            className="object-cover"
            // other props
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(PhotoGrid);
