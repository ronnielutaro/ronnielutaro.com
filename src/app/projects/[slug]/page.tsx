import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CaseStudyHero } from '@/components/projects/CaseStudyHero';
import { CaseStudyNavigation } from '@/components/projects/CaseStudyNavigation';
import { CaseStudySection } from '@/components/projects/CaseStudySection';
import { Callout } from '@/components/projects/Callout';
import { Quote } from '@/components/projects/Quote';
import { ImageGrid } from '@/components/projects/ImageGrid';
import { MetricsGrid } from '@/components/projects/MetricsGrid';
import { createMDXComponents } from '@/components/mdx/MDXComponents';
// Footer removed; using global ClientLayout footer
import { createProjectsLoader } from '@/lib/content-loader';
import { generateArticleSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';

// MDX Components: Base components + project-specific custom components
const mdxComponents = createMDXComponents({
  CaseStudySection,
  Callout,
  Quote,
  ImageGrid,
  MetricsGrid,
  CaseStudyHero,
});

export async function generateStaticParams() {
  const projectsLoader = createProjectsLoader();
  const slugs = projectsLoader.getAllSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate dynamic metadata for each project page
 * Includes Open Graph and Twitter Card tags for social sharing
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectsLoader = createProjectsLoader();
  const project = await projectsLoader.getContentBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const pageUrl = `https://ronnielutaro.com/projects/${slug}`;
  const imageUrl = project.meta.image 
    ? `https://ronnielutaro.com${project.meta.image}`
    : 'https://ronnielutaro.com/media/ronnie-headshot.jpg';

  return {
    title: project.meta.title,
    description: project.meta.excerpt,
    keywords: project.meta.tags,
    authors: [{ name: 'Ronnie Lutaro' }],
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: project.meta.title,
      description: project.meta.excerpt,
      publishedTime: project.meta.date,
      authors: ['Ronnie Lutaro'],
      tags: project.meta.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.meta.title,
      description: project.meta.excerpt,
      images: [imageUrl],
      creator: '@ronnielutaro',
    },
  };
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectsLoader = createProjectsLoader();
  const project = await projectsLoader.getContentBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroData = {
    id: 1,
    badge: project.meta.category || 'PROJECT',
    title: project.meta.title,
    oneLiner: project.meta.excerpt,
    metrics: project.meta.metrics || [],
    role: 'Product Manager',
    timeline: new Date(project.meta.date).getFullYear().toString(),
    duration: project.meta.readTime || '6 months',
    heroImage: project.meta.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  };

  // Generate Article schema for this project
  const articleSchema = generateArticleSchema({
    title: project.meta.title,
    description: project.meta.excerpt,
    date: project.meta.date,
    image: project.meta.image 
      ? `https://ronnielutaro.com${project.meta.image}`
      : 'https://ronnielutaro.com/media/ronnie-headshot.jpg',
    url: `https://ronnielutaro.com/projects/${slug}`,
    keywords: project.meta.tags,
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <CaseStudyHero {...heroData} />
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <MDXRemote source={project.content} components={mdxComponents} />
      </div>
      <CaseStudyNavigation currentId={heroData.id} />
    </>
  );
}
