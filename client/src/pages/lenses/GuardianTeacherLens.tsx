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

      <LearningFlow current="Guardian & Teacher Lens" deeper={flowMap.guardianTeacher.deeper} wider={flowMap.guardianTeacher.wider} simpler={flowMap.guardianTeacher.simpler} />
      <Footer />
    </div>
  );
}
