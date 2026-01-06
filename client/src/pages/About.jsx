import SiteShell from "../components/SiteShell";
import AboutHero from "../components/about/AboutHero";
import AboutContent from "../components/about/AboutContent";

export default function About() {
  return (
    <SiteShell>
      <AboutHero />
      <AboutContent />
    </SiteShell>
  );
}