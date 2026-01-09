export default function Footer() {
  return (
    <footer className="relative bg-[#E6D2AC]">
      {/* Accent strip */}
      <div className="h-2 bg-[#982810]" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Brand */}
          <div className="space-y-2">
            <div className="text-2xl font-extrabold tracking-wide text-[#982810]">
              Dawg Bites
            </div>
            <div className="text-sm text-black/70">
              Charleston, South Carolina
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-black/20" />

          {/* Tagline */}
          <div className="text-sm font-medium text-black">
            Hot Dogs • Burgers • Catering
          </div>

          {/* Copyright */}
          <div className="text-xs text-black/60">
            © {new Date().getFullYear()} Dawg Bites. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}