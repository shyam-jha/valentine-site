import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio once
  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Play / pause toggle
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0; // 🔥 always start from beginning
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => { });
    }
  }, [isPlaying]);

  // Autoplay on first user interaction
  useEffect(() => {
    if (hasInteracted) return;

    const startMusic = () => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0; // 🔥 start from beginning
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => { });
    };

    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });
    window.addEventListener("scroll", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("scroll", startMusic);
    };
  }, [hasInteracted]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-[100] w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center shadow-soft border border-border/50"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-foreground/70" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
    </motion.button>
  );
};

export default MusicToggle;
