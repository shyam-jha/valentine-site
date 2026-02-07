import { motion } from "framer-motion";

interface PhotoMemoryProps {
  src: string;
  alt?: string;
  delay?: number;
  className?: string;
  rotation?: number;
}

const PhotoMemory = ({ src, alt = "Memory", delay = 0, className = "", rotation = 0 }: PhotoMemoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative overflow-hidden rounded-lg shadow-memory ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileInView={{ scale: 1.05 }}
        viewport={{ once: true }}
        transition={{ duration: 8, ease: "linear" }}
        loading="lazy"
      />
    </motion.div>
  );
};

export default PhotoMemory;
