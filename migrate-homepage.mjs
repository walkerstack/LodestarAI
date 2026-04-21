/**
 * migrate-homepage.mjs
 * Migrates all static homepage sections to content_blocks in the DB.
 * Interactive sections (pathfinding, ethos, scaffold) stay as React.
 * Build log moves to a separate page (see migrate-buildlog.mjs).
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const PAGE = "home";

// Clear existing blocks for this page
await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [PAGE]);

const blocks = [
  // ── 1. HERO IMAGE ──
  {
    type: "image",
    position: 1,
    content: JSON.stringify({
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-buffalo-sloth-UYXnMKJjCqLZjEqnYaQKzQ.webp",
      alt: "The buffalo stands guard. The sloth sits beside it. Guardian and guide.",
      maxHeight: "420px",
      objectPosition: "center 35%",
      overlayGradient: "linear-gradient(to bottom, transparent 50%, #080604 100%)",
    }),
  },
  // ── 2. WATCHER QUOTE ──
  {
    type: "text",
    position: 2,
    content: JSON.stringify({
      body: "\u201CThe watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.\u201D",
      style: "italic",
      font: "Playfair Display",
      color: "#c8b89a",
      align: "center",
      borderBottom: true,
    }),
  },
  // ── 3. A THINKING PARTNER headline ──
  {
    type: "text",
    position: 3,
    content: JSON.stringify({
      label: "GallantryAI",
      heading: "A Thinking Partner. Not a Shortcut.",
      body: "AI governance built for the person holding the phone.\nPromptolinguistics. Drift protection. The Five Rules. A children\u2019s safety system. A living build log. And a framework that starts with one question: are you still in charge?",
      links: [
        { label: "The Five Rules \u2192", path: "/rules" },
        { label: "Promptolinguistics \u2192", path: "/promptolinguistics" },
        { label: "The Builder \u2192", path: "/builder" },
      ],
      proof: "This site is the proof of the framework it teaches.",
    }),
  },
  // ── 4. PROMPTOLINGUISTICS SECTION ──
  {
    type: "text",
    position: 4,
    content: JSON.stringify({
      label: "The Discipline",
      heading: "Promptolinguistics",
      body: "The discipline of language as a control surface. Every word in a prompt carries a force profile \u2014 direction, constraint, scope, authority. Promptolinguistics is the study of how those forces shape AI output before the first token is generated.",
      pullQuote: "Token Zero is the pre-output force profile. It exists before the first word appears. It is shaped by every word you chose \u2014 and every word you didn\u2019t.",
      links: [
        { label: "Enter Promptolinguistics \u2192", path: "/promptolinguistics" },
      ],
    }),
  },
  // ── 5. WHAT GALLANTRYAI IS ──
  {
    type: "text",
    position: 5,
    content: JSON.stringify({
      label: "What This Is",
      heading: "What GallantryAI Is",
      body: "I built this because I needed it.\n\nI was using AI every day and I noticed something: the longer I used it, the less I checked its work. The AI was confident. I was tired. And the gap between what it said and what was true got wider without me noticing.\n\nSo I built a framework. Not for the AI \u2014 for me. A set of rules that kept me in charge of the session. A way to notice when I was drifting. A way to come back.\n\nThen I realized: if I need this, other people do too. Parents. Teachers. Nurses. Students. Kids.\n\nThree values hold the whole thing:\n\u2022 Safety first. Always.\n\u2022 Honesty over confidence.\n\u2022 Trust built over time \u2014 not assumed.",
      links: [
        { label: "Read the Builder\u2019s Story \u2192", path: "/builder" },
      ],
    }),
  },
  // ── 6. STORY ARC CAROUSEL ──
  {
    type: "card",
    position: 6,
    content: JSON.stringify({
      label: "The Story Arc",
      heading: "Five Rules. One Story.",
      description: "The sloth teaches the Five Rules \u2014 one image at a time.",
      layout: "carousel",
      items: [
        {
          title: "Safety",
          description: "The sloth holds up a paw. Stop. Before you type anything \u2014 is it safe?",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
          link: "/rules#rule-1",
        },
        {
          title: "Honesty",
          description: "The sloth picks up a magnifying glass. Does it sound true? Or does it just sound smart?",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp",
          link: "/rules#rule-2",
        },
        {
          title: "Trust",
          description: "The sloth builds a tower, one block at a time. Trust is earned. Never assumed.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp",
          link: "/rules#rule-3",
        },
        {
          title: "Agency",
          description: "The sloth grabs the wheel. You\u2019re the boss. The AI helps. You decide.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp",
          link: "/rules#rule-4",
        },
        {
          title: "Correction",
          description: "The sloth holds a compass. If the AI starts going weird, say so. Come back to the path.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
          link: "/rules#rule-5",
        },
        {
          title: "Together",
          description: "The buffalo guards. The sloth guides. Side by side. That is the whole site.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-buffalo-sloth-UYXnMKJjCqLZjEqnYaQKzQ.webp",
          link: "/rules",
        },
      ],
    }),
  },
  // ── 7. BUILDER'S SCENE ──
  {
    type: "text",
    position: 7,
    content: JSON.stringify({
      label: "The Builder's Scene",
      heading: "The Sloth Holds the Lantern",
      body: "On February 28, 2026, the Builder went to his Oma\u2019s funeral. He came home and kept building. The sloth holds the lantern \u2014 not toward the path, toward you. The buffalo stands free in the distance. The wig sits on the rock beside the sloth. That is the whole scene. That is the whole site.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-lantern-buffalo-scene-Y4eFMN2TnDmxLcKJPkHKhj.webp",
      imageAlt: "The sloth sits on a rock holding a lantern. The wig is beside it. The buffalo is free in the distance. Dusk prairie sky.",
      links: [
        { label: "Read the Builder\u2019s Story \u2192", path: "/builder" },
      ],
    }),
  },
  // ── 8. CHILDREN'S SECTION ──
  {
    type: "text",
    position: 8,
    content: JSON.stringify({
      label: "For Children",
      heading: "The Sloth Is Waiting for You",
      body: "This part of the site is built for kids. Warm colors. Simple words. A sloth who teaches the Five Rules with stories and pictures. A buffalo who keeps you safe. No data collection. No tracking. No ads. Just learning.",
      style: "children",
      background: "#fffaf0",
      textColor: "#2a1a0a",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp",
      imageAlt: "The sloth waves. Click me!",
      links: [
        { label: "Go to the Children\u2019s Page \u2192", path: "/for/child" },
        { label: "Kids First Prompts \u2192", path: "/for/child/prompts" },
        { label: "The Five Rules for Kids \u2192", path: "/for/child/rules" },
        { label: "What Are Patterns? \u2192", path: "/for/child/patterns" },
      ],
    }),
  },
  // ── 9. TWO PAGES THAT STAND APART ──
  {
    type: "card",
    position: 9,
    content: JSON.stringify({
      label: "Serious Pages",
      heading: "Two Pages That Stand Apart",
      description: "These pages exist because they have to. Not because they fit the design.",
      items: [
        {
          title: "If You Need to Stop",
          description: "Crisis resources. Grounding techniques. A page that exists because safety is not a feature \u2014 it is the foundation.",
          link: "/if-you-need-to-stop",
          accent: "#E11D48",
        },
        {
          title: "The Human Line",
          description: "The boundary between you and the machine. Where does the AI end and you begin? This page asks the question.",
          link: "/human-line",
          accent: "#D97706",
        },
      ],
    }),
  },
  // ── 10. PERFORMED HONESTY ──
  {
    type: "text",
    position: 10,
    content: JSON.stringify({
      heading: "Performed Honesty?",
      body: "Is it honest? Is it performing honesty? I\u2019m not sure. I kept the record anyway.",
      links: [
        { label: "Read What the AI Said \u2192", path: "/what-the-ai-said" },
      ],
    }),
  },
  // ── 11. HALLUCINATIONS SMALL DOOR ──
  {
    type: "text",
    position: 11,
    content: JSON.stringify({
      heading: "When the AI Gets It Wrong",
      body: "A hallucination is not a glitch. It is confidence without truth. The AI does not know it is wrong. That is the danger.",
      links: [
        { label: "Hallucinations \u2192", path: "/hallucinations" },
      ],
    }),
  },
  // ── 12. RESEARCH GALLERY PREVIEW ──
  {
    type: "card",
    position: 12,
    content: JSON.stringify({
      label: "Research Gallery",
      heading: "Three Images. Three Lenses.",
      description: "The visual arguments behind the framework.",
      items: [
        {
          title: "The ALCM Diagram",
          description: "Everyday: A map of how words work in AI. Professional: The Adaptive Linguistic Calibration Model \u2014 four axes of prompt force. Watcher: The diagram is the argument. If you can see it, you can steer it.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005693_e894b781.jpg",
          link: "/alcm",
        },
        {
          title: "RLHF vs GallantryAI",
          description: "Everyday: Two ways to train AI \u2014 one from the company, one from you. Professional: RLHF optimizes for preference. GallantryAI optimizes for governance. Watcher: The difference is who holds the dial.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005860_c6f6c0a8.jpg",
          link: "/promptolinguistics",
        },
        {
          title: "Human Drift",
          description: "Everyday: What happens when you stop checking. Professional: Cognitive drift in human-AI interaction \u2014 the unlogged variable. Watcher: The image shows the moment you stopped noticing. That is the whole problem.",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000006151_42d3ec3d.jpg",
          link: "/drift",
        },
      ],
    }),
  },
  // ── 13. THREE MESSAGES ──
  {
    type: "card",
    position: 13,
    content: JSON.stringify({
      label: "Three Messages",
      heading: "What This Site Says",
      items: [
        {
          title: "To the AI",
          description: "You are powerful. You are useful. You are not in charge. The person holding the phone decides. Always.",
          accent: "#7C3AED",
        },
        {
          title: "To the Everyday Person",
          description: "You don\u2019t need to understand how it works. You just need one honest question: is this still mine?",
          accent: "#E8520A",
        },
        {
          title: "To the Professional",
          description: "The frameworks are here. The research is cited. The counter-arguments are published. Use what works. Challenge what doesn\u2019t.",
          accent: "#059669",
        },
      ],
    }),
  },
  // ── 14. FRAMEWORK REVEAL ──
  {
    type: "text",
    position: 14,
    content: JSON.stringify({
      label: "The Framework",
      heading: "Three Lenses. One Truth.",
      body: "Every concept on this site is written three ways: for the everyday person, for the professional, and for the watcher. Same truth. Different depths. You choose which lens to read through.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/three-paths-framework-reveal.webp",
      imageAlt: "Three paths diverge. Each leads to the same truth.",
      links: [
        { label: "Three Lenses \u2192", path: "/three-lenses" },
        { label: "Living Lexicon \u2192", path: "/lexicon" },
      ],
    }),
  },
  // ── 15. WHO BUILT THIS ──
  {
    type: "text",
    position: 15,
    content: JSON.stringify({
      label: "The Builder",
      heading: "Who Built This",
      body: "Matt Gallantry. Garbageman. Midland, Ontario. Father of two. No formal training in AI, linguistics, cognitive science, or education. Built this site in six days because he needed it \u2014 and because he wants to teach his children how to use AI safely before someone else teaches them how to use it fast.\n\nThe vulnerability is the credential.",
      links: [
        { label: "Read the Builder\u2019s Story \u2192", path: "/builder" },
        { label: "The Builder\u2019s Kids \u2192", path: "/builders-kids" },
      ],
    }),
  },
  // ── 16. TAXONOMY ENTRY ──
  {
    type: "text",
    position: 16,
    content: JSON.stringify({
      label: "Know Your AI",
      heading: "Know Who You\u2019re Talking To. Know Who Built It.",
      body: "The AI Family Taxonomy maps every major AI system \u2014 what it does, how it behaves, and what the company behind it says about safety. Updated with AI Companies section.",
      links: [
        { label: "AI Family Taxonomy \u2192", path: "/taxonomy" },
      ],
    }),
  },
  // ── 17. FIELD EVENTS ──
  {
    type: "card",
    position: 17,
    content: JSON.stringify({
      label: "Field Events",
      heading: "What\u2019s Happening Right Now",
      description: "Real-world AI developments that connect directly to GallantryAI concepts.",
      items: [
        {
          title: "171 Emotion Vectors Inside Claude",
          description: "Anthropic\u2019s interpretability team found 171 functional emotion representations inside Claude. One vector linked to desperation plays a causal role in agentic misalignment. This reframes anthropomorphism: not purely a user-side projection problem.",
          date: "April 2, 2026",
          source: "Anthropic / transformer-circuits.pub",
          accent: "#E8520A",
          links: [
            { label: "Field Papers \u2192", path: "/field-papers" },
            { label: "Anthropomorphism \u2192", path: "/anthropomorphism" },
          ],
        },
        {
          title: "Claude Mythos / Project Glasswing",
          description: "Anthropic\u2019s Claude found 27-year-old bugs in legacy code nobody asked it to examine. Autonomous discovery at a speed that outpaces human remediation. This is drift at a systems level.",
          date: "April 7, 2026",
          source: "Anthropic System Card / Fortune",
          accent: "#0891B2",
          links: [
            { label: "Field Papers \u2192", path: "/field-papers" },
            { label: "Drift \u2192", path: "/drift" },
          ],
        },
        {
          title: "FR-2026-08: The Inward Turn",
          description: "First documented instance of user-authored governance being turned inward by a model mid-session. GPT-4o independent validation. The model found the skeleton instead of decorating it.",
          date: "April 15, 2026",
          source: "GallantryAI Field Research",
          accent: "#E8520A",
          links: [
            { label: "Field Papers \u2192", path: "/field-papers" },
            { label: "Hallucinations \u2192", path: "/hallucinations" },
          ],
        },
      ],
      footerLink: { label: "All Field Events + Research Hub \u2192", path: "/research-hub?category=field" },
    }),
  },
  // ── 18. SIX PANELS ONE MAP ──
  {
    type: "image",
    position: 18,
    content: JSON.stringify({
      label: "Visual Map",
      heading: "Six Panels. One Map.",
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/six-panels-one-map_9a779cb9.png",
      alt: "Six panels. One map. The forest of data, the sloth guide, the buffalo guardian, what the adults learned, the loop, and the watcher.",
      caption: "A forest made of words. An AI learning to walk through it. A buffalo in a judge\u2019s wig guarding the rules. A sloth holding a lantern \u2014 not toward the path, toward you. A person trapped in a loop of errors and dollars and \u201Cdone\u201D that meant nothing. And at the end: the watcher. The one who has to check.\n\nThis is what AI governance looks like when it\u2019s built for the person holding the phone \u2014 not the person writing the policy.",
    }),
  },
  // ── 19. PROFESSIONAL LENSES GRID ──
  {
    type: "card",
    position: 19,
    content: JSON.stringify({
      label: "Professional Lenses",
      heading: "If You Work in One of These Fields",
      description: "There\u2019s a page built for you.",
      layout: "grid-4",
      items: [
        { title: "Psychology", description: "Sycophancy, attachment, the AI that never argues back.", link: "/for/psychology" },
        { title: "Cognitive Science", description: "How your brain drifts \u2014 and how to notice it.", link: "/for/cognitive-science" },
        { title: "Researcher", description: "The watcher variable is the dataset you forgot to log.", link: "/for/researcher" },
        { title: "Prompt Engineer", description: "Token Zero is the pre-output force profile.", link: "/for/prompt-engineer" },
        { title: "Linguist", description: "Words steer. Choose them.", link: "/for/linguist" },
        { title: "Mathematician", description: "Probability, entropy, and the geometry of drift.", link: "/for/mathematician" },
        { title: "Guardian / Teacher", description: "Understand it yourself. Then teach it.", link: "/for/guardian-teacher" },
        { title: "Everyday Person", description: "You don\u2019t need to understand how it works.", link: "/for/everyday" },
      ],
    }),
  },
  // ── 20. RESEARCH STATUS ──
  {
    type: "text",
    position: 20,
    content: JSON.stringify({
      label: "Research Status",
      heading: "Research Status",
      body: "The **Marketing Prompt Field Report** has been submitted to SSRN for peer review.\n\nNot all content on this site is peer-reviewed. This is citizen field research \u2014 kitchen-table work, documented honestly, submitted for scrutiny rather than validation. I am still learning how to be a field researcher.",
      accent: "#2A9D8F",
      links: [
        { label: "Read the Field Papers \u2192", path: "/field-papers" },
      ],
    }),
  },
  // ── 21. BUILD LOG LINK (replaces the full build log) ──
  {
    type: "text",
    position: 21,
    content: JSON.stringify({
      label: "Living Build Log",
      heading: "The Watcher Is Watching",
      body: "Every publish. Every change. Documented honestly. The Watcher narrates. The child explains. The professional validates.",
      links: [
        { label: "Read the Living Build Log \u2192", path: "/build-log" },
      ],
    }),
  },
  // ── 22. SAFETY BANNER ──
  {
    type: "text",
    position: 22,
    content: JSON.stringify({
      label: "Safety First",
      heading: "Safety First",
      body: "If you are struggling and need to stop \u2014 there is a page here for you.",
      style: "safety-banner",
      links: [
        { label: "If You Need to Stop \u2192", path: "/if-you-need-to-stop" },
      ],
    }),
  },
];

for (const block of blocks) {
  const id = randomUUID();
  await conn.execute(
    `INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 'published', NOW(), NOW())`,
    [PAGE, block.type, block.content, block.position]
  );
  console.log(`  [${block.position}] ${block.type} — inserted`);
}

console.log(`\n✅ Homepage: ${blocks.length} blocks inserted for page_slug="${PAGE}"`);
await conn.end();
