# GallantryAI — Session Notes

---

## Session: April 15, 2026 (Evening)

**Started from:** v25 checkpoint (manus-webdev://6d933f9c)
**Ended at:** v26 checkpoint (manus-webdev://5f3835b5)
**Published:** Yes — v26 is live on whatisgallantryai.com

### What was confirmed already done (from previous session)
- Promptolinguistics section added to homepage (between Watcher quote and Hero headline)
- "What GallantryAI Is" section added to homepage (Builder's first-person voice, origin story, three values)
- Drift already in teenager learningFlowMap wider section
- Builder's Kids already in child learningFlowMap wider section
- Psychology Lens link already on Anthropomorphism page

### What was done this session
- Confirmed all of the above by reading the files directly
- Updated builder's log from v25 to v26 with three-voice entries documenting the two new homepage sections
- TypeScript check: zero errors
- Checkpoint saved: v26
- Published to whatisgallantryai.com

### Playground decision
- Builder has an OpenAI key
- Full playground vision discussed (Five Rules → Promptolinguistics → SET → AI Build progression → Word insight)
- Decision: back up, start small
- **Immediate next build: Five Rules experience on /playground only**
- Everything else parked — see PLAYGROUND.md for full spec and risk register

### Open question for next session
Before writing any Playground code, ask the Builder:
**"Walk me through the Five Rules experience on the Playground like you're the user arriving for the first time."**
Do not build until this is answered.

### Analytics note
Site went live Sunday April 13. As of April 15: 135+ unique visitors, 1,370+ page views, 9m 3s average session duration, 44.3% bounce rate. Someone was actively on the site during this session.

---

## Session: April 15, 2026 (Late night — research only, no code)

**Started from:** v26 checkpoint (manus-webdev://37e15cab)
**Ended at:** v26 checkpoint (no new checkpoint — research only)
**Published:** No change

### What was done
- Read FR-2026-08 "The Inward Turn" — full 9-page report extracted via pdftotext
- Read GPT validation report (pasted_content.txt) — confirmed the Inward Turn is a real documented phenomenon
- Researched AI hallucinations: OpenAI Sept 2025 paper, Stanford HAI/RegLab May 2024, Cornell/Northwestern 2024, Frontiers in AI 2025, arXiv Sept 2025
- Wrote complete hallucinations page content in three voices — saved to HALLUCINATIONS_CONTENT.md
- Wrote ChildLens gentle hallucinations intro — saved to HALLUCINATIONS_CONTENT.md
- Wrote buffalo+wig+sloth image generation prompt — saved to HALLUCINATIONS_CONTENT.md
- Wrote homepage FR-2026-08 card content — saved to HALLUCINATIONS_CONTENT.md
- Wrote TeenagerLens hallucinations tidbit — saved to HALLUCINATIONS_CONTENT.md
- Updated FR-2026-08-NOTES.md with full extracted report content

### What is ready to build next session
See HALLUCINATIONS_CONTENT.md for all content. Build order:
1. Generate buffalo+wig+sloth image
2. Upload image, get CDN URL
3. Add FR-2026-08 card to homepage
4. Add FR-2026-08 to Field Papers / Research Hub
5. Build /hallucinations page
6. Add hallucinations section to ChildLens
7. Add hallucinations tidbit to TeenagerLens
8. TypeScript check, builder's log v27, checkpoint, publish

### Key decisions confirmed tonight
- No link to /hallucinations from ChildLens — the story lives on the child page only
- Kids redirect on /hallucinations is the same site-wide redirect already built
- FR-2026-08 goes on the homepage, not buried in Research Hub
- FR-2026-08 and GPT validation are paired — they belong together
- The Inward Turn is the OPPOSITE of hallucination — note this explicitly on the hallucinations page

---

## Session: April 14–15, 2026 (Previous)

**Ended at:** v25 checkpoint (manus-webdev://6d933f9c)

### What was built
- v25: Eight professional lens cards on homepage ("If You Work in One of These Fields")
- v24: Field Events on homepage, 171 vectors on Anthropomorphism page, Drift Field Event, Field Events in Nav/Footer
- v23: AI Companies Taxonomy, Research Hub Field Events category
- v22: Anthropomorphism page, Builder's Kids page, all professional lenses updated
- v21: Builder's Kids and Anthropomorphism pages created, routes added
- v20: Drift tidbits on all professional lenses, running log on What the AI Said

### Promptolinguistics + What GallantryAI Is sections
These were written in the previous session (v25 era) but the builder's log was not updated. Fixed in the April 15 evening session — logged as v26.
