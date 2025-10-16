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
          <div className="relative w-full transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <ExportedImage
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
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