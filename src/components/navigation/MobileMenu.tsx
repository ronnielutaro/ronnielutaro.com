'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  Switch,
} from '@mui/material';
import {
  CloseOutlined,
  HomeOutlined,
  CreateOutlined,
  EmailOutlined,
  Brightness4Outlined,
  LinkedIn,
  GitHub,
  Twitter,
} from '@mui/icons-material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

// Icon mapping for nav items
const navIcons: Record<string, React.ReactElement> = {
  Home: <HomeOutlined />,
  Writing: <CreateOutlined />,
  Contact: <EmailOutlined />,
};

// Styled Drawer with glass effect
const GlassDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '80vw',
    maxWidth: '320px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
    ...(theme.palette.mode === 'dark' && {
      background: 'rgba(30, 30, 30, 0.95)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    }),
    '@supports not (backdrop-filter: blur(30px))': {
      background: theme.palette.mode === 'dark' 
        ? 'rgba(30, 30, 30, 0.98)'
        : 'rgba(255, 255, 255, 0.98)',
    },
  },
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },
}));

// Styled list item with active state
const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: '12px',
  marginBottom: '8px',
  padding: '12px 16px',
  transition: 'all 0.2s ease',
  ...(active && {
    background: 'rgba(102, 126, 234, 0.15)',
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
  '&:hover': {
    background: active 
      ? 'rgba(102, 126, 234, 0.25)' 
      : theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(102, 126, 234, 0.08)',
    transform: 'translateX(4px)',
  },
}));

// Social icon button
const SocialIconButton = styled(IconButton)(() => ({
  background: 'rgba(102, 126, 234, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.2)',
    transform: 'scale(1.1)',
  },
}));

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  navItems,
  currentPath,
  isDarkMode = false,
  onThemeToggle,
}) => {
  const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  const handleNavClick = () => {
    // Close drawer after navigation
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <GlassDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px 16px',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Menu
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label="Close menu"
          size="small"
          sx={{
            '&:hover': {
              transform: 'rotate(90deg)',
              transition: 'transform 0.3s ease',
            },
          }}
        >
          <CloseOutlined />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List sx={{ padding: '16px 8px', flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <StyledListItemButton
                active={isActive}
                onClick={handleNavClick}
              >
                <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                  {navIcons[item.label] || <HomeOutlined />}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 600,
                  }}
                />
              </StyledListItemButton>
            </Link>
          );
        })}
      </List>

      <Divider sx={{ margin: '16px 20px' }} />

      {/* Theme Section */}
      {onThemeToggle && (
        <Box sx={{ padding: '16px 20px' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              letterSpacing: '0.5px',
              marginBottom: '12px',
              display: 'block',
            }}
          >
            APPEARANCE
          </Typography>
          <Card
            sx={{
              background: 'rgba(102, 126, 234, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Brightness4Outlined color="primary" />
                <Typography variant="body2" fontWeight={600}>
                  Dark Mode
                </Typography>
              </Box>
              <Switch
                checked={isDarkMode}
                onChange={onThemeToggle}
                color="primary"
                inputProps={{ 'aria-label': 'Toggle dark mode' }}
              />
            </Box>
          </Card>
        </Box>
      )}

      {/* Social Section */}
      <Box sx={{ padding: '16px 20px' }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            display: 'block',
          }}
        >
          CONNECT
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
          <Link
            href="https://linkedin.com/in/ronnielutaro"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <SocialIconButton
              aria-label="LinkedIn"
              sx={{
                color: '#0077B5',
              }}
            >
              <LinkedIn />
            </SocialIconButton>
          </Link>
          <Link
            href="https://github.com/ronnielutaro"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <SocialIconButton
              aria-label="GitHub"
              sx={{
                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#333',
              }}
            >
              <GitHub />
            </SocialIconButton>
          </Link>
          <Link
            href="https://twitter.com/ronnielutaro"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <SocialIconButton
              aria-label="Twitter"
              sx={{
                color: '#1DA1F2',
              }}
            >
              <Twitter />
            </SocialIconButton>
          </Link>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: '16px 20px',
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2025 Ronnie Lutaro
        </Typography>
      </Box>
    </GlassDrawer>
  );
};

export default MobileMenu;
