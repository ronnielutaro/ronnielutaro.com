import type { Post } from '../get-posts';
import { Posts } from '../posts';
import { getAllPosts } from '../get-posts';
import type { ButtonsArrayType } from '@/__samwise/types/Buttons';
import PillarMenu from '@/components/pillar-menu';
import UniqueViewers from '../unique-viewers';

export const dynamic = 'force-static';
export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function PostsPage() {
  const posts: Post[] = await getAllPosts(
    process.env.NODE_ENV === 'production',
  );

  const buttons: ButtonsArrayType = [
    { type: 'edit-blog' },
    { type: 'create-post' },
  ];

  return (
    <>
      {/* If you're not sure which to read, try __, __, or __.
       */}
      <UniqueViewers />
      <Posts posts={posts} />
      {process.env.NODE_ENV === 'development' && (
        <PillarMenu buttons={buttons} />
      )}
    </>
  );
}
