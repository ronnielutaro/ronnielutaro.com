// Grid.tsx
import React from 'react';

interface GridProps {
  columns: number; // Number of columns
  gap?: string; // Gap between grid items
  className?: string; // Additional classes for customization
  children: React.ReactNode; // Grid content
}

const Grid: React.FC<GridProps> = ({
  columns,
  gap = 'gap-1',
  className = 'sm:grid-cols-2 lg:grid-cols-3',
  children,
}) => {
  return (
    <div
      className={`grid ${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(Grid);
