import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import { AUTHOR, SITE_URL } from '@/config';
import { generateSlugsJson } from '@/__samwise/utils/generateSlugs';
import stringifyObject from 'stringify-object';

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -

const validateOrDefaultDate = (input: string): string => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const currentDate = new Date().toISOString().split('T')[0];
  return dateRegex.test(input) ? input : currentDate;
};

export async function POST(request: Request) {
  try {
    delete require.cache[require.resolve('@/posts/slugs.json')];
    const body = await request.json();

    const {
      originalSlug, // Original slug before editing
      title,
      description,
      date = new Date().toISOString().split('T')[0],
      image, // May be undefined or null
      keywords = [],
      author = AUTHOR.name || 'Default Author',
      authorUrl = AUTHOR.url || SITE_URL,
      draft = true,
    } = body;

    if (!originalSlug) {
      return NextResponse.json(
        {
          success: false,
          message: 'Original slug is required for updating the post',
        },
        { status: 400 },
      );
    }

    // Determine the new slug based on the title
    const newSlug = slugify(title);

    // Paths for the original post
    const originalPostDir = path.join(
      process.cwd(),
      'src',
      'posts',
      originalSlug,
    );
    const originalMdxFilePath = path.join(originalPostDir, 'page.mdx');
    const originalImageDir = path.join(
      process.cwd(),
      'public',
      'images',
      originalSlug,
    );

    // Check if the original post exists
    if (!fs.existsSync(originalMdxFilePath)) {
      return NextResponse.json(
        {
          success: false,
          message: `Post with slug "${originalSlug}" not found`,
        },
        { status: 404 },
      );
    }

    // Read the existing MDX content
    const mdxContent = fs.readFileSync(originalMdxFilePath, 'utf8');

    // Extract the existing metadata
    const metadataRegex = /export const metadata = ({[\s\S]*?});/;
    const metadataMatch = mdxContent.match(metadataRegex);

    if (!metadataMatch) {
      console.error(
        `Metadata section not found in file: ${originalMdxFilePath}`,
      );
      return NextResponse.json(
        {
          success: false,
          message: `Metadata section not found in "${originalSlug}"`,
        },
        { status: 400 },
      );
    }

    // Parse the existing metadata
    const rawMetadata = metadataMatch[1]
      .replace(/([\w]+):/g, '"$1":') // Wrap keys in quotes
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/“|”|‘|’/g, '"') // Replace smart quotes with standard quotes
      .replace(/—/g, '-') // Replace em dash with a simple dash
      .replace(/\\n/g, '\\n'); // Escape newlines

    let existingMetadata;
    try {
      existingMetadata = await import(`@/posts/${originalSlug}/page.mdx`); // Parse sanitized metadata
    } catch (err) {
      console.error('Failed to parse existing metadata:', err);
      console.error('Sanitized metadata string:', rawMetadata);
      throw new SyntaxError('Error: ' + err);
    }

    // Paths for the new post
    const newPostDir = path.join(process.cwd(), 'src', 'posts', newSlug);
    const newImageDir = path.join(process.cwd(), 'public', 'images', newSlug);

    // If the slug has changed, move the post to the new slug
    if (newSlug !== originalSlug) {
      // Check if the new slug already exists
      if (fs.existsSync(newPostDir)) {
        return NextResponse.json(
          {
            success: false,
            message: `A post with slug "${newSlug}" already exists`,
          },
          { status: 400 },
        );
      }

      // Create new directories
      fs.ensureDirSync(newPostDir);
      fs.ensureDirSync(newImageDir);

      // Copy the MDX file to the new directory
      const newMdxFilePath = path.join(newPostDir, 'page.mdx');
      fs.writeFileSync(newMdxFilePath, mdxContent, 'utf8');

      // Copy images from the old image directory to the new one
      if (fs.existsSync(originalImageDir)) {
        fs.copySync(originalImageDir, newImageDir);
      }

      // Delete the old post directory and image directory
      fs.removeSync(originalPostDir);
      fs.removeSync(originalImageDir);
    } else {
      // Slug hasn't changed, ensure directories exist
      fs.ensureDirSync(newPostDir);
      fs.ensureDirSync(newImageDir);
    }

    // Handle image processing
    const imageName = `${newSlug}.webp`;
    const imagePath = path.join(newImageDir, imageName);

    // Use existing image if new image is not provided
    let finalImage = image;
    if (!image) {
      finalImage = existingMetadata.image || '_placeholders/no-image.png';
    }

    if (
      finalImage &&
      typeof finalImage === 'string' &&
      finalImage.startsWith('data:')
    ) {
      // New image uploaded, process it
      try {
        const base64Data = finalImage.split(',')[1];
        const imageBuffer = Buffer.from(base64Data, 'base64');

        await sharp(imageBuffer).webp({ quality: 100 }).toFile(imagePath);
      } catch (error) {
        console.error('Image processing failed:', error);
        return NextResponse.json(
          { success: false, message: 'Image processing failed' },
          { status: 500 },
        );
      }
    } else if (!fs.existsSync(imagePath)) {
      // No image provided and image doesn't exist, use existing image or default
      if (
        existingMetadata.image &&
        fs.existsSync(
          path.join(process.cwd(), 'public', existingMetadata.image),
        )
      ) {
        // Copy existing image to new location if slug changed
        if (newSlug !== originalSlug) {
          const existingImagePath = path.join(
            process.cwd(),
            'public',
            existingMetadata.image,
          );
          fs.copySync(existingImagePath, imagePath);
        }
      } else {
        // Use default image
        const defaultImagePath = path.join(
          process.cwd(),
          'public',
          'images',
          '_placeholders',
          'no-image.png',
        );
        fs.copySync(defaultImagePath, imagePath);
      }
    }

    // Prepare metadata
    const metadata = {
      title,
      description,
      image: `/images/${newSlug}/${imageName}`,
      date: validateOrDefaultDate(date),
      author,
      authorUrl,
      openGraph: {
        title,
        description,
        url: `/blog/${newSlug}`,
        images: [
          {
            url: `${SITE_URL}/images/${newSlug}/${imageName}`,
            alt: title,
          },
        ],
        type: 'article',
        tags: keywords.map((kw: string) => kw.trim()),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image: `${SITE_URL}/images/${newSlug}/${imageName}`,
      },
      keywords: keywords.map((kw: string) => kw.trim()),
      slug: newSlug,
      readingTime: 1,
      draft,
    };

    delete require.cache[require.resolve('@/posts/slugs.json')];

    // Stringify metadata
    const metadataString = stringifyObject(metadata, {
      indent: '  ',
      singleQuotes: true,
    });

    // Extract the existing content after the metadata
    const contentLines = mdxContent.split('\n');
    const metadataEndIndex = contentLines.findIndex((line) =>
      line.trim().startsWith('Start adding your blog post content here...'),
    );
    const content = contentLines.slice(metadataEndIndex).join('\n');

    // Build updated MDX content
    const mdxContentUpdated = `import { SITE_URL, AUTHOR } from '@/config';\n\nexport const metadata = ${metadataString};\n\n${content}`;

    // Write the updated MDX content to the new MDX file
    const newMdxFilePath = path.join(newPostDir, 'page.mdx');
    fs.writeFileSync(newMdxFilePath, mdxContentUpdated, 'utf8');

    // Update slugs.json
    await generateSlugsJson();

    // Update the trigger file to force a rebuild
    const triggerFilePath = path.join(process.cwd(), 'trigger.js'); // Adjust the path if needed
    const triggerContent = `export const lastUpdate = ${Date.now()};\n`;
    fs.writeFileSync(triggerFilePath, triggerContent);

    return NextResponse.json({
      success: true,
      message: `Post "${title}" updated successfully`,
      slug: newSlug,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update post' },
      { status: 500 },
    );
  }
}
