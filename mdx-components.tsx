import React from 'react';
import { A as a } from '@/app/blog/components/a';
import { P as p } from '@/app/blog/components/p';
import { H1 as h1 } from '@/app/blog/components/h1';
import { H2 as h2 } from '@/app/blog/components/h2';
import { H3 as h3 } from '@/app/blog/components/h3';
import { H4 as h4 } from '@/app/blog/components/h4';
import { OL as ol } from '@/app/blog/components/ol';
import { UL as ul } from '@/app/blog/components/ul';
import { LI as li } from '@/app/blog/components/li';
import { HR as hr } from '@/app/blog/components/hr';
import { Figure } from '@/app/blog/components/figure';
import { Caption } from '@/app/blog/components/caption';
import { YouTube } from '@/app/blog/components/youtube';
import { Ref, FootNotes, FootNote } from '@/app/blog/components/footnotes';
import { Blockquote as blockquote } from '@/app/blog/components/blockquote';
import { InlineCode } from '@/app/blog/components/code';
import { Admonition } from '@/app/blog/components/admonition';
import { TableOfContents } from '@/app/blog/components/toc';
import PhotoGrid from '@/components/photo-grid';
import Strava from '@/app/blog/components/strava';
import TikTok from '@/app/blog/components/tiktok';
import LinkedIn from '@/app/blog/components/linkedin';
import { Tweet } from '@/app/blog/components/tweet';
import Instagram from '@/app/blog/components/instagram'; // <-- new import
import Newsletter from '@/components/newsletter'; // Import Newsletter component
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from '@/app/blog/components/table';
import Image from 'next/image';
import { MemoizedImage } from '@/components/memoized-image';
import Grid from '@/components/grid';
import LinkButton from '@/components/link-button';
import PDF from '@/app/blog/components/pdf'; // Import PDFViewer component
import StarRating from '@/app/blog/components/rating';
import MP3 from '@/app/blog/components/mp3';
import { Del } from '@/app/blog/components/del'; // wherever you placed it
import { MP4 } from '@/app/blog/components/mp4'; // Update the path as necessary
// Import KaTeX components
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath, BlockMath } from 'react-katex';
import { Latex } from '@/app/blog/components/latex';
import { Spotify } from '@/app/blog/components/spotify';
import './src/app/globals.css';

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Collect all components into an object
export const MDXComponents = {
  a,
  h1,
  h2,
  h3,
  h4,
  p,
  ol,
  ul,
  li,
  del: Del,
  hr,
  code: InlineCode,
  blockquote,
  Admonition,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // Destructure width and height to remove them from rest
    const {
      src,
      alt,
      width: _unusedWidth,
      height: _unusedHeight,
      ...rest
    } = props;
    if (!src) return null;

    // Check if the src ends with '.gif' (case-insensitive)
    const isGif = src.toLowerCase().endsWith('.gif');
    const width = 672;
    const height = 500;
    return (
      <MemoizedImage
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        loading="lazy"
        priority={false}
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
        // If the image is a GIF, set unoptimized to true
        unoptimized={isGif}
        {...rest}
      />
    );
  },

  Figure,
  Caption,
  YouTube,
  PhotoGrid,
  Strava,
  TikTok,
  LinkedIn,
  Instagram,
  Tweet,
  Newsletter, // Add Newsletter component
  Spotify,
  Ref,
  FootNotes,
  FootNote,
  TableOfContents,
  table: Table,
  th: TableHeader,
  td: TableCell,
  tr: TableRow,
  Image,
  Grid,
  LinkButton,
  MemoizedImage,
  PDF,
  StarRating,
  MP3,
  MP4, // Add MP4 component here
  video: MP4,
  InlineMath,
  BlockMath,
  Latex,
};

// Export useMDXComponents function
export function useMDXComponents(components = {}) {
  return {
    ...components,
    ...MDXComponents,
  };
}
