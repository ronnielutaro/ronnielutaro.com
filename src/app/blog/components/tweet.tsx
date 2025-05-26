import { type ReactNode, Suspense } from 'react';
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

// Placeholder function to simulate fetching a tweet
async function getTweetPlaceholder(id: string): Promise<Tweet | undefined> {
  console.warn(`Fetching tweet with ID: ${id} (placeholder logic)`);
  return undefined; // Replace with actual logic later if needed
}

const TweetContent = async ({ id, components }: TweetProps) => {
  const tweet = id ? await getTweetPlaceholder(id) : undefined;

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
