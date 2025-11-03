# Development Guidelines

## Project Overview

### Astro Blog with AWS SAM Deployment
- Personal blog built with Astro, TypeScript, and Tailwind CSS
- Content managed through Astro content collections
- Deployed to AWS S3 and CloudFront using AWS SAM
- Automated deployment via GitHub Actions

## Project Architecture

### Directory Structure
```
/
├── src/
│   ├── content/
│   │   ├── config.ts           # Content collection schema definitions
│   │   └── blog/               # Blog post markdown files
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main layout component
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── about.astro         # About page
│   │   └── blog/
│   │       ├── index.astro     # Blog listing page
│   │       └── [slug].astro    # Individual blog post page
│   └── styles/
│       └── global.css          # Global styles
├── template.yaml               # AWS SAM infrastructure definition
├── samconfig.toml              # SAM deployment configuration
└── shrimp-rules.md             # This file - AI agent guidelines
```

### Core Components
- **BaseLayout.astro**: Consistent layout used across all pages
- **content/config.ts**: Zod schema definitions for blog posts
- **template.yaml**: AWS infrastructure for S3, CloudFront, and deployment

## Code Standards

### Astro File Structure
- Use TypeScript frontmatter with --- delimiters
- Import statements must be at the top of frontmatter
- Export interfaces for Props when applicable
- Use consistent indentation (2 spaces)

### TypeScript Standards
- Follow strict TypeScript configuration from tsconfig.json
- Use type annotations for function parameters and return values
- Import types with `import type` when possible

### Tailwind CSS Standards
- Use utility classes for all styling
- Follow existing color scheme: gray-50, gray-900, blue-600, blue-800
- Use responsive prefixes: sm:, md:, lg:, xl:
- Maintain consistent spacing and layout patterns

### Content Standards
- Blog posts must include: title, pubDate, description
- Optional fields: author, image, tags, draft
- Use ISO date format for pubDate
- Tags must be lowercase with hyphens for multi-word tags

## Functionality Implementation Standards

### Adding New Pages
1. Create .astro file in appropriate src/pages/ directory
2. Import and use BaseLayout component
3. Include proper title and description props
4. Follow existing navigation pattern in BaseLayout

### Adding Blog Posts
1. Create .md file in src/content/blog/
2. Include required frontmatter fields
3. Use markdown for content
4. Add appropriate tags for categorization

### Modifying Navigation
1. Update navigation links in BaseLayout.astro
2. Ensure all links use relative paths
3. Test all navigation links after changes
4. Maintain consistent styling for navigation items

## Framework/Plugin/Third-party Library Usage Standards

### Astro Framework
- Use Astro content collections for blog posts
- Leverage Astro's built-in image optimization
- Use Astro's getCollection() for content queries
- Follow Astro's routing conventions

### Tailwind CSS
- Use @tailwindcss/vite plugin (configured in astro.config.mjs)
- Use @tailwindcss/typography for blog content styling
- Extend theme only when necessary in tailwind.config.js

### Zod Validation
- Define schemas in src/content/config.ts
- Use z.object() for content collection schemas
- Make optional fields with .optional()
- Use appropriate Zod types for validation

## Workflow Standards

### Development Workflow
1. Run `npm run dev` for local development
2. Test all changes locally before committing
3. Build with `npm run build` to verify production build
4. Preview build with `npm run preview`

### Content Creation Workflow
1. Create blog post in src/content/blog/
2. Include all required frontmatter fields
3. Test blog post display locally
4. Verify blog post appears in blog listing

### Deployment Workflow
1. Commit changes to trigger GitHub Actions
2. Monitor GitHub Actions for deployment status
3. Verify deployment at production URL
4. Test all functionality after deployment

## Key File Interaction Standards

### Critical File Interactions
- **src/content/config.ts ↔ src/content/blog/*.md**: When modifying schema, update all blog posts
- **src/layouts/BaseLayout.astro ↔ src/pages/*.astro**: When changing layout, test all pages
- **template.yaml ↔ samconfig.toml**: When adding resources, ensure SAM capabilities support them
- **template.yaml ↔ GitHub Actions**: When changing infrastructure, update deployment workflows

### Synchronization Rules
- When adding new navigation items, update BaseLayout.astro and test all pages
- When modifying content schema, update all existing blog posts to match
- When changing Tailwind configuration, verify all styles remain consistent
- When updating dependencies, test all functionality before deployment

## AI Decision-making Standards

### Priority Order
1. **Functionality** > Performance > Aesthetics
2. Always choose solutions that maintain existing patterns
3. Prefer Astro built-in features over external libraries

### Common Decision Patterns
- **New Page**: Use BaseLayout, follow existing page structure
- **New Blog Post**: Follow existing frontmatter pattern, use markdown
- **Style Changes**: Use Tailwind utilities, maintain existing color scheme
- **Content Updates**: Update schema first, then update all content files

### Error Handling
- Always validate content against Zod schemas
- Test navigation links after changes
- Verify responsive design on multiple screen sizes
- Check console for errors during development

## Prohibited Actions

### Development Prohibitions
- **NEVER** modify the build output directory structure
- **NEVER** change content collection schema without updating all content files
- **NEVER** use CSS frameworks other than Tailwind CSS
- **NEVER** hardcode absolute URLs that should be relative
- **NEVER** modify astro.config.mjs without understanding implications

### Content Prohibitions
- **NEVER** create blog posts without required frontmatter fields
- **NEVER** use inconsistent date formats in pubDate
- **NEVER** add blog posts without testing display
- **NEVER** use uppercase tags (must be lowercase)

### Infrastructure Prohibitions
- **NEVER** hardcode AWS credentials in any file
- **NEVER** expose S3 bucket publicly
- **NEVER** disable CloudFront OAC (Origin Access Control)
- **NEVER** use HTTP for production traffic
- **NEVER** modify S3 bucket properties outside template.yaml

### Deployment Prohibitions
- **NEVER** deploy infrastructure changes without running `sam build` first
- **NEVER** skip CloudFront cache invalidation after frontend updates
- **NEVER** use different AWS regions across files without explicit coordination
- **NEVER** modify deployment configuration without testing

## Required Tools and Commands

### Development Commands
```bash
npm run dev      # Start local development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### SAM Commands
```bash
sam build        # Validate and build SAM template
sam deploy       # Deploy infrastructure changes
```

### AWS CLI Commands
```bash
aws s3 sync dist $S3_BUCKET_URL --delete                    # Sync frontend to S3
aws cloudfront create-invalidation --distribution-id $ID --paths "/*"  # Invalidate cache
```

## Testing Requirements

### Development Testing
- Always test new pages locally before committing
- Verify responsive design on mobile and desktop
- Check all navigation links work correctly
- Validate blog posts display properly

### Content Testing
- Verify all required frontmatter fields are present
- Test blog post display and formatting
- Check blog post appears in blog listing
- Validate tags display correctly

### Deployment Testing
- Verify website accessibility after deployment
- Test SSL certificate validity
- Confirm all pages load without errors
- Check security headers in browser dev tools
