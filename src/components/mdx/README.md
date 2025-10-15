# MDX Components

Shared MDX component mappings for consistent markdown rendering across the application.

## Overview

This directory contains reusable MDX component definitions that ensure all markdown content is styled consistently throughout the site. By centralizing these components, we follow the DRY (Don't Repeat Yourself) principle and make it easy to update styling globally.

## Files

- **MDXComponents.tsx** - Defines styled HTML element mappings for MDX content

## Usage

### Basic Usage (Standard Markdown Only)

For pages that only need standard markdown elements (paragraphs, headings, lists, etc.):

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { baseMDXComponents } from '@/components/mdx/MDXComponents';

export default function MyPage() {
  const content = "# Hello\n\nThis is a paragraph.";
  
  return (
    <div>
      <MDXRemote source={content} components={baseMDXComponents} />
    </div>
  );
}
```

### Advanced Usage (Custom Components + Standard Markdown)

For pages that need custom MDX components (like case studies with special components) in addition to standard markdown:

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { createMDXComponents } from '@/components/mdx/MDXComponents';
import { Callout } from '@/components/projects/Callout';
import { Quote } from '@/components/projects/Quote';

const mdxComponents = createMDXComponents({
  Callout,
  Quote,
  // Add more custom components as needed
});

export default function ProjectPage() {
  return (
    <MDXRemote source={content} components={mdxComponents} />
  );
}
```

## Styled Elements

The base components include styling for:

- **Headings**: h1, h2, h3, h4
- **Text**: p, strong, em
- **Lists**: ul, ol, li
- **Links**: a
- **Code**: code, pre
- **Quotes**: blockquote
- **Dividers**: hr

## Customization

To override a base component style for a specific page:

```tsx
const mdxComponents = createMDXComponents({
  // Override the paragraph style for this page only
  p: (props) => <p className="text-xl text-white" {...props} />,
});
```

## Examples

- **About Page**: Uses `baseMDXComponents` directly (no custom components needed)
- **Project Pages**: Uses `createMDXComponents()` to merge base styles with custom case study components

## Benefits

✅ **DRY Principle**: Define component styles once, use everywhere  
✅ **Consistency**: All markdown content looks the same across the site  
✅ **Maintainability**: Update styling in one place to affect all pages  
✅ **Flexibility**: Easy to add custom components while keeping base styles  
✅ **Type Safety**: Full TypeScript support with proper prop types
