# Content Rules

## Blog Post Requirements
- All blog posts must be in `src/content/blog/YYYY/` directories
- Use kebab-case for filenames (e.g., `my-blog-post.md`)
- Maximum filename length: 50 characters

## Required Frontmatter
Every blog post must include:
- title (string, required)
- description (string, required)
- pubDate (date, required)
- tags (array of strings, required)
- draft (boolean, defaults to false)
- featured (boolean, defaults to false)
- updatedDate (date, optional)
- heroImage (string, optional)

## Image Guidelines
- All images must be in `public/images/` directory
- Use descriptive filenames
- Maximum image width: 1200px
- Include alt text for all images
- Maximum alt text length: 125 characters

## Tag Management
- Use lowercase for all tags
- Replace spaces with hyphens (e.g., "web-development")
- Keep tag names concise (1-3 words)
- Use existing tags when possible

## Standard Tags
- personal
- updates
- web-development
- python
- linux
- technology
- tutorial
- thoughts
