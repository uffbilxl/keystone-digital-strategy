"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/sections/Hero";
import { WhyStructure } from "@/components/sections/WhyStructure";
import { Practice } from "@/components/sections/Practice";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Navigation />
      <main>
        <Hero />
        <WhyStructure />
        <Practice />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
