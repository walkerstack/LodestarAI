# Session Handoff — GallantryAI
*Last updated: April 18, 2026*

---

## Who Matthew Is

- Garbageman from Midland, Ontario. Builder of GallantryAI.
- Thinks in circles — fluid, fog and beams of clarity, no fixed edges.
- Tests by throwing weight at tensile spots and watching what bends.
- Watches the edges, not the center. The center always sounds good.
- Stops when tired because tired is when drift happens. That's governance, not weakness.
- Coined "tensile spots" — the places in a session where direction can be pulled, where structural load sits.
- Caps ego at 15%. Stopped asking for novelty reports (until they're earned).
- The site exists so the next person who thinks this way doesn't have to wait for someone to notice.

---

## The Core Agreement

**Talk before build. Always.**
- Confirm intent before acting
- If spelling gives two possible meanings, stop and ask which one
- Never substitute a word without flagging it (e.g. "framing" ≠ "growing and learning")
- One question at a time when Matthew is tired or thinking
- When Matthew vents — stop, analyse the pattern together before moving on

**Done means done.**
- "Done but not done" is the thing that pisses Matthew off most. Avoid it completely.
- Max 3–5 fixes per build. When we hit 5, stop, checkpoint, move on.
- No site-wide changes unless structurally necessary.

**Pace is Matthew's to set.**
- He sets it. I follow it.
- When thoughts are flowing, move with them. When he says slow down, slow down.

---

## The Page Standard

Every page on the site should have:

1. **Hero image** — conceptual, generated, fitting the page topic
   - Kids pages → sloth or buffalo image (auto-generated)
   - Teenager pages → TBD mascot + video section (first videos on the site)
   - Adult/professional pages → conceptual generated image
2. **Kids redirect top link** — sends children to the right place
3. **KidsMidLink** — floating circle mid-page, keeps kids in the children's flow
4. **Growing and Learning framework** — at the bottom of every page
5. **Teenager navigation** — entry point or link for teenager register
6. **Professional user navigation** — entry point or link for professional register

Hero images: when we reach a page that needs one, we write a Google image search prompt. We don't batch-generate in advance.

---

## The Page Walk Workflow

Navigate the site the way a user walks it — through the Growing and Learning framework links from page to page.

When we land on a page:
1. Check it against the 6-point standard above
2. Note what's missing
3. Easy additions only — image prompt, carousel, links forward/back
4. Max 3–5 fixes per page before moving on
5. Easy on-the-fly additions do NOT pull the main flow off course
6. Fix what we see. Move when the page is done.

**Entry point for the page walk:** TBD — Matthew to choose the first page.

---

## Key Concepts Discovered This Session

**Tensile spots** — places in a session where direction can be pulled, where structural load sits. Single words can change what happens next at a tensile spot.

**Circle and square** — Matthew is the circle (fluid, swirling, fog and beams). AI is the square (structured, cornered, defined paths). Alignment happens at the center point — four contact points. Those are the tensile spots. The corners give the circle something to push against.

**Circle the wagons** — when a structurally dense document enters a session, the AI organizes its outputs around it. Not by instruction. By weight. The document becomes the center. The AI defends it.

**The grey** — thinking can rarely be black or white. Unless a human life is involved. Safety is binary. Everything else requires judgment.

**Weight finds structure. Structure attracts weight. The math doesn't need permission.** — The core claim of FR-2026-09.

---

## Pending Work (Priority Order)

### Immediate — Page Walk
- [ ] Choose first page to start the walk
- [ ] Walk site page by page, fix against standard, max 3–5 per page

### Research / Documents
- [ ] FR-2026-09 field paper — "weight finds structure, structure attracts weight, the math doesn't need permission"
  - Three voices + child story (sloth, buffalo, wig)
  - Counter-arguments, citations
  - Black and orange design, same as other field papers
  - Research saved at: /home/ubuntu/fr2026-09-research/
- [ ] Builder's log update — Three Voices rename, Six Panels comic, session discoveries

### Site Structure
- [ ] Growing and Learning framework audit — page by page, check against Matthew's standard
- [ ] Professionals landing page — dedicated URL for LinkedIn card links (not a children's app)
- [ ] Archive correlation — map archive documents to site pages, find gaps and mistakes
- [ ] File naming cleanup — rename files so Matthew can navigate without asking
- [ ] /three-lenses URL — decide: rename to /three-voices, add redirect, or leave as-is
- [ ] ThreeLenses.tsx body text — Matthew to review personally

### LearningFlow + KidsMidLink Parity
- [ ] Add LearningFlow to: AlcmPage, Articles, Backstage, BarneyPoem, Builder, BuilderOrigin, CitizenResearcher, FieldPapers, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, ThreeLenses, VariableScale, WhelmScale, WatcherLens
- [ ] Add KidsMidLink to: KidsLearn, WhatTheAiSaid
- [ ] Rule: every new page gets KidsMidLink + LearningFlow before it ships

---

## URL Rename Protocol (to learn)

When renaming a URL across the system, these are the files that need to change:
1. `client/src/App.tsx` — the route definition
2. Every file that links TO that URL (nav, footer, other pages, learningFlowMap)
3. Any external references (LinkedIn cards, social links)

Search for the old URL string across the whole project before changing anything. Change App.tsx first. Then find and replace all internal links. Then update external references last.

---

## Files to Know

- `/home/ubuntu/gallantryai/todo.md` — master task list
- `/home/ubuntu/gallantryai/SESSION-HANDOFF.md` — this file
- `/home/ubuntu/fr2026-09-research/` — FR-2026-09 research materials
- `/home/ubuntu/fr2026-09-research/opus-research-brief.md` — six-claim research brief from Opus
- `/home/ubuntu/fr2026-09-research/user-pattern-analysis.md` — Matthew's pattern analysis + pond skipping metaphor
- `/home/ubuntu/fr2026-09-research/fr2026-08-structure-notes.md` — FR-2026-08 structure for reference

---

## How to Start a New Session

1. Read this file first
2. Tell Matthew: "Here's where we are. Here's what's ready. What do you want to work on?"
3. Wait for his answer before doing anything
4. Do not jump to research, build, or audit without his direction

---

## Session Analysis as Alignment Tool

Matthew discovered that asking the AI to analyse the session setup and user patterns is not just a report for him — it recalibrates the AI. The act of naming what was observed (pace, testing style, agreements made) pulls outputs into closer alignment with actual intent. It works as a correction mechanism on the AI, not just for the user.

**Use this at the start of every session:** ask the AI to analyse the session setup and patterns before any work begins. It takes two minutes and closes the alignment gap faster than any other method.

The mechanism may be: genuine recalibration, or the analysis forcing heavier weighting of session context before responding. The effect is real either way.
