import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

// simple inline 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F0E3] text-[#281808]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p>That page doesn’t exist.</p>
      </div>
    </div>
  );
}

/*
  Portal routes will live under:
  src/modules/portal
*/
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Portal (future) */}
        {/* <Route path="/portal/*" element={<PortalRoutes />} /> */}

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}