import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "lindale-ui",
      fileName: (format) => `lindale-ui.${format}.js`,
    },
  },
});
