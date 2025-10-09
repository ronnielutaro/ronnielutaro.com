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
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    dark: {
      background: theme.palette.mode === 'dark' 
        ? 'rgba(30, 30, 30, 0.7)' 
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(25px)',
      border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.1)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
  };

  const variantStyle = variants[glassVariant];

  return {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '20px',
    padding: theme.spacing(3),
    background: variantStyle.background,
    backdropFilter: variantStyle.backdropFilter,
    WebkitBackdropFilter: variantStyle.backdropFilter, // Safari support
    border: variantStyle.border,
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    transition: theme.transitions.create(
      ['transform', 'box-shadow'],
      {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    ),

    // Fallback for browsers without backdrop-filter support
    '@supports not (backdrop-filter: blur(15px))': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(30, 30, 30, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    },

    // Hover effect
    ...(enableHover && {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(31, 38, 135, 0.2)',
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
