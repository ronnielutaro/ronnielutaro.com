// src/app/blog/[slug]/edit/page.tsx
import { getPostContentBySlug } from '@/__samwise/utils/getPostContent';
import EditPostClient from './EditPostClient';
import { ReactNode } from 'react'; // Import ReactNode

type Params = Promise<{ slug: string }>;

interface LayoutProps {
  children: ReactNode;
  params: Params; // Define params as a promise
}

export default async function EditBlogPostLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const initialContent = await getPostContentBySlug(slug);

  return (
    <>
      {children}
      <EditPostClient slug={slug} initialContent={initialContent} />
    </>
  );
}
