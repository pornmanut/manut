# Astro TypeScript Support Rules

## Key Research Findings

### TypeScript Compilation in Astro
- **Astro automatically compiles TypeScript files** - No manual compilation needed with `tsc`
- You can import `.ts` and `.tsx` files directly in Astro projects
- TypeScript code works directly inside Astro component script tags
- Use `import type` for type-only imports when needed

### Client-Side Script Best Practices
- **Use `<script src="">` for loading external TypeScript files from `src/` directory**
- Astro automatically processes and compiles TypeScript files referenced with `src` attribute
- TypeScript syntax (type annotations, interfaces) should be in separate `.ts` files
- Use plain JavaScript in inline `<script>` tags within `.astro` files
- Astro handles the compilation of TypeScript to JavaScript automatically

### File Organization Patterns
- **`.astro` files**: For components and pages that output HTML with templating
- **`.ts` files**: For pure TypeScript code without templating
- Separate business logic into `.ts` files for better maintainability
- Import TypeScript modules using relative paths with `.ts` extension in `src` attribute

### Import/Export Patterns
```typescript
// In .astro frontmatter - use type-only imports
import type { Transaction } from '../../scripts/money-manager.ts';

// In script tags with src attribute - use .ts extension for files in src/
<script src="../../scripts/money-manager.ts"></script>

// For files in public/ directory - use is:inline directive
<script is:inline src="/scripts/money-manager.js"></script>
```

### Code Structure Guidelines
- Keep TypeScript interfaces and classes in separate `.ts` files
- Use proper class-based organization for complex functionality
- Export utility functions for reuse across components
- Use proper DOM element type casting in TypeScript files
- Avoid inline TypeScript syntax in HTML script tags

### Script Loading Methods
1. **For files in `src/` directory (Recommended):**
   ```astro
   <script src="../../scripts/money-manager.ts"></script>
   ```
   - Astro automatically compiles TypeScript to JavaScript
   - Supports all TypeScript features
   - Proper module bundling

2. **For files in `public/` directory:**
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

## Implementation Examples

### Correct Approach
```typescript
// money-manager.ts
export interface Transaction {
  id: string;
  date: string;
  // ... other properties
}

export class MoneyManager {
  // ... implementation
}

// Export to global scope for script tag usage
(window as any).MoneyManager = MoneyManager;
```

```astro
---
// money.astro frontmatter
import type { Transaction } from '../../scripts/money-manager.ts';
---

<!-- Load TypeScript file from src/ directory -->
<script src="../../scripts/money-manager.ts"></script>

<script is:inline>
  // Use MoneyManager here after it loads
  // Add timing checks if needed
</script>
```

### Incorrect Approach
```astro
<script type="module">
  // Don't try to import .ts files directly in module scripts
  import { MoneyManager } from '../../scripts/money-manager.ts'; // ❌
  
  // Don't use TypeScript syntax in inline scripts
  const transaction: Transaction = { ... }; // ❌
</script>
```

## Testing and Validation
- Always test TypeScript imports work correctly
- Verify Astro development server handles compilation
- Check browser console for import/export errors
- Ensure proper module resolution paths
- Test timing of global variable availability

## Performance Considerations
- Astro automatically optimizes TypeScript compilation
- No need for additional build steps
- Leverage Astro's built-in TypeScript support
- Use appropriate module boundaries for better tree-shaking
- Files in `src/` get processed and bundled automatically

## Key Takeaways from Testing
1. **Astro DOES support TypeScript files** - The issue was incorrect import method
2. **Use `<script src="">` for TypeScript files in `src/`** - Not module imports
3. **Timing matters** - Global exports may need retry logic
4. **Separate TypeScript and JavaScript concerns** - TypeScript in .ts files, JavaScript execution in browser
