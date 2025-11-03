import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
