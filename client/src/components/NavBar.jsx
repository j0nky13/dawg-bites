import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const linkBase = "transition-colors hover:text-[#982810]";
const active = "text-[#982810] font-semibold";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? active : linkBase;

  return (
    <header className="bg-[#E6D2AC] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
  src="/client/public/dawgbites-logo.png"
  alt="Dawg Bites"
  className="h-12 w-auto"
/>
          <span className="font-bold text-lg tracking-wide">
            Dawg Bites
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium">
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
          className="md:hidden text-[#982810]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Floating Mobile Menu */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full px-4 mt-2">
          <div className="bg-[#F6F0E3] rounded-2xl shadow-xl border border-black/10 p-6">
            <nav className="flex flex-col items-center gap-6 font-semibold text-xl leading-relaxed text-center">
              <NavLink
                to="/"
                end
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/services"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Services
              </NavLink>

              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className="text-[#982810] font-semibold"
                onClick={() => setOpen(false)}
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