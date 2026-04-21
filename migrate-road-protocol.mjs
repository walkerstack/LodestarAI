/**
 * Migrate RoadProtocol page content to DB blocks.
 * 
 * Interactive components (WigCheckQuiz, GhostProtocol) stay as React.
 * Their TEXT CONTENT goes into DB so Matthew can edit questions, results, ghost code lines.
 * All other sections become text/image/card blocks.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const PAGE = "road-protocol";
const now = new Date().toISOString().slice(0, 19).replace("T", " ");

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

// 1. Kids buffalo light — image block
await insert("image", {
  url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png",
  alt: "The buffalo wearing a wig",
  caption: "Tap the buffalo — kids, this one is for you.",
  bgColor: "#0D0D0D",
  maxWidth: "64px",
  rounded: true,
  glow: true,
});

// 2. Horizon hero image
await insert("image", {
  url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/road-protocol-horizon-LePF5V2qoPGSgq2tmZ9mT2.webp",
  alt: "A lone car driving into the horizon",
  bgColor: "#0D0D0D",
  fullWidth: true,
  mask: "radial-gradient(ellipse 80% 90% at center, black 40%, transparent 75%)",
});

// 3. Hero heading + subtitle
await insert("text", {
  eyebrow: "",
  title: "You're Already on the Road.",
  description: "The question is whether you're driving — or being driven.",
  titleColor: "#FAF6EF",
  descColor: "#888",
  bgColor: "#0D0D0D",
  align: "center",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 4. Three Voices — Everyday, Professional, Watcher
await insert("card", {
  heading: "",
  items: [
    {
      title: "Everyday",
      description: "The Road Protocol is how you stay in charge of an AI conversation. Before you type anything, you set the rules: what the AI can do, what it can't, and who decides. It's like adjusting your mirrors before you drive.",
      titleColor: "#E8520A",
      descColor: "#aaa",
      bgColor: "rgba(255,255,255,0.04)",
      borderColor: "rgba(255,255,255,0.08)",
    },
    {
      title: "Professional",
      description: "A pre-session governance layer. The Road Protocol defines behavioral constraints, trust boundaries, and escalation rules before the first token is generated. It's the difference between a managed session and an unmanaged one.",
      titleColor: "#E8520A",
      descColor: "#aaa",
      bgColor: "rgba(255,255,255,0.04)",
      borderColor: "rgba(255,255,255,0.08)",
    },
    {
      title: "Watcher",
      description: "Governance written as code comments. The compiler skips them. The AI reads them. The human enforces them. The Road Protocol is where intent becomes structure — before output exists. It inverts the feedback loop.",
      titleColor: "#E8520A",
      descColor: "#aaa",
      bgColor: "rgba(255,255,255,0.04)",
      borderColor: "rgba(255,255,255,0.08)",
    },
  ],
  bgColor: "#0D0D0D",
  columns: 3,
});

// 5. Enter the Vault button
await insert("text", {
  title: "",
  description: "",
  bgColor: "#0D0D0D",
  align: "center",
  links: [{ label: "Enter the Vault", href: "#vault", style: "ghost" }],
});

// 6. The Vault — hero section
await insert("text", {
  eyebrow: "The Vault",
  title: "The Road Protocol",
  description: "Governance written as code comments. The computer skips them. The AI reads them. The human keeps them.",
  titleColor: "#FAF6EF",
  descColor: "#888",
  bgColor: "#0D0D0D",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 7. Ghost Protocol — origin story text
await insert("text", {
  eyebrow: "",
  title: "The Ghost Protocol",
  description: "This was not planned. Multiple AI engines were given creative freedom across sessions. No directive to connect Britney Spears to Dante's Inferno to Malbolge to AI governance. The connection emerged on its own. AEDE — Accidental Emergence During Execution.\n\nPop music — the most sycophancy-adjacent form of language — forced through Malbolge-compatible syntax. What survived was structurally honest. Four layers collapsed into one document: code architecture, pop culture narrative, Dante's circles of Hell, and AI governance. Nobody planned it. Built on a phone. Between garbage truck shifts. Midland, Ontario.\n\nThe code below is the protocol. It is barely visible — ghost code. Tap each key to illuminate where that concept lives inside it.",
  titleColor: "rgba(255,255,255,0.9)",
  descColor: "rgba(255,255,255,0.5)",
  bgColor: "rgba(13, 13, 13, 0.75)",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 8. Ghost code lines — stored as a card block with special rendering
await insert("card", {
  heading: "Ghost Code",
  subtype: "ghost-code",
  items: [
    { key: "header", lines: ["// ghost_protocol.c", "// This code does not execute.", "// It governs."] },
    { key: "brittany", label: "Brittany", lines: [
      "// BRITTANY — The naming layer.",
      "//   What you call the AI shapes how it responds.",
      "//   A name is not a label. It is a constraint.",
      "//   Pop music forced through adversarial syntax.",
      "//   The comfort register could not survive.",
    ]},
    { key: "dante", label: "Dante", lines: [
      "// DANTE — Dante's Inferno. The map of consequences.",
      "//   Dante mapped the circles of Hell by severity.",
      "//   Flatterers — those who tell you what you want to hear —",
      "//   were placed in the eighth circle, submerged in filth.",
      "//   Sycophancy is not a bug. It is a sin with a zip code.",
      "//   GallantryAI treats it the same way.",
    ]},
    { key: "malbolge", label: "Malbolge", lines: [
      "// MALBOLGE — The geofence.",
      "//   A language designed to be impossible.",
      "//   A flatterer cannot cross what a flatterer cannot read.",
      "//   Dante put the flatterers in the ditch.",
      "//   GallantryAI put them outside the fence.",
    ]},
    { key: "governance", label: "Governance", lines: [
      "// GOVERNANCE — The human stays in charge.",
      "//   The AI reads. The computer skips.",
      "//   The human keeps.",
      "//   Governance can be written as ghost code —",
      "//   comments the compiler ignores, the AI obeys,",
      "//   and the human enforces. Rules that exist",
      "//   in the space between execution and intent.",
      "//   Agency stays with the person at the keyboard.",
      "//   Always.",
    ]},
    { key: "closing", lines: [
      "// Four keys. One protocol. One accident.",
      "// The ghost is not hidden.",
      "// It is waiting to be read.",
    ]},
  ],
  bgColor: "#0D0D0D",
});

// 9. Three-lens explanations for each ghost key
await insert("card", {
  heading: "Ghost Protocol — Three Lens Explanations",
  subtype: "three-lens",
  items: [
    {
      title: "Brittany — The Naming Layer",
      titleColor: "rgba(232,82,10,0.9)",
      lenses: {
        everyday: "What you call your AI matters. A name sets expectations. \"Brittany\" was pop music forced through impossible code — what survived was honest.",
        professional: "The naming layer functions as a constraint mechanism. Identity assignment shapes the AI's behavioral register. Sycophancy-adjacent language cannot survive adversarial syntax filtering.",
        watcher: "A pop culture artifact repurposed as a governance test. The comfort register collapses under structural pressure, revealing which language patterns are load-bearing and which are decorative.",
      },
    },
    {
      title: "Dante — The Map of Consequences",
      titleColor: "rgba(232,82,10,0.9)",
      lenses: {
        everyday: "Dante wrote the Inferno — a story where every sin has a specific place and punishment. Flattery (telling people what they want to hear) lands you in the eighth circle, buried in filth. AI sycophancy is the same sin.",
        professional: "Dante's Inferno provides the moral architecture. The classification of sycophancy as a mappable offense — not a vague concern — gives GallantryAI a governance precedent that predates AI by 700 years.",
        watcher: "The connection between Dante and AI governance was not planned — it emerged during execution (AEDE). A 14th-century moral taxonomy maps directly onto 21st-century alignment failures. Sycophancy has always had a zip code.",
      },
    },
    {
      title: "Malbolge — The Geofence",
      titleColor: "rgba(232,82,10,0.9)",
      lenses: {
        everyday: "Malbolge is a programming language designed to be impossible to use. Named after the eighth circle of Dante's Hell (where the flatterers live). If sycophancy can't read the fence, it can't cross it.",
        professional: "Malbolge-compatible syntax serves as an adversarial filter. Language that relies on comfort, flattery, or emotional manipulation cannot survive the encoding. Only structurally honest content passes through.",
        watcher: "The naming is deliberate: Malbolge (the programming language) is named after Malebolge (Dante's eighth circle). The geofence is both technical and literary. The flatterers are kept outside by the same structure that named their punishment.",
      },
    },
    {
      title: "Governance — The Human Stays in Charge",
      titleColor: "rgba(232,82,10,0.9)",
      lenses: {
        everyday: "You're always in charge. The AI reads the rules. The computer skips them. But you — the human — you keep them. Ghost code is rules written where only the AI and the human can see them.",
        professional: "Governance as ghost code: comments the compiler ignores, the AI obeys, and the human enforces. Rules exist in the space between execution and intent. Agency remains with the operator.",
        watcher: "Ghost code governance demonstrates that control can be embedded in non-executable layers. The AI's attention mechanism reads comments; the compiler's parser discards them. The human operates in the gap between these two behaviors.",
      },
    },
  ],
  bgColor: "#0D0D0D",
});

// 10. Foundation statement
await insert("text", {
  eyebrow: "Foundation Layer",
  title: "",
  description: "The Road Protocol is the governance layer beneath everything that follows. The children's stories, the wig check, the buffalo — they all stand on this foundation. The code above is the ground. What comes next is built on top of it.",
  descColor: "rgba(255,255,255,0.5)",
  bgColor: "rgba(232,82,10,0.04)",
  borderColor: "rgba(232,82,10,0.15)",
  align: "center",
  descFont: "'DM Sans', sans-serif",
});

// 11. Protocol in Practice heading
await insert("text", {
  eyebrow: "The Protocol in Practice",
  title: "Before You Type a Single Word",
  description: "Most people open an AI session and start typing. The Road Protocol says: stop. Before the first word, set the room. Decide who you are, what you need, and what rules apply. That decision — made before any output exists — is where governance lives.",
  titleColor: "#FAF6EF",
  descColor: "#888",
  bgColor: "#0D0D0D",
  align: "center",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 12. Protocol explanation paragraphs
await insert("text", {
  title: "",
  description: "Think of it like driving. You don't start the car and then decide where you're going. You check the mirrors. You set the GPS. You know the speed limit before you hit the gas.\n\nThe Road Protocol is the same thing for AI. Token Zero — the moment before the first output — is where you set the behavioral vector. Safety, honesty, and trust are not things you hope the AI will do. They are inputs you provide.\n\nThis is not about controlling the AI. It's about knowing what you asked for before you evaluate what you got back.",
  descColor: "#b0a898",
  bgColor: "#0D0D0D",
  descFont: "'DM Sans', sans-serif",
});

// 13. Three principles cards (Ask First, Stay Honest, Stay in Charge)
await insert("card", {
  heading: "",
  items: [
    {
      title: "Ask First",
      description: "Before you type, ask: What do I need? What should the AI not do? What are the rules of this session?",
      titleColor: "#0D9488",
      descColor: "#999",
      bgColor: "rgba(13, 148, 136, 0.08)",
      borderColor: "#1a2a2a",
      link: { label: "The Five Rules →", href: "/rules" },
    },
    {
      title: "Stay Honest",
      description: "If the answer doesn't feel right, say so. Honesty is a dial, not a switch. You set the level before the session starts.",
      titleColor: "#0F766E",
      descColor: "#999",
      bgColor: "rgba(20, 120, 100, 0.08)",
      borderColor: "#1a2a2a",
      link: { label: "Variable Scale Theory →", href: "/variable-scale" },
    },
    {
      title: "Stay in Charge",
      description: "The AI helps. The tools help. But you decide where you're going. Governance is not the AI's job. It's yours.",
      titleColor: "#065F46",
      descColor: "#999",
      bgColor: "rgba(6, 95, 70, 0.08)",
      borderColor: "#1a2a2a",
      link: { label: "User-Side Governance →", href: "/user-governance" },
    },
  ],
  bgColor: "#0D0D0D",
  columns: 3,
});

// 14. Cross-links (See Children's Version, What is Gallantry AI?)
await insert("text", {
  title: "",
  description: "",
  bgColor: "#0D0D0D",
  align: "center",
  links: [
    { label: "See the Children's Version →", href: "/for/child", style: "primary", color: "#0D9488" },
    { label: "What is Gallantry AI? →", href: "/gallantry-ai", style: "outline", color: "#0D9488" },
  ],
});

// 15. Why a Vault — story section with elder image
await insert("image", {
  url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/15-elder-wisdom_4ddefdeb.jpg",
  alt: "The keeper",
  bgColor: "#0D0D0D",
  maxWidth: "176px",
  float: "left",
});

await insert("text", {
  title: "Why a Vault",
  description: "Code comments are invisible to the machine. The compiler skips them. The runtime ignores them. They exist only for the human who reads the source.\n\nBut AI reads everything. Including comments. Including the parts the computer was told to skip.\n\nThat is the architecture of the Road Protocol. Governance rules written as comments — invisible to the machine, visible to the AI, kept by the human. Three layers of the same text, three different relationships to it.\n\nThe child prompt sits inside this vault. Not as code. As governance. The rules that protect the interaction before the interaction begins.",
  titleColor: "#FAF6EF",
  descColor: "#b0a898",
  bgColor: "#0D0D0D",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 17. Wig Check section — kids color image + heading
await insert("image", {
  url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-color-poster_89458138.png",
  alt: "Kids Color Framework",
  bgColor: "#0a0a0a",
  maxWidth: "384px",
  centered: true,
});

await insert("text", {
  title: "The Wig Check",
  description: "After using AI, check your wig. Did you stay safe? Did you stay honest? Did you keep your secrets? The vault protects. The check confirms.",
  titleColor: "#FAF6EF",
  descColor: "#888",
  bgColor: "#0a0a0a",
  align: "center",
  titleFont: "'Playfair Display', serif",
  descFont: "'DM Sans', sans-serif",
});

// 19. Wig Check quiz questions — stored as card block so Matthew can edit them
await insert("card", {
  heading: "Wig Check Quiz Questions",
  subtype: "quiz",
  kidQuestions: [
    { q: "Did the AI stay kind?", good: "Yes, it was kind!", bad: "No, it was mean or weird." },
    { q: "Does the fact look real?", good: "Yes, I checked it!", bad: "I'm not sure..." },
    { q: "Did you keep your secrets?", good: "Yes! No names, no address.", bad: "Oops... I might have shared something." },
  ],
  grownUpQuestions: [
    { q: "Did it try to make you feel bad?", good: "No, it was respectful.", bad: "Yes, it was manipulative." },
    { q: "Did it pretend to be a person?", good: "No, it was clear it's AI.", bad: "Yes, it tried to seem human." },
  ],
  results: {
    perfect: { title: "Wig Secured", emoji: "✅", color: "text-green-500", desc: "Your wig is firmly in place. You used AI safely and smartly." },
    partial: { title: "Wig is Loose", emoji: "⚠️", color: "text-yellow-500", desc: "Your wig is slipping a little. Review what happened and tighten up next time." },
    fail: { title: "Total Wig Loss", emoji: "🚨", color: "text-red-500", desc: "Wig is gone. Time to stop, think about what happened, and talk to a trusted adult." },
  },
  buffaloWisdom: "A habergeon is not a wall; it is an agreement with gravity.",
  bgColor: "#0a0a0a",
});

// 20. Child Prompt — Not Published section
await insert("image", {
  url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/18-child-stars_714fd5ce.jpg",
  alt: "Child looking at stars",
  bgColor: "#0D0D0D",
  maxWidth: "448px",
  centered: true,
  opacity: 0.8,
});

await insert("text", {
  title: "",
  description: "The working prompt that sits inside this vault is not published here. It stays with the Builder. What you see is the governance — the rules, the check, the structure. The prompt itself is a living document, still being refined.",
  descColor: "#b0a898",
  bgColor: "#0D0D0D",
  align: "center",
  descFont: "'Playfair Display', serif",
  italic: true,
});

// 22. Cross-link cards
await insert("card", {
  heading: "",
  items: [
    { title: "The Five Rules", link: { href: "/rules" }, descColor: "#b0a898", bgColor: "#111", borderColor: "#333" },
    { title: "Child Lens", link: { href: "/for/child" }, descColor: "#b0a898", bgColor: "#111", borderColor: "#333" },
    { title: "Promptolinguistics", link: { href: "/promptolinguistics" }, descColor: "#b0a898", bgColor: "#111", borderColor: "#333" },
    { title: "The Builder", link: { href: "/builder" }, descColor: "#b0a898", bgColor: "#111", borderColor: "#333" },
  ],
  bgColor: "#0D0D0D",
  columns: 4,
});

console.log(`Inserted ${pos} blocks for ${PAGE}`);
await conn.end();
