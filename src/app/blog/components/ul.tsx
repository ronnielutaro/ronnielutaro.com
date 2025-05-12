import { ReactNode } from 'react';

interface ULProps {
  children: ReactNode;
}

export function UL({ children }: ULProps) {
  return (
    <ul className="my-5 list-disc pl-8 space-y-1 text-muted-foreground">
      {children}
    </ul>
  );
}
