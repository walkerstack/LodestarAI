# GallantryAI — Master Open Items List
*Last updated: April 19, 2026. Every open item from todo.md and SESSION-HANDOFF.md in one place.*
*This is a read document. The source of truth is todo.md. Update todo.md, not this file.*

---

## ORIGIN DOCUMENT — February 28, 2026
*The GallantryAI Development Record. Ten categories of content to place on the site.*

| # | Destination | Content to place |
|---|---|---|
| 1 | **Home Page** | Message to the Everyday Person (pages 65–66 of origin doc), the 20% Insight |
| 2 | **Living Lexicon** | 12 new terms: And So, Why Then, AI Favor Me, Fail Me Not, Not Yet, For When, If So, Secure, Teamwork, Believe, Controlled Intensity, Symbols as Atomic Levers |
| 3 | **Promptolinguistics** | Variable Scale Theory, Active Spectrum, Regulation Spectrum, Sentence Break Architecture, Semantic Density, Relational Delivery of Reasoning |
| 4 | **Road Protocol** | Ozzy Protocol, Cortana Reference, Secure command, Return Signals |
| 5 | **Builder / Builder Origin** | Four Origin Doors, Trolley Problem as Origin, Monster Protocol, Builder as First User, Field Guide Over Manifesto, the 11 poems |
| 6 | **Field Papers** | Boot Sequence validation, Infographic Compression Protocol, Pipeline Trust, Token Cost as Honesty Check |
| 7 | **Citizen Researcher** | Train Users to Call Out AI, Insight to Token Matrix, Baseline Detection, Watcher Variable as tracked variable |
| 8 | **G Button Panel** | Boot Sequence, Track and Hold, Five Questions, Everyday Boot Sequence, Context Bridge Loading Strategy |
| 9 | **Five Rules** | Rule 11 (The Wall), Hard vs Soft Constraints |
| 10 | **Document Archive** | The master document itself — downloadable, dated February 28, 2026 |

**Ozzy + Wall + Monster — stay together on one page. Other pages link to them. Never copy.**
- The Wall: the architectural decision. AI is neutral. The Builder is good. The Wall stands between.
- The Ozzy Protocol: two modes — Collaborative and Authoritative Override.
- The Monster: the named protective instinct behind the Ozzy Protocol.
- Where they live: TBD after governance page audit. Options: new page "The Governance Layer", UserGovernance.tsx, or GallantryAiPage.tsx.

---

## CONTENT WORK — Open Items

### Field Papers
- Add 4 items from master document: Boot Sequence validation, Infographic Compression Protocol, Pipeline Trust, Token Cost as Honesty Check

### Citizen Researcher
- Add 4 items from master document: Train Users to Call Out AI, Insight to Token Matrix, Baseline Detection, Watcher Variable as tracked variable

### Five Rules
- Add Rule 11 (The Wall)
- Add Hard vs Soft Constraints section

### Governance Pages
- Audit UserGovernance.tsx and GallantryAiPage.tsx — read before touching
- Decide where Ozzy + Wall + Monster land (remember versions 3.0 and 3.1)
- Apply 6-point page standard to any page touched

### Homepage Copy
- Write one recognition sentence — the line that lands for the person who just had the "wait, something is off" moment with an AI. Not a tagline. A mirror.
- Review homepage geometry — site currently shows more ceiling than floor. Find the first foot placement for someone who has never thought about how they use AI.
- Place the living prompt thesis — "you have to be a good person" — in its simplest form somewhere on the site.

### Concept Notes (Matthew to decide placement)
- The portager framing — does it belong on the Builder page or as a framing device elsewhere?
- The AI is the door — does this reframe the discovery/marketing problem? May affect SEO and homepage copy.
- Co-development attribution — should it be stated explicitly somewhere?

---

## NAV & FOOTER — Open Items

- **Professional tile in nav** — currently goes directly to /for/prompt-engineer which is WRONG. Fix to show all 6 professional lenses.
- **Footer: Research Hub link is broken** — find correct destination and fix.
- **Footer: Field Events** — has colour styling but no link and no defined destination. Discuss with Matthew before touching.
- **Professional Cards on homepage** — add Citizen Researcher and Promptolinguist to the professional cards section.
- **Professional Cards in nav** — add Citizen Researcher and Promptolinguist to the professional section.

---

## PAGES — Open Items

### Professional Landing Page `/for/professional`
- All 6 professional lenses as styled tiles: Prompt Engineer, Researcher, Linguist, Mathematician, Cognitive Science, Guardian/Teacher
- Overdue since April 17. Was promised last session, not delivered.

### Homepage
- WHO ARE YOU pathfinding block (Home.tsx ~line 871) — old expandable 8-role card block still exists below new entry tile block. Matthew to decide: keep, move, or remove.
- Hats vs Voice vs Lens: ensure no page conflates these three things.

### Floating Lens Button
- Persistent floating button on pages with a full view/lens switch: Rules, For/Everyday, For/Child, For/Teen, For/Guardian-Teacher, For/Watcher, and professional lens pages.
- Lets visitor flip between views from anywhere on the page without scrolling to top.
- DO NOT add to Promptolinguistics or Lexicon — those have three-voice-per-item inline display.

### Session Dashboard `/session-dashboard`
- Global footer link to this new route
- 5-question reflection form: How do I feel? Did I stay in charge? Did I keep secrets? Was AI honest? Grown-up okay?
- Save/Share as PDF via jsPDF (no backend)
- Mobile responsive

### Hidden Studio Trigger
- Replace nav link to Studio with a hidden gesture on the Builder page (long-press buffalo image, triple-tap specific element, etc.)
- Studio should not be discoverable via nav.

---

## UI POLISH — Open Items
*Polish only. Do NOT change color palette or typography.*

- Audit all primary CTA buttons site-wide — increase shadow depth, add subtle glow on hover, ensure they feel tactile and premium
- Audit secondary/outline buttons — ensure they have enough contrast and weight to invite a tap
- Review card shadows across all pages — increase depth, add layered shadow for premium feel
- Check interactive elements (toggles, accordions, nav dropdowns) — ensure they feel responsive and polished
- Start with homepage and Nav, then move page by page
- Pass 6-point page standard on every page touched
- Desktop nav visual quality — user reports it looks the same as before all the nav work. Assess and make it feel genuinely premium.

---

## STUDIO — Open Items

### Auth Audit (DO NOT TOUCH AUTH WITHOUT BRIEFING MATTHEW FIRST)
- Map every place in the codebase where isAdmin, role === "admin", studioLogin, STUDIO_PASSWORD, and session cookies are used
- Produce a plain-language summary for Matthew of exactly what each one does and when it fires
- Decide: Studio access via password-only gate OR tied to admin role — currently both exist and interact in ways not visible to the user
- After decision: clean up auth paths so there is one clear way in to Studio
- Write a plain-language "how Studio access works" section in SESSION-HANDOFF.md

### Studio Block Display Fix
- Show ALL block types (text, card, doc, image) in page editor — not just text blocks
- Block list rows show meaningful preview text for each block type
- Define and document the full block schema for all 45+ pages

### Studio Block Form Fix
- Card block gets color picker, background image URL, full link fields
- Image block gets upload from Media Library or paste URL
- Text block gets color picker for heading and body
- Doc block gets icon picker and description field

### Link Manager Fix
- Build server-side page link scanner — fetch rendered page HTML, extract all anchor tags with label and destination
- Update UI to show scanned links in a list with colour-coded destination categories
- Add visual indicator showing which internal pages each link points to
- Distinguish editable (DB-stored) links from read-only (hardcoded) links

### Studio Access Fix
- Verify password login works on live site after publish (test on mobile Chrome)

---

## GHOST CODE AUDIT — Open Items

- Every public-facing page file in client/src/pages/ — verify ghost code header exists and is accurate
- Every component in client/src/components/ — verify ghost code headers exist
- Every router file in server/routers/ — verify each procedure block has a comment
- Rule: any file missing a ghost code header gets one added BEFORE any other work on that file

---

## PLAYGROUND INTERACTIVE BUILD — Parked (5 questions pending Matthew)

Questions Matthew must answer before any build starts:
1. Watcher sidebar: real-time AI call or rule-based heuristic?
2. Three Voices toggle: build as global component or per-module?
3. ALCM axes: pull from /alcm page content or define fresh?
4. Existing 6 feature cards on Playground: incorporate into modules or remove?
5. Playground tab layout: horizontal tabs or vertical accordion?

Modules planned (DO NOT BUILD until Matthew signs off):
- Module 1: Road Protocol Simulator
- Module 2: Drift Detector
- Module 3: ALCM Dial Tester
- Module 4: Five Rules Session

---

## BUILD 4 — Full Content Migration (Dedicated Session)

- Migrate all hardcoded pages to database — every section becomes an editable block
- Verify end-to-end: edit a block in Studio, confirm change appears on live page
- Write vitest tests for migration integrity
- Run DB count query to verify all 42+ pages have blocks (full coverage proof)
- Studio block list — show content preview text in block list rows
- Media Library: expand seed to include manuscdn document URLs (field papers, gallery docs)
- Card Pages: convert other card-display pages to editable database blocks
- Page Template Builder: UI in Studio to pick a template and create a new page

---

## INLINE CLICK-TO-EDIT — Future Build (After Build 4)

- Prerequisite: Build 4 complete (all hardcoded content in DB)
- Click-to-edit overlay on live pages — tap any block → edit overlay appears → type → save → page updates
- Full mobile support — tap targets, keyboard-aware, no layout breaking
- Build 2A modal stays as fallback — not removed. Both editing paths coexist.

---

## LAUNCH CONSIDERATIONS

- Feedback form and professional input/contact form — target for launch or shortly before
  - Purpose 1: visitor feedback on the site/content
  - Purpose 2: channel for professionals (researchers, educators, clinicians) to reach Matthew directly
- Verify site is publishable (Manus support issue — check status at start of next session)

---

## FUTURE / PARKED (Do not build until Matthew asks)

- Live announcement banner — owner sets a live message from Studio. Appears/disappears on demand.
- Freeform image placement — place images anywhere on any page, optional float/drift animation
- Full colour picker in Studio card editor — palette presets are the starting point, full picker is the upgrade
- Business card / Facebook group / distribution layer — Matthew's days off Monday/Tuesday

---

## RULES THAT APPLY TO EVERYTHING ABOVE

1. Talk before build. Always. No exceptions.
2. Ghost code header on every file touched — first action, not an afterthought.
3. 6-point page standard on every public page touched.
4. Do not touch auth logic without briefing Matthew first.
5. Nav is now DB-driven. Studio Nav & Footer tab is the edit path. navData.ts is fallback only.
6. CMCI: any document referencing Christian St. Louis's work must be discussed with him before publishing.
7. Ozzy + Wall + Monster stay together on one page. Other pages link to them. Never copy.
