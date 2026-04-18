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
- [ ] Add LearningFlow with contextual links to: Articles, Backstage, BarneyPoem, Builder, BuilderOrigin, CitizenResearcher, FieldPapers, Gallery, HumanLine, KidsLearn, Malbolge, MathPrompting, Playground, SafetyPage, Scaffold, SchoolBoard, ThreeLenses, VariableScale, WhelmScale, WatcherLens
- [x] AlcmPage: LearningFlow added (v30)
- [ ] Add KidsMidLink to: KidsLearn, WhatTheAiSaid
- [ ] Rule: every new page gets KidsMidLink + LearningFlow before it ships. No exceptions.
- [ ] /three-lenses URL — decide: rename route to /three-voices, add redirect, or leave URL as-is (display name already updated to Three Voices)

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
