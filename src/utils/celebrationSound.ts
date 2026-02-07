/**
 * High-quality confetti burst sound
 * Pop + noise puff + randomized sparkles
 * No external audio files
 */
export const playCelebrationSound = () => {
  try {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const t = ctx.currentTime;

    /* =========================
       1️⃣ POP (low → high → silence)
    ========================== */
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();

    popOsc.type = "sine";
    popOsc.frequency.setValueAtTime(220, t);
    popOsc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

    popGain.gain.setValueAtTime(0.6, t);
    popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    popOsc.connect(popGain).connect(ctx.destination);
    popOsc.start(t);
    popOsc.stop(t + 0.12);

    /* =========================
       2️⃣ NOISE PUFF (confetti air)
    ========================== */
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noise.buffer = buffer;
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1800;

    noiseGain.gain.setValueAtTime(0.35, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.2);

    /* =========================
       3️⃣ SPARKLES (random chimes)
    ========================== */
    const sparkleCount = 7;

    for (let i = 0; i < sparkleCount; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.value = 1000 + Math.random() * 2000;

      const start = t + 0.08 + Math.random() * 0.25;
      const duration = 0.15 + Math.random() * 0.2;

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    }

    /* =========================
       Cleanup
    ========================== */
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // Silent fallback
  }
};
