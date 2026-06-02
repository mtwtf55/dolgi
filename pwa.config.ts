import { type VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: 'Долги',
    short_name: 'Долги',
    description:
      'Удобный трекер для тех, кто часто дает в долг. Записывайте, кому, сколько и до какого числа вы одолжили деньги. Контролируйте свои финансы без лишних таблиц.',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    orientation: 'portrait',
    scope: '/',
    lang: 'ru',
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
  },
};
