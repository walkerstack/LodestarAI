/*
 * GALLANTRYAI — If You Need to Stop
 * Design: Dark/Research register — this page is serious, calm, and safe
 * Safety is the first value. This page is always here.
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const resources = [
  {
    name: "Crisis Services Canada",
    phone: "1-833-456-4566",
    text: "Text 45645",
    url: "https://www.crisisservicescanada.ca",
    country: "Canada",
  },
  {
    name: "Kids Help Phone",
    phone: "1-800-668-6868",
    text: "Text HELLO to 686868",
    url: "https://kidshelpphone.ca",
    country: "Canada · Under 20",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "Call or text 988",
    text: "Chat at 988lifeline.org",
    url: "https://988lifeline.org",
    country: "United States",
  },
  {
    name: "Samaritans",
    phone: "116 123",
    text: "jo@samaritans.org",
    url: "https://www.samaritans.org",
    country: "UK & Ireland",
  },
  {
    name: "Beyond Blue",
    phone: "1300 22 4636",
    text: "Chat at beyondblue.org.au",
    url: "https://www.beyondblue.org.au",
    country: "Australia",
  },
];

const searchCategories = [
  { label: "Free mental health clinic", query: "free mental health clinic near" },
  { label: "Crisis mental health hospital", query: "crisis mental health hospital near" },
  { label: "Counselling / therapy", query: "free counselling therapy services near" },
  { label: "Youth mental health", query: "youth mental health services near" },
  { label: "Addiction support", query: "addiction support services near" },
  { label: "Domestic violence help", query: "domestic violence help near" },
];

function LocalResourceSearch() {
  const [area, setArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchCategories[0].query);

  const handleSearch = () => {
    if (!area.trim()) return;
    const q = encodeURIComponent(`${selectedCategory} ${area.trim()}`);
    window.open(`https://www.google.com/search?q=${q}`, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="rounded-xl border border-[#E8520A]/30 bg-[#E8520A]/5 p-5 md:p-6 mb-2">
      <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Choose what you're looking for, type your area, and hit search. This opens Google with the right terms.
      </p>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {searchCategories.map((cat) => (
          <button
            key={cat.query}
            onClick={() => setSelectedCategory(cat.query)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat.query
                ? "bg-[#E8520A] text-white"
                : "bg-[#222] text-[#888] border border-[#333] hover:border-[#555]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search input + button */}
      <div className="flex gap-3">
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your city or area..."
          className="flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[#333] text-[#FAF6EF] text-sm placeholder-[#555] focus:outline-none focus:border-[#E8520A] transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          onClick={handleSearch}
          disabled={!area.trim()}
          className="px-5 py-3 rounded-xl bg-[#E8520A] text-white text-sm font-semibold hover:bg-[#d04a08] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Search
        </button>
      </div>

      <p className="text-[10px] text-[#555] mt-3 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        This opens a Google search in a new tab. GallantryAI does not collect or store your location.
      </p>
    </div>
  );
}

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-16 max-w-2xl">
        <div className="brand-top-bar mb-8" />

        <div className="section-label mb-4" style={{ color: '#E8520A' }}>Safety First</div>

        <h1
          className="text-3xl md:text-4xl font-bold mb-6 text-[#FAF6EF]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          If you need to stop — stop.
        </h1>

        <p className="text-base text-[#e8e0d0] mb-6 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          This page is here because GallantryAI is built on three values: <strong>Safety. Honesty. Trust.</strong> Safety is first. Always.
        </p>

        <p className="text-base text-[#e8e0d0] mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          If you are in a hard place right now — whether from something on this site, something in your life, or something you cannot name — you are allowed to stop. You do not owe this website anything. You do not owe the AI anything. You do not owe anyone your suffering.
        </p>

        <div className="border border-[#E8520A]/40 rounded-lg p-6 mb-8 bg-[#E8520A]/5">
          <p className="text-[#E8520A] font-bold mb-2 text-sm uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The most important thing on this page:
          </p>
          <p className="text-[#FAF6EF] text-xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "You are the variable that matters most. Not the AI. Not the prompt. You."
          </p>
        </div>

        {/* === FIND LOCAL RESOURCES — Google Search Bar === */}
        <div className="section-label mb-4" style={{ color: '#E8520A' }}>Find Local Resources</div>
        <p className="text-sm text-[#aaa] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Type your city or area below. We'll open a Google search with the right terms to help you find real, local help.
        </p>

        <LocalResourceSearch />

        <div className="section-label mb-4 mt-12" style={{ color: '#E8520A' }}>Crisis Resources</div>
        <p className="text-sm text-[#aaa] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          If you or someone you know is in crisis, please reach out. These are real people. Real lines. Real help.
        </p>

        <div className="space-y-4">
          {resources.map((r) => (
            <div key={r.name} className="border border-[#e8e0d0]/20 rounded-lg p-4 bg-[#FAF6EF]/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-[#FAF6EF] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {r.name}
                  </div>
                  <div className="text-xs text-[#888] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {r.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#E8520A] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {r.phone}
                  </div>
                  <div className="text-xs text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {r.text}
                  </div>
                </div>
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#2A9D8F] mt-2 inline-block hover:underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {r.url} →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#e8e0d0]/20 pt-8">
          <p className="text-sm text-[#888] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Built for the people no one was watching for.
          </p>
          <p className="text-xs text-[#666] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            GallantryAI · Safety · Honesty · Trust
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
