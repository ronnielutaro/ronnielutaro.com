'use client';

import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { useThemeMode } from '@/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeDemo() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6}>
        {/* Header */}
        <Box textAlign="center">
          <Typography variant="h1" gutterBottom>
            Liquid Glass Theme
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Apple-inspired glassmorphic design system
          </Typography>
          <Button
            variant="contained"
            onClick={toggleTheme}
            startIcon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            sx={{ mt: 2 }}
          >
            Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Box>

        {/* Typography Scale */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom>
            Typography Scale
          </Typography>
          <Stack spacing={2}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="body1">
              Body 1: This is body text with comfortable line height for reading longer paragraphs.
            </Typography>
            <Typography variant="body2">
              Body 2: Slightly smaller body text for secondary content.
            </Typography>
            <Typography variant="caption" display="block">
              Caption: Small text for labels and captions
            </Typography>
          </Stack>
        </Paper>

        {/* Color Palette */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom>
            Color Palette
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Box
              sx={{
                width: 120,
                height: 80,
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText',
                fontWeight: 600,
              }}
            >
              Primary
            </Box>
            <Box
              sx={{
                width: 120,
                height: 80,
                bgcolor: 'secondary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'secondary.contrastText',
                fontWeight: 600,
              }}
            >
              Secondary
            </Box>
            <Box
              sx={{
                width: 120,
                height: 80,
                bgcolor: 'accent.copper',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              Copper
            </Box>
            <Box
              sx={{
                width: 120,
                height: 80,
                bgcolor: 'accent.gold',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              Gold
            </Box>
          </Stack>
        </Paper>

        {/* Button Variants */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom>
            Button Variants
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Stack>
        </Paper>

        {/* Spacing & Border Radius */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom>
            Spacing & Shadows
          </Typography>
          <Stack spacing={3}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              Elevation 1 (small shadow)
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Elevation 2 (medium shadow)
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              Elevation 3 (large shadow)
            </Box>
          </Stack>
        </Paper>

        {/* Success Message */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            ✨ Theme Successfully Configured!
          </Typography>
          <Typography variant="body1">
            The Liquid Glass design system is now active. All MUI components inherit this beautiful, cohesive theme.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}
