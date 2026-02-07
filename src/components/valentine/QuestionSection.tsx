import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCelebrationSound } from "@/utils/celebrationSound";

interface QuestionSectionProps {
  onAnswer: (answer: boolean) => void;
}

const QuestionSection = ({ onAnswer }: QuestionSectionProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const playfulMessages = [
    "Nope. Wrong choice.",
    "Try again…",
    "Not that one.",
    "Are you sure about that?",
    "Think carefully…",
    "Still no.",
  ];

  const dodgeNo = useCallback(() => {
    const maxX = 120;
    const maxY = 200;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoPosition({ x: newX, y: newY });
    setNoAttempts((prev) => prev + 1);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  }, []);

  return (
    <section className="relative min-h-screen gradient-warm flex flex-col items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-valentine-blush opacity-15 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h2 className="font-serif italic text-3xl sm:text-4xl font-light text-foreground mb-16 leading-snug">
          Will you be my Valentine
          <br />
          this year?
        </h2>

        <div className="flex flex-col items-center gap-6 relative" style={{ minHeight: "160px" }}>
          {/* Yes button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playCelebrationSound();
              onAnswer(true);
            }}
            className="px-12 py-4 rounded-full bg-valentine-rose text-primary-foreground font-sans text-lg font-medium tracking-wide shadow-memory transition-colors hover:opacity-90"
          >
            Yes
          </motion.button>

          {/* No button - dodges on tap/hover */}
          <motion.button
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onTouchStart={(e) => {
              e.preventDefault();
              dodgeNo();
            }}
            onMouseEnter={dodgeNo}
            className="px-12 py-4 rounded-full border border-muted text-muted-foreground font-sans text-lg tracking-wide transition-colors"
          >
            No
          </motion.button>

          {/* Playful message */}
          <AnimatePresence>
            {showMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-12 font-serif italic text-valentine-rose text-sm"
              >
                {playfulMessages[noAttempts % playfulMessages.length]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default QuestionSection;
