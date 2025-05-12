// src/app/api/blog/save/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { updateReadingTime } from '@/__samwise/utils/updateReadingTime';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { slug, content } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required.' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'posts', slug, 'page.mdx');

  try {
    await fs.writeFile(filePath, content, 'utf8');

    // Update reading time after saving the file
    updateReadingTime(slug);

    return NextResponse.json({
      message: 'Post saved and reading time updated successfully!',
    });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json(
      { error: 'Failed to save post.' },
      { status: 500 },
    );
  }
}
