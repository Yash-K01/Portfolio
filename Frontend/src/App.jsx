import { useState } from 'react';
import VideoHero from './components/VideoHero/VideoHero';
import AboutProjects from './components/AboutProjects/AboutProjects';
import ExperienceSkills from './components/ExperienceSkills/ExperienceSkills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <VideoHero />
      <AboutProjects />
      <ExperienceSkills/>
      <Education/>
      <Contact/>
    </>
  );
}