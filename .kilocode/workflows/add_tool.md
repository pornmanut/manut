---
description: Add a new tool
---

1. Ask the user for the name of the new tool (e.g., "Interest Calculator").
2. Generate a kebab-case name for the tool (e.g., "interest-calculator").
3. Create a new directory for the tool's components: `src/components/<tool-name>/`.
4. Create a new directory for the tool's scripts: `src/scripts/<tool-name>/`.
5. Create a new page file: `src/pages/tools/<tool-name>.astro`.
6. Add the following content to the new page file:
   ```astro
   ---
   import BaseLayout from '../../layouts/BaseLayout.astro';
   // Import components here
   // import Header from '../../components/<tool-name>/Header.astro';
   ---

   <BaseLayout title="<Tool Name> - Manut.dev" description="Description of the tool">
     <div class="space-y-8">
       <h1 class="text-3xl font-bold"><Tool Name></h1>
       <!-- Add your tool components here -->
     </div>
   </BaseLayout>

   <script>
     // Add your tool's main script logic here
     console.log('<Tool Name> loaded');
   </script>
   ```
7. Open the new page file for the user to edit.
