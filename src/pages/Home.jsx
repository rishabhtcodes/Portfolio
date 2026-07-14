// Home page — skills from DB are merged with static data so new skills appear automatically
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
import { getPortfolioData } from '../lib/api';
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
  // Initialise with real static data — the page renders instantly on first paint
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

  useEffect(() => {
    let active = true;

    async function loadPortfolioData() {
      try {
        // Single request — backend handles Promise.all + in-memory cache
        const payload = await getPortfolioData();

        if (!active) return;

        const resolvedProfile = payload.profile || {};
        const incomingResume = resolvedProfile.resume || {};
        const resolvedResume = {
          ...resume,
          ...incomingResume,
          highlights:
            Array.isArray(incomingResume.highlights) && incomingResume.highlights.length > 0
              ? incomingResume.highlights
              : resume.highlights,
          resumePdfLink:
            incomingResume.resumePdfLink || incomingResume.resumeLink || resume.resumePdfLink || resume.resumeLink,
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
          projects:
            Array.isArray(payload.projects) && payload.projects.length > 0 ? payload.projects : projects,
          skills: (() => {
            const dbSkills = Array.isArray(payload.skills) ? payload.skills : [];
            const mergedMap = new Map();
            skills.forEach(s => {
              if (s && s.name) mergedMap.set(s.name.toLowerCase(), s);
            });
            dbSkills.forEach(s => {
              if (s && s.name) mergedMap.set(s.name.toLowerCase(), s);
            });
            return Array.from(mergedMap.values());
          })(),
          achievements:
            Array.isArray(payload.achievements) && payload.achievements.length > 0 ? payload.achievements : achievements,
          certificates:
            Array.isArray(payload.certificates) && payload.certificates.length > 0 ? payload.certificates : certificates,
        });
      } catch (error) {
        // Backend unreachable (cold start / DB down) — static data already visible, no crash
        console.warn('[Portfolio] Could not load live data, showing static fallback:', error.message);
      }
    }

    loadPortfolioData();

    return () => {
      active = false;
    };
  }, []);

  // No blocking spinner — page is already populated with static data above
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
