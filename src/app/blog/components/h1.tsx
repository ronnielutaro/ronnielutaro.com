import { withHeadingId } from './utils';
import type { ReactNode } from 'react';

interface H1Props {
  children?: ReactNode;
}

// Refactored H1 component using StyledH1
export function H1({ children }: H1Props) {
  return (
    <h1 className="text-3xl font-semibold dark:text-gray-100">
      {withHeadingId(children)}
    </h1>
  );
}
