'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import useSWR from 'swr';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

// --- Types

type SortSetting = ['date' | 'views' | 'title', 'desc' | 'asc'];

interface Post {
  slug: string;
  title: string;
  date?: string | null;
  views?: number;
  // Other fields from your list posts…
}

interface PostDetails {
  image: string;
  description: string;
}

interface PostsProps {
  posts: Post[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- Main Posts Component

export function Posts({ posts: initialPosts }: PostsProps) {
  const [sort, setSort] = useState<SortSetting>(['date', 'desc']);

  // SWR fetch for posts list with fallback data
  const { data: posts } = useSWR('/api/posts', fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  });

  // State for the hovered post and current mouse position
  const [hoveredPost, setHoveredPost] = useState<Post | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- Sorting functions

  function sortDate() {
    setSort((prevSort) => [
      'date',
      prevSort[0] !== 'date' || prevSort[1] === 'asc' ? 'desc' : 'asc',
    ]);
  }

  function sortViews() {
    setSort((prevSort) => [
      'views',
      prevSort[0] !== 'views' || prevSort[1] === 'asc' ? 'desc' : 'asc',
    ]);
  }

  function sortTitle() {
    setSort((prevSort) => [
      'title',
      prevSort[0] !== 'title' || prevSort[1] === 'asc' ? 'desc' : 'asc',
    ]);
  }

  return (
    <>
      <Suspense fallback={null}>
        <main className="max-w-2xl font-mono m-auto text-sm relative">
          <header className="text-muted-foreground flex items-center text-xs">
            {/* Date Sort Button */}
            <button
              onClick={sortDate}
              className={`w-12 h-9 text-left flex items-center ${
                sort[0] === 'date'
                  ? 'text-black dark:text-white'
                  : 'text-[#555] dark:text-[#999]'
              }`}
            >
              date
              <span className="ml-1">
                <SortIcon sortKey="date" currentSort={sort} />
              </span>
            </button>

            {/* Title Sort Button */}
            <button
              onClick={sortTitle}
              className={`h-9 pl-4 flex items-center flex-grow ${
                sort[0] === 'title'
                  ? 'text-black dark:text-white'
                  : 'text-[#555] dark:text-[#999]'
              }`}
            >
              title
              <span className="ml-1">
                <SortIcon sortKey="title" currentSort={sort} />
              </span>
            </button>

            {/* Views Sort Button */}
            <button
              onClick={sortViews}
              className={`h-9 pl-4 flex items-center ${
                sort[0] === 'views'
                  ? 'text-black dark:text-white'
                  : 'text-[#555] dark:text-[#999]'
              }`}
            >
              views
              <span className="ml-1">
                <SortIcon sortKey="views" currentSort={sort} />
              </span>
            </button>
          </header>

          {/* Pass callbacks to List so each item can report hover and mouse position */}
          <List
            posts={posts}
            sort={sort}
            onPostHover={(post) => setHoveredPost(post)}
            onPostLeave={() => setHoveredPost(null)}
            onPostMouseMove={(pos) => setMousePos(pos)}
          />
        </main>
      </Suspense>
      {/* Render the hover preview modal */}
      <HoverPreviewModal hoveredPost={hoveredPost} mousePos={mousePos} />
    </>
  );
}

// --- Sort Icon Component

interface SortIconProps {
  sortKey: 'date' | 'views' | 'title';
  currentSort: SortSetting;
}

function SortIcon({ sortKey, currentSort }: SortIconProps) {
  const [currentSortKey, currentSortDirection] = currentSort;

  if (sortKey !== currentSortKey) {
    return <ArrowUpDown className="h-4 w-4" />;
  }

  return currentSortDirection === 'asc' ? (
    <ArrowUp className="h-4 w-4" />
  ) : (
    <ArrowDown className="h-4 w-4" />
  );
}

// --- List Component

interface ListProps {
  posts: Post[];
  sort: SortSetting;
  onPostHover: (post: Post) => void;
  onPostLeave: () => void;
  onPostMouseMove: (pos: { x: number; y: number }) => void;
}

function List({
  posts,
  sort,
  onPostHover,
  onPostLeave,
  onPostMouseMove,
}: ListProps) {
  const sortedPosts = useMemo(() => {
    const [sortKey, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      if (sortKey === 'date') {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
      } else if (sortKey === 'views') {
        const viewsA = a.views ?? 0;
        const viewsB = b.views ?? 0;
        return sortDirection === 'desc' ? viewsB - viewsA : viewsA - viewsB;
      } else if (sortKey === 'title') {
        const titleA = a.title?.toLowerCase() || '';
        const titleB = b.title?.toLowerCase() || '';
        if (titleA < titleB) return sortDirection === 'desc' ? 1 : -1;
        if (titleA > titleB) return sortDirection === 'desc' ? -1 : 1;
        return 0;
      }
      return 0;
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post, i) => {
        const year = getYear(post.date);
        const firstOfYear =
          !sortedPosts[i - 1] || getYear(sortedPosts[i - 1].date) !== year;
        const lastOfYear =
          !sortedPosts[i + 1] || getYear(sortedPosts[i + 1].date) !== year;

        return (
          <li
            key={post.slug}
            onMouseEnter={() => onPostHover(post)}
            onMouseMove={(e) => onPostMouseMove({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => onPostLeave()}
          >
            <Link href={`/blog/${post.slug}/`} prefetch>
              <span
                className={`flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y dark:border-[#313131]
                          ${!firstOfYear ? 'border-t-0' : ''}
                          ${lastOfYear ? 'border-b-0' : ''}
                          ${i === 0 ? 'border-t border-t-[#d4d4d4] dark:border-t-[#555]' : ''}`}
              >
                <span
                  className={`py-3 flex grow items-start ${
                    !firstOfYear ? 'ml-14' : ''
                  }`}
                >
                  {firstOfYear && (
                    <span className="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-[#999999]">
                      {year}
                    </span>
                  )}
                  <div className="flex flex-nowrap grow">
                    <span className="dark:text-gray-100 break-words flex-grow min-w-0 lowercase">
                      {post.title}
                    </span>
                    <span className="text-gray-500 dark:text-[#999999] text-right text-xs flex-shrink-0 whitespace-nowrap min-w-[48px]">
                      {(post.views ?? 0).toLocaleString()}
                    </span>
                  </div>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getYear(date?: string | null) {
  return date ? new Date(date).getFullYear() : 'Unknown';
}

// --- Hover Preview Modal Component

interface HoverPreviewModalProps {
  hoveredPost: Post | null;
  mousePos: { x: number; y: number };
}

function HoverPreviewModal({ hoveredPost, mousePos }: HoverPreviewModalProps) {
  // Use local state for the modal’s animated position
  const [modalPos, setModalPos] = useState({ x: mousePos.x, y: mousePos.y });

  // Animate the modal to gradually follow the mouse position
  useEffect(() => {
    let animationFrameId: number;
    const updatePosition = () => {
      setModalPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    updatePosition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Fetch additional details (like image and description) for the hovered post.
  // Until the data is loaded, display a skeleton.
  const { data: postDetails } = useSWR<PostDetails>(
    hoveredPost ? `/api/posts/${hoveredPost.slug}` : null,
    fetcher,
  );

  // Optionally, render this only on desktop devices:
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  if (!hoveredPost) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: modalPos.x + 20, // offset so it appears to the right of the mouse
        top: modalPos.y,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div className="p-4 bg-white dark:bg-[#333] shadow-lg rounded">
        {!postDetails ? (
          // Skeleton loader while data is loading
          <div className="animate-pulse">
            <div className="h-32 w-48 bg-gray-300 dark:bg-gray-600 mb-2"></div>
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600"></div>
          </div>
        ) : (
          <div>
            <img
              src={postDetails.image}
              alt={hoveredPost.title}
              className="w-48 h-32 object-cover mb-2"
            />
            <p className="text-sm text-muted-foreground">
              {postDetails.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
