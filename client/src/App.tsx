/**
 * GALLANTRYAI — App Router
 * Design: The Living Document
 * The site is a scaffold. Each route is a level. Each lens is a door.
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LexiconProvider } from "./contexts/LexiconContext";
import OopsSloth from "./components/OopsSloth";
import LexiconButton from "./components/LexiconButton";
import LexiconPanel from "./components/LexiconPanel";
import PageStudioBlocks from "./components/studio/PageStudioBlocks";

// ── Lazy-loaded pages (code-split per route) ─────────────────────────────────
const Home = lazy(() => import("./pages/Home"));

// Lenses
const ChildLens = lazy(() => import("./pages/lenses/ChildLens"));
const GuardianTeacherLens = lazy(() => import("./pages/lenses/GuardianTeacherLens"));
const PromptEngineerLens = lazy(() => import("./pages/lenses/PromptEngineerLens"));
const LinguistLens = lazy(() => import("./pages/lenses/LinguistLens"));
const MathematicianLens = lazy(() => import("./pages/lenses/MathematicianLens"));
const CognitiveScienceLens = lazy(() => import("./pages/lenses/CognitiveScienceLens"));
const PsychologyLens = lazy(() => import("./pages/lenses/PsychologyLens"));
const ResearcherLens = lazy(() => import("./pages/lenses/ResearcherLens"));
const EverydayLens = lazy(() => import("./pages/lenses/EverydayLens"));
const WatcherLens = lazy(() => import("./pages/lenses/WatcherLens"));
const TeenagerLens = lazy(() => import("./pages/lenses/TeenagerLens"));

// Foundation
const FiveRules = lazy(() => import("./pages/FiveRules"));
const SafetyPage = lazy(() => import("./pages/SafetyPage"));
const FlowerPresets = lazy(() => import("./pages/FlowerPresets"));
const RoadProtocol = lazy(() => import("./pages/RoadProtocol"));

// Scaffold
const Promptolinguistics = lazy(() => import("./pages/Promptolinguistics"));
const AlcmPage = lazy(() => import("./pages/AlcmPage"));
const HumanLine = lazy(() => import("./pages/HumanLine"));
const Drift = lazy(() => import("./pages/Drift"));
const Malbolge = lazy(() => import("./pages/Malbolge"));
const WhelmScale = lazy(() => import("./pages/WhelmScale"));
const VariableScale = lazy(() => import("./pages/VariableScale"));
const UserGovernance = lazy(() => import("./pages/UserGovernance"));
const DualStrategy = lazy(() => import("./pages/DualStrategy"));
const Scaffold = lazy(() => import("./pages/Scaffold"));
const MathPrompting = lazy(() => import("./pages/MathPrompting"));
const ThreeLenses = lazy(() => import("./pages/ThreeLenses"));

// Research / Builder
const Builder = lazy(() => import("./pages/Builder"));
const BuilderOrigin = lazy(() => import("./pages/BuilderOrigin"));
const BuildersKids = lazy(() => import("./pages/BuildersKids"));
const CitizenResearcher = lazy(() => import("./pages/CitizenResearcher"));
const FieldPapers = lazy(() => import("./pages/FieldPapers"));
const Frameworks = lazy(() => import("./pages/Frameworks"));
const ResearchHub = lazy(() => import("./pages/ResearchHub"));
const LivingLexicon = lazy(() => import("./pages/LivingLexicon"));
const Taxonomy = lazy(() => import("./pages/Taxonomy"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Articles = lazy(() => import("./pages/Articles"));

// Tools
const PromptGames = lazy(() => import("./pages/PromptGames"));
const Playground = lazy(() => import("./pages/Playground"));
const PromptLibrary = lazy(() => import("./pages/PromptLibrary"));

// Children's
const ChildFiveRules = lazy(() => import("./pages/ChildFiveRules"));
const ChildPatterns = lazy(() => import("./pages/ChildPatterns"));
const ChildPrompts = lazy(() => import("./pages/ChildPrompts"));
const KidsLearn = lazy(() => import("./pages/KidsLearn"));
const SchoolBoard = lazy(() => import("./pages/SchoolBoard"));

// Field Notes
const WhatClaudeAdmitted = lazy(() => import("./pages/WhatClaudeAdmitted"));
const WhatTheAiSaid = lazy(() => import("./pages/WhatTheAiSaid"));
const OpenDoor = lazy(() => import("./pages/OpenDoor"));
const CounterArguments = lazy(() => import("./pages/CounterArguments"));
const ScreenshotSharing = lazy(() => import("./pages/ScreenshotSharing"));
const FieldReportReview = lazy(() => import("./pages/FieldReportReview"));
const EuAiAct = lazy(() => import("./pages/EuAiAct"));

// Concepts
const Anthropomorphism = lazy(() => import("./pages/Anthropomorphism"));
const Hallucinations = lazy(() => import("./pages/Hallucinations"));
const GallantryAiPage = lazy(() => import("./pages/GallantryAiPage"));

// Studio (owner-only)
const Studio = lazy(() => import("./pages/Studio"));

// ── Page loading fallback ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080604",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "2px solid #2a2218",
          borderTopColor: "#E8520A",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        {/* The 9 Audience Lenses */}
        <Route path="/for/everyday" component={EverydayLens} />
        <Route path="/for/child" component={ChildLens} />
        <Route path="/for/child/rules" component={ChildFiveRules} />
        <Route path="/for/child/patterns" component={ChildPatterns} />
        <Route path="/for/child/prompts" component={ChildPrompts} />
        <Route path="/for/guardian-teacher" component={GuardianTeacherLens} />
        <Route path="/for/prompt-engineer" component={PromptEngineerLens} />
        <Route path="/for/linguist" component={LinguistLens} />
        <Route path="/for/mathematician" component={MathematicianLens} />
        <Route path="/for/cognitive-science" component={CognitiveScienceLens} />
        <Route path="/for/psychology" component={PsychologyLens} />
        <Route path="/for/researcher" component={ResearcherLens} />
        <Route path="/for/watcher" component={WatcherLens} />
        <Route path="/for/teenager" component={TeenagerLens} />
        {/* Feature Sections */}
        <Route path="/promptolinguistics" component={Promptolinguistics} />
        <Route path="/lexicon" component={LivingLexicon} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/articles" component={Articles} />
        <Route path="/if-you-need-to-stop" component={SafetyPage} />
        {/* Research */}
        <Route path="/human-line" component={HumanLine} />
        <Route path="/field-papers" component={FieldPapers} />
        {/* Builder & New Sections */}
        <Route path="/backstage">{() => { window.location.replace("/studio"); return null; }}</Route>
        <Route path="/studio" component={Studio} />
        <Route path="/builder" component={Builder} />
        <Route path="/frameworks" component={Frameworks} />
        <Route path="/citizen-researcher" component={CitizenResearcher} />
        <Route path="/road-protocol" component={RoadProtocol} />
        <Route path="/rules" component={FiveRules} />
        <Route path="/flower-presets" component={FlowerPresets} />
        <Route path="/taxonomy" component={Taxonomy} />
        <Route path="/prompt-games" component={PromptGames} />
        <Route path="/malbolge" component={Malbolge} />
        <Route path="/playground" component={Playground} />
        <Route path="/builder-origin" component={BuilderOrigin} />
        <Route path="/alcm" component={AlcmPage} />
        <Route path="/whelm-scale" component={WhelmScale} />
        <Route path="/variable-scale" component={VariableScale} />
        <Route path="/gallantry-ai" component={GallantryAiPage} />
        <Route path="/dual-strategy" component={DualStrategy} />
        <Route path="/user-governance" component={UserGovernance} />
        <Route path="/school-board" component={SchoolBoard} />
        <Route path="/scaffold" component={Scaffold} />
        <Route path="/kids-learn" component={KidsLearn} />
        <Route path="/three-lenses" component={ThreeLenses} />
        <Route path="/three-voices" component={ThreeLenses} />
        <Route path="/math-prompting" component={MathPrompting} />
        <Route path="/eu-ai-act" component={EuAiAct} />
        <Route path="/what-claude-admitted" component={WhatClaudeAdmitted} />
        <Route path="/open-door" component={OpenDoor} />
        <Route path="/research-hub" component={ResearchHub} />
        <Route path="/counter-arguments" component={CounterArguments} />
        <Route path="/screenshot-sharing" component={ScreenshotSharing} />
        <Route path="/field-report-review" component={FieldReportReview} />
        <Route path="/what-the-ai-said" component={WhatTheAiSaid} />
        <Route path="/prompts" component={PromptLibrary} />
        <Route path="/drift" component={Drift} />
        <Route path="/builders-kids" component={BuildersKids} />
        <Route path="/anthropomorphism" component={Anthropomorphism} />
        <Route path="/hallucinations" component={Hallucinations} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // IntroCrawl splash screen disabled — file preserved in components/IntroCrawl.tsx

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LexiconProvider>
          <TooltipProvider>
            <Toaster />
            <OopsSloth />
            {/* Lexicon panel + button — bottom-right corner, z-45/z-40 */}
            {/* KidsMidLink is z-60 and always floats above — do not change */}
            <LexiconButton />
            <LexiconPanel />

            {/* IntroCrawl removed from display — file preserved in components/IntroCrawl.tsx */}
            <ScrollToTop />
            <PageStudioBlocks />
            <Router />
          </TooltipProvider>
        </LexiconProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
