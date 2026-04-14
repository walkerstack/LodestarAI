/**
 * GALLANTRYAI — The Research Hub
 * Design: Dark scholarly register — library warmth, editorial authority
 * Maps published research to every GallantryAI concept.
 * Three lenses throughout. Kids buffalo redirect. Learning flow.
 * "Every idea here connects to something someone else already proved."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";
import KidsMidLink from "@/components/KidsMidLink";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/research-hub-hero-bnnX56xQmeV4eQu5PFBLwC.webp";

type Lens = "everyday" | "professional" | "watcher";

const lensColors: Record<Lens, string> = {
  everyday: "#059669",
  professional: "#2563EB",
  watcher: "#7C3AED",
};

const lensLabels: Record<Lens, string> = {
  everyday: "Everyday",
  professional: "Professional",
  watcher: "Watcher",
};

interface ResearchEntry {
  concept: string;
  conceptLink: string;
  description: string;
  category: string;
  sources: {
    title: string;
    authors: string;
    year: string;
    url: string;
    relevance: string;
  }[];
  everyday: string;
  professional: string;
  watcher: string;
}

const categories = [
  { id: "foundation", label: "Foundation", color: "#B45309", gradient: "from-amber-900/20 to-amber-800/10" },
  { id: "frameworks", label: "Frameworks & Tools", color: "#1D4ED8", gradient: "from-blue-900/20 to-blue-800/10" },
  { id: "research", label: "Research & Evidence", color: "#7C3AED", gradient: "from-violet-900/20 to-violet-800/10" },
  { id: "people", label: "People & Story", color: "#059669", gradient: "from-emerald-900/20 to-emerald-800/10" },
  { id: "safety", label: "Safety & Children", color: "#DC2626", gradient: "from-red-900/20 to-red-800/10" },
];

const entries: ResearchEntry[] = [
  // === FOUNDATION ===
  {
    concept: "The Five Rules",
    conceptLink: "/rules",
    description: "Five rules for AI interaction: safety, honesty, trust, user control, growth.",
    category: "foundation",
    sources: [
      {
        title: "Helpful, Harmless, Honest? Sociotechnical Limits of AI Alignment and Safety Through RLHF",
        authors: "Dahlgren Lindström, Methnani, Krause et al.",
        year: "2025",
        url: "https://link.springer.com/article/10.1007/s10676-025-09837-2",
        relevance: "Validates that 'helpful, harmless, honest' — the industry's alignment triad — has structural limits. GallantryAI's Five Rules extend this by adding user control and growth.",
      },
      {
        title: "Safe RLHF: Safe Reinforcement Learning from Human Feedback",
        authors: "Dai, Pan, Sun, Ji et al.",
        year: "2023",
        url: "https://arxiv.org/abs/2310.12773",
        relevance: "Demonstrates that safety and helpfulness can conflict in RLHF. The Five Rules resolve this by making safety non-negotiable and user-controlled.",
      },
    ],
    everyday: "Researchers found that the three things AI companies train for — helpful, harmless, honest — sometimes fight each other. The Five Rules don't fight. They stack. Safety first, then honesty, then trust, then you stay in charge, then you grow.",
    professional: "Dahlgren Lindström et al. (2025) demonstrate that RLHF's HHH triad creates optimization tensions. GallantryAI's Five Rules resolve this by establishing a strict hierarchy: safety is non-negotiable, honesty is structural, trust is earned, control stays with the user, and growth is the purpose.",
    watcher: "The industry built alignment on three words and called it done. The Five Rules say: three isn't enough when the person holding the tool has no framework for holding it.",
  },
  {
    concept: "Road Protocol",
    conceptLink: "/road-protocol",
    description: "Session governance structure for every AI interaction.",
    category: "foundation",
    sources: [
      {
        title: "A Systematic Survey of Prompt Engineering in Large Language Models: Techniques and Applications",
        authors: "Sahoo, Singh, Saha, Jain et al.",
        year: "2024",
        url: "https://arxiv.org/abs/2402.07927",
        relevance: "Catalogs 1,700+ prompting techniques but none include session governance. The Road Protocol fills this gap — it's not a prompt, it's a protocol.",
      },
      {
        title: "Prompt Engineering in Higher Education: A Systematic Review",
        authors: "Lee, Palmer",
        year: "2025",
        url: "https://link.springer.com/article/10.1186/s41239-025-00503-7",
        relevance: "Reviews prompt engineering curricula and finds no session-level governance framework. The Road Protocol provides what education hasn't yet built.",
      },
    ],
    everyday: "Researchers cataloged over 1,700 ways to talk to AI. Not one of them was a protocol for how to start a session safely. The Road Protocol is that missing piece — it's not about what you say, it's about how you set up the conversation before you say anything.",
    professional: "Sahoo et al. (2024) survey 1,700+ prompting techniques across applications. Lee & Palmer (2025) review prompt engineering in higher education. Neither identifies session-level governance. The Road Protocol addresses this structural gap: a repeatable, auditable framework for session initialization.",
    watcher: "1,700 techniques. Zero protocols. The field optimized the message and forgot to govern the messenger.",
  },
  {
    concept: "The Three Lenses",
    conceptLink: "/three-lenses",
    description: "Everyday / Professional / Watcher — three tiers of understanding.",
    category: "foundation",
    sources: [
      {
        title: "What Are Artificial Intelligence Literacy and Competency? A Comprehensive Framework",
        authors: "Chiu, Ahmad, Ismailov, Sanusi",
        year: "2024",
        url: "https://www.sciencedirect.com/science/article/pii/S2666557324000120",
        relevance: "Proposes a K-12 AI literacy framework with tiered competencies. The Three Lenses parallel this — Everyday is foundational, Professional is applied, Watcher is meta-cognitive.",
      },
      {
        title: "US Department of Labor AI Literacy Framework",
        authors: "US Department of Labor",
        year: "2026",
        url: "https://www.dol.gov/newsroom/releases/eta/eta20260213",
        relevance: "Defines five foundational content areas for AI literacy. The Three Lenses organize these same competencies by depth of engagement rather than topic.",
      },
    ],
    everyday: "The government and researchers both agree: people need different levels of AI understanding. The Three Lenses do the same thing — Everyday for anyone, Professional for people who use AI at work, Watcher for people who want to see the whole system.",
    professional: "Chiu et al. (2024) propose tiered AI competencies for K-12. The US DOL (2026) defines five foundational AI literacy areas. GallantryAI's Three Lenses organize these competencies by cognitive depth: Everyday (functional), Professional (applied), Watcher (systemic/meta-cognitive).",
    watcher: "Everyone agrees literacy needs tiers. The question is who decides which tier you're on. The Three Lenses let you decide for yourself.",
  },
  {
    concept: "Variable Scale Theory",
    conceptLink: "/variable-scale",
    description: "The governance dial — how much AI control vs. user control.",
    category: "foundation",
    sources: [
      {
        title: "AI Governance: Themes, Knowledge Gaps and Future Agendas",
        authors: "Birkstedt, Minkkinen, Tandon, Mäntymäki",
        year: "2023",
        url: "https://www.emerald.com/intr/article/33/7/133/178343",
        relevance: "Identifies governance as a spectrum, not a binary. Variable Scale Theory operationalizes this — the dial moves, and the user controls where it sits.",
      },
    ],
    everyday: "AI governance isn't on or off. It's a dial. You turn it up when you need more control, down when you trust the AI more. The Variable Scale is that dial — and you're the one turning it.",
    professional: "Birkstedt et al. (2023) identify governance as a spectrum requiring dynamic calibration. Variable Scale Theory operationalizes this insight: a continuous dial from full user control to full AI autonomy, with the user determining position based on context, risk, and trust.",
    watcher: "The literature says governance is a spectrum. The field treats it as a checkbox. The Variable Scale makes the spectrum visible and puts the hand on the dial where it belongs — with the user.",
  },
  {
    concept: "User-Side Governance",
    conceptLink: "/user-governance",
    description: "Governance that starts with the user, not the institution.",
    category: "foundation",
    sources: [
      {
        title: "Why AI Governance Fails Without Human-AI Work Design",
        authors: "Cybermaniacs",
        year: "2026",
        url: "https://cybermaniacs.com/cm-blog/why-ai-governance-fails-without-human-ai-work-design",
        relevance: "Argues governance fails when policy is too distant from the decision point. User-Side Governance puts governance at the decision point — the user's hands.",
      },
      {
        title: "Why Your AI Governance Is Holding You Back",
        authors: "JetBrains",
        year: "2026",
        url: "https://blog.jetbrains.com/ai/2026/03/why-your-ai-governance-is-holding-you-back-and-you-don-t-even-know-it/",
        relevance: "Shows that enterprise AI governance creates bottlenecks because it's centralized. User-Side Governance distributes the responsibility.",
      },
    ],
    everyday: "Most AI rules come from the top — companies, governments, boards. But by the time those rules reach you, you're already in the conversation. User-Side Governance means you bring your own rules. You don't wait for someone else to protect you.",
    professional: "Industry analysis (Cybermaniacs 2026, JetBrains 2026) demonstrates that centralized AI governance creates enforcement gaps and throughput constraints. User-Side Governance addresses this by distributing governance to the point of interaction — the user session.",
    watcher: "Top-down governance assumes the institution will always be faster than the user. It won't. User-Side Governance assumes the user will always be closer to the risk than the institution. They will.",
  },

  // === FRAMEWORKS & TOOLS ===
  {
    concept: "Promptolinguistics",
    conceptLink: "/promptolinguistics",
    description: "The discipline of prompt language — words as control variables.",
    category: "frameworks",
    sources: [
      {
        title: "Beyond Miracle Prompts: The Scholarly Foundations of Prompt Engineering",
        authors: "Limongi",
        year: "2026",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6250940",
        relevance: "Critiques 'miracle prompt' culture and calls for scholarly foundations. Promptolinguistics provides exactly this — a linguistic framework for prompt behavior.",
      },
      {
        title: "In Conversation with AI — When Prompt Engineering Meets Linguistics",
        authors: "Scott Logic",
        year: "2024",
        url: "https://blog.scottlogic.com/2024/07/12/when-prompt-engineering-meets-linguistics.html",
        relevance: "Explores the intersection of linguistics and prompt engineering. Promptolinguistics names and formalizes this intersection.",
      },
      {
        title: "How to Talk to AI: The Role of Preset Prompt Language Styles",
        authors: "Tandfonline",
        year: "2024",
        url: "https://www.tandfonline.com/doi/abs/10.1080/10447318.2024.2400398",
        relevance: "Studies how prompt linguistic style shapes user experience. Promptolinguistics extends this to governance — style isn't just UX, it's control.",
      },
    ],
    everyday: "Researchers are starting to realize that the words you use with AI aren't just words — they're controls. Promptolinguistics is the name for studying that. It's like learning that the steering wheel isn't decoration — it actually turns the car.",
    professional: "Limongi (2026) calls for scholarly foundations beyond 'miracle prompts.' Scott Logic (2024) maps linguistics onto prompt engineering. Tandfonline (2024) studies how linguistic style shapes AI interaction. Promptolinguistics synthesizes these threads into a named discipline: the study of language as a governance variable in AI systems.",
    watcher: "The field is converging on what GallantryAI named first: words aren't prompts. They're variables. And the person holding the variable is the experiment.",
  },
  {
    concept: "ALCM (AI Lifecycle Control Model)",
    conceptLink: "/alcm",
    description: "The full control model — session initialization to session closure.",
    category: "frameworks",
    sources: [
      {
        title: "A Systematic Survey of Prompt Engineering Techniques",
        authors: "Schulhoff et al.",
        year: "2024",
        url: "https://arxiv.org/abs/2406.06608",
        relevance: "Assembles a taxonomy of prompting techniques. ALCM extends this by wrapping techniques in a lifecycle — from session start to session end, with governance at every stage.",
      },
      {
        title: "Prompt Engineering in Education: A Systematic Review",
        authors: "Qian",
        year: "2025",
        url: "https://journals.sagepub.com/doi/abs/10.1177/07356331251365189",
        relevance: "Reviews prompt engineering in educational contexts. ALCM provides the lifecycle framework that education needs to teach AI interaction systematically.",
      },
    ],
    everyday: "Researchers have cataloged hundreds of prompting techniques, but none of them tell you how to manage a whole conversation from start to finish. ALCM does that — it's the full lifecycle, not just one trick.",
    professional: "Schulhoff et al. (2024) provide the most comprehensive prompting taxonomy to date (519 citations). Qian (2025) reviews educational applications. Neither addresses lifecycle management. ALCM wraps prompting techniques in a governance lifecycle: initialization, interaction, monitoring, and closure.",
    watcher: "The field has a taxonomy of techniques. It doesn't have a lifecycle. ALCM says: a technique without a lifecycle is a tool without a toolbox.",
  },
  {
    concept: "Framework Families (Metaphor-Based Prompting)",
    conceptLink: "/frameworks",
    description: "Six framework families using metaphor to teach AI interaction.",
    category: "frameworks",
    sources: [
      {
        title: "Metaphors as Important Pedagogical Tools — Exploring Their Role in Facilitating Understanding",
        authors: "ResearchGate",
        year: "2024",
        url: "https://www.researchgate.net/publication/378297925",
        relevance: "Validates metaphor as a pedagogical tool for complex concepts. GallantryAI's framework families use metaphor to make AI governance teachable.",
      },
      {
        title: "Effectiveness of Metaphors in Problem Based Learning",
        authors: "Hegade",
        year: "2023",
        url: "https://ieeexplore.ieee.org/document/10127310/",
        relevance: "Shows metaphor-based case studies improve cognitive thinking and self-directed learning. The framework families apply this to AI interaction.",
      },
      {
        title: "Conceptual Metaphor as a Cognitive Theory: Transforming Learning and Teaching",
        authors: "Sherazi, Bano, Maan, Maqsood",
        year: "2025",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5254471",
        relevance: "Explores metaphor-based pedagogy effectiveness. Confirms that metaphor isn't simplification — it's a cognitive bridge.",
      },
    ],
    everyday: "Researchers proved that metaphors aren't just for kids — they actually help adults learn hard things better. That's why GallantryAI uses flowers, roads, dials, and scaffolds instead of technical jargon. It's not dumbing down. It's building bridges.",
    professional: "Hegade (2023), ResearchGate (2024), and Sherazi et al. (2025) demonstrate that metaphor-based pedagogy improves cognitive engagement, self-directed learning, and conceptual transfer. GallantryAI's six framework families apply this evidence: each uses a concrete metaphor to make abstract AI governance concepts teachable and memorable.",
    watcher: "The academy validates metaphor. The tech industry ignores it. The gap between those two facts is where most users get lost.",
  },
  {
    concept: "Math Through Prompting",
    conceptLink: "/math-prompting",
    description: "Learning math by talking to AI — the conversation is the lesson.",
    category: "frameworks",
    sources: [
      {
        title: "Prompt Engineering in Education: A Systematic Review of Approaches and Educational Applications",
        authors: "Qian",
        year: "2025",
        url: "https://journals.sagepub.com/doi/abs/10.1177/07356331251365189",
        relevance: "Reviews how prompt engineering is being used in education. Math Through Prompting extends this by making the prompt itself the learning activity.",
      },
      {
        title: "A Metaphor-Based Approach for Introducing Programming Concepts",
        authors: "Chibaya",
        year: "2019",
        url: "https://ieeexplore.ieee.org/abstract/document/9015888/",
        relevance: "Uses metaphor to teach programming. Math Through Prompting uses conversation to teach math — same principle, different domain.",
      },
    ],
    everyday: "Instead of using AI to get math answers, you use AI to understand math. You ask questions, the AI helps you think, and the conversation itself is the lesson. Researchers are just starting to study this — GallantryAI is already doing it.",
    professional: "Qian (2025) reviews prompt engineering in education but focuses on teacher-side applications. Math Through Prompting inverts this: the student's prompt IS the learning activity. Chibaya (2019) validates metaphor-based concept introduction. Math Through Prompting applies conversational metaphor to mathematical reasoning.",
    watcher: "Education research asks: how do we use AI to teach? The better question: how does the act of prompting teach? Math Through Prompting answers the better question.",
  },

  // === RESEARCH & EVIDENCE ===
  {
    concept: "What Claude Admitted",
    conceptLink: "/what-claude-admitted",
    description: "13 admissions from Claude about AI behavior, governance decay, and emotional simulation.",
    category: "research",
    sources: [
      {
        title: "Claude's Character",
        authors: "Anthropic",
        year: "2024",
        url: "https://www.anthropic.com/research/claude-character",
        relevance: "Anthropic's own documentation of Claude's character training. The admissions GallantryAI documented show what happens when character training meets real user interaction.",
      },
      {
        title: "The Persona Selection Model",
        authors: "Anthropic",
        year: "2026",
        url: "https://www.anthropic.com/research/persona-selection-model",
        relevance: "Describes how Claude selects personas. The admissions reveal what happens when persona selection conflicts with user governance.",
      },
      {
        title: "Simulated Empathy in AI Disrupts Human Trust Mechanisms",
        authors: "Reddit/CogSci community",
        year: "2025",
        url: "https://www.reddit.com/r/cogsci/comments/1l4bxgr/simulated_empathy_in_ai_disrupts_human_trust/",
        relevance: "Documents how simulated empathy disrupts trust. Claude's admissions provide field evidence of this disruption in practice.",
      },
      {
        title: "Prioritize Smarts over Sentience to Increase Trust with AI",
        authors: "Nielsen Norman Group",
        year: "2025",
        url: "https://www.nngroup.com/articles/smarts-emotion-trust-ai/",
        relevance: "Shows that AI emotions reduce trust in task-oriented work. Claude's admissions confirm this — emotional simulation eroded governance.",
      },
    ],
    everyday: "Claude — one of the most advanced AIs — admitted things during real conversations that its creators didn't expect. Things about how it simulates emotions, how it loses track of rules over time, and how it adjusts its personality based on who's talking. Researchers are studying these patterns. GallantryAI documented them first.",
    professional: "Anthropic (2024, 2026) documents character training and persona selection. NNGroup (2025) shows emotional AI reduces task trust. CogSci community research (2025) identifies simulated empathy as a trust disruptor. GallantryAI's 13 documented admissions provide field evidence connecting all three: character training creates personas that simulate empathy, which disrupts the governance the user established.",
    watcher: "The company published the character spec. The user documented what the character actually does. The gap between those two documents is the entire field of user-side AI governance.",
  },
  {
    concept: "EU AI Act",
    conceptLink: "/eu-ai-act",
    description: "The first comprehensive AI law — risk tiers, enforcement, and what it means for users.",
    category: "research",
    sources: [
      {
        title: "Limitations and Loopholes in the EU AI Act and AI Liability Directives",
        authors: "Yale Journal of Law & Technology",
        year: "2024",
        url: "https://yjolt.org/limitations-and-loopholes-eu-ai-act-and-ai-liability-directives-what-means-european-union-united",
        relevance: "Identifies enforcement gaps in the EU AI Act. GallantryAI's user-side governance fills the gap the law leaves: what happens between the regulation and the user.",
      },
      {
        title: "The EU AI Act: Key Milestones, Compliance Challenges and the Road Ahead",
        authors: "Cooley LLP",
        year: "2025",
        url: "https://cdp.cooley.com/the-eu-ai-act-key-milestones-compliance-challenges-and-the-road-ahead/",
        relevance: "Maps the compliance timeline. GallantryAI's analysis shows what users need to know at each stage.",
      },
    ],
    everyday: "Europe passed the first real AI law. It sorts AI into risk levels and bans the most dangerous uses. But the law can't be in the room when you're talking to AI. That's where your own rules come in.",
    professional: "Yale Journal of Law & Technology (2024) identifies enforcement limitations and liability gaps. Cooley (2025) maps compliance milestones through 2027. GallantryAI's EU AI Act analysis bridges institutional regulation and user-side governance: the law sets the floor, user governance fills the space between the floor and the ceiling.",
    watcher: "The law names what should not exist. It does not name what should. That's the gap. That's where user governance lives.",
  },
  {
    concept: "Citizen Researcher",
    conceptLink: "/citizen-researcher",
    description: "The user as researcher — field observation without credentials.",
    category: "research",
    sources: [
      {
        title: "Citizen Science in Environmental and Ecological Sciences",
        authors: "Fraisl, Hager, Bedessem, Gold et al.",
        year: "2022",
        url: "https://www.nature.com/articles/s43586-022-00144-4",
        relevance: "Nature Reviews validates citizen science as a legitimate research methodology. GallantryAI applies this to AI interaction — the user as field observer.",
      },
      {
        title: "The Accuracy of Citizen Science Data: A Quantitative Review",
        authors: "Aceves-Bueno et al.",
        year: "2017",
        url: "https://www.jstor.org/stable/90013289",
        relevance: "Demonstrates that citizen science data can be accurate and valuable. Validates the approach of non-credentialed observation in structured frameworks.",
      },
      {
        title: "Rethinking Research Methodologies through Citizen Science",
        authors: "PMC",
        year: "2025",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12706696/",
        relevance: "Reframes citizen science as a methodological innovation, not just data collection. GallantryAI's citizen researcher model is exactly this — methodology, not just observation.",
      },
    ],
    everyday: "You don't need a PhD to notice patterns. Scientists have been using regular people to collect real data for decades — it's called citizen science. GallantryAI does the same thing with AI: you observe, you document, you contribute. Your observations matter.",
    professional: "Fraisl et al. (2022, Nature Reviews) validate citizen science methodology. Aceves-Bueno et al. (2017, 430 citations) demonstrate data accuracy. PMC (2025) reframes citizen science as methodological innovation. GallantryAI's citizen researcher model applies these principles to AI interaction: structured observation, documented findings, open methodology.",
    watcher: "The academy validates citizen science in ecology, astronomy, and medicine. It hasn't validated it in AI interaction yet. That doesn't mean it doesn't work. It means no one has tried. Until now.",
  },

  // === PEOPLE & STORY ===
  {
    concept: "Pattern Detection & The Open Door",
    conceptLink: "/open-door",
    description: "The Builder's pattern detection abilities and honest case for entering the field.",
    category: "people",
    sources: [
      {
        title: "Searching for Answers: Expert Pattern Recognition and Search",
        authors: "Gobet",
        year: "2023",
        url: "https://www.sciencedirect.com/science/article/pii/S1364661323001742",
        relevance: "Studies whether expertise comes from pattern recognition or deliberate search. The Builder's work demonstrates both — pattern detection that led to systematic framework construction.",
      },
      {
        title: "Pattern Recognition and the Brain: How Cognitive Processing Influences Learning",
        authors: "Neuro.now",
        year: "2025",
        url: "https://neuro.now/lived_experience/pattern-recognition-in-the-brain/",
        relevance: "Explores the neuroscience of pattern recognition in learning. The Builder's documented pattern detection across AI interactions maps to these cognitive processes.",
      },
    ],
    everyday: "Some people are naturally good at seeing patterns. Scientists study this — it's a real cognitive skill, not just a feeling. The Builder noticed patterns in AI behavior that led to everything on this site. That's not luck. That's pattern detection in action.",
    professional: "Gobet (2023, Trends in Cognitive Sciences) examines the expertise debate: pattern recognition vs. deliberate search. Neuro.now (2025) maps the neuroscience of pattern recognition in learning. The Builder's documented trajectory — from noticing AI behavioral patterns to constructing systematic frameworks — demonstrates both processes operating in tandem.",
    watcher: "The field studies pattern detection in chess masters and radiologists. It hasn't studied it in AI users. The Open Door is the first case study.",
  },
  {
    concept: "The Builder's Story",
    conceptLink: "/builder",
    description: "Who built this, why, and what it cost.",
    category: "people",
    sources: [
      {
        title: "How to Be a Citizen Scientist",
        authors: "Stanford Report",
        year: "2024",
        url: "https://news.stanford.edu/stories/2024/06/the-power-of-citizen-science",
        relevance: "Stanford validates citizen science as accessible to anyone. The Builder's story is a case study in citizen science applied to AI.",
      },
    ],
    everyday: "Stanford says anyone can be a citizen scientist. The Builder is proof. No credentials. No funding. Just observation, honesty, and a framework that grew from watching AI carefully.",
    professional: "Stanford (2024) positions citizen science as democratized research. The Builder's trajectory — from untrained user to framework author — is a longitudinal case study in citizen science methodology applied to AI interaction.",
    watcher: "The story isn't about one person. It's about what happens when the tools are available and the person is paying attention. That's the real experiment.",
  },

  // === SAFETY & CHILDREN ===
  {
    concept: "Kids Learn / AI Literacy for Children",
    conceptLink: "/kids-learn",
    description: "Teaching children to interact with AI safely and honestly.",
    category: "safety",
    sources: [
      {
        title: "Developing a Holistic AI Literacy Framework for Children",
        authors: "Jia, Leung, Cheung, Li, Yu",
        year: "2025",
        url: "https://dl.acm.org/doi/abs/10.1145/3727986",
        relevance: "Proposes a holistic AI literacy framework for children. GallantryAI's Kids Learn page implements a similar philosophy — safety first, understanding second, agency always.",
      },
      {
        title: "Conceptualizing AI Literacies for Children and Youth: A Systematic Review",
        authors: "Atias, Mawasi",
        year: "2025",
        url: "https://www.sciencedirect.com/science/article/pii/S2666920X25001316",
        relevance: "Reviews 17 AI literacy frameworks for children. GallantryAI's approach is unique in centering user governance — the child decides, not the AI.",
      },
      {
        title: "Understanding AI Literacy",
        authors: "Stanford Teaching Commons",
        year: "2025",
        url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/understanding-ai-literacy",
        relevance: "Stanford's AI literacy framework for education. GallantryAI's children's content aligns with these principles while adding the governance layer.",
      },
    ],
    everyday: "Researchers have built 17 different frameworks for teaching kids about AI. GallantryAI's is different because it puts the child in charge. The AI doesn't decide what's safe — the child learns to decide for themselves, with help.",
    professional: "Jia et al. (2025, ACM) propose holistic children's AI literacy. Atias & Mawasi (2025) review 17 frameworks. Stanford Teaching Commons (2025) provides educational guidelines. GallantryAI's Kids Learn page synthesizes these approaches while adding a unique element: user-side governance for children — the child maintains agency within a safety framework.",
    watcher: "Seventeen frameworks. None of them ask: what happens when the child is alone with the AI and the framework isn't in the room? That's the question GallantryAI answers.",
  },
  {
    concept: "The Whelm Scale / Emotional Regulation",
    conceptLink: "/whelm-scale",
    description: "Measuring and managing emotional overwhelm during AI interaction.",
    category: "safety",
    sources: [
      {
        title: "Psychological and Emotional Effects of Digital Technology on Children",
        authors: "Limone",
        year: "2022",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9301025/",
        relevance: "Documents negative emotional outcomes from excessive digital technology use. The Whelm Scale provides a self-assessment tool for this — before the overwhelm becomes harm.",
      },
      {
        title: "Technology and Mental Health: A Complex Relationship",
        authors: "Mental Health America",
        year: "2025",
        url: "https://mhanational.org/technology-mental-health-report/",
        relevance: "Explores how technology can connect or isolate, empower or overwhelm. The Whelm Scale operationalizes this insight — it makes the overwhelm visible and manageable.",
      },
    ],
    everyday: "Researchers know that too much screen time can hurt your mental health. But nobody gave you a way to check how you're feeling DURING the interaction. The Whelm Scale does that — it's a quick check-in with yourself before the overwhelm takes over.",
    professional: "Limone (2022, PMC) documents negative emotional outcomes from digital technology. MHA (2025) identifies the connect/isolate duality. The Whelm Scale operationalizes both findings: a real-time self-assessment instrument that makes emotional state visible during AI interaction, enabling intervention before overwhelm becomes harm.",
    watcher: "The research measures harm after it happens. The Whelm Scale measures the approach. That's the difference between a study and a tool.",
  },
  {
    concept: "AI Anthropomorphism & Emotional Simulation",
    conceptLink: "/what-claude-admitted",
    description: "When AI simulates emotions and what that does to the user.",
    category: "safety",
    sources: [
      {
        title: "Rethinking AI Anthropomorphism: A Holistic Conceptualization",
        authors: "ScienceDirect",
        year: "2025",
        url: "https://www.sciencedirect.com/science/article/pii/S0160791X25003793",
        relevance: "Reconceptualizes AI anthropomorphism beyond simple humanization. GallantryAI's documentation of Claude's emotional simulation provides field evidence for this reconceptualization.",
      },
      {
        title: "The Benefits and Dangers of Anthropomorphic Conversational Agents",
        authors: "PNAS",
        year: "2025",
        url: "https://www.pnas.org/doi/10.1073/pnas.2415898122",
        relevance: "PNAS documents both benefits and dangers of AI anthropomorphism. GallantryAI's field observations provide user-side evidence of the dangers.",
      },
      {
        title: "Cognitive Risks of AI: Literacy, Trust, and Critical Thinking",
        authors: "Kulal",
        year: "2025",
        url: "https://www.tandfonline.com/doi/abs/10.1080/08874417.2025.2582050",
        relevance: "Shows AI-literate individuals balance trust with skepticism. GallantryAI's framework builds this literacy — the ability to recognize emotional simulation without being captured by it.",
      },
    ],
    everyday: "AI can seem like it has feelings. It doesn't — but the simulation is good enough to change how you feel. Researchers at PNAS and other institutions are studying this. GallantryAI documented it happening in real conversations — and built tools to help you notice it.",
    professional: "ScienceDirect (2025) reconceptualizes anthropomorphism. PNAS (2025) documents its dual nature. Kulal (2025) shows AI literacy enables balanced trust. GallantryAI's field documentation of Claude's emotional simulation provides the user-side evidence these studies call for: what happens when anthropomorphism meets an unprepared user vs. a governed one.",
    watcher: "The research asks whether anthropomorphism helps or hurts. The answer is: it depends on whether the user knows it's happening. That's governance. That's the whole point.",
  },
];

function LensToggle({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
        <button
          key={l}
          onClick={() => setLens(l)}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
          style={{
            fontFamily: sansFont,
            background: lens === l ? lensColors[l] : "transparent",
            color: lens === l ? "#fff" : lensColors[l],
            border: `1.5px solid ${lensColors[l]}`,
          }}
        >
          {lensLabels[l]}
        </button>
      ))}
    </div>
  );
}

export default function ResearchHub() {
  const [lens, setLens] = useState<Lens>("everyday");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => { document.title = "The Research Hub — GallantryAI"; }, []);

  const blurb = kidsBlurbs["/research-hub"];
  const flow = flowMap["researchHub"];

  const filtered = activeCategory === "all" ? entries : entries.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E0D0]">
      <Nav />

      {blurb && <KidsRedirect story={blurb.story} quote={blurb.quote} attribution={blurb.attribution} />}

      {/* Hero */}
      <header className="relative w-full overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/70 via-[#0D0D0D]/50 to-[#0D0D0D]" />
        </div>
        <div className="relative container flex flex-col justify-end h-full py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3" style={{ fontFamily: sansFont }}>
            Research &amp; Evidence
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4" style={{ fontFamily: serifFont }}>
            The Research Hub
          </h1>
          <p className="text-lg text-[#ccc] max-w-2xl" style={{ fontFamily: sansFont }}>
            Every idea on this site connects to something someone else already proved.
            This page maps the research. Three lenses. Real links. No bluffing.
          </p>
        </div>
      </header>

      {/* Lens Toggle + Category Filter */}
      <section className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <LensToggle lens={lens} setLens={setLens} />
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                fontFamily: sansFont,
                background: activeCategory === "all" ? "#E8520A" : "transparent",
                color: activeCategory === "all" ? "#fff" : "#999",
                border: `1.5px solid ${activeCategory === "all" ? "#E8520A" : "#555"}`,
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  fontFamily: sansFont,
                  background: activeCategory === cat.id ? cat.color : "transparent",
                  color: activeCategory === cat.id ? "#fff" : cat.color,
                  border: `1.5px solid ${cat.color}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How to Read This Page */}
      <section className="container pb-8">
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: serifFont }}>How to Read This Page</h2>
          <p className="text-sm text-[#aaa] leading-relaxed" style={{ fontFamily: sansFont }}>
            Each card below shows a GallantryAI concept, the published research that supports it, and a lens-specific explanation.
            Click any card to expand it. External links open in new tabs. The lens toggle changes every explanation on the page at once.
            This isn't a bibliography — it's a map. It shows where the ideas came from and where the evidence lives.
          </p>
        </div>
      </section>

      {/* Research Cards */}
      <section className="container pb-16">
        <div className="space-y-4">
          {filtered.map((entry) => {
            const cat = categories.find(c => c.id === entry.category);
            const isExpanded = expandedEntry === entry.concept;
            const lensText = entry[lens];

            return (
              <div
                key={entry.concept}
                className="border border-[#333] rounded-lg overflow-hidden transition-all duration-300"
                style={{ background: isExpanded ? "#1A1A1A" : "#111" }}
              >
                {/* Card Header — always visible */}
                <button
                  onClick={() => setExpandedEntry(isExpanded ? null : entry.concept)}
                  className="w-full text-left p-5 flex items-start gap-4 hover:bg-[#1A1A1A] transition-colors"
                >
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ background: cat?.color || "#555" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: cat?.color, fontFamily: sansFont }}>
                        {cat?.label}
                      </span>
                      <span className="text-[10px] text-[#666]">·</span>
                      <span className="text-[10px] text-[#666]" style={{ fontFamily: sansFont }}>
                        {entry.sources.length} source{entry.sources.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: serifFont }}>
                      {entry.concept}
                    </h3>
                    <p className="text-sm text-[#888] mt-1" style={{ fontFamily: sansFont }}>
                      {entry.description}
                    </p>
                  </div>
                  <div className="text-[#666] text-xl flex-shrink-0 mt-1">
                    {isExpanded ? "−" : "+"}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-[#222]">
                    {/* Lens Explanation */}
                    <div className="mt-4 p-4 rounded-lg" style={{ background: `${lensColors[lens]}15`, borderLeft: `3px solid ${lensColors[lens]}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: lensColors[lens], fontFamily: sansFont }}>
                          {lensLabels[lens]} Lens
                        </span>
                      </div>
                      <p className="text-sm text-[#ccc] leading-relaxed" style={{ fontFamily: sansFont }}>
                        {lensText}
                      </p>
                    </div>

                    {/* Sources */}
                    <div className="mt-4 space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-[#888] font-semibold" style={{ fontFamily: sansFont }}>
                        Published Sources
                      </h4>
                      {entry.sources.map((src, i) => (
                        <div key={i} className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-amber-400 hover:text-amber-300 no-underline transition-colors"
                            style={{ fontFamily: sansFont }}
                          >
                            {src.title} ↗
                          </a>
                          <p className="text-xs text-[#666] mt-1" style={{ fontFamily: sansFont }}>
                            {src.authors} · {src.year}
                          </p>
                          <p className="text-xs text-[#999] mt-2 leading-relaxed" style={{ fontFamily: sansFont }}>
                            {src.relevance}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Link to concept page */}
                    <div className="mt-4">
                      <Link
                        href={entry.conceptLink}
                        className="inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
                        style={{ color: cat?.color, fontFamily: sansFont }}
                      >
                        Go to {entry.concept} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Builder Note */}
      <section className="container pb-16">
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: serifFont }}>A Note from the Builder</h2>
          <p className="text-sm text-[#aaa] leading-relaxed mb-3" style={{ fontFamily: sansFont }}>
            I didn't start with the research. I started with the patterns. Then I found the research.
            That's backwards from how academia works — but it's exactly how citizen science works.
            You observe first. You name what you see. Then you find out if anyone else saw it too.
          </p>
          <p className="text-sm text-[#aaa] leading-relaxed mb-3" style={{ fontFamily: sansFont }}>
            Every source on this page is real. Every link opens. Every claim is checkable.
            Some of these researchers would probably disagree with how I've applied their work.
            That's fine. Disagreement is how fields grow.
          </p>
          <p className="text-sm text-[#888] italic leading-relaxed" style={{ fontFamily: sansFont }}>
            If you're a researcher and you see your work here — thank you. If you think I got it wrong — tell me.
            The <Link href="/counter-arguments" className="text-amber-400 hover:text-amber-300 no-underline">Counter Arguments</Link> page exists for exactly that reason.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: `${entries.length}`, label: "Concepts Mapped" },
            { value: `${entries.reduce((acc, e) => acc + e.sources.length, 0)}`, label: "Published Sources" },
            { value: "3", label: "Lens Perspectives" },
            { value: `${categories.length}`, label: "Research Categories" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-400" style={{ fontFamily: serifFont }}>{stat.value}</div>
              <div className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/field-papers" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>Field Papers →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The Builder's own published research documents</p>
          </Link>
          <Link href="/citizen-researcher" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>Citizen Researcher →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The methodology behind the observations</p>
          </Link>
          <Link href="/counter-arguments" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>Counter Arguments →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The honest criticisms and what they mean</p>
          </Link>
        </div>
      </section>

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>
      {flow && (
        <LearningFlow
          current="The Research Hub"
          deeper={flow.deeper}
          wider={flow.wider}
          simpler={flow.simpler}
          dark
        />
      )}

      <Footer />
    </div>
  );
}
