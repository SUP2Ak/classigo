import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-undef
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/classigo/',
  plugins: [
    react(),
    vue(),
    svelte({
      compilerOptions: {
        compatibility: {
          componentApi: 4
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        react: resolve(__dirname, 'react-demo/index.html'),
        vue: resolve(__dirname, 'vue-demo/index.html'),
        svelte: resolve(__dirname, 'svelte-demo/index.html'),
        vanilla: resolve(__dirname, 'vanilla-demo/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
