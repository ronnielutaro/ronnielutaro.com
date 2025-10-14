import React from 'react';

/**
 * GlassCard Component
 * 
 * A card component with frosted glass effect (glassmorphism aesthetic).
 * Uses backdrop-filter for blur with graceful fallbacks.
 * 
 * @example
 * ```tsx
 * <GlassCard glassVariant="light">
 *   Your content here
 * </GlassCard>
 * ```
 */

export interface GlassCardProps {
  children: React.ReactNode;
  /**
   * Visual variant of the glass effect
   * @default 'light'
   */
  glassVariant?: 'light' | 'dark' | 'gradient';
  /**
   * Enable hover lift effect
   * @default true
   */
  enableHover?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glassVariant = 'light',
  enableHover = true,
  className = '',
}) => {
  const variants = {
    light: 'bg-white/5 border-white/20',
    dark: 'bg-slate-900/40 border-blue-400/20',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-indigo-700/5 border-blue-400/25',
  };

  const baseClass = variants[glassVariant];
  const hoverClass = enableHover
    ? 'hover:shadow-2xl hover:-translate-y-1.5 hover:border-blue-400/50 transition-all duration-300'
    : '';

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl shadow-lg ${baseClass} ${hoverClass} ${className}`}
      style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset' }}
    >
      {children}
    </div>
  );
};

GlassCard.displayName = 'GlassCard';
