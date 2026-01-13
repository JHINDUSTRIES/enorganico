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
    assetsInclude: ["**/*.mov", "**/*.mp4", "**/*.webm"],
  },

  site: "https://JHINDUSTRIES.github.io",
  base: "/enorganico",
  build: {
    assets: "assets",
  },
});
