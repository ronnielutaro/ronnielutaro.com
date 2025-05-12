const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Get the input directory from the command line arguments
const inputDir = process.argv[2]; // Pass the input directory as the first argument
if (!inputDir) {
  console.error('Please provide an input directory as the first argument.');
  process.exit(1); // Exit if no input directory is provided
}

// Set the output directory to a subdirectory called 'output'
const outputDir = path.join(inputDir, 'output');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define the desired dimensions for the resized images
const width = 600; // Set your desired width here
const height = 980; // Set your desired height here

// Function to resize and convert images to WebP format
async function processImage(imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath)); // Get the file name without extension

  try {
    await sharp(imagePath)
      //      .resize(width, height, {
      //        fit: 'cover', // Adjust the resize strategy to fit your needs
      //      })
      .toFormat('webp')
      .toFile(path.join(outputDir, `${fileName}.webp`));

    console.log(`Successfully processed: ${fileName}.webp`);
  } catch (error) {
    console.error(`Error processing image ${fileName}:`, error);
  }
}

// Function to process all images in the input directory
async function processAllImages() {
  try {
    const files = fs.readdirSync(inputDir);

    // Include WebP files in the list of supported extensions
    const imageFiles = files.filter((file) =>
      [
        '.jpg',
        '.jpeg',
        '.png',
        '.tiff',
        '.bmp',
        '.HEIC',
        '.heic',
        '.gif',
        '.webp',
      ].includes(path.extname(file).toLowerCase()),
    );

    if (imageFiles.length === 0) {
      console.log('No image files found in the source directory.');
      return;
    }

    for (const imageFile of imageFiles) {
      const imagePath = path.join(inputDir, imageFile);
      await processImage(imagePath);
    }

    console.log('Image processing completed.');
  } catch (error) {
    console.error('Error reading the source directory:', error);
  }
}

// Execute the script
processAllImages();
