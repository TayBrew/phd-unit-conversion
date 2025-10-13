import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Unit Converter',
        short_name: 'Converter',
        description: 'Offline-capable Unit Converter web app',
        theme_color: '#0f172a',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: "/", 
        icons: [
          {
            src: '/icons/icon1-192x.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon1-512x.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});