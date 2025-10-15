import React from 'react';
import Link from 'next/link';
import { createProjectsLoader } from '@/lib/content-loader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArrowRight } from 'lucide-react';

async function getProjects() {
  const projectsLoader = createProjectsLoader();
  const projects = await projectsLoader.getAllContent();
  // Filter for featured projects, fallback to first 2 if none are marked as featured
  const featuredProjects = projects.filter(p => p.meta.featured === true);
  return featuredProjects.length > 0 ? featuredProjects.slice(0, 2) : projects.slice(0, 2);
}

export async function FeaturedWork() {
  const projects = await getProjects();

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-bold text-center mb-2 text-white text-3xl md:text-4xl">Featured Work</h2>
        <p className="text-center mb-8 text-white/80">Reflections from some of the stuff I&apos;ve worked on</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.meta.slug}
              image={project.meta.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'}
              category={project.meta.category || 'PROJECT'}
              title={project.meta.title}
              excerpt={project.meta.excerpt}
              date={new Date(project.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              readTime={project.meta.readTime || '5 min read'}
              tags={project.meta.tags || []}
              slug={project.meta.slug}
            />
          ))}
        </div>
        
        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            View More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}