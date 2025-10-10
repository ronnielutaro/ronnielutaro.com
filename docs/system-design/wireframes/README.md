# Wireframes & Mockups Summary

## Overview
This directory contains comprehensive JSON schema wireframes for the portfolio website, following a **Premium Dark Glassmorphism** design aesthetic with intense blue light beams and emerald accent colors, built with Material-UI (MUI) components.

---

## Files in this Directory

### 1. **homepage.json** (v2.0.0)
Complete homepage wireframe with premium dark glassmorphism:
- Fixed centered glass navbar with emerald active states
- Hero section with animated blue light beams background
- Two-column layout: text left, portrait photo right
- Professional greeting and CTA button
- Skills showcase with rotating color chips
- About section with light glass card
- Featured work grid with dark glass cards

**Key Features:**
- Dark background (#06080f) with 4 animated blue light beams
- Emerald green (#34d399) accent color matching CTA buttons
- Glass components with precise blur and opacity values
- Responsive flexbox layout with strategic padding

---

### 2. **blog-listing.json** (v2.0.1)
Blog/Writing page with dark glassmorphism theme:
- Standardized navbar-v2 component with "Blog" highlighted
- Hero section with white text on transparent background
- Dark glass search and filter bar (sticky positioned)
- Category chips with blue theme and emerald active states
- Blog post grid with dark glass cards and blue hover effects
- Glass-styled pagination with emerald selected state

**Key Features:**
- Dark background (#06080f) with 2 animated blue light beams
- Consistent navbar reference across all breakpoints
- Dark glass components (rgba(255,255,255,0.05) background)
- Blue border accents with glow effects on hover

---

### 3. **blog-post.json** (v2.0.1)
Individual blog post page with dark glassmorphism and MDX:
- Standardized navbar-v2 component with "Blog" highlighted
- Hero image with dark gradient overlay matching theme
- Reading progress bar with blue accent color
- Table of contents in glass sidebar (desktop)
- Article content with dark-themed MDX components
- Dark glass social share components
- Author bio in glass card with blue borders
- Related posts grid with dark glass styling
- Glass-styled navigation (prev/next)

**Key Features:**
- Dark background (#06080f) consistent with site theme
- Glass components use new opacity values (0.05, 0.08)
- Blue accent colors (#3b82f6) for interactive elements
- Emerald highlights (#34d399) for CTAs and active states

---

### 4. **contact-page.json** (v2.0.0)
Contact page with premium dark glassmorphism styling:
- Standardized navbar-v2 component (Contact may be in More dropdown)
- Hero section with white text on dark transparent background
- Availability status badge with glass styling
- Contact form in large glass card with dark blur effects
- Alternative contact method cards with glass styling
- Social platform cards with platform-specific accent colors
- FAQ accordion with glass card styling
- All interactive elements use emerald green highlights

**Key Features:**
- Consistent dark background (#06080f) with site theme
- Glass form components with blue border focus states
- Success/error states with dark glass alert styling
- Copy-to-clipboard functionality with glass feedback

---

### 5. **mobile-navigation.json** (v2.0.0)
Mobile navigation with dark glassmorphism theme:
- Mobile app bar with dark glass background and blur effects
- Logo in solid white (no gradient) for dark theme
- Right-side drawer with dark glass backdrop
- Navigation items with emerald green active states
- Social links with platform colors on dark background
- Consistent glass styling with desktop navbar

**Key Features:**
- Dark glass app bar: rgba(255,255,255,0.05) with blur
- White text (#ffffff) and icons for dark theme
- Emerald (#34d399) active states matching desktop
- Blue border accents (rgba(255,255,255,0.1))
- Smooth glass transitions and backdrop blur

---

### 6. **design-system.json** (v2.0.0)
Complete Premium Dark Glassmorphism design system:
- Blue primary palette (#3b82f6, #2563eb, #60a5fa)
- Emerald accent colors (#34d399, #10b981) for CTAs
- Dark color scheme with #06080f background
- Animated blue light beams configuration (4 beams)
- Glass component variants (light, dark, gradient)
- Typography scale optimized for dark theme
- Spacing system and responsive breakpoints
- Comprehensive shadow system with dark + blue glow
- Button variants (primary blue, emerald, glass, outlined)
- Input and chip component specifications

**Key Features:**
- Complete v2.0.0 theme configuration for dark glassmorphism
- Light beam animations with precise positioning
- Glass component opacity values (0.05, 0.08, 0.4)
- Emerald green (#34d399) for active states and CTAs
- Blue accent system for borders and interactive elements

---

## Design Principles

### Premium Dark Glassmorphism Aesthetic
All wireframes follow a sophisticated dark glassmorphism design:
- **Dark Foundation**: `#06080f` almost-black background
- **Animated Light Beams**: 4 blue beams with gradients and rotations
- **Glass Components**: `backdrop-filter: blur(20px) saturate(180%)`
- **Glass Backgrounds**: `rgba(255, 255, 255, 0.05-0.08)` for dark theme
- **Blue Borders**: `rgba(96, 165, 250, 0.2-0.5)` with glow effects
- **Emerald Accents**: `#34d399` for CTAs and active states
- **Dark Shadows**: `0 8px 32px rgba(0, 0, 0, 0.4-0.6)` with inset highlights
- **Smooth Corners**: 16px - 24px border radius (increased from v1.0.0)

### MUI Component Mapping
Each wireframe specifies:
- `muiComponent`: The MUI component to use
- `styling`: Custom styles and overrides
- `variants`: Different visual variations
- `responsive`: Breakpoint-specific behavior

### Responsive Design
All wireframes include:
- Mobile (375px+)
- Tablet (768px+)
- Desktop (1280px+)
- Specific layout changes per breakpoint

---

## Implementation Notes

### Component Structure
Each wireframe follows this structure:
```
{
  "screenName": "Page Name",
  "screenId": "unique-id",
  "version": "1.0.0",
  "designSystem": "Liquid Glass + MUI",
  "viewport": { ... },
  "layout": {
    "sections": [
      {
        "id": "section-name",
        "component": "MUI Component",
        "styling": { ... },
        "content": { ... }
      }
    ]
  }
}
```

### Styling Properties
Common properties used:
- `background`: Color or gradient
- `backdropFilter`: Blur effect
- `borderRadius`: Corner rounding
- `boxShadow`: Elevation/shadow
- `padding`, `margin`: Spacing
- `hover`: Hover state styles
- `transition`: Animation timing

### State Management
Wireframes include states for:
- Loading states
- Success states
- Error states
- Empty states
- Hover states
- Selected states
- Focused states

---

## Usage Guidelines

### For Developers
1. Use these wireframes as the single source of truth for UI implementation
2. Match the MUI components specified
3. Apply the exact styling properties listed
4. Implement responsive breakpoints as defined
5. Follow the animation specifications
6. Ensure accessibility requirements are met

### For Designers
1. These represent the agreed-upon designs
2. Colors, spacing, and components are standardized
3. Any changes should be reflected in updated JSON files
4. New components should follow the Liquid Glass pattern

### For Product/QA
1. Use these to verify implementation accuracy
2. Check that all states are handled
3. Ensure responsive behavior matches specs
4. Validate accessibility compliance

---

## File Relationships

```
homepage.json ──┬──> blog-listing.json ──> blog-post.json
                │
                ├──> contact-page.json
                │
                └──> design-system.json (referenced by all)
                     
mobile-navigation.json (overlay on all pages)
```

---

## Next Steps

### Implementation Order
1. **Phase 1**: Set up design system from `design-system.json`
   - Create MUI theme
   - Build Liquid Glass components
   - Set up dark mode

2. **Phase 2**: Implement core layout
   - Navigation (desktop & mobile)
   - Footer
   - Page transitions

3. **Phase 3**: Build pages
   - Homepage
   - Blog listing
   - Blog post (MDX setup)
   - Contact page

4. **Phase 4**: Polish & optimize
   - Animations
   - Performance
   - Accessibility testing
   - Cross-browser testing

---

## Validation Checklist

Before considering a page "complete", verify:
- ✅ All MUI components match spec
- ✅ Glass effects applied correctly
- ✅ Responsive on all breakpoints
- ✅ Dark mode implemented
- ✅ Hover states work
- ✅ Animations smooth (60fps)
- ✅ Accessibility (keyboard, screen reader)
- ✅ Loading/error states handled
- ✅ Color contrast meets WCAG AA
- ✅ Performance optimized

---

## Design Tokens Reference (v2.0.0)

Quick reference for Premium Dark Glassmorphism values:

**Colors (Primary)**
- Blue Primary: `#3b82f6`
- Blue Light: `#60a5fa` 
- Blue Dark: `#2563eb`
- Emerald Accent: `#34d399`
- Emerald Dark: `#10b981`

**Colors (Background)**
- Base Dark: `#06080f`
- Secondary Dark: `#0a0e1a`
- Text White: `#ffffff`
- Text Light: `rgba(255, 255, 255, 0.7)`

**Glass Components (Dark Theme)**
- Light Glass: `rgba(255, 255, 255, 0.05)`
- Medium Glass: `rgba(255, 255, 255, 0.08)`
- Dark Glass: `rgba(10, 14, 26, 0.4)`
- Glass Border: `rgba(255, 255, 255, 0.1-0.18)`
- Blue Border: `rgba(96, 165, 250, 0.2-0.5)`

**Border Radius (Increased)**
- Small: 10px
- Medium: 16px  
- Large: 20px
- XL: 24px (standard for glass cards)

**Blur Effects**
- Standard: `blur(20px) saturate(180%)`
- Heavy: `blur(24px) saturate(200%)`
- Light Beams: `blur(90px-100px)`

**Spacing (Unchanged)**
- XS: 8px
- S: 16px  
- M: 24px
- L: 32px
- XL: 48px
- XXL: 64px

---

## Support & Questions

If wireframe specs are unclear:
1. Check `design-system.json` for component definitions
2. Review similar patterns in other wireframe files
3. Refer to MUI documentation for component APIs
4. Maintain consistency with Liquid Glass aesthetic

---

**Last Updated**: October 10, 2025
**Design Version**: 2.0.0
**Theme**: Premium Dark Glassmorphism with Blue Light Beams
**Status**: Updated & Ready for Implementation

### Recent Updates (v2.0.0)
- ✅ Migrated from Liquid Glass to Premium Dark Glassmorphism
- ✅ Updated color palette to blue primary + emerald accents  
- ✅ Added animated blue light beams background system
- ✅ Standardized navbar across all wireframes (navbar-v2)
- ✅ Increased glass component border radius (16px-24px)
- ✅ Enhanced shadows with dark theme + blue glow effects
- ✅ Created centralized component specifications
