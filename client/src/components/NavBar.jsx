import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "/dawgbites-logo.png";
const linkBase = "transition-colors hover:text-[#982810]";
const active = "text-[#982810] font-semibold";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinkClass = ({ isActive }) =>
    isActive ? active : linkBase;

  /* ------------------------------
     scroll logic (ENTIRE NAV)
  ------------------------------ */
  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScrollY(currentY);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="bg-[#E6D2AC] shadow-sm">
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO (fully tied to navbar visibility) */}
          <Link
            to="/"
            className="absolute left-6"
            style={{ bottom: "-22px" }}
          >
           <img
  src={logo}
  alt="Dawg Bites"
  className="h-20 w-auto"
/>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 font-medium ml-auto">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#982810] font-semibold"
                  : "text-[#982810] font-semibold hover:opacity-80"
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#982810] ml-auto"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only when nav is visible) */}
      {open && visible && (
        <div className="md:hidden px-4 mt-2">
          <div className="bg-[#F6F0E3] rounded-2xl shadow-xl border border-black/10 p-6">
            <nav className="flex flex-col items-center gap-6 font-semibold text-xl">
              <NavLink to="/" end onClick={() => setOpen(false)} className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/services" onClick={() => setOpen(false)} className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="text-[#982810] font-semibold"
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}