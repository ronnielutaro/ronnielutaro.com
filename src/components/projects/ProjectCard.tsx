'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Metric {
  label: string;
  value: string;
}

interface ProjectCardProps {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  metrics: Metric[];
  image: string;
  href: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ badge, title, subtitle, metrics, image, href }) => (
  <Link 
    href={href} 
    className="block group h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2"
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = '1px solid rgba(96, 165, 250, 0.4)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(59, 130, 246, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.18)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
    }}
  >
    <div className="relative h-56 w-full overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div 
        className="absolute top-4 left-4 text-white text-xs px-3 py-1 font-semibold"
        style={{
          background: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {badge}
      </div>
    </div>
    <div className="p-6 flex flex-col h-full">
      <h2 
        className="text-white mb-2"
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      <p 
        className="text-white/70 mb-4 flex-grow"
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {metrics.map((metric, idx) => (
          <div 
            key={idx} 
            className="text-white/80 text-xs px-2 py-1"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
            }}
          >
            {metric.label}: <span className="font-semibold text-white">{metric.value}</span>
          </div>
        ))}
      </div>
      <div 
        className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
        style={{ marginTop: 'auto' }}
      >
        View Full Case Study →
      </div>
    </div>
  </Link>
);
