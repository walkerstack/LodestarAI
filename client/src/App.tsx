/*
 * GALLANTRYAI — App Router
 * Design: The Living Document
 * The site is a scaffold. Each route is a level. Each lens is a door.
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import IntroCrawl from "./components/IntroCrawl";
import ChildLens from "./pages/lenses/ChildLens";
import GuardianTeacherLens from "./pages/lenses/GuardianTeacherLens";
import PromptEngineerLens from "./pages/lenses/PromptEngineerLens";
import LinguistLens from "./pages/lenses/LinguistLens";
import MathematicianLens from "./pages/lenses/MathematicianLens";
import CognitiveScienceLens from "./pages/lenses/CognitiveScienceLens";
import PsychologyLens from "./pages/lenses/PsychologyLens";
import ResearcherLens from "./pages/lenses/ResearcherLens";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* The 8 Audience Lenses */}
      <Route path="/for/child" component={ChildLens} />
      <Route path="/for/guardian-teacher" component={GuardianTeacherLens} />
      <Route path="/for/prompt-engineer" component={PromptEngineerLens} />
      <Route path="/for/linguist" component={LinguistLens} />
      <Route path="/for/mathematician" component={MathematicianLens} />
      <Route path="/for/cognitive-science" component={CognitiveScienceLens} />
      <Route path="/for/psychology" component={PsychologyLens} />
      <Route path="/for/researcher" component={ResearcherLens} />
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
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {showIntro && <IntroCrawl onComplete={handleIntroComplete} />}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
