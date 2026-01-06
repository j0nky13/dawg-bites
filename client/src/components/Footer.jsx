export default function Footer() {
  return (
    <footer className="bg-[#E6D2AC] border-t border-[#D8B870]">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <strong>Dawg Bites</strong>
          <div>Charleston, SC</div>
        </div>

        <div className="text-right">
          <div>Hot Dogs • Burgers • Catering</div>
          <div className="opacity-70">
            © {new Date().getFullYear()} Dawg Bites
          </div>
        </div>
      </div>
    </footer>
  );
}