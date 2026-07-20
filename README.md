# recipes.spaceshell.xyz

A personal cookbook — warm, brutalist, hand-written. Static site built with
**Astro 7** + **Tailwind v4**, fonts self-hosted via Fontsource, deployed to
**Cloudflare Pages**.

## Stack

| Layer       | Choice                                              |
| ----------- | --------------------------------------------------- |
| Framework   | [Astro 7](https://astro.build) (static output)      |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config via `@tailwindcss/vite`) |
| Fonts       | Instrument Serif (display) + Geist Variable (body), via [Fontsource](https://fontsource.org) |
| Content     | Markdown files in `src/content/recipes/` (typed via content collections) |
| Hosting     | Cloudflare Pages (Git integration)                  |

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Dev server at `localhost:4321`               |
| `npm run build`   | Production build to `./dist/`                |
| `npm run preview` | Preview the production build locally         |

## Adding a recipe

Drop a new Markdown file in `src/content/recipes/`. The filename becomes the
URL slug (`foo.md` → `/recipes/foo/`). Frontmatter is validated against the
schema in `src/content.config.ts`.

```markdown
---
title: Recipe Name
description: Short one-liner.
date: 2026-07-20
cuisine: Mexican
method: Instant Pot
tags: [instant-pot, vegetarian]
servings: 6
prepTime: 5 min
cookTime: 50 min PC + 20 min NR
ingredients:
  - group: Pressure Cook
    items:
      - 2 cups dried pinto beans
      - 4 cups water
  - group: Refry
    items:
      - 1 generous chunk of butter
notes:
  - A tip or substitution.
---

Optional prose body rendered as the "Method" section. Markdown headings
become `h2`/`h3`.
```

## Design system

Defined in `src/styles/global.css` via Tailwind v4's `@theme` block:

- **Palette:** warm paper cream `#f3ede2`, deep ink `#1a1714`, paprika accent
  `#b8431f`, ochre `#b48327`, clay dividers `#8a7c6b`.
- **Type:** Instrument Serif for headlines (light, oversized), Geist Variable
  for body (weights 200–400).
- **Rhythm:** 8px-based spacing, `--spacing-gutter` (32px) and
  `--spacing-block` (64px), 2px hairline borders, zero rounded corners.

## Deploying to Cloudflare Pages (recipes.spaceshell.xyz)

This project is wired for **Git integration** — push to GitHub and CF Pages
auto-builds on every commit.

### One-time setup

1. **Push to GitHub** — create a repo (e.g. `recipes`) and push:
   ```sh
   git remote add origin git@github.com:<you>/recipes.git
   git push -u origin main
   ```
2. **Create the Pages project** — in the Cloudflare dashboard:
   - **Workers & Pages → Create → Pages → Connect to Git**
   - Select the `recipes` repo
   - Build settings:
     - **Framework preset:** `Astro`
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
     - **Environment variable:** `NODE_VERSION` = `22`
3. **Custom domain** — under the Pages project → **Custom domains → Set up a
   custom domain** → `recipes.spaceshell.xyz`. If `spaceshell.xyz` is already
   on this Cloudflare account, the DNS CNAME is provisioned automatically.

### Subsequent deploys

Push to `main` → Cloudflare builds and deploys. Preview branches get their
own preview URLs.

## Project structure

```text
recipes/
├── src/
│   ├── components/       # Header, Footer, RecipeCard, IngredientList
│   ├── content/
│   │   └── recipes/      # ← the actual recipes (.md)
│   ├── layouts/          # BaseLayout, RecipeLayout
│   ├── pages/
│   │   ├── index.astro           # recipe grid
│   │   └── recipes/[...slug].astro
│   ├── styles/
│   │   └── global.css    # Tailwind v4 theme (warm brutalist design system)
│   └── content.config.ts # recipe schema
├── astro.config.mjs
└── package.json
```
