/*
 * GALLANTRYAI — App Router
 * Design: The Living Document
 * The site is a scaffold. Each route is a level. Each lens is a door.
 */

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import IntroCrawl from "./components/IntroCrawl";
import OopsSloth from "./components/OopsSloth";

import ChildLens from "./pages/lenses/ChildLens";
import GuardianTeacherLens from "./pages/lenses/GuardianTeacherLens";
import PromptEngineerLens from "./pages/lenses/PromptEngineerLens";
import LinguistLens from "./pages/lenses/LinguistLens";
import MathematicianLens from "./pages/lenses/MathematicianLens";
import CognitiveScienceLens from "./pages/lenses/CognitiveScienceLens";
import PsychologyLens from "./pages/lenses/PsychologyLens";
import ResearcherLens from "./pages/lenses/ResearcherLens";
import EverydayLens from "./pages/lenses/EverydayLens";
import Promptolinguistics from "./pages/Promptolinguistics";
import LivingLexicon from "./pages/LivingLexicon";
import Gallery from "./pages/Gallery";
import Articles from "./pages/Articles";
import SafetyPage from "./pages/SafetyPage";
import Backstage from "./pages/Backstage";
import HumanLine from "./pages/HumanLine";
import FieldPapers from "./pages/FieldPapers";
import Builder from "./pages/Builder";
import Frameworks from "./pages/Frameworks";
import CitizenResearcher from "./pages/CitizenResearcher";
import RoadProtocol from "./pages/RoadProtocol";
import FiveRules from "./pages/FiveRules";
import FlowerPresets from "./pages/FlowerPresets";
import Taxonomy from "./pages/Taxonomy";
import PromptGames from "./pages/PromptGames";
import Malbolge from "./pages/Malbolge";
import Playground from "./pages/Playground";
import BuilderOrigin from "./pages/BuilderOrigin";
import AlcmPage from "./pages/AlcmPage";
import WhelmScale from "./pages/WhelmScale";
import VariableScale from "./pages/VariableScale";
import GallantryAiPage from "./pages/GallantryAiPage";
import DualStrategy from "./pages/DualStrategy";
import UserGovernance from "./pages/UserGovernance";
import WatcherLens from "./pages/lenses/WatcherLens";
import SchoolBoard from "./pages/SchoolBoard";
import Scaffold from "./pages/Scaffold";
import KidsLearn from "./pages/KidsLearn";
import ThreeLenses from "./pages/ThreeLenses";
import MathPrompting from "./pages/MathPrompting";
import EuAiAct from "./pages/EuAiAct";
import WhatClaudeAdmitted from "./pages/WhatClaudeAdmitted";
import OpenDoor from "./pages/OpenDoor";
import ResearchHub from "./pages/ResearchHub";
import CounterArguments from "./pages/CounterArguments";
import ScreenshotSharing from "./pages/ScreenshotSharing";
import FieldReportReview from "./pages/FieldReportReview";

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
    <Switch>
      <Route path="/" component={Home} />
      {/* The 9 Audience Lenses */}
      <Route path="/for/everyday" component={EverydayLens} />
      <Route path="/for/child" component={ChildLens} />
      <Route path="/for/guardian-teacher" component={GuardianTeacherLens} />
      <Route path="/for/prompt-engineer" component={PromptEngineerLens} />
      <Route path="/for/linguist" component={LinguistLens} />
      <Route path="/for/mathematician" component={MathematicianLens} />
      <Route path="/for/cognitive-science" component={CognitiveScienceLens} />
      <Route path="/for/psychology" component={PsychologyLens} />
      <Route path="/for/researcher" component={ResearcherLens} />
      <Route path="/for/watcher" component={WatcherLens} />
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
      <Route path="/backstage" component={Backstage} />
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
      <Route path="/math-prompting" component={MathPrompting} />
      <Route path="/eu-ai-act" component={EuAiAct} />
      <Route path="/what-claude-admitted" component={WhatClaudeAdmitted} />
      <Route path="/open-door" component={OpenDoor} />
      <Route path="/research-hub" component={ResearchHub} />
      <Route path="/counter-arguments" component={CounterArguments} />
      <Route path="/screenshot-sharing" component={ScreenshotSharing} />
      <Route path="/field-report-review" component={FieldReportReview} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro only once per browser session
    return !sessionStorage.getItem("gallantry-intro-v6");
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("gallantry-intro-v6", "1");
    setShowIntro(false);
    // Always land on home after intro
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <OopsSloth />

          {showIntro && <IntroCrawl onComplete={handleIntroComplete} />}
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
