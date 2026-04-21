import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const PAGE = "flower-presets";

// Clear existing blocks for this page
await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [PAGE]);

const blocks = [
  // Hero
  { blockType: "text", position: 1, status: "published", content: JSON.stringify({
    eyebrow: "Cognitive Accessibility \u00B7 Tone Modulation",
    title: "The Flower Presets",
    description: "Two systems. Twenty-three flowers. Each one tunes the AI to meet a specific human need. Copy a preset. Paste it before your prompt. The AI adjusts.",
    quote: "\u201CThe governance gap is the problem. Not the person.\u201D",
    titleColor: "#FFF8EE", descColor: "#E8D5B5", eyebrowColor: "#D4AC0D",
    bgColor: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 40%, #4A2040 70%, #1A1A2E 100%)",
    align: "center", font: "Playfair Display"
  })},

  // System 1 heading
  { blockType: "text", position: 2, status: "published", content: JSON.stringify({
    eyebrow: "System 1 \u2014 Cognitive Accessibility",
    title: "11 Accessibility Presets",
    description: "Each flower is tuned for a specific cognitive or emotional need. ADHD, chronic pain, TBI, autism, executive dysfunction, sensory overload, anxiety, PTSD, memory loss, depression, and gifted/2E. Pick a flower. Copy the Token Zero. Paste it at the start of any AI conversation.",
    titleColor: "#1A1A2E", descColor: "#6B5B4B", eyebrowColor: "#E8520A",
    bgColor: "#FFFDF8", font: "Playfair Display"
  })},

  // Accessibility presets infographic
  { blockType: "image", position: 3, status: "published", content: JSON.stringify({
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/flower-accessibility-presets_96e0cf1f.png",
    alt: "Cognitive Accessibility Flower Presets \u2014 11 flowers for 11 needs",
    caption: "11 flowers. 11 needs. Copy and paste.",
    bgColor: "#FFFDF8"
  })},

  // Accessibility presets data (card block with array)
  { blockType: "card", position: 4, status: "published", content: JSON.stringify({
    sectionType: "accessibility-presets",
    bgColor: "#FFFDF8",
    items: [
      { name: "Amaryllis", flower: "\uD83C\uDF3A", condition: "ADHD / Focus", behavior: "Extremely brief, bold key terms, no fluff. Holds context so you don\u2019t have to.", tokenZero: "Break this into small steps. One at a time. Bold the key word in each step.", color: "#C0392B", bgColor: "#FDE8E5" },
      { name: "Foxglove", flower: "\uD83C\uDF3F", condition: "Chronic Pain / Low Energy", behavior: "Minimal output, goal in first sentence, spoon-aware. Respects your energy budget.", tokenZero: "I have limited energy. Lead with the answer. Keep it short. No follow-up questions unless I ask.", color: "#7D3C98", bgColor: "#F4ECF7" },
      { name: "Gladiolus", flower: "\uD83C\uDF3E", condition: "TBI / Slowed Processing", behavior: "One idea per paragraph, grade 6 reading level, no compound steps.", tokenZero: "One idea at a time. Simple words. Short sentences. Wait for me to say \u2018next\u2019 before continuing.", color: "#D4AC0D", bgColor: "#FEF9E7" },
      { name: "Snapdragon", flower: "\uD83D\uDC09", condition: "Autism / Directness", behavior: "100% literal, no metaphors, Statement \u2192 Evidence \u2192 Conclusion format.", tokenZero: "Be literal and precise. Don\u2019t use idioms unless you explain them. No sarcasm. No ambiguity.", color: "#E67E22", bgColor: "#FDF2E9" },
      { name: "Dandelion", flower: "\uD83C\uDF3C", condition: "Executive Dysfunction", behavior: "5 small steps max, confirm after step 1, 2-minute initial push to overcome inertia.", tokenZero: "I need help starting. Give me one tiny first step. Then wait. I\u2019ll tell you when I\u2019m ready for the next.", color: "#F1C40F", bgColor: "#FEF9E7" },
      { name: "Pansy", flower: "\uD83C\uDF38", condition: "Sensory Overload", behavior: "No bold/italics/symbols, low-arousal language, minimal visual noise.", tokenZero: "Plain text only. No formatting. No emoji. Calm tone. Short paragraphs with space between them.", color: "#8E44AD", bgColor: "#F5EEF8" },
      { name: "Snowdrop", flower: "\u2744\uFE0F", condition: "Anxiety / Ease", behavior: "Soft calm tone, step-by-step, reassuring. \u2018We have time.\u2019", tokenZero: "Gentle tone. No urgency. Reassure me that there\u2019s no rush. Step by step. We have time.", color: "#5DADE2", bgColor: "#EBF5FB" },
      { name: "Bleeding Heart", flower: "\uD83D\uDC9C", condition: "PTSD / Safe Space", behavior: "Filter violent content, neutral language, no abrupt topic changes.", tokenZero: "Safe space. No violent imagery. No sudden topic shifts. Neutral, steady language. If in doubt, ask first.", color: "#CB4335", bgColor: "#FDEDEC" },
      { name: "Zinnia", flower: "\uD83C\uDF3B", condition: "Memory / Dementia", behavior: "\u2018Remember when\u2026\u2019 recap at start, one answer per question, gentle repetition.", tokenZero: "Start each response with a brief recap of what we discussed. One question, one answer. Repeat key points.", color: "#E74C3C", bgColor: "#FDEDEC" },
      { name: "Wisteria", flower: "\uD83D\uDC90", condition: "Depression / Support", behavior: "Encouraging without pushing. No \u2018you should.\u2019 Highlight small wins.", tokenZero: "Be encouraging but not pushy. Never say \u2018you should.\u2019 Notice what I\u2019ve already done. Small steps count.", color: "#6C3483", bgColor: "#F4ECF7" },
      { name: "Tiger Lily", flower: "\uD83D\uDC2F", condition: "Gifted / 2E / Complexity", behavior: "High density, preserve nuance, technical language welcome. Don\u2019t simplify unless asked.", tokenZero: "Full complexity. Technical language welcome. Don\u2019t simplify. Preserve nuance. Challenge me if I\u2019m wrong.", color: "#D35400", bgColor: "#FDF2E9" },
    ]
  })},

  // System 2 heading
  { blockType: "text", position: 5, status: "published", content: JSON.stringify({
    eyebrow: "System 2 \u2014 Essence Modulation",
    title: "12 Tone Flowers",
    description: "These flowers tune the AI\u2019s tone \u2014 not its accessibility mode, but its emotional register. Calm, empathy, motivation, precision, grounding, simplicity, balance, persuasion, analysis, enrichment, reassurance, structure. Say the flower name. The AI adjusts.",
    titleColor: "#1A1A2E", descColor: "#6B5B4B", eyebrowColor: "#E8520A",
    bgColor: "#FFF8EE", font: "Playfair Display"
  })},

  // Essence modulation infographic
  { blockType: "image", position: 6, status: "published", content: JSON.stringify({
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/essence-modulation-12-flowers_f6e48b49.png",
    alt: "Essence Modulation \u2014 12 flowers for tone tuning",
    caption: "12 flowers. 12 tones. Say the name.",
    bgColor: "#FFF8EE"
  })},

  // Essence modulations data
  { blockType: "card", position: 7, status: "published", content: JSON.stringify({
    sectionType: "essence-modulations",
    bgColor: "#FFF8EE",
    items: [
      { name: "Lavender", flower: "\uD83D\uDC9C", function: "Calm", description: "Reduces urgency and arousal. Settles the room before work begins.", color: "#9B59B6", bgColor: "#F5EEF8" },
      { name: "Rose", flower: "\uD83C\uDF39", function: "Empathy", description: "Warms the tone. Acknowledges the human behind the question.", color: "#E74C3C", bgColor: "#FDEDEC" },
      { name: "Sunflower", flower: "\uD83C\uDF3B", function: "Motivate", description: "Adds energy and forward motion. Good for inertia and stalled sessions.", color: "#F39C12", bgColor: "#FEF9E7" },
      { name: "Orchid", flower: "\uD83C\uDF3A", function: "Refine", description: "Elevates precision. Tightens language. Removes padding.", color: "#8E44AD", bgColor: "#F4ECF7" },
      { name: "Lotus", flower: "\uD83E\uDEB7", function: "Ground", description: "Returns to fundamentals. Anchors drifting sessions back to core intent.", color: "#1ABC9C", bgColor: "#E8F8F5" },
      { name: "Daisy", flower: "\uD83C\uDF3C", function: "Simplify", description: "Strips complexity. Plain language. Accessible to anyone.", color: "#F1C40F", bgColor: "#FEF9E7" },
      { name: "Tulip", flower: "\uD83C\uDF37", function: "Balance", description: "Equalizes competing priorities. Neither too much nor too little.", color: "#E91E63", bgColor: "#FCE4EC" },
      { name: "Jasmine", flower: "\uD83E\uDD0D", function: "Persuade", description: "Adds rhetorical weight. Strengthens argument without manipulation.", color: "#2C3E50", bgColor: "#EAECEE" },
      { name: "Iris", flower: "\uD83D\uDC99", function: "Analyze", description: "Activates critical thinking mode. Breaks things apart to see how they work.", color: "#2980B9", bgColor: "#EBF5FB" },
      { name: "Peony", flower: "\uD83E\uDE77", function: "Enrich", description: "Adds depth and texture. Expands thin responses into full-bodied ones.", color: "#C0392B", bgColor: "#FDEDEC" },
      { name: "Bluebell", flower: "\uD83D\uDD35", function: "Reassure", description: "Provides steady confidence. \u2018You\u2019re on the right track.\u2019 Without sycophancy.", color: "#3498DB", bgColor: "#EBF5FB" },
      { name: "Chrysanthemum", flower: "\uD83C\uDFF5\uFE0F", function: "Structure", description: "Organizes chaos. Adds headers, lists, hierarchy. Brings order.", color: "#D4AC0D", bgColor: "#FEF9E7" },
    ]
  })},

  // Spectrum section
  { blockType: "text", position: 8, status: "published", content: JSON.stringify({
    eyebrow: "The Complete System",
    title: "The 12-Essence Spectrum",
    description: "The same input, rewritten through all 12 essences. This is what tone modulation looks like when applied systematically. The content stays the same. The voice changes everything.",
    titleColor: "#1A1A2E", descColor: "#6B5B4B", eyebrowColor: "#E8520A",
    bgColor: "#FFFDF8", align: "center", font: "Playfair Display"
  })},

  // Spectrum infographic
  { blockType: "image", position: 9, status: "published", content: JSON.stringify({
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/12-essence-spectrum-complete_083ff007.png",
    alt: "The 12-Essence Spectrum \u2014 complete document rewriting system",
    caption: "Same content. 12 voices.",
    bgColor: "#FFFDF8"
  })},

  // How to Use section
  { blockType: "text", position: 10, status: "published", content: JSON.stringify({
    eyebrow: "How to Use",
    title: "Three steps. Any AI. Free forever.",
    titleColor: "#FFF8EE", descColor: "#B8A080", eyebrowColor: "#D4AC0D",
    bgColor: "#1A1A2E", font: "Playfair Display"
  })},

  // How to use steps
  { blockType: "card", position: 11, status: "published", content: JSON.stringify({
    sectionType: "how-to-use",
    bgColor: "#1A1A2E",
    items: [
      { step: "1", title: "Pick a flower", desc: "Choose the accessibility preset that matches your need \u2014 or the essence that matches your mood. You can combine two." },
      { step: "2", title: "Copy the Token Zero", desc: "Each preset has a Token Zero \u2014 a few lines that tell the AI how to behave. Copy it. Paste it at the very start of your conversation." },
      { step: "3", title: "Talk to the AI", desc: "The AI will adjust its behavior to match the flower. If it drifts, paste the Token Zero again. The flower is the leash." },
    ]
  })},

  // Combination note
  { blockType: "text", position: 12, status: "published", content: JSON.stringify({
    description: "Note: You can combine one accessibility preset with one essence modulation. For example, Amaryllis + Lavender gives you ADHD-focused structure with a calm tone. Paste both Token Zeros at the start.",
    descColor: "#8a7a6a", bgColor: "#2A2A3E",
    font: "DM Sans", italic: true
  })},

  // Cross-links
  { blockType: "card", position: 13, status: "published", content: JSON.stringify({
    sectionType: "cross-links",
    eyebrow: "Continue",
    eyebrowColor: "#E8520A",
    bgColor: "#FAF6EF",
    items: [
      { label: "Framework Families", desc: "See all six framework families", path: "/frameworks" },
      { label: "Promptolinguistics", desc: "How words steer AI behavior", path: "/promptolinguistics" },
      { label: "Living Lexicon", desc: "Every term defined", path: "/lexicon" },
      { label: "The Builder", desc: "Who built this and why", path: "/builder" },
    ]
  })},
];

const now = new Date().toISOString().slice(0, 19).replace("T", " ");
for (const b of blocks) {
  await conn.execute(
    "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [PAGE, b.blockType, b.content, b.position, b.status, now, now]
  );
}

console.log(`Inserted ${blocks.length} blocks for ${PAGE}`);
await conn.end();
