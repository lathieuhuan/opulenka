import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [["@babel/plugin-proposal-decorators", { loose: true, version: "2022-03" }]],
      },
    }),
    dts({ include: ["src"] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
