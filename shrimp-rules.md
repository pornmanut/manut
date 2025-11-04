# Development Guidelines

## Project Overview

This is an Astro-based blog project with TypeScript support, Tailwind CSS, and integrated tools. The project includes a blog system and a money management tool with modular architecture.

### Technology Stack
- **Framework**: Astro 5.15.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.16
- **Additional**: Zod for validation, Shiki for syntax highlighting

## Project Architecture

### Directory Structure
```
src/
├── components/          # Astro components organized by feature
│   ├── money/          # Money management tool components
│   └── [feature]/      # Other feature components
├── scripts/            # TypeScript business logic
│   ├── money-manager.ts    # Core business logic
│   └── money/              # Money management tool scripts
├── pages/              # Astro pages and routes
│   ├── tools/          # Tool pages
│   └── blog/           # Blog pages
├── layouts/            # Layout components
├── styles/             # Global styles
└── content/            # Content collections
```

### Component Architecture Patterns
- **UI Components**: `.astro` files for HTML structure and templating
- **Business Logic**: `.ts` files for pure TypeScript code
- **Feature Organization**: Group related components and scripts by feature
- **Separation of Concerns**: UI, business logic, and data management in separate files

## Code Standards

### TypeScript Usage in Astro
- **Use `<script src="">` for loading TypeScript files from `src/` directory**
- **Use `import type` for type-only imports in Astro frontmatter**
- **Keep TypeScript syntax in separate `.ts` files, not inline script tags**
- **Export classes to global scope for inline script usage**

```typescript
// Correct: In .ts files
export interface Transaction {
  id: string;
  date: string;
}

export class MoneyManager {
  // Implementation
}

// Export to global scope
(window as any).MoneyManager = MoneyManager;
```

```astro
---
// Correct: In .astro frontmatter
import type { Transaction } from '../../scripts/money-manager.ts';
---

<!-- Correct: Load TypeScript file -->
<script src="../../scripts/money-manager.ts"></script>

<!-- Incorrect: Don't use TypeScript syntax inline -->
<script type="module">
  import { MoneyManager } from '../../scripts/money-manager.ts'; // ❌
  const transaction: Transaction = { ... }; // ❌
</script>
```

### File Separation Rules
- **Split files over 200-300 lines**
- **Separate UI from business logic**
- **Group by function, not by file type**
- **Extract reusable code into separate modules**

### Naming Conventions
- **Components**: PascalCase (e.g., `Header.astro`, `DataManagement.astro`)
- **Scripts**: kebab-case (e.g., `ui-controller.ts`, `transaction-controller.ts`)
- **Classes**: PascalCase (e.g., `MoneyManager`, `UIController`)
- **Interfaces**: PascalCase with descriptive names (e.g., `UIElements`, `Transaction`)
- **Functions**: camelCase (e.g., `updateCategories`, `showAddTransactionForm`)

## Functionality Implementation Standards

### Component Structure
```astro
---
// Imports at top
import Component from './Component.astro';
import type { TypeDefinition } from '../../scripts/types.ts';

// Props interface if needed
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- HTML structure with semantic elements -->
<section class="component-class">
  <!-- Component content -->
</section>

<!-- Script loading at bottom -->
<script src="../../scripts/component-controller.ts"></script>
```

### Controller Pattern
- **AppController**: Main coordinator that initializes all modules
- **UIController**: Manages DOM elements and basic UI interactions
- **Feature Controllers**: Handle specific business logic (e.g., TransactionController)
- **Utility Classes**: Reusable functionality (e.g., NotificationSystem)

### Event Handling
- **Use custom events for cross-module communication**
- **Attach event listeners in AppController**
- **Export functions to global scope for inline handlers**

```typescript
// Custom events
document.dispatchEvent(new CustomEvent('refreshDashboard'));
document.addEventListener('refreshDashboard', () => {
  this.dashboardRenderer.render();
});

// Global exports for inline handlers
(window as any).editTransaction = (id: string) => this.transactionController.editTransaction(id);
```

## Framework/Plugin/Third-party Library Usage Standards

### Astro Integration
- **Use Astro's automatic TypeScript compilation**
- **Leverage Astro's component-based architecture**
- **Use proper import patterns for different file types**

### Tailwind CSS Usage
- **Use utility classes for styling**
- **Follow responsive design patterns**
- **Use semantic HTML with appropriate classes**

### Zod Validation
- **Use for data validation and type safety**
- **Define schemas for data structures**
- **Use in form validation and API responses**

## Workflow Standards

### Development Workflow
1. **Create components in appropriate feature directories**
2. **Separate business logic into TypeScript files**
3. **Use proper import/export patterns**
4. **Test functionality in browser**
5. **Ensure proper error handling**

### File Creation Process
1. **Create .astro component with proper structure**
2. **Create corresponding .ts controller if needed**
3. **Add script loading to main page**
4. **Update AppController if adding new functionality**
5. **Test integration**

## Key File Interaction Standards

### Money Management Tool Integration
When modifying money management files, ensure coordination between:
- **Components**: `src/components/money/`
- **Scripts**: `src/scripts/money/`
- **Main Page**: `src/pages/tools/money.astro`
- **Core Logic**: `src/scripts/money-manager.ts`

### Script Loading Dependencies
When adding new TypeScript modules:
1. **Add script tag to main page in correct order**
2. **Ensure dependencies are loaded first**
3. **Export to global scope if needed for inline usage**
4. **Update AppController initialization if needed**

### Layout Updates
When modifying `src/layouts/BaseLayout.astro`:
- **Maintain consistent navigation structure**
- **Preserve responsive design patterns**
- **Ensure proper meta tags and SEO**

## AI Decision-making Standards

### File Organization Decisions
- **Use feature-based organization over type-based**
- **Create new directories when feature has 3+ related files**
- **Keep related functionality together**

### Component vs Script Decisions
- **Use .astro files for HTML output and templating**
- **Use .ts files for business logic and data manipulation**
- **Separate UI concerns from business logic**

### Import/Export Decisions
- **Use `import type` for type-only imports**
- **Use `<script src="">` for TypeScript files**
- **Export to global scope only when necessary for inline handlers**

## Prohibited Actions

### File Structure
- **DO NOT** create files under 50 lines (too fragmented)
- **DO NOT** mix UI and business logic in single files
- **DO NOT** create unnecessary folder hierarchies
- **DO NOT** place TypeScript files in public/ directory

### Code Patterns
- **DO NOT** use TypeScript syntax in inline script tags
- **DO NOT** manually compile TypeScript files
- **DO NOT** use `import` statements in inline module scripts
- **DO NOT** create large monolithic files over 300 lines

### Astro Usage
- **DO NOT** use `is:inline` directive for files in src/ directory
- **DO NOT** mix frontmatter and script logic incorrectly
- **DO NOT** ignore Astro's automatic TypeScript compilation

### Testing
- **DO NOT** run `npm run dev` yourself
- **DO** ask user to test changes
- **DO** provide clear testing instructions

## Implementation Examples

### Correct Component Implementation
```astro
---
import type { Transaction } from '../../scripts/money-manager.ts';
import { UIController } from '../../scripts/money/ui-controller.ts';
---

<section class="transaction-management">
  <div id="transaction-list"></div>
  <button id="add-transaction-btn">Add Transaction</button>
</section>

<script src="../../scripts/money/transaction-controller.ts"></script>
```

### Correct Controller Implementation
```typescript
export class TransactionController {
  constructor(
    private moneyManager: MoneyManager,
    private uiController: UIController
  ) {}

  addTransaction(): void {
    // Business logic implementation
  }
}

// Export for global usage
(window as any).TransactionController = TransactionController;
```

### Correct Script Loading Order
```astro
<!-- Core logic first -->
<script src="../../scripts/money-manager.ts"></script>
<!-- UI controllers -->
<script src="../../scripts/money/ui-controller.ts"></script>
<!-- Feature controllers -->
<script src="../../scripts/money/transaction-controller.ts"></script>
<!-- Main coordinator last -->
<script src="../../scripts/money/app-controller.ts"></script>
```

## Testing Requirements

**ALWAYS ask the user to test the application instead of running `npm run dev` yourself.**

Provide clear instructions:
```
Please test the application by running `npm run dev` and navigating to the appropriate page. 

Check that:
- [Specific functionality 1]
- [Specific functionality 2]
- [Any buttons/forms are working]
- [No console errors]

Let me know if you encounter any issues or if everything is working as expected.
