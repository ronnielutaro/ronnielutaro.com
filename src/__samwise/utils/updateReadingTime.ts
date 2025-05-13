import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import { container } from '../../../lib/cosmosdb'; // Already replaced with a relative path

// Define the directory where posts are located
const postsDirectory = path.join(process.cwd(), 'src', 'posts');

// Function to update the reading time of a specific blog post
export async function updateReadingTime(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}/page.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found for slug: ${slug}`);
  }

  // Read the file contents
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Remove metadata section to calculate reading time accurately
  const contentWithoutMetadata = fileContents
    .replace(/export const metadata = {[\s\S]*?};/, '')
    .trim();

  // Calculate reading time for the post
  const stats = readingTime(contentWithoutMetadata);
  const readingTimeInMinutes = Math.max(1, Math.ceil(stats.minutes));

  // Update the metadata with the new reading time
  const updatedContent = updateMetadata(fileContents, readingTimeInMinutes);

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  const { resource: post } = await container.item(slug, slug).read();

  if (post) {
    post.readingTime = readingTimeInMinutes;
    await container.items.upsert(post);
  } else {
    await container.items.create({
      id: slug,
      type: 'post',
      readingTime: readingTimeInMinutes,
    });
  }
}

// Function to update the metadata in the MDX file
function updateMetadata(content: string, readingTimeInMinutes: number): string {
  const metadataRegex = /export const metadata = ({[\s\S]*?});/;

  // Extract the existing metadata object from the file
  const match = content.match(metadataRegex);
  if (!match || match.length < 2) {
    throw new Error('Metadata not found in the MDX file.');
  }

  let metadataString = match[1].trim();

  // Check if `readingTime` already exists in the metadata
  if (metadataString.includes('readingTime')) {
    // Update the existing readingTime value
    metadataString = metadataString.replace(
      /readingTime:\s?\d+/,
      `readingTime: ${readingTimeInMinutes}`,
    );
  } else {
    // Remove any trailing comma and whitespace before the closing }
    metadataString = metadataString.replace(
      /,?\s*}$/,
      `, readingTime: ${readingTimeInMinutes} }`,
    );
  }

  // Replace the old metadata with the updated one in the content
  const updatedContent = content.replace(
    metadataRegex,
    `export const metadata = ${metadataString};`,
  );
  return updatedContent;
}

// Function to update reading times for all posts in `slugs.json`
export function updateAllReadingTimes() {
  const slugsFilePath = path.join(postsDirectory, 'slugs.json');

  if (!fs.existsSync(slugsFilePath)) {
    throw new Error('Slugs file not found.');
  }

  // Read the slugs.json file
  const slugs: string[] = JSON.parse(fs.readFileSync(slugsFilePath, 'utf8'));

  // Iterate through each slug and process its MDX file
  slugs.forEach((slug) => {
    try {
      updateReadingTime(slug);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error processing slug "${slug}":`, error.message);
      } else {
        console.error(`Error processing slug "${slug}": Unknown error.`);
      }
    }
  });
}
