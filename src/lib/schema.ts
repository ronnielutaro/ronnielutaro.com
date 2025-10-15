/**
 * JSON-LD Structured Data Utilities
 * Generates schema.org markup for better SEO and rich results
 */

interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string[];
  url: string;
  sameAs: string[];
  image: string;
  description: string;
}

interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  author: {
    '@type': string;
    name: string;
  };
}

interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  keywords: string[];
}

/**
 * Generate Person schema for the site owner
 */
export function generatePersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ronnie Lutaro',
    jobTitle: ['Product Manager', 'Software Engineer'],
    url: 'https://ronnielutaro.com',
    sameAs: [
      'https://www.linkedin.com/in/ronnielutaro',
      'https://github.com/ronnielutaro',
      'https://twitter.com/ronnielutaro',
    ],
    image: 'https://ronnielutaro.com/media/ronnie-headshot.jpg',
    description: 'Product Manager with 4+ years of experience and software engineering background. Building products people love through data-driven decisions and innovative solutions.',
  };
}

/**
 * Generate WebSite schema for the homepage
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ronnie Lutaro',
    description: 'Product Manager and Software Engineer Portfolio',
    url: 'https://ronnielutaro.com',
    author: {
      '@type': 'Person',
      name: 'Ronnie Lutaro',
    },
  };
}

/**
 * Generate Article schema for blog posts and case studies
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  image: string;
  url: string;
  keywords: string[];
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Person',
      name: 'Ronnie Lutaro',
    },
    datePublished: params.date,
    dateModified: params.modifiedDate || params.date,
    image: params.image,
    url: params.url,
    keywords: params.keywords,
  };
}
