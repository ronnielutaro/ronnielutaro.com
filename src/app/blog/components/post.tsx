import React from 'react';

type PostProps = {
  metadata: {
    title: string;
    description: string;
    readingTime: number;
    date: string;
    author: string;
  };
};

const BlogPost: React.FC<PostProps> = ({ metadata }) => {
  return (
    <div className="blog-post">
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <p>
        <strong>Reading Time:</strong> {metadata.readingTime} min read
      </p>
      <p>
        <strong>Published on:</strong> {metadata.date}
      </p>
      <p>
        <strong>Author:</strong> {metadata.author}
      </p>
    </div>
  );
};

export default BlogPost;