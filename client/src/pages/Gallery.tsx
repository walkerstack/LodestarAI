/*
 * GALLANTRYAI — Gallery
 * Design: Editorial Register — images ARE the content
 * "The work, made visible."
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const images = [
  {
    id: 1,
    src: `${CDN}/1000005693_e894b781.jpg`,
    title: "Atomic Language Control Model",
    tag: "ALCM",
    register: "professional",
    desc: "The ALCM diagram — how individual words function as control dials within a prompt.",
  },
  {
    id: 2,
    src: `${CDN}/1000005844_96fb30c8.png`,
    title: "AI Steering — Simple Model",
    tag: "FRAMEWORK",
    register: "professional",
    desc: "Simplified visual of the GallantryAI steering framework.",
  },
  {
    id: 3,
    src: `${CDN}/1000005860_c6f6c0a8.jpg`,
    title: "RLHF vs. GallantryAI",
    tag: "RESEARCH",
    register: "professional",
    desc: "Comparison of RLHF (Reinforcement Learning from Human Feedback) and the GallantryAI governance model.",
  },
  {
    id: 4,
    src: `${CDN}/1000006151_42d3ec3d.jpg`,
    title: "Human Drift Governance Paradigm",
    tag: "FRAMEWORK",
    register: "professional",
    desc: "The Human Drift model — what happens when the watcher stops watching.",
  },
  {
    id: 5,
    src: `${CDN}/1000006152_6286ee82.png`,
    title: "Megaphone Diagram",
    tag: "VISUAL",
    register: "professional",
    desc: "Visual metaphor for how prompts amplify the human voice into AI output.",
  },
  {
    id: 6,
    src: `${CDN}/1000008068_8df4a03f.jpg`,
    title: "Professional Research Visual",
    tag: "RESEARCH",
    register: "professional",
    desc: "Field research documentation — professional register.",
  },
  {
    id: 7,
    src: `${CDN}/1000008840_5b1a6230.png`,
    title: "Little AI Field Guide",
    tag: "CHILDREN",
    register: "children",
    desc: "Children's version of the GallantryAI framework — illustrated, warm, honest.",
  },
  {
    id: 8,
    src: `${CDN}/1000008720_722cab58.png`,
    title: "Dark Research Visual I",
    tag: "RESEARCH",
    register: "dark",
    desc: "Cinematic research documentation — dark register.",
  },
  {
    id: 9,
    src: `${CDN}/1000008721_fa375364.png`,
    title: "Dark Research Visual II",
    tag: "RESEARCH",
    register: "dark",
    desc: "Cinematic research documentation — dark register.",
  },
  {
    id: 10,
    src: `${CDN}/1000007496_72281e87.jpg`,
    title: "Field Guide — Antique Register I",
    tag: "FIELD GUIDE",
    register: "antique",
    desc: "Antique/parchment register — the scroll-and-banner visual tradition.",
  },
  {
    id: 11,
    src: `${CDN}/1000007514_9e0904cc.jpg`,
    title: "Field Guide — Antique Register II",
    tag: "FIELD GUIDE",
    register: "antique",
    desc: "Antique/parchment register — compass and aged document aesthetic.",
  },
];

type FilterKey = "all" | "professional" | "dark" | "children" | "antique";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "professional", label: "Professional / Infographic" },
  { key: "dark", label: "Dark / Research" },
  { key: "children", label: "Children / Warm" },
  { key: "antique", label: "Antique / Field Guide" },
];

const tagColors: Record<string, string> = {
  ALCM: "bg-orange-600 text-white",
  FRAMEWORK: "bg-[#1A1A2E] text-white",
  RESEARCH: "bg-[#2A9D8F] text-white",
  VISUAL: "bg-purple-600 text-white",
  CHILDREN: "bg-sky-500 text-white",
  "FIELD GUIDE": "bg-amber-700 text-white",
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<(typeof images)[0] | null>(null);

  const filtered = activeFilter === "all"
    ? images
    : images.filter((img) => img.register === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-12">
        <div className="section-label mb-2">Visual Archive</div>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The work, made visible.
        </h1>
        <p className="text-sm text-[#888] mb-8 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Every image here is original field research. Diagrams, frameworks, and visual translations built at a kitchen table at 5am. The images are the content.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${
                activeFilter === f.key
                  ? "bg-[#E8520A] text-white border-[#E8520A]"
                  : "bg-white text-[#2D2D2D] border-[#e8e0d0] hover:border-[#E8520A] hover:text-[#E8520A]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group cursor-pointer border border-[#e8e0d0] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => setLightbox(img)}
            >
              <div className="overflow-hidden h-52 bg-[#f0ece4]">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-sm text-[#1A1A2E] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {img.title}
                  </h3>
                  <span className={`flex-shrink-0 tag-pill text-[10px] ${tagColors[img.tag] || 'bg-gray-200 text-gray-700'}`}>
                    {img.tag}
                  </span>
                </div>
                <p className="text-xs text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No images in this register yet. More coming.
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#1A1A2E] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-4 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-[#FAF6EF] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {lightbox.title}
                </h3>
                <p className="text-xs text-[#aaa] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {lightbox.desc}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-[#888] hover:text-white text-sm ml-4 flex-shrink-0"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
