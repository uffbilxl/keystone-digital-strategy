import { PageHero } from "@/components/PageHero";
import { About } from "@/components/sections/About";

export const metadata = {
  title: "About | Keystone Digital Strategy",
  description: "Four specialists. Three years. 100+ projects. A boutique digital consultancy delivering serious work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Small team. Serious work."
        description="We are four specialists — developers, a penetration tester, and a security analyst — working together to deliver brand, web, and security services worldwide."
      />
      <About />
    </>
  );
}
