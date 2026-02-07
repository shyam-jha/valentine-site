import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningScene from "@/components/valentine/OpeningScene";
import StoryFlow from "@/components/valentine/StoryFlow";
import QuestionSection from "@/components/valentine/QuestionSection";
import CelebrationOverlay from "@/components/valentine/CelebrationOverlay";
import MusicToggle from "@/components/valentine/MusicToggle";

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  const handleAnswer = useCallback((answer: boolean) => {
    if (answer) {
      setShowCelebration(true);
    }
  }, []);

  return (
    <main className="relative bg-background overflow-x-hidden">
      <MusicToggle />

      {/* Scene 1: Opening */}
      <OpeningScene onInteraction={handleInteraction} />

      {/* Scene 2: Story flow */}
      <StoryFlow />

      {/* Scene 3: The Question */}
      <QuestionSection onAnswer={handleAnswer} />

      {/* Scene 4: Celebration overlay */}
      <AnimatePresence>
        {showCelebration && <CelebrationOverlay />}
      </AnimatePresence>
    </main>
  );
};

export default Index;
