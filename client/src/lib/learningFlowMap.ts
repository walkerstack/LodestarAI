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
      { label: "Five Rules", href: "/rules", description: "The rules with sloth examples" },
      { label: "Road Protocol", href: "/road-protocol", description: "The foundation under the stories" },
    ],
    wider: [
      { label: "Prompt Games", href: "/prompt-games", description: "Games to practice with" },
      { label: "Guardian Lens", href: "/for/guardian-teacher", description: "For the adults helping you" },
    ],
    simpler: [],
  },

  euAiAct: {
    deeper: [
      { label: "User-Side Governance", href: "/user-governance", description: "The user-side complement to institutional regulation" },
      { label: "What Claude Admitted", href: "/what-claude-admitted", description: "Field evidence of why the law matters" },
    ],
    wider: [
      { label: "Road Protocol", href: "/road-protocol", description: "Session governance that implements the law's principles" },
      { label: "Dual Strategy", href: "/dual-strategy", description: "Top-down law + bottom-up user governance" },
      { label: "The Three Lenses", href: "/three-lenses", description: "Read the Act through Everyday, Professional, or Watcher" },
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
};
