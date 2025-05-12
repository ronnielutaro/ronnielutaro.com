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
    const body = await request.json();

    const {
      title,
      description,
      date = new Date().toISOString().split('T')[0],
      image = '_placeholders/no-image.png',
      keywords = [],
      author = AUTHOR.name || 'Default Author',
      authorUrl = AUTHOR.url || SITE_URL,
      draft = true,
    } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 },
      );
    }

    const slug = slugify(title);
    const postDir = path.join(process.cwd(), 'src', 'posts', slug);
    const imageSlugDir = path.join(process.cwd(), 'public', 'images', slug);
    const imageName = `${slug}.webp`;
    const imagePath = path.join(imageSlugDir, imageName);

    fs.ensureDirSync(postDir);
    fs.ensureDirSync(imageSlugDir);

    // Handle image processing
    if (image !== '_placeholders/no-image.png') {
      try {
        let imageBuffer: Buffer;

        if (image.startsWith('data:')) {
          const base64Data = image.split(',')[1];
          imageBuffer = Buffer.from(base64Data, 'base64');
        } else {
          imageBuffer = fs.readFileSync(image);
        }

        await sharp(imageBuffer).webp({ quality: 100 }).toFile(imagePath);
      } catch (error) {
        console.error('Image processing failed:', error);
        return NextResponse.json(
          { success: false, message: 'Image processing failed' },
          { status: 500 },
        );
      }
    } else {
      const defaultImagePath = path.join(
        process.cwd(),
        'public',
        'images',
        '_placeholders',
        'no-image.png',
      );
      fs.copySync(defaultImagePath, imagePath);
    }

    // Prepare metadata with placeholders
    const metadata = {
      title,
      description,
      image: `/images/${slug}/${imageName}`,
      date: validateOrDefaultDate(date),
      author,
      authorUrl,
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        images: [
          {
            url: 'TEMPLATE_LITERAL_SITE_URL_IMAGE_PATH',
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
        image: 'TEMPLATE_LITERAL_SITE_URL_IMAGE_PATH',
      },
      keywords: keywords.map((kw: string) => kw.trim()),
      slug,
      readingTime: 1,
      draft,
    };

    // Stringify metadata with custom transform
    const metadataString = stringifyObject(metadata, {
      indent: '  ',
      singleQuotes: true,
      transform: (obj, prop, originalResult) => {
        if (
          (prop === 'url' || prop === 'image') &&
          originalResult.includes("'TEMPLATE_LITERAL_SITE_URL_IMAGE_PATH'")
        ) {
          return `\`${'/images/' + slug + '/' + imageName}\``;
        }
        return originalResult;
      },
    });

    // Build MDX content
    const mdxContent = `import { SITE_URL, AUTHOR } from '@/config';\n\nexport const metadata = ${metadataString};\n\nStart adding your blog post content here...\n`;

    // Write the MDX file
    const mdxFilePath = path.join(postDir, 'page.mdx');
    fs.writeFileSync(mdxFilePath, mdxContent, 'utf8');

    await generateSlugsJson();
    delete require.cache[require.resolve('@/posts/slugs.json')];

    return NextResponse.json({
      success: true,
      message: `Blog post "${title}" created successfully`,
      slug,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 },
    );
  }
}
