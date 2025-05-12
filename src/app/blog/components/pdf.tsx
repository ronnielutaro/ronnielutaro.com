'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Caption } from './caption';
import { FileText } from 'lucide-react';

interface PDFViewerProps {
  file: string;
  caption?: string | null;
}

const PDF: React.FC<PDFViewerProps> = ({ file, caption = null }) => {
  const [iframeSrc, setIframeSrc] = useState<string>('about:blank');

  useEffect(() => {
    // Set the iframe source to the actual file after the component has mounted
    setIframeSrc(file);
  }, [file]);

  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden">
        <Link href={file} target="_blank" rel="noopener noreferrer">
          <div className="w-full aspect-[4/5] rounded-sm bg-gray-100 dark:bg-[#0F0F0F] border dark:border-[#252525] flex flex-col items-center justify-center">
            <FileText className="h-10 w-10 text-gray-600 dark:text-[#999999] mb-2" />
            <span className="font-mono text-sm text-gray-600 dark:text-[#999999] text-center">
              {caption && (
                <>
                  <span className="mb-2">{caption}</span>
                  <br />
                </>
              )}
              (click to open)
            </span>
          </div>
        </Link>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="w-full aspect-[4/5]" tabIndex={-1}>
          <iframe
            src={iframeSrc}
            className="w-full h-full"
            frameBorder="0"
            scrolling="auto"
            tabIndex={-1}
            aria-hidden="true"
            loading="lazy"
          />
        </div>
        {caption && <Caption>{caption}</Caption>}
      </div>
    </div>
  );
};

export default PDF;
