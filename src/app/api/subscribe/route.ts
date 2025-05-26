// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json(
      { success: false, message: 'Invalid email format' },
      { status: 400 },
    );
  }

  // Placeholder logic for checking existing subscribers
  const existingSubscribers = ['test@example.com']; // Replace with real data later
  if (existingSubscribers.includes(email)) {
    return NextResponse.json(
      {
        success: true,
        message: 'Email already subscribed',
        alreadySubscribed: true,
      },
      { status: 200 },
    );
  }

  // Placeholder logic for adding a new subscriber
  console.log(`New subscriber added: ${email}`); // Replace with real data later

  return NextResponse.json(
    { success: true, message: 'Successfully subscribed' },
    { status: 200 },
  );
}
