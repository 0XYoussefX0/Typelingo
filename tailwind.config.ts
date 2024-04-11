import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-blue": "#235390",
        "light-grey": "#E5E5E5",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-grey": "#4B4B4B",
        "disabled-grey": "#AFAFAF",
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }: any) {
      addVariant('is-enabled', '&:not([disabled])')
  })
  ],
};
export default config;
