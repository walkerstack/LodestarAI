# Split-Screen Edit / Live Preview Feature — Spec

**Status: DO NOT BUILD — PLAN ONLY**
**DO NOT start this without Matthew explicitly saying "go build this"**
**DO NOT read this document unless Matthew directs you to**

---

## What Matthew Wants

When editing content in Studio (any block, any page), Matthew wants to see:
- **Left side:** The edit form (text input, image upload, color picker, etc.)
- **Right side:** A live preview of how the page looks with his changes applied — BEFORE publishing

Then when he is happy, he hits one button and it goes live on the dev server. From there he publishes via the checkpoint system.

---

## Current State (what exists)

- Studio has a Pages & Blocks tab where you can edit blocks one at a time
- The InlineBlockEditor (orange box system) lets you click a block on the live page and edit it in a side panel
- There is NO live preview that shows the full page context while editing
- The AnnouncementBanner Studio tab has a small static preview box — not a live page preview

---

## The Gap

Matthew cannot see the full page while editing a block. He has to:
1. Edit in Studio
2. Save
3. Navigate to the page to see how it looks
4. Go back to Studio if something is wrong

This is the friction he is describing.

---

## Proposed Solution

**Option A — Inline preview panel (simpler, lower risk)**
When editing a block via the orange box system (InlineBlockEditor), expand the panel to show a mini-preview of just that block rendered as it will appear. Not the full page — just the block. This is already 50% built — the InlineBlockEditor renders a preview of the block type. It just needs to be made more prominent.

**Option B — Split-screen Studio view (full solution, higher effort)**
A new Studio tab or mode: left panel is the block editor form, right panel is an iframe showing the live page with the current edits applied in real time. Matthew types, the right side updates. When happy, he hits "Publish Block" and it saves to DB. The page on the right refreshes automatically.

**Matthew's preference:** Option B — the full split-screen. He described seeing what he is doing AND the live view simultaneously.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| iframe cross-origin issues | Medium | Blocking | Use same-origin iframe (dev server to dev server) |
| Real-time preview causes extra DB writes | Medium | Performance | Use local state for preview, only write to DB on Save |
| Complexity breaks existing Studio | Medium | High | Build as new tab, do not modify existing tabs |
| Session handover loses context | High | Medium | This document exists to prevent that |

**Confidence: MEDIUM** — Option A is easy. Option B is a 2–3 hour build. Both are possible.

---

## What Matthew Needs to Decide Before Building

1. Option A (block-level preview) or Option B (full split-screen)?
2. Should this apply to ALL Studio editing, or just the banner and homepage blocks first?
3. Does the "publish from preview" button replace the existing checkpoint/publish flow, or sit alongside it?

---

## Notes from Matthew's Description

- "I need to have one screen where I'm looking at what I'm doing and editing and then I can hit a button. It goes to the live screen and then I publish from there."
- "It doesn't seem like it was built in. I think it can be done quick. I think it's half built in."
- He is right — the InlineBlockEditor is 50% of Option A already. The iframe split-screen is Option B.
- This was discussed in previous sessions and may have been partially planned but not built.

---

## Build Steps (when approved — Option B)

1. Create `StudioSplitView.tsx` — left: block editor form, right: iframe pointing to the page being edited
2. Wire the left form to update a `previewOverride` state that is passed to the iframe via URL params or postMessage
3. The page component reads `previewOverride` and renders it instead of the DB value (preview only, not saved)
4. "Save & Apply" button writes to DB and refreshes the iframe
5. Add "Split View" button to the existing Pages & Blocks tab
6. Test on homepage and Promptolinguistics first
7. Save checkpoint
