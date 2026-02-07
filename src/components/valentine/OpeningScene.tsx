import { motion } from "framer-motion";
import PhotoMemory from "./PhotoMemory";
import MessageText from "./MessageText";

import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

interface OpeningSceneProps {
  onInteraction: () => void;
}

const OpeningScene = ({ onInteraction }: OpeningSceneProps) => {
  return (
    <section
      className="relative min-h-screen gradient-warm flex flex-col items-center justify-center px-6 py-20"
      onClick={onInteraction}
      onTouchStart={onInteraction}
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-valentine-blush opacity-20 blur-[100px]" />
      </div>

      {/* Main message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="relative z-10 text-center max-w-sm mb-16"
      >
        <MessageText
          text="You have been the most beautiful girl I have ever known to exist."
          delay={0.8}
          className="text-2xl sm:text-3xl font-light tracking-wide"
          italic
        />
      </motion.div>

      {/* Photos appearing one by one */}
      <div className="relative z-10 w-full max-w-sm space-y-6">
      <PhotoMemory
          src={memory1}
          alt="A warm memory"
          delay={0.2}
          className="w-4/5 aspect-[3/4] mx-auto"
          rotation={-2}
        />
        <PhotoMemory
          src={memory2}
          alt="A beautiful moment"
          delay={0.4}
          className="w-3/4 aspect-square mx-auto"
          rotation={1.5}
        />
        <PhotoMemory
          src={memory3}
          alt="Together"
          delay={0.6}
          className="w-4/5 aspect-[3/4] mx-auto"
          rotation={-1}
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-valentine-rose/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-valentine-rose/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OpeningScene;
