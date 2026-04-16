# GallantryAI Playground — Spec Document

**Last updated:** April 15, 2026
**Current build status:** Placeholder only. No live AI yet.
**Route:** `/playground`
**File:** `client/src/pages/Playground.tsx`

---

## What This Page Is

The Playground is a staged learning progression. It is not a chat box. It is not a demo. It is a tool for learning how to watch yourself think with AI.

The page is built to grow. Each stage is added when it is ready. The first stage must land before the next is built.

---

## Build Order (do not skip ahead)

### Stage 1 — The Five Rules (BUILD THIS FIRST)
The user arrives and the Five Rules are presented one at a time. Not a wall of text. They move through them deliberately. Something confirms they have seen them. Then the door opens.

This is the gate. The gate is the practice.

**Status:** NOT YET BUILT. This is the immediate next build.

**How it should feel:** The Builder was too tired to describe this in the April 15 session. Come back to this question first. Ask: "Walk me through it like you're the user arriving for the first time."

**Risk noted:** If the Five Rules experience is strong enough, people may want it on the homepage instead of /playground. Do not move it. Note the tension and address it deliberately in a future session.

---

### Stage 2 — Promptolinguistics Sandbox (FUTURE)
User types a prompt. Gets back an analysis of the force profile — what words are doing what work, drift risk, Token Zero reading. Educational, on-brand.

**Status:** PARKED. Build after Stage 1 is confirmed working and landing.

---

### Stage 3 — The SET Display (FUTURE)
Before the AI responds, the user sees the setup — the system prompt, the governance layer, what has been baked in. Transparency about what the AI is working with.

Show two versions: (1) plain-language "what the AI was told" and (2) toggle to see raw text.

**Status:** PARKED.

---

### Stage 4 — AI Build Progression (FUTURE)
A staged sequence showing AI involvement at different levels:
- **AI Build On/Off** — toggle AI involvement. See what the prompt does with and without it.
- **AI Build In/Out** — bring AI in or push it out of specific parts of scope. Partial governance.
- **AI Build All Over the Place** — full scope, AI engaged everywhere.

**Open question not yet answered:** At each stage, does the user type their own prompt, or do we give them a starter prompt? Or both? Answer this before building.

**Status:** PARKED.

---

### Stage 5 — Word Input + Insight (FUTURE)
User types a word or phrase. The playground shows:
- What that word is doing in a force profile
- User word choice patterns over the session
- Ways to watch themselves — the watcher in practice

**Proposed output format:** AI returns 3–5 observations about the words typed, labeled by what each word is doing (direction, constraint, authority, emotional register, drift risk).

**Open question not yet answered:** Analyzing a single word, or the full prompt from the session? Or both? Answer this before building.

**Status:** PARKED.

---

## Technical Notes

- **OpenAI key:** Builder has one. Add via `webdev_request_secrets` as `OPENAI_API_KEY`. Wire server-side only — never expose the key to the frontend.
- **Streaming:** Default to non-streaming first. Upgrade to streaming after the basic flow is confirmed working.
- **Adding more AI tools later:** The page is designed to host multiple tools in sequence. Each stage is a separate section. Build them independently and add them when ready.
- **Token cost estimate for full build:** ~15,000–20,000 tokens across all stages. Stage 1 alone is ~5,000–7,000 tokens.

---

## What Could Go Wrong (Risk Register)

| Risk | Likelihood | Mitigation |
|---|---|---|
| Context compression mid-build loses the spec | High on long sessions | Re-read this file at the start of each phase |
| AI Build progression UX is ambiguous | Medium | Answer the open questions before building Stage 4 |
| Five Rules experience doesn't land emotionally | Medium | Ask Builder to describe the feeling before writing the code |
| Streaming bugs eat tokens | Low if we start non-streaming | Default to non-streaming, upgrade later |
| Homepage tension (rules belong on home?) | Low | Noted above. Do not move. Address deliberately. |

---

## Session History

**April 15, 2026 — Session ended before build started.**
Builder had OpenAI key. Discussed full vision. Backed up to start small. Decision: build Stage 1 (Five Rules) only. Builder was too tired to describe the desired experience. Stopped here. Resume next session with the question: "Walk me through the Five Rules experience like you're the user arriving for the first time."
