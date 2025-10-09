# Portfolio Website Feature Specification

## Project Overview

A personal portfolio website for a Product Manager | Software Engineer showcasing professional work, blog posts, and insights. The site features Apple's Liquid Glass design aesthetic with dynamic content capabilities.

---

## Design Philosophy: Apple Liquid Glass Style

### Visual Characteristics

- **Frosted Glass Effects**: Translucent backgrounds with blur effects (backdrop-filter: blur)
- **Depth & Layering**: Multi-layered UI with subtle shadows and elevation
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Light & Shadow Play**: Dynamic lighting effects that respond to user interaction
- **Minimalist Color Palette**: Neutral backgrounds with accent colors
- **Typography**: Clean, modern sans-serif fonts (SF Pro Display/Text style)
- **Glassmorphism Cards**: Content cards with semi-transparent backgrounds
- **Subtle Gradients**: Soft, mesh-like gradient backgrounds
- **Rounded Corners**: Consistent border-radius for a softer feel
- **Hover States**: Elegant hover effects with color shifts and glow

---

## Core Pages & Features

### 1. Home Page (Landing Page)

#### 1.1 Hero Section

- **Full-screen Hero**
  - Animated gradient mesh background with liquid glass overlay
  - Professional headshot with glassmorphic border/frame
  - Dynamic typing animation for tagline: "Product Manager | Software Engineer"
  - Animated subheading about your mission/philosophy
  - CTA buttons with glass effect:
    - "View My Work" → Smooth scroll to featured projects
    - "Read My Thoughts" → Navigate to blog
    - "Get In Touch" → Navigate to contact

#### 1.2 About Section

- **Who I Am**
  - Brief professional summary highlighting:
    - Product Manager with 4+ years of product work + software engineering background
    - Translating user needs into Products people deeply love and care about
    - Work at StartHub supporting 10+ founders from idea to market
    - Running customer discovery, translating insights into requirements and features
    - Closing the loop with post-launch iteration
  - **Featured Project: Rocketize**
    - Side project building intelligent tools for Marketing Teams
    - Streamlining operations & campaigns efficiency
    - Reducing waste & maximizing Return On Ad Spend
    - End-to-end product cycles showcase
  - Core competencies displayed as animated glass tags/pills:
    - Product Management
    - Customer Discovery
    - Feature Development
    - Post-Launch Iteration
    - Software Engineering
    - Marketing Tech
  - Skills visualization with progress indicators or animated icons

#### 1.3 Featured Work Section

- **Project Showcase**
  - 3-6 featured projects in a masonry/grid layout
  - Each project card with:
    - Glass effect container
    - Project thumbnail/cover image with parallax effect
    - Project title and brief description
    - Tech stack tags
    - Hover effect revealing more details
    - Link to detailed case study (future feature)
  - "View All Projects" CTA

#### 1.4 Latest Writing Section

- **Blog Preview**
  - Display 3 most recent blog posts
  - Card-based layout with glass effect
  - Each card includes:
    - Featured image (if available)
    - Post title
    - Excerpt (150 characters)
    - Reading time estimate
    - Publication date
    - Category/tags
    - Hover animation with subtle lift effect
  - "Read More Posts" CTA to Writing page

#### 1.5 Professional Journey Timeline

- **Interactive Timeline**
  - Vertical/horizontal scrollable timeline
  - Key career milestones with glass effect nodes
  - Smooth animations as user scrolls
  - Expandable details for each milestone
  - Icons/logos for companies/organizations

#### 1.6 Newsletter Signup Teaser

- **Embedded Signup Form**
  - Glass effect container
  - Compelling copy: "Get insights delivered to your inbox"
  - Email input with validation
  - Subscribe button with loading state
  - Success/error feedback messages

#### 1.7 Footer

- **Site Footer**
  - Social media links (LinkedIn, GitHub, Twitter, etc.) with glass icons
  - Quick navigation links
  - Copyright information
  - "Back to Top" smooth scroll button
  - Optional: Current location/timezone

---

### 2. Writing (Blog) Page

#### 2.1 Blog Header

- **Page Title & Description**
  - Large heading: "Writing & Thoughts"
  - Subheading about your writing philosophy
  - Glass effect hero banner

#### 2.2 Filter & Search

- **Content Discovery**
  - Search bar with live filtering (glass design)
  - Category filter chips (Product Management, Engineering, Lessons, Stories, Projects)
  - Tag cloud or tag filter
  - Sort options (Latest, Popular, Oldest)
  - Results count indicator

#### 2.3 Blog Post Grid

- **Post Listings**
  - Responsive grid layout (1-3 columns based on screen size)
  - Glass effect cards for each post
  - Card contents:
    - Featured image with gradient overlay
    - Category badge
    - Post title (hover effect)
    - Excerpt/summary
    - Author info (name, avatar)
    - Publication date
    - Reading time
    - Engagement metrics (optional: views, likes)
  - Pagination or infinite scroll
  - Smooth loading animations

#### 2.4 Individual Blog Post Page (MDX)

- **Post Content Display**
  - Hero section with featured image and gradient overlay
  - Post metadata bar (date, reading time, category, tags)
  - Table of contents (sticky sidebar on desktop)
  - MDX-rendered content with:
    - Custom styled headings
    - Code syntax highlighting
    - Embedded media (images, videos, tweets)
    - Interactive components (demos, charts)
    - Pull quotes with glass styling
    - Callout boxes (info, warning, success)
  - Progress indicator (scroll depth)
  - Share buttons (Twitter, LinkedIn, Copy Link) with glass effect
  - Author bio section at the end
  - Related posts section
  - Newsletter signup CTA
  - Comments section (optional: using Giscus or similar)

#### 2.5 Blog Post Features

- **Content Enhancements**
  - Reading progress bar
  - Estimated reading time
  - Copy code button for code blocks
  - Image zoom on click (lightbox)
  - Automatic heading IDs for deep linking
  - Prev/Next post navigation
  - Social share metadata (Open Graph, Twitter Cards)

---

### 3. Contact Page

#### 3.1 Contact Hero

- **Page Introduction**
  - Engaging headline: "Let's Build Something Together"
  - Subheading about collaboration opportunities
  - Glass effect background

#### 3.2 Contact Form

- **Primary Contact Method**
  - Glass effect form container
  - Form fields:
    - Name (required)
    - Email (required, validated)
    - Subject/Topic dropdown (General, Collaboration, Speaking, Consulting)
    - Message (textarea, required)
  - Character count for message
  - Submit button with loading state
  - Success confirmation with animation
  - Error handling with helpful messages
  - Form validation (client-side and server-side)
  - Spam protection (honeypot or reCAPTCHA)

#### 3.3 Alternative Contact Methods

- **Contact Options**
  - Glass effect cards displaying:
    - Email address (click to copy)
    - LinkedIn profile link
    - Twitter/X handle
    - GitHub profile
    - Optional: Calendly link for booking calls
  - Each with icon and hover effect

#### 3.4 Availability Status

- **Current Status Indicator**
  - Dynamic status badge (Available, Busy, Open to Opportunities)
  - Brief note about current availability
  - Response time expectation

#### 3.5 FAQ Section (Optional)

- **Common Questions**
  - Accordion-style FAQ with glass effect
  - Questions about:
    - Speaking engagements
    - Consulting services
    - Collaboration opportunities
    - Response times

---

### 4. Newsletter Feature

#### 4.1 Newsletter Landing Section

- **Dedicated Newsletter Page** (Optional standalone page)
  - Hero explaining the newsletter value proposition
  - Sample topics/themes you cover
  - Publishing frequency
  - Subscriber count (social proof)
  - Archive of past newsletters (if public)

#### 4.2 Newsletter Signup Component

- **Reusable Signup Widget**
  - Can be embedded on:
    - Homepage
    - End of blog posts
    - Dedicated newsletter page
    - Footer
  - Email input with validation
  - Optional: Name field
  - Privacy policy link
  - Double opt-in confirmation
  - Welcome email automation

#### 4.3 Newsletter Management

- **Backend Integration**
  - Integration with email service (Mailchimp, ConvertKit, Buttondown, or custom)
  - Subscriber management
  - Analytics tracking (signup rate, sources)
  - GDPR compliance features (unsubscribe, data export)

---

## Technical Features

### 5. Performance & SEO

#### 5.1 Performance Optimization

- **Speed & Efficiency**
  - Next.js App Router with Server Components
  - Image optimization with next/image
  - Lazy loading for below-fold content
  - Code splitting by route
  - Prefetching for instant navigation
  - Caching strategies (ISR, SSG where applicable)
  - Font optimization (next/font)
  - Lighthouse score target: 90+

#### 5.2 SEO Optimization

- **Search Engine Visibility**
  - Dynamic meta tags per page
  - Open Graph tags for social sharing
  - Twitter Card metadata
  - Structured data (JSON-LD) for articles
  - XML sitemap generation
  - robots.txt configuration
  - Canonical URLs
  - Alt text for all images
  - Semantic HTML structure

#### 5.3 Analytics & Monitoring

- **User Insights**
  - Google Analytics 4 or alternative (Plausible, Umami)
  - Page view tracking
  - Event tracking (CTA clicks, form submissions)
  - Reading time analytics for blog posts
  - Error monitoring (Sentry or similar)

---

### 6. Content Management

#### 6.1 MDX Blog System

- **Content Creation**
  - MDX files stored in `/content/blog/` directory
  - Frontmatter for metadata (title, date, excerpt, tags, featured image)
  - Custom MDX components for rich content
  - Syntax highlighting for code (Prism or Shiki)
  - Image handling with captions
  - Embedded components (CodePen, YouTube, Twitter)

#### 6.2 Content Organization

- **File Structure**
  - Posts organized by date or category
  - Asset management for images
  - Draft/published status
  - Featured posts flag
  - Series/collection support (multi-part posts)

#### 6.3 RSS Feed

- **Syndication**
  - Auto-generated RSS feed for blog posts
  - Atom feed support
  - Feed discovery links in HTML

---

### 7. Design System & Components

#### 7.1 Liquid Glass Component Library

- **Reusable Components**
  - GlassCard: Base card component with blur effect
  - GlassButton: Primary and secondary button variants
  - GlassInput: Form input with glass styling
  - GlassNavbar: Navigation with scroll effects
  - GlassModal: Dialog/modal with backdrop blur
  - GlassTag: Pill-shaped tags for categories/skills
  - GlassSection: Full-width section with gradient backgrounds
  - AnimatedText: Text reveal animations
  - ParallaxImage: Images with parallax effect

#### 7.2 Animation Library

- **Motion Design**
  - Framer Motion integration for smooth animations
  - Scroll-triggered animations
  - Page transition animations
  - Hover micro-interactions
  - Loading skeletons with glass effect
  - Stagger animations for lists

#### 7.3 Theme System

- **Color Modes**
  - Light mode with bright glass effects
  - Dark mode with darker glass/tinted overlays
  - System preference detection
  - Theme toggle with smooth transition
  - Persistent user preference (localStorage)

---

### 8. Responsive Design

#### 8.1 Mobile-First Approach

- **Device Compatibility**
  - Responsive breakpoints (mobile, tablet, desktop, large screens)
  - Touch-friendly interactions
  - Mobile navigation (hamburger menu with glass effect)
  - Optimized typography scales
  - Performance optimization for mobile

#### 8.2 Cross-Browser Support

- **Browser Compatibility**
  - Modern browsers (Chrome, Firefox, Safari, Edge)
  - Graceful degradation for older browsers
  - Fallbacks for backdrop-filter (where not supported)

---

### 9. Accessibility (a11y)

#### 9.1 WCAG Compliance

- **Inclusive Design**
  - Keyboard navigation support
  - Focus indicators visible on all interactive elements
  - Sufficient color contrast (4.5:1 minimum)
  - ARIA labels for icon-only buttons
  - Semantic HTML elements
  - Skip to main content link
  - Screen reader tested

#### 9.2 User Preferences

- **Accessibility Options**
  - Respect prefers-reduced-motion
  - Respect prefers-color-scheme
  - Adjustable font sizes
  - No auto-playing media

---

### 10. Security & Privacy

#### 10.1 Security Features

- **Protection Measures**
  - HTTPS only
  - Content Security Policy (CSP)
  - Form input sanitization
  - Rate limiting on contact form
  - Environment variable protection
  - Secure headers (Next.js config)

#### 10.2 Privacy

- **User Data Protection**
  - Privacy policy page
  - Cookie consent (if using analytics)
  - GDPR compliance for newsletter
  - No unnecessary data collection
  - Clear data usage explanations

---

## Future Enhancements (Phase 2)

### 11.1 Advanced Features

- **Potential Additions**
  - Case studies for projects (detailed portfolio items)
  - Now page (what you're currently working on)
  - Uses page (tools, software, hardware you use)
  - Bookshelf/Reading list
  - Podcast/Speaking appearances section
  - Testimonials/Recommendations
  - Interactive resume/CV download
  - Search functionality across all content
  - Content recommendation engine
  - Email course or mini-courses
  - Webmentions for comments
  - Integration with Notion for content management

### 11.2 Experimental Features

- **Cutting-Edge Ideas**
  - AI-powered content suggestions
  - 3D elements with Three.js
  - Advanced animations with GSAP
  - Voice-activated navigation
  - AR business card (QR code)

---

## Tech Stack Summary

### Core Technologies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) + Custom Liquid Glass components
- **Styling**: Emotion (CSS-in-JS) + Tailwind CSS (utility classes)
- **Content**: MDX for blog posts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend or Nodemailer
- **Newsletter**: Buttondown, ConvertKit, or Mailchimp
- **Analytics**: Vercel Analytics or Plausible
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

### Development Tools

- **Package Manager**: npm or pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky (optional)

---

## Success Metrics

### Key Performance Indicators

1. **Performance**: Lighthouse score >90
2. **SEO**: Ranking for personal name + key topics
3. **Engagement**: Average session duration >2 minutes
4. **Newsletter**: Steady subscriber growth
5. **Blog**: Regular publishing cadence (1-2 posts/month)
6. **Accessibility**: WCAG AA compliance

---

## Development Phases

### Phase 1: Foundation (Weeks 1-2)

- Design system setup with Liquid Glass components
- Homepage structure and hero section
- Basic navigation and footer
- Theme system (light/dark mode)

### Phase 2: Core Pages (Weeks 3-4)

- Complete homepage with all sections
- Contact page with working form
- Basic blog listing page
- MDX setup and first blog post

### Phase 3: Blog Enhancement (Week 5)

- Individual blog post template
- Search and filter functionality
- Reading progress indicator
- Social sharing

### Phase 4: Polish & Launch (Week 6)

- Newsletter integration
- SEO optimization
- Performance tuning
- Analytics setup
- Final testing and deployment

### Phase 5: Iteration (Ongoing)

- Content creation
- User feedback implementation
- Feature additions based on analytics
- Continuous improvement

---

## Content Strategy

### Initial Content Needs

- **Homepage**:
  - Professional bio based on LinkedIn summary
  - Tagline: "Product Manager with 4+ years of product work and a software engineering background"
  - Mission: "I translate user needs into Products they deeply love and care about"
  - Featured projects: Rocketize + 2-5 other projects from StartHub work
- **Blog**:
  - Initial topics: Product management insights, lessons from supporting founders, Rocketize development journey
  - 3-5 initial posts for launch covering thoughts, projects, lessons & stories
- **About**:
  - StartHub experience and founder support work
  - Rocketize project deep-dive
  - Product + engineering dual expertise narrative
- **Projects**:
  - Rocketize case study (intelligent marketing tools)
  - StartHub founder success stories
  - Other notable product/engineering projects
- **Images**: Professional headshot, Rocketize screenshots, blog featured images

---

## Brand Identity

### Visual Elements

- **Color Palette**:
  - Primary: Sophisticated blue/purple gradient
  - Secondary: Warm accent (copper/gold)
  - Neutrals: Light grays, deep charcoals
  - Glass tints: Subtle white/blue overlays
- **Typography**:
  - Headings: Bold, modern sans-serif
  - Body: Readable sans-serif (Inter, SF Pro, or similar)
  - Code: Monospace (JetBrains Mono, Fira Code)
- **Logo/Wordmark**: Personal branding (initials or full name)

---

## Conclusion

This feature specification provides a comprehensive roadmap for building a modern, elegant portfolio website that showcases your dual expertise as a Product Manager and Software Engineer. The Liquid Glass design aesthetic will set your site apart while maintaining excellent usability and performance. The MDX-based blog system will give you flexibility for rich, technical content, and the newsletter feature will help build an engaged audience around your insights and experiences.

**Next Steps**:

1. Review and prioritize features
2. Create wireframes/mockups for key pages
3. Set up design system and component library
4. Begin Phase 1 development
