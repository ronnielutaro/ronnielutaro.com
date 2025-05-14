'use client';

import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import { YouTube } from '@/app/blog/components/youtube';
import Image from 'next/image';

interface MemoizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export const MemoizedYouTube = memo(function MemoizedYouTube({
  videoId,
  title,
  className = '',
}: MemoizedYouTubeProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const scrollPositionRef = React.useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    scrollPositionRef.current = window.scrollY || window.pageYOffset;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';

    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: 'instant',
    });
  }, []);

  // Handle click outside
  useEffect(() => {
    // No need for complex event handlers, using the onClick prop directly on the overlay div
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen, closeModal]);

  // Use the high quality thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      <div
        className={`cursor-pointer ${className} h-24 min-w-[10.5rem] max-w-[10.5rem] overflow-hidden flex-shrink-0`}
        onClick={openModal}
      >
        <Image
          src={thumbnailUrl || '/placeholder.svg'}
          alt={title}
          width={420}
          height={236}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#fcfcfc]/45 backdrop-blur-lg dark:bg-[#222222]/45 flex justify-center items-center z-50 transition-colors duration-300 youtube-modal-overlay"
          onClick={(e) => {
            // Only close if the click is directly on the overlay background
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full h-full max-w-4xl max-h-[calc(100vh-4rem)] flex items-center justify-center"
          >
            <YouTube videoId={videoId} />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 dark:bg-[#333] dark:text-white bg-black border dark:border-[#4B4B4B] text-white p-2 px-6 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
});
