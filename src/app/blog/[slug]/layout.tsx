import { getAllPosts } from '../../get-posts';
import Header from './header';
import RelatedPosts from '@/components/related-posts';
import { ReactNode } from 'react';
import BottomBar from '@/components/bottom-bar';
// import CommentsSection from '@/__samwise/modules/comments/templates/CommentsSection';
import { TableOfContents } from '@/app/blog/components/toc';
import { redirect } from 'next/navigation';
import PillarMenu from '@/components/pillar-menu';
import { ButtonsArrayType } from '@/__samwise/types/Buttons';
import Newsletter from '@/components/newsletter'; // Adjust the import path based on your project structure

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

interface LayoutProps {
  children: ReactNode;
  params: Params; // Define params as a promise
}

export default async function BlogLayout({ children, params }: LayoutProps) {
  const { slug } = await params; // Await params before accessing slug
  const posts = await getAllPosts(process.env.NODE_ENV === 'production');
  const buttons: ButtonsArrayType = [
    { type: 'toggle-edit-mode' }, // Added toggle-edit-mode button
    { type: 'edit-post' },
    { type: 'delete-post' },
  ];

  // Use the first element of slug array, assuming it's the main slug
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    // Post not found, redirect to home page
    redirect('/');
  }

  return (
    <article className="mb-10 text-pretty">
      <Header posts={posts} currentPost={currentPost} />
      <TableOfContents />
      {children}
      <BottomBar />
      {/*      <Newsletter />
       */}{' '}
      {/* to be added in next version <CommentsSection/> */}
      <RelatedPosts
        currentPostSlug={slug}
        currentPostKeywords={currentPost.keywords}
        posts={posts}
      />
      {process.env.NODE_ENV === 'development' && (
        <PillarMenu buttons={buttons} slug={slug} currentPost={currentPost} />
      )}
    </article>
  );
}
