import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCrud } from '../hooks/useCrud';
import api from '../utils/api';
import './Admin.css';

const TABS = ['skills', 'projects', 'education', 'certifications', 'resume'];
const TAB_LABELS = {
  skills: 'Skills', projects: 'Projects',
  education: 'Education', certifications: 'Certifications', resume: 'Resume'
};

// ─── Reusable Form Modal ───────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ─── Skill Form ───────────────────────────────────────────────────────────────
function SkillForm({ initial = {}, onSave, onCancel }) {
  const [d, setD] = useState({ name: '', category: 'language', proficiency: 80, order: 0, ...initial });
  const set = k => e => setD(p => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(d); }} className="admin-form">
      <div className="grid-2">
        <div className="form-group"><label>Name</label><input value={d.name} onChange={set('name')} required /></div>
        <div className="form-group">
          <label>Category</label>
          <select value={d.category} onChange={set('category')}>
            <option value="language">Programming Language</option>
            <option value="framework">Framework / Library</option>
            <option value="database">Database</option>
            <option value="devops">Tools & DevOps</option>
            <option value="network">Network</option>
            <option value="pr_management">Project Management</option>
            <option value="language_spoken">Spoken Language</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Proficiency ({d.proficiency}%)</label>
          <input type="range" min="0" max="100" value={d.proficiency} onChange={set('proficiency')} />
        </div>
        <div className="form-group"><label>Order</label><input type="number" value={d.order} onChange={set('order')} /></div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}

// ─── Project Form ─────────────────────────────────────────────────────────────
function ProjectForm({ initial = {}, onSave, onCancel }) {
  const [d, setD] = useState({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', status: 'wip', featured: false, order: 0, ...initial });
  const [imageFile, setImageFile] = useState(null);
  const set = k => e => setD(p => ({ ...p, [k]: e.target.value }));
  const setCheck = k => e => setD(p => ({ ...p, [k]: e.target.checked }));
  const handleSubmit = e => {
    e.preventDefault();

    if (!imageFile) {
      onSave(d);
      return;
    }

    const fd = new FormData();
    Object.entries(d).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'image_url' && value !== null && value !== undefined) {
        fd.append(key, value);
      }
    });
    fd.append('image', imageFile);
    onSave(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group"><label>Title</label><input value={d.title} onChange={set('title')} required /></div>
      <div className="form-group"><label>Description</label><textarea value={d.description} onChange={set('description')} /></div>
      <div className="form-group"><label>Tech Stack (comma-separated)</label><input value={d.tech_stack} onChange={set('tech_stack')} /></div>
      <div className="form-group">
        <label>Project Screenshot</label>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0] || null)} />
        {initial.image_url && !imageFile && (
          <a href={initial.image_url} target="_blank" rel="noreferrer" className="form-hint">Current screenshot</a>
        )}
      </div>
      <div className="grid-2">
        <div className="form-group"><label>GitHub URL</label><input value={d.github_url} onChange={set('github_url')} /></div>
        <div className="form-group"><label>Live URL</label><input value={d.live_url} onChange={set('live_url')} /></div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Status</label>
          <select value={d.status} onChange={set('status')}>
            <option value="live">Live</option>
            <option value="wip">Work in Progress</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="form-group"><label>Order</label><input type="number" value={d.order} onChange={set('order')} /></div>
      </div>
      <div className="form-group checkbox-group">
        <label><input type="checkbox" checked={d.featured} onChange={setCheck('featured')} /> Featured project</label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}

// ─── Education Form ───────────────────────────────────────────────────────────
function EducationForm({ initial = {}, onSave, onCancel }) {
  const [d, setD] = useState({ institution: '', degree: '', field: '', location: '', start_date: '', end_date: '', description: '', is_current: false, order: 0, ...initial });
  const set = k => e => setD(p => ({ ...p, [k]: e.target.value }));
  const setCheck = k => e => setD(p => ({ ...p, [k]: e.target.checked }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(d); }} className="admin-form">
      <div className="grid-2">
        <div className="form-group"><label>Institution</label><input value={d.institution} onChange={set('institution')} required /></div>
        <div className="form-group"><label>Degree / Title</label><input value={d.degree} onChange={set('degree')} required /></div>
      </div>
      <div className="grid-2">
        <div className="form-group"><label>Field / Specialization</label><input value={d.field} onChange={set('field')} /></div>
        <div className="form-group"><label>Location</label><input value={d.location} onChange={set('location')} /></div>
      </div>
      <div className="grid-2">
        <div className="form-group"><label>Start Date</label><input value={d.start_date} onChange={set('start_date')} placeholder="MM.YYYY" /></div>
        <div className="form-group"><label>End Date</label><input value={d.end_date} onChange={set('end_date')} placeholder="MM.YYYY or Present" /></div>
      </div>
      <div className="form-group"><label>Description</label><textarea value={d.description} onChange={set('description')} /></div>
      <div className="form-group checkbox-group">
        <label><input type="checkbox" checked={d.is_current} onChange={setCheck('is_current')} /> Currently enrolled</label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}

// ─── Certification Form ───────────────────────────────────────────────────────
function CertificationForm({ initial = {}, onSave, onCancel }) {
  const [d, setD] = useState({ name: '', issuer: '', date_obtained: '', expiry_date: '', credential_id: '', credential_url: '', description: '', order: 0, ...initial });
  const set = k => e => setD(p => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(d); }} className="admin-form">
      <div className="grid-2">
        <div className="form-group"><label>Certification Name</label><input value={d.name} onChange={set('name')} required /></div>
        <div className="form-group"><label>Issuer</label><input value={d.issuer} onChange={set('issuer')} required /></div>
      </div>
      <div className="grid-2">
        <div className="form-group"><label>Date Obtained</label><input value={d.date_obtained} onChange={set('date_obtained')} placeholder="MM.YYYY" /></div>
        <div className="form-group"><label>Expiry Date (optional)</label><input value={d.expiry_date} onChange={set('expiry_date')} /></div>
      </div>
      <div className="grid-2">
        <div className="form-group"><label>Credential ID</label><input value={d.credential_id} onChange={set('credential_id')} /></div>
        <div className="form-group"><label>Credential URL</label><input value={d.credential_url} onChange={set('credential_url')} /></div>
      </div>
      <div className="form-group"><label>Description</label><textarea value={d.description} onChange={set('description')} /></div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}

// ─── Resume Upload ────────────────────────────────────────────────────────────
function ResumeManager({ items, reload }) {
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState('');
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMsg('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('version', version || 'latest');
    fd.append('is_active', 'true');
    try {
      await api.post('/api/resume/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Resume uploaded and set as active.');
      setFile(null);
      setVersion('');
      reload();
    } catch {
      setMsg('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const activate = async (id) => {
    await api.patch(`/api/resume/${id}/`, { is_active: true });
    reload();
  };

  const deleteResume = async (id) => {
    if (!confirm('Delete this resume?')) return;
    await api.delete(`/api/resume/${id}/`);
    reload();
  };

  return (
    <div className="resume-manager">
      <form className="resume-upload-form card" onSubmit={handleUpload}>
        <h3 className="admin-sub-title">Upload New Resume</h3>
        {msg && <div className={`alert ${msg.includes('failed') ? 'alert-error' : 'alert-success'}`}>{msg}</div>}
        <div className="grid-2">
          <div className="form-group">
            <label>Version Label</label>
            <input value={version} onChange={e => setVersion(e.target.value)} placeholder="e.g. 2026-April" />
          </div>
          <div className="form-group">
            <label>PDF File</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={uploading}>
          {uploading ? 'Uploading…' : 'Upload Resume'}
        </button>
      </form>

      <div className="resume-list">
        <h3 className="admin-sub-title">Uploaded Resumes</h3>
        {items.map(r => (
          <div key={r.id} className={`resume-row card ${r.is_active ? 'active' : ''}`}>
            <div>
              <p className="resume-version">v{r.version}</p>
              <p className="resume-date">{new Date(r.uploaded_at).toLocaleDateString()}</p>
              {r.is_active && <span className="tag tag-green">Active</span>}
            </div>
            <div className="resume-actions">
              {r.file_url && (
                <a href={r.file_url} target="_blank" rel="noreferrer" className="btn btn-ghost">View</a>
              )}
              {!r.is_active && (
                <button className="btn btn-primary" onClick={() => activate(r.id)}>Set Active</button>
              )}
              <button className="btn btn-danger" onClick={() => deleteResume(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Generic CRUD Tab ─────────────────────────────────────────────────────────
function CrudTab({ endpoint, Form, renderItem }) {
  const { items, loading, create, update, remove, reload } = useCrud(endpoint);
  const [modal, setModal] = useState(null); // null | { mode: 'create' } | { mode: 'edit', item }

  const handleSave = async (data) => {
    try {
      if (modal.mode === 'create') await create(data);
      else await update(modal.item.id, data);
      setModal(null);
    } catch (e) {
      alert('Save failed: ' + JSON.stringify(e.response?.data || e.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    await remove(id);
  };

  if (endpoint === 'resume') {
    return <ResumeManager items={items} reload={reload} />;
  }

  return (
    <div className="crud-tab">
      <div className="crud-toolbar">
        <button className="btn btn-primary" onClick={() => setModal({ mode: 'create' })}>
          + Add New
        </button>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Loading…</div>
      ) : items.length === 0 ? (
        <div className="empty-state"><h3>No items yet</h3><p>Click "+ Add New" to get started.</p></div>
      ) : (
        <div className="crud-list">
          {items.map(item => (
            <div key={item.id} className="crud-item card">
              <div className="crud-item-content">{renderItem(item)}</div>
              <div className="crud-item-actions">
                <button className="btn btn-ghost" onClick={() => setModal({ mode: 'edit', item })}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal.mode === 'create' ? 'Add New' : 'Edit'}
          onClose={() => setModal(null)}
        >
          <Form
            initial={modal.item || {}}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}

// ─── Admin Main ───────────────────────────────────────────────────────────────
export default function Admin() {
  const { isAdmin } = useAuth();
  const [tab, setTab] = useState('skills');

  if (!isAdmin) {
    return (
      <div className="page-header">
        <h1>Access Denied</h1>
        <p>You must be logged in to access the admin panel.</p>
      </div>
    );
  }

  const FORMS = { skills: SkillForm, projects: ProjectForm, education: EducationForm, certifications: CertificationForm };
  const RENDERS = {
    skills: s => <><strong>{s.name}</strong> <span className="tag">{s.category}</span> — {s.proficiency}%</>,
    projects: p => <><strong>{p.title}</strong> <span className="tag">{p.status}</span></>,
    education: e => <><strong>{e.degree}</strong> @ {e.institution} ({e.start_date}–{e.end_date})</>,
    certifications: c => <><strong>{c.name}</strong> — {c.issuer} ({c.date_obtained})</>,
  };

  return (
    <div>
      <div className="page-header">
        <h1>Admin <em>Panel</em></h1>
        <p>Manage your portfolio content</p>
      </div>

      <div className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="admin-tab-content">
        <CrudTab
          key={tab}
          endpoint={tab}
          Form={FORMS[tab]}
          renderItem={RENDERS[tab] || (() => null)}
        />
      </div>
    </div>
  );
}
