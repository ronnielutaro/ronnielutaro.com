'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  KeyboardArrowDownOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Shorts', href: '/shorts' },
  { label: 'About', href: '/about' },
];

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Glassmorphism Navbar Container */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'fit-content',
        }}
      >
        {/* Glass Nav Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.5,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'rgba(255, 255, 255, 0.8)',
            }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuOutlined />
          </IconButton>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: isActive(item.href)
                    ? '#34d399'
                    : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: isActive(item.href) ? 600 : 400,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 2.5,
                  py: 1,
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Vertical Divider */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '1px',
              height: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              mx: 1,
            }}
          />

          {/* More Button */}
          <Button
            onClick={handleMoreClick}
            endIcon={<KeyboardArrowDownOutlined />}
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: '10px',
              '&:hover': {
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            More
          </Button>
        </Box>
      </Box>

      {/* More Menu Dropdown */}
      <Menu
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl)}
        onClose={handleMoreClose}
        PaperProps={{
          sx: {
            mt: 1,
            background: 'rgba(10, 14, 26, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <MenuItem
          onClick={handleMoreClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          Contact
        </MenuItem>
        <MenuItem
          onClick={handleMoreClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          Resume
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={pathname}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default Header;
