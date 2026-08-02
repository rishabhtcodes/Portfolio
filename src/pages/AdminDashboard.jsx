import { useEffect, useMemo, useState } from 'react';
import {
  LogOut,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  User,
  Briefcase,
  Code,
  Trophy,
  Award,
  Search,
  Upload,
  Image as ImageIcon,
  Check,
  Info,
  FileText,
  Terminal,
  Activity,
  Server,
  Database,
  HardDrive
} from 'lucide-react';

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
    empty: { title: '', description: '', github: '', demo: '', isLive: true, status: 'Completed', image: '', techStack: '', order: '0' },
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'isLive', label: 'Is Live?', type: 'checkbox' },
      { key: 'image', label: 'Project Image', type: 'image' },
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
    empty: { name: '', category: 'General', logo: '', languageIcon: '', gridBg: '', description: '', order: '0' },
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'logo', label: 'Skill Logo', type: 'image' },
      { key: 'languageIcon', label: 'Language Icon (Lucide name / Devicon Class / URL)' },
      { key: 'gridBg', label: 'Grid Background (CSS Color / Gradient)' },
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
      { key: 'icon', label: 'Certificate Icon', type: 'image' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['title', 'issuer', 'date'],
    serialize: (form) => ({ ...form, order: Number(form.order || 0) }),
    hydrate: (item) => ({ ...item, order: String(item.order ?? 0) }),
  },
};

function createProfileForm(profile) {
  const profileResume = profile?.resume || {};

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
    resumeTitle: profileResume.title || '',
    resumeLink: profileResume.resumeLink || '',
    resumePdfLink: profileResume.resumePdfLink || profileResume.resumeLink || '',
    resumeDocLink: profileResume.resumeDocLink || '',
    resumeHighlights: Array.isArray(profileResume.highlights)
      ? profileResume.highlights.map((item) => `${item.label}|${item.detail}`).join('\n')
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
      resumeLink: form.resumePdfLink || form.resumeDocLink || form.resumeLink,
      resumePdfLink: form.resumePdfLink,
      resumeDocLink: form.resumeDocLink,
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
    <div className="overflow-hidden rounded-xl border border-[#d4cbb8] bg-[#fbf8f1] mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#d4cbb8] text-left text-xs font-mono text-[#2b251d]">
          <thead className="bg-[#ece6d9] text-[11px] uppercase tracking-wider text-[#794422] font-semibold">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3.5 border-b border-[#d4cbb8]">{column}</th>
              ))}
              <th className="px-4 py-3.5 border-b border-[#d4cbb8]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d4cbb8]/60 bg-[#fbf8f1]">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-[#f5f0e6] transition">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 align-top text-[#6b6255]">
                    {Array.isArray(item[column]) ? item[column].join(', ') : item[column]}
                  </td>
                ))}
                <td className="px-4 py-3 align-top">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onEdit(item)} className="inline-flex items-center rounded border border-[#794422]/30 bg-[#794422]/10 px-2.5 py-1 text-xs font-semibold text-[#794422] transition hover:bg-[#794422]/20">
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </button>
                    <button type="button" onClick={() => onDelete(item)} className="inline-flex items-center rounded border border-red-800/30 bg-red-100/50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200/50">
                      <Trash2 className="mr-1 h-3 w-3" /> Delete
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
  const [searchQuery, setSearchQuery] = useState('');

  const dataMap = useMemo(
    () => ({ projects, skills, achievements, certificates }),
    [projects, skills, achievements, certificates],
  );

  const sectionIcons = {
    profile: User,
    projects: Briefcase,
    skills: Code,
    achievements: Trophy,
    certificates: Award
  };

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
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

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

  const handleResumeFileUpload = (event, targetField) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    const allowed = targetField === 'resumePdfLink'
      ? lowerName.endsWith('.pdf')
      : (lowerName.endsWith('.doc') || lowerName.endsWith('.docx'));

    if (!allowed) {
      setError(targetField === 'resumePdfLink' ? 'Please select a PDF file.' : 'Please select a DOC or DOCX file.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileForm((current) => ({ ...current, [targetField]: reader.result }));
      }
    };
    reader.onerror = () => setError('Unable to read the selected resume file.');
    reader.readAsDataURL(file);
  };

  const handleEntityImageUpload = (event, section, targetField) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

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
        setEntityForms((current) => ({
          ...current,
          [section]: { ...current[section], [targetField]: compressed },
        }));
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

  const filteredItems = useMemo(() => {
    const items = dataMap[activeSection] || [];
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      if (activeSection === 'projects') {
        const titleMatch = item.title?.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const techMatch = Array.isArray(item.techStack)
          ? item.techStack.some((t) => t.toLowerCase().includes(query))
          : item.techStack?.toLowerCase().includes(query);
        return titleMatch || descMatch || techMatch;
      }
      if (activeSection === 'skills') {
        return item.name?.toLowerCase().includes(query) || item.category?.toLowerCase().includes(query);
      }
      if (activeSection === 'achievements') {
        return item.title?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query);
      }
      if (activeSection === 'certificates') {
        return item.title?.toLowerCase().includes(query) || item.issuer?.toLowerCase().includes(query);
      }
      return false;
    });
  }, [dataMap, activeSection, searchQuery]);

  const triggerFileInput = (inputId) => {
    const element = document.getElementById(inputId);
    if (element) {
      element.click();
    }
  };

  const activeDockClass = (key) =>
    activeSection === key
      ? 'bg-[#794422] text-[#f7f3ec] border border-[#5c3217] shadow-sm'
      : 'text-[#6b6255] hover:bg-[#ece6d9] hover:text-[#2b251d] border border-transparent';

  const activeItemClass = (item) =>
    editingId[activeSection] === item._id
      ? 'border-[#794422] bg-[#fbf8f1] text-[#2b251d] shadow-sm'
      : 'border-[#d4cbb8] bg-[#f5f0e6] hover:bg-[#fbf8f1] text-[#2b251d]';

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
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ece6d9] text-[#794422] font-mono font-semibold">
        <Terminal className="mr-2 h-5 w-5 animate-pulse" /> Loading Swift OS Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#ece6d9] text-[#2b251d] flex flex-col font-mono relative select-none">
      {/* Custom Retro Scrollbar */}
      <style>{`
        .swift-custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .swift-custom-scrollbar::-webkit-scrollbar-track {
          background: #ece6d9;
        }
        .swift-custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b8ac94;
          border-radius: 4px;
        }
        .swift-custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #794422;
        }
      `}</style>

      {/* TOP RETRO OS HEADER */}
      <header className="bg-[#794422] text-[#f7f3ec] border-b-2 border-[#5c3217] px-4 py-2 flex justify-between items-center text-xs shrink-0">
        <div className="flex items-center gap-3 font-semibold">
          <div className="bg-[#5c3217] p-1 rounded text-[#f7f3ec]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="tracking-wider">SWIFT OS ADMIN</span>
          <span className="text-[10px] opacity-70 bg-[#5c3217] px-1.5 py-0.5 rounded">v2.4.0</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" /> DB Connected
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-[#5c3217] hover:bg-[#8e522b] px-2.5 py-1 rounded text-[#f7f3ec] transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-38px)] p-3 lg:p-4 gap-4 overflow-hidden">

        {/* PANE 1: LEFT DOCK */}
        <aside className="lg:w-16 w-full flex lg:flex-col justify-between items-center bg-[#f5f0e6] border border-[#d4cbb8] rounded-lg p-2 shrink-0 shadow-sm">
          <nav className="flex lg:flex-col gap-2 w-full items-center">
            {sectionItems.map((item) => {
              const Icon = sectionIcons[item.key] || User;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.key);
                    setSearchQuery('');
                  }}
                  className={`w-11 h-11 rounded-md flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${activeDockClass(item.key)}`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] uppercase tracking-tighter">{item.key.slice(0, 4)}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="hidden lg:flex flex-col items-center gap-2">
            {profileForm.profilePhoto && (
              <div className="w-8 h-8 rounded-full border border-[#794422] overflow-hidden">
                <img src={profileForm.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </aside>

        {/* PANE 2: MIDDLE NAVIGATION LIST */}
        <aside className="lg:w-72 w-full flex flex-col bg-[#f5f0e6] border border-[#d4cbb8] rounded-lg p-3 gap-3 shrink-0 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#d4cbb8] pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#794422] flex items-center gap-1.5">
              <span className="text-[#3d7a46]">&gt;</span> {activeSection}
            </h2>
            {activeSection !== 'profile' && (
              <button
                type="button"
                onClick={() => resetEntityForm(activeSection)}
                className="p-1 rounded bg-[#794422] text-[#f7f3ec] hover:bg-[#5c3217] transition text-xs font-bold flex items-center gap-1 px-2"
                title={`New ${activeSection.slice(0, -1)}`}
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>

          {activeSection !== 'profile' && (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6255]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] pl-8 pr-3 py-1.5 text-xs text-[#2b251d] placeholder-[#6b6255] outline-none focus:border-[#794422]"
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto swift-custom-scrollbar flex flex-col gap-2 pr-1">
            {activeSection === 'profile' ? (
              <div className="space-y-3">
                <div className="border border-[#d4cbb8] bg-[#fbf8f1] rounded p-3 text-xs space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#d4cbb8] pb-2.5">
                    {(profileForm.aboutPhoto || profileForm.profilePhoto) ? (
                      <img
                        src={profileForm.aboutPhoto || profileForm.profilePhoto}
                        alt="Avatar"
                        className="w-12 h-14 rounded-[1.2rem] object-cover border border-[#794422] shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#794422]/10 text-[#794422] flex items-center justify-center font-bold shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-[#2b251d] leading-snug">{profileForm.name || 'Admin'}</h3>
                      <p className="text-[10px] text-[#6b6255] mt-0.5">{profileForm.title || 'CMS Admin'}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-[#6b6255]">
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-bold text-[#794422]">{projects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className="font-bold text-[#794422]">{skills.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Achievements:</span>
                      <span className="font-bold text-[#794422]">{achievements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificates:</span>
                      <span className="font-bold text-[#794422]">{certificates.length}</span>
                    </div>
                  </div>
                </div>

                {/* About Photo Preview Card */}
                <div className="border border-[#d4cbb8] bg-[#fbf8f1] rounded p-3 text-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-[#d4cbb8] pb-1.5">
                    <span className="font-bold text-[#794422] uppercase text-[10px] tracking-wider">About Photo</span>
                    <span className="text-[10px] text-[#6b6255]">Preview</span>
                  </div>
                  <div className="w-full h-40 rounded border border-[#d4cbb8] overflow-hidden bg-[#ece6d9] flex items-center justify-center">
                    {profileForm.aboutPhoto ? (
                      <img src={profileForm.aboutPhoto} alt="About Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[11px] text-[#6b6255] italic">No About Photo Uploaded</div>
                    )}
                  </div>
                </div>
              </div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const Icon = sectionIcons[activeSection] || User;
                let thumbnail = null;
                let subtitle = '';

                if (activeSection === 'projects') {
                  thumbnail = item.image;
                  subtitle = item.status || (item.isLive ? 'Live' : 'Completed');
                } else if (activeSection === 'skills') {
                  thumbnail = item.logo;
                  subtitle = item.category;
                } else if (activeSection === 'achievements') {
                  subtitle = item.year;
                } else if (activeSection === 'certificates') {
                  subtitle = item.issuer;
                }

                return (
                  <div
                    key={item._id}
                    onClick={() => handleEntityEdit(activeSection, item)}
                    className={`flex items-center gap-2.5 p-2 rounded border cursor-pointer transition relative group ${activeItemClass(item)}`}
                  >
                    <div className="w-8 h-8 shrink-0 rounded border border-[#d4cbb8] bg-[#fbf8f1] flex items-center justify-center text-[#794422] overflow-hidden">
                      {thumbnail && (thumbnail.startsWith('http') || thumbnail.startsWith('data:image')) ? (
                        <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Icon className="w-4 h-4 text-[#794422]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-5">
                      <h4 className="text-xs font-semibold truncate text-[#2b251d]">{item.title || item.name || 'Untitled'}</h4>
                      <p className="text-[10px] text-[#6b6255] truncate">{subtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEntityDelete(activeSection, item);
                      }}
                      className="absolute right-2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800 transition p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-[#6b6255]">No entries found</div>
            )}
          </div>
        </aside>

        {/* PANE 3: MAIN EDITOR WORKSPACE */}
        <main className="flex-1 flex flex-col bg-[#f5f0e6] border border-[#d4cbb8] rounded-lg p-4 gap-4 overflow-hidden shadow-sm">
          {/* EDITOR HEADER */}
          <div className="flex justify-between items-center border-b border-[#d4cbb8] pb-3 shrink-0">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#794422] flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                {activeSection === 'profile'
                  ? 'Edit Profile Content'
                  : editingId[activeSection]
                  ? `Edit: ${entityForms[activeSection].title || entityForms[activeSection].name || 'Entry'}`
                  : `New ${entityConfigs[activeSection].title.slice(0, -1)}`}
              </h3>
              <p className="text-[11px] text-[#6b6255]">Modify portfolio database content in real-time</p>
            </div>
            {activeSection !== 'profile' && editingId[activeSection] && (
              <button
                type="button"
                onClick={() => resetEntityForm(activeSection)}
                className="px-3 py-1 text-xs font-bold border border-[#d4cbb8] rounded bg-[#ece6d9] hover:bg-[#fbf8f1] text-[#794422] transition"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* FORM AREA */}
          <div className="flex-1 overflow-y-auto swift-custom-scrollbar pr-2 pb-4">
            {activeSection === 'profile' ? (
              /* PROFILE FORM */
              <form id="profile-form" onSubmit={saveProfile} className="space-y-4">
                <div className="border border-[#d4cbb8] bg-[#fbf8f1] rounded p-4 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#794422] border-b border-[#d4cbb8] pb-1">Media Files</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Profile Photo */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-[#6b6255]">Profile Photo</label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="profile-photo-file"
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, 'profilePhoto')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerFileInput('profile-photo-file')}
                          className="px-3 py-1.5 rounded border border-[#794422] bg-[#794422] text-[#f7f3ec] text-xs font-bold hover:bg-[#5c3217] transition inline-flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload
                        </button>
                        <input
                          name="profilePhoto"
                          value={profileForm.profilePhoto || ''}
                          onChange={handleProfileChange}
                          placeholder="Image URL..."
                          className="flex-1 rounded border border-[#d4cbb8] bg-[#ece6d9] px-2.5 py-1 text-xs outline-none focus:border-[#794422]"
                        />
                      </div>
                    </div>

                    {/* About Photo */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-[#6b6255]">About Photo</label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="about-photo-file"
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, 'aboutPhoto')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerFileInput('about-photo-file')}
                          className="px-3 py-1.5 rounded border border-[#794422] bg-[#794422] text-[#f7f3ec] text-xs font-bold hover:bg-[#5c3217] transition inline-flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload
                        </button>
                        <input
                          name="aboutPhoto"
                          value={profileForm.aboutPhoto || ''}
                          onChange={handleProfileChange}
                          placeholder="Image URL..."
                          className="flex-1 rounded border border-[#d4cbb8] bg-[#ece6d9] px-2.5 py-1 text-xs outline-none focus:border-[#794422]"
                        />
                      </div>
                    </div>

                    {/* PDF Resume */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-[#6b6255]">PDF Resume File</label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="pdf-resume-file"
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={(event) => handleResumeFileUpload(event, 'resumePdfLink')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerFileInput('pdf-resume-file')}
                          className="px-3 py-1.5 rounded border border-[#794422] bg-[#794422] text-[#f7f3ec] text-xs font-bold hover:bg-[#5c3217] transition inline-flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" /> Upload PDF
                        </button>
                        <input
                          name="resumePdfLink"
                          value={profileForm.resumePdfLink || ''}
                          onChange={handleProfileChange}
                          placeholder="PDF URL or File Data..."
                          className="flex-1 rounded border border-[#d4cbb8] bg-[#ece6d9] px-2.5 py-1 text-xs outline-none focus:border-[#794422]"
                        />
                      </div>
                    </div>

                    {/* DOC Resume */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-[#6b6255]">DOC/DOCX Resume File</label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="doc-resume-file"
                          type="file"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(event) => handleResumeFileUpload(event, 'resumeDocLink')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerFileInput('doc-resume-file')}
                          className="px-3 py-1.5 rounded border border-[#794422] bg-[#794422] text-[#f7f3ec] text-xs font-bold hover:bg-[#5c3217] transition inline-flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" /> Upload DOC
                        </button>
                        <input
                          name="resumeDocLink"
                          value={profileForm.resumeDocLink || ''}
                          onChange={handleProfileChange}
                          placeholder="DOC URL or File Data..."
                          className="flex-1 rounded border border-[#d4cbb8] bg-[#ece6d9] px-2.5 py-1 text-xs outline-none focus:border-[#794422]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text fields */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {profileFields.map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs font-bold uppercase text-[#6b6255]">{label}</label>
                      <input
                        value={profileForm[key] || ''}
                        onChange={handleProfileChange}
                        name={key}
                        className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-1.5 text-xs text-[#2b251d] outline-none focus:border-[#794422]"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold uppercase text-[#6b6255]">Introduction</label>
                    <textarea
                      name="introduction"
                      rows={2}
                      value={profileForm.introduction}
                      onChange={handleProfileChange}
                      className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-1.5 text-xs text-[#2b251d] outline-none focus:border-[#794422]"
                    />
                  </div>
                </div>
              </form>
            ) : (
              /* ENTITY MANAGING FORM */
              (() => {
                const config = entityConfigs[activeSection];
                const form = entityForms[activeSection];

                return (
                  <form id="entity-form" onSubmit={(event) => handleEntitySubmit(event, activeSection)} className="space-y-4">
                    {config.fields.filter((f) => f.type === 'image').length > 0 && (
                      <div className="border border-[#d4cbb8] bg-[#fbf8f1] rounded p-3 space-y-3">
                        <h4 className="text-xs font-bold uppercase text-[#794422] border-b border-[#d4cbb8] pb-1">Media Files</h4>
                        {config.fields
                          .filter((f) => f.type === 'image')
                          .map((field) => {
                            const fieldInputId = `file-input-${activeSection}-${field.key}`;
                            return (
                              <div key={field.key} className="flex gap-2 items-center">
                                <input
                                  id={fieldInputId}
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) => handleEntityImageUpload(event, activeSection, field.key)}
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => triggerFileInput(fieldInputId)}
                                  className="px-3 py-1.5 rounded border border-[#794422] bg-[#794422] text-[#f7f3ec] text-xs font-bold hover:bg-[#5c3217] transition inline-flex items-center gap-1.5"
                                >
                                  <Upload className="w-3.5 h-3.5" /> Upload
                                </button>
                                <input
                                  type="text"
                                  value={form[field.key] || ''}
                                  onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                  placeholder={`Or URL for ${field.label}...`}
                                  className="flex-1 rounded border border-[#d4cbb8] bg-[#ece6d9] px-2.5 py-1 text-xs outline-none focus:border-[#794422]"
                                />
                              </div>
                            );
                          })}
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      {config.fields
                        .filter((f) => f.type !== 'image')
                        .map((field) => (
                          <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label className="mb-1 block text-xs font-bold uppercase text-[#6b6255]">{field.label}</label>
                            {field.type === 'textarea' ? (
                              <textarea
                                value={form[field.key] || ''}
                                onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                rows={3}
                                className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-1.5 text-xs text-[#2b251d] outline-none focus:border-[#794422]"
                              />
                            ) : field.type === 'checkbox' ? (
                              <div className="flex items-center gap-2 py-1">
                                <input
                                  type="checkbox"
                                  checked={!!form[field.key]}
                                  onChange={(event) => updateEntityForm(activeSection, field.key, event.target.checked)}
                                  className="h-4 w-4 rounded border-[#d4cbb8] text-[#794422] accent-[#794422]"
                                />
                                <span className="text-xs text-[#6b6255]">Is live & active?</span>
                              </div>
                            ) : (
                              <input
                                type={field.type || 'text'}
                                value={form[field.key] || ''}
                                onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-1.5 text-xs text-[#2b251d] outline-none focus:border-[#794422]"
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </form>
                );
              })()
            )}

            {/* Flash / Error notification */}
            {error && (
              <div className="mt-3 p-2.5 rounded border border-red-700 bg-red-100 text-red-800 text-xs font-semibold">
                {error}
              </div>
            )}
            {flash && (
              <div className="mt-3 p-2.5 rounded border border-[#3d7a46] bg-[#3d7a46]/10 text-[#3d7a46] text-xs font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#3d7a46]" /> {flash}
              </div>
            )}

            {/* Table Overview */}
            {activeSection !== 'profile' && dataMap[activeSection]?.length > 0 && (
              <div className="mt-6 border-t border-[#d4cbb8] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#794422]">Database Records</h4>
                <AdminTable
                  items={dataMap[activeSection]}
                  columns={entityConfigs[activeSection].columns}
                  onEdit={(item) => handleEntityEdit(activeSection, item)}
                  onDelete={(item) => handleEntityDelete(activeSection, item)}
                />
              </div>
            )}
          </div>

          {/* FIXED BOTTOM NAV BAR WITH SAVE BUTTON */}
          <div className="shrink-0 pt-3 border-t border-[#d4cbb8] flex justify-between items-center bg-[#f5f0e6]">
            <div>
              {activeSection !== 'profile' && editingId[activeSection] && (
                <button
                  type="button"
                  onClick={() => resetEntityForm(activeSection)}
                  className="px-3 py-1.5 rounded border border-red-700 bg-red-100 text-red-800 text-xs font-bold hover:bg-red-200 transition"
                >
                  Cancel
                </button>
              )}
            </div>
            {activeSection === 'profile' ? (
              <button
                type="submit"
                form="profile-form"
                className="px-5 py-2.5 rounded bg-[#794422] hover:bg-[#5c3217] text-[#f7f3ec] font-bold text-xs transition inline-flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            ) : (
              <button
                type="submit"
                form="entity-form"
                className="px-5 py-2.5 rounded bg-[#794422] hover:bg-[#5c3217] text-[#f7f3ec] font-bold text-xs transition inline-flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4" />
                {editingId[activeSection] ? 'Update Entry' : 'Create Entry'}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
