'use client';

import React from 'react';
import { Chip, ChipProps, styled } from '@mui/material';

/**
 * GlassChip Component
 * 
 * Chip/tag component with glass morphism effect.
 * Perfect for categories, tags, or status indicators.
 * 
 * @example
 * ```tsx
 * <GlassChip label="React" />
 * <GlassChip label="TypeScript" onDelete={handleDelete} />
 * ```
 */

export type GlassChipProps = ChipProps;

const StyledGlassChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(102, 126, 234, 0.15)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)', // Safari support
  border: '1px solid rgba(102, 126, 234, 0.3)',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1),
  height: 'auto',
  minHeight: '32px',
  transition: theme.transitions.create(
    ['transform', 'box-shadow', 'background-color'],
    {
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  ),

  // Fallback for browsers without backdrop-filter
  '@supports not (backdrop-filter: blur(10px))': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(102, 126, 234, 0.3)'
      : 'rgba(102, 126, 234, 0.2)',
  },

  // Label styling
  '& .MuiChip-label': {
    padding: theme.spacing(0.75, 1.5),
    color: theme.palette.mode === 'dark' 
      ? theme.palette.primary.light 
      : theme.palette.primary.dark,
    fontWeight: 600,
  },

  // Clickable chips
  '&.MuiChip-clickable': {
    cursor: 'pointer',

    '&:hover': {
      background: 'rgba(102, 126, 234, 0.25)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },

    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(102, 126, 234, 0.2)',
    },

    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  },

  // Delete icon styling
  '& .MuiChip-deleteIcon': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    fontSize: '1.125rem',
    transition: theme.transitions.create(['color', 'transform'], {
      duration: 150,
    }),

    '&:hover': {
      color: theme.palette.primary.dark,
      transform: 'scale(1.2)',
    },
  },

  // Avatar styling (if used)
  '& .MuiChip-avatar': {
    width: '24px',
    height: '24px',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },

  // Icon styling (if used)
  '& .MuiChip-icon': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },

  // Disabled state
  '&.Mui-disabled': {
    opacity: 0.5,
    background: theme.palette.action.disabledBackground,
    border: `1px solid ${theme.palette.action.disabled}`,
    
    '& .MuiChip-label': {
      color: theme.palette.action.disabled,
    },
  },

  // Color variants
  '&.MuiChip-colorPrimary': {
    background: 'rgba(102, 126, 234, 0.2)',
    borderColor: 'rgba(102, 126, 234, 0.4)',
  },

  '&.MuiChip-colorSecondary': {
    background: 'rgba(118, 75, 162, 0.2)',
    borderColor: 'rgba(118, 75, 162, 0.4)',
    
    '& .MuiChip-label': {
      color: theme.palette.mode === 'dark'
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark,
    },
  },

  '&.MuiChip-colorSuccess': {
    background: 'rgba(76, 175, 80, 0.2)',
    borderColor: 'rgba(76, 175, 80, 0.4)',
    
    '& .MuiChip-label': {
      color: theme.palette.success.dark,
    },
  },

  '&.MuiChip-colorError': {
    background: 'rgba(244, 67, 54, 0.2)',
    borderColor: 'rgba(244, 67, 54, 0.4)',
    
    '& .MuiChip-label': {
      color: theme.palette.error.dark,
    },
  },

  '&.MuiChip-colorWarning': {
    background: 'rgba(255, 152, 0, 0.2)',
    borderColor: 'rgba(255, 152, 0, 0.4)',
    
    '& .MuiChip-label': {
      color: theme.palette.warning.dark,
    },
  },
}));

export const GlassChip = React.forwardRef<HTMLDivElement, GlassChipProps>(
  (props, ref) => {
    return (
      <StyledGlassChip
        ref={ref}
        {...props}
      />
    );
  }
);

GlassChip.displayName = 'GlassChip';
