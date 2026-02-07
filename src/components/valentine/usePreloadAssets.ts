import { useEffect, useState } from "react";

export const usePreloadAssets = (assets: string[]) => {
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let loaded = 0;
        let cancelled = false;

        const update = () => {
            if (cancelled) return;
            loaded++;
            setProgress(Math.round((loaded / assets.length) * 100));
            if (loaded === assets.length) setReady(true);
        };

        assets.forEach((src) => {
            if (src.endsWith(".mp3")) {
                const audio = new Audio();
                audio.src = src;
                audio.oncanplaythrough = update;
            } else {
                const img = new Image();
                img.src = src;
                img.onload = update;
            }
        });

        return () => {
            cancelled = true;
        };
    }, [assets]);

    return { progress, ready };
};
