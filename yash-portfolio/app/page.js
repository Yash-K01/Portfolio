import Navbar from "@/components/Navbar/Navbar";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Education from "@/components/Education/Education";
import Achievements from "@/components/Achievements/Achievements";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoIntro />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
