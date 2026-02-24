import { useState, useEffect, lazy, Suspense } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import Navbar from './components/Navbar'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import P5Background from './components/P5Background'
const SoundsAndColors = lazy(() => import('./components/SoundsAndColors'))

library.add(fas, fab)

export default function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('portfolio-theme') || 'light'
    })
    const [animationActive, setAnimationActive] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('portfolio-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const toggleAnimation = () => {
        setAnimationActive(prev => !prev)
    }

    // Fade-in animation for sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 }
        )

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <>
            {animationActive ? (
                <Suspense fallback={null}>
                    <SoundsAndColors active={animationActive} />
                </Suspense>
            ) : (
                <P5Background theme={theme} />
            )}
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
                <About
                    animationActive={animationActive}
                    onToggleAnimation={toggleAnimation}
                />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <footer className="footer">
                Linxuan Song © {new Date().getFullYear()} | Made with React and Vite, animated with p5.js and Tone.js
            </footer>
        </>
    )
}
