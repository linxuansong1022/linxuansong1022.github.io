import { useState } from 'react'
import { experiences } from '../data'

export default function Experience() {
    const [activeIdx, setActiveIdx] = useState(null)

    return (
        <section id="experience" className="section">
            <h2 className="section-title">Experience</h2>
            <div className="experience-container">
                <p className="timeline-hint">
                    Hover or click on a date range to know more.
                </p>
                <div className="timeline">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            className={`timeline-item ${activeIdx === i ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIdx(i)}
                            onMouseLeave={() => setActiveIdx(null)}
                            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                        >
                            <div className="timeline-date">{exp.date}</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content" style={{
                                opacity: activeIdx === null || activeIdx === i ? 1 : 0.3,
                                transition: 'opacity 0.3s ease'
                            }}>
                                <h3>{exp.title}</h3>
                                <h4>{exp.org}</h4>
                                {(activeIdx === i) && <p>{exp.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
