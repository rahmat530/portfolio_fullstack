import './About.css';

export default function About() {
  return (
    <div>
      <div className="page-header">
        <h1>
          About <em>Me</em>
        </h1>
        <p>My background, journey, and what drives me</p>
      </div>

      <div className="about-grid">
        <section className="about-bio card">
          <h2 className="about-section-title">Who I Am</h2>
          <p>
            I'm Rahmatullah Wahdat — a motivated career-changer
            (IT-Quereinsteiger) currently completing a{" "}
            <strong>
              Umschulung zum Fachinformatiker Anwendungsentwicklung
            </strong>{" "}
            at IBB Institut für Berufliche Bildung AG in Oldenburg, Germany.
          </p>
          <p>
            My background includes practical experience in data management and
            public administration at the Afghanistan National Statistics and
            Information Authority in Kabul, combined with one year of intensive
            self-study in web development and programming.
          </p>
          <p>
            I'm passionate about building clean, functional full-stack
            applications and continuously expanding my technical skill set —
            currently focused on Python, Django, and React.
          </p>
        </section>

        <section className="about-info">
          <div className="info-card card">
            <h3 className="info-title">Personal Details</h3>
            <div className="info-row">
              <span className="info-label">Location</span>
              <span>Oldenburg, Germany</span>
            </div>
            <div className="info-row">
              <span className="info-label">Born</span>
              <span>28.11.1996, Ghazni, Afghanistan</span>
            </div>
            <div className="info-row">
              <span className="info-label">Languages</span>
              <span>Persian (native), German (B2), English (B2)</span>
            </div>
            <div className="info-row">
              <span className="info-label">GitHub</span>
              <a
                href="https://github.com/rahmat530"
                target="_blank"
                rel="noreferrer"
                className="info-link"
              >
                github.com/rahmat530
              </a>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <a
                href="mailto:rahmatullahwahdat7@gmail.com"
                className="info-link"
              >
                rahmatullahwahdat7@gmail.com
              </a>
            </div>
          </div>

          <div className="values-card card">
            <h3 className="info-title">What I Value</h3>
            {[
              {
                icon: "⟨⟩",
                label: "Clean Code",
                text: "Readable, maintainable, well-structured",
              },
              {
                icon: "⟳",
                label: "Continuous Learning",
                text: "Always expanding my skill set",
              },
              {
                icon: "◈",
                label: "Problem Solving",
                text: "Breaking complex problems into steps",
              },
            ].map((v) => (
              <div key={v.label} className="value-item">
                <span className="value-icon">{v.icon}</span>
                <div>
                  <p className="value-label">{v.label}</p>
                  <p className="value-text">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
