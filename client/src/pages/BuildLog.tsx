/*
 * GALLANTRYAI — Living Build Log
 * All entries stored in DB as card blocks (pageSlug="build-log")
 * Each block's content JSON has: title, description, items[]
 * Items: version, date, changes (pipe-separated), watcher, child, professional
 * Standard page: KidsRedirect, KidsMidLink, LearningFlow, Nav, Footer
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import type { ContentBlock } from "@shared/types";

/* ── Parsed build log entry ── */
interface ParsedEntry {
  id: number;
  position: number;
  title: string;
  description: string;
  version: string;
  date: string;
  changes: string[];
  watcher: string;
  child: string;
  professional: string;
}

function parseEntry(block: ContentBlock): ParsedEntry | null {
  try {
    const c = JSON.parse(block.content) as {
      title?: string;
      description?: string;
      version?: string;
      date?: string;
      changes?: string | string[];
      watcher?: string;
      child?: string;
      professional?: string;
      // legacy nested format
      items?: Array<{ label?: string; value?: string }>;
    };

    // Flat format (current DB format)
    if (c.version !== undefined || c.title !== undefined) {
      const changesRaw = c.changes ?? "";
      const changesArr = Array.isArray(changesRaw)
        ? changesRaw
        : changesRaw
          ? changesRaw.split("|").map((s) => s.trim()).filter(Boolean)
          : [];
      return {
        id: block.id,
        position: block.position,
        title: c.title ?? block.id.toString(),
        description: c.description ?? "",
        version: c.version ?? "",
        date: c.date ?? "",
        changes: changesArr,
        watcher: c.watcher ?? "",
        child: c.child ?? "",
        professional: c.professional ?? "",
      };
    }

    // Legacy nested items format
    const items = c.items ?? [];
    const get = (label: string) => items.find((m) => m.label === label)?.value ?? "";
    const changesRaw = get("changes");
    return {
      id: block.id,
      position: block.position,
      title: c.title ?? block.id.toString(),
      description: c.description ?? "",
      version: get("version"),
      date: get("date"),
      changes: changesRaw ? changesRaw.split("|").map((s) => s.trim()).filter(Boolean) : [],
      watcher: get("watcher"),
      child: get("child"),
      professional: get("professional"),
    };
  } catch {
    return null;
  }
}

/* ── Build Log Entry Card ── */
function BuildLogCard({ entry }: { entry: ParsedEntry }) {
  return (
    <details
      className="group rounded-2xl overflow-hidden"
      style={{ border: "1px solid #1a1610", background: "#0a0806" }}
    >
      <summary
        className="flex items-center gap-4 p-5 cursor-pointer select-none list-none"
        style={{ borderBottom: "1px solid #1a1610" }}
      >
        {entry.version && (
          <span
            className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
            style={{ background: "#E8520A22", color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
          >
            {entry.version}
          </span>
        )}
        <span
          className="text-base font-semibold flex-1"
          style={{ color: "#f5e6d0", fontFamily: "'Playfair Display', serif" }}
        >
          {entry.title}
        </span>
        {entry.date && (
          <span
            className="text-xs shrink-0 hidden sm:block"
            style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}
          >
            {entry.date}
          </span>
        )}
        <span
          className="text-xs shrink-0 transition-transform duration-200 group-open:rotate-180"
          style={{ color: "#5a4a3a" }}
        >
          ▼
        </span>
      </summary>

      <div className="p-5 space-y-5">
        {/* Description */}
        {entry.description && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}
          >
            {entry.description}
          </p>
        )}

        {/* Changes list */}
        {entry.changes.length > 0 && (
          <div>
            <div
              className="text-[9px] uppercase tracking-widest font-bold mb-2"
              style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
            >
              What Changed
            </div>
            <ul className="space-y-1">
              {entry.changes.map((change, i) => (
                <li
                  key={i}
                  className="text-xs flex gap-2"
                  style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span style={{ color: "#E8520A" }}>—</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Three voices */}
        {(entry.watcher || entry.child || entry.professional) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {entry.watcher && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mb-2"
                  style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Watcher
                </div>
                <p
                  className="text-xs leading-relaxed italic"
                  style={{ color: "#c8b89a", fontFamily: "'Playfair Display', serif" }}
                >
                  {entry.watcher}
                </p>
              </div>
            )}
            {entry.child && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mb-2"
                  style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Child
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {entry.child}
                </p>
              </div>
            )}
            {entry.professional && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mb-2"
                  style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Professional
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {entry.professional}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

/* ── Main Page ── */
export default function BuildLog() {
  const { data: blocks, isLoading } = trpc.studio.getPublishedBlocks.useQuery({
    pageSlug: "build-log",
  });

  const entries = (blocks ?? [])
    .filter((b) => b.blockType === "card")
    .map(parseEntry)
    .filter((e): e is ParsedEntry => e !== null)
    .sort((a, b) => b.position - a.position); // newest first

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080604" }}>
      <KidsRedirect
        story={kidsBlurbs["/build-log"].story}
        quote={kidsBlurbs["/build-log"].quote}
        attribution={kidsBlurbs["/build-log"].attribution}
      />
      <Nav />

      {/* ── HERO IMAGE ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '340px' }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-buffalo-sloth-UYXnMKJjCqLZjEqnYaQKzQ.webp"
          alt="The buffalo stands guard. The sloth sits beside it. Guardian and guide."
          className="w-full object-cover"
          style={{ minHeight: '340px', maxHeight: '420px', objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.75) 60%, #080604 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6">
          <div className="container max-w-3xl">
            <div
              className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
              style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
            >
              Living Build Log
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
            >
              The Watcher Is Watching
            </h1>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}
            >
              Every publish. Every change. Every decision. Documented honestly.
              Three voices narrate each version: the Watcher who notices, the child who asks,
              and the professional who validates.
            </p>
            <Link
              href="/"
              className="text-sm no-underline transition-opacity hover:opacity-70"
              style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}
            >
              ← Back to GallantryAI
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUILD LOG ENTRIES ── */}
      <section className="w-full py-12 px-6">
        <div className="container max-w-3xl space-y-4">
          {isLoading && (
            <div
              className="text-sm text-center py-12"
              style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}
            >
              Loading entries...
            </div>
          )}

          {!isLoading && entries.length === 0 && (
            <div
              className="text-sm text-center py-12"
              style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}
            >
              No entries yet.
            </div>
          )}

          {entries.map((entry) => (
            <BuildLogCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* ── TEENAGER ENTRY ── */}
      <section className="py-12" style={{ background: 'rgba(232,82,10,0.04)', borderTop: '1px solid rgba(232,82,10,0.12)', borderBottom: '1px solid rgba(232,82,10,0.12)' }}>
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For Teenagers
          </p>
          <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            This Is What Building Looks Like
          </h2>
          <p className="text-sm text-[#c8bfb0] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every version. Every mistake. Every decision to keep going. This log is not a highlight reel — it is the actual work. If you are learning to build things, or learning to use AI, this is what honest progress looks like.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/for/teenager"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
              style={{ background: 'rgba(232,82,10,0.15)', color: '#E8520A', border: '1px solid rgba(232,82,10,0.3)' }}
            >
              Teenager Lens →
            </Link>
            <Link
              href="/rules"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#c8bfb0', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              The Five Rules →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL ENTRY ── */}
      <section className="py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For Researchers & Professionals
          </p>
          <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Build Log as Research Documentation
          </h2>
          <p className="text-sm text-[#c8bfb0] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            This is a citizen research project. The build log is the methodology section — every architectural decision, every content migration, every governance choice, documented in sequence. The three-voice format (Watcher, Child, Professional) is itself a research instrument.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/field-papers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
              style={{ background: 'rgba(232,82,10,0.15)', color: '#E8520A', border: '1px solid rgba(232,82,10,0.3)' }}
            >
              Field Papers →
            </Link>
            <Link
              href="/citizen-researcher"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#c8bfb0', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Citizen Researcher →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SAFETY BANNER ── */}
      <section className="w-full py-10 px-6" style={{ borderTop: "1px solid #1a1610" }}>
        <div className="container max-w-3xl">
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "#0f0c08", border: "1px solid #3a1010" }}
          >
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}
            >
              If you are in crisis, or if something in an AI session has left you feeling unsafe,
              confused, or overwhelmed — there is a page for that.
            </p>
            <Link
              href="/if-you-need-to-stop"
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold no-underline transition-opacity hover:opacity-80"
              style={{ background: "#7a1010", color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}
            >
              If You Need to Stop →
            </Link>
          </div>
        </div>
      </section>

      <KidsMidLink />
      <LearningFlow
        current="Living Build Log"
        deeper={flowMap.buildLog.deeper}
        wider={flowMap.buildLog.wider}
        simpler={flowMap.buildLog.simpler}
        dark
      />
      <Footer />
    </div>
  );
}
