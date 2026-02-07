import { motion, AnimatePresence } from "framer-motion";

interface EntryGateProps {
    progress: number;
    onContinue: () => void;
    ready: boolean;
}

const EntryGate = ({ progress, onContinue, ready }: EntryGateProps) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center text-center px-6"
        >
            {/* subtle ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-valentine-blush/20 blur-[120px]" />
            </div>

            <AnimatePresence mode="wait">
                {!ready ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full max-w-xs"
                    >
                        <p className="text-sm text-muted-foreground mb-6">
                            Preparing something special…
                        </p>

                        {/* progress bar */}
                        <div className="w-full h-[3px] rounded-full bg-border overflow-hidden">
                            <motion.div
                                className="h-full bg-foreground"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>

                        {/* breathing hint */}
                        <motion.p
                            className="mt-6 text-xs text-muted-foreground"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Just a moment…
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="ready"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-muted-foreground mb-8"
                        >
                            This story sounds better with music
                        </motion.p>

                        {/* main CTA */}
                        <motion.button
                            onClick={onContinue}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            className="relative px-8 py-4 rounded-full bg-foreground text-background text-sm tracking-wide shadow-soft overflow-hidden"
                        >
                            {/* soft pulse ring */}
                            <motion.span
                                className="absolute inset-0 rounded-full border border-foreground/40"
                                animate={{ scale: [1, 1.15], opacity: [0.6, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <span className="relative z-10">
                                Start with music ♫
                            </span>
                        </motion.button>

                        <p className="mt-6 text-xs text-muted-foreground">
                            Tap anywhere to begin
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EntryGate;
