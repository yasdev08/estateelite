import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A",
          50:  "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#5c7cfa",
          600: "#4c6ef5",
          700: "#4263eb",
          800: "#3b5bdb",
          900: "#364fc7",
          950: "#0F172A",
        },
        secondary: {
          DEFAULT: "#1E293B",
          light: "#334155",
          dark: "#0F172A",
        },
        gold: {
          DEFAULT: "#C9A227",
          50:  "#fdfbf0",
          100: "#faf5d4",
          200: "#f5e9a4",
          300: "#edd96b",
          400: "#e4c53c",
          500: "#C9A227",
          600: "#b8891a",
          700: "#986b16",
          800: "#7c5518",
          900: "#67461a",
          950: "#3c260a",
        },
        dark: {
          DEFAULT: "#0F172A",
          card: "#1E293B",
          border: "#2D3748",
          muted: "#475569",
          subtle: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A227 0%, #e8c35a 50%, #C9A227 100%)",
        "dark-gradient": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        "hero-gradient": "linear-gradient(to bottom, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.85) 100%)",
        "card-gradient": "linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0) 60%)",
        "shine": "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
      },
      boxShadow: {
        "gold": "0 0 0 1px rgba(201,162,39,0.3), 0 4px 24px rgba(201,162,39,0.15)",
        "gold-lg": "0 8px 48px rgba(201,162,39,0.25)",
        "card": "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
        "nav": "0 1px 0 rgba(0,0,0,0.06), 0 4px 32px rgba(0,0,0,0.04)",
        "glass": "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
        "property": "0 32px 80px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "shimmer": "shimmer 2s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
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
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,162,39,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(201,162,39,0)" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
