import { motion } from "framer-motion";
import PhotoMemory from "./PhotoMemory";
import MessageText from "./MessageText";

import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";
import memory7 from "@/assets/memory-7.jpg";

const storyMessages = [
  "Every moment with you feels like a dream I never want to wake from.",
  "Your smile is my favorite sight in the entire world.",
  "I fall in love with you a little more every single day.",
  "You make even the ordinary feel extraordinary.",
  "There is no one else I'd rather share this life with.",
];

const StoryFlow = () => {
  return (
    <section className="relative bg-valentine-cream px-6 py-20">
      <div className="max-w-sm mx-auto space-y-20">
        {/* Message 1 */}
        <div className="text-center">
          <MessageText
            text={storyMessages[0]}
            className="text-xl font-light"
            italic
          />
        </div>

        {/* Photo 4 */}
        <PhotoMemory
          src={memory4}
          alt="An evening together"
          className="w-full aspect-[3/4] mx-auto"
          rotation={1}
        />

        {/* Message 2 */}
        <div className="text-center">
          <MessageText
            text={storyMessages[1]}
            className="text-xl font-light"
            italic
          />
        </div>

        <PhotoMemory
          src={memory7}
          alt="A sunset memory"
          className="w-5/6 aspect-[4/3] mx-auto"
          rotation={-1.5}
        />

        {/* Message 3 */}
        <div className="text-center pt-4">
          <MessageText
            text={storyMessages[2]}
            className="text-lg font-light"
            italic
          />
        </div>

        {/* Photo 5 */}
        <PhotoMemory
          src={memory5}
          alt="A sunset memory"
          className="w-5/6 aspect-[4/3] mx-auto"
          rotation={-1.5}
        />

        {/* Message 4 */}
        <div className="text-center">
          <MessageText
            text={storyMessages[3]}
            className="text-xl font-light"
            italic
          />
        </div>

        {/* Photo 6 */}
        <PhotoMemory
          src={memory6}
          alt="Petals"
          className="w-3/4 aspect-square mx-auto"
          rotation={2}
        />

        {/* Message 5 */}
        <div className="text-center pb-10">
          <MessageText
            text={storyMessages[4]}
            className="text-xl font-light"
            italic
          />
        </div>
      </div>

      {/* Blur transition overlay at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"
      />
    </section>
  );
};

export default StoryFlow;
