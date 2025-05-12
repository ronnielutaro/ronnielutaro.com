import { container } from '@/lib/cosmosdb';

export async function POST(request) {
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

  if (existingSubscribers.length === 0) {
    return NextResponse.json(
      { success: false, message: 'Email not found in subscribers list' },
      { status: 404 },
    );
  }

  await container
    .item(existingSubscribers[0].id, existingSubscribers[0].id)
    .delete();

  return NextResponse.json(
    { success: true, message: 'Successfully unsubscribed' },
    { status: 200 },
  );
}
