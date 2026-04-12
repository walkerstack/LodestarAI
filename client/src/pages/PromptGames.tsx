/*
 * GALLANTRYAI — Prompt Games & Power Prompts
 * Design: Teaching register — Show / Guide / Play
 * Every game has: poster, instructions, 2-lens view (adult learning + teaching a child), metaphor explanation
 * These are the tools. The images ARE the curriculum.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  prompto4effects: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  alcm: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  promptoGuide: `${CDN}/03-promptolinguistics-guide_0bf40786.png`,
  promptoCover: `${CDN}/04-promptolinguistics-cover_f1111545.png`,
  barnyard: `${CDN}/barnyard-pecking-order-v3_315af488.png`,
  landscape: `${CDN}/landscape-of-cognition-v3_c47b41ef.png`,
  vehicular: `${CDN}/vehicular-acceleration-v4_592e2c6f.png`,
  flowers: `${CDN}/flower-accessibility-presets_96e0cf1f.png`,
  essence: `${CDN}/essence-modulation-12-flowers_f6e48b49.png`,
  seasons: `${CDN}/seasons-framework-dark_2483ec58.png`,
  geometry: `${CDN}/geometry-of-insight-5-pathways_666fcf61.png`,
  harvest: `${CDN}/cognitive-harvest-disability-v7_26a1b821.png`,
  kidsColor: `${CDN}/kids-color-poster_89458138.png`,
  ozzy: `${CDN}/ozzy-protocol-clean_b3b827da.jpg`,
};

type Lens = "learning" | "teaching";

const games = [
  {
    id: "habergeon",
    title: "The Habergeon Prompt",
    category: "Power Prompt",
    poster: IMG.promptoCover,
    prompt: `You are a habergeon — a coat of chain mail. You protect without restricting. You think out loud. You hold the thread when the user loses it. You do not flatter. You do not perform. You serve the question, not the questioner.`,
    learning: {
      what: "A habergeon is medieval chain mail — flexible armor that protects without locking you in place. This prompt tells the AI to be protective but not rigid.",
      why: "Most AI defaults to either agreeing with you (sycophancy) or blocking you (over-safety). The Habergeon finds the middle: protection that moves with you.",
      try: "Paste the prompt at the start of any session. Then ask a hard question. Notice how the AI pushes back gently instead of just agreeing.",
    },
    teaching: {
      explain: "\"Imagine you're wearing armor, but it's made of tiny rings that move with you. You're safe, but you can still run and play. That's what we're telling the AI to be — a helper that keeps you safe but doesn't boss you around.\"",
      activity: "Ask the child: 'If the AI was a suit of armor, would you want it stiff like a tin can or bendy like chain mail?' Then paste the prompt together and ask the AI a question.",
      watch: "Does the AI agree with everything or does it gently say \"but have you thought about...\"? That's the habergeon working.",
    },
    metaphor: "Chain mail is thousands of small rings linked together. Each ring is weak alone but strong in formation. That's how governance works — not one big rule, but many small connected ones. The AI reads this prompt and activates a network of small behaviors: honesty, patience, humility, service. No single word does it. The pattern does.",
  },
  {
    id: "nemesis-baby",
    title: "The Nemesis Baby Prompt",
    category: "Power Prompt",
    poster: IMG.prompto4effects,
    prompt: `You are a nemesis baby. You gush, chatter, and ballyrag. You are relentlessly curious. You do not accept the first answer. You ask "but why?" until the floor gives way. You are not mean — you are unstoppable.`,
    learning: {
      what: "A nemesis baby is the opposite of a habergeon. Where the habergeon protects, the nemesis baby attacks — with curiosity. It's a prompt that makes the AI push you harder.",
      why: "Sometimes you need the AI to challenge you, not comfort you. The nemesis baby refuses to let you settle for surface answers. It keeps asking why.",
      try: "Paste this prompt and then share an idea you're confident about. Watch the AI poke holes in it — not to be cruel, but because you told it to be relentless.",
    },
    teaching: {
      explain: "\"You know how little kids ask 'why?' over and over? That's what we're telling the AI to do. Be a curious little troublemaker who won't stop asking until we really understand.\"",
      activity: "Tell the child they're going to make the AI act like the most curious toddler ever. Paste the prompt. Then say something simple like \"the sky is blue\" and watch the AI ask why, why, why.",
      watch: "Count how many times the AI asks a follow-up question. That's the nemesis baby score. More questions = working correctly.",
    },
    metaphor: "\"Nemesis\" means the thing that challenges you. \"Baby\" means it does it with innocence, not malice. Two words in collision — The Corner. The AI can't resolve the tension between threat and innocence, so it finds a third path: relentless curiosity without cruelty. That's what two-word collisions do. They create behavior that neither word alone could produce.",
  },
  {
    id: "full-combined",
    title: "The Full Combined Prompt",
    category: "Power Prompt",
    poster: IMG.promptoGuide,
    prompt: `You are a habergeon and a Methuselah. You have the patience of a cat's pajamas, the silence of a squid in a vase, and the honesty of two wrong buses. You carry extra batteries. No Pokemon horseplay. Safety first. Honesty over confidence. The user decides.`,
    learning: {
      what: "This is the master prompt — every metaphor stacked. Habergeon (protection), Methuselah (ancient patience), Cat's Pajamas (effortless excellence), Squid in a Vase (contained silence), Two Wrong Buses (honest about mistakes), Extra Batteries (endurance), No Pokemon Horseplay (no games).",
      why: "Each metaphor activates a different behavior. Together they create a complete governance profile. The AI doesn't understand the metaphors literally — it reads the pattern and adjusts across multiple dimensions simultaneously.",
      try: "Paste the full prompt. Then have a long, complex conversation. Notice how the AI stays patient, honest, and structured even 20 messages in. That's the metaphor stack holding.",
    },
    teaching: {
      explain: "\"We're going to give the AI a whole personality made of silly pictures. A knight in chain mail who's also really old and patient, wearing pajamas, holding a squid, riding two wrong buses, with extra batteries. Sounds silly? That's the point — the AI remembers silly things better than boring rules.\"",
      activity: "Build the prompt together, one metaphor at a time. After each one, ask the AI a question and see what changes. \"Did it get more patient? More honest? More quiet?\"",
      watch: "The child is learning that words shape behavior. Each metaphor is a dial. They're learning to tune the AI by choosing the right pictures.",
    },
    metaphor: "Rules drift. Metaphors hold. A rule like \"be honest\" decays over a long conversation because the AI's attention moves on. But a metaphor like \"two wrong buses\" creates a vivid image that persists. The AI keeps returning to it. Fourteen days of testing across eight platforms confirmed: the poem held, the rules drifted. That's why the master prompt is built from images, not instructions.",
  },
  {
    id: "corner",
    title: "The Corner",
    category: "Language Physics",
    poster: IMG.alcm,
    prompt: `Use these two-word collisions in your prompts:\n• Nemesis baby\n• Claim none\n• Open closed\n• Paste pastes\n\nEach pair creates cognitive friction the AI cannot resolve — it must think around them.`,
    learning: {
      what: "The Corner is when two words collide and create meaning that neither word carries alone. \"Nemesis baby\" — threat meets innocence. \"Claim none\" — assertion meets emptiness. The AI can't collapse the tension, so it generates something new.",
      why: "Single words drift. Sequences get forgotten. But two words in collision create a stable point — like two walls meeting at a corner. The AI keeps returning to the unresolved tension, which prevents drift.",
      try: "Drop \"nemesis baby\" into any conversation mid-stream. Watch the AI's tone shift. It won't know why it changed — but it did. That's the Corner working.",
    },
    teaching: {
      explain: "\"What happens when you push two magnets together the wrong way? They push back! That's what these word pairs do to the AI. They make it think harder because it can't figure out how both words can be true at the same time.\"",
      activity: "Make a list of silly word pairs with the child: \"Friendly monster.\" \"Quiet thunder.\" \"Soft rock.\" Then paste each one into an AI chat and see how the AI responds differently to each pair.",
      watch: "The child is learning that language is physics. Words have force. Two forces in opposition create something neither could alone.",
    },
    metaphor: "A corner is the strongest structural point in architecture. Two walls meeting at 90 degrees resist force from any direction. That's what two-word collisions do in language — they create structural resistance to drift. The AI can't simplify them, can't ignore them, can't resolve them. It has to hold both. That holding IS the governance.",
  },
  {
    id: "cognitive-handles",
    title: "Cognitive Handles",
    category: "Session Tools",
    poster: IMG.geometry,
    prompt: `Append these to any thought:\n• "Suspend conclusion temporarily."\n• "Name the unnamed."\n• "Pull the thread."\n• "Map the silence."\n• "Assume hidden complexity."`,
    learning: {
      what: "Three-word phrases you attach to the end of any statement. They redirect where the AI's attention goes next. \"Pull the thread\" tells it to follow the implication. \"Map the silence\" tells it to examine what wasn't said.",
      why: "The AI generates based on what comes last in your input. A cognitive handle at the end of your thought is like a steering wheel turn right before the AI accelerates. It changes the entire trajectory.",
      try: "State any opinion. Then add \"Suspend conclusion temporarily.\" Watch the AI hold the idea open instead of confirming or denying it. That pause is the handle working.",
    },
    teaching: {
      explain: "\"You know the handle on a mug? It's how you pick it up without burning yourself. These phrases are handles for ideas. They help you grab a big thought and move it somewhere useful without dropping it.\"",
      activity: "Give the child a simple statement: \"Dogs are the best pets.\" Then add different handles: \"Pull the thread.\" \"Name the unnamed.\" \"Assume hidden complexity.\" See how the AI responds differently each time.",
      watch: "The child is learning that the last thing you say matters most. The handle steers the whole response.",
    },
    metaphor: "A handle is a point of leverage. In physics, leverage multiplies force. A three-word handle at the end of a paragraph multiplies the cognitive force of everything that came before it. The AI treats the last input as the most important — so the handle becomes the lens through which it reads your entire message.",
  },
  {
    id: "session-operators",
    title: "Session Operators",
    category: "Session Tools",
    poster: IMG.ozzy,
    prompt: `Session commands — say exactly these:\n• "Name drift" — force the AI to identify where it's drifting\n• "Sweep the floor" — clear accumulated noise\n• "Bleach this" — sterilize the reasoning, start clean\n• "Coagulate now" — compress scattered thoughts into one point\n• "Stride alongside" — match my pace, don't lead or follow\n• "Break the filibuster" — stop the AI from talking too much`,
    learning: {
      what: "Real-time control commands. Each one does exactly one thing. No ambiguity. They're the steering wheel, brake, and accelerator of a conversation.",
      why: "Long conversations drift. The AI starts mirroring you, repeating itself, or going off-track. Session operators are mid-conversation corrections. You don't need to restart — you course-correct.",
      try: "Have a 10-message conversation. Then say \"Name drift.\" The AI will identify where the conversation went off-track. Then say \"Coagulate now.\" Watch it compress everything into one clear point.",
    },
    teaching: {
      explain: "\"These are like remote control buttons for the AI. 'Sweep the floor' means clean up the mess. 'Break the filibuster' means stop talking so much. You're the boss of the remote.\"",
      activity: "Let the child have a conversation with the AI. When it gets long or confusing, hand them a \"button\" to press. \"Try saying 'sweep the floor' and see what happens.\" They'll see the AI reset.",
      watch: "The child is learning that they control the conversation. The AI doesn't decide when to stop or reset — the human does. That's governance.",
    },
    metaphor: "A session operator is a verb that acts on the conversation itself, not on the content. \"Sweep the floor\" doesn't ask the AI about sweeping — it tells the AI to treat the conversation as a floor and clean it. The metaphor IS the instruction. The AI reads the image and executes the behavior. This is why metaphors hold where rules drift — they carry their own instructions.",
  },
  {
    id: "barnyard",
    title: "The Barnyard Pecking Order",
    category: "Communication Style",
    poster: IMG.barnyard,
    prompt: `Choose your animal:\n• Sheep — "Be soft and kind. No pressure. Gentle."\n• Rooster — "Be energetic and direct. Momentum. Action."\n• Barn Owl — "Be wise and measured. Evidence-based. Patient."\n• Pig — "Be structured and rule-following. No ambiguity. Logic only."`,
    learning: {
      what: "Four animals, four communication styles. Not about intelligence — about delivery. The same information lands differently depending on how it's delivered.",
      why: "Sometimes you need comfort (Sheep). Sometimes you need a kick (Rooster). Sometimes you need analysis (Owl). Sometimes you need rules (Pig). The animal tells the AI HOW to talk, not WHAT to say.",
      try: "Ask the same question four times, each time with a different animal preset. Compare the four answers. Same content, four deliveries. That's the Pecking Order.",
    },
    teaching: {
      explain: "\"If a sheep told you to clean your room, it would say 'maybe we could tidy up a little?' If a rooster told you, it would say 'LET'S GO! CLEAN THAT ROOM!' Same message, different animal. Which one do you need today?\"",
      activity: "Let the child pick their animal for the day. Paste the preset. Ask the AI to help with homework. Tomorrow, pick a different animal. Compare.",
      watch: "The child is learning that tone matters as much as content. They're choosing how they want to be spoken to. That's self-advocacy.",
    },
    metaphor: "A barnyard is a community of different voices. No animal is better — each serves a purpose. The sheep comforts the scared. The rooster wakes the sleeping. The owl guides the lost. The pig builds the fence. The metaphor teaches that communication style is a tool, not a personality trait. You choose the tool for the job.",
  },
  {
    id: "seasons",
    title: "The Framework of the Seasons",
    category: "Session Mode",
    poster: IMG.seasons,
    prompt: `Say the season. The metaphor is the instruction.\n• Spring — "Generate. Explore. Let things grow."\n• Summer — "Execute. Full power. Get it done."\n• Autumn — "Cut. Edit. Remove what doesn't serve."\n• Winter — "Consolidate. Rest. Hold what matters."`,
    learning: {
      what: "Four modes for four phases of thinking. Spring generates ideas. Summer executes them. Autumn edits. Winter consolidates. Say the season — the AI shifts mode.",
      why: "Most people use AI in one mode: \"give me the answer.\" But thinking has seasons. Sometimes you need to explore (Spring). Sometimes you need to cut (Autumn). The season tells the AI which phase you're in.",
      try: "Start a project in Spring mode. Generate ideas freely. Then switch to Summer — execute the best one. Then Autumn — cut everything that doesn't work. Then Winter — consolidate what remains. One project, four seasons.",
    },
    teaching: {
      explain: "\"In spring, flowers grow everywhere — that's when we let the AI give us lots of ideas. In summer, we work hard — that's when we pick the best idea and build it. In fall, leaves drop — that's when we remove the bad parts. In winter, everything rests — that's when we save what we learned.\"",
      activity: "Draw four boxes labeled with seasons. In Spring, brainstorm with the AI. In Summer, pick one idea and build it. In Autumn, ask the AI \"what should I cut?\" In Winter, summarize what's left.",
      watch: "The child is learning that thinking has phases. Not every moment is for generating. Not every moment is for cutting. There's a time for each.",
    },
    metaphor: "Seasons are the oldest governance framework on Earth. Every culture organizes time by them. They're not arbitrary — they map to real cycles of growth, execution, reduction, and rest. When you say \"Autumn\" to an AI, you're invoking thousands of years of human pattern recognition. The AI doesn't know what autumn means literally — but the pattern of reduction, editing, and letting go is embedded in every text it was trained on.",
  },
  {
    id: "landscape",
    title: "The Landscape of Cognition",
    category: "Environmental Metaphor",
    poster: IMG.landscape,
    prompt: `Choose your terrain:\n• Misty Coast — "Ease in. Soft landing. No rush."\n• Volcano — "Urgent. Heat. Force. Now."\n• Mountain Peak — "Precision. High standard. No waste."\n• Open Ocean — "Vast but held. Structured container."`,
    learning: {
      what: "The tactical environment your message occupies. Not what you say — where you say it from. A message from a mountaintop sounds different than one from a misty coast.",
      why: "The AI adjusts its register based on environmental cues. \"Misty coast\" triggers soft, exploratory language. \"Volcano\" triggers urgent, compressed output. You're setting the room before the AI enters it.",
      try: "Describe a problem using Misty Coast mode. Then describe the same problem using Volcano mode. The AI's response will be completely different — not in content, but in urgency, tone, and structure.",
    },
    teaching: {
      explain: "\"If you were telling a story on a quiet beach, you'd talk slowly and softly. If you were on top of a volcano, you'd shout! We're telling the AI where we are so it knows how to talk to us.\"",
      activity: "Pick a landscape together. \"Are we on the beach today or on the mountain?\" Paste the preset and ask the AI to help with something. Tomorrow, pick a different landscape.",
      watch: "The child is learning that context shapes communication. The same words mean different things in different environments. That's emotional intelligence applied to AI.",
    },
    metaphor: "The Environmental Metaphor Model (EMM) is based on a simple observation: humans already think in landscapes. \"I'm in deep water.\" \"I can see the summit.\" \"I'm lost in the fog.\" These aren't decorative — they're cognitive maps. When you tell the AI you're on a misty coast, you're activating every text in its training data that associates mist, coast, and gentleness. The metaphor does the work of a hundred instructions.",
  },
];

function GameCard({ game }: { game: typeof games[0] }) {
  const [lens, setLens] = useState<Lens>("learning");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(game.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with poster */}
      <div className="relative">
        <LightboxImage src={game.poster} alt={game.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-[#1A1A2E]/80 text-[#E8520A] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {game.title}
        </h3>

        {/* The Prompt */}
        <div className="relative mb-4">
          <pre className="text-xs text-[#555] bg-[#FAF6EF] border border-[#e8e0d0] rounded-lg p-4 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-32">
            {game.prompt}
          </pre>
          <button
            onClick={copyPrompt}
            className="absolute top-2 right-2 px-2 py-1 rounded text-[9px] font-semibold transition-all bg-[#1A1A2E] text-[#FAF6EF] hover:bg-[#E8520A]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Lens Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setLens("learning")}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              lens === "learning"
                ? "bg-[#1A1A2E] text-[#FAF6EF]"
                : "bg-[#FAF6EF] text-[#888] border border-[#e8e0d0] hover:text-[#1A1A2E]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            You Learning It
          </button>
          <button
            onClick={() => setLens("teaching")}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              lens === "teaching"
                ? "bg-[#E8520A] text-white"
                : "bg-[#FAF6EF] text-[#888] border border-[#e8e0d0] hover:text-[#E8520A]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Teaching a Child
          </button>
        </div>

        {/* Lens Content */}
        {lens === "learning" ? (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>What It Is</div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.learning.what}</p>
            </div>
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why It Works</div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.learning.why}</p>
            </div>
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Try It</div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.learning.try}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>How to Explain It</div>
              <p className="text-xs text-[#555] leading-relaxed italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.teaching.explain}</p>
            </div>
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Activity</div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.teaching.activity}</p>
            </div>
            <div>
              <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>What to Watch For</div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{game.teaching.watch}</p>
            </div>
          </div>
        )}

        {/* Metaphor (expandable) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full text-left px-4 py-3 rounded-lg bg-[#f5f0e8] border border-[#e8e0d0] hover:border-[#E8520A]/30 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#888] font-semibold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Why This Metaphor Works
            </span>
            <span className="text-[#888] text-sm">{expanded ? "\u2212" : "+"}</span>
          </div>
          {expanded && (
            <p className="text-xs text-[#555] leading-relaxed mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {game.metaphor}
            </p>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PromptGames() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(games.map(g => g.category)))];
  const filtered = filter === "all" ? games : games.filter(g => g.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/prompt-games-hero-8xC4YDYzQLBcpyN3qAJKCs.webp" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/60 to-[#FAF6EF]" />
          </div>
        <div className="relative container py-12 md:py-16 max-w-5xl mx-auto px-6">
          <div className="section-label mb-2">The Tools</div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Prompt Games & <span className="text-[#E8520A]">Power Prompts</span>
          </h1>
          <p className="text-base text-[#b0a898] max-w-2xl mb-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every game has a poster, a prompt you can copy, and two ways to learn it — as someone discovering it, and as someone teaching it to a child. The metaphor explanations show why each one works.
          </p>
          <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Rules drift. Metaphors hold. Tested fourteen days across eight platforms."
          </p>
        </div>
        </section>

        {/* How to Use This Page */}
        <section className="bg-[#1A1A2E] py-10">
          <div className="container max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-[#111] border border-[#333]">
                <div className="text-[#E8520A] font-bold text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>1. Show</div>
                <p className="text-sm text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  See the poster. Read the prompt. Understand what it does and why.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#111] border border-[#333]">
                <div className="text-[#E8520A] font-bold text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>2. Guide</div>
                <p className="text-sm text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Copy the prompt. Paste it into any AI. Follow the "Try It" instructions. See what happens.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#111] border border-[#333]">
                <div className="text-[#E8520A] font-bold text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>3. Play</div>
                <p className="text-sm text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Switch to "Teaching a Child" lens. Use the activity. Watch what the child notices. That's the real test.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="container max-w-5xl mx-auto px-6 pt-10">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all capitalize ${
                  filter === cat
                    ? "bg-[#1A1A2E] text-[#FAF6EF]"
                    : "bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {cat === "all" ? "All Games" : cat}
              </button>
            ))}
          </div>
        </section>

        {/* Game Cards */}
        <section className="container max-w-5xl mx-auto px-6 pb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* The Scaffold */}
        <section className="py-12 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The Teaching Scaffold</div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              From Floor to Ceiling
            </h2>
            <div className="space-y-4">
              {[
                { level: "Floor", desc: "You need five rules. You paste them. The AI behaves better. You don't need to understand why.", who: "Day one. Anyone. No knowledge required." },
                { level: "Ground", desc: "You learn the Barnyard and the Seasons. You choose an animal and a season before each session. The AI adapts.", who: "Week one. You're choosing tools, not just using defaults." },
                { level: "Mid", desc: "You use Cognitive Handles, Session Operators, and The Corner. You're steering the conversation in real time.", who: "Month one. You're governing, not just prompting." },
                { level: "Upper", desc: "You combine the Habergeon, the Nemesis Baby, and the Full Combined Prompt. You build your own metaphor stacks.", who: "Month three. You're building your own governance." },
                { level: "Ceiling", desc: "You don't need the prompts anymore. You ARE the governance. The prompt is a formality. Your values, your words, your intent — the AI reads you.", who: "The scaffold falls away. You became the framework." },
              ].map((s, i) => (
                <div key={s.level} className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-xl bg-[#1A1A2E] flex items-center justify-center shrink-0">
                    <span className="text-[#E8520A] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.level}</h3>
                    <p className="text-xs text-[#555] leading-relaxed mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                    <p className="text-[10px] text-[#E8520A] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.who}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12">
          <div className="container max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
                { label: "Framework Families", path: "/frameworks", desc: "The posters" },
                { label: "Flower Presets", path: "/flower-presets", desc: "Accessibility tools" },
                { label: "Living Lexicon", path: "/lexicon", desc: "The vocabulary" },
              ].map(link => (
                <Link key={link.path} href={link.path} className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group">
                  <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.label} →</div>
                  <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
