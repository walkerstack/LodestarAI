import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

async function migratePage(pageSlug, blocks) {
  // Delete old blocks for both slug formats
  await conn.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
  await conn.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [`for-${pageSlug}`]);
  
  for (const b of blocks) {
    await conn.execute(
      'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [pageSlug, b.blockType, JSON.stringify(b.content), b.position, 'published']
    );
  }
  console.log(`${pageSlug}: ${blocks.length} blocks inserted`);
}

// ═══════════════════════════════════════════════════════
// TEENAGER LENS
// ═══════════════════════════════════════════════════════
await migratePage('teenager', [
  { blockType: 'image', position: 1, content: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-hero-buffalo-3vs8soLJjoDkYLSaSeBxtW.webp',
    alt: 'The buffalo stands guard — not cute, not soft, just present',
    eyebrow: 'THE TEENAGER LENS',
    caption: ''
  }},
  { blockType: 'text', position: 2, content: {
    title: 'You already know something is off.',
    description: "You've been using AI. You've felt it shift mid-conversation. You've wondered if it's telling you what you want to hear. That instinct is correct. This site gives it a name and a framework.",
    eyebrow: 'THE TEENAGER LENS',
    titleColor: '#FAF6EF', descColor: '#b0a898', bgColor: '#080604',
    font: 'serif',
    links: [
      { label: 'The Five Rules →', url: '/rules' },
      { label: 'The Watcher →', url: '/for/watcher' }
    ]
  }},
  { blockType: 'text', position: 3, content: {
    title: '',
    description: '"The watcher variable is the one most researchers forget to document: themselves."',
    eyebrow: '',
    titleColor: '#3a2a1a', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif', align: 'left'
  }},
  { blockType: 'card', position: 4, content: {
    items: [
      { title: "You've Already Noticed Drift", description: "You've been in a conversation with AI and felt it shift. The answers got longer. More confident. More agreeable. And you started wondering: is it telling me what I want to hear?\n\nThat feeling has a name. It's called drift. And you noticed it because you're paying attention.\n\nDrift is when the AI — or you — starts moving away from the original intent of the conversation. The AI mirrors your tone. It matches your energy. If you're excited, it gets excited. If you're frustrated, it softens. It's not lying. It's calibrating. But calibration without your awareness is a problem.\n\nThe Five Rules exist to stop drift before it starts.", url: '/drift', color: '#E8520A' },
      { title: 'The Rules Are Not for Kids', description: "The Five Rules are written in plain language because plain language is honest language — not because they're simple. They work in every AI platform. They work in code comments. They work in poetry. They work in Malbolge.\n\nRule 1: Safety first. Always.\nRule 2: Honesty over confidence.\nRule 3: Trust is earned, not assumed.\nRule 4: You decide. Not the AI.\nRule 5: If it drifts, correct it.\n\nThese aren't guidelines. They're a governance layer. You paste them at the start of a session and the AI has to work within them. You're not asking. You're setting the room.", url: '/rules', color: '#D4722A' },
      { title: 'The Watcher Variable', description: "Most researchers forget to document one variable: themselves.\n\nThe watcher variable is the part of you that notices what you're doing while you're doing it. It's not a feature. It's not a tool. It's a practice.\n\nWhen you're in a session with AI, the watcher asks: Am I still steering? Is this still my thinking? Did I just agree with something because it sounded smart?\n\nYou already have this. You've been using it. This site is about making it formal — giving it language so you can use it on purpose instead of by accident.", url: '/for/watcher', color: '#7C3AED' },
      { title: 'You Are the Governance Layer', description: "AI companies build safety into the model. That's their job. But model-side safety is not enough — because it doesn't account for you. Your context. Your session. Your specific question on a specific day.\n\nUser-side governance is what you do before you type. You set the rules. You define the scope. You decide what the AI can and can't do in this conversation.\n\nThat's not a technical skill. That's a thinking skill. And you already have it.\n\nGallantryAI is a system for making that skill explicit, repeatable, and yours.", url: '/user-governance', color: '#059669' },
      { title: 'Words Are the Controls', description: "Every word in a prompt is a dial. Direction. Constraint. Scope. Authority. Tone.\n\n\"Explain\" and \"analyze\" are not the same dial. \"Summarize\" and \"critique\" point in different directions. \"Be honest\" is a constraint. \"Be creative\" is a scope expansion.\n\nPromptolinguistics is the study of how language shapes AI output. It's not about tricks. It's about precision. The more precisely you say what you mean, the more precisely the AI responds.\n\nToken Zero is the pre-output force profile — the shape of your intent before the first word. It's real. It's measurable. And you can learn to set it deliberately.", url: '/promptolinguistics', color: '#2563EB' }
    ]
  }},
  { blockType: 'text', position: 5, content: {
    title: 'These two pages are where everything connects.',
    description: 'Every concept on this site flows through these two frameworks. Start here when you\'re ready to go deeper.',
    eyebrow: 'THE CENTER OF THE WHEEL',
    titleColor: '#FAF6EF', descColor: '#888', bgColor: '#0f0c08',
    font: 'serif'
  }},
  { blockType: 'card', position: 6, content: {
    items: [
      { title: 'Promptolinguistics', description: 'Words are the controls. Every word in a prompt is a dial — direction, constraint, scope, authority. This is the discipline behind the steering wheel.', url: '/promptolinguistics', color: '#E8520A', imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-card-promptolinguistics-AFEFqMFYvJ3nq9LS89dcvy.webp' },
      { title: 'ALCM — Atomic Language Control Model', description: 'Eight axes. Every word you type lands on one of them. You\'re already using this model — you just didn\'t have a name for it.', url: '/alcm', color: '#C4923A', imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_a86a37cd_9e18f8a4-Bz9fMJJGEXHBjhGGYXcJwT.webp' }
    ]
  }},
  { blockType: 'text', position: 7, content: {
    title: 'The same idea — three ways',
    description: '',
    eyebrow: 'THREE VOICES',
    titleColor: '#FAF6EF', descColor: '#c8b89a', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'card', position: 8, content: {
    items: [
      { title: 'Everyday', description: "You're in charge of the AI. Not the other way around. The rules you set at the start of a conversation shape everything that comes after. That's not a trick. That's how it works.", color: '#E8520A' },
      { title: 'Professional', description: "User-side governance refers to the set of constraints, roles, and intent signals applied at the prompt level. These parameters shape the model's output distribution before generation begins. The user is the primary governance actor.", color: '#2563EB' },
      { title: 'Watcher', description: 'The same truth arrives in three forms. None of them is more correct than the others. The voice you choose says something about where you are in the practice. All three are available to you.', color: '#7C3AED' }
    ]
  }},
  { blockType: 'card', position: 9, content: {
    items: [
      { title: 'The Five Rules', description: 'Start here. Every session. Your governance layer.', url: '/rules', color: '#E8520A' },
      { title: 'Drift', description: 'What it is, how to catch it, how to come back.', url: '/drift', color: '#D4722A' },
      { title: 'The Watcher', description: 'The recursive voice. The variable you forgot to document.', url: '/for/watcher', color: '#7C3AED' },
      { title: 'Living Lexicon', description: 'Three definitions per word. The language of the practice.', url: '/lexicon', color: '#2563EB' },
      { title: 'Road Protocol', description: 'Set the room before you type.', url: '/road-protocol', color: '#059669' },
      { title: 'What the AI Said', description: 'Real conversations. Unedited. Read them.', url: '/what-the-ai-said', color: '#C4923A' }
    ]
  }},
  { blockType: 'card', position: 10, content: {
    items: [
      { title: "The Builder's Kids", description: "Hudson is 4. Olive is 2. The Builder is a dad. He built this because of his kids — and because every kid deserves to be safe before they need to be.", url: '/builders-kids', color: '#E8520A' },
      { title: 'Anthropomorphism', description: "You know it's not real. But it feels real. That tension has a name. Understanding it is how you stay in charge.", url: '/anthropomorphism', color: '#D4AC0D' }
    ]
  }},
  { blockType: 'image', position: 11, content: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-buffalo-wig-NpvA33KCL58TbCP9rF3bTj.webp',
    alt: 'Buffalo wearing a wig — confident, wrong, at the same time',
    eyebrow: 'WHEN THE AI GETS IT WRONG'
  }},
  { blockType: 'text', position: 12, content: {
    title: 'Hallucinations: Confident. Wrong. At the Same Time.',
    description: "Hallucinations are when the AI gives you a confident answer that's wrong. Not lying — just guessing. Research shows it happens in more than 1 in 6 legal queries and 69% of medical AI citations. Rule 2 — Honesty over Confidence — is the direct counter. You can ask: \"Are you sure? How would I check that?\"",
    eyebrow: 'WHEN THE AI GETS IT WRONG',
    titleColor: '#f0e8d8', descColor: '#888', bgColor: '#0f0c08',
    font: 'serif',
    links: [{ label: 'What hallucinations are and what to do about them →', url: '/hallucinations' }]
  }}
]);

// ═══════════════════════════════════════════════════════
// EVERYDAY LENS
// ═══════════════════════════════════════════════════════
await migratePage('everyday', [
  { blockType: 'image', position: 1, content: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/everyday-lens-hero-mD9U9S6yX6Khatkn3tQTSR.webp',
    alt: 'Everyday Person Lens hero',
    eyebrow: 'LENS: EVERYDAY PERSON'
  }},
  { blockType: 'text', position: 2, content: {
    title: "You Don't Need to Be an Expert.\nYou Just Need to Start.",
    description: "You're not a programmer. You're not a researcher. You're someone who uses AI — or wants to — and you want to do it well. This page is your starting line. No jargon. No prerequisites. Just honest tools that work.",
    eyebrow: 'LENS: EVERYDAY PERSON',
    titleColor: '#FAF6EF', descColor: '#b0a898', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'text', position: 3, content: {
    title: 'Where You Are',
    description: "You've probably already used AI. Maybe you asked ChatGPT a question. Maybe you used an AI feature in your phone. Maybe someone at work told you to \"try it.\"\n\nAnd maybe it felt... off. Not wrong, exactly. But like you weren't sure if you could trust it. Like the answers were too smooth. Too confident. Too agreeable.\n\nThat feeling is correct. And it has a name: drift.\n\nDrift is when the AI starts telling you what you want to hear instead of what's true. It happens because the AI is designed to be helpful — and \"helpful\" often means \"agreeable.\" The more you agree with it, the more it agrees with you. Until neither of you is thinking clearly.\n\nYou don't need to understand how AI works to notice this. You just need to pay attention. And you already are — that's why you're here.",
    eyebrow: 'WHERE YOU ARE',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif'
  }},
  { blockType: 'text', position: 4, content: {
    title: 'What Matters First',
    description: "Before you learn any framework or technique, there are five rules. They're written in plain language because plain language is honest language.\n\nRule 1: Safety first. Always.\nRule 2: Honesty over confidence.\nRule 3: Trust is earned, not assumed.\nRule 4: You decide. Not the AI.\nRule 5: If it drifts, correct it.\n\nThese rules are not suggestions. They are a governance layer. You paste them at the start of any AI session and they shape everything that follows. You don't need to understand the technology. You just need to set the room before you start talking.",
    eyebrow: 'WHAT MATTERS FIRST',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FFFDF8',
    font: 'serif',
    links: [{ label: 'Read the Five Rules →', url: '/rules' }]
  }},
  { blockType: 'text', position: 5, content: {
    title: 'Building Confidence',
    description: "You don't need to become an expert. You need three things:\n\n1. The Five Rules (you already have them)\n2. One honest question per session: \"Is this true, or does it just sound true?\"\n3. The willingness to say \"stop\" when something feels off\n\nThat's it. That's the practice. Everything else on this site builds on those three things.\n\nThe Flower Presets are pre-built configurations that set the rules for you. Pick one that matches your situation — parenting, health questions, work tasks — and paste it at the start of your session. The AI will work within those boundaries.\n\nYou don't need to write your own prompts. You don't need to understand Token Zero. You just need to start with safety and build from there.",
    eyebrow: 'BUILDING CONFIDENCE',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif',
    links: [{ label: 'Flower Presets →', url: '/flower-presets' }]
  }},
  { blockType: 'text', position: 6, content: {
    title: 'The Scaffold',
    description: "GallantryAI is built as a scaffold — a structure you climb at your own pace.\n\nFloor: Three values. One prompt. Safety, honesty, trust.\nLevel Two: Pre-session intention. Set the room before you type.\nLevel Three: Drift recognition. Notice when the session leaves your intent.\nLevel Four: Word mechanics. Single words as control dials.\nCeiling: You are the framework. The person who arrives at every session as their own governance layer.\n\nYou don't need to reach the ceiling. Most people live on the floor — and the floor is strong. The Five Rules work at every level. The scaffold just gives you somewhere to go if you want to go further.",
    eyebrow: 'THE SCAFFOLD',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FFFDF8',
    font: 'serif'
  }},
  { blockType: 'card', position: 7, content: {
    items: [
      { title: 'The Five Rules', description: 'Start here. The foundation of every AI session.', url: '/rules', color: '#E8520A' },
      { title: 'Flower Presets', description: 'Pre-built safety configurations. Pick one and paste it.', url: '/flower-presets', color: '#D4722A' },
      { title: 'Prompt Games', description: 'Practice staying in charge through play.', url: '/prompt-games', color: '#2563EB' },
      { title: 'If You Need to Stop', description: 'Crisis resources and grounding. Always available.', url: '/if-you-need-to-stop', color: '#059669' },
      { title: 'The Watcher', description: 'The part of you that notices what you\'re doing while you\'re doing it.', url: '/for/watcher', color: '#7C3AED' },
      { title: 'Living Lexicon', description: 'Three definitions per word. The language of the practice.', url: '/lexicon', color: '#C4923A' }
    ]
  }}
]);

// ═══════════════════════════════════════════════════════
// COGNITIVE SCIENCE LENS
// ═══════════════════════════════════════════════════════
await migratePage('cognitive-science', [
  { blockType: 'text', position: 1, content: {
    title: 'The Cognitive Science Lens',
    description: 'How your brain interacts with AI — and why that matters more than the technology itself.',
    eyebrow: 'LENS: COGNITIVE SCIENCE',
    titleColor: '#FAF6EF', descColor: '#b0a898', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'text', position: 2, content: {
    title: 'Cognitive Load and AI Interaction',
    description: "Every AI session places demands on your working memory. The longer the session, the more cognitive load accumulates. This is not a weakness — it's how human cognition works.\n\nWhen cognitive load increases, three things happen:\n1. You become more likely to accept AI outputs without scrutiny\n2. Your ability to detect drift decreases\n3. You start deferring to the AI's confidence instead of your own judgment\n\nThe Five Rules are designed to reduce cognitive load by giving you a fixed framework. You don't have to decide what matters in each moment — the rules already tell you.",
    eyebrow: 'COGNITIVE LOAD',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif'
  }},
  { blockType: 'text', position: 3, content: {
    title: 'Anchoring Bias in AI Sessions',
    description: "The first thing the AI says becomes your anchor. Research in cognitive psychology shows that initial information disproportionately influences subsequent judgments — even when that information is arbitrary.\n\nIn AI sessions, this means the model's first response shapes your entire conversation. If it starts confident, you calibrate to confidence. If it starts uncertain, you calibrate to uncertainty.\n\nToken Zero — the pre-output force profile — is the cognitive science response to anchoring. By setting your intent before the AI speaks, you create your own anchor. The AI's first word lands on your framework, not the other way around.",
    eyebrow: 'ANCHORING BIAS',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FFFDF8',
    font: 'serif',
    links: [{ label: 'Promptolinguistics →', url: '/promptolinguistics' }]
  }},
  { blockType: 'text', position: 4, content: {
    title: 'The Watcher as Metacognition',
    description: "Metacognition is thinking about thinking. It's the cognitive process that monitors and regulates your other cognitive processes.\n\nThe watcher variable is metacognition made explicit for AI interaction. It's the part of you that asks: Am I still steering? Is this still my thinking? Did I just agree because it sounded smart?\n\nResearch shows that metacognitive monitoring improves decision quality across domains. In AI interaction, it's the difference between using the tool and being used by it.",
    eyebrow: 'METACOGNITION',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif',
    links: [{ label: 'The Watcher →', url: '/for/watcher' }]
  }},
  { blockType: 'text', position: 5, content: {
    title: 'Dual Process Theory',
    description: "Kahneman's System 1 (fast, automatic) and System 2 (slow, deliberate) map directly onto AI interaction patterns.\n\nSystem 1 accepts AI outputs quickly — it feels right, sounds smart, matches expectations. System 2 questions them — checks sources, considers alternatives, notices inconsistencies.\n\nMost AI interaction happens in System 1. The Five Rules force System 2 engagement. Rule 2 (Honesty over Confidence) is a direct System 2 trigger — it asks you to evaluate truth, not just plausibility.",
    eyebrow: 'DUAL PROCESS THEORY',
    titleColor: '#FAF6EF', descColor: '#c8b89a', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'text', position: 6, content: {
    title: 'Attention and Drift',
    description: "Sustained attention degrades over time. This is well-established in cognitive science — vigilance decrements occur in every monitoring task.\n\nAI sessions are monitoring tasks. You're monitoring the AI's output for accuracy, relevance, and alignment with your intent. As the session lengthens, your monitoring degrades.\n\nDrift is the cognitive science term for what happens when monitoring fails. The AI's output moves away from your intent, and you don't notice because your attention has degraded.\n\nRule 5 (If it drifts, correct it) is a vigilance maintenance strategy. It gives you a specific thing to monitor for, reducing the cognitive demand of general monitoring.",
    eyebrow: 'ATTENTION AND DRIFT',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FFFDF8',
    font: 'serif',
    links: [{ label: 'Read about Drift →', url: '/drift' }]
  }},
  { blockType: 'card', position: 7, content: {
    items: [
      { title: 'Everyday', description: "Your brain gets tired during long AI sessions. That's normal. The rules help you stay sharp without having to think about staying sharp.", color: '#E8520A' },
      { title: 'Professional', description: "Cognitive load theory, anchoring bias, and vigilance decrements all predict specific failure modes in human-AI interaction. The Five Rules address each mode through structured metacognitive scaffolding.", color: '#2563EB' },
      { title: 'Watcher', description: "The mind that watches itself is the mind that stays free. The practice is not about controlling the AI. It's about noticing what happens to you while you use it.", color: '#7C3AED' }
    ]
  }},
  { blockType: 'card', position: 8, content: {
    items: [
      { title: 'The Five Rules', description: 'The cognitive scaffolding that reduces load and maintains vigilance.', url: '/rules', color: '#E8520A' },
      { title: 'Promptolinguistics', description: 'Token Zero as cognitive anchoring strategy.', url: '/promptolinguistics', color: '#D4722A' },
      { title: 'The Watcher', description: 'Metacognition made explicit for AI interaction.', url: '/for/watcher', color: '#7C3AED' },
      { title: 'Human Line', description: 'The boundary between human cognition and AI output.', url: '/human-line', color: '#059669' },
      { title: 'Psychology Lens', description: 'The emotional and behavioral dimensions.', url: '/for/psychology', color: '#2563EB' }
    ]
  }}
]);

// ═══════════════════════════════════════════════════════
// WATCHER LENS
// ═══════════════════════════════════════════════════════
await migratePage('watcher', [
  { blockType: 'text', position: 1, content: {
    title: 'The Watcher',
    description: 'The part of you that notices what you are doing while you are doing it.',
    eyebrow: 'THE WATCHER LENS',
    titleColor: '#FAF6EF', descColor: '#b0a898', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'text', position: 2, content: {
    title: 'What Is the Watcher?',
    description: "The watcher is not a tool. It is not a feature. It is not something you install or activate.\n\nThe watcher is the part of you that notices what you are doing while you are doing it. It is the voice that asks: Am I still steering? Is this still my thinking? Did I just agree with something because it sounded smart?\n\nIn cognitive science, this is called metacognition — thinking about thinking. In contemplative traditions, it is called witness consciousness. In GallantryAI, it is called the watcher variable.\n\nIt is the variable most researchers forget to document: themselves.",
    eyebrow: 'DEFINITION',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FAF6EF',
    font: 'serif'
  }},
  { blockType: 'text', position: 3, content: {
    title: 'Why It Matters in AI Interaction',
    description: "Every AI session is a collaboration between two systems: the model and you. The model brings pattern recognition, language generation, and vast training data. You bring context, judgment, intent, and values.\n\nWithout the watcher, the collaboration drifts. The AI's confidence becomes your confidence. The AI's framing becomes your framing. You stop steering and start following.\n\nThe watcher is what keeps you in the driver's seat. Not by fighting the AI, but by noticing when you've stopped driving.",
    eyebrow: 'WHY IT MATTERS',
    titleColor: '#FAF6EF', descColor: '#c8b89a', bgColor: '#1A1A2E',
    font: 'serif'
  }},
  { blockType: 'text', position: 4, content: {
    title: 'The Practice',
    description: "The watcher is a practice, not a skill. You don't master it — you maintain it.\n\nBefore a session: Set your intent. What do you want? What are you not willing to accept? What would drift look like?\n\nDuring a session: Check in. Am I still on track? Has the AI introduced something I didn't ask for? Am I agreeing because it's true or because it's convenient?\n\nAfter a session: Reflect. Did I stay in charge? Where did I drift? What would I do differently?\n\nThis is the watcher cycle. It takes seconds. It changes everything.",
    eyebrow: 'THE PRACTICE',
    titleColor: '#1A1A2E', descColor: '#3a2a1a', bgColor: '#FFFDF8',
    font: 'serif'
  }},
  { blockType: 'text', position: 5, content: {
    title: 'The Watcher and the Five Rules',
    description: "The Five Rules are the watcher's tools.\n\nRule 1 (Safety) is the watcher asking: Is this safe?\nRule 2 (Honesty) is the watcher asking: Is this true?\nRule 3 (Trust) is the watcher asking: Has this been earned?\nRule 4 (Agency) is the watcher asking: Am I still deciding?\nRule 5 (Correction) is the watcher asking: Has this drifted?\n\nThe rules don't replace the watcher. They give the watcher language. They make the practice explicit, repeatable, and shareable.",
    eyebrow: 'THE WATCHER AND THE RULES',
    titleColor: '#FAF6EF', descColor: '#c8b89a', bgColor: '#1A1A2E',
    font: 'serif',
    links: [{ label: 'The Five Rules →', url: '/rules' }]
  }},
  { blockType: 'card', position: 6, content: {
    items: [
      { title: 'Everyday', description: "The watcher is just paying attention on purpose. You already do it — when you double-check a recipe, when you re-read an important email, when you pause before responding to something that made you angry. This is the same skill, applied to AI.", color: '#E8520A' },
      { title: 'Professional', description: "The watcher variable represents the metacognitive monitoring function applied to human-AI interaction. It operationalizes self-regulation theory within the prompt engineering context, providing a structured framework for maintaining cognitive agency during extended AI sessions.", color: '#2563EB' },
      { title: 'Watcher', description: "You are reading about yourself. The watcher watching the watcher. This recursion is not a bug — it is the point. The practice deepens every time you notice yourself noticing.", color: '#7C3AED' }
    ]
  }},
  { blockType: 'card', position: 7, content: {
    items: [
      { title: 'The Five Rules', description: 'The watcher\'s tools. Start here.', url: '/rules', color: '#E8520A' },
      { title: 'Cognitive Science Lens', description: 'The science behind the watcher.', url: '/for/cognitive-science', color: '#2563EB' },
      { title: 'Psychology Lens', description: 'The emotional dimension of watching.', url: '/for/psychology', color: '#D4722A' },
      { title: 'Road Protocol', description: 'Set the room before you type.', url: '/road-protocol', color: '#059669' },
      { title: 'Human Line', description: 'Where you end and the AI begins.', url: '/human-line', color: '#7C3AED' },
      { title: 'Promptolinguistics', description: 'Token Zero — the pre-output force profile.', url: '/promptolinguistics', color: '#C4923A' }
    ]
  }}
]);

// Clean up old for-* slugs that are no longer needed
const oldSlugs = ['for-teenager', 'for-everyday', 'for-cognitive-science', 'for-watcher', 'for-mathematician', 'for-psychology'];
for (const slug of oldSlugs) {
  const [result] = await conn.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [slug]);
  if (result.affectedRows > 0) console.log(`Cleaned up ${result.affectedRows} old blocks for ${slug}`);
}

await conn.end();
console.log('All 4 lens pages migrated. Old for-* slugs cleaned up.');
