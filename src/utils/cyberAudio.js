// Procedural Cyberpunk Web Audio Synthesizer for KALHARA.DEV
// Generates clear, high-fidelity glitch sweeps, character scramble chatter,
// pitch-incrementing lock clicks, and resolution chords with zero external dependencies.

class CyberSoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.listeners = new Set();

    // Check localStorage preference
    try {
      const stored = localStorage.getItem('kalhara_cyber_sfx_muted');
      if (stored !== null) {
        this.isMuted = stored === 'true';
      }
    } catch {
      // localStorage may not be accessible
    }

    // Auto-unlock on first user interaction anywhere on the window
    if (typeof window !== 'undefined') {
      const unlockHandler = () => {
        this.unlock();
      };
      ['click', 'pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
        window.addEventListener(evt, unlockHandler, { passive: true });
      });
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isMuted);
      } catch (err) {
        console.error(err);
      }
    });
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // Clear, rich audible master gain (0.35)
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  unlock() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playGlitchBurst() {
    if (this.isMuted) return;
    this.unlock();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Cyber glitch frequency drop
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.05);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1700, t);
      filter.Q.setValueAtTime(3.5, t);

      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.055);
    } catch {
      // ignore
    }
  }

  playScrambleTick() {
    if (this.isMuted) return;
    this.unlock();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Quick matrix data chirp
      osc.type = Math.random() > 0.4 ? 'square' : 'triangle';
      const freq = 1700 + Math.random() * 1100;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.setValueAtTime(freq * 0.75, t + 0.015);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.02);
    } catch {
      // ignore
    }
  }

  playCharLock(resolvedIndex = 0) {
    if (this.isMuted) return;
    this.unlock();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Progressive pitch rise per character (650Hz to 1600Hz)
      const pitch = 650 + resolvedIndex * 85;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, t);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.22, t + 0.038);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // ignore
    }
  }

  playResolveChime() {
    if (this.isMuted) return;
    this.unlock();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // Futuristic sci-fi completion chord: C6 (1046Hz), E6 (1318Hz), G6 (1568Hz)
      const freqs = [1046.5, 1318.5, 1568.0];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = t + idx * 0.035;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, startTime + 0.2);

        gain.gain.setValueAtTime(0.24, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // ignore
    }
  }

  playToggleBeep(isNowMuted) {
    this.unlock();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (isNowMuted) {
        // Falling low blip for mute
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(260, t + 0.08);
      } else {
        // Rising bright blip for unmute
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
      }

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination); // direct so it plays even if masterGain was muted

      osc.start(t);
      osc.stop(t + 0.1);
    } catch {
      // ignore
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('kalhara_cyber_sfx_muted', String(this.isMuted));
    } catch {
      // ignore
    }

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }

    this.playToggleBeep(this.isMuted);
    this.notify();
    return this.isMuted;
  }
}

export const cyberAudio = new CyberSoundFX();
