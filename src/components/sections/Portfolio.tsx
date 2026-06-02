"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ParticleCanvas } from "../ParticleCanvas";

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    n: "01",
    name: "On The Go Juice",
    url: "https://onthegojuice.vercel.app",
    tags: ["Web Development", "Brand Identity", "Security Tested"],
    sector: "Health & Wellness · UK Startup",
    desc: "Storefront and brand identity for a UK cold-pressed juice startup. Subscription-first design built to convert health-conscious visitors into recurring customers.",
    slides: ["/screenshots/onthegojuice/1.jpg", "/screenshots/onthegojuice/2.jpg", "/screenshots/onthegojuice/3.jpg"],
    strip: false,
  },
  {
    n: "02",
    name: "BCU Student Computing Association",
    url: "https://bcusca.org",
    tags: ["Web Development", "Security Tested"],
    sector: "Education · University Platform",
    desc: "Career and community hub for Birmingham City University computing students. Surfaces internship listings, events, and resources that bridge study and employment.",
    slides: ["/screenshots/bcusca/1.jpg", "/screenshots/bcusca/2.jpg", "/screenshots/bcusca/3.jpg"],
    strip: false,
  },
  {
    n: "03",
    name: "Bridge",
    url: "https://bridge-final-web-version.vercel.app",
    tags: ["Web Development", "Security Tested"],
    sector: "Social Impact · Digital Inclusion",
    desc: "Digital inclusion platform giving young people access to devices, learning pathways, mentorship, and AI-guided guidance to tackle the digital divide.",
    slides: ["/screenshots/bridge/1.jpg", "/screenshots/bridge/2.jpg", "/screenshots/bridge/3.jpg"],
    strip: false,
  },
  {
    n: "04",
    name: "Umrah Marketplace",
    url: "https://umrah-marketplace.vercel.app",
    tags: ["Web Development", "Security Tested"],
    sector: "Retail · E-commerce",
    desc: "Full-service grocery supermarket platform emphasising quality, freshness, and competitive pricing. Clean, conversion-optimised storefront built to drive repeat purchases.",
    slides: ["/screenshots/umrah-marketplace/1.jpg", "/screenshots/umrah-marketplace/2.jpg", "/screenshots/umrah-marketplace/3.jpg"],
    strip: false,
  },
  {
    n: "05",
    name: "Umrah Marketplace — Mobile",
    url: "https://umrah-marketplace-mobile-app.vercel.app",
    tags: ["Mobile Development", "Security Tested"],
    sector: "Retail · Mobile App",
    desc: "Touch-first companion app for the Umrah Marketplace. Rebuilt the shopping experience for mobile users with streamlined navigation and a native-feeling interface.",
    slides: ["/screenshots/umrah-mobile/1.jpg", "/screenshots/umrah-mobile/2.jpg", "/screenshots/umrah-mobile/3.jpg", "/screenshots/umrah-mobile/4.jpg"],
    strip: true,
  },
  {
    n: "06",
    name: "Sizzle & Seekh",
    url: "https://sizzleandseekh.vercel.app",
    tags: ["Web Development", "Brand Identity", "Security Tested"],
    sector: "Food & Beverage · International",
    desc: "Premium website for a halal-certified Pakistani restaurant in Islamabad specialising in grilled burgers and BBQ. Designed to capture walk-in footfall and online orders.",
    slides: ["/screenshots/sizzleandseekh/1.jpg", "/screenshots/sizzleandseekh/2.jpg", "/screenshots/sizzleandseekh/3.jpg"],
    strip: false,
  },
  {
    n: "07",
    name: "BCU Law & Debating Society",
    url: "https://bculawsociety.com",
    tags: ["Web Development", "Brand Identity", "Security Tested"],
    sector: "Education · Student Society",
    desc: "Platform for Birmingham City University's Law & Debating Society. Built to support mock trials, networking events, and career development resources for aspiring legal professionals.",
    slides: ["/screenshots/bculawsociety/1.jpg", "/screenshots/bculawsociety/2.jpg", "/screenshots/bculawsociety/3.jpg"],
    strip: false,
  },
];

// ─── Phone strip (mobile project) ─────────────────────────────────────────────
function PhoneStrip({ slides }: { slides: string[] }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: "16/9", background: "#050e1a" }}
    >
      {/* Subtle gradient edges so phones don't hard-cut */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #050e1a 0%, transparent 6%, transparent 94%, #050e1a 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 px-6">
        {slides.map((src, i) => (
          <div
            key={src}
            className="relative flex-1 overflow-hidden"
            style={{
              /* Portrait phone ratio — fills ~88% of container height */
              aspectRatio: "9/16",
              maxHeight: "88%",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 25vw, 12vw"
              className="object-cover"
              style={{ objectPosition: "top center" }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel({ slides }: { slides: string[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (hovered || slides.length <= 1) return;
    const t = setInterval(next, 3200);
    return () => clearInterval(t);
  }, [hovered, next, slides.length]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: "16/9", background: "#050e1a" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: "opacity 0.65s ease", zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "top center" }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Progress bars */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-px z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="flex-1 h-0.5 transition-all duration-300"
            style={{ background: i === active ? "#AD8A52" : "rgba(255,255,255,0.2)" }}
          />
        ))}
      </div>

      {/* Arrows — always visible, brighten on hover */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{
              background: "rgba(12,35,64,0.65)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.55)",
              fontSize: "18px",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.55,
            }}
          >‹</button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{
              background: "rgba(12,35,64,0.65)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.55)",
              fontSize: "18px",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.55,
            }}
          >›</button>
        </>
      )}

      {/* Counter */}
      <div
        className="absolute top-3 right-3 z-10 text-xs font-medium tabular-nums px-2 py-0.5"
        style={{ background: "rgba(12,35,64,0.7)", color: "rgba(255,255,255,0.5)", backdropFilter: "blur(4px)" }}
      >
        {active + 1} / {slides.length}
      </div>
    </div>
  );
}

// ─── Tag badge ────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  const isSecurity = label === "Security Tested";
  return (
    <span
      className="text-xs font-medium px-2.5 py-1 inline-flex items-center gap-1.5"
      style={{
        color: isSecurity ? "#6ee7b7" : "#AD8A52",
        border: `1px solid ${isSecurity ? "rgba(110,231,183,0.25)" : "rgba(173,138,82,0.22)"}`,
        background: isSecurity ? "rgba(110,231,183,0.05)" : "transparent",
      }}
    >
      {isSecurity && (
        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 1L1 3v4c0 2.5 2.2 4.4 5 5 2.8-.6 5-2.5 5-5V3L6 1z" />
          <path d="M3.5 6l1.5 1.5 3-3" />
        </svg>
      )}
      {label}
    </span>
  );
}

// ─── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
      className="group flex flex-col overflow-hidden"
      style={{ background: "rgba(10,29,53,0.95)", border: "1px solid rgba(159,176,190,0.08)", transition: "border-color 0.3s ease" }}
      whileHover={{ borderColor: "rgba(173,138,82,0.25)" } as never}
    >
      {/* Media */}
      <div className="relative">
        {project.strip ? (
          <PhoneStrip slides={project.slides} />
        ) : (
          <Carousel slides={project.slides} />
        )}

      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
        </div>

        {/* Name + sector */}
        <div>
          <h3 className="font-semibold text-white" style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", letterSpacing: "-0.015em", lineHeight: "1.3", marginBottom: "3px" }}>
            {project.name}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}>{project.sector}</p>
        </div>

        {/* Description */}
        <p className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.78" }}>
          {project.desc}
        </p>

        {/* CTA */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "#AD8A52", transition: "color 0.2s ease", width: "fit-content" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#C2A065"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#AD8A52"; }}
        >
          View Live →
        </a>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
    >
      <ParticleCanvas count={28} />
      <div className="grid-overlay" style={{ opacity: 0.1 }} />
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: "-5%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)", y: bgY }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
              <motion.h2
                className="font-semibold text-white"
                style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.025em", lineHeight: "1.1" }}
                initial={{ y: "105%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Selected work
              </motion.h2>
            </div>
            <motion.p
              className="text-sm mt-3"
              style={{ color: "rgba(255,255,255,0.35)", maxWidth: "380px", lineHeight: "1.75" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              A cross-section of recent projects across brand, web, and digital product.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-8 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[{ n: "7", label: "shown here" }, { n: "100+", label: "delivered" }].map(({ n, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-semibold text-white" style={{ fontSize: "1.4rem", letterSpacing: "-0.025em" }}>{n}</span>
                <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          className="text-sm text-center mt-14"
          style={{ color: "rgba(255,255,255,0.18)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          More projects being added. Every engagement is senior-led and delivered in full.
        </motion.p>
      </div>
    </section>
  );
}
