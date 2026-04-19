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
