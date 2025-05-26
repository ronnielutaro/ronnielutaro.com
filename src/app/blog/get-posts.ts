import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);

  return slugs.map((slug) => {
    const filePath = path.join(postsDirectory, slug, 'page.mdx');
    const { metadata } = require(filePath);

    return {
      slug,
      ...metadata,
    };
  });
}