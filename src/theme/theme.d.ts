/**
 * MUI Theme Type Extensions
 * Extends Material-UI theme types with custom Liquid Glass design tokens
 */

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontFamilyCode: string;
  }

  interface TypographyVariantsOptions {
    fontFamilyCode?: string;
  }

  interface Palette {
    accent: {
      copper: string;
      gold: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      copper: string;
      gold: string;
    };
    neutral?: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface TypeBackground {
    glass?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    glass: true;
  }
}

export {};
