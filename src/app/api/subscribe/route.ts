// app/api/subscribe/route.ts
import { container } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json(
      { success: false, message: 'Invalid email format' },
      { status: 400 },
    );
  }

  const { resources: existingSubscribers } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.type = @type AND c.email = @email',
      parameters: [
        { name: '@type', value: 'subscriber' },
        { name: '@email', value: email },
      ],
    })
    .fetchAll();

  if (existingSubscribers.length > 0) {
    return NextResponse.json(
      {
        success: true,
        message: 'Email already subscribed',
        alreadySubscribed: true,
      },
      { status: 200 },
    );
  }

  await container.items.create({
    id: email,
    type: 'subscriber',
    email,
    subscribedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    { success: true, message: 'Successfully subscribed' },
    { status: 200 },
  );
}
