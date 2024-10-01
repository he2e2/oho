// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'oho',
        short_name: 'oho',
        description: 'oho with PWA',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-128.png',
            sizes: '128x128',
            type: 'image/png',
          },
        ],
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern:
      //         /^http:\/\/apis\.data\.go\.kr\/B551011\/KorService1\/.*$/,
      //       handler: 'NetworkFirst',
      //       options: {
      //         cacheName: 'public-api-cache',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 60 * 60 * 24,
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  server: {
    port: 3000,
  },
});
