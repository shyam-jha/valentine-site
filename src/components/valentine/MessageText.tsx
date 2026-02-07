import { motion } from "framer-motion";

interface MessageTextProps {
  text: string;
  delay?: number;
  className?: string;
  italic?: boolean;
}

const MessageText = ({ text, delay = 0, className = "", italic = false }: MessageTextProps) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`font-serif text-foreground leading-relaxed ${
        italic ? "italic" : ""
      } ${className}`}
    >
      {text}
    </motion.p>
  );
};

export default MessageText;
