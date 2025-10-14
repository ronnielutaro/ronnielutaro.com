import React from 'react';

/**
 * GlassChip Component
 * 
 * Chip/tag component with glass morphism effect.
 * Perfect for categories, tags, or status indicators.
 * 
 * @example
 * ```tsx
 * <GlassChip label="React" />
 * <GlassChip label="TypeScript" color="secondary" />
 * ```
 */

export interface GlassChipProps {
  /**
   * The content of the chip
   */
  label: string;
  /**
   * Color variant
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Size variant
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const GlassChip: React.FC<GlassChipProps> = ({
  label,
  color = 'primary',
  size = 'medium',
  onClick,
  className = '',
}) => {
  const colors = {
    primary: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    secondary: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    success: 'bg-green-500/20 text-green-300 border-green-400/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    error: 'bg-red-500/20 text-red-300 border-red-400/30',
  };

  const sizes = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
  };

  const colorClass = colors[color];
  const sizeClass = sizes[size];
  const clickableClass = onClick ? 'cursor-pointer hover:scale-105 hover:-translate-y-0.5' : '';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center rounded-full font-medium backdrop-blur-sm border transition-all duration-200 ${colorClass} ${sizeClass} ${clickableClass} ${className}`}
    >
      {label}
    </span>
  );
};

GlassChip.displayName = 'GlassChip';
