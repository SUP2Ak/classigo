import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "classigo",
      formats: ["es", "cjs", "umd"],
      fileName: (format) =>
        `index.${
          format === "es" ? "mjs" : format === "cjs" ? "cjs" : "umd.js"
        }`,
    },
    minify: "esbuild",
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        compact: true
      },
    },
  },
  plugins: [
    {
      name: 'force-single-line',
      async writeBundle(_, bundle) {
        const fs = await import('fs');
        const path = await import('path');
        
        // Force single line for ESM
        if (bundle['index.mjs']) {
          const mjsPath = path.resolve(__dirname, 'dist/index.mjs');
          const content = fs.readFileSync(mjsPath, 'utf8');
          const singleLine = content.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
          fs.writeFileSync(mjsPath, singleLine);
        }
      }
    }
  ]
});
