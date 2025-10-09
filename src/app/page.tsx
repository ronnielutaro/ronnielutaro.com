'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <GlassCard glassVariant="gradient" enableHover sx={{ textAlign: 'center' }}>
            <CardContent sx={{ p: 6 }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 160,
                  height: 160,
                  margin: '0 auto 24px',
                  border: '4px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                }}
                alt="Ronnie Lutaro"
              />

              {/* Name */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Ronnie Lutaro
              </Typography>

              {/* Title */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', md: '2rem' },
                  color: 'rgba(255, 255, 255, 0.95)',
                  mb: 3,
                }}
              >
                Product Manager & Software Engineer
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  maxWidth: '600px',
                  margin: '0 auto 40px',
                  lineHeight: 1.6,
                }}
              >
                I translate user needs into Products they deeply love and care about
              </Typography>

              {/* CTA Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                <GlassButton
                  glassVariant="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  View My Work
                </GlassButton>
                <GlassButton
                  glassVariant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  Read My Thoughts
                </GlassButton>
                <GlassButton
                  glassVariant="glass"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  Get In Touch
                </GlassButton>
              </Stack>

              {/* Skills Chips */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 2,
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
                  {chips.map((chip, index) => (
                    <GlassChip
                      key={chip}
                      label={chip}
                      color={
                        index % 5 === 0 ? 'primary' :
                        index % 5 === 1 ? 'secondary' :
                        index % 5 === 2 ? 'success' :
                        index % 5 === 3 ? 'error' :
                        'warning'
                      }
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </GlassCard>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 12, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
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
            Who I Am
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.125rem',
            }}
          >
            Product Manager with 4+ years of product work and a software engineering background
          </Typography>

          <GlassCard glassVariant="light" enableHover>
            <CardContent sx={{ p: 6 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                At StartHub, I've supported 10+ founders from idea to market by running customer discovery,
                translating insights into requirements and features, and closing the loop with post-launch iteration.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                }}
              >
                I'm also building Rocketize, a side project where I run end-to-end product cycles. The project is
                aimed at building a suite of intelligent tools for Marketing Teams to streamline & improve the
                efficiency of their operations & campaigns, while reducing Waste & maximizing Return On Ad Spend.
              </Typography>
            </CardContent>
          </GlassCard>
        </Container>
      </Box>

      {/* Featured Work */}
      <Box sx={{ py: 12 }}>
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
            Projects I'm proud of
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
