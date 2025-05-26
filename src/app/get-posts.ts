// getAllPosts.ts
import fs from 'fs';
import path from 'path';
import slugs from '@/posts/slugs.json';
import commaNumber from 'comma-number';
import postsData from '@/app/posts.json';

/**
 * 1) Matches exactly what appears in your `posts.json`
 *    i.e., no `views` or `viewsFormatted`.
 */
type BasePost = {
  slug: string;
  date: string;
  title: string;
  draft: boolean;
  description: string;
  keywords: string[];
  author: string;
  authorUrl: string;
  image: string;
  readingTime: number;
};

/**
 * 2) Extends the base type with dynamic fields
 *    that do NOT exist in the raw JSON, but
 *    get appended at runtime.
 */
export type Post = BasePost & {
  views: number;
  viewsFormatted: string;
};

/**
 * 3) Describe the overall JSON shape:
 *    your `posts.json` presumably looks like:
 *
 *    {
 *      "posts": [
 *        { "slug": "...", "date": "...", "title": "...", ... },
 *        ...
 *      ]
 *    }
 */
type PostsData = {
  posts: BasePost[];
};

// 4) Cast the imported JSON to `PostsData`
const typedPostsData = postsData as PostsData;

/**
 * 5) We'll store an array of `BasePost` for non-draft posts.
 *    (No `views` or `viewsFormatted` here)
 */
const cachedNonDraftPosts: BasePost[] | null = null;

/**
 * Fetch all posts, optionally filtering out drafts.
 *
 * @param filterDrafts - if `true`, returns only published (non-draft) posts.
 * @returns Post[] - list of posts with dynamic `views` added.
 */
export const getAllPosts = async (): Promise<Post[]> => {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');

  const posts = slugs.map((slug) => {
    const filePath = path.join(postsDirectory, slug, 'page.mdx');

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Missing page.mdx for slug: ${slug}`);
      return null; // Skip this slug
    }

    try {
      // Read the file contents
      const fileContents = fs.readFileSync(filePath, 'utf8');

      // Extract metadata using regex
      const metadataRegex = /export const metadata = ({[\s\S]*?});/;
      const match = fileContents.match(metadataRegex);

      if (!match || match.length < 2) {
        console.warn(`⚠️ Missing metadata in page.mdx for slug: ${slug}`);
        return null;
      }

      // Parse the metadata string into an object
      const metadata = eval(`(${match[1]})`);

      return {
        slug,
        ...metadata,
        views: 0, // Placeholder for views
        viewsFormatted: commaNumber(0), // Placeholder for formatted views
      };
    } catch (error) {
      console.error(`❌ Error loading page.mdx for slug: ${slug}`, error);
      return null;
    }
  });

  // Filter out null values (slugs with missing files or metadata)
  return posts.filter((post) => post !== null) as Post[];
};
