import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        "light-blue": "#84d8ff",
        "dark-blue": "#1899d6",
        "blue-sky": "#1CB0F6",
        "dark-blue-sky": "#1899D6",
      },
      boxShadow: {
        "grey": "0px 2px 0px #E5E5E5"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
  plugin(function ({ addVariant }: any) {
    addVariant('is-enabled', '&:not([disabled])')
})
  ],
} satisfies Config

export default config