'use client';

import React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';

/**
 * GlassInput Component
 * 
 * Text input field with glass morphism styling.
 * Features smooth focus transitions and accessible states.
 * 
 * @example
 * ```tsx
 * <GlassInput 
 *   label="Email" 
 *   type="email"
 *   placeholder="Enter your email"
 * />
 * ```
 */

export type GlassInputProps = TextFieldProps;

const StyledGlassInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    borderRadius: '12px',
    transition: theme.transitions.create(
      ['background-color', 'box-shadow'],
      {
        duration: 200,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    ),

    // Fallback for browsers without backdrop-filter
    '@supports not (backdrop-filter: blur(10px))': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(30, 30, 30, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    },

    // Default fieldset (border)
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      borderWidth: '1px',
      transition: theme.transitions.create(['border-color', 'border-width'], {
        duration: 200,
      }),
    },

    // Hover state
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : '#fff',
      
      '& fieldset': {
        borderColor: 'rgba(102, 126, 234, 0.5)',
      },
    },

    // Focused state
    '&.Mui-focused': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : '#fff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',

      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
    },

    // Error state
    '&.Mui-error': {
      '& fieldset': {
        borderColor: theme.palette.error.main,
      },

      '&:hover fieldset': {
        borderColor: theme.palette.error.dark,
      },

      '&.Mui-focused': {
        boxShadow: `0 0 0 3px ${theme.palette.error.main}33`,

        '& fieldset': {
          borderColor: theme.palette.error.main,
        },
      },
    },

    // Disabled state
    '&.Mui-disabled': {
      background: theme.palette.action.disabledBackground,
      backdropFilter: 'none',

      '& fieldset': {
        borderColor: theme.palette.action.disabled,
      },
    },
  },

  // Label styling
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontWeight: 500,

    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },

  // Input text styling
  '& .MuiOutlinedInput-input': {
    padding: '14px 16px',
    fontSize: '1rem',
    color: theme.palette.text.primary,

    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.6,
    },
  },

  // Helper text styling
  '& .MuiFormHelperText-root': {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    fontSize: '0.875rem',

    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
}));

export const GlassInput = React.forwardRef<HTMLDivElement, GlassInputProps>(
  (props, ref) => {
    return (
      <StyledGlassInput
        ref={ref}
        variant="outlined"
        {...props}
      />
    );
  }
);

GlassInput.displayName = 'GlassInput';
