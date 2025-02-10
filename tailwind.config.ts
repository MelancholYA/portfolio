import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Supports dark mode with 'class'
  theme: {
    extend: {
      colors: {
        primary: "#8d99ae",
        secondary: "#0e0e0e",
        white: "#edf2f4",
        accent: "#ef233c",
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          900: "#1a202c",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%": { transform: "translate(0,0)" },
          "30%": { transform: "translate(35px,60px)" },
          "60%": { transform: "translate(135px,-60px)" },
          "100%": { transform: "translate(0,-0)" },
        },
      },
      animation: {
        fade: "fadeIn 1.5s ease-in-out",
        slide: "slideLeft 0.5s ease-out",
        scale: "scaleIn 0.5s ease-out",
        float: "float 45s ease-in-out alternate infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
