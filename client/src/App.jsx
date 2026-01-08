import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Portal
import PortalApp from "./modules/portal/PortalApp";

// Simple inline 404 (unchanged)
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

/* ---------------- scroll reset ---------------- */

function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ---------------- app wrapper ---------------- */

function AppWrapper() {
  const location = useLocation();
  const isPortalRoute = location.pathname.startsWith("/portal");

  return (
    <>
      <ScrollReset />

      {/* PUBLIC SITE */}
      {!isPortalRoute && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      {/* PORTAL — FULLY ISOLATED */}
      {isPortalRoute && (
        <Routes>
          <Route path="/portal/*" element={<PortalApp />} />
        </Routes>
      )}
    </>
  );
}

/* ---------------- root ---------------- */

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}