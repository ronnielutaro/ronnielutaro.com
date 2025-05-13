import React from 'react';
import { A as a } from './blog/components/a';
import { P as p } from './blog/components/p';
import { H1 as h1 } from './blog/components/h1';
import { H2 as h2 } from './blog/components/h2';
import { H3 as h3 } from './blog/components/h3';
import { H4 as h4 } from './blog/components/h4';
import { OL as ol } from './blog/components/ol';
import { UL as ul } from './blog/components/ul';
import { LI as li } from './blog/components/li';
import { HR as hr } from './blog/components/hr';
import { Figure } from './blog/components/figure';
import { Caption } from './blog/components/caption';
import { YouTube } from './blog/components/youtube';
import { Ref, FootNotes, FootNote } from './blog/components/footnotes';
import { Blockquote as blockquote } from './blog/components/blockquote';
import { InlineCode } from './blog/components/code';
import { Admonition } from './blog/components/admonition';
import { TableOfContents } from './blog/components/toc';
import PhotoGrid from './components/photo-grid';
import Strava from './blog/components/strava';
import TikTok from './blog/components/tiktok';
import LinkedIn from './blog/components/linkedin';
import { Tweet } from './blog/components/tweet';
import Instagram from './blog/components/instagram'; // <-- new import
import Newsletter from './components/newsletter'; // Import Newsletter component
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from './blog/components/table';
import Image from 'next/image';
import { MemoizedImage } from './components/memoized-image';
import Grid from './components/grid';
import LinkButton from './components/link-button';
import PDF from './blog/components/pdf'; // Import PDFViewer component
import StarRating from './blog/components/rating';
import MP3 from './blog/components/mp3';
import { Del } from './blog/components/del'; // wherever you placed it
import { MP4 } from './blog/components/mp4';
import { Latex } from './blog/components/latex';
// Import KaTeX components
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath, BlockMath } from 'react-katex';
import { Spotify } from './blog/components/spotify';
import './globals.css';

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
