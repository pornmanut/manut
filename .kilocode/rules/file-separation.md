---
trigger: always_on
---

# File Separation Rules

## 🎯 Main Rule: Keep Files Small

**Don't create large files. Break them into smaller, focused files.**

## 📏 When to Split Files

Split a file when it becomes:
- **Over 200-300 lines** - Too large to understand quickly
- **Has multiple responsibilities** - Doing more than one thing
- **Hard to navigate** - Can't find what you need easily
- **Mixed concerns** - UI mixed with business logic

## 🔪 How to Split

### 1. Group by Function
Look for logical sections:

```astro
<!-- BEFORE: One big file -->
<section class="data-management">
  <!-- Data upload/download buttons -->
</section>

<section class="dashboard">
  <!-- Dashboard content -->
</section>

<section class="transactions">
  <!-- Transaction form and list -->
</section>
```

**Split into separate files:**
- `DataManagement.astro` - Just the data management section
- `Dashboard.astro` - Just the dashboard section  
- `TransactionManagement.astro` - Just the transaction section

### 2. Separate UI from Logic

```javascript
// BEFORE: Mixed in one file
<script>
  // UI elements
  const button = document.getElementById('btn');
  
  // Business logic
  function saveData() { ... }
  
  // Event handlers
  button.addEventListener('click', saveData);
</script>
```

**Split into:**
- `Component.astro` - Just the HTML structure
- `controller.ts` - Just the business logic
- `ui-controller.ts` - Just the DOM element management

### 3. Extract Reusable Parts

If you see repeated code:
```javascript
// Repeated notification code
function showSuccess(message) { ... }
function showError(message) { ... }
```

**Extract to:**
- `notification-system.ts` - Reusable notification functions

## 📁 Simple File Structure

```
src/
├── components/
│   └── [feature]/
│       ├── Part1.astro
│       ├── Part2.astro
│       └── Part3.astro
└── scripts/
    └── [feature]/
        ├── ui-controller.ts      # DOM elements
        ├── feature-controller.ts  # Business logic
        └── notification-system.ts # Reusable functions
```

## ✅ Benefits of Small Files

1. **Easy to understand** - Each file has one purpose
2. **Easy to find** - Know where to look for specific code
3. **Easy to test** - Test small pieces independently
4. **Easy to fix** - Bugs are isolated to specific files
5. **Easy to reuse** - Small components can be used elsewhere

## 🚫 What NOT to Do

- **Don't create files under 50 lines** - Too fragmented
- **Don't over-abstract** - Keep it simple
- **Don't create unnecessary folders** - Only when you have many files
- **Don't separate related things** - Keep connected code together

## 🎯 Simple Test

Ask yourself:
1. **Can I understand this file in 30 seconds?**
2. **Does this file do only one thing?**
3. **Is it easy to find what I'm looking for?**

If **NO** to any question, split the file.

---

**That's it. Keep files small and focused.**
