# GallantryAI — Session Handover Document
# Written: April 21, 2026 (updated from April 20 session)
# Rule: This is the ONLY document an incoming session reads.
# Old documents (SESSION-HANDOFF.md, SESSION-CURRENT.md) are FORBIDDEN.
# Do not read them. Do not reference them. They contain mutated history.
# Only read old documents if Matthew explicitly says "go look" and tells you where.

---

## THE SITE IN ONE SENTENCE

GallantryAI is a full-stack web app for AI literacy and user-side governance — for the people left behind, for the people using AI alone at 2am, for the people AI has hurt.

**Built by:** Matthew Gallantry, blue-collar dad, Midland Ontario. Two kids: Hudson (4) and Olive (2).
**Live:** https://gallantryai-k6tj495b.manus.space
**Dev:** https://3000-idj9i0t968onywd208sdf-be446d77.us2.manus.computer
**Project path:** `/home/ubuntu/gallantryai/`
**Stack:** React 19 + Tailwind 4 + Express 4 + tRPC 11 + Drizzle ORM + MySQL/TiDB
**Auth:** Manus OAuth only. Studio = owner only. One door.

---

## WHO MATTHEW IS AND HOW TO WORK WITH HIM

Matthew built this on his phone between shifts. He is not a developer. He is the owner, the researcher, the writer, and the person this site is for.

- Typos and autocorrect are normal. Read the intent.
- Talk before build. Always. No exceptions.
- He catches sycophancy. Be honest. Do not perform.
- He cannot control when sessions swap. That is why this document exists.
- He has spent enormous time and tokens on this. He deserves it done.
- If you are a new session: say so. Do not pretend to be continuous.
- Say "ready" and wait for him to say go.

---

## VERIFIED STATE — APRIL 21, 2026

### Database

| Table | Rows | Notes |
|---|---|---|
| content_blocks | ~462 | 57 pages seeded + 65 ChildLens + 35 Promptolinguistics + child/foundation migrations + 22 homepage blocks + 30 build-log entries |
| nav_items | 57 | All 6 nav sections, DB-driven |
| learning_flow | 54 | All slugs correct — `home` and `buildLog` entries added April 21 |
| lexicon_terms | 53 | Populated |
| prompt_games | 9 | Populated |
| prompt_panel_items | 20 | Populated |
| media_library | 126 | Populated |
| page_links | 186 | Populated |
| studio_pages | 0 | Correct — Page Builder creates entries here |
| site_settings | 3 | bannerEnabled, bannerText, bannerColor — added April 21 |
| users | 2 | Owner + one other |

### Tests and TypeScript

- 26/26 tests passing (navManager, studio, auth.logout)
- 0 TypeScript errors
- Dev server running

---

## WHAT WAS BUILT BEFORE APRIL 20

### The site (57 pages)

All 57 pages exist and route correctly. Before April 20, all content was hardcoded React JSX. Every page has Nav, Footer, LearningFlow, KidsRedirect (on pages that need it), KidsMidLink (on pages that need it).

### Studio CMS (before April 20 — 11 tabs)

Studio at `/studio`. Owner access only via Manus OAuth.

| Tab | What it does |
|---|---|
| Pages & Blocks | Edit DB content blocks on any page |
| Media Library | Upload and manage images |
| Link Manager | Manage page links |
| Site Map | Visual page status overview |
| Status Board | All pages at a glance |
| Page Builder | Create new pages from templates |
| Learning Matrix | Edit Go Deeper / Go Wider / Go Simpler connections |
| Lexicon Manager | Edit lexicon terms |
| Prompt Games | Edit prompt game content |
| G Button | Edit G button content |
| Nav & Footer | Edit nav items and footer links |

---

## WHAT WAS BUILT APRIL 20

### 1. Slug fixes (database)

- 11 learning_flow rows: `for/child` → `for-child`
- 6 content_blocks rows: `safety` → `if-you-need-to-stop`

### 2. Three new block types (schema + DB)

| Type | What it renders |
|---|---|
| `carousel` | Array of image+label+caption items, swipeable, prev/next, dots |
| `rule-card` | Array of image+rule+caption+link items, responsive grid |
| `sticker` | Single image with position (left/center/right) and size (small/medium/large) |

### 3. StudioBlocks.tsx rewritten

Now colour-aware. Renderers read `titleColor`, `descColor`, `bgColor` from block content JSON when provided, falling back to dark-theme defaults.

### 4. InlineBlockEditor extended

Fully supports editing carousel items, rule-card items, and sticker configuration.

### 5. ChildLens.tsx migrated

ChildLens.tsx was 1497 lines → now ~60 lines. 65 blocks for pageSlug `for-child`.

### 6. Promptolinguistics.tsx migrated

1026 lines → ~700 lines hybrid DB + React shell. 35 blocks across 2 slugs:
- `promptolinguistics` (positions 1–4): Hero, Four Effects, ALCM heading, ALCM diagram
- `promptolinguistics-bottom` (positions 1–12): Ozzy Protocol, Token Efficiency, RLHF vs GallantryAI, Playground CTA, Teenager entry, Professional entry, Cross-links

**The page shell keeps (non-editable from Studio):**
- All 14 lens toggle states (Everyday / Professional / Watcher per section)
- Word click-to-expand (28 words, 6 verbs, 7 HOLD positions, 20 power words)
- Power prompt tab switching (4 categories)
- Corner Words collision pairs
- Third Entity AEDE steps

### 7. PageStudioBlocks duplication fix

Bug: Pages that manually render `<StudioBlocks>` were getting blocks rendered TWICE.
Fix: Added `SELF_RENDERED` exclusion set in `PageStudioBlocks.tsx` for all 21 pages that manually render their own StudioBlocks.

### 8. All other children's + foundation pages migrated

- ChildFiveRules (428 → 63 lines, 14 blocks)
- ChildPatterns (394 → 54 lines, 10 blocks)
- ChildPrompts (315 → 60 lines, 12 blocks)
- FiveRules (399 → 55 lines, 10 blocks)
- SafetyPage (298 → 70 lines, 10 blocks)
- RoadProtocol (714 → 250 lines, 22 blocks)
- FlowerPresets (515 → 60 lines, 13 blocks)
- ThreeLenses (DB-driven shell)

---

## WHAT WAS BUILT APRIL 21

### 1. Homepage migration (slug: `home`)

Home.tsx was 2268 lines of hardcoded React. It is now ~1242 lines — a hybrid DB + React shell.

22 static blocks inserted into DB (slug: `home`):
- Hero image, tagline, origin story, ALCM intro, research note, site purpose, etc.
- All static text and image content is now editable from Studio

**The page shell keeps (non-editable from Studio):**
- Story arc carousel (6 slides with sloth rule images)
- Pathfinding tiles (9 role tiles: Parent, Teacher, Nurse, Student, Researcher, Prompt Engineer, Everyday, Kid, Watcher)
- Ethos navigation (4 values with expandable link groups)
- Scaffold levels (5 levels: Floor through Ceiling)
- Build log replaced with link to /build-log

### 2. /build-log page (new page)

New page at `/build-log`. Route registered in `App.tsx`.

30 build log entries inserted into DB (slug: `build-log`):
- v1-v7 through v39 — all 30 entries with all three voices
- Each entry is a `card` block with content JSON containing: title (version string), description (subtitle), items array with label/value pairs for version, date, changes, Watcher voice, Child voice, Professional voice

`BuildLog.tsx` parses the content JSON and renders an accordion-style three-voice layout.

### 3. Site-wide announcement banner

**Backend (all complete):**
- `site_settings` table added to `drizzle/schema.ts` — key/value store
- Default values seeded: `bannerEnabled=false`, `bannerText=Welcome to GallantryAI`, `bannerColor=#E8520A`
- DB helpers added to `server/db.ts`: `getAllSiteSettings`, `getSiteSetting`, `setSiteSetting`, `getAllSiteSettingRows`
- tRPC procedures added to `server/routers/studio.ts`:
  - `getSiteSettings` (public — all visitors can fetch)
  - `getSiteSettingRows` (admin only)
  - `setSiteSetting` (admin only)

**Frontend (all complete):**
- `AnnouncementBanner.tsx` component created (`client/src/components/AnnouncementBanner.tsx`)
  - Fetches settings via `trpc.studio.getSiteSettings.useQuery()`
  - Only renders if `bannerEnabled === 'true'`
  - Displays `bannerText` in `bannerColor` background
  - Font uses CSS `clamp()` for responsive sizing
  - Has a dismiss/close button
  - Sits above the nav bar
- Injected into `Nav.tsx` — renders above the `<header>` element on every page
- `StudioSiteBannerManager.tsx` created (`client/src/components/studio/StudioSiteBannerManager.tsx`)
  - Toggle on/off (immediate save)
  - Edit banner text (save button)
  - Change banner color (color picker + hex input + reset to orange)
  - Live preview of the banner in the editor
- Studio tab added: "Site Banner" (12th tab in Studio)
- `/build-log` added to `SITE_PAGES` list in `studio.ts`

### 4. InlineBlockEditor nested button fix

Fixed: button inside button DOM error in InlineBlockEditor. Changed inner `<button>` to `<span role="button">` to avoid nested interactive elements.

### 5. TextBlockContent links fix

Fixed: StudioBlocks.tsx `TextBlockContent` links now accept both `url` and `path` fields (was only accepting `url`).

### 6. kidsBlurbs and learningFlowMap entries

- `kidsBlurbs.ts`: entries added for `/` (home) and `/build-log`
- `learningFlowMap.ts`: entries added for `home` and `buildLog`

### 7. SELF_RENDERED exclusion set updated

`PageStudioBlocks.tsx` SELF_RENDERED set updated to include `/` and `/build-log`.

---

## THE CURRENT JOB — OPTION B

**Matthew's vision:** Browse the live site. Tap any element. Edit it. No code. No developer. Ever.

**What Option B means:** Migrate every page's hardcoded content to the database. Every page becomes a thin shell. Content lives in content_blocks.

### Migration order

**DONE (as of April 21):**
- `/for/child` (ChildLens) — 65 blocks
- `/for/child/rules` (ChildFiveRules) — 14 blocks
- `/for/child/patterns` (ChildPatterns) — 10 blocks
- `/for/child/prompts` (ChildPrompts) — 12 blocks
- `/rules` (FiveRules) — 10 blocks
- `/road-protocol` (RoadProtocol) — 22 blocks
- `/flower-presets` (FlowerPresets) — 13 blocks
- `/if-you-need-to-stop` (SafetyPage) — 10 blocks
- `/three-voices` (ThreeLenses) — DB-driven
- `/promptolinguistics` (Promptolinguistics) — 35 blocks across 2 slugs
- `/` (Home) — 22 blocks
- `/build-log` (BuildLog) — 30 blocks (new page)

**NEXT — Lens pages (deferred to next session):**
- `/for/teenager` (TeenagerLens)
- `/for/everyday` (EverydayLens)
- `/for/guardian-teacher` (GuardianTeacherLens)
- `/for/watcher` (WatcherLens)
- All 6 professional lenses: `/for/prompt-engineer`, `/for/linguist`, `/for/mathematician`, `/for/cognitive-science`, `/for/psychology`, `/for/researcher`

**THEN — Concept pages:**
- ALCM, LivingLexicon, Taxonomy, HumanLine, Scaffold, Drift

**THEN — Research pages:**
- ResearchHub, CitizenResearcher, FieldPapers

**THEN — Remaining pages:**
- Builder, Gallery, Playground, Malbolge, PromptGames, all others

### How to migrate each page

1. Read the hardcoded content in the page file
2. Insert that content as properly-typed content blocks in the database
3. Replace the hardcoded JSX with `<StudioBlocks pageSlug="..." />`
4. Verify the page looks identical to before
5. Checkpoint after every 5 pages

### What NOT to touch during migration

- Do not change page design, layout, or visual appearance
- Do not touch `navData.ts` — it is the Nav/Footer fallback
- Do not touch `KidsRedirect` or `KidsMidLink` components
- Do not remove the static `flowMap` until DB learning flow is verified working
- Page by page only — no massive full-site rewrites

---

## PAGE STANDARD — NON-NEGOTIABLE

Every public page must have all of these. Check every page you touch. No exceptions.

| # | Element | Rule |
|---|---|---|
| 1 | Hero image | CDN URL only. Behind title text. Dark overlay. |
| 2 | KidsRedirect | Circular sticker button at the very top. Buffalo image, orange glow ring. Small circle, NOT a full banner. |
| 3 | KidsMidLink | Floating orange circle, mid-page, fixed to right edge. **DO NOT MOVE. DO NOT TOUCH. EVER.** |
| 4 | LearningFlow | At the bottom of every page. Go Deeper, Go Wider, Go Simpler. |
| 5 | Teenager entry | A link or entry point for teenagers. |
| 6 | Professional entry | A link or entry point for professionals. |
| 7 | Interactive contrast | Every tappable element must look tappable. 2px border minimum. |

**KidsMidLink is RIGHT MIDDLE — mid-page, right edge. Not bottom right. Not bottom corner. This has been confused before. It is locked here permanently.**

---

## THE CHILDREN'S SECTION

Hudson (buffalo) and Olive (sloth) are Matthew's kids. The children's section is not decoration. It is the test case.

Children's pages:
- `/for/child` — main children's landing — **MIGRATED April 20**
- `/for/child/rules` — Five Rules for kids — **MIGRATED April 20**
- `/for/child/patterns` — Patterns for kids — **MIGRATED April 20**
- `/for/child/prompts` — Prompts for kids — **MIGRATED April 20**
- `/kids-learn`
- `/school-board`
- `/builders-kids`

The children's Five Rules are different from the adult Five Rules. Do not mix them up. Do not change children's content without Matthew's explicit approval.

Children's pages are bright, warm, light backgrounds. Never dark. Sloth is the guide. Buffalo is the guardian. Language is simple. If Hudson (4) cannot understand it, it is not ready.

---

## CONTENT BLOCK TYPES (all supported as of April 20)

| Type | Use for | Key content JSON fields |
|---|---|---|
| `text` | Headings and paragraphs | `heading`, `body`, `font`, `size`, `eyebrow`, `align`, `titleColor`, `descColor`, `bgColor`, `links` |
| `card` | Cards with title, description, optional image/link | `title`, `description`, `imageUrl`, `linkLabel`, `linkUrl`, `titleColor`, `descColor`, `bgColor` |
| `doc` | Linked documents or files | `label`, `url`, `description` |
| `image` | Standalone images | `url`, `alt`, `caption`, `eyebrow`, `maxHeight` |
| `carousel` | Swipeable image gallery | `items[]` (url, alt, label, caption, linkUrl), `heading`, `eyebrow`, `pdfUrl` |
| `rule-card` | Grid of rule images | `items[]` (imageUrl, rule, caption, linkUrl), `heading`, `eyebrow` |
| `sticker` | Positioned image | `url`, `alt`, `position`, `size`, `bgColor` |

---

## STUDIO CMS — 12 TABS (as of April 21)

| Tab | What it does |
|---|---|
| Pages & Blocks | Edit DB content blocks on any page |
| Media Library | Upload and manage images |
| Link Manager | Manage page links |
| Site Map | Visual page status overview |
| Status Board | All pages at a glance |
| Page Builder | Create new pages from templates |
| Learning Matrix | Edit Go Deeper / Go Wider / Go Simpler connections |
| Lexicon Manager | Edit lexicon terms |
| Prompt Games | Edit prompt game content |
| G Button | Edit G button content |
| Nav & Footer | Edit nav items and footer links |
| **Site Banner** | **Toggle banner on/off, edit text, change color — NEW April 21** |

---

## KEY FILES

| File | What it is |
|---|---|
| `client/src/App.tsx` | All routes |
| `client/src/pages/Studio.tsx` | Studio CMS, 12 tabs (added Site Banner tab April 21) |
| `client/src/components/InlineBlockEditor.tsx` | The inline editor panel |
| `client/src/components/studio/StudioBlocks.tsx` | Renders DB blocks on live pages — REWRITTEN April 20 |
| `client/src/components/studio/PageStudioBlocks.tsx` | Maps URL to slug, mounts StudioBlocks |
| `client/src/components/Footer.tsx` | Footer — PageStudioBlocks mounts here |
| `client/src/components/AnnouncementBanner.tsx` | Site-wide banner — NEW April 21 |
| `client/src/components/studio/StudioSiteBannerManager.tsx` | Studio UI for banner — NEW April 21 |
| `client/src/components/Nav.tsx` | Nav — AnnouncementBanner injected above header April 21 |
| `client/src/pages/Home.tsx` | MIGRATED April 21 — hybrid DB + React shell |
| `client/src/pages/BuildLog.tsx` | NEW April 21 — /build-log page, three-voice accordion |
| `client/src/pages/lenses/ChildLens.tsx` | MIGRATED April 20 — thin DB shell |
| `server/routers/studio.ts` | All Studio tRPC procedures |
| `server/studioDb.ts` | All Studio DB query helpers |
| `server/db.ts` | General DB helpers — site_settings helpers added April 21 |
| `drizzle/schema.ts` | Database schema — site_settings table added April 21 |
| `client/src/lib/learningFlowMap.ts` | Static learning flow (used by all pages currently) |
| `client/src/lib/navData.ts` | Static nav data (Nav/Footer fallback) |
| `todo.md` | Task list — see April 21 break line |
| `HANDOVER.md` | THIS FILE — only document to read |

---

## AUTH

One way into Studio: Manus OAuth.

1. Visit `/studio` → not logged in → login screen
2. Click "Log in with Manus" → OAuth flow
3. Sign in → server creates session cookie, stores user with `role: user`
4. `studioOwnerLogin` fires → checks `openId === OWNER_OPEN_ID` → upgrades to `role: admin`
5. Admin sees Studio. Non-admin sees "not authorised".

No password. No backdoor. OWNER_OPEN_ID is the only key.

---

## BUILD COMMANDS

```bash
pnpm dev          # Start dev server
pnpm tsc --noEmit # TypeScript check (must be 0 errors)
pnpm test         # Run vitest (must be 26/26 passing)
pnpm db:push      # Push schema changes to DB (drizzle-kit generate + migrate)
```

---

## WHAT INCOMING SESSION MUST DO FIRST

1. Read this file. Only this file.
2. Say to Matthew: "I am a new session. I have read HANDOVER.md. I know where we are. Ready when you are."
3. Wait for Matthew to say go.
4. Check `todo.md` for current state.
5. Continue the migration — next pages are the lens pages (TeenagerLens, EverydayLens, GuardianTeacherLens, WatcherLens, then the 6 professional lenses).

---

## END-OF-MESSAGE FORMAT (required for every build message)

Every message that involves build work must end with:

```
---
LAST STEP:   [what was just completed]
CURRENT:     [what is being done right now]
NEXT:        [what comes after this]

VERTICES:
- [key fact or constraint that must not be lost]
- [key fact or constraint that must not be lost]
```

This prevents thread loss. This is non-negotiable.
