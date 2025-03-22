import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: "/",
    build: {
        outDir: "dist",
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
        },
    },
    server: {
        watch: {
          usePolling: true, 
        },
        host: true, 
        hmr: {
          clientPort: 5173 
        }
    },
});
