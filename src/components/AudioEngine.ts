// ── Procedural 8-bit audio engine using Web Audio API ──────────
// No external files needed — all sounds generated from oscillators

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ── Sound effects ────────────────────────────────────────────

export function playJumpSfx() {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch { /* silent fail */ }
}

export function playScoreSfx() {
  try {
    const ctx = getCtx();
    // Two quick ascending notes
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 0.1);
    });
  } catch { /* silent fail */ }
}

export function playGameOverSfx() {
  try {
    const ctx = getCtx();
    const notes = [440, 370, 311, 261]; // A4, F#4, Eb4, C4 — descending
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.2);
    });
  } catch { /* silent fail */ }
}

export function playStartSfx() {
  try {
    const ctx = getCtx();
    const notes = [262, 330, 392, 523]; // C4 E4 G4 C5 — ascending arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
      gain.gain.setValueAtTime(0.09, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.12);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.12);
    });
  } catch { /* silent fail */ }
}

// ── Background music loop ────────────────────────────────────
// A simple looping 8-bit melody using square + triangle waves

let bgmNodes: { oscs: OscillatorNode[]; gains: GainNode[]; masterGain: GainNode } | null = null;
let bgmInterval: ReturnType<typeof setInterval> | null = null;

const BGM_MELODY = [
  // [freq, duration_ms]
  [262, 200], [294, 200], [330, 200], [349, 200],
  [392, 400], [330, 200], [392, 200],
  [440, 400], [392, 200], [349, 200],
  [330, 400], [294, 200], [262, 200],
  [294, 400], [330, 200], [294, 200],
  [262, 600], [0, 200],
  // variation
  [392, 200], [440, 200], [494, 200], [523, 200],
  [494, 400], [440, 200], [392, 200],
  [349, 400], [330, 200], [349, 200],
  [392, 400], [440, 200], [392, 200],
  [330, 400], [294, 200], [330, 200],
  [262, 600], [0, 400],
] as const;

// Bass accompaniment
const BGM_BASS = [
  [131, 800], [165, 800],
  [175, 800], [131, 800],
  [147, 800], [131, 800],
  [131, 800], [0, 800],
  [196, 800], [220, 800],
  [175, 800], [165, 800],
  [196, 800], [220, 800],
  [165, 800], [131, 800],
] as const;

export function startBgm() {
  if (bgmNodes) return; // already playing
  try {
    const ctx = getCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let melodyIdx = 0;
    let bassIdx = 0;
    let melodyTimer = 0;
    let bassTimer = 0;

    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    const playNote = (freq: number, dur: number, type: OscillatorType, volume: number) => {
      if (freq === 0) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      g.gain.setValueAtTime(volume, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000 * 0.9);
      osc.connect(g).connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur / 1000);
      oscs.push(osc);
      gains.push(g);
    };

    // Play first notes
    const [mFreq, mDur] = BGM_MELODY[0];
    playNote(mFreq, mDur, 'square', 0.08);
    const [bFreq, bDur] = BGM_BASS[0];
    playNote(bFreq, bDur, 'triangle', 0.1);

    bgmInterval = setInterval(() => {
      const now = Date.now();

      // Melody
      if (now - melodyTimer >= BGM_MELODY[melodyIdx][1]) {
        melodyTimer = now;
        melodyIdx = (melodyIdx + 1) % BGM_MELODY.length;
        const [freq, dur] = BGM_MELODY[melodyIdx];
        playNote(freq, dur, 'square', 0.08);
      }

      // Bass
      if (now - bassTimer >= BGM_BASS[bassIdx][1]) {
        bassTimer = now;
        bassIdx = (bassIdx + 1) % BGM_BASS.length;
        const [freq, dur] = BGM_BASS[bassIdx];
        playNote(freq, dur, 'triangle', 0.1);
      }
    }, 50);

    bgmNodes = { oscs, gains, masterGain };
  } catch { /* silent fail */ }
}

export function stopBgm() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  if (bgmNodes) {
    try {
      bgmNodes.masterGain.gain.setValueAtTime(bgmNodes.masterGain.gain.value, audioCtx!.currentTime);
      bgmNodes.masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + 0.3);
      setTimeout(() => {
        bgmNodes?.masterGain.disconnect();
        bgmNodes = null;
      }, 400);
    } catch {
      bgmNodes = null;
    }
  }
}

export function isBgmPlaying() {
  return bgmNodes !== null;
}
