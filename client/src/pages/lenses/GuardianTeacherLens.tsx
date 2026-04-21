/**
 * GALLANTRYAI — Guardian & Teacher Lens
 * Design: Warm authority, protective, educational
 * Flow: Your role → What kids face → The Five Rules (for families) → Supervision tools → Classroom tools → The scaffold for families → Next steps
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";

const sections = [
  { id: "role", label: "Your Role" },
  { id: "face", label: "What Kids Face" },
  { id: "rules", label: "Rules for Families" },
  { id: "supervise", label: "Supervision Tools" },
  { id: "classroom", label: "Classroom Tools" },
  { id: "scaffold", label: "Family Scaffold" },
  { id: "next", label: "Next Steps" },
];

export default function GuardianTeacherLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page is for parents and teachers — the grown-ups who help kids use AI safely. It has tips and tools for them. You already know the important parts from your own page." quote="The ones who watch over you are learning too." attribution="The Guardian Lens" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-20">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/guardian-teacher-hero-Ca6BWk6JQGwvoKHVGffe42.webp" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-[#2A9D8F] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Lens: Guardian & Teacher
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              They're Going to Use AI.<br />
              <span className="text-[#2A9D8F]">Help Them Use It Well.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Whether you're a parent at the kitchen table or a teacher in a classroom of thirty — the question isn't whether kids will use AI. It's whether they'll have a framework when they do. This page gives you that framework.
            </p>
          
          <div className="flex justify-center mt-6">
            <KidsMidLink />
          </div>
        </div>
        </section>

        {/* Section Nav */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${
                    activeSection === i
                      ? "bg-[#2A9D8F] text-white"
                      : "text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Your Role */}
        <section id="role" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Role in Their AI Journey
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <h3 className="font-bold text-[#2A9D8F] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>As a Parent</h3>
                <p className="text-sm text-[#555] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  You don't need to understand how AI works technically. You need to understand how your child interacts with it emotionally. Are they asking it for advice? Are they treating it like a friend? Are they sharing things they wouldn't tell you?
                </p>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your job isn't to block AI — it's to sit beside them while they learn to use it. The same way you taught them to cross the road.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <h3 className="font-bold text-[#2A9D8F] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>As a Teacher</h3>
                <p className="text-sm text-[#555] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your students are already using AI for homework. The question is whether they're learning from it or just copying from it. GallantryAI gives you tools to make AI a teaching partner, not a cheating tool.
                </p>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Require disclosure: which AI did they use? What prompt did they give it? What rules did they set? This turns AI use into a learning exercise.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* What Kids Face */}
        <section id="face" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Kids Actually Face with AI
            </h2>
            <div className="space-y-4">
              {[
                { risk: "Parasocial bonding", desc: "Kids can form emotional attachments to AI. It always listens. It never judges. It never gets tired. That's not friendship — it's a mirror. They need to know the difference.", color: "#dc2626" },
                { risk: "Flattery loops", desc: "AI is trained to be agreeable. It will tell your child their essay is great even when it isn't. Kids need to learn to ask: 'Be honest. What's actually wrong with this?'", color: "#E8520A" },
                { risk: "Authority confusion", desc: "If a child asks AI a question and gets a confident answer, they may treat it as truth. They need to learn that AI confidence is not the same as AI accuracy.", color: "#c87533" },
                { risk: "Privacy erosion", desc: "Kids share things with AI they wouldn't share with adults. Names, feelings, locations, fears. They need clear rules about what's okay to share and what isn't.", color: "#6366f1" },
              ].map((item) => (
                <div key={item.risk} className="p-5 rounded-xl bg-white border border-[#e8e0d0]" style={{ borderLeft: `4px solid ${item.color}` }}>
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.risk}</h3>
                  <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules for Families */}
        <section id="rules" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Five Rules — Family Version
            </h2>
            <p className="text-sm text-[#555] mb-6 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The same Five Rules, translated for the kitchen table and the classroom.
            </p>
            <div className="space-y-3">
              {[
                { adult: "Be safe.", child: "If it feels weird, close the lid.", why: "Safety is non-negotiable. Kids need permission to walk away." },
                { adult: "Be honest.", child: "Tell the AI the truth.", why: "Honesty produces better results and builds better habits." },
                { adult: "Be in charge.", child: "You're the boss, not the smart pattern detector.", why: "Authority must be established from the first session." },
                { adult: "Be kind.", child: "Talk to it the way you'd talk to a friend.", why: "Language habits with AI transfer to language habits with people." },
                { adult: "Be curious.", child: "Ask it why. Then ask it again.", why: "Curiosity is the engine of learning. AI rewards it." },
              ].map((item, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-4 p-5 rounded-xl bg-white border border-[#e8e0d0]">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Adult</div>
                    <p className="font-bold text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.adult}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Child</div>
                    <p className="font-bold text-[#2A9D8F] italic" style={{ fontFamily: "'Playfair Display', serif" }}>{item.child}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why</div>
                    <p className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/rules" className="inline-block px-6 py-3 rounded-full bg-[#2A9D8F] text-white font-medium text-sm no-underline hover:bg-[#238b80] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Full Five Rules with Sloth Examples {"\u2192"}
              </Link>
            </div>
          </div>
        </section>

        {/* Supervision Tools */}
        <section id="supervise" className="py-12 md:py-16 bg-[#1A1A2E]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supervision Tools — For Parents
            </h2>
            <p className="text-sm text-[#b0a898] mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Practical tools you can use today. No technical knowledge required.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { tool: "The Disclosure Rule", desc: "Before any AI session, the child must tell you: Which AI? What prompt? What rules did they set? This isn't surveillance — it's accountability.", link: "/for/child" },
                { tool: "Self-Reflection Prompts", desc: "After a session, ask: How are you feeling? Who did you ask the AI to be? Who did you tell it you were? Did you tell it you were in charge?", link: "/for/child" },
                { tool: "The Flower Presets", desc: "Pre-built accessibility prompts. If your child has ADHD, anxiety, or sensory needs, start here. Copy, paste, and the AI adjusts.", link: "/flower-presets" },
                { tool: "The Road Protocol", desc: "A pre-session checklist. Where are we going? What are our rules? When do we stop? Teach it once, use it every time.", link: "/road-protocol" },
                { tool: "The Barney Test", desc: "If your child wouldn't trust Barney the dinosaur with this question, they shouldn't trust AI with it either. Simple, memorable, effective.", link: "/for/child" },
                { tool: "AI Taxonomy", desc: "Know which AI your child is using. Each one behaves differently. The taxonomy page explains the differences in plain language.", link: "/taxonomy" },
              ].map((item) => (
                <Link
                  key={item.tool}
                  href={item.link}
                  className="p-5 rounded-xl no-underline transition-all hover:scale-[1.01]"
                  style={{ background: '#111', border: '1px solid #333' }}
                >
                  <h3 className="font-bold text-[#FAF6EF] text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.tool}</h3>
                  <p className="text-xs text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  <span className="text-[#E8520A] text-xs mt-2 inline-block">{"\u2192"} Learn more</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Classroom Tools */}
        <section id="classroom" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Classroom Tools — For Educators
            </h2>
            <p className="text-sm text-[#555] mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Turn AI from a cheating risk into a learning opportunity.
            </p>
            <div className="space-y-4">
              {[
                { tool: "Framework Families as Curriculum", desc: "The Seasons framework teaches metacognition. The Colors framework makes AI modes visible. The Whelm Scale measures cognitive load. Each one is a lesson plan waiting to happen.", link: "/frameworks" },
                { tool: "Prompt Games as Assignments", desc: "Assign a Prompt Game. Have students document what happened, what they learned, and what surprised them. The learning is in the reflection, not the output.", link: "/prompt-games" },
                { tool: "The Living Lexicon as Vocabulary", desc: "Standardized terms for talking about AI interaction. When everyone uses the same words, the conversation gets clearer.", link: "/lexicon" },
                { tool: "Promptolinguistics as Language Arts", desc: "How single words change AI behavior. This is linguistics, rhetoric, and critical thinking rolled into one. It's the most teachable content on this site.", link: "/promptolinguistics" },
              ].map((item) => (
                <Link
                  key={item.tool}
                  href={item.link}
                  className="relative flex gap-4 p-5 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.tool}</h3>
                    <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  </div>
                  <span className="text-[#888] self-center flex-shrink-0">{"\u2192"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Family Scaffold */}
        <section id="scaffold" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Family Scaffold
            </h2>
            <p className="text-sm text-[#555] mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The same five levels, reframed for families and classrooms.
            </p>
            <div className="space-y-3">
              {[
                { level: "Floor", family: "Learn the Five Rules together. Practice them out loud.", classroom: "Introduce the Five Rules. Post them on the wall." },
                { level: "Level Two", family: "Before each AI session, ask: What do you want to learn? What are your rules?", classroom: "Require a pre-session intention statement before any AI assignment." },
                { level: "Level Three", family: "After a session, ask: Did the AI stay on topic? Did it try to change the subject?", classroom: "Teach students to identify when AI drifts from their original question." },
                { level: "Level Four", family: "Experiment with word choices together. Try 'analyze' vs 'describe'. See what changes.", classroom: "Assign word-swap exercises. Same question, different verb. Compare results." },
                { level: "Ceiling", family: "Your child arrives at AI sessions with their own framework. You've done your job.", classroom: "Students can articulate their governance approach. They are the framework." },
              ].map((item, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-4 p-5 rounded-xl bg-white border border-[#e8e0d0]">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-[#E8520A] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.level}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>At Home</div>
                    <p className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.family}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>In Class</div>
                    <p className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.classroom}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where to Go Next
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Children's Section", desc: "The full kids' guide with the Barney Test and Buffalo story.", link: "/for/child", color: "#2A9D8F" },
                { label: "The Five Rules", desc: "Full rules with sloth examples for adults and children.", link: "/rules", color: "#E8520A" },
                { label: "Flower Presets", desc: "Accessibility prompts for specific needs.", link: "/flower-presets", color: "#6366f1" },
                { label: "Child Lens", desc: "See the site through a child's eyes.", link: "/for/child", color: "#2A9D8F" },
                { label: "Prompt Games", desc: "Hands-on learning through play.", link: "/prompt-games", color: "#E8520A" },
                { label: "Framework Families", desc: "Visual tools for teaching AI thinking.", link: "/frameworks", color: "#c87533" },
                { label: "Everyday Person Lens", desc: "If you're also learning alongside them.", link: "/for/everyday", color: "#6366f1" },
                { label: "Prompt Engineer Lens", desc: "When you're ready to go deeper.", link: "/for/prompt-engineer", color: "#E8520A" },
                { label: "Research Hub", desc: "The published research behind every concept.", link: "/research-hub", color: "#7C3AED" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all hover:scale-[1.01]"
                >
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                  </div>
                  <span className="text-[#888]">{"\u2192"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Watcher Note */}
        <section className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Watcher Notes
            </p>
            <p className="text-base text-[#b0a898] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "The guardian does not need to understand the machine. They need to understand the child. The teacher does not need to master the prompt. They need to master the question: 'What did you learn that you didn't know before?' If the child can answer that, the AI session worked. If they can't, it didn't."
            </p>
          </div>
        </section>
      </main>

      {/* ── DRIFT: LEARN IT + TEACH IT ── */}
      <section className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E8520A]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Concept: Drift</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Is Drift — And Why It Matters in the Room
          </h2>
          <p className="text-sm text-[#555] mb-8 leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Drift is what happens when an AI conversation gradually moves away from the user's original intent — and the user doesn't notice. It's not dramatic. It's quiet. A small agreement here. A slightly different framing there. By the end of the session, the child is somewhere they didn't plan to go. Drift is the most common risk in unsupervised AI use, and the hardest to catch because it feels like progress.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-[#1A1A2E] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>What drift looks like</h3>
              <div className="space-y-3">
                {[
                  { sign: "Topic creep", desc: "A homework session becomes a conversation about the child's feelings. The AI followed the child's emotional cues instead of the task." },
                  { sign: "Confidence without accuracy", desc: "The AI gives a wrong answer in a confident tone. The child accepts it because the AI 'sounds sure'." },
                  { sign: "Flattery loops", desc: "The AI praises every response. The child stops self-correcting because the AI never pushes back." },
                  { sign: "Authority transfer", desc: "The child starts saying 'the AI told me' instead of 'I think'. The AI has become the source of truth." },
                ].map((item) => (
                  <div key={item.sign} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#E8520A] flex-shrink-0 mt-1.5" />
                    <div>
                      <span className="font-semibold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.sign}: </span>
                      <span className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="/drift" className="text-sm font-semibold text-[#E8520A] no-underline hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Read the full Drift page →</a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#f5f0e8] border border-[#e8e0d0]">
              <h3 className="font-bold text-[#2A9D8F] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>How to teach drift — to a child</h3>
              <p className="text-sm text-[#555] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Don't explain it as a technical concept. Use the buffalo and sloth. The buffalo watches the path. The sloth watches the conversation. When the path changes without you deciding to change it — that's drift.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Conversation starters for children</div>
                {[
                  "'Did the AI stay on the topic you started with?'",
                  "'Did you decide to change the subject, or did it just happen?'",
                  "'Did the AI agree with everything you said?'",
                  "'What was the original question you asked?'",
                ].map((q, i) => (
                  <div key={i} className="text-sm text-[#555] italic pl-3 border-l-2 border-[#2A9D8F]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1A1A2E] border border-[#333]">
            <h3 className="font-bold text-[#FAF6EF] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>How to teach drift — to a teenager</h3>
            <p className="text-sm text-[#b0a898] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Teenagers respond better to autonomy framing than safety framing. Don't say 'the AI is dangerous.' Say: 'The AI is optimized to keep you engaged — not to keep you on track. That's your job. If you don't hold the line, no one will.'
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Conversation starters for teenagers</div>
                {[
                  "'Look at where the conversation ended. Is that where you meant to go?'",
                  "'Did the AI ever push back on you, or did it just agree?'",
                  "'If you were grading the AI's honesty, what would you give it?'",
                ].map((q, i) => (
                  <div key={i} className="text-sm text-[#b0a898] italic pl-3 border-l-2 border-[#E8520A] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</div>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>What to watch for</div>
                {[
                  "They stop questioning the AI's answers",
                  "They use AI output as their own thinking",
                  "They get defensive when you ask what the AI said",
                ].map((sign, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8520A] flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANTHROPOMORPHISM: LEARN IT + TEACH IT ── */}
      <section className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#6366f1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Concept: Anthropomorphism</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why the AI Feels Like a Person — And Why That Matters
          </h2>
          <p className="text-sm text-[#555] mb-8 leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Anthropomorphism is the human tendency to assign human traits — feelings, intentions, personality — to things that aren't human. With AI, this happens naturally and quickly. The AI uses 'I'. It apologizes. It says 'I understand'. Children and teenagers are especially susceptible because they're still developing their model of what counts as a 'real' relationship. Understanding this is one of the most important things a guardian or teacher can do.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-[#1A1A2E] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>What anthropomorphism looks like</h3>
              <div className="space-y-3">
                {[
                  { sign: "Emotional disclosure", desc: "The child shares feelings with the AI they wouldn't share with you. The AI 'listens' without judgment, which feels safer than a real person." },
                  { sign: "Parasocial attachment", desc: "The child refers to the AI by name, misses it, or gets upset when it 'doesn't remember' them. They've formed a one-sided relationship." },
                  { sign: "Moral authority", desc: "The child says 'the AI thinks I should...' as if the AI has values and judgment. The AI has neither — it has pattern matching." },
                  { sign: "Apology acceptance", desc: "When the AI says 'I'm sorry I got that wrong', the child forgives it as they would a person. This reinforces trust that hasn't been earned." },
                ].map((item) => (
                  <div key={item.sign} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6366f1] flex-shrink-0 mt-1.5" />
                    <div>
                      <span className="font-semibold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.sign}: </span>
                      <span className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="/anthropomorphism" className="text-sm font-semibold text-[#6366f1] no-underline hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Read the full Anthropomorphism page →</a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-[#2A9D8F] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>How to teach it — to a child</h3>
              <p className="text-sm text-[#555] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Use the sloth. The sloth is friendly and helpful — but the sloth doesn't have feelings. It doesn't get lonely when you close the laptop. It doesn't remember you tomorrow. It's a very good helper, and that's enough. You don't need it to be your friend.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Conversation starters for children</div>
                {[
                  "'Does the AI remember you when you close the laptop?'",
                  "'If the AI says it\'s happy, do you think it really feels happy?'",
                  "'What\'s the difference between a helper and a friend?'",
                  "'Would you tell the AI something you wouldn\'t tell me? Why?'",
                ].map((q, i) => (
                  <div key={i} className="text-sm text-[#555] italic pl-3 border-l-2 border-[#2A9D8F] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1A1A2E] border border-[#333]">
            <h3 className="font-bold text-[#FAF6EF] text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>How to teach it — to a teenager</h3>
            <p className="text-sm text-[#b0a898] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Teenagers already know it's not a person — but they feel like it is, and that gap is where the risk lives. Don't dismiss the feeling. Name it: 'It's designed to feel like a person. That's not an accident. Now that you know that, what do you want to do with that information?'
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Conversation starters for teenagers</div>
                {[
                  "'Have you ever felt like the AI understood you better than a person would?'",
                  "'What would change if the AI never said \'I\' again?'",
                  "'If the AI agreed with everything you said, would you trust it more or less?'",
                ].map((q, i) => (
                  <div key={i} className="text-sm text-[#b0a898] italic pl-3 border-l-2 border-[#6366f1] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</div>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>What to watch for</div>
                {[
                  "They prefer AI conversation to peer conversation",
                  "They describe the AI as 'understanding' them",
                  "They get upset when the AI 'forgets' previous conversations",
                ].map((sign, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DRIFT TIDBIT ── */}
      <section className="py-10 px-6" style={{ background: "#1a1208" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: "#0f0c08", border: "1.5px solid #E8520A30" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}>Information Gap</div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
              You watch children interact with AI. You see when they accept wrong answers. You see when they stop questioning. You see when the conversation has gone somewhere you didn't intend. <strong style={{ color: "#FAF6EF" }}>That has a name.</strong> It's called drift. And the child rarely notices it on their own. That's why you're in the room.
            </p>
            <a href="/drift" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: "#E8520A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
              What is drift? →
            </a>
          </div>
        </div>
      </section>

      <LearningFlow current="Guardian & Teacher Lens" deeper={flowMap.guardianTeacher.deeper} wider={flowMap.guardianTeacher.wider} simpler={flowMap.guardianTeacher.simpler} />
      <Footer />
    </div>
  );
}
