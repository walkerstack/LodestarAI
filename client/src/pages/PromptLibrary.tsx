/*
 * GALLANTRYAI — The Prompt Library
 * Full taxonomy of prompt types from single question to constitutional.
 * Each type: what it is, how to use it, how to grow — in Three Voices.
 * Matt's documented prompts slot in as living examples (Coming Soon where not yet added).
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { Link } from "wouter";
import { useState } from "react";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const promptTypes = [
  {
    id: "single-question",
    label: "The Single Question",
    color: "#E8520A",
    tier: "Floor",
    everyday: "You type one thing. You ask one thing. That's it. 'What is photosynthesis?' 'How do I make pasta?' It's the most natural thing in the world — you have a question, the AI has an answer. This is where everyone starts.",
    professional: "The single-question prompt is an unstructured natural language query with no explicit role assignment, constraint, or scope definition. The AI infers context from the question alone. Output quality is entirely dependent on the clarity of the question and the model's prior training distribution.",
    watcher: "There is something honest about a single question. It arrives without armor. It says: I don't know. That is the beginning of everything. The problem is not the question. The problem is forgetting that the answer is not the truth — it is a response.",
    example: null,
    howToGrow: "Add context. Tell the AI who you are and why you're asking. 'I'm a nurse. What is the safest dose of ibuprofen for a 70kg adult?' That one sentence changes everything.",
  },
  {
    id: "instruction",
    label: "The Instruction Prompt",
    color: "#D4722A",
    tier: "Level 1",
    everyday: "Instead of asking a question, you tell the AI what to do. 'Summarize this article.' 'Write a list of ten ideas.' 'Translate this into French.' You're giving a command, not asking a question. You're already more in charge.",
    professional: "The instruction prompt uses imperative syntax to direct model behavior toward a defined output format or task. It reduces ambiguity by specifying the action verb explicitly. The model's role is executor rather than interpreter. Output variance decreases as instruction specificity increases.",
    watcher: "The instruction prompt is the first moment of authority. You stopped asking permission. You said: do this. That is not arrogance — it is clarity. The AI responds to clarity. It always has.",
    example: null,
    howToGrow: "Stack instructions. 'Summarize this article in three bullet points, written for a ten-year-old, with no jargon.' Each addition is a constraint. Constraints are not limitations — they are governance.",
  },
  {
    id: "role",
    label: "The Role Prompt",
    color: "#C4923A",
    tier: "Level 2",
    everyday: "You tell the AI who to be. 'Act as a doctor.' 'You are a patient teacher.' 'Respond as a skeptical scientist.' The AI shifts its tone, its vocabulary, its approach. You're not just asking — you're casting.",
    professional: "Role prompting assigns a persona or professional identity to the model, shaping its response register, vocabulary, and epistemic stance. It leverages the model's training on domain-specific corpora to produce outputs consistent with the assigned role. Risk: role drift — the model may gradually abandon the assigned persona without explicit reinforcement.",
    watcher: "When you give the AI a role, you are also defining what it is not. You are drawing a boundary. The role is a frame. Frames are not walls — they are lenses. The question is: who chose this lens, and why?",
    example: null,
    howToGrow: "Combine role with constraint. 'Act as a skeptical scientist. Do not agree with me unless you have evidence. Tell me when you don't know.' The role sets the voice. The constraint sets the rules.",
  },
  {
    id: "context",
    label: "The Context Prompt",
    color: "#A4824A",
    tier: "Level 2",
    everyday: "You give the AI background before asking. 'I'm a single parent with two kids under ten. I have $50 for groceries this week. Give me a meal plan.' The AI now knows your situation. It stops giving generic answers and starts giving yours.",
    professional: "Context injection provides the model with situational parameters that constrain the solution space. It reduces hallucination risk by anchoring responses to a defined scenario. The more specific the context, the more the model's output resembles a tailored response rather than a population-level average.",
    watcher: "Context is the room you build before the conversation begins. Most people walk into an empty room and wonder why the AI sounds like it's talking to everyone. It is. Until you tell it who you are.",
    example: null,
    howToGrow: "Make context a habit. Before every session, write two sentences: who you are and what you need today. Not forever — just today. The AI has no memory. You have to bring the room with you every time.",
  },
  {
    id: "constraint",
    label: "The Constraint Prompt",
    color: "#8A6E2F",
    tier: "Level 3",
    everyday: "You tell the AI what it cannot do. 'Do not use bullet points.' 'Do not give me medical advice.' 'Do not agree with me — push back.' Constraints sound like restrictions but they are actually controls. You're steering.",
    professional: "Constraint prompting defines negative space — the boundaries of acceptable output. It is a form of output governance applied at the prompt level rather than the model level. Constraints reduce the model's degrees of freedom and increase output predictability. They are the user-side equivalent of model-side safety filters.",
    watcher: "A constraint is a promise the AI makes to you before it speaks. You are not limiting the AI — you are asking it to hold a shape. The shape is yours. That is the whole point.",
    example: null,
    howToGrow: "Write your personal constraint set. The rules you apply to every session. Safety first. Honesty over confidence. Tell me when you don't know. These are not one-time instructions — they are your governance layer.",
  },
  {
    id: "verse",
    label: "The Verse Prompt",
    color: "#7C5C2A",
    tier: "Level 4",
    everyday: "You write your prompt as a poem or in verse. It sounds strange but it works. Rhythm and structure force you to say exactly what you mean — no filler, no vagueness. The AI responds to the precision of poetry the same way it responds to the precision of code.",
    professional: "Verse prompting uses prosodic structure — meter, rhyme, line breaks — to impose lexical and syntactic constraints on the prompt itself. The compression required by verse forces the prompter to eliminate ambiguity. The model's response to verse prompts often exhibits higher coherence and lower hallucination rates due to the reduced interpretive surface area.",
    watcher: "A poem is a governance document. Every word earns its place or it is removed. There is no room for drift in a well-made line. When you write your prompt as verse, you are not being artistic — you are being precise in the oldest way humans know how.",
    example: null,
    howToGrow: "Try writing your Five Rules as a verse. Not to be clever — to find out which words you actually mean and which ones you've been carrying out of habit.",
  },
  {
    id: "cultural",
    label: "The Cultural Prompt",
    color: "#6B4C1A",
    tier: "Level 4",
    everyday: "You frame your prompt through a cultural lens — a story, a tradition, a way of seeing. 'In my culture, we say... help me understand this through that frame.' The AI carries the knowledge of many cultures. You can ask it to meet you in yours.",
    professional: "Cultural prompting leverages the model's cross-cultural training data to produce outputs that are contextually situated within a specific cultural framework. It is particularly effective for translation tasks that go beyond language — translating concepts, values, and epistemologies. Risk: the model may reproduce cultural stereotypes if the framing is insufficiently specific.",
    watcher: "Culture is the room before the room. It is the context beneath the context. When you bring your culture into the prompt, you are not decorating the conversation — you are grounding it. The AI does not have a culture. You do. That is the asymmetry. Use it.",
    example: null,
    howToGrow: "Ask the AI to explain a concept from your cultural frame, then ask it to explain the same concept from a different frame. Notice what changes. Notice what doesn't. That gap is where your thinking lives.",
  },
  {
    id: "metaphorical",
    label: "The Metaphorical / Session Prompt",
    color: "#5A3C0A",
    tier: "Level 5",
    everyday: "You build a metaphor for the whole conversation. 'This session is a road trip. You are the navigator. I am the driver. The destination is clarity. We stop when I say stop.' The metaphor becomes the rules. The AI stays inside the metaphor. It's like a game — but the game has governance.",
    professional: "Metaphorical session prompting establishes a persistent narrative frame that governs the entire interaction. The metaphor functions as an implicit constraint set — the roles, rules, and boundaries are embedded in the story rather than stated explicitly. This reduces the cognitive load of constraint management while maintaining governance integrity. The Road Protocol is an example of this technique.",
    watcher: "A metaphor is a vault. You build it before you begin. Everything that happens inside the session happens inside the vault. The vault has walls. The walls are yours. This is not a trick — it is architecture. You are building the room before you walk into it.",
    example: null,
    howToGrow: "Read the Road Protocol. Then write your own. What metaphor fits your practice? What room do you want to be in when you think? Build that room in words. Paste it at the start of every session.",
  },
  {
    id: "constitutional",
    label: "The Constitutional Prompt",
    color: "#3A2A0A",
    tier: "Ceiling",
    everyday: "You write a set of rules — like a constitution — that the AI must follow for the entire session. Not just one instruction. A whole document. 'Rule 1: Safety first. Rule 2: Honesty over confidence. Rule 3: Tell me when you don't know.' The AI works within your constitution. You are the lawmaker.",
    professional: "Constitutional prompting establishes a session-level governance document that the model treats as a persistent constraint set. It is the user-side equivalent of Constitutional AI (Anthropic, 2022) — a set of principles that override default model behavior within the session. The constitutional prompt is the most complete form of user-side governance currently available without model fine-tuning.",
    watcher: "A constitution is not a list of rules. It is a statement of values made operational. When you write a constitutional prompt, you are not telling the AI what to do — you are telling it who you are. The rules follow from that. They always do.",
    example: null,
    howToGrow: "Start with the Five Rules. They are already a constitution. Paste them at the start of your next session. Watch what changes. Then add one rule that is yours alone — something the Five Rules don't cover but you need. That is how a constitution grows.",
  },
];

function VoiceSection({ everyday, professional, watcher }: { everyday: string; professional: string; watcher: string }) {
  const [active, setActive] = useState<"everyday" | "professional" | "watcher">("everyday");
  const voices = {
    everyday: { label: "Everyday", color: "#E8520A", text: everyday },
    professional: { label: "Professional", color: "#2563EB", text: professional },
    watcher: { label: "Watcher", color: "#7C3AED", text: watcher },
  };
  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-3 flex-wrap">
        {(["everyday", "professional", "watcher"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setActive(v)}
            className="px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{
              background: active === v ? voices[v].color : "transparent",
              color: active === v ? "#fff" : voices[v].color,
              border: `1.5px solid ${voices[v].color}`,
            }}
          >
            {voices[v].label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
        {voices[active].text}
      </p>
    </div>
  );
}

export default function PromptLibrary() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story="This page is about all the different ways you can talk to AI. From asking one question to writing a whole set of rules. It starts simple and gets deeper. There's a special page just for kids — your first prompts are waiting there."
        quote="Every conversation starts with a single word. Choose it carefully."
        attribution="The Prompt Library"
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0f0c08 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#E8520A" }}>
              The Prompt Library
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              From one question to a constitution.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "#b0a898" }}>
              Every prompt is a governance decision. This library maps the full spectrum — from the single question you typed before you knew what you were doing, to the constitutional session prompt that sets the rules before the first word. Each type is explained in three voices. Matt's documented prompts are living examples — added as they are ready.
            </p>
            <Link href="/for/child/prompts">
              <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                Kids: First Prompts →
              </span>
            </Link>
          </div>
        </section>

        {/* Tier legend */}
        <section className="py-6 px-6" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#aaa" }}>The Scaffold</p>
            <div className="flex flex-wrap gap-2">
              {["Floor", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Ceiling"].map((t, i) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: `rgba(232,82,10,${0.08 + i * 0.04})`, color: "#E8520A", border: "1px solid rgba(232,82,10,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt types */}
        <section className="py-12 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto space-y-4">
            {promptTypes.map((pt) => (
              <div
                key={pt.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${pt.color}30`, background: "#FAF6EF" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpanded(expanded === pt.id ? null : pt.id)}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold mr-3" style={{ color: "#aaa" }}>{pt.tier}</span>
                    <span className="font-bold text-base md:text-lg" style={{ color: pt.color, fontFamily: serifFont }}>{pt.label}</span>
                  </div>
                  <span className="text-lg ml-4" style={{ color: pt.color }}>{expanded === pt.id ? "−" : "+"}</span>
                </button>

                {expanded === pt.id && (
                  <div className="px-5 pb-6">
                    <VoiceSection everyday={pt.everyday} professional={pt.professional} watcher={pt.watcher} />

                    <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#aaa" }}>How to Grow</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>{pt.howToGrow}</p>
                    </div>

                    <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(232,82,10,0.04)", border: "1px dashed rgba(232,82,10,0.3)" }}>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "#E8520A" }}>Living Example</p>
                      <p className="text-sm italic" style={{ color: "#888" }}>Coming soon — Matt's documented prompt for this type will appear here.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <LearningFlow
          current="prompt-library"
          deeper={[
            { label: "Promptolinguistics", href: "/promptolinguistics", description: "The science of how words shape AI output" },
            { label: "Road Protocol", href: "/road-protocol", description: "A living example of a metaphorical session prompt" },
          ]}
          wider={[
            { label: "Flower Presets", href: "/flower-presets", description: "Pre-built safety configurations" },
            { label: "Frameworks", href: "/frameworks", description: "28 governance frameworks documented" },
            { label: "Malbolge", href: "/malbolge", description: "Where the boundaries are drawn" },
          ]}
          simpler={[
            { label: "The Five Rules", href: "/rules", description: "Start here — the foundation of every session" },
            { label: "Everyday Lens", href: "/for/everyday", description: "Plain language entry point" },
          ]}
        />
      </main>

      <KidsMidLink />
      <Footer />
    </div>
  );
}
