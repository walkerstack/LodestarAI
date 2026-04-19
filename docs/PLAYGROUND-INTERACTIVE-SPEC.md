# Playground Interactive Spec — Alignment Report
**GallantryAI | April 18, 2026 | Pre-build sign-off document**

---

## What Exists Now

The current `/playground` page is a well-structured "Coming Soon" placeholder. It has the correct dark editorial design, the three audience descriptions (Everyday / Teacher / Professional), a preview list of six planned features, and the full standard page structure: KidsRedirect, KidsMidLink, LearningFlow, Nav, Footer. The ghost code header is present. The page is registered in App.tsx at `/playground` and linked from the nav.

The six features listed on the current page are:

| Listed Feature | Status |
|---|---|
| Word Role Tester | Not built |
| Register Drift Detector | Not built |
| ALCM Visualizer | Not built |
| HOLD Dial Practice | Not built |
| Prompt Comparison | Not built |
| Guided Exercises | Not built |

None of these overlap directly with the Perplexity spec modules. They are complementary, not contradictory.

---

## What Perplexity Proposed

Four interactive modules inside the Playground page, plus three site-wide upgrades:

**Playground Modules (new content inside /playground):**
1. Road Protocol Simulator — live chat with Token Zero injection, Flower Preset selector, Watcher sidebar
2. Drift Detector — paste a transcript, analyze for 4 drift types, return score and correction suggestions
3. ALCM Dial Tester — 8 sliders mapped to ALCM axes, word bank, live API call, before/after diff
4. Five Rules Session — 5 rule cards with AGREE toggle, governed prompt generator, chat tester

**Site-wide upgrades:**
- G-Button: add "Practice Now" mini-chat option
- Rule Cards: click-to-activate with glow state, "Test this rule" opens G-button chat
- Post-Session Dashboard: 5-question reflection form, save/share as PDF (no backend)

---

## Reconciliation: What Aligns, What Conflicts, What Needs Discussion

### Strong alignment with existing site

The Token Zero enforcement concept is already documented in Promptolinguistics and the Road Protocol page. Injecting it as a system-level prefix on every chat call is architecturally correct and consistent with the site's governance framework. The Watcher sidebar concept maps directly to the Watcher Lens page at `/for/watcher`. The Three Voices toggle is already a documented concept at `/three-voices`. The Drift Detector maps directly to the Drift page at `/drift`. All four modules are grounded in existing site content — nothing is being invented from outside the framework.

### What needs clarification before build

**The API question is already solved.** The spec says "use YOUR_API_KEY." The site already has `invokeLLM` wired server-side through tRPC. Every chat call goes through the existing backend. No external key needed. This is a non-issue.

**The Three Voices toggle** is listed as a feature on multiple modules. The site has a Three Voices / Three Lenses page but the toggle as an interactive UI component does not exist yet. This needs to be built once and reused — not built separately inside each module.

**The Watcher sidebar** is described as showing "Drift risk: Low/Med/High." This requires the AI to evaluate the conversation in real time and return a drift assessment. That is a second LLM call per message — it adds latency and cost. This needs a decision: is the Watcher sidebar a real-time AI assessment, or a rule-based heuristic (e.g., session length, keyword detection)?

**The ALCM Dial Tester** lists 8 sliders but the ALCM documentation on the site defines specific axes. The exact axis names and their word banks need to be pulled from the existing ALCM page content before the UI is built, not invented during the build.

**The Post-Session Dashboard PDF export** — "no backend" PDF generation in the browser is possible with a library like `jsPDF` but has limitations on mobile. This is a minor technical note, not a blocker.

### What is not in the Perplexity spec but should be

The existing Playground page lists six features that are not in the Perplexity spec. Those features (Word Role Tester, Register Drift Detector, ALCM Visualizer, HOLD Dial Practice, Prompt Comparison, Guided Exercises) should either be incorporated into the four modules or explicitly retired from the "coming soon" list. They cannot remain as promises on the page once the interactive version ships.

The 6-point page standard must be applied. The new interactive Playground must pass: KidsRedirect, KidsMidLink, LearningFlow, hero image, button contrast, and audience entry points. The current placeholder passes all six. The interactive version must not regress.

---

## Recommended Build Order

The Perplexity spec's priority order is correct. The recommended sequence is:

**Phase 1 — Playground page (core practice)**
Build the four modules as tabs inside the existing `/playground` page. Do not create a new page. The placeholder content (six feature cards, audience descriptions) gets replaced by the live modules. The page structure (Nav, KidsRedirect, KidsMidLink, LearningFlow, Footer) is preserved exactly.

**Phase 2 — G-Button upgrade**
Add "Practice Now" as a third option in the G-button panel. This opens a minimal Road Protocol chat inline — not an iframe, a proper component. Token Zero auto-injected. Collapses clean.

**Phase 3 — Rule Cards interactive**
Apply click-to-activate glow state to rule cards on `/rules` and the children's pages. "Test this rule" opens the G-button chat with the rule injected as context. localStorage persistence for AGREE state.

**Phase 4 — Post-Session Dashboard**
Global footer link. Five-question reflection form. PDF export via jsPDF. No backend required.

---

## Open Questions for Matthew Before Build Starts

These require a decision, not an assumption:

| Question | Options |
|---|---|
| Watcher sidebar: real-time AI or rule-based? | AI call (slower, richer) vs. heuristic (fast, simpler) |
| Three Voices toggle: build once globally or per-module? | Global component (recommended) vs. per-module |
| ALCM axes: pull from existing page content or define fresh? | Pull from /alcm page (recommended) |
| Existing six feature cards: incorporate into modules or remove? | Incorporate where possible, remove the rest |
| Playground tab layout: horizontal tabs or vertical accordion? | Matthew's call — both work on mobile |

---

## Session Estimate

| Phase | Estimated Sessions |
|---|---|
| Playground (4 modules) | 2 sessions |
| G-Button upgrade | 0.5 sessions |
| Rule Cards interactive | 0.5 sessions |
| Post-Session Dashboard | 1 session |
| **Total** | **~4 sessions** |

This is an honest estimate. The Playground modules involve live AI calls, state management, and mobile-responsive interactive UI. Rushing it produces drift. Building it properly produces something the site is proud of.

---

## What Does Not Change

The site's design language does not change. Orange glow, 2px borders, dark editorial register, Playfair Display / DM Sans typography, the existing color tokens. All interactive elements match the existing design system.

The governance principles do not change. No free chats. Token Zero always active. Watcher always present. No novelty for novelty's sake. Every interactive element must serve the practice of the Five Rules, Road Protocol, Drift detection, or ALCM — not entertain.

The static strength is preserved. All interactive modules are optional. The page works without JavaScript interaction. The content stands on its own.

---

*Document status: Pre-build. Awaiting Matthew's sign-off on open questions before any implementation begins.*
