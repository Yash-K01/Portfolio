import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import VideoHero from './components/VideoHero';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <SplashScreen onComplete={() => setIntroDone(true)} />}
      <main>
        <VideoHero isActive={introDone} />
        {/* Projects / Skills / Experience / Education / Achievements / Contact
            sections continue below the hero as the page is built out. */}
      </main>
    </>
  );
}