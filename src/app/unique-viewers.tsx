'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface UniqueViewersProps {
  // Optional path override, if not provided will use current path
  path?: string;
}

const UniqueViewers: React.FC<UniqueViewersProps> = ({ path }) => {
  const [uniqueCount, setUniqueCount] = useState<number | null>(null);
  const pathname = usePathname();

  // Use provided path or current pathname
  const currentPath = path || pathname;

  // Track whether the user is pressing cmd and/or b
  const [isMetaDown, setIsMetaDown] = useState(false);
  const [isBDown, setIsBDown] = useState(false);

  // showCount is true only if BOTH cmd and b are pressed
  const showCount = isMetaDown && isBDown;

  useEffect(() => {
    async function fetchCount() {
      try {
        // Pass the current path as a query parameter
        const res = await fetch(
          `/api/viewers?path=${encodeURIComponent(currentPath)}`,
        );
        const data = await res.json();
        setUniqueCount(data.count);
      } catch (error) {
        console.error('Failed to fetch unique viewers:', error);
      }
    }
    fetchCount();
  }, [currentPath]); // Re-fetch when path changes

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // If Command key is pressed
      if (event.key === 'Meta') {
        setIsMetaDown(true);
      }

      // If "b" is pressed (case-insensitive just in case)
      if (event.key.toLowerCase() === 'b') {
        setIsBDown(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // If Command key is released
      if (event.key === 'Meta') {
        setIsMetaDown(false);
      }

      // If "b" is released
      if (event.key.toLowerCase() === 'b') {
        setIsBDown(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="font-mono text-xs text-[#555555] dark:text-[#B0AFB0]">
      {showCount ? (
        uniqueCount !== null ? (
          '(' + uniqueCount + ')'
        ) : (
          /* Skeleton loader if still fetching */
          <span className="inline-block w-10 h-3 bg-gray-200 dark:bg-[#2F2F2F] animate-pulse rounded" />
        )
      ) : null}
    </div>
  );
};

export default UniqueViewers;
