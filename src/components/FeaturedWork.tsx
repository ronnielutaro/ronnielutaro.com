import React from 'react';
import Link from 'next/link';
import { createBlogLoader } from '@/lib/content-loader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArrowRight } from 'lucide-react';
import featuredWorkContent from '../../content/featured-work.json';

async function getProjects() {
  const blogLoader = createBlogLoader();
  const blog = await blogLoader.getAllContent();
  // Filter for featured blog, fallback to first 2 if none are marked as featured
  const featuredProjects = blog.filter(p => p.meta.featured === true);
  return featuredProjects.length > 0 ? featuredProjects.slice(0, 2) : blog.slice(0, 2);
}

export async function FeaturedWork() {
  const blog = await getProjects();

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-bold text-center mb-2 text-white text-3xl md:text-4xl">{featuredWorkContent.title}</h2>
        <p className="text-center mb-8 text-white/80 max-w-2xl mx-auto text-base md:text-lg">{featuredWorkContent.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blog.map((project) => (
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
            href={featuredWorkContent.viewMoreLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            {featuredWorkContent.viewMoreText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}