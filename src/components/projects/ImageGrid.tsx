'use client';

import React from 'react';
import ExportedImage from 'next-image-export-optimizer';

interface ImageGridProps {
  columns: 1 | 2 | 3;
  images: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ columns, images }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-8`}>
      {images.map((image, index) => (
        <div key={index} className="space-y-3">
          <div 
            className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
              height: '300px',
            }}
          >
            <ExportedImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              style={{ borderRadius: '16px' }}
            />
          </div>
          <p className="text-sm text-white/70 text-center italic">
            {image.caption}
          </p>
        </div>
      ))}
    </div>
  );
};