/*
 * GALLANTRYAI — The Builder's Kids
 * Design: Warm, personal, light — cream/amber. Dad voice. No credentials.
 * Hudson is 4. Olive is 2. Why your safety matters to someone you've never met.
 * KidsRedirect top. KidsMidLink bottom. LearningFlow at end.
 */

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import { Link } from "wouter";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const HUDSON_OLIVE_BLURB = {
  story:
    "This page is about the Builder's two kids — Hudson and Olive. Hudson is four and loves counting things. Olive is two and watches everything. This whole site was built because of them. Because one day they'll use AI, and the Builder wanted them to be safe when that day comes.",
  quote: "You matter. That's why this site exists.",
  attribution: "The Builder's Kids",
};

export default function BuildersKids() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={HUDSON_OLIVE_BLURB.story}
        quote={HUDSON_OLIVE_BLURB.quote}
        attribution={HUDSON_OLIVE_BLURB.attribution}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #1A1A2E 0%, #2a1a08 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              The Builder · Personal
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#FAF6EF" }}
            >
              The Builder's Kids
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#b0a898" }}>
              Why your safety matters to someone you've never met.
            </p>
          </div>
        </section>

        {/* Hudson and Olive intro */}
        <section className="py-16 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-10">
              <img
                src={SLOTH_URL}
                alt="The sloth — slow down and think"
                className="w-20 h-20 rounded-full"
                style={{ border: "3px solid #E8520A" }}
              />
            </div>

            <h2
              className="text-2xl md:text-3xl font-black mb-8 text-center"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              Hudson is four. Olive is two.
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                Hudson sees numbers everywhere. Stairs. Apples. How many steps to the door. He counts because the world makes more sense when you count it. One day he'll use AI for math homework. He'll ask it questions and it will answer. And I want him to know — before that day — that the question matters more than the answer. That checking the AI's work is the work. That the variable, the unknown, is always him.
              </p>
              <p>
                Olive is two. She watches. She finds the words for what she sees. She's learning that language is how you reach people — how you say "I see this, do you see it too?" One day she'll use AI to write things, to think through things, to ask things she doesn't know how to ask yet. And I want her to know that her words are hers. That the AI doesn't own them. That she decides what gets said.
              </p>
              <p>
                I built this site because of them. Not for them — they're too young. But <em>because</em> of them. Because I looked at what AI is becoming and I thought: they're going to grow up inside this. And I wanted there to be something waiting for them when they arrive. A set of rules that made sense. A way of thinking that kept them in charge.
              </p>
            </div>
          </div>
        </section>

        {/* Why your safety matters */}
        <section className="py-16 px-6" style={{ background: "#FFFDF8", borderTop: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-black mb-8"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              Why your safety matters to me
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                I'm not a researcher. I'm not a professor. I work with my hands. I'm a dad who got curious about something and couldn't stop thinking about it.
              </p>
              <p>
                And what I kept thinking was: the people building AI are not thinking about Hudson. They're not thinking about Olive. They're thinking about capability, about scale, about what the model can do. Which is fine. But someone has to think about the kid who's going to be sitting across from it.
              </p>
              <p>
                So I started building this. A site that tries to explain AI governance in a way that a child can understand, a teenager can use, and an adult can trust. Not because I have all the answers. But because the question matters and someone had to start asking it out loud.
              </p>
              <p>
                You found this site. That means you're already asking the question. That means you already care about getting this right.
              </p>
              <p style={{ color: "#E8520A", fontWeight: 700 }}>
                That's why your safety matters to me. Because you're someone's Hudson. Someone's Olive. And you deserve to be safe before the day comes.
              </p>
            </div>
          </div>
        </section>

        {/* The Builder's note */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#E8520A" }}>
                From the Builder
              </div>
              <p className="text-base leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                I don't know if this site will matter. I don't know if Hudson will ever read it. I don't know if Olive will remember the world before AI. But I know that I built it honestly. I know that the AI that helped me build it published its own failures on this site. I know that every page was written for a real person in a real moment. That's enough. That's the whole thing.
              </p>
              <p className="text-sm mt-4" style={{ color: "#8a7a6a" }}>
                — The Builder, Midland, Ontario
              </p>
            </div>
          </div>
        </section>

        {/* Where to go next */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8", borderTop: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              Where to go from here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "The Five Rules", href: "/rules", desc: "The foundation. Start here if you haven't." },
                { label: "Math Through Prompting", href: "/math-prompting", desc: "Hudson's page. Learning math by asking the right questions." },
                { label: "For Children", href: "/for/child", desc: "The full children's section — built for young minds." },
                { label: "For Teenagers", href: "/for/teenager", desc: "Older, more complex. The next step up." },
                { label: "What the AI Said", href: "/what-the-ai-said", desc: "The honest record. Including the failures." },
                { label: "Anthropomorphism", href: "/anthropomorphism", desc: "Why the AI feels like a person. And why that matters." },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className="rounded-xl p-5 cursor-pointer transition-all"
                    style={{ background: "#FAF6EF", border: "1.5px solid #e8e0d0" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#E8520A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e0d0";
                    }}
                  >
                    <div className="font-semibold text-sm mb-1" style={{ color: "#E8520A" }}>
                      {link.label}
                    </div>
                    <div className="text-sm" style={{ color: "#6a5a4a" }}>
                      {link.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <KidsMidLink />

      {flowMap["buildersKids"] && (
        <LearningFlow
          current="The Builder's Kids"
          deeper={flowMap["buildersKids"].deeper}
          wider={flowMap["buildersKids"].wider}
          simpler={flowMap["buildersKids"].simpler}
        />
      )}

      <Footer />
    </div>
  );
}
