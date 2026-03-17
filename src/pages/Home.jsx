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

        if (!active || !profilePayload) {
          return;
        }

        setPortfolioData({
          profile: {
            name: profilePayload.name,
            title: profilePayload.title,
            introduction: profilePayload.introduction,
            highlights: profilePayload.highlights || [],
            email: profilePayload.email,
            phone: profilePayload.phone,
            github: profilePayload.github,
            linkedin: profilePayload.linkedin,
            twitter: profilePayload.twitter,
            profilePhoto: profilePayload.profilePhoto,
          },
          about: profilePayload.about || about,
          contact: profilePayload.contact || contact,
          resume: profilePayload.resume || resume,
          projects: projectsPayload,
          skills: skillsPayload,
          achievements: achievementsPayload,
          certificates: certificatesPayload,
        });
      } catch (error) {
        console.error('Falling back to static portfolio data:', error);
      }
    }

    loadPortfolioData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <Navbar links={navigationLinks} githubUrl={portfolioData.profile.github} profilePhoto={portfolioData.profile.profilePhoto} name={portfolioData.profile.name} />
      <main>
        <Hero profile={portfolioData.profile} />
        <About about={portfolioData.about} />
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
