import NavBar from "./NavBar";
import Footer from "./Footer";

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F0E3] text-[#281808]">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}