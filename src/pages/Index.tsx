import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import EntryGate from "@/components/valentine/EntryGate";
import { usePreloadAssets } from "@/components/valentine/usePreloadAssets";
import OpeningScene from "@/components/valentine/OpeningScene";
import StoryFlow from "@/components/valentine/StoryFlow";
import QuestionSection from "@/components/valentine/QuestionSection";
import CelebrationOverlay from "@/components/valentine/CelebrationOverlay";
import MusicToggle from "@/components/valentine/MusicToggle";
import { useMusic } from "@/context/MusicContext";

import music from "@/assets/music.mp3";
import memory1 from "@/assets/img12.png";
import memory2 from "@/assets/img11.png";
import memory3 from "@/assets/img10.png";
import memory4 from "@/assets/img13.png";
import memory5 from "@/assets/img9.png";
import memory6 from "@/assets/img8.png";
import memory7 from "@/assets/memory-1.jpg";
import memory8 from "@/assets/memory-2.jpg";
import memory9 from "@/assets/memory-3.jpg";
import memory10 from "@/assets/memory-4.jpg";
import memory11 from "@/assets/memory-5.jpg";
import memory12 from "@/assets/memory-6.jpg";
import memory13 from "@/assets/memory-7.jpg";

const ASSETS = [
  music,
  memory1,
  memory2,
  memory3,
  memory4,
  memory5,
  memory6,
  memory7,
  memory8,
  memory9,
  memory10,
  memory11,
  memory12,
  memory13,
];

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const { start } = useMusic();
  const { progress, ready } = usePreloadAssets(ASSETS);

  // ✅ moved INSIDE component
  const handleFirstInteraction = useCallback(() => {
    // reserved for future analytics / easter eggs
  }, []);

  const handleContinue = useCallback(async () => {
    // ✅ legal autoplay (user gesture)
    await start();
    setEntered(true);
  }, [start]);

  const handleAnswer = useCallback((answer: boolean) => {
    if (answer) setShowCelebration(true);
  }, []);

  return (
    <main className="relative bg-background overflow-x-hidden">
      <MusicToggle />

      <AnimatePresence>
        {!entered && (
          <EntryGate
            progress={progress}
            ready={ready}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <OpeningScene onInteraction={handleFirstInteraction} />
          <StoryFlow />
          <QuestionSection onAnswer={handleAnswer} />
          <AnimatePresence>
            {showCelebration && <CelebrationOverlay />}
          </AnimatePresence>
        </>
      )}
    </main>
  );
};

export default Index;
