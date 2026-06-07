import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Home.css';

export default function Home() {
  const [resume, setResume] = useState(null);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get('/api/resume/').then(r => {
      const active = r.data.find(x => x.is_active);
      setResume(active);
    }).catch(() => {});

    api.get('/api/education/').then(r => {
      setEducation(r.data);
    }).catch(() => {});
  }, []);

  const formatEducationDate = e => {
    if (e.is_current) return `Since ${e.start_date}`;
    return [e.start_date, e.end_date].filter(Boolean).join(' - ');
  };

  return (
    <div className="home-page">
      <div className="hero-eyebrow">
        <span className="tag">Available for Work</span>
        <span className="hero-location">📍 Oldenburg, DE</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-greeting">Hello, I'm</span>
        <em>Rahmatullah</em>
        <span className="hero-last">Wahdat</span>
      </h1>

      <p className="hero-subtitle">
        Career changer <strong>(Umschuler)</strong> in Software Development
        backed by a robust analytical foundation from an engineering background.
        A hands-on developer proficient in Python, JavaScript, and modern web
        frameworks like Django and React. Goal-oriented, highly adaptable, and
        driven by a strong capacity for independent learning.
      </p>

      <div className="hero-cta">
        <Link to="/projects" className="btn btn-primary">
          View Projects →
        </Link>
        {resume?.file_url ? (
          <a
            href={resume.file_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Download CV
          </a>
        ) : (
          <Link to="/contact" className="btn btn-ghost">
            Contact Me
          </Link>
        )}
      </div>

      <div className="hero-stack">
        <span className="stack-label">Stack</span>
        {[
          "Python",
          "Django",
          "React",
          "JavaScript",
          "TypeScript",
          "MySQL",
          "Git & GitHub",
        ].map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="hero-cards">
        <div className="stat-card">
          <span className="stat-num">1+</span>
          <span className="stat-label">
            Years
            <br />
            Self-Study
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-num">3</span>
          <span className="stat-label">
            Languages
            <br />
            Spoken
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-num">Full Stack</span>
          <span className="stat-label">
            Software
            <br />
            Developer
          </span>
        </div>
      </div>

      {education.length > 0 && (
        <div className="hero-timeline">
          {education.map((e, index) => (
            <div key={e.id} className="tl-item">
              <span
                className={`tl-dot ${e.is_current || index === 0 ? "active" : ""}`}
              />
              <div>
                <span className="tl-date">{formatEducationDate(e)}</span>
                <p className="tl-title">{e.degree}</p>
                <p className="tl-place">
                  {[e.institution, e.location].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
