import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Recipes are authored as Markdown files in src/content/recipes/.
 * The body of the Markdown file is the recipe's narrative / method prose;
 * structured data (ingredients, timings, servings) lives in the frontmatter.
 */
const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    cuisine: z.string().optional(), // e.g. "Mexican"
    method: z.string().optional(), // e.g. "Instant Pot"
    tags: z.array(z.string()).default([]),
    servings: z.number().optional(),
    prepTime: z.string().optional(), // "10 min"
    cookTime: z.string().optional(), // "50 min PC + 20 min NR"
    ingredients: z.array(
      z.object({
        group: z.string().optional(), // "Pressure Cook", "Refry", "Serve"
        items: z.array(z.string()),
      }),
    ),
    notes: z.array(z.string()).optional(),
    mealIdeas: z
      .array(
        z.object({
          category: z.string(), // "Breakfast", "Lunch", "Dinner", etc.
          meals: z.array(
            z.object({
              name: z.string(),
              description: z.string(),
            }),
          ),
        }),
      )
      .optional(),
    swedishSubs: z.array(z.string()).optional(),
  }),
});

export const collections = { recipes };
