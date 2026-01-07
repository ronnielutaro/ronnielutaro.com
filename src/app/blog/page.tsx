import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { createBlogLoader } from '@/lib/content-loader';
import blogPageContent from '../../../content/blog-page.json';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore case studies and reflections from product management and engineering blog. Documenting learnings, strategies, and behind-the-scenes insights.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Ronnie Lutaro',
    description: 'Explore case studies and reflections from product management and engineering blog.',
    url: 'https://ronnielutaro.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ronnie Lutaro',
    description: 'Explore case studies and reflections from product management and engineering blog.',
  },
};

// Get all posts from MDX files at build time
const blogLoader = createBlogLoader();
const posts = await blogLoader.getAllContent();

export default function BlogListingPage() {
  // For now, show all posts since we can't use searchParams in static export
  const allPosts = posts;
  return (
    <>
      {/* Hero Section */}
      <section className="text-center mb-16 px-4">
        {/* Hero Section - Exact styling from blog wireframe */}
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-white/50 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white/70">Blog</span>
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '16px',
            }}
          >
            {blogPageContent.title}
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
            {blogPageContent.subtitle}
          </p>

          {/* Filter Chips - From wireframe */}
          <div className="flex justify-center gap-2 flex-wrap mb-12">
            {blogPageContent.categories.map((category) => (
              <div
                key={category.slug}
                className={category.active
                  ? "text-white text-sm px-4 py-2 font-semibold cursor-pointer"
                  : "text-white/70 text-sm px-4 py-2 cursor-pointer hover:text-white hover:bg-white/5 transition-all"
                }
                style={category.active
                  ? {
                    background: '#34d399',
                    color: '#ffffff',
                    borderRadius: '12px',
                  }
                  : {
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                  }
                }
              >
                {category.label}
              </div>
            ))}
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
          {blogPageContent.sectionTitle}
        </h3>
      </section>

      {/* blog Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <ProjectCard
              key={post.meta.slug}
              image={post.meta.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'}
              category={post.meta.category || 'Product'}
              title={post.meta.title}
              excerpt={post.meta.excerpt}
              date={new Date(post.meta.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
              readTime={post.meta.readTime || '5 min read'}
              tags={post.meta.tags}
              slug={post.meta.slug}
            />
          ))}
        </div>
      </section>
    </>
  );
}
