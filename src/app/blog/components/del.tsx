// Del.tsx
import React from 'react';

export const Del: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <del className="line-through text-gray-900 dark:text-[#fcfcfc]">
      {children}
    </del>
  );
};
