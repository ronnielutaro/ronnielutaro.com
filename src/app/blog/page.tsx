import React from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { SearchFilters } from '@/components/blog/SearchFilters';
import { Pagination } from '@/components/blog/Pagination';
import { Footer } from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MDI4MTAxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Product',
    title: 'Building Products Users Love: Lessons from StartHub',
    excerpt: 'Discover the key principles and strategies that transform good products into exceptional ones that users can\'t live without.',
    date: 'Oct 9, 2025',
    readTime: '5 min read',
    tags: ['Product', 'Strategy'],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjAyNjAzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Design',
    title: 'The Art of Design Systems: Creating Consistency at Scale',
    excerpt: 'Learn how to build and maintain design systems that empower teams to create cohesive user experiences across products.',
    date: 'Oct 5, 2025',
    readTime: '7 min read',
    tags: ['Design', 'Systems'],
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjAyOTAxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Engineering',
    title: 'Scaling Infrastructure: When to Optimize and When to Rebuild',
    excerpt: 'Technical debt isn\'t always bad. Understanding when to optimize existing systems versus starting fresh is crucial for growth.',
    date: 'Oct 1, 2025',
    readTime: '10 min read',
    tags: ['Engineering', 'Architecture'],
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1700561570982-5f845601c505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwdGVhbXxlbnwxfHx8fDE3NjAyNjA2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Strategy',
    title: 'Strategic Thinking in Product Development',
    excerpt: 'How to align product roadmaps with business objectives while maintaining flexibility to adapt to market changes.',
    date: 'Sep 28, 2025',
    readTime: '6 min read',
    tags: ['Strategy', 'Product'],
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1603975711481-18b7aaca4caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYwMjMzODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Product',
    title: 'From Idea to Launch: A Product Manager\'s Journey',
    excerpt: 'Walk through the complete lifecycle of bringing a new feature from conception to successful market launch.',
    date: 'Sep 24, 2025',
    readTime: '8 min read',
    tags: ['Product', 'Process'],
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MDMwOTY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Analytics',
    title: 'Data-Driven Decision Making: Beyond the Metrics',
    excerpt: 'Numbers tell a story, but context matters. Learn how to interpret analytics to make informed product decisions.',
    date: 'Sep 20, 2025',
    readTime: '5 min read',
    tags: ['Analytics', 'Strategy'],
  },
];

export default function BlogListingPage() {
  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: '#06080f',
      }}
    >
      {/* Background Light Beams - Exactly as per wireframe */}
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

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section - Exact styling from wireframe */}
        <section className="text-center mb-16 px-4" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-white mb-4"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                marginBottom: '16px',
              }}
            >
              Writing & Thoughts
            </h1>
            <p 
              className="text-white/70 max-w-2xl mx-auto"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Insights on product management, engineering, and lessons learned along the way
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <SearchFilters />

        {/* Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="max-w-7xl mx-auto px-4 mb-24">
          <Pagination />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}