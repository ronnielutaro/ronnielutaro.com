'use client';

import React, { useEffect, useState } from 'react';
import ShareButton from './share-button'; // Assuming ShareButton component is in the same directory
import { useRouter } from 'next/navigation';

const BottomBar = () => {
  const router = useRouter();
  const [buttonText, setButtonText] = useState('Back to Blog'); // Default button text

  // Determine the button text based on window.history.length
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setButtonText(window.history.length > 2 ? 'Back' : 'Back to Blog');
    }
  }, []);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();
    } else {
      router.push('/blog');
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-2xl mt-10 mb-5 md:mb-10">
      <button
        onClick={handleBack}
        className="inline-flex items-center font-mono text-sm uppercase hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
      >
        &larr; {buttonText}
      </button>
      <ShareButton />
    </div>
  );
};

export default BottomBar;
