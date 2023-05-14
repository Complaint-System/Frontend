/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scrollIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in",
        scrollIn: "scrollIn 0.4s ease",
      },
    },
    colors: {
      bgPrimary: "#2B2B2B",
      bgSecondary: "#363636",
      textPrimary: "#9FA2B4",
      textSecondary: "#363636",
      green: "#1DBF82",
      darkGreen: "#178f62",
      orange: "#f89406",
      dark: "#2B2B2B",
      white: "#FFFFFF",
      red: "#F12B2C",
      yellow: "#cca010",
      darkYellow: "#a6820d",
      blue: "#3751FF",
      gray: "#9FA2B4",
      lightGrey: "#f5f5f5",
      gray2: "#e0e0e0",
      gray3: "#48494a",
    },
  },
  plugins: [],
};
