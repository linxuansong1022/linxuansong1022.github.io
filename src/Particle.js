/**
 * Particle class — renders a circle with concentric ring halos.
 * Ported from miccio-dk/miccio-dk.github.io/src/particle.js
 */
export default class Particle {
    constructor({ x, y, radius, color, velocity, dampening }) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color           // [h, s, b, alpha] in HSB mode
        this.velocity = velocity     // [vx, vy]
        this.dampening = dampening
        this.ringDist = 15
    }

    move() {
        this.x += this.velocity[0]
        this.y += this.velocity[1]
        // Apply dampening (slow down over time)
        this.velocity[0] *= 1 - this.dampening
        this.velocity[1] *= 1 - this.dampening
    }

    isSelected(sk) {
        const a = this.x * sk.width - sk.mouseX
        const b = this.y * sk.height - sk.mouseY
        const dist = Math.sqrt(a * a + b * b)
        return dist < this.radius + this.ringDist
    }

    render(sk, opacity) {
        let { x, y, radius, color } = this
        let cc = sk.color(...color)
        cc.setAlpha(sk.alpha(cc) * opacity)

        // Draw filled circle
        sk.fill(cc)
        sk.noStroke()
        sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2)

        // Draw concentric ring halos
        sk.noFill()
        let weight = 2
        let alpha = sk.alpha(cc) * 1.5
        for (let j = 0; j < 5; j++) {
            radius += this.ringDist
            weight *= 0.8
            alpha *= 0.6
            cc.setAlpha(alpha)
            sk.stroke(cc)
            sk.strokeWeight(weight)
            sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2)
        }
    }
}
