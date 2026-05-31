import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaConfig } from './pwa.config';

const ROUTES_DIRECTORY = path.resolve(__dirname, 'src', 'pages');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: ROUTES_DIRECTORY,
    }),
    react(),
    tailwindcss(),
    VitePWA(pwaConfig),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
