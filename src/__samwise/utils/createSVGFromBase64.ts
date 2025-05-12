import fs from 'fs/promises';

/**
 * Converts base64 logo data to an SVG file and saves it to the specified path.
 * @param {string} base64Data - The base64-encoded logo data.
 * @param {string} outputPath - The path where the SVG file should be saved.
 */
export async function createSVGFromBase64(
  base64Data: string,
  outputPath: string,
): Promise<void> {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <image href="data:image/png;base64,${base64Data}" width="100%" height="100%" />
    </svg>
  `;

  try {
    await fs.writeFile(outputPath, svgContent, 'utf8');
  } catch (error) {
    console.error('Error saving SVG:', error);
    throw new Error('Failed to save SVG');
  }
}
