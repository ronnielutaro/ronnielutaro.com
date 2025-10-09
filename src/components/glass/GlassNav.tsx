'use client';

import React, { useEffect, useState } from 'react';
import { AppBar, AppBarProps, styled } from '@mui/material';

/**
 * GlassNav Component
 * 
 * Navigation bar with glassmorphism effect and scroll-based styling.
 * Automatically adjusts opacity and blur on scroll for improved readability.
 * 
 * @example
 * ```tsx
 * <GlassNav>
 *   <Toolbar>
 *     <Typography variant="h6">My Site</Typography>
 *   </Toolbar>
 * </GlassNav>
 * ```
 */

export interface GlassNavProps extends AppBarProps {
  /**
   * Scroll threshold (in pixels) before applying scrolled state
   * @default 50
   */
  scrollThreshold?: number;
  /**
   * Enable automatic scroll detection
   * @default true
   */
  enableScrollEffect?: boolean;
}

const StyledGlassNav = styled(AppBar, {
  shouldForwardProp: (prop) => 
    prop !== 'scrollThreshold' && 
    prop !== 'enableScrollEffect' && 
    prop !== 'isScrolled',
})<GlassNavProps & { isScrolled?: boolean }>(({ theme, isScrolled = false }) => ({
  background: isScrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', // Safari support
  borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: isScrolled
    ? '0 4px 20px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'backdrop-filter'],
    {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  ),

  // Dark mode support
  ...(theme.palette.mode === 'dark' && {
    background: isScrolled
      ? 'rgba(30, 30, 30, 0.95)'
      : 'rgba(30, 30, 30, 0.7)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isScrolled
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  }),

  // Fallback for browsers without backdrop-filter
  '@supports not (backdrop-filter: blur(20px))': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(30, 30, 30, 0.98)'
      : 'rgba(255, 255, 255, 0.98)',
  },

  // Ensure content has proper z-index
  '& .MuiToolbar-root': {
    position: 'relative',
    zIndex: 1,
  },
}));

export const GlassNav = React.forwardRef<HTMLDivElement, GlassNavProps>(
  ({ 
    scrollThreshold = 50, 
    enableScrollEffect = true, 
    children, 
    ...props 
  }, ref) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      if (!enableScrollEffect) return;

      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > scrollThreshold);
      };

      // Initial check
      handleScroll();

      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrollThreshold, enableScrollEffect]);

    return (
      <StyledGlassNav
        ref={ref}
        position="sticky"
        isScrolled={isScrolled}
        scrollThreshold={scrollThreshold}
        enableScrollEffect={enableScrollEffect}
        elevation={0}
        {...props}
      >
        {children}
      </StyledGlassNav>
    );
  }
);

GlassNav.displayName = 'GlassNav';
