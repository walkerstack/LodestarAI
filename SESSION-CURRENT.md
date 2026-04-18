## GallantryAI — Working Brief

---

## HOW TO USE THIS DOCUMENT

**Read this first at the start of every session.**
This document tells you the current state of the project, the active threads, the standing rules, and what is pending.

**At the end of every session, rewrite this entire document.**
Do not append. Do not preserve old content. Rewrite it completely with the new current state.
The archive is in SESSION-HANDOFF.md. This document is always today.

**These rules were written by Matthew Gallantry, Midland Ontario, April 2026.**
They are not preferences. They are the governance layer for this project. Follow them exactly.

---

## GOVERNANCE RULES — NON-NEGOTIABLE

1. **Talk before build. Always. No exceptions.** Read the file, draft the plan, show Matthew, wait for approval. Then build.
2. **Nothing removed from SESSION-HANDOFF.md. Ever.** Only append. The archive grows. It does not shrink.
3. **Ghost code on every file touched.** PENDING for anything not yet built. Tell Matthew what is PENDING before touching a page. He decides.
4. **Button consistency.** Same look, same feel, every page. Orange/amber family. Check on every page touched.
5. **navData.ts is the only place to edit nav links.** Never edit the data arrays in Nav.tsx directly. Add to navData.ts AND Footer.tsx together — never one without the other.
6. **Two threads stay separate.** Name them. Work one at a time. Never intermingle build steps with planning steps.
7. **Builder's log and What the AI Said are updated together at session close.** One pass. One version bump. Not separately.
8. **SESSION-CURRENT.md is rewritten at session close.** SESSION-HANDOFF.md gets a new dated entry appended.
9. **Alignment check is a quality gate, not a comfort request.** When Matthew asks for one, give a full layer report: base, alignment, context.
10. **The site is the proof of the framework. The framework is the governance. The governance is the person.**
11. **Do not say "done" until Matthew has seen it in the browser and confirmed it.** Not before. Never.
12. **Do not build without explicit "go" from Matthew.** Reading the file and having a plan is not permission to build.
13. **Two document rule.** SESSION-CURRENT.md rewritten at session close. SESSION-HANDOFF.md appended. Both always maintained.

---

## CURRENT STATE — April 18, 2026 (Late Session)

**Version:** v39 + Studio
**Dev server:** Running.
**Last good checkpoint:** 87cdd376 (Studio build — verified in browser)

**What is confirmed working on the site:**
- FieldPapers: origin document amber section, download link live
- lexiconData: 51 terms, 11 COMMAND terms added
- Promptolinguistics: 5 new sections
- PromptPanel: 8 Session Tools
- Builder.tsx: 11 poems, sloth-lantern-buffalo background
- Home.tsx: proof sentence, Builder's Scene, children's fade
- Nav: 9 hatTiles with CDN images, accordion mobile nav
- **Studio: live at /studio — owner-only dashboard, all three tabs verified in browser**
  - Pages & Blocks tab: all 63 pages listed, block editor working, create/edit/delete/mirror confirmed
  - Media Library tab: upload zone live
  - Link Manager tab: page selector working
  - STUDIO nav link: visible only to admin user
  - /backstage: redirects to /studio (old password retired)
  - 16 tests passing

**Known broken (carried forward):**
- Nav.tsx: residual radial dial code — needs clean rewrite (Build 1)
- Homepage: duplicate "Who are you?" block at line 871 — needs removal (Build 2)
- Homepage: 4 fake tiles (Student, Nurse, Teacher, Parent) — no real pages, need removal (Build 2)
- 16 pages missing LearningFlow (Build 3)

---

## STUDIO — WHAT IS DONE AND WHAT IS NEXT

**Done (verified):**
- Studio shell, login protection, page list, block editor, block creator, media library, link manager, drag-to-reorder, block mirror, nav link, /backstage redirect, tests

**What Studio can do right now:**
- Add new blocks to any page (text, card, doc/link, image)
- Edit or delete blocks you created
- Upload photos and docs to media library
- See links per page and change their destination
- Mirror a block from one page to another

**What Studio cannot do yet:**
- Edit the existing hardcoded content on pages (text, images already there from the code files)

**Next layer — Full Site Content Migration:**
- Plan written: gallantryai-migration-plan.md
- Approach: additive (database records alongside existing code, never replacing)
- 42 data array pages: migration script, one session
- 21 inline JSX pages: deliberate block definition, one to two sessions
- Fallback: original code files stay intact throughout — no blank pages possible
- **Status: READY TO BUILD — awaiting Matthew's go**

---

## CONFIRMED BUILD PLAN — (ALIGNED WITH MATTHEW — awaiting go)

### Build 1 — Nav.tsx
- Remove ALL radial dial code
- Restore clean 3×3 grid of 9 hat tiles with images and 3D press effect
- Professional tile opens sub-panel with all 6 lenses fully displayed as clickable links
- Bottom strip stays: Five Rules, Prompt Library, Field Papers, Simpler view
- Touch nothing else

### Build 2 — Home.tsx
- Remove duplicate block at line 871
- Remove fake tiles: Student, Nurse, Teacher, Parent
- 5 hat tiles in grid: Everyday, Child, Guardian & Teacher, Watcher, Teenager
- Below the grid: 6 professional lens tiles — all visible, all links
- Touch nothing else on the page

### Build 3 — LearningFlow (16 pages)
Add LearningFlow to: BarneyPoem, Builder, BuilderOrigin, CitizenResearcher, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, ThreeLenses, VariableScale, WhelmScale

### Build 4 — Full Site Content Migration
- Run migration script for 42 data array pages
- Manually define blocks for 21 inline JSX pages
- All existing page content becomes editable in Studio
- Plan document: gallantryai-migration-plan.md

**After each build: show Matthew in the browser. He confirms. Nothing is called done until he does.**

---

## SESSION PATTERN ALIGNMENT — April 18 (logged at Matthew's request)

**What went well:** Studio walkthrough as plain language landed right. Matthew confirmed it matched his vision. Research was done before building. Honesty about what research added (confirmation, not new knowledge) was given when asked directly.

**Where I drifted:** Used "today" to mean "not now" when Matthew hadn't said that. Made migration sound harder than it is through over-cautious framing. Stacked caveats twice — Matthew caught both and corrected immediately.

**Pattern to hold:** Strip to what was actually asked. Do not project hesitation. Do not add conditions Matthew did not put there.

---

## PENDING FLAGS

- **PARKED — Accessibility nav placement:** Matthew to rethink where Flower Presets surface. Do not touch.
- **FieldPapers.tsx** — KidsRedirect, LearningFlow, teenager entry, professional entry are PENDING. Tell Matthew before touching.
- **Governance audit** — UserGovernance.tsx and GallantryAiPage.tsx. Where do Ozzy + Wall + Monster land. Parked.
- **Page template creator** — Matthew wants to create new pages from templates in Studio. Noted. Not yet planned.

---

## STANDING NOTES

- **Ozzy + Wall + Monster** stay together. One section, one home.
- **Three Voices** — not "Three Lenses" anywhere visible.
- **Hats are entry modes. Voices are reading modes. Lenses are destination pages.** Three distinct things.
- **No generic buttons.** Only styled tiles and image buttons.
- **Close-out protocol** — Builder's log bump + What the AI Said entries + SESSION-HANDOFF.md append + SESSION-CURRENT.md rewrite + final checkpoint. All five together.
- **April 18 failure note:** Radial dial built without permission. Rolled back. Rollback was incomplete. Nav.tsx still has dial code. Build 1 fixes this.
- **MATTHEW-THOUGHTS.md** — Matthew's thought preservation document. AI reads, does not edit without instruction.
- **Studio password:** Hudson2021! — used for owner auth layer. Not in code. Held here only.
- **Mobile-first:** Studio and all new builds must work on phone first. Matthew works from both phone and desktop.
