import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CaseStudyHero } from '@/components/projects/CaseStudyHero';
import { CaseStudyNavigation } from '@/components/projects/CaseStudyNavigation';
import { CaseStudySection } from '@/components/projects/CaseStudySection';
import { Callout } from '@/components/projects/Callout';
import { Quote } from '@/components/projects/Quote';
import { ImageGrid } from '@/components/projects/ImageGrid';
import { MetricsGrid } from '@/components/projects/MetricsGrid';
// Footer removed; using global ClientLayout footer
import { createProjectsLoader } from '@/lib/content-loader';
import { notFound } from 'next/navigation';

// MDX Components for rendering
const mdxComponents = {
  CaseStudySection,
  Callout,
  Quote,
  ImageGrid,
  MetricsGrid,
  CaseStudyHero,
  // Add standard HTML elements with styling
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => <h1 className="text-4xl font-bold text-white mb-6" {...props} />,
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => <h2 className="text-3xl font-semibold text-white mb-4" {...props} />,
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => <h3 className="text-2xl font-semibold text-white mb-3" {...props} />,
  p: (props: React.HTMLProps<HTMLParagraphElement>) => <p className="text-lg text-white/90 leading-relaxed mb-4" {...props} />,
  ul: (props: React.HTMLProps<HTMLUListElement>) => <ul className="space-y-2 mb-4" {...props} />,
  li: (props: React.HTMLProps<HTMLLIElement>) => <li className="text-lg text-white/90 flex items-start gap-3" {...props} />,
};

export async function generateStaticParams() {
  const projectsLoader = createProjectsLoader();
  const slugs = projectsLoader.getAllSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
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
    metrics: [],
    role: 'Product Manager',
    timeline: new Date(project.meta.date).getFullYear().toString(),
    duration: project.meta.readTime || '6 months',
    heroImage: project.meta.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  };

  return (
    <>
      <CaseStudyHero {...heroData} />
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <MDXRemote source={project.content} components={mdxComponents} />
      </div>
      <CaseStudyNavigation currentId={heroData.id} />
    </>
  );
}
