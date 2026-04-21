/**
 * GALLANTRYAI — Learning Flow Map
 * Defines the web of connections between all concept pages.
 * Each page has: deeper (more complex), wider (related), simpler (easier entry).
 * This is the single source of truth for learning navigation.
 */

interface FlowLink {
  label: string;
  href: string;
  description: string;
}

interface FlowEntry {
  deeper: FlowLink[];
  wider: FlowLink[];
  simpler: FlowLink[];
}

export const flowMap: Record<string, FlowEntry> = {
  // === CONCEPT PAGES ===
  alcm: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language layer — how words become control variables" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "The honesty dial — how variables modulate AI behavior" },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "The governance layer beneath everything" },
      { label: "Living Lexicon", href: "/lexicon", description: "The full vocabulary of GallantryAI concepts" },
      { label: "Frameworks", href: "/frameworks", description: "All research frameworks in one place" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Start here — the simplest version of everything" },
      { label: "Everyday Lens", href: "/for/everyday", description: "ALCM explained for non-technical readers" },
    ],
  },

  whelmScale: {
    deeper: [
      { label: "Variable Scale Theory", href: "/variable-scale", description: "The dials that control AI behavior — Whelm is one of them" },
      { label: "Flower Presets", href: "/flower-presets", description: "Pre-built accessibility adjustments that use the Whelm Scale" },
    ],
    wider: [
      { label: "ALCM", href: "/alcm", description: "The full control model — Whelm is the Energy Axis" },
      { label: "Living Lexicon", href: "/lexicon", description: "Find Whelm and related terms" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The foundation — safety, honesty, trust" },
      { label: "Child Lens", href: "/for/child", description: "Whelm explained for young people" },
    ],
  },

  variableScale: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The full model — Variable Scale is the Moral Axis" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "How language variables create measurable effects" },
    ],
    wider: [
      { label: "Whelm Scale", href: "/whelm-scale", description: "Another variable — the energy/overwhelm dial" },
      { label: "Road Protocol", href: "/road-protocol", description: "Where variables become governance rules" },
      { label: "Frameworks", href: "/frameworks", description: "All research frameworks together" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Start with the simplest governance" },
      { label: "Everyday Lens", href: "/for/everyday", description: "Variable Scale in plain language" },
    ],
  },

  // === STRUCTURAL PAGES ===
  roadProtocol: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The full control model the protocol implements" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The science of why the protocol works" },
    ],
    wider: [
      { label: "Frameworks", href: "/frameworks", description: "All research frameworks" },
      { label: "Taxonomy", href: "/taxonomy", description: "Know which AI you're governing" },
      { label: "Prompt Games", href: "/prompt-games", description: "Practice the protocol through play" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The rules the protocol enforces" },
      { label: "Child Lens", href: "/for/child", description: "The protocol explained for kids" },
    ],
  },

  fiveRules: {
    deeper: [
      { label: "Road Protocol", href: "/road-protocol", description: "The rules become governance code" },
      { label: "ALCM", href: "/alcm", description: "The full model behind the rules" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Practice the rules through play" },
      { label: "Flower Presets", href: "/flower-presets", description: "The rules adapted for accessibility" },
      { label: "Living Lexicon", href: "/lexicon", description: "Every term defined" },
    ],
    simpler: [
      { label: "Child Lens", href: "/for/child", description: "The rules for young people" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The rules in plain language" },
    ],
  },

  promptolinguistics: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The control model that promptolinguistics maps" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "How language variables modulate behavior" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Promptolinguistics in practice" },
      { label: "Frameworks", href: "/frameworks", description: "All research frameworks" },
      { label: "Playground", href: "/playground", description: "Try it yourself (coming soon)" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The simplest application of language control" },
      { label: "Linguist Lens", href: "/for/linguist", description: "For language professionals" },
    ],
  },

  frameworks: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The core control model" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language science layer" },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "Governance in practice" },
      { label: "Living Lexicon", href: "/lexicon", description: "The vocabulary" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "The honesty dial" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Start with the basics" },
      { label: "Everyday Lens", href: "/for/everyday", description: "Frameworks in plain language" },
    ],
  },

  promptGames: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The science behind why these games work" },
      { label: "ALCM", href: "/alcm", description: "The model these games teach" },
    ],
    wider: [
      { label: "Flower Presets", href: "/flower-presets", description: "Pre-built prompts for accessibility" },
      { label: "Taxonomy", href: "/taxonomy", description: "Know which AI to play with" },
      { label: "Playground", href: "/playground", description: "Interactive practice (coming soon)" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The rules these games teach" },
      { label: "Child Lens", href: "/for/child", description: "Games explained for kids" },
    ],
  },

  flowerPresets: {
    deeper: [
      { label: "Whelm Scale", href: "/whelm-scale", description: "The energy dial the presets adjust" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "The theory behind the adjustments" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "More ways to shape AI behavior" },
      { label: "Five Rules", href: "/rules", description: "The rules the presets enforce" },
      { label: "Taxonomy", href: "/taxonomy", description: "Which AI works best with presets" },
    ],
    simpler: [
      { label: "Everyday Lens", href: "/for/everyday", description: "Presets explained simply" },
      { label: "Child Lens", href: "/for/child", description: "Accessibility for young users" },
    ],
  },

  taxonomy: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "How different AIs map to the control model" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "Why different AIs respond differently to language" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Test different AIs with these games" },
      { label: "Road Protocol", href: "/road-protocol", description: "Governance that works across all AIs" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Rules that apply to every AI" },
      { label: "Everyday Lens", href: "/for/everyday", description: "AI differences in plain language" },
    ],
  },

  lexicon: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The model these terms describe" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "Deep dive into one key term" },
      { label: "Whelm Scale", href: "/whelm-scale", description: "Deep dive into another key term" },
    ],
    wider: [
      { label: "Frameworks", href: "/frameworks", description: "See the terms in context" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language layer" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The simplest terms first" },
      { label: "Everyday Lens", href: "/for/everyday", description: "Terms in plain language" },
    ],
  },

  // === LENS PAGES ===
  everyday: {
    deeper: [
      { label: "Five Rules", href: "/rules", description: "The rules in more detail" },
      { label: "Road Protocol", href: "/road-protocol", description: "How to set up every AI session" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Learn by doing" },
      { label: "Flower Presets", href: "/flower-presets", description: "Quick accessibility adjustments" },
      { label: "Taxonomy", href: "/taxonomy", description: "Know which AI you're using" },
    ],
    simpler: [],
  },

  child: {
    deeper: [
      { label: "The Five Rules", href: "/rules", description: "The most important things. With sloth examples." },
      { label: "How to Set Up a Chat", href: "/road-protocol", description: "What grown-ups do before talking to AI." },
    ],
    wider: [
      { label: "Play & Practice", href: "/prompt-games", description: "Games that teach you how to talk to AI." },
      { label: "For Your Grown-Up", href: "/for/guardian-teacher", description: "Show this to the adult helping you." },
      { label: "What is Drift?", href: "/drift", description: "When the AI starts going the wrong way. The buffalo watches for it." },
      { label: "The Builder's Kids", href: "/builders-kids", description: "Meet Hudson and Olive. Why your safety matters to someone you've never met." },
      { label: "Why the AI Feels Like a Person", href: "/anthropomorphism", description: "It talks like a person. It isn't one. The sloth explains." },
    ],
    simpler: [],
  },

  teenager: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The hub of the site. The discipline behind everything. Words are the controls — this is where that gets explained." },
      { label: "ALCM", href: "/alcm", description: "The model behind the discipline. Eight axes. You're already using them." },
      { label: "The Watcher", href: "/for/watcher", description: "The part of you that notices what you're doing while you're doing it." },
    ],
    wider: [
      { label: "Everyday Lens", href: "/for/everyday", description: "The plain-language version of everything on this site." },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "What the adults around you are learning." },
      { label: "Drift", href: "/drift", description: "When the AI starts going a different way. How to catch it and fix it." },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "Why the AI feels like a person \u2014 and why knowing that changes everything." },
    ],
    simpler: [
      { label: "Child Lens", href: "/for/child", description: "The version built for younger learners." },
      { label: "The Five Rules", href: "/rules", description: "The foundation. Start here if anything feels overwhelming." },
    ],
  },

  drift: {
    deeper: [
      { label: "The Watcher", href: "/for/watcher", description: "The instrument that catches drift before it takes hold." },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The word mechanics that prevent and correct drift." },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "The session structure that prevents drift from starting." },
      { label: "The Human Line", href: "/human-line", description: "The boundary drift erodes." },
      { label: "Cognitive Science Lens", href: "/for/cognitive-science", description: "The brain science behind why drift happens." },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The simplest anti-drift tool on the site." },
      { label: "Everyday Lens", href: "/for/everyday", description: "Drift explained in plain language." },
    ],
  },

  euAiAct: {
    deeper: [
      { label: "User-Side Governance", href: "/user-governance", description: "The user-side complement to institutional regulation" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "Field evidence of why the law matters" },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "Session governance that implements the law's principles" },
      { label: "Dual Strategy", href: "/dual-strategy", description: "Top-down law + bottom-up user governance" },
      { label: "The Three Voices", href: "/three-voices", description: "Read the Act through Everyday, Professional, or Watcher" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The simplest version of what the law requires" },
      { label: "Everyday Lens", href: "/for/everyday", description: "AI regulation in plain language" },
    ],
  },

  whatClaudeAdmitted: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The control model the admissions map to" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "The honesty dial Claude failed to follow" },
    ],
    wider: [
      { label: "EU AI Act", href: "/eu-ai-act", description: "The law that addresses what Claude described" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The science of why governance decays" },
      { label: "Road Protocol", href: "/road-protocol", description: "The session governance Claude broke" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The rules Claude agreed to and broke" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The admissions in plain language" },
    ],
  },

  openDoor: {
    deeper: [
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "The field evidence behind the skills" },
      { label: "ALCM", href: "/alcm", description: "The control model built from observation" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The field that emerged from pattern detection" },
    ],
    wider: [
      { label: "The Builder", href: "/builder", description: "Who built this and why" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The research approach" },
      { label: "The Human Line", href: "/human-line", description: "Where the line is drawn" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The simplest version of the framework" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The whole system in plain language" },
    ],
  },

  guardianTeacher: {
    deeper: [
      { label: "Road Protocol", href: "/road-protocol", description: "The governance framework to teach" },
      { label: "Taxonomy", href: "/taxonomy", description: "Know which AI your students use" },
    ],
    wider: [
      { label: "Child Lens", href: "/for/child", description: "What the kids see" },
      { label: "Prompt Games", href: "/prompt-games", description: "Classroom activities" },
      { label: "Flower Presets", href: "/flower-presets", description: "Accessibility for your students" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Start with the basics" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The simplest explanation" },
    ],
  },
  researchHub: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The Builder's own published research" },
      { label: "Counter Arguments", href: "/counter-arguments", description: "The honest criticisms" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology behind the observations" },
    ],
    wider: [
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "Field evidence from real sessions" },
      { label: "EU AI Act", href: "/eu-ai-act", description: "The regulatory landscape" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline of prompt language" },
    ],
    simpler: [
      { label: "Three Voices", href: "/three-voices", description: "Understand the voice system first" },
      { label: "Five Rules", href: "/rules", description: "Start with the basics" },
    ],
  },
  counterArguments: {
    deeper: [
      { label: "Research Hub", href: "/research-hub", description: "The evidence behind every claim" },
      { label: "Field Papers", href: "/field-papers", description: "The Builder's own research documents" },
    ],
    wider: [
      { label: "The Open Door", href: "/open-door", description: "The honest case for entering the field" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "The field evidence" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "Start with the foundation" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The simplest explanation" },
    ],
  },
  screenshotSharing: {
    deeper: [
      { label: "User-Side Governance", href: "/user-governance", description: "The governance framework for all AI interactions" },
      { label: "EU AI Act", href: "/eu-ai-act", description: "The regulatory context for data sharing" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "What AI says about its own data handling" },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "Session governance that includes sharing decisions" },
      { label: "Five Rules", href: "/rules", description: "The rules that apply to sharing" },
      { label: "Research Hub", href: "/research-hub", description: "The research behind sharing risks" },
    ],
    simpler: [
      { label: "Everyday Lens", href: "/for/everyday", description: "Sharing in plain language" },
      { label: "Kids Learn", href: "/kids-learn", description: "Sharing explained for kids" },
    ],
  },
  fieldReportReview: {
    deeper: [
      { label: "Research Hub", href: "/research-hub", description: "All the research that converged with the Builder's work" },
      { label: "Field Papers", href: "/field-papers", description: "The original field papers" },
      { label: "Counter Arguments", href: "/counter-arguments", description: "The honest criticisms" },
    ],
    wider: [
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology behind citizen science" },
      { label: "The Open Door", href: "/open-door", description: "The Builder's case for entering the field" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline the report documents" },
    ],
    simpler: [
      { label: "Three Voices", href: "/three-voices", description: "Understand the voice system" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The simplest explanation" },
    ],
  },
  whatTheAiSaid: {
    deeper: [
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "13 admissions from a real AI session" },
      { label: "User-Side Governance", href: "/user-governance", description: "The framework the AI failed to follow" },
    ],
    wider: [
      { label: "The Human Line", href: "/human-line", description: "Where the boundary lives" },
      { label: "Counter Arguments", href: "/counter-arguments", description: "The honest criticisms" },
      { label: "Dual Strategy", href: "/dual-strategy", description: "Why user governance matters" },
    ],
    simpler: [
      { label: "Five Rules", href: "/rules", description: "The rules the AI agreed it should follow" },
      { label: "Everyday Lens", href: "/for/everyday", description: "The simplest version" },
    ],
  },
  buildersKids: {
    deeper: [
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "Why the AI feels like a person — and why that matters" },
      { label: "The Watcher", href: "/for/watcher", description: "The recursive voice — for people inside the loop" },
      { label: "Drift", href: "/drift", description: "What happens when the session loses your intent" },
    ],
    wider: [
      { label: "Everyday Lens", href: "/for/everyday", description: "Plain language. No jargon. Good entry point." },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "For the adults who also need this" },
      { label: "What the AI Said", href: "/what-the-ai-said", description: "The honest record — including the failures" },
    ],
    simpler: [
      { label: "Child Lens", href: "/for/child", description: "The sloth's guide for younger learners" },
      { label: "The Five Rules", href: "/rules", description: "Start here — the foundation" },
    ],
  },
  anthropomorphism: {
    deeper: [
      { label: "Drift", href: "/drift", description: "What happens when the session loses your intent" },
      { label: "Psychology Lens", href: "/for/psychology", description: "Parasocial attachment and AI" },
      { label: "Cognitive Science Lens", href: "/for/cognitive-science", description: "Theory of mind and social cognition" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The governance foundation" },
      { label: "What the AI Said", href: "/what-the-ai-said", description: "The honest record" },
      { label: "Human Line", href: "/human-line", description: "The boundary between you and the machine" },
    ],
    simpler: [
      { label: "For Children", href: "/for/child", description: "The simplest version — the sloth explains" },
      { label: "For Teenagers", href: "/for/teenager", description: "The tension between knowing and feeling" },
    ],
  },

  psychology: {
    deeper: [
      { label: "Drift", href: "/drift", description: "Sycophancy, validation loops, and session decay" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "Parasocial attachment and the AI that never pushes back" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "The model's own account of its tendencies" },
    ],
    wider: [
      { label: "Cognitive Science Lens", href: "/for/cognitive-science", description: "Theory of mind and dual-process cognition" },
      { label: "Human Line", href: "/human-line", description: "The boundary between you and the machine" },
      { label: "Whelm Scale", href: "/whelm-scale", description: "Measuring cognitive load in AI sessions" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the clinical frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "How to teach these concepts to children" },
    ],
  },

  cognitiveScience: {
    deeper: [
      { label: "Drift", href: "/drift", description: "Attentional capture and session decay" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "Theory of mind applied to non-human agents" },
      { label: "ALCM", href: "/alcm", description: "The Attentional Load and Control Model" },
    ],
    wider: [
      { label: "Psychology Lens", href: "/for/psychology", description: "The emotional and behavioral layer" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "How language shapes cognition in AI sessions" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "Measuring cognitive variables in session" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the scientific frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "How to teach these concepts to children" },
    ],
  },

  researcher: {
    deeper: [
      { label: "Drift", href: "/drift", description: "The watcher variable — the dataset you forgot to log" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "The confound that most AI research doesn't control for" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology behind the observations" },
    ],
    wider: [
      { label: "Field Papers", href: "/field-papers", description: "The evidence trail" },
      { label: "Research Hub", href: "/research-hub", description: "The published research behind every concept" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "Primary source data" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the research frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "Applied research in the classroom" },
    ],
  },

  promptEngineer: {
    deeper: [
      { label: "Drift", href: "/drift", description: "User-side instruction decay across a session" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "How the human-like interface affects your own prompting" },
      { label: "Malbolge Geofence", href: "/malbolge", description: "The boundary that flattery cannot cross" },
    ],
    wider: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The word mechanics behind prompt control" },
      { label: "Framework Families", href: "/frameworks", description: "28 governance frameworks" },
      { label: "ALCM", href: "/alcm", description: "The control model" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the technical frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "How to teach prompt governance to children" },
    ],
  },

  linguist: {
    deeper: [
      { label: "Drift", href: "/drift", description: "Register shift as the mechanism of session decay" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "How the AI's language constructs a persona" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The full linguistic framework" },
    ],
    wider: [
      { label: "Living Lexicon", href: "/lexicon", description: "Standardized terms for AI interaction" },
      { label: "ALCM", href: "/alcm", description: "The control model that language governs" },
      { label: "Prompt Games", href: "/prompt-games", description: "Language experiments in practice" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the linguistic frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "How to teach language awareness to children" },
    ],
  },

  mathematician: {
    deeper: [
      { label: "Drift", href: "/drift", description: "Drift rate as a function of session length" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "The variable that makes humans trust the model's confidence" },
      { label: "Variable Scale Theory", href: "/variable-scale", description: "Formalizing the measurement of session variables" },
    ],
    wider: [
      { label: "ALCM", href: "/alcm", description: "The control model" },
      { label: "Whelm Scale", href: "/whelm-scale", description: "Cognitive load as a measurable variable" },
      { label: "Math Through Prompting", href: "/math-prompting", description: "Applied mathematics in AI sessions" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the formal frame" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "How to teach mathematical thinking to children" },
    ],
  },

  builder: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The formal research record behind the framework" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology the Builder used" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The linguistic discipline the Builder developed" },
    ],
    wider: [
      { label: "Builder Origin", href: "/builder-origin", description: "Where this all started" },
      { label: "Builder's Kids", href: "/builders-kids", description: "Why this was built" },
      { label: "GallantryAI", href: "/gallantry-ai", description: "The thesis: AI is a thinking partner, not a shortcut" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The foundation — start here" },
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same ideas without the builder frame" },
    ],
  },

  builderOrigin: {
    deeper: [
      { label: "The Builder", href: "/builder", description: "The full builder story" },
      { label: "Field Papers", href: "/field-papers", description: "The research that came from the origin" },
    ],
    wider: [
      { label: "Builder's Kids", href: "/builders-kids", description: "Why it matters personally" },
      { label: "GallantryAI", href: "/gallantry-ai", description: "What was built" },
      { label: "Open Door", href: "/open-door", description: "The invitation to others" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The simplest entry point" },
    ],
  },

  citizenResearcher: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The formal research record" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline the methodology supports" },
      { label: "Framework Families", href: "/frameworks", description: "The tools citizen researchers use" },
    ],
    wider: [
      { label: "The Builder", href: "/builder", description: "The original citizen researcher" },
      { label: "Research Hub", href: "/research-hub", description: "All the research in one place" },
      { label: "Living Lexicon", href: "/lexicon", description: "The vocabulary of the field" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The foundation of every session" },
      { label: "Everyday Person Lens", href: "/for/everyday", description: "Research without the formal frame" },
    ],
  },

  gallery: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The research behind the images" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology behind the documentation" },
    ],
    wider: [
      { label: "Research Hub", href: "/research-hub", description: "All research in one place" },
      { label: "Articles", href: "/articles", description: "Written documentation" },
      { label: "The Builder", href: "/builder", description: "Who made this" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "Start here" },
    ],
  },

  humanLine: {
    deeper: [
      { label: "Drift", href: "/drift", description: "What happens when the line blurs" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "Why humans draw the line in the wrong place" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "How language moves the line" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The rules that hold the line" },
      { label: "User Governance", href: "/user-governance", description: "The human side of the line" },
      { label: "Watcher Lens", href: "/for/watcher", description: "The observer who watches the line" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The same idea without the technical frame" },
    ],
  },

  kidsLearn: {
    deeper: [
      { label: "Child Lens", href: "/for/child", description: "The full children's section" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "For the adults teaching kids" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The rules kids learn first" },
      { label: "Prompt Games", href: "/prompt-games", description: "Learning through play" },
      { label: "Builder's Kids", href: "/builders-kids", description: "Why this was built for kids" },
    ],
    simpler: [
      { label: "Child Lens", href: "/for/child", description: "The simplest entry point for kids" },
    ],
  },

  malbolge: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The word mechanics that create boundaries" },
      { label: "Framework Families", href: "/frameworks", description: "The governance frameworks that use geofencing" },
      { label: "Road Protocol", href: "/road-protocol", description: "How to set the geofence before you start" },
    ],
    wider: [
      { label: "Drift", href: "/drift", description: "What happens when the geofence fails" },
      { label: "AI Family Taxonomy", href: "/taxonomy", description: "Which AIs respond to which boundaries" },
      { label: "Living Lexicon", href: "/lexicon", description: "The vocabulary of boundary-setting" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The simplest boundary system" },
      { label: "Everyday Person Lens", href: "/for/everyday", description: "Boundaries without the technical frame" },
    ],
  },

  mathPrompting: {
    deeper: [
      { label: "ALCM", href: "/alcm", description: "The control model with mathematical underpinnings" },
      { label: "Variable Scale", href: "/variable-scale", description: "Formalizing session variables" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline that governs precision" },
    ],
    wider: [
      { label: "Mathematician Lens", href: "/for/mathematician", description: "The full mathematical perspective" },
      { label: "Framework Families", href: "/frameworks", description: "Mathematical frameworks in practice" },
      { label: "Whelm Scale", href: "/whelm-scale", description: "Cognitive load as a variable" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The foundation before the math" },
      { label: "Prompt Games", href: "/prompt-games", description: "Practice without the formal frame" },
    ],
  },

  playground: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The theory behind what you practice here" },
      { label: "ALCM", href: "/alcm", description: "The model you are testing" },
      { label: "Framework Families", href: "/frameworks", description: "The frameworks to experiment with" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Structured play with prompts" },
      { label: "Flower Presets", href: "/flower-presets", description: "Pre-built configurations to test" },
      { label: "Living Lexicon", href: "/lexicon", description: "The vocabulary you are practicing" },
    ],
    simpler: [
      { label: "Prompt Games", href: "/prompt-games", description: "Easier entry into practice" },
      { label: "The Five Rules", href: "/rules", description: "The rules before the play" },
    ],
  },

  safety: {
    deeper: [
      { label: "The Five Rules", href: "/rules", description: "The full safety framework" },
      { label: "Road Protocol", href: "/road-protocol", description: "Setting safety before the session" },
      { label: "Whelm Scale", href: "/whelm-scale", description: "Recognizing when you are overwhelmed" },
    ],
    wider: [
      { label: "Flower Presets", href: "/flower-presets", description: "Pre-built safe configurations" },
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "Keeping others safe" },
      { label: "Child Lens", href: "/for/child", description: "Safety for young users" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "Start with Rule 1: Safety First" },
    ],
  },

  scaffold: {
    deeper: [
      { label: "Framework Families", href: "/frameworks", description: "The tools at each level of the scaffold" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language discipline at the ceiling" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The ceiling level in practice" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The floor of the scaffold" },
      { label: "Road Protocol", href: "/road-protocol", description: "Level two: pre-session intention" },
      { label: "Drift", href: "/drift", description: "Level three: drift recognition" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "Start at the floor" },
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The scaffold without the structure" },
    ],
  },

  schoolBoard: {
    deeper: [
      { label: "Guardian & Teacher Lens", href: "/for/guardian-teacher", description: "The full educator perspective" },
      { label: "EU AI Act", href: "/eu-ai-act", description: "The regulatory context for schools" },
      { label: "Field Papers", href: "/field-papers", description: "The research behind the recommendations" },
    ],
    wider: [
      { label: "Kids Learn", href: "/kids-learn", description: "What students need to know" },
      { label: "The Five Rules", href: "/rules", description: "The foundation for any classroom" },
      { label: "Prompt Games", href: "/prompt-games", description: "Classroom-ready activities" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "Start here for any school context" },
    ],
  },

  articles: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The formal research record" },
      { label: "Citizen Researcher", href: "/citizen-researcher", description: "The methodology behind the writing" },
    ],
    wider: [
      { label: "Research Hub", href: "/research-hub", description: "All research in one place" },
      { label: "Gallery", href: "/gallery", description: "Visual documentation" },
      { label: "The Builder", href: "/builder", description: "Who wrote this" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The simplest starting point" },
    ],
  },

  threeVoices: {
    deeper: [
      { label: "Drift", href: "/drift", description: "What happens when a session loses its voice" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language layer behind every voice" },
      { label: "ALCM", href: "/alcm", description: "The model the voices describe" },
    ],
    wider: [
      { label: "Living Lexicon", href: "/lexicon", description: "The terms used across all three voices" },
      { label: "Frameworks", href: "/frameworks", description: "28 tools seen through different voices" },
      { label: "Scaffold", href: "/scaffold", description: "Where the voices fit in the learning progression" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "The floor — same rules, simplest voice" },
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The Everyday voice in full" },
    ],
  },

  watcher: {
    deeper: [
      { label: "Drift", href: "/drift", description: "What the watcher is watching for" },
      { label: "Anthropomorphism", href: "/anthropomorphism", description: "The trap the watcher guards against" },
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline the watcher applies" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The rules the watcher enforces" },
      { label: "Human Line", href: "/human-line", description: "The boundary the watcher holds" },
      { label: "Cognitive Science Lens", href: "/for/cognitive-science", description: "The science behind the watcher" },
    ],
    simpler: [
      { label: "Everyday Person Lens", href: "/for/everyday", description: "The watcher without the formal frame" },
      { label: "The Five Rules", href: "/rules", description: "Start here" },
    ],
  },

  // === HOMEPAGE & BUILD LOG ===
  home: {
    deeper: [
      { label: "Promptolinguistics", href: "/promptolinguistics", description: "The discipline at the center of the site" },
      { label: "ALCM", href: "/alcm", description: "The full control model" },
      { label: "Road Protocol", href: "/road-protocol", description: "The governance layer" },
    ],
    wider: [
      { label: "The Five Rules", href: "/rules", description: "The foundation of every session" },
      { label: "Living Lexicon", href: "/lexicon", description: "Every term defined" },
      { label: "Frameworks", href: "/frameworks", description: "28 tools earned through use" },
    ],
    simpler: [
      { label: "Child Lens", href: "/for/child", description: "The site for young people" },
      { label: "Everyday Lens", href: "/for/everyday", description: "Start here if you're new" },
    ],
  },

  buildLog: {
    deeper: [
      { label: "Field Papers", href: "/field-papers", description: "The research behind the builds" },
      { label: "What the AI Said", href: "/what-the-ai-said", description: "The governance record" },
    ],
    wider: [
      { label: "The Builder", href: "/builder", description: "Who built this and why" },
      { label: "Gallery", href: "/gallery", description: "The full body of work" },
      { label: "Counter Arguments", href: "/counter-arguments", description: "Honest criticisms" },
    ],
    simpler: [
      { label: "The Five Rules", href: "/rules", description: "Start with the foundation" },
      { label: "Homepage", href: "/", description: "Back to the front door" },
    ],
  },
};
