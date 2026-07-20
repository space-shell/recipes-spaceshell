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

Deploys use the **wrangler CLI** (direct upload), with GitHub as the source
of truth. This gives you manual control over when a deploy goes out —
there is no auto-build on push.

- **Project:** `recipes-spaceshell` (production branch: `main`)
- **Live:** https://recipes-spaceshell.pages.dev/
- **Custom domain:** https://recipes.spaceshell.xyz/
- **Repo:** https://github.com/space-shell/recipes-spaceshell

### One-time setup (already done)

```sh
# GitHub
gh repo create recipes-spaceshell --public --source=. --remote=origin
git push -u origin main

# Cloudflare Pages
bunx wrangler pages project create recipes-spaceshell --production-branch main
bunx wrangler pages deploy dist --branch main
```

Custom domain (`recipes.spaceshell.xyz`) and DNS CNAME are attached to the
Pages project; `spaceshell.xyz` is a Cloudflare-managed zone.

### Subsequent deploys

```sh
npm run build
bunx wrangler pages deploy dist --branch main --commit-message "..."
```

Git push and Pages deploy are intentionally separate — push to GitHub to
save the code, then deploy when you want it live. Preview deployments use
`--branch preview-name`.

### Switching to Git integration (optional)

If you'd prefer auto-build on push instead, in the Cloudflare dashboard go
to **Workers & Pages → recipes-spaceshell → Settings → Builds & deployments**
and connect the GitHub repo with:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variable:** `NODE_VERSION` = `22`

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
