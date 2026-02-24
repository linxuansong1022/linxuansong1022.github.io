import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const sections = ['about', 'experience', 'projects', 'contact']

export default function Navbar({ theme, toggleTheme }) {
    const [activeSection, setActiveSection] = useState('about')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 100
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i])
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(sections[i])
                    break
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const brandText = activeSection
        ? `L.S.: ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`
        : 'L.S.'

    return (
        <nav className="navbar">
            <div className="navbar-brand">{brandText}</div>
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
            <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                {sections.map(s => (
                    <li key={s}>
                        <a
                            href={`#${s}`}
                            className={activeSection === s ? 'active' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            {s}
                        </a>
                    </li>
                ))}
                <li>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
