import { NextResponse } from 'next/server';
import { getAllPosts } from '@/app/get-posts';
import xml from 'xml';
import { SITE_URL } from '@/config';

export async function GET() {
  // Fetch only published posts (filterDrafts = true)
  const posts = await getAllPosts(true);

  const feed = [
    {
      rss: [
        {
          _attr: {
            version: '2.0',
            'xmlns:atom': 'http://www.w3.org/2005/Atom',
          },
        },
        {
          channel: [
            { title: "Ronnie Lutaro's Blog" },
            { link: SITE_URL },
            {
              description:
                'sharing learnings across technical product development, startup acceleration, and ecosystem building in African Markets.',
            },
            { language: 'en-us' },
            { lastBuildDate: new Date().toUTCString() },
            {
              image: [
                { url: `${SITE_URL}/images/icon.png` },
                { title: "Ronnie Lutaro's Blog" },
                { link: SITE_URL },
              ],
            },
            // Add the required atom:link element
            {
              'atom:link': {
                _attr: {
                  href: `${SITE_URL}/api/rss`,
                  rel: 'self',
                  type: 'application/rss+xml',
                },
              },
            },
            ...posts.map((post) => ({
              item: [
                { title: post.title },
                { link: `${SITE_URL}/blog/${post.slug}` },
                { description: post.description || '' },
                { pubDate: new Date(post.date).toUTCString() },
                // Ensure the author is a valid email format
                { author: 'ronnielutaro@outlook.com' },
                { guid: `${SITE_URL}/blog/${post.slug}` },
                { category: post.keywords.join(', ') },
                // Add the "length" attribute to enclosure if an image is provided
                ...(post.image
                  ? [
                      {
                        enclosure: {
                          _attr: {
                            url: `${SITE_URL}${post.image}`,
                            type: 'image/jpeg',
                            length: '0',
                          },
                        },
                      },
                    ]
                  : []),
              ],
            })),
          ],
        },
      ],
    },
  ];

  return new NextResponse(xml(feed, { declaration: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
