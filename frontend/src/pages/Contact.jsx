import './Contact.css';

export default function Contact() {
  return (
    <div>
      <div className="page-header">
        <h1>Get in <em>Touch</em></h1>
        <p>I'm available for opportunities and collaborations</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="card contact-card">
            <div className="contact-icon">✉</div>
            <div>
              <p className="contact-label">Email</p>
              <a href="mailto:rahmatullahwahdat7@gmail.com" className="contact-value">
                rahmatullahwahdat7@gmail.com
              </a>
            </div>
          </div>
          <div className="card contact-card">
            <div className="contact-icon">☏</div>
            <div>
              <p className="contact-label">Phone</p>
              <a href="tel:+4915214565039" className="contact-value">0152 1456 5039</a>
            </div>
          </div>
          <div className="card contact-card">
            <div className="contact-icon">⌂</div>
            <div>
              <p className="contact-label">Location</p>
              <p className="contact-value">Hans-Fleischer-Str. 29, 26133 Oldenburg, DE</p>
            </div>
          </div>
          <div className="card contact-card">
            <div className="contact-icon">◈</div>
            <div>
              <p className="contact-label">GitHub</p>
              <a href="https://github.com/rahmat530" target="_blank" rel="noreferrer" className="contact-value">
                github.com/rahmat530
              </a>
            </div>
          </div>
        </div>

        <div className="contact-note card">
          <h2 className="contact-note-title">Open to Opportunities</h2>
          <p>
            I'm currently completing my Umschulung (retraining) as a Fachinformatiker
            Anwendungsentwicklung and actively looking for internship or entry-level
            developer positions.
          </p>
          <p>
            Whether you have a project in mind, a job opportunity, or just want to connect —
            feel free to reach out via email or phone. I'm based in Oldenburg, Germany
            and available for both remote and on-site roles.
          </p>
          <div className="contact-availability">
            <span className="status-dot" />
            <span>Available from Q2 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
