'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CaseStudyNavigationProps {
  currentId: number;
}

// Example navigation logic (replace with real data as needed)
const caseStudies = [
  { id: 1, title: 'AGRILogistics', slug: 'agrilogistics' },
  { id: 2, title: 'UNDP Youth Ignite', slug: 'undp-youth-ignite' },
  { id: 3, title: 'Rocketize OS', slug: 'rocketize-os' },
];

export const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ currentId }) => {
  const currentIndex = caseStudies.findIndex(cs => cs.id === currentId);
  const prev = caseStudies[currentIndex - 1];
  const next = caseStudies[currentIndex + 1];

  return (
    <div className="max-w-4xl mx-auto px-4 mt-20 mb-20">
      {/* Navigation Grid */}
      {(prev || next) && (
        <div className="mb-12">
          <div className={`grid gap-6 ${prev && next ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Previous Case Study */}
            {prev && (
              <Link 
                href={`/projects/${prev.slug}`} 
                className="block group"
                aria-label={`Previous project: ${prev.title}`}
              >
                <div 
                  className="p-8 transition-all duration-500 cursor-pointer group-hover:-translate-y-2 group-focus:-translate-y-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ArrowLeft className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span 
                      className="text-white/60 text-sm font-semibold uppercase tracking-wide"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Previous Case Study
                    </span>
                  </div>
                  <div 
                    className="text-white font-semibold group-hover:text-blue-300 transition-colors"
                    style={{ fontSize: '1.125rem', lineHeight: '1.4' }}
                  >
                    {prev.title}
                  </div>
                </div>
              </Link>
            )}

            {/* Next Case Study */}
            {next && (
              <Link 
                href={`/projects/${next.slug}`} 
                className={`block group ${!prev && next ? 'ml-auto max-w-md' : 'text-right'}`}
                aria-label={`Next project: ${next.title}`}
              >
                <div 
                  className="p-8 transition-all duration-500 cursor-pointer group-hover:-translate-y-2 group-focus:-translate-y-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    textAlign: prev ? 'right' : 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <div className={`flex items-center gap-3 mb-3 ${prev ? 'justify-end' : 'justify-start'}`}>
                    {!prev && <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />}
                    <span 
                      className="text-white/60 text-sm font-semibold uppercase tracking-wide"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Next Case Study
                    </span>
                    {prev && <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />}
                  </div>
                  <div 
                    className="text-white font-semibold group-hover:text-blue-300 transition-colors"
                    style={{ fontSize: '1.125rem', lineHeight: '1.4' }}
                  >
                    {next.title}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Back to Projects Button */}
      <div className="text-center">
        <Link href="/projects" className="inline-block group" aria-label="Back to all posts">
          <div 
            className="text-white px-10 py-4 font-semibold text-base transition-all duration-500 group-hover:-translate-y-1 group-focus:-translate-y-1 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
              backdropFilter: 'blur(32px) saturate(200%)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(59, 130, 246, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)';
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.15)';
            }}
          >
            <ArrowLeft className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
            <span className="group-hover:text-blue-100 transition-colors">
              Back to All Posts
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
