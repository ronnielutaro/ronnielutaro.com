import React from 'react';

/**
 * GlassButton Component
 * 
 * Button with glass morphism effect and smooth hover animations.
 * Supports multiple visual variants.
 * 
 * @example
 * ```tsx
 * <GlassButton glassVariant="primary" onClick={handleClick}>
 *   Click Me
 * </GlassButton>
 * ```
 */

export interface GlassButtonProps {
  children: React.ReactNode;
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  glassVariant?: 'primary' | 'glass' | 'outlined';
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Start icon element
   */
  startIcon?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  glassVariant = 'primary',
  size = 'medium',
  startIcon,
  onClick,
  className = '',
  disabled = false,
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-400/30 shadow-lg shadow-blue-500/40',
    glass: 'bg-white/5 backdrop-blur-xl text-white border border-white/15 shadow-lg',
    outlined: 'bg-transparent backdrop-blur-sm text-white border-2 border-blue-400/40',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const hoverVariants = {
    primary: 'hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/60 hover:-translate-y-0.5',
    glass: 'hover:bg-white/10 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5',
    outlined: 'hover:bg-blue-500/15 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5',
  };

  const baseClass = variants[glassVariant];
  const sizeClass = sizes[size];
  const hoverClass = hoverVariants[glassVariant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${baseClass} ${sizeClass} ${hoverClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
    </button>
  );
};

GlassButton.displayName = 'GlassButton';
