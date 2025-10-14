import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2, ChevronRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';

// Generate static params for static export
export async function generateStaticParams() {
  // In a real app, this would fetch from your CMS/API
  return [
    { slug: 'building-products-users-love' },
    { slug: 'design-systems-at-scale' },
    { slug: 'user-research-fundamentals' },
  ];
}

// Mock blog post data - in real app, this would come from CMS/API
const blogPost = {
  id: 1,
  slug: 'building-products-users-love',
  title: 'Building Products Users Love: Lessons from StartHub',
  excerpt: 'Discover the key principles and strategies that transform good products into exceptional ones that users can\'t live without.',
  content: `
    Product management is both an art and a science. Over the past four years, I've learned that building products users truly love requires more than just great features—it demands a deep understanding of human behavior, market dynamics, and the delicate balance between innovation and practicality.

    ## Understanding Your Users First

    The foundation of any successful product lies in understanding your users at a fundamental level. At StartHub, we discovered that our initial assumptions about user needs were only partially correct. Through extensive user interviews and behavioral analysis, we uncovered pain points that weren't immediately obvious.

    ### The Research Process

    Our research methodology involved:
    - **User Interviews**: 50+ in-depth conversations with potential users
    - **Behavioral Analytics**: Tracking how users interacted with our MVP
    - **Competitive Analysis**: Understanding gaps in the current market
    - **Journey Mapping**: Visualizing the complete user experience

    This research revealed that users didn't just want a tool—they wanted a solution that fit seamlessly into their existing workflow.

    ## The Product Development Framework

    Based on our learnings, we developed a framework that consistently delivered results:

    ### 1. Problem-First Thinking
    Before building any feature, we asked ourselves: "What specific problem does this solve?" This simple question prevented us from building features that looked impressive but provided little value.

    ### 2. Iterative Design Process
    We adopted a rapid prototyping approach:
    - **Week 1**: Problem definition and user research
    - **Week 2**: Low-fidelity prototypes and user testing
    - **Week 3**: High-fidelity designs and development planning
    - **Week 4**: MVP development and internal testing

    ### 3. Data-Driven Decisions
    Every product decision was backed by data. We measured:
    - User engagement metrics
    - Feature adoption rates
    - Customer satisfaction scores
    - Support ticket volumes

    ## Key Lessons Learned

    Through this journey, several key insights emerged that fundamentally changed how we approach product development.

    ### Lesson 1: Simplicity Wins
    Our most successful features were often the simplest ones. Users preferred straightforward solutions over complex, feature-rich alternatives. This taught us the value of saying "no" to good ideas in favor of great execution on essential features.

    ### Lesson 2: User Feedback is Gold
    The fastest path to product-market fit was through continuous user feedback. We implemented feedback loops at every stage of development, from initial concepts to post-launch iterations.

    ### Lesson 3: Technical Debt is Product Debt
    Poor technical decisions early on became product limitations later. Investing in solid architecture from the beginning paid dividends as we scaled.

    ## Implementation Strategies

    Translating these lessons into actionable strategies required systematic implementation across our organization.

    ### Building Cross-Functional Teams
    We restructured our teams to include:
    - Product managers who understood user needs
    - Designers who could translate needs into experiences
    - Engineers who could build scalable solutions
    - Data analysts who could measure success

    ### Establishing Clear Metrics
    We defined success metrics for every feature:
    - **Adoption Rate**: Percentage of users trying new features
    - **Engagement Depth**: How frequently users return to features
    - **User Satisfaction**: Direct feedback and NPS scores
    - **Business Impact**: Revenue and growth metrics

    ## Measuring Success

    Success in product management isn't just about shipping features—it's about creating measurable value for both users and the business.

    Our success framework included:
    - **Leading Indicators**: Early signals of product success
    - **Lagging Indicators**: Long-term business outcomes
    - **User Health Metrics**: Engagement, retention, and satisfaction
    - **Business Health Metrics**: Revenue, growth, and market share

    ## Looking Forward

    The product management landscape continues to evolve, but the fundamental principles remain constant: understand your users, solve real problems, measure everything, and iterate relentlessly.

    As we move forward, the focus should be on building products that not only meet user needs but anticipate them. The best products feel like magic—they solve problems users didn't even know they had.

    The journey of building products users love is challenging but incredibly rewarding. Every successful product starts with a deep understanding of human needs and a commitment to solving them elegantly.
  `,
  author: {
    name: 'Ronnie Lutaro',
    title: 'Product Manager',
    bio: 'Product Manager with 4+ years of experience building user-centered products and leading cross-functional teams.',
    avatar: '/media/ronnie_potrait.png',
    social: {
      twitter: 'https://twitter.com/ronnielutaro',
      linkedin: 'https://linkedin.com/in/ronnielutaro',
    }
  },
  category: 'Product',
  tags: ['Product Management', 'Strategy', 'User Experience', 'StartHub'],
  publishedAt: '2025-10-09',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MDI4MTAxMnww&ixlib=rb-4.1.0&q=80&w=1200',
  views: 1247,
};

// Table of Contents generation
const generateTOC = (content: string) => {
  const headings = content.match(/^#{2,3}\s+(.+)$/gm) || [];
  return headings.map((heading, index) => {
    const level = heading.match(/^#{2,3}/)?.[0].length || 2;
    const text = heading.replace(/^#{2,3}\s+/, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id: `heading-${index}`, text, level, anchor: id };
  });
};

export default function BlogPostPage() {
  const toc = generateTOC(blogPost.content);

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          const text = paragraph.replace('## ', '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <h2 key={index} id={id} className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0">
              {text}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          const text = paragraph.replace('### ', '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <h3 key={index} id={id} className="text-2xl font-semibold text-white mb-4 mt-8">
              {text}
            </h3>
          );
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside text-white/80 mb-6 space-y-2">
              {items.map((item, i) => (
                <li key={i} className="ml-4">{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }
        if (paragraph.trim() === '') return null;
        
        return (
          <p key={index} className="text-white/80 mb-6 leading-relaxed">
            {paragraph.trim()}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#06080f' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-15%] w-[1400px] h-[1400px]" style={{background:'radial-gradient(ellipse at center,rgba(59,130,246,0.9) 0%,rgba(59,130,246,0.6) 15%,rgba(59,130,246,0.3) 35%,rgba(59,130,246,0) 60%)',filter:'blur(100px)',transform:'rotate(-35deg)'}} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1200px] h-[1200px]" style={{background:'radial-gradient(ellipse at center,rgba(37,99,235,0.8) 0%,rgba(37,99,235,0.5) 15%,rgba(37,99,235,0.2) 35%,rgba(37,99,235,0) 60%)',filter:'blur(90px)',transform:'rotate(35deg)'}} />
        <div className="absolute top-0 left-1/4 w-px h-full opacity-10" style={{background:'linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.5), transparent)'}} />
        <div className="absolute top-0 right-1/3 w-px h-full opacity-10" style={{background:'linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.5), transparent)'}} />
      </div>

      <div className="relative z-10 pt-32">
        {/* Breadcrumb & Back Button */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <Link href="/blog" className="flex items-center gap-2 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Blog</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{blogPost.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(24px) saturate(180%)', border: '1px solid rgba(96, 165, 250, 0.20)'}}>
            <div className="relative h-[400px]">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-6 left-6">
                <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                  {blogPost.category}
                </Badge>
              </div>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blogPost.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blogPost.author.name}</span>
              </div>
            </div>

            <p className="text-xl text-white/80 leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Button 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white border-0"
                style={{background: 'linear-gradient(135deg, #3b82f6, #60a5fa)'}}
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 flex gap-12">
          {/* Article Content */}
          <article className="flex-1 max-w-4xl">
            <div 
              className="rounded-3xl p-12 mb-16"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(96, 165, 250, 0.10)',
              }}
            >
              <div className="prose prose-lg prose-invert max-w-none">
                {formatContent(blogPost.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-white font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-white/70 border-white/20 hover:bg-white/5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div 
              className="rounded-3xl p-8 mb-16"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(96, 165, 250, 0.20)',
              }}
            >
              <div className="flex gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-1">{blogPost.author.name}</h4>
                  <p className="text-white/70 mb-3">{blogPost.author.title}</p>
                  <p className="text-white/60 mb-4">{blogPost.author.bio}</p>
                  <div className="flex gap-4">
                    <Link href={blogPost.author.social.twitter} className="text-white/70 hover:text-white transition-colors">
                      Twitter
                    </Link>
                    <Link href={blogPost.author.social.linkedin} className="text-white/70 hover:text-white transition-colors">
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-80 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(96, 165, 250, 0.20)',
                  }}
                >
                  <h3 className="font-semibold text-white mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.anchor}`}
                        className={`block text-sm text-white/70 hover:text-white transition-colors ${
                          item.level === 3 ? 'ml-4' : ''
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related Articles */}
              <div 
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(96, 165, 250, 0.20)',
                }}
              >
                <h3 className="font-semibold text-white mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Link key={i} href="#" className="block group">
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                        Related Article Title {i}
                      </div>
                      <div className="text-xs text-white/50 mt-1">2 min read</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Newsletter CTA */}
        <section className="px-4 mb-24">
          <NewsletterCTA />
        </section>
      </div>
    </div>
  );
}