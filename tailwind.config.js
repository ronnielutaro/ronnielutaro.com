/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom Colors - Glassmorphic Theme
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Accent Colors
        accent: {
          green: {
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
          },
          teal: {
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
          },
        },

        // Background Colors
        background: {
          primary: '#06080f',
          glass: 'rgba(255, 255, 255, 0.05)',
          'glass-hover': 'rgba(255, 255, 255, 0.08)',
          'glass-active': 'rgba(255, 255, 255, 0.1)',
        },

        // Border Colors
        border: {
          glass: 'rgba(96, 165, 250, 0.20)',
          'glass-light': 'rgba(255, 255, 255, 0.2)',
          'glass-category': 'rgba(255, 255, 255, 0.15)',
        },

        // Text Colors with Opacity
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.70)',
          tertiary: 'rgba(255, 255, 255, 0.50)',
          muted: 'rgba(255, 255, 255, 0.40)',
        },
      },

      // Custom Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-lg': '24px',
        'glass-xl': '30px',
      },

      // Custom Box Shadows for Glassmorphic Effects
      boxShadow: {
        'glass': '0 0 30px rgba(96, 165, 250, 0.1)',
        'glass-lg': '0 0 60px rgba(96, 165, 250, 0.15)',
        'glass-blue': '0 0 40px rgba(59, 130, 246, 0.8)',
        'card-hover': '0 0 50px rgba(96, 165, 250, 0.2)',
      },

      // Custom Gradients
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        'gradient-green': 'linear-gradient(135deg, #34d399, #10b981)',
        'gradient-teal': 'linear-gradient(135deg, #4ade80, #14b8a6)',
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-glass': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.08))',
        
        // Background Effects
        'radial-top': 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
        'radial-bottom': 'radial-gradient(ellipse at bottom, rgba(30, 58, 138, 0.1) 0%, transparent 50%)',
        'radial-center': 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(96, 165, 250, 0) 50%)',
        
        // Light Beams
        'light-beam': 'linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.5), transparent)',
      },

      // Custom Border Radius
      borderRadius: {
        'glass': '20px',
        'glass-lg': '24px',
        'glass-xl': '28px',
      },

      // Custom Animation
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      // Custom Keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(96, 165, 250, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(96, 165, 250, 0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Custom Typography
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },

      // Custom Spacing for Glassmorphic Components
      spacing: {
        'glass': '1.5rem', // 24px
        'glass-lg': '2rem', // 32px
        'glass-xl': '3rem', // 48px
      },

      // Custom Z-Index
      zIndex: {
        'glass': '10',
        'navbar': '50',
        'modal': '100',
      },
    },
  },
  plugins: [
    // Custom Plugin for Glassmorphic Utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Glass Card Base
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(96, 165, 250, 0.20)',
          boxShadow: '0 0 30px rgba(96, 165, 250, 0.1)',
        },

        // Glass Card Hover State
        '.glass-card-hover': {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 0 50px rgba(96, 165, 250, 0.2)',
          },
        },

        // Glass Navigation
        '.glass-nav': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },

        // Glass Button
        '.glass-button': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(96, 165, 250, 0.20)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateY(-2px)',
          },
        },

        // Glass Input
        '.glass-input': {
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(96, 165, 250, 0.20)',
          color: '#ffffff',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.50)',
          },
          '&:focus': {
            outline: 'none',
            borderColor: 'rgba(96, 165, 250, 0.40)',
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.1)',
          },
        },

        // Glass Badge
        '.glass-badge': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },

        // Text Utilities
        '.text-glass': {
          color: 'rgba(255, 255, 255, 0.70)',
        },

        '.text-glass-muted': {
          color: 'rgba(255, 255, 255, 0.50)',
        },

        // Background Effects
        '.bg-glass-effect': {
          background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(30, 58, 138, 0.1) 0%, transparent 50%)',
        },
      };

      addUtilities(newUtilities);
    },
  ],
}