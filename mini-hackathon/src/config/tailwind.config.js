// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // include all JS/JSX files
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1D4ED8",
        "brand-strong": "#1E40AF",
        "brand-medium": "#3B82F6",
      },
    },
  },
  plugins: [],
};
