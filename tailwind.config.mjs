const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        callout: ["Rock Salt", "Inter"],
      },
      animation: {
        "spin-slow": "rotate ease-in-out 16s infinite",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(140deg, rgba(10,10,10,1) 0%, rgba(49,27,107,1) 100%)",
      },
    },
  },
  plugins: [],
};
