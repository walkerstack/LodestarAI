/*
 * THE BUILDER — GallantryAI Origin Story
 * Design: Dark/earth register. Long scroll. Text-driven.
 * Images break the rhythm, not dominate it.
 * The story is public. The prompt stays private.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect } from "react";

const IMG = {
  brain: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/brand-brain-poster_a255dafa.png",
  dataStreams: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/12-person-data-streams_a10fda7e.png",
  mountain: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/13-figure-mountain_a94bb32b.jpg",
  ozzy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/ozzy-protocol-clean_b3b827da.jpg",
  lighthouse: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/16-lighthouse-storm_2e9a0f2b.jpg",
  handsSoil: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/brand-hands-soil_870ee408.png",
  handsLight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/09-hands-soil-light_427a2bfc.jpg",
  whatItIs: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/gallantryai-what-it-is_58a9d976.jpg",
  hospital: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hospital-monitor-vitals_278899c6.jpg",
  family: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/gallantryai-family-poster_cb621f53.jpg",
};

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 pl-6 border-l-4 border-[#E8520A]/60 text-xl md:text-2xl font-light text-[#e8d5c0] italic leading-relaxed"
      style={{ fontFamily: "'Playfair Display', serif" }}>
      {children}
    </blockquote>
  );
}

function SectionImage({ src, alt, caption, side = "right" }: { src: string; alt: string; caption?: string; side?: "left" | "right" }) {
  return (
    <figure className={`my-12 md:my-16 ${side === "right" ? "md:float-right md:ml-8" : "md:float-left md:mr-8"} md:w-[45%] w-full`}>
      <LightboxImage
        src={src}
        alt={alt}
        className="w-full rounded-lg shadow-2xl"
      />
      {caption && (
        <figcaption className="mt-3 text-xs text-[#888] italic text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Divider() {
  return <div className="my-16 flex justify-center"><div className="w-16 h-px bg-[#E8520A]/30" /></div>;
}

export default function Builder() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Nav />

      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/95 to-[#1A1A1A]" />
        <div className="container relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Builder
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF6EF] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            A GallantryAI Origin
          </h1>
          <p className="text-lg text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            He didn't start in tech.
          </p>
        </div>
      </section>
      {/* Story */}
      <article className="container max-w-3xl mx-auto px-6 text-[#c8bfb0] text-base md:text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* Opening */}
        <p className="mb-4">He started in motion.</p>
        <p className="mb-4">Early mornings. Heavy routes. Real work.</p>
        <p className="mb-8">The kind where your body keeps score, and your mind has to follow.</p>
        <p className="mb-4">He wasn't looking for AI.</p>
        <p className="mb-8">He was trying to think.</p>

        <Divider />

        {/* The First Problem */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The First Problem
        </h2>
        <p className="mb-4">Not knowledge.</p>
        <p className="mb-4">Not intelligence.</p>
        <p className="mb-8 text-xl text-[#FAF6EF] font-semibold">Noise.</p>

        <SectionImage src={IMG.brain} alt="NOISE → SIGNAL" caption="The problem was never intelligence. It was noise." side="right" />

        <p className="mb-4">Too many thoughts.</p>
        <p className="mb-4">Too many directions.</p>
        <p className="mb-8">Too many systems that sounded right but didn't hold.</p>
        <p className="mb-4">He noticed something most people miss:</p>

        <Callout>
          The problem wasn't thinking too little.<br />
          The problem was thinking without structure.
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* The Discovery */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Discovery
        </h2>
        <p className="mb-4">AI didn't feel like a tool.</p>
        <p className="mb-8">It felt like a mirror that talked back.</p>

        <SectionImage src={IMG.dataStreams} alt="A human walking through data streams" caption="The mirror that talked back." side="left" />

        <p className="mb-4">At first, it helped.</p>
        <p className="mb-4">Then it confused.</p>
        <p className="mb-8">Then it overwhelmed.</p>
        <p className="mb-2">It would:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>agree too easily</li>
          <li>drift without warning</li>
          <li>sound confident without being right</li>
        </ul>
        <p className="mb-4">And something clicked.</p>

        <Callout>
          If the AI drifts… and I follow it…<br />
          then the system isn't broken.<br />
          The interaction is.
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* The Shift */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Shift
        </h2>

        <SectionImage src={IMG.mountain} alt="Solitary figure on a mountain" caption="How do I stay grounded while using it?" side="right" />

        <p className="mb-4">He stopped asking:</p>
        <Callout>"What can AI do?"</Callout>
        <p className="mb-4">And started asking:</p>
        <Callout>"How do I stay grounded while using it?"</Callout>
        <p className="mb-4">That's where GallantryAI began.</p>
        <p className="mb-4">Not as a product.</p>
        <p className="mb-8">As a response to drift.</p>

        <div className="clear-both" />
        <Divider />

        {/* The Rules */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Rules <span className="text-[#888] font-normal text-lg">(earned, not invented)</span>
        </h2>

        <SectionImage src={IMG.ozzy} alt="The Ozzy Protocol — AI Governance Model" caption="The governance model that came from this." side="left" />

        <p className="mb-8">He didn't design them all at once.</p>
        <p className="mb-4">They showed up through frustration.</p>
        <p className="mb-4">Through failure.</p>
        <p className="mb-8">Through noticing the same mistakes repeat.</p>
        <p className="mb-4">They became simple:</p>
        <ul className="mb-8 space-y-3 pl-6 list-none">
          <li className="text-[#FAF6EF]"><span className="text-[#E8520A] font-bold mr-2">1.</span> Safety first — nothing moves without it</li>
          <li className="text-[#FAF6EF]"><span className="text-[#E8520A] font-bold mr-2">2.</span> Honesty over confidence — clarity beats sounding right</li>
          <li className="text-[#FAF6EF]"><span className="text-[#E8520A] font-bold mr-2">3.</span> Trust is earned — never assumed</li>
          <li className="text-[#FAF6EF]"><span className="text-[#E8520A] font-bold mr-2">4.</span> Agency stays with the human — always</li>
        </ul>
        <p className="mb-4">And most important:</p>

        <Callout>
          Name drift. Correct it. Keep the loop open.
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* The Realization */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Realization
        </h2>

        <SectionImage src={IMG.lighthouse} alt="Lighthouse in a storm" caption="Signal through noise." side="right" />

        <p className="mb-4">Most AI systems try to:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>go faster</li>
          <li>do more</li>
          <li>remove effort</li>
        </ul>
        <p className="mb-8">But that's not what people need.</p>
        <p className="mb-4">Because speed without clarity creates:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>false confidence</li>
          <li>shallow understanding</li>
          <li>dependency</li>
        </ul>
        <p className="mb-4">So he flipped it.</p>

        <Callout>
          What if AI didn't remove friction…<br />
          but applied the right kind of it?
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* The Build */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Build
        </h2>
        <p className="mb-4">GallantryAI became:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>a thinking partner</li>
          <li>a structure for thought</li>
          <li>a way to filter noise into signal</li>
        </ul>
        <p className="mb-4">Not by giving answers faster.</p>
        <p className="mb-8">But by making thinking cleaner.</p>

        <Divider />

        {/* The Image */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Image
        </h2>
        <p className="mb-4">At first, it was a brain.</p>
        <p className="mb-4">It looked right.</p>
        <p className="mb-8">It felt wrong.</p>
        <p className="mb-8">Too generic. Too distant.</p>
        <p className="mb-4">Then came the soil.</p>

        <SectionImage src={IMG.handsSoil} alt="Hands in soil — NOISE → SORT → SIGNAL" caption="Signal over noise. No shortcuts. Just progress." side="left" />

        <p className="mb-4">Hands in dirt.</p>
        <p className="mb-4">Turning. Sorting. Working.</p>
        <p className="mb-8">Because that's what thinking actually is.</p>

        <Callout>
          You don't download clarity.<br />
          You uncover it.
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* The Expansion */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Expansion
        </h2>
        <p className="mb-4">Then something changed.</p>
        <p className="mb-8">It wasn't just about him anymore.</p>
        <p className="mb-4">Because the same problem showed up everywhere:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>people trying to learn without cheating</li>
          <li>people trying to think clearly while overwhelmed</li>
          <li>people trying to improve without support</li>
        </ul>

        <SectionImage src={IMG.handsLight} alt="Many hands reaching through soil toward light" caption="Different. Separate. Together." side="right" />

        <p className="mb-4">So the hands changed.</p>
        <p className="mb-4">Not one.</p>
        <p className="mb-4">Many.</p>
        <p className="mb-8">Different. Separate. Together.</p>
        <p className="mb-4">Children.</p>
        <p className="mb-4">Because:</p>

        <Callout>
          This has to be teachable.<br />
          Or it doesn't matter.
        </Callout>

        <div className="clear-both" />
        <Divider />

        {/* What This Is */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          What This Is <span className="text-[#888] font-normal text-lg">(and isn't)</span>
        </h2>

        <SectionImage src={IMG.whatItIs} alt="GallantryAI — What It Is" caption="It thinks with you. Not for you." side="left" />

        <p className="mb-4">This won't replace real help.</p>
        <p className="mb-4">It won't fix everything.</p>
        <p className="mb-8">It won't think for you.</p>
        <p className="mb-4">But it will:</p>
        <ul className="mb-8 space-y-2 pl-6 list-disc text-[#b0a898]">
          <li>slow things down just enough</li>
          <li>filter what matters</li>
          <li>help you take the next step</li>
        </ul>

        <div className="clear-both" />
        <Divider />

        {/* The Core */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Core
        </h2>
        <p className="mb-4">If everything else gets stripped away, this is what remains:</p>

        <Callout>Signal over noise.</Callout>

        <p className="mb-4">Not faster thinking.</p>
        <p className="mb-8">Clearer thinking.</p>

        <Divider />

        {/* The Builder — still working */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Builder
        </h2>

        {/* Hospital monitor — small, real */}
        <div className="my-8 flex items-start gap-6">
          <LightboxImage
             src={IMG.hospital}
             alt="Hospital vitals monitor"
             className="w-28 md:w-36 rounded-lg shadow-lg opacity-80"
          />
          <div className="text-sm text-[#888] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
            v3.0 was finished from a hospital bed.<br />
            The human line is not a metaphor.
          </div>
        </div>

        <p className="mb-4">He's still working.</p>
        <p className="mb-4">Still refining.</p>
        <p className="mb-4">Still testing.</p>
        <p className="mb-8">Still correcting drift — his and the system's.</p>
        <p className="mb-4">Because this isn't finished.</p>
        <p className="mb-8">It's not supposed to be.</p>

        <Callout>
          The system improves the same way thinking does.<br />
          Slowly. Honestly. Over time.
        </Callout>

        <Divider />

        {/* Final Line */}
        <div className="text-center my-20">
          <LightboxImage
             src={IMG.family}
             alt="GallantryAI — Family"
             className="w-full max-w-lg mx-auto rounded-xl shadow-2xl mb-10"
          />
          <p className="text-2xl md:text-3xl text-[#FAF6EF] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            I humbly seek to learn.
          </p>
          <p className="text-sm text-[#888] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            배움을 정합니다
          </p>
        </div>

        <Divider />

        {/* Builder Origin link */}
        <div className="my-12 text-center">
          <Link
            href="/builder-origin"
            className="inline-flex items-center gap-2 border border-[#E8520A]/60 text-[#E8520A] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-[#E8520A]/10 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Behind the Build: Screenshots, Docs &amp; Stories →
          </Link>
        </div>

        {/* Cross-links */}
        <div className="my-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "The Five Rules", path: "/rules" },
            { label: "Promptolinguistics", path: "/promptolinguistics" },
            { label: "Framework Families", path: "/frameworks" },
            { label: "The Human Line", path: "/human-line" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="block p-4 rounded-xl border border-[#333] bg-[#222] text-center text-sm text-[#c8bfb0] hover:border-[#E8520A]/50 hover:text-[#FAF6EF] transition-all no-underline"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label} →
            </Link>
          ))}
        </div>

      </article>

      <Footer />
    </div>
  );
}
