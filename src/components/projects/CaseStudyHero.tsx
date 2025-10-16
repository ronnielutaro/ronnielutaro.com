'use client';

import React from 'react';
import ExportedImage from 'next-image-export-optimizer';

interface Metric {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  badge: string;
  title: string;
  oneLiner: string;
  metrics: Metric[];
  role: string;
  timeline: string;
  heroImage: string;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ badge, title, oneLiner, metrics, role, timeline, heroImage }) => {
  const safeMetrics = metrics ?? [];
  return (
    <section className="max-w-6xl mx-auto px-4 mb-16">
    {/* Hero Image with Glassmorphic Badge */}
    <div 
      className="relative overflow-hidden mb-12"
      style={{
        borderRadius: '24px',
        height: '500px',
        background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Badge */}
      <div className="absolute top-6 left-6">
        <div 
          className="text-white text-sm px-4 py-2 font-semibold"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
          }}
        >
          {badge}
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute bottom-12 left-6 right-6">
        <div className="max-w-4xl">
          <h1 
            className="text-white mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                <ExportedImage 
                  src="/media/ronnie-headshot.jpg"
                  alt="Ronnie Lutaro"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold">Ronnie Lutaro</span>
            </div>
            <span className="text-white/70">•</span>
            <span className="text-white/90 font-medium">{role}</span>
            <span className="text-white/70">•</span>
            <span className="text-white/90">{timeline}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Project Summary and Metrics */}
    <div className="max-w-4xl mx-auto">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safeMetrics.map((metric, idx) => (
          <div 
            key={idx} 
            className="text-center p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
            }}
          >
            <div 
              className="text-white font-bold mb-2"
              style={{ fontSize: '1.5rem' }}
            >
              {metric.value}
            </div>
            <div className="text-white/70 text-sm font-medium">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};
