import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  const variantStyles = {
    default: 'bg-white/10 text-white',
    outline: 'border text-white/70 border-white/20 hover:bg-white/5'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}