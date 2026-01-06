import SiteShell from "../components/SiteShell";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import ServiceModel from "../components/services/ServiceModel";
import ServiceUseCases from "../components/services/ServiceUseCases";
import ServiceDetails from "../components/services/ServiceDetails"
// import SocialValue from "../components/services/Social"
import CallToAction from "../components/home/CallToAction"
export default function Services() {
  return (
    <SiteShell>
     <ServicesHero />
<ServiceModel />
<ServiceUseCases />
<ServiceDetails />
{/* <SocialValue /> */}
{/* <PerfectFor /> */}
      {/* <CTA /> */}
      <CallToAction/>
    </SiteShell>
  );
}