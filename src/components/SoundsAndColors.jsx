import { useEffect, useRef, useCallback } from 'react'
import Particle from '../Particle'

// Cold color palette hue range: 180 (cyan) → 270 (purple)
const HUE_MIN = 180
const HUE_MAX = 270
const randomColdHue = () => HUE_MIN + Math.random() * (HUE_MAX - HUE_MIN)

export default function SoundsAndColors({ active }) {
    const containerRef = useRef(null)
    const p5Ref = useRef(null)
    const stateRef = useRef({
        particles: [],
        gradients: [],
        gidx: 0,
        fiParticles: 0,
        fiGradient: 0,
        foParticles: 0,
        fadeMax: 0,
        timeouts: {},
        chordSynth: null,
        leadSynth: null,
        leadFx: null,
        chordFx: null,
        tMin: 0,
        playParticleThrottled: null,
        toneStarted: false,
    })

    // Config
    const FPS = 24
    const BPM = 60
    const N_PARTICLES = 32
    const FADE_DURATION = 1
    const MAX_RADIUS = 80

    const sigmoid = (x, k) => 1.0 / (1 + Math.exp((0.5 - x) * k))

    const drawGradient = (sk, x, y, w, h, c1, c2) => {
        sk.noFill()
        sk.strokeWeight(1)
        for (let i = x; i <= x + w; i++) {
            const inter = sk.map(i, x, x + w, 0, 1)
            const c = sk.lerpColor(c1, c2, inter)
            sk.stroke(c)
            sk.line(i, y, i, y + h)
        }
    }

    // Throttle utility
    const throttle = (fn, delay) => {
        let lastCall = 0
        return (...args) => {
            const now = Date.now()
            if (now - lastCall >= delay) {
                lastCall = now
                fn(...args)
            }
        }
    }

    const setupSound = useCallback(async () => {
        const s = stateRef.current
        if (s.toneStarted) return

        const Tone = await import('tone')
        await Tone.start()
        s.toneStarted = true

        // Lead synth — sawtooth with ping-pong delay
        s.leadFx = new Tone.PingPongDelay('8t', 0.4).toDestination()
        s.leadSynth = new Tone.PolySynth(Tone.MonoSynth).connect(s.leadFx)
        s.leadSynth.set({
            oscillator: { type: 'sawtooth' },
            filter: { type: 'lowpass', rolloff: -24, frequency: 5000, Q: 10 },
            envelope: { release: '2n', releaseCurve: 'linear' },
            filterEnvelope: {
                attack: '8n',
                release: '2n',
                releaseCurve: 'exponential',
            },
            volume: -35,
        })

        // Chord synth — FM with auto-filter
        s.chordFx = new Tone.AutoFilter('4n', 1500, 0.4).toDestination().start()
        s.chordSynth = new Tone.PolySynth(Tone.FMSynth).connect(s.chordFx)
        s.chordSynth.set({
            envelope: { attack: '2n', release: '1n', releaseCurve: 'linear' },
            modulationEnvelope: {
                attack: '1m',
                sustain: 1,
                release: '1n',
                releaseCurve: 'linear',
            },
            modulationIndex: 10,
            volume: -35,
        })

        Tone.getTransport().bpm.value = BPM
        s.tMin = Tone.Time('4n').toSeconds() * 1000

        s.playParticleThrottled = throttle((particle) => {
            const octaves = ['1', '2', '3', '4', '5', '6']
            const pitches = ['C', 'E', 'G', 'B']
            const { radius, velocity, color } = particle
            const octaveIdx = Math.floor((1 - radius / MAX_RADIUS) * octaves.length)
            const velocityMag = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2)
            const pitchIdx = Math.floor((velocityMag / 0.0001) * pitches.length)
            const octave = octaves[Math.min(octaveIdx, octaves.length - 1)]
            const pitch = pitches[pitchIdx % pitches.length]
            const note = pitch + octave
            const noteVelocity = color[3] * 3
            s.leadSynth.triggerAttackRelease(note, '4n', '+0', noteVelocity)
        }, s.tMin)
    }, [])

    const fadeGradient = useCallback(() => {
        const s = stateRef.current
        const gradient = {
            c1: [randomColdHue(), 80, 90, 0.7],
            c2: [randomColdHue(), 70, 85, 0.5],
        }
        s.gidx = (s.gidx + 1) % 2
        s.gradients[s.gidx] = gradient
        s.fiGradient = 0
    }, [])

    const fadeInParticles = useCallback(() => {
        const s = stateRef.current
        s.particles = []
        for (let i = 0; i < N_PARTICLES; i++) {
            s.particles.push(
                new Particle({
                    x: Math.random(),
                    y: Math.random(),
                    radius: 1 + Math.random() * MAX_RADIUS,
                    color: [randomColdHue(), 20, 100, 0.01 + Math.random() * 0.5],
                    velocity: [
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01,
                    ],
                    dampening: Math.random() * 0.05,
                })
            )
        }
        s.fiParticles = 0
    }, [])

    const fadeOutParticles = useCallback(() => {
        const s = stateRef.current
        s.foParticles = 0
        if (s.leadSynth) s.leadSynth.releaseAll()
    }, [])

    const playChord = useCallback(() => {
        const s = stateRef.current
        if (!s.chordSynth) return
        // Cold/melancholic chord voicings (minor/major 7ths)
        const chords = [
            ['E3', 'G3', 'B3', 'D4'],   // Em7
            ['C3', 'E3', 'G3', 'B3'],   // Cmaj7
            ['D3', 'G3', 'B3', 'D4'],   // G/D
            ['A2', 'C3', 'E3', 'G3'],   // Am7
        ]
        const chord = chords[Math.floor(Math.random() * chords.length)]
        s.chordSynth.triggerAttackRelease(chord, '1:2:0')
    }, [])

    // Main p5.js + animation loop effect
    useEffect(() => {
        if (!active) return

        let p5Instance = null
        const s = stateRef.current

        const init = async () => {
            const p5Module = await import('p5')
            const p5 = p5Module.default

            const beat = 60000 / BPM
            s.fadeMax = (beat * FADE_DURATION) / FPS / 2

            const sketch = (sk) => {
                sk.setup = () => {
                    const canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight)
                    canvas.parent(containerRef.current)
                    sk.frameRate(FPS)
                    sk.colorMode(sk.HSB)
                    sk.background(255)
                }

                sk.draw = () => {
                    sk.background(255)

                    // Draw gradient background
                    if (s.gradients.length > 0) {
                        const { c1, c2 } = s.gradients[s.gidx]
                        let c1curr = sk.color(...c1)
                        let c2curr = sk.color(...c2)

                        // Cross-fade between old and new gradient
                        if (s.fiGradient < s.fadeMax) {
                            const gidx2 = (s.gidx + 1) % 2
                            const gOld = s.gradients[gidx2] || { c1: [255], c2: [255] }
                            const c1old = sk.color(...gOld.c1)
                            const c2old = sk.color(...gOld.c2)
                            const interp = sigmoid(s.fiGradient / s.fadeMax, 10)
                            c1curr = sk.lerpColor(c1old, c1curr, interp)
                            c2curr = sk.lerpColor(c2old, c2curr, interp)
                        }
                        drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr)
                    }

                    // Draw particles
                    s.particles.forEach((particle) => {
                        let opacity = 1
                        if (s.fiParticles < s.fadeMax) {
                            opacity = s.fiParticles / s.fadeMax
                        } else if (s.foParticles < s.fadeMax) {
                            opacity = 1 - s.foParticles / s.fadeMax
                        } else if (s.foParticles < s.fiParticles) {
                            opacity = 0
                        }

                        // Particle hovered — play note
                        if (particle.isSelected(sk) && opacity > 0) {
                            opacity *= 3
                            if (s.playParticleThrottled) {
                                s.playParticleThrottled(particle)
                            }
                        }

                        particle.render(sk, opacity)
                        particle.move()
                    })

                    s.fiGradient++
                    s.fiParticles++
                    s.foParticles++
                }

                sk.windowResized = () => {
                    sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
                }
            }

            p5Instance = new p5(sketch)
            p5Ref.current = p5Instance

            // Start audio
            await setupSound()

            // Start animation sequence (8-beat cycles)
            const interval = beat * 8

            s.timeouts.fadeGradient = setTimeout(
                function fadeGradientCb() {
                    fadeGradient()
                    playChord()
                    s.timeouts.fadeGradient = setTimeout(fadeGradientCb, interval)
                },
                beat * 0
            )

            s.timeouts.fadeInParticles = setTimeout(
                function fadeInParticlesCb() {
                    fadeInParticles()
                    s.timeouts.fadeInParticles = setTimeout(fadeInParticlesCb, interval)
                },
                beat * 1
            )

            s.timeouts.fadeOutParticles = setTimeout(
                function fadeOutParticlesCb() {
                    fadeOutParticles()
                    s.timeouts.fadeOutParticles = setTimeout(fadeOutParticlesCb, interval)
                },
                beat * 7
            )
        }

        init()

        // Cleanup
        return () => {
            clearTimeout(s.timeouts.fadeGradient)
            clearTimeout(s.timeouts.fadeInParticles)
            clearTimeout(s.timeouts.fadeOutParticles)
            s.timeouts = {}
            s.particles = []
            s.gradients = []

            if (s.chordSynth) {
                s.chordSynth.releaseAll()
            }
            if (s.leadSynth) {
                s.leadSynth.releaseAll()
            }

            if (p5Ref.current) {
                p5Ref.current.remove()
                p5Ref.current = null
            }
        }
    }, [active, setupSound, fadeGradient, fadeInParticles, fadeOutParticles, playChord])

    if (!active) return null

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'auto',
            }}
        />
    )
}
