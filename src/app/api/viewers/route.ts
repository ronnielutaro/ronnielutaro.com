// app/api/viewers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/lib/cosmosdb';

export async function GET(req: NextRequest) {
  // Get the URL for the request
  const url = new URL(req.url);
  const rawPath = url.searchParams.get('path') || '/';

  // Sanitize the path to create a valid Cosmos DB id
  const sanitizedPath = rawPath.replace(/[\/\\?#%]/g, '_'); // Replace illegal characters with '_'

  // Retrieve the IP address from the x-forwarded-for header
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : null;

  try {
    // Check if the viewer already exists for this path
    const { resource: viewerData } = await container
      .item(sanitizedPath, sanitizedPath)
      .read();

    const uniqueViewers = viewerData?.uniqueViewers || {};

    if (ip) {
      uniqueViewers[ip] = (uniqueViewers[ip] || 0) + 1;

      // Update the unique viewers in Cosmos DB
      await container.items.upsert({
        id: sanitizedPath,
        uniqueViewers,
      });
    }

    // Return the count of unique viewers
    const uniqueCount = Object.keys(uniqueViewers).length;
    return NextResponse.json({ count: uniqueCount });
  } catch (error) {
    console.error('Error fetching or updating unique viewers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unique viewers' },
      { status: 500 },
    );
  }
}

const regex = /pattern/; // Replace \/ with /
