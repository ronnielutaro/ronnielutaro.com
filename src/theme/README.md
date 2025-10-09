# Theme System

The Liquid Glass Theme System for ronnielutaro.com - an Apple-inspired glassmorphic design built on Material-UI.

## Overview

This theme system provides a cohesive, professional design foundation with:

- **Light & Dark Mode** with smooth transitions
- **Responsive Typography** that scales across devices
- **Custom Color Palette** inspired by Apple's Liquid Glass aesthetic
- **Predefined Shadows** for glassmorphic effects
- **Component Overrides** for MUI components

## Quick Start

### Using the Theme

The theme is automatically applied via the `ThemeProvider` in `src/app/layout.tsx`:

```tsx
import ThemeProvider from "@/theme/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Toggling Dark Mode

Use the `useThemeMode` hook in any component:

```tsx
'use client';

import { useThemeMode } from '@/theme';
import { Button } from '@mui/material';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  
  return (
    <Button onClick={toggleTheme}>
      {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

## Design Tokens

### Colors

#### Primary Palette
- `primary.main`: #667eea (Purple-blue gradient start)
- `primary.light`: #8e9ff5
- `primary.dark`: #4d5fd1

#### Secondary Palette
- `secondary.main`: #764ba2 (Purple gradient end)
- `secondary.light`: #9169b8
- `secondary.dark`: #5a3a7d

#### Accent Colors
- `accent.copper`: #d4a574
- `accent.gold`: #f4a460

#### Neutral Grays
- `neutral.50` through `neutral.900` for flexible gray usage

### Typography

The theme uses a responsive typography scale:

- **H1**: 2.5rem (mobile) → 4rem (desktop)
- **H2**: 2rem (mobile) → 3rem (desktop)
- **H3**: 1.75rem (mobile) → 2.25rem (desktop)
- **Body1**: 1.125rem (18px) - comfortable reading size
- **Body2**: 1rem (16px) - standard body text

All headings use the primary font family (Inter) with optimized weights and letter-spacing.

### Spacing

Based on an 8px grid system. Access via the `theme.spacing()` function:

```tsx
sx={{ 
  padding: 2,      // 16px (2 * 8px)
  margin: 3,       // 24px (3 * 8px)
  gap: 4,          // 32px (4 * 8px)
}}
```

### Border Radius

- `small`: 8px
- `medium`: 12px (default)
- `large`: 16px
- `xlarge`: 20px
- `xxlarge`: 24px

Access via `theme.shape.borderRadius` or use `borderRadius` prop with numeric values.

### Shadows

Predefined shadow elevations for glassmorphic effects:

- **elevation1** (index 1): Subtle shadow for cards
- **elevation2** (index 2): Medium shadow for floating elements
- **elevation3** (index 3): Prominent shadow for modals
- **glassSoft** (index 5): Soft glassmorphic shadow
- **glass** (index 6): Standard glassmorphic shadow
- **glow** (index 7): Colored glow effect

### Transitions

Consistent timing and easing:

- **duration.standard**: 300ms (default)
- **duration.short**: 250ms
- **duration.shorter**: 200ms
- **easing.easeInOut**: cubic-bezier(0.4, 0, 0.2, 1)

## Component Overrides

### Buttons

All buttons include:
- No text transform (preserves casing)
- 12px border radius
- 600 font weight
- Smooth hover transitions with lift effect

### Cards

- 20px border radius for premium feel
- Smooth transitions on all state changes

### Text Fields

- 12px border radius
- Hover background tint
- Focused state with highlighted border

## Using with MUI Components

### Example: Glass Card

```tsx
import { Card, CardContent } from '@mui/material';

<Card 
  elevation={6}  // Uses 'glass' shadow
  sx={{
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  }}
>
  <CardContent>
    Glassmorphic card content
  </CardContent>
</Card>
```

### Example: Gradient Button

```tsx
import { Button } from '@mui/material';

<Button
  variant="contained"
  sx={{
    background: (theme) => 
      `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    '&:hover': {
      background: (theme) =>
        `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    },
  }}
>
  Gradient Button
</Button>
```

## Dark Mode

Dark mode automatically adjusts:

- Background colors (default: #121212, paper: #1e1e1e)
- Text colors (high contrast for accessibility)
- All component variants
- Saved to localStorage for persistence

The theme respects system preferences on first load, then saves user choice.

## TypeScript Support

Custom theme tokens are fully typed. Import theme types:

```tsx
import { Theme } from '@mui/material/styles';

// Access custom properties with full autocomplete
const MyComponent = ({ theme }: { theme: Theme }) => (
  <div style={{ color: theme.palette.accent.copper }} />
);
```

## Files

- `src/theme/theme.ts` - Theme configuration and creation
- `src/theme/ThemeProvider.tsx` - Provider component with dark mode logic
- `src/theme/theme.d.ts` - TypeScript type extensions
- `src/theme/index.ts` - Barrel export

## Best Practices

1. **Always use theme tokens** instead of hardcoded colors
2. **Use the spacing function** for consistent layout
3. **Leverage component sx prop** for theme-aware styling
4. **Test in both light and dark modes**
5. **Use semantic color names** (primary, secondary) over specific colors

## Accessibility

The theme is designed for WCAG AA compliance:

- Minimum color contrast ratios met (4.5:1 for normal text)
- Focus indicators visible on all interactive elements
- Respects `prefers-reduced-motion` (implement in components)
- Semantic color usage for meaningful UI states

## Performance

- Theme is memoized to prevent unnecessary recalculations
- Dark mode preference cached in localStorage
- No flash of unstyled content (FOUC) protection built-in
- CSS-in-JS optimized with Emotion

---

**Built with veteran engineering practices** 🚀
