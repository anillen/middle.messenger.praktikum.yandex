/* eslint-disable no-undef */
import { defineConfig } from "vite";
import handlebarsPrecompile from "./plugins/vite-plugin-handlebars-precompile";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [handlebarsPrecompile()],
});
