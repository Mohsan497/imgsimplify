import type { Config } from "tailwindcss";

// Colors are read from CSS variables in src/app/globals.css (single source of truth).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: token("card"),
        surface: token("surface"),
        border: token("border"),
        muted: token("muted"),
        primary: token("primary"),
        "primary-foreground": token("primary-foreground"),
        accent: token("accent"),
        inverse: token("inverse"),
      },
      fontFamily: {
        // Fonts are defined in src/config/fonts.ts
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: { xl: "16px", "2xl": "20px", "3xl": "24px" },
      boxShadow: {
        soft: "0 1px 2px rgb(0 0 0 / 0.04), 0 4px 16px rgb(0 0 0 / 0.04)",
        glow: "0 0 0 4px rgb(var(--primary) / 0.15)",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-20px) scale(1.1)" },
        },
      },
      animation: { blob: "blob 14s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
