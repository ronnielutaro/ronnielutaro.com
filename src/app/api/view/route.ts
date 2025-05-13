import { container } from '../../../lib/cosmosdb';
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

  const isProduction = process.env.VERCEL_ENV === 'production';

  if (isProduction && url.searchParams.get('incr') != null) {
    const { resource: viewData } = await container.item(id, id).read();
    const views = (viewData?.views || 0) + 1;

    await container.items.upsert({ id, views });

    return NextResponse.json({
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    });
  } else {
    const { resource: viewData } = await container.item(id, id).read();
    const views = viewData?.views || 0;

    return NextResponse.json({
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    });
  }
}
