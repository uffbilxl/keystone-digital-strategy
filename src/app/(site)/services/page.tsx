import { PageHero } from "@/components/PageHero";
import { Practice } from "@/components/sections/Practice";

export const metadata = {
  title: "Services | Keystone Digital Strategy",
  description: "Brand identity, social media branding & management, web development, and cybersecurity testing delivered by specialists.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="What we offer"
        description="Five specialist services. Delivered end-to-end by the same senior team on every engagement."
      />
      <Practice />
    </>
  );
}
