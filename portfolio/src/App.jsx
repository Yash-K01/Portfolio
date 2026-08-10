import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter
    future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
      {/* Global navigation bar */}
      <nav className="app-nav">
        <Link to="/" className="nav-brand">Aarav Mehta</Link>
        <div className="nav-links">
          <Link to="/">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as you build them */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;