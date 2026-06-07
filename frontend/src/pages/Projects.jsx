import { useCrud } from '../hooks/useCrud';
import './Projects.css';

const STATUS_LABELS = { live: 'Live', wip: 'In Progress', archived: 'Archived' };
const STATUS_CLASSES = { live: 'tag-green', wip: 'tag', archived: 'tag-blue' };

export default function Projects() {
  const { items: projects, loading } = useCrud('projects');

  return (
    <div>
      <div className="page-header">
        <h1>My <em>Projects</em></h1>
        <p>Things I've built and am currently working on</p>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <h3>No projects yet</h3>
          <p>Check back soon — projects coming soon.</p>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map(project => (
            <article key={project.id} className="project-card">
              {project.image_url && (
                <div className="project-screenshot">
                  <img src={project.image_url} alt={`${project.title} screenshot`} loading="lazy" />
                </div>
              )}

              <div className="project-top">
                <div className="project-meta">
                  <span className={STATUS_CLASSES[project.status] || 'tag'}>
                    {STATUS_LABELS[project.status] || project.status}
                  </span>
                  {project.featured && <span className="tag-blue">Featured</span>}
                </div>
                <div className="project-links">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="icon-link" title="GitHub">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="icon-link" title="Live">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.description}</p>

              <div className="project-stack">
                {(project.tech_list || project.tech_stack?.split(',') || []).map(t => (
                  <span key={t} className="tag">{t.trim()}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
