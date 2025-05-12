'use client';

import React, { useEffect, useState } from 'react';

export function InlineCode({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const isInlineCode = !className;
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (!isInlineCode) {
      (async () => {
        const hljs = (await import('highlight.js')).default;

        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block as HTMLElement);
        });

        // Mark highlighting as complete
        setIsHighlighted(true);
      })();
    }
  }, [isInlineCode]);

  if (isInlineCode) {
    return (
      <code className="font-mono rounded-xl text-sm px-1 py-0.5 rounded">
        {children}
      </code>
    );
  }

  return (
    <pre
      className={`
        text-sm text-white
        overflow-x-scroll rounded-xl transition-opacity
        ${isHighlighted ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <code className={className}>{children}</code>
    </pre>
  );
}
