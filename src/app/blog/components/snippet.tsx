import React, { ReactNode } from 'react';
import { Caption } from './caption';

interface SnippetProps {
  children: ReactNode;
  scroll?: boolean;
  caption?: string | null;
}

export const Snippet: React.FC<SnippetProps> = ({
  children,
  scroll = true,
  caption = null,
}) => (
  <div className="my-6">
    <pre
      className={`
      p-4
      text-sm
      bg-[#444] text-white
      dark:bg-[#222] dark:text-gray-300

      ${
        scroll
          ? 'overflow-scroll'
          : 'whitespace-pre-wrap break-all overflow-hidden'
      }
    `}
    >
      <code>{children}</code>
    </pre>

    {caption != null ? <Caption>{caption}</Caption> : null}
  </div>
);
