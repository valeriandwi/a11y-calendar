import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import * as packageJson from "./package.json";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  define: {
    global: "window",
  },
  build: {
    minify: true,
    //Specifies that the output of the build will be a library.
    lib: {
      //Defines the entry point for the library build. It resolves
      //to src/index.ts,indicating that the library starts from this file.
      entry: [path.resolve("src", "index.ts")],
      name: "a11y-datepicker-react",
      //A function that generates the output file
      //name for different formats during the build
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: "React",
          dayjs: "dayjs",
          zustand: "zustand",
        },
      },
    },
    //Generates sourcemaps for the built files,
    //aiding in debugging.
    sourcemap: true,
    //Clears the output directory before building.
    emptyOutDir: true,
  },
  //react() enables React support.
  //dts() generates TypeScript declaration files (*.d.ts)
  //during the build.
  plugins: [react(), tsConfigPaths(), dts(), libInjectCss()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
