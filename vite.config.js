import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebarsPrecompile from "./plugins/vite-plugin-handlebars-precompile";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        chats: resolve(__dirname, "src/pages/chats/index.html"),
        login: resolve(__dirname, "src/pages/login/index.html"),
        registration: resolve(__dirname, "src/pages/registration/index.html"),
        account: resolve(__dirname, "src/pages/account/index.html"),
        serverError: resolve(__dirname, "src/pages/error/serverError.html"),
        notFound: resolve(__dirname, "src/pages/error/notFound.html"),
      },
    },
  },

  server: {
    port: 3004,
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/"),
    }),
    handlebarsPrecompile(),
  ],
});
