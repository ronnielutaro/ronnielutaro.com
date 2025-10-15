import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for search engine crawlers
 * Allows all bots to crawl all pages and points to sitemap
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://ronnielutaro.com/sitemap.xml',
  };
}
