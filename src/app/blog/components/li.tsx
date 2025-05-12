import type { ReactNode } from 'react';

interface LIProps {
  children: ReactNode;
}

export function LI({ children }: LIProps) {
  return (
    <li
      className={`
        my-2
        text-md
        text-muted-foreground

        [ul_&]:relative
        [ul_&]:before:text-gray-400
        [ul_&]:before:absolute

        [ol_&]:relative
        [ol_&]:before:text-gray-400
        [ol_&]:before:absolute
      `}
    >
      {children}
    </li>
  );
}
