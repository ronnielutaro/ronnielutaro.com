'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Header } from '@/components/navigation';
import { useThemeMode } from '@/theme/ThemeProvider';

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * Client Layout Wrapper
 * 
 * Wraps the app with navigation header and provides theme context
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <>
      <Header 
        onThemeToggle={toggleTheme} 
        isDarkMode={mode === 'dark'} 
      />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        {children}
      </Box>
    </>
  );
}
