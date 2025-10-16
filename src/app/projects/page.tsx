import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { createProjectsLoader } from '@/lib/content-loader';

export const metadata: Metadata = {
  title: 'Projects & Work',
  description: 'Explore case studies and reflections from product management and engineering projects. Documenting learnings, strategies, and behind-the-scenes insights.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Work | Ronnie Lutaro',
    description: 'Explore case studies and reflections from product management and engineering projects.',
    url: 'https://ronnielutaro.com/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Work | Ronnie Lutaro',
    description: 'Explore case studies and reflections from product management and engineering projects.',
  },
};

// Get all projects from MDX files at build time
const projectsLoader = createProjectsLoader();
const projects = await projectsLoader.getAllContent();

export default function ProjectsListingPage() {
  // For now, show all projects since we can't use searchParams in static export
  const allProjects = projects;
  return (
    <>
      {/* Hero Section */}
      <section className="text-center mb-16 px-4">
        {/* Hero Section - Exact styling from projects wireframe */}
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-white/50 mb-8">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-white/70">Projects</span>
            </div>

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
              I love to document my thoughts, learnings, reflections & stories from behind the scenes on projects I&apos;m working on. My wish is that what I learn or discover along the way doesn&apos;t die with me.
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

      {/* Title */}
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
          {allProjects.map((project) => (
            <ProjectCard 
              key={project.meta.slug} 
              image={project.meta.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'}
              category={project.meta.category || 'Product'}
              title={project.meta.title}
              excerpt={project.meta.excerpt}
              date={new Date(project.meta.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
              readTime={project.meta.readTime || '5 min read'}
              tags={project.meta.tags}
              slug={project.meta.slug}
            />
          ))}
        </div>
      </section>
    </>
  );
}
