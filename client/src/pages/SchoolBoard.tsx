/*
 * GALLANTRYAI — School Board Page
 * A parent's proposal to a school board. Not a pitch. A sharing.
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsMidLink from "@/components/KidsMidLink";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";
const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

const levels = [
  {
    who: "The Institution",
    audience: "Board Members & Trustees",
    what: "A governance framework your board can adopt without changing your tech stack. This isn't about installing software — it's about how your people use AI. Policy language, dual strategy (human + AI working together, not replacing each other), and a clear line between system-level safety and user-level responsibility.",
    links: [
      { label: "User-Side Governance", path: "/user-governance" },
      { label: "Dual Strategy", path: "/dual-strategy" },
      { label: "Gallantry AI", path: "/gallantry-ai" },
    ],
  },
  {
    who: "The Managers",
    audience: "Principals & Administrators",
    what: "The Road Protocol is an operational layer. Before AI enters a classroom, someone sets the rules — what it can do, what it can't, and who decides. Think of it as adjusting the mirrors before you drive. Your administrators can use this to create session-level governance that teachers can follow and students can understand.",
    links: [
      { label: "Road Protocol", path: "/road-protocol" },
      { label: "The Five Rules", path: "/rules" },
      { label: "Variable Scale", path: "/variable-scale" },
    ],
  },
  {
    who: "The Teachers",
    audience: "Educators & Classroom Leaders",
    what: "Nine lenses — different ways to look at AI depending on your subject, your students, and your goals. A math teacher sees AI differently than an English teacher. A guardian sees it differently than a researcher. The lens system gives teachers a framework that fits their discipline. Plus prompt games for classroom use and a variable scale for grading AI involvement honestly.",
    links: [
      { label: "All Lenses", path: "/for/everyday" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Flower Presets", path: "/flower-presets" },
    ],
  },
  {
    who: "The Children",
    audience: "Students of All Ages",
    what: "Stories they understand. A buffalo in a wig who teaches them to ask first, stay honest, and stay in charge. A sloth who learns to watch the AI watching her. A brain dashboard they fill out after every session. Safety built into the experience — not bolted on after something goes wrong.",
    links: [
      { label: "Child Lens", path: "/for/child" },
      { label: "The Watcher (Kids)", path: "/for/watcher" },
    ],
  },
];

export default function SchoolBoard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "#1A1A2E" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/school-board-hero-na2rdc2gKijFWpeCdCdzt2.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.82) 0%, rgba(26,26,46,0.92) 100%)" }} />
          <div className="relative container py-16 md:py-24 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: sansFont }}>
              For School Boards & Institutions
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              I Built Something I'd Like to Share.
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sansFont }}>
              My name is Matt Gallantry. I'm a parent in Midland, Ontario. My children are 4 and 2. They are growing up in a world where AI is everywhere — and I couldn't find a framework that worked at every level. So I built one.
            </p>
          </div>
        </section>

        {/* What This Is */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              What This Is
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
              <p>
                This is <strong style={{ color: "#E8520A" }}>user-side governance</strong> — not system-level. I'm not asking you to install anything, change your tech stack, or adopt a new platform. This is about how people <em>use</em> AI, not how AI is built.
              </p>
              <p>
                System-level safety is what OpenAI, Google, and Anthropic build into their models — content filters, guardrails, alignment. That matters. But it's not enough. Because the moment a student opens a chat window, they're on their own. The filter can't teach them to think. The guardrail can't teach them to question.
              </p>
              <p>
                <strong style={{ color: "#1A1A2E" }}>That's the gap this fills.</strong> A scaffold that works from the boardroom to the classroom to the kitchen table. One system. Four levels. Every person accounted for.
              </p>
            </div>
          </div>
        </section>
        {/* Four Levels */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-center mb-2 font-semibold" style={{ color: "#E8520A", fontFamily: sansFont }}>
              One System, Four Levels
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              From the Board to the Student
            </h2>

            <div className="space-y-6">
              {levels.map((level) => (
                <div
                  key={level.who}
                  className="rounded-2xl p-6 md:p-8"
                  style={{ background: "#fff", border: "1.5px solid #e8e0d0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "#E8520A", fontFamily: sansFont }}>
                        {level.who}
                      </div>
                      <div className="text-sm mb-3" style={{ color: "#888", fontFamily: sansFont }}>
                        {level.audience}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
                        {level.what}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {level.links.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className="inline-block px-4 py-2 rounded-lg text-xs font-semibold no-underline transition-all hover:scale-[1.02]"
                            style={{ background: "#1A1A2E", color: "#E8520A" }}
                          >
                            {link.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Watcher */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "#E8520A", fontFamily: sansFont }}>
              Digital Literacy, Not Paranoia
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#FAF6EF" }}>
              The Watcher
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#b0a898", fontFamily: sansFont }}>
              AI watches students. It tracks what they type, how long they stay, what they click. That's not conspiracy — that's how the technology works. The Watcher teaches students to watch it back. To notice when the AI changes the subject, flatters them, or tries to keep them engaged longer than they intended. That's not paranoia. That's literacy.
            </p>
            <Link
              href="/for/watcher"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-[1.02]"
              style={{ background: "#E8520A", color: "#fff" }}
            >
              See the Watcher →
            </Link>
          </div>
        </section>

        {/* Why This Works */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Why This Works
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
              <p>
                It's not a ban. Bans don't work — students find workarounds in minutes. It's not "use AI freely" either — that's how you get dependency, plagiarism, and cognitive drift.
              </p>
              <p>
                It's a <strong style={{ color: "#E8520A" }}>scaffold</strong>. A structure that holds the conversation in place while people learn to hold it themselves. Built from hundreds of hours of real sessions across eight platforms. Tested with real children. The stories are real. The framework is real.
              </p>
              <p>
                Every piece connects. The Road Protocol sets the rules. The lenses give perspective. The Watcher teaches awareness. The child stories make it accessible. The governance layer makes it institutional. And the whole thing runs on three principles:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { principle: "Safety", desc: "Every conversation has boundaries. Someone has to set them." },
                { principle: "Honesty", desc: "Over confidence. Over speed. Over sounding smart." },
                { principle: "Trust", desc: "Built over time. Not assumed. Not automated." },
              ].map((p) => (
                <div
                  key={p.principle}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: "#FFFDF8", border: "2px solid #E8520A" }}
                >
                  <div className="font-black text-lg mb-1" style={{ fontFamily: serifFont, color: "#E8520A" }}>{p.principle}</div>
                  <p className="text-xs" style={{ color: "#5a4a3a", fontFamily: sansFont }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Ask */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img
                src={BUFFALO_IMG}
                alt="The buffalo"
                className="w-20 h-20 rounded-full object-cover shadow-lg"
                style={{ border: "2px solid #E8520A" }}
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              I'm Not Selling. I'm Sharing.
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
              <p>
                I built this because I needed it. My kids needed it. And I believe other families and schools need it too.
              </p>
              <p>
                This is not a startup. This is not a product launch. This is a parent who spent hundreds of hours talking to AI — watching it, testing it, documenting it — because he wanted his children to grow up knowing how to think alongside it, not be replaced by it.
              </p>
              <p style={{ color: "#E8520A", fontFamily: serifFont, fontStyle: "italic", fontSize: "1.1rem" }}>
                I truly believe this is the way. And we can do this safely, together.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/scaffold"
                className="inline-block px-8 py-4 rounded-xl text-sm font-bold no-underline transition-all hover:scale-[1.02]"
                style={{ background: "#1A1A2E", color: "#E8520A" }}
              >
                See the Full Scaffold →
              </Link>
            </div>
            <p className="text-xs mt-6" style={{ color: "#999", fontFamily: sansFont }}>
              Matt Gallantry · Midland, Ontario · GallantryAI · 2026
            </p>
          </div>
        </section>
      </main>

      <div className="flex justify-center py-6 bg-[#1A1A2E]">
        <KidsMidLink />
      </div>

      <Footer />
    </div>
  );
}
