
# MDX Project Content Management

This project uses MDX (Markdown + JSX) for content management, allowing you to easily add and manage project case studies without touching any code. Blog functionality has been removed; all content should be added as projects.

## Folder Structure

```
content/
└── projects/       # Project case studies
    ├── rocketize.mdx
    └── starthub.mdx
```

## Adding New Content

### Project Case Studies

1. Create a new `.mdx` file in the `content/projects/` folder
2. Use kebab-case for the filename (e.g., `my-project.mdx`)
3. Add frontmatter at the top of the file:

```markdown
---
title: "Your Project Name"
date: "2025-10-14"
tags: [Product, SaaS, Design]
excerpt: "A brief description of your project."
category: "Product"  # Optional
image: "https://your-image-url.com/image.jpg"  # Optional
---

# Your Project Name

Describe your project here using Markdown and JSX.
```


## Frontmatter Fields

| Field      | Required | Type   | Description                          |
|------------|----------|--------|--------------------------------------|
| `title`    | Yes      | String | The title of your project            |
| `date`     | Yes      | String | Publication date (YYYY-MM-DD format) |
| `tags`     | Yes      | Array  | List of tags for categorization      |
| `excerpt`  | Yes      | String | Brief description for listings       |
| `category` | No       | String | Content category                     |
| `image`    | No       | String | URL to featured image                |


## Automatic Features

- **Auto-listing**: New MDX files automatically appear on the projects page
- **SEO-friendly URLs**: Filenames become URL slugs (e.g., `my-project.mdx` → `/projects/my-project`)
- **Static generation**: All content is pre-built for optimal performance
- **Responsive images**: Images are automatically optimized by Next.js
- **Search engine optimization**: Metadata is automatically generated from frontmatter


## Content Best Practices

1. **Use descriptive filenames**: Choose clear, SEO-friendly names
2. **Write compelling excerpts**: These appear in search results and listings
3. **Choose relevant tags**: Help users discover related content
4. **Optimize images**: Use high-quality images with appropriate alt text
5. **Structure with headings**: Use `##` and `###` for clear content hierarchy


## Development Workflow

1. Add your `.mdx` file to the `content/projects/` folder
2. The content will automatically appear on the site
3. No code changes or deployments needed!


## Technical Details

- Built with Next.js App Router and MDX
- Uses `gray-matter` for frontmatter parsing
- Supports full MDX features (Markdown + React components)
- Static site generation for optimal performance
- TypeScript support throughout


## Testing

The content loading system includes comprehensive tests:

```bash
npm test
```

Tests verify:
- Content loading and parsing
- Frontmatter validation
- Slug generation
- Error handling
```