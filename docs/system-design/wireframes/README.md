# Wireframes & Mockups Summary

## Overview
This directory contains comprehensive JSON schema wireframes for the portfolio website, following Apple's Liquid Glass design aesthetic and utilizing Material-UI (MUI) components.

---

## Files in this Directory

### 1. **homepage.json**
Complete homepage wireframe with all sections:
- Hero section with animated gradient background
- About section with professional bio
- Featured work/projects grid
- Latest writing (blog preview)
- Professional journey timeline
- Newsletter signup CTA
- Footer with social links

**Key Features:**
- Glassmorphic cards throughout
- Smooth scroll interactions
- Responsive grid layouts
- Animated text and CTA buttons

---

### 2. **blog-listing.json**
Blog/Writing page with search and filtering:
- Hero section with page title
- Search bar with live filtering
- Category filter chips
- Sort dropdown (Latest, Oldest, Popular)
- Blog post grid (responsive 1-3 columns)
- Pagination or infinite scroll
- Newsletter CTA at bottom

**Key Features:**
- Live search functionality
- Multiple filter options
- Empty state handling
- Glass effect on all cards

---

### 3. **blog-post.json**
Individual blog post page with MDX support:
- Hero image with gradient overlay
- Reading progress bar
- Table of contents (desktop sidebar)
- Main article content with custom MDX components
- Social share sidebar (desktop)
- Mobile share actions (fixed bottom)
- Author bio section
- Related posts
- Newsletter signup
- Prev/Next post navigation

**Key Features:**
- Scroll-spy TOC
- Syntax highlighted code blocks
- Image lightbox/zoom
- Copy code button
- Deep linking to headings

---

### 4. **contact-page.json**
Contact page with form and alternative methods:
- Hero section
- Availability status badge
- Contact form with validation
- Alternative contact methods (cards)
- Email copy-to-clipboard
- LinkedIn, Twitter, GitHub links
- Schedule a call option
- FAQ accordion section

**Key Features:**
- Form validation (client & server)
- Character counter
- Success/error states
- Spam protection
- Glass effect cards

---

### 5. **mobile-navigation.json**
Mobile-specific navigation components:
- Mobile app bar with logo and actions
- Right-side drawer menu
- Theme toggle in drawer
- Social links in drawer
- Floating action button (scroll to top)

**Key Features:**
- Swipe to close gesture
- Backdrop blur
- Focus trap when open
- Smooth animations
- Selected state indicators

---

### 6. **design-system.json**
Complete design system specification:
- Color palette (primary, secondary, gradients)
- Dark mode configuration
- Typography scale
- Spacing system
- Border radius values
- Shadow definitions
- Transition timing
- Breakpoints
- Glass component specifications
- Animation library
- Responsive patterns
- Accessibility guidelines
- Performance optimizations

**Key Features:**
- Complete theme configuration
- MUI theme overrides
- Component variants
- Animation keyframes
- Accessibility standards

---

## Design Principles

### Liquid Glass Aesthetic
All wireframes follow Apple's Liquid Glass design style:
- **Frosted glass effects**: `backdrop-filter: blur(20px)`
- **Translucent backgrounds**: `rgba(255, 255, 255, 0.7)`
- **Subtle borders**: `1px solid rgba(255, 255, 255, 0.18)`
- **Soft shadows**: `0 8px 32px rgba(31, 38, 135, 0.15)`
- **Smooth transitions**: `300ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Gradient accents**: Purple to blue gradients
- **Rounded corners**: 12px - 24px border radius

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

## Design Tokens Reference

Quick reference for common values:

**Border Radius**
- Small: 8px
- Medium: 12px
- Large: 16px
- XL: 20px
- XXL: 24px

**Spacing**
- XS: 8px
- S: 16px
- M: 24px
- L: 32px
- XL: 48px
- XXL: 64px

**Glass Background**
- Light: `rgba(255, 255, 255, 0.6)`
- Medium: `rgba(255, 255, 255, 0.7)`
- Dark: `rgba(255, 255, 255, 0.8)`

**Blur**
- Light: 15px
- Medium: 20px
- Heavy: 30px

---

## Support & Questions

If wireframe specs are unclear:
1. Check `design-system.json` for component definitions
2. Review similar patterns in other wireframe files
3. Refer to MUI documentation for component APIs
4. Maintain consistency with Liquid Glass aesthetic

---

**Last Updated**: October 9, 2025
**Design Version**: 1.0.0
**Status**: Ready for Implementation
