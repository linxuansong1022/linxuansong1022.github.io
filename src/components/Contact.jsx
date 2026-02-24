import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { socialLinks } from '../data'

const iconMap = {
    github: faGithub,
    linkedin: faLinkedin,
    envelope: faEnvelope,
}

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for your message! (This is a demo)')
    }

    return (
        <section id="contact" className="section contact-section">
            <h2 className="section-title">Contact me</h2>
            <div className="contact-content">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your email" required />
                    <input type="text" placeholder="Subject" required />
                    <textarea placeholder="Type your message..." required></textarea>
                    <button type="submit">Send</button>
                </form>
                <div className="find-online">
                    <h2>Find me online</h2>
                    <div className="social-icons">
                        {socialLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.name}
                            >
                                <FontAwesomeIcon icon={iconMap[link.icon]} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
