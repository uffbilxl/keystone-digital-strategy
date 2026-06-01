import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0C2340",
          dark: "#0A1E38",
        },
        charcoal: "#1F252D",
        steel: "#5E6B78",
        mist: "#9FB0BE",
        gold: {
          DEFAULT: "#AD8A52",
          light: "#C2A065",
        },
        paper: "#F6F7F9",
        hair: "#E3E7EB",
      },
      fontFamily: {
        sans: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,5vw,4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem,4vw,3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.18", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.375rem,2.5vw,1.875rem)", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.34em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "line-grow": "lineGrow 0.8s cubic-bezier(0.23,1,0.32,1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      backgroundImage: {
        "grid-navy": "linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
