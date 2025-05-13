'use client';

import { AUTHOR, SITE_URL, SOCIAL_URLS } from '../config';

export default function JsonLdScript() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.bio,
    description: AUTHOR.description,
    url: SITE_URL,
    sameAs: [
      SOCIAL_URLS.twitter,
      SOCIAL_URLS.strava,
      SOCIAL_URLS.github,
      SOCIAL_URLS.reddit,
      SOCIAL_URLS.linkedin,
      SOCIAL_URLS.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
