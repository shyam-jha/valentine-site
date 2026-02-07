import { useMusic } from "@/context/MusicContext";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const { isPlaying, toggle } = useMusic();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
      onClick={toggle}
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
