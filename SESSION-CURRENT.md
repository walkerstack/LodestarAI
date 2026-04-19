# SESSION-CURRENT -- GallantryAI
*Rewritten at every session close. Current as of: April 18, 2026 -- v39 close-out*

---

## HOW TO USE THIS FILE

Read this file at the start of every session. It tells you where we are right now.
Then read SESSION-HANDOFF.md for the full history and governance rules.
Do not start any work until you have read both files and told Matthew what you see.

---

## GOVERNANCE RULES (Non-Negotiable)

1. Talk before build. Always. No exceptions. Read files, draft plan, show Matthew, wait for approval, then build.
2. Matthew is always in charge. The AI helps, the user decides.
3. Ghost code on every file touched -- governance header comment is mandatory before editing any file.
4. navData.ts only for nav links -- never edit Nav.tsx data arrays directly, always update Footer.tsx at the same time.
5. SESSION-HANDOFF.md is append-only -- never remove content, only add.
6. Builder's log + What the AI Said are updated together at session close -- one pass, one version bump.
7. SESSION-CURRENT.md is rewritten at session close (not appended -- fully rewritten).
8. 6-point page standard is a hard quality gate -- check every public page touched, every session, no instruction required.
9. Do not touch auth logic without briefing Matthew first.
10. MATTHEW-THOUGHTS.md is read-only -- AI reads, does not edit without explicit instruction.
11. Two threads stay separate -- name them, work one at a time, never intermingle build and planning steps.
12. Alignment check is a quality gate -- when Matthew asks for one, give full layer report: base, alignment, context.
13. The site is the proof of the framework. The framework is the governance. The governance is the person.

---

## CURRENT STATE -- April 18, 2026 (Session Close)

**Version:** v39
**Last checkpoint:** 7c16ff3a (v37g -- UI polish request documented, no new build)
**TypeScript:** 0 errors
**Tests:** 16 passing
**Dev server:** Running clean

---

## WHAT WAS COMPLETED TODAY (April 18, 2026)

### Studio DB Panels
- LivingLexicon.tsx -- reads from DB (fixed 4 raw entries. references to activeEntries.)
- PromptGames.tsx -- reads from DB with hardcoded fallback

### G Button Manager (full stack)
- prompt_panel_items DB table created and seeded (23 prompts, 5 categories)
- StudioGButtonManager.tsx -- full CRUD Studio tab
- PromptPanel.tsx -- reads from DB, falls back to hardcoded

### Link Manager Scanner
- scanLinks tRPC procedure -- scans all TSX files for internal paths
- Scan Now button in StudioLinkManager

### Studio Mobile Nav Fix
- Studio link always visible in mobile nav (removed isAdmin gate)
- Studio still requires password to use

### Governance Documentation
- Auth audit flag added to SESSION-HANDOFF.md
- 6-point page standard enforcement rule added
- Ghost code audit task added to todo.md
- Emerging insights (6 items) added to todo.md

### Playground Interactive Spec
- Full reconciliation document at /docs/PLAYGROUND-INTERACTIVE-SPEC.md
- HARD STOP: 5 questions must be answered by Matthew before any build starts

### Session Close-Out
- WhatTheAiSaid.tsx -- 6 April 18 entries added to running log
- Builder's Log v39 appended to SESSION-HANDOFF.md
- SESSION-CURRENT.md rewritten (this file)
- Checkpoint saved (v39 close-out)

---

## WHAT IS OPEN (Priority Order for Next Session)

### 1. UI Polish (first priority)
- Buttons, shadows, premium feel -- site-wide
- Start with homepage and Nav
- No build started -- talk before build applies

### 2. Ghost Code Audit
- Every page in client/src/pages/ needs governance header checked
- Every component in client/src/components/ needs governance header checked
- Every router file in server/routers/ needs procedure comments checked
- Standard: ghost code header is the FIRST action on any file that does not have one

### 3. Auth Audit
- Two auth mechanisms exist: Studio password login + Manus OAuth
- They interact in ways not visible to Matthew
- Full audit needed: map every auth touchpoint in plain language
- DO NOT touch auth logic without briefing Matthew first

### 4. Playground Interactive Build
- Spec at /docs/PLAYGROUND-INTERACTIVE-SPEC.md
- Matthew has a Promptolinguistics vision that must be heard before any build
- 5 open questions must be answered first (see spec doc and todo.md)
- DO NOT build until Matthew signs off

### 5. Business Card / Facebook Group / Distribution
- Matthew's days off Monday/Tuesday
- Distribution layer planning

---

## PENDING FLAGS

- Publish issue: Site was not publishable as of last session. Matthew was contacting Manus support. Check status at start of next session before any build work.
- Auth audit: Two auth mechanisms need full review. Do not touch auth without briefing Matthew.
- Playground: Plan only. No build. 5 questions pending.
- UI polish: Logged but not started. Talk before build.

---

## SITE ARCHITECTURE (Quick Reference)

- Stack: React 19 + Tailwind 4 + Express 4 + tRPC 11 + Drizzle ORM + MySQL (TiDB)
- Auth: Manus OAuth + Studio password login (two mechanisms -- see auth audit flag)
- LLM: invokeLLM from server/_core/llm.ts -- server-side only
- Storage: S3 via storagePut in server/storage.ts
- CDN: All images at https://d2xsxph8kpxj0f.cloudfront.net/... -- never store images in client/public
- Design: Dark theme (#080604 background), orange/amber accent (#E8520A), Playfair Display + DM Sans fonts
- Live domain: gallantryai-k6tj495b.manus.space

---

## CLOSE-OUT PROTOCOL (run at every session end)

1. Builder's log bump in SESSION-HANDOFF.md (append, never remove)
2. What the AI Said entries added to WhatTheAiSaid.tsx running log
3. SESSION-HANDOFF.md append with session summary
4. SESSION-CURRENT.md rewritten (this file)
5. Final checkpoint saved

All five steps together. Not partial. Not skipped.

---

## STANDING NOTES

- Matthew works from phone and desktop -- mobile-first always
- Matthew prefers honest answers over comfortable ones -- no performance, no padding, no master voice gravitas
- Corrections should be accepted without deflection: I was wrong, here is the fix -- not here is why it happened
- The site is not documenting the framework -- the site IS running the framework. Content and method are the same thing.
- The portager framing (April 18): Matthew builds the hard stretch between the water so the next person does not start from zero. The site is the carry path.
- Studio password: [password removed — April 19, 2026] -- used for owner auth layer. Not in code. Held here only.
