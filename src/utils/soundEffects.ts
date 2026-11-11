// Web Audio API procedural sound synthesizer
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playCorrectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + index * 0.07);

    gain.gain.setValueAtTime(0, now + index * 0.07);
    gain.gain.linearRampToValueAtTime(0.18, now + index * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.07);
    osc.stop(now + index * 0.07 + 0.3);
  });
}

export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  // Soft lowpass filter to make it gentle, not grating
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, now);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

export function playPromotionFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Fanfare: G4 -> C5 -> E5 -> G5 (held)
  const sequence = [
    { freq: 392.0, time: 0.0, dur: 0.15 },
    { freq: 523.25, time: 0.15, dur: 0.15 },
    { freq: 659.25, time: 0.30, dur: 0.18 },
    { freq: 783.99, time: 0.48, dur: 0.55 },
    { freq: 1046.5, time: 0.55, dur: 0.65 },
  ];

  sequence.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0, now + time);
    gain.gain.linearRampToValueAtTime(0.2, now + time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur + 0.05);
  });
}

export function playCareerSwitchSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

export function playClickSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(700, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

// Pronounce German text with Web Speech API
export function speakGerman(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.95; // slightly slower for language learners
    utterance.pitch = 1.0;

    // Try finding a German voice
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis unavailable:', err);
  }
}
