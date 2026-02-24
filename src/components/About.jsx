import { personalInfo } from '../data'

export default function About({ animationActive, onToggleAnimation }) {
    const callToAction = animationActive
        ? 'Start all over again'
        : 'Sounds and colors'

    return (
        <section id="about" className="section">
            <div className="about-content">
                <div className="about-photo-wrapper">
                    <img
                        src="/avatar.jpg"
                        alt={personalInfo.name}
                        className="about-photo"
                    />
                </div>
                <div className="about-text">
                    <h1>{personalInfo.name}</h1>
                    {personalInfo.bio.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                    <button
                        className="sounds-btn"
                        onClick={onToggleAnimation}
                    >
                        {callToAction}
                    </button>
                </div>
            </div>
        </section>
    )
}
