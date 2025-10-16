import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Metric {
  label: string;
  value: string;
}

export interface ContentMeta {
  title: string;
  date: string;
  dateModified?: string;
  tags: string[];
  excerpt: string;
  slug: string;
  category?: string;
  readTime?: string;
  image?: string;
  featured?: boolean;
  metrics?: Metric[];
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

/**
 * Content loader utility following clean architecture principles
 * Handles MDX file discovery, parsing, and content extraction
 */
export class ContentLoader {
  private contentDir: string;

  constructor(contentType: 'blog' | 'projects') {
    this.contentDir = path.join(process.cwd(), 'content', contentType);
  }

  /**
   * Get all content items sorted by date (newest first)
   */
  async getAllContent(): Promise<ContentItem[]> {
    const files = this.getContentFiles();
    const content = await Promise.all(
      files.map(async (file) => this.parseContentFile(file))
    );
    
    return content.sort((a, b) => 
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
  }

  /**
   * Get content by slug
   */
  async getContentBySlug(slug: string): Promise<ContentItem | null> {
    try {
      const filePath = path.join(this.contentDir, `${slug}.mdx`);
      return await this.parseContentFile(path.basename(filePath));
    } catch {
      return null;
    }
  }

  /**
   * Get all available slugs
   */
  getAllSlugs(): string[] {
    const files = this.getContentFiles();
    return files.map(file => path.basename(file, '.mdx'));
  }

  /**
   * Get all MDX files from content directory
   */
  private getContentFiles(): string[] {
    if (!fs.existsSync(this.contentDir)) {
      return [];
    }
    
    return fs
      .readdirSync(this.contentDir)
      .filter(file => file.endsWith('.mdx'));
  }

  /**
   * Parse individual MDX file and extract frontmatter + content
   */
  private async parseContentFile(filename: string): Promise<ContentItem> {
    const filePath = path.join(this.contentDir, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    
    const slug = path.basename(filename, '.mdx');
    
    return {
      meta: {
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        dateModified: data.dateModified,
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        slug,
        category: data.category,
        readTime: data.readTime,
        image: data.image,
        featured: data.featured,
        metrics: data.metrics,
      },
      content,
    };
  }
}

/**
 * Factory functions for clean dependency injection
 */
export const createBlogLoader = () => new ContentLoader('blog');
export const createProjectsLoader = () => new ContentLoader('projects');