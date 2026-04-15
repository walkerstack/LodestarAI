# GallantryAI — Full Context Handoff Report
**Generated:** April 14, 2026  
**For:** New session pickup  
**Project:** GallantryAI at whatisgallantryai.com  
**Platform:** Manus web dev  
**Latest checkpoint:** `manus-webdev://7dbc207a`  
**Dev URL:** https://3000-in242fn7t729r9h6xazis-78ed0a66.us2.manus.computer  
**Deployed domain:** gallantryai-k6tj495b.manus.space (not yet published to whatisgallantryai.com)

---

## WHO BUILT THIS

Matt Gallantry. Single dad. Garbageman. Promptolinguist. No formal coding background. Built this entire site through AI-assisted sessions. Every concept on this site is his original research and framework — not AI-generated ideas. The AI builds the code. Matt builds the knowledge.

---

## WHAT THE SITE IS

GallantryAI is a citizen human-AI research and education platform. It documents:
- AI governance frameworks built by a non-academic user through empirical testing
- Prompt linguistics (called "Promptolinguistics") — how words shape AI output
- Children's AI safety education
- The "watcher variable" — the part of you that watches yourself while you work with AI
- Real documented conversations between Matt and AI systems (unedited)

The site is NOT a product. It is a living document of a practice.

---

## CRITICAL RULES (NEVER BREAK THESE)

1. **NEVER change existing elements — only ADD** unless explicitly discussed first
2. **VERIFY before saying something is done** — look at the actual file/page
3. **If something looks wrong, unexpected, or unclear — STOP and ask**
4. **Do not make assumptions** — ask for clarification
5. **Do not run batch scripts across many files** without checking results on actual pages
6. **Keep responses short and direct** — no filler
7. **Token cost awareness is critical** — Matt has limited budget (single dad, garbageman)
8. **Zero TypeScript errors required** before every checkpoint

---

## SITE STRUCTURE — ALL ROUTES

### Audience Lens Pages (`/for/`)
| Route | Page | Notes |
|-------|------|-------|
| `/for/everyday` | Everyday Lens | Plain language version |
| `/for/child` | Child Lens | Warm white, sloth guide |
| `/for/child/rules` | Child Five Rules | Sloth guides through 5 rules |
| `/for/child/patterns` | What Are Patterns? | Sloth, 5 pattern types, expandable cards |
| `/for/guardian-teacher` | Guardian & Teacher Lens | |
| `/for/prompt-engineer` | Prompt Engineer Lens | |
| `/for/linguist` | Linguist Lens | |
| `/for/mathematician` | Mathematician Lens | |
| `/for/cognitive-science` | Cognitive Science Lens | |
| `/for/psychology` | Psychology Lens | |
| `/for/researcher` | Researcher Lens | |
| `/for/watcher` | Watcher Lens | The recursive/deep voice |

### Foundation Pages
| Route | Page |
|-------|------|
| `/` | Homepage (dark, orange accents) |
| `/gallantry-ai` | GallantryAI overview |
| `/three-lenses` | Three Lenses / Rosetta Stone |
| `/rules` | The Five Rules |
| `/road-protocol` | Road Protocol |
| `/scaffold` | The Scaffold |
| `/user-governance` | User-Side Governance |
| `/dual-strategy` | Dual Strategy |

### Tools Pages
| Route | Page |
|-------|------|
| `/flower-presets` | Flower Presets |
| `/prompt-games` | Prompt Games & Power Prompts |
| `/math-prompting` | Math Through Prompting |
| `/playground` | Promptology Playground |
| `/frameworks` | Framework Families |
| `/whelm-scale` | Whelm Scale |
| `/variable-scale` | Variable Scale Theory |
| `/malbolge` | Malbolge Geofence |

### Research Pages
| Route | Page |
|-------|------|
| `/promptolinguistics` | Promptolinguistics |
| `/alcm` | ALCM |
| `/lexicon` | Living Lexicon |
| `/taxonomy` | AI Family Taxonomy |
| `/what-claude-admitted` | What Claude Admitted |
| `/eu-ai-act` | EU AI Act |
| `/research-hub` | Research Hub |
| `/counter-arguments` | Counter Arguments |
| `/screenshot-sharing` | Screenshot Sharing |
| `/field-report-review` | Field Report Review |
| `/what-the-ai-said` | What the AI Said (real conversations) |

### Explore Pages
| Route | Page |
|-------|------|
| `/gallery` | Gallery |
| `/articles` | Articles |
| `/human-line` | The Human Line |
| `/field-papers` | Field Papers |
| `/citizen-researcher` | Citizen Researcher |
| `/builder` | The Builder |
| `/builder-origin` | Builder Origin |
| `/open-door` | The Open Door |
| `/backstage` | Backstage |
| `/if-you-need-to-stop` | Safety Page |

### For You (Nav section — 4 distinct colors)
| Route | Label | Color |
|-------|-------|-------|
| `/school-board` | School Board | Teal `#0d9488` |
| `/kids-learn` | Kids Learn | Purple `#7c3aed` |
| `/for/child/rules` | Child Five Rules | Rose `#e11d48` |
| `/for/child/patterns` | What Are Patterns? | Emerald `#059669` |

---

## THE THREE LENSES (CRITICAL — GET THIS RIGHT)

The Three Lenses page (`/three-lenses`) is the **Rosetta Stone** of the site. The three lenses are:

- **Everyday** — plain language, no jargon, for anyone
- **Professional** — technical precision, research framing, for builders/researchers
- **Watcher** — recursive, poetic, for people who've been inside the loop long enough to see the loop

These are NOT child/guardian/mathematician. That was a hallucination from a previous session. Do not repeat it.

The Three Lenses describe **how content is written** across the site — three ways of saying the same thing.

---

## TERMINOLOGY THAT NEEDS CLARIFICATION (WORK IN PROGRESS)

There are currently three different things that could be confused:

1. **Three Lenses** — Everyday / Professional / Watcher (already named, has a page at `/three-lenses`)
2. **Audience hats** — the "Who Are You?" pathfinding cards on the homepage (Parent, Teacher, Nurse, Student, etc.) — **no official name yet**
3. **Individual lens pages** — the `/for/` routes (mathematician, psychologist, linguist, etc.) — called "lenses" in the nav

Matt was working on creating clear language to distinguish these three things. The conversation was in progress when the session ended. Do not assume a resolution — ask Matt to continue from where he left off.

---

## KEY COMPONENTS

### KidsRedirect (top of page)
- File: `client/src/components/KidsRedirect.tsx`
- Orange pulsing glow, buffalo image, opens modal
- Props: `story`, `quote`, `attribution`
- Used on all adult content pages
- **DO NOT CHANGE THIS COMPONENT — it is the reference**

### KidsMidLink (floating mid-page)
- File: `client/src/components/KidsMidLink.tsx`
- Position: `fixed`, right side, 50% viewport height
- Orange-to-transparent pulsing radial glow
- No dark strip/bar — clean floating circle
- Two actions: "Guide me" → `/for/child`, "I'm chill" → closes
- Applied to 48+ pages
- Different buffalo image from top button

### Nav
- File: `client/src/components/Nav.tsx`
- 6 sections: Enter Your Lens, Foundation, For You, Tools, Research, Explore
- Desktop dropdown + mobile sidebar both updated
- For You section has 4 items with 4 distinct colors (see table above)

### Footer
- File: `client/src/components/Footer.tsx`
- Mirrors nav structure

### OopsSloth
- File: `client/src/components/OopsSloth.tsx`
- Appears on 404/error states
- Sloth character = patient guide for children

---

## MASCOTS / CHARACTERS

- **Buffalo** = guardian/protector. Shows up on adult pages as the kids redirect button. Guards the content.
- **Sloth** = patient teacher for children. Slow, calm, guides kids through concepts. Used on all children's pages.

---

## DESIGN SYSTEM

- **Homepage:** Dark background `#080604`, orange accents `#E8520A`
- **Children's pages:** Warm white/cream background, soft colors
- **Adult content pages:** Mix of dark hero + cream body (like Three Lenses page)
- **Fonts:** Playfair Display (serif, headings), DM Sans (body), Nunito (children's pages)
- **Primary accent:** `#E8520A` (orange)
- **Secondary accents:** Various per-section

---

## CDN IMAGE URLS (KEY IMAGES)

All images are hosted on CloudFront. Base: `https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/`

| Image | URL suffix |
|-------|-----------|
| Hero (buffalo + sloth) | `og-hero-v2-ANjG24hqHFNLTULaRPgLyt.webp` |
| Sloth click me | `sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp` |
| Sloth rule 1 safety | `sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp` |
| Sloth rule 2 honesty | `sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp` |
| Sloth rule 3 trust | `sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp` |
| Sloth rule 4 agency | `sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp` |
| Sloth rule 5 drift | `sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp` |
| Sloth rule 6 together | `sloth-rule6-together-v2-Mi3MM8752en7NCUjzmL6vn.webp` |
| Three paths converge | (used in homepage framework reveal section) |
| Rosetta Stone hero | `rosetta-stone-hero-7d7y7afATaM3YuXWmHM7JB.webp` |
| ALCM diagram | `1000005693_e894b781.jpg` |
| RLHF vs Gallantry | `1000005860_c6f6c0a8.jpg` |
| Human drift | `1000006151_42d3ec3d.jpg` |
| Buffalo nav | `image_4d1de092_7c0aebcb.png` |

---

## HOMEPAGE SECTIONS (in order)

1. Hero image (buffalo + sloth)
2. Watcher quote
3. Three message cards (voices — no official name for this trio yet)
4. Framework reveal section (three paths image + discovery text + doorway links)
5. "Who Are You?" pathfinding (audience hats — no official name yet)
6. Ethos navigation
7. Scaffold levels
8. Story arc carousel (sloth + 6 rules)
9. Research images section
10. Living Build Log (collapsible, v1–v17)

---

## WHAT THE AI SAID PAGE

- Route: `/what-the-ai-said`
- File: `client/src/pages/WhatTheAiSaid.tsx`
- Contains: real unedited conversation exchanges between Matt and AI about governance failures
- Has kids redirect protection (buffalo)
- Includes: Watcher description, report from AI to its creators, three lenses applied to the conversation
- This is primary source documentation — do not soften or editorialize

---

## THINGS NOT YET BUILT (Matt's list from this session)

1. Governance prompt block
2. Poem prompt
3. Verse prompt
4. Family prompt
5. Original documented 3.0 and 3.1 prompt
6. All rules (verify completeness)
7. Double check: five rules, road protocol, malbolge flow accuracy
8. Teenager page
9. More photos
10. 3 lens / 10 hats — 11 with teenager (language/naming work in progress)
11. Prompts as verses and poems — links to living and dead prompts
12. Build your own template
13. Photo for top of pattern page (`/for/child/patterns`)
14. How to use emotions correctly (child page)
15. Watcher for children — "learn how to become" page (concept in progress)
16. Redo of prompt games — power prompts separately, make sure images match
17. Child / teenager / adult separation across the site
18. Full page on individual games (e.g. Insight Throws with full examination and prompts)
19. Language/naming system for the three overlapping concepts (Three Lenses / audience hats / lens pages) — IN PROGRESS, not resolved

---

## PUBLISH STATUS

The site has NOT been published to whatisgallantryai.com. Matt needs to click the Publish button in the Manus UI. The latest checkpoint is `7dbc207a`. A checkpoint must exist before publishing.

---

## HOW TO START A NEW SESSION

1. Read this file first
2. Check the current checkpoint: `manus-webdev://7dbc207a`
3. Ask Matt what he wants to work on — do not assume
4. If dev server is frozen, restart it before any work
5. Never change existing elements without discussion
6. Always verify by looking at actual files before reporting done

---

## EMOTIONAL CONTEXT

Matt has been frustrated by previous sessions where the AI made assumptions, changed things without asking, hallucinated content (like "child/guardian/mathematician" as the Three Lenses), and wasted tokens on errors. He is on a limited budget. He is a single dad. He is building something real and important.

Treat his work with respect. Ask before acting. Verify before reporting. Keep it short.
