/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist core palette
        brand: {
          yellow: "#FFE17C",
          "yellow-deep": "#F5CE3F",
          charcoal: "#171E19",
          sage: "#B7C6C2",
          "sage-light": "#E4ECE9",
          white: "#FFFFFF",
          black: "#000000",
        },
        // Legacy tokens preserved (used by knowledge-base accents)
        dsc: {
          navy: "#171E19",
          blue: "#2b4b7c",
          lightBlue: "#e8effc",
          gold: "#F5CE3F",
          maroon: "#8c1d2f",
          dark: "#0f172a",
          surface: "#f8fafc",
          border: "#e2e8f0",
        },
      },
      borderWidth: {
        DEFAULT: "2px",
        0: "0px",
        2: "2px",
        3: "3px",
        4: "4px",
        8: "8px",
      },
      boxShadow: {
        brutal: "4px 4px 0px #000000",
        "brutal-sm": "2px 2px 0px #000000",
        "brutal-lg": "8px 8px 0px #000000",
        "brutal-xl": "10px 10px 0px #000000",
        "brutal-none": "0px 0px 0px #000000",
        none: "none",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.28s ease-out both",
        "slide-up": "slideUp 0.32s ease-out both",
        "slide-in-right": "slideInRight 0.28s ease-out both",
        "typing-bounce": "typingBounce 1s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        typingBounce: {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
