- [x] Upgrade project to full-stack with web-db-user (database, server, user management)
- [x] Resolve Home.tsx conflict from upgrade (kept existing homepage, added useAuth import)
- [x] Push database schema (users table)
- [x] Restart dev server after upgrade
- [x] Generate dedicated image for story arc frame 6 (Together — buffalo + sloth) and swap into carousel
- [x] Generate new og:image for link previews (dark editorial, buffalo with wig + sloth in corners)
- [x] Fix React border shorthand/longhand conflict in Home.tsx scaffold section (6 console errors)
- [x] Fix Human Line and Safety page links causing full page reload instead of client-side navigation (was actually /five-rules 404, not reload)
- [x] Change all kids 'take me home' / 'send me home' / 'go home' buttons to 'Guide me'
- [x] Fix Five Rules link under Protocols/Foundation nav — 3 pages had wrong path /five-rules instead of /rules (LivingLexicon, RoadProtocol, SchoolBoard)
- [x] Build child-specific Five Rules page at /for/child/rules (sloth-guided, kid language, light theme)
- [x] Wire route in App.tsx and link from Child Lens and other kids pages
- [x] Add colored text treatment to all children's links on homepage (Safety, Human Line, Kids Learn buttons)
- [x] Foundation section: different font (Nunito), rounded-3xl cards
- [x] Kids and School Board links get color treatment on homepage (purple, teal, green)
- [x] Build kids page 'What Are Patterns?' — sloth-guided, warm white theme, wired into children's learning flow
- [x] Build "What the AI Said" page with 3 conversation exchanges from screenshots
- [x] Add Watcher description to What the AI Said page
- [x] Wire What the AI Said into routes and nav
- [x] Include AI-written report to its creators on the What the AI Said page
- [x] Backup full Home.tsx to HomeFullBackup.tsx (complete, untouched)
- [x] Trim Home.tsx to hero-only (top of screen: hero image, tagline, CTAs, nav)
- [x] Strip bg-[#1A1A2E] dark strip from KidsMidLink wrappers across all pages — floating circle only
- [x] Keep bg prop matching each page's actual background for glow blending
- [x] Move KidsMidLink to actual midpoint of content on every page that has one
- [x] Add build log entry: KidsMidLink fix and Three Lenses framework reveal on homepage
- [x] v21: Create /builders-kids page (The Builder as a dad, Hudson 4, Olive 2, why your safety matters)
- [x] v21: Create /anthropomorphism page (full page with child intro, teenager section, everyday section, Three Lenses, serious adult section)
- [x] v21: Update ChildLens — add entry cards linking to /builders-kids and /anthropomorphism
- [x] v21: Update TeenagerLens — add Builder's Story section with entry cards for both new pages
- [x] v21: Update EverydayLens — add anthropomorphism tidbit (Have you ever said sorry to your AI?)
- [x] v21: Add routes for /builders-kids and /anthropomorphism to App.tsx
- [x] v21: Add buildersKids and anthropomorphism entries to learningFlowMap
- [x] v21: Add v21 builder's log entry to HomePage (Watcher voice, Child voice, Professional voice)
- [x] Fix ChildLens — add visible entry cards for /anthropomorphism and /builders-kids (currently missing or not rendering)
- [x] Verify TeenagerLens — confirm both cards are visible, fix if missing
- [x] Add /builders-kids and /anthropomorphism to nav Foundation/Explore menus and footer index
- [x] Add both pages to child learningFlowMap wider section
- [x] Verify /anthropomorphism child section reads at true child level (sloth explains, simple words)
- [x] Verify /anthropomorphism teenager section reads at true teenager level (cognitive dissonance, real talk)

- [x] v22: Guardian/Teacher Lens — add Drift section: learn it (concept at guardian/teacher register) + teach it (how to bring drift to a child or teenager)
- [x] v22: Guardian/Teacher Lens — add Anthropomorphism section: learn it + teach it
- [x] v22: Audit all professional lenses — confirm Drift tidbit/card present on each
- [x] v22: Audit all professional lenses — confirm Anthropomorphism entry point present on each
- [x] v22: Audit all professional lenses — confirm working LearningFlow at bottom of each
- [x] v22: Update builder's log with v22 entry
- [x] v22.1: Add anthropomorphism to teenager learningFlowMap wider section
- [x] v22.1: Add teenager-voice Anthropomorphism section to TeenagerLens
- [x] v23: Taxonomy page — add AI companies section (Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, Mistral)
- [x] v23: Homepage — add Taxonomy entry with link and short description
- [x] v23: Research page — add 171 emotion vectors article (link + why it matters, three voices)
- [x] v23: Research page — add Mythos/Project Glasswing article (link + why it matters, three voices)
- [x] v23.1: Update builder's log to v23 in Home.tsx
- [x] v23.1: Add Field Events category to ResearchHub, re-tag 171 vectors and Mythos entries
- [x] v24: Homepage — add Field Events section with 171 vectors and Mythos article links + link to Research Hub
- [x] v24: Taxonomy page — Mythos already covered under Anthropic entry, no duplicate needed
- [x] v24: Anthropomorphism page — add 171 vectors finding block (What the Research Now Says section)
- [x] v24.1: Update builder's log to v24 in Home.tsx
- [x] v24.1: Add Mythos/Glasswing Field Event block to Drift page
- [x] v24.1: Add Field Events nav entry to Nav and Footer (deep-links to ?category=field filter)
- [x] v24.3: Verify all Research Hub source URLs are live and accurate — all 40 URLs confirmed
- [x] v24.3: Fact-check Mythos/Glasswing claims — 27yr OpenBSD confirmed, 17yr FreeBSD confirmed, 16yr FFmpeg confirmed. Fixed everyday register to say 'some for over 27 years' (was incorrectly implying all were 27yr)
- [x] v25: Add professional lens discovery section to homepage — 8 cards (Psychology, Cognitive Science, Researcher, Prompt Engineer, Linguist, Mathematician, Guardian/Teacher, Everyday Person) between Field Events and Scaffold sections

## LearningFlow + KidsMidLink Parity — All Pages (tracked from v29 session)
- [x] Add LearningFlow with contextual links to: Articles, Backstage, BarneyPoem, Builder, BuilderOrigin, CitizenResearcher, FieldPapers, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, ThreeLenses, VariableScale, WhelmScale, WatcherLens — VERIFIED IN CODE Apr 18 (57 pages confirmed, ThreeLenses fixed this session)
- [x] AlcmPage: LearningFlow added (v30)
- [x] Add KidsMidLink to: KidsLearn, WhatTheAiSaid — VERIFIED Apr 18: KidsLearn does not need it (kids page with multiple home paths). WhatTheAiSaid confirmed not needed by Matthew.
- [ ] Rule: every new page gets KidsMidLink + LearningFlow before it ships. No exceptions.
- [x] /three-lenses URL — FIXED Apr 18: both /three-lenses and /three-voices routes active, flowMap hrefs updated to /three-voices, LearningFlow added to ThreeLenses.tsx

## Session April 18, 2026 — New Items

- [ ] Page standard: every page needs hero image, kids redirect top link, KidsMidLink, Growing and Learning framework, teenager nav entry, professional nav entry

## COMPREHENSIVE REDO — Prompt Games + Power Prompts (DO NOT TOUCH until dedicated session)

- [ ] COMPREHENSIVE REDO: Prompt Games page + Power Prompts section on Promptolinguistics page
  ISSUE: Both were built as placeholders during a session where Matthew's thinking was not fully formed yet.
  The content exists but lacks alignment with the actual GallantryAI framework.
  Specific problems:
  (1) Power Prompts on Promptolinguistics — "The Corner" category (Nemesis baby, Claim none, Open closed, Paste pastes) is listed as a tool category but the deeper concept of WHY corner words work (semantic collision, irresolvable tension, forcing the model out of pattern-matching) is not explained. The tools are there but the doctrine behind them is missing.
  (2) Prompt Games page — content was added in the moment, not from a developed framework. Needs full rethink: what is a prompt game? what does it teach? how does it connect to ALCM axes and verb escalation? what is the difference between a game and a drill?
  (3) Both pages need three-voice architecture applied properly — not as an afterthought.
  ACTION WHEN READY: Dedicated session. Matthew leads with the framework. I build from that. No assumptions.
  DO NOT start this until Matthew explicitly opens the session with direction on what prompt games and power prompts actually mean to him.
  INTERACTIVE IDEA (from Matthew, April 17 session): Corner Words section could be the first truly interactive experience on the site — user taps/types a word pair and experiences the collision happening, not just reads about it. This is unique. No other page does this. Design it properly in the redo session. Do not build a quick version — build the right version.
- [x] ALCM page: add teenager entry point, professional entry point, conceptual hero image
- [x] Promptolinguistics page: add teenager entry point, professional entry point
- [x] Promptolinguistics page: add Corner Words section (3 voices), Third Entity / Teamwork Loop section (3 voices) — v31
- [ ] Promptolinguistics page: add Living Prompt Framework risks section (deferred — needs Matthew's direction)
- [ ] New page: Teamwork Loop / Third Entity / AEDE Pattern (archive content, not yet on site)
- [ ] New page: Professionals landing page (LinkedIn card target URL)
- [ ] Floating Lexicon panel: quarter-screen overlay triggered by term clicks, no page switch
- [ ] Kinematics of a Word: add to Lexicon (not standalone page)
- [ ] Funnel from homepage to Promptolinguistics (hub page)
- [ ] Funnel from TeenagerLens to Promptolinguistics
- [ ] Funnel from EverydayLens to Promptolinguistics
- [ ] FR-2026-09 field paper: "weight finds structure, structure attracts weight, the math doesn't need permission"
- [ ] Builder's log update: reflect Three Voices rename, Six Panels comic, circle/square geometry, tensile spots, session discoveries
- [ ] Homepage flow rethink: professionals spotlight near ALCM section (not ready yet — do not touch)
- [ ] Archive correlation: map all archive documents to site pages, find gaps
- [ ] File naming cleanup: rename files to be human-readable
- [ ] Image generation: 7 prompts written (in SESSION-HANDOFF.md) — receive images from user then upload to CDN
- [ ] Session analysis pattern: run at start of every new session as alignment tool
- [ ] PARKED — Accessibility nav placement: Matthew to rethink where Flower Presets surface in nav. Currently buried as "Simpler view →" in grey text. Do not touch until Matthew decides.
- [x] Mobile nav premium upgrade: hat tiles with generated images + touch press animation + accordion sections below — DONE

## April 17, 2026 — Thread 2 Session Items

- [x] Builder poems section — 11 poems from Feb 28 master document, full-bleed section on Builder page, painterly background image, exact words preserved
- [x] Builder's Scene on homepage — sloth-lantern-buffalo image, two-column, links to /builder, placed after story arc carousel
- [x] Children's section fade-out — light→dark fade mirrors top fade, section breathes in and out
- [x] 9-role homepage entry block — replaces 5-button hat flow, all roles with CDN images, expand-on-click lens links, premium tile design
- [x] Desktop nav expanded to 9 roles — 3×3 grid, 480px panel, images, 3D press preserved
- [x] Mobile nav updated to 9 roles — shared hatTiles array, images, touch press
- [x] 3 new CDN images generated — Parent, Nurse, Student (painterly, consistent style)
- [x] Nav duplicate key error fixed — key={hat.label} instead of key={hat.path}, Parent and Teacher share path but now have unique keys
- [x] v39 builder log written — all three voices, all builds documented
- [x] SESSION-HANDOFF.md appended — Thread 2 session summary, alignment observations, open items
- [x] SESSION-CURRENT.md rewritten — v39 state, active threads, pending flags, standing notes
- [ ] Professional landing page — /for/professional showing all 6 professional lenses as styled tiles (Prompt Engineer, Researcher, Linguist, Mathematician, Cognitive Science, Guardian/Teacher). Professional tile in nav currently links to /for/prompt-engineer which is wrong.
- [ ] WHO ARE YOU pathfinding block (Home.tsx line ~871) — old expandable 8-role card block still exists below new entry tile block. Matthew to decide: keep, move, or remove.
- [ ] Hats → Voice → Lens: Three Voices are reading modes on every page. Hats are entry modes. Lenses are destination pages. Ensure no page conflates these three things.
- [ ] Database + Admin dashboard + panels wired to DB — most structurally important item remaining, not started
- [ ] Governance audit — read UserGovernance.tsx and GallantryAiPage.tsx, decide where Ozzy + Wall + Monster land (remember 3.0 and 3.1)
- [ ] Field Papers — 4 items from master document to add
- [ ] Citizen Researcher — 4 items from master document to add
- [ ] Five Rules — Rule 11 (The Wall), Hard vs Soft Constraints

## April 18, 2026 — Nav Fix (URGENT)

- [ ] Professional tile in nav: fix to show all 6 professional lenses — currently goes directly to /for/prompt-engineer which is WRONG. Was promised last session, not delivered.
- [ ] Desktop nav visual quality: user reports it looks the same as before all the nav work. Assess and make it feel genuinely premium and different.

## April 18, 2026 — Studio (Owner CMS Dashboard)

- [x] Studio: Build database schema — content_blocks table (page_slug, block_type, position, content JSON), media_library table (url, type, filename), page_links table (page_slug, label, destination, position)
- [x] Studio: Build tRPC procedures — getPageList, getPageBlocks, updateBlock, createBlock, deleteBlock, getMedia, uploadMedia, getPageLinks, updateLink, mirrorBlock
- [x] Studio: Build /studio route — owner-only (adminProcedure), page list view
- [x] Studio: Build block editor — click page → see blocks listed → click block → edit text or swap image → save
- [x] Studio: Build block creator — + Add Block → choose Text / Card / Doc → fill form → save to page
- [x] Studio: Build upload library — drag/drop photos and docs → saves to S3 → appears in library → assign to page
- [x] Studio: Build link rerouter — see all links on a page → click to edit destination → save
- [x] Studio: Build block mirror — find block → Mirror → pick destination page → appears there
- [x] Studio: Replace /backstage page with Studio redirect (password gallantry2026 retired, Hudson2021! used for owner auth)
- [x] Studio: Add Studio link to nav — visible only when owner is logged in
- [x] Studio: Write vitest tests for all Studio procedures — 15 tests passing
- [x] Studio: Save checkpoint after each confirmed part
- [x] Studio: Block drag-to-reorder — grab any block, drag up or down, drop to reposition on page
- [x] Studio: Mobile-first design — all Studio screens must work on phone (large tap targets, readable text, easy forms). Desktop gets more space but nothing breaks.

## Build 4 — Full Site Content Migration (April 18, 2026)

- [x] Build 4: Add StudioBlocks component — renders database blocks on live pages (additive, fallback to code if no blocks)
- [x] Build 4: Write migration script for 42 data array pages — reads JS objects, seeds content_blocks table
- [x] Build 4: Run migration script — verify all 42 pages have blocks in database
- [x] Build 4: Define and seed blocks for 21 inline JSX pages
- [x] Build 4: Update Studio page editor to show actual content text (not just block type labels)
- [ ] Build 4: Verify end-to-end — edit a block in Studio, confirm change appears on live page
- [ ] Build 4: Write vitest tests for migration integrity
- [ ] Build 4: Save checkpoint after verification
- [ ] Build 4: Run DB count query to verify all 42+ pages have blocks (full coverage proof)
- [ ] Build 4: Studio block list — show content preview text in block list rows (not just 'empty' label)
- [ ] Media Library: Expand seed to include manuscdn document URLs (field papers, gallery docs)

## Build 4 — Remaining (April 18, 2026)
- [x] Media Library: Seed all existing site images and doc URLs into media_library table
- [x] Card Pages: Convert Field Papers cards to editable database blocks
- [x] Card Pages: Convert Gallery cards to editable database blocks
- [x] Card Pages: Convert Frameworks cards to editable database blocks
- [ ] Card Pages: Convert other card-display pages to editable database blocks
- [ ] Page Template Builder: UI in Studio to pick a template and create a new page
- [ ] Page Template Builder: Templates — blank, article, lens, card grid
- [ ] Page Template Builder: New page appears in site nav and is immediately accessible

## Studio Access Fix (April 18, 2026)
- [x] Studio: Add password login screen — works on mobile without Manus OAuth (password: Hudson2021!)
- [ ] Studio: Verify password login works on live site after publish (test on mobile Chrome)
- [ ] Studio: Add logout button inside Studio so owner can sign out from mobile

## Studio Block Display Fix (April 18, 2026)
- [ ] Studio: Show ALL block types (text, card, doc, image) in page editor — not just text blocks
- [ ] Studio: Block list rows show meaningful preview text for each block type (title for cards, filename for images, excerpt for text)
- [ ] Studio: Define and document the full block schema for all 45+ pages

## Studio Block Display Fix — Active (April 18, 2026 late)
- [x] Fix block list in Studio page editor to display card, doc, and image blocks (not just text) — more pages will turn green once all block types are visible

## Link Manager Fix (April 18, 2026)
- [ ] Link Manager: Build server-side page link scanner — fetch rendered page HTML, extract all anchor tags with label and destination
- [ ] Link Manager: Update UI to show scanned links in a list with colour-coded destination categories
- [ ] Link Manager: Add visual indicator showing which internal pages each link points to
- [ ] Link Manager: Distinguish editable (DB-stored) links from read-only (hardcoded) links

## Performance Fix (April 18, 2026)
- [x] Lazy-load all 55+ page routes in App.tsx — main JS bundle reduced from 3.3MB to 521KB, resolves deployment timeout
- [x] Add vite.config.ts manualChunks for vendor/trpc/ui splits

## Studio New Tabs (April 18, 2026)
- [x] Studio: Site Map tab — interactive scaffold diagram (Floor → Ceiling + Research layer) with live status dots per page, click node to open block editor
- [x] Studio: Status Board tab — workplace board view, all pages as cards with green/yellow/grey status dots based on block count and link health
- [x] Studio: Fix duplicate getLoginUrl TypeScript error in Studio.tsx (was already resolved in prior session)

## Full Content Ownership Build (April 18, 2026 — GO)
- [ ] Step 1: Fix StudioBlockForm — card block gets color picker, background image URL, full link fields
- [ ] Step 1: Fix StudioBlockForm — image block gets upload from Media Library or paste URL
- [ ] Step 1: Fix StudioBlockForm — text block gets color picker for heading and body
- [ ] Step 1: Fix StudioBlockForm — doc block gets icon picker and description field
- [ ] Step 2: Migrate all hardcoded pages to database — every section becomes an editable block (structure + content)
- [ ] Step 2: Nav reads from database — new pages auto-appear in correct nav section
- [ ] Step 3: Build Page Builder tab — full page preview with click-to-edit overlays
- [ ] Step 3: Page Builder — create new page from template (lens, rules, scaffold, etc.)
- [ ] Step 3: Page Builder — assign new page to nav section on creation

## Full Content Migration + Page Builder (April 18, 2026 — ACTIVE)
- [x] Phase 2: Run full content migration script — 307 blocks across 56 pages (text, card, image, doc)
- [x] Phase 3: Build Page Builder tab — full page preview with click-to-edit block overlays
- [x] Phase 3: Page Builder — New Page from template (lens, rules, scaffold, card-grid)
- [x] Phase 3: Page Builder — assign new page to nav section on creation
- [x] Phase 4: Make nav database-driven — new pages auto-appear in nav
- [x] Phase 5: Update SESSION-HANDOFF.md with full build state

## LearningFlow Fix + Matrix Tab (April 18, 2026)
- [x] Add LearningFlow to 16 missing pages: Articles, Builder, BuilderOrigin, CitizenResearcher, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, VariableScale, WhelmScale, WatcherLens
- [x] Add Learning & Growing Matrix tab to Studio — full control of deeper/wider/simpler links for every page

## Phase 3 + 4 — Page Builder + Link Manager Seed (April 18, 2026 — ACTIVE)
- [x] Phase 3: Build Page Builder tab in Studio — My Pages list + New Page from template (blank, article, lens, card-grid)
- [x] Phase 3: Page Builder — New Page from template, assign to nav section on creation
- [x] Phase 4: Seed Link Manager — 186 links across 43 pages seeded into page_links table
- [x] Phase 5: Nav database-driven — new pages auto-appear in correct nav section

## Learning Matrix Multi-Card Fix + Page Builder Copy (April 18, 2026)
- [x] Fix Learning Matrix — rebuild DB schema to support multiple cards per section (deeperLinks, widerLinks, simplerLinks as JSON arrays)
- [x] Fix Learning Matrix — re-seed all 57 pages with full multi-card data from original flowMap
- [x] Fix Learning Matrix — rebuild Studio tab to show/add/remove multiple cards per section
- [x] Fix Learning Matrix — update tRPC procedures and studioDb helpers for JSON array columns
- [x] Add copy-existing-page-as-template to Page Builder — searchable list of all 57 pages, copies all blocks to new page

### April 18, 2026 — Studio Content Management (Three Panels)
- [x] Studio: Lexicon Manager tab — DB table for lexicon terms, tRPC read/write procedures, Studio tab UI (add/edit/remove), LivingLexicon public page reads from DB with hardcoded fallback
- [x] Studio: Prompt Manager tab — DB table for prompt games, tRPC read/write procedures, Studio tab UI (add/edit/remove), PromptGames public page reads from DB with hardcoded fallback
- [x] Studio: Link Manager scanner — Scan Now button scans all client TSX files for internal paths, returns deduplicated list with filter
- [x] Studio: G Button Manager — prompt_panel_items DB table, 23 prompts seeded, StudioGButtonManager CRUD tab, PromptPanel reads from DB

## Auth Audit — Admin vs Studio (Matthew flagged April 18, 2026)

- [ ] AUDIT: Map every place in the codebase where isAdmin, role === "admin", studioLogin, STUDIO_PASSWORD, and session cookies are used — produce a plain-language summary for Matthew of exactly what each one does and when it fires
- [ ] DECISION: Decide with Matthew whether Studio access should use its own password-only gate (no Manus OAuth required) OR be tied to the admin role — currently both exist and they interact in ways that are not visible to the user
- [ ] FIX: After decision is made, clean up the auth paths so there is one clear way in to Studio and one clear way the button shows — no hidden state changes after deploy
- [ ] DOCUMENT: Write a plain-language "how Studio access works" section in SESSION-HANDOFF.md so every future session knows the rules without having to audit the code again

## Emerging Insights — Design & Copy Work (Matthew, April 18, 2026 evening)

- [ ] HOMEPAGE COPY: Write one recognition sentence for the homepage — the line that lands for the person who just had the "wait, something is off" moment with an AI. Not a tagline. A mirror. They need to see themselves in the first 5 seconds.
- [ ] HOMEPAGE GEOMETRY: The site currently shows more ceiling than floor. Review the homepage through the eyes of someone who has never thought about how they use AI and is slightly afraid of it. Identify the first foot placement — the single obvious first step before the Five Rules.
- [ ] COPY AUDIT: The living prompt thesis — "you have to be a good person" — may not be stated in its simplest form anywhere on the site yet. Find where it belongs and put it there plainly.
- [ ] CONCEPT NOTE: The portager framing — Matthew builds the hard stretch between the water so the next person doesn't start from zero. Consider whether this belongs explicitly on the Builder page or as a framing device somewhere on the site.
- [ ] CONCEPT NOTE: The AI is the door. GallantryAI is what happens after the AI opens the door by accident. Consider whether this reframes the discovery/marketing problem — not finding people, but being findable when the moment arrives. May affect SEO strategy and homepage copy.
- [ ] CONCEPT NOTE: Co-development attribution — the site and its documents are co-developed, not AI-assisted. Consider whether this should be stated explicitly somewhere and what the implications are for how the work is presented.

## Ghost Code Audit (Matthew flagged April 18, 2026)

- [ ] AUDIT: Go through every public-facing page file in client/src/pages/ and verify each one has a ghost code header comment — the block that names the file, its purpose, what Matthew wanted it to do, and any rules that apply to it
- [ ] AUDIT: Go through every component in client/src/components/ and verify ghost code headers exist and are accurate
- [ ] AUDIT: Go through server/routers/ files and verify each procedure block has a comment explaining what it does and why
- [ ] STANDARD: Any file missing a ghost code header gets one added before any other work is done on that file — this becomes the first action, not an afterthought
- [ ] CONSIDER: Ghost code audit may be a good first session task — read the files, understand what's there, brief Matthew before building anything new

## Playground Interactive Build (Perplexity Spec — Awaiting Matthew Sign-off)
**Full spec: /docs/PLAYGROUND-INTERACTIVE-SPEC.md**
**Status: PLAN ONLY. Do not build until Matthew answers the 5 open questions in the spec doc.**

### Open Questions (must be answered before build)
- [ ] Watcher sidebar: real-time AI call or rule-based heuristic?
- [ ] Three Voices toggle: build as global component or per-module?
- [ ] ALCM axes: pull from /alcm page content or define fresh?
- [ ] Existing 6 feature cards on Playground: incorporate into modules or remove?
- [ ] Playground tab layout: horizontal tabs or vertical accordion?

### Phase 1 — Playground Page (4 Modules)
- [ ] Module 1: Road Protocol Simulator — Flower Preset selector, Token Zero injection, live chat via tRPC/invokeLLM, Watcher sidebar, post-session 5pt dashboard (localStorage)
- [ ] Module 2: Drift Detector — paste transcript, analyze for 4 drift types, return Green/Yellow/Red score, correction suggestions from /drift page content, Watcher voice
- [ ] Module 3: ALCM Dial Tester — 8 sliders mapped to ALCM axes, word bank from /alcm page, live API call, before/after diff, Three Voices toggle on preview
- [ ] Module 4: Five Rules Session — 5 rule cards with AGREE toggle (localStorage), governed prompt generator, chat tester with injected Rules, compliance score, shareable summary card
- [ ] Replace existing 6 feature cards with live modules (or incorporate where possible)
- [ ] Preserve: KidsRedirect, KidsMidLink, LearningFlow, Nav, Footer, ghost code header
- [ ] Pass 6-point page standard before checkpoint

### Phase 2 — G-Button Upgrade
- [ ] Add "Practice Now" as third option in G-button panel
- [ ] Opens mini Road Protocol chat inline (not iframe) with Token Zero auto-injected
- [ ] Collapses clean, matches existing G-button design

### Phase 3 — Rule Cards Interactive
- [ ] Click-to-activate glow state on rule cards (/rules page and children's pages)
- [ ] "Test this rule" opens G-button chat with rule injected as context
- [ ] localStorage persistence for AGREE state

### Phase 4 — Post-Session Dashboard
- [ ] Global footer link to /session-dashboard (new route)
- [ ] 5-question reflection form (How do I feel? Did I stay in charge? Did I keep secrets? Was AI honest? Grown-up okay?)
- [ ] Save/Share as PDF via jsPDF (no backend)
- [ ] Mobile responsive

## UI Polish — Buttons, Shadows, Premium Feel (Priority: High, Next Session)
**Matthew's direction: buttons need to pop more. More shadow. More premium and professional UI/UX look. Site-wide.**

- [ ] Audit all primary CTA buttons site-wide — increase shadow depth, add subtle glow on hover, ensure they feel tactile and premium
- [ ] Audit secondary/outline buttons — ensure they have enough contrast and weight to invite a tap
- [ ] Review card shadows across all pages — increase depth, add layered shadow for premium feel
- [ ] Check interactive elements (toggles, accordions, nav dropdowns) — ensure they feel responsive and polished
- [ ] Start with homepage and Nav, then move page by page
- [ ] Do NOT change color palette or typography — polish only, not redesign
- [ ] Pass 6-point page standard on every page touched

## Session Close-Out — April 18, 2026 (v39)
- [x] WhatTheAiSaid.tsx -- 6 April 18 entries added to running log (Waveform Test, Living Prompt, Alignment Signal, Portager, Master Voice Catch, Slow/Quickly)
- [x] Builder's Log v39 appended to SESSION-HANDOFF.md
- [x] SESSION-CURRENT.md rewritten with v39 state
- [ ] Final checkpoint saved (pending)

## Session Close-Out -- April 18, 2026 (v39)
- [x] WhatTheAiSaid.tsx -- 6 April 18 entries added to running log (Waveform Test, Living Prompt, Alignment Signal, Portager, Master Voice Catch, Slow/Quickly)
- [x] Builder's Log v39 appended to SESSION-HANDOFF.md
- [x] SESSION-CURRENT.md rewritten with v39 state
- [ ] Final checkpoint saved (pending)

## April 19, 2026 — Morning Session Items

- [ ] SECURITY: Studio login — replace password gate with Manus OAuth owner-ID check. OWNER_OPEN_ID confirmed as cfxnspiLTDKbgEzckoxh8H (matt gallantry). Plan: OAuth login → server checks openId === OWNER_OPEN_ID → grant Studio session. Password removed entirely. Login screen stays public but has no password field to brute-force.
- [ ] SECURITY: Remove plaintext password (Hudson2021!) from SESSION-HANDOFF.md lines 828 and 872.
- [ ] STUDIO UX: Block edit modal — show live card preview. When editing a block, the modal shows the card styled exactly as it appears on the public page. As you change photo/title/description/colours, the preview updates in real time. What you see is what gets saved.
- [ ] FLOATING LENS BUTTON: Persistent floating button on pages that have a full view/lens switch (Rules, For/Everyday, For/Child, For/Teen, For/Guardian-Teacher, For/Watcher, and professional lens pages). Button lets visitor flip between views from anywhere on the page without scrolling to top. DO NOT add to Promptolinguistics or Lexicon — those have three-voice-per-item inline display, leave them exactly as they are.
- [ ] FOOTER: Research Hub link is broken — find correct destination and fix.
- [ ] FOOTER: Field Events has colour styling but no link and no defined destination — discuss with Matthew before touching.
- [ ] HIDDEN STUDIO TRIGGER: Replace nav link to Studio with a hidden gesture on the Builder page (long-press buffalo image, triple-tap specific element, etc.) so Studio is not discoverable via nav.
