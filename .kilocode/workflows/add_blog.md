---
description: Add a new blog post
---

1. Ask the user for the title of the blog post.
2. Convert the title to kebab-case to create the filename (e.g., "My New Post" -> "my-new-post.md").
3. Create a new file in `src/content/blog/` with the generated filename.
4. Add the following frontmatter to the file:
   ```markdown
   ---
   title: "Title of the blog post"
   pubDate: 2025-11-19 # Current date
   description: "A short description of the post."
   author: "Manut"
   image: ""
   tags: ["tag1", "tag2"]
   draft: true
   ---

   Write your content here...
   ```
5. Open the new file for the user to edit.
