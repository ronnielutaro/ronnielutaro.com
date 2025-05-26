import type { Post } from '../get-posts';
import { Posts } from '../posts';
import { getAllPosts } from '../get-posts';
import type { ButtonsArrayType } from '@/__samwise/types/Buttons';
import PillarMenu from '@/components/pillar-menu';
import UniqueViewers from '../unique-viewers';

export const dynamic = 'force-static';
export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function PostsPage() {
  // Fetch posts metadata
  const posts: Post[] = await getAllPosts(process.env.NODE_ENV === 'production');

  const buttons: ButtonsArrayType = [
    { type: 'edit-blog' },
    { type: 'create-post' },
  ];

  return (
    <>
      {/* Unique viewers component */}
      <UniqueViewers />
      {/* Render posts using the original Posts component */}
      <Posts posts={posts} />
      {/* Development-only buttons */}
      {process.env.NODE_ENV === 'development' && (
        <PillarMenu buttons={buttons} />
      )}
    </>
  );
}


