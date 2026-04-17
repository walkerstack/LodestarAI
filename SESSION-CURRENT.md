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

**Version:** v37
**Dev server:** Running clean. Zero TypeScript errors.
**Last checkpoint:** d3e864e7 — Nav data refactor (navData.ts extracted)

**What is live on the site:**
- 51 lexicon terms across 15 categories (new: COMMAND category with 11 terms)
- Promptolinguistics — 5 new sections with three-voice buttons (Active Spectrum, Sentence Break Architecture, Regulation Spectrum, Semantic Density, Relational Delivery of Reasoning)
- Prompt Library — Session Tools now has 8 prompts (5 new: Boot Sequence, Track and Hold, Five Questions, Everyday Boot Sequence, Context Bridge Loading Strategy)
- Field Papers — master document (Feb 28, 2026) as first entry in new Origin Document section
- What the AI Said — 2 new running log entries from April 17 session (Two Threads, The Alignment Setup Report)
- Nav data refactored — all link arrays in client/src/lib/navData.ts

**Key files:**
- Nav links: `client/src/lib/navData.ts`
- Lexicon data: `client/src/lib/lexiconData.ts`
- Prompt panel: `client/src/components/PromptPanel.tsx`
- Session archive: `SESSION-HANDOFF.md`
- Routes: `client/src/App.tsx`

---

## ACTIVE THREADS

**Thread 1 — Master Document Dispersal:** COMPLETE for this session.
Remaining items held for future sessions:
- Builder page content (Four Origin Doors, Trolley Problem, Builder as First User, Field Guide over Manifesto) — Matthew is thinking
- Road Protocol (Ozzy, Cortana, Secure, Return Signals) — Matthew is thinking

**Thread 2 — 19:30 Build:** WAITING. Not started yet.
Order when ready:
1. Governance audit — read UserGovernance.tsx and GallantryAiPage.tsx. Decide where Ozzy + Wall + Monster land. Remember 3.0 and 3.1.
2. Builder poems — 11 poems, quiet section near bottom of Builder page, elegant
3. Field Papers — 4 items from master document
4. Citizen Researcher — 4 items from master document
5. Five Rules — Rule 11 (The Wall), Hard vs Soft Constraints
6. Database + Admin dashboard + panels wired to DB

---

## PENDING FLAGS

- **FieldPapers.tsx** — ghost code says KidsRedirect, LearningFlow, teenager entry, professional entry are present. They are NOT. All four are PENDING. Tell Matthew before touching this page.
- **Home page** — one sentence to add: "This site is the proof of the framework it teaches." Placement and exact wording TBD. Talk-first moment.
- **Internal linking** — pages are not yet connected to each other. A person on Promptolinguistics cannot easily find the Lexicon. Sparse cross-linking is a known gap.

---

## STANDING NOTES

- **Ozzy + Wall + Monster** stay together. One section, one home. Other pages link to it. When governance comes up, remember 3.0 and 3.1.
- **Three Voices** — not "Three Lenses" anywhere visible. Flag and fix on any page touched.
- **Close-out protocol** — Builder's log bump + What the AI Said entries + SESSION-HANDOFF.md append + SESSION-CURRENT.md rewrite + final checkpoint. All five together.
- **Two document system** — SESSION-CURRENT.md (rewrite every session) + SESSION-HANDOFF.md (append only, never remove). Both kept. Both matter.
