import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebarsPrecompile from "./plugins/vite-plugin-handlebars-precompile";

export default defineConfig({
  server: {
    port: 3001,
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        chats: resolve(__dirname, "./src/pages/chats/index.html"),
        login: resolve(__dirname, "./src/pages/login/index.html"),
        registration: resolve(__dirname, "./src/pages/registration/index.html"),
        account: resolve(__dirname, "./src/pages/account/index.html"),
        serverError: resolve(__dirname, "./src/pages/error/serverError.html"),
        notFound: resolve(__dirname, "./src/pages/error/notFound.html"),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/"),
    }),
    handlebarsPrecompile(),
  ],
});
