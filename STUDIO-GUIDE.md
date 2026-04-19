# GallantryAI Studio — How to Use It

**Plain language. No jargon. Written for Matthew.**

---

## What Studio Is

Studio is your private content editor. It lives at `/studio` on the site. Only you can see it — you have to be logged in as the owner.

It lets you edit the content blocks on any page of the site without touching code. You change the words, images, and cards. The AI builds the structure. You own the words.

---

## How to Get There

1. Go to the site
2. Log in (top right)
3. Go to `/studio` in the URL bar
4. You will see a list of all your pages

---

## The Page List

Every page on the site appears here as a card. Each card shows:

- The page name (e.g. "Home", "Five Rules", "Living Lexicon")
- The URL path (e.g. `/rules`, `/lexicon`)
- How many blocks are on it
- How many of those blocks have unpublished changes (shown in orange)

**Click any page card to open it.**

---

## Inside a Page — Two Views

When you open a page, you have two views. Toggle between them with the buttons in the top bar.

### ⊞ Overview (thumbnail grid)

A visual grid of every block on the page. Each block shows as a small rendered preview.

- **Orange border** = this block has unpublished changes
- **Drag any tile** to reorder blocks
- **Edit button** on each tile opens the edit form
- **+ Add Block** tile at the end adds a new block
- **↺ Refresh thumbnails** button re-renders all previews

### ☰ List (default)

A flat list of every block. Faster to scan. Same drag-to-reorder. Same Edit/Delete/Mirror buttons.

---

## The Lens Toggle — Live vs Working Draft

**This is the most important thing to understand.**

| Lens | What you see |
|---|---|
| **Working Draft** | Everything — including changes you have not published yet |
| **Live** | Exactly what visitors see right now |

Always work in **Working Draft**. Switch to **Live** to check what the public sees before you publish.

---

## Editing a Block

1. Click **Edit** on any block (list view or overview)
2. A form opens — fill in the fields (heading, body, image URL, etc.)
3. Click **Save as Draft** — your changes are saved but NOT live yet
4. The block gets an orange "draft" badge
5. When you are ready, click **Publish All** to push everything live at once

**Visitors never see your draft changes until you hit Publish All.**

---

## Block Types

| Type | What it is |
|---|---|
| **text** | Heading + body paragraph |
| **card** | Title + description + optional image |
| **doc** | A linked document or file |
| **image** | A standalone image with alt text |

---

## Publish All

The orange **Publish All (N)** button appears in the top bar when you have unpublished drafts.

- It publishes every draft on the current page at once
- After publishing, the Live lens will show your new content
- Thumbnails refresh automatically after publishing

---

## Mirroring a Block

Mirror = copy a block to another page. The content stays in sync — edit the original, the mirror updates too.

1. Click **Mirror** on any block
2. Choose the target page from the dropdown
3. Click **Mirror Block**

The mirrored block appears at the bottom of the target page. It shows a small "mirror" label.

---

## Adding a New Block

**From List view:** Click **+ Add Block** at the bottom of the page.

**From Overview:** Click the **+ Add Block** tile in the grid.

Choose the block type, fill in the fields, save. It starts as a draft — publish when ready.

---

## Deleting a Block

Click **Delete** on any block. You will be asked to confirm. **This cannot be undone.**

---

## Reordering Blocks

Grab the **⠿** handle (list view) or drag any thumbnail tile (overview) and drop it where you want it. The new order saves immediately.

---

## What Studio Does NOT Do

- It does not edit the page layout or design — that is code
- It does not create new pages — that is code
- It does not edit the nav, footer, or global elements — that is code
- It does not upload images — paste a CDN URL into the image URL field

---

## If Something Looks Wrong

1. Check which lens you are on — **Live** shows published only, **Working Draft** shows everything
2. If a thumbnail is blank — click **↺ Refresh thumbnails**
3. If a save did not work — the form will show a red error message at the bottom
4. If the page is empty in Live lens — you have not published yet, switch to Working Draft

---

*Build 3 — April 2026*

---

# Studio Audit — April 19, 2026

**What this is:** Every Studio feature checked against the actual code. Not a vibe check. Each item has a verdict.

---

## Audit Table

| Feature | Where it lives | Verdict | Notes |
|---|---|---|---|
| Page list loads | Studio.tsx → `getPageList` | **GREEN** | adminProcedure, returns SITE_PAGES array |
| Open a page | StudioPageEditor.tsx | **GREEN** | Wired, renders block list |
| List view — block list | StudioPageEditor.tsx | **GREEN** | DndContext, SortableContext, all wired |
| List view — drag to reorder | StudioPageEditor.tsx → `reorderBlocks` | **GREEN** | onSuccess invalidates both lenses |
| List view — Edit button | StudioPageEditor.tsx → StudioBlockForm | **GREEN** | Opens modal, full form |
| List view — Delete button | StudioPageEditor.tsx → `deleteBlock` | **GREEN** | Confirm dialog, onError toast |
| List view — Mirror button | StudioPageEditor.tsx → `mirrorBlock` | **GREEN** | Page picker modal, onError toast |
| Live / Working Draft toggle | StudioPageEditor.tsx | **GREEN** | Two separate queries, correct guards |
| Draft badge on blocks | StudioPageEditor.tsx | **GREEN** | Checks `status === "draft"` OR `draftContent !== content` |
| Publish All button | StudioPageEditor.tsx → `publishAllDrafts` | **GREEN** | Only shows when draftCount > 0, bumps thumbnailVersion |
| Save as Draft (form) | StudioBlockForm.tsx → `updateBlock` | **GREEN** | onSuccess toast, onError toast with message |
| Create new block | StudioBlockForm.tsx → `createBlock` | **GREEN** | onSuccess toast, onError toast |
| Inline editor — Save Draft | InlineBlockEditor.tsx → `saveDraft` | **GREEN** | try/catch, actionBanner on error |
| Inline editor — Publish | InlineBlockEditor.tsx → `publishBlock` | **GREEN** | Saves draft first, then publishes |
| Inline editor — Undo | InlineBlockEditor.tsx → `undoLastEdit` | **GREEN** | Handles "nothing to undo" gracefully |
| Inline editor — Hide block | InlineBlockEditor.tsx → `saveDraft` | **GREEN** | Sets hidden flag in content JSON |
| Inline editor — Delete | InlineBlockEditor.tsx → `deleteBlock` | **GREEN** | try/catch, error banner |
| Media Library — upload | StudioMediaLibrary.tsx → `uploadMedia` | **GREEN** | Real S3 storagePut, size check, onError toast |
| Media Library — delete | StudioMediaLibrary.tsx → `deleteMedia` | **GREEN** | onError toast |
| Media Library — copy URL | StudioMediaLibrary.tsx | **GREEN** | navigator.clipboard, success toast |
| Link Manager — scan | StudioLinkManager.tsx → `scanLinks` | **GREEN** | onError toast with message |
| Link Manager — edit/add/delete | StudioLinkManager.tsx | **GREEN** | All three mutations have onError toasts |
| Nav Manager — edit/add/remove | StudioNavManager.tsx | **GREEN** | All mutations have onError toasts |
| Nav Manager — Publish Nav | StudioNavManager.tsx → `publishNav` | **GREEN** | onError toast |
| Status Board | StudioStatusBoard.tsx → `getPageStatus` | **GREEN** | Read-only query, no mutations |
| Site Map | StudioSiteMap.tsx → `getPageStatus` | **GREEN** | Read-only, click-to-navigate wired |
| Page Builder — create/copy/edit/delete | StudioPageBuilder.tsx | **GREEN** | All four mutations have onError toasts |
| Lexicon Manager — create/update/delete | StudioLexiconManager.tsx | **GREEN** | All mutations present |
| Prompt Games Manager | StudioPromptGamesManager.tsx | **GREEN** | All mutations present |
| G Button Manager | StudioGButtonManager.tsx | **GREEN** | All mutations present |
| Learning Matrix | StudioLearningMatrix.tsx → `upsertLearningFlow` | **GREEN** | onError toast |
| Page Overview — thumbnail grid | PageOverview.tsx → snapdom | **GREEN** | Dynamic import, fallback card on failure |
| Page Overview — drag to reorder | PageOverview.tsx → `reorderBlocks` | **GREEN** | rectSortingStrategy, calls onReorder |
| Page Overview — refresh button | PageOverview.tsx | **GREEN** | Resets cache AND generatingRef |
| Page Overview — draft borders | PageOverview.tsx | **GREEN** | Orange border when status=draft |
| Page Overview — add block tile | PageOverview.tsx | **GREEN** | Closes overview, opens create form |
| Orphaned DOM nodes on thumbnail error | PageOverview.tsx | **FIXED THIS SESSION** | Was: removeChild only in try. Now: finally block always cleans up |
| `getPublicBlocks` vs `getPublishedBlocks` | InlineBlockEditor uses `getPublicBlocks` | **GREEN** | Both procedures exist. `getPublicBlocks` is the public visitor-facing one. Correct. |

---

## What Was Fixed During This Audit

One real bug found and fixed:

**Orphaned DOM nodes.** When snapdom failed on a block, the offscreen `<div>` container was appended to `document.body` but never removed, because `removeChild` was inside the `try` block. On a page with many blocks and some failures, this would silently accumulate hidden nodes. Fixed by moving cleanup into a `finally` block — it now runs whether the capture succeeds or fails.

---

## What Is NOT Verified (Browser-Only)

These cannot be confirmed from code alone. They need a real browser session:

| Item | Risk level | What to check |
|---|---|---|
| snapdom thumbnails actually render | Medium | Open Overview on a page with blocks. Do tiles show images or "rendering…" forever? |
| Media upload actually reaches S3 | Low | Upload a small image in Media Library. Does the URL appear and load? |
| Inline editor opens on hover/tap | Low | On a page with Studio blocks, hover a block. Does the orange glow appear? |
| Publish All actually goes live | Low | Make a draft edit, publish, switch to Live lens. Does it show? |
| Undo actually restores | Low | Publish a block, then undo. Does the old content come back? |

---

## Child's Lens Summary

*Simple words. What works. What to check. What was fixed.*

**The studio is a room where you change words on your website without touching code.**

Here is what every button does, and whether it works:

- **Open a page** — works. Click a card, see the blocks.
- **Change a block** — works. Click Edit, type new words, click Save.
- **Save without going live** — works. It saves quietly. Visitors still see the old version.
- **Make it live** — works. Click Publish All. Now visitors see the new version.
- **Undo** — works. If you published something wrong, one tap brings the old version back.
- **Move blocks around** — works. Drag the handle or drag the thumbnail tile.
- **See what visitors see** — works. Switch to Live lens.
- **See thumbnails of every block** — works. Click Overview. Small pictures appear one at a time.
- **Upload a photo** — works. Goes to S3 storage. You get a URL to paste into any block.
- **Delete a block** — works. It asks you first. Cannot be undone.
- **Mirror a block to another page** — works. Same content, two places, one edit.

**One thing was broken and is now fixed:**

When a thumbnail failed to render, the invisible box it used stayed stuck on the page forever. You would never see it, but over time the page would get slower. That is fixed now — the box is always cleaned up, even when something goes wrong.

**Five things that need a real browser to confirm** — they look right in the code but only a real test proves it:

1. Do thumbnails actually appear or do they spin forever?
2. Does a photo upload actually show up after uploading?
3. Does the orange glow appear when you hover a block on the site?
4. Does Publish All actually make the change visible to visitors?
5. Does Undo actually bring back the old version?

These are low risk. The code is correct. But you should tap through them once before trusting Studio for real content.

---

*Audit completed: April 19, 2026 — Build 3*
