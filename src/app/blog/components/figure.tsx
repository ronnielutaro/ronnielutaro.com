import { ReactNode } from 'react';

interface FigureProps {
  wide?: boolean;
  children: ReactNode;
}

export function Figure({ wide = false, children }: FigureProps) {
  return (
    <div
      className={`
        text-center
        ${
          wide
            ? `
              bg-gray-100
              dark:bg-[#222222]
              relative
              before:bg-gray-100
              before:dark:bg-[#222222]
              before:w-[10000%]
              before:h-[100%]
              before:content-[""]
              before:top-[0]
              before:left-[-1000px]
              before:absolute
              before:z-[-1]
            `
            : ''
        }
      `}
    >
      {children}
    </div>
  );
}
