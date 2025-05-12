'use client';

import { useEffect, useRef } from 'react';
import type { Post } from '../../get-posts';
import useSWR from 'swr';
import type { KeyedMutator } from 'swr';
import { ago } from 'time-ago';
import { Calendar, BookOpen, Eye } from '@phosphor-icons/react'; // Updated to Phosphor icons

interface HeaderProps {
  posts: Post[] | null;
  currentPost: Post | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header({ currentPost }: HeaderProps) {
  const slug = currentPost?.slug;

  const { data: post, mutate } = useSWR(
    slug ? `/api/view?id=${slug}` : null,
    fetcher,
    {
      fallbackData: currentPost,
      refreshInterval: 5000,
    },
  );

  if (currentPost == null) return <></>;

  return (
    <>
      {/* Header Section */}
      <h1 className="text-3xl sm:text-4xl font-semibold dark:text-gray-100">
        {post.title}
      </h1>
      {post.description && (
        <p className="italic mt-2 text-xl font-serif text-muted-foreground">
          {post.description}
        </p>
      )}
      <p className="font-mono pb-3 text-xs flex flex-wrap justify-between items-center mt-3 text-muted-foreground/70">
        {/* Left Section (Author, Date, and Mins Read) */}
        <span className="flex flex-col md:flex-row items-start md:items-center md:gap-2 gap-2">
          {/* Author */}
          <span className="hidden md:inline">
            <a
              href={'https://x.com/theronnielutaro'}
              className="hover:text-gray-500 dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              @theronnielutaro
            </a>
            <span className="hidden md:inline ml-2">|</span>
          </span>

          {/* Date */}
          <span className="flex items-center">
            <Calendar weight="regular" className="w-4 h-4 mr-2 opacity-70" />
            <span suppressHydrationWarning={true}>
              {post.date || 'Unknown date'} (
              {post.date ? `${ago(post.date, true)} ago` : ''})
            </span>
            <span className="hidden md:inline ml-2">|</span>
          </span>

          {/* Mins Read */}
          <span className="flex items-center">
            <BookOpen weight="regular" className="w-4 h-4 mr-2 opacity-70" />
            <span>{post.readingTime} mins read</span>
          </span>
        </span>

        {/* Right Section (Views) */}
        <span className="flex items-center mt-2 md:mt-0">
          <Views
            id={post.slug || post.id}
            mutate={mutate}
            defaultValue={post.viewsFormatted}
          />
        </span>
      </p>
    </>
  );
}

function Views({
  id,
  mutate,
  defaultValue,
}: {
  id: string | undefined;
  mutate: KeyedMutator<{ views: number }>;
  defaultValue: number | null;
}) {
  const views = defaultValue;
  const didLogViewRef = useRef(false);

  useEffect(() => {
    if ('development' === process.env.NODE_ENV) return;
    if (!didLogViewRef.current && id) {
      const url = '/api/view?incr=1&id=' + encodeURIComponent(id);
      fetch(url)
        .then((res) => res.json())
        .then((obj) => {
          mutate(obj);
        })
        .catch(console.error);
      didLogViewRef.current = true;
    }
  });

  return (
    <>
      {views != null ? (
        <span className="flex items-center">
          <Eye weight="regular" className="w-4 h-4 mr-2 opacity-70" />
          {views} views
        </span>
      ) : null}
    </>
  );
}
