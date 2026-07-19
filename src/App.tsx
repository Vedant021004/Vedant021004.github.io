import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Stats } from "./pages/Stats";
import { Certificates } from "./pages/Certificates";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white flex flex-col font-body antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/github" element={<Stats />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
