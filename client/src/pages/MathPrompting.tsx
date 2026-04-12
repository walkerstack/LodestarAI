/*
 * GALLANTRYAI — Math Through Prompting
 * Design: Editorial register — warm, educational, inviting
 * Learning math through AI prompting — connected to Mathematician Lens, Kids Learn, Variable Scale, Scaffold
 * "The prompt is the equation. The variable is you."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/math-prompting-hero-cCFsZad7ZYQGTwAMgwAoKH.webp";

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

interface MathLesson {
  title: string;
  concept: string;
  ageRange: string;
  everyday: string;
  professional: string;
  watcher: string;
  tryIt: string;
  safetyNote: string;
}

const lessons: MathLesson[] = [
  {
    title: "Counting with Questions",
    concept: "Addition & Subtraction",
    ageRange: "Ages 4–7",
    everyday: "Instead of asking the AI for the answer, ask it to help you count. 'I have 3 apples. My friend gives me 2 more. Can you help me count them all?' The AI walks you through it — but YOU do the counting.",
    professional: "Scaffolded arithmetic through guided prompting. The student constructs the prompt as a word problem, externalizing the mathematical operation before requesting AI assistance. The AI serves as a verification layer, not a calculator.",
    watcher: "The child who asks the question is already doing the math. The prompt IS the equation. The answer is just confirmation.",
    tryIt: "Try this prompt: 'I have 5 toy cars. I gave 2 to my sister. Help me figure out how many I have left — but don't tell me the answer right away. Ask me to count first.'",
    safetyNote: "Always check the AI's counting. Sometimes it makes mistakes too — and finding those mistakes is part of learning.",
  },
  {
    title: "Shapes and Patterns",
    concept: "Geometry & Pattern Recognition",
    ageRange: "Ages 5–9",
    everyday: "Ask the AI to describe shapes, then YOU draw them. 'What does a hexagon look like? How many sides does it have? Can you help me draw one step by step?' The AI gives instructions. You do the drawing.",
    professional: "Geometric reasoning through descriptive prompting. The student requests procedural decomposition of spatial concepts, converting AI-generated verbal descriptions into physical drawings. This bridges abstract geometry with kinesthetic learning.",
    watcher: "The shape exists before the word. The child draws what the AI describes. The translation — from language to line — is where the geometry lives.",
    tryIt: "Try this prompt: 'I want to learn about triangles. Can you describe 3 different kinds of triangles and tell me what makes each one special? Then I'll try to draw them.'",
    safetyNote: "If the AI describes a shape wrong, that's a learning moment. Ask: 'Are you sure a triangle has 4 sides?' Teaching the AI to be honest is part of the lesson.",
  },
  {
    title: "Word Problems as Prompts",
    concept: "Applied Mathematics",
    ageRange: "Ages 7–12",
    everyday: "The best way to learn word problems is to WRITE them. Instead of solving a word problem, write one for the AI to solve. Then check if the AI got it right. You become the teacher.",
    professional: "Inverse problem construction as a learning methodology. By authoring word problems rather than solving them, students must understand the mathematical relationships deeply enough to encode them in natural language. The AI's solution attempt provides immediate feedback on problem clarity and mathematical validity.",
    watcher: "The student who writes the problem understands the problem. The AI that solves it proves the student understood. The roles reverse. The learning doubles.",
    tryIt: "Try this prompt: 'I'm going to write you a math word problem. Solve it step by step, and I'll tell you if you got it right. Here's my problem: A farmer has 12 chickens. Each chicken lays 3 eggs per week. How many eggs does the farmer collect in 2 weeks?'",
    safetyNote: "Check the AI's work! If it skips a step or gets the wrong answer, ask it to show its work again. You're the teacher here.",
  },
  {
    title: "Fractions Through Cooking",
    concept: "Fractions & Measurement",
    ageRange: "Ages 8–12",
    everyday: "Ask the AI to help you double or halve a recipe. 'If the recipe needs 3/4 cup of flour and I want to make double, how much flour do I need? Show me how to figure it out.' Real math, real context, real learning.",
    professional: "Contextual fraction manipulation through applied scenarios. Cooking provides concrete referents for abstract fraction operations — doubling requires multiplication, halving requires division, and substitution requires equivalence. The AI scaffolds the process while the student performs the operations.",
    watcher: "The fraction is not abstract when the cake is real. The measurement is not theoretical when the bowl is in front of you. Context is the variable that makes math stick.",
    tryIt: "Try this prompt: 'I'm making cookies and the recipe calls for 2/3 cup of sugar. I want to make 1.5 batches. Help me figure out how much sugar I need — but explain each step so I understand the math.'",
    safetyNote: "Always measure yourself after the AI helps you calculate. The AI can do the math, but only you can hold the measuring cup.",
  },
  {
    title: "Variables and You",
    concept: "Pre-Algebra & Variables",
    ageRange: "Ages 10–14",
    everyday: "A variable is just a letter that stands for a number you don't know yet. Ask the AI: 'If I have x apples and I eat 3, I have 7 left. Help me figure out what x is — but let me try first.' You're learning algebra without knowing it.",
    professional: "Introduction to algebraic thinking through conversational problem-solving. The student formulates equations in natural language, and the AI provides Socratic guidance rather than direct solutions. This mirrors the Variable Scale Theory — the AI's involvement is a dial, not a switch.",
    watcher: "The variable is you. The equation is the conversation. The solution is not the number — it's the moment the student realizes they already knew.",
    tryIt: "Try this prompt: 'I'm learning about variables. Can you give me a simple equation with one variable, and then ask me questions to help me solve it? Don't give me the answer — guide me to find it myself.'",
    safetyNote: "Tell the AI: 'Don't solve it for me. Ask me questions instead.' If the AI gives you the answer too fast, say: 'I wanted to figure it out myself. Let me try again.'",
  },
  {
    title: "Data and Graphs",
    concept: "Statistics & Data Literacy",
    ageRange: "Ages 10–14",
    everyday: "Collect some data — how many steps you walked each day this week, or how many pages you read. Then ask the AI to help you understand it. 'Here are my numbers. What's the average? What does the pattern tell me?' You collect. The AI helps you see.",
    professional: "Student-generated datasets as the foundation for statistical reasoning. The student provides raw data from their own experience, and the AI assists with analysis — mean, median, mode, range, and trend identification. The data's personal origin increases engagement and retention.",
    watcher: "The data is yours. The pattern is yours. The AI just holds the mirror. The insight belongs to the person who collected the numbers.",
    tryIt: "Try this prompt: 'Here's how many minutes I read each day this week: Monday 15, Tuesday 20, Wednesday 10, Thursday 25, Friday 30, Saturday 45, Sunday 35. Help me find the average, and tell me what pattern you see — but ask me what I think first.'",
    safetyNote: "Your data is yours. Don't share personal information with AI. Use numbers about books, steps, or games — not about people or private things.",
  },
];

const connections = [
  { label: "Mathematician Lens", path: "/for/mathematician", description: "The full mathematical framework — words as vectors, prompts as equations, constraints as functions" },
  { label: "Kids Learn", path: "/kids-learn", description: "The complete learning path — prompting and coding lessons for young learners" },
  { label: "Variable Scale Theory", path: "/variable-scale", description: "How AI involvement works on a sliding scale — the math behind the dial" },
  { label: "The Scaffold", path: "/scaffold", description: "The full system map — see where math prompting fits in the bigger picture" },
  { label: "The Five Rules", path: "/rules", description: "The governance foundation — safety first, honesty over confidence, user decides" },
  { label: "Prompt Games", path: "/prompt-games", description: "Practice prompting through games — many have mathematical thinking built in" },
];

export default function MathPrompting() {
  const [activeLens, setActiveLens] = useState<Lens>("everyday");
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/math-prompting"].story}
        quote={kidsBlurbs["/math-prompting"].quote}
        attribution={kidsBlurbs["/math-prompting"].attribution}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.75) 0%, rgba(26,26,46,0.88) 100%)" }} />
          <div className="relative container py-20 md:py-28 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Learning Path · Mathematics
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              Math Through Prompting
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed">
              The prompt is the equation. The variable is you. Learn math by asking AI the right questions — not by asking it for answers.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Why Math Through Prompting?
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                Most people use AI to get math answers. That's backwards. The real learning happens when you <strong style={{ color: "#E8520A" }}>write the question</strong>. When you construct a word problem, you have to understand the math well enough to encode it in language. When you check the AI's work, you have to understand the math well enough to spot errors.
              </p>
              <p>
                This page teaches math through prompting — not by replacing the teacher, but by making the student <em>become</em> the teacher. Every lesson follows the same pattern: you think first, you prompt second, you verify third. The AI is your study buddy, not your answer key.
              </p>
              <p>
                <strong style={{ color: "#1A1A2E" }}>The Variable Scale applies here too.</strong> Sometimes you need the AI to show you every step. Sometimes you just need a hint. Sometimes you need it to stay quiet while you figure it out. You control the dial. That's the governance. That's the math.
              </p>
            </div>
          </div>
        </section>

        {/* Global Lens Toggle */}
        <section className="py-4 px-6 sticky top-[57px] z-40" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto flex items-center gap-3 justify-center">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#8a7a6a" }}>Read as:</span>
            {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLens(l)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-150"
                style={{
                  background: activeLens === l ? lensColors[l] : "transparent",
                  color: activeLens === l ? "#fff" : lensColors[l],
                  border: activeLens === l ? `1.5px solid ${lensColors[l]}` : "1.5px solid #e8e0d0",
                }}
              >
                {lensLabels[l]}
              </button>
            ))}
          </div>
        </section>

        {/* Lessons */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Six Lessons
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a7a6a" }}>
              Each lesson teaches a math concept through prompting. Tap to expand.
            </p>
            <div className="space-y-4">
              {lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "#fff",
                    border: expandedLesson === i ? `2px solid ${lensColors[activeLens]}` : "1.5px solid #e8e0d0",
                    boxShadow: expandedLesson === i ? `0 4px 20px ${lensColors[activeLens]}15` : "none",
                  }}
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === i ? null : i)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: `${lensColors[activeLens]}15`, color: lensColors[activeLens] }}>
                          Lesson {i + 1}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: "#8a7a6a" }}>
                          {lesson.ageRange}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                        {lesson.title}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: "#8a7a6a" }}>
                        {lesson.concept}
                      </p>
                    </div>
                    <span className="text-xs flex-shrink-0 mt-2" style={{ color: "#8a7a6a" }}>
                      {expandedLesson === i ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Expanded Content */}
                  {expandedLesson === i && (
                    <div className="px-6 pb-6 space-y-5">
                      {/* Lens-specific explanation */}
                      <div className="rounded-xl p-5" style={{ background: `${lensColors[activeLens]}08`, border: `1px solid ${lensColors[activeLens]}20` }}>
                        <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: lensColors[activeLens] }}>
                          {lensLabels[activeLens]} Lens
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {lesson[activeLens]}
                        </p>
                      </div>

                      {/* Try It */}
                      <div className="rounded-xl p-5" style={{ background: "#FAF6EF", border: "1px solid #e8e0d0" }}>
                        <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#E8520A" }}>
                          Try It
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {lesson.tryIt}
                        </p>
                      </div>

                      {/* Safety Note */}
                      <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
                        <span className="text-lg flex-shrink-0">🛡</span>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#C2410C" }}>
                            Safety Note
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#7C2D12" }}>
                            {lesson.safetyNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Rules Still Apply */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-[#FAF6EF]" style={{ fontFamily: serifFont }}>
              The Rules Still Apply
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { rule: "Safety First", description: "Never share personal information. Use made-up names and numbers for practice problems.", accent: "#3B82F6" },
                { rule: "Honesty Over Confidence", description: "If the AI gives a wrong answer, say so. Checking the AI's work IS the math lesson.", accent: "#2563EB" },
                { rule: "You Decide", description: "You control how much help the AI gives. Full guidance, hints only, or silent while you work. Your dial.", accent: "#1D4ED8" },
              ].map((r) => (
                <div key={r.rule} className="rounded-xl p-5 text-left" style={{ background: `${r.accent}10`, border: `1px solid ${r.accent}25` }}>
                  <div className="text-sm font-bold mb-2" style={{ color: r.accent }}>
                    {r.rule}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#b0a898" }}>
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connections */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Where to Go From Here
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a7a6a" }}>
              Math through prompting connects to the full GallantryAI framework.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {connections.map((conn) => (
                <Link
                  key={conn.path}
                  href={conn.path}
                  className="block rounded-xl p-5 no-underline transition-all duration-200 hover:shadow-md"
                  style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}
                >
                  <div className="text-sm font-bold mb-1" style={{ color: "#2563EB" }}>
                    {conn.label} →
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                    {conn.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Builder's Note */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#2563EB" }}>
                From the Builder
              </div>
              <p className="text-base leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                My daughter is four. She counts everything. Stairs, apples, the number of times the dog barks. One day she'll use AI for math homework. When that day comes, I want her to know that the question matters more than the answer. That checking the AI's work IS the work. That the variable — the unknown — is always her.
              </p>
              <p className="text-sm mt-4" style={{ color: "#8a7a6a" }}>
                — Matt Gallantry, Midland, Ontario
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
