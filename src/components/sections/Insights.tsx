"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const articles = [
  {
    category: "Strategy",
    title: "Why most corporate strategies fail before they are executed",
    excerpt:
      "The root cause of strategic failure is rarely poor analysis. It is the absence of a structural framework that allows the strategy to be translated into decisions, priorities, and operating choices that hold under pressure.",
    readTime: "7 min read",
    date: "May 2025",
  },
  {
    category: "Transformation",
    title: "The architecture problem hiding inside your transformation programme",
    excerpt:
      "Transformation programmes fail at a predictable rate. Not because the vision is wrong, but because the organisational structure beneath the programme cannot carry the change. The programme is right. The vessel is not.",
    readTime: "9 min read",
    date: "March 2025",
  },
  {
    category: "Operating Models",
    title: "When your operating model becomes the constraint on your ambition",
    excerpt:
      "There is a pattern that recurs in every scaling organisation: the operating model that enabled growth to one level becomes the primary constraint on growth to the next. Knowing when you have reached that inflection point - and what to do about it - is a strategic capability.",
    readTime: "11 min read",
    date: "January 2025",
  },
];

const categories = ["All", "Strategy", "Transformation", "Operating Models", "Leadership"];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: index * 0.1 }}
      className="group flex flex-col cursor-pointer"
      style={{
        background: "#fff",
        border: "1px solid var(--hair)",
        borderRadius: "2px",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(12,35,64,0.15)";
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 30px rgba(12,35,64,0.07)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--hair)";
        el.style.transform = "none";
        el.style.boxShadow = "none";
      }}
    >
      {/* Category stripe */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, #AD8A52, transparent 70%)" }}
      />

      <div className="p-7 flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold uppercase"
            style={{ color: "#AD8A52", letterSpacing: "0.2em" }}
          >
            {article.category}
          </span>
          <span className="text-xs" style={{ color: "var(--mist)", letterSpacing: "0.04em" }}>
            {article.date}
          </span>
        </div>

        <h3
          className="font-semibold leading-tight"
          style={{
            color: "var(--navy)",
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
            lineHeight: "1.38",
          }}
        >
          {article.title}
        </h3>

        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--steel)", lineHeight: "1.75" }}>
          {article.excerpt}
        </p>

        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid var(--hair)" }}
        >
          <span className="text-xs" style={{ color: "var(--mist)" }}>
            {article.readTime}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
            style={{ color: "var(--navy)" }}
          >
            Read
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Insights() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section
      id="insights"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
      className="py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="block text-xs font-semibold uppercase mb-4"
              style={{ color: "#AD8A52", letterSpacing: "0.34em" }}
            >
              Insights
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
              className="font-semibold"
              style={{
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                color: "var(--navy)",
                letterSpacing: "-0.018em",
                lineHeight: "1.15",
              }}
            >
              Thinking on structure
            </motion.h2>
          </div>

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:max-w-xs"
          >
            {submitted ? (
              <p className="text-sm" style={{ color: "#AD8A52" }}>
                You're subscribed. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <p className="text-xs uppercase mb-2" style={{ color: "var(--mist)", letterSpacing: "0.18em" }}>
                  Subscribe to Insights
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 text-sm px-3 py-2.5 rounded-sm outline-none"
                    style={{
                      background: "#fff",
                      border: "1px solid var(--hair)",
                      color: "var(--charcoal)",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#AD8A52"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--hair)"; }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-xs font-semibold uppercase rounded-sm transition-colors duration-200"
                    style={{
                      background: "var(--navy)",
                      color: "#fff",
                      letterSpacing: "0.14em",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#0d2a4d"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--navy)"; }}
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 text-xs font-medium uppercase rounded-sm transition-all duration-200"
              style={{
                letterSpacing: "0.16em",
                background: activeCategory === cat ? "var(--navy)" : "#fff",
                color: activeCategory === cat ? "#fff" : "var(--steel)",
                border: `1px solid ${activeCategory === cat ? "var(--navy)" : "var(--hair)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <ArticleCard key={a.title} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
