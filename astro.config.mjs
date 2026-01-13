// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {},
    },
    // ESTA ES LA PARTE NUEVA ↓↓↓
    assetsInclude: ["**/*.mov", "**/*.mp4", "**/*.webm", "**/*.avi", "**/*.mkv"],
  },
  site: "https://camiicode.github.io",
  base: "/enorganico",
  build: {
    assets: "assets",
  },
});
