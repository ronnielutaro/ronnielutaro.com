import React from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';

const projects = [
  {
    id: 1,
    badge: '0→1 PRODUCT',
    title: 'AGRILogistics Mobile & Web Platform',
    subtitle: 'Farmer-to-hub logistics with trackable first-mile delivery',
    metrics: [
      { label: 'Driver Activation', value: '40% → 65%' },
      { label: 'UI/API Performance', value: '20% faster' },
      { label: 'Usability Score', value: '40% improvement' },
    ],
    image: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    href: '/projects/agrilogistics',
  },
  // ...add more projects as needed
];

export default function ProjectsListingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#06080f' }}>
      {/* Background Light Beams - Exact from wireframe */}
      <div 
        className="fixed top-0 right-1/4 w-[1200px] h-[1200px] pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 60%)',
          filter: 'blur(90px)',
          transform: 'rotate(-25deg)',
          animation: 'glow1 16s ease-in-out infinite',
        }}
      />
      <div 
        className="fixed bottom-0 left-1/4 w-[800px] h-[800px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.5) 0%, rgba(96,165,250,0) 50%)',
          filter: 'blur(80px)',
          animation: 'pulse 12s ease-in-out infinite',
        }}
      />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section - Exact styling from projects wireframe */}
        <section className="text-center mb-16 px-4" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-white mb-4"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                marginBottom: '16px',
              }}
            >
              Projects & Work
            </h1>
            <p 
              className="text-white/70 max-w-2xl mx-auto mb-8"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              A collection of products and experiences I&apos;ve built, shaped, and launched
            </p>
            
            {/* Filter Chips - From wireframe */}
            <div className="flex justify-center gap-2 flex-wrap mb-12">
              <div 
                className="text-white text-sm px-4 py-2 font-semibold cursor-pointer"
                style={{
                  background: '#34d399',
                  color: '#ffffff',
                  borderRadius: '12px',
                }}
              >
                All Projects
              </div>
              <div 
                className="text-white/70 text-sm px-4 py-2 cursor-pointer hover:text-white hover:bg-white/5 transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                }}
              >
                Product Management
              </div>
              <div 
                className="text-white/70 text-sm px-4 py-2 cursor-pointer hover:text-white hover:bg-white/5 transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                }}
              >
                Development
              </div>
              <div 
                className="text-white/70 text-sm px-4 py-2 cursor-pointer hover:text-white hover:bg-white/5 transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                }}
              >
                Design
              </div>
            </div>
          </div>
        </section>

        {/* Featured Project Section Title */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <h3 
            className="text-white text-center mb-8"
            style={{
              fontSize: '2rem',
              fontWeight: 700,
            }}
          >
            All Projects
          </h3>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
