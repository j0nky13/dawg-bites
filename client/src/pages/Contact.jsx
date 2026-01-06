import SiteShell from "../components/SiteShell";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  return (
    <SiteShell>
      <ContactHero />
      <ContactForm />
    </SiteShell>
  );
}