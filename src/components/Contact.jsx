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
    return (
        <section id="contact" className="section contact-section">
            <h2 className="section-title">Contact me</h2>
            <div className="contact-content-centered">
                <p className="contact-text">
                    Feel free to reach out — whether it's about a project, a job opportunity,
                    or just to say hello.
                </p>
                <div className="social-icons">
                    {socialLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.name}
                            className="social-link"
                        >
                            <FontAwesomeIcon icon={iconMap[link.icon]} />
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
