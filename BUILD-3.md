# Build 3 — Inline Editor + Live/Draft Lens System

**Date:** April 19, 2026
**Status:** PLANNED — alignment complete, not yet started
**Session:** Matthew + Manus — aligned together, Matthew watching each step

---

## What We Are Building

A fully editable site where Matthew can tap any block on any page, edit it right there, and control every part of it — text, image, link, button, background, order. No going to a separate editor. Just tap, edit, done.

Plus: a live/draft lens system so Studio and the inline editor both have two views — the live site (what visitors see) and the working draft (what Matthew is editing before publishing).

---

## The Vision (Matthew's words)

- Tap any block on any page while logged in as admin
- Block edges become clearly defined (bold border or glow) in edit mode
- A panel slides in from the right with full controls
- Controls are organised in clear categories — menus within menus are fine if the logic makes sense
- Button logic designed to Matthew's cognitive profile (discussed separately)
- Full control over: text, title, image (swap or upload), links (add/remove), button label and destination, background colour or image, block order (drag up/down)
- Hero card control — easy to change what is in it
- Add external links easily — paste URL, it pulls image and title automatically, or use your own
- Add descriptions to links — shown clearly where and how it will appear
- Link management panel — overview of all links, change from one place
- Full system view — zoom out, see whole page layout, change block order from there
- Learning and Growing section on every page — editable inline
- Undo last edit — one tap, block goes back to what it was before save
- Live lens vs working lens — edit in draft, review, then publish when ready
- Full button design stays in a Studio tab (not inline)
- Phone first, then computer

---

## Two Lenses

**Live Lens** — what visitors see. Published content only. Read-only for Matthew too.

**Working Lens** — Matthew's editing view. Shows draft content. Changes save to draft first. Nothing goes live until Matthew publishes.

This applies to both the inline editor (on the live pages) and Studio (the management interface). Both show the same two states.

---

## Build Steps (in order, Matthew watches each one)

### Step 1 — Schema: Add draft/published state to content_blocks
- Add `status` column to `content_blocks` table: `"draft" | "published"`
- Add `draftContent` column: stores the working version of the block content
- All existing blocks default to `published`
- Push migration to DB
- **Matthew confirms before Step 2**

### Step 2 — Server: Update procedures for draft/live
- `getPublicBlocks` — returns only `published` blocks (visitors and live lens)
- `getDraftBlocks` — returns draft version if exists, otherwise published (working lens)
- `saveDraft` — saves changes to `draftContent`, sets status to `draft`
- `publishBlock` — copies `draftContent` to `content`, sets status to `published`
- `publishAllDrafts` — publishes all pending drafts on a page at once
- `undoLastEdit` — reverts `draftContent` to last saved `content`
- **Matthew confirms before Step 3**

### Step 3 — InlineBlockEditor component
- Slides in from the right when a block is tapped (admin only)
- Sections in the panel:
  - **Text** — edit heading, body text
  - **Media** — swap image, upload new, remove
  - **Link** — add/remove link, paste URL (auto-fetches title + image), add description
  - **Background** — colour picker, background image
  - **Block** — change block type, duplicate, delete
- Bottom of panel: **Save Draft**, **Publish Now**, **Undo**, **Cancel**
- Phone: tap and hold block to enter edit mode, panel slides up from bottom
- Computer: hover shows pencil icon, click opens panel from right
- **Matthew reviews sample designs before Step 4**

### Step 4 — Wire InlineBlockEditor into StudioBlocks
- Every block rendered by `StudioBlocks` gets the edit overlay (admin only)
- `useAuth()` check — if not admin, no edit UI shown
- Block border glows orange when in edit mode
- Drag handle appears on left side of every block (admin only) for reorder
- **Matthew tests on one page before Step 5**

### Step 5 — Live/Draft lens toggle in Studio
- Add lens toggle to Studio header: **Live** | **Working**
- Live lens: shows published blocks, read-only
- Working lens: shows draft blocks, full edit access
- Pages & Blocks tab shows draft status badge on blocks with unpublished changes
- Publish button in Studio header: publishes all drafts on current page
- **Matthew reviews in Studio before Step 6**

### Step 6 — Full system view (page overview)
- In Studio, Pages & Blocks tab: add a "Page Overview" button
- Shows a zoomed-out visual of all blocks on the page
- Drag to reorder from this view
- Add new block from this view
- **Matthew reviews before Step 7**

### Step 7 — TypeScript check, tests, instruction guide, checkpoint
- 0 TypeScript errors
- Tests cover: draft save, publish, undo, getPublicBlocks vs getDraftBlocks
- Instruction guide written in plain language (the test of the build)
- Checkpoint saved

---

## What Is NOT In This Build

- New page creation from inline (that is Page Builder — already exists in Studio)
- Rate limiting (future build)

---

## Button + Link Controls (Added April 19, 2026 — Matthew's direction)

### Inline Panel — Button Section
Every block that has a button gets these controls in the inline panel:
- **Label** — change what the button says
- **Destination** — where it goes (internal path or external URL)
- **Size** — Small / Medium / Large
- **Style** — pick from saved button designs (visual sample picker)
- **Image as button** — use an image as the button (like the homepage hat tiles) with a destination link attached
- **New tab toggle** — open link in new tab or same tab

### Studio — Button Design Tab (separate tab, not inline)
- Create new button designs: colour, border, shadow, font, hover state
- Save designs with a name (e.g. "Orange Primary", "Dark Outline", "Hat Tile")
- Saved designs appear as samples in the inline panel button picker
- Matthew can build new designs here and they become available site-wide

### Inline Panel — Link Manager Section
- Shows all links on the current block
- Add new link: paste URL → auto-fetches title + image preview
- Add description to any link — shown clearly where it will appear
- Add sub-description to any link — secondary line of context shown below the description
- Remove link
- Change destination of existing link without re-entering everything
- Syncs with Studio Link Manager tab (full site link overview)
- Framework connection layer — each link shows which page it points to, colour-coded by nav section (Foundation, Tools, Research, etc.) so Matthew can see how the block connects to the overall site structure

### Inline Panel — Button Section (updated)
- Label — change what the button says
- Destination — where it goes (internal path or external URL)
- Width control — set button width explicitly
- Height control — set button height explicitly
- Size presets — Small / Medium / Large (quick option alongside manual control)
- Style — pick from saved button designs (visual sample picker)
- Image as button — use an image as the button with a destination link attached
- New tab toggle — open link in new tab or same tab
- All standard effects available: hover state, shadow depth, colour, border, font — set in Button Design Studio tab, applied here

### Inline Panel — Block Section (updated)
- Change block type
- Duplicate block (on same page)
- Copy to page — pick any destination page, block is added to the bottom of that page as a draft
- Visibility toggle — show or hide this block from visitors without deleting it. Hidden blocks are invisible to visitors but fully editable in Working Lens.
- Delete block (with confirm step)

### Inline Panel — Preview Mode
- Preview button at the top of the panel
- Shows exactly how the block looks to a visitor — no edit chrome, no glow border, real rendered output
- One tap to preview, one tap back to editing
- Works on both phone and desktop

### Inline Panel — Contextual Help System
Built for someone coming back after a 12-hour shift with kids in bed. Never in the way. Always there when needed.
- Every section header has a small ? icon — tap for one plain-language sentence explaining what that section does. Tap again to close.
- Empty field placeholder text tells you what to do: not "Enter text here" but "Paste a URL — I will fetch the title and image for you."
- Action confirmation text after every action:
  - Save Draft: "Saved. Visitors still see the old version."
  - Publish Now: "Live. Visitors can see this now."
  - Undo: "Restored to your last published version."
  - Hide block: "Hidden. Only you can see this block right now."
- First-time hint: the first time the panel opens on a new block, one line at the top: "Tap any section to expand it. Changes save as draft until you publish." Dismisses permanently after first read.

### Studio — KidsRedirect + KidsMidLink Toggle
- Each page in Studio has a toggle: Show KidsRedirect (top of page) and Show KidsMidLink (mid-page right)
- Position is fixed — never changes
- Button design is fixed — never changes
- Toggle is the only control — on or off per page
- Stored in studioPages table as showKidsRedirect and showKidsMidLink boolean fields

---

## Build 3B — Planned (Separate Session, Not In Build 3)

These items are confirmed and wanted. They are too large to add to Build 3 without scope risk. They are not forgotten — they are next.

### Sections Within Blocks
- A block can contain multiple named sub-sections, each with its own title and category label
- Requires schema change: either a blockSections table or JSON structure inside the block
- Matthew can add, name, reorder, and delete sections within a single block
- Each section is independently editable inline

### Live Site Map Overlay
A gesture-triggered interactive map of the entire site — the framework architecture made live and manageable.

**How to trigger:**
- Phone: swipe down from the top of any page (admin only)
- Desktop: button in Studio header

**What it shows:**
- The full site framework as a visual node map — same structure as the architecture diagrams (Floor → Ceiling, connections between pages, research layer)
- Every page is a node. Every link between pages is a visible connection line.
- Live status on every node:
  - Green dot = published, no drafts
  - Orange dot = has unpublished drafts
  - Grey/dim = page is hidden
  - Small indicator = new block added since last publish

**How it grows and shows change:**
- When a new page is added, a new node appears in the map
- When a link is added between two pages, a new connection line draws between those nodes
- When a draft is saved, the node pulses orange in real time
- When content is published, the node settles to green
- When a block is hidden, it dims on the node
- The map is always live — it reflects the real state of the site at all times

**Display architecture (decided April 19, 2026):**
- **Desktop / phone in landscape:** Full visual node map with connection lines, scaffold levels, colour-coded layers. Pinch to zoom, scroll/pan to explore. This is the full framework diagram made interactive.
- **Phone in portrait:** Collapsible tree list. Floor at top, tap any level to expand, nodes listed vertically with live status dots. Fast to navigate, thumb-friendly, no horizontal scroll required. Same data, same live status, shaped to the screen.
- No forced rotation. No locked orientation. The map detects screen size and orientation and shows the right mode automatically.

**Interactions:**
- Tap any node → jumps to that page
- Long press any node → opens the inline editor for that page's blocks directly from the map
- Pinch to zoom in/out on the map (desktop/landscape only)
- The map is scrollable/pannable — the full framework fits in one view but can be explored

**Why this matters:**
The map IS the site's logic. The scaffold levels (Floor through Ceiling), the connections, the research layer — this is how Matthew thinks about the site. Having it accessible as a live overlay means you never lose the thread of where you are in the framework, even after a 12-hour shift.

### Three Voice Infrastructure
- Every block can have three versions of its content: Everyday / Professional / Watcher
- Schema change: three content fields per block, or a separate blockVoices table
- Matthew can type each voice manually, or (TBD) the system can generate them
- The AI-generation question is separate — the structure itself is built first
- Visitor sees the voice matching their selected lens
- This is the most significant architectural addition on the roadmap

---

## Risks and Backup Plans

**Risk:** Schema migration could fail if DB is unavailable.
**Backup:** Checkpoint saved before migration. Rollback available.

**Risk:** Draft/live split could cause confusion if blocks show wrong version.
**Backup:** Test on one page first. Verify both lenses before wiring all pages.

**Risk:** Inline editor panel could interfere with page layout on mobile.
**Backup:** Panel slides over content, does not push layout. Dismiss by tapping outside.

**Confidence:** 8/10. Pattern is proven. The one unknown is mobile drag-to-reorder — may need a simplified version (up/down arrows instead of drag) for phone.

---

## Session Rules

- Matthew watches each step
- No step starts until Matthew confirms the previous one
- If something looks wrong — stop, name it, decide together
- No building through ambiguity
- Instruction guide written after build, not before — it is the proof the build worked

---

*This document is the thread. If the session resets, start here.*
