// Import or define the Post that describes the shape of a post
export interface Post {
  slug: string;
  title: string;
  date: string | null; // Date can be null or a string
  image: string;
  description: string;
  excerpt: string;
  type: string;
  keywords: string[];
  readingTime: number;
  author?: string;
  authorUrl?: string;
  views?: number | null;
  viewsFormatted?: string;
  draft?: boolean;
}
