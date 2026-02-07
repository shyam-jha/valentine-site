import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";

import music from "@/assets/music.mp3";

type MusicContextType = {
    isPlaying: boolean;
    start: () => Promise<void>;
    toggle: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const audio = new Audio(music);
        audio.loop = true;
        audio.volume = 0.3;
        audio.preload = "auto";
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    // ✅ safe autoplay handler
    const start = useCallback(async () => {
        if (!audioRef.current || unlocked) return;

        try {
            await audioRef.current.play();
            setIsPlaying(true);
            setUnlocked(true);
        } catch (err) {
            console.warn("Audio autoplay blocked:", err);
        }
    }, [unlocked]);

    const toggle = useCallback(() => {
        if (!audioRef.current || !unlocked) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [isPlaying, unlocked]);

    return (
        <MusicContext.Provider value={{ isPlaying, start, toggle }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const ctx = useContext(MusicContext);
    if (!ctx) {
        throw new Error("useMusic must be used inside MusicProvider");
    }
    return ctx;
};
