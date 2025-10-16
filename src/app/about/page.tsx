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
  
  const colorMap: Record<string, string> = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
  };

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
          <p
            className="text-white/60 max-w-2xl mx-auto text-base md:text-lg lg:text-xl"
            style={{ lineHeight: 1.7 }}
          >
            {frontmatter.subtitle}
          </p>
        </div>
      </section>
      {/* Hero Section */}
      <section className="text-center pt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ExportedImage 
            src={frontmatter.image.src} 
            alt={frontmatter.image.alt} 
            width={320} 
            height={320} 
            className="mx-auto rounded-full shadow-2xl mb-6 ring-2 ring-white/15 object-cover" 
            priority 
          />
        </div>
      </section>

      {/* Divider */}
  <div className="max-w-6xl mx-auto px-4 mb-6">
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
          }}
        />
      </div>

      {/* Story & Mission */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="mb-8">
          <MDXRemote source={content} components={baseMDXComponents} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frontmatter.values.map((value: { title: string; description: string; color: string }) => (
            <div key={value.title} className="bg-white/5 rounded-2xl p-6 shadow-lg">
              <h4 className={`text-xl font-semibold ${colorMap[value.color]} mb-2`}>{value.title}</h4>
              <p className="text-white/70">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
