import postsData from '@/app/posts.json';
import commaNumber from 'comma-number';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id || id === 'undefined') {
    return NextResponse.json(
      { error: { message: 'Missing "id" query', code: 'MISSING_ID' } },
      { status: 400 },
    );
  }

  const post = postsData.posts.find((post) => post.slug === id);

  if (!post) {
    return NextResponse.json(
      { error: { message: 'Unknown post', code: 'UNKNOWN_POST' } },
      { status: 400 },
    );
  }

  // Placeholder logic for views
  const placeholderViews = 123; // Replace with real data later
  const incrementViews = url.searchParams.get('incr') != null;

  const views = incrementViews ? placeholderViews + 1 : placeholderViews;

  return NextResponse.json({
    ...post,
    views,
    viewsFormatted: commaNumber(views),
  });
}
