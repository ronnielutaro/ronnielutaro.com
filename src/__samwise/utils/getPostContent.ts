// src/utils/getPostContent.ts
import fs from 'fs';
import path from 'path';

export async function getPostContentBySlug(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src', 'posts', slug, 'page.mdx');
  if (!fs.existsSync(filePath)) {
    return ''; // Return an empty string if the file does not exist
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading file:', (error as Error).message);
    return ''; // Return an empty string if an error occurs
  }
}
