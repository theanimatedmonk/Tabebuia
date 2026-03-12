import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.js"),
      name: "Tabebuia",
      formats: ["es", "cjs"],
      fileName: (format) => `tabebuia.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@rive-app/react-webgl2",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@rive-app/react-webgl2": "RiveReactWebGL2",
        },
      },
    },
    outDir: "dist-lib",
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
