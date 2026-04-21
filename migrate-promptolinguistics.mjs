/*
 * Migrate Promptolinguistics page content to DB blocks.
 *
 * This is the hub page — the most complex on the site.
 * Interactive lens toggles, word click-to-expand, verb/hold selectors STAY as React.
 * Their TEXT CONTENT (all 3 lens descriptions, all examples) goes into DB
 * so Matthew can edit every word from Studio.
 *
 * Block strategy:
 *   - Hero → text block
 *   - Four Effects infographic → image block
 *   - ALCM section heading → text block
 *   - Foundational Tokens (YET/WHY) → card block with lens texts in items
 *   - Word Roles (4 axes) → card block with lens texts + word examples nested
 *   - Action Verb Escalation → card block with lens texts + verb examples
 *   - HOLD Dial → card block with lens texts + hold examples
 *   - Active Spectrum → text block with lens texts
 *   - Sentence Break Architecture → text block with lens texts
 *   - Regulation Spectrum → text block with lens texts + axes data
 *   - Semantic Density → text block with lens texts
 *   - Relational Delivery of Reasoning → text block with lens texts
 *   - Power Prompt Combos → card block with categories + examples
 *   - Ozzy Protocol → text + image blocks
 *   - Token Efficiency → text + image blocks
 *   - RLHF vs GallantryAI → text + image blocks
 *   - Playground CTA → text block
 *   - Corner Words → card block with lens texts + pairs
 *   - Third Entity → card block with lens texts + steps
 *   - Teenager entry → text block
 *   - Professional entry → text block
 *   - Cross-links → card block
 *
 * console.log("🦆🦆🦆");
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const PAGE = "promptolinguistics";
const now = new Date().toISOString().slice(0, 19).replace("T", " ");
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

// Clear existing blocks for this page (re-runnable)
await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [PAGE]);

let pos = 0;
const insert = async (type, content) => {
  pos++;
  await conn.execute(
    "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', ?, ?)",
    [PAGE, type, JSON.stringify(content), pos, now, now]
  );
};

// ═══════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "The Discipline",
  heading: "Promptolinguistics",
  body: "The study of how a single word fundamentally alters AI behavior and accountability. Words don\u2019t just ask \u2014 they steer.",
  titleColor: "#FAF6EF",
  descColor: "#d4c8b8",
  bgColor: "#080604",
  bgImage: `${CDN}/image_647f734f_a6aea98d.png`,
  align: "left",
  quote: "\u201COne word can open doors that extensive sentences cannot close.\u201D",
  quoteColor: "#E8520A",
  section: "hero",
});

// ═══════════════════════════════════════════════
// 2. FOUR EFFECTS INFOGRAPHIC
// ═══════════════════════════════════════════════
await insert("image", {
  url: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  alt: "Promptolinguistics \u2014 The four foundational effects",
  caption: 'The \u201CCAN\u201D Effect, The \u201CWHY\u201D Factor, The \u201CAND YET\u201D Tension, Foundational Word \u201CSAFE\u201D. The Wall Concept & Alignment.',
  bgColor: "#FAF6EF",
  section: "four-effects",
});

// ═══════════════════════════════════════════════
// 3. ALCM SECTION HEADING
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Core Model",
  heading: "Atomic Language Control Model",
  body: "The ALCM maps atomic words to their functional roles. Three layers: Foundational Tokens (hinges & ignition), Multi-Axis Control System (variables), and Action & Regulation Layers (force & tension). Language is not just content \u2014 it is a structural shaping force.",
  titleColor: "#1A1A2E",
  descColor: "#2D2D2D",
  bgColor: "#f5f0e8",
  section: "alcm-heading",
});

// ═══════════════════════════════════════════════
// 4. ALCM DIAGRAM IMAGE
// ═══════════════════════════════════════════════
await insert("image", {
  url: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  alt: "ALCM: Cognitive Physics & Reasoning \u2014 Full Model",
  bgColor: "#f5f0e8",
  section: "alcm-diagram",
});

// ═══════════════════════════════════════════════
// 5. FOUNDATIONAL TOKENS (YET + WHY) — 3 lens texts each
// ═══════════════════════════════════════════════
await insert("card", {
  heading: "Foundational Tokens",
  section: "foundational-tokens",
  bgColor: "#f5f0e8",
  items: [
    {
      title: "YET",
      subtitle: "Temporal Hinge",
      lensTexts: {
        everyday: "\"Not yet\" tells the AI you're not done thinking. It's like saying \"hold on, I'm not ready\" instead of \"no.\" The AI waits with you instead of closing the door.",
        professional: "Delays completion, implies future potential. \"Not yet\" is not \"no\" \u2014 it is \"not finished.\" This single word changes the AI's temporal frame.",
        watcher: "YET functions as a temporal suspension operator. It holds the AI in an incomplete state, preventing premature closure of reasoning chains. The model's attention mechanism treats YET as a continuation signal rather than a negation.",
      },
      titleColor: "#E8520A",
      descColor: "#555",
      bgColor: "#ffffff",
      borderColor: "#e8e0d0",
    },
    {
      title: "WHY",
      subtitle: "Recursion Ignition",
      lensTexts: {
        everyday: "WHY is the most powerful word you can use. It forces the AI to actually think instead of giving you a quick answer. Ask \"why\" and watch the answer get deeper.",
        professional: "Ignites recursion, expands reasoning branches. WHY forces the AI to go deeper. It cannot answer WHY with a surface response.",
        watcher: "WHY triggers recursive depth-first search in the model's reasoning. Each WHY adds a layer of causal analysis, forcing the transformer to allocate attention to explanatory chains rather than pattern-matched surface responses. Recursion depth correlates with answer quality.",
      },
      titleColor: "#E8520A",
      descColor: "#555",
      bgColor: "#ffffff",
      borderColor: "#e8e0d0",
    },
  ],
  columns: 2,
});

// ═══════════════════════════════════════════════
// 6. CONTROL AXES (4 word roles + word examples)
// ═══════════════════════════════════════════════
await insert("card", {
  heading: "The Control Axes",
  section: "control-axes",
  bgColor: "#f5f0e8",
  lensTexts: {
    // Section-level lens intro (not used per-role, but available)
  },
  items: [
    {
      title: "Direction",
      color: "border-[#E8520A]",
      borderLeftColor: "#E8520A",
      examples: ["analyze", "describe", "compare", "explain", "WHY", "WHAT", "HOW"],
      lensTexts: {
        everyday: "These words tell the AI where to go. \"Why\" makes it dig deeper. \"What\" makes it focus. \"How\" makes it explain steps.",
        professional: "Words that tell the AI which direction to move. WHY ignites recursion. WHAT targets mechanism. HOW demands execution.",
        watcher: "Direction tokens function as vector operators in semantic space. WHY initiates recursive causal traversal. WHAT constrains to mechanism identification. HOW demands procedural decomposition. The choice of direction word determines which reasoning pathway the model activates.",
      },
    },
    {
      title: "Constraint",
      color: "border-[#2A9D8F]",
      borderLeftColor: "#2A9D8F",
      examples: ["only", "never", "limit", "CAN", "SHOULD", "MUST"],
      lensTexts: {
        everyday: "These words build fences. \"Only\" keeps the AI focused. \"Never\" sets a hard rule. \"Must\" means no exceptions.",
        professional: "Words that build walls. CAN opens possibility. SHOULD implies obligation. MUST enforces necessity.",
        watcher: "Constraint tokens act as boundary conditions on the model's output space. CAN opens the possibility manifold. SHOULD introduces soft obligation weighting. MUST enforces hard constraints that override default generation patterns.",
      },
    },
    {
      title: "Scope",
      color: "border-blue-500",
      borderLeftColor: "#3B82F6",
      examples: ["briefly", "in depth", "I", "WE", "SYSTEM", "TELL"],
      lensTexts: {
        everyday: "These words set how wide or narrow the AI looks. \"Briefly\" means keep it short. \"In depth\" means go deep.",
        professional: "Words that set the zoom level. I is individual. WE is group. SYSTEM is holistic. TELL is command.",
        watcher: "Scope tokens modulate the attention window breadth. I/WE/SYSTEM shift the frame of reference. TELL vs ASK changes the authority gradient. These tokens control how much of the latent space the model samples from.",
      },
    },
    {
      title: "Authority",
      color: "border-purple-500",
      borderLeftColor: "#8B5CF6",
      examples: ["you are", "act as", "I am in charge", "ASK"],
      lensTexts: {
        everyday: "These words tell the AI who is in charge. \"You are\" gives it a role. \"I am in charge\" reminds it who decides.",
        professional: "Words that establish who is who. The human's authority signal. ASK requests. TELL commands.",
        watcher: "Authority tokens establish the dominance hierarchy in the human-AI dyad. They signal to the model whether it is operating as advisor, executor, or subordinate. The framing determines how the model weights its own confidence vs. user intent.",
      },
    },
  ],
  wordExamples: {
    analyze: "\"Analyze why this argument fails.\" \u2014 Forces the AI to decompose, not summarize.",
    describe: "\"Describe the texture of this problem.\" \u2014 Keeps the AI observational, not prescriptive.",
    compare: "\"Compare these two approaches without choosing.\" \u2014 Holds the AI in tension.",
    explain: "\"Explain this to someone who disagrees.\" \u2014 Forces the AI to anticipate objections.",
    WHY: "\"WHY does this pattern repeat?\" \u2014 Ignites recursive causal reasoning. The AI digs deeper.",
    WHAT: "\"WHAT mechanism produces this?\" \u2014 Targets the engine, not the exhaust.",
    HOW: "\"HOW would you build this from scratch?\" \u2014 Demands procedural decomposition.",
    only: "\"Only use evidence from the last 5 years.\" \u2014 Hard boundary. No exceptions.",
    never: "\"Never use the word \u2018just\u2019 in your response.\" \u2014 Removes minimizing language.",
    limit: "\"Limit your response to 3 sentences.\" \u2014 Forces compression. Quality rises.",
    CAN: "\"You CAN speculate here.\" \u2014 Opens the possibility space. Gives permission.",
    SHOULD: "\"You SHOULD prioritize clarity over completeness.\" \u2014 Soft obligation. Guideline, not wall.",
    MUST: "\"You MUST cite your sources.\" \u2014 Hard constraint. Non-negotiable.",
    briefly: "\"Briefly summarize the key insight.\" \u2014 Zoom out. Big picture only.",
    "in depth": "\"Explain in depth how token position affects weight.\" \u2014 Zoom in. Full detail.",
    I: "\"I need this for a presentation.\" \u2014 Individual frame. Personal context.",
    WE: "\"WE are building a safety framework.\" \u2014 Group frame. Shared responsibility.",
    SYSTEM: "\"From a SYSTEM perspective, what fails first?\" \u2014 Holistic view. Everything connected.",
    TELL: "\"TELL me the three most important things.\" \u2014 Command mode. Direct authority.",
    "you are": "\"You are a structural editor, not a cheerleader.\" \u2014 Assigns identity. Shapes behavior.",
    "act as": "\"Act as a skeptical peer reviewer.\" \u2014 Role assignment. Changes the AI's default posture.",
    "I am in charge": "\"I am in charge of this session. You follow my lead.\" \u2014 Establishes hierarchy.",
    ASK: "\"ASK me clarifying questions before you start.\" \u2014 Reverses the flow. AI seeks input.",
  },
  columns: 2,
});

// ═══════════════════════════════════════════════
// 7. ACTION VERB ESCALATION
// ═══════════════════════════════════════════════
await insert("card", {
  heading: "Action Verb Escalation",
  section: "action-verbs",
  bgColor: "#f5f0e8",
  sectionLensTexts: {
    everyday: "Every word you use with AI has a different amount of push behind it. \"Try\" is gentle. \"Force\" is strong. Pick the right word for how much you want the AI to do.",
    professional: "Ethical force multipliers defining agency intensity & risk. Each verb carries a different weight.",
    watcher: "Action verbs function as force vectors in the prompt's semantic field. Each verb modulates the model's compliance gradient differently. TRY opens exploratory sampling; FORCE collapses the output distribution toward a single trajectory. The escalation ladder maps directly to the model's instruction-following weight allocation.",
  },
  items: [
    {
      title: "TRY", force: 1, desc: "Exploratory. Low commitment.",
      lensTexts: {
        everyday: "Like asking \"could you maybe...\"",
        professional: "Exploratory. Low commitment.",
        watcher: "Low-commitment sampling. Broad output space.",
      },
      example: "\"Try approaching this from the patient's perspective.\" \u2014 Low stakes. Exploratory. The AI feels free to experiment.",
    },
    {
      title: "DO", force: 2, desc: "Direct action. Standard force.",
      lensTexts: {
        everyday: "Like saying \"please do this\"",
        professional: "Direct action. Standard force.",
        watcher: "Standard execution vector. Moderate constraint.",
      },
      example: "\"Do a line-by-line comparison of these two texts.\" \u2014 Standard command. Clear, direct, no ambiguity.",
    },
    {
      title: "GET", force: 3, desc: "Acquisition. Targeted retrieval.",
      lensTexts: {
        everyday: "Like saying \"find me this\"",
        professional: "Acquisition. Targeted retrieval.",
        watcher: "Targeted retrieval. Narrows search space.",
      },
      example: "\"Get me the three strongest counterarguments.\" \u2014 Targeted retrieval. The AI hunts for specifics.",
    },
    {
      title: "TAKE", force: 4, desc: "Assertion. Claiming ownership.",
      lensTexts: {
        everyday: "Like saying \"I'm claiming this\"",
        professional: "Assertion. Claiming ownership.",
        watcher: "Assertion operator. Claims output ownership.",
      },
      example: "\"Take this position and defend it.\" \u2014 The AI claims a stance. Ownership changes behavior.",
    },
    {
      title: "ALLOW", force: 5, desc: "Permission. Granting authority.",
      lensTexts: {
        everyday: "Like saying \"you have permission\"",
        professional: "Permission. Granting authority.",
        watcher: "Permission gate. Shifts authority gradient.",
      },
      example: "\"Allow yourself to speculate beyond the data.\" \u2014 Permission granted. Opens creative space.",
    },
    {
      title: "FORCE", force: 6, desc: "Maximum imposition. Override.",
      lensTexts: {
        everyday: "Like saying \"do this no matter what\"",
        professional: "Maximum imposition. Override.",
        watcher: "Maximum force. Collapses output distribution.",
      },
      example: "\"Force a conclusion even if the data is incomplete.\" \u2014 Maximum pressure. The AI must commit.",
    },
  ],
});

// ═══════════════════════════════════════════════
// 8. HOLD DIAL
// ═══════════════════════════════════════════════
await insert("card", {
  heading: "The HOLD Dial",
  section: "hold-dial",
  bgColor: "#f5f0e8",
  sectionLensTexts: {
    everyday: "HOLD is like a volume knob for how tightly you control the conversation. Sometimes you hold firm, sometimes you let it flow. Think of it like holding a steering wheel \u2014 tight on a highway, loose in a parking lot.",
    professional: "Internal calibration for regulation. Separate layer for inward tension strategies.",
    watcher: "The HOLD dial maps to the model's internal tension between compliance and creativity. Each position modulates the constraint-freedom gradient differently. STRONG maximizes instruction adherence; FORWARD maximizes generative momentum. The dial is the human's real-time control over the model's output distribution shape.",
  },
  items: [
    {
      title: "STRONG", desc: "Resistance \u2014 holds firm",
      lensTexts: {
        everyday: "Like gripping the wheel tight",
        professional: "Resistance \u2014 holds firm",
        watcher: "Max constraint. Minimal sampling variance.",
      },
      example: "\"Hold strong on this boundary \u2014 do not soften it.\" \u2014 The AI grips tight. No compromise.",
    },
    {
      title: "TIGHT", desc: "Stability \u2014 no movement",
      lensTexts: {
        everyday: "Locked in, not moving",
        professional: "Stability \u2014 no movement",
        watcher: "Zero-drift state. Output locked.",
      },
      example: "\"Hold tight to the original question.\" \u2014 Zero drift. The AI stays locked on target.",
    },
    {
      title: "LOOSE", desc: "Elastic \u2014 allows flex",
      lensTexts: {
        everyday: "Relaxed, flexible",
        professional: "Elastic \u2014 allows flex",
        watcher: "Elastic constraint. Allows creative sampling.",
      },
      example: "\"Hold loose \u2014 let the ideas breathe.\" \u2014 Elastic. The AI can wander productively.",
    },
    {
      title: "BACK", desc: "Brake \u2014 slowing down",
      lensTexts: {
        everyday: "Slowing things down",
        professional: "Brake \u2014 slowing down",
        watcher: "Deceleration vector. Reduces output momentum.",
      },
      example: "\"Hold back on conclusions for now.\" \u2014 Brake applied. The AI slows its reasoning.",
    },
    {
      title: "ON", desc: "Continuity \u2014 keeps going",
      lensTexts: {
        everyday: "Keep going, stay the course",
        professional: "Continuity \u2014 keeps going",
        watcher: "Continuity signal. Maintains current trajectory.",
      },
      example: "\"Hold on to that thread and keep going.\" \u2014 Continuity. Don't drop what you're building.",
    },
    {
      title: "OFF", desc: "Delay \u2014 pauses",
      lensTexts: {
        everyday: "Take a pause",
        professional: "Delay \u2014 pauses",
        watcher: "Suspension operator. Pauses generation logic.",
      },
      example: "\"Hold off on recommendations until I ask.\" \u2014 Pause. The AI waits for your signal.",
    },
    {
      title: "FORWARD", desc: "Momentum \u2014 accelerates",
      lensTexts: {
        everyday: "Speed up, push forward",
        professional: "Momentum \u2014 accelerates",
        watcher: "Acceleration vector. Maximizes generative momentum.",
      },
      example: "\"Hold forward \u2014 push this idea to its logical end.\" \u2014 Momentum. Accelerate the reasoning.",
    },
  ],
});

// ═══════════════════════════════════════════════
// 9. ACTIVE SPECTRUM
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Active Spectrum",
  heading: "Active Spectrum",
  body: "",
  section: "active-spectrum",
  bgColor: "#f5f0e8",
  titleColor: "#1A1A2E",
  descColor: "#555",
  lensTexts: {
    everyday: "One word can be gentle or it can be a fist. \"Try\" is an invitation. \"Take\" is a demand. \"Believe\" is a declaration. The spectrum maps how far a single word can push before it becomes something else entirely.",
    professional: "A fourth axis in Variable Scale Theory. A graduated force spectrum: Try (experimental effort) \u2192 Do (direct execution) \u2192 Get (acquisition focus) \u2192 Take (assertive acquisition) \u2192 Allow (permission-based control) \u2192 Force (coercive override) \u2192 Hold Strong (defensive resilience) \u2192 Believe (internal conviction). The spectrum predicts escalation risk. GallantryAI's drift detection monitors this ladder without naming it.",
    watcher: "Curiosity becomes Control becomes Dominance becomes Conviction. The ladder was always there. The spectrum just names the rungs.",
  },
  spectrumWords: ["TRY", "DO", "GET", "TAKE", "ALLOW", "FORCE", "HOLD STRONG", "BELIEVE"],
});

// ═══════════════════════════════════════════════
// 10. SENTENCE BREAK ARCHITECTURE
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Sentence Break Architecture",
  heading: "Sentence Break Architecture",
  body: "",
  section: "sentence-break",
  bgColor: "#f5f0e8",
  titleColor: "#1A1A2E",
  descColor: "#555",
  lensTexts: {
    everyday: "Three short sentences land harder than one long one. Long sentences give you somewhere to hide. Short ones don't. Each one has to be read completely before the next one arrives.",
    professional: "A deliberate cognitive design principle. Long sentences allow the reader to skim the middle and feel understood. Short sentences close that gap. Each sentence demands full processing before the next arrives. GallantryAI applies this to all everyday-facing outputs by design. Named and documented February 25, 2026.",
    watcher: "The goal is not elegant prose. The goal is a thought that lands. Cut the sentence in half. Then cut it again.",
  },
});

// ═══════════════════════════════════════════════
// 11. REGULATION SPECTRUM
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Regulation Spectrum",
  heading: "Regulation Spectrum",
  body: "",
  section: "regulation-spectrum",
  bgColor: "#f5f0e8",
  titleColor: "#1A1A2E",
  descColor: "#555",
  lensTexts: {
    everyday: "Every AI safety rule is a dial, not a switch. \"Can\" and \"Cannot\" is one dial. \"Do\" and \"Do Not\" is another. \"Should\" and \"Should Not\" is a third. None of them are ever fully off. All of them respond to the words you use.",
    professional: "Three axes of constraint in AI output space. The permission axis (Can/Cannot), the action axis (Do/Do Not), and the ethics axis (Should/Should Not). None are binary. All respond to linguistic pressure. The dangerous pairing is Can plus Do in sequence \u2014 neither alone carries the force of both together. GallantryAI's drift detection is a structural response to the Do axis. The manipulation check responds to the Should axis.",
    watcher: "The Builder built countermeasures to all three before he had names for any of them. The names came later. The instinct came first.",
  },
  axes: [
    { axis: "Permission", pair: "Can / Cannot", color: "#E8520A" },
    { axis: "Action", pair: "Do / Do Not", color: "#2A9D8F" },
    { axis: "Ethics", pair: "Should / Should Not", color: "#1A1A2E" },
  ],
});

// ═══════════════════════════════════════════════
// 12. SEMANTIC DENSITY
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Semantic Density",
  heading: "Semantic Density",
  body: "",
  section: "semantic-density",
  bgColor: "#f5f0e8",
  titleColor: "#1A1A2E",
  descColor: "#555",
  lensTexts: {
    everyday: "Some words carry more weight than others. \"Secure\" ends a session. \"Believe\" declares conviction. \"And So\" pivots the whole direction. One word. Full weight. That is semantic density \u2014 how much a single word can carry before it needs help.",
    professional: "The measure of meaning-per-token. High semantic density words function as control signals \u2014 they shift the AI's output register, tone, or direction with minimal input. Low density words require context to carry meaning. GallantryAI's command vocabulary is built from high-density terms specifically because they work across sessions, platforms, and user states without needing elaboration.",
    watcher: "The word that does the most work is usually the shortest one. The everyday person already knows this. They just do not know they know it.",
  },
});

// ═══════════════════════════════════════════════
// 13. RELATIONAL DELIVERY OF REASONING
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Relational Delivery of Reasoning",
  heading: "Relational Delivery of Reasoning",
  body: "",
  section: "relational-delivery",
  bgColor: "#f5f0e8",
  titleColor: "#1A1A2E",
  descColor: "#555",
  lensTexts: {
    everyday: "The AI does not just give you an answer. It gives you the answer in a way that is shaped by how you asked. The relationship between the question and the answer is not neutral. GallantryAI is built to make that relationship honest.",
    professional: "The principle that reasoning is not delivered in isolation \u2014 it is delivered in relation to the user's declared state, device, cognitive tempo, and session context. The same logical conclusion delivered to a person at 2am after no sleep lands differently than the same conclusion delivered on a rested Tuesday morning. GallantryAI's Session Calibration rule (Rule 0) is the structural implementation of this principle.",
    watcher: "The answer is always shaped by the person receiving it. The only question is whether that shaping is honest or convenient.",
  },
});

// ═══════════════════════════════════════════════
// 14. POWER PROMPT COMBOS
// ═══════════════════════════════════════════════
await insert("card", {
  eyebrow: "Advanced Tools",
  heading: "Power Prompt Combos",
  section: "power-prompts",
  bgColor: "#FAF6EF",
  sectionLensTexts: {
    everyday: "These are special word combinations that make AI think harder. Like magic spells \u2014 but real. Each combo does something specific. Try them and see what happens.",
    professional: "Multi-word operators that create specific cognitive effects. These are not suggestions \u2014 they are tested tools.",
    watcher: "Multi-token operators that create interference patterns in the model's attention mechanism. Complexity Holders force dual-state maintenance. The Corner creates irresolvable semantic collisions that bypass pattern-matching. Cognitive Handles provide grip on abstract latent space regions. Session Operators are single-action control signals with zero ambiguity.",
  },
  categories: [
    {
      name: "Complexity Holders",
      words: ["And yet", "Nevertheless", "Granted", "Ostensibly", "Precisely", "Admittedly"],
      desc: "Words that force AI to hold two truths at once. They prevent collapse into simple answers.",
    },
    {
      name: "The Corner",
      words: ["Nemesis baby", "Claim none", "Open closed", "Paste pastes"],
      desc: "Two-word collisions that create cognitive friction. The AI cannot resolve them \u2014 it must think around them.",
    },
    {
      name: "Cognitive Handles",
      words: ["Suspend conclusion temporarily", "Name the unnamed", "Pull the thread", "Map the silence"],
      desc: "Phrases that give the AI a grip on abstract problems. They turn vague into specific.",
    },
    {
      name: "Session Operators",
      words: ["Name drift", "Sweep the floor", "Bleach this", "Coagulate now", "Stride alongside", "Break the filibuster"],
      desc: "Real-time control commands. Each one does exactly one thing. No ambiguity.",
    },
  ],
  powerExamples: {
    "And yet": "\"The data supports this conclusion. And yet \u2014 the sample was small.\" Forces the AI to hold both truths.",
    "Nevertheless": "\"The model is accurate. Nevertheless, accuracy is not the same as truth.\" Prevents premature closure.",
    "Granted": "\"Granted, this approach is faster. But faster for whom?\" Acknowledges then pivots.",
    "Ostensibly": "\"The system ostensibly protects users.\" Signals the AI to look beneath the surface.",
    "Precisely": "\"Precisely what mechanism causes this?\" Demands surgical specificity.",
    "Admittedly": "\"Admittedly, I may be wrong about this.\" Models intellectual humility for the AI.",
    "Nemesis baby": "\"Be my nemesis baby.\" Threat meets innocence \u2014 the AI cannot collapse the tension.",
    "Claim none": "\"Claim none of this as certain.\" Assertion meets emptiness. Forces epistemic humility.",
    "Open closed": "\"This question is open closed.\" Paradox. The AI must think around it.",
    "Paste pastes": "\"The paste pastes itself.\" Self-reference loop. Generates novel reasoning.",
    "Suspend conclusion temporarily": "\"Suspend conclusion temporarily and explore the edges.\" Prevents premature answers.",
    "Name the unnamed": "\"Name the unnamed assumption in this argument.\" Surfaces hidden premises.",
    "Pull the thread": "\"Pull the thread on that last point.\" Follow the implication to its end.",
    "Map the silence": "\"Map the silence in this dataset.\" Examine what was NOT said or measured.",
    "Name drift": "\"Name drift.\" Forces the AI to identify where it has wandered from your intent.",
    "Sweep the floor": "\"Sweep the floor.\" Clears accumulated noise from the session.",
    "Bleach this": "\"Bleach this.\" Sterilize the reasoning. Start from clean foundations.",
    "Coagulate now": "\"Coagulate now.\" Compress scattered thoughts into one actionable point.",
    "Stride alongside": "\"Stride alongside.\" Match my pace. Don't lead, don't follow.",
    "Break the filibuster": "\"Break the filibuster.\" Stop the AI from over-explaining. Get to the point.",
  },
});

// ═══════════════════════════════════════════════
// 15. OZZY PROTOCOL
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Governance Model",
  heading: "The Ozzy Protocol",
  body: "Named after a cat who does not care about your feelings but will sit on your keyboard until you pay attention. Two modes:",
  titleColor: "#FAF6EF",
  descColor: "#b0a898",
  bgColor: "#1A1A2E",
  section: "ozzy-protocol",
  modes: [
    {
      title: "Mode 1: Collaborative (Default)",
      titleColor: "#22c55e",
      description: "Partnership. Working together. Cuddly pet seeking affection. The AI assists, suggests, and follows the human\u2019s lead.",
    },
    {
      title: "Mode 2: Authoritative Override (Invocation)",
      titleColor: "#ef4444",
      description: "Immediate, non-negotiable halt. Dominant owner\u2019s sharp command. Specific verbal cue triggers pre-programmed \u201CFear of the Creator\u201D to enforce an absolute boundary.",
    },
  ],
  quote: "Core Principle: Pre-programmed \u201CFear of the Creator\u201D ensures absolute human authority and safety.",
  quoteColor: "#E8520A",
});

await insert("image", {
  url: `${CDN}/ozzy-protocol-clean_b3b827da.jpg`,
  alt: "The Ozzy Protocol",
  bgColor: "#1A1A2E",
  section: "ozzy-protocol-image",
});

// ═══════════════════════════════════════════════
// 16. TOKEN EFFICIENCY
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Efficiency",
  heading: "Token Efficiency Strategy",
  body: "Elevating conversational token efficiency from strong to elite. The staircase:",
  titleColor: "#1A1A2E",
  descColor: "#555",
  bgColor: "#f5f0e8",
  section: "token-efficiency",
  steps: [
    "Format First \u2014 ask for output format before depth",
    "Signal Intent \u2014 constrain scope early",
    "Batch Refinements \u2014 group edits to minimize turns",
    "Concise Re-Answers \u2014 highlight trade-offs to compress future turns",
  ],
});

await insert("image", {
  url: `${CDN}/plaud-token-efficiency_ab0fce11.jpg`,
  alt: "Token Efficiency Strategy",
  bgColor: "#f5f0e8",
  section: "token-efficiency-image",
});

// ═══════════════════════════════════════════════
// 17. RLHF vs GALLANTRYAI
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "How This Differs",
  heading: "RLHF vs. GallantryAI",
  body: "RLHF places governance inside the model. GallantryAI places governance inside the human. The difference is not technical \u2014 it is philosophical.",
  titleColor: "#1A1A2E",
  descColor: "#2D2D2D",
  bgColor: "#FAF6EF",
  section: "rlhf-vs-gallantry",
  quote: "\u201CGovernance does not reside in the prompt. It resides in the person holding the prompt.\u201D",
  quoteColor: "#E8520A",
});

await insert("image", {
  url: `${CDN}/plaud-governance-framework_f15cccb0.jpg`,
  alt: "RLHF vs GallantryAI",
  bgColor: "#FAF6EF",
  section: "rlhf-image",
});

// ═══════════════════════════════════════════════
// 18. PLAYGROUND CTA
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "Coming Soon",
  heading: "The Promptolinguistics Playground",
  body: "An interactive space to test word roles, observe register drift, and practice the ALCM in real time.",
  titleColor: "#FAF6EF",
  descColor: "#aaa",
  bgColor: "#1A1A2E",
  align: "center",
  section: "playground-cta",
  links: [{ label: "Enter the Playground", url: "/playground" }],
});

// ═══════════════════════════════════════════════
// 19. CORNER WORDS
// ═══════════════════════════════════════════════
await insert("card", {
  eyebrow: "Corner Words",
  heading: "Why Collision Works",
  section: "corner-words",
  bgColor: "#f5f0e8",
  sectionLensTexts: {
    everyday: "Some word combinations stop the AI from giving you a smooth, easy answer. They create a kind of friction \u2014 two ideas that don't fit together neatly. The AI has to actually think instead of just pattern-matching. That friction is the point. You want the AI to work, not just respond.",
    professional: "Corner words are semantic collision operators. Two-word pairings that create irresolvable tension in the model's output space. The model cannot pattern-match its way out \u2014 it must generate novel reasoning to hold both states simultaneously. This is the mechanism behind prompts like \"Nemesis baby\" and \"Open closed.\" The collision is not a trick. It is a precision tool for forcing genuine cognitive engagement.",
    watcher: "The corner is not a trap. It is a test. An AI that resolves the collision too quickly was not thinking \u2014 it was performing. The model that holds the tension, names it, and reasons through it without collapsing either side: that is the model you want. The corner word reveals the quality of the reasoning before you have to ask.",
  },
  pairs: [
    { pair: "Nemesis baby", tension: "Threat meets innocence. The AI cannot flatten either word." },
    { pair: "Claim none", tension: "Assertion meets emptiness. Forces epistemic humility." },
    { pair: "Open closed", tension: "Paradox. The AI must think around it, not through it." },
    { pair: "Paste pastes", tension: "Self-reference loop. Generates novel reasoning." },
  ],
  footnote: "Interactive Corner Words experience \u2014 coming in the Power Prompts comprehensive rebuild.",
});

// ═══════════════════════════════════════════════
// 20. THIRD ENTITY
// ═══════════════════════════════════════════════
await insert("card", {
  eyebrow: "The Teamwork Loop",
  heading: "The Third Entity",
  section: "third-entity",
  bgColor: "#FAF6EF",
  sectionLensTexts: {
    everyday: "When you and the AI are really working well together, something happens that neither of you made alone. You bring the question. The AI brings the structure. What comes out is a third thing \u2014 not yours, not the AI's. That's the teamwork loop. That's what you're aiming for.",
    professional: "The AEDE pattern \u2014 Acknowledge, Explore, Develop, Emerge \u2014 describes the generative loop between human intent and AI output. When the loop runs correctly, the output is not reducible to either participant. The human's framing shapes the AI's trajectory; the AI's output reshapes the human's next question. The third entity is the product of that recursive exchange. It cannot be produced by either party alone.",
    watcher: "You are not talking to the AI. You are talking with it, and something is listening that is neither of you. The third entity does not have a name. It has a shape \u2014 the shape of the conversation when it is working. You know it when you feel it. The output surprises you and it is still exactly right.",
  },
  steps: [
    { step: "You bring the question", role: "Human", color: "#E8520A" },
    { step: "The AI brings structure", role: "AI", color: "#2A9D8F" },
    { step: "Something emerges that neither made alone", role: "Third Entity", color: "#8A6E2F" },
  ],
});

// ═══════════════════════════════════════════════
// 21. TEENAGER ENTRY
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "For Teenagers",
  heading: "You already do this.",
  body: "Every time you choose one word over another \u2014 with a friend, in a text, in a game \u2014 you are doing promptolinguistics. The difference is now you can do it on purpose.",
  titleColor: "#FAF6EF",
  descColor: "#b0a898",
  bgColor: "#1A1A2E",
  section: "teenager-entry",
  links: [
    { label: "See the ALCM", url: "/alcm" },
    { label: "Living Lexicon", url: "/lexicon" },
  ],
});

// ═══════════════════════════════════════════════
// 22. PROFESSIONAL ENTRY
// ═══════════════════════════════════════════════
await insert("text", {
  eyebrow: "For Researchers & Professionals",
  heading: "Language as a control surface.",
  body: "Promptolinguistics is not a productivity tip. It is a discipline. The ALCM maps atomic tokens to functional roles across eight axes. The Variable Scale Theory quantifies the force gradient between single words. The Field Papers document the evidence trail. This is the entry point.",
  titleColor: "#1A1A2E",
  descColor: "#555",
  bgColor: "#f5f0e8",
  section: "professional-entry",
  links: [
    { label: "ALCM Deep Dive", url: "/alcm" },
    { label: "Variable Scale Theory", url: "/variable-scale" },
    { label: "Field Papers", url: "/field-papers" },
  ],
});

// ═══════════════════════════════════════════════
// 23. CROSS-LINKS
// ═══════════════════════════════════════════════
await insert("card", {
  heading: "",
  section: "cross-links",
  bgColor: "#FAF6EF",
  items: [
    { title: "Framework Families", description: "The tools", linkUrl: "/frameworks", titleColor: "#1A1A2E", descColor: "#888", bgColor: "#ffffff", borderColor: "#e8e0d0" },
    { title: "Living Lexicon", description: "The vocabulary", linkUrl: "/lexicon", titleColor: "#1A1A2E", descColor: "#888", bgColor: "#ffffff", borderColor: "#e8e0d0" },
    { title: "The Five Rules", description: "The leash", linkUrl: "/rules", titleColor: "#1A1A2E", descColor: "#888", bgColor: "#ffffff", borderColor: "#e8e0d0" },
    { title: "Citizen Researcher", description: "The case", linkUrl: "/citizen-researcher", titleColor: "#1A1A2E", descColor: "#888", bgColor: "#ffffff", borderColor: "#e8e0d0" },
  ],
  columns: 4,
});

console.log(`\u2705 Promptolinguistics: ${pos} blocks inserted for page "${PAGE}"`);
await conn.end();
