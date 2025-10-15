'use client';

import React from 'react';
import Header from './navigation/Header';
import { Footer } from './Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: '#06080f',
      }}
    >
      {/* Background Light Beams - Beautiful animated background effects */}
      <div 
        className="fixed top-0 right-1/4 w-[1200px] h-[1200px] pointer-events-none opacity-80 hidden md:block"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 60%)',
          filter: 'blur(90px)',
          transform: 'rotate(-25deg)',
          animation: 'glow1 16s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
      <div 
        className="fixed bottom-0 left-1/4 w-[800px] h-[800px] pointer-events-none opacity-50 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.5) 0%, rgba(96,165,250,0) 50%)',
          filter: 'blur(80px)',
          animation: 'pulse 12s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
      
      {/* Simplified mobile background - static gradient without heavy animations */}
      <div 
        className="fixed inset-0 pointer-events-none md:hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 50%), radial-gradient(circle at 30% 80%, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0) 40%)',
        }}
      />

      <Header />
      
      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-0">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
