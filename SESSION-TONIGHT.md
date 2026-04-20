# Tonight's Plan — April 19, 2026

Written from Matthew's words. Nothing added.

---

## What Matthew Said Tonight

**The Studio build plan — in order:**

Step 1: Add status, draftContent, previousContent columns to content_blocks schema, push migration (migration 0009 applied, 307 blocks default published)

Step 2: Server procedures — getDraftBlocks, getPublishedBlocks, saveDraft, publishBlock, publishAllDrafts, undoLastEdit in studioDb.ts + studio router (26 tests passing)

Step 3: Build InlineBlockEditor component — bottom sheet (phone) / right panel (desktop), sections: Text, Media, Link Manager, Background, Buttons, Block, Preview mode, contextual help

Step 3a: Button controls — label, destination, width+height, size presets, style picker, image-as-button, all standard effects

Step 3b: Link Manager — all links on block, add/remove, URL auto-fetch, description + sub-description, framework connection layer (colour-coded by nav section)

Step 3c: Block section — visibility toggle (hide without deleting), duplicate on page, copy to another page, delete with confirm

Step 3d: Contextual help — ? icons per section, meaningful placeholder text, action confirmation after save/publish/undo/hide

Step 3e: Preview mode — one tap to see visitor view, one tap back to editing (reuses CardPreview component)

Step 4: Wire InlineBlockEditor into StudioBlocks — tap+hold (phone) / hover+click (desktop), orange glow border, drag-to-reorder handle

Step 5: Live/Draft lens toggle in Studio — Live vs Working, Publish All button in header, draft status badge on blocks

Step 6: Page Overview in Studio — snapdom thumbnails, grid drag-to-reorder, draft borders, refresh button, add block tile

Step 7: TypeScript check (0 errors), tests (26/26 passing), instruction guide (STUDIO-GUIDE.md), checkpoint

Studio: Button Design tab — create/name/save button designs, available site-wide as samples in inline panel

Studio: KidsRedirect + KidsMidLink toggle per page — on/off only, position and design fixed

Build 3B: Sections within blocks (title labelling, categories) — separate session

Build 3B: Live Site Map Overlay — interactive framework map, gesture-triggered, grows with site, live draft/publish status

Build 3B: Three Voice infrastructure (Everyday/Professional/Watcher per block) — separate session

---

## What Matthew Also Said Tonight

We were doing all pages. So they can be editable. Like pages on Five Rules.

I want to be able to edit all this myself. I want every block on every page editable the way I have talked about all day.

I want to go to these pages and edit each individual block separately as an inline editor.

An inline editor means you tap any block of content directly on the page and edit it right there without going to a separate admin panel. The block glows orange. You tap it. The editor opens. You change it. You save it.

Every piece of content on every page — headings, body text, cards, images — stored in the database as blocks, with orange glow and inline editing when logged in.

---

## What Is Done Tonight

- Orange glow now shows on mobile without hovering (always visible when logged in as admin)
- Research Hub seeded with one block (last page that had zero blocks)
- Checkpoint saved: 64ad16af

---

## What Is Not Done

- Steps 5, 6, 7 of the Studio build plan
- Page content still hardcoded in React files — not in the database — so it cannot be tapped and edited inline
- The whole site needs its content moved from hardcoded React into database blocks

---

## The Real Problem Matthew Named

"You guys were doing the whole page into the database and you have not. You told me all day that I could go to these pages and edit each individual block separately as an inline editor."

The page content — every heading, paragraph, card on every page — needs to be in the database so it can be tapped and edited. That work was promised. It was not done.
