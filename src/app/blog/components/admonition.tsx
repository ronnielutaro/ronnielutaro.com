// src/app/blog/components/Admonition.tsx
import React from 'react';

interface AdmonitionProps {
  type: 'warning' | 'note' | 'tip' | 'info' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export function Admonition({ type, title, children }: AdmonitionProps) {
  const typeStyles: { [key: string]: string } = {
    note: 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-500',
    tip: 'bg-green-100 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-500',
    info: 'bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-500',
    warning:
      'bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-500',
    danger:
      'bg-red-100 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-500',
  };

  const iconMap: { [key: string]: string } = {
    note: 'ℹ️',
    tip: '💡',
    info: 'ℹ️',
    warning: '⚠️',
    danger: '❗',
  };

  return (
    <div className={`p-4 my-4 text-base ${typeStyles[type]}`}>
      <div className="flex">
        <div className="mr-3 text-xl">{iconMap[type]}</div>
        <div>
          {title && <h3>{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}
