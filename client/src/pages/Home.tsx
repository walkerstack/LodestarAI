/*
 * GALLANTRYAI — Home Page (Hero Only)
 * Full homepage preserved in HomeFullBackup.tsx
 */

import { useAuth } from "@/_core/hooks/useAuth";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const OG_HERO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-v2-ANjG24hqHFNLTULaRPgLyt.webp";

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080604' }}>
      <Nav />

      {/* ── HERO IMAGE — Buffalo + Sloth ── */}
      <section className="relative w-full overflow-hidden" style={{ maxHeight: '420px' }}>
        <img
          src={OG_HERO_URL}
          alt="The buffalo stands guard. The sloth sits beside it. Guardian and guide."
          className="w-full object-cover"
          style={{ maxHeight: '420px', objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, #080604 100%)' }}
        />
      </section>

      {/* ── THE WATCHER ── */}
      <section className="w-full py-6 px-6" style={{ borderBottom: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}
          >
            {"\u201C"}The watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.{"\u201D"}
          </p>
          <p className="text-xs mt-2" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            {"\u2014"} GallantryAI Scaffold Paper, 2026
          </p>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="w-full pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            GallantryAI {"\u00B7"} A System of Learning {"\u00B7"} Midland, Ontario {"\u00B7"} 2026
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-[1.1] mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            A thinking partner.
            <br />
            <span style={{ color: '#E8520A' }}>Not a shortcut.</span>
          </h1>

          <p
            className="text-lg leading-relaxed mb-2 max-w-xl"
            style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}
          >
            Governance does not reside in the prompt. It resides in the person holding the prompt.
          </p>
          <p
            className="text-sm italic mb-10"
            style={{ color: '#5a4a3a', fontFamily: "'Playfair Display', serif" }}
          >
            {"\u2014"} GallantryAI Scaffold Paper, March 2026
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/rules"
              className="inline-flex items-center gap-2 bg-[#E8520A] text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-700 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start with the Five Rules
            </Link>
            <Link
              href="/lexicon"
              className="inline-flex items-center gap-2 border border-[#E8520A]/60 text-[#E8520A] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-[#E8520A]/10 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Living Lexicon
            </Link>
            <Link
              href="/promptolinguistics"
              className="inline-flex items-center gap-2 border border-[#3a3020] text-[#8a7a6a] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:border-[#E8520A]/40 hover:text-[#E8520A] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore the Discipline
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 border border-[#3a3020] text-[#6b5a3e] px-4 py-2 rounded-lg text-xs no-underline hover:border-[#E8520A]/40 hover:text-[#E8520A] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Playground (Coming Soon)
            </Link>
          </div>
        </div>
      </section>

      {/* All sections below (story arc, children's, pathfinding, ethos, scaffold,
          research gallery, three messages, builder, research status, build log,
          safety banner) are preserved in HomeFullBackup.tsx */}

      <div style={{ background: '#080604' }}>
        <Footer />
      </div>
    </div>
  );
}
