/*
 * GALLANTRYAI — If You Need to Stop
 * Design: Dark/Research register — this page is serious, calm, and safe
 * Safety is the first value. This page is always here.
 */

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

        <div className="section-label mb-4" style={{ color: '#E8520A' }}>Crisis Resources</div>
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
