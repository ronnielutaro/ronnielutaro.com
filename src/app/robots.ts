import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config'; // Adjust the path based on your project structure

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
