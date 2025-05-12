import { ReactNode } from 'react';
import { withHeadingId } from './utils';

interface HeadingProps {
  children: ReactNode; // Ensures children can be any valid React element
}

export function H2({ children }: HeadingProps) {
  return (
    <h2 className="group font-semibold my-3 text-2xl relative dark:text-gray-100">
      {withHeadingId(children)}
    </h2>
  );
}
