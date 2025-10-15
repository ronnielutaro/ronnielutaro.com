'use client';

import React from 'react';
import ExportedImage from 'next-image-export-optimizer';

interface Section {
  title: string;
  content: string;
}

interface Artifact {
  type: string;
  image: string;
  caption: string;
}

interface CaseStudyLayoutProps {
  sections: Section[];
  artifacts: Artifact[];
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ sections, artifacts }) => (
  <div className="max-w-6xl mx-auto px-4">
    {/* Main Article Content */}
    <div 
      className="p-8 mb-16 mx-auto max-w-4xl"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      {/* Story Sections */}
      {sections.map((section, idx) => (
        <section key={idx} className="mb-12 last:mb-0">
          <h2 
            className="text-gray-900 mb-6"
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              scrollMarginTop: '100px',
            }}
          >
            {section.title}
          </h2>
          <p 
            className="text-gray-800 leading-relaxed"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
            }}
          >
            {section.content}
          </p>
        </section>
      ))}
    </div>

    {/* Artifact Gallery - Glassmorphic Cards */}
    <div className="mb-16">
      <h3 
        className="text-white text-center mb-12"
        style={{
          fontSize: '2rem',
          fontWeight: 600,
        }}
      >
        Project Artifacts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {artifacts.map((artifact, idx) => (
          <div 
            key={idx} 
            className="overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: '24px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(96, 165, 250, 0.4)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              className="mb-4 overflow-hidden relative h-48"
              style={{ borderRadius: '12px' }}
            >
              <ExportedImage 
                src={artifact.image || '/placeholder-artifact.png'} 
                alt={artifact.type} 
                fill
                className="object-cover transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <div 
              className="text-white font-semibold mb-2"
              style={{ fontSize: '1.1rem' }}
            >
              {artifact.type}
            </div>
            <div 
              className="text-white/70"
              style={{ 
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              {artifact.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
