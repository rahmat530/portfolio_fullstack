import { useCrud } from '../hooks/useCrud';
import './Education.css';

export default function Education() {
  const { items: education, loading: eduLoading } = useCrud('education');
  const { items: certs, loading: certsLoading } = useCrud('certifications');

  const loading = eduLoading || certsLoading;

  return (
    <div>
      <div className="page-header">
        <h1>Education & <em>Certifications</em></h1>
        <p>My academic background and professional qualifications</p>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Loading…</div>
      ) : (
        <>
          {/* Education */}
          <section className="edu-section">
            <h2 className="section-heading">
              <span className="section-icon">◎</span>
              Academic Education
            </h2>
            <div className="timeline">
              {education.map((e, i) => (
                <div key={e.id} className={`timeline-item ${e.is_current ? 'current' : ''}`}>
                  <div className="timeline-marker">
                    <span className="t-dot" />
                    {i < education.length - 1 && <span className="t-line" />}
                  </div>
                  <div className="timeline-body">
                    <div className="t-header">
                      <div>
                        <h3 className="t-degree">{e.degree}</h3>
                        <p className="t-institution">{e.institution}</p>
                        {e.location && <p className="t-location">📍 {e.location}</p>}
                      </div>
                      <div className="t-dates">
                        <span>{e.start_date}</span>
                        <span className="t-sep">→</span>
                        <span className={e.is_current ? 't-current' : ''}>{e.end_date}</span>
                      </div>
                    </div>
                    {e.field && <p className="t-field">Field: {e.field}</p>}
                    {e.description && <p className="t-desc">{e.description}</p>}
                    {e.is_current && <span className="tag tag-green">Currently Enrolled</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* Certifications */}
          <section className="edu-section">
            <h2 className="section-heading">
              <span className="section-icon">◈</span>
              Certifications
            </h2>

            {certs.length === 0 ? (
              <div className="empty-state">
                <p>No certifications yet</p>
              </div>
            ) : (
              <div className="certs-grid">
                {certs.map(cert => (
                  <div key={cert.id} className="cert-card">
                    <div className="cert-icon">🏅</div>
                    <div className="cert-body">
                      <h3 className="cert-name">{cert.name}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <span className="cert-date">{cert.date_obtained}</span>
                      {cert.description && <p className="cert-desc">{cert.description}</p>}
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="cert-link">
                          View credential →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
