'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  CardContent,
} from '@mui/material';
// Using Box-based CSS grid for layout to avoid Grid API differences
import {
  GlassCard,
  GlassButton,
  GlassChip,
} from '@/components/glass';

export default function Home() {
  const [chips] = useState(['Product Management', 'Customer Discovery', 'Feature Development', 'Post-Launch Iteration', 'Software Engineering', 'Marketing Tech']);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#06080f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Premium Blue Light Beams - Exact Reference Style */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Main Diagonal Light Streak - Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: '-30%',
            right: '-15%',
            width: '1400px',
            height: '1400px',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.9) 0%, rgba(59,130,246,0.6) 15%, rgba(59,130,246,0.3) 35%, rgba(59,130,246,0) 60%)',
            filter: 'blur(100px)',
            transform: 'rotate(-35deg)',
            animation: 'glow1 15s ease-in-out infinite',
            '@keyframes glow1': {
              '0%, 100%': { opacity: 0.7 },
              '50%': { opacity: 1 },
            },
          }}
        />
        
        {/* Secondary Diagonal Streak - Bottom Left */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '1200px',
            height: '1200px',
            background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.8) 0%, rgba(37,99,235,0.5) 15%, rgba(37,99,235,0.2) 35%, rgba(37,99,235,0) 60%)',
            filter: 'blur(90px)',
            transform: 'rotate(35deg)',
            animation: 'glow2 18s ease-in-out infinite',
            '@keyframes glow2': {
              '0%, 100%': { opacity: 0.6 },
              '50%': { opacity: 0.9 },
            },
          }}
        />

        {/* Accent Light - Center */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(96,165,250,0.4) 0%, rgba(96,165,250,0) 50%)',
            filter: 'blur(120px)',
            animation: 'pulse 10s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.3,
              },
              '50%': { 
                transform: 'translate(-50%, -50%) scale(1.2)',
                opacity: 0.6,
              },
            },
          }}
        />

        {/* Sharp Beam Effect - Diagonal */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '20%',
            width: '1000px',
            height: '4px',
            background: 'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.6) 50%, rgba(59,130,246,0) 100%)',
            filter: 'blur(3px)',
            transform: 'rotate(-45deg)',
            boxShadow: '0 0 40px rgba(59,130,246,0.8)',
          }}
        />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          pt: { xs: 14, md: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 4, md: 8 },
              maxWidth: '1400px',
              mx: 'auto',
            }}
          >
            {/* Left Column - Text Content */}
            <Box
              sx={{
                flex: { md: '1 1 50%' },
                maxWidth: { md: '600px' },
                pl: { xs: 0, md: 14, lg: 18 },
              }}
            >
              {/* Greeting */}
              <Typography
                variant="h6"
                sx={{
                  color: '#34d399',
                  fontWeight: 500,
                  fontSize: '1.125rem',
                  mb: 2,
                }}
              >
                Hello!
              </Typography>

              {/* Name */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                  color: '#fff',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                I&apos;m Ronnie Lutaro
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Product Manager with 4+ years of product work and a software engineering background. I translate user needs into Products they deeply love and care about.
              </Typography>

              {/* CTA Button */}
              <GlassButton
                glassVariant="primary"
                size="large"
                startIcon={<Box component="span" sx={{ mr: 1 }}>💬</Box>}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  },
                }}
              >
                LET&apos;S TALK
              </GlassButton>
            </Box>

            {/* Right Column - Photo */}
            <Box
              sx={{
                flex: { md: '1 1 50%' },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                pr: { xs: 0, md: 8, lg: 12 },
                pt: { xs: 0, md: 6, lg: 8 },
              }}
            >
              <Box
                component="img"
                src="/media/ronnie_potrait.png"
                alt="Ronnie Lutaro"
                sx={{
                  width: '100%',
                  maxWidth: { xs: '400px', md: '500px', lg: '600px' },
                  height: 'auto',
                  display: 'block',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Skills Chips Section */}
      <Box sx={{ pb: 12, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
              }}
            >
              Core Competencies
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'center',
              }}
            >
              {chips.map((label, index) => (
                <GlassChip
                  key={index}
                  label={label}
                  color={
                    index % 3 === 0
                      ? 'primary'
                      : index % 3 === 1
                      ? 'success'
                      : 'warning'
                  }
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* About section removed; use dedicated About page instead */}

      {/* Featured Work */}
      <Box sx={{ py: 12, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              color: 'white',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Featured Work
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Projects I&apos;m proud of
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}
          >
            <Box>
              <GlassCard glassVariant="dark" enableHover>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Rocketize
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Intelligent tools for Marketing Teams to streamline operations & maximize ROAS
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <GlassChip label="Product" size="small" color="primary" />
                    <GlassChip label="Marketing Tech" size="small" color="secondary" />
                    <GlassChip label="SaaS" size="small" color="success" />
                  </Stack>
                </CardContent>
              </GlassCard>
            </Box>
            <Box>
              <GlassCard glassVariant="dark" enableHover>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    StartHub
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Supporting 10+ founders from idea to market with customer discovery and product development
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <GlassChip label="Product Management" size="small" color="warning" />
                    <GlassChip label="Customer Discovery" size="small" color="error" />
                    <GlassChip label="Startups" size="small" color="primary" />
                  </Stack>
                </CardContent>
              </GlassCard>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
