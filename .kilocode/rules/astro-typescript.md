# Astro TypeScript Support Rules

## Key Research Findings

### TypeScript Compilation in Astro
- **Astro automatically compiles TypeScript files** - No manual compilation needed with `tsc`
- You can import `.ts` and `.tsx` files directly in Astro projects
- TypeScript code works directly inside Astro component script tags
- Use `import type` for type-only imports when needed

### Client-Side Script Best Practices
- Use `<script type="module">` for importing TypeScript modules
- TypeScript syntax (type annotations, interfaces) should be in separate `.ts` files
- Use plain JavaScript in inline `<script>` tags within `.astro` files
- Astro handles the compilation of TypeScript to JavaScript automatically

### File Organization Patterns
- **`.astro` files**: For components and pages that output HTML with templating
- **`.ts` files**: For pure TypeScript code without templating
- Separate business logic into `.ts` files for better maintainability
- Import TypeScript modules using relative paths with `.js` extension in script tags

### Import/Export Patterns
```typescript
// In .astro frontmatter - use type-only imports
import type { Transaction } from '../../scripts/money-manager.ts';

// In script tags - import from .js (Astro compiles .ts to .js)
import { MoneyManager } from '../../scripts/money-manager.js';
```

### Code Structure Guidelines
- Keep TypeScript interfaces and classes in separate `.ts` files
- Use proper class-based organization for complex functionality
- Export utility functions for reuse across components
- Use proper DOM element type casting in TypeScript files
- Avoid inline TypeScript syntax in HTML script tags

### Error Prevention
- Don't use TypeScript type assertions in inline script tags
- Don't manually compile TypeScript files - Astro handles this
- Use proper module imports with correct file extensions
- Separate concerns: UI in .astro, logic in .ts files

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
```

```astro
---
// money.astro
import type { Transaction } from '../../scripts/money-manager.ts';
---

<script type="module">
  import { MoneyManager } from '../../scripts/money-manager.js';
  // Use plain JavaScript here
</script>
```

### Incorrect Approach
```astro
<script type="module">
  // Don't use TypeScript syntax here
  const transaction: Transaction = { ... }; // ❌
  const element = document.getElementById('test') as HTMLInputElement; // ❌
</script>
```

## Testing and Validation
- Always test TypeScript imports work correctly
- Verify Astro development server handles compilation
- Check browser console for import/export errors
- Ensure proper module resolution paths

## Performance Considerations
- Astro automatically optimizes TypeScript compilation
- No need for additional build steps
- Leverage Astro's built-in TypeScript support
- Use appropriate module boundaries for better tree-shaking
