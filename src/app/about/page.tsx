import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { baseMDXComponents } from '@/components/mdx/MDXComponents';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Ronnie Lutaro - Product Manager with 4+ years of experience and software engineering background. Passionate about building products people love.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Ronnie Lutaro',
    description: 'Learn about Ronnie Lutaro - Product Manager with 4+ years of experience and software engineering background.',
    url: 'https://ronnielutaro.com/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Ronnie Lutaro',
    description: 'Learn about Ronnie Lutaro - Product Manager with 4+ years of experience.',
  },
};

// Load MDX content at build time
function getAboutContent() {
  const contentPath = path.join(process.cwd(), 'src/app/about/content.mdx');
  const source = fs.readFileSync(contentPath, 'utf8');
  const { data, content } = matter(source);
  return { frontmatter: data, content };
}

export default function AboutPage() {
  const { frontmatter, content } = getAboutContent();

  return (
    <>
      {/* Page Intro (Breadcrumb + Title) */}
      <section className="max-w-6xl mx-auto px-4 mb-8 pt-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-white/50 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white/70">About</span>
          </div>

          <h1
            className="text-white mb-6 text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {frontmatter.title}
          </h1>
        </div>
      </section>
      {/* Story & Mission - Image Left, Text Right */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-20">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* Left - Image */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <ExportedImage 
              src={frontmatter.image.src} 
              alt={frontmatter.image.alt} 
              width={280} 
              height={280} 
              className="rounded-full shadow-2xl ring-2 ring-white/15 object-cover" 
              priority 
            />
          </div>
          {/* Right - Text Content */}
          <div className="flex-1">
            <MDXRemote source={content} components={baseMDXComponents} />
          </div>
        </div>
      </section>
    </>
  );
}
