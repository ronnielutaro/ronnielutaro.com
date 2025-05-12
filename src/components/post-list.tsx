import React from 'react';
import { Post } from '@/app/get-posts';
import BlogPost from './blog-post';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <div className="text-sm">
    <ul className="space-y-4 list-none pt-4">
      {posts.map((post, index) => (
        <li
          key={post.slug}
          className="border-b border-border sm:border-0 last:border-b-0"
        >
          <BlogPost post={post} index={index} />
        </li>
      ))}
    </ul>
  </div>
);

export default PostList;
