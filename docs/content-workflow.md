# Content Management Workflow

This document explains how to add and manage blog posts on your personal blog website.

## Adding New Blog Posts

### 1. Create a New Markdown File

Create a new `.md` file in the `src/content/blog/` directory. It's recommended to organize posts by year:

```
src/content/blog/
├── 2024/
│   ├── my-first-post.md
│   └── another-post.md
└── 2025/
    └── new-post.md
```

### 2. Frontmatter Structure

Each blog post must include frontmatter at the top with the following structure:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2024-01-15
updatedDate: 2024-01-20  # Optional
heroImage:
  url: "/images/your-image.jpg"
  alt: "Description of the image"
tags: ["tag1", "tag2", "tag3"]
featured: true  # Optional, defaults to false
draft: false   # Optional, defaults to false
---
```

### 3. Post Content

After the frontmatter, write your post content using Markdown syntax:

```markdown
# Your Post Title

This is the introduction paragraph.

## Subheading

This is a new section with more content.

### Lists

- Item 1
- Item 2
- Item 3

### Code Blocks

```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

### Images

![Image description](/images/your-image.jpg)

### Blockquotes

> This is a blockquote that stands out from the rest of the content.
```

## Managing Images

1. Place images in the `public/images/` directory
2. Reference them in your posts using absolute paths: `/images/your-image.jpg`
3. Always include descriptive alt text for accessibility

## Tags

Tags are automatically collected from all posts and used for filtering. To create a new tag:

1. Simply add it to the `tags` array in your post's frontmatter
2. The tag will automatically appear in the tag filter sidebar
3. A tag page will be automatically generated at `/blog/tag/your-tag`

## Draft Posts

To work on a post without publishing it:

1. Set `draft: true` in the frontmatter
2. The post won't appear on the blog listing or tag pages
3. When ready to publish, change to `draft: false` or remove the line

## Featured Posts

To feature a post prominently on the homepage:

1. Set `featured: true` in the frontmatter
2. Featured posts appear in a special section at the top of the homepage

## Updating Posts

To update an existing post:

1. Edit the Markdown file
2. Update the `updatedDate` in the frontmatter if you want to show when it was last modified
3. Save the file - the site will automatically rebuild

## Best Practices

1. **Descriptive Titles**: Make your titles clear and engaging
2. **Compelling Descriptions**: Write a good summary for social sharing and SEO
3. **Consistent Tagging**: Use consistent tags for better organization
4. **Image Optimization**: Use appropriately sized images (max width 1200px)
5. **Preview Before Publishing**: Use `draft: true` to review posts before publishing

## File Naming Convention

Use descriptive, URL-friendly filenames:

- ✅ `my-first-post.md`
- ✅ `thoughts-on-web-development.md`
- ❌ `My First Post.md`
- ❌ `post 1.md`

## Next Steps

1. Create your first blog post following this guide
2. Test the development server with `npm run dev`
3. Review your post in the browser
4. When satisfied, the post is ready to be deployed
