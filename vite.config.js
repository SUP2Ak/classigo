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
      name: 'generate-unminified-cjs',
      writeBundle(_, bundle) {
        if (bundle['index.cjs']) {
          const fs = require('fs');
          const path = require('path');
          const { execSync } = require('child_process');
          
          try {
            // Compile TypeScript to JavaScript (non-minified)
            execSync('npx tsc src/index.ts --outDir dist --target es2020 --module commonjs --declaration false --sourceMap false --skipLibCheck true', { stdio: 'inherit' });
            
            // Read the compiled JS file
            const compiledPath = path.resolve(__dirname, 'dist/index.js');
            if (fs.existsSync(compiledPath)) {
              const compiledCode = fs.readFileSync(compiledPath, 'utf8');
              
              // Convert exports.default to module.exports
              const cjsCode = compiledCode
                .replace(/exports\.default = classigo;/, 'module.exports = classigo;')
                .replace(/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);/, '');
              
              // Write as dev version
              const devPath = path.resolve(__dirname, 'dist/index.cjs.dev.js');
              fs.writeFileSync(devPath, cjsCode);
              
              // Clean up the temporary file
              fs.unlinkSync(compiledPath);
            }
          } catch (error) {
            console.error('Failed to generate unminified CJS:', error.message);
          }
        }
      }
    },
    {
      name: 'force-single-line',
      writeBundle(_, bundle) {
        const fs = require('fs');
        const path = require('path');
        
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
