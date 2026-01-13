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

  // SOLO PARA DESARROLLO ↓↓↓
  devToolbar: {
    enabled: false,
  },

  // Middleware para desarrollo
  output: "static",

  site: "https://camiicode.github.io",
  base: "/enorganico",
  build: {
    assets: "assets",
  },
});
