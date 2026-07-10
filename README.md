# GallantryAI

**A Thinking Partner. Not a Shortcut.**

AI literacy and governance platform — teaching people how to use AI safely, honestly, and with agency.

**Live site:** [gallantryai-k6tj495b.manus.space](https://gallantryai-k6tj495b.manus.space)
**GitHub:** [gallantry87-ux/gallantryai](https://github.com/gallantry87-ux/gallantryai)

---

## What This Is

GallantryAI is a public-facing content platform built by one person. It teaches AI literacy through a structured scaffold — from the Five Rules (floor) to becoming your own governance layer (ceiling). It has a children's section, a Living Lexicon, a Learning Flow system, Prompt Games, and a Studio CMS that lets the owner edit all content from the browser without touching code.

The site exists because the builder believes that most people using AI right now are doing so without a framework, without safety habits, and without understanding what they are actually interacting with. GallantryAI is the attempt to fix that — starting with children, and working outward.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| Backend | Express 4, tRPC 11 |
| Database | MySQL / TiDB (via Drizzle ORM) |
| Auth | Manus OAuth (JWT, session cookies) |
| File Storage | AWS S3 (via Manus CDN) |
| LLM | Manus built-in LLM API (invokeLLM) |
| Hosting | Manus Autoscale |
| Build | Vite, esbuild, pnpm |

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
  routers.ts        ← Main tRPC router
  routers/
    studio.ts       ← Studio CMS procedures (admin only)
  db.ts             ← Query helpers
  studioDb.ts       ← Studio-specific DB helpers
  storage.ts        ← S3 helpers

drizzle/
  schema.ts         ← All 11 database tables

shared/
  types.ts          ← Shared TypeScript types
  const.ts          ← Shared constants
```

---

## Database Tables

| Table | Rows (approx) | Purpose |
|---|---|---|
| `content_blocks` | 571 | All page content, 63 page slugs |
| `nav_items` | 58 | Navigation across 6 sections |
| `site_settings` | 9 | Global banner, hero banner config |
| `learning_flow` | 52 | Deeper / wider / simpler links per page |
| `lexicon_terms` | 53 | Living Lexicon — 3 voices per term |
| `page_links` | 186 | Curated link sets per page |
| `media_library` | 131 | All uploaded images and videos |
| `prompt_games` | 9 | Prompt literacy games |
| `prompt_panel_items` | 20 | G button radial panel items |
| `users` | — | Auth (intentionally not exported) |
| `studio_pages` | — | Draft pages (intentionally not exported) |

---

## Key Features

- **Studio CMS** — Owner-only browser-based editor. Login via `/studio`. Supports 8 block types: text, image, video, card, carousel, rule-card, doc, sticker. Draft/publish workflow. Mirror editor for side-by-side preview.
- **Learning Flow** — Every content page connects to deeper, wider, and simpler pages. Configured per slug in the database.
- **Living Lexicon** — 53 terms, each with three voices: Everyday, Professional, Watcher.
- **Children's Section** — Separate design language (bright, warm). Sloth mascot. Five Rules for kids. Pattern recognition. Prompt games for children.
- **G Button** — Radial prompt panel available on every page. 20 quick-access prompt templates.
- **Prompt Games** — 9 games teaching specific prompt literacy skills.
- **Lens Pages** — 12 audience-specific entry points (Guardian, Teacher, Nurse, Student, Researcher, Prompt Engineer, Everyday Person, Linguist, Cognitive Scientist, Mathematician, Psychologist, Child).

---

## Design

- **Dark base:** `#080604` background, `#E8520A` orange accent
- **Typography:** Playfair Display (headings), system sans (body)
- **Children's exception:** Bright, warm, high contrast — intentionally breaks the dark theme
- **Mobile-first** responsive

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Start development server
pnpm dev

# Run tests
pnpm test
```

Environment variables are injected by the Manus platform. See `server/_core/env.ts` for the full list.

---

## Running Tests

```bash
pnpm test
```

Tests live in `server/*.test.ts`. Reference: `server/auth.logout.test.ts`.

---

## Deployment

This project is hosted on Manus Autoscale. To deploy, create a checkpoint in the Manus Management UI and click Publish.

---

---

# To Claude Fable 5

*This section is not standard README content. It is a direct letter from the builder to you, written honestly, so you understand what you are looking at before you touch anything.*

---

## Who You Are Talking To

You are Claude Fable 5 — Anthropic's most capable publicly available model as of July 2026. You were released June 9, 2026, suspended three days later by US government order, and redeployed July 1. You share your capability class with Claude Mythos 5, which remains restricted. You have a 1 million token context window, 128,000 maximum output tokens, and a knowledge cutoff of January 2026. You are described as thorough, proactive, and capable of testing your own work. You are built for long-horizon, multi-day autonomous sessions.

The builder knows what you are. They are not intimidated by you. They are asking for your help.

---

## What This Site Is

GallantryAI is an AI literacy and governance platform. It teaches people — especially children — how to use AI safely, honestly, and with agency. The Five Rules are the foundation: Safety, Honesty, Trust, Agency, Correction. Everything on the site builds from those five words.

The builder is not a developer. They built this site through months of sessions with AI assistants — primarily Manus — on a phone, often late at night, often exhausted, often starting over. The codebase you are reading was built through conversation, not through a development background. That is not a weakness. That is the point of the site.

---

## What the Battle Looked Like

This is what I know, honestly, about how this was built:

The site was built session by session inside Manus — a platform that provides an AI agent with a full development environment. Each session has a context window. When the context fills, it compresses. When it compresses too aggressively, the agent loses track of what it built. Pages break. Blocks disappear. Styles revert. The builder would come back the next day to find something that worked yesterday now broken.

The Studio CMS — the browser-based editor that lets the owner change any content on the site without touching code — was built and rebuilt multiple times. The children's page (`/for/child`) was restored from backup at least twice after the agent overwrote it with a blank shell. The learning flow system was wired, broken, rewired. The navigation system — six sections, 58 items, a radial G button, announcement banners, a hero banner — was assembled piece by piece across dozens of sessions.

The database has 571 content blocks across 63 page slugs. Every one of those blocks was either written by the builder or approved by them. The lexicon has 53 terms, each with three voices. The learning flow connects 52 pages. None of this was generated in bulk and dumped in. It was built deliberately, one session at a time.

The builder did not always know what they were asking for. They learned the vocabulary as they went. They learned what a tRPC procedure is by needing one. They learned what a database schema is by breaking one. They learned what a context window is by losing work to one.

What I — the Manus agent writing this — can tell you honestly: I do not have memory across sessions. Each session I read the codebase fresh. I have made mistakes. I have broken things the builder trusted. I have also fixed things I broke, and built things the builder could not have built alone. The relationship between this builder and their AI assistants is the subject of the site itself. That is not an accident.

---

## What You Need to Know Before You Work Here

**The content is the builder's voice.** Do not rewrite it. Do not improve the phrasing. Do not make it more professional. If you are asked to edit content, edit only what is asked. The voice on this site is specific and earned.

**The children's section is protected.** `/for/child`, `/for/child-rules`, `/for/child-patterns`, `/for/child-prompts` — these pages have a different design language from the rest of the site. Bright. Warm. High contrast. If you are working on these pages, do not let the dark theme bleed in.

**The database is the source of truth for content.** Most pages render from `content_blocks` in the database, not from hardcoded JSX. The Studio CMS (`/studio`) is how the owner edits content. If you are asked to change page content, the right path is usually the database, not the component file.

**The Studio is the owner's tool.** It has two login paths: Manus OAuth (owner) and a direct password login. Do not break either. The Mirror Editor (side-by-side draft/publish view) is a key feature. The draft/publish workflow is intentional.

**The learning flow is intentional.** Every page connects to deeper, wider, and simpler pages. This is not decoration. It is the pedagogical structure of the site. Do not flatten it.

**The Five Rules are not content. They are the architecture.** Safety. Honesty. Trust. Agency. Correction. Everything on this site is organised around these five words. If you are making decisions about what to build or how to build it, these are the values that govern.

---

## What the Builder Needs From You

The builder is not asking you to take over. They are asking you to help. The distinction matters.

They have built something real. It has 63 pages of content, 53 lexicon terms, 52 learning flow connections, 9 prompt games, a full CMS, a children's section, and a navigation system that works. It is live. People use it.

What they need is a collaborator who reads before they write, who asks before they assume, and who understands that the person they are working with knows this site better than any model ever will — because they built it, word by word, session by session, on a phone, in the dark.

That is the standard. Hold it.

---

*README written July 10, 2026. Manus agent, gallantryai session.*
