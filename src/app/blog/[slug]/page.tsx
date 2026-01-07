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
import { createBlogLoader } from '@/lib/content-loader';
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
  const blogLoader = createBlogLoader();
  const slugs = blogLoader.getAllSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate dynamic metadata for each project page
 * Includes Open Graph and Twitter Card tags for social sharing
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogLoader = createBlogLoader();
  const post = await blogLoader.getContentBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const pageUrl = `https://ronnielutaro.com/blog/${slug}`;
  const imageUrl = post.meta.image
    ? `https://ronnielutaro.com${post.meta.image}`
    : 'https://ronnielutaro.com/media/ronnie-headshot.jpg';

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: post.meta.tags,
    authors: [{ name: 'Ronnie Lutaro' }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: post.meta.title,
      description: post.meta.excerpt,
      publishedTime: post.meta.date,
      authors: ['Ronnie Lutaro'],
      tags: post.meta.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [imageUrl],
      creator: '@ronnielutaro',
    },
  };
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blogLoader = createBlogLoader();
  const post = await blogLoader.getContentBySlug(slug);

  if (!post) {
    notFound();
  }

  const heroData = {
    id: 1,
    badge: post.meta.category || 'POST',
    title: post.meta.title,
    oneLiner: post.meta.excerpt,
    metrics: post.meta.metrics || [],
    role: 'Product Manager',
    timeline: new Date(post.meta.date).getFullYear().toString(),
    duration: post.meta.readTime || '6 months',
    heroImage: post.meta.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  };

  // Generate Article schema for this post
  const articleSchema = generateArticleSchema({
    title: post.meta.title,
    description: post.meta.excerpt,
    date: post.meta.date,
    modifiedDate: post.meta.dateModified,
    image: post.meta.image
      ? `https://ronnielutaro.com${post.meta.image}`
      : 'https://ronnielutaro.com/media/ronnie-headshot.jpg',
    url: `https://ronnielutaro.com/blog/${slug}`,
    keywords: post.meta.tags,
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
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
      <CaseStudyNavigation currentId={heroData.id} />
    </>
  );
}
