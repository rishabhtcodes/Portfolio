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
  ArrowUp,
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Info,
  ExternalLink,
  ChevronRight,
  FileText
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
    <div className="overflow-hidden rounded-3xl border border-[#1A242B] bg-[#11161B] mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#1A242B] text-left text-sm text-slate-300">
          <thead className="bg-[#161F25] text-xs uppercase tracking-[0.24em] text-teal-400">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-4 font-semibold">{column}</th>
              ))}
              <th className="px-4 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A242B]">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-[#161F25]/40 transition">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-4 align-top text-slate-400">
                    {Array.isArray(item[column]) ? item[column].join(', ') : item[column]}
                  </td>
                ))}
                <td className="px-4 py-4 align-top">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onEdit(item)} className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold text-teal-300 transition hover:bg-teal-500/20">
                      <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                    </button>
                    <button type="button" onClick={() => onDelete(item)} className="inline-flex items-center rounded-full border border-red-500/20 bg-red-400/10 px-3.5 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20">
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
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

  const handleResumeFileUpload = (event, targetField) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

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
      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.25)]'
      : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent';

  const activeItemClass = (item) =>
    editingId[activeSection] === item._id
      ? 'border-teal-500/30 bg-teal-500/10 text-white shadow-[0_0_15px_rgba(45,212,191,0.1)]'
      : 'border-transparent bg-[#161F25]/40 hover:bg-[#161F25]/80 text-slate-300';

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
    return <div className="flex min-h-screen items-center justify-center bg-[#0B0F12] text-teal-400 font-bold font-mono">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F12] text-slate-100 flex flex-col font-sans relative overflow-hidden select-none">
      {/* CSS Overrides Style Tag */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A242B;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2DD4BF;
        }
      `}</style>

      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="flex-1 flex flex-col lg:flex-row h-screen p-4 lg:p-6 gap-6 overflow-hidden max-w-[1600px] w-full mx-auto z-10">
        
        {/* Pane 1: Left Dock */}
        <aside className="lg:w-20 w-full flex lg:flex-col justify-between items-center bg-[#0F1316] border border-[#1A242B] rounded-3xl p-4 lg:py-6 gap-6 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          {/* Top Wrapper (Logo + Nav) */}
          <div className="flex lg:flex-col gap-6 items-center w-full">
            {/* Brand/Logo */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.3)] text-slate-950 font-bold">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            
            {/* Navigation Dock */}
            <nav className="flex lg:flex-col gap-4 flex-wrap justify-start items-center w-full">
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
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${activeDockClass(item.key)}`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Profile Photo / Logout */}
          <div className="flex lg:flex-col gap-4 items-center shrink-0">
            {profileForm.profilePhoto && (
              <div className="w-10 h-10 rounded-full border border-teal-500/40 overflow-hidden shadow-[0_0_10px_rgba(45,212,191,0.2)]">
                <img src={profileForm.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center justify-center transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Pane 2: Middle Sidebar List */}
        <aside className="lg:w-80 w-full flex flex-col bg-[#11161B] border border-[#1A242B] rounded-3xl p-5 gap-4 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          {/* List Title & Add Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-display text-white">
              {activeSection === 'profile' ? 'Profile Summary' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            {activeSection !== 'profile' && (
              <button
                type="button"
                onClick={() => resetEntityForm(activeSection)}
                className="w-7 h-7 rounded-lg border border-teal-500/30 hover:border-teal-500/60 bg-teal-500/5 hover:bg-teal-500/10 flex items-center justify-center transition text-teal-400"
                title={`New ${activeSection.slice(0, -1)}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Box */}
          {activeSection !== 'profile' ? (
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500/40"
              />
            </div>
          ) : null}
          
          {/* Items List (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
            {activeSection === 'profile' ? (
              /* Profile summary card */
              <div className="border border-teal-500/10 bg-gradient-to-b from-[#161F25]/60 to-[#11161B] rounded-2xl p-4 flex flex-col gap-4 text-center items-center shadow-inner">
                {profileForm.profilePhoto ? (
                  <div className="w-20 h-20 rounded-full border-2 border-teal-500/40 p-1 relative">
                    <img src={profileForm.profilePhoto} alt="Admin avatar" className="w-full h-full object-cover rounded-full" />
                    <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 border-4 border-[#11161B] rounded-full shadow-[0_0_8px_#10b981]" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 relative">
                    <User className="w-10 h-10" />
                    <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 border-4 border-[#11161B] rounded-full shadow-[0_0_8px_#10b981]" />
                  </div>
                )}
                
                <div>
                  <h3 className="font-bold text-white text-lg leading-snug">{profileForm.name || 'Admin User'}</h3>
                  <p className="text-xs text-teal-400 font-mono mt-0.5">{profileForm.title || 'CMS Control'}</p>
                </div>
                
                <div className="w-full border-t border-[#1A242B] pt-4 text-left space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> Active Now
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">Email:</span>
                    <span className="truncate max-w-[150px]">{profileForm.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">Projects:</span>
                    <span>{projects.length} entries</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">Skills:</span>
                    <span>{skills.length} entries</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Entity List Items */
              filteredItems.length > 0 ? (
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
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border cursor-pointer transition-all duration-150 relative group ${activeItemClass(item)}`}
                    >
                      {/* Avatar / Icon */}
                      <div className="w-10 h-10 shrink-0 overflow-hidden rounded-xl border border-[#1A242B] bg-[#161F25] flex items-center justify-center text-teal-400">
                        {thumbnail && (thumbnail.startsWith('http') || thumbnail.startsWith('data:image')) ? (
                          <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Icon className="w-5 h-5 text-teal-400" />
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-sm font-semibold truncate text-white">{item.title || item.name || 'Untitled'}</h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>
                      </div>
                      
                      {/* Delete icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEntityDelete(activeSection, item);
                        }}
                        className="absolute right-3.5 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-red-400 text-slate-500 transition p-1 rounded-md hover:bg-red-500/10"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600 gap-2 flex-1">
                  <Info className="w-8 h-8 opacity-40 text-slate-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">No Items Found</p>
                </div>
              )
            )}
          </div>
        </aside>

        {/* Pane 3: Main Workspace (Editor Panel) */}
        <main className="flex-1 flex flex-col bg-[#11161B] border border-[#1A242B] rounded-3xl p-6 lg:p-8 gap-5 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1A242B] pb-4.5 shrink-0">
            <div className="flex items-center gap-3.5">
              {activeSection === 'profile' ? (
                <div className="w-10 h-10 rounded-full border border-teal-500/40 p-0.5">
                  {profileForm.profilePhoto ? (
                    <img src={profileForm.profilePhoto} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-teal-500/10 flex items-center justify-center rounded-full text-teal-400"><User className="w-5 h-5" /></div>
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center shadow-inner">
                  {(() => {
                    const Icon = sectionIcons[activeSection] || User;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-white font-display leading-tight text-lg">
                  {activeSection === 'profile'
                    ? 'Profile Settings'
                    : editingId[activeSection]
                    ? `Editing: ${entityForms[activeSection].title || entityForms[activeSection].name || 'Entry'}`
                    : `New ${entityConfigs[activeSection].title.slice(0, -1)}`}
                </h3>
                <p className="text-xs text-teal-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 inline-block animate-pulse" />
                  {activeSection === 'profile' ? 'Active Mode • Identity Editor' : editingId[activeSection] ? 'Modify details' : 'Create new entry'}
                </p>
              </div>
            </div>
            
            {/* Quick action header buttons */}
            <div className="flex items-center gap-2">
              {activeSection !== 'profile' && editingId[activeSection] && (
                <button
                  type="button"
                  onClick={() => resetEntityForm(activeSection)}
                  className="rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 text-teal-400 px-4.5 py-2 text-xs font-semibold transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
          
          {/* Scrollable Form Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
            {activeSection === 'profile' ? (
              /* PROFILE FORM */
              <form onSubmit={saveProfile} className="space-y-6">
                
                {/* Visual Attachments (styled like the dot-teal tag elements in the chat footer) */}
                <div className="border border-[#1A242B] bg-[#161F25]/40 rounded-2.5xl p-5 space-y-5 shadow-inner">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-[#1A242B] pb-2">Media & Resumes</h4>
                  
                  <div className="grid gap-5 sm:grid-cols-2">
                    
                    {/* Profile Photo */}
                    <div className="flex items-center gap-4.5">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#1A242B] bg-[#161F25] flex items-center justify-center shrink-0">
                        {profileForm.profilePhoto ? (
                          <img src={profileForm.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <div className="text-xs text-slate-500 uppercase font-semibold">Empty</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Profile Photo</p>
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
                          className="border border-dashed border-teal-500/40 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <ImageIcon className="h-3.5 w-3.5" /> Upload Photo
                        </button>
                        <input
                          name="profilePhoto"
                          value={profileForm.profilePhoto || ''}
                          onChange={handleProfileChange}
                          placeholder="Or paste photo URL"
                          className="w-full rounded-xl border border-[#1A242B] bg-[#161F25] px-3.5 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                        />
                      </div>
                    </div>

                    {/* About Section Photo */}
                    <div className="flex items-center gap-4.5">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#1A242B] bg-[#161F25] flex items-center justify-center shrink-0">
                        {profileForm.aboutPhoto ? (
                          <img src={profileForm.aboutPhoto} alt="About" className="h-full w-full object-cover" />
                        ) : (
                          <div className="text-xs text-slate-500 uppercase font-semibold">Empty</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">About Photo</p>
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
                          className="border border-dashed border-teal-500/40 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <ImageIcon className="h-3.5 w-3.5" /> Upload Photo
                        </button>
                        <input
                          name="aboutPhoto"
                          value={profileForm.aboutPhoto || ''}
                          onChange={handleProfileChange}
                          placeholder="Or paste photo URL"
                          className="w-full rounded-xl border border-[#1A242B] bg-[#161F25] px-3.5 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                        />
                      </div>
                    </div>

                    {/* PDF Resume */}
                    <div className="space-y-2 border border-[#1A242B] p-3 rounded-2xl bg-[#11161B]">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">PDF Resume</p>
                      <input
                        id="pdf-resume-file"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={(event) => handleResumeFileUpload(event, 'resumePdfLink')}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerFileInput('pdf-resume-file')}
                          className="border border-dashed border-teal-500/40 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <FileText className="h-3.5 w-3.5" /> Upload PDF
                        </button>
                      </div>
                      <input
                        name="resumePdfLink"
                        value={profileForm.resumePdfLink || ''}
                        onChange={handleProfileChange}
                        placeholder="Or PDF File URL"
                        className="w-full rounded-xl border border-[#1A242B] bg-[#161F25] px-3.5 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                      />
                    </div>

                    {/* DOC Resume */}
                    <div className="space-y-2 border border-[#1A242B] p-3 rounded-2xl bg-[#11161B]">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">DOC/DOCX Resume</p>
                      <input
                        id="doc-resume-file"
                        type="file"
                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(event) => handleResumeFileUpload(event, 'resumeDocLink')}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerFileInput('doc-resume-file')}
                          className="border border-dashed border-teal-500/40 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <FileText className="h-3.5 w-3.5" /> Upload DOC
                        </button>
                      </div>
                      <input
                        name="resumeDocLink"
                        value={profileForm.resumeDocLink || ''}
                        onChange={handleProfileChange}
                        placeholder="Or DOC File URL"
                        className="w-full rounded-xl border border-[#1A242B] bg-[#161F25] px-3.5 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                      />
                    </div>

                  </div>
                </div>

                {/* Text Fields */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {profileFields.map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
                      <input
                        value={profileForm[key] || ''}
                        onChange={handleProfileChange}
                        name={key}
                        className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Introduction</label>
                    <textarea
                      name="introduction"
                      rows={3}
                      value={profileForm.introduction}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">About summary</label>
                    <textarea
                      name="aboutSummary"
                      rows={4}
                      value={profileForm.aboutSummary}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">About interests</label>
                    <textarea
                      name="aboutInterests"
                      rows={4}
                      value={profileForm.aboutInterests}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">About description</label>
                    <textarea
                      name="aboutDescription"
                      rows={4}
                      value={profileForm.aboutDescription}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Contact copy</label>
                    <textarea
                      name="contactCopy"
                      rows={3}
                      value={profileForm.contactCopy}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Resume highlights</label>
                    <textarea
                      name="resumeHighlights"
                      rows={5}
                      value={profileForm.resumeHighlights}
                      onChange={handleProfileChange}
                      className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                      placeholder="Use one highlight per line: Label|Detail"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition duration-300 hover:from-teal-400 hover:to-cyan-400 shadow-[0_4px_15px_rgba(45,212,191,0.25)] hover:-translate-y-0.5"
                  >
                    <Save className="mr-2 h-4.5 w-4.5 text-slate-950" /> Save Profile Content
                  </button>
                </div>
              </form>
            ) : (
              /* ENTITY MANAGING FORM */
              (() => {
                const config = entityConfigs[activeSection];
                const form = entityForms[activeSection];
                
                return (
                  <form onSubmit={(event) => handleEntitySubmit(event, activeSection)} className="space-y-6">
                    {/* Media fields inside dedicated container styled as chat attachment list */}
                    {config.fields.filter((f) => f.type === 'image').length > 0 && (
                      <div className="border border-[#1A242B] bg-[#161F25]/40 rounded-2.5xl p-5 space-y-4 shadow-inner">
                        <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-[#1A242B] pb-2">Image Attachments</h4>
                        
                        {config.fields
                          .filter((f) => f.type === 'image')
                          .map((field) => {
                            const fieldInputId = `file-input-${activeSection}-${field.key}`;
                            return (
                              <div key={field.key} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-16 w-16 overflow-hidden rounded-xl border border-[#1A242B] bg-[#161F25] flex items-center justify-center shrink-0">
                                  {form[field.key] ? (
                                    <img src={form[field.key]} alt={field.label} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Empty</div>
                                  )}
                                </div>
                                <div className="flex-1 space-y-2">
                                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{field.label}</p>
                                  <input
                                    id={fieldInputId}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleEntityImageUpload(event, activeSection, field.key)}
                                    className="hidden"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => triggerFileInput(fieldInputId)}
                                      className="border border-dashed border-teal-500/40 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition text-xs font-semibold uppercase tracking-wider"
                                    >
                                      <Upload className="h-3.5 w-3.5" /> Upload File
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={form[field.key] || ''}
                                    onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                    placeholder={`Or paste ${field.label} URL`}
                                    className="w-full rounded-xl border border-[#1A242B] bg-[#161F25] px-3.5 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                    
                    {/* General Text inputs grid */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {config.fields
                        .filter((f) => f.type !== 'image')
                        .map((field) => (
                          <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">{field.label}</label>
                            
                            {field.type === 'textarea' ? (
                              <textarea
                                value={form[field.key] || ''}
                                onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                rows={4}
                                className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                              />
                            ) : field.type === 'checkbox' ? (
                              <div className="flex items-center gap-3 py-2">
                                <input
                                  type="checkbox"
                                  checked={!!form[field.key]}
                                  onChange={(event) => updateEntityForm(activeSection, field.key, event.target.checked)}
                                  className="h-5 w-5 rounded border-[#1A242B] bg-[#161F25] text-teal-500 focus:ring-teal-500/30 accent-teal-500"
                                />
                                <span className="text-sm text-slate-400">Project is live & accessible</span>
                              </div>
                            ) : (
                              <input
                                type={field.type || 'text'}
                                value={form[field.key] || ''}
                                onChange={(event) => updateEntityForm(activeSection, field.key, event.target.value)}
                                className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-teal-500/40"
                              />
                            )}
                          </div>
                        ))}
                    </div>
                    
                    {/* Form actions */}
                    <div className="mt-6 flex flex-wrap justify-between items-center gap-3 border-t border-[#1A242B] pt-4.5">
                      <div>
                        {editingId[activeSection] && (
                          <button
                            type="button"
                            onClick={() => resetEntityForm(activeSection)}
                            className="inline-flex items-center justify-center rounded-full border border-red-500/20 bg-red-400/10 px-5 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-400/20"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:from-teal-400 hover:to-cyan-400 shadow-[0_4px_15px_rgba(45,212,191,0.25)] hover:-translate-y-0.5"
                      >
                        <Save className="mr-2 h-4.5 w-4.5 text-slate-950" />
                        {editingId[activeSection] ? 'Update Entry' : 'Create Entry'}
                      </button>
                    </div>
                  </form>
                );
              })()
            )}

            {/* Bottom Alert notifications area */}
            <div className="mt-6 space-y-4 shrink-0">
              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300 animate-fade-in-up">
                  {error}
                </div>
              ) : null}
              {flash ? (
                <div className="rounded-2xl border border-[#1E3A3A] bg-[#162e2e] px-5 py-4 text-sm text-teal-300 animate-fade-in-up flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {flash}
                </div>
              ) : null}
            </div>

            {/* Admin Table for full view list at the bottom */}
            {activeSection !== 'profile' && dataMap[activeSection]?.length > 0 && (
              <div className="mt-10 border-t border-[#1A242B] pt-8">
                <h3 className="text-base font-bold font-display text-white mb-4">Table Overview</h3>
                <AdminTable
                  items={dataMap[activeSection]}
                  columns={entityConfigs[activeSection].columns}
                  onEdit={(item) => handleEntityEdit(activeSection, item)}
                  onDelete={(item) => handleEntityDelete(activeSection, item)}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

