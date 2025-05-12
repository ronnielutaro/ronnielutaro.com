'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal';
import ShareButton from '@/components/share-button';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const MIN_ITEMS_TO_SHOW = 2;

const TableOfContents = React.memo(() => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(''); // New state to track the selected item
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const tocContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof document !== 'undefined') {
      const headers = Array.from(
        document.querySelector('article')?.querySelectorAll('h1, h2, h3, h4') ||
          [],
      );

      headers.forEach((header) => {
        header.classList.add('scroll-offset');
      });

      const tocItems = headers
        .map((header) => {
          // Grab the anchor which holds the id attribute.
          const anchor = header.querySelector('a[id]');
          const id = anchor?.getAttribute('id') || '';

          // Clone the header node so we can modify it without affecting the DOM.
          const clonedHeader = header.cloneNode(true) as Element;

          // Remove the anchor element (the auto-inserted hash) from the clone.
          const anchorInClone = clonedHeader.querySelector('a');
          if (anchorInClone) {
            anchorInClone.remove();
          }

          // Now extract text without the '#' from the anchor.
          const fullText = clonedHeader.textContent || '';
          const text = fullText.split('[#')[0].replace(/^#\s*/, '').trim();
          const level = parseInt(header.tagName[1]);

          return { id, text, level };
        })
        .filter((item) => item.id && item.text);

      setToc(tocItems);
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.querySelector(`a[id="${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        router.push(`#${id}`, { scroll: false });
        setSelectedId(id); // Update selectedId to track the user's selection
        setIsOpen(false);
      }
    },
    [router],
  );

  const generateNumbering = (tocItems: TOCItem[], index: number) => {
    const numberingArray: number[] = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i <= index; i++) {
      const { level } = tocItems[i];
      numberingArray[level - 1] += 1;
      for (let j = level; j < numberingArray.length; j++) {
        numberingArray[j] = 0;
      }
    }

    return numberingArray
      .filter((num) => num !== 0)
      .map((num) => `${num}.`)
      .join('');
  };

  useEffect(() => {
    if (isOpen && selectedId && tocContainerRef.current) {
      const selectedElement = tocContainerRef.current.querySelector(
        `a[href="#${selectedId}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'center' });
      }
    }
  }, [isOpen, selectedId]);

  if (!mounted) return null;

  return (
    <>
      {/* Render Table of Contents */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-full max-w-2xl px-6 sm:px-0 mx-auto mb-2 flex justify-end space-x-2">
          {toc.length >= MIN_ITEMS_TO_SHOW && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-2 shadow-2xl rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]"
              aria-label="Toggle table of contents"
            >
              {/* Menu Icon */}
              <svg
                data-testid="geist-icon"
                height="20"
                width="20"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          )}
          <ShareButton className="px-2 py-2 shadow-2xl !rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-2 py-2 shadow-2xl rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]"
            aria-label="Scroll to top"
          >
            {/* Scroll to Top Icon */}
            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M19.71,9.29l-7-7a1,1,0,0,0-1.42,0l-7,7a1,1,0,0,0,1.42,1.42L11,5.41V21a1,1,0,0,0,2,0V5.41l5.29,5.3a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,9.29Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={'Contents'}
          width="responsive"
          type="blur"
        >
          <div
            ref={tocContainerRef}
            className="overflow-y-auto max-h-[60vh] w-full py-2"
          >
            <ul className="space-y-2">
              {toc.map((item, index) => (
                <li
                  key={index}
                  style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block text-md transition-colors group ${
                      selectedId === item.id
                        ? 'text-[#DC70FF] hover:text-[#DC70FF]'
                        : 'text-gray-700 dark:text-[#999999] hover:text-gray-400 dark:hover:text-[#CCCCCC]'
                    }`}
                  >
                    <span
                      className={`opacity-50 ${
                        selectedId === item.id
                          ? 'text-gray-700 dark:text-[#999999]'
                          : 'text-current'
                      }`}
                    >
                      {generateNumbering(toc, index)}
                    </span>{' '}
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
});

TableOfContents.displayName = 'TableOfContents';

export { TableOfContents };
