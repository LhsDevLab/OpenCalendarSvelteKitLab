/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        weekdays: "repeat(7, minmax(0, 1fr))",
      },
    },
    screens: {
      sm: { min: "640px", height: "640px" },
      // => @media (min-width: 640px) and (min-height: 360px) { ... }

      md: { min: "768px", height: "768px" },
      // => @media (min-width: 768px) and (min-height: 432px) { ... }

      lg: { min: "1024px", height: "576px" },
      // => @media (min-width: 1024px) and (min-height: 576px) { ... }
    },
  },
  plugins: [],
};
