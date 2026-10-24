"use client"

// Web Audio API & Haptics Engine for PrinceOS
// Synthesizes crisp tactile audio clicks with 0ms latency and 0 external dependencies.

class SoundManager {
  private audioCtx: AudioContext | null = null
  private enabled: boolean = true
  private initialized: boolean = false

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("princeos_sound_enabled")
      this.enabled = saved !== null ? saved === "true" : true
    }
  }

  public initContext(): AudioContext | null {
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {})
      }
      return this.audioCtx
    }
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass()
        this.initialized = true
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {})
        }
      }
    } catch {
      // AudioContext not supported or restricted
    }
    return this.audioCtx
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(val: boolean) {
    this.enabled = val
    if (typeof window !== "undefined") {
      localStorage.setItem("princeos_sound_enabled", String(val))
      window.dispatchEvent(new CustomEvent("princeos_sound_toggle", { detail: { enabled: val } }))
    }
  }

  public toggle(): boolean {
    const next = !this.enabled
    this.setEnabled(next)
    if (next) {
      this.playClick('pop')
    }
    return next
  }

  public playClick(type: 'click' | 'subtle' | 'pop' | 'bell' = 'click') {
    if (!this.enabled || typeof window === "undefined") return

    try {
      const ctx = this.initContext()
      if (!ctx) return

      const trigger = () => {
        const now = ctx.currentTime

        if (type === 'click') {
          // macOS / iOS haptic trackpad-style mechanical tactile click
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "sine"
          osc.frequency.setValueAtTime(820, now)
          osc.frequency.exponentialRampToValueAtTime(75, now + 0.02)

          gain.gain.setValueAtTime(0.18, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.024)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.026)
        } else if (type === 'subtle') {
          // Very soft micro-tap for hover, tab switch, or surface tap
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "sine"
          osc.frequency.setValueAtTime(520, now)
          osc.frequency.exponentialRampToValueAtTime(130, now + 0.012)

          gain.gain.setValueAtTime(0.07, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.018)
        } else if (type === 'pop') {
          // Satisfying soft bubble pop for launch or toggle
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "sine"
          osc.frequency.setValueAtTime(320, now)
          osc.frequency.exponentialRampToValueAtTime(920, now + 0.038)

          gain.gain.setValueAtTime(0.18, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.05)
        } else if (type === 'bell') {
          // Subtle clean chime for milestone / info
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "sine"
          osc.frequency.setValueAtTime(1046.5, now) // C6
          gain.gain.setValueAtTime(0.12, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.26)
        }
      }

      if (ctx.state === 'suspended') {
        ctx.resume().then(trigger).catch(() => {})
      } else {
        trigger()
      }
    } catch {
      // Audio playback ignored silently if blocked
    }
  }

  public triggerHaptic(pattern: number | number[] = 8) {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern)
      } catch {
        // Ignore haptics errors if permission denied
      }
    }
  }

  // Unified trigger for interactive elements
  public feedback(soundType: 'click' | 'subtle' | 'pop' | 'bell' = 'click', hapticMs: number = 8) {
    this.playClick(soundType)
    this.triggerHaptic(hapticMs)
  }
}

export const soundManager = new SoundManager()

// Convenient helper functions
export const playSound = (type: 'click' | 'subtle' | 'pop' | 'bell' = 'click') => {
  soundManager.playClick(type)
}

export const triggerHaptic = (pattern: number | number[] = 8) => {
  soundManager.triggerHaptic(pattern)
}

export const feedback = (soundType: 'click' | 'subtle' | 'pop' | 'bell' = 'click', hapticMs: number = 8) => {
  soundManager.feedback(soundType, hapticMs)
}

// Global touch/click sound listener for all interactive and surface touches
export const initGlobalTouchSound = () => {
  if (typeof window === "undefined") return () => {}

  let lastClickTime = 0

  // Unlock audio context on the very first gesture
  const unlockAudio = () => {
    soundManager.initContext()
  }
  window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true })
  window.addEventListener('touchstart', unlockAudio, { passive: true, once: true })

  const handlePointerDown = (e: PointerEvent) => {
    const now = Date.now()
    if (now - lastClickTime < 40) return // Debounce micro double-triggers
    lastClickTime = now

    const target = e.target as HTMLElement | null
    if (!target) return

    // Check if target or any parent is interactive
    const interactive = target.closest(
      'button, a, input, select, textarea, [role="button"], [tabindex], .cursor-pointer, [data-sound]'
    )

    if (interactive) {
      soundManager.feedback('click', 8)
    } else {
      soundManager.feedback('subtle', 4)
    }
  }

  window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true })

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true })
  }
}
