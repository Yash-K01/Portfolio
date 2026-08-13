import { useState } from 'react';
import VideoHero from './components/VideoHero/VideoHero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <VideoHero />
      <About/>
      <Projects/>
      <Skills/>
      <Experience/>
      <Education/>
      <Achievements/>
      <Contact/>
      <Footer/>
    </>
  );
}