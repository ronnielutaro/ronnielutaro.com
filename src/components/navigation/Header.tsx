'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MenuOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

// Styled AppBar with glass effect
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ...(theme.palette.mode === 'dark' && {
    background: 'rgba(30, 30, 30, 0.7)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }),
  '@supports not (backdrop-filter: blur(20px))': {
    background: theme.palette.mode === 'dark' 
      ? 'rgba(30, 30, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
  },
}));

// Logo with gradient text
const Logo = styled(Typography)(() => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Desktop nav button with active state
const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: active 
    ? theme.palette.primary.main 
    : theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(0, 0, 0, 0.87)',
  fontWeight: active ? 700 : 600,
  textTransform: 'none',
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '12px',
  position: 'relative',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(102, 126, 234, 0.08)',
    transform: 'translateY(-2px)',
  },
  ...(active && {
    background: 'rgba(102, 126, 234, 0.15)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: '3px',
      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
      borderRadius: '2px 2px 0 0',
    },
  }),
}));

// Theme toggle button
const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(102, 126, 234, 0.1)',
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.2)',
    transform: 'rotate(180deg)',
  },
}));

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Smooth scroll for anchor links
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <GlassAppBar 
        position="sticky" 
        elevation={isScrolled ? 2 : 0}
        sx={{
          opacity: isScrolled ? 1 : 0.98,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: '64px', md: '72px' } }}>
            {/* Logo */}
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Logo variant="h6">
                {isMobile ? 'RL' : 'Ronnie Lutaro'}
              </Logo>
            </Link>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    passHref 
                    style={{ textDecoration: 'none' }}
                  >
                    <NavButton
                      active={isActiveRoute(item.href)}
                      onClick={(e) => handleNavClick(item.href, e)}
                    >
                      {item.label}
                    </NavButton>
                  </Link>
                ))}
              </Box>
            )}

            {/* Theme Toggle - Desktop */}
            {!isMobile && onThemeToggle && (
              <ThemeToggleButton
                onClick={onThemeToggle}
                aria-label="Toggle theme"
                sx={{ ml: 2 }}
              >
                {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
              </ThemeToggleButton>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {onThemeToggle && (
                  <ThemeToggleButton
                    onClick={onThemeToggle}
                    aria-label="Toggle theme"
                    size="small"
                  >
                    {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                  </ThemeToggleButton>
                )}
                <IconButton
                  onClick={handleMobileMenuToggle}
                  aria-label="Open menu"
                  sx={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: 'primary.main',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.2)',
                    },
                  }}
                >
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </GlassAppBar>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        navItems={navItems}
        currentPath={pathname}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />
    </>
  );
};

export default Header;
