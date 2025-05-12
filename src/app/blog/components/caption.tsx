import Balancer from 'react-wrap-balancer';
import type { ReactNode } from 'react';

interface CaptionProps {
  children: ReactNode;
  large?: boolean;
}

export function Caption({ children, large = false }: CaptionProps) {
  return (
    <span
      className={`block w-full font-mono ${
        large
          ? 'text-[13px] text-muted-foreground/80'
          : 'text-xs text-muted-foreground'
      } my-3 text-center leading-normal`}
    >
      <Balancer>
        <span className="[&>a]:post-link">{children}</span>
      </Balancer>
    </span>
  );
}
