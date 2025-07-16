/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        primary: "#7C3AED",
        secondary: "#A855F7",
        accent: "#06B6D4",
        surface: "#1F2937",
        background: "#111827",
        success: "#059669",
        warning: "#D97706",
        error: "#DC2626",
        info: "#7C3AED",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}