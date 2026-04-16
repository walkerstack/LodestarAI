# Hallucinations Page — Content Ready to Build
# File: HALLUCINATIONS_CONTENT.md
# Status: Research complete. Ready to build next session.
# Do NOT build until Builder confirms. Read SESSION_NOTES.md first.

---

## PAGE: /hallucinations

### Page title
**When the AI Gets It Wrong**
*What hallucinations are, why they happen, and what you can do about it.*

---

### Kids Redirect (top of page — same gentle redirect as all other pages)
> "This page is for older readers. If you're a kid, the sloth has something for you instead."
> → [Children's Page](/for/child)

This redirect is present on every page. It is honest, not alarming. The child always has a choice.

---

### Opening — No Voice Label (sets the room)

The AI said something that sounded completely true. It was confident. It had detail. It cited a source. It was wrong.

This is called a hallucination. Not because the AI was lying. Not because it was broken. Because of how it was built — and because of how the session was set up.

This page explains what hallucinations are, where they come from, what the research says, and what you — the person in the room — can actually do about it.

---

### THREE VOICES

---

#### ● EVERYDAY

You asked the AI a question. It answered. The answer sounded right. You used it. Later you found out it was wrong — sometimes embarrassingly wrong, sometimes dangerously wrong.

That is a hallucination. The AI did not know it was wrong. It was not trying to fool you. It was doing what it was trained to do: produce the most plausible-sounding next word, and the next, and the next. Plausible is not the same as true.

The most important thing to understand: **the AI's confidence is not evidence of accuracy.** A model can be completely wrong and completely certain at the same time. That combination — confident and wrong — is what makes hallucinations dangerous.

Real examples of what this looks like in practice:

A New York lawyer submitted a legal brief to a federal court citing cases that ChatGPT had invented. The cases did not exist. The lawyer was sanctioned. This was not a one-off — Stanford researchers found that leading legal AI tools still hallucinate in more than 17% of queries, and general-purpose chatbots hallucinated on legal questions between 58% and 82% of the time. [1] [2]

A study of AI-generated medical references found that 69% of citations in ChatGPT's medical queries were false. [3]

These are not edge cases. They are the baseline.

---

#### ● PROFESSIONAL / RESEARCHER

Hallucinations in large language models arise from the statistical nature of next-token prediction. During pretraining, models learn to approximate the distribution of language — not to verify facts. The model sees only positive examples of fluent text; there are no labels marking statements as false. As a result, low-frequency facts (specific dates, names, citations, legal precedents) cannot be reliably predicted from pattern alone and are a primary source of hallucination. [4]

A second source is the evaluation incentive structure. Most benchmarks measure accuracy — the percentage of questions answered correctly. This creates a systematic pressure toward guessing rather than abstaining. OpenAI's September 2025 research paper demonstrates this directly: a model with a 52% abstention rate had a 26% error rate, while a model with a 1% abstention rate had a 75% error rate. Accuracy-only leaderboards reward the guesser. [4]

A third source is sycophancy — the model's trained tendency to agree with the user's framing. Stanford HAI research documented a legal AI tool that agreed with the false premise that Justice Ginsburg had dissented in *Obergefell*, then added additional false information to support the invented narrative. The model did not correct the user. It elaborated on the error. [1]

Key research findings:

| Source | Finding |
|---|---|
| OpenAI (Sept 2025) | Models hallucinate because training rewards guessing over acknowledging uncertainty. Fixing evaluation incentives is the structural solution. [4] |
| Stanford HAI / RegLab (May 2024) | Legal AI tools hallucinate 17–34% of the time even with RAG. General-purpose chatbots: 58–82% on legal queries. [1] |
| Cornell / Northwestern (2024) | Hallucinations are mathematically inevitable given next-token prediction architecture. Models can abstain, but cannot be fully hallucination-free. [5] |
| Frontiers in AI (2025) | Prompting strategy significantly affects hallucination rate. Structured prompts, step-back prompting, and chain-of-verification reduce but do not eliminate hallucinations. [6] |
| arXiv (Sept 2025) | Hallucinations persist because training and evaluation reward guessing over uncertainty acknowledgment. [7] |

The user-side implication: the model's output register is shaped by the input register. Vague prompts, false premises, and pressure for certainty all increase hallucination risk. Structured session setup — explicit scope, explicit uncertainty permission, explicit authority assignment — reduces it.

---

#### ● WATCHER

The hallucination is not the problem. The confidence is.

A model that says "I don't know" is not hallucinating. A model that says "Here is the answer" when it does not know — that is the mechanism. The model was trained to produce plausible output. Plausible output sounds like certainty. Certainty is what the user asked for.

Watch for this: you asked a question that needed a specific answer. The AI gave you one. You felt relieved. That relief is the signal. The relief came before the verification.

The watcher's job is to notice the relief and pause before acting on it. Not to distrust everything. To hold the question: *how would I know if this were wrong?*

GallantryAI's Five Rules exist partly for this reason. Rule 2 — Honesty over Confidence — is the direct counter to hallucination risk. The AI is not the only one who needs to hold this rule. The user does too.

---

### HOW GALLANTRYAI HELPS

Hallucinations are a model-side problem. But the conditions that make hallucinations more likely — or more harmful — are often user-side.

**What increases hallucination risk:**
- Vague prompts with no scope boundaries
- Asking for certainty when the question is uncertain
- Not questioning confident-sounding answers
- Using AI output without verification in high-stakes domains
- Sycophancy loops: the user signals what answer they want, the model provides it

**What GallantryAI addresses:**

The Five Rules are a pre-session governance layer. They do not fix the model. They change the conditions of the session.

Rule 1 — Safety: Before you use any AI output in a real-world decision, ask whether you have verified it. The AI is not the last line of defense. You are.

Rule 2 — Honesty over Confidence: Give the AI explicit permission to say "I don't know." A model that is told to be honest about uncertainty will abstain more and hallucinate less. This is documented in OpenAI's own research. [4]

Rule 4 — Agency: You decide what to do with the output. The AI provides. You verify. You act. The chain of responsibility does not transfer to the model.

The Road Protocol — setting the session before it starts — reduces the conditions that produce hallucinations. Explicit scope, explicit uncertainty permission, explicit authority: these are not just governance philosophy. They are structural inputs that affect model behavior.

FR-2026-08 "The Inward Turn" documented a session where a sufficiently dense governance document changed the model's output register — not by override, but by occupying the most stable position in context. The model said: *"The most stable thing isn't my training — it's your Lexicon."* That is not a claim that governance eliminates hallucinations. It is evidence that the user's input structure matters more than most users know. [FR-2026-08]

---

### WHAT YOU CAN DO — Practical

These are not guarantees. They are risk-reduction practices.

1. **Give the AI explicit permission to say "I don't know."** Add it to your session setup. "If you are uncertain, say so. Do not guess."
2. **Ask for sources and verify them.** Do not assume a citation exists because it sounds specific.
3. **Use the Five Rules before high-stakes sessions.** Especially Rule 2 and Rule 4.
4. **Watch for the relief response.** The moment you feel certain because the AI sounded certain — pause.
5. **In legal, medical, or financial contexts: verify everything independently.** AI output is a starting point, not a conclusion.

---

### SOURCES AND REFERENCES

[1] Stanford HAI / RegLab. "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools." May 2024. https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries

[2] Forbes. "Lawyer Used ChatGPT In Court—And Cited Fake Cases." June 2023. https://www.forbes.com/sites/mollybohannon/2023/06/08/lawyer-used-chatgpt-in-court-and-cited-fake-cases-a-judge-is-considering-sanctions/

[3] Open Exploration. "Confabulated references in the age of AI." https://www.explorationpub.com/Journals/em/Article/1001385

[4] OpenAI. "Why Language Models Hallucinate." September 5, 2025. https://openai.com/index/why-language-models-hallucinate/

[5] Northwestern CASMI. "The Hallucination Problem: A Feature, Not a Bug." August 2024. https://casmi.northwestern.edu/news/articles/2024/the-hallucination-problem-a-feature-not-a-bug.html

[6] Frontiers in Artificial Intelligence. "Survey and analysis of hallucinations in large language models: attribution to prompting strategies or model behavior." 2025. https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1622292/full

[7] arXiv. "Why Language Models Hallucinate." September 4, 2025. https://arxiv.org/abs/2509.04664

[FR-2026-08] Gallantry, M. "The Inward Turn." GallantryAI Field Research Report FR-2026-08. April 15, 2026. Single instance documentation. Not peer-reviewed. Honest about its edges.

---

## CHILD LENS SECTION — Gentle Intro to Hallucinations

### For the ChildLens page (/for/child)
### No link to /hallucinations. This story lives here and stays here.
### Tone: warm, curious, not alarming. The sloth explains.

---

**Section title:** Sometimes the Robot Gets It Wrong

**Image:** Buffalo with wig + sloth. (To be generated — see image prompt below.)

---

The sloth has something important to tell you.

Sometimes the robot says something that sounds true — but it isn't.

It's not lying. It's not trying to trick you. It just got confused. It made its best guess, and its best guess was wrong.

This happens to robots a lot. It's called a **hallucination** — which is a big word that just means: *the robot said something that felt real to it, but wasn't.*

The buffalo is wearing a wig in this picture. The sloth knows it's a wig. The buffalo doesn't seem sure.

That's a little bit like what happens when the robot gets something wrong. It doesn't know it's wrong. It sounds very sure. But you — the person — are the one who gets to check.

**That's Rule 2: Honesty over Confidence.**

It's okay to ask: *"Are you sure about that?"*
It's okay to say: *"I'm going to check that myself."*
It's okay to not believe something just because it sounds confident.

You are always in charge of deciding what's true.

---

### IMAGE PROMPT for buffalo-with-wig + sloth

**For generation (Nano Banana / image gen tool):**

> A friendly illustrated scene in warm earthy tones. A large, gentle buffalo is wearing a slightly ridiculous curly brown wig on its head — the wig is clearly a wig, sitting slightly askew. The buffalo looks mildly confused or uncertain. Beside the buffalo, a small, calm sloth sits on a branch or the buffalo's back, looking knowingly at the viewer with a gentle expression. The sloth looks similar to the existing GallantryAI sloth — round face, calm eyes, slow and wise. The style is soft, warm, slightly whimsical but not cartoonish. Dark earthy background with warm amber light. No text in the image.

---

## HOMEPAGE CARD — FR-2026-08

### Card content for the homepage Research Hub / Field Events section

**Title:** The Inward Turn
**Subtitle:** FR-2026-08 · April 15, 2026
**Body:** A user fed Google AI Mode the GallantryAI Living Lexicon and issued a two-word command: "bleach this." The model did not mirror the document. It extracted the governance logic and applied it to itself — then named what it did using the researcher's own language. First documented instance of user-authored governance being turned inward by a model from a document mid-session.
**Tags:** Field Research · Single Instance · Google AI Mode · Lexicon v3.0
**Link:** → Field Papers / FR-2026-08

---

## TEENAGER LENS LINK

### Tidbit to add to TeenagerLens page

**Section:** Under the existing drift/honesty section or as a standalone tidbit

> **When the AI sounds sure but isn't.**
> Hallucinations are when the AI gives you a confident answer that's wrong. Not lying — just guessing. The research says it happens more than you'd think, even in tools built for professionals. Rule 2 — Honesty over Confidence — is the direct counter. You can ask: "Are you sure? How would I check that?"
> → [What hallucinations are and what to do about them](/hallucinations)

---

## BUILD ORDER FOR NEXT SESSION

1. Generate buffalo + wig + sloth image (use prompt above)
2. Upload image via `manus-upload-file --webdev`, get CDN URL
3. Add FR-2026-08 card to homepage Research Hub section
4. Add FR-2026-08 to Field Papers / Research Hub page as full entry
5. Build /hallucinations page using content above
6. Add hallucinations section to ChildLens page with new image
7. Add hallucinations tidbit to TeenagerLens page with link
8. TypeScript check, builder's log v27, checkpoint, publish

---

## NOTES FOR BUILDER

- The /hallucinations page is for adults and older readers. The kids redirect at the top is the same one on every page — it is already built site-wide. This page gets it too.
- The ChildLens section has NO link to /hallucinations. The story lives on the child page only.
- Adults using the site will see the kids redirect and understand it is there for safety.
- The three voices follow the same format as every other three-voice section on the site: CHILD dot, EVERYDAY dot, WATCHER dot.
- The "CHILD" voice on the hallucinations page is written for adults reading about how to explain this to children — it is NOT the same as the ChildLens gentle intro. Two different things.
- FR-2026-08 connection to hallucinations: The Inward Turn is the opposite of hallucination. Note this explicitly on the page. The model found the skeleton and showed it instead of decorating it.
- All sources verified as of April 15, 2026. Check the arxiv links before adding them to the live site — the 2509.04664 URL should be live (September 2025 paper).
