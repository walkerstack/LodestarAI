/**
 * PageStudioBlocks — automatically renders Studio blocks for the current page.
 * 
 * Reads the current URL path and maps it to the correct pageSlug.
 * Add this once to the App layout — every page gets its blocks automatically.
 * 
 * If a page has no blocks in the database, nothing renders.
 * The original page content is always preserved above this.
 */

import { useLocation } from "wouter";
import StudioBlocks from "./StudioBlocks";

// Maps URL paths to page slugs used in the database
const PATH_TO_SLUG: Record<string, string> = {
  "/": "home",
  "/rules": "rules",
  "/road-protocol": "road-protocol",
  "/promptolinguistics": "promptolinguistics",
  "/alcm": "alcm",
  "/lexicon": "lexicon",
  "/field-papers": "field-papers",
  "/citizen-researcher": "citizen-researcher",
  "/research-hub": "research-hub",
  "/builder": "builder",
  "/builder-origin": "builder-origin",
  "/builders-kids": "builders-kids",
  "/frameworks": "frameworks",
  "/taxonomy": "taxonomy",
  "/malbolge": "malbolge",
  "/playground": "playground",
  "/prompt-games": "prompt-games",
  "/flower-presets": "flower-presets",
  "/human-line": "human-line",
  "/drift": "drift",
  "/anthropomorphism": "anthropomorphism",
  "/hallucinations": "hallucinations",
  "/scaffold": "scaffold",
  "/three-voices": "three-voices",
  "/three-lenses": "three-voices",
  "/whelm-scale": "whelm-scale",
  "/variable-scale": "variable-scale",
  "/math-prompting": "math-prompting",
  "/user-governance": "user-governance",
  "/dual-strategy": "dual-strategy",
  "/gallantry-ai": "gallantry-ai",
  "/eu-ai-act": "eu-ai-act",
  "/what-claude-admitted": "what-claude-admitted",
  "/what-the-ai-said": "what-the-ai-said",
  "/open-door": "open-door",
  "/counter-arguments": "counter-arguments",
  "/screenshot-sharing": "screenshot-sharing",
  "/field-report-review": "field-report-review",
  "/gallery": "gallery",
  "/articles": "articles",
  "/if-you-need-to-stop": "safety",
  "/school-board": "school-board",
  "/kids-learn": "kids-learn",
  "/prompts": "prompts",
  // Lenses
  "/for/child": "for-child",
  "/for/child/rules": "for-child-rules",
  "/for/child/patterns": "for-child-patterns",
  "/for/child/prompts": "for-child-prompts",
  "/for/teenager": "for-teenager",
  "/for/everyday": "for-everyday",
  "/for/guardian-teacher": "for-guardian-teacher",
  "/for/prompt-engineer": "for-prompt-engineer",
  "/for/linguist": "for-linguist",
  "/for/mathematician": "for-mathematician",
  "/for/cognitive-science": "for-cognitive-science",
  "/for/psychology": "for-psychology",
  "/for/researcher": "for-researcher",
  "/for/watcher": "for-watcher",
};

export default function PageStudioBlocks() {
  const [location] = useLocation();

  // Strip query strings and trailing slashes
  const cleanPath = location.split("?")[0].replace(/\/$/, "") || "/";

  const slug = PATH_TO_SLUG[cleanPath];

  // Don't render on Studio page itself or any admin routes
  if (cleanPath.startsWith('/studio') || cleanPath.startsWith('/backstage')) return null;

  // No slug mapping for this path — don't render anything
  if (!slug) return null;

  return <StudioBlocks pageSlug={slug} />;
}
