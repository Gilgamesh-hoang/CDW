import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom plugin to inject needed globals for SockJS
    {
      name: 'vite-plugin-sockjs-polyfill',
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'module' },
              children: `
                // SockJS polyfills
                window.global = window;
                window.process = window.process || {};
                window.process.env = window.process.env || {};
                window.Buffer = window.Buffer || { isBuffer: () => false };
                window.setImmediate = window.setImmediate || ((fn) => setTimeout(fn, 0));
                window.clearImmediate = window.clearImmediate || ((id) => clearTimeout(id));
              `,
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    },
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
      '@features': '/src/features',
      '@utils': '/src/utils',
      '@components': '/src/components',
      '@pages': '/src/components',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@models': '/src/models',
      '@templates': '/src/templates',
      '@service/*': 'src/service',
      '@type/*': 'src/type',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    hmr: {
      clientPort: 5173,
    },
  },
  // Define globals and Node.js polyfills
  define: {
    global: 'window',
    'process.env': {},
  },
});
