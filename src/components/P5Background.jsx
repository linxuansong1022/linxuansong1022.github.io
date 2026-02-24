import { useEffect, useRef } from 'react'

export default function P5Background({ theme }) {
    const containerRef = useRef(null)
    const p5InstanceRef = useRef(null)

    useEffect(() => {
        let p5Instance = null

        const loadP5 = async () => {
            const p5Module = await import('p5')
            const p5 = p5Module.default

            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove()
            }

            const sketch = (p) => {
                let particles = []
                const numParticles = 60

                p.setup = () => {
                    const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
                    canvas.parent(containerRef.current)
                    p.noStroke()

                    for (let i = 0; i < numParticles; i++) {
                        particles.push({
                            x: p.random(p.width),
                            y: p.random(p.height),
                            size: p.random(1, 4),
                            speedX: p.random(-0.3, 0.3),
                            speedY: p.random(-0.3, 0.3),
                            opacity: p.random(30, 100),
                        })
                    }
                }

                p.draw = () => {
                    p.clear()
                    const isDark = theme === 'dark'

                    for (let i = 0; i < particles.length; i++) {
                        const pt = particles[i]
                        pt.x += pt.speedX
                        pt.y += pt.speedY

                        if (pt.x < 0) pt.x = p.width
                        if (pt.x > p.width) pt.x = 0
                        if (pt.y < 0) pt.y = p.height
                        if (pt.y > p.height) pt.y = 0

                        if (isDark) {
                            p.fill(180, 200, 255, pt.opacity)
                        } else {
                            p.fill(30, 40, 80, pt.opacity)
                        }
                        p.ellipse(pt.x, pt.y, pt.size)

                        // Draw connections
                        for (let j = i + 1; j < particles.length; j++) {
                            const other = particles[j]
                            const d = p.dist(pt.x, pt.y, other.x, other.y)
                            if (d < 120) {
                                const alpha = p.map(d, 0, 120, 40, 0)
                                if (isDark) {
                                    p.stroke(180, 200, 255, alpha)
                                } else {
                                    p.stroke(30, 40, 80, alpha)
                                }
                                p.strokeWeight(0.5)
                                p.line(pt.x, pt.y, other.x, other.y)
                                p.noStroke()
                            }
                        }
                    }
                }

                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight)
                }
            }

            p5Instance = new p5(sketch)
            p5InstanceRef.current = p5Instance
        }

        loadP5()

        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove()
                p5InstanceRef.current = null
            }
        }
    }, [theme])

    return <div ref={containerRef} className="p5-canvas-container" />
}
