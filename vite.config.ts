import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(),
  createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        preload: '<link rel="preload" href="/assets/cabinet/gnom.png" as="image" />',
      },
    },
  }),
  ],
  base: '/yh/',
});
