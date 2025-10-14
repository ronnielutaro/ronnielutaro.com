'use client';

import React from 'react';

interface CaseStudySectionProps {
  title: string;
  children: React.ReactNode;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ title, children }) => {
  return (
    <section className="mb-16">
      <h2 
        className="text-white mb-8"
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <div className="text-white/90">
        {children}
      </div>
    </section>
  );
};