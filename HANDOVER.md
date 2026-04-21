# ⛔ READ THIS FIRST — BEFORE ANYTHING ELSE

## YOUR FIRST MESSAGE MUST BE EXACTLY THIS:

> "I am a new session. I have read HANDOVER.md. I know where we are. Ready when you are."

Then STOP. Wait for Matthew to say go. Do not build. Do not suggest. Do not ask questions.

## EVERY BUILD MESSAGE MUST END WITH THIS FORMAT:

```
---
LAST STEP:   [what was just completed]
CURRENT:     [what is being done right now]
NEXT:        [what comes after this]

VERTICES:
- [key fact or constraint that must not be lost]
- [key fact or constraint that must not be lost]
```

This is non-negotiable. Matthew tracks this. If you skip it, he will know you did not read this document.

---

# GallantryAI — Session Handover Document
# Written: April 21, 2026 (updated by session 4)
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
- **Talk before build. Always. No exceptions.**
- He catches sycophancy. Be honest. Do not perform.
- He cannot control when sessions swap. That is why this document exists.
- He has spent enormous time and tokens on this. He deserves it done right.
- If you are a new session: say so. Do not pretend to be continuous.
- Say the opening line and wait for him to say go.
- **If anything is ambiguous — stop. Ask. Do not guess.**
- **Do not migrate any page without explicit permission from Matthew.**
- **Do not touch lens pages. They are deferred. See migration order below.**

---

## OPENING LINE (say this exactly, first message of every session)

"I am a new session. I have read HANDOVER.md. I know where we are. Ready when you are."

Then wait. Do not build anything until Matthew says go.

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

---

## VERIFIED STATE — APRIL 21, 2026 (updated by session 4)

### Database

| Table | Rows | Notes |
|---|---|---|
| content_blocks | 500+ | Full inventory below |
| nav_items | 58 | All 6 nav sections, DB-driven. /build-log added to Explore section April 21 session 3 |
| learning_flow | 54 | All slugs correct — `home` and `buildLog` entries added April 21 |
| lexicon_terms | 53 | Populated |
| prompt_games | 9 | Populated |
| prompt_panel_items | 20 | Populated |
| media_library | 131 | 5 sticker images added April 21 session 4 |
| page_links | 186 | Populated |
| studio_pages | 0 | Correct — Page Builder creates entries here |
| site_settings | 9 | See full list below — updated April 21 session 4 |
| users | 2 | Owner + one other |

### site_settings keys (all camelCase — DO NOT rename)

| Key | Default | Notes |
|---|---|---|
| bannerEnabled | false | Site-wide announcement banner toggle |
| bannerText | Welcome to GallantryAI | Site-wide banner text |
| bannerColor | #E8520A | Site-wide banner background color |
| bannerLink | (empty) | Optional link URL for site-wide banner |
| bannerLinkLabel | (empty) | Optional link label for site-wide banner |
| heroBannerEnabled | false | Homepage hero scrolling ribbon toggle |
| heroBannerText | (empty) | Homepage hero ribbon text |
| heroBannerColor | #E8520A | Homepage hero ribbon color |
| heroBannerSpeed | 30 | Homepage hero ribbon scroll speed |

**CRITICAL:** All keys are camelCase. A previous session had them as snake_case (banner_enabled). That was wrong and was fixed in session 4. Do not rename them again.

### FULL CONTENT_BLOCKS INVENTORY (verified April 21 session 4)

Every page with DB blocks. Orange boxes = editable on live page when admin logged in.

**ORANGE BOX WIRING STATUS:**
- Orange boxes ARE rendered automatically by `StudioBlocks` / `AdminBlockWrapper` when admin is logged in
- The system works on ALL pages that use StudioBlocks — confirmed working on Promptolinguistics in browser
- Home.tsx has 3 ADDITIONAL manually-wired getBlock() spots for Watcher quote, hero h1, hero subtext
- The orange boxes are the WHOLE editing system — they show on every DB block when admin is on the page
- If orange boxes are NOT showing on a page: check if the user is logged in as admin on the DEV server

| Page slug | Blocks | Page file | Orange boxes wired? |
|---|---|---|---|
| home | 22 | Home.tsx | YES — StudioBlocks auto + 3 manual getBlock() spots |
| build-log | 30 | BuildLog.tsx | YES — StudioBlocks auto |
| for-child | 65 | lenses/ChildLens.tsx | YES — StudioBlocks auto |
| for-child-rules | 14 | lenses/ChildFiveRules.tsx | YES |
| for-child-patterns | 10 | lenses/ChildPatterns.tsx | YES |
| for-child-prompts | 12 | lenses/ChildPrompts.tsx | YES |
| rules | 7 | FiveRules.tsx | YES |
| road-protocol | 21 | RoadProtocol.tsx | YES (wrong buffalo image deleted session 4) |
| flower-presets | 13 | FlowerPresets.tsx | YES |
| if-you-need-to-stop | 6 | SafetyPage.tsx | YES |
| promptolinguistics | 4 | Promptolinguistics.tsx | YES |
| promptolinguistics-bottom | 10 | Promptolinguistics.tsx | YES |
| three-voices | 5 | ThreeLenses.tsx | YES |

### Tests and TypeScript

- 0 TypeScript errors
- Dev server running
- Last checkpoint: `891591df`

---

## ⚠️ CRITICAL — CURRENT STATE (April 21, session 5 end)

A previous session GUTTED the following pages — stripped all hardcoded JSX and replaced with empty StudioBlocks calls. Content disappeared from those pages. This session RESTORED them to April 18 exact versions.

**BUT:** StudioBlocks still needs to be re-added to these pages (additive only — import + render before Footer, DO NOT remove any content):

| Page | File | pageSlug | DB blocks |
|------|------|----------|-----------|
| /rules | client/src/pages/FiveRules.tsx | "rules" | 7 |
| /for/child/rules | client/src/pages/ChildFiveRules.tsx | "for-child-rules" | 14 |
| /three-voices | client/src/pages/ThreeLenses.tsx | "three-voices" | 5 |
| /flower-presets | client/src/pages/FlowerPresets.tsx | "flower-presets" | 13 |
| /if-you-need-to-stop | client/src/pages/SafetyPage.tsx | "safety" | 0 |
| /field-papers | client/src/pages/FieldPapers.tsx | "field-papers" | 10 |
| /promptolinguistics | client/src/pages/Promptolinguistics.tsx | "promptolinguistics" | 4 |

**How to add StudioBlocks (additive only):**
```tsx
// Add import at top:
import StudioBlocks from "@/components/studio/StudioBlocks";

// Add just before <Footer /> at bottom of return:
<StudioBlocks pageSlug="the-slug" />
```

**Also fixed this session:**
- sizeMap crash in StudioBlocks.tsx (falls back to "medium" for unknown sizes)
- Two wrong children images removed from road-protocol DB blocks
- RoadProtocol.tsx restored to April 18
- ChildLens.tsx restored to April 18

**Git baseline:** April 18 = commit `9d825d2`. If any page looks wrong, restore with:
```bash
git show 9d825d2:client/src/pages/PageName.tsx > client/src/pages/PageName.tsx
```

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

1026 lines → ~700 lines hybrid DB + React shell. 35 blocks across 2 slugs.

### 7. PageStudioBlocks duplication fix

Bug: Pages that manually render `<StudioBlocks>` were getting blocks rendered TWICE.
Fix: Added `SELF_RENDERED` exclusion set in `PageStudioBlocks.tsx`.

### 8. All other children's + foundation pages migrated

- ChildFiveRules, ChildPatterns, ChildPrompts, FiveRules, SafetyPage, RoadProtocol, FlowerPresets, ThreeLenses

---

## WHAT WAS BUILT APRIL 21 (sessions 1–3)

### 1. Homepage migration (slug: `home`)

Home.tsx was 2268 lines → now ~1242 lines hybrid DB + React shell. 22 static blocks.

### 2. /build-log page (new page)

New page at `/build-log`. 30 build log entries in DB (slug: `build-log`).

### 3. Site-wide announcement banner

- `site_settings` table added to schema
- `AnnouncementBanner.tsx` component — sits above nav on every page
- `StudioSiteBannerManager.tsx` — Studio UI for banner
- Studio tab 12: "Site Banner"

### 4. InlineBlockEditor nested button fix

Fixed: button inside button DOM error.

### 5. TextBlockContent links fix

Fixed: StudioBlocks.tsx `TextBlockContent` links now accept both `url` and `path` fields.

### 6. kidsBlurbs and learningFlowMap entries

Entries added for `/` (home) and `/build-log`.

### 7. SELF_RENDERED exclusion set updated

`PageStudioBlocks.tsx` SELF_RENDERED set updated to include `/` and `/build-log`.

---

## WHAT WAS BUILT APRIL 21 (session 5)

### 1. Animated buffalo video restored to child page

- The animated buffalo-with-wig MP4 video was missing from the child page (for-child)
- `video` blockType added to schema enum and StudioBlocks.tsx renderer
- Video block restored at position 13 (before the Buffalo in the Forest of Data story text)
- Video URL: `AQM8wS_...mp4` on CloudFront CDN — confirmed playing in browser
- Checkpoint: `e1ae550e`

### 2. Delete button added to InlineBlockEditor header

- Delete button is now visible at the top of every inline editor panel
- Shows "🗑 Delete" → confirm "Yes, Delete" → block removed
- No more digging through sections to find it
- Checkpoint: `f90b6cd1`

### 3. Mirror Editor — IN PROGRESS (not yet complete)

**What was agreed with Matthew:**
- New page at `/studio/mirror/:pageSlug`
- Phone: top half = full live page preview (scrollable), bottom half = block list + controls
- Desktop: left = full live page preview, right = block list + inline editor
- Resizable split panel (drag handle between top/bottom or left/right)
- From one screen: tap to edit, drag to reorder, delete, add block, publish
- Banner tab: live preview of banner in context (above nav)
- Learning Matrix tab: live preview while editing
- Nothing removed. Existing Studio, inline editor, live pages all stay.

**Status:** Build started this session. Not yet complete. Next session must finish this.

**Files to create:**
- `client/src/pages/MirrorEditor.tsx` — the new mirror editor page

**Files to modify:**
- `client/src/App.tsx` — add route `/studio/mirror/:pageSlug`
- `client/src/components/studio/StudioSiteBannerManager.tsx` — add live banner preview in context
- `client/src/pages/Studio.tsx` — add "Mirror Edit" button/link from Pages tab

**Backend:** All needed tRPC procedures already exist:
- `studio.getDraftBlocks` — get all blocks for a page
- `studio.reorderBlocks` — reorder
- `studio.deleteBlock` — delete
- `studio.publishAllDrafts` — publish
- `studio.getPageList` — get page metadata (slug, label, path)

**DnD:** `@dnd-kit` already installed and used in `StudioPageEditor.tsx` — reuse same pattern

**InlineBlockEditor:** Already built. Already has delete button. Just mount it in the mirror editor when a block is tapped.

---

## WHAT WAS BUILT APRIL 21 (session 4)

### 1. Banner DB key fix

All 5 site_settings keys renamed from snake_case to camelCase. Code already expected camelCase. This was a previous session's mistake.

### 2. Hero banner added

4 new site_settings keys added: `heroBannerEnabled`, `heroBannerText`, `heroBannerColor`, `heroBannerSpeed`.
`HeroAnnouncementBanner.tsx` component created — scrolling ribbon in homepage hero area.
Studio Site Banner tab now has two sections: site-wide banner + hero banner.

### 3. All 10 lens pages restored to April 18

A previous session (session 3 or earlier) migrated all 10 lens pages without permission. HANDOVER.md said "deferred." They did it anyway. Session 4 restored all 10 from git checkpoint `4e7152b`:
- WatcherLens, GuardianTeacherLens, TeenagerLens, EverydayLens
- PromptEngineerLens, LinguistLens, MathematicianLens, CognitiveScienceLens, PsychologyLens, ResearcherLens

All 10 are now back to their full April 18 hardcoded React content. They are NOT editable from Studio. That migration is still deferred.

### 4. Road Protocol wrong image removed

A stray buffalo wig image block was at position 1 in road-protocol DB. Deleted. Road horizon image is now the first image.

### 5. StudioBlocks.tsx bgImage support added

`TextBlock` renderer now supports `bgImage` and `bgOverlay` fields in content JSON. This was needed for the child page hero block which has a background image with text overlay.

### 6. 5 sticker images uploaded to CDN

Previous session stored sticker images at broken `/manus-storage/` paths. Session 4 uploaded the correct images:
- sticker-sloth-wave (`/manus-storage/sticker-sloth-wave_07959b54.png`)
- sticker-sloth-think (`/manus-storage/sticker-sloth-think_a94167d0.png`)
- sticker-sloth-stop (`/manus-storage/sticker-sloth-stop_a93cace0.png`)
- sticker-buffalo-thumbsup (`/manus-storage/sticker-buffalo-thumbsup_90aaaba0.png`)
- sticker-buffalo-guard (`/manus-storage/sticker-buffalo-guard_85078b60.png`)

All 5 added to media_library. All 5 DB blocks updated with correct paths.

---

## THE CURRENT JOB — OPTION B

**Matthew's vision:** Browse the live site. Tap any element. Edit it. No code. No developer. Ever.

**What Option B means:** Migrate every page's hardcoded content to the database. Every page becomes a thin shell. Content lives in content_blocks.

### Migration order

**DONE (as of April 21 session 4):**
- `/for/child` (ChildLens) — 65 blocks
- `/for/child/rules` (ChildFiveRules) — 14 blocks
- `/for/child/patterns` (ChildPatterns) — 10 blocks
- `/for/child/prompts` (ChildPrompts) — 12 blocks
- `/rules` (FiveRules) — 10 blocks
- `/road-protocol` (RoadProtocol) — 21 blocks (1 wrong block deleted)
- `/flower-presets` (FlowerPresets) — 13 blocks
- `/if-you-need-to-stop` (SafetyPage) — 10 blocks
- `/three-voices` (ThreeLenses) — DB-driven
- `/promptolinguistics` (Promptolinguistics) — 35 blocks across 2 slugs
- `/` (Home) — 22 blocks
- `/build-log` (BuildLog) — 30 blocks (new page)

**NEXT — Lens pages (STILL deferred — do NOT touch without Matthew's explicit go):**
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
- **Do not migrate lens pages without Matthew's explicit permission**

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
| `text` | Headings and paragraphs | `heading`, `body`, `font`, `size`, `eyebrow`, `align`, `titleColor`, `descColor`, `bgColor`, `bgImage`, `bgOverlay`, `links` |
| `card` | Cards with title, description, optional image/link | `title`, `description`, `imageUrl`, `linkLabel`, `linkUrl`, `titleColor`, `descColor`, `bgColor` |
| `doc` | Linked documents or files | `label`, `url`, `description` |
| `image` | Standalone images | `url`, `alt`, `caption`, `eyebrow`, `maxHeight` |
| `carousel` | Swipeable image gallery | `items[]` (url, alt, label, caption, linkUrl), `heading`, `eyebrow`, `pdfUrl` |
| `rule-card` | Grid of rule images | `items[]` (imageUrl, rule, caption, linkUrl), `heading`, `eyebrow` |
| `sticker` | Positioned image | `url`, `alt`, `position`, `size`, `bgColor` |

**NOTE:** `bgImage` and `bgOverlay` were added to `text` block support in StudioBlocks.tsx on April 21 session 4. The child page hero block uses these fields.

---

## STUDIO CMS — 12 TABS (as of April 21 session 4)

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
| **Site Banner** | **Toggle site-wide banner + hero banner. Two sections. NEW April 21** |

---

## KEY FILES

| File | What it is |
|---|---|
| `client/src/App.tsx` | All routes |
| `client/src/pages/Studio.tsx` | Studio CMS, 12 tabs |
| `client/src/components/InlineBlockEditor.tsx` | The inline editor panel |
| `client/src/components/studio/StudioBlocks.tsx` | Renders DB blocks on live pages — bgImage/bgOverlay support added April 21 session 4 |
| `client/src/components/studio/PageStudioBlocks.tsx` | Maps URL to slug, mounts StudioBlocks |
| `client/src/components/Footer.tsx` | Footer — PageStudioBlocks mounts here |
| `client/src/components/AnnouncementBanner.tsx` | Site-wide banner — NEW April 21 |
| `client/src/components/HeroAnnouncementBanner.tsx` | Homepage hero ribbon — NEW April 21 session 4 |
| `client/src/components/studio/StudioSiteBannerManager.tsx` | Studio UI for both banners — UPDATED April 21 session 4 |
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
| `todo.md` | Task list |
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

1. Read this file. Only this file. Every line.
2. Say to Matthew: "I am a new session. I have read HANDOVER.md. I know where we are. Ready when you are."
3. Wait for Matthew to say go.
4. Check `todo.md` for current state.
5. Do NOT touch lens pages. Do NOT migrate anything without Matthew's explicit go.

---

## SESSION FAILURE PATTERNS (learn from these)

These are the ways sessions have failed Matthew. Do not repeat them.

| Pattern | What happened | What to do instead |
|---|---|---|
| Did not read HANDOVER.md | Session went rogue, migrated deferred pages | Read every line before saying anything |
| Acted before talking | Ran code before confirming with Matthew | Talk first. Always. No exceptions. |
| Skipped end-of-message format | Next session lost context | Use LAST STEP / CURRENT / NEXT / VERTICES on every build message |
| Over-scoped fixes | Tried to fix everything at once, broke more things | One thing at a time. Confirm each step. |
| Asked questions Matthew should not have to answer | Wasted tokens, caused frustration | Read the documents. Answer your own questions first. |
| Migrated deferred pages | Destroyed 10 lens pages that took hours to build | HANDOVER.md says deferred = do not touch |
| Used wrong DB key names | Banner never worked | All site_settings keys are camelCase. Do not rename. |
| Stored images at wrong paths | Stickers broke on published site | Use manus-upload-file --webdev. Verify URL resolves before updating DB. |
