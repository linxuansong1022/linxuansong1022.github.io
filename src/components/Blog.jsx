import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const posts = [
    {
        title: 'React + TypeScript Reading Notes',
        date: '2026-06-30',
        description: 'A beginner-friendly guide for reading React + TypeScript code: state, props, effects, forms, lists, context, hooks, and JSX syntax.',
        href: '/blog/react-typescript-notes.html',
        tags: ['React', 'TypeScript', 'Frontend Notes']
    }
]

export default function Blog() {
    return (
        <section id="blog" className="section blog-section">
            <h2 className="section-title">Blog</h2>
            <div className="blog-intro">
                Notes from what I am learning, written for future me and anyone else trying to read code more clearly.
            </div>
            <div className="blog-grid">
                {posts.map(post => (
                    <article key={post.href} className="blog-card">
                        <div>
                            <div className="blog-card-icon">
                                <FontAwesomeIcon icon={faBookOpen} />
                            </div>
                            <h3>{post.title}</h3>
                            <div className="blog-date">{post.date}</div>
                            <p>{post.description}</p>
                        </div>
                        <div>
                            <div className="project-card-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="project-card-tag">{tag}</span>
                                ))}
                            </div>
                            <a className="blog-link" href={post.href} target="_blank" rel="noopener noreferrer">
                                Read note <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
