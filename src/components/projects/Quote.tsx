'use client';

import React from 'react';

interface QuoteProps {
  children: React.ReactNode;
  author: string;
  role?: string;
}

export const Quote: React.FC<QuoteProps> = ({ children, author, role }) => {
  return (
    <div 
      className="relative p-8 backdrop-blur-sm border-l-4 border-blue-400"
      style={{
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '0 16px 16px 0',
      }}
    >
      <div className="absolute top-4 left-4 text-blue-400/30 text-6xl font-serif leading-none">
        &ldquo;
      </div>
      <blockquote className="text-xl text-white/90 font-medium italic leading-relaxed pl-8 mb-4">
        {children}
      </blockquote>
      <div className="pl-8">
        <cite className="text-white font-semibold not-italic">— {author}</cite>
        {role && <div className="text-white/70 text-sm mt-1">{role}</div>}
      </div>
    </div>
  );
};