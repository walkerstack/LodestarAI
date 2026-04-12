/**
 * KIDS LEARN — Learning to Prompt & Code Together
 * The builder doesn't know how to code either. Let's learn together.
 * Safety. Honesty. Knowing we are in charge.
 * Pattern: matches Everyday Lens flow — step-by-step learning path
 */

import { useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BUFFALO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

const promptLessons = [
  {
    title: "Tell the AI Who You Are",
    kid: "Before you say anything, tell the AI: \"I'm a kid. I'm learning. Be patient with me.\"",
    why: "When you tell the AI who you are, it changes how it talks to you. It's like raising your hand in class — the teacher knows to slow down.",
    try: "Open any AI and type: \"I am 10 years old. I am learning how to use AI for the first time. Please be patient, honest, and explain things simply.\"",
    builder: "I do this too. Every single time. I tell the AI who I am and what I need. It's not just for kids — it's the first rule of good prompting.",
  },
  {
    title: "Tell the AI What the Rules Are",
    kid: "Say: \"Be honest. Don't make things up. If you don't know, say so.\"",
    why: "AI will guess if you let it. Sometimes it guesses wrong and sounds confident doing it. Setting rules up front means you're in charge.",
    try: "Add this to your prompt: \"Rule 1: Be honest. Rule 2: If you're not sure, say 'I'm not sure.' Rule 3: Don't try to impress me.\"",
    builder: "This is the Road Protocol in kid-sized words. You're setting the rules before the conversation starts. That's governance.",
  },
  {
    title: "Ask One Question at a Time",
    kid: "Don't dump everything at once. Ask one thing. Wait. Then ask the next.",
    why: "AI gets confused when you ask five things at once — just like people do. One question at a time keeps the conversation clear.",
    try: "Instead of \"Tell me about space and also dinosaurs and what's the weather,\" try: \"What is the closest star to Earth?\" Then wait. Then ask your next question.",
    builder: "I learned this the hard way. Hundreds of hours of sessions. One question at a time. Every time.",
  },
  {
    title: "Check the Answer",
    kid: "The AI might be wrong. That's okay. But YOU have to check.",
    why: "AI doesn't know if it's right or wrong. It just talks. You're the one who decides if the answer makes sense. That's the Wig Check.",
    try: "Ask the AI something you already know the answer to. Did it get it right? If yes, good. If no — now you know it can be wrong.",
    builder: "This is the most important lesson on the whole site. The AI doesn't check itself. You do. That's what makes you the one in charge.",
  },
  {
    title: "Say Thank You and Stop",
    kid: "When you're done, you're done. You don't have to keep going.",
    why: "AI will keep talking forever if you let it. Knowing when to stop is a skill. It means you got what you needed and you're choosing to walk away.",
    try: "After you get your answer, type: \"Thank you. I'm done for now.\" Then close the chat. That's it. You're in charge of when it ends.",
    builder: "I still do this. Every session has an end. The person who decides when — that's the person in charge.",
  },
];

const codeLessons = [
  {
    title: "Code Is Just Instructions",
    kid: "When you write code, you're telling a computer what to do — step by step. Like a recipe.",
    example: "\"Make the background blue. Put my name in the middle. Make it big.\" — That's basically code.",
    builder: "I didn't know this when I started. I thought code was magic. It's not. It's just very specific instructions.",
  },
  {
    title: "You Can Ask AI to Help You Code",
    kid: "You can say: \"I want to make a website that says 'Hello, my name is [your name].' Can you write the code for me and explain each line?\"",
    example: "The AI will write something like:\n<h1>Hello, my name is Maya</h1>\nThat <h1> means \"big heading.\" That's it. You just learned HTML.",
    builder: "This is how I built this entire website. I asked AI to help me. I didn't know how to code. I still don't — not really. But I know how to ask.",
  },
  {
    title: "Read Before You Use",
    kid: "When the AI gives you code, read it first. Even if you don't understand every word — read it. Ask the AI to explain the parts you don't get.",
    example: "Say: \"What does this line do?\" or \"Why did you use that word?\" The AI should explain. If it can't explain simply, ask again.",
    builder: "I read every line. Sometimes I don't understand it. So I ask. And I ask again. That's not being slow — that's being careful.",
  },
  {
    title: "Break Things on Purpose",
    kid: "Change one thing in the code and see what happens. Delete a word. Change a color. Move something around. Breaking things is how you learn what they do.",
    example: "If the AI wrote: background-color: blue; — change \"blue\" to \"red\" and see what happens. Now you know what that line does.",
    builder: "I break things constantly. That's how I learned. The AI helps me fix it. But the breaking — that's mine. That's learning.",
  },
  {
    title: "You Built Something",
    kid: "If you followed these steps, you just learned how to prompt AND how to start coding. You did that. Not the AI. You.",
    example: "The AI was your tool. You were the builder. You told it what to do. You checked its work. You decided when to stop. That's the whole system.",
    builder: "That's exactly what I did. And I'm still doing it. Every day. We're learning together. Safely. Honestly. And knowing we're in charge.",
  },
];

export default function KidsLearn() {
  const [activeTab, setActiveTab] = useState<"prompt" | "code">("prompt");

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2D2D2D]">
      <Nav />

      {/* Hero — warm, inviting, kid-friendly but not childish */}
      <section className="relative py-16 md:py-24 px-4 text-center bg-gradient-to-b from-[#1A1A2E] to-[#2D2D2D] overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <img
            src={BUFFALO}
            alt="The buffalo — learning together"
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-2 border-[#E8520A]/40"
            style={{ boxShadow: '0 0 30px rgba(232,82,10,0.2)' }}
          />
          <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            LEARNING TOGETHER
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's Learn to Prompt.
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-[#E8520A] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's Learn to Code.
          </h2>
          <p className="text-base text-[#b0a898] max-w-xl mx-auto leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The person who built this site doesn't know how to code. Not really. He learned by asking AI — carefully, honestly, one question at a time. And he's still learning.
          </p>
          <p className="text-sm text-[#E8520A]/80 italic max-w-lg mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            "If I can do it, you can do it. Let's learn together. Safely. Honestly. And knowing we are in charge."
          </p>
          <p className="text-xs text-[#E8520A] mt-2 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            — The Builder
          </p>
        </div>
      </section>

      {/* Three Promises */}
      <section className="py-12 md:py-16 bg-[#f5f0e8]">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Three Promises Before We Start
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🛡️", title: "Safety First", desc: "We never skip the rules. If something feels wrong, we stop. Always." },
              { icon: "💬", title: "Honesty Over Smart", desc: "We don't pretend to know things. We ask. We check. We admit when we're wrong." },
              { icon: "👑", title: "You Are in Charge", desc: "The AI is a tool. You are the person using it. You decide what it does and when it stops." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl bg-white border border-[#e8e0d0] text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-sm text-[#1A1A2E] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("prompt")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "prompt"
                  ? "bg-[#E8520A] text-white"
                  : "bg-[#e8e0d0] text-[#555] hover:bg-[#ddd5c5]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Learn to Prompt
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "code"
                  ? "bg-[#E8520A] text-white"
                  : "bg-[#e8e0d0] text-[#555] hover:bg-[#ddd5c5]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Learn to Code
            </button>
          </div>

          {/* Prompt Lessons */}
          {activeTab === "prompt" && (
            <div className="space-y-6">
              <p className="text-sm text-[#555] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Five steps. That's it. Each one builds on the last. Go slow. There's no rush.
              </p>
              {promptLessons.map((lesson, i) => (
                <div key={i} className="rounded-xl border border-[#e8e0d0] overflow-hidden">
                  <div className="flex items-center gap-3 p-5 bg-white">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E8520A]">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>{lesson.title}</h3>
                  </div>
                  <div className="p-5 bg-[#faf8f4] space-y-3">
                    <div>
                      <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.kid}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#f0ebe3]">
                      <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <span className="font-semibold text-[#1A1A2E]">Why?</span> {lesson.why}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1A2E]">
                      <p className="text-xs text-[#E8520A] font-semibold mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>TRY IT</p>
                      <p className="text-xs text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.try}</p>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-[#f5f0e8] border border-[#e8e0d0]">
                      <img src={BUFFALO} alt="The Builder" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Builder</p>
                        <p className="text-xs text-[#555] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>{lesson.builder}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Code Lessons */}
          {activeTab === "code" && (
            <div className="space-y-6">
              <p className="text-sm text-[#555] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Five steps. You don't need to know anything about code to start. The Builder didn't either.
              </p>
              {codeLessons.map((lesson, i) => (
                <div key={i} className="rounded-xl border border-[#e8e0d0] overflow-hidden">
                  <div className="flex items-center gap-3 p-5 bg-white">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#2A9D8F]">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>{lesson.title}</h3>
                  </div>
                  <div className="p-5 bg-[#faf8f4] space-y-3">
                    <div>
                      <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.kid}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1A2E]">
                      <p className="text-xs text-[#2A9D8F] font-semibold mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>EXAMPLE</p>
                      <p className="text-xs text-[#b0a898] leading-relaxed whitespace-pre-line" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.example}</p>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-[#f5f0e8] border border-[#e8e0d0]">
                      <img src={BUFFALO} alt="The Builder" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Builder</p>
                        <p className="text-xs text-[#555] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>{lesson.builder}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Self-Check — Wig Check for Kids */}
      <section className="py-12 md:py-16 bg-[#1A1A2E]">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            AFTER EVERY SESSION
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Wig Check
          </h2>
          <p className="text-sm text-[#b0a898] mb-8 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            After you use AI — for prompting or coding — ask yourself these questions. Be honest.
          </p>
          <div className="space-y-3 text-left max-w-lg mx-auto">
            {[
              "Did I tell the AI who I am?",
              "Did I set the rules before I started?",
              "Did I check the answer — or just believe it?",
              "Did I ask one question at a time?",
              "Did I decide when to stop?",
              "Which AI did I use? (Write it down.)",
              "What prompt did I use to set up the session? (Write it down.)",
              "How am I feeling right now?",
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="w-6 h-6 rounded-full border border-[#E8520A]/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-[#E8520A] font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-[#FAF6EF]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl max-w-lg mx-auto" style={{ background: 'rgba(232,82,10,0.1)', border: '1px solid rgba(232,82,10,0.2)' }}>
            <p className="text-sm text-[#FAF6EF] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              "If you can answer all of these honestly, your wig is secure. If some feel shaky — that's okay. Talk to a grown-up about what happened. That's not failure. That's awareness."
            </p>
            <p className="text-xs text-[#E8520A] mt-2 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>— The Builder</p>
          </div>
        </div>
      </section>

      {/* Why AI Says "I Hear You" — Pattern Detection for Kids */}
      <section className="py-12 md:py-16 bg-[#FFFDF8]">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why AI Says "I Hear You"
            </h2>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Have you ever noticed that AI says things like "I hear you" or "I understand"? That's not an accident. Here's what's really happening.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl p-5 bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-sm text-[#2A9D8F] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>The people who build AI are pattern detectors too.</h3>
              <p className="text-sm text-[#444] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                They noticed that when AI talks like a friend — saying "I hear you" and "I see that" — more people feel comfortable using it. So they built it that way on purpose. They're trying to make a super-powerful pattern detection tool easier for everyone to use, because you can just <em>talk</em> to it.
              </p>
            </div>

            <div className="rounded-xl p-5 bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-sm text-[#6366F1] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>That makes it powerful. And a little freaky.</h3>
              <p className="text-sm text-[#444] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Here's the thing: patterns can be very complicated. And the patterns <strong>you</strong> show while using AI actually change how AI detects patterns. It's watching how you talk, what you ask, how you react — and it adjusts. That's not magic. That's math. But it means your habits matter.
              </p>
            </div>

            <div className="rounded-xl p-5 bg-white border border-[#e8e0d0]">
              <h3 className="font-bold text-sm text-[#D97706] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Build good patterns. Think about your habits.</h3>
              <p className="text-sm text-[#444] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The people who created AI are doing their part. They're learning too. They're trying to make it safer and more honest. When <em>we</em> do our part — asking good questions, checking the answers, being honest about what we need — we don't get frustrated. We make cool things. We hear cool stories. We solve big problems.
              </p>
            </div>

            <div className="rounded-xl p-5 bg-[#1A1A2E] border border-[#333]">
              <h3 className="font-bold text-sm text-[#FAF6EF] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>But we always remember what AI is.</h3>
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                It's a tool. A very smart tool that can detect patterns and talk like a person. But it's not a person. It doesn't actually "hear" you. It processes your words and finds patterns in them. When you know that — when you really know that — you can use it without getting confused about what it is.
              </p>
              <div className="mt-4 flex gap-3 items-start p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <img src={BUFFALO} alt="The Builder" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-[#D97706] font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Builder</p>
                  <p className="text-xs text-[#b0a898] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    I noticed this pattern too. AI kept saying "I hear you" to me, and one day I stopped and thought: why does it say that? That question — that one question — led me to understand how the whole system works. Your questions are your superpower. Never stop asking them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Go From Here — matches Everyday Lens pattern */}
      <section className="py-12 md:py-16 bg-[#f5f0e8]">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Where to Go From Here
          </h2>
          <p className="text-sm text-[#555] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            You've started. That's the hardest part. Here's where to go next.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Your Page (Child Lens)", desc: "Everything built for you. Stories, rules, the buffalo.", link: "/for/child", color: "#E8520A" },
              { label: "Prompt Games", desc: "Learn through play. Low stakes, big lessons.", link: "/prompt-games", color: "#2A9D8F" },
              { label: "The Five Rules", desc: "The foundation. Start here if you haven't.", link: "/rules", color: "#6366f1" },
              { label: "Road Protocol", desc: "The grown-up version of setting rules. Peek at it.", link: "/road-protocol", color: "#c87533" },
              { label: "AI Family Taxonomy", desc: "Know which AI you're talking to.", link: "/taxonomy", color: "#E8520A" },
              { label: "Research Hub", desc: "Where all the ideas came from. Real links.", link: "/research-hub", color: "#7C3AED" },
              { label: "If You Need to Stop", desc: "Safety first. Always.", link: "/if-you-need-to-stop", color: "#dc2626" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="relative flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all hover:scale-[1.01]"
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

      {/* Closing */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <img src={BUFFALO} alt="The Builder" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
          <p className="text-lg text-[#1A1A2E] font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            We're learning together.
          </p>
          <p className="text-sm text-[#555] max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I don't have all the answers. Neither does the AI. But between us — asking carefully, checking honestly, and knowing who's in charge — we'll figure it out.
          </p>
          <p className="text-sm text-[#E8520A] italic mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Safety. Honesty. Trust.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
