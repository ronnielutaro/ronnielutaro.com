# Liquid Glass Component Library

A premium collection of glassmorphism UI components built with Material-UI and TypeScript.

## 🎨 Design Philosophy

The Glass Component Library embraces Apple's glassmorphism aesthetic, featuring:
- **Translucent backgrounds** with backdrop blur effects
- **Smooth transitions** for all interactive states
- **Premium feel** through subtle shadows and refined animations
- **Accessibility-first** approach with keyboard navigation and ARIA support

## 📦 Components

### GlassCard

Versatile card component with three visual variants.

```tsx
import { GlassCard } from '@/components/glass';

<GlassCard variant="light">
  <CardContent>
    Your content here
  </CardContent>
</GlassCard>
```

**Variants:**
- `light` - Subtle glass effect (default)
- `dark` - Enhanced blur with darker tint
- `gradient` - Gradient background with maximum blur

**Props:**
- `variant?: 'light' | 'dark' | 'gradient'` - Visual variant
- `enableHover?: boolean` - Enable hover lift effect (default: true)
- Extends all MUI `CardProps`

### GlassButton

Button with glass morphism and smooth hover animations.

```tsx
import { GlassButton } from '@/components/glass';

<GlassButton variant="primary" onClick={handleClick}>
  Click Me
</GlassButton>
```

**Variants:**
- `primary` - Gradient background (default)
- `glass` - Frosted glass effect
- `outlined` - Bordered with backdrop blur

**Props:**
- `variant?: 'primary' | 'glass' | 'outlined'` - Visual variant
- Extends all MUI `ButtonProps`

### GlassInput

Text field with glass styling and smooth focus transitions.

```tsx
import { GlassInput } from '@/components/glass';

<GlassInput 
  label="Email" 
  type="email"
  placeholder="Enter your email"
/>
```

**Props:**
- Extends all MUI `TextFieldProps`
- Supports all standard input types, helper text, error states

### GlassChip

Chip/tag component with glass effect and interactive states.

```tsx
import { GlassChip } from '@/components/glass';

<GlassChip 
  label="React" 
  onDelete={handleDelete}
  color="primary"
/>
```

**Props:**
- Extends all MUI `ChipProps`
- Supports color variants, delete functionality, avatars, icons

### GlassNav

Navigation bar with automatic scroll-based styling.

```tsx
import { GlassNav } from '@/components/glass';

<GlassNav>
  <Toolbar>
    <Typography variant="h6">My Site</Typography>
  </Toolbar>
</GlassNav>
```

**Props:**
- `scrollThreshold?: number` - Scroll threshold in pixels (default: 50)
- `enableScrollEffect?: boolean` - Enable automatic scroll detection (default: true)
- Extends all MUI `AppBarProps`

## 🎯 Key Features

### Performance
- ⚡ All components render <16ms (60fps)
- 🚀 Zero layout shifts on hover
- 📦 Optimized bundle size with tree-shaking

### Accessibility
- ♿ Keyboard navigation support
- 🎯 ARIA labels and roles
- 👁️ Focus-visible states
- 🔊 Screen reader compatible

### Browser Support
- ✅ Modern browsers with backdrop-filter
- 🔄 Graceful fallbacks for older browsers
- 🌙 Full dark mode support
- 📱 Responsive on all screen sizes

## 🛠️ Technical Implementation

### Backdrop Filter
All glass components use `backdrop-filter: blur()` with fallbacks:

```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px); /* Safari */

/* Fallback */
@supports not (backdrop-filter: blur(20px)) {
  background: rgba(255, 255, 255, 0.95);
}
```

### Transitions
Smooth animations using cubic-bezier easing:

```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Theme Integration
Components automatically adapt to MUI theme:

```tsx
const StyledComponent = styled(BaseComponent)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.7)',
}));
```

## 📊 Best Practices

### Performance
- Use `enableHover={false}` on cards in long lists
- Limit backdrop-filter blur to 30px maximum
- Avoid nesting multiple glass components

### Accessibility
- Always provide meaningful labels for inputs
- Ensure sufficient color contrast (4.5:1 minimum)
- Test keyboard navigation flow
- Include focus-visible states

### Visual Design
- Use light variants on dark backgrounds
- Reserve gradient variant for hero sections
- Maintain consistent spacing (8px grid)
- Limit glass effect depth (max 2-3 layers)

## 🔧 Customization

### Using sx prop
```tsx
<GlassCard 
  variant="light"
  sx={{
    borderRadius: 4,
    padding: 3,
  }}
>
  Content
</GlassCard>
```

### Theme override
```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // Custom styles
        },
      },
    },
  },
});
```

## 📖 Examples

See `src/components/GlassDemo.tsx` for comprehensive examples including:
- Button variants and states
- Card layouts and variants
- Form inputs with validation
- Interactive chip management
- Scroll-responsive navigation

## 🎬 Demo

Run the development server to see all components in action:

```bash
npm run dev
```

Navigate to the Glass Demo page to interact with all component variants.

## 📚 References

- **Design System**: `docs/system-design/wireframes/design-system.json`
- **Theme Configuration**: `src/theme/theme.ts`
- **Issue Tracking**: GitHub Issue #84

## 🤝 Contributing

When adding new glass components:
1. Follow existing component structure
2. Include TypeScript types
3. Add JSDoc documentation
4. Support dark mode
5. Include accessibility features
6. Add to barrel exports
7. Update this README

## 📄 License

Part of the ronnielutaro.com project. See root LICENSE file.
