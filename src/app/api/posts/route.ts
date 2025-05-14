import { NextResponse } from 'next/server';
import { getAllPosts } from '../../get-posts';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return NextResponse.json(
    await getAllPosts(process.env.NODE_ENV === 'production'),
  );
}
