# SESSION-CURRENT.md
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

---

## CURRENT STATE — April 17, 2026

**Version:** v39
**Dev server:** Running clean. Zero TypeScript errors.
**Last checkpoint:** a3379ad6 — Builder's Scene + children's fade (poems and mobile nav in 50ba3f53 before that)

**What is live on the site:**

Homepage:
- 9-role premium image tile entry block (replaced 5-button hat flow) — Everyday, Professional, Watcher, Teen, Child, Parent, Nurse, Student, Teacher — each with CDN background image, expand-on-click lens links
- Builder's Scene section — sloth-lantern-buffalo image, two-column, links to /builder
- Children's section: dark→light fade at top, light→dark fade at bottom
- Proof sentence: "This site is the proof of the framework it teaches."
- Story arc carousel (6 frames), children's section, performed honesty, pathfinding block (still at line 871 — Matthew to decide if it stays)

Builder page:
- 11 poems from February 28, 2026 — full-bleed section, painterly background image, Playfair Display, exact words preserved

Nav:
- Desktop: "Who Are You?" dropdown — 9 roles in 3×3 grid with images, 3D press effect, 480px panel
- Mobile: 9 role tiles with images + touch press + accordion sections (Foundation, For You, Tools, Research, Explore)
- navData.ts controls all link arrays

Other pages: 51 lexicon terms, 5 new Promptolinguistics sections, 8 Session Tools prompts, Field Papers with origin document, What the AI Said running log

**Key files:**
- Nav links: `client/src/lib/navData.ts`
- Lexicon data: `client/src/lib/lexiconData.ts`
- Prompt panel: `client/src/components/PromptPanel.tsx`
- Learning flow: `client/src/lib/learningFlowMap.ts`
- Session archive: `SESSION-HANDOFF.md`
- Routes: `client/src/App.tsx`

---

## ACTIVE THREADS

**Thread 2 — remaining items (in order):**
1. Governance audit — read UserGovernance.tsx and GallantryAiPage.tsx. Decide where Ozzy + Wall + Monster land. Remember 3.0 and 3.1.
2. Field Papers — 4 items from master document
3. Citizen Researcher — 4 items from master document
4. Five Rules — Rule 11 (The Wall), Hard vs Soft Constraints
5. **Database + Admin dashboard + panels wired to DB** — most structurally important item remaining

---

## PENDING FLAGS

- **PARKED — Accessibility nav placement:** Matthew to rethink where Flower Presets surface. Currently "Simpler view →" in grey text at bottom of Who Are You? dropdown. Do not touch until Matthew decides.
- **Professional tile in nav:** Still links to /for/prompt-engineer. Needs a Professional landing page or sub-panel showing all 6 professional lenses. Flagged. Not yet built.
- **WHO ARE YOU pathfinding block (Home.tsx line 871):** The old expandable 8-role card block still exists below the new entry tile block. Matthew to decide if it stays, moves, or is removed.
- **FieldPapers.tsx** — KidsRedirect, LearningFlow, teenager entry, professional entry are PENDING. Tell Matthew before touching this page.
- **Internal linking** — pages are not yet connected to each other. Sparse cross-linking is a known gap. Page-by-page fix as we go.

---

## STANDING NOTES

- **Ozzy + Wall + Monster** stay together. One section, one home. Other pages link to it. When governance comes up, remember 3.0 and 3.1.
- **Three Voices** — not "Three Lenses" anywhere visible. Flag and fix on any page touched.
- **Hats are entry modes. Voices are reading modes (always 3, always on every page). Lenses are destination pages.** Three distinct things. Three distinct places. Do not conflate them.
- **No generic buttons.** Only our styled tiles and image buttons. If a button looks generic, it is wrong.
- **Close-out protocol** — Builder's log bump + What the AI Said entries + SESSION-HANDOFF.md append + SESSION-CURRENT.md rewrite + final checkpoint. All five together.
- **Two document system** — SESSION-CURRENT.md (rewrite every session) + SESSION-HANDOFF.md (append only, never remove). Both kept. Both matter.
