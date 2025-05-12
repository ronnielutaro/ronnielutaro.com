import React from 'react';

type TooltipProps = {
  message: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  children: React.ReactNode;
};

const TooltipWrapper: React.FC<TooltipProps> = ({
  message,
  position = 'top',
  children,
}) => (
  <div className="relative group">
    {children}
    <div
      className={`absolute opacity-0 pointer-events-none
        z-[1000] p-2 max-w-[180px] min-w-120px sm:max-w-[200px] sm:min-w-[150px] bg-black text-white dark:bg-white dark:text-black text-xs rounded py-1 px-2 shadow-lg
        group-hover:opacity-100 font-normal group-hover:pointer-events-auto transition-all duration-500
        ${
          position === 'top'
            ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
            : ''
        }
        ${
          position === 'left'
            ? 'right-full top-1/2 transform -translate-y-1/2 mr-4'
            : ''
        }
        `}
    >
      {message}
    </div>
  </div>
);

export default TooltipWrapper;
