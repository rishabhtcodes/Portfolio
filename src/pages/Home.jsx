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
  return (
    <div className="app-shell">
      <Navbar links={navigationLinks} githubUrl={profile.github} profilePhoto={profile.profilePhoto} name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About about={about} />
        <Resume resume={resume} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Certificates certificates={certificates} />
        <Achievements achievements={achievements} />
        <Contact contact={contact} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
