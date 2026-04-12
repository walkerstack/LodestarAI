/**
 * GALLANTRYAI — Learning Flow Navigation
 * A reusable component that shows contextual "where to go next" buttons.
 * Each page passes its own connections — this is a web, not a line.
 * Three categories: Go Deeper (more complex), Go Wider (related concepts), Go Simpler (easier entry)
 */

import { Link } from "wouter";

interface FlowLink {
  label: string;
  href: string;
  description: string;
}

interface LearningFlowProps {
  /** Current page title for context */
  current: string;
  /** Links to more advanced/deeper concepts */
  deeper?: FlowLink[];
  /** Links to related concepts at same level */
  wider?: FlowLink[];
  /** Links to simpler/entry-level versions */
  simpler?: FlowLink[];
  /** Optional: override background style */
  dark?: boolean;
}

export default function LearningFlow({ current, deeper = [], wider = [], simpler = [], dark = false }: LearningFlowProps) {
  const hasLinks = deeper.length > 0 || wider.length > 0 || simpler.length > 0;
  if (!hasLinks) return null;

  const bg = dark ? "#0D0D0D" : "#FAF6EF";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
  const cardBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const titleColor = dark ? "#FAF6EF" : "#1A1A2E";
  const subtitleColor = dark ? "#888" : "#666";
  const labelColor = "#E8520A";
  const descColor = dark ? "#aaa" : "#555";
  const linkColor = dark ? "#FAF6EF" : "#1A1A2E";

  const renderSection = (title: string, icon: string, links: FlowLink[]) => {
    if (links.length === 0) return null;
    return (
      <div className="mb-6 last:mb-0">
        <div
          className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2"
          style={{ color: labelColor, fontFamily: "'DM Sans', sans-serif" }}
        >
          <span>{icon}</span> {title}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg p-3 no-underline transition-all hover:scale-[1.01]"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
              }}
            >
              <div
                className="text-sm font-bold mb-0.5"
                style={{ color: linkColor, fontFamily: "'Playfair Display', serif" }}
              >
                {link.label}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: descColor, fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 px-6" style={{ background: bg }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
            style={{ color: subtitleColor, fontFamily: "'DM Sans', sans-serif" }}
          >
            Learning & Growing
          </p>
          <h3
            className="text-lg font-bold"
            style={{ color: titleColor, fontFamily: "'Playfair Display', serif" }}
          >
            Where to Go from Here
          </h3>
        </div>

        {renderSection("Go Deeper", "↓", deeper)}
        {renderSection("Related Concepts", "↔", wider)}
        {renderSection("Start Simpler", "↑", simpler)}
      </div>
    </section>
  );
}
