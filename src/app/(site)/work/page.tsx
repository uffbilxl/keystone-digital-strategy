import { PageHero } from "@/components/PageHero";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata = {
  title: "Our Work | Keystone Digital Strategy",
  description: "100+ projects delivered across brand identity, web development, and cybersecurity.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Selected Work"
        title="100+ projects. All successful."
        description="Case studies dropping soon. Each project is a story of a client who needed something built right."
      />
      <Portfolio />
    </>
  );
}
