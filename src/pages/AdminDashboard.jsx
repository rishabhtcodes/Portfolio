import { useEffect, useMemo, useState } from 'react';
import { LogOut, Pencil, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiDelete, apiRequest } from '../lib/api';
import { clearAdminToken, getAdminToken } from '../lib/adminAuth';

const sectionItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'certificates', label: 'Certificates' },
];

const entityConfigs = {
  projects: {
    title: 'Projects',
    path: '/api/projects',
    empty: { title: '', description: '', github: '', demo: '', status: 'Completed', image: '', techStack: '', order: '0' },
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'image', label: 'Image URL' },
      { key: 'github', label: 'GitHub URL' },
      { key: 'demo', label: 'Demo URL' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'techStack', label: 'Tech Stack (comma separated)' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    columns: ['title', 'status', 'techStack'],
    serialize: (form) => ({
      ...form,
      order: Number(form.order || 0),
      techStack: form.techStack.split(',').map((item) => item.trim()).filter(Boolean),
    }),
    hydrate: (item) => ({ ...item, techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : '' }),
  },
  skills: {
    title: 'Skills',
    path: '/api/skills',
    empty: { name: '', category: 'General', logo: '', description: '', order: '0' },
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'logo', label: 'Logo URL' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    columns: ['name', 'category', 'order'],
    serialize: (form) => ({ ...form, order: Number(form.order || 0) }),
    hydrate: (item) => ({ ...item, order: String(item.order ?? 0) }),
  },
  achievements: {
    title: 'Achievements',
    path: '/api/achievements',
    empty: { title: '', subtitle: '', year: '', icon: 'trophy', description: '', order: '0' },
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'year', label: 'Year / Date' },
      { key: 'icon', label: 'Icon key (trophy, award, user-round-check)' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    columns: ['title', 'year', 'icon'],
    serialize: (form) => ({ ...form, order: Number(form.order || 0) }),
    hydrate: (item) => ({ ...item, order: String(item.order ?? 0) }),
  },
  certificates: {
    title: 'Certificates',
    path: '/api/certificates',
    empty: { title: '', issuer: '', date: '', credentialId: '', credentialLink: '', icon: 'award', order: '0' },
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'issuer', label: 'Issuer' },
      { key: 'date', label: 'Date' },
      { key: 'credentialId', label: 'Credential ID' },
      { key: 'credentialLink', label: 'Credential URL' },
      { key: 'icon', label: 'Icon key' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['title', 'issuer', 'date'],
    serialize: (form) => ({ ...form, order: Number(form.order || 0) }),
    hydrate: (item) => ({ ...item, order: String(item.order ?? 0) }),
  },
};

function createProfileForm(profile) {
  return {
    name: profile?.name || '',
    title: profile?.title || '',
    introduction: profile?.introduction || '',
    highlights: Array.isArray(profile?.highlights) ? profile.highlights.join(', ') : '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || '',
    twitter: profile?.twitter || '',
    profilePhoto: profile?.profilePhoto || '',
    aboutPhoto: profile?.about?.photo || '',
    aboutSummary: profile?.about?.summary || '',
    aboutInterests: profile?.about?.interests || '',
    aboutDescription: profile?.about?.description || '',
    aboutTechFocus: Array.isArray(profile?.about?.techFocus) ? profile.about.techFocus.join(', ') : '',
    contactCopy: profile?.contact?.copy || '',
    contactLinkedinLabel: profile?.contact?.linkedinLabel || '',
    contactGithubLabel: profile?.contact?.githubLabel || '',
    resumeTitle: profile?.resume?.title || '',
    resumeLink: profile?.resume?.resumeLink || '',
    resumeHighlights: Array.isArray(profile?.resume?.highlights)
      ? profile.resume.highlights.map((item) => `${item.label}|${item.detail}`).join('\n')
      : '',
  };
}

function buildProfilePayload(form) {
  return {
    name: form.name,
    title: form.title,
    introduction: form.introduction,
    highlights: form.highlights.split(',').map((item) => item.trim()).filter(Boolean),
    email: form.email,
    phone: form.phone,
    github: form.github,
    linkedin: form.linkedin,
    twitter: form.twitter,
    profilePhoto: form.profilePhoto,
    about: {
      photo: form.aboutPhoto,
      summary: form.aboutSummary,
      interests: form.aboutInterests,
      description: form.aboutDescription,
      techFocus: form.aboutTechFocus.split(',').map((item) => item.trim()).filter(Boolean),
    },
    contact: {
      email: form.email,
      phone: form.phone,
      linkedin: form.linkedin,
      linkedinLabel: form.contactLinkedinLabel,
      github: form.github,
      githubLabel: form.contactGithubLabel,
      copy: form.contactCopy,
    },
    resume: {
      title: form.resumeTitle,
      resumeLink: form.resumeLink,
      highlights: form.resumeHighlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const [label, ...detailParts] = item.split('|');
          return { label: label?.trim() || '', detail: detailParts.join('|').trim() || '' };
        })
        .filter((item) => item.label && item.detail),
    },
  };
}

function AdminTable({ items, columns, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-4 font-medium">{column}</th>
              ))}
              <th className="px-4 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.map((item) => (
              <tr key={item._id}>
                {columns.map((column) => (
                  <td key={column} className="px-4 py-4 align-top text-slate-300">
                    {Array.isArray(item[column]) ? item[column].join(', ') : item[column]}
                  </td>
                ))}
                <td className="px-4 py-4 align-top">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onEdit(item)} className="inline-flex items-center rounded-full border border-rose-300/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20">
                      <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
                    </button>
                    <button type="button" onClick={() => onDelete(item)} className="inline-flex items-center rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/20">
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = getAdminToken();
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState('');
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState(createProfileForm(null));
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [editingId, setEditingId] = useState({ projects: null, skills: null, achievements: null, certificates: null });
  const [entityForms, setEntityForms] = useState(() => Object.fromEntries(Object.entries(entityConfigs).map(([key, config]) => [key, config.empty])));

  const dataMap = useMemo(
    () => ({ projects, skills, achievements, certificates }),
    [projects, skills, achievements, certificates],
  );

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const showFlash = (message) => {
    setFlash(message);
    window.clearTimeout(window.__portfolioFlashTimer);
    window.__portfolioFlashTimer = window.setTimeout(() => setFlash(''), 3000);
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      await apiRequest('/api/admin/dashboard', { token });

      const [profilePayload, projectsPayload, skillsPayload, achievementsPayload, certificatesPayload] = await Promise.all([
        apiRequest('/api/profile'),
        apiRequest('/api/projects'),
        apiRequest('/api/skills'),
        apiRequest('/api/achievements'),
        apiRequest('/api/certificates'),
      ]);

      setProfile(profilePayload);
      setProfileForm(createProfileForm(profilePayload));
      setProjects(projectsPayload);
      setSkills(skillsPayload);
      setAchievements(achievementsPayload);
      setCertificates(certificatesPayload);
    } catch (requestError) {
      if (requestError.message?.toLowerCase().includes('invalid') || requestError.message?.toLowerCase().includes('expired')) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }

      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = (event, targetField) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }

      const image = new Image();
      image.onload = () => {
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        if (!context) {
          setError('Unable to process image in this browser.');
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        setProfileForm((current) => ({ ...current, [targetField]: compressed }));
      };

      image.onerror = () => setError('Unable to read the selected image.');
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      const payload = buildProfilePayload(profileForm);
      const savedProfile = await apiRequest('/api/profile', { method: 'PUT', body: payload, token });
      setProfile(savedProfile);
      setProfileForm(createProfileForm(savedProfile));
      showFlash('Profile updated successfully.');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const updateEntityForm = (section, key, value) => {
    setEntityForms((current) => ({
      ...current,
      [section]: { ...current[section], [key]: value },
    }));
  };

  const resetEntityForm = (section) => {
    setEditingId((current) => ({ ...current, [section]: null }));
    setEntityForms((current) => ({ ...current, [section]: entityConfigs[section].empty }));
  };

  const handleEntitySubmit = async (event, section) => {
    event.preventDefault();
    const config = entityConfigs[section];
    const body = config.serialize(entityForms[section]);
    const currentEditingId = editingId[section];

    try {
      const savedItem = await apiRequest(currentEditingId ? `${config.path}/${currentEditingId}` : config.path, {
        method: currentEditingId ? 'PUT' : 'POST',
        body,
        token,
      });

      const nextItems = currentEditingId
        ? dataMap[section].map((item) => (item._id === currentEditingId ? savedItem : item))
        : [...dataMap[section], savedItem];

      if (section === 'projects') setProjects(nextItems);
      if (section === 'skills') setSkills(nextItems);
      if (section === 'achievements') setAchievements(nextItems);
      if (section === 'certificates') setCertificates(nextItems);

      resetEntityForm(section);
      showFlash(`${config.title.slice(0, -1)} saved successfully.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleEntityEdit = (section, item) => {
    const config = entityConfigs[section];
    setEditingId((current) => ({ ...current, [section]: item._id }));
    setEntityForms((current) => ({ ...current, [section]: config.hydrate(item) }));
    setActiveSection(section);
  };

  const handleEntityDelete = async (section, item) => {
    const config = entityConfigs[section];

    if (!window.confirm(`Delete ${item.title || item.name}?`)) {
      return;
    }

    try {
      await apiDelete(`${config.path}/${item._id}`, token);
      const nextItems = dataMap[section].filter((entry) => entry._id !== item._id);
      if (section === 'projects') setProjects(nextItems);
      if (section === 'skills') setSkills(nextItems);
      if (section === 'achievements') setAchievements(nextItems);
      if (section === 'certificates') setCertificates(nextItems);
      showFlash(`${config.title.slice(0, -1)} deleted.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const renderEntitySection = (section) => {
    const config = entityConfigs[section];
    const form = entityForms[section];

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-200">Admin Manager</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{config.title}</h2>
          </div>
          <button type="button" onClick={() => resetEntityForm(section)} className="inline-flex items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20">
            <Plus className="mr-2 h-4 w-4" /> New {config.title.slice(0, -1)}
          </button>
        </div>

        <form onSubmit={(event) => handleEntitySubmit(event, section)} className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {config.fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' ? 'lg:col-span-2' : ''}>
                <label className="mb-2 block text-sm font-medium text-slate-200">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={form[field.key] || ''}
                    onChange={(event) => updateEntityForm(section, field.key, event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={form[field.key] || ''}
                    onChange={(event) => updateEntityForm(section, field.key, event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-red-400 to-rose-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(244,63,94,0.35)]">
              <Save className="mr-2 h-4 w-4" /> {editingId[section] ? 'Update Entry' : 'Create Entry'}
            </button>
            {editingId[section] ? (
              <button type="button" onClick={() => resetEntityForm(section)} className="inline-flex items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20">Cancel Edit</button>
            ) : null}
          </div>
        </form>

        <AdminTable
          items={dataMap[section]}
          columns={config.columns}
          onEdit={(item) => handleEntityEdit(section, item)}
          onDelete={(item) => handleEntityDelete(section, item)}
        />
      </div>
    );
  };

  const profileFields = [
    ['name', 'Full name'],
    ['title', 'Title'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['github', 'GitHub URL'],
    ['linkedin', 'LinkedIn URL'],
    ['twitter', 'Twitter URL'],
    ['highlights', 'Hero highlights (comma separated)'],
    ['aboutTechFocus', 'About tech focus (comma separated)'],
    ['contactLinkedinLabel', 'LinkedIn display label'],
    ['contactGithubLabel', 'GitHub display label'],
    ['resumeTitle', 'Resume title'],
    ['resumeLink', 'Resume link'],
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:px-8">
        <aside className="glass-panel h-fit w-full rounded-[2rem] p-5 lg:sticky lg:top-8 lg:w-72">
          <div className="flex items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-rose-100">
            <ShieldCheck className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-rose-200">Admin</p>
              <p className="text-sm font-medium">Portfolio CMS</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {sectionItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveSection(item.key)}
                className={[
                  'flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                  activeSection === item.key ? 'bg-rose-500/20 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button type="button" onClick={handleLogout} className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </aside>

        <main className="flex-1 space-y-6">
          {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-200">{error}</div> : null}
          {flash ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">{flash}</div> : null}

          {activeSection === 'profile' ? (
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-rose-200">Admin Manager</p>
                <h1 className="mt-3 text-3xl font-semibold">Profile, about, resume, and contact settings</h1>
              </div>

              <form onSubmit={saveProfile} className="glass-panel rounded-[2rem] p-6 sm:p-8">
                <div className="mb-6 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-rose-200">Profile Photo</p>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
                      {profileForm.profilePhoto ? (
                        <img src={profileForm.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No Photo</div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <input
                        name="profilePhoto"
                        value={profileForm.profilePhoto || ''}
                        onChange={handleProfileChange}
                        placeholder="Profile photo URL"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                      />
                      <p className="text-xs text-slate-400">This photo is used in the navbar.</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, 'profilePhoto')}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-slate-700 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-rose-200">About Section Photo</p>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
                      {profileForm.aboutPhoto ? (
                        <img src={profileForm.aboutPhoto} alt="About" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No Photo</div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <input
                        name="aboutPhoto"
                        value={profileForm.aboutPhoto || ''}
                        onChange={handleProfileChange}
                        placeholder="About section photo URL"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                      />
                      <p className="text-xs text-slate-400">This photo is shown in the About section card.</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, 'aboutPhoto')}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-slate-700 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {profileFields.map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
                      <input
                        value={profileForm[key] || ''}
                        onChange={handleProfileChange}
                        name={key}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                      />
                    </div>
                  ))}

                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-200">Introduction</label>
                    <textarea name="introduction" rows={4} value={profileForm.introduction} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">About summary</label>
                    <textarea name="aboutSummary" rows={4} value={profileForm.aboutSummary} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">About interests</label>
                    <textarea name="aboutInterests" rows={4} value={profileForm.aboutInterests} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-200">About description</label>
                    <textarea name="aboutDescription" rows={5} value={profileForm.aboutDescription} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-200">Contact copy</label>
                    <textarea name="contactCopy" rows={5} value={profileForm.contactCopy} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-200">Resume highlights</label>
                    <textarea name="resumeHighlights" rows={6} value={profileForm.resumeHighlights} onChange={handleProfileChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40" placeholder="Use one highlight per line: Label|Detail" />
                  </div>
                </div>

                <div className="mt-6">
                  <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-red-400 to-rose-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(244,63,94,0.35)]">
                    <Save className="mr-2 h-4 w-4" /> Save Profile Content
                  </button>
                </div>
              </form>
            </div>
          ) : renderEntitySection(activeSection)}
        </main>
      </div>
    </div>
  );
}
