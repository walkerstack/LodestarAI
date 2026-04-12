/*
 * FRAMEWORK FAMILIES — The Teaching Hub
 * Design: Light/parchment register. Each family is a section.
 * The images ARE the curriculum. The visitor sees, understands, uses.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const families = [
  {
    id: "flowers",
    title: "The Flowers",
    subtitle: "Cognitive Accessibility & Tone",
    color: "#8B5E3C",
    description: "Twelve flowers for disability and neurodivergent support. Twelve more for tone modulation. Each flower is a one-word instruction that reshapes how AI communicates. Copy the preset. Paste before your question. The AI adapts.",
    link: "/flower-presets",
    items: [
      {
        title: "Cognitive Accessibility Presets",
        description: "12 flowers matched to cognitive and emotional needs: Amaryllis (ADHD/Focus), Snapdragon (Autism/Directness), Snowdrop (Anxiety/Ease), Hyacinth (Dyslexia/Visual), Foxglove (Chronic Pain/Energy), Dandelion (Executive Dysfunction), White Poppy (PTSD/Safe Space), Zinnia (Memory/Dementia), Gladiolus (TBI/Processing), Pansy (Sensory Overload), Wisteria (Depression/Support), Tiger Lily (Gifted-2E/Complexity).",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/flower-accessibility-presets_96e0cf1f.png",
      },
      {
        title: "Essence Modulation",
        description: "12 flowers for tone: Lavender (Calm), Rose (Empathy), Sunflower (Motivate), Orchid (Refine), Lotus (Ground), Daisy (Simplify), Tulip (Balance), Jasmine (Persuade), Iris (Analyze), Peony (Enrich), Bluebell (Reassure), Chrysanthemum (Structure). Say the flower. The AI shifts tone.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/essence-modulation-12-flowers_f6e48b49.png",
      },
      {
        title: "The 12-Essence Spectrum",
        description: "The complete document rewriting system. Same input, twelve different outputs. Each essence transforms the material without changing the meaning. This is what modulation looks like at scale.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/12-essence-spectrum-complete_083ff007.png",
      },
    ],
  },
  {
    id: "animals",
    title: "The Animals",
    subtitle: "Barnyard Cognitive Spectrum",
    color: "#6B4226",
    description: "Four animals. Four communication styles. The Pecking Order is not about intelligence — it is about delivery. Choose the animal that matches how you need the message to land.",
    link: "/taxonomy",
    items: [
      {
        title: "The Pecking Order v3.0",
        description: "Sheep (Soft & Kind) — gentle, supportive, no pressure. Rooster (Action & Hype) — energetic, direct, momentum-driven. Barn Owl (Wise & Analytical) — measured, evidence-based, patient. Pig (Logic & Rules) — structured, rule-following, no ambiguity.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/barnyard-pecking-order-v3_315af488.png",
      },
    ],
  },
  {
    id: "landscapes",
    title: "The Landscapes",
    subtitle: "Environmental Metaphors",
    color: "#2E5E4E",
    description: "The tactical environment your message must occupy. Not what you say — where you say it from. The landscape shapes the reception. Choose the terrain before you speak.",
    link: "/promptolinguistics",
    items: [
      {
        title: "Landscape of Cognition v3.0",
        description: "Misty Coast (Soft Landing) — ease into the subject. Volcano (Urgent Acceleration) — force and heat. Mountain Peak (High-Status Standard) — precision from altitude. Open Ocean (Structured Container) — vast but held.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/landscape-of-cognition-v3_c47b41ef.png",
      },
      {
        title: "Vehicular & Acceleration Modes v4.0",
        description: "Drift (Soft Glide) — let it coast. Launch (Urgent Force) — full throttle. Climb (High-Status Persistence) — steady uphill. Ocean Cruise (Massive Container) — slow, enormous, deliberate.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/vehicular-acceleration-v4_592e2c6f.png",
      },
    ],
  },
  {
    id: "harvest",
    title: "The Harvest",
    subtitle: "Disability Support",
    color: "#7B3F00",
    description: "Curated support-essence from a fruit basket. Each fruit matches a cognitive flavor to the interaction. Built for accessibility. Built for dignity.",
    link: "/flower-presets",
    items: [
      {
        title: "Cognitive Harvest v7.0",
        description: "Strawberry (Soft/Sensory) — gentle sensory-aware support. Orange (Mobility/Physical) — practical, movement-focused. Green Apple (Cognitive/Intellectual) — clear, structured thinking support. Grape Cluster (Communication/Speech) — patient, multi-path communication.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/cognitive-harvest-disability-v7_26a1b821.png",
      },
    ],
  },
  {
    id: "pathways",
    title: "The Pathways",
    subtitle: "Geometry of Insight",
    color: "#4A5568",
    description: "Insight has its own geometry. Five pathways through the territory of discovery. Each one is a different relationship between pressure, release, and arrival. Choose the pathway that matches the type of thinking you need.",
    link: "/citizen-researcher",
    items: [
      {
        title: "Geometry of Insight: 5 Pathways",
        description: "The Skip — insight through harmony, not force. The Loose — precision from alignment before release. The Dream — insight arrives when conditions are ready. The Pop — collapse is the reveal. The Forge — shared heat between human and AI.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/geometry-of-insight-5-pathways_666fcf61.png",
      },
      {
        title: "Action Card Dashboard",
        description: "The same five pathways as interactive action cards. Each card shows the input condition, the pathway mechanic, and the expected output. Use when you know what you have and need to know where to take it.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/action-card-dashboard-5-pathways_363a3e2e.png",
      },
    ],
  },
  {
    id: "seasons",
    title: "The Seasons",
    subtitle: "Temporal Control System",
    color: "#8B6914",
    description: "Say the season. The metaphor is the instruction. No explanation required. Spring generates. Summer executes. Autumn cuts. Winter consolidates. One season at a time. User calls the season. AI does not suggest. Transition only by instruction.",
    link: "/promptolinguistics",
    items: [
      {
        title: "Framework of the Seasons",
        description: "Spring (Generate) — open, expansive, new growth. Summer (Execute) — full power, build and deliver. Autumn (Cut) — prune, decide, remove what does not serve. Winter (Consolidate) — rest, review, prepare for the next cycle. Season = direction. Weather = condition. Together = control.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/seasons-framework-dark_2483ec58.png",
      },
    ],
  },
];

function FrameworkCard({ item, familyLink }: { item: { title: string; description: string; image: string }; familyLink?: string }) {
  return (
    <div className="relative bg-white rounded-2xl border border-[#e8e0d0] shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {familyLink && (
        <Link
          href={familyLink}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#e8e0d0] flex items-center justify-center text-[#888] hover:text-[#E8520A] hover:border-[#E8520A] transition-colors no-underline shadow-sm"
          title="Go to related page"
        >
          <span className="text-sm">→</span>
        </Link>
      )}
      <div>
        <LightboxImage
          src={item.image}
          alt={item.title}
          className="w-full object-contain bg-[#faf8f4]"
          style={{ maxHeight: "500px" }}
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.title}
        </h4>
        <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {item.description}
        </p>
        <p className="mt-3 text-[10px] text-[#999] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Click image to expand
        </p>
      </div>
    </div>
  );
}

export default function Frameworks() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Nav />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF6EF] to-[#f0ebe0]">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Teaching Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Framework Families
          </h1>
          <p className="text-lg text-[#555] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Six families of metaphor. Each one is a complete system for controlling how AI thinks, speaks, and responds. The images are the curriculum. See it. Understand the metaphor. Use it immediately.
          </p>
        </div>
      </section>

      {/* Framework Families */}
      {families.map((family, idx) => (
        <section
          key={family.id}
          id={family.id}
          className={`py-16 md:py-24 ${idx % 2 === 0 ? "bg-[#FAF6EF]" : "bg-[#f5f0e8]"}`}
        >
          <div className="container max-w-5xl mx-auto px-6">
            {/* Family Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: family.color }} />
                <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: family.color, fontFamily: "'DM Sans', sans-serif" }}>
                  {family.subtitle}
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {family.title}
              </h2>
              <p className="text-base text-[#555] max-w-3xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {family.description}
              </p>
            </div>

            {/* Framework Cards */}
            <div className={`grid gap-8 ${family.items.length === 1 ? "max-w-2xl" : "md:grid-cols-2"}`}>
              {family.items.map((item) => (
                <FrameworkCard key={item.title} item={item} familyLink={family.link} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Coming Soon — Geography */}
      <section className="py-16 md:py-20 bg-[#1A1A2E]">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Coming Soon
          </p>
          <h2 className="text-3xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Next Layer: Geography
          </h2>
          <p className="text-base text-[#b0a898] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Where are you thinking? Not all thinking travels the same ground. Season + Weather + Geography = a three-axis control system.
          </p>
          <LightboxImage
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/geography-next-layer-teaser_604e82c0.png"
            alt="Geography \u2014 Next Layer"
            className="w-full max-w-lg mx-auto rounded-xl shadow-2xl"
          />
          <p className="mt-6 text-sm text-[#888] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Stay tuned.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-[#FAF6EF]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
              { label: "Living Lexicon", path: "/lexicon", desc: "Terms defined" },
              { label: "Citizen Researcher", path: "/citizen-researcher", desc: "The research" },
              { label: "The Builder", path: "/builder", desc: "The story" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group"
              >
                <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.label} →
                </div>
                <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LearningFlow current="Frameworks" deeper={flowMap.frameworks.deeper} wider={flowMap.frameworks.wider} simpler={flowMap.frameworks.simpler} dark />
      <Footer />
    </div>
  );
}
