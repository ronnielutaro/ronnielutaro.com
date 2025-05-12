import fs from 'fs';
import path from 'path';
import slugs from '../../posts/slugs.json'; // Adjust path as needed
import formatDate from './formatDate';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export const generatePostsJson = async () => {
  const posts = slugs.map((slug) => {
    try {
      const filePath = path.join(postsDirectory, `${slug}/page.mdx`);

      if (!fs.existsSync(filePath)) {
        console.error(`❌ MDX file not found for slug: ${slug}`);
        return null;
      }

      // Read the file contents
      const fileContents = fs.readFileSync(filePath, 'utf8');

      // Extract metadata using regex
      const metadataRegex = /export const metadata = ({[\s\S]*?});/;
      const match = fileContents.match(metadataRegex);

      if (!match || match.length < 2) {
        console.error(`❌ Metadata not found in MDX file for slug: ${slug}`);
        return null;
      }

      const metadata = eval(`(${match[1]})`); // Parse the metadata string into an object
      // Return the post object with all fields extracted from metadata
      return {
        slug,
        date: metadata.date ? formatDate(metadata.date) : null,
        title: metadata.title || 'Untitled Post',
        draft: metadata.draft || false,
        description: metadata.description || '',
        keywords: metadata.keywords || [],
        author: metadata.author || 'Ronnie Lutaro', // Default author
        authorUrl: metadata.authorUrl || 'https://ronnielutaro.com', // Default author URL
        image: metadata.image || `/images/${slug}/default-image.webp`, // Default image path
        readingTime: metadata.readingTime || 5, // Default reading time
      };
    } catch (error) {
      console.error(`Error processing post ${slug}:`, error);
      return null;
    }
  });

  const formattedPosts = posts.filter((post) => post !== null);

  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'posts.json'); // Save to the public directory
    fs.writeFileSync(
      filePath,
      JSON.stringify({ posts: formattedPosts }, null, 2),
    );
    console.log('🎉 posts.json generated successfully at:', filePath);
  } catch (error) {
    console.error('❌ Failed to write posts.json:', error);
  }
};
