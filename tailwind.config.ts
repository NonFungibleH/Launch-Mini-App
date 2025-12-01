import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          blue: '#0052FF',
          lightblue: '#4A90FF',
          dark: '#050A14',
          gray: '#8A8F98',
          light: '#F4F4F4',
        },
      },
    },
  },
  plugins: [],
};
export default config;
