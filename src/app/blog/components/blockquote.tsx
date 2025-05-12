import type { ReactNode } from 'react';

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-5 text-md text-muted-foreground pl-3 border-l-4 dark:border-[#888888]">
      {children}
    </blockquote>
  );
}
