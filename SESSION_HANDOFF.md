# GallantryAI — Session Handoff Document
**Last updated: April 18, 2026**
**Checkpoint: 6cdce824**

---

## CRITICAL: Read This First

This project has experienced mid-build session switches at least 3 times. This document exists to prevent loss of context. Read it fully before taking any action.

---

## What This Project Is

GallantryAI is a public educational website about AI literacy, safety, and ethical use. It is built by a single owner (not a developer) who manages content through a custom CMS called Studio. The site is live at:

**https://gallantryai-k6tj495b.manus.space**

The owner accesses Studio at `/studio` using password: **[password removed — April 19, 2026]**

---

## Current State (as of checkpoint 6cdce824)

### What Is Working
- Full site with 45+ pages, dark theme, orange accents
- Navigation: Who Are You, Foundation, For You, Tools, Research, Explore
- Studio CMS at `/studio` — password login working ([password removed — April 19, 2026])
- Studio tabs: Pages & Blocks, Media Library, Link Manager
- Content blocks in database for all major pages
- Field Papers (10 cards), Gallery (21 cards), Frameworks (10 cards) — all in DB
- Media library seeded with 125 CloudFront assets
- studio_pages table created and migrated

### What Is NOT Working / Not Done
- Studio password login: **NEEDS TESTING on live site after publish** — the fix was just deployed (checkpoint 6cdce824). The previous version had wrong cookie format. New version uses standard app_session_id cookie with owner's openId.
- Page Template Builder (Studio "New Page" tab) — NOT STARTED. This was Phase 3 of the current build plan.
- Studio block list preview text shows "empty" for card blocks — cosmetic issue only
- Full DB count verification of all 42+ pages having blocks — not done
- Media library: manuscdn document URLs not yet seeded

---

## The Studio Password Login — How It Works

**Server side (server/routers/studio.ts):**
- `studioLogin` public procedure
- Checks `input.password` against `ENV.studioPassword` (defaults to "[password removed — April 19, 2026]")
- On success: calls `sdk.createSessionToken(ENV.ownerOpenId)` to create a standard JWT
- Sets `app_session_id` cookie (same cookie the Manus OAuth flow uses)
- This means the existing `authenticateRequest` in sdk.ts recognizes it automatically

**Client side (client/src/pages/Studio.tsx):**
- `StudioLoginForm` component shown when `!isAuthenticated`
- Password input → `trpc.studio.studioLogin.useMutation`
- On success: `window.location.reload()` — cookie is set, page reloads as authenticated

**ENV values needed:**
- `STUDIO_PASSWORD` — defaults to "[password removed — April 19, 2026]" if not set
- `OWNER_OPEN_ID` — the owner's Manus openId (injected automatically by platform)
- `OWNER_NAME` — the owner's name (injected automatically by platform)

---

## Database Tables

| Table | Purpose |
|-------|---------|
| users | Manus OAuth users |
| content_blocks | All page content blocks (text, card, doc types) |
| media_library | Images and document URLs |
| page_links | Reroutable links per page |
| studio_pages | Pages created via Studio template builder (NEW — empty) |

---

## Key Files

| File | Purpose |
|------|---------|
| client/src/pages/Studio.tsx | Studio CMS main page |
| client/src/components/studio/StudioPageEditor.tsx | Block editor per page |
| client/src/components/studio/StudioBlockForm.tsx | Add/edit block form |
| client/src/components/studio/StudioBlocks.tsx | Live page block renderer |
| client/src/components/studio/StudioMediaLibrary.tsx | Media tab |
| client/src/components/studio/StudioLinkManager.tsx | Links tab |
| server/routers/studio.ts | All Studio tRPC procedures |
| server/studioDb.ts | Studio DB helpers |
| drizzle/schema.ts | Database schema |

---

## Next Build: Page Template Builder

**What it is:** A "New Page" tab in Studio where the owner can:
1. Pick a template: Blank, Article, Lens, Card Grid
2. Enter: page title, slug, nav label
3. Hit Create → page is saved to `studio_pages` table, seeded with starter blocks, immediately editable in Studio

**What's already done:**
- `studio_pages` table in schema ✓
- `createStudioPage`, `getAllStudioPages`, `getStudioPageBySlug` helpers in studioDb.ts ✓
- Schema migrated to DB ✓

**What still needs building:**
- `studio.createPage` tRPC mutation in studio.ts router
- `studio.getStudioPages` query (to merge into page list)
- `StudioPageBuilder.tsx` component — template picker + form
- Add "New Page" tab to Studio.tsx
- `DynamicPage.tsx` — generic page renderer for studio-created pages
- Route in App.tsx for studio-created pages

---

## Owner Preferences (Critical)

1. **Never say something is done until it works on the owner's actual device.** The owner uses mobile Chrome. Test flows must account for mobile.
2. **Password is [password removed — April 19, 2026]** — do not change it without explicit instruction.
3. **Dark theme, orange (#E8520A) accents, Playfair Display headings, DM Sans body.** Do not change the design system.
4. **Additive only** — never remove existing content. Only add.
5. **Page-by-page fixes** — do not do site-wide sweeps unless explicitly asked.
6. **When the owner references a prior decision, honor it.** Do not re-open closed questions.
7. **Build, test, then report.** Not the other way around.

---

## Session Pattern Failures (from this session)

See `SESSION_PATTERN_ANALYSIS.md` for full analysis. Short version:
- Declared done before testing
- Explained instead of fixing
- Described UI elements the user couldn't see
- Built wrong thing first (OAuth instead of password)
- Compounded errors under pressure
- Did not hold prior decisions

---

## How to Start the Next Session

1. Read this file
2. Read `todo.md` for the full task list
3. Verify Studio password login works on the live site (test it)
4. If it works: start Page Template Builder
5. If it doesn't work: fix it before touching anything else

---

*This document is the source of truth for session continuity.*
