/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['firebase', 'firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
  },
  build: {
    outDir: './docs',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
      manifest: {
        background_color: '#000000',
        theme_color: '#7E1F86',
        name: 'Verspätungsliste',
        short_name: 'Vl',
        start_url: '/',
        display: 'standalone',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    host: true,
  },
  base: './',
});
