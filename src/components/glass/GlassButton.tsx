'use client';

import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

/**
 * GlassButton Component
 * 
 * Button with glass morphism effect and smooth hover animations.
 * Includes ripple effect and supports multiple visual variants.
 * 
 * @example
 * ```tsx
 * <GlassButton variant="primary" onClick={handleClick}>
 *   Click Me
 * </GlassButton>
 * ```
 */

export interface GlassButtonProps extends Omit<ButtonProps, 'variant'> {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  glassVariant?: 'primary' | 'glass' | 'outlined';
}

const StyledGlassButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'glassVariant',
})<GlassButtonProps>(({ theme, glassVariant = 'primary' }) => {
  // Base styles shared across all variants
  const baseStyles = {
    borderRadius: '12px',
    padding: '12px 32px',
    fontWeight: 600,
    textTransform: 'none' as const,
    fontSize: '1rem',
    lineHeight: 1.5,
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'background-color'],
      {
        duration: 200,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    ),
    
    // Accessibility: focus visible state
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  };

  // Variant-specific styles based on design-system.json
  const variants: Record<string, Record<string, unknown>> = {
    primary: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)',
      color: '#fff',
      border: '1px solid rgba(96, 165, 250, 0.3)',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
      '&:hover': {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 1) 100%)',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.6)',
        transform: 'translateY(-2px)',
        border: '1px solid rgba(96, 165, 250, 0.5)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 12px rgba(59, 130, 246, 0.4)',
      },
      '&.Mui-disabled': {
        background: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: '#fff',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
        border: '1px solid rgba(96, 165, 250, 0.4)',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(96, 165, 250, 0.2) inset',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      // Fallback for browsers without backdrop-filter
      '@supports not (backdrop-filter: blur(10px))': {
        background: 'rgba(10, 14, 26, 0.8)',
      },
    },
    outlined: {
      border: '2px solid rgba(96, 165, 250, 0.4)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      background: 'transparent',
      color: '#fff',
      '&:hover': {
        background: 'rgba(59, 130, 246, 0.15)',
        border: '2px solid rgba(96, 165, 250, 0.6)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
  };

  return {
    ...baseStyles,
    ...variants[glassVariant],
  };
});

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ glassVariant = 'primary', children, ...props }, ref) => {
    return (
      <StyledGlassButton
        ref={ref}
        glassVariant={glassVariant}
        disableElevation
        {...props}
      >
        {children}
      </StyledGlassButton>
    );
  }
);

GlassButton.displayName = 'GlassButton';
