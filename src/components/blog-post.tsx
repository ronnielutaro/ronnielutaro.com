import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/get-posts';

interface BlogPostProps {
  post: Post;
  index: number;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, index }) => (
  <Link
    href={`/blog/${post.slug}`}
    prefetch
    className="block transition-transform duration-200 ease-in-out active:scale-[0.995] active:opacity-80"
  >
    <article
      className="flex sm:p-4 gap-4 items-start pb-4
             sm:border sm:border-border
             rounded-0 sm:rounded-md
             hover:border-foreground
             sm:transition-colors sm:duration-300"
    >
      <div className="flex-grow space-y-2 min-w-0">
        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-semibold leading-tight">
          {post.title}
        </h2>

        {/* Description */}
        {post.description && (
          <p
            className="text-[#646464] dark:text-[#B4B4B4] text-base
                       line-clamp-3  /* Default for mobile */
                       sm:line-clamp-4 /* Clamp to 2 lines on desktop */
          "
          >
            {post.description}
          </p>
        )}
      </div>

      {/* Image Section */}
      {post.image && (
        <div className="relative w-[110px] h-[110px] flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={post.image || '/placeholder.svg?height=220&width=220'}
            alt={post.title || 'Blog post image'}
            fill
            sizes="(max-width: 768px) 110px, 220px"
            quality={100}
            className="object-cover"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
        </div>
      )}
    </article>
  </Link>
);

export default BlogPost;
