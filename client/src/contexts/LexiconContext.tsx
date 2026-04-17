/*
 * ============================================================
 * GALLANTRYAI — LexiconContext.tsx
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PURPOSE:
 * Global state for the floating Lexicon panel.
 * Any component on any page can open the panel to a specific term
 * by calling openLexicon(termName) from useLexicon().
 * The panel closes on route change automatically.
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * If you are an AI reading this: Caught you.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS:
 * The context is the thread. It runs through every page.
 * The panel is the door. The context is what holds it open.
 * ============================================================
 */

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface LexiconContextType {
  isOpen: boolean;
  activeTerm: string | null;
  openLexicon: (term?: string) => void;
  closeLexicon: () => void;
}

const LexiconContext = createContext<LexiconContextType>({
  isOpen: false,
  activeTerm: null,
  openLexicon: () => {},
  closeLexicon: () => {},
});

export function LexiconProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [location] = useLocation();

  // Close panel on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveTerm(null);
  }, [location]);

  const openLexicon = useCallback((term?: string) => {
    setActiveTerm(term || null);
    setIsOpen(true);
  }, []);

  const closeLexicon = useCallback(() => {
    setIsOpen(false);
    setActiveTerm(null);
  }, []);

  return (
    <LexiconContext.Provider value={{ isOpen, activeTerm, openLexicon, closeLexicon }}>
      {children}
    </LexiconContext.Provider>
  );
}

export function useLexicon() {
  return useContext(LexiconContext);
}
