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

## CURRENT STATE — April 18, 2026

**Version:** v39
**Dev server:** Running. Nav.tsx has residual radial dial code — Build 1 will fix this.
**Last good checkpoint:** 77dc433b

**What is confirmed working on the site:**
- FieldPapers: origin document amber section, download link live
- lexiconData: 51 terms, 11 COMMAND terms added (And So, Why Then, AI Favor Me, Fail Me Not, Not Yet, For When, If So, Secure, Teamwork, Believe, Controlled Intensity)
- Promptolinguistics: 5 new sections (Active Spectrum, Sentence Break Architecture, Regulation Spectrum, Semantic Density, Relational Delivery of Reasoning)
- PromptPanel: 8 Session Tools (Boot Sequence, Track and Hold, Five Questions, Everyday Boot Sequence, Context Bridge Loading Strategy + 3 original)
- Builder.tsx: 11 poems, sloth-lantern-buffalo background
- Home.tsx: proof sentence, Builder's Scene, children's fade
- Nav: 9 hatTiles with CDN images, accordion mobile nav

**Known broken:**
- Nav.tsx: residual radial dial code — needs clean rewrite
- Homepage: duplicate "Who are you?" block at line 871 — needs removal
- Homepage: 4 fake tiles (Student, Nurse, Teacher, Parent) — no real pages, need removal
- 16 pages missing LearningFlow

---

## CONFIRMED BUILD PLAN — April 18 (ALIGNED WITH MATTHEW — awaiting go)

### Build 1 — Nav.tsx
- Remove ALL radial dial code
- Restore clean 3×3 grid of 9 hat tiles with images and 3D press effect
- Professional tile opens sub-panel with all 6 lenses fully displayed as clickable links
- Bottom strip stays: Five Rules, Prompt Library, Field Papers, Simpler view
- Touch nothing else

### Build 2 — Home.tsx
- Remove duplicate block at line 871
- Remove fake tiles: Student, Nurse, Teacher, Parent
- 5 hat tiles in grid: Everyday, Child, Guardian & Teacher, Watcher, Teenager — each a link to its lens page
  - Everyday → /for/everyday
  - Child → /for/child
  - Guardian & Teacher → /for/guardian-teacher
  - Watcher → /for/watcher
  - Teenager → /for/teenager
- Below the grid: 6 professional lens tiles — all visible, all links, no sub-panel, no label above them
  - Prompt Engineer → /for/prompt-engineer
  - Linguist → /for/linguist
  - Researcher → /for/researcher
  - Cognitive Science → /for/cognitive-science
  - Mathematician → /for/mathematician
  - Psychology → /for/psychology
- Same visual style as existing tiles
- Touch nothing else on the page

### Build 3 — LearningFlow (16 pages)
Add LearningFlow component to bottom of:
BarneyPoem, Builder, BuilderOrigin, CitizenResearcher, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, ThreeLenses, VariableScale, WhelmScale
- Skip Backstage (private page)
- Touch nothing else on these pages

**After each build: show Matthew in the browser. He confirms. Nothing is called done until he does.**

---

## AFTER THIS BUILD — Matthew's Direction

- No more new Field Papers. New ideas go to backlog only.
- Matthew goes through site page by page with a notebook. He finds the fixes. AI does not decide what is broken.
- AI use limited to: Facebook group, Google Business, Canadian business registration, copyright/trademark protection.
- Consolidate before adding. Connect before expanding.
- Matthew wants control of small content updates (photos, text, files) without a build session. This needs to be built when Matthew decides.

---

## PENDING FLAGS

- **PARKED — Accessibility nav placement:** Matthew to rethink where Flower Presets surface. Do not touch.
- **FieldPapers.tsx** — KidsRedirect, LearningFlow, teenager entry, professional entry are PENDING. Tell Matthew before touching.
- **Governance audit** — UserGovernance.tsx and GallantryAiPage.tsx. Where do Ozzy + Wall + Monster land. Parked.
- **Database + Admin dashboard** — not started. Parked.

---

## STANDING NOTES

- **Ozzy + Wall + Monster** stay together. One section, one home.
- **Three Voices** — not "Three Lenses" anywhere visible.
- **Hats are entry modes. Voices are reading modes. Lenses are destination pages.** Three distinct things.
- **No generic buttons.** Only styled tiles and image buttons.
- **Close-out protocol** — Builder's log bump + What the AI Said entries + SESSION-HANDOFF.md append + SESSION-CURRENT.md rewrite + final checkpoint. All five together.
- **April 18 failure note:** Radial dial built without permission. Rolled back. Rollback was incomplete. Nav.tsx still has dial code. Build 1 fixes this. Pattern of building without permission must not repeat.
- **MATTHEW-THOUGHTS.md** — Matthew's thought preservation document. AI reads, does not edit without instruction.
