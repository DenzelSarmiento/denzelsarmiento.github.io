import { defineConfig } from 'vite';

export default defineConfig({
  base: '/denzelsarmiento.github.io/',
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
  base: '/memory-core/',
});
