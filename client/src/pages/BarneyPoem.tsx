/*
 * GALLANTRYAI — The Barney Poem
 * Design: Dark register with warm children's accent
 * AI governance in plain language. The simplest possible version.
 * "The poem held. The rules drifted." — GallantryAI Field Research
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsMidLink from "@/components/KidsMidLink";

export default function BarneyPoem() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-16 max-w-xl">
        <div className="brand-top-bar mb-8" />

        <div className="section-label mb-2" style={{ color: '#E8520A' }}>AI Governance · Plain Language</div>

        <h1
          className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A Poem About AI Governance
        </h1>
        <p className="text-sm text-[#888] mb-10 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          As written by Barney the Dinosaur.
        </p>

        <div
          className="space-y-6 text-lg text-[#FAF6EF] leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <div>
            <p>I love you, you love me,</p>
            <p>Let's use AI carefully.</p>
            <p>With a rule and a role and a hat on each head,</p>
            <p>Make sure the Builder's in charge instead.</p>
          </div>

          <div>
            <p>Don't let it run, don't let it race,</p>
            <p>Keep the human setting the pace.</p>
            <p>A big hug means we check before we go —</p>
            <p>Safety first, and honest, you know!</p>
          </div>

          <div>
            <p>I love you, you love me,</p>
            <p>AI's a friend when we agree:</p>
            <p>The Builder watches, the Builder leads,</p>
            <p>And the AI only does what the Builder needs.</p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e8e0d0]/20 pt-8">
          <p className="text-xs text-[#666] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            GallantryAI · April 2026 · 🚽
          </p>
          <p className="text-xs text-[#555] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "The poem held. The rules drifted." — Field Research Finding
          </p>
        </div>
      </main>

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>

      <Footer />
    </div>
  );
}
