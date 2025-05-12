// utils/processHeadshotImage.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function processHeadshotImage(headshotData: string) {
  if (headshotData === '/icon.webp') {
    return;
  }
  if (!headshotData) {
    throw new Error('No headshot data provided.');
  }

  // Extract base64 data from data URL
  const matches = headshotData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid headshot data URL.');
  }

  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  // Define the output path
  const outputPath = path.resolve(
    process.cwd(),
    'public',
    'images',
    'about',
    'headshot.webp',
  );

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Use sharp to process and save the image
  await sharp(buffer)
    // .resize(400, 400) // Uncomment if you want to resize
    .webp({ quality: 100 }) // Set quality to 100%
    .toFile(outputPath);

  // Return the path to be used in the config
  return '/about/headshot.webp';
}
