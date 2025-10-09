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
      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #5a6fd8 30%, #684090 90%)',
        boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
      },
      '&.Mui-disabled': {
        background: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)', // Safari support
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.35)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      // Fallback for browsers without backdrop-filter
      '@supports not (backdrop-filter: blur(10px))': {
        background: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.8)',
      },
    },
    outlined: {
      border: '2px solid rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-2px)',
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
