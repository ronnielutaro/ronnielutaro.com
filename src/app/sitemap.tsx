// src/app/sitemap/route.ts

import { MetadataRoute } from 'next';
import { SITE_URL } from './config'; // Adjust the path based on your project structure
// import slugs from '@/posts/slugs.json'; // Import your generated slugs
// import { formatDate } from '@/__samwise/utils/formatDate'; // If you have this utility
import { getAllPosts } from './get-posts'; // Use this to get post metadata

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts with metadata
  const posts = await getAllPosts(true);

  // Generate sitemap entries for posts
  const postsSitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date
      ? new Date(post.date).toISOString()
      : new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/achievements`,
      lastModified: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/content`,
      lastModified: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.4,
    },
    // Add other static pages if necessary
  ];

  // Combine all sitemap entries
  const sitemap = [...staticPages, ...postsSitemap];

  return sitemap;
}
