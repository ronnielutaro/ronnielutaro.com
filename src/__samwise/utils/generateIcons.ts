import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define the directory paths
const publicDir = path.join(process.cwd(), 'public');
const iconsDir = path.join(publicDir, 'icons');

// Ensure directory exists
function ensureDirectoryExistence(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Clear existing icons in the icons directory
function clearIconsDirectory(dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

// Define the sizes for PWA icons
const sizes: number[] = [
  16, 32, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512,
];

// Function to resize and save an icon
async function resizeAndSave(inputFile: string, size: number): Promise<void> {
  const outputFile: string = path.join(iconsDir, `${size}x${size}.png`);

  try {
    const image = sharp(inputFile).resize({ width: size, height: size });

    if (size === 32) {
      const radius = size / 20; // Adjust the divisor for corner roundness
      const roundedCorners = Buffer.from(
        `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
      );
      await image
        .composite([{ input: roundedCorners, blend: 'dest-in' }])
        .toFile(outputFile);
    } else {
      await image.toFile(outputFile);
    }
  } catch (error) {
    console.error(
      `❌ Error creating icon ${size}x${size}.png:`,
      (error as Error).message,
    );
  }
}

// Main function to generate PWA icons and save the .webp logo
export async function generatePwaIcons(logoPath: string): Promise<void> {
  try {
    const logoFileName = 'icon.webp';
    const logoDestination = path.join(publicDir, logoFileName);

    // Resolve absolute paths for comparison
    const resolvedLogoPath = path.resolve(logoPath);
    const resolvedLogoDestination = path.resolve(logoDestination);

    ensureDirectoryExistence(publicDir);
    ensureDirectoryExistence(iconsDir);

    clearIconsDirectory(iconsDir);

    // Skip conversion if resolved paths are the same
    if (resolvedLogoPath !== resolvedLogoDestination) {
      await sharp(logoPath).toFormat('webp').toFile(logoDestination);
    }

    // Introduce a small delay to ensure file system consistency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate PWA icons
    await Promise.all(
      sizes.map((size) =>
        resizeAndSave(logoDestination, size).catch((err) =>
          console.error(
            `❌ Failed to generate icon ${size}x${size}:`,
            (err as Error).message,
          ),
        ),
      ),
    );
  } catch (error) {
    console.error(
      '❌ Error generating PWA icons or logo:',
      (error as Error).message,
    );
    throw error; // Re-throw to propagate the error
  }
}
