import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VideoIntro from "./components/video/VideoIntro";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <Routes>
        <Route path="/" element={<VideoIntro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;