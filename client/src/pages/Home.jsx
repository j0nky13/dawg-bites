import SiteShell from "../components/SiteShell";
import Hero from "../components/home/Hero";
import PerfectFor from "../components/home/PerfectFor";
import HowItWorks from "../components/home/HowItWorks";
import CallToAction from "../components/home/CallToAction";
import TrustStrip from "../components/home/TrustStrip"
import CTARibbon from "../components/home/CTARIbbon";
import SocialValue from "../components/home/SocialValue";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <PerfectFor />
      <TrustStrip/>
      <HowItWorks />
      <SocialValue />
      <CallToAction />
      {/* <CTARibbon/> */}
    </SiteShell>
  );
}