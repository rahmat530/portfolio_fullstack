import { useCrud } from '../hooks/useCrud';
import './Skills.css';

const CATEGORY_LABELS = {
  language: 'Programming Languages',
  framework: 'Frameworks & Libraries',
  database: 'Databases',
  devops: 'Tools & DevOps',
  network: 'Network',
  pr_management: 'Project Management',
  language_spoken: 'Spoken Languages',
  other: 'Other',
};

const CATEGORY_ORDER = [
  'language',
  'framework',
  'database',
  'devops',
  'network',
  'pr_management',
  'language_spoken',
  'other',
];

const formatCategoryLabel = category =>
  CATEGORY_LABELS[category] ||
  category
    .split('_')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function Skills() {
  const { items: skills, loading } = useCrud('skills');

  const categories = [
    ...CATEGORY_ORDER,
    ...skills
      .map(skill => skill.category)
      .filter(category => category && !CATEGORY_ORDER.includes(category)),
  ];

  const grouped = categories.reduce((acc, cat) => {
    if (acc[cat]) return acc;
    const group = skills.filter(s => s.category === cat);
    if (group.length) acc[cat] = group;
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header">
        <h1>Skills & <em>Expertise</em></h1>
        <p>Technologies I work with, organized by category</p>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Loading skills…</div>
      ) : (
        <div className="skills-sections">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} className="skill-group">
              <h2 className="skill-group-title">{formatCategoryLabel(cat)}</h2>
              <div className="skill-grid">
                {items.map(skill => (
                  <div key={skill.id} className="skill-card">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
