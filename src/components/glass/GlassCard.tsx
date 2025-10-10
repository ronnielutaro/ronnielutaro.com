'use client';

import React from 'react';
import { Card, CardProps, styled } from '@mui/material';

/**
 * GlassCard Component
 * 
 * A card component with frosted glass effect (glassmorphism aesthetic).
 * Uses backdrop-filter for blur with graceful fallbacks.
 * 
 * @example
 * ```tsx
 * <GlassCard variant="light">
 *   <CardContent>Your content here</CardContent>
 * </GlassCard>
 * ```
 */

export interface GlassCardProps extends Omit<CardProps, 'variant'> {
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
}

const StyledGlassCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'glassVariant' && prop !== 'enableHover',
})<GlassCardProps>(({ theme, glassVariant = 'light', enableHover = true }) => {
  // Variant configurations based on design-system.json
  const variants: Record<string, { background: string; backdropFilter: string; border: string }> = {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    dark: {
      background: theme.palette.mode === 'dark' 
        ? 'rgba(10, 14, 26, 0.4)' 
        : 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(28px) saturate(200%)',
      border: theme.palette.mode === 'dark'
        ? '1px solid rgba(96, 165, 250, 0.2)'
        : '1px solid rgba(59, 130, 246, 0.25)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
      backdropFilter: 'blur(32px) saturate(200%)',
      border: '1px solid rgba(96, 165, 250, 0.25)',
    },
  };

  const variantStyle = variants[glassVariant];

  return {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px',
    padding: theme.spacing(3),
    background: variantStyle.background,
    backdropFilter: variantStyle.backdropFilter,
    WebkitBackdropFilter: variantStyle.backdropFilter, // Safari support
    border: variantStyle.border,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'border', 'background'],
      {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    ),

    // Fallback for browsers without backdrop-filter support
    '@supports not (backdrop-filter: blur(15px))': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(10, 14, 26, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    },

    // Hover effect - Match reference's bright glow
    ...(enableHover && {
      '&:hover': {
        transform: 'translateY(-6px)',
        background: glassVariant === 'gradient' 
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)'
          : 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(96, 165, 250, 0.5)',
        boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(96, 165, 250, 0.3) inset',
      },
    }),

    // Ensure content is accessible
    '& *': {
      position: 'relative',
      zIndex: 1,
    },
  };
});

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ glassVariant = 'light', enableHover = true, children, ...props }, ref) => {
    return (
      <StyledGlassCard
        ref={ref}
        glassVariant={glassVariant}
        enableHover={enableHover}
        elevation={0}
        {...props}
      >
        {children}
      </StyledGlassCard>
    );
  }
);

GlassCard.displayName = 'GlassCard';
