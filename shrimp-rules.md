# Development Guidelines

## Project Overview

### Astro Blog with Money Management Tool
- Personal blog built with Astro, TypeScript, and Tailwind CSS
- Content managed through Astro content collections with Zod validation
- Money Manager tool with client-side data storage using localStorage
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
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog listing page
│   │   │   └── [slug].astro    # Individual blog post page
│   │   └── tools/
│   │       ├── index.astro     # Tools listing page
│   │       └── money.astro     # Money Manager tool
│   ├── scripts/
│   │   └── money-manager.ts    # Money Manager TypeScript class
│   └── styles/
│       └── global.css          # Global styles and markdown styling
├── template.yaml               # AWS SAM infrastructure definition
├── samconfig.toml              # SAM deployment configuration
└── shrimp-rules.md             # This file - AI agent guidelines
```

### Core Components
- **BaseLayout.astro**: Consistent layout used across all pages with navigation
- **content/config.ts**: Zod schema definitions for blog posts
- **scripts/money-manager.ts**: MoneyManager class with localStorage integration
- **template.yaml**: AWS infrastructure for S3, CloudFront, and deployment

## Code Standards

### Astro File Structure
- Use TypeScript frontmatter with --- delimiters
- Import statements must be at the top of frontmatter
- Export interfaces for Props when applicable
- Use consistent indentation (2 spaces)
- Import BaseLayout for all pages

### TypeScript Integration Patterns
- **For .astro files importing TypeScript**: Use `import type` for type-only imports
- **For loading TypeScript files in .astro**: Use `<script src="../../scripts/file.ts"></script>`
- **For TypeScript classes**: Export to global scope with `(window as any).ClassName = ClassName`
- **For inline scripts**: Use plain JavaScript, not TypeScript syntax
- **For TypeScript files in src/**: Astro automatically compiles them to JavaScript

### Money Manager Tool Patterns
- **Data Storage**: Use localStorage with key 'moneyManagerData'
- **Data Validation**: Use simplified Zod-like schemas for client-side validation
- **Class Structure**: Export MoneyManager class with methods for data operations
- **Global Access**: Export class to window object for inline script usage
- **Error Handling**: Use try-catch blocks with user-friendly error messages

### Tailwind CSS Standards
- Use utility classes for all styling
- Follow existing color scheme: gray-50, gray-900, blue-600, blue-800
- Use responsive prefixes: sm:, md:, lg:, xl:
- Maintain consistent spacing and layout patterns
- Use custom styles in global.css for markdown content and animations

### Content Standards
- Blog posts must include: title, pubDate, description
- Optional fields: author, image, tags, draft
- Use ISO date format for pubDate
- Tags must be lowercase with hyphens for multi-word tags
- Use markdown for content with proper frontmatter

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

### Adding New Tools
1. Create .astro file in src/pages/tools/
2. Create corresponding .ts file in src/scripts/
3. Follow Money Manager pattern for TypeScript integration
4. Update tools/index.astro to include new tool
5. Use consistent styling and layout patterns

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
- Use getStaticPaths() for dynamic routes

### TypeScript Integration
- **Script Loading**: Use `<script src="">` for TypeScript files from src/ directory
- **Type Annotations**: Use proper TypeScript interfaces and types
- **Class Exports**: Export classes to global scope for inline script usage
- **Error Handling**: Implement comprehensive error handling with user feedback

### Tailwind CSS
- Use @tailwindcss/vite plugin (configured in astro.config.mjs)
- Use @tailwindcss/typography for blog content styling
- Extend theme only when necessary in tailwind.config.js
- Use custom CSS in global.css for specific component styles

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

### Tool Development Workflow
1. Create TypeScript class in src/scripts/
2. Create corresponding .astro page in src/pages/tools/
3. Test tool functionality locally
4. Verify tool appears in tools listing
5. Test data persistence and validation

### Deployment Workflow
1. Commit changes to trigger GitHub Actions
2. Monitor GitHub Actions for deployment status
3. Verify deployment at production URL
4. Test all functionality after deployment

## Key File Interaction Standards

### Critical File Interactions
- **src/content/config.ts ↔ src/content/blog/*.md**: When modifying schema, update all blog posts
- **src/layouts/BaseLayout.astro ↔ src/pages/*.astro**: When changing layout, test all pages
- **src/scripts/money-manager.ts ↔ src/pages/tools/money.astro**: TypeScript class must match page expectations
- **template.yaml ↔ samconfig.toml**: When adding resources, ensure SAM capabilities support them
- **template.yaml ↔ GitHub Actions**: When changing infrastructure, update deployment workflows

### Synchronization Rules
- When adding new navigation items, update BaseLayout.astro and test all pages
- When modifying content schema, update all existing blog posts to match
- When changing Tailwind configuration, verify all styles remain consistent
- When updating dependencies, test all functionality before deployment
- When modifying TypeScript classes, ensure all dependent pages are updated

## AI Decision-making Standards

### Priority Order
1. **Functionality** > Performance > Aesthetics
2. Always choose solutions that maintain existing patterns
3. Prefer Astro built-in features over external libraries
4. For tools, follow Money Manager patterns for consistency

### Common Decision Patterns
- **New Page**: Use BaseLayout, follow existing page structure
- **New Blog Post**: Follow existing frontmatter pattern, use markdown
- **New Tool**: Create TypeScript class + .astro page, follow Money Manager pattern
- **Style Changes**: Use Tailwind utilities, maintain existing color scheme
- **Content Updates**: Update schema first, then update all content files

### Error Handling
- Always validate content against Zod schemas
- Test navigation links after changes
- Verify responsive design on multiple screen sizes
- Check console for errors during development
- For tools, implement user-friendly error notifications

## Prohibited Actions

### Development Prohibitions
- **NEVER** modify the build output directory structure
- **NEVER** change content collection schema without updating all content files
- **NEVER** use CSS frameworks other than Tailwind CSS
- **NEVER** hardcode absolute URLs that should be relative
- **NEVER** modify astro.config.mjs without understanding implications
- **NEVER** use TypeScript syntax in inline script tags within .astro files
- **NEVER** manually compile TypeScript files - Astro handles this automatically

### TypeScript Integration Prohibitions
- **NEVER** import .ts files directly in module scripts within .astro files
- **NEVER** use type assertions in inline script tags
- **NEVER** forget to export TypeScript classes to global scope when needed
- **NEVER** mix TypeScript and JavaScript syntax inappropriately

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
- For tools, test all functionality including data persistence

### Content Testing
- Verify all required frontmatter fields are present
- Test blog post display and formatting
- Check blog post appears in blog listing
- Validate tags display correctly

### Tool Testing
- Test all tool functionality locally
- Verify data persistence with localStorage
- Test error handling and validation
- Check responsive design on mobile devices
- Verify tool appears in tools listing

### Deployment Testing
- Verify website accessibility after deployment
- Test SSL certificate validity
- Confirm all pages load without errors
- Check security headers in browser dev tools
- Test tool functionality in production environment

## TypeScript Integration Specific Rules

### File Organization
- **.astro files**: For components and pages that output HTML with templating
- **.ts files**: For pure TypeScript code without templating, especially tool logic
- **Separation of concerns**: Keep business logic in .ts files, UI in .astro files

### Import/Export Patterns
```typescript
// In .astro frontmatter - use type-only imports
import type { Transaction } from '../../scripts/money-manager.ts';

// In script tags with src attribute - use .ts extension for files in src/
<script src="../../scripts/money-manager.ts"></script>

// For files in public/ directory - use is:inline directive
<script is:inline src="/scripts/money-manager.js"></script>
```

### Class Integration Pattern
```typescript
// In .ts file - export class to global scope
export class MoneyManager {
  // implementation
}

// Export to global scope for script tag usage
(window as any).MoneyManager = MoneyManager;
```

### Script Loading Methods
1. **For files in src/ directory (Recommended)**:
   ```astro
   <script src="../../scripts/money-manager.ts"></script>
   ```
   - Astro automatically compiles TypeScript to JavaScript
   - Supports all TypeScript features
   - Proper module bundling

2. **For files in public/ directory**:
   ```astro
   <script is:inline src="/scripts/money-manager.js"></script>
   ```
   - Requires `is:inline` directive
   - No TypeScript processing (must be pre-compiled)
   - For external scripts or CDN

### Error Prevention
- Don't use TypeScript type assertions in inline script tags
- Don't manually compile TypeScript files - Astro handles this
- Use proper module imports with correct file extensions
- Separate concerns: UI in .astro, logic in .ts files
- Ensure proper timing when accessing globally exported classes

## Money Manager Tool Specific Rules

### Data Management
- **Storage Key**: Always use 'moneyManagerData' for localStorage
- **Data Structure**: Follow MoneyData interface with transactions and categories
- **Validation**: Use TransactionSchema and MoneyDataSchema for validation
- **Error Handling**: Implement comprehensive error handling with user feedback

### Class Architecture
- **Singleton Pattern**: Use one instance per page
- **Method Naming**: Use clear, descriptive method names
- **Data Operations**: Provide methods for CRUD operations
- **Utility Functions**: Export helper functions for formatting and file operations

### UI Integration
- **Global Export**: Always export class to window object
- **Initialization**: Use retry logic for class availability
- **Event Handling**: Attach event listeners after DOM is ready
- **Notifications**: Implement user-friendly notification system

### File Operations
- **Upload**: Validate file size (max 10MB) and format (.json only)
- **Download**: Use timestamped filenames for data exports
- **Sample Data**: Provide sample data for first-time users
- **Error Messages**: Provide clear, actionable error messages
