import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Sun, 
  Moon, 
  Bell, 
  ExternalLink, 
  Code, 
  Briefcase, 
  FileText, 
  Mail, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Plus, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Github, 
  Linkedin, 
  Twitter, 
  Award, 
  Trophy, 
  User, 
  Laptop, 
  GraduationCap, 
  FolderGit2, 
  Activity, 
  Cpu, 
  Clock, 
  Send,
  Download,
  Copy,
  CheckCircle2,
  X,
  Menu,
  Tv,
  Zap
} from 'lucide-react';
import { getPortfolioData, sendContactMessage } from '../lib/api';
import PhotoModal from '../components/PhotoModal';
import RandomLoader from '../components/RandomLoader';
import { 
  about as staticAbout, 
  achievements as staticAchievements, 
  certificates as staticCertificates, 
  contact as staticContact, 
  profile as staticProfile, 
  projects as staticProjects, 
  resume as staticResume, 
  skills as staticSkills 
} from '../data/portfolioData';

export default function SwiftOSHome() {
  // Real-time data state initialized with robust static fallbacks
  const [data, setData] = useState({
    profile: staticProfile,
    about: staticAbout,
    contact: staticContact,
    resume: staticResume,
    projects: staticProjects,
    skills: staticSkills,
    achievements: staticAchievements,
    certificates: staticCertificates,
  });

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'about', 'projects', 'skills', 'experience', 'education', 'certificates', 'achievements', 'resume', 'contact'
  // Audio player state
  const playlist = [
    { title: 'Lofi Coding Session', artist: 'Chill Beats', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3' },
    { title: 'Cyberpunk Ambient', artist: 'Synthwave', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-lofi-10825.mp3' },
    { title: 'Coffee & Code', artist: 'Chillhop', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-beat-140881.mp3' }
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(playlist[currentTrackIndex].url);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSkip = (direction) => {
    let nextIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (nextIndex >= playlist.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = playlist.length - 1;

    setCurrentTrackIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[nextIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { text: '$ whoami', type: 'cmd' },
    { text: 'Rishabh Kumar Tiwari - Full Stack Developer & AI Enthusiast', type: 'output' },
    { text: '$ cat bio.txt', type: 'cmd' },
    { text: 'Code. Learn. Build. Repeat. Currently exploring AI, System Design and Web Dev.', type: 'output' },
    { text: '$ status', type: 'cmd' },
    { text: 'SYSTEM ONLINE - Database Synchronized - Ready for hire.', type: 'success' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: null, error: null });

  // Terminal modal / section state
  const [isLoading, setIsLoading] = useState(true);
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideoEffect, setShowVideoEffect] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const triggerVideoEffect = () => {
    setShowVideoEffect(true);
    setTimeout(() => {
      setShowVideoEffect(false);
    }, 4500);
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Generate notifications for items created/updated within 48 hours (max 10 items)
  const generateNotifications = (payload) => {
    const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;
    const now = Date.now();
    const list = [];

    const checkItem = (item, type, titleField, tabTarget) => {
      if (!item) return;
      const dateStr = item.updatedAt || item.createdAt;
      if (!dateStr) return;
      const itemTime = new Date(dateStr).getTime();
      if (isNaN(itemTime)) return;

      const age = now - itemTime;
      if (age >= 0 && age <= FORTY_EIGHT_HOURS_MS) {
        list.push({
          id: item._id || `${type}-${itemTime}-${Math.random()}`,
          type,
          title: item[titleField] || item.name || 'New Item',
          timestamp: dateStr,
          tabTarget,
          rawTime: itemTime,
        });
      }
    };

    if (Array.isArray(payload.projects)) {
      payload.projects.forEach(p => checkItem(p, 'Project', 'title', 'projects'));
    }
    if (Array.isArray(payload.skills)) {
      payload.skills.forEach(s => checkItem(s, 'Skill', 'name', 'skills'));
    }
    if (Array.isArray(payload.achievements)) {
      payload.achievements.forEach(a => checkItem(a, 'Achievement', 'title', 'achievements'));
    }
    if (Array.isArray(payload.certificates)) {
      payload.certificates.forEach(c => checkItem(c, 'Certificate', 'title', 'certificates'));
    }
    if (payload.profile) {
      checkItem(payload.profile, 'Profile', 'name', 'about');
    }

    list.sort((a, b) => b.rawTime - a.rawTime);
    setNotifications(list.slice(0, 10));
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Synchronize Live Data continuous fetch
  useEffect(() => {
    let isMounted = true;
    async function fetchLive() {
      try {
        const payload = await getPortfolioData();
        if (!isMounted) return;

        generateNotifications(payload);

        const resolvedProfile = payload.profile || {};
        const incomingResume = resolvedProfile.resume || {};
        const resolvedResume = {
          ...staticResume,
          ...incomingResume,
          highlights: Array.isArray(incomingResume.highlights) && incomingResume.highlights.length > 0
            ? incomingResume.highlights
            : staticResume.highlights,
          resumePdfLink: incomingResume.resumePdfLink || incomingResume.resumeLink || staticResume.resumePdfLink,
          resumeDocLink: incomingResume.resumeDocLink || staticResume.resumeDocLink || '',
        };

        setData({
          profile: {
            name: resolvedProfile.name || staticProfile.name,
            title: resolvedProfile.title || staticProfile.title,
            introduction: resolvedProfile.introduction || staticProfile.introduction,
            highlights: resolvedProfile.highlights || staticProfile.highlights || [],
            email: resolvedProfile.email || staticProfile.email,
            phone: resolvedProfile.phone || staticProfile.phone,
            github: resolvedProfile.github || staticProfile.github,
            linkedin: resolvedProfile.linkedin || staticProfile.linkedin,
            twitter: resolvedProfile.twitter || staticProfile.twitter,
            profilePhoto: resolvedProfile.profilePhoto || staticProfile.profilePhoto,
          },
          about: resolvedProfile.about || staticAbout,
          contact: resolvedProfile.contact || staticContact,
          resume: resolvedResume,
          projects: Array.isArray(payload.projects) && payload.projects.length > 0 ? payload.projects : staticProjects,
          skills: (() => {
            const dbSkills = Array.isArray(payload.skills) ? payload.skills : [];
            const mergedMap = new Map();
            staticSkills.forEach(s => s && s.name && mergedMap.set(s.name.toLowerCase(), s));
            dbSkills.forEach(s => s && s.name && mergedMap.set(s.name.toLowerCase(), s));
            return Array.from(mergedMap.values());
          })(),
          achievements: Array.isArray(payload.achievements) && payload.achievements.length > 0 ? payload.achievements : staticAchievements,
          certificates: Array.isArray(payload.certificates) && payload.certificates.length > 0 ? payload.certificates : staticCertificates,
        });
      } catch (err) {
        // Keeps static fallback active silently
      }
    }

    fetchLive();
  }, []);

  // Clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global Keyboard Shortcut: Ctrl + K (or Cmd + K) opens Terminal Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowTerminalModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Terminal Handler
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, { text: `$ ${terminalInput}`, type: 'cmd' }];

    if (cmd === 'help') {
      newLogs.push({ text: 'Available commands: help, clear, whoami, skills, projects, contact, resume, sudo', type: 'output' });
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'whoami') {
      newLogs.push({ text: `${data.profile.name} - ${data.profile.title}`, type: 'output' });
    } else if (cmd === 'skills') {
      newLogs.push({ text: `Skills Loaded: ${data.skills.map(s => s.name).join(', ')}`, type: 'output' });
    } else if (cmd === 'projects') {
      newLogs.push({ text: `Featured: ${data.projects.map(p => p.title).join(' | ')}`, type: 'output' });
    } else if (cmd === 'contact') {
      newLogs.push({ text: `Email: ${data.profile.email} | LinkedIn: ${data.profile.linkedin}`, type: 'output' });
    } else if (cmd === 'sudo' || cmd.startsWith('sudo')) {
      newLogs.push({ text: 'Permission denied: Rishabh rules this system!', type: 'error' });
    } else {
      newLogs.push({ text: `Command not found: ${cmd}. Type "help" for commands.`, type: 'error' });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null, error: null });
    try {
      await sendContactMessage(formData);
      setFormStatus({ loading: false, success: 'Message sent successfully! I will get back to you soon.', error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setFormStatus({ loading: false, success: null, error: err.message || 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="swift-os-root">
      {/* INITIAL RANDOMIZED LOADING ANIMATION */}
      {isLoading && <RandomLoader onFinish={() => setIsLoading(false)} />}

      {/* OS TOP HEADER */}
      <header className="swift-header">
        <div className="swift-header-left">
          <button 
            className="swift-mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="swift-os-logo">
            <Laptop size={18} className="swift-brand-icon" />
            <span className="swift-os-title">RISHABH</span>
            <span className="swift-os-version">v1.0.0</span>
          </div>
          <button 
            className="swift-terminal-btn" 
            onClick={() => setShowTerminalModal(true)}
          >
            <Terminal size={14} />
            <span>Terminal</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>

        <div className="swift-header-center">
          <Clock size={13} />
          <span>{currentDate}</span>
          <span className="swift-dot">•</span>
          <span className="swift-time">{currentTime}</span>
        </div>

        <div className="swift-header-right">
          <button 
            className={`swift-effect-btn ${showVideoEffect ? 'active' : ''}`} 
            onClick={triggerVideoEffect}
            title="Trigger Matrix Video Effect"
          >
            <Tv size={14} />
            <span>FX Mode</span>
          </button>
          <div className="relative">
            <button 
              className="swift-icon-btn relative" 
              title="Notifications"
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            >
              <Bell size={15} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-black border border-stone-900">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* NOTIFICATION DROPDOWN MENU */}
            {showNotificationsDropdown && (
              <div 
                className="absolute right-0 top-9 z-50 w-80 rounded-lg border border-[var(--swift-border-dark)] bg-[var(--swift-panel)] p-3 shadow-2xl text-[var(--swift-text-main)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-[var(--swift-border)] pb-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--swift-brown)]">
                    System Updates ({notifications.length})
                  </span>
                  <button 
                    onClick={() => setShowNotificationsDropdown(false)}
                    className="text-[var(--swift-text-muted)] hover:text-stone-900"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-3 text-center text-xs text-[var(--swift-text-muted)] italic">
                      No new updates in the last 48 hours.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        onClick={() => {
                          handleNavClick(notif.tabTarget);
                          setShowNotificationsDropdown(false);
                        }}
                        className="group flex flex-col p-2 rounded bg-[var(--swift-bg-card)] border border-[var(--swift-border)] hover:border-[var(--swift-brown)] cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--swift-accent-green)]">
                            + {notif.type} Added / Updated
                          </span>
                          <span className="text-[9px] text-[var(--swift-text-muted)]">
                            {formatTimeAgo(notif.timestamp)}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[var(--swift-text-main)] group-hover:text-[var(--swift-brown)] mt-0.5">
                          {notif.title}
                        </div>
                        <div className="text-[9px] text-[var(--swift-text-muted)] mt-1">
                          Added: {new Date(notif.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="swift-user-badge">
            <div className="swift-avatar-tiny">
              {data.profile.profilePhoto ? (
                <img src={data.profile.profilePhoto} alt={data.profile.name} />
              ) : (
                <div className="swift-avatar-fallback">R</div>
              )}
            </div>
            <div className="swift-user-info">
              <span className="swift-user-name">{data.profile.name.split(' ')[0]}</span>
              <span className="swift-user-status"><span className="swift-status-dot"></span> Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DROPDOWN NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="swift-mobile-drawer">
          <div className="swift-mobile-drawer-header">NAVIGATION MENU</div>
          <div className="swift-mobile-drawer-grid">
            <button className={`swift-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')}>
              <Laptop size={16} /> <span>Dashboard</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>
              <User size={16} /> <span>About Me</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => handleNavClick('projects')}>
              <FolderGit2 size={16} /> <span>Projects</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => handleNavClick('skills')}>
              <Code size={16} /> <span>Skills</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => handleNavClick('experience')}>
              <Briefcase size={16} /> <span>Experience</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => handleNavClick('certificates')}>
              <Award size={16} /> <span>Certificates</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => handleNavClick('achievements')}>
              <Trophy size={16} /> <span>Achievements</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => handleNavClick('resume')}>
              <FileText size={16} /> <span>Resume</span>
            </button>
            <button className={`swift-nav-item ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => handleNavClick('contact')}>
              <Mail size={16} /> <span>Contact</span>
            </button>
          </div>
        </div>
      )}

      {/* OS MAIN CONTAINER */}
      <div className="swift-body">
        {/* SIDEBAR NAVIGATION */}
        <aside className="swift-sidebar">
          {/* PROFILE CARD */}
          <div className="swift-profile-card">
            <div 
              className="swift-profile-img-container cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowPhotoModal(true)}
              title="Click to view full photo"
            >
              {data.profile.profilePhoto ? (
                <img src={data.profile.profilePhoto} alt={data.profile.name} className="swift-profile-img" />
              ) : (
                <div className="swift-profile-avatar-large">
                  {data.profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <h2 className="swift-profile-name">{data.profile.name}</h2>
            <div className="swift-available-badge">
              <span className="swift-status-dot"></span> Available for work
            </div>
          </div>

          {/* SIDEBAR NAV LINKS */}
          <div className="swift-nav-section">
            <div className="swift-nav-header">NAVIGATION</div>
            <nav className="swift-nav">
              <button 
                className={`swift-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <Laptop size={16} /> <span>Dashboard</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                <User size={16} /> <span>About Me</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                <FolderGit2 size={16} /> <span>Projects</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => handleNavClick('skills')}
              >
                <Code size={16} /> <span>Skills</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => handleNavClick('experience')}
              >
                <Briefcase size={16} /> <span>Experience</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
                onClick={() => handleNavClick('certificates')}
              >
                <Award size={16} /> <span>Certificates</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => handleNavClick('achievements')}
              >
                <Trophy size={16} /> <span>Achievements</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
                onClick={() => handleNavClick('resume')}
              >
                <FileText size={16} /> <span>Resume</span>
              </button>
              <button 
                className={`swift-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                <Mail size={16} /> <span>Contact</span>
              </button>
            </nav>
          </div>


          {/* SYSTEM STATUS */}
          <div className="swift-widget-box">
            <div className="swift-widget-title">SYSTEM STATUS</div>
            <div className="swift-status-row">
              <span>Focus Mode</span>
              <span className="swift-badge-on">ON</span>
            </div>
            <div className="swift-status-row">
              <span>Projects</span>
              <span className="swift-val">{data.projects.length}</span>
            </div>
            <div className="swift-status-row">
              <span>Skills</span>
              <span className="swift-val">{data.skills.length}</span>
            </div>
            <div className="swift-status-row">
              <span>Coffee Level</span>
              <div className="swift-progress-mini">
                <div className="swift-progress-fill" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="swift-widget-box">
            <div className="swift-widget-title">QUICK LINKS</div>
            <div className="swift-quick-links">
              {data.profile.github && (
                <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="swift-quick-link">
                  <Github size={14} /> <span>GitHub</span> <ExternalLink size={12} />
                </a>
              )}
              {data.profile.linkedin && (
                <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="swift-quick-link">
                  <Linkedin size={14} /> <span>LinkedIn</span> <ExternalLink size={12} />
                </a>
              )}
              {data.profile.twitter && (
                <a href={data.profile.twitter} target="_blank" rel="noopener noreferrer" className="swift-quick-link">
                  <Twitter size={14} /> <span>Twitter / X</span> <ExternalLink size={12} />
                </a>
              )}
              <a href={`mailto:${data.profile.email}`} className="swift-quick-link">
                <Mail size={14} /> <span>Email</span> <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* NOW PLAYING AUDIO WIDGET */}
          <div className="swift-widget-box">
            <div className="swift-widget-title">NOW PLAYING</div>
            <div className="swift-now-playing-content p-2 space-y-2">
              <div>
                <div className="text-xs font-semibold text-[var(--swift-text-main)] truncate">
                  {playlist[currentTrackIndex].title.toLowerCase()}
                </div>
                <div className="text-[10px] text-[var(--swift-text-muted)] truncate">
                  {playlist[currentTrackIndex].artist.toLowerCase()}
                </div>
              </div>

              {/* RETRO WAVEFORM VISUALIZER */}
              <div className="my-2 py-1 px-1 flex items-center justify-between gap-[2px] h-6 overflow-hidden">
                {[40, 65, 30, 85, 45, 95, 60, 35, 75, 50, 90, 40, 70, 55, 80, 35, 60, 45, 75, 50, 85, 30, 65, 40, 70].map((height, i) => (
                  <span
                    key={i}
                    className="w-[2px] bg-[var(--swift-text-muted)] opacity-70 rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${Math.max(15, (height + (i % 3 * 10)) % 100)}%` : '20%',
                      opacity: isPlaying ? 0.85 : 0.3,
                      animation: isPlaying ? `pulse 1.2s ease-in-out infinite ${i * 0.05}s` : 'none'
                    }}
                  />
                ))}
              </div>

              {/* CONTROLS */}
              <div className="flex items-center justify-center gap-4 text-[var(--swift-text-main)] pt-1">
                <button 
                  onClick={() => handleSkip('prev')} 
                  className="hover:text-[var(--swift-brown)] transition"
                  title="Previous Track"
                >
                  <SkipBack size={14} />
                </button>
                <button 
                  onClick={togglePlay} 
                  className="hover:scale-110 text-[var(--swift-text-main)] hover:text-[var(--swift-brown)] transition"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button 
                  onClick={() => handleSkip('next')} 
                  className="hover:text-[var(--swift-brown)] transition"
                  title="Next Track"
                >
                  <SkipForward size={14} />
                </button>
              </div>
            </div>
          </div>

        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="swift-main-content">
          {/* TAB 1: DASHBOARD (PRIMARY OS OVERVIEW) */}
          {activeTab === 'dashboard' && (
            <div className="swift-grid-dashboard">
              {/* HERO & SYSTEM INFO SPLIT */}
              <div className="swift-dashboard-row hero-row">
                {/* WELCOME SH PANEL */}
                <div className="swift-panel welcome-panel">
                  <div className="swift-window-controls">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="swift-window-path">~/welcome.sh</span>
                  </div>
                  <div className="swift-welcome-content">
                    <h1 className="swift-greeting">
                      GOOD AFTERNOON, <br />
                      <span className="swift-highlight-name">{data.profile.name.split(' ')[0].toUpperCase()}.</span>
                    </h1>
                    <div className="swift-subtitle">{data.profile.title}</div>
                    <div className="swift-divider-dash"></div>
                    <p className="swift-bio-desc">
                      {data.profile.introduction}
                    </p>
                    <div className="swift-terminal-prompt">
                      <span className="swift-prompt-symbol">~ $</span> <span className="swift-cursor-blink">▌</span>
                    </div>
                  </div>
                </div>

                {/* SYSTEM INFO WIDGET */}
                <div className="swift-panel system-info-panel">
                  <div className="swift-window-controls compact">
                    <span className="swift-window-path">../system-info</span>
                    <div className="swift-controls-right">
                      <span className="dot min"></span>
                      <span className="dot max"></span>
                    </div>
                  </div>
                  <div className="swift-sysinfo-table">
                    <div className="swift-sys-row">
                      <span className="swift-label">Name</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">{data.profile.name}</span>
                    </div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Location</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">India</span>
                    </div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Role</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">Full Stack Developer</span>
                    </div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Experience</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">1+ Years</span>
                    </div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Projects</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">{data.projects.length}+ Completed</span>
                    </div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Availability</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val highlight-green">Open to Work</span>
                    </div>
                    <div className="swift-divider-dash"></div>
                    <div className="swift-sys-row">
                      <span className="swift-label">Skills Loaded</span>
                      <span className="swift-colon">:</span>
                      <span className="swift-val">100%</span>
                    </div>
                    <div className="swift-progress-bar-full">
                      <div className="swift-progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                    <button className="swift-action-btn" onClick={() => setActiveTab('skills')}>
                      &gt; open skills.exe
                    </button>
                  </div>
                </div>
              </div>

              {/* QUICK APP SHORTCUTS */}
              <div className="swift-shortcuts-grid">
                <div className="swift-shortcut-card" onClick={() => setActiveTab('skills')}>
                  <div className="swift-shortcut-icon"><Code size={20} /></div>
                  <div className="swift-shortcut-text">
                    <div className="swift-sc-title">Code</div>
                    <div className="swift-sc-sub">Build & Debug</div>
                  </div>
                </div>
                <div className="swift-shortcut-card" onClick={() => setActiveTab('projects')}>
                  <div className="swift-shortcut-icon"><FolderGit2 size={20} /></div>
                  <div className="swift-shortcut-text">
                    <div className="swift-sc-title">Projects</div>
                    <div className="swift-sc-sub">Things I've Built</div>
                  </div>
                </div>
                <div className="swift-shortcut-card" onClick={() => setActiveTab('resume')}>
                  <div className="swift-shortcut-icon"><FileText size={20} /></div>
                  <div className="swift-shortcut-text">
                    <div className="swift-sc-title">Resume</div>
                    <div className="swift-sc-sub">My Background</div>
                  </div>
                </div>
                <div className="swift-shortcut-card" onClick={() => setActiveTab('contact')}>
                  <div className="swift-shortcut-icon"><Mail size={20} /></div>
                  <div className="swift-shortcut-text">
                    <div className="swift-sc-title">Contact</div>
                    <div className="swift-sc-sub">Get In Touch</div>
                  </div>
                </div>
                <div className="swift-shortcut-card" onClick={() => setActiveTab('achievements')}>
                  <div className="swift-shortcut-icon"><Trophy size={20} /></div>
                  <div className="swift-shortcut-text">
                    <div className="swift-sc-title">Achievements</div>
                    <div className="swift-sc-sub">Awards & Honors</div>
                  </div>
                </div>
              </div>

              {/* FEATURED PROJECTS & TECH STACK DUAL COLUMN */}
              <div className="swift-dashboard-row dual-row">
                {/* FEATURED PROJECTS PANEL */}
                <div className="swift-panel">
                  <div className="swift-panel-header">
                    <div className="swift-panel-title">
                      <span className="swift-dots">•••</span> Featured Projects
                    </div>
                    <button className="swift-link-btn" onClick={() => setActiveTab('projects')}>
                      view all &gt;
                    </button>
                  </div>
                  <div className="swift-projects-list">
                    {data.projects.slice(0, 3).map((proj, idx) => (
                      <div className="swift-project-row-item" key={idx} onClick={() => setSelectedProject(proj)}>
                        {proj.image ? (
                          <img src={proj.image} alt={proj.title} className="swift-proj-thumb" />
                        ) : (
                          <div className="swift-proj-thumb-placeholder">
                            <FolderGit2 size={24} />
                          </div>
                        )}
                        <div className="swift-proj-info">
                          <div className="swift-proj-header">
                            <span className="swift-proj-name">{proj.title}</span>
                            <span className="swift-live-tag">Live</span>
                          </div>
                          <p className="swift-proj-desc">{proj.description}</p>
                          <div className="swift-proj-tags">
                            {proj.techStack && proj.techStack.map((tech, tIdx) => (
                              <span key={tIdx} className="swift-tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight size={18} className="swift-chevron" />
                      </div>
                    ))}
                  </div>
                  <div className="swift-panel-footer">
                    <button className="swift-action-btn" onClick={() => setActiveTab('projects')}>
                      &gt; open projects.exe
                    </button>
                  </div>
                </div>

                {/* TECH STACK PANEL */}
                <div className="swift-panel">
                  <div className="swift-panel-header">
                    <div className="swift-panel-title">
                      <span className="swift-dots">•••</span> Tech Stack
                    </div>
                  </div>
                  <div className="swift-skills-list scrollable">
                    {data.skills.map((skill, sIdx) => (
                      <div className="swift-skill-bar-row" key={sIdx}>
                        <div className="swift-skill-info">
                          {skill.logo ? (
                            <img src={skill.logo} alt={skill.name} className="swift-skill-icon-img" />
                          ) : (
                            <Code size={16} />
                          )}
                          <span className="swift-skill-name">{skill.name}</span>
                        </div>
                        <div className="swift-skill-track">
                          <div className="swift-skill-fill" style={{ width: `${80 + (sIdx % 3) * 5}%` }}></div>
                        </div>
                        <span className="swift-skill-pct">{80 + (sIdx % 3) * 5}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="swift-panel-footer">
                    <button className="swift-action-btn" onClick={() => setActiveTab('skills')}>
                      &gt; open skills.exe
                    </button>
                  </div>

                  {/* NOW PLAYING INTEGRATED WIDGET WITH AUDIO DIAGNOSTICS */}
                  <div className="swift-techstack-music-block">
                    <div className="swift-tsm-header">
                      <span className="swift-tsm-title">NOW PLAYING &amp; AUDIO DIAGNOSTICS</span>
                      <div className="swift-soundwave">
                        <span className={`swift-bar ${isPlaying ? 'anim' : ''}`}></span>
                        <span className={`swift-bar ${isPlaying ? 'anim' : ''}`}></span>
                        <span className={`swift-bar ${isPlaying ? 'anim' : ''}`}></span>
                        <span className={`swift-bar ${isPlaying ? 'anim' : ''}`}></span>
                        <span className={`swift-bar ${isPlaying ? 'anim' : ''}`}></span>
                      </div>
                    </div>
                    <div className="swift-tsm-body">
                      <div className="swift-tsm-info">
                        <div className="swift-tsm-track">{playlist[currentTrackIndex].title}</div>
                        <div className="swift-tsm-artist">{playlist[currentTrackIndex].artist} • 320 kbps MP3</div>
                      </div>
                      <div className="swift-music-controls">
                        <button className="swift-music-btn" onClick={() => handleSkip('prev')} title="Previous Track"><SkipBack size={13} /></button>
                        <button className="swift-music-btn main" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                        </button>
                        <button className="swift-music-btn" onClick={() => handleSkip('next')} title="Next Track"><SkipForward size={13} /></button>
                      </div>
                    </div>

                    {/* AUDIO SPECTRUM DIAGNOSTICS VISUALIZER */}
                    <div className="swift-audio-diag-bar">
                      <div className="swift-diag-label">SPECTRUM DIAGNOSTICS:</div>
                      <div className="swift-diag-spectrum">
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '70%' : '20%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '90%' : '15%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '40%' : '30%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '100%' : '25%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '60%' : '10%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '85%' : '20%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '50%' : '15%' }}></span>
                        <span className={`swift-spec-col ${isPlaying ? 'active' : ''}`} style={{ height: isPlaying ? '95%' : '35%' }}></span>
                      </div>
                      <div className="swift-diag-status">{isPlaying ? '44.1 kHz | STEREO' : 'IDLE'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE & RECENT ACTIVITY DUAL COLUMN */}
              <div className="swift-dashboard-row dual-row">
                {/* EXPERIENCE TIMELINE */}
                <div className="swift-panel">
                  <div className="swift-panel-header">
                    <div className="swift-panel-title">
                      <span className="swift-dots">•••</span> Experience Timeline
                    </div>
                  </div>
                  <div className="swift-timeline-compact">
                    <div className="swift-tl-item">
                      <div className="swift-tl-icon"><Briefcase size={16} /></div>
                      <div className="swift-tl-content">
                        <div className="swift-tl-date">2024 - Present</div>
                        <div className="swift-tl-title">Full Stack Developer (Freelance)</div>
                        <div className="swift-tl-desc">Building scalable web apps and AI tools for clients.</div>
                      </div>
                    </div>
                    <div className="swift-tl-item">
                      <div className="swift-tl-icon"><Laptop size={16} /></div>
                      <div className="swift-tl-content">
                        <div className="swift-tl-date">2024</div>
                        <div className="swift-tl-title">Web Developer Intern</div>
                        <div className="swift-tl-desc">Worked on real-world projects and collaborative dev workflows.</div>
                      </div>
                    </div>
                    <div className="swift-tl-item">
                      <div className="swift-tl-icon"><Code size={16} /></div>
                      <div className="swift-tl-content">
                        <div className="swift-tl-date">2023</div>
                        <div className="swift-tl-title">Open Source Contributor</div>
                        <div className="swift-tl-desc">Contributed to open source software and algorithm repos.</div>
                      </div>
                    </div>
                  </div>
                  <div className="swift-panel-footer">
                    <button className="swift-action-btn" onClick={() => setActiveTab('experience')}>
                      &gt; open experience.log
                    </button>
                  </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="swift-panel">
                  <div className="swift-panel-header">
                    <div className="swift-panel-title">
                      <span className="swift-dots">•••</span> Recent Activity
                    </div>
                  </div>
                  <div className="swift-activity-list">
                    <div className="swift-act-item">
                      <div className="swift-act-circle"></div>
                      <div className="swift-act-text">
                        <div className="swift-act-title">Updated project "Portfolio UI"</div>
                        <div className="swift-act-time">2 min ago</div>
                      </div>
                      <Plus size={14} className="swift-act-status" />
                    </div>
                    <div className="swift-act-item">
                      <div className="swift-act-circle"></div>
                      <div className="swift-act-text">
                        <div className="swift-act-title">Pushed to main branch</div>
                        <div className="swift-act-time">1 hour ago</div>
                      </div>
                      <Plus size={14} className="swift-act-status" />
                    </div>
                    <div className="swift-act-item">
                      <div className="swift-act-circle"></div>
                      <div className="swift-act-text">
                        <div className="swift-act-title">Database Auto-Sync Verified</div>
                        <div className="swift-act-time">3 hours ago</div>
                      </div>
                      <Check size={14} className="swift-act-status ok" />
                    </div>
                    <div className="swift-act-item">
                      <div className="swift-act-circle"></div>
                      <div className="swift-act-text">
                        <div className="swift-act-title">Added new skill components</div>
                        <div className="swift-act-time">5 hours ago</div>
                      </div>
                      <Plus size={14} className="swift-act-status" />
                    </div>
                  </div>
                  <div className="swift-panel-footer">
                    <button className="swift-action-btn" onClick={() => setActiveTab('dashboard')}>
                      &gt; open activity.log
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTTOM INTERACTIVE TERMINAL & CONTACT CTA */}
              <div className="swift-dashboard-row dual-row">
                <div className="swift-panel terminal-panel">
                  <div className="swift-panel-header">
                    <div className="swift-panel-title">
                      <span className="swift-dots">•••</span> Terminal
                    </div>
                  </div>
                  <div className="swift-terminal-screen">
                    {terminalLogs.map((log, lIdx) => (
                      <div key={lIdx} className={`swift-term-line ${log.type}`}>
                        {log.text}
                      </div>
                    ))}
                    <form onSubmit={handleTerminalSubmit} className="swift-term-input-line">
                      <span>~ $</span>
                      <input 
                        type="text" 
                        value={terminalInput} 
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type 'help' for commands..."
                      />
                    </form>
                  </div>
                </div>

                <div className="swift-panel cta-panel">
                  <div className="swift-cta-content">
                    <h3>Let's Build Something!</h3>
                    <p>Have a project in mind or want to collaborate? I'm just a message away.</p>
                    <button className="swift-main-cta-btn" onClick={() => setActiveTab('contact')}>
                      &gt; start conversation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === 'about' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>About Me</h2>
                <span className="swift-view-subtitle">Background, Bio & Technical Philosophy</span>
              </div>
              <div className="swift-panel p-6">
                <div className="swift-about-grid flex flex-col md:flex-row gap-6 items-start">
                  {data.about?.photo && (
                    <div className="w-40 h-48 rounded-xl border border-[var(--swift-border)] overflow-hidden shrink-0 bg-[var(--swift-bg-card)]">
                      <img 
                        src={data.about.photo} 
                        alt={data.profile.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div className="swift-about-text flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-sm text-[var(--swift-brown)] uppercase tracking-wider mb-1">Summary</h3>
                      <p className="swift-para">{data.about.summary || data.profile.introduction}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-sm text-[var(--swift-brown)] uppercase tracking-wider mb-1">Interests & Specializations</h3>
                      <p className="swift-para">{data.about.interests || "Passionate about full-stack engineering, system design, and AI integrations."}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-sm text-[var(--swift-brown)] uppercase tracking-wider mb-1">Technical Journey</h3>
                      <p className="swift-para">{data.about.description || "Started coding with core computer science fundamentals in C++ and algorithm optimization, eventually expanding to full-stack web applications."}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Projects Catalog</h2>
                <span className="swift-view-subtitle">Live Applications, Tools & Systems</span>
              </div>
              <div className="swift-projects-grid">
                {data.projects.map((proj, idx) => (
                  <div className="swift-panel swift-project-card" key={idx}>
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="swift-card-img" />
                    ) : (
                      <div className="swift-card-img-placeholder"><FolderGit2 size={36} /></div>
                    )}
                    <div className="swift-card-body">
                      <div className="swift-card-header">
                        <h3>{proj.title}</h3>
                        <span className="swift-live-tag">{proj.status || 'Live'}</span>
                      </div>
                      <p className="swift-card-desc">{proj.description}</p>
                      <div className="swift-proj-tags mt-3">
                        {proj.techStack && proj.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="swift-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="swift-card-actions">
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="swift-btn-sm">
                            <Github size={14} /> Code
                          </a>
                        )}
                        {proj.demo && (
                          <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="swift-btn-sm primary">
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Skills & Technologies</h2>
                <span className="swift-view-subtitle">Loaded Programming Languages, Frameworks & Tools</span>
              </div>
              <div className="swift-skills-full-grid">
                {data.skills.map((skill, idx) => (
                  <div className="swift-panel swift-skill-tile" key={idx}>
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className="swift-skill-icon-large" />
                    ) : (
                      <Code size={32} />
                    )}
                    <div className="swift-skill-tile-name">{skill.name}</div>
                    <p className="swift-skill-tile-desc">{skill.description || 'Proficient'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE & EDUCATION */}
          {(activeTab === 'experience' || activeTab === 'education') && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Experience & Education</h2>
                <span className="swift-view-subtitle">Career Path & Academic Credentials</span>
              </div>
              <div className="swift-panel p-6">
                <div className="swift-experience-full">
                  <div className="swift-exp-card">
                    <div className="swift-exp-header">
                      <GraduationCap size={20} />
                      <div>
                        <h3>Lovely Professional University</h3>
                        <span className="swift-exp-role">Bachelor of Technology - Computer Science and Engineering (2023 - 2027)</span>
                      </div>
                    </div>
                    <p className="swift-para mt-2">Focused on Data Structures, Algorithms, Web Technologies, Database Systems, and Software Engineering principles.</p>
                  </div>

                  <div className="swift-exp-card mt-6">
                    <div className="swift-exp-header">
                      <Briefcase size={20} />
                      <div>
                        <h3>Full Stack Web Developer</h3>
                        <span className="swift-exp-role">Freelance & Independent Projects (2024 - Present)</span>
                      </div>
                    </div>
                    <p className="swift-para mt-2">Architecting, developing, and deploying web applications utilizing React, Node.js, Django, and MongoDB/MySQL database integrations.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Certificates & Credentials</h2>
                <span className="swift-view-subtitle">Verified Technical Achievements</span>
              </div>
              <div className="swift-cert-grid">
                {data.certificates.map((cert, idx) => (
                  <div className="swift-panel swift-cert-card" key={idx}>
                    <div className="swift-cert-icon"><Award size={24} /></div>
                    <div className="swift-cert-info">
                      <h4>{cert.title}</h4>
                      <div className="swift-cert-issuer">{cert.issuer} • {cert.date}</div>
                      {cert.credentialLink && (
                        <a href={cert.credentialLink} target="_blank" rel="noopener noreferrer" className="swift-cert-link">
                          Verify Credential <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Honors & Achievements</h2>
                <span className="swift-view-subtitle">Hackathons, Awards & Milestones</span>
              </div>
              <div className="swift-achieve-grid">
                {data.achievements.map((ach, idx) => (
                  <div className="swift-panel swift-achieve-card" key={idx}>
                    <div className="swift-achieve-icon"><Trophy size={28} /></div>
                    <div className="swift-achieve-body">
                      <h3>{ach.title}</h3>
                      <div className="swift-achieve-sub">{ach.subtitle} • {ach.year}</div>
                      <p className="swift-achieve-desc">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: RESUME */}
          {activeTab === 'resume' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Resume</h2>
                <span className="swift-view-subtitle">Download & Preview Curriculum Vitae</span>
              </div>
              <div className="swift-panel p-6 text-center">
                <h3>{data.profile.name} - Resume</h3>
                <p className="swift-para max-w-lg mx-auto mt-2">
                  Download a copy of my resume in PDF or DOC format below.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  {(data.resume.resumePdfLink || data.resume.resumeLink) ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const url = data.resume.resumePdfLink || data.resume.resumeLink;
                        const filename = `${data.profile.name.replace(/\s+/g, '_')}_Resume.pdf`;

                        if (url.startsWith('data:')) {
                          const res = await fetch(url);
                          const blob = await res.blob();
                          const blobUrl = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
                        } else {
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = filename;
                          link.target = '_blank';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      }}
                      className="swift-main-cta-btn flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={16} /> Download PDF
                    </button>
                  ) : null}

                  {data.resume.resumeDocLink ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const url = data.resume.resumeDocLink;
                        const filename = `${data.profile.name.replace(/\s+/g, '_')}_Resume.docx`;

                        if (url.startsWith('data:')) {
                          const res = await fetch(url);
                          const blob = await res.blob();
                          const blobUrl = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
                        } else {
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = filename;
                          link.target = '_blank';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      }}
                      className="swift-main-cta-btn secondary flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={16} /> Download DOCX
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: CONTACT */}
          {activeTab === 'contact' && (
            <div className="swift-tab-view">
              <div className="swift-view-header">
                <h2>Contact Me</h2>
                <span className="swift-view-subtitle">Get In Touch Directly</span>
              </div>
              <div className="swift-panel p-6">
                <div className="swift-contact-grid">
                  <div className="swift-contact-info-side">
                    <h3>Contact Information</h3>
                    <p className="swift-para">{data.contact.copy || "Feel free to reach out for projects, collaborations, or just a chat!"}</p>
                    
                    <div className="swift-contact-methods">
                      <div className="swift-cm-item">
                        <Mail size={18} />
                        <span>{data.profile.email}</span>
                      </div>
                      {data.profile.phone && (
                        <div className="swift-cm-item">
                          <Laptop size={18} />
                          <span>{data.profile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleContactSubmit} className="swift-contact-form">
                    {formStatus.success && (
                      <div className="swift-alert success">
                        <CheckCircle2 size={16} /> {formStatus.success}
                      </div>
                    )}
                    {formStatus.error && (
                      <div className="swift-alert error">
                        <X size={16} /> {formStatus.error}
                      </div>
                    )}
                    <div className="swift-form-group">
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="swift-form-group">
                      <label>Your Email</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div className="swift-form-group">
                      <label>Subject</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.subject} 
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Collaboration" 
                      />
                    </div>
                    <div className="swift-form-group">
                      <label>Message</label>
                      <textarea 
                        rows="4" 
                        required 
                        value={formData.message} 
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>
                    <button type="submit" className="swift-main-cta-btn" disabled={formStatus.loading}>
                      {formStatus.loading ? 'Sending...' : 'Send Message'} <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="swift-footer">
        <div className="swift-footer-left">© 2026 {data.profile.name}</div>
        <div className="swift-footer-center">Powered by Caffeine &amp; Creativity ☕</div>
        <div className="swift-footer-right"></div>

        <Link
          to="/admin/login"
          className="fixed bottom-3 right-4 z-50 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-stone-500/70 hover:text-stone-800 transition-colors"
        >
          rishabhtcodes
        </Link>
      </footer>


      {/* MODAL: FULL TERMINAL */}
      {showTerminalModal && (
        <div className="swift-modal-overlay" onClick={() => setShowTerminalModal(false)}>
          <div className="swift-modal-window terminal-window" onClick={(e) => e.stopPropagation()}>
            <div className="swift-modal-header">
              <span>Terminal - RISHABH</span>
              <button onClick={() => setShowTerminalModal(false)}><X size={16} /></button>
            </div>
            <div className="swift-modal-body">
              <div className="swift-terminal-screen modal-term">
                {terminalLogs.map((log, lIdx) => (
                  <div key={lIdx} className={`swift-term-line ${log.type}`}>
                    {log.text}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="swift-term-input-line">
                  <span>~ $</span>
                  <input 
                    type="text" 
                    value={terminalInput} 
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type 'help'..."
                    autoFocus
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PROJECT DETAIL */}
      {selectedProject && (
        <div className="swift-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="swift-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="swift-modal-header">
              <span>{selectedProject.title}</span>
              <button onClick={() => setSelectedProject(null)}><X size={16} /></button>
            </div>
            <div className="swift-modal-body">
              {selectedProject.image && (
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <p className="swift-para">{selectedProject.description}</p>
              <div className="swift-proj-tags mt-4">
                {selectedProject.techStack && selectedProject.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="swift-tag">{tech}</span>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="swift-main-cta-btn secondary">
                    <Github size={14} /> GitHub Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="swift-main-cta-btn">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC CYBER MATRIX RAIN & CRT ANIMATION OVERLAY */}
      {showVideoEffect && (
        <MatrixRainOverlay onClose={() => setShowVideoEffect(false)} />
      )}

      {/* Photo Modal Preview */}
      <PhotoModal 
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        photoUrl={data.profile.profilePhoto}
        name={data.profile.name}
      />
    </div>
  );
}

function MatrixRainOverlay({ onClose }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ987654321';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="swift-video-effect-overlay">
      <div className="swift-video-crt-lines"></div>
      <div className="swift-video-scanline"></div>
      
      <canvas ref={canvasRef} className="swift-matrix-canvas" />

      <div className="swift-matrix-hero-text">
        <h1 className="swift-glitch-text" data-text="SYSTEM OVERDRIVE">SYSTEM OVERDRIVE</h1>
        <p className="swift-glitch-sub">&gt; INITIALIZING QUANTUM CYBER CORE // PORTFOLIO FX &lt;</p>
      </div>

      <div className="swift-video-effect-badge">
        <Zap size={18} className="animate-pulse text-green-400" />
        <div className="swift-video-badge-text">
          <span className="swift-vbt-title">CYBER MATRIX ANIMATION ACTIVE</span>
          <span className="swift-vbt-sub">Auto-restoring system in 4.5 seconds...</span>
        </div>
        <button onClick={onClose} className="swift-fx-close-btn">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
