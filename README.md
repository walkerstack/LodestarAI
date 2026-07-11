# LodestarAI

**A Thinking Partner. Not a Shortcut.**

An AI literacy and governance platform — teaching people how to use AI safely, honestly, and with agency.

---

## What This Is

LodestarAI is a public-facing content platform that teaches AI literacy through a structured scaffold: from the **Five Rules** (the floor) to becoming your own governance layer (the ceiling). It includes a children's section, a Living Lexicon, a Learning Flow system, Prompt Games, and a Studio CMS that lets the site owner edit all content from the browser without touching code.

The platform exists on a simple premise: most people using AI today are doing so without a framework, without safety habits, and without understanding what they are actually interacting with. This is an attempt to fix that — starting with children, and working outward.

### The Five Rules

**Safety · Honesty · Trust · Agency · Correction**

These are not content — they are the architecture. Everything on the site is organised around these five words, and they govern decisions about what to build and how to build it.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| UI | Radix UI primitives, dnd-kit (drag and drop), React Hook Form |
| Backend | Express 4, tRPC 11 |
| Database | MySQL / TiDB via Drizzle ORM |
| Auth | Platform OAuth (JWT, session cookies) + direct password login |
| File storage | AWS S3 via platform CDN |
| LLM | Platform-provided LLM API (`invokeLLM`) |
| Build | Vite, esbuild, pnpm |
| Testing | Vitest |

---

## Project Structure

```
client/
  src/
    pages/          ← All page components (60+ pages)
    components/     ← Nav, Footer, StudioBlocks, Lightbox, etc.
    contexts/       ← Auth context
    hooks/          ← Custom hooks
    lib/trpc.ts     ← tRPC client binding
    App.tsx         ← All routes
    index.css       ← Global styles and design tokens

server/
  _core/            ← Server entry point and environment config
  routers.ts        ← Main tRPC router
  routers/
    studio.ts       ← Studio CMS procedures (admin only)
  db.ts             ← Query helpers
  studioDb.ts       ← Studio-specific DB helpers
  storage.ts        ← S3 helpers
  *.test.ts         ← Server test suite

drizzle/
  schema.ts         ← All 11 database tables

shared/
  types.ts          ← Shared TypeScript types
  const.ts          ← Shared constants

content/            ← Planning notes, content inventories, site-flow diagrams
docs/               ← Specifications and diagrams
scripts/            ← Migration and seeding utilities
```

---

## Database Tables

| Table | Rows (approx) | Purpose |
|---|---|---|
| `content_blocks` | 571 | All page content, across 63 page slugs |
| `nav_items` | 58 | Navigation across 6 sections |
| `site_settings` | 9 | Global banner and hero banner configuration |
| `learning_flow` | 52 | Deeper / wider / simpler links per page |
| `lexicon_terms` | 53 | Living Lexicon — 3 voices per term |
| `page_links` | 186 | Curated link sets per page |
| `media_library` | 131 | All uploaded images and videos |
| `prompt_games` | 9 | Prompt literacy games |
| `prompt_panel_items` | 20 | Radial prompt panel items |
| `users` | — | Authentication (intentionally not exported) |
| `studio_pages` | — | Draft pages (intentionally not exported) |

---

## Key Features

- **Studio CMS** — owner-only, browser-based editor at `/studio`. Supports 8 block types (text, image, video, card, carousel, rule-card, doc, sticker), a draft/publish workflow, and a Mirror Editor for side-by-side preview.
- **Learning Flow** — every content page connects to *deeper*, *wider*, and *simpler* pages, configured per slug in the database. This is the pedagogical structure of the site, not decoration.
- **Living Lexicon** — 53 terms, each explained in three voices: Everyday, Professional, and Watcher.
- **Children's Section** — a separate design language (bright, warm, high contrast) with its own mascot, the Five Rules adapted for kids, pattern recognition, and children's prompt games.
- **Radial Prompt Panel** — a quick-access button available on every page offering 20 prompt templates.
- **Prompt Games** — 9 games, each teaching a specific prompt literacy skill.
- **Lens Pages** — 12 audience-specific entry points: Guardian, Teacher, Nurse, Student, Researcher, Prompt Engineer, Everyday Person, Linguist, Cognitive Scientist, Mathematician, Psychologist, and Child.

---

## Design

- **Dark base:** `#080604` background with `#E8520A` orange accent
- **Typography:** Playfair Display for headings, system sans for body
- **Children's exception:** bright, warm, high contrast — intentionally breaks the dark theme
- **Mobile-first** responsive throughout

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

Environment variables are injected by the hosting platform. See `server/_core/env.ts` for the full list.

### Other commands

```bash
pnpm build     # Build client (Vite) and bundle server (esbuild)
pnpm start     # Run the production build
pnpm check     # Type-check with tsc
pnpm format    # Format with Prettier
pnpm test      # Run the Vitest suite
```

Tests live alongside the server code as `server/*.test.ts` — see `server/auth.logout.test.ts` for a reference example.

---

## Working on This Codebase

A few conventions matter more here than in a typical project. Read these before making changes.

**The database is the source of truth for content.** Most pages render from `content_blocks` in the database, not from hardcoded JSX. If you are asked to change page content, the right path is almost always the database (via the Studio CMS), not the component file.

**Content voice is deliberate.** The site's copy is written in a specific, intentional voice. Do not rewrite, "improve," or professionalise phrasing. If asked to edit content, edit only what was asked.

**The children's section is protected.** The pages `/for/child`, `/for/child-rules`, `/for/child-patterns`, and `/for/child-prompts` use a different design language from the rest of the site — bright, warm, high contrast. When working on these pages, do not let the dark theme bleed in.

**The Studio is the owner's primary tool.** It supports two login paths — platform OAuth and a direct password login. Both must keep working. The Mirror Editor (side-by-side draft/publish view) and the draft/publish workflow are intentional features, not scaffolding.

**The Learning Flow is structural.** Each page's deeper/wider/simpler connections form the teaching path through the site. Do not flatten or bypass it.

**The Five Rules govern.** Safety, Honesty, Trust, Agency, Correction. When deciding what to build or how to build it, these are the values to weigh against.

---

## Deployment

The project is deployed through the hosting platform's management interface: create a checkpoint, then publish.

---

## License

MIT — see `package.json`.
