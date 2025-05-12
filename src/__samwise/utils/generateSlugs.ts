import fs from 'fs';
import path from 'path';

export async function generateSlugsJson(): Promise<void> {
  try {
    // Define the directory containing posts
    const postsDirectory: string = path.resolve(process.cwd(), 'src', 'posts');

    // Read the directory and filter only directories
    const slugs: string[] = fs
      .readdirSync(postsDirectory)
      .filter((name: string) => !name.startsWith('.')) // Ignore hidden files
      .filter((name: string) =>
        fs.statSync(path.join(postsDirectory, name)).isDirectory(),
      );

    // Define the path to the slugs.json file
    const outputPath: string = path.join(postsDirectory, 'slugs.json');

    // Write the slugs to the JSON file
    await fs.promises.writeFile(outputPath, JSON.stringify(slugs, null, 2));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error generating slugs.json: ${error.message}`);
    } else {
      console.error('Unknown error occurred while generating slugs.json.');
    }
  }
}
