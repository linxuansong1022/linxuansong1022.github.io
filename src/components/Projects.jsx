import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faCode, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { projects, allTags } from '../data'

export default function Projects() {
    const [activeTags, setActiveTags] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)

    const toggleTag = (tag) => {
        if (tag === 'all') {
            setActiveTags([...allTags])
            return
        }
        if (tag === 'none') {
            setActiveTags([])
            return
        }
        setActiveTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const filteredProjects = activeTags.length === 0
        ? projects
        : projects.filter(p => p.tags.some(t => activeTags.includes(t)))

    const closeModal = () => setSelectedProject(null)

    return (
        <section id="projects" className="section">
            <h2 className="section-title">Projects</h2>
            <div className="project-tags">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`project-tag ${activeTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
                <button className="project-tag" onClick={() => toggleTag('all')}>all</button>
                <button className="project-tag" onClick={() => toggleTag('none')}>none</button>
            </div>
            <div className="projects-grid">
                <div className="project-info-card">
                    <p>
                        Select one or more <span className="tag-highlight">tags</span> to
                        see related projects.
                    </p>
                </div>
                {filteredProjects.map((project, i) => (
                    <div
                        key={i}
                        className="project-card"
                        onClick={() => setSelectedProject(project)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div>
                            <h3>{project.title}</h3>
                            <div className="project-date">{project.date}</div>
                            <div className="project-desc">{project.desc}</div>
                        </div>
                        <div className="project-card-tags">
                            {project.tags.map(t => (
                                <span key={t} className="project-card-tag">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h3 className="modal-title">{selectedProject.title}</h3>
                        <div className="modal-date">{selectedProject.date}</div>
                        <p className="modal-desc">{selectedProject.desc}</p>
                        <div className="modal-tags">
                            {selectedProject.tags.map(t => (
                                <span key={t} className="project-card-tag">{t}</span>
                            ))}
                        </div>
                        <div className="modal-links">
                            {selectedProject.links?.github && (
                                <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} /> GitHub
                                </a>
                            )}
                            {selectedProject.links?.demo && (
                                <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLink} /> Demo
                                </a>
                            )}
                            {selectedProject.links?.docs && (
                                <a href={selectedProject.links.docs} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faCode} /> Docs
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
