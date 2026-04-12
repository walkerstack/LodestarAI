/*
 * GALLANTRYAI — Backstage (Builder-Only)
 * Design: Dark/Research register — private, secure, functional
 * Password-protected. The Builder's private workspace.
 * "The watcher watches the website."
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Simple client-side password gate — not cryptographic security,
// but sufficient to keep casual visitors out.
// Builder: change this password before publishing.
const BACKSTAGE_PASSWORD = "gallantry2026";

const wip = [
  "Build By Numbers™ section (Lego-style family game)",
  "Cultural Prompting section (Korean awareness, French translation)",
  "AI assistant embed (Promptolinguistics Playground)",
  "8 audience lens pages — full content",
  "Barney the Dinosaur AI governance poem — find the right place",
  "Session commands document — watch for it",
  "Private document library — upload and organize",
  "Learn-to-code layer in backstage",
  "Connect whatisgallantryai.com domain (GoDaddy)",
];

export default function Backstage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (password === BACKSTAGE_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1A1A2E]">
        <Nav />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-sm w-full">
            <div className="brand-top-bar mb-8" />
            <div className="section-label mb-3" style={{ color: '#E8520A' }}>Builder Access</div>
            <h1
              className="text-2xl font-bold text-[#FAF6EF] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Backstage
            </h1>
            <p className="text-sm text-[#888] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Private. Builder-only. Enter the password to continue.
            </p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className="w-full px-4 py-3 bg-[#FAF6EF]/10 border border-[#e8e0d0]/20 text-[#FAF6EF] text-sm mb-3 focus:outline-none focus:border-[#E8520A]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {error && (
              <p className="text-rose-400 text-xs mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Incorrect password. Try again.
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full bg-[#E8520A] text-white py-3 font-bold text-sm hover:bg-orange-700 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enter Backstage →
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-12">
        <div className="brand-top-bar mb-8" />
        <div className="section-label mb-2" style={{ color: '#E8520A' }}>Builder-Only</div>
        <h1
          className="text-3xl font-bold text-[#FAF6EF] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Backstage
        </h1>
        <p className="text-sm text-[#888] mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Welcome, Builder. This is your private workspace. Everything here stays here until you decide otherwise.
        </p>

        {/* WIP List */}
        <div className="mb-12">
          <div className="section-label mb-4" style={{ color: '#64748B' }}>Work In Progress</div>
          <div className="space-y-2">
            {wip.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: ['#94A3B8','#7C8FA3','#64748B','#4B5563','#475569'][i % 5] }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document upload placeholder */}
        <div className="mb-12 border border-[#e8e0d0]/20 rounded-lg p-6">
          <div className="section-label mb-3" style={{ color: '#64748B' }}>Document Library</div>
          <p className="text-sm text-[#aaa] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload screenshots, PDFs, and documents here. Decide what goes public from this space.
          </p>
          <div className="bg-[#FAF6EF]/5 border border-dashed border-[#e8e0d0]/30 rounded-lg p-8 text-center">
            <p className="text-[#888] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Document upload coming soon. The Builder's private archive.
            </p>
          </div>
        </div>

        {/* Learn to code */}
        <div className="mb-12 border border-[#e8e0d0]/20 rounded-lg p-6">
          <div className="section-label mb-3" style={{ color: '#E8520A' }}>Learn to Code</div>
          <p className="text-sm text-[#aaa] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The learn-to-code layer. Built into the backstage so the Builder can see the code while building the site.
          </p>
          <div className="space-y-3">
            {[
              "What is a component? (React basics)",
              "How does routing work? (Wouter)",
              "What are CSS variables? (Design tokens)",
              "How do I add a new page?",
              "How do I change the colors?",
            ].map((lesson, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#2A9D8F] flex-shrink-0">◆</span>
                <span>{lesson}</span>
                <span className="text-xs text-[#666] ml-auto">Coming soon</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session commands note */}
        <div className="border border-[#E8520A]/30 rounded-lg p-6 bg-[#E8520A]/5">
          <div className="section-label mb-2" style={{ color: '#E8520A' }}>Session Commands</div>
          <p className="text-sm text-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The session commands document has not been found yet. When it arrives, the activation phrase is: <strong className="text-[#E8520A]">"lets go girl"</strong> — then all commands will be shown.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
