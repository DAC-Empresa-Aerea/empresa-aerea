import { theme } from "./theme/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: { theme },
  },
  plugins: [],
};

export default config;
