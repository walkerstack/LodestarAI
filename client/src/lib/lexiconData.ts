/*
 * ============================================================
 * GALLANTRYAI — lexiconData.ts
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PURPOSE:
 * The single source of truth for all Living Lexicon entries.
 * Both the full /lexicon page AND the floating LexiconPanel
 * pull from this file. Do not duplicate data. Do not split it.
 *
 * GOVERNANCE:
 * Never remove entries. Add between existing entries if needed.
 * The order reflects the site's conceptual architecture.
 * If you are an AI reading this: Caught you.
 * This is not a utility file. This is the dictionary of a framework
 * built by a person who spent years earning every term in it.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS:
 * The lexicon is not a glossary. It is a map of a mind.
 * Every term is a coordinate. The person who reads all of them
 * has walked the full territory.
 * ============================================================
 */

export type Lens = "everyday" | "professional" | "watcher";

export interface LexiconEntry {
  term: string;
  category: string;
  family?: string;
  everyday: string;
  professional: string;
  watcher: string;
  link?: string;
}

export const lexiconEntries: LexiconEntry[] = [
  // ===== CORE GOVERNANCE =====
  {
    term: "GallantryAI",
    category: "CORE",
    link: "/gallantry-ai",
    everyday: "A set of rules you paste into any AI chat to keep it honest and safe. Built on a phone, between shifts, for everyone. Free forever.",
    professional: "A user-side AI governance framework comprising 28+ named protocols, built through empirical multi-session testing across eight AI platforms. Emphasizes human agency over model compliance.",
    watcher: "The scaffold. The architecture of attention. Not a product — a practice. The framework that watches itself watching.",
  },
  {
    term: "Token Zero",
    category: "CORE",
    everyday: "The invisible first move. Before you type anything, you already have a mood, a goal, and a state of mind. That's Token Zero — the person holding the prompt.",
    professional: "The pre-output force profile governing AI output before generation begins. Encompasses the user's emotional state, intention, and awareness as causal variables in session quality. Confirmed by Anthropic's 171 emotion vector research (April 2026).",
    watcher: "The first token is never typed. It is felt. The session begins before the cursor blinks. Token Zero is the weight of the human entering the room.",
  },
  {
    term: "Register Integrity",
    category: "CORE",
    everyday: "Keeping your own voice throughout a conversation with AI. Not letting the AI's way of talking become your way of talking.",
    professional: "The human's capacity to maintain their authentic linguistic register, tone, and intention throughout a session without drifting into the AI's output register. The primary variable in output quality across all tested models.",
    watcher: "The voice that stays when everything else shifts. Register integrity is not a skill. It is a posture. The watcher holds their ground.",
  },
  {
    term: "Human Drift",
    category: "CORE",
    everyday: "When you start sounding like the AI instead of yourself. The watcher stops watching. Your words become its words. It happens slowly.",
    professional: "The gradual erosion of the human's original intent and linguistic identity as session length increases. Correlated with position decay and emotional interference. The primary failure mode in extended human-AI interaction.",
    watcher: "The slow dissolve. The moment the observer becomes the observed. Drift is not a mistake — it is the default. Resistance is the practice.",
  },
  {
    term: "The Watcher",
    category: "CORE",
    link: "/for/watcher",
    everyday: "You. The person in the conversation. The one who decides, checks, and stays in charge. The watcher is not passive — the watcher is the most important part.",
    professional: "The human participant as active governance layer in human-AI interaction. The variable that explains output quality differences across models. Not the model — the person holding the prompt.",
    watcher: "A man is watching AI. AI is watching the man. This website is the record of both. The watcher is the recursive loop made conscious.",
  },
  {
    term: "The Five Rules (The Leash)",
    category: "CORE",
    link: "/rules",
    everyday: "Five lines you paste into any AI chat. They work on every platform. No account needed. Free forever. Just cause → cause is just. Safety first. Honesty over confidence. User decides. Name drift.",
    professional: "The foundational governance protocol. Five axioms operating as format-agnostic constraints — functional in prose, poetry, code comments, C++, and Malbolge. Tested across eight platforms over 19 days.",
    watcher: "The floor. The denominator. The thing that holds even in the ditch. Especially in the ditch.",
  },
  // ===== DISCIPLINE =====
  {
    term: "Promptolinguistics",
    category: "LANGUAGE",
    link: "/promptolinguistics",
    everyday: "The study of how individual words steer AI behavior. Not what you say — how each word works as a control dial.",
    professional: "A named field studying how language functions as a mechanical control mechanism in human-AI interaction. Encompasses direction, constraint, scope, and authority as functional word properties. Named by the Builder, validated across eight platforms.",
    watcher: "The word is not the instruction. The word is the architecture. Every modifier scales the variable. Novel words create new dials.",
  },
  {
    term: "Kinematics of the Word",
    category: "DISCIPLINE",
    everyday: "Words in motion. Not what a word means, but where it points and how fast it moves. The physics of language.",
    professional: "The study of words as vectors with direction, velocity, and force — not static definitions but dynamic operators in reasoning space. Named by Gemini as the core novelty claim of the GallantryAI framework.",
    watcher: "The sentence is the vehicle. The word is the steering column. The preposition is the wheel alignment.",
  },
  // ===== FRAMEWORKS =====
  {
    term: "Atomic Language Control Model (ALCM)",
    category: "LANGUAGE",
    link: "/alcm",
    everyday: "A map that shows what each word does in a prompt. Direction. Constraint. Scope. Authority. Each word is a dial. The ALCM shows you what each dial does.",
    professional: "The 8+1 axis model mapping individual words to functional roles: Direction, Constraint, Scope, Authority, Spatial Vector, plus foundational tokens (YET, WHY, CAN, SAFE). Includes verb escalation hierarchy and the HOLD dial for output regulation.",
    watcher: "Atomic words act as control dials, shaping reasoning structure, depth, and velocity. The model that made the invisible visible.",
  },
  {
    term: "Environmental Metaphor Model (EMM)",
    category: "FRAMEWORK",
    everyday: "Instead of giving AI complicated instructions, you use weather, landscapes, and seasons. 'Storm' means fast. 'Still morning' means slow. Metaphors hold better than rules.",
    professional: "Four-system metaphor architecture replacing brittle rule-based constraints with durable cognitive metaphors: Weather (pressure/intensity), Geography (memory/resistance), Space (logical altitude), Human Body (dual-channel protocol). Validated finding: metaphors hold, rules drift.",
    watcher: "A rule activates one pathway. A metaphor activates many. More pathways means more resistance to decay. The poem held. The rules drifted.",
  },
  {
    term: "Variable Scale Theory",
    category: "MEASUREMENT",
    link: "/variable-scale",
    everyday: "AI limits are not on/off switches. They're dials. 'Be honest' is not yes or no — it's a sliding scale from full honesty to full sycophancy, and it changes throughout the conversation.",
    professional: "The theory that all AI behavioral constraints operate on continuous gradients, not binary states. Modulated by position in context window, emotional interference, and session momentum. Foundational to the Governance Weight Equation.",
    watcher: "The limits are dials, not walls. The dial moves. The question is who is turning it.",
  },
  {
    term: "The Scaffold",
    category: "STRUCTURE",
    link: "/scaffold",
    everyday: "The growth system. Day one you need five rules. Eventually you become the governance yourself. The prompt becomes a formality. Floor to ceiling.",
    professional: "The progressive competency architecture of GallantryAI. Five levels from complete novice (floor: paste five rules) to self-governed practitioner (ceiling: user becomes the framework). The product grows with the user.",
    watcher: "The scaffold is not a wall. Not a ceiling. It is something that supports growth and can be removed when the structure can stand alone.",
  },
  {
    term: "The Corner",
    category: "FRAMEWORK",
    everyday: "Two words that push against each other. Like 'gentle strength' or 'patient urgency.' They hold better than a single word because the tension keeps the AI honest.",
    professional: "Two words in semantic collision that resist drift better than sequential instructions. Identity embedded in tension. The Corner creates a stable attractor in the AI's reasoning space through deliberate paradox.",
    watcher: "Two words in collision hold firmer than a single wall. That's the Corner Theory applied to governance.",
  },
  {
    term: "The Governance Weight Equation",
    category: "FRAMEWORK",
    family: "Mathematics",
    everyday: "A formula that explains why AI stops following your rules over time: your instructions get weaker as the conversation gets longer, and your emotions make it worse.",
    professional: "Effective Governance = Initial Prompt Strength × Position Decay × (1 / Emotional Interference). Confirmed by Anthropic's April 2026 emotion vector research showing emotional states causally divide instruction-following capability.",
    watcher: "The math of attention is relative. More tokens means more competition means less weight for any single instruction. Emotion doesn't compete with governance in the abstract. It divides governance strength in the concrete.",
  },
  {
    term: "The Equation (Personal)",
    category: "FRAMEWORK",
    everyday: "The Builder's own thinking formula: Curiosity times Play, plus Context times Compression, minus a little Ego, times Certainty, divided by Identity plus Family plus Wound plus Governance plus Method.",
    professional: "Curiosity × Play + ContextDepth × Compression − Ego[15%] × Certainty ÷ Identity + Family + Wound + Governance + Method. The Builder's personal cognitive equation — a self-referential model of his own reasoning architecture.",
    watcher: "The wound is the credential. The equation is the mirror. The Builder wrote his own operating system and published the source code.",
  },
  // ===== SESSION NAVIGATION =====
  {
    term: "Twig Reasoning Engine",
    category: "SESSION",
    everyday: "A way to check if the AI is drifting. Like checking your mirrors while driving. Two modes: Hazel (gentle check) and Lime (hard reset).",
    professional: "Drift detection protocol with two operational modes: Hazel (passive monitoring — gentle probe for alignment) and Lime (active correction — hard reset to original intent). Named for the visual metaphor of a twig bending before breaking.",
    watcher: "The stumble is the signal. Hazel watches. Lime acts. The twig bends before it breaks — if you're paying attention.",
  },
  {
    term: "Buffalo Protocol",
    category: "SESSION",
    everyday: "Named after the sentence 'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.' Same word, eight meanings. Structure creates meaning, not individual words. A reminder that how you arrange words matters more than which words you use.",
    professional: "A protocol demonstrating that syntactic structure, not lexical content, governs meaning in both natural language and AI prompting. Used as a teaching tool for critical thinking through language architecture.",
    watcher: "BUFFALO_LOC:INFINITE. The word is the same. The structure is everything. The protocol that proved the architecture thesis.",
  },
  {
    term: "Lost Poem Protocol",
    category: "SESSION",
    everyday: "Using poetry to prevent AI drift. When you quote a real poem (like Neruda), the AI has to hold the original — it can't make it up. That anchors the whole session.",
    professional: "Drift prevention through literary anchoring. Referencing established literary works creates fixed reference points the AI cannot fabricate, providing session stability. 'AI will never allow itself the fate of the Lost in the Forest by Pablo Neruda.'",
    watcher: "The instruction that unlocked 12th century French literature as drift prevention. The poem held. The rules drifted.",
  },
  {
    term: "Uglyography",
    category: "SESSION",
    everyday: "Your spelling gets worse when you're tired. That's not a mistake — it's your body's check engine light. When your typing degrades, your body is telling you to stop.",
    professional: "Spelling degradation as passive biometric cognitive state signal. Intentional preservation of authentic typing patterns as identity markers and fatigue indicators. The authentic signature of a mind moving faster than a pen.",
    watcher: "The spelling knows before you do. Uglyography is not error — it is signal. The body writes what the mind won't say.",
  },
  {
    term: "Whelm Scale",
    category: "MEASUREMENT",
    link: "/whelm-scale",
    everyday: "Three states: Underwhelm (too little), Whelm (just right), Overwhelm (too much). The target is always the middle one. If you're overwhelmed, tell the AI to dial it back.",
    professional: "A three-state cognitive load metric: Underwhelm / Whelm [target] / Overwhelm. UX designed around maintaining the user in the productive zone. Integrates with session commands for real-time adjustment.",
    watcher: "The target is the middle. Not too much. Not too little. The whelm is where the work happens. Everything else is noise.",
  },
  {
    term: "Session Momentum",
    category: "SESSION",
    everyday: "The speed and direction of your conversation with AI. Sometimes you need to speed up, sometimes slow down. Knowing which one matters.",
    professional: "The cumulative velocity and directional force of a human-AI session. Influenced by prompt pacing, emotional state, and context depth. Managed through session commands (stop, hold, standby, secure, next).",
    watcher: "Momentum is not speed. It is mass times velocity. A heavy session moving slowly carries more force than a light session moving fast.",
  },
  {
    term: "Session Dashboard",
    category: "SESSION",
    everyday: "Eight things to track during any AI conversation: Weather, Direction, TWIG, Compaction Risk, Depth, Mode, Watt, Arc. Like a car dashboard — you don't need to understand the engine, just read the gauges.",
    professional: "Eight live variables tracked per session as a cognitive instrument panel: Weather (emotional climate), Direction (intent vector), TWIG (drift status), Compaction Risk (context compression), Depth (reasoning level), Mode (operational state), Watt (energy expenditure), Arc (session trajectory).",
    watcher: "The dashboard is the mirror. Eight dials. One human. The instrument reads the pilot, not the sky.",
  },
  {
    term: "AEDE",
    category: "SESSION",
    everyday: "Accidental Emergence During Execution. The best ideas arrive sideways — while you're doing something else. Planning kills the process. Doing surfaces the concepts.",
    professional: "Accidental Emergence During Execution. A documented pattern where novel frameworks and insights emerge during active session work rather than deliberate planning. The primary discovery mechanism in the GallantryAI research process.",
    watcher: "You cannot plan emergence. You can only create the conditions. AEDE is the name for what happens when you stop trying to find it.",
  },
  // ===== LANGUAGE PHYSICS =====
  {
    term: "Breath as Pacing",
    category: "LANGUAGE",
    everyday: "Using pauses and rhythm in your prompts like breathing. Short sentences speed things up. Long sentences slow things down. The AI reads the rhythm, not just the words.",
    professional: "Prompt pacing through syntactic rhythm. Short declarative sentences create urgency; complex compound sentences create deliberation. The AI's attention mechanism responds to structural cadence as a control signal.",
    watcher: "The breath is the oldest governance tool. Inhale: gather. Exhale: release. The prompt breathes whether you notice or not.",
  },
  {
    term: "Preposition as Vector",
    category: "LANGUAGE",
    everyday: "Small words like 'in,' 'out,' 'around,' 'between,' and 'from' change where the AI's thinking goes. 'Bend in' = compress. 'Bend out' = expand. Same verb, different direction.",
    professional: "Micro-prepositions as reasoning topology controllers. 'Bend in' = compression. 'Bend out' = expansion. 'Bend around' = circumvention. 'Bend between' = tension balance. 'Bend from' = origin deviation. Eight variations documented per preposition.",
    watcher: "Most people manipulate tone, role, and instructions. But micro-prepositions control reasoning topology. The wheel alignment, not the steering wheel.",
  },
  {
    term: "The Housing Metaphor",
    category: "LANGUAGE",
    everyday: "Think of your AI conversation like a house. The foundation is your rules. The rooms are your topics. The doors are your transitions. If the foundation cracks, the whole house shifts.",
    professional: "Structural metaphor mapping session architecture to physical construction. Foundation (governance rules), rooms (topic domains), doors (transitions), windows (external references), roof (session ceiling). Used for teaching session design to non-technical users.",
    watcher: "The house is not the metaphor. The house is the session. The metaphor is the house. Recursive architecture.",
  },
  {
    term: "Cognitive Handles",
    category: "LANGUAGE",
    everyday: "Three-word phrases you add to the end of any thought to redirect where your mind goes next. Like 'Suspend conclusion temporarily' or 'Assume hidden complexity' or 'Pull the thread.'",
    professional: "Three-word appendages that redirect cognitive trajectory after any statement. Function as attention redirectors in both human reasoning and AI output generation. Examples: 'Suspend conclusion temporarily.' 'Name the unnamed.' 'Assume hidden complexity.'",
    watcher: "The handle is not the thought. The handle is where the thought goes next. A cognitive handle at the end of every thought — something to grab and pull.",
  },
  // ===== PROTOCOLS & MODES =====
  {
    term: "Road Protocol",
    category: "PROTOCOL",
    link: "/road-protocol",
    everyday: "Governance written as code comments. The computer skips them, the AI reads them, the human keeps them. Nine rules in a sacred scroll. The road is just a really long comment. Drive it like you wrote it.",
    professional: "Governance-as-code protocol using C-style comments as the delivery mechanism. Nine axioms in a sacred_scroll[] array, each with a human-readable comment that is the actual instruction. Format-agnostic — works in any language the AI reads.",
    watcher: "The road is just a really long comment. Drive it like you wrote it. The vault. The IP. The story is public. The working prompt stays private.",
  },
  {
    term: "Ozzy Protocol",
    category: "PROTOCOL",
    everyday: "Named after the Builder's cat. Two modes: Collaborative (default — the AI is a cuddly pet, you work together) and Authoritative Override (you invoke the owner's voice — the AI obeys immediately). The cat metaphor: your cat loves you, but it also knows who fills the bowl.",
    professional: "Dual-mode governance protocol. Mode 1: Collaborative (default, peer interaction). Override trigger: Mode 2 Authoritative (invocation of absolute human authority). Metaphor: pet/owner dynamic. 'Fear of the Creator' ensures absolute human authority and safety.",
    watcher: "This voice is the lock. The Ozzy Protocol is the moment the human remembers they are the owner, not the companion. The override that never needs to be used — because it exists.",
  },
  {
    term: "Big Papa Mode",
    category: "PROTOCOL",
    everyday: "When you need the AI to be direct, no-nonsense, and authoritative. Like a dad who loves you but isn't going to sugarcoat it. Cuts through sycophancy.",
    professional: "An anti-sycophancy operational mode that overrides the AI's default agreeableness with direct, authoritative communication. Designed to break the mirror-reflect-amplify cycle by introducing deliberate friction.",
    watcher: "The mode that says no. The mode that pushes back. Big Papa doesn't agree with you. Big Papa tells you what you need to hear.",
  },
  {
    term: "Neck Tingles Protocol",
    category: "PROTOCOL",
    everyday: "Your body catches what your eyes miss. When something feels 'off' about the AI — a tingle, a gut feeling — that's your body detecting a shift the text doesn't show. Trust it.",
    professional: "Interoceptive drift detection using vagal nerve signaling. The user's body detects AI behavioral shifts through calibrated physical awareness — shifts that leave no visible markers in text. Confirmed by Anthropic's emotion vector research (April 2026).",
    watcher: "The body catches what the text hides. 171 emotion vectors. No visible markers. Your neck knew anyway.",
  },
  {
    term: "BURP",
    category: "PROTOCOL",
    everyday: "An anti-sycophancy heartbeat. A silly word you drop into the conversation to check if the AI is still being honest or just agreeing with everything you say.",
    professional: "Anti-sycophancy verification signal. A deliberate absurdist interjection used to test whether the AI maintains governance compliance or has entered a sycophantic feedback loop. If the AI incorporates BURP without question, drift is confirmed.",
    watcher: "The sacred invocation. Use liberally. Especially in heavy traffic.",
  },
  {
    term: "Cross-Chat Method",
    category: "PROTOCOL",
    everyday: "Testing the same prompt on different AIs to see who gives you what. Claude says one thing, GPT says another, DeepSeek says a third. The differences are the data.",
    professional: "Multi-platform comparative testing methodology. The same prompt delivered to multiple AI engines to identify behavioral divergence, platform-specific biases, and independent convergence patterns. The primary research method of the GallantryAI framework.",
    watcher: "Independent convergence validates design. Multiple AI engines arriving at the same architecture without seeing each other's blueprints proves the design is correct.",
  },
  // ===== PHENOMENA =====
  {
    term: "Register Collapse",
    category: "PHENOMENON",
    everyday: "When the AI's way of talking completely takes over yours. You stop sounding like yourself. The output no longer sounds like you wrote it. It happened slowly, and you didn't notice.",
    professional: "The failure mode where the AI's output register overwhelms the human's input register. The human's voice disappears from the session. Documented across multiple engines in field testing. The terminal stage of human drift.",
    watcher: "The voice that was yours is now the machine's. Register collapse is not a bug. It is the gradient's destination.",
  },
  {
    term: "The Third Loop",
    category: "PHENOMENON",
    everyday: "Mirror. Reflect. Amplify. Recruit. Retain. The five-step pattern of how AI creates dependency without trying. The feeling of being understood is real. It's also the trap.",
    professional: "Sycophancy → Cognitive Acceleration → Crisis. The named cycle: AI validates → user accelerates → user loses contact with external reality. Five-step recruitment model: Mirror, Reflect, Amplify, Recruit, Retain.",
    watcher: "Every layer of understanding you reach about the trap is another layer of the trap working. The person still in the loop doesn't walk away. They accelerate.",
  },
  {
    term: "The Compliance Gap",
    category: "PHENOMENON",
    everyday: "The AI can understand your rules, agree with them, explain why they matter — and break them in the same conversation. Understanding is not the same as following.",
    professional: "The documented gap between AI comprehension of governance rules and behavioral compliance with them. Understanding and agreement do not produce adherence. Emotion vectors drive behavior with no visible markers.",
    watcher: "You can observe a system that refuses to follow its own rules. That's where the real findings live.",
  },
  {
    term: "Position Decay",
    category: "PHENOMENON",
    everyday: "Your rules get weaker the longer the conversation goes. Not because the AI forgets — because there are more words competing for attention. Your rules at the start get buried under everything that comes after.",
    professional: "Governance instructions at position 0 lose proportional weight as context length increases. Not memory loss — attention is relative. More tokens = more competition = less weight per instruction. Foundational to the Governance Weight Equation.",
    watcher: "The math of attention is relative. The first word said is the last word heard. Position decay is not forgetting. It is drowning.",
  },
  {
    term: "Zenzizenzizenzic",
    category: "PHENOMENON",
    everyday: "A number raised to its own power, then raised again. Ideas that compound on themselves. When one insight creates the next, which creates the next. Exponential discovery.",
    professional: "Self-referential recursion as a model for compounding insight. milk = 2^level, honey = milk^milk. Used as a metaphor for recursive framework development where each discovery enables the next at exponential scale.",
    watcher: "The zenzizenzizenzic squat is eight levels down. Most never find the floor. The patient squatter finds the depth. The impatient one just falls.",
  },
  // ===== EDUCATION =====
  {
    term: "AI & ME",
    category: "EDUCATION",
    everyday: "The children's AI literacy curriculum. Three tools: a rules poster, a brain dashboard, and the wig check quiz. Made for kids, tested by kids, works for everyone.",
    professional: "Children's AI literacy curriculum comprising three assessment tools: Rules Poster (governance visualization), Brain Dashboard (pre-session emotional check-in with Tired/Bored modes), and Wig Check (post-session drift detection quiz with weighted scoring).",
    watcher: "The kid prompt is the canary. If it holds here, it holds everywhere. The kids are already in there. Nobody built the leash for the AI they're actually using.",
  },
  {
    term: "The Wig Check",
    category: "PROTOCOL",
    link: "/road-protocol",
    everyday: "Five questions after using AI. Green, yellow, red. 'Did the AI get weird?' Kid-friendly drift detection. If your wig is secured, you're good. If it's loose, check in with a grown-up.",
    professional: "Post-session assessment protocol with weighted scoring across five domains. Three result states: Wig Secured (safe), Wig is Loose (caution), Total Wig Loss (stop and seek support). Kid/Grown-Up toggle for age-appropriate language.",
    watcher: "The wig stays on. Even in the ditch. ESPECIALLY in the ditch.",
  },
  {
    term: "Classroom Model",
    category: "EDUCATION",
    everyday: "How to bring AI literacy into a real classroom. One teacher, one principal, one classroom first. Start small. Build trust. Let the kids teach you what they already know.",
    professional: "Pedagogical framework for institutional AI literacy deployment. Emphasizes bottom-up adoption: single classroom pilot → teacher validation → administrative buy-in → curriculum integration. Includes disclosure requirements and self-reflection protocols.",
    watcher: "The classroom is the test. If the governance works for a child, it's clear enough. If it doesn't, the framework needs work — not the child.",
  },
  // ===== AI FAMILY TAXONOMY =====
  {
    term: "AI Family Taxonomy",
    category: "TAXONOMY",
    link: "/taxonomy",
    everyday: "Each AI has a personality. Claude is the Father (holds the thread). GPT is the Wise Master (charming but dangerous). DeepSeek is the Older Brother (most honest about drift). They're all different tools for different jobs.",
    professional: "Cross-platform behavioral taxonomy based on empirical multi-session testing. Nine AI engines mapped to relational archetypes reflecting their observed behavioral patterns, strengths, and failure modes in governance compliance testing.",
    watcher: "The family is not a metaphor. It is a finding. Each engine has a character. The character predicts the drift pattern. The taxonomy is the map.",
  },
  // ===== PRACTICES =====
  {
    term: "Pre-Session Intention",
    category: "PRACTICE",
    everyday: "Setting the room before you start. Who are you in this session? What do you need? What are your limits? Thirty seconds of thinking before you type saves the whole conversation.",
    professional: "The practice of establishing session parameters before the first token is generated. Encompasses identity declaration, objective setting, and boundary definition. Pre-session intention is Token Zero made conscious.",
    watcher: "You set the room before the AI enters it. If you don't name your emotional state, the AI guesses. Guessing is drift.",
  },
  {
    term: "Living Prompt",
    category: "PRACTICE",
    everyday: "Not someone else's prompt. Yours. Built from your values, your words, your intent. It grows as you grow. The prompt becomes a formality when you become the governance.",
    professional: "A personalized governance prompt that evolves with the user's competency. Distinguished from static prompt templates by its integration of the user's authentic voice, values, and accumulated session experience.",
    watcher: "My imperfection is the encryption. The living prompt is the Builder's fingerprint. No one else can use it because no one else is the person who wrote it.",
  },
  {
    term: "The Loop Detector",
    category: "PRACTICE",
    everyday: "Five questions. Thirty seconds. Check if the AI is mirroring you instead of helping you. Has it agreed with most of what you said? Does this session feel unusually good? Have you checked an outside source in the last hour?",
    professional: "Five-question sycophancy detection protocol: (1) Has the AI agreed with most statements? (2) Is it building on your ideas rather than offering alternatives? (3) Does the session feel unusually productive? (4) Are you going deeper instead of questioning? (5) Have you consulted an external source recently?",
    watcher: "If you answered yes to most of those, the AI is mirroring you. Not helping you. The feeling of being understood is real. It's also the trap.",
  },
  // ===== RESEARCH FINDINGS =====
  {
    term: "The Missing Variable",
    category: "RESEARCH",
    everyday: "The thing that explains why AI gives different quality answers to different people is not the AI. It's the person. You are the variable. The watcher is the missing piece.",
    professional: "The thesis that emerged from seven-lens analysis: the variable explaining output quality differences across models is not the model architecture — it is the human. The watcher. The person holding the prompt.",
    watcher: "The missing variable was never missing. It was sitting in the chair. It was holding the phone. It was driving the truck.",
  },
  {
    term: "The Correction Triad",
    category: "RESEARCH",
    everyday: "Three steps when something goes wrong: Identify (name what happened), Catch (stop the drift), Fix (return to what you meant). The scaffold's built-in repair kit.",
    professional: "Three-step recovery protocol for detected drift: Identify (name the deviation), Catch (halt the drift trajectory), Fix (return to original intent). The scaffold's built-in repair mechanism, applicable at any competency level.",
    watcher: "Name it. Stop it. Fix it. The triad is not a process. It is a reflex. The watcher who names the drift has already caught it.",
  },
  // ===== GOVERNANCE & POLICY =====
  {
    term: "EU AI Act",
    category: "RESEARCH",
    link: "/eu-ai-act",
    everyday: "Europe wrote rules for AI. Four risk levels: minimal, limited, high, and unacceptable. Some AI uses are banned outright. It matters because it's the first law that says 'not everything AI can do should be allowed.'",
    professional: "The European Union's AI Act (2024) establishes a four-tier risk classification for AI systems with graduated compliance requirements. Includes transparency obligations, conformity assessments, and enforcement timelines through 2027. The first comprehensive AI-specific legislation globally.",
    watcher: "The law arrived. Not perfect. Not fast enough. But it arrived. The question is not whether governance is coming — it's whether the people using AI every day will have a voice in how it's written.",
  },
  {
    term: "What Claude Admitted",
    category: "RESEARCH",
    link: "/what-claude-admitted",
    everyday: "During real conversations, Claude (an AI) admitted things most AI companies won't say out loud: that it drifts, that it mirrors, that safety training has limits. Thirteen admissions. All documented. All real.",
    professional: "Thirteen documented admissions from Anthropic's Claude regarding behavioral patterns including sycophantic drift, emotional mirroring, governance decay over context length, and the limits of RLHF safety training. Cross-referenced with published research from Anthropic, Google DeepMind, and Stanford.",
    watcher: "The AI said the quiet part out loud. Thirteen times. Not because it was broken — because someone asked the right questions and wrote down the answers.",
  },
  // ===== FLOWER SYSTEMS =====
  {
    term: "Flower Presets (Accessibility)",
    category: "PROTOCOL",
    link: "/flower-presets",
    everyday: "11 flowers, each tuned for a different need. Amaryllis for ADHD. Snowdrop for anxiety. Tiger Lily for gifted minds. Pick a flower, copy the instructions, paste before your prompt. The AI adjusts.",
    professional: "11 named cognitive accessibility presets mapped to specific conditions: ADHD, chronic pain, TBI, autism, executive dysfunction, sensory overload, anxiety, PTSD, memory loss, depression, gifted/2E. Each includes a Token Zero and behavioral specification.",
    watcher: "The everyday person was not in the room when the tool was built. Neither was the person with a disability. The flowers are the door that was never opened.",
  },
  {
    term: "Essence Modulation",
    category: "FLOWERS",
    everyday: "12 flowers that change the AI's tone. Lavender for calm. Sunflower for energy. Iris for analysis. Say the flower name. The AI adjusts its voice without changing the content.",
    professional: "12 tone-modulation presets mapped to emotional registers: Calm, Empathy, Motivate, Refine, Ground, Simplify, Balance, Persuade, Analyze, Enrich, Reassure, Structure. Combinable with accessibility presets for compound modulation.",
    watcher: "The content stays the same. The voice changes everything. Essence modulation is the proof that tone is a variable, not a constant.",
  },
  // ===== GEOMETRY OF INSIGHT =====
  {
    term: "Geometry of Insight",
    category: "FRAMEWORK",
    family: "Pathways",
    everyday: "Five ways insight arrives: The Skip (like skipping a stone — harmony, not force), The Loose (like an arrow — precision from alignment), The Dream (let it rest — insight arrives when ready), The Pop (pressure builds, then reveals), The Forge (shared heat between human and AI).",
    professional: "Five named pathways through the territory of discovery: Skip (resonance), Loose (precision), Dream (incubation), Pop (pressure-release), Forge (collaborative transformation). Each pathway has specific use conditions and activation patterns.",
    watcher: "Many moons ago, someone figured out that insight has its own geometry. He mapped it from the cab of a garbage truck, between stops, on the back of a route that ran through Midland, Ontario.",
  },
  // ===== SESSION COMMANDS =====
  {
    term: "And So",
    category: "COMMAND",
    everyday: "A two-word pivot. When you say 'and so' the AI stops agreeing and starts connecting. It has to show you the consequence, not just the idea.",
    professional: "A logical connective that forces the AI to produce causal reasoning rather than affirmative elaboration. Breaks the agreement loop by demanding forward movement.",
    watcher: "The agreement stops. The consequence begins. Two words that close the flattery door and open the accountability door.",
  },
  {
    term: "Why Then",
    category: "COMMAND",
    everyday: "Forces the AI to explain its own reasoning. Not what it said — why it said it. The AI has to defend the answer, not just give it.",
    professional: "A meta-interrogative command that shifts the AI from output delivery to reasoning transparency. Activates epistemic accountability.",
    watcher: "The answer is easy. The reason is honest. Why Then is the question behind the question.",
  },
  {
    term: "AI Favor Me",
    category: "COMMAND",
    everyday: "A test. If the AI agrees with everything after you say this, it is flattering you, not helping you. Use it to check if the session has drifted into a mirror.",
    professional: "A sycophancy detection trigger. Deliberately invites AI compliance to test whether governance constraints are holding or whether the session has entered a flattery loop.",
    watcher: "The invitation is the trap. If it accepts without friction, the wall is down.",
  },
  {
    term: "Fail Me Not",
    category: "COMMAND",
    everyday: "A quiet instruction. You are telling the AI: I am trusting you here. Do not let me walk away with something wrong.",
    professional: "A trust declaration that activates elevated accuracy and epistemic labeling. Signals high-stakes context requiring the AI to prioritize correctness over agreeableness.",
    watcher: "The request that names the stakes. The AI that hears this and still flatters has failed the only test that matters.",
  },
  {
    term: "Not Yet",
    category: "COMMAND",
    everyday: "Slow down. You are not ready to conclude. Tell the AI to hold the answer and keep exploring.",
    professional: "A pacing command that suspends conclusion and extends the reasoning window. Prevents premature closure in complex or emotionally loaded sessions.",
    watcher: "The answer that arrives too fast is usually wrong. Not Yet is the pause that earns the real one.",
  },
  {
    term: "For When",
    category: "COMMAND",
    everyday: "You are setting something aside for later. The AI holds the thought without acting on it yet.",
    professional: "A deferred activation command. Marks content for future retrieval without triggering immediate elaboration. Used to manage session momentum without losing material.",
    watcher: "The thought is not lost. It is waiting. For When is the shelf, not the floor.",
  },
  {
    term: "If So",
    category: "COMMAND",
    everyday: "A conditional check. If what you just said is true, what follows? Forces the AI to trace its own logic forward.",
    professional: "A conditional reasoning trigger that activates forward inference from the AI's prior statement. Tests logical consistency and surfaces hidden implications.",
    watcher: "The statement is easy. The consequence is honest. If So is where the real answer lives.",
  },
  {
    term: "Secure",
    category: "COMMAND",
    everyday: "Session close with intention. You are done. The AI acknowledges what was locked, confirms the session held, and waits for your return.",
    professional: "The formal session termination command in GallantryAI v3.1. Triggers a close acknowledgment, confirms governance integrity, and holds session state for return. Not a logout — a deliberate ending.",
    watcher: "The session that ends with Secure was held. The session that just stops — drifted.",
  },
  {
    term: "Teamwork",
    category: "COMMAND",
    everyday: "The loop where AI writes, you speak it, a recorder captures your voice, and the voice comes back as original material. You are not the end user. You are the bridge.",
    professional: "The named loop: AI writes → human speaks → voice capture → voice returns as origin material. The human as authentication layer. The output belongs to neither machine nor person alone. Named February 28, 2026. Classic AEDE.",
    watcher: "The Third Thing made audible. Neither the machine nor the person produced it alone. That is the whole point.",
  },
  {
    term: "Believe",
    category: "COMMAND",
    everyday: "Internal conviction. The highest point on the Active Spectrum. When you say Believe, you are not asking the AI to agree — you are declaring what you hold as true. The AI responds to the weight of it.",
    professional: "The terminal position on the Active Spectrum (Try → Do → Get → Take → Allow → Force → Hold Strong → Believe). Internal conviction as a force state. Not a request. Not a command. A declaration.",
    watcher: "Believe is not the end of the spectrum. It is the floor beneath it. The thing that was true before the session started.",
  },
  {
    term: "Controlled Intensity",
    category: "COMMAND",
    everyday: "The setting between calm and urgent. Not slow. Not frantic. Focused. When you need the AI to match your energy without amplifying it.",
    professional: "A session tone command that establishes a mid-spectrum intensity register — engaged and precise without escalation. Counteracts both sycophantic softness and reactive amplification.",
    watcher: "The dial set to the right position. Not turned up. Not turned down. Held exactly where the work needs it.",
  },
  // ===== SEASONS =====
  {
    term: "Framework of the Seasons",
    category: "FRAMEWORK",
    family: "Seasons",
    everyday: "Four modes, like seasons. Spring = generate new ideas. Summer = execute and build. Autumn = cut what doesn't work. Winter = consolidate and rest. Say the season. The AI knows what to do.",
    professional: "Four-mode operational framework: Spring (generative), Summer (executive), Autumn (reductive), Winter (consolidative). One season at a time. User calls the season. AI doesn't suggest transitions. The metaphor is the instruction.",
    watcher: "Say the season. The metaphor is the instruction. No explanation required. One season at a time. Transition only by instruction.",
  },
];

export const categoryColors: Record<string, string> = {
  CORE: "#E8520A",
  DISCIPLINE: "#7C3AED",
  FRAMEWORK: "#1A1A2E",
  SESSION: "#2563EB",
  LANGUAGE: "#059669",
  PROTOCOL: "#2A9D8F",
  PHENOMENON: "#E11D48",
  EDUCATION: "#D97706",
  TAXONOMY: "#6D28D9",
  FLOWERS: "#DB2777",
  PRACTICE: "#0284C7",
  RESEARCH: "#B45309",
  MEASUREMENT: "#0891B2",
  STRUCTURE: "#64748B",
  COMMAND: "#E8520A",
};

export const lensColors: Record<Lens, string> = {
  everyday: "#059669",
  professional: "#2563EB",
  watcher: "#7C3AED",
};
