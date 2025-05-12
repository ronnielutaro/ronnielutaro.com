import { promises as fs } from 'fs';
import path from 'path';
import { generateSlugsJson } from '@/__samwise/utils/generateSlugs';
import { NextResponse } from 'next/server'; // Import NextResponse

async function deleteDirectory(dirPath: string): Promise<void> {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
  } catch (error) {
    console.error(`Error deleting directory ${dirPath}:`, error);
  }
}

async function deletePostBySlug(slug: string): Promise<boolean> {
  try {
    const postDir = path.resolve(process.cwd(), 'src', 'posts', slug);
    const imagesDir = path.resolve(process.cwd(), 'public', 'images', slug);

    // Remove post and image directories
    await deleteDirectory(postDir);
    await deleteDirectory(imagesDir);

    // Regenerate slugs.json
    await generateSlugsJson();

    console.log(
      `Successfully deleted post and updated slugs.json for slug: ${slug}`,
    );
    return true;
  } catch (error) {
    console.error(`Failed to delete post for slug "${slug}":`, error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required.' },
        { status: 400 },
      );
    }

    const success = await deletePostBySlug(slug);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Post deleted successfully.',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to delete post.' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 },
    );
  }
}
