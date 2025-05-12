import { ReactNode } from 'react';

interface OLProps {
  children: ReactNode;
}

export function OL({ children }: OLProps) {
  return (
    <ol className="my-5 list-decimal pl-8 space-y-1 text-muted-foreground">
      {children}
    </ol>
  );
}
