import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f3f6f3',
          100: '#e4e8e3',
          200: '#c9d3c7',
          300: '#a4b3a2',
          400: '#8b9e8a',
          500: '#587158',
          600: '#435843',
          700: '#364637',
          800: '#2c392c',
          900: '#252f25',
          950: '#141a15',
        },
      }
    },
  },
  plugins: [],
};
export default config;
