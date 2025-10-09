'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Toolbar,
  IconButton,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Menu as MenuIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  GlassCard,
  GlassButton,
  GlassInput,
  GlassChip,
  GlassNav,
} from './glass';

/**
 * GlassDemo Component
 * 
 * Interactive showcase of all Glass components.
 * Demonstrates features, variants, and use cases.
 */

export default function GlassDemo() {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState(['React', 'TypeScript', 'Next.js', 'MUI']);

  const handleChipDelete = (chipToDelete: string) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleAddChip = () => {
    if (inputValue.trim() && !chips.includes(inputValue.trim())) {
      setChips((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <Box>
      {/* Glass Navigation */}
      <GlassNav>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Glass Component Library
          </Typography>
          <GlassButton glassVariant="glass" size="small">
            Docs
          </GlassButton>
        </Toolbar>
      </GlassNav>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 4,
          paddingTop: 12,
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Hero Section */}
          <GlassCard glassVariant="gradient" sx={{ mb: 4, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom fontWeight={700}>
                Liquid Glass Components
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Premium glassmorphism UI components for modern web applications
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <GlassButton glassVariant="primary">
                  Get Started
                </GlassButton>
                <GlassButton glassVariant="outlined">
                  View on GitHub
                </GlassButton>
              </Stack>
            </CardContent>
          </GlassCard>

          {/* Button Variants */}
          <GlassCard glassVariant="light" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Button Variants
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Three distinct styles for different use cases
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                <GlassButton glassVariant="primary">
                  Primary Button
                </GlassButton>
                <GlassButton glassVariant="glass">
                  Glass Button
                </GlassButton>
                <GlassButton glassVariant="outlined">
                  Outlined Button
                </GlassButton>
                <GlassButton glassVariant="primary" disabled>
                  Disabled
                </GlassButton>
              </Stack>
            </CardContent>
          </GlassCard>

          {/* Card Variants */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} color="white" sx={{ mb: 2 }}>
              Card Variants
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassCard glassVariant="light">
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Light Variant
                    </Typography>
                    <Typography color="text.secondary">
                      Subtle glass effect with light background. Perfect for content cards.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassCard glassVariant="dark">
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Dark Variant
                    </Typography>
                    <Typography color="text.secondary">
                      Enhanced blur with darker tint. Great for overlays and modals.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassCard glassVariant="gradient">
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Gradient Variant
                    </Typography>
                    <Typography color="text.secondary">
                      Gradient background with maximum blur. Ideal for hero sections.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
            </Grid>
          </Box>

          {/* Input Fields */}
          <GlassCard glassVariant="dark" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Input Fields
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Glass-styled form inputs with smooth focus transitions
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassInput
                    fullWidth
                    label="Full Name"
                    placeholder="Enter your name"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassInput
                    fullWidth
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <GlassInput
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Tell us what you think..."
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassInput
                    fullWidth
                    label="Disabled Input"
                    disabled
                    value="Cannot edit this"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassInput
                    fullWidth
                    label="Error State"
                    error
                    helperText="This field is required"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </GlassCard>

          {/* Chips */}
          <GlassCard glassVariant="light" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Chips & Tags
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Interactive tags with hover effects and delete functionality
              </Typography>
              
              {/* Add Chip Input */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <GlassInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddChip()}
                  placeholder="Add a tag..."
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <GlassButton
                  glassVariant="primary"
                  onClick={handleAddChip}
                  startIcon={<AddIcon />}
                >
                  Add
                </GlassButton>
              </Stack>

              {/* Chip Display */}
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {chips.map((chip) => (
                  <GlassChip
                    key={chip}
                    label={chip}
                    onDelete={() => handleChipDelete(chip)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Stack>

              {/* Color Variants */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }} fontWeight={600}>
                Color Variants
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <GlassChip label="Default" />
                <GlassChip label="Primary" color="primary" />
                <GlassChip label="Secondary" color="secondary" />
                <GlassChip label="Success" color="success" />
                <GlassChip label="Error" color="error" />
                <GlassChip label="Warning" color="warning" />
              </Stack>
            </CardContent>
          </GlassCard>

          {/* Features Grid */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} color="white" sx={{ mb: 2 }}>
              Key Features
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <GlassCard glassVariant="gradient" enableHover>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      🎨 Modern Design
                    </Typography>
                    <Typography color="text.secondary">
                      Based on Apple&apos;s glassmorphism aesthetic with subtle blur effects
                      and translucent backgrounds.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <GlassCard glassVariant="gradient" enableHover>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      ⚡ Performance First
                    </Typography>
                    <Typography color="text.secondary">
                      All components render at 60fps with smooth transitions and zero
                      layout shifts.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <GlassCard glassVariant="gradient" enableHover>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      ♿ Fully Accessible
                    </Typography>
                    <Typography color="text.secondary">
                      Keyboard navigation, ARIA labels, and focus states built-in for
                      all interactive elements.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <GlassCard glassVariant="gradient" enableHover>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      🌙 Dark Mode Ready
                    </Typography>
                    <Typography color="text.secondary">
                      Automatic theme adaptation with graceful fallbacks for older
                      browsers.
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          <GlassCard glassVariant="dark" sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Built with ❤️ using Next.js, Material-UI, and TypeScript
              </Typography>
            </CardContent>
          </GlassCard>
        </Box>
      </Box>
    </Box>
  );
}
