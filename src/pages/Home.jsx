import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Resume from '../components/Resume';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { apiRequest } from '../lib/api';
import {
  about,
  achievements,
  certificates,
  contact,
  navigationLinks,
  profile,
  projects,
  resume,
  skills,
} from '../data/portfolioData';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState({
    about,
    achievements,
    certificates,
    contact,
    profile,
    projects,
    resume,
    skills,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPortfolioData() {
      try {
        const [profilePayload, projectsPayload, skillsPayload, achievementsPayload, certificatesPayload] = await Promise.all([
          apiRequest('/api/profile'),
          apiRequest('/api/projects'),
          apiRequest('/api/skills'),
          apiRequest('/api/achievements'),
          apiRequest('/api/certificates'),
        ]);

        if (!active) {
          return;
        }

        // Profile may be null if it hasn't been set up yet — fall back to static data for profile
        const resolvedProfile = profilePayload || {};
        const incomingResume = resolvedProfile.resume || {};
        const resolvedResume = {
          ...resume,
          ...incomingResume,
          highlights: Array.isArray(incomingResume.highlights) && incomingResume.highlights.length > 0
            ? incomingResume.highlights
            : resume.highlights,
          resumePdfLink: incomingResume.resumePdfLink || incomingResume.resumeLink || resume.resumePdfLink || resume.resumeLink,
          resumeDocLink: incomingResume.resumeDocLink || resume.resumeDocLink || '',
        };

        setPortfolioData({
          profile: {
            name: resolvedProfile.name || profile.name,
            title: resolvedProfile.title || profile.title,
            introduction: resolvedProfile.introduction || profile.introduction,
            highlights: resolvedProfile.highlights || profile.highlights || [],
            email: resolvedProfile.email || profile.email,
            phone: resolvedProfile.phone || profile.phone,
            github: resolvedProfile.github || profile.github,
            linkedin: resolvedProfile.linkedin || profile.linkedin,
            twitter: resolvedProfile.twitter || profile.twitter,
            profilePhoto: resolvedProfile.profilePhoto || profile.profilePhoto,
          },
          about: resolvedProfile.about || about,
          contact: resolvedProfile.contact || contact,
          resume: resolvedResume,
          projects: Array.isArray(projectsPayload) && projectsPayload.length > 0 ? projectsPayload : projects,
          skills: Array.isArray(skillsPayload) && skillsPayload.length > 0 ? skillsPayload : skills,
          achievements: Array.isArray(achievementsPayload) && achievementsPayload.length > 0 ? achievementsPayload : achievements,
          certificates: Array.isArray(certificatesPayload) && certificatesPayload.length > 0 ? certificatesPayload : certificates,
        });
      } catch (error) {
        console.error('Falling back to static portfolio data:', error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadPortfolioData();

    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400/20 border-t-sky-400"></div>
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-200 uppercase">Loading Space</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar
        links={navigationLinks}
        resumePdfUrl={portfolioData.resume.resumePdfLink || portfolioData.resume.resumeLink}
        resumeDocUrl={portfolioData.resume.resumeDocLink}
        profilePhoto={portfolioData.profile.profilePhoto}
        name={portfolioData.profile.name}
      />
      <main>
        <Hero profile={portfolioData.profile} />
        <About about={portfolioData.about} name={portfolioData.profile.name} />
        <Resume resume={portfolioData.resume} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Certificates certificates={portfolioData.certificates} />
        <Achievements achievements={portfolioData.achievements} />
        <Contact contact={portfolioData.contact} />
      </main>
      <Footer profile={portfolioData.profile} />
    </div>
  );
}
