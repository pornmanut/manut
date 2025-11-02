# Personal Blog Website Plan

## Overview
A Medium-inspired personal blog website built with Astro, featuring clean typography, tag-based filtering, and a simple content management system.

## Site Structure & Data Model

### Content Collections Schema
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { blog };
```

### File Structure
```
src/
├── content/
│   └── blog/
│       ├── 2024/
│       │   ├── my-first-post.md
│       │   └── another-post.md
│       └── 2023/
│           └── older-post.md
├── layouts/
│   ├── BlogLayout.astro
│   └── PostLayout.astro
├── pages/
│   ├── index.astro (blog listing)
│   ├── blog/
│   │   ├── [...slug].astro (individual posts)
│   │   └── tag/
│   │       └── [tag].astro (tag filtering)
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── PostCard.astro
│   └── TagFilter.astro
└── styles/
    └── global.css
```

## UI/UX Design Plan

### Medium-Inspired Design Elements

1. **Typography**
   - Primary font: Charter or Georgia for body text (serif, readable)
   - Secondary font: Inter or system-ui for headings and UI
   - Base font size: 21px for optimal readability
   - Line height: 1.58 for comfortable reading

2. **Color Scheme**
   - Primary: #1A1A1A (dark text)
   - Secondary: #757575 (muted text)
   - Accent: #0066CC (links)
   - Background: #FFFFFF (clean white)
   - Card background: #FAFAFA

3. **Layout Structure**
   - Max-width container: 680px for post content
   - Responsive sidebar on larger screens
   - Clean card-based layout for post listings
   - Generous whitespace and padding

### Page Designs

#### 1. Blog Listing Page (Homepage)
- Clean header with site title and navigation
- Featured post section (if any posts marked as featured)
- Grid/list of recent posts with:
  - Hero image
  - Title
  - Excerpt/description
  - Publication date
  - Tags
- Tag filtering sidebar or top bar
- Load more pagination

#### 2. Individual Post Page
- Minimal header with back to blog link
- Post title (large, prominent)
- Author info and publication date
- Hero image (if present)
- Post content with:
  - Optimized typography
  - Blockquotes styling
  - Code blocks with syntax highlighting
  - Image handling with captions
- Tag list at bottom
- Related posts section

#### 3. Tag Filtering Page
- Tag title and description
- Posts filtered by selected tag
- Option to clear filters

## Implementation Plan

### Phase 1: Core Setup
1. Configure Astro content collections
2. Create basic layouts and components
3. Set up routing structure

### Phase 2: Content Management
1. Create sample blog posts
2. Implement post listing page
3. Build individual post pages

### Phase 3: Styling & Polish
1. Implement Medium-inspired typography
2. Add responsive design
3. Create tag filtering functionality
4. Add smooth transitions and micro-interactions

### Phase 4: Content Workflow
1. Set up content creation process
2. Create templates for new posts
3. Add image optimization

## Technical Considerations

1. **Performance**
   - Astro's automatic code splitting
   - Image optimization with `astro:assets`
   - Minimal JavaScript by default

2. **SEO**
   - Automatic sitemap generation
   - Meta tags for each post
   - Open Graph and Twitter Card support

3. **Content Management**
   - Markdown-based content creation
   - Frontmatter for metadata
   - Tag-based organization

4. **Deployment**
   - Static site generation
   - Easy deployment to Netlify, Vercel, or AWS

## Sample Content Structure

```markdown
---
title: "My First Blog Post"
description: "This is my first post on my new blog"
pubDate: 2024-01-15
heroImage:
  url: "/images/first-post-hero.jpg"
  alt: "A beautiful landscape"
tags: ["personal", "introduction", "web"]
featured: true
draft: false
---

# My First Blog Post

This is the content of my first blog post. It supports all standard Markdown features...

![Image description](/images/post-image.jpg)

## Subheading

More content here...
```

## Next Steps

1. Set up content collections in Astro
2. Create the main layout and navigation
3. Implement the blog listing page with tag filtering
4. Create individual blog post page template
5. Add Medium-inspired styling
6. Set up content management workflow
7. Test functionality and optimize performance

This plan provides a solid foundation for a Medium-like personal blog with clean typography, intuitive navigation, and easy content management. The structure is scalable and can be extended with additional features as needed.
