import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import memory1 from "@/assets/img12.png";
import memory2 from "@/assets/img11.png";
import memory3 from "@/assets/img10.png";
import memory4 from "@/assets/img13.png";
import memory5 from "@/assets/img9.png";
import memory6 from "@/assets/img8.png";

const allPhotos = [memory1, memory2, memory3, memory4, memory5, memory6];

const collageRotations = [-2, 1.5, 1, -1.5, 2, -1];

const CelebrationOverlay = () => {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [showFinalText, setShowFinalText] = useState(false);
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (hasLaunched.current) return;
    hasLaunched.current = true;

    // Launch subtle confetti
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#d4a0a0", "#e8c4c4", "#f5e6d3", "#dab894", "#c9917a"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        gravity: 0.8,
        scalar: 0.8,
        drift: 0.5,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        gravity: 0.8,
        scalar: 0.8,
        drift: -0.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Reveal photos one by one
    allPhotos.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, index]);
      }, 800 + index * 600);
    });

    // Show final text after all photos
    setTimeout(() => {
      setShowFinalText(true);
    }, 800 + allPhotos.length * 600 + 800);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 gradient-celebration overflow-y-auto"
    >
      {/* Grid-based photo collage */}
      <div className="relative w-full h-full flex items-center justify-center px-4">
        {/* Collage grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {allPhotos.map((photo, index) => {
            const isVisible = visiblePhotos.includes(index);
            const rotation = collageRotations[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.7, y: 40 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="overflow-hidden rounded-lg shadow-memory"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img
                  src={photo}
                  alt="Memory"
                  className="w-full aspect-square object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* "I love you" overlay — centered on top of collage */}
        <AnimatePresence>
          {showFinalText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="bg-background/70 backdrop-blur-md px-10 py-8 rounded-2xl shadow-soft">
                <p className="font-serif italic text-4xl sm:text-5xl font-light text-foreground text-center leading-tight">
                  I love you.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CelebrationOverlay;
