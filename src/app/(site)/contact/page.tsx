import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/sections/Contact";

export const metadata = {
  title: "Contact | Keystone Digital Strategy",
  description: "Get in touch with Keystone Digital Strategy. We respond to every enquiry within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Let's work together."
        description="Tell us about your project. We respond to every enquiry personally within 24 hours."
      />
      <Contact />
    </>
  );
}
