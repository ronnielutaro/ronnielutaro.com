import { type ReactNode, Suspense } from 'react';
import { container } from '@/lib/cosmosdb';
import { type Tweet, getTweet } from 'react-tweet/api';
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TweetProps,
} from 'react-tweet';
import { Caption } from './caption';
import './tweet.css';

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

async function getAndCacheTweet(id: string): Promise<Tweet | undefined> {
  try {
    // Check if the tweet is already cached in Cosmos DB
    const { resource: cachedTweet } = await container.item(id, id).read();

    if (cachedTweet) {
      return cachedTweet as Tweet;
    }

    // Fetch the tweet from the API
    const tweet = await getTweet(id);

    if (tweet) {
      // Cache the tweet in Cosmos DB
      await container.items.create({
        id,
        ...tweet,
      });
      return tweet;
    }
  } catch (error) {
    console.error('Error fetching or caching tweet:', error);
  }

  return undefined;
}

const TweetContent = async ({ id, components }: TweetProps) => {
  const tweet = id ? await getAndCacheTweet(id) : undefined;

  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => (
  <Suspense fallback={<TweetSkeleton />}>
    <TweetContent {...props} />
  </Suspense>
);

export async function Tweet({ id, caption }: TweetArgs) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <ReactTweet id={id} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
