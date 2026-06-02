"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ParticleCanvas } from "../ParticleCanvas";

const projects = [
  {
    n: "01",
    name: "On The Go Juice",
    url: "https://onthegojuice.vercel.app",
    tags: ["Web Development", "Brand Identity"],
    sector: "Health & Wellness · UK Startup",
    desc: "Storefront and brand identity for a UK cold-pressed juice startup. Subscription-first design built to convert health-conscious visitors into recurring customers, with a bold visual language that reflects the product.",
  },
  {
    n: "02",
    name: "BCU Student Computing Association",
    url: "https://bcusca.org",
    tags: ["Web Development"],
    sector: "Education · University Platform",
    desc: "Career and community hub for Birmingham City University computing students. Surfaces internship listings, events, and resources that bridge the gap between study and employment — built for students, run by students.",
  },
  {
    n: "03",
    name: "Bridge",
    url: "https://bridge-final-web-version.vercel.app",
    tags: ["Web Development"],
    sector: "Social Impact · Digital Inclusion",
    desc: "Digital inclusion platform giving young people access to devices, learning pathways, mentorship, and AI-guided guidance. Built to tackle the digital divide and get underserved communities connected to opportunity.",
  },
  {
    n: "04",
    name: "Umrah Marketplace",
    url: "https://umrah-marketplace.vercel.app",
    tags: ["Web Development"],
    sector: "Retail · E-commerce",
    desc: "Full-service grocery supermarket platform emphasising quality, freshness, and competitive pricing. Clean, conversion-optimised storefront designed to build trust and drive repeat purchases.",
  },
  {
    n: "05",
    name: "Umrah Marketplace — Mobile",
    url: "https://umrah-marketplace-mobile-app.vercel.app",
    tags: ["Mobile Development"],
    sector: "Retail · Mobile App",
    desc: "Touch-first companion app for the Umrah Marketplace. Rebuilt the entire shopping experience for mobile users — streamlined navigation, faster checkout, and an interface that feels native rather than ported.",
  },
  {
    n: "06",
    name: "Sizzle & Seekh",
    url: "https://sizzleandseekh.vercel.app",
    tags: ["Web Development", "Brand Identity"],
    sector: "Food & Beverage · International",
    desc: "Premium website for a halal-certified Pakistani restaurant in Islamabad, specialising in grilled burgers and BBQ. International client. Designed to capture walk-in footfall and online orders in equal measure.",
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [imgError, setImgError] = useState(false);
  const screenshotUrl = `https://image.thum.io/get/width/1200/crop/675/${project.url}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: "rgba(10,29,53,0.95)",
        border: "1px solid rgba(159,176,190,0.08)",
      }}
    >
      {/* Screenshot */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "16/9" }}
      >
        {!imgError ? (
          <Image
            src={screenshotUrl}
            alt={`${project.name} website screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            style={{ transition: "transform 0.6s ease" }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          // Fallback when screenshot fails
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(12,35,64,0.9), rgba(5,14,26,0.95))" }}
          >
            <span className="font-semibold text-white/20" style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}>
              {project.name}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{
            background: "rgba(12,35,64,0.88)",
            transition: "opacity 0.25s ease",
          }}
        >
          <span
            className="font-medium"
            style={{
              color: "#C2A065",
              fontSize: "0.9rem",
              border: "1px solid rgba(173,138,82,0.4)",
              padding: "10px 24px",
              letterSpacing: "0.02em",
            }}
          >
            View Live →
          </span>
        </div>

        {/* Gold top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100"
          style={{ background: "linear-gradient(90deg, #AD8A52, #C2A065, transparent)", transition: "transform 0.4s ease" }}
        />
      </a>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 md:p-7 gap-4">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1"
                style={{ color: "#AD8A52", border: "1px solid rgba(173,138,82,0.22)", letterSpacing: "0.02em" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.18)" }}>
            {project.n}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-semibold text-white"
            style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", letterSpacing: "-0.015em", lineHeight: "1.3", marginBottom: "4px" }}
          >
            {project.name}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", letterSpacing: "0.02em" }}>
            {project.sector}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-sm flex-1"
          style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.78" }}
        >
          {project.desc}
        </p>

        {/* Footer link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium mt-2 group/link"
          style={{ color: "#AD8A52", transition: "color 0.2s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#C2A065"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#AD8A52"; }}
        >
          View Live
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </a>
      </div>
    </motion.article>
  );
}

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
        style={{
          bottom: "-5%", left: "-10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)",
          y: bgY,
        }}
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
              A cross-section of recent projects. Brand, web, and digital products delivered end-to-end.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-6 md:gap-8 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { n: "6", label: "shown here" },
              { n: "100+", label: "delivered" },
            ].map(({ n, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-semibold text-white" style={{ fontSize: "1.4rem", letterSpacing: "-0.025em" }}>{n}</span>
                <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid — 2 cols on md+, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-sm text-center mt-14"
          style={{ color: "rgba(255,255,255,0.2)" }}
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
