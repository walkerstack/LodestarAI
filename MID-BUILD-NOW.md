# MID-BUILD HANDOVER — Nav + Home "Who Are You?" Fix
**Date:** April 19, 2026 — late night session
**Status:** IN PROGRESS — do not skip this file

---

## What Is Being Built Right Now

Fixing two things simultaneously:

### 1. Nav "Who Are You?" Dropdown
File: `client/src/components/Nav.tsx`
- REMOVE: Parent, Teacher, Nurse, Student, Researcher, Prompt Engineer, Everyday Person, Kid as separate items
- REPLACE WITH these 6 items:
  - Everyday → /for/everyday
  - Child → /for/child
  - Teen → /for/teen
  - Guardian / Teacher → /for/guardian-teacher
  - Watcher → /for/watcher
  - Professional → expands to show sub-list of all professional lenses (NOT a direct link)
    - Prompt Engineer → /for/prompt-engineer
    - Researcher → /for/researcher
    - Linguist → /for/linguist
    - Cognitive Science → /for/cognitive-science
    - Mathematician → /for/mathematician
    - Psychology → /for/psychology

### 2. Home Page "Who Are You?" Section
File: `client/src/pages/Home.tsx`
- There are TWO blocks currently doing this job. The UPPER one gets REPLACED. The LOWER one gets DELETED entirely.
- The new single block contains:
  - Section description (written in Matthew's voice — see below)
  - 5 main buttons with 3D shadow styling: Everyday, Teen, Child, Guardian/Teacher, Watcher
  - Professional lenses section below with its own heading and list of lens links

### Description Text (Matthew's voice — he can edit):
"Every person comes to AI differently. Where you start changes everything. Pick the lens that fits where you are right now — not where you think you should be. There is no wrong door."

### Button Style:
- 3D look — depth shadow, slight lift on hover
- Dark background, orange accent
- NOT complicated — clean, premium feel

---

## Files Touched So Far This Build
- `client/src/components/Nav.tsx` — NOT YET
- `client/src/pages/Home.tsx` — NOT YET

## What Is Already Done (Before This Build)
- Studio edit form → full-screen modal (checkpoint ec20bd95)
- Studio login OWNER_OPEN_ID fix (checkpoint 2be5258b)
- WhatTheAiSaid April 18 entries added
- Builder's Log v39 appended

## Next Checkpoint Target
After both nav and home fixes are complete and tested.

---

## Standing Rules (Always)
- No changes to any page except Nav.tsx and Home.tsx for this build
- Do not touch the database
- Do not remove any routes or lens pages
- The Watcher lens exists at /for/watcher
- Guardian/Teacher is ONE combined entry — not two separate
- Nurse does NOT exist as a standalone nav item
- Student does NOT exist as a standalone nav item
